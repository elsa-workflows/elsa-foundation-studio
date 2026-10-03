import type { Node } from "@xyflow/react";
import type { ActivityCatalogItem, ActivityExecutionStateSummary, ActivityNode, IncidentStateSummary } from "./workflowTypes";
import { getChildSlots, latestActivityExecution, type ChildSlot, type WorkflowRuntimeNodeOverlay } from "./workflowAdapter";

export function isActiveIncident(incident: Pick<IncidentStateSummary, "status">) {
  const status = incident.status.trim().toLowerCase();
  return status !== "resolved" && status !== "suppressed";
}

export function applyRuntimeOverlays<TNodeData extends Record<string, unknown>>(
  nodes: Node<TNodeData>[],
  activities: ActivityExecutionStateSummary[],
  incidents: IncidentStateSummary[],
  selectedEvidenceId: string | null = null,
  activityCatalog: ActivityCatalogItem[] = []
): Node<TNodeData & { runtime?: WorkflowRuntimeNodeOverlay }>[] {
  type NodeWithRuntime = Node<TNodeData & { runtime?: WorkflowRuntimeNodeOverlay }>;
  const activityByExecutionId = new Map(activities.map(activity => [activity.activityExecutionId, activity]));
  const activitiesByNodeId = new Map<string, ActivityExecutionStateSummary[]>();
  for (const activity of activities) {
    for (const nodeId of new Set([activity.authoredActivityId, activity.executableNodeId].filter(Boolean))) {
      const bucket = activitiesByNodeId.get(nodeId!) ?? [];
      bucket.push(activity);
      activitiesByNodeId.set(nodeId!, bucket);
    }
  }
  const catalogByVersion = new Map(activityCatalog.map(activity => [activity.activityVersionId, activity]));
  const incidentsByNodeId = groupBy(incidents, incident => {
    const activityExecutionId = incident.activityExecutionId?.trim() || incident.metadata?.["runtime.activityExecutionId"]?.trim();
    const associatedActivity = activityExecutionId ? activityByExecutionId.get(activityExecutionId) : undefined;
    if (associatedActivity) return associatedActivity.authoredActivityId || associatedActivity.executableNodeId;
    const activitiesWithIncident = activityExecutionId ? [] : activities.filter(activity => activity.incidentIds.includes(incident.incidentId));
    const relatedNodeIds = [...new Set(activitiesWithIncident.map(activity => activity.authoredActivityId || activity.executableNodeId).filter(Boolean))];
    if (relatedNodeIds.length === 1) return relatedNodeIds[0]!;
    const executableNodeId = incident.executableNodeId?.trim() || incident.metadata?.["runtime.executableNodeId"]?.trim();
    if (!executableNodeId) return "";
    const byExecutableId = activitiesByNodeId.get(executableNodeId)?.[0];
    return byExecutableId?.authoredActivityId || executableNodeId;
  });

  return nodes.map(node => {
    const runtimeNodeId = typeof node.data.runtimeNodeId === "string" ? node.data.runtimeNodeId : node.id;
    const nodeActivities = activitiesByNodeId.get(runtimeNodeId) ?? [];
    const nodeIncidents = incidentsByNodeId.get(runtimeNodeId) ?? [];
    const childSlots = Array.isArray(node.data.childSlots) ? node.data.childSlots as ChildSlot[] : [];
    const containedNodeIds = collectContainedActivityNodeIds(childSlots, catalogByVersion);
    containedNodeIds.delete(runtimeNodeId);
    const containedAffectedNodeIds = [...containedNodeIds].filter(nodeId =>
      (incidentsByNodeId.get(nodeId) ?? []).some(isActiveIncident));
    const containedIncidents = containedAffectedNodeIds
      .flatMap(nodeId => incidentsByNodeId.get(nodeId) ?? [])
      .filter(isActiveIncident);
    const containedIncidentsById = new Map(containedIncidents.map(incident => [incident.incidentId, incident]));
    const uniqueContainedIncidents = [...containedIncidentsById.values()];
    const containedPrimaryIncident = [...uniqueContainedIncidents].sort((left, right) =>
      Number(right.isBlocking) - Number(left.isBlocking) || Date.parse(right.createdAt) - Date.parse(left.createdAt))[0];
    if (nodeActivities.length === 0 && nodeIncidents.length === 0 && uniqueContainedIncidents.length === 0) return node as NodeWithRuntime;

    const latestActivity = latestActivityExecution(nodeActivities);
    const selected = selectedEvidenceId === runtimeNodeId || selectedEvidenceId === node.id ||
      nodeActivities.some(activity => activity.activityExecutionId === selectedEvidenceId) ||
      nodeIncidents.some(incident => incident.incidentId === selectedEvidenceId);
    const activeIncidents = nodeIncidents.filter(isActiveIncident);
    const historicalIncidents = nodeIncidents.filter(incident => !isActiveIncident(incident));
    const primaryIncident = [...activeIncidents].sort((left, right) =>
      Number(right.isBlocking) - Number(left.isBlocking) || Date.parse(right.createdAt) - Date.parse(left.createdAt))[0]
      ?? [...historicalIncidents].sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))[0];
    const runtime: WorkflowRuntimeNodeOverlay = {
      status: latestActivity?.status,
      subStatus: latestActivity?.subStatus,
      activityExecutionId: latestActivity?.activityExecutionId,
      faultCount: nodeActivities.reduce((sum, activity) => sum + (activity.faultCount ?? 0) + (activity.aggregateFaultCount ?? 0), 0),
      incidentCount: activeIncidents.length,
      historicalIncidentCount: historicalIncidents.length,
      primaryIncidentId: primaryIncident?.incidentId,
      hasBlockingIncident: activeIncidents.some(incident => incident.isBlocking),
      containedIncidentCount: uniqueContainedIncidents.length,
      containedAffectedActivityCount: containedAffectedNodeIds.length,
      containedPrimaryIncidentId: containedPrimaryIncident?.incidentId,
      containsBlockingIncident: uniqueContainedIncidents.some(incident => incident.isBlocking),
      selected
    };

    return {
      ...node,
      selected,
      className: selected ? "wf-runtime-node-selected" : node.className,
      data: {
        ...node.data,
        runtime
      }
    } as NodeWithRuntime;
  });
}

function collectContainedActivityNodeIds(childSlots: ChildSlot[], catalogByVersion: Map<string, ActivityCatalogItem>) {
  const nodeIds = new Set<string>();
  const visit = (activity: ActivityNode) => {
    if (nodeIds.has(activity.nodeId)) return;
    nodeIds.add(activity.nodeId);
    const catalogItem = catalogByVersion.get(activity.activityVersionId);
    for (const slot of getChildSlots(activity, catalogItem)) {
      for (const child of slot.activities) visit(child);
    }
  };
  for (const slot of childSlots) {
    for (const activity of slot.activities) visit(activity);
  }
  return nodeIds;
}

function groupBy<T>(items: T[], getKey: (item: T) => string) {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const key = getKey(item);
    if (!key) continue;
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }

  return groups;
}
