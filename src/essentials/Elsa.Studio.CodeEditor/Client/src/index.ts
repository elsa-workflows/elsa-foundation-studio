import "./styles.css";

export { StudioCodeEditor } from "./StudioCodeEditor";
export { javaScriptLanguageAdapter } from "./languages/javascript";
export { liquidLanguageAdapter } from "./languages/liquid";
export {
  clearAllStudioCodeEditorSessions,
  clearStudioCodeEditorSessionScope,
  isStudioCodeEditorSessionRevoked,
  subscribeToStudioCodeEditorSessionRevocation,
  clearStudioCodeEditorSession,
  createStudioCodeEditorSession,
  getStudioCodeEditorSession
} from "./sessions/studioCodeEditorSessions";
export {
  createStudioCodeToolingProjection,
  projectStudioCodeDiagnostics,
  projectStudioCodeToolingSignature
} from "./toolingProjection";
export { createLiquidCursorClassifier } from "./languages/liquidCursor";
export { createJavaScriptCallSignatureClassifier } from "./languages/javascriptCallSignature";
export type {
  StudioCodeLiquidCursorClassifier,
  StudioCodeLiquidCursorContext,
  StudioCodeLiquidCursorRegion
} from "./languages/liquidCursor";
export type {
  StudioCodeToolingAuthoringContext,
  StudioCodeToolingCatalogClient,
  StudioCodeToolingCatalogPage,
  StudioCodeToolingCompletionItem,
  StudioCodeToolingDiagnostic,
  StudioCodeToolingDocument,
  StudioCodeToolingLanguageProjection,
  StudioCodeToolingProjectionOptions,
  StudioCodeToolingResult,
  StudioCodeToolingSignature,
  StudioCodeToolingSignatureContext,
  StudioCodeToolingSymbol
} from "./toolingProjection";
export type {
  StudioCodeCompletion,
  StudioCodeCompletionProvider,
  StudioCodeCompletionRequest,
  StudioCodeDiagnostic,
  StudioCodeDiagnosticSeverity,
  StudioCodeDocument,
  StudioCodeDocumentation,
  StudioCodeEditorAction,
  StudioCodeEditorProfile,
  StudioCodeEditorProps,
  StudioCodeEditorSession,
  StudioCodeFormatEdit,
  StudioCodeFormatRequest,
  StudioCodeFormatResult,
  StudioCodeFormatter,
  StudioCodeGrammarProfile,
  StudioCodeHover,
  StudioCodeHoverProvider,
  StudioCodeLanguageAdapter,
  StudioCodeLanguageSupport,
  StudioCodePreviewHighlighter,
  StudioCodeSignature,
  StudioCodeSignatureInfo,
  StudioCodeSignatureParameter,
  StudioCodeSignatureProvider,
  StudioCodeSelectionSet,
  StudioCodeSyntaxKind,
  StudioCodeSyntaxSpan
} from "./types";
