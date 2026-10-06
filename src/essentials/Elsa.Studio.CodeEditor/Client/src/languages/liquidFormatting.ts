import { parseLiquidSource } from "./liquidCodeMirror";
import {
  applyFormattingEdits,
  inspectFormattingTree,
  maximumFormatterSourceLength,
  normalizeHorizontalGaps
} from "./conservativeFormatting";
import type { StudioCodeFormatRequest, StudioCodeFormatResult } from "../types";

const allowedLiquidNodeNames = new Set([
  "Template", "Text", "Interpolation", "{{", "}}",
  "VariableName", "MemberExpression", ".", "PropertyName", "SubscriptExpression",
  "BinaryExpression", "contains", "CompareOp", "LogicOp", "AssignmentExpression", "AssignOp",
  "(", ")", "RangeExpression", "..", "BooleanLiteral", "empty", "forloop", "tablerowloop",
  "continue", "StringLiteral", "NumberLiteral", "Filter", "|", "FilterName", ":", ","
]);

const liquidSpacingNodes = new Map([ ["Filter", new Set(["|"])] ]);
const liquidInterpolationScopeNodes = new Set(["Interpolation"]);

export function formatLiquid(_request: StudioCodeFormatRequest): StudioCodeFormatResult {
  const { document, grammarProfile, signal } = _request;
  const source = document.value;
  if (signal.aborted || document.language !== "liquid" || source.length > maximumFormatterSourceLength ||
      (grammarProfile !== "expression" && grammarProfile !== "program")) return { state: "unsupported" };

  try {
    const beforeTree = parseLiquidSource(source);
    const before = inspectFormattingTree(beforeTree, source, {
      scopeNodeNames: liquidInterpolationScopeNodes,
      spacingNodeNamesByParent: liquidSpacingNodes
    });
    if (!before || before.rootName !== "Template" ||
        [...before.nodeNames].some(name => !allowedLiquidNodeNames.has(name)) || signal.aborted) {
      return { state: "unsupported" };
    }

    const edits = normalizeHorizontalGaps(source, before.tokens, true, false);
    if (!edits) return { state: "unsupported" };
    const formatted = applyFormattingEdits(source, edits);
    if (formatted === undefined || signal.aborted) return { state: "unsupported" };

    const afterTree = parseLiquidSource(formatted);
    const after = inspectFormattingTree(afterTree, formatted, {
      scopeNodeNames: liquidInterpolationScopeNodes,
      spacingNodeNamesByParent: liquidSpacingNodes
    });
    if (!after || after.rootName !== "Template" || after.identity !== before.identity ||
        [...after.nodeNames].some(name => !allowedLiquidNodeNames.has(name)) || signal.aborted) {
      return { state: "unsupported" };
    }

    return { state: "ready", edits };
  } catch {
    return { state: "unsupported" };
  }
}
