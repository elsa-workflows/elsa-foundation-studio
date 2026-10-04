import { useEffect, useMemo, useRef, useState } from "react";
import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import type {
  ActivityDefinitionVersionManagementView,
  ActivityDefinitionVersionView,
  RecommendedActivityDefinition
} from "../activityDefinitionTypes";
import type { ActivityNode, WorkflowDraft } from "../workflowTypes";
import {
  useActivityDefinitionVersions,
  useFullActivityDefinitionVersion
} from "../api/activityDesign";
import { useActivityVersionDiff } from "../api/activityVersionChange";
import {
  analyzeActivityVersionChange,
  collectActivityOccurrences,
  createActivityVersionChangePrecondition,
  type ActivityVersionChangePrecondition,
  type ActivityVersionChangeScope
} from "./activityVersionChangeModel";
import { DialogDisclosure } from "./DialogDisclosure";
import { useDialogFocus } from "./useDialogFocus";
import versionChangeStylesUrl from "./ActivityVersionChangeDialog.css?url&no-inline";

const versionChangeStylesHref = import.meta.env.PROD && versionChangeStylesUrl.startsWith("/")
  ? new URL(versionChangeStylesUrl.slice(1), import.meta.url).href
  : versionChangeStylesUrl;

export interface ActivityVersionChangeApplyRequest {
  precondition: ActivityVersionChangePrecondition;
  targetVersionId: string;
  scope: ActivityVersionChangeScope;
}

export function ActivityVersionChangeDialog({
  context,
  draft,
  occurrence,
  current,
  recommendation,
  onApply,
  onCancel
}: {
  context: StudioEndpointContext;
  draft: WorkflowDraft;
  occurrence: ActivityNode;
  current: ActivityDefinitionVersionView;
  recommendation?: RecommendedActivityDefinition | null;
  onApply(request: ActivityVersionChangeApplyRequest): Promise<void>;
  onCancel(): void;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [cursorHistory, setCursorHistory] = useState<Array<string | null>>([]);
  const [targetVersionId, setTargetVersionId] = useState<string | null>(null);
  const [scope, setScope] = useState<ActivityVersionChangeScope>("occurrence");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [precondition] = useState(() => createActivityVersionChangePrecondition(draft, occurrence));
  const versions = useActivityDefinitionVersions(context, {
    definitionId: current.definition.definitionId,
    limit: 25,
    cursor
  });
  const activeTargets = useMemo(
    () => (versions.data?.items ?? []).filter(item =>
      item.version.versionId !== current.versionId
      && item.version.lifecycle.toLowerCase() === "active"),
    [current.versionId, versions.data?.items]
  );
  const target = useFullActivityDefinitionVersion(context, targetVersionId);
  const diff = useActivityVersionDiff(context, current.versionId, targetVersionId);
  const evidenceMatches = Boolean(target.data && diff.data
    && target.data.versionId === targetVersionId
    && diff.data.from.versionId === current.versionId
    && diff.data.to.versionId === target.data.versionId);
  const impact = target.data && diff.data && evidenceMatches
    ? analyzeActivityVersionChange(draft, occurrence, current, target.data, diff.data, scope)
    : null;

  useDialogFocus(dialogRef, busy ? null : onCancel);

  useEffect(() => {
    if (targetVersionId && activeTargets.some(item => item.version.versionId === targetVersionId)) return;
    const preferred = activeTargets.find(item => item.version.versionId === recommendation?.versionId)
      ?? activeTargets[0];
    setTargetVersionId(preferred?.version.versionId ?? null);
  }, [activeTargets, recommendation?.versionId, targetVersionId]);

  const matchingCount = useMemo(
    () => collectActivityOccurrences(draft.state.rootActivity, occurrence.activityVersionId).length,
    [draft.state.rootActivity, occurrence.activityVersionId]
  );
  const breakingChanges = diff.data?.changes.filter(change => change.impact.toLowerCase() === "breaking") ?? [];
  const contractChanges = diff.data?.changes.filter(change => change.area.toLowerCase() === "contract") ?? [];
  const needsReview = Boolean(diff.data && (diff.data.summary.breaking > 0 || diff.data.compatibility.toLowerCase() === "breaking"));
  const scopeLabel = scope === "occurrence" ? "This node only" : `${matchingCount} matching nodes`;

  const canApply = Boolean(
    evidenceMatches
    && !versions.isPending && !versions.isError
    && !target.isPending && !target.isError
    && !diff.isPending && !diff.isError
    && activeTargets.some(item => item.version.versionId === targetVersionId)
    && impact?.occurrenceIds.length
  );

  return (<>
    <link rel="stylesheet" href={versionChangeStylesHref} />
    <div className="wf-dialog-backdrop" role="presentation">
      <section
        ref={dialogRef}
        className="wf-dialog wf-version-change-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="activity-version-change-title"
        tabIndex={-1}
      >
        <form onSubmit={event => {
          event.preventDefault();
          if (!targetVersionId || !canApply) return;
          setBusy(true);
          setError("");
          void onApply({ precondition, targetVersionId, scope })
            .catch(cause => setError(cause instanceof Error ? cause.message : String(cause)))
            .finally(() => setBusy(false));
        }}>
          <header className="wf-dialog-heading">
            <div>
              <h3 id="activity-version-change-title">Change activity version</h3>
              <p>{current.definition.displayName} <span aria-hidden="true">·</span> Current v{current.version}</p>
            </div>
          </header>

          <div className="wf-version-change-content">
            <fieldset className="wf-version-targets" disabled={busy || versions.isPending}>
              <legend>Target version</legend>
              {activeTargets.length ? activeTargets.map(item => (
                <VersionChoice
                  key={item.version.versionId}
                  item={item}
                  checked={targetVersionId === item.version.versionId}
                  recommended={item.version.versionId === recommendation?.versionId}
                  onChange={() => setTargetVersionId(item.version.versionId)}
                />
              )) : (
                <p className="wf-muted" role="status">{versions.isPending ? "Loading versions…" : "No other active version is available."}</p>
              )}
              {cursorHistory.length > 0 || versions.data?.continuation ? (
                <div className="wf-version-page-actions">
                  <button type="button" disabled={busy || cursorHistory.length === 0} onClick={() => {
                    const previous = cursorHistory[cursorHistory.length - 1] ?? null;
                    setCursorHistory(history => history.slice(0, -1));
                    setCursor(previous);
                  }}>Previous versions</button>
                  <button type="button" disabled={busy || !versions.data?.continuation} onClick={() => {
                    setCursorHistory(history => [...history, cursor]);
                    setCursor(versions.data?.continuation ?? null);
                  }}>More versions</button>
                </div>
              ) : null}
            </fieldset>

            {targetVersionId && (diff.isPending || target.isPending) ? <p role="status">Checking changes…</p> : null}
            {diff.data && impact ? (
              <section className={`wf-version-summary${["compatible", "identical"].includes(diff.data.compatibility.toLowerCase()) && !needsReview ? " is-compatible" : ""}`} aria-label="Change summary">
                <strong>{needsReview ? "Breaking changes" : diff.data.compatibility}</strong>
                {(needsReview ? breakingChanges : contractChanges).length ? (
                  <ul>{(needsReview ? breakingChanges : contractChanges.slice(0, 3)).map(change => <li key={change.changeId}>{change.message}</li>)}</ul>
                ) : <p>{diff.data.behaviorChanged ? "Activity implementation updated." : "No public-contract changes."}</p>}
                {!needsReview && contractChanges.length > 3 ? <p>{contractChanges.length - 3} more changes in Change details.</p> : null}
                {impact.unresolvedBindingKeys.length > 0 || impact.unresolvedOutcomeKeys.length > 0 ? (
                  <div className="wf-version-unresolved" role="alert">
                    <strong>Review after applying</strong>
                    {impact.unresolvedBindingKeys.length > 0 ? <p>Inputs needing attention: {impact.unresolvedBindingKeys.join(", ")}</p> : null}
                    {impact.unresolvedOutcomeKeys.length > 0 ? <p>Connections needing attention: {impact.unresolvedOutcomeKeys.join(", ")}</p> : null}
                    <p>These bindings and connections are kept unresolved.</p>
                  </div>
                ) : null}
                {diff.data.diagnostics.length > 0 ? <ul>{diff.data.diagnostics.map((diagnostic, index) => <li key={`${diagnostic.code ?? "diagnostic"}-${index}`}>{diagnostic.message ?? diagnostic.code}</li>)}</ul> : null}
              </section>
            ) : null}

            {matchingCount > 1 ? (
              <DialogDisclosure className="wf-version-disclosure" title="Apply scope" hint={scopeLabel}>
                <fieldset disabled={busy}>
                  <legend>Apply to</legend>
                  <p className="wf-muted">Nodes using the same exact version in this draft.</p>
                  <label><input type="radio" name="version-change-scope" checked={scope === "occurrence"} onChange={() => setScope("occurrence")} /> This node only</label>
                  <label><input type="radio" name="version-change-scope" checked={scope === "matching"} onChange={() => setScope("matching")} /> All matching nodes ({matchingCount})</label>
                </fieldset>
              </DialogDisclosure>
            ) : null}

            <DialogDisclosure className="wf-version-disclosure" title="Change details">
              {diff.data && impact ? (
                <>
                  <section className="wf-version-change-section" aria-labelledby="version-compatibility-title">
                    <h4 id="version-compatibility-title">Compatibility</h4>
                    <dl>
                      <div><dt>Result</dt><dd>{diff.data.compatibility}</dd></div>
                      <div><dt>Required bump</dt><dd>{diff.data.requiredBump}</dd></div>
                      <div><dt>Behavior changed</dt><dd>{diff.data.behaviorChanged ? "Yes" : "No"}</dd></div>
                      <div><dt>Contract changes</dt><dd>{diff.data.summary.breaking} breaking, {diff.data.summary.additive} additive, {diff.data.summary.nonBehavioral} non-behavioral</dd></div>
                    </dl>
                    {diff.data.changes.length ? <ul className="wf-version-change-list">{diff.data.changes.map(change => (
                      <li key={change.changeId}><strong>{change.subject.memberKind ?? change.area}{change.subject.referenceKey ? ` · ${change.subject.referenceKey}` : ""}</strong><span>{change.message}</span></li>
                    ))}</ul> : null}
                  </section>
                  <ImpactSection title="Input bindings" preserved={impact.preservedBindingKeys} unresolved={impact.unresolvedBindingKeys} />
                  <ImpactSection title="Outcome connections" preserved={impact.preservedOutcomeKeys} unresolved={impact.unresolvedOutcomeKeys} />
                </>
              ) : null}
              <dl className="wf-version-change-facts">
                <div><dt>Definition ID</dt><dd>{current.definition.definitionId}</dd></div>
                <div><dt>Node ID</dt><dd>{occurrence.nodeId}</dd></div>
                <div><dt>Current version ID</dt><dd>{current.versionId}</dd></div>
                <div><dt>Target version ID</dt><dd>{target.data?.versionId ?? "Not selected"}</dd></div>
              </dl>
            </DialogDisclosure>

            {versions.isError || target.isError || diff.isError ? (
              <p className="wf-publication-recovery" role="alert">Version details could not be loaded. Close and try again.</p>
            ) : null}
            {error ? <p className="wf-publication-recovery" role="alert">{error}</p> : null}
          </div>

          <footer className="wf-version-change-footer">
            <p>{scopeLabel} <span aria-hidden="true">·</span> Current draft only</p>
            <div className="wf-dialog-actions">
              <button type="button" disabled={busy} onClick={onCancel}>Cancel</button>
              <button type="submit" disabled={busy || !canApply}>{busy ? "Applying…" : "Apply version"}</button>
            </div>
          </footer>
        </form>
      </section>
    </div>
  </>);
}

function VersionChoice({
  item,
  checked,
  recommended,
  onChange
}: {
  item: ActivityDefinitionVersionManagementView;
  checked: boolean;
  recommended: boolean;
  onChange(): void;
}) {
  return (
    <label className="wf-version-choice">
      <input type="radio" name="target-activity-version" checked={checked} onChange={onChange} />
      <span>
        <strong>v{item.version.version}</strong>
        {recommended ? <small>Recommended</small> : null}
      </span>
    </label>
  );
}

function ImpactSection({
  title,
  preserved,
  unresolved,
}: {
  title: string;
  preserved: string[];
  unresolved: string[];
}) {
  if (!preserved.length && !unresolved.length) return null;
  return (
    <section className="wf-version-change-section">
      <h4>{title}</h4>
      <dl>
        {preserved.length > 0 ? <div><dt>Retained</dt><dd>{preserved.join(", ")}</dd></div> : null}
        {unresolved.length > 0 ? <div><dt>Unresolved</dt><dd>{unresolved.join(", ")}</dd></div> : null}
      </dl>
    </section>
  );
}
