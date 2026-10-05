import {
  createLiquidCursorClassifier,
  type StudioCodeCompletion,
  type StudioCodeCompletionRequest,
  type StudioCodeHover,
  type StudioCodeSignature,
  type StudioCodeToolingAuthoringContext,
  type StudioCodeToolingCatalogClient,
  type StudioCodeToolingDocument,
  type StudioCodeToolingSymbol,
  type StudioCodeToolingValueShapeMember
} from "@elsa-workflows/studio-code-editor";

export interface LiquidToolingProjectionOptions {
  document?: StudioCodeToolingDocument;
  authoringContext?: StudioCodeToolingAuthoringContext;
  tooling?: StudioCodeToolingCatalogClient;
}

const valueKinds = new Set(["value", "function", "namespace", "member", "keyword"]);

/** Liquid's help is authorized from the rich catalog and classified from the actual Liquid parser. */
export function createLiquidToolingProjection(options: LiquidToolingProjectionOptions) {
  const classifyCursor = createLiquidCursorClassifier();
  let sourceVersion = options.document?.sourceVersion ?? 0;
  let previousSource = options.document?.source;

  const currentDocument = (source: string): StudioCodeToolingDocument | undefined => {
    if (!options.document) return undefined;
    if (previousSource !== source) {
      previousSource = source;
      sourceVersion++;
    }
    return { ...options.document, source, sourceVersion };
  };

  const getCatalog = async (source: string, query: string, signal: AbortSignal) => {
    const context = options.authoringContext;
    if (!options.document || !context || !options.tooling?.getCatalog || signal.aborted) return undefined;
    const document = currentDocument(source);
    if (!document) return undefined;

    const response = await options.tooling.getCatalog(document, context, query, undefined, signal);
    if (signal.aborted || (response.state !== "ready" && response.state !== "supported-empty")) return undefined;
    return response.data?.symbols ?? [];
  };

  const completionProvider = async (request: StudioCodeCompletionRequest): Promise<StudioCodeCompletion[]> => {
    const cursor = await classifyCursor(request.document.value, request.position);
    if (request.signal.aborted || cursor.region === "quiet") return [];
    if (cursor.region === "text") {
      return request.explicit
        ? [{
            label: "{{ }}",
            detail: "Insert a Liquid interpolation",
            kind: "keyword",
            apply: "{{ ${1:value} }}",
            snippet: true,
            range: { from: cursor.from, to: cursor.to }
          }]
        : [];
    }
    if (options.authoringContext?.capabilities?.completion === false) return [];

    const memberPath = cursor.region === "value" && cursor.valuePath &&
      (cursor.valuePath.length > 1 || cursor.valuePath.at(-1) === "");
    const catalogQuery = memberPath ? cursor.valuePath?.[0] ?? "" : cursor.prefix;
    const symbols = await getCatalog(request.document.value, catalogQuery, request.signal);
    if (!symbols || request.signal.aborted) return [];
    let candidates: StudioCodeToolingSymbol[];

    if (cursor.region === "filter") {
      candidates = symbols.filter(symbol => symbol.kind === "filter");
    } else if (cursor.region === "tag") {
      candidates = symbols.filter(symbol => symbol.kind === "tag");
    } else if (memberPath && cursor.valuePath) {
      const memberPrefix = cursor.valuePath.at(-1) ?? "";
      const ownerPath = cursor.valuePath.slice(0, -1);
      candidates = await membersForPath(ownerPath, mergeSymbols(symbols, contextSymbols(options.authoringContext)), request.document.value, request.signal);
      candidates = candidates.filter(symbol => symbol.name.toLocaleLowerCase().startsWith(memberPrefix.toLocaleLowerCase()));
    } else {
      const scoped = contextSymbols(options.authoringContext);
      candidates = mergeSymbols(symbols.filter(symbol => valueKinds.has(symbol.kind ?? "")), scoped)
        .filter(symbol => valueKinds.has(symbol.kind ?? ""));
    }

    return candidates
      .filter(symbol => symbol.name.toLocaleLowerCase().startsWith(cursor.prefix.toLocaleLowerCase()))
      .map(symbol => completionFor(symbol, cursor.from, cursor.to));
  };

  const hoverProvider = async (document: StudioCodeToolingDocument & { value: string }, position: number, signal: AbortSignal): Promise<StudioCodeHover | null> => {
    const cursor = await classifyCursor(document.value, position);
    if (signal.aborted || options.authoringContext?.capabilities?.hover === false || cursor.region === "quiet" || cursor.region === "text" || !cursor.prefix && cursor.from === cursor.to) return null;
    const memberPath = cursor.region === "value" && cursor.valuePath && cursor.valuePath.length > 1;
    const query = memberPath ? cursor.valuePath?.[0] ?? "" : cursor.prefix || tokenAt(document.value, position);
    const symbols = await getCatalog(document.value, query, signal);
    if (!symbols || signal.aborted) return null;

    let symbol: StudioCodeToolingSymbol | StudioCodeToolingValueShapeMember | undefined;
    if (cursor.region === "filter") symbol = symbols.find(candidate => candidate.kind === "filter" && candidate.name === tokenAt(document.value, position));
    else if (cursor.region === "tag") symbol = symbols.find(candidate => candidate.kind === "tag" && candidate.name === tokenAt(document.value, position));
    else if (cursor.valuePath?.length) {
      const path = cursor.valuePath;
      const currentName = path.at(-1)!;
      if (path.length === 1) {
        symbol = mergeSymbols(symbols, contextSymbols(options.authoringContext)).find(candidate => candidate.name === currentName);
      } else {
        const siblings = await membersForPath(path.slice(0, -1), mergeSymbols(symbols, contextSymbols(options.authoringContext)), document.value, signal);
        symbol = siblings.find(candidate => candidate.name === currentName);
      }
    }
    return symbol?.documentation
      ? { range: { from: cursor.from, to: cursor.to }, documentation: { markdown: symbol.documentation } }
      : null;
  };

  const signatureProvider = async (document: StudioCodeToolingDocument & { value: string }, position: number, signal: AbortSignal): Promise<StudioCodeSignature | null> => {
    const cursor = await classifyCursor(document.value, position);
    if (signal.aborted || options.authoringContext?.capabilities?.signatures === false || (cursor.region !== "filter" && cursor.region !== "tag")) return null;
    const symbols = await getCatalog(document.value, cursor.prefix || tokenAt(document.value, position), signal);
    if (!symbols || signal.aborted) return null;
    const kind = cursor.region;
    const name = tokenAt(document.value, position);
    const signature = symbols.find(symbol => symbol.kind === kind && symbol.name === name)?.signatures?.[0];
    return signature
      ? {
          label: signature.label,
          documentation: signature.documentation ? { markdown: signature.documentation } : undefined,
          parameters: signature.parameters,
          returnShapeId: signature.returnShapeId
        }
      : null;
  };

  async function membersForPath(path: readonly string[], symbols: readonly StudioCodeToolingSymbol[], source: string, signal: AbortSignal) {
    if (path.length === 0 || signal.aborted) return [];
    let current = symbols.find(symbol => symbol.name === path[0]);
    let members = await loadMembers(current, source, signal);
    for (const segment of path.slice(1)) {
      if (signal.aborted) return [];
      current = members.find(member => member.name === segment);
      members = await loadMembers(current, source, signal);
    }
    return members;
  }

  async function loadMembers(symbol: StudioCodeToolingSymbol | undefined, source: string, signal: AbortSignal) {
    const context = options.authoringContext;
    if (!symbol?.shapeId || !options.document || !context || !options.tooling?.getValueShape || signal.aborted) return [];
    const document = currentDocument(source);
    if (!document) return [];
    const response = await options.tooling.getValueShape(document, context, symbol.shapeId, signal);
    if (signal.aborted || (response.state !== "ready" && response.state !== "supported-empty")) return [];
    return (response.data?.members ?? []).map(member => ({
      id: `${symbol.shapeId}:${member.name}`,
      name: member.name,
      kind: "member",
      documentation: member.documentation,
      shapeId: member.shapeId
    }));
  }

  return { completionProvider, hoverProvider, signatureProvider };
}

function contextSymbols(context?: StudioCodeToolingAuthoringContext): StudioCodeToolingSymbol[] {
  return [
    ...(context?.target ? [context.target] : []),
    ...(context?.rootSymbols ?? []),
    ...(context?.workflowInputs ?? []),
    ...(context?.visibleVariables ?? []),
    ...(context?.visibleActivityOutputs ?? [])
  ];
}

function mergeSymbols(...groups: readonly (readonly StudioCodeToolingSymbol[])[]) {
  const symbols = new Map<string, StudioCodeToolingSymbol>();
  for (const symbol of groups.flat()) symbols.set(symbol.id ?? symbol.name, symbol);
  return [...symbols.values()];
}

function completionFor(symbol: StudioCodeToolingSymbol, from: number, to: number): StudioCodeCompletion {
  const signature = symbol.signatures?.[0];
  return {
    label: symbol.name,
    kind: completionKind(symbol.kind),
    detail: signature?.label,
    documentation: symbol.documentation ? { markdown: symbol.documentation } : undefined,
    boost: sortBoost(symbol.sortText),
    range: { from, to }
  };
}

function completionKind(kind?: string): StudioCodeCompletion["kind"] {
  if (kind === "function" || kind === "method" || kind === "property" || kind === "variable" ||
      kind === "keyword" || kind === "filter" || kind === "tag") return kind;
  return kind === "member" ? "property" : "value";
}

function tokenAt(source: string, position: number) {
  const start = Math.min(Math.max(0, position), source.length);
  let from = start;
  let to = start;
  while (from > 0 && /[\p{L}\p{Nd}_$]/u.test(source[from - 1]!)) from--;
  while (to < source.length && /[\p{L}\p{Nd}_$]/u.test(source[to]!)) to++;
  return source.slice(from, to);
}

function sortBoost(sortText?: string) {
  if (!sortText) return undefined;
  const value = Number.parseInt(sortText, 10);
  return Number.isFinite(value) ? -value : undefined;
}
