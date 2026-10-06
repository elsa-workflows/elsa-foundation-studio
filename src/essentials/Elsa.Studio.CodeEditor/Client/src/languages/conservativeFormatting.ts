export const maximumFormatterSourceLength = 100_000;

const maximumSyntaxNodeCount = 20_000;
const maximumSyntaxDepth = 256;
const maximumFormatterEditCount = 10_000;

interface FormattingCursor {
  readonly name: string;
  readonly from: number;
  readonly to: number;
  readonly type: { readonly isError: boolean };
  firstChild(): boolean;
  nextSibling(): boolean;
  parent(): boolean;
}

interface FormattingTree {
  cursor(): FormattingCursor;
}

interface FormattingToken {
  readonly name: string;
  readonly from: number;
  readonly to: number;
  readonly scopeId?: number;
  readonly opaque: boolean;
  readonly spacingBoundary: boolean;
}

export interface FormattingTreeSnapshot {
  readonly rootName: string;
  readonly identity: string;
  readonly nodeNames: ReadonlySet<string>;
  readonly tokens: readonly FormattingToken[];
}

export interface FormattingEdit {
  readonly from: number;
  readonly to: number;
  readonly insert: string;
}

export function inspectFormattingTree(
  tree: FormattingTree,
  source: string,
  options: {
    scopeNodeNames?: ReadonlySet<string>;
    opaqueNodeNames?: ReadonlySet<string>;
    spacingNodeNamesByParent?: ReadonlyMap<string, ReadonlySet<string>>;
  } = {}
): FormattingTreeSnapshot | undefined {
  const cursor = tree.cursor();
  const rootName = cursor.name;
  const names = new Set<string>();
  const tokens: FormattingToken[] = [];
  const identity: string[] = [];
  let nodeCount = 0;
  let nextScopeId = 0;

  const visit = (scopeId: number | undefined, opaque: boolean, parentName: string | undefined, depth: number): boolean => {
    if (++nodeCount > maximumSyntaxNodeCount || depth > maximumSyntaxDepth || cursor.type.isError) return false;

    const name = cursor.name;
    const from = cursor.from;
    const to = cursor.to;
    if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to < from || to > source.length) return false;
    names.add(name);

    const currentScopeId = options.scopeNodeNames?.has(name) ? nextScopeId++ : scopeId;
    const currentOpaque = opaque || options.opaqueNodeNames?.has(name) === true;

    identity.push(`(${JSON.stringify(name)}`);
    if (options.opaqueNodeNames?.has(name)) identity.push(JSON.stringify(source.slice(from, to)));
    if (cursor.firstChild()) {
      do {
        if (!visit(currentScopeId, currentOpaque, name, depth + 1)) return false;
      } while (cursor.nextSibling());
      cursor.parent();
    } else {
      const spacingBoundary = parentName !== undefined &&
        options.spacingNodeNamesByParent?.get(parentName)?.has(name) === true;
      tokens.push({ name, from, to, scopeId: currentScopeId, opaque: currentOpaque, spacingBoundary });
      identity.push(JSON.stringify(source.slice(from, to)));
    }
    identity.push(")");
    return true;
  };

  if (!visit(undefined, false, undefined, 0)) return undefined;
  return { rootName, identity: identity.join(""), nodeNames: names, tokens };
}

export function normalizeHorizontalGaps(
  source: string,
  tokens: readonly FormattingToken[],
  requireSameScope = false,
  collapseExistingGaps = true
): readonly FormattingEdit[] | undefined {
  const edits: FormattingEdit[] = [];

  for (let index = 1; index < tokens.length; index++) {
    const previous = tokens[index - 1]!;
    const next = tokens[index]!;
    if (requireSameScope && (previous.scopeId === undefined || previous.scopeId !== next.scopeId)) continue;
    if (previous.opaque || next.opaque) continue;

    const from = previous.to;
    const to = next.from;
    if (to < from) return undefined;

    const gap = source.slice(from, to);
    const mustSeparate = previous.spacingBoundary || next.spacingBoundary;
    if (!(mustSeparate ? /^[\t ]*$/.test(gap) : collapseExistingGaps && /^[\t ]+$/.test(gap)) || gap === " ") continue;
    edits.push({ from, to, insert: " " });
    if (edits.length > maximumFormatterEditCount) return undefined;
  }

  return edits;
}

export function applyFormattingEdits(
  source: string,
  edits: readonly FormattingEdit[]
): string | undefined {
  let formatted = source;
  let precedingFrom = source.length + 1;

  for (let index = edits.length - 1; index >= 0; index--) {
    const edit = edits[index]!;
    if (!Number.isInteger(edit.from) || !Number.isInteger(edit.to) || edit.from < 0 || edit.to < edit.from ||
        edit.to > source.length || edit.to > precedingFrom || splitsSurrogatePair(source, edit.from) ||
        splitsSurrogatePair(source, edit.to)) return undefined;
    precedingFrom = edit.from;
    formatted = formatted.slice(0, edit.from) + edit.insert + formatted.slice(edit.to);
  }

  if (formatted.length > maximumFormatterSourceLength) return undefined;
  return formatted;
}

function splitsSurrogatePair(source: string, position: number) {
  if (position <= 0 || position >= source.length) return false;
  const before = source.charCodeAt(position - 1);
  const after = source.charCodeAt(position);
  return before >= 0xd800 && before <= 0xdbff && after >= 0xdc00 && after <= 0xdfff;
}
