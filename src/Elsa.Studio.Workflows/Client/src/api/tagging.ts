import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { capabilityIds, resolveCapabilityLink } from "./capabilities";

export interface TagDefinition {
  id: string;
  key: string;
  displayName: string;
  description?: string | null;
  color?: string | null;
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
  origin: "manual";
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

export async function listTagDefinitions(context: StudioEndpointContext): Promise<TagDefinitionList> {
  const response = await context.http.getJson<unknown>(await definitionsPath(context));
  const value = object(response);
  const rawItems = Array.isArray(value?.items) ? value.items : Array.isArray(value?.definitions) ? value.definitions : [];
  return {
    items: rawItems.map(normalizeTagDefinition).filter((item): item is TagDefinition => item !== null),
    canManage: value?.canManage === true
  };
}

export async function createTagDefinition(context: StudioEndpointContext, request: { canonicalKey: string; displayName: string; description?: string | null; color?: string | null }) {
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

export async function getWorkflowDefinitionTags(context: StudioEndpointContext, definitionId: string): Promise<WorkflowDefinitionTagSet> {
  const response = await context.http.getJson<unknown>(await tagSetPath(context, definitionId));
  return normalizeTagSet(response, definitionId);
}

export async function replaceWorkflowDefinitionTags(
  context: StudioEndpointContext,
  definitionId: string,
  revision: string,
  tagDefinitionIds: string[]
): Promise<WorkflowDefinitionTagSet> {
  try {
    const response = await context.http.requestJson<unknown>(await tagSetPath(context, definitionId), {
      method: "PUT",
      headers: { "Content-Type": "application/json", Accept: "application/json", "If-Match": revision },
      body: JSON.stringify({ tagDefinitionIds: [...new Set(tagDefinitionIds)] })
    });
    return normalizeTagSet(response, definitionId);
  } catch (error) {
    if (isRevisionConflict(error)) throw new TagSetRevisionConflictError();
    throw error;
  }
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
    status: record.status,
    revision: record.revision,
    canManage: record.canManage === true
  };
}

function normalizeTagSet(value: unknown, requestedDefinitionId: string): WorkflowDefinitionTagSet {
  const record = object(value);
  const assertions = Array.isArray(record?.assertions)
    ? record.assertions.map(normalizeAssertion).filter((item): item is WorkflowDefinitionTagAssertion => item !== null)
    : [];
  return {
    workflowDefinitionId: isNonBlankString(record?.workflowDefinitionId) ? record.workflowDefinitionId : requestedDefinitionId,
    revision: isNonBlankString(record?.revision) ? record.revision : "",
    assertions,
    canAssign: record?.canAssign === true
  };
}

function normalizeAssertion(value: unknown): WorkflowDefinitionTagAssertion | null {
  const record = object(value);
  return record && isNonBlankString(record.tagDefinitionId) && record.origin === "manual"
    ? { tagDefinitionId: record.tagDefinitionId, origin: "manual" }
    : null;
}

function isRevisionConflict(error: unknown) {
  const record = object(error);
  const response = object(record?.response) ?? object(record?.data) ?? record;
  return record?.status === 409 || response?.status === 409
    ? response?.code === "tag-set-revision-conflict" || record?.code === "tag-set-revision-conflict"
    : false;
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
