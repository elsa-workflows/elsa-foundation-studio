import { AlertCircle, ArrowUpRight, Check, Flag, MapPin, Wrench } from "lucide-react";
import type { ValidationError, WorkflowDraft, WorkflowExecutableSummary, WorkflowTestRunView } from "../workflowTypes";
import {
  STRUCTURAL_NO_START_TYPE,
  STRUCTURAL_START_TRIGGER_TYPE,
  collectVariableRepairItems,
  parseValidationErrorPath
} from "../validationDiagnostics";
import { formatDate } from "../workflowFormatting";
import { isRejectedTestRun } from "./editorHelpers";

/**
 * Renders the unified draft-validation surface (issue #453). `errors` (server-derived + reconciled +
 * structural, merged by the caller) overrides the draft's own list when provided, so the footer never
 * says "No validation errors" while the promotion gate would refuse. Each error offers a "Repair" jump
 * for unresolved-variable references and a "Go to" jump for any error that resolves to a node.
 */
export function ValidationPanel({
  draft,
  errors: providedErrors,
  onRepair,
  onSelectNode,
  onSetAsStartNode,
  unavailable
}: {
  draft: WorkflowDraft;
  errors?: ValidationError[];
  onRepair(nodeId: string | null): void;
  onSelectNode?(nodeId: string): void;
  /**
   * Applies the fix for a start-node fault: the two structural start errors report a node that cannot be
   * reached, and the fix is to make it the start. Absent when the canvas is not a Flowchart.
   */
  onSetAsStartNode?(nodeId: string): void;
  unavailable?: boolean;
}) {
  const errors = providedErrors ?? (Array.isArray(draft.validationErrors) ? draft.validationErrors : []);
  if (!errors.length) {
    return (
      <div className="wf-validation ok">
        <Check size={14} /> No validation errors
        {unavailable ? <span className="wf-validation-note"> (server validation unavailable on this backend)</span> : null}
      </div>
    );
  }

  const repairItems = collectVariableRepairItems(errors);
  const repairByError = new Map(repairItems.map(item => [item.error, item]));

  return (
    <div className="wf-validation">
      <div className="wf-validation-summary">
        <AlertCircle size={14} />
        {errors.length} validation issue{errors.length === 1 ? "" : "s"}
        {repairItems.length > 0 ? (
          <span className="wf-validation-variable-count"> · {repairItems.length} invalid variable reference{repairItems.length === 1 ? "" : "s"}</span>
        ) : null}
      </div>
      <ul className="wf-validation-list">
        {errors.map((error, index) => {
          const repair = repairByError.get(error);
          const nodeId = repair?.path.nodeId ?? parseValidationErrorPath(error.path).nodeId;
          const startNodeFix = onSetAsStartNode && nodeId && isStartNodeError(error) ? nodeId : null;
          return (
            <li key={index} className={repair ? "wf-validation-item repairable" : "wf-validation-item"}>
              <span className="wf-validation-message">{error.message ?? "Validation issue."}</span>
              {startNodeFix ? (
                <button type="button" className="wf-validation-repair" onClick={() => onSetAsStartNode?.(startNodeFix)}>
                  <Flag size={12} /> Set as start
                </button>
              ) : null}
              {repair?.path.nodeId ? (
                <button type="button" className="wf-validation-repair" onClick={() => onRepair(repair.path.nodeId)}>
                  <Wrench size={12} /> Repair
                </button>
              ) : nodeId && onSelectNode ? (
                <button type="button" className="wf-validation-repair" onClick={() => onSelectNode(nodeId)}>
                  <MapPin size={12} /> Go to
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** The two structural faults a start-node change fixes (see draftValidation). */
function isStartNodeError(error: ValidationError) {
  return error.type === STRUCTURAL_START_TRIGGER_TYPE || error.type === STRUCTURAL_NO_START_TYPE;
}

export function TestRunStatus({
  testRun,
  onOpenDetails
}: {
  testRun: WorkflowTestRunView;
  onOpenDetails(): void;
}) {
  const rejected = isRejectedTestRun(testRun);
  const acceptedWithIncidents = !rejected && hasAcceptedRuntimeIssue(testRun);
  return (
    <div className="wf-test-run-status" data-state={rejected ? "rejected" : acceptedWithIncidents ? "accepted-with-incidents" : "accepted"}>
      <button
        type="button"
        className="wf-test-run-trigger"
        onClick={onOpenDetails}
      >
        {rejected || acceptedWithIncidents ? <AlertCircle size={16} /> : <Check size={16} />}
        {rejected ? "Test run rejected" : acceptedWithIncidents ? acceptedRuntimeIssueLabel(testRun) : "Test run dispatched"}
      </button>
    </div>
  );
}

export function WorkflowRuntimePanel({ testRun, publishedEquivalent, onOpenRun }: {
  testRun: WorkflowTestRunView | null;
  publishedEquivalent?: WorkflowExecutableSummary | null;
  onOpenRun(workflowExecutionId: string, initialTab?: "issues"): void;
}) {
  if (!testRun) {
    return (
      <div className="wf-runtime-panel">
        <div className="wf-empty">Run the draft to see Runtime Evidence.</div>
      </div>
    );
  }

  const rejected = isRejectedTestRun(testRun);
  const workflowExecutionId = testRun.workflowExecutionId;
  const acceptedWithIncidents = !rejected && hasAcceptedRuntimeIssue(testRun);
  // The equivalence signal resolves asynchronously; re-check the artifact id so a match computed for an
  // earlier test run never captions a newer one. A rejected dispatch can still mint a valid artifact id,
  // but pairing a green "identical" banner with a rejection reason reads as contradictory — suppress it.
  const equivalent = !rejected && publishedEquivalent && publishedEquivalent.artifactId === testRun.artifactId
    ? publishedEquivalent
    : null;
  return (
    <div className="wf-runtime-panel">
      <section className="wf-runtime-card" data-state={rejected ? "rejected" : acceptedWithIncidents ? "accepted-with-incidents" : "accepted"}>
        <header>
          <div>
            <span>Latest Test Run</span>
            <h3>{rejected ? "Test run rejected" : acceptedWithIncidents ? "Run has a runtime issue" : "Run dispatched"}</h3>
          </div>
        </header>
        <p>Draft test · not published.</p>
        {workflowExecutionId ? (
          <div className="wf-runtime-open">
            <button type="button" onClick={() => onOpenRun(workflowExecutionId)}>Open run <ArrowUpRight size={14} aria-hidden="true" /></button>
            <span>View activity execution and incidents.</span>
          </div>
        ) : null}
        {rejected && testRun.reason ? <div className="wf-runtime-reason"><AlertCircle size={14} /> {testRun.reason}</div> : null}
        {acceptedWithIncidents ? (
          <div className="wf-runtime-incident-warning" role="status">
            <AlertCircle size={14} aria-hidden="true" />
            <span>{testRun.incidentCount != null && testRun.incidentCount > 0
              ? `${testRun.incidentCount} incident${testRun.incidentCount === 1 ? "" : "s"} recorded.`
              : "Accepted with a runtime issue. Incident details may be unavailable."}</span>
            {workflowExecutionId ? <button type="button" onClick={() => onOpenRun(workflowExecutionId, "issues")}>Review incidents</button> : null}
          </div>
        ) : null}
        {equivalent ? (
          <div className="wf-runtime-equivalence">
            <Check size={14} /> Current draft is behaviorally identical to published v{equivalent.artifactVersion}.
          </div>
        ) : null}
        <details className="wf-runtime-details">
          <summary>Details</summary>
          <p>Ephemeral - not saved, promoted, or published.</p>
          <dl className="wf-runtime-meta">
            <div><dt>Dispatch</dt><dd>{testRun.commandDispatchStatus ?? testRun.status}</dd></div>
            <div><dt>Test run ID</dt><dd>{testRun.testRunId}</dd></div>
            {testRun.artifactId ? <div><dt>Artifact ID</dt><dd>{testRun.artifactId}</dd></div> : null}
            {workflowExecutionId ? <div><dt>Run ID</dt><dd>{workflowExecutionId}</dd></div> : null}
            {typeof testRun.activityCount === "number" ? <div><dt>Activities</dt><dd>{testRun.activityCount}</dd></div> : null}
            {typeof testRun.incidentCount === "number" ? <div><dt>Incidents</dt><dd>{testRun.incidentCount}</dd></div> : null}
            {testRun.expiresAt ? <div><dt>Expires</dt><dd>{formatDate(testRun.expiresAt)}</dd></div> : null}
          </dl>
        </details>
      </section>
    </div>
  );
}

function hasAcceptedRuntimeIssue(testRun: WorkflowTestRunView) {
  return testRun.commandDispatchStatus === "AcceptedButFaulted" || (typeof testRun.incidentCount === "number" && testRun.incidentCount > 0);
}

function acceptedRuntimeIssueLabel(testRun: WorkflowTestRunView) {
  return typeof testRun.incidentCount === "number" && testRun.incidentCount > 0
    ? "Test run accepted with incidents"
    : "Test run accepted with a runtime issue";
}
