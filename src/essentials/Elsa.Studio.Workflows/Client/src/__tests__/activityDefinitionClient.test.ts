import { afterEach, describe, expect, it, vi } from "vitest";
import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import {
  applyActivityDefinitionContractProposal,
  createActivityDefinition,
  createActivityDefinitionConflictCopy,
  createActivityDefinitionDraft,
  getActivityDefinition,
  getActivityDefinitionDraft,
  getActivityDefinitionDraftSummary,
  getActivityDefinitionVersion,
  getActivityDefinitionVersionSummary,
  listActivityDefinitionDrafts,
  listActivityDefinitions,
  listActivityDefinitionVersions,
  listRecommendedActivityDefinitions,
  migrateActivityDefinitionDraft,
  replaceActivityDefinitionDraft
} from "../api/activityDesign";
import { clearApiCapabilityCache } from "../api/capabilities";
import type { ActivityDefinitionDraftView, ActivityDefinitionVersionView } from "../activityDefinitionTypes";

afterEach(clearApiCapabilityCache);

describe("Activity Definition management client", () => {
  it("uses only advertised bounded management relations", async () => {
    const getJson = vi.fn(async (url: string) => {
      if (url === "/capabilities") return capabilities();
      if (url === "/design/activities/drafts/draft%2F1") return { draftId: "draft/1", definitionId: "definition/1", revision: 2, sourceVersionId: null, status: "Active", provider: { providerKey: "visual-graph", schemaVersion: "1" }, updatedAt: "2026-07-17T10:00:00Z", presentationLabel: null };
      if (url === "/design/activities/versions/version%2F1") return { definition: { definitionId: "definition/1", recommendedVersionId: "version/1" }, versionId: "version/1", version: "1.0.0", lifecycle: "Active", provider: { providerKey: "visual-graph", schemaVersion: "1" }, publishedAt: "2026-07-17T10:00:00Z" };
      return page();
    });
    const context = { baseUrl: "test://activity-definition-client", http: { getJson } } as unknown as StudioEndpointContext;

    await listActivityDefinitions(context, { limit: 25, cursor: "cursor/2", search: "invoice", authority: "Design", providerKey: "visual-graph" });
    await getActivityDefinition(context, "definition/1");
    await listActivityDefinitionDrafts(context, { definitionId: "definition/1", limit: 10, cursor: "draft-cursor" });
    await listActivityDefinitionVersions(context, { definitionId: "definition/1", limit: 10, cursor: "version-cursor" });
    await getActivityDefinitionDraftSummary(context, "definition/1", "draft/1");
    await getActivityDefinitionVersionSummary(context, "definition/1", "version/1");

    expect(getJson.mock.calls.map(([url]) => url)).toEqual([
      "/capabilities",
      "/design/activities/definitions?limit=25&sort=identity-asc&cursor=cursor%2F2&search=invoice&authority=Design&providerKey=visual-graph",
      "/design/activities/definitions/definition%2F1",
      "/design/activities/definitions/definition%2F1/drafts?limit=10&sort=identity-asc&cursor=draft-cursor",
      "/design/activities/definitions/definition%2F1/versions?limit=10&sort=identity-asc&cursor=version-cursor",
      "/design/activities/drafts/draft%2F1",
      "/design/activities/versions/version%2F1"
    ]);
  });

  it("fails before a domain request when the collection relation is absent", async () => {
    const getJson = vi.fn(async () => ({ capabilities: [{ id: "elsa.api.activity-design", contractVersion: "1", links: [] }] }));
    const context = { baseUrl: "test://activity-definition-client-missing", http: { getJson } } as unknown as StudioEndpointContext;

    await expect(listActivityDefinitions(context, { limit: 25 })).rejects.toMatchObject({ name: "ApiCapabilityUnavailableError", relation: "activity-definitions" });
    expect(getJson).toHaveBeenCalledTimes(1);
  });

  it("reads only the authoritative recommended version for each definition without sorting version strings", async () => {
    const getJson = vi.fn(async (url: string) => {
      if (url === "/capabilities") return capabilities();
      if (url === "/design/activities/definitions/picker?offset=0&limit=100") return {
        items: [
          {
            definitionId: "definition/1",
            activityTypeKey: "Contoso.Invoice",
            tenantId: null,
            category: "Finance",
            displayName: "Invoice",
            description: "Process an invoice.",
            versionId: "version/2",
            version: "2.0.0",
            isAvailable: true,
            unavailableReason: null
          }
        ],
        nextOffset: null
      };
      throw new Error(`Unexpected GET ${url}`);
    });
    const context = { baseUrl: "test://recommended-activity-client", http: { getJson } } as unknown as StudioEndpointContext;

    const result = await listRecommendedActivityDefinitions(context);

    expect(result).toEqual([expect.objectContaining({
      definitionId: "definition/1",
      versionId: "version/2",
      version: "2.0.0"
    })]);
    expect(getJson).toHaveBeenCalledTimes(2);
  });
});

describe("Activity Definition graph payload wire boundary", () => {
  it("canonicalizes replaced graph inputs and re-expands the saved draft, including nested inputs and passthrough fields", async () => {
    const authoringPayload = graphAuthoringPayload();
    const wirePayload = graphWirePayload();
    const provider = {
      providerKey: "elsa.activity-graph",
      schemaVersion: "2",
      payload: authoringPayload,
      providerExtension: { retain: true }
    };
    const layout = [{ nodeId: "root", data: { x: 24, y: 48, customLayoutValue: "retain" } }];
    const putJson = vi.fn(async (_url: string, body: unknown) => {
      const request = body as { provider: typeof provider; layout: typeof layout };
      return fullDraft({
        ...request.provider,
        manifestFingerprint: "manifest-fingerprint",
        payload: wirePayload
      } as ActivityDefinitionDraftView["provider"], request.layout);
    });
    const getJson = vi.fn(async (url: string) => url === "/capabilities" ? capabilities() : null);
    const context = { baseUrl: "test://activity-definition-graph-save", http: { getJson, putJson } } as unknown as StudioEndpointContext;

    const saved = await replaceActivityDefinitionDraft(context, "draft-1", {
      expectedRevision: 3,
      contract: contract(),
      provider,
      layout
    });

    const sentProvider = (putJson.mock.calls[0]?.[1] as { provider: typeof provider }).provider;
    const sentPayload = sentProvider.payload as ReturnType<typeof graphWirePayload>;
    expect(sentProvider.providerExtension).toEqual({ retain: true });
    expect(sentPayload.payloadExtension).toEqual({ retain: "payload" });
    expect(sentPayload.rootActivity.inputs).toContainEqual({
      referenceKey: "text",
      value: { value: "return 'root';", expressionType: "JavaScript" },
      conversion: { mode: "Explicit", target: "string" },
      autoEvaluate: false,
      futureArgumentField: "retain-root"
    });
    expect(sentPayload.rootActivity.structure?.payload.activities[0].inputs).toContainEqual({
      referenceKey: "text",
      value: { value: "{{ variables.message }}", expressionType: "Liquid" },
      conversion: { mode: "Explicit", target: "string" },
      evaluatorType: "liquid-evaluator",
      futureArgumentField: "retain-child"
    });
    expect(sentPayload.rootActivity.outputs).toEqual(authoringPayload.rootActivity.outputs);
    expect(sentPayload.rootActivity.rootExtension).toEqual({ retain: "root" });
    expect(sentPayload.rootActivity.structure?.payload.structureExtension).toEqual({ retain: "structure" });
    expect(putJson.mock.calls[0]?.[1]).toMatchObject({ expectedRevision: 3, layout });

    const savedPayload = saved.provider.payload as ReturnType<typeof graphAuthoringPayload>;
    expect(saved.provider).toMatchObject({ providerExtension: { retain: true } });
    expect(savedPayload.payloadExtension).toEqual({ retain: "payload" });
    expect(savedPayload.rootActivity.inputs).toEqual([]);
    expect(savedPayload.rootActivity.text).toEqual({
      typeName: "",
      expression: { type: "JavaScript", value: "return 'root';" },
      conversion: { mode: "Explicit", target: "string" },
      argumentExtras: { autoEvaluate: false, futureArgumentField: "retain-root" }
    });
    expect(savedPayload.rootActivity.structure?.payload.activities[0].text).toEqual({
      typeName: "",
      expression: { type: "Liquid", value: "{{ variables.message }}" },
      conversion: { mode: "Explicit", target: "string" },
      argumentExtras: { evaluatorType: "liquid-evaluator", futureArgumentField: "retain-child" }
    });
    expect(savedPayload.rootActivity.nullable.expression.value).toBeNull();
    expect(savedPayload.rootActivity.structure?.payload.activities[0].nullable.expression.value).toBeNull();
    expect(savedPayload.rootActivity.structure?.payload.activities[0].childExtension).toEqual({ retain: "child" });
    expect(savedPayload.rootActivity.outputs).toEqual(authoringPayload.rootActivity.outputs);
    expect(saved.layout).toEqual(layout);

    const movedLayout = moveRootLayout(saved.layout, 40, 64);
    await replaceActivityDefinitionDraft(context, "draft-1", {
      expectedRevision: saved.revision,
      contract: saved.contract,
      provider: { ...saved.provider, payload: savedPayload },
      layout: movedLayout
    });
    const resavedPayload = (putJson.mock.calls[1]?.[1] as { provider: typeof provider }).provider.payload as ReturnType<typeof graphWirePayload>;
    expect(putJson.mock.calls[1]?.[1]).toMatchObject({ layout: [{ nodeId: "root", data: { x: 40, y: 64, customLayoutValue: "retain" } }] });
    expect(resavedPayload.rootActivity.inputs).toContainEqual({
      referenceKey: "nullable",
      value: { value: null, expressionType: "Literal" }
    });
    expect(resavedPayload.rootActivity.structure?.payload.activities[0].inputs).toContainEqual({
      referenceKey: "nullable",
      value: { value: null, expressionType: "Literal" }
    });
  });

  it("normalizes provider-bearing create, migration, conflict-copy, and contract-application boundaries", async () => {
    const wirePayload = graphWirePayload();
    const authoringPayload = graphAuthoringPayload();
    const provider = { providerKey: "elsa.activity-graph", schemaVersion: "2", payload: authoringPayload };
    const calls: Array<{ url: string; body: unknown }> = [];
    const postJson = vi.fn(async (url: string, body: unknown) => {
      calls.push({ url, body });
      if (url === "/design/activities/definitions") {
        return { definition: { definitionId: "definition-1" }, draft: { draftId: "draft-1", providerKey: provider.providerKey } };
      }
      return fullDraft({ ...provider, manifestFingerprint: "fp", payload: wirePayload } as ActivityDefinitionDraftView["provider"]);
    });
    const getJson = vi.fn(async (url: string) => url === "/capabilities" ? capabilities() : null);
    const context = { baseUrl: "test://activity-definition-graph-mutations", http: { getJson, postJson } } as unknown as StudioEndpointContext;

    await createActivityDefinition(context, {
      category: "Tests",
      displayName: "Graph activity",
      description: null,
      provider,
      contract: contract(),
      layout: []
    });
    const created = await createActivityDefinitionDraft(context, "definition-1", {
      sourceVersionId: null,
      provider
    });
    const migrated = await migrateActivityDefinitionDraft(context, "draft-1", {
      expectedRevision: 4,
      targetProviderKey: provider.providerKey,
      targetSchemaVersion: provider.schemaVersion
    });
    const copied = await createActivityDefinitionConflictCopy(context, "draft-1", {
      expectedSourceRevision: 4,
      contract: contract(),
      provider,
      layout: []
    });
    const applied = await applyActivityDefinitionContractProposal(context, "draft-1", {
      expectedRevision: 4,
      expectedProviderKey: provider.providerKey,
      expectedProviderSchemaVersion: provider.schemaVersion,
      expectedManifestFingerprint: "fp",
      proposalFingerprint: "proposal-fp",
      selectedChangeIds: []
    });

    const payloadBearingRequests = calls.filter(call =>
      call.url !== "/design/activities/drafts/draft-1/migrate-provider" &&
      call.url !== "/design/activities/drafts/draft-1/contract-proposals/apply");
    expect(payloadBearingRequests).toHaveLength(3);
    for (const call of payloadBearingRequests) {
      const body = call.body as { provider: { payload: ReturnType<typeof graphWirePayload> } };
      expect(body.provider.payload.rootActivity.inputs).toContainEqual(expect.objectContaining({ referenceKey: "text" }));
      expect(body.provider.payload.rootActivity).not.toHaveProperty("text");
    }
    for (const result of [created, migrated, copied, applied]) {
      const resultPayload = result.provider.payload as ReturnType<typeof graphAuthoringPayload>;
      expect(resultPayload.rootActivity.text.expression.value).toBe("return 'root';");
      expect(resultPayload.rootActivity.structure?.payload.activities[0].text.expression.value).toBe("{{ variables.message }}");
    }
  });

  it("expands graph payloads on full-draft and version reads, while leaving other and redacted providers unchanged", async () => {
    const wirePayload = graphWirePayload();
    const layout = [{ nodeId: "root", data: { x: 16, y: 24, customLayoutValue: "retain" } }];
    const getJson = vi.fn(async (url: string) => {
      if (url === "/capabilities") return capabilities();
      if (url === "/design/activities/drafts/draft-1") {
        return fullDraft({ providerKey: "elsa.activity-graph", schemaVersion: "2", manifestFingerprint: "fp", payload: wirePayload }, layout);
      }
      if (url === "/design/activities/versions/version-1") return fullVersion({
        providerKey: "elsa.activity-graph", schemaVersion: "2", manifestFingerprint: "fp", payload: wirePayload
      });
      if (url === "/design/activities/drafts/redacted") return fullDraft({
        providerKey: "elsa.activity-graph", schemaVersion: "2", manifestFingerprint: "fp"
      });
      if (url === "/design/activities/drafts/other-provider") return fullDraft({
        providerKey: "contoso.custom", schemaVersion: "1", manifestFingerprint: "fp", payload: { rootActivity: { text: { expression: { type: "JavaScript", value: "leave alone" } } } }
      });
      throw new Error(`Unexpected GET ${url}`);
    });
    const putJson = vi.fn(async (_url: string, body: unknown) => {
      const request = body as { provider: { providerKey: string; schemaVersion: string; payload: unknown } };
      return fullDraft({ ...request.provider, manifestFingerprint: "fp" } as ActivityDefinitionDraftView["provider"]);
    });
    const context = { baseUrl: "test://activity-definition-graph-reads", http: { getJson, putJson } } as unknown as StudioEndpointContext;

    const draft = await getActivityDefinitionDraft(context, "draft-1");
    const draftPayload = draft.provider.payload as ReturnType<typeof graphAuthoringPayload>;
    const version = await getActivityDefinitionVersion(context, "version-1");
    const redacted = await getActivityDefinitionDraft(context, "redacted");
    const other = await getActivityDefinitionDraft(context, "other-provider");
    const foreignPayload = { rootActivity: { nodeId: "foreign-root", activityVersionId: "foreign-version", text: { expression: { type: "JavaScript", value: "leave alone" } } } };
    const foreignSaved = await replaceActivityDefinitionDraft(context, "draft-1", {
      expectedRevision: 5,
      contract: contract(),
      provider: { providerKey: "contoso.custom", schemaVersion: "1", payload: foreignPayload },
      layout: []
    });

    expect(draftPayload.rootActivity.text.expression.value).toBe("return 'root';");
    expect((version.provider.payload as ReturnType<typeof graphAuthoringPayload>).rootActivity.structure?.payload.activities[0].text.expression.value).toBe("{{ variables.message }}");
    expect(Object.hasOwn(redacted.provider, "payload")).toBe(false);
    expect(other.provider.payload).toEqual({ rootActivity: { text: { expression: { type: "JavaScript", value: "leave alone" } } } });
    expect((putJson.mock.calls[0]?.[1] as { provider: { payload: unknown } }).provider.payload).toEqual(foreignPayload);
    expect(foreignSaved.provider.payload).toEqual(foreignPayload);

    const movedLayout = moveRootLayout(draft.layout, 32, 64);
    await replaceActivityDefinitionDraft(context, "draft-1", {
      expectedRevision: draft.revision,
      contract: draft.contract,
      provider: { ...draft.provider, payload: draftPayload },
      layout: movedLayout
    });
    const savedGraphRequest = putJson.mock.calls[1]?.[1] as { provider: { payload: ReturnType<typeof graphWirePayload> }; layout: unknown };
    expect(savedGraphRequest.layout).toEqual([{ nodeId: "root", data: { x: 32, y: 64, customLayoutValue: "retain" } }]);
    expect(savedGraphRequest.provider.payload.rootActivity.inputs).toContainEqual({
      referenceKey: "nullable",
      value: { value: null, expressionType: "Literal" }
    });
    expect(savedGraphRequest.provider.payload.rootActivity.structure?.payload.activities[0].inputs).toContainEqual({
      referenceKey: "nullable",
      value: { value: null, expressionType: "Literal" }
    });
  });
});

function capabilities() {
  return { capabilities: [{ id: "elsa.api.activity-design", contractVersion: "1", links: [
    { rel: "activity-definitions", href: "design/activities/definitions" },
    { rel: "activity-definition", href: "design/activities/definitions/{definitionId}", templated: true },
    { rel: "activity-definition-drafts", href: "design/activities/definitions/{definitionId}/drafts", templated: true },
    { rel: "activity-definition-draft", href: "design/activities/drafts/{draftId}", templated: true },
    { rel: "activity-draft-conflict-copies", href: "design/activities/drafts/{draftId}/conflict-copies", templated: true },
    { rel: "activity-draft-contract-proposals-apply", href: "design/activities/drafts/{draftId}/contract-proposals/apply", templated: true },
    { rel: "activity-definition-versions", href: "design/activities/definitions/{definitionId}/versions", templated: true },
    { rel: "activity-definition-version", href: "design/activities/versions/{versionId}", templated: true },
    { rel: "recommended-activity-definitions", href: "design/activities/definitions/picker" }
  ] }] };
}

function page() { return { items: [], count: 0, totalCount: 0, hasMore: false, continuation: null, snapshot: { snapshotId: "snapshot-1", asOf: "2026-07-17T10:00:00Z" } }; }

function contract() {
  return { contractSchemaVersion: "1", inputs: [], outputs: [], outcomes: [] };
}

function moveRootLayout(layout: ActivityDefinitionDraftView["layout"], x: number, y: number) {
  return layout.map(record => record.nodeId === "root"
    ? { ...record, data: { ...(record.data as Record<string, unknown>), x, y } }
    : record);
}

function graphAuthoringPayload() {
  return {
    payloadExtension: { retain: "payload" },
    rootActivity: {
      nodeId: "root",
      activityVersionId: "root-version",
      inputs: [{ referenceKey: "existing", value: { value: "seed", expressionType: "Literal" }, futureArgumentField: "retain-existing" }],
      outputs: [{ referenceKey: "foreign-output", value: { value: "seed", expressionType: "Literal" }, futureOutputField: "retain-output" }],
      rootExtension: { retain: "root" },
      nullable: { typeName: "System.Object", expression: { type: "Literal", value: null } },
      text: {
        typeName: "System.String",
        expression: { type: "JavaScript", value: "return 'root';" },
        conversion: { mode: "Explicit", target: "string" },
        argumentExtras: { autoEvaluate: false, futureArgumentField: "retain-root" }
      },
      structure: {
        typeName: "Elsa.Flowchart",
        payload: {
          structureExtension: { retain: "structure" },
          activities: [{
            nodeId: "child",
            activityVersionId: "write-line-version",
            inputs: [],
            outputs: [],
            childExtension: { retain: "child" },
            nullable: { typeName: "System.Object", expression: { type: "Literal", value: null } },
            text: {
              typeName: "System.String",
              expression: { type: "Liquid", value: "{{ variables.message }}" },
              conversion: { mode: "Explicit", target: "string" },
              argumentExtras: { evaluatorType: "liquid-evaluator", futureArgumentField: "retain-child" }
            },
            structure: null
          }]
        }
      }
    }
  };
}

function graphWirePayload() {
  return {
    payloadExtension: { retain: "payload" },
    rootActivity: {
      nodeId: "root",
      activityVersionId: "root-version",
      inputs: [
        { referenceKey: "existing", value: { value: "seed", expressionType: "Literal" }, futureArgumentField: "retain-existing" },
        { referenceKey: "nullable", value: { value: null, expressionType: "Literal" } },
        {
          referenceKey: "text",
          value: { value: "return 'root';", expressionType: "JavaScript" },
          conversion: { mode: "Explicit", target: "string" },
          autoEvaluate: false,
          futureArgumentField: "retain-root"
        }
      ],
      outputs: [{ referenceKey: "foreign-output", value: { value: "seed", expressionType: "Literal" }, futureOutputField: "retain-output" }],
      rootExtension: { retain: "root" },
      structure: {
        typeName: "Elsa.Flowchart",
        payload: {
          structureExtension: { retain: "structure" },
          activities: [{
            nodeId: "child",
            activityVersionId: "write-line-version",
            inputs: [{
              referenceKey: "nullable",
              value: { value: null, expressionType: "Literal" }
            }, {
              referenceKey: "text",
              value: { value: "{{ variables.message }}", expressionType: "Liquid" },
              conversion: { mode: "Explicit", target: "string" },
              evaluatorType: "liquid-evaluator",
              futureArgumentField: "retain-child"
            }],
            outputs: [],
            childExtension: { retain: "child" },
            structure: null
          }]
        }
      }
    }
  };
}

function fullDraft(
  provider: ActivityDefinitionDraftView["provider"],
  layout: ActivityDefinitionDraftView["layout"] = []
): ActivityDefinitionDraftView {
  return {
    draftId: "draft-1",
    definitionId: "definition-1",
    revision: 5,
    status: "Active",
    contract: contract(),
    provider,
    layout,
    createdAt: "2026-07-17T10:00:00Z",
    updatedAt: "2026-07-17T10:00:00Z"
  };
}

function fullVersion(provider: ActivityDefinitionVersionView["provider"]): ActivityDefinitionVersionView {
  return {
    definition: { definitionId: "definition-1" } as ActivityDefinitionVersionView["definition"],
    versionId: "version-1",
    version: "1.0.0",
    contract: contract(),
    provider,
    lifecycle: "Active",
    publishedAt: "2026-07-17T10:00:00Z"
  };
}
