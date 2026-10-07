import { javascriptLanguage } from "@codemirror/lang-javascript";
import { createJavaScriptCodeMirrorLanguageSupport } from "./javascriptCodeMirror";
import {
  applyFormattingEdits,
  inspectFormattingTree,
  maximumFormatterSourceLength,
  normalizeHorizontalGaps
} from "./conservativeFormatting";
import type { StudioCodeFormatRequest, StudioCodeFormatResult } from "../types";

const opaqueJavaScriptNodes = new Set(["TemplateString"]);
const binaryOperatorNodes = new Set(["ArithOp", "BitOp", "CompareOp", "LogicOp", "in", "instanceof"]);
const javascriptSpacingNodes = new Map([["BinaryExpression", binaryOperatorNodes]]);
const nonRuntimeProgramNode = /^(?:JSX|Type|Interface|Enum|Namespace)|Type$|^(?:declare|abstract|public|private|protected|readonly|implements|ImportDeclaration|ExportDeclaration|ExportDefaultDeclaration)$/;

export function formatJavaScript(request: StudioCodeFormatRequest): StudioCodeFormatResult {
  const { document, grammarProfile, signal } = request;
  const source = document.value;
  if (signal.aborted || document.language !== "javascript" || source.length > maximumFormatterSourceLength ||
      (grammarProfile !== "expression" && grammarProfile !== "program")) return { state: "unsupported" };

  try {
    const parser = createJavaScriptCodeMirrorLanguageSupport(grammarProfile).language.parser;
    // The legacy program editor admits JSX/TypeScript for authoring, but the registered
    // JavaScript runtime does not. A formatter must not claim that broader grammar is safe.
    if (grammarProfile === "program" && !inspectFormattingTree(javascriptLanguage.parser.parse(source), source)) {
      return { state: "unsupported" };
    }
    const before = inspectFormattingTree(parser.parse(source), source, {
      opaqueNodeNames: opaqueJavaScriptNodes,
      spacingNodeNamesByParent: javascriptSpacingNodes
    });
    const expectedRoot = grammarProfile === "expression" ? "SingleExpression" : "Script";
    if (!before || before.rootName !== expectedRoot || signal.aborted ||
        (grammarProfile === "program" && [...before.nodeNames].some(name => nonRuntimeProgramNode.test(name)))) {
      return { state: "unsupported" };
    }

    const edits = normalizeHorizontalGaps(source, before.tokens);
    if (!edits) return { state: "unsupported" };
    const formatted = applyFormattingEdits(source, edits);
    if (formatted === undefined || signal.aborted) return { state: "unsupported" };

    const after = inspectFormattingTree(parser.parse(formatted), formatted, {
      opaqueNodeNames: opaqueJavaScriptNodes,
      spacingNodeNamesByParent: javascriptSpacingNodes
    });
    if (!after || after.rootName !== expectedRoot || after.identity !== before.identity || signal.aborted) {
      return { state: "unsupported" };
    }

    return { state: "ready", edits };
  } catch {
    return { state: "unsupported" };
  }
}
