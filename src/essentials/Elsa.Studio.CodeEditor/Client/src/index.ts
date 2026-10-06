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
  projectStudioCodeDiagnostics
} from "./toolingProjection";
export { createLiquidCursorClassifier } from "./languages/liquidCursor";
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
