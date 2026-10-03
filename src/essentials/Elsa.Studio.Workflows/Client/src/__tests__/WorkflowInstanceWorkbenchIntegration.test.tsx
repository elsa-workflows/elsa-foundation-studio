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

  it("clears stale incident state on refresh and ignores an exact lookup that completes afterward", async () => {
    api.getWorkflowInstance.mockResolvedValue(workflowDetails({ activities: [] }));
    api.supportsActivityExecutionInspection.mockReset()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);
    const lateLookup = deferred<ActivityExecutionInspection>();
    let lookupCount = 0;
    api.getActivityExecutionInspection.mockImplementation(() => {
      lookupCount++;
      if (lookupCount === 1) return Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }));
      return lateLookup.promise;
    });

    renderWorkbench();
    await vi.waitFor(() => expect(container.querySelector(".wf-instance-detail-workbench")).toBeTruthy());
    click(buttonByText(container, "View input evidence"));
    await vi.waitFor(() => expect(container.textContent).toContain("You do not have permission to inspect this activity execution"));
    expect(container.querySelector(".wf-instance-incident[data-selected='true']")).toBeTruthy();

    click(buttonByText(container, "Refresh"));
    await vi.waitFor(() => expect(api.getWorkflowInstance).toHaveBeenCalledTimes(2));
    await vi.waitFor(() => expect(container.textContent).not.toContain("You do not have permission to inspect this activity execution"));
    await vi.waitFor(() => expect(container.querySelector(".wf-instance-incident-summary")).toBeTruthy());
    expect(container.querySelector(".wf-instance-incident[data-selected='true']")).toBeNull();

    click(buttonByText(container, "View input evidence"));
    await vi.waitFor(() => expect(api.supportsActivityExecutionInspection).toHaveBeenCalledTimes(4));
    await vi.waitFor(() => expect(api.getActivityExecutionInspection).toHaveBeenCalledTimes(2));
    click(buttonByText(container, "Refresh"));
    await vi.waitFor(() => expect(api.getWorkflowInstance).toHaveBeenCalledTimes(3));
    await vi.waitFor(() => expect(container.querySelector(".wf-instance-incident-summary")).toBeTruthy());
    expect(container.querySelector(".wf-instance-incident[data-selected='true']")).toBeNull();

    lateLookup.resolve(activityInspection());
    await lateLookup.promise;
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(container.querySelector(".wf-instance-incident[data-selected='true']")).toBeNull();
    expect(container.querySelector("[data-tab-id='issues']")?.getAttribute("aria-selected")).toBe("true");
  });

  it("keeps denied and mismatched activity evidence unavailable while retrying only transient failures", async () => {
    const incidents = [
      incident({ incidentId: "denied-incident", activityExecutionId: "denied-execution" }),
      incident({ incidentId: "mismatch-incident", activityExecutionId: "mismatch-execution" }),
      incident({ incidentId: "transient-incident", activityExecutionId: "transient-execution" })
    ];
    api.getWorkflowInstance.mockResolvedValue(workflowDetails({ activities: [], incidents }));
    api.supportsActivityExecutionInspection.mockResolvedValue(true);
    let transientAttempt = 0;
    api.getActivityExecutionInspection.mockImplementation(async (_context, workflowExecutionId: string, activityExecutionId: string) => {
      if (activityExecutionId === "denied-execution") throw Object.assign(new Error("Forbidden"), { status: 403 });
      if (activityExecutionId === "mismatch-execution") return activityInspection({ activityExecutionId: "different-execution", workflowExecutionId });
      transientAttempt++;
      if (transientAttempt === 1) throw new Error("Runtime unavailable");
      return activityInspection({ activityExecutionId, workflowExecutionId });
    });

    renderWorkbench();
    await vi.waitFor(() => expect(container.textContent).toContain("You do not have permission to inspect 1 exact activity execution"));
    expect(container.textContent).toContain("Runtime returned a different run or activity execution for 1 association");
    expect(container.textContent).toContain("Some affected activities are not shown yet (1 remaining)");
    click(buttonByText(container, "Load more affected activities (1)"));

    await vi.waitFor(() => expect(transientAttempt).toBe(2));
    await vi.waitFor(() => expect(container.textContent).not.toContain("Loading affected activities..."));
    expect(api.getActivityExecutionInspection.mock.calls.map(([, , activityExecutionId]) => activityExecutionId)).toEqual([
      "denied-execution",
      "mismatch-execution",
      "transient-execution",
      "transient-execution"
    ]);
    expect(buttonByText(container, "Load more affected activities (1)")).toBeUndefined();
    expect(container.textContent).toContain("You do not have permission to inspect 1 exact activity execution");
    expect(container.textContent).toContain("Runtime returned a different run or activity execution for 1 association");
    expect(container.textContent).not.toContain("Some affected activities are not shown yet");
  });

  it("uses the pinned graph to label node-only incidents when exact execution inspection is absent", async () => {
    const nodeOnlyIncident = incident({
      activityExecutionId: null,
      executableNodeId: "compiled-target",
      metadata: { "runtime.inputKey": "text" }
    });
    api.getWorkflowInstance.mockResolvedValue(workflowDetails({ activities: [], incidents: [nodeOnlyIncident] }));
    const pinnedExecutable = executable();
    const nestedActivity = pinnedExecutable.rootActivity.childSlots[0]!.activities[0]!.childSlots[0]!.activities[0]!;
    nestedActivity.activityTypeVersion = "0.9.0";
    pinnedExecutable.chosenReference = {
      ...pinnedExecutable.chosenReference!,
      activityPresentation: [{ executableNodeId: "compiled-target", displayName: "Frozen Write Line" }]
    };
    api.getExecutable.mockResolvedValue(pinnedExecutable);

    renderWorkbench();

    await vi.waitFor(() => expect(container.querySelector(".wf-instance-incident-summary strong")?.textContent)
      .toBe("Frozen Write Line · Text input"));
    expect(api.getActivityExecutionInspection).not.toHaveBeenCalled();
  });

  it("clears input focus when a different incident is selected", async () => {
    const firstActivity = {
      ...activityExecution(),
      activityExecutionId: "execution-first",
      executableNodeId: "compiled-first",
      authoredActivityId: "target-first",
      incidentIds: ["incident-first"]
    };
    const secondActivity = {
      ...activityExecution(),
      activityExecutionId: "execution-second",
      executableNodeId: "compiled-second",
      authoredActivityId: "target-second",
      incidentIds: ["incident-second"]
    };
    const firstIncident = incident({ incidentId: "incident-first", activityExecutionId: "execution-first", executableNodeId: "compiled-first", failureType: "FirstFailure" });
    const secondIncident = incident({ incidentId: "incident-second", activityExecutionId: "execution-second", executableNodeId: "compiled-second", failureType: "SecondFailure" });
    api.getWorkflowInstance.mockResolvedValue(workflowDetails({ activities: [firstActivity, secondActivity], incidents: [firstIncident, secondIncident] }));
    api.getActivityExecutionInspection.mockImplementation((_context, workflowExecutionId: string, activityExecutionId: string) =>
      Promise.resolve(activityInspection({ activityExecutionId, workflowExecutionId })));

    renderWorkbench();
    await vi.waitFor(() => expect(container.querySelector(".wf-instance-detail-workbench")).toBeTruthy());
    click(buttonByText(container, "View input evidence"));
    await vi.waitFor(() => expect(container.querySelector<HTMLDetailsElement>(".wf-input-inspection-row details")?.open).toBe(true));

    click(container.querySelector<HTMLButtonElement>("[data-tab-id='issues']"));
    click(container.querySelector<HTMLButtonElement>("[aria-label='Select incident SecondFailure']"));
    click(container.querySelector<HTMLButtonElement>("[data-tab-id='activity']"));

    await vi.waitFor(() => expect(container.textContent).toContain("execution-second"));
    await vi.waitFor(() => expect(container.querySelector(".wf-input-inspection-row details")).toBeTruthy());
    expect(container.querySelector<HTMLDetailsElement>(".wf-input-inspection-row details")?.open).toBe(false);
  });

  it("clears a denied incident lookup message when a healthy activity is selected", async () => {
    const deniedIncident = incident({
      incidentId: "incident-denied",
      activityExecutionId: "execution-denied",
      executableNodeId: "compiled-denied",
      failureType: "DeniedFailure"
    });
    const healthyActivity = {
      ...activityExecution(),
      activityExecutionId: "execution-healthy",
      executableNodeId: "compiled-healthy",
      authoredActivityId: "healthy-node",
      incidentCount: 0,
      incidentIds: []
    };
    api.getWorkflowInstance.mockResolvedValue(workflowDetails({ activities: [healthyActivity], incidents: [deniedIncident] }));
    api.supportsActivityExecutionInspection.mockReset().mockResolvedValueOnce(false).mockResolvedValue(true);
    api.getActivityExecutionInspection.mockImplementation((_context, workflowExecutionId: string, activityExecutionId: string) =>
      activityExecutionId === "execution-denied"
        ? Promise.reject(Object.assign(new Error("Forbidden"), { status: 403 }))
        : Promise.resolve(activityInspection({ activityExecutionId, workflowExecutionId })));

    renderWorkbench();
    await vi.waitFor(() => expect(container.querySelector(".wf-instance-detail-workbench")).toBeTruthy());
    click(buttonByText(container, "View input evidence"));
    await vi.waitFor(() => expect(container.textContent).toContain("You do not have permission to inspect this activity execution"));

    click(container.querySelector<HTMLButtonElement>("[data-tab-id='timeline']"));
    click(container.querySelector<HTMLButtonElement>(".wf-timeline-entry"));
    await vi.waitFor(() => expect(container.querySelector("[data-tab-id='activity']")?.getAttribute("aria-selected")).toBe("true"));
    await vi.waitFor(() => expect(container.textContent).toContain("execution-healthy"));
    click(container.querySelector<HTMLButtonElement>("[data-tab-id='issues']"));

    expect(container.textContent).not.toContain("You do not have permission to inspect this activity execution");
  });

  it("does not cache an on-demand association after Refresh replaces the run snapshot", async () => {
    const oldIncident = incident({ incidentId: "incident-old", failureType: "OldFailure" });
    const refreshedIncident = incident({
      incidentId: "incident-current",
      failureType: "RefreshedFailure",
      status: "Resolved",
      isBlocking: false
    });
    const refreshedActivity = {
      ...activityExecution(),
      status: "Completed",
      completedAt: "2026-10-01T12:01:00Z",
      incidentCount: 0,
      incidentIds: []
    };
    api.getWorkflowInstance
      .mockResolvedValueOnce(workflowDetails({ activities: [], incidents: [oldIncident] }))
      .mockResolvedValueOnce(workflowDetails({ activities: [refreshedActivity], incidents: [refreshedIncident] }));
    api.supportsActivityExecutionInspection.mockReset()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);
    const lateLookup = deferred<ActivityExecutionInspection>();
    api.getActivityExecutionInspection.mockReturnValue(lateLookup.promise);

    renderWorkbench();
    await vi.waitFor(() => expect(container.querySelector(".wf-instance-detail-workbench")).toBeTruthy());
    click(buttonByText(container, "View input evidence"));
    await vi.waitFor(() => expect(api.getActivityExecutionInspection).toHaveBeenCalledTimes(1));

    click(buttonByText(container, "Refresh"));
    await vi.waitFor(() => expect(api.getWorkflowInstance).toHaveBeenCalledTimes(2));
    await vi.waitFor(() => expect(container.textContent).toContain("RefreshedFailure"));
    click(container.querySelector<HTMLButtonElement>("[data-tab-id='timeline']"));
    click(container.querySelector<HTMLButtonElement>(".wf-timeline-entry"));
    await vi.waitFor(() => expect(container.querySelector("[data-tab-id='activity']")?.getAttribute("aria-selected")).toBe("true"));
    await vi.waitFor(() => expect(container.querySelector(".wf-activity-overview-status")?.textContent).toContain("Completed"));

    lateLookup.resolve(activityInspection({
      activityExecutionId: "execution-target",
      status: "Faulted",
      incidents: [oldIncident]
    }));
    await lateLookup.promise;
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(container.querySelector(".wf-activity-overview-status")?.textContent).toContain("Completed");
    const incidentCount = [...container.querySelectorAll(".wf-activity-summary-grid dt")]
      .find(label => label.textContent === "Incidents")?.nextElementSibling?.textContent;
    expect(incidentCount).toBe("0");
  });

  it("does not cache a Load more response after Refresh replaces activity statuses", async () => {
    const lastIndex = 50;
    const executionId = (index: number) => `execution-${index}`;
    const activityAt = (index: number, status: "Faulted" | "Completed") => ({
      ...activityExecution(),
      activityExecutionId: executionId(index),
      executableNodeId: `compiled-${index}`,
      authoredActivityId: `target-${index}`,
      status,
      scheduledAt: new Date(Date.UTC(2026, 9, 1, 12, 0, index)).toISOString(),
      completedAt: status === "Completed" ? "2026-10-01T12:01:00Z" : null,
      incidentCount: status === "Completed" ? 0 : 1,
      incidentIds: status === "Completed" ? [] : [`incident-${index}`]
    });
    const incidentAt = (index: number, status: "Open" | "Resolved") => incident({
      incidentId: `incident-${index}`,
      activityExecutionId: executionId(index),
      executableNodeId: `compiled-${index}`,
      failureType: `${status}Failure-${index}`,
      status,
      isBlocking: status === "Open"
    });
    const initialIncidents = Array.from({ length: lastIndex + 1 }, (_, index) => incidentAt(index, "Open"));
    const refreshedIncidents = Array.from({ length: lastIndex + 1 }, (_, index) => incidentAt(index, "Resolved"));
    const refreshedActivities = Array.from({ length: lastIndex + 1 }, (_, index) => activityAt(index, "Completed"));
    const lateLookup = deferred<ActivityExecutionInspection>();
    api.getWorkflowInstance
      .mockResolvedValueOnce(workflowDetails({ activities: [], incidents: initialIncidents }))
      .mockResolvedValueOnce(workflowDetails({ activities: refreshedActivities, incidents: refreshedIncidents }));
    api.supportsActivityExecutionInspection.mockResolvedValue(true);
    api.getActivityExecutionInspection.mockImplementation((_context, workflowExecutionId: string, activityExecutionId: string) => {
      const index = Number(activityExecutionId.replace("execution-", ""));
      if (index === lastIndex) return lateLookup.promise;
      return Promise.resolve(activityInspection({
        activityExecutionId,
        workflowExecutionId,
        executableNodeId: `compiled-${index}`,
        authoredActivityId: `target-${index}`,
        incidents: [initialIncidents[index]!]
      }));
    });

    renderWorkbench();
    await vi.waitFor(() => expect(buttonByText(container, "Load more affected activities (1)")).toBeTruthy());
    click(buttonByText(container, "Load more affected activities (1)"));
    await vi.waitFor(() => expect(api.getActivityExecutionInspection).toHaveBeenCalledTimes(lastIndex + 1));

    click(buttonByText(container, "Refresh"));
    await vi.waitFor(() => expect(api.getWorkflowInstance).toHaveBeenCalledTimes(2));
    await vi.waitFor(() => expect(container.textContent).toContain("ResolvedFailure-50"));
    click(container.querySelector<HTMLButtonElement>("[data-tab-id='timeline']"));
    const timelineEntries = container.querySelectorAll<HTMLButtonElement>(".wf-timeline-entry");
    expect(timelineEntries).toHaveLength(lastIndex + 1);
    click(timelineEntries[lastIndex]);
    await vi.waitFor(() => expect(container.querySelector("[data-tab-id='activity']")?.getAttribute("aria-selected")).toBe("true"));
    await vi.waitFor(() => expect(container.textContent).toContain(executionId(lastIndex)));

    lateLookup.resolve(activityInspection({
      activityExecutionId: executionId(lastIndex),
      executableNodeId: `compiled-${lastIndex}`,
      authoredActivityId: `target-${lastIndex}`,
      status: "Faulted",
      incidents: [initialIncidents[lastIndex]!]
    }));
    await lateLookup.promise;
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(container.querySelector(".wf-activity-overview-status")?.textContent).toContain("Completed");
    const incidentCount = [...container.querySelectorAll(".wf-activity-summary-grid dt")]
      .find(label => label.textContent === "Incidents")?.nextElementSibling?.textContent;
    expect(incidentCount).toBe("0");
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
