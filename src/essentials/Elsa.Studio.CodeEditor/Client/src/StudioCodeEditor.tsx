import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType } from "react";
import { FallbackCodeEditor } from "./engines/FallbackCodeEditor";
import {
  expressionToolingAuthorizationRestoredEvent,
  getStudioCodeEditorSession,
  isStudioCodeEditorSessionRevoked,
  subscribeToStudioCodeEditorSessionRevocation
} from "./sessions/studioCodeEditorSessions";
import type { StudioCodeDiagnostic, StudioCodeEditorEngineProps, StudioCodeEditorProps } from "./types";
import type { StudioCodePreviewProps } from "./StudioCodePreview";
import { formatPreviewText } from "./previewText";

const StudioCodePreview = lazy<ComponentType<StudioCodePreviewProps>>(() => import("./StudioCodePreview").catch(() => ({
  default: ({ document }: StudioCodePreviewProps) => previewValue(document.value)
})));

let activeCompactSession: string | undefined;
const compactEditorSubscribers = new Set<(activeSession: string | undefined) => void>();

function activateCompactSession(session: string) {
  if (activeCompactSession === session) return;
  activeCompactSession = session;
  compactEditorSubscribers.forEach(notify => notify(session));
}

function releaseCompactSession(session: string) {
  if (activeCompactSession !== session) return;
  activeCompactSession = undefined;
  compactEditorSubscribers.forEach(notify => notify(undefined));
}

function subscribeToCompactSessions(notify: (activeSession: string | undefined) => void) {
  compactEditorSubscribers.add(notify);
  return () => {
    compactEditorSubscribers.delete(notify);
  };
}

export function StudioCodeEditor({
  document,
  profile = "expanded",
  sessionKey,
  session: suppliedSession,
  diagnostics = [],
  completions,
  completionProvider,
  hoverProvider,
  signatureProvider,
  readOnly = false,
  focusOnMount,
  theme = "studio",
  minHeight = "220px",
  ariaLabel,
  status,
  escapeDescription,
  languageAdapter,
  onChange,
  onFocus,
  onBlur,
  onExpand,
  onNewline
}: StudioCodeEditorProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const ownsFocus = useRef(false);
  const [compactActive, setCompactActive] = useState(profile === "expanded");
  const compactSession = sessionKey ?? document.uri;
  const [authorizationRevoked, setAuthorizationRevoked] = useState(
    () => isStudioCodeEditorSessionRevoked(compactSession)
  );
  const [authorizationGeneration, setAuthorizationGeneration] = useState(0);
  useEffect(
    () => subscribeToStudioCodeEditorSessionRevocation(scope => {
      if (!scope || compactSession.startsWith(`${scope}\u001f`)) setAuthorizationRevoked(true);
    }),
    [compactSession]
  );
  useEffect(() => {
    setAuthorizationRevoked(isStudioCodeEditorSessionRevoked(compactSession));
  }, [compactSession]);
  useEffect(() => {
    const restoreAuthorization = (event: Event) => {
      const scope = (event as CustomEvent<{ scope?: unknown }>).detail?.scope;
      if (typeof scope !== "string" || compactSession.startsWith(`${scope}\u001f`)) {
        setAuthorizationRevoked(false);
        setAuthorizationGeneration(generation => generation + 1);
      }
    };
    window.addEventListener(expressionToolingAuthorizationRestoredEvent, restoreAuthorization);
    return () => window.removeEventListener(expressionToolingAuthorizationRestoredEvent, restoreAuthorization);
  }, [compactSession]);
  useEffect(() => {
    if (profile !== "compact") return;
    return subscribeToCompactSessions(activeSession => setCompactActive(activeSession === compactSession));
  }, [compactSession, profile]);
  useEffect(() => () => releaseCompactSession(compactSession), [compactSession]);
  const visibleDiagnostics = diagnostics.filter(diagnostic => !diagnostic.uri || diagnostic.uri === document.uri);
  const languageLabel = languageAdapter?.displayName ?? document.language;
  const loadEditor = languageAdapter?.loadEditor;
  const RichCodeEditor = useMemo(() => loadEditor ? lazy(loadEditor) : null, [loadEditor]);
  void authorizationGeneration;
  const session = suppliedSession ?? getStudioCodeEditorSession(compactSession);
  const isCompactPreview = profile === "compact" && !compactActive;
  const observeFocusBoundary = () => {
    const section = sectionRef.current;
    queueMicrotask(() => {
      if (!section || section.contains(globalThis.document.activeElement) || !ownsFocus.current) return;
      ownsFocus.current = false;
      onBlur?.();
      if (profile === "compact") releaseCompactSession(compactSession);
    });
  };
  const engineProps: StudioCodeEditorEngineProps = {
    document,
    profile,
    session,
    readOnly,
    theme,
    minHeight,
    ariaLabel,
    autoFocus: profile === "compact" || focusOnMount === true,
    diagnostics: visibleDiagnostics,
    grammarProfile: languageAdapter?.grammarProfile,
    completions,
    completionProvider,
    hoverProvider,
    signatureProvider,
    loadFormatter: languageAdapter?.loadFormatter,
    onChange,
    onFocus: () => {
      ownsFocus.current = true;
      if (profile === "compact") activateCompactSession(compactSession);
      onFocus?.();
    },
    onBlur: observeFocusBoundary,
    onExpand,
    onNewline
  };
  const isMultilinePreview = isCompactPreview && document.value.includes("\n");
  const activatePreview = () => {
    if (isMultilinePreview && onExpand) {
      onExpand();
      return;
    }
    activateCompactSession(compactSession);
  };

  return (
    <section
      ref={sectionRef}
      className={`studio-code-editor studio-code-editor-${profile}`}
      data-studio-code-editor="true"
      data-language={document.language}
      data-profile={profile}
      data-theme={theme}
      data-readonly={readOnly}
      onBlurCapture={observeFocusBoundary}
    >
      {authorizationRevoked ? (
        <div className="studio-code-editor-status" role="status">
          Expression source is hidden because the authorization session changed.
        </div>
      ) : (
        <>
          {profile === "expanded" ? (
            <div className="studio-code-editor-header">
              <span>{languageLabel}</span>
              <code>{document.uri}</code>
            </div>
          ) : null}
          {isCompactPreview ? (
            <button
              type="button"
              className="studio-code-editor-preview"
              aria-label={`${ariaLabel}. Activate to edit.`}
              onClick={activatePreview}
              onFocus={() => {
                if (!isMultilinePreview) activateCompactSession(compactSession);
              }}
            >
              <code>
                <Suspense fallback={previewValue(document.value)}>
                  <StudioCodePreview document={document} sessionKey={compactSession} languageAdapter={languageAdapter} />
                </Suspense>
              </code>
              {isMultilinePreview ? <span aria-hidden="true">↗</span> : null}
            </button>
          ) : RichCodeEditor ? (
            <Suspense fallback={<FallbackCodeEditor {...engineProps} />}>
              <RichCodeEditor {...engineProps} />
            </Suspense>
          ) : (
            <FallbackCodeEditor {...engineProps} />
          )}
          {status ? <div className="studio-code-editor-status" role="status" aria-live="polite">{status}</div> : null}
          <div className="studio-code-editor-escape" aria-live="polite">
            {escapeDescription ?? defaultEscapeDescription(profile)}
          </div>
          <StudioCodeDiagnostics diagnostics={visibleDiagnostics} profile={profile} />
        </>
      )}
    </section>
  );
}

function StudioCodeDiagnostics({ diagnostics, profile }: { diagnostics: StudioCodeDiagnostic[]; profile: "compact" | "expanded" }) {
  if (diagnostics.length === 0) return null;
  const visible = profile === "compact" ? [highestPriorityDiagnostic(diagnostics)] : diagnostics;

  return (
    <div className="studio-code-editor-diagnostics" role="status" aria-live="polite">
      {visible.map((diagnostic, index) => {
        const severity = diagnostic.severity ?? "info";
        const location = formatLocation(diagnostic);
        return (
          <p
            className={`studio-code-editor-diagnostic ${severity}`}
            key={`${diagnostic.uri ?? "document"}-${diagnostic.code ?? "diagnostic"}-${index}`}
          >
            {diagnostic.code ? <span>{diagnostic.code}</span> : null}
            {location ? <small>{location}</small> : null}
            {diagnostic.message}
          </p>
        );
      })}
    </div>
  );
}

function previewValue(value: string) {
  return formatPreviewText(value) || "Expression";
}

function highestPriorityDiagnostic(diagnostics: StudioCodeDiagnostic[]) {
  return diagnostics.find(diagnostic => diagnostic.severity === "error") ??
    diagnostics.find(diagnostic => diagnostic.severity === "warning") ?? diagnostics[0]!;
}

function defaultEscapeDescription(profile: "compact" | "expanded") {
  return "Tab indents. Control Shift H shows hover help. Press Escape or Control M, then Tab, to move focus out" +
    (profile === "compact" ? ". Enter expands when a completion is not selected." : " of the editor.");
}

function formatLocation(diagnostic: StudioCodeDiagnostic) {
  if (!diagnostic.startLineNumber) return null;
  return diagnostic.startColumn
    ? `${diagnostic.startLineNumber}:${diagnostic.startColumn}`
    : String(diagnostic.startLineNumber);
}
