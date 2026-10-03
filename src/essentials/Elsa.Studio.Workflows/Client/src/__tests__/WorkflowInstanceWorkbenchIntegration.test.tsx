import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import type { StudioAiContributionApi, StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { WorkflowInstanceDetailsWorkbench } from "../workflow-editor/WorkflowInstances";
import type {
  ActivityExecutionInspection,
  ActivityExecutionStateSummary,
  ActivityCatalogItem,
  IncidentStateSummary,
  WorkflowExecutableDetails,
  WorkflowExecutableNode,
  WorkflowInstanceDetails,
  WorkflowInstanceSummary
} from "../workflowTypes";
import { sequenceActivity, writeLine } from "./fixtures";

const api = vi.hoisted(() => ({
  getActivityExecutionInspection: vi.fn(),
  getExecutable: vi.fn(),
  getExecutableInputSources: vi.fn(),
  getWorkflowInstance: vi.fn(),
  listWorkflowInstances: vi.fn(),
  supportsActivityExecutionInspection: vi.fn(),
  supportsWorkflowInstanceHealthFilter: vi.fn(),
  listActivities: vi.fn()
}));

vi.mock("../api/runtime", () => ({
  ...api,
  WorkflowInstanceHealthFilterUnavailableError: class extends Error {}
}));
vi.mock("../api/activityDesign", () => ({ listActivities: api.listActivities }));
vi.mock("@xyflow/react", async importOriginal => {
  const actual = await importOriginal<typeof import("@xyflow/react")>();
  return {
    ...actual,
    ReactFlow: ({ nodes }: { nodes: Array<{ id: string; selected?: boolean; data: Record<string, unknown> }> }) => (
      <div className="wf-mock-react-flow">
        {nodes.map(node => (
          <span key={node.id} data-flow-node-id={node.data.runtimeNodeId ?? node.id} data-selected={String(!!node.selected)}>
            {String(node.data.label ?? "")}
          </span>
        ))}
      </div>
    ),
    Background: () => null,
    Controls: () => null,
    MiniMap: () => null
  };
});

let container: HTMLDivElement;
let root: Root;
let observedWidth = 1100;

beforeEach(() => {
  window.localStorage.clear();
  window.localStorage.setItem("elsa-studio-run-detail-inspector-maximized", "true");
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  observedWidth = 1100;
  vi.stubGlobal("ResizeObserver", class {
    private readonly callback: ResizeObserverCallback;
    constructor(callback: ResizeObserverCallback) { this.callback = callback; }
    observe() { this.callback([{ contentRect: { width: observedWidth } } as ResizeObserverEntry], this as unknown as ResizeObserver); }
    disconnect() {}
  });

  const catalog = [sequenceActivity, { ...writeLine, inputs: [{
    referenceKey: "text",
    name: "Text",
    typeName: "string",
    displayName: "Text"
  }] } satisfies ActivityCatalogItem];
  api.listActivities.mockResolvedValue({ activities: catalog });
  api.getWorkflowInstance.mockResolvedValue(workflowDetails());
  api.getExecutable.mockResolvedValue(executable());
  api.getExecutableInputSources.mockResolvedValue({ authoredInputs: [], compiledInputs: [], access: "allowed" });
  api.supportsActivityExecutionInspection.mockResolvedValue(false);
  api.getActivityExecutionInspection.mockResolvedValue(activityInspection());
});

afterEach(() => {
  flushSync(() => root.unmount());
  container.remove();
  window.localStorage.clear();
  vi.unstubAllGlobals();
  vi.resetAllMocks();
});

describe("workflow run workbench incident navigation", () => {
  it("restores the nested canvas from a maximized Issues view and keeps input evidence navigation in Activity", async () => {
    renderWorkbench();

    await vi.waitFor(() => expect(container.querySelector(".wf-instance-detail-workbench.inspector-maximized")).toBeTruthy());
    expect(container.querySelector("[data-tab-id='issues']")?.getAttribute("aria-selected")).toBe("true");
    click(buttonByText(container, "Show affected activity"));

    await vi.waitFor(() => expect(container.querySelector(".wf-instance-detail-workbench.inspector-maximized")).toBeNull());
    await vi.waitFor(() => expect(container.querySelector("[data-flow-node-id='target-node']")).toBeTruthy());
    expect(container.querySelector("[data-flow-node-id='target-node']")?.getAttribute("data-selected")).toBe("true");
    expect(container.querySelector("[data-tab-id='activity']")?.getAttribute("aria-selected")).toBe("true");

    click(container.querySelector<HTMLButtonElement>("[data-tab-id='issues']"));
    click(buttonByText(container, "View input evidence"));
    await vi.waitFor(() => expect(container.querySelector("[data-tab-id='activity']")?.getAttribute("aria-selected")).toBe("true"));
    await vi.waitFor(() => expect(container.querySelector<HTMLDetailsElement>(".wf-input-inspection-row details")?.open).toBe(true));
  });

  it("opens a direct Issues tab query after the workbench measures at phone width", async () => {
    observedWidth = 390;
    renderWorkbench();

    await vi.waitFor(() => expect(container.querySelector(".wf-instance-detail-workbench.narrow-inspector-view")).toBeTruthy());
    click(container.querySelector<HTMLButtonElement>("[aria-label='Back to workflow run canvas']"));
    await vi.waitFor(() => expect(container.querySelector(".wf-instance-detail-workbench.narrow-canvas-view")).toBeTruthy());
  });

  it("does not restore Activity or reopen the drawer after a user changes tab and closes during lookup", async () => {
    observedWidth = 600;
    api.getWorkflowInstance.mockResolvedValue(workflowDetails({ activities: [] }));
    api.supportsActivityExecutionInspection.mockReset().mockResolvedValueOnce(false).mockResolvedValue(true);
    const lookup = deferred<ActivityExecutionInspection>();
    api.getActivityExecutionInspection.mockReturnValue(lookup.promise);

    renderWorkbench();
    await vi.waitFor(() => expect(container.querySelector(".wf-instance-detail-workbench.inspector-drawer-open")).toBeTruthy());
    click(buttonByText(container, "View input evidence"));
    await vi.waitFor(() => expect(api.getActivityExecutionInspection).toHaveBeenCalledTimes(1));
    click(container.querySelector<HTMLButtonElement>("[data-tab-id='details']"));
    click(container.querySelector<HTMLButtonElement>("[aria-label='Close run details panel']"));
    await vi.waitFor(() => expect(container.querySelector(".wf-instance-detail-workbench.inspector-drawer-open")).toBeNull());

    lookup.resolve(activityInspection());
    await vi.waitFor(() => expect(container.querySelector("[data-tab-id='details']")?.getAttribute("aria-selected")).toBe("true"));
    expect(container.querySelector(".wf-instance-detail-workbench.inspector-drawer-open")).toBeNull();
  });

  it("keeps the newest incident selected when exact activity lookups finish out of order", async () => {
    const firstIncident = incident({ incidentId: "incident-first", activityExecutionId: "execution-first", executableNodeId: "compiled-first", failureType: "FirstFailure", metadata: {} });
    const secondIncident = incident({ incidentId: "incident-second", activityExecutionId: "execution-second", executableNodeId: "compiled-second", failureType: "SecondFailure", metadata: {} });
    api.getWorkflowInstance.mockResolvedValue(workflowDetails({ activities: [], incidents: [firstIncident, secondIncident] }));
    api.supportsActivityExecutionInspection.mockReset().mockResolvedValueOnce(false).mockResolvedValue(true);
    const firstLookup = deferred<ActivityExecutionInspection>();
    const secondLookup = deferred<ActivityExecutionInspection>();
    api.getActivityExecutionInspection.mockImplementation((_context, _workflowExecutionId, activityExecutionId: string) =>
      activityExecutionId === "execution-first" ? firstLookup.promise : secondLookup.promise);

    renderWorkbench();
    await vi.waitFor(() => expect(container.querySelector(".wf-instance-detail-workbench")).toBeTruthy());
    const incidentRows = [...container.querySelectorAll<HTMLElement>(".wf-instance-incident")];
    expect(incidentRows).toHaveLength(2);
    click(buttonByText(incidentRows[0]!, "Show affected activity"));
    click(buttonByText(incidentRows[1]!, "Show affected activity"));
    expect(container.querySelector(".wf-instance-incident[data-selected='true']")?.textContent).toContain("SecondFailure");
    expect(container.querySelector("[data-tab-id='issues']")?.getAttribute("aria-selected")).toBe("true");
    await vi.waitFor(() => expect(api.getActivityExecutionInspection).toHaveBeenCalledTimes(2));

    secondLookup.resolve(activityInspection({
      activityExecutionId: "execution-second",
      executableNodeId: "compiled-second",
      authoredActivityId: "target-second",
      incidents: [secondIncident]
    }));
    await vi.waitFor(() => expect(container.querySelector(".wf-instance-incident[data-selected='true']")?.textContent).toContain("SecondFailure"));
    firstLookup.resolve(activityInspection({
      activityExecutionId: "execution-first",
      executableNodeId: "compiled-first",
      authoredActivityId: "target-first",
      incidents: [firstIncident]
    }));
    await vi.waitFor(() => expect(container.querySelector(".wf-instance-incident[data-selected='true']")?.textContent).toContain("SecondFailure"));
  });
});

function buttonByText(scope: ParentNode, text: string) {
  return [...scope.querySelectorAll<HTMLButtonElement>("button")].find(button => button.textContent?.trim() === text);
}

function renderWorkbench() {
  flushSync(() => root.render(<WorkflowInstanceDetailsWorkbench
    context={{} as StudioEndpointContext}
    ai={{ promptActions: { list: () => [] } } as unknown as StudioAiContributionApi}
    workflowExecutionId="run-1"
    initialInspectorTab="issues"
    navigate={() => {}}
  />));
}

function click(button: HTMLButtonElement | undefined | null) {
  flushSync(() => button?.click());
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>(done => { resolve = done; });
  return { promise, resolve };
}

function workflowDetails({ activities = [activityExecution()], incidents = [incident()] }: {
  activities?: ActivityExecutionStateSummary[];
  incidents?: IncidentStateSummary[];
} = {}): WorkflowInstanceDetails {
  const instance: WorkflowInstanceSummary = {
    workflowExecutionId: "run-1",
    artifactId: "artifact-1",
    artifactVersion: "1.0.0",
    artifactHash: "sha256:1",
    definitionId: "definition-1",
    definitionVersionId: "version-1",
    sourceReferenceId: "reference-1",
    status: "Faulted",
    createdAt: "2026-10-01T12:00:00Z",
    startedAt: "2026-10-01T12:00:00Z",
    completedAt: null,
    activityCount: activities.length,
    incidentCount: incidents.length
  };
  return { instance, activities, incidents };
}

function activityExecution(): ActivityExecutionStateSummary {
  return {
    activityExecutionId: "execution-target",
    workflowExecutionId: "run-1",
    executableNodeId: "compiled-target",
    authoredActivityId: "target-node",
    activityType: writeLine.activityTypeKey,
    activityTypeVersion: writeLine.version,
    status: "Faulted",
    scheduledAt: "2026-10-01T12:00:00Z",
    bookmarkIds: [],
    incidentCount: 1,
    incidentIds: ["incident-target"],
    faultCount: 1,
    aggregateFaultCount: 0,
    metadata: {}
  };
}

function incident(overrides: Partial<IncidentStateSummary> = {}): IncidentStateSummary {
  return {
    incidentId: "incident-target",
    workflowExecutionId: "run-1",
    activityExecutionId: "execution-target",
    executableNodeId: "compiled-target",
    severity: "Error",
    status: "Open",
    resolutionAction: "None",
    failureType: "ActivityInputFailed",
    message: "The Text input failed.",
    createdAt: "2026-10-01T12:00:00Z",
    isBlocking: true,
    metadata: { "runtime.inputKey": "text" },
    ...overrides
  };
}

function executable(): WorkflowExecutableDetails {
  const target: WorkflowExecutableNode = {
    executableNodeId: "compiled-target",
    authoredActivityId: "target-node",
    activityType: writeLine.activityTypeKey,
    activityTypeVersion: writeLine.version,
    inputBindings: [{ inputName: "Text", inputKey: "text", source: "Literal", literalValue: "hello" }],
    childSlots: []
  };
  const nestedSequence: WorkflowExecutableNode = {
    executableNodeId: "compiled-nested-sequence",
    authoredActivityId: "nested-sequence",
    activityType: sequenceActivity.activityTypeKey,
    activityTypeVersion: sequenceActivity.version,
    structureKind: "elsa.sequence.structure",
    inputBindings: [],
    childSlots: [{ name: "Sequence.Activities", activities: [target] }]
  };
  const rootActivity: WorkflowExecutableNode = {
    executableNodeId: "compiled-root-sequence",
    authoredActivityId: "root-sequence",
    activityType: sequenceActivity.activityTypeKey,
    activityTypeVersion: sequenceActivity.version,
    structureKind: "elsa.sequence.structure",
    inputBindings: [],
    childSlots: [{ name: "Sequence.Activities", activities: [nestedSequence] }]
  };
  return {
    artifactId: "artifact-1",
    artifactHash: "sha256:1",
    createdAt: "2026-10-01T12:00:00Z",
    rootActivityType: sequenceActivity.activityTypeKey,
    rootActivityVersion: sequenceActivity.version,
    nodeCount: 3,
    resumeTargetCount: 0,
    rootActivity,
    chosenReference: { sourceReferenceId: "reference-1", selection: "requested", layout: [] },
    references: []
  };
}

function activityInspection(overrides: Partial<ActivityExecutionInspection> = {}): ActivityExecutionInspection {
  return {
    activityExecutionId: "execution-target",
    workflowExecutionId: "run-1",
    executableNodeId: "compiled-target",
    authoredActivityId: "target-node",
    activityType: writeLine.activityTypeKey,
    activityTypeVersion: writeLine.version,
    status: "Faulted",
    executionSequence: 1,
    scheduledAt: "2026-10-01T12:00:00Z",
    provenance: {} as ActivityExecutionInspection["provenance"],
    outcomeNames: [],
    bookmarks: [],
    incidents: [incident()],
    valueSnapshots: [],
    metadata: {},
    ...overrides
  };
}
