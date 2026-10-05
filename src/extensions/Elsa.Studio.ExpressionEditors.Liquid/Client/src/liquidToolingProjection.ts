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
const maximumLiquidValuePathSegments = 4;

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
      candidates = await membersForPath(ownerPath, projectedValueSymbols(symbols, options.authoringContext), request.document.value, request.signal);
      candidates = candidates.filter(symbol => symbol.name.toLocaleLowerCase().startsWith(memberPrefix.toLocaleLowerCase()));
    } else {
      candidates = projectedValueSymbols(symbols, options.authoringContext);
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
      const valueSymbols = projectedValueSymbols(symbols, options.authoringContext);
      if (path.length === 1) {
        symbol = valueSymbols.find(candidate => candidate.name === currentName);
      } else {
        const siblings = await membersForPath(path.slice(0, -1), valueSymbols, document.value, signal);
        symbol = siblings.find(candidate => candidate.name === currentName);
      }
    }
    return symbol?.documentation
      ? {
          range: { from: cursor.from, to: cursor.to },
          documentation: { markdown: memberPath ? `${escapeMarkdownLabel(symbol.name)}\n\n${symbol.documentation}` : symbol.documentation }
        }
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
    if (path.length === 0 || path.length >= maximumLiquidValuePathSegments || signal.aborted) return [];
    let current = symbols.find(symbol => symbol.name === path[0] && canOwnMembers(symbol));
    let members = await loadMembers(current, source, signal, 1);
    for (const [index, segment] of path.slice(1).entries()) {
      if (signal.aborted) return [];
      current = members.find(member => member.name === segment && canOwnMembers(member));
      members = await loadMembers(current, source, signal, index + 2);
    }
    return members;
  }

  async function loadMembers(symbol: StudioCodeToolingSymbol | undefined, source: string, signal: AbortSignal, symbolDepth: number) {
    if (!symbol || signal.aborted) return [];
    const projectedChildren = normalizeDottedSymbols(symbol.children ?? [], symbolDepth + 1);
    if (!symbol.shapeId) return projectedChildren;
    const context = options.authoringContext;
    if (!options.document || !context || !options.tooling?.getValueShape) return projectedChildren;
    const document = currentDocument(source);
    if (!document) return [];
    const response = await options.tooling.getValueShape(document, context, symbol.shapeId, signal);
    if (signal.aborted || (response.state !== "ready" && response.state !== "supported-empty")) return [];
    const shapeMembers = normalizeDottedSymbols((response.data?.members ?? []).map(member => ({
      id: `${symbol.shapeId}:${member.name}`,
      name: member.name,
      kind: "member",
      documentation: member.documentation,
      shapeId: member.shapeId
    })), symbolDepth + 1);
    return mergeMembersByName(shapeMembers, projectedChildren, symbolDepth + 1);
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
  ].filter(canOwnMembers);
}

function projectedValueSymbols(catalogSymbols: readonly StudioCodeToolingSymbol[], context?: StudioCodeToolingAuthoringContext) {
  return normalizeDottedSymbols(mergeSymbols(
    catalogSymbols.filter(symbol => valueKinds.has(symbol.kind ?? "")),
    contextSymbols(context)
  ));
}

function mergeSymbols(...groups: readonly (readonly StudioCodeToolingSymbol[])[]) {
  const symbols = new Map<string, StudioCodeToolingSymbol>();
  for (const symbol of groups.flat()) symbols.set(symbol.id ?? symbol.name, symbol);
  return [...symbols.values()];
}

/** Project bounded dotted authoring metadata into tree members without changing its source identity. */
function normalizeDottedSymbols(symbols: readonly StudioCodeToolingSymbol[], depth = 1): StudioCodeToolingSymbol[] {
  if (depth > maximumLiquidValuePathSegments) return [];
  const groups = new Map<string, {
    direct?: StudioCodeToolingSymbol;
    nested: StudioCodeToolingSymbol[];
  }>();

  for (const symbol of symbols) {
    if (!canOwnMembers(symbol)) continue;
    const segments = boundedPathSegments(symbol.name, maximumLiquidValuePathSegments - depth + 1);
    if (!segments || (segments.length > 1 && !valueKinds.has(symbol.kind ?? ""))) continue;
    const [name, ...remaining] = segments;
    if (!name) continue;
    let group = groups.get(name);
    if (!group) {
      group = { nested: [] };
      groups.set(name, group);
    }
    if (remaining.length === 0) {
      group.direct = group.direct ? preferSymbolMetadata(group.direct, symbol) : symbol;
    } else {
      group.nested.push({
        ...symbol,
        name: remaining.join("."),
        kind: symbol.kind === "value" ? "member" : symbol.kind
      });
    }
  }

  return [...groups].map(([name, group]) => {
    const directChildren = group.direct?.children ?? [];
    const children = normalizeDottedSymbols([...directChildren, ...group.nested], depth + 1);
    const node = group.direct ?? {
      id: `liquid:dotted:${depth}:${name}`,
      name,
      kind: depth === 1 ? "namespace" : "member"
    };
    return { ...node, name, children };
  });
}

function boundedPathSegments(name: string, maximumSegments: number) {
  if (!name || name.length > 100_000 || maximumSegments < 1) return undefined;
  const segments: string[] = [];
  let start = 0;
  while (start <= name.length && segments.length < maximumSegments) {
    const separator = name.indexOf(".", start);
    const end = separator < 0 ? name.length : separator;
    const segment = name.slice(start, end);
    if (!segment) return undefined;
    segments.push(segment);
    if (separator < 0) return segments;
    start = separator + 1;
  }
  return undefined;
}

function canOwnMembers(symbol: StudioCodeToolingSymbol) {
  return symbol.kind !== "filter" && symbol.kind !== "tag";
}

function escapeMarkdownLabel(value: string) {
  return value.replace(/[\\`*_{}[\]()#+\-.!|>]/g, "\\$&");
}

/** Existing runtime shape facts win; flattened context metadata fills only missing fields. */
function mergeMembersByName(
  preferred: readonly StudioCodeToolingSymbol[],
  fallback: readonly StudioCodeToolingSymbol[],
  depth: number
) {
  const merged = new Map<string, StudioCodeToolingSymbol>();
  for (const symbol of preferred) merged.set(symbol.name, symbol);
  for (const symbol of fallback) {
    const existing = merged.get(symbol.name);
    if (!existing) {
      merged.set(symbol.name, symbol);
      continue;
    }
    const children = depth < maximumLiquidValuePathSegments
      ? mergeMembersByName(existing.children ?? [], symbol.children ?? [], depth + 1)
      : [];
    merged.set(symbol.name, preferSymbolMetadata(existing, symbol, children));
  }
  return [...merged.values()];
}

function preferSymbolMetadata(
  preferred: StudioCodeToolingSymbol,
  fallback: StudioCodeToolingSymbol,
  children: readonly StudioCodeToolingSymbol[] = [...(preferred.children ?? []), ...(fallback.children ?? [])]
) {
  return {
    ...fallback,
    ...preferred,
    id: preferred.id ?? fallback.id,
    name: preferred.name,
    kind: preferred.kind ?? fallback.kind,
    documentation: preferred.documentation ?? fallback.documentation,
    shapeId: preferred.shapeId ?? fallback.shapeId,
    signatures: preferred.signatures ?? fallback.signatures,
    sortText: preferred.sortText ?? fallback.sortText,
    children
  };
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
