export type StudioCodeLiquidCursorRegion = "text" | "value" | "filter" | "tag" | "quiet";

/** Plain parser-position data. CodeMirror/Lezer objects are deliberately kept private. */
export interface StudioCodeLiquidCursorContext {
  region: StudioCodeLiquidCursorRegion;
  from: number;
  to: number;
  prefix: string;
  valuePath?: readonly string[];
}

export type StudioCodeLiquidCursorClassifier = (
  source: string,
  position: number
) => Promise<StudioCodeLiquidCursorContext>;

const maximumLiquidSourceLength = 100_000;
const maximumLiquidValuePathSegments = 4;

interface CursorSyntaxNode {
  name: string;
  from: number;
  to: number;
  parent: CursorSyntaxNode | null;
  firstChild: CursorSyntaxNode | null;
  nextSibling: CursorSyntaxNode | null;
  getChild(name: string): CursorSyntaxNode | null;
  enterUnfinishedNodesBefore(position: number): CursorSyntaxNode;
}

interface CursorSyntaxTree {
  resolve(position: number, side: number): CursorSyntaxNode;
  resolveInner(position: number, side: number): CursorSyntaxNode;
}

type LiquidParser = (source: string) => CursorSyntaxTree;

/** Creates a parser-position classifier with a single-source/tree cache. */
export function createLiquidCursorClassifier(): StudioCodeLiquidCursorClassifier {
  let parser: LiquidParser | undefined;
  let parserPromise: Promise<LiquidParser> | undefined;
  let cachedSource: string | undefined;
  let cachedTree: CursorSyntaxTree | undefined;

  return async (source, position) => {
    const pos = Math.max(0, Math.min(position, source.length));
    if (cachedSource !== source) {
      cachedSource = undefined;
      cachedTree = undefined;
    }
    if (source.length > maximumLiquidSourceLength) return quietCursor(pos);

    if (!parser) {
      parserPromise ??= import("./liquidCodeMirror").then(module => module.parseLiquidSource as LiquidParser);
      parser = await parserPromise;
    }

    if (cachedSource !== source || !cachedTree) {
      cachedSource = source;
      cachedTree = parser(source);
    }

    const outerNode = cachedTree.resolve(pos, -1);
    if (ancestorNodes(outerNode).some(candidate => isQuietNode(candidate.name))) return quietCursor(pos);

    const node = cachedTree.resolveInner(pos, -1).enterUnfinishedNodesBefore(pos);
    const ancestors = ancestorNodes(node);
    if (ancestors.some(candidate => isQuietNode(candidate.name))) return quietCursor(pos);
    if (ancestors.some(candidate => candidate.name === "SubscriptExpression")) return quietCursor(pos);

    const leaf = findActiveNameNode(node, pos, "FilterName");
    if (leaf) return tokenCursor("filter", source, pos, leaf.from, leaf.to);
    const emptyFilter = enclosingNode(node, "Filter");
    if (emptyFilter && positionAfterMarker(source, emptyFilter, pos, "|")) {
      return tokenCursor("filter", source, pos, activeTokenStart(source, emptyFilter.from, pos, "|"), pos);
    }

    const tag = enclosingNode(node, "Tag");
    const tagName = tag && parsedTagNameNode(tag);
    if (tagName && pos >= tagName.from && pos <= tagName.to) {
      return tokenCursor("tag", source, pos, tagName.from, tagName.to);
    }
    if (tag && !tagName && cursorIsTagNamePosition(source, tag, pos)) {
      return tokenCursor("tag", source, pos, tagNameInsertionStart(source, tag, pos), pos);
    }

    if (ancestors.some(candidate => candidate.name === "EndTag")) return quietCursor(pos);

    const value = findValueCursor(node, source, pos);
    if (value?.quiet) return quietCursor(pos);
    if (value || ancestors.some(candidate => candidate.name === "Interpolation" || candidate.name === "Tag")) {
      return {
        ...tokenCursor("value", source, pos, value?.from ?? pos, value?.to ?? pos),
        valuePath: value?.path
      };
    }

    return { region: "text", from: pos, to: pos, prefix: "" };
  };
}

function quietCursor(position: number): StudioCodeLiquidCursorContext {
  return { region: "quiet", from: position, to: position, prefix: "" };
}

function tokenCursor(
  region: Exclude<StudioCodeLiquidCursorRegion, "text" | "quiet" | "value"> | "value",
  source: string,
  position: number,
  from: number,
  to: number
): StudioCodeLiquidCursorContext {
  const boundedFrom = Math.max(0, Math.min(from, position));
  const boundedTo = Math.max(boundedFrom, Math.min(to, source.length));
  return { region, from: boundedFrom, to: boundedTo, prefix: source.slice(boundedFrom, position) };
}

function ancestorNodes(node: CursorSyntaxNode) {
  const nodes: CursorSyntaxNode[] = [];
  for (let current: CursorSyntaxNode | null = node; current; current = current.parent) nodes.push(current);
  return nodes;
}

function isQuietNode(name: string) {
  return name === "StringLiteral" || name === "InlineComment" || name === "RawText" || name === "CommentText" ||
    name === "RawDirective" || name === "Comment";
}

function findActiveNameNode(node: CursorSyntaxNode, position: number, name: "TagName" | "FilterName") {
  for (let current: CursorSyntaxNode | null = node; current; current = current.parent) {
    if (current.name === name && position >= current.from && position <= current.to) return current;
  }
  return undefined;
}

function enclosingNode(node: CursorSyntaxNode, name: string) {
  for (let current: CursorSyntaxNode | null = node; current; current = current.parent) if (current.name === name) return current;
  return undefined;
}

function positionAfterMarker(source: string, node: CursorSyntaxNode, position: number, marker: string) {
  const markerNode = node.getChild(marker);
  return markerNode && position >= markerNode.to;
}

function parsedTagNameNode(tag: CursorSyntaxNode) {
  const named = tag.getChild("TagName");
  if (named) return named;

  const opener = tag.getChild("{%");
  if (!opener) return undefined;
  for (let child = tag.firstChild; child; child = child.nextSibling) {
    if (child.name === "{%" || child.from < opener.to) continue;
    return child.name === "%}" || child.name === "⚠" ? undefined : child;
  }
  return undefined;
}

function cursorIsTagNamePosition(source: string, tag: CursorSyntaxNode, position: number) {
  const opener = tag.getChild("{%");
  if (!opener || position < opener.to) return false;
  const closer = tag.getChild("%}");
  if (closer && position > closer.from) return false;
  return source.slice(opener.to, position).trim().length === 0;
}

function tagNameInsertionStart(source: string, tag: CursorSyntaxNode, position: number) {
  let from = tag.getChild("{%")?.to ?? tag.from;
  while (from < position && /\s/.test(source[from]!)) from++;
  return from;
}

function activeTokenStart(source: string, nodeFrom: number, position: number, marker: string) {
  const markerEnd = source.indexOf(marker, nodeFrom);
  let from = markerEnd < 0 ? position : markerEnd + marker.length;
  while (from < position && /\s/.test(source[from]!)) from++;
  return from;
}

function findValueCursor(node: CursorSyntaxNode, source: string, position: number) {
  for (let current: CursorSyntaxNode | null = node; current; current = current.parent) {
    if ((current.name === "VariableName" || current.name === "PropertyName") &&
        position >= current.from && position <= current.to) {
      const path = valuePathAt(current, source);
      return { from: current.from, to: current.to, path, quiet: !path };
    }
    if (current.name === "MemberExpression" && position >= current.from && position <= current.to) {
      const activeChild = childAtPosition(current, position);
      if (activeChild?.name === "VariableName" || activeChild?.name === "PropertyName") {
        const path = valuePathAt(activeChild, source);
        return { from: activeChild.from, to: activeChild.to, path, quiet: !path };
      }
      if (activeChild?.name === "." || activeChild?.name === "⚠" || !activeChild) {
        const base = firstExpressionChild(current);
        const path = base ? expressionPath(base, source) : undefined;
        if (!path || path.length >= maximumLiquidValuePathSegments) return { from: position, to: position, quiet: true };
        return { from: position, to: position, path: [...path, ""] };
      }
      return { from: position, to: position, quiet: true };
    }
  }
  return undefined;
}

function childAtPosition(node: CursorSyntaxNode, position: number) {
  for (let child = node.firstChild; child; child = child.nextSibling) {
    if (position >= child.from && position <= child.to) return child;
  }
  return undefined;
}

function valuePathAt(node: CursorSyntaxNode, source: string): string[] | undefined {
  if (node.name === "VariableName") return [source.slice(node.from, node.to)];
  if (node.name !== "PropertyName") return undefined;
  const member = node.parent;
  if (member?.name !== "MemberExpression") return undefined;
  const base = firstExpressionChild(member);
  const prefix = base ? expressionPath(base, source) : undefined;
  return prefix && prefix.length < maximumLiquidValuePathSegments
    ? [...prefix, source.slice(node.from, node.to)]
    : undefined;
}

function firstExpressionChild(node: CursorSyntaxNode) {
  for (let child = node.firstChild; child; child = child.nextSibling) {
    if (child.name === "VariableName" || child.name === "MemberExpression") return child;
  }
  return undefined;
}

function expressionPath(node: CursorSyntaxNode, source: string): string[] | undefined {
  const reversedSegments: string[] = [];
  let current: CursorSyntaxNode | undefined = node;
  while (current) {
    if (current.name === "VariableName") {
      reversedSegments.push(source.slice(current.from, current.to));
      break;
    }
    if (current.name !== "MemberExpression") return undefined;
    const property = current.getChild("PropertyName");
    const base = firstExpressionChild(current);
    if (!property || !base || reversedSegments.length >= maximumLiquidValuePathSegments) return undefined;
    reversedSegments.push(source.slice(property.from, property.to));
    current = base;
  }
  if (current?.name !== "VariableName" || reversedSegments.length > maximumLiquidValuePathSegments) return undefined;
  return reversedSegments.reverse();
}
