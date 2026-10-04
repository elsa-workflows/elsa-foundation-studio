import React from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type {
  ActivityDefinitionVersionManagementView,
  ActivityDefinitionVersionView,
  RecommendedActivityDefinition
} from "../activityDefinitionTypes";
import type { ActivityVersionDiffView } from "../api/activityVersionChange";
import type { ActivityNode, WorkflowDraft } from "../workflowTypes";
import {
  ActivityVersionChangeDialog,
  type ActivityVersionChangeApplyRequest
} from "../workflow-editor/ActivityVersionChangeDialog";
import {
  useActivityDefinitionVersions,
  useFullActivityDefinitionVersion
} from "../api/activityDesign";
import { useActivityVersionDiff } from "../api/activityVersionChange";

vi.mock("../api/activityDesign", () => ({
  useActivityDefinitionVersions: vi.fn(),
  useFullActivityDefinitionVersion: vi.fn()
}));

vi.mock("../api/activityVersionChange", () => ({
  useActivityVersionDiff: vi.fn()
}));

let active: { root: Root; container: HTMLElement } | null = null;
let api: ApiResults;

beforeEach(() => {
  api = readyApi();
  vi.mocked(useActivityDefinitionVersions).mockImplementation(() => api.versions as ReturnType<typeof useActivityDefinitionVersions>);
  vi.mocked(useFullActivityDefinitionVersion).mockImplementation((_context, versionId) =>
    (versionId ? api.targets[versionId] ?? queryResult(undefined) : queryResult(undefined)) as ReturnType<typeof useFullActivityDefinitionVersion>);
  vi.mocked(useActivityVersionDiff).mockImplementation((_context, _fromVersionId, versionId) =>
    (versionId ? api.diffs[versionId] ?? queryResult(undefined) : queryResult(undefined)) as ReturnType<typeof useActivityVersionDiff>);
});

afterEach(() => {
  if (active) {
    flushSync(() => active!.root.unmount());
    active.container.remove();
    active = null;
  }
  vi.clearAllMocks();
});

describe("ActivityVersionChangeDialog", () => {
  it("selects the recommended active target and applies the exact older active version when chosen", async () => {
    const onApply = vi.fn(async (_request: ActivityVersionChangeApplyRequest) => undefined);
    const { container } = renderDialog(onApply);

    await vi.waitFor(() => expect(versionRadio(container, "2.0.0").checked).toBe(true));
    expect(versionRadio(container, "2.0.0").closest("label")?.textContent).toContain("Recommended");
    expect(container.querySelector(".wf-version-targets")?.textContent).not.toContain("3.0.0");
    expect(versionRadio(container, "0.9.0").checked).toBe(false);

    click(versionRadio(container, "0.9.0"));
    await vi.waitFor(() => expect(versionRadio(container, "0.9.0").checked).toBe(true));
    click(button(container, "Apply version"));
    await vi.waitFor(() => expect(onApply).toHaveBeenCalledTimes(1));

    expect(onApply).toHaveBeenCalledWith(expect.objectContaining({
      targetVersionId: "version-0",
      scope: "occurrence"
    }));
  });

  it("keeps breaking risk and unresolved keys visible while exact IDs and preserved keys stay disclosed", async () => {
    const { container } = renderDialog();

    await vi.waitFor(() => expect(container.querySelector(".wf-version-summary")?.textContent).toContain("Breaking changes"));
    const summary = container.querySelector<HTMLElement>(".wf-version-summary")!;
    expect(summary.textContent).toContain("Legacy");
    expect(summary.textContent).toContain("Rejected");
    expect(summary.textContent).toContain("kept unresolved");

    const details = disclosure(container, "Change details");
    const detailsContent = details.querySelector<HTMLElement>("[hidden]")!;
    expect(detailsContent.hidden).toBe(true);
    expect(summary.textContent).not.toContain("version-1");
    expect(summary.textContent).not.toContain("version-2");
    expect(summary.textContent).not.toContain("Keep");
    expect(detailsContent.textContent).toContain("version-1");
    expect(detailsContent.textContent).toContain("version-2");
    expect(detailsContent.textContent).toContain("Keep");

    click(button(details, "Change details"));
    await vi.waitFor(() => expect(detailsContent.hidden).toBe(false));
    expect(detailsContent.textContent).toContain("Required bump");
    expect(detailsContent.textContent).toContain("Retained");
  });

  it("discloses matching-node scope and sends its exact scope with a current-draft count", async () => {
    const onApply = vi.fn(async (_request: ActivityVersionChangeApplyRequest) => undefined);
    const { container } = renderDialog(onApply);
    await vi.waitFor(() => expect(button(container, "Apply version").disabled).toBe(false));

    const scope = disclosure(container, "Apply scope");
    expect(scope.textContent).toContain("This node only");
    const scopeContent = scope.querySelector<HTMLElement>("[hidden]")!;
    expect(scopeContent.hidden).toBe(true);

    click(button(scope, "Apply scope"));
    await vi.waitFor(() => expect(scopeContent.hidden).toBe(false));
    const matching = [...container.querySelectorAll<HTMLInputElement>("input[name='version-change-scope']")]
      .find(input => input.closest("label")?.textContent?.includes("All matching nodes (2)"));
    expect(matching).not.toBeNull();
    expect(matching!.closest("label")?.textContent).toContain("All matching nodes (2)");
    click(matching!);

    await vi.waitFor(() => expect(container.querySelector(".wf-version-change-footer")?.textContent).toContain("2 matching nodes"));
    click(button(container, "Apply version"));
    await vi.waitFor(() => expect(onApply).toHaveBeenCalledTimes(1));
    expect(onApply).toHaveBeenCalledWith(expect.objectContaining({
      targetVersionId: "version-2",
      scope: "matching"
    }));
  });

  it("keeps Apply disabled for loading, mismatched, and failed version evidence", async () => {
    api.targets["version-2"] = queryResult(undefined, { pending: true });
    api.diffs["version-2"] = queryResult(undefined, { pending: true });
    const { container, rerender } = renderDialog();
    await vi.waitFor(() => expect(container.textContent).toContain("Checking changes…"));
    expect(button(container, "Apply version").disabled).toBe(true);

    api.targets["version-2"] = queryResult(version("version-2", "2.0.0"));
    api.diffs["version-2"] = queryResult(versionDiff("version-unrelated"));
    rerender();
    await vi.waitFor(() => expect(button(container, "Apply version").disabled).toBe(true));

    api.diffs["version-2"] = queryResult(undefined, { error: true });
    rerender();
    await vi.waitFor(() => expect(container.querySelector("[role='alert']")?.textContent).toContain("Version details could not be loaded"));
    expect(button(container, "Apply version").disabled).toBe(true);
  });
});

type ApiResults = {
  versions: unknown;
  targets: Record<string, unknown>;
  diffs: Record<string, unknown>;
};

function readyApi(): ApiResults {
  return {
    versions: queryResult({
      items: [
        versionSummary("version-2", "2.0.0", "Active", true),
        versionSummary("version-0", "0.9.0", "Active", false),
        versionSummary("version-retired", "3.0.0", "Retired", false)
      ],
      count: 3,
      totalCount: 3,
      hasMore: false,
      continuation: null,
      snapshot: { snapshotId: "versions", asOf: "2026-07-19T00:00:00Z" }
    }),
    targets: {
      "version-2": queryResult(version("version-2", "2.0.0")),
      "version-0": queryResult(version("version-0", "0.9.0"))
    },
    diffs: {
      "version-2": queryResult(versionDiff("version-2")),
      "version-0": queryResult(versionDiff("version-0"))
    }
  };
}

function queryResult<T>(data: T | undefined, options: { pending?: boolean; error?: boolean } = {}) {
  return {
    data,
    isPending: options.pending ?? false,
    isError: options.error ?? false,
    error: options.error ? new Error("request failed") : null
  };
}

function renderDialog(onApply: (request: ActivityVersionChangeApplyRequest) => Promise<void> = async () => undefined) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const props = dialogProps(onApply);
  flushSync(() => root.render(<ActivityVersionChangeDialog {...props} />));
  active = { root, container };
  return {
    container,
    rerender: () => flushSync(() => root.render(<ActivityVersionChangeDialog {...props} />))
  };
}

function dialogProps(onApply: (request: ActivityVersionChangeApplyRequest) => Promise<void>) {
  const draft = makeDraft();
  const occurrence = (draft.state.rootActivity!.structure!.payload.activities as ActivityNode[])[0]!;
  return {
    context: {} as StudioEndpointContext,
    draft,
    occurrence,
    current: version("version-1", "1.0.0"),
    recommendation: {
      definitionId: "activity-def",
      activityTypeKey: "Contoso.Activity",
      category: "Contoso",
      displayName: "Activity",
      versionId: "version-2",
      version: "2.0.0",
      isAvailable: true
    } satisfies RecommendedActivityDefinition,
    onApply,
    onCancel: vi.fn()
  };
}

function makeDraft(): WorkflowDraft {
  const first = activity("first", "version-1", ["Keep", "Legacy"]);
  const second = activity("second", "version-1", []);
  const other = activity("other", "other-version", []);
  return {
    id: "draft-1",
    definitionId: "workflow-1",
    sourceVersionId: "published-source",
    state: {
      rootActivity: {
        nodeId: "root",
        activityVersionId: "flowchart",
        inputs: [],
        outputs: [],
        structure: {
          kind: "Flowchart",
          schemaVersion: "1",
          payload: {
            activities: [first, second, other],
            connections: [{ source: { nodeId: "first", port: "Rejected" }, target: { nodeId: "other" } }]
          }
        }
      }
    },
    layout: [],
    validationErrors: []
  };
}

function activity(nodeId: string, activityVersionId: string, boundInputs: string[]): ActivityNode {
  return {
    nodeId,
    activityVersionId,
    inputs: boundInputs.map(referenceKey => ({ referenceKey, expression: { type: "Literal", value: `value:${referenceKey}` } })),
    outputs: []
  };
}

function version(versionId: string, semanticVersion: string): ActivityDefinitionVersionView {
  const current = versionId === "version-1";
  return {
    definition: {
      definitionId: "activity-def",
      activityTypeKey: "Contoso.Activity",
      category: "Contoso",
      displayName: "Activity",
      contentAuthority: { kind: "Design", authorityKey: "Design" }
    },
    versionId,
    version: semanticVersion,
    contract: {
      contractSchemaVersion: "1",
      inputs: (current ? ["Keep", "Legacy"] : ["Keep"]).map(referenceKey => ({
        referenceKey,
        name: referenceKey,
        type: { alias: "String", collectionKind: "None" },
        isRequired: false,
        isNullable: true,
        default: null,
        storageDriverKey: "Workflow",
        durability: "Durable"
      })),
      outputs: [],
      outcomes: (current ? ["Done", "Rejected"] : ["Done"]).map(referenceKey => ({
        referenceKey,
        name: referenceKey,
        isEmitted: true
      }))
    },
    provider: { providerKey: "ActivityGraph", schemaVersion: "1", manifestFingerprint: "hash" },
    lifecycle: "Active",
    publishedAt: "2026-07-19T00:00:00Z"
  };
}

function versionSummary(versionId: string, semanticVersion: string, lifecycle: string, isRecommended: boolean): ActivityDefinitionVersionManagementView {
  return {
    version: { versionId, definitionId: "activity-def", version: semanticVersion, lifecycle, publishedAt: "2026-07-19T00:00:00Z" },
    providerKey: "ActivityGraph",
    providerSchemaVersion: "1",
    isRecommended,
    actions: []
  };
}

function versionDiff(toVersionId: string): ActivityVersionDiffView {
  return {
    from: { kind: "Version", definitionId: "activity-def", versionId: "version-1", version: "1.0.0" },
    to: { kind: "Version", definitionId: "activity-def", versionId: toVersionId, version: toVersionId === "version-0" ? "0.9.0" : "2.0.0" },
    compatibility: "Breaking",
    requiredBump: "Major",
    behaviorChanged: true,
    provider: { fromKey: "ActivityGraph", toKey: "ActivityGraph", changed: false },
    summary: { breaking: 2, additive: 0, nonBehavioral: 0, warnings: 0 },
    changes: [
      {
        changeId: "legacy-removed",
        area: "Contract",
        kind: "Removed",
        subject: { memberKind: "Input", referenceKey: "Legacy" },
        impact: "Breaking",
        requiredBump: "Major",
        message: "Legacy input was removed."
      },
      {
        changeId: "rejected-removed",
        area: "Contract",
        kind: "Removed",
        subject: { memberKind: "Outcome", referenceKey: "Rejected" },
        impact: "Breaking",
        requiredBump: "Major",
        message: "Rejected outcome was removed."
      }
    ],
    diagnostics: []
  };
}

function versionRadio(container: ParentNode, semanticVersion: string) {
  const choice = [...container.querySelectorAll<HTMLLabelElement>(".wf-version-choice")]
    .find(label => label.textContent?.includes(semanticVersion));
  const radio = choice?.querySelector<HTMLInputElement>("input[type='radio']");
  if (!radio) throw new Error(`Could not find target version ${semanticVersion}.`);
  return radio;
}

function disclosure(container: ParentNode, title: string) {
  const section = [...container.querySelectorAll<HTMLElement>(".wf-version-disclosure")]
    .find(candidate => candidate.querySelector("button strong")?.textContent === title);
  if (!section) throw new Error(`Could not find ${title} disclosure.`);
  return section;
}

function button(container: ParentNode, label: string) {
  const match = [...container.querySelectorAll<HTMLButtonElement>("button")]
    .find(candidate => candidate.textContent?.includes(label));
  if (!match) throw new Error(`Could not find button ${label}.`);
  return match;
}

function click(element: HTMLElement) {
  flushSync(() => element.click());
}

