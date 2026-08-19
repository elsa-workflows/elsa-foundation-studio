import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { capabilityIds, hasCapabilityLink, resolveCapabilityLink } from "./capabilities";

// Client half of the executable-artifact export (foundation #1304, studio #493). The server owns the
// closure: this module resolves the advertised link, GETs it, and hands the payload back untouched.
// Kept in its own module — imported only by the deferred workflow-editor surface — so it stays out of
// the Definitions landing bundle, like the draft-validation client.

/** The relation elsa-foundation advertises under the publishing capability for the export endpoint. */
export const workflowExecutableExportRelation = "workflow-executable-export";

/**
 * Reports whether the backend advertises the executable-export relation. Runtime-less and older servers
 * omit it; callers hide the action rather than rendering a button that cannot work.
 */
export function isWorkflowExecutableExportAvailable(context: StudioEndpointContext): Promise<boolean> {
  return hasCapabilityLink(context, capabilityIds.publishing, workflowExecutableExportRelation);
}

/**
 * GETs the artifact closure for a *published* workflow definition version.
 *
 * The response is returned exactly as the server produced it: Studio neither assembles nor transforms
 * the closure (FR-C-004). Server error statuses propagate as-is so callers can branch on them through
 * {@link describeWorkflowExecutableExportFailure}.
 */
export async function exportWorkflowExecutableClosure(
  context: StudioEndpointContext,
  versionId: string,
  signal?: AbortSignal
): Promise<unknown> {
  const path = await resolveCapabilityLink(
    context,
    capabilityIds.publishing,
    workflowExecutableExportRelation,
    { versionId });
  return context.http.getJson<unknown>(path, { signal });
}

export type WorkflowExecutableExportFailureKind =
  /** 404 — the version is unknown, or carries no executable source reference at all. */
  | "notFound"
  /** 409 — the version exists but was never published; only expiring test-run snapshots exist. */
  | "notPublished"
  /** 409 — the stored closure is incomplete; `missingArtifactIds` names the gaps. */
  | "incompleteClosure"
  /** 500 — no download target is registered, or one answered with a non-inline delivery: engine composition, not a workflow problem. */
  | "engineMisconfigured"
  /** 500 — a cycle in the stored dependency graph, or a storage/codec fault. */
  | "engineFault"
  | "unknown";

export interface WorkflowExecutableExportFailure {
  kind: WorkflowExecutableExportFailureKind;
  status?: number;
  /** The server's own summary message (problem-detail `detail`/`title`, or the thrown message). */
  message: string;
  /**
   * The unresolved dependency artifact ids for the `incompleteClosure` kind. The server reports them as
   * one entry per id in the standard FastEndpoints error collection (an `AddError` per missing id), so
   * they are read out of that collection rather than from a bespoke field.
   */
  missingArtifactIds: string[];
  /** Every error entry the server returned, verbatim, for callers that render the raw list. */
  serverErrors: string[];
}

const missingDependencyEntryPattern = /dependency artifact\s+'([^']+)'\s+is missing from the executable store/i;
// Fallback for the summary sentence: "Unresolved dependency artifact(s): 'id@hash' (declared by ...), ...".
const missingDependencySummaryPattern = /'([^'@]+)@[^']*'/g;

/**
 * Maps an export failure onto the endpoint's contracted response taxonomy so the editor can offer the
 * right affordance (publish first, the missing dependencies, or a plain error) instead of one toast.
 *
 * The failure modes are distinguished by exception type on the server but arrive here as a status plus
 * the standard error collection, so the classification reads that collection first and only falls back
 * to the summary text.
 */
export function describeWorkflowExecutableExportFailure(error: unknown): WorkflowExecutableExportFailure {
  const status = readStatus(error);
  const payload = readPayload(error);
  const serverErrors = readServerErrors(payload, error);
  const message = readMessage(payload, error, status);
  const missingArtifactIds = readMissingArtifactIds(serverErrors, message);

  return {
    kind: classify(status, missingArtifactIds, [message, ...serverErrors].join(" ")),
    ...(status === undefined ? {} : { status }),
    message,
    missingArtifactIds,
    serverErrors
  };
}

function classify(
  status: number | undefined,
  missingArtifactIds: string[],
  text: string
): WorkflowExecutableExportFailureKind {
  if (status === 404) return "notFound";
  if (status === 409) {
    // Only two 409s are contracted. An incomplete closure is recognised by its per-id error entries (or,
    // failing that, by the summary phrasing); every other 409 is the never-published refusal.
    return missingArtifactIds.length || /closure rooted at .* is incomplete|unresolved dependency artifact/i.test(text)
      ? "incompleteClosure"
      : "notPublished";
  }
  if (status === 500 || status === 503) {
    // The engine-composition faults (no download target registered, a non-inline delivery) are not
    // something the author can fix by changing the workflow, so they read differently in the UI.
    return /export is not available on this engine|produced an unexpected delivery/i.test(text)
      ? "engineMisconfigured"
      : "engineFault";
  }
  return "unknown";
}

function readMissingArtifactIds(serverErrors: string[], message: string): string[] {
  const ids = serverErrors.flatMap(entry => {
    const match = missingDependencyEntryPattern.exec(entry);
    return match ? [match[1]] : [];
  });
  if (ids.length) return Array.from(new Set(ids));

  if (!/unresolved dependency artifact/i.test(message)) return [];
  return Array.from(new Set(Array.from(message.matchAll(missingDependencySummaryPattern), match => match[1])));
}

function readStatus(error: unknown): number | undefined {
  if (!error || typeof error !== "object") return undefined;
  const candidate = error as { status?: unknown; statusCode?: unknown; response?: { status?: unknown } };
  for (const value of [candidate.status, candidate.statusCode, candidate.response?.status]) {
    if (typeof value === "number") return value;
  }
  const payload = readPayload(error);
  const payloadStatus = isRecord(payload) ? payload.status : undefined;
  return typeof payloadStatus === "number" ? payloadStatus : undefined;
}

function readPayload(error: unknown): unknown {
  if (!error || typeof error !== "object") return null;
  const candidate = error as { payload?: unknown; response?: { data?: unknown } };
  if (candidate.payload != null) return candidate.payload;
  if (candidate.response?.data != null) return candidate.response.data;
  return null;
}

/**
 * Reads the server's error entries out of either FastEndpoints shape: ProblemDetails' array of
 * `{ name, reason }` entries, and the classic `errors` dictionary of `path -> string[]` (which the
 * Studio http client also surfaces as `validationErrors`).
 */
function readServerErrors(payload: unknown, error: unknown): string[] {
  const messages: string[] = [];
  const collect = (value: unknown) => {
    if (typeof value === "string" && value.trim()) messages.push(value.trim());
  };

  const errors = isRecord(payload) ? payload.errors : undefined;
  if (Array.isArray(errors)) {
    for (const entry of errors) {
      if (typeof entry === "string") { collect(entry); continue; }
      if (!isRecord(entry)) continue;
      collect(entry.reason ?? entry.message ?? entry.detail ?? entry.errorMessage);
    }
  } else if (isRecord(errors)) {
    for (const value of Object.values(errors)) {
      if (Array.isArray(value)) value.forEach(collect);
      else collect(value);
    }
  }

  if (!messages.length) {
    const validationErrors = error && typeof error === "object"
      ? (error as { validationErrors?: unknown }).validationErrors
      : undefined;
    if (isRecord(validationErrors)) {
      for (const value of Object.values(validationErrors)) {
        if (Array.isArray(value)) value.forEach(collect);
        else collect(value);
      }
    }
  }

  return Array.from(new Set(messages));
}

function readMessage(payload: unknown, error: unknown, status: number | undefined): string {
  if (isRecord(payload)) {
    for (const key of ["detail", "title", "message"]) {
      const value = payload[key];
      if (typeof value === "string" && value.trim()) return value.trim();
    }
  }
  const thrown = error instanceof Error ? error.message.trim() : typeof error === "string" ? error.trim() : "";
  if (thrown) return thrown;
  return status === undefined
    ? "The executable artifact export failed."
    : `The executable artifact export failed with ${status}.`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === "object" && !Array.isArray(value);
}
