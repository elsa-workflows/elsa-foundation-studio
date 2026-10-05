import type { ComponentType } from "react";

export interface StudioCodeDocument {
  /** A stable identity for the persisted expression or file. */
  uri: string;
  language: string;
  value: string;
  /** Incremented by the host when it replaces the persisted source. */
  version?: string | number;
}

export type StudioCodeEditorProfile = "compact" | "expanded";
/** Internal parser/completion mode selected by a language adapter, not source metadata. */
export type StudioCodeGrammarProfile = "program" | "expression";
/** Closed semantic foreground vocabulary shared by rich and static code surfaces. */
export type StudioCodeSyntaxKind =
  | "keyword"
  | "operator"
  | "literal"
  | "number"
  | "string"
  | "comment"
  | "variable"
  | "property"
  | "function"
  | "type"
  | "tag";

/** A source range and semantic style only; parser nodes and source text stay inside CodeEditor. */
export interface StudioCodeSyntaxSpan {
  readonly from: number;
  readonly to: number;
  readonly kind: StudioCodeSyntaxKind;
}

export type StudioCodePreviewHighlighter = (
  source: string,
  signal: AbortSignal
) => readonly StudioCodeSyntaxSpan[] | Promise<readonly StudioCodeSyntaxSpan[]>;
export type StudioCodeDiagnosticSeverity = "info" | "warning" | "error";

export interface StudioCodeDiagnostic {
  uri?: string;
  severity?: StudioCodeDiagnosticSeverity;
  code?: string;
  message: string;
  startLineNumber?: number;
  startColumn?: number;
  endLineNumber?: number;
  endColumn?: number;
}

export interface StudioCodeDocumentation {
  /** Plain text or Markdown. Raw HTML is never rendered. */
  markdown: string;
}

export interface StudioCodeCompletion {
  label: string;
  detail?: string;
  kind?: "function" | "method" | "property" | "variable" | "keyword" | "filter" | "tag" | "value";
  apply?: string;
  /** Optional parser-derived replacement range; defaults to the engine's normal word range. */
  range?: { from: number; to: number };
  /** Applies `apply` using the editor engine's snippet/tab-stop support. */
  snippet?: boolean;
  documentation?: StudioCodeDocumentation;
  /** Higher values are suggested before otherwise equivalent entries. */
  boost?: number;
}

export interface StudioCodeCompletionRequest {
  document: StudioCodeDocument;
  position: number;
  explicit: boolean;
  signal: AbortSignal;
}

export type StudioCodeCompletionProvider = (
  request: StudioCodeCompletionRequest
) => StudioCodeCompletion[] | null | Promise<StudioCodeCompletion[] | null>;

export interface StudioCodeHover {
  range?: { from: number; to: number };
  documentation: StudioCodeDocumentation;
}

export type StudioCodeHoverProvider = (
  document: StudioCodeDocument,
  position: number,
  signal: AbortSignal
) => StudioCodeHover | null | Promise<StudioCodeHover | null>;

export interface StudioCodeSignatureParameter {
  name: string;
  documentation?: string;
  shapeId?: string;
  optional?: boolean;
}

export interface StudioCodeSignature {
  label: string;
  parameters?: readonly StudioCodeSignatureParameter[];
  returnShapeId?: string;
  documentation?: StudioCodeDocumentation;
}

export type StudioCodeSignatureProvider = (
  document: StudioCodeDocument,
  position: number,
  signal: AbortSignal
) => StudioCodeSignature | null | Promise<StudioCodeSignature | null>;

/**
 * An opaque, memory-only session. Its engine state deliberately isn't part of
 * the public contract so consumers can never depend on CodeMirror or Monaco.
 */
export interface StudioCodeEditorSession {
  readonly id: string;
}

export interface StudioCodeLanguageSupport {
  readonly language: string;
}

export interface StudioCodeEditorEngineProps {
  document: StudioCodeDocument;
  profile: StudioCodeEditorProfile;
  session: StudioCodeEditorSession;
  readOnly: boolean;
  theme: "studio" | "light" | "dark";
  minHeight: string;
  ariaLabel: string;
  autoFocus?: boolean;
  diagnostics: StudioCodeDiagnostic[];
  grammarProfile?: StudioCodeGrammarProfile;
  completions?: StudioCodeCompletion[];
  completionProvider?: StudioCodeCompletionProvider;
  hoverProvider?: StudioCodeHoverProvider;
  signatureProvider?: StudioCodeSignatureProvider;
  onChange(document: StudioCodeDocument): void;
  onFocus?(): void;
  onBlur?(): void;
  onExpand?(): void;
  onNewline?(): void;
}

export type StudioCodeEditorLoader = () => Promise<{ default: ComponentType<StudioCodeEditorEngineProps> }>;

export interface StudioCodeLanguageAdapter {
  language: string;
  displayName: string;
  grammarProfile?: StudioCodeGrammarProfile;
  loadSupport?(): Promise<StudioCodeLanguageSupport>;
  /** Loads parser-only support for an unfocused preview without creating an editor state or view. */
  loadPreviewHighlighter?(grammarProfile?: StudioCodeGrammarProfile): Promise<StudioCodePreviewHighlighter>;
  loadEditor?: StudioCodeEditorLoader;
}

export type StudioCodeEditorAction = "save" | "format" | string;

export interface StudioCodeEditorProps {
  document: StudioCodeDocument;
  /** Expanded is the existing full-editor behavior; compact activates on focus. */
  profile?: StudioCodeEditorProfile;
  /** A stable draft/activity/property/type identity used to restore an editor session. */
  sessionKey?: string;
  session?: StudioCodeEditorSession;
  diagnostics?: StudioCodeDiagnostic[];
  completions?: StudioCodeCompletion[];
  completionProvider?: StudioCodeCompletionProvider;
  hoverProvider?: StudioCodeHoverProvider;
  signatureProvider?: StudioCodeSignatureProvider;
  readOnly?: boolean;
  /** Focuses the rich surface after it mounts (for example, an expanded modal opened from a field). */
  focusOnMount?: boolean;
  theme?: "studio" | "light" | "dark";
  minHeight?: string;
  ariaLabel: string;
  /** Announced without exposing source or tooling payloads. */
  status?: string;
  /** Describes the compact/expanded Tab escape route to assistive technology. */
  escapeDescription?: string;
  languageAdapter?: StudioCodeLanguageAdapter;
  onChange(document: StudioCodeDocument): void;
  onFocus?(): void;
  onBlur?(): void;
  onExpand?(): void;
  onNewline?(): void;
  onAction?(action: StudioCodeEditorAction, document: StudioCodeDocument): void;
}
