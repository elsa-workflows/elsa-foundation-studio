import type { StudioActivityDiagnostic, StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { canonicalizeStateForWire } from "../activityInputWire";
import type {
  DesignMetadataRecord,
  IncidentStrategiesResponse,
  IncidentStrategyDescriptor,
  IncidentStrategyReference,
  StartWorkflowDraftTestRunRequest,
  WorkflowDefinitionState,
  WorkflowTestRunView
} from "../workflowTypes";
import {
  ApiCapabilityUnavailableError,
  ApiCapabilityVersionMismatchError,
  capabilityIds,
  resolveCapabilityLink
} from "./capabilities";
import { createWorkflowExecutionRequestInit } from "../workflowRunInputs";

export interface PublicationIntent {
  slotName?: string;
  action?: "replace" | "sideBySide";
  expectedPublicationId?: string | null;
  preflightToken?: string;
}

export async function listIncidentStrategies(context: StudioEndpointContext): Promise<IncidentStrategiesResponse> {
  const path = await resolveCapabilityLink(context, capabilityIds.publishing, "incident-strategies");
  return parseIncidentStrategiesResponse(await context.http.getJson<unknown>(path));
}

function parseIncidentStrategiesResponse(value: unknown): IncidentStrategiesResponse {
  if (!isRecord(value) || !Array.isArray(value.items)) throw invalidIncidentStrategiesResponse();
  const defaultStrategy = parseIncidentStrategyReference(value.defaultStrategy);
  if (!defaultStrategy) throw invalidIncidentStrategiesResponse();
  const items: IncidentStrategyDescriptor[] = [];
  for (const item of value.items) {
    const descriptor = parseIncidentStrategyDescriptor(item);
    if (!descriptor) throw invalidIncidentStrategiesResponse();
    items.push(descriptor);
  }
  return { items, defaultStrategy };
}

function parseIncidentStrategyDescriptor(value: unknown): IncidentStrategyDescriptor | null {
  if (!isRecord(value)) return null;
  const reference = parseIncidentStrategyReference(value);
  if (!reference || typeof value.displayName !== "string") return null;
  if (value.description !== undefined && value.description !== null && typeof value.description !== "string") return null;
  return {
    ...reference,
    displayName: value.displayName,
    ...(value.description !== undefined ? { description: value.description as string | null } : {})
  };
}

function parseIncidentStrategyReference(value: unknown): IncidentStrategyReference | null {
  if (!isRecord(value)) return null;
  return typeof value.alias === "string" && value.alias.length > 0
    && typeof value.version === "string" && value.version.length > 0
    ? { alias: value.alias, version: value.version }
    : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

function invalidIncidentStrategiesResponse() {
  return new Error("Incident strategy discovery returned an invalid response.");
}

export interface PublicationSnapshotPreflightRequest extends PublicationIntent {
  definitionId: string;
  state: WorkflowDefinitionState;
  layout: DesignMetadataRecord[];
}

export interface PublicationTriggerClaim {
  key: string;
  cardinality: "exclusive" | "fanOut";
}

export interface PublicationTriggerChange {
  change: "added" | "removed" | "retained";
  key: string;
  cardinality: "exclusive" | "fanOut";
}

export interface PublicationTriggerConflict {
  key: string;
  cardinality: "exclusive" | "fanOut";
  publicationId: string;
  slotName: string;
}

export interface PublicationPreflight {
  preflightToken: string;
  candidateHash: string;
  definitionId: string;
  versionId: string | null;
  slotName: string;
  resolvedAction: "replace" | "sideBySide";
  policySource: "request" | "workflow" | "host";
  policyRevision?: number | null;
  canActivate: boolean;
  claims: PublicationTriggerClaim[];
  triggers?: PublicationTriggerChange[];
  changes?: PublicationTriggerChange[];
  conflicts: PublicationTriggerConflict[];
}

export type ActivityVersionChangeImpact = "Breaking" | "Additive" | "NonBehavioral" | string;

export interface ActivityPublicationChange {
  changeId: string;
  area: "Contract" | "Default" | "Outcome" | "Durability" | "Provider" | "Implementation" | "Dependency" | "Presentation" | string;
  kind: string;
  subject: {
    memberKind?: string | null;
    referenceKey?: string | null;
    dependencyVersionId?: string | null;
    occurrenceId?: string | null;
  };
  before?: unknown;
  after?: unknown;
  impact: ActivityVersionChangeImpact;
  requiredBump: string;
  message: string;
}

export interface ActivityPublicationReadiness {
  kind: string;
  key: string;
  schemaVersion?: string | null;
  status: string;
  supportedSchemaVersions: string[];
}

export interface ActivityPublicationPreflight {
  draftId: string;
  draftRevision: number;
  definitionId: string;
  definitionHeadVersionId?: string | null;
  hasBaseline: boolean;
  reviewToken: string;
  isPublishable: boolean;
  minimumVersion: string;
  validVersions: string[];
  diff?: {
    compatibility: string;
    requiredBump: string;
    behaviorChanged: boolean;
    summary: { breaking: number; additive: number; nonBehavioral: number; warnings: number };
  } | null;
  impactFirstChanges: ActivityPublicationChange[];
  dependencies: Array<{
    definitionId: string;
    versionId: string;
    version: string;
    templateHash: string;
    occurrenceId: string;
  }>;
  provider: ActivityPublicationReadiness;
  storage: ActivityPublicationReadiness[];
  runtime: ActivityPublicationReadiness[];
  diagnostics: StudioActivityDiagnostic[];
}

export interface ActivityPublicationOutcome {
  definitionId: string;
  definitionVersionId: string;
  draftId: string;
  version: string;
  templateId: string;
  templateHash: string;
  sourceReferenceId: string;
  publishedAt: string;
}

export interface ActivityPublicationReceipt {
  idempotencyKey: string;
  status: "Applied" | "Rejected" | "Stale" | "Failed" | "OutcomeUnknown" | string;
  draftId: string;
  expectedDraftRevision: number;
  expectedDefinitionHeadVersionId?: string | null;
  reviewToken: string;
  requestedVersion: string;
  outcome?: ActivityPublicationOutcome | null;
  errorCode?: string | null;
  diagnostics: StudioActivityDiagnostic[];
  updatedAt: string;
}

export interface PublishActivityDraftRequest {
  expectedDraftRevision: number;
  expectedDefinitionHeadVersionId?: string | null;
  version: string;
  reviewToken: string;
  idempotencyKey: string;
}

export type ActivityDraftTestRunInputState = "Absent" | "Present";

export interface ActivityDraftTestRunInput {
  state: ActivityDraftTestRunInputState;
  value?: unknown;
}

export interface StartActivityDraftTestRunRequest {
  expectedRevision: number;
  idempotencyKey: string;
  inputs?: Record<string, ActivityDraftTestRunInput>;
  correlationId?: string | null;
}

export interface ActivityDraftTestRunFailure {
  kind: "Validation" | "RuntimeDispatch" | string;
  code: string;
  message: string;
  diagnostics: StudioActivityDiagnostic[];
}

export interface ActivityDraftTestRunExpiration {
  sourceReferenceExpiresAt: string;
  sourceReferenceExpired: boolean;
  sourceReferenceRetained: boolean;
  evidenceRetention: string;
  evidenceExpiresAt?: string | null;
  evidenceRetained: boolean;
  runExpiresAt?: string | null;
  runStillActive: boolean;
  receiptExpiresAt: string;
}

export interface ActivityDraftTestRunCancellation {
  capabilityAdvertised: boolean;
  available: boolean;
  status: string;
  reason?: string | null;
}

export interface ActivityDraftTestRunView {
  testRunId: string;
  draftId: string;
  draftRevision: number;
  artifactId?: string | null;
  sourceReferenceId?: string | null;
  workflowExecutionId: string;
  outerActivityExecutionId?: string | null;
  status: string;
  commandDispatchStatus?: string | null;
  reason?: string | null;
  failure?: ActivityDraftTestRunFailure | null;
  expiration: ActivityDraftTestRunExpiration;
  cancellation: ActivityDraftTestRunCancellation;
  requestedAt: string;
  updatedAt: string;
}

export async function preflightPublicationSnapshot(
  context: StudioEndpointContext,
  request: PublicationSnapshotPreflightRequest
) {
  const path = await resolveCapabilityLink(
    context,
    capabilityIds.publishing,
    "publication-snapshot-preflight");
  return context.http.postJson<PublicationPreflight>(path, {
    ...request,
    state: canonicalizeStateForWire(request.state)
  });
}

export type PublicationStatus = "preparing" | "pending" | "active" | "retiring" | "retired" | "failed";

export interface Publication {
  publicationId: string;
  definitionId: string;
  versionId: string;
  definitionVersionId?: string;
  artifactId: string;
  slotName: string;
  sourceReferenceId: string;
  status: PublicationStatus;
  createdAt?: string;
  activatedAt?: string | null;
  retiredAt?: string | null;
  artifactVersion?: string;
  artifactHash?: string;
  rootActivityId?: string;
  nodeCount?: number;
}

export interface PublicationSlot {
  slotId?: string;
  definitionId: string;
  slotName: string;
  activePublicationId?: string | null;
  revision?: number;
  updatedAt?: string;
  status: PublicationStatus | null;
  publication?: Publication | null;
  /**
   * The live activation on the slot, from the runtime activation listing (foundation #1330 / T117). It is
   * an *activation* id, not an artifact id, and it is present whichever source owns the slot.
   */
  activeActivationId?: string | null;
  /**
   * Which source owns the activation — `"publishing"` for an operator publish, an import kind for a
   * reconciled mount. Reported by the runtime; never inferred here from the shape of an id.
   */
  sourceKind?: string | null;
  sourceId?: string | null;
}

export interface PublicationPolicy {
  definitionId?: string;
  defaultAction: "replace" | "requireExplicitSlot";
  defaultSlotName: string;
  source: "workflow" | "host";
  revision?: number;
  updatedAt?: string;
}

export interface SetPublicationPolicyRequest {
  defaultAction: "replace" | "requireExplicitSlot";
  defaultSlotName?: string;
  expectedRevision?: number;
}

export async function preflightPublication(
  context: StudioEndpointContext,
  versionId: string,
  intent: PublicationIntent = {}
) {
  const path = await resolveCapabilityLink(
    context,
    capabilityIds.publishing,
    "publication-preflight",
    { versionId });
  return context.http.postJson<PublicationPreflight>(path, intent);
}

export async function publishVersion(
  context: StudioEndpointContext,
  versionId: string,
  intent: PublicationIntent = {}
) {
  const path = await resolveCapabilityLink(
    context,
    capabilityIds.publishing,
    "workflow-publish",
    { versionId });
  return context.http.postJson<Publication>(path, intent);
}

export async function preflightActivityDraftPublication(
  context: StudioEndpointContext,
  draftId: string,
  expectedDraftRevision: number,
  expectedDefinitionHeadVersionId?: string | null
) {
  const path = await resolveCapabilityLink(
    context,
    capabilityIds.publishing,
    "activity-publication-preflight",
    { draftId });
  return context.http.postJson<ActivityPublicationPreflight>(path, {
    expectedDraftRevision,
    expectedDefinitionHeadVersionId: expectedDefinitionHeadVersionId ?? null
  });
}

export async function publishActivityDraft(
  context: StudioEndpointContext,
  draftId: string,
  request: PublishActivityDraftRequest
) {
  const path = await resolveCapabilityLink(
    context,
    capabilityIds.publishing,
    "activity-publication",
    { draftId });
  return context.http.postJson<ActivityPublicationReceipt>(path, request);
}

export async function getActivityPublicationReceipt(
  context: StudioEndpointContext,
  idempotencyKey: string
) {
  const path = await resolveCapabilityLink(
    context,
    capabilityIds.publishing,
    "activity-publication-receipt",
    { idempotencyKey });
  return context.http.getJson<ActivityPublicationReceipt>(path);
}

export async function startActivityDraftTestRun(
  context: StudioEndpointContext,
  draftId: string,
  request: StartActivityDraftTestRunRequest
) {
  const path = await resolveCapabilityLink(
    context,
    capabilityIds.publishing,
    "activity-draft-test-run-dispatch",
    { draftId });
  return context.http.requestJson<ActivityDraftTestRunView>(
    path,
    createWorkflowExecutionRequestInit(request));
}

export async function getActivityDraftTestRun(
  context: StudioEndpointContext,
  testRunId: string
) {
  const path = await resolveCapabilityLink(
    context,
    capabilityIds.publishing,
    "activity-draft-test-run-status",
    { testRunId });
  return context.http.getJson<ActivityDraftTestRunView>(path);
}

export async function getActivityDraftTestRunByIdempotencyKey(
  context: StudioEndpointContext,
  draftId: string,
  idempotencyKey: string
) {
  const path = await resolveCapabilityLink(
    context,
    capabilityIds.publishing,
    "activity-draft-test-run-idempotency-status",
    { draftId, idempotencyKey });
  return context.http.getJson<ActivityDraftTestRunView>(path);
}

export async function cancelActivityDraftTestRun(
  context: StudioEndpointContext,
  testRunId: string
) {
  const path = await resolveCapabilityLink(
    context,
    capabilityIds.publishing,
    "activity-draft-test-run-cancel",
    { testRunId });
  return context.http.postJson<ActivityDraftTestRunView>(path, {});
}

// Slot reads moved to the runtime capability (foundation #1330 / T117): the activation slot is
// runtime-owned data, so `elsa.api.runtime` now advertises `workflow-activation-slots` and the publishing
// capability retired `publication-slots`. The retired rel is still accepted, preferred second, so Studio
// keeps working against a server from before the split.
const activationSlotsRelation = "workflow-activation-slots";
const activationSlotRelation = "workflow-activation-slot";
const retiredPublicationSlotsRelation = "publication-slots";

/** The route the publishing feature serves the slot lifecycle *commands* on (see below). */
const publicationSlotCommandRoute = "/publishing/workflows";

function isCapabilityMissing(error: unknown) {
  return error instanceof ApiCapabilityUnavailableError || error instanceof ApiCapabilityVersionMismatchError;
}

async function activationSlotsPath(context: StudioEndpointContext, definitionId: string) {
  try {
    return await resolveCapabilityLink(context, capabilityIds.runtime, activationSlotsRelation, { definitionId });
  } catch (error) {
    if (!isCapabilityMissing(error)) throw error;
    return resolveCapabilityLink(context, capabilityIds.publishing, retiredPublicationSlotsRelation, { definitionId });
  }
}

/**
 * Lists a definition's activation slots.
 *
 * Two response shapes are accepted, because the read moved between capabilities: the runtime activation
 * view (`activeActivationId` plus the owning source, and deliberately *no* publication — a publication is
 * one possible reason a slot is occupied, not part of the slot) and the retired publishing view, which
 * carried the joined `publication`. Callers therefore have to treat an absent publication as a normal
 * answer rather than as missing data.
 */
export async function listPublicationSlots(context: StudioEndpointContext, definitionId: string) {
  const response = await context.http.getJson<{ items?: unknown[] }>(
    await activationSlotsPath(context, definitionId));
  return Array.isArray(response?.items) ? response.items.map(normalizePublicationSlot) : [];
}

function normalizePublicationSlot(value: unknown): PublicationSlot {
  const slot = (value ?? {}) as Record<string, unknown> & Partial<PublicationSlot>;
  const activeActivationId = typeof slot.activeActivationId === "string" ? slot.activeActivationId : null;
  const publication = (slot.publication ?? null) as Publication | null;
  const sourceKind = typeof slot.sourceKind === "string" ? slot.sourceKind : null;
  return {
    ...slot,
    definitionId: typeof slot.definitionId === "string" ? slot.definitionId : "",
    slotName: typeof slot.slotName === "string" ? slot.slotName : "",
    activeActivationId,
    sourceKind,
    sourceId: typeof slot.sourceId === "string" ? slot.sourceId : null,
    publication,
    // The activation view reports ownership explicitly; a publishing-owned activation *is* the
    // publication, so it can fill `activePublicationId` — for any other owner there is no publication id.
    activePublicationId: typeof slot.activePublicationId === "string"
      ? slot.activePublicationId
      : sourceKind === "publishing" ? activeActivationId : null,
    status: (slot.status ?? publication?.status ?? (activeActivationId ? "active" : null)) as PublicationStatus | null
  };
}

export async function getPublicationSlot(context: StudioEndpointContext, definitionId: string, slotName: string) {
  let path: string;
  try {
    path = await resolveCapabilityLink(context, capabilityIds.runtime, activationSlotRelation, { definitionId, slotName });
  } catch (error) {
    if (!isCapabilityMissing(error)) throw error;
    path = `${await resolveCapabilityLink(context, capabilityIds.publishing, retiredPublicationSlotsRelation, { definitionId })}/${encodeURIComponent(slotName)}`;
  }
  return normalizePublicationSlot(await context.http.getJson<unknown>(path));
}

/**
 * Unpublishing and restoring stayed in the publishing feature when the reads moved (T117): retracting or
 * reinstating a publication is a publishing command that asks the runtime to change the ledger. The rel
 * the paths used to be derived from went away with the reads, though, and nothing advertises the commands
 * yet — so the published route is used directly once the rel is gone. One place to follow if it moves.
 */
async function publicationSlotCommandPath(context: StudioEndpointContext, definitionId: string, slotName: string) {
  try {
    const base = await resolveCapabilityLink(
      context,
      capabilityIds.publishing,
      retiredPublicationSlotsRelation,
      { definitionId });
    return `${base}/${encodeURIComponent(slotName)}`;
  } catch (error) {
    if (!isCapabilityMissing(error)) throw error;
    return `${publicationSlotCommandRoute}/${encodeURIComponent(definitionId)}/slots/${encodeURIComponent(slotName)}`;
  }
}

export async function unpublishSlot(context: StudioEndpointContext, definitionId: string, slotName: string) {
  return normalizePublicationSlot(await context.http.deleteJson<unknown>(
    await publicationSlotCommandPath(context, definitionId, slotName)));
}

export async function restorePublicationSlot(context: StudioEndpointContext, definitionId: string, slotName: string) {
  return normalizePublicationSlot(await context.http.postJson<unknown>(
    `${await publicationSlotCommandPath(context, definitionId, slotName)}/restore`,
    {}));
}

export async function getPublicationPolicy(context: StudioEndpointContext, definitionId: string) {
  const path = await resolveCapabilityLink(
    context,
    capabilityIds.publishing,
    "publication-policy",
    { definitionId });
  return context.http.getJson<PublicationPolicy>(path);
}

export async function savePublicationPolicy(
  context: StudioEndpointContext,
  definitionId: string,
  request: SetPublicationPolicyRequest
) {
  const path = await resolveCapabilityLink(
    context,
    capabilityIds.publishing,
    "publication-policy",
    { definitionId });
  return context.http.putJson<PublicationPolicy>(path, request);
}

export async function startWorkflowVersionTestRun(context: StudioEndpointContext, versionId: string) {
  const path = await resolveCapabilityLink(
    context,
    capabilityIds.publishing,
    "workflow-test-runs",
    { versionId });
  return context.http.postJson<WorkflowTestRunView>(path, {});
}

export async function startWorkflowDraftTestRun(
  context: StudioEndpointContext,
  request: StartWorkflowDraftTestRunRequest
) {
  const path = await resolveCapabilityLink(context, capabilityIds.publishing, "workflow-draft-test-runs");
  const wireRequest = { ...request, state: canonicalizeStateForWire(request.state) };
  try {
    return await context.http.requestJson<WorkflowTestRunView>(path, createWorkflowExecutionRequestInit(wireRequest));
  } catch (error) {
    const rejected = parseRejectedTestRun(error);
    if (rejected) return rejected;
    throw error;
  }
}

function parseRejectedTestRun(error: unknown): WorkflowTestRunView | null {
  const payload = error && typeof error === "object" && "payload" in error
    ? (error as { payload?: unknown }).payload
    : null;
  const payloadView = parseTestRunView(payload);
  if (payloadView) return payloadView;
  if (!(error instanceof Error)) return null;
  try {
    return parseTestRunView(JSON.parse(error.message));
  } catch {
    return null;
  }
}

function parseTestRunView(value: unknown): WorkflowTestRunView | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<WorkflowTestRunView>;
  return typeof candidate.testRunId === "string" && typeof candidate.status === "string"
    ? candidate as WorkflowTestRunView
    : null;
}
