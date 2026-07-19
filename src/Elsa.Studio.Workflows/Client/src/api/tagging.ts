import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { capabilityIds, resolveCapabilityLink } from "./capabilities";

export interface TagDefinition {
  id: string;
  key: string;
  displayName: string;
  description?: string | null;
  color?: string | null;
  valueMode: "Marker" | "Controlled" | "FreeText";
  cardinality: "Single" | "Multiple";
  status: "Active" | "Retired";
  revision: string;
  canManage: boolean;
}

export interface TagDefinitionList {
  items: TagDefinition[];
  canManage: boolean;
}

export interface WorkflowDefinitionTagAssertion {
  tagDefinitionId: string;
  controlledValueId: string | null;
  origin: string;
}

export interface ControlledTagValue {
  id: string;
  tagDefinitionId: string;
  key: string;
  displayName: string;
  description?: string | null;
  color?: string | null;
  sortOrder: number;
  status: "Active" | "Retired";
  revision: string;
  canManage: boolean;
}

export interface ControlledTagValueList {
  items: ControlledTagValue[];
  canManage: boolean;
}

export interface ControlledTagValueAssignment {
  tagDefinitionId: string;
  controlledValueId: string;
}

export interface WorkflowDefinitionTagSet {
  workflowDefinitionId: string;
  revision: string;
  assertions: WorkflowDefinitionTagAssertion[];
  canAssign: boolean;
}

export class TagSetRevisionConflictError extends Error {
  readonly code = "tag-set-revision-conflict";

  constructor() {
    super("Tags changed elsewhere. Reloaded the current tag set.");
    this.name = "TagSetRevisionConflictError";
  }
}

async function definitionsPath(context: StudioEndpointContext) {
  return resolveCapabilityLink(context, capabilityIds.tagging, "tag-definitions");
}

async function tagSetPath(context: StudioEndpointContext, definitionId: string) {
  return resolveCapabilityLink(context, capabilityIds.workflowDesign, "workflow-definition-tags", { definitionId });
}

async function controlledValuesPath(context: StudioEndpointContext, tagDefinitionId: string) {
  return resolveCapabilityLink(context, capabilityIds.tagging, "tag-definition-values", { tagDefinitionId });
}

export async function listTagDefinitions(context: StudioEndpointContext): Promise<TagDefinitionList> {
  const response = await context.http.getJson<unknown>(await definitionsPath(context));
  const value = object(response);
  const rawItems = Array.isArray(value?.items) ? value.items : Array.isArray(value?.definitions) ? value.definitions : [];
  return {
    items: rawItems.map(normalizeTagDefinition).filter((item): item is TagDefinition => item !== null),
    canManage: value?.canManage === true
  };
}

export async function createTagDefinition(context: StudioEndpointContext, request: {
  canonicalKey: string;
  displayName: string;
  description?: string | null;
  color?: string | null;
  valueMode?: "Marker" | "Controlled";
  cardinality?: "Single";
}) {
  const response = await context.http.postJson<unknown>(await definitionsPath(context), request);
  const definition = normalizeTagDefinition(response);
  if (!definition) throw new Error("The server returned an invalid tag definition.");
  return definition;
}

export async function updateTagDefinition(
  context: StudioEndpointContext,
  tagDefinitionId: string,
  revision: string,
  patch: { canonicalKey?: string; displayName?: string; description?: string | null; color?: string | null; status?: "Active" | "Retired" }
) {
  const response = await context.http.requestJson<unknown>(`${await definitionsPath(context)}/${encodeURIComponent(tagDefinitionId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Accept: "application/json", "If-Match": revision },
    body: JSON.stringify(patch)
  });
  const definition = normalizeTagDefinition(response);
  if (!definition) throw new Error("The server returned an invalid tag definition.");
  return definition;
}

export async function listControlledTagValues(
  context: StudioEndpointContext,
  tagDefinitionId: string,
  activeOnly = true
): Promise<ControlledTagValueList> {
  const path = await controlledValuesPath(context, tagDefinitionId);
  const response = await context.http.getJson<unknown>(
    activeOnly ? path : `${path}${path.includes("?") ? "&" : "?"}activeOnly=false`);
  const value = object(response);
  const rawItems = Array.isArray(value?.items) ? value.items : Array.isArray(value?.values) ? value.values : [];
  return {
    items: rawItems.map(item => normalizeControlledTagValue(item, tagDefinitionId)).filter((item): item is ControlledTagValue => item !== null),
    canManage: value?.canManage === true
  };
}

export async function createControlledTagValue(
  context: StudioEndpointContext,
  tagDefinitionId: string,
  request: { canonicalKey: string; displayName: string; description?: string | null; color?: string | null; sortOrder: number }
) {
  const response = await context.http.postJson<unknown>(await controlledValuesPath(context, tagDefinitionId), request);
  const value = normalizeControlledTagValue(response, tagDefinitionId);
  if (!value) throw new Error("The server returned an invalid controlled tag value.");
  return value;
}

export async function updateControlledTagValue(
  context: StudioEndpointContext,
  tagDefinitionId: string,
  controlledValueId: string,
  revision: string,
  patch: { displayName?: string; description?: string | null; color?: string | null; sortOrder?: number; status?: "Active" | "Retired" }
) {
  const response = await context.http.requestJson<unknown>(`${await controlledValuesPath(context, tagDefinitionId)}/${encodeURIComponent(controlledValueId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Accept: "application/json", "If-Match": revision },
    body: JSON.stringify(patch)
  });
  const value = normalizeControlledTagValue(response, tagDefinitionId);
  if (!value) throw new Error("The server returned an invalid controlled tag value.");
  return value;
}

export async function getWorkflowDefinitionTags(context: StudioEndpointContext, definitionId: string): Promise<WorkflowDefinitionTagSet> {
  const response = await context.http.getJson<unknown>(await tagSetPath(context, definitionId));
  return normalizeTagSet(response, definitionId);
}

export async function replaceWorkflowDefinitionTags(
  context: StudioEndpointContext,
  definitionId: string,
  revision: string,
  tagDefinitionIds: string[],
  controlledValues: ControlledTagValueAssignment[] = []
): Promise<WorkflowDefinitionTagSet> {
  try {
    const uniqueValues = uniqueControlledValues(controlledValues);
    const response = await context.http.requestJson<unknown>(await tagSetPath(context, definitionId), {
      method: "PUT",
      headers: { "Content-Type": "application/json", Accept: "application/json", "If-Match": revision },
      body: JSON.stringify({
        tagDefinitionIds: [...new Set(tagDefinitionIds)],
        ...(uniqueValues.length > 0 ? { controlledValues: uniqueValues } : {})
      })
    });
    return normalizeTagSet(response, definitionId);
  } catch (error) {
    if (isRevisionConflict(error)) throw new TagSetRevisionConflictError();
    throw error;
  }
}

function uniqueControlledValues(values: ControlledTagValueAssignment[]) {
  const byDefinition = new Map<string, ControlledTagValueAssignment>();
  for (const value of values) {
    if (!isNonBlankString(value.tagDefinitionId) || !isNonBlankString(value.controlledValueId)) continue;
    const existing = byDefinition.get(value.tagDefinitionId);
    if (existing && existing.controlledValueId !== value.controlledValueId) {
      throw new Error("A single-valued controlled tag can have only one selected value.");
    }
    byDefinition.set(value.tagDefinitionId, value);
  }
  return [...byDefinition.values()];
}

function normalizeTagDefinition(value: unknown): TagDefinition | null {
  const record = object(value);
  if (!record || !isNonBlankString(record.id) || !isNonBlankString(record.canonicalKey) || !isNonBlankString(record.displayName) || !isQuotedRevision(record.revision) || (record.status !== "Active" && record.status !== "Retired")) return null;
  return {
    id: record.id,
    key: record.canonicalKey,
    displayName: record.displayName,
    description: typeof record.description === "string" ? record.description : null,
    color: typeof record.color === "string" ? record.color : null,
    valueMode: record.valueMode === "Controlled" || record.valueMode === "FreeText" ? record.valueMode : "Marker",
    cardinality: record.cardinality === "Multiple" ? "Multiple" : "Single",
    status: record.status,
    revision: record.revision,
    canManage: record.canManage === true
  };
}

function normalizeControlledTagValue(value: unknown, tagDefinitionId: string): ControlledTagValue | null {
  const record = object(value);
  if (!record
    || !isNonBlankString(record.id)
    || record.tagDefinitionId !== tagDefinitionId
    || !isNonBlankString(record.canonicalKey)
    || !isNonBlankString(record.displayName)
    || typeof record.sortOrder !== "number"
    || !Number.isFinite(record.sortOrder)
    || !isQuotedRevision(record.revision)
    || (record.status !== "Active" && record.status !== "Retired")) return null;
  return {
    id: record.id,
    tagDefinitionId,
    key: record.canonicalKey,
    displayName: record.displayName,
    description: typeof record.description === "string" ? record.description : null,
    color: typeof record.color === "string" ? record.color : null,
    sortOrder: record.sortOrder,
    status: record.status,
    revision: record.revision,
    canManage: record.canManage === true
  };
}

function normalizeTagSet(value: unknown, requestedDefinitionId: string): WorkflowDefinitionTagSet {
  const record = object(value);
  if (!record
    || !isNonBlankString(requestedDefinitionId)
    || record.workflowDefinitionId !== requestedDefinitionId
    || !isQuotedRevision(record.revision)
    || !Array.isArray(record.assertions)) {
    throw new Error("The server returned an invalid workflow definition tag set.");
  }
  const assertions = record.assertions.map(normalizeAssertion);
  if (assertions.some(assertion => assertion === null)) {
    throw new Error("The server returned an invalid workflow definition tag set.");
  }
  return {
    workflowDefinitionId: record.workflowDefinitionId,
    revision: record.revision,
    assertions: assertions as WorkflowDefinitionTagAssertion[],
    canAssign: record?.canAssign === true
  };
}

function normalizeAssertion(value: unknown): WorkflowDefinitionTagAssertion | null {
  const record = object(value);
  return record && isNonBlankString(record.tagDefinitionId) && isNonBlankString(record.origin)
    && (record.controlledValueId === null || record.controlledValueId === undefined || isNonBlankString(record.controlledValueId))
    ? { tagDefinitionId: record.tagDefinitionId, controlledValueId: isNonBlankString(record.controlledValueId) ? record.controlledValueId : null, origin: record.origin }
    : null;
}

function isRevisionConflict(error: unknown) {
  const record = object(error);
  if (!record) return false;

  const details = [record, object(record.payload), object(record.response), object(record.data)].filter((item): item is Record<string, unknown> => item !== null);
  return details.some(item => item.status === 409) && details.some(item => item.code === "tag-set-revision-conflict");
}

function object(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function isNonBlankString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isQuotedRevision(value: unknown): value is string {
  return typeof value === "string" && /^".+"$/.test(value);
}
