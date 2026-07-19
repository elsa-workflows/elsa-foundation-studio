import { useCallback, useEffect, useMemo, useState } from "react";
import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import {
  getWorkflowDefinitionTags,
  listControlledTagValues,
  listTagDefinitions,
  replaceWorkflowDefinitionTags,
  TagSetRevisionConflictError,
  type ControlledTagValue,
  type TagDefinition,
  type WorkflowDefinitionTagSet
} from "../api/tagging";
import { capabilityIds, resolveCapabilityLink } from "../api/capabilities";

export function WorkflowDefinitionTagsPanel({ context, definitionId }: { context: StudioEndpointContext; definitionId: string }) {
  const [definitions, setDefinitions] = useState<TagDefinition[]>([]);
  const [controlledValues, setControlledValues] = useState<Record<string, ControlledTagValue[]>>({});
  const [controlledValuesAvailable, setControlledValuesAvailable] = useState(false);
  const [tagSet, setTagSet] = useState<WorkflowDefinitionTagSet | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "forbidden" | "unavailable">("loading");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (conflict = false) => {
    setState("loading");
    try {
      const [catalog, current] = await Promise.all([listTagDefinitions(context), getWorkflowDefinitionTags(context, definitionId)]);
      const valuesAvailable = await resolveCapabilityLink(context, capabilityIds.tagging, "tag-definition-values", { tagDefinitionId: "capability-check" }).then(() => true, () => false);
      const valueEntries = valuesAvailable ? await Promise.all(catalog.items
        .filter(item => item.valueMode === "Controlled" && item.cardinality === "Single")
        .map(async item => [item.id, await listControlledTagValues(context, item.id, false).then(response => response.items, () => [])] as const)) : [];
      setDefinitions(catalog.items);
      setControlledValues(Object.fromEntries(valueEntries));
      setControlledValuesAvailable(valuesAvailable);
      setTagSet(current);
      setState("ready");
      setStatus(conflict ? "Tags changed elsewhere. The latest assignments are shown." : "");
    } catch (reason) {
      const httpStatus = typeof reason === "object" && reason && "status" in reason ? (reason as { status?: unknown }).status : undefined;
      setState(httpStatus === 403 ? "forbidden" : "unavailable");
    }
  }, [context, definitionId]);

  useEffect(() => { void load(); }, [load]);

  const assignedIds = useMemo(() => new Set(tagSet?.assertions
    .filter(assertion => assertion.origin === "manual" && assertion.controlledValueId === null)
    .map(assertion => assertion.tagDefinitionId) ?? []), [tagSet]);
  const toggle = async (tagDefinitionId: string) => {
    if (!tagSet || !tagSet.canAssign || saving) return;
    const next = new Set(assignedIds);
    if (next.has(tagDefinitionId)) next.delete(tagDefinitionId);
    else next.add(tagDefinitionId);
    setSaving(true);
    setStatus("");
    try {
      const saved = await replaceWorkflowDefinitionTags(context, definitionId, tagSet.revision, [...next].sort(), currentControlledValues(tagSet));
      setTagSet(saved);
    } catch (reason) {
      if (reason instanceof TagSetRevisionConflictError) await load(true);
      else setStatus(reason instanceof Error ? reason.message : "Couldn't save tags.");
    } finally {
      setSaving(false);
    }
  };

  const selectControlledValue = async (tagDefinitionId: string, controlledValueId: string) => {
    if (!tagSet || !tagSet.canAssign || saving) return;
    const next = currentControlledValues(tagSet).filter(item => item.tagDefinitionId !== tagDefinitionId);
    if (controlledValueId) next.push({ tagDefinitionId, controlledValueId });
    setSaving(true);
    setStatus("");
    try {
      const markers = tagSet.assertions
        .filter(assertion => assertion.origin === "manual" && assertion.controlledValueId === null)
        .map(assertion => assertion.tagDefinitionId)
        .sort();
      const saved = await replaceWorkflowDefinitionTags(context, definitionId, tagSet.revision, markers, next);
      setTagSet(saved);
    } catch (reason) {
      if (reason instanceof TagSetRevisionConflictError) await load(true);
      else setStatus(reason instanceof Error ? reason.message : "Couldn't save the controlled value.");
    } finally {
      setSaving(false);
    }
  };

  if (state === "loading") return <div className="wf-panel-empty">Loading tags…</div>;
  if (state === "forbidden") return <div className="wf-panel-empty">You don’t have access to this workflow’s tags.</div>;
  if (state === "unavailable") return <div className="wf-panel-empty">Tagging is unavailable for this server.</div>;

  return <div className="wf-tag-panel">
    <p className="wf-inline-note">Tags group workflow definitions. They never affect runtime behavior.</p>
    {!tagSet?.canAssign ? <p className="wf-inline-note">You can view tags but need assignment permission to change them.</p> : null}
    {definitions.filter(tag => tag.valueMode === "Marker").map(tag => {
      const assigned = assignedIds.has(tag.id);
      const retired = tag.status === "Retired";
      const disabled = saving || !tagSet?.canAssign || (retired && !assigned);
      return <label className="wf-tag-toggle" key={tag.id} title={retired && !assigned ? "This tag is retired and cannot be assigned." : undefined}>
        <input type="checkbox" checked={assigned} disabled={disabled} onChange={() => void toggle(tag.id)} />
        <span><strong>{tag.displayName}</strong><small>{retired ? "Retired" : tag.key}</small></span>
      </label>;
    })}
    {controlledValuesAvailable && definitions.filter(tag => tag.valueMode === "Controlled" && tag.cardinality === "Single").map(tag => {
      const assignedValueId = tagSet?.assertions.find(assertion =>
        assertion.origin === "manual"
        && assertion.tagDefinitionId === tag.id
        && assertion.controlledValueId)?.controlledValueId ?? "";
      const values = controlledValues[tag.id] ?? [];
      const selectableValues = values.filter(value =>
        value.id === assignedValueId
        || (tag.status === "Active" && value.status === "Active"));
      const disabled = saving || !tagSet?.canAssign;
      return <label className="wf-tag-toggle wf-controlled-value-picker" key={tag.id}>
        <span><strong>{tag.displayName}</strong><small>{tag.key}</small></span>
        <select aria-label={`${tag.displayName} controlled value`} value={assignedValueId} disabled={disabled} onChange={event => void selectControlledValue(tag.id, event.target.value)}>
          <option value="">No value</option>
          {selectableValues.map(value => <option key={value.id} value={value.id}>{value.displayName}{value.status === "Retired" ? " (Retired)" : ""}</option>)}
        </select>
      </label>;
    })}
    {definitions.length === 0 ? <div className="wf-panel-empty">No tags are available.</div> : null}
    {status ? <p className="wf-inline-note" role="status">{status}</p> : null}
  </div>;
}

function currentControlledValues(tagSet: WorkflowDefinitionTagSet) {
  const values = new Map<string, string>();
  for (const assertion of tagSet.assertions) {
    if (assertion.origin !== "manual" || !assertion.controlledValueId) continue;
    const existing = values.get(assertion.tagDefinitionId);
    if (existing && existing !== assertion.controlledValueId) {
      throw new Error("Conflicting manual controlled values must be resolved before changing tags.");
    }
    values.set(assertion.tagDefinitionId, assertion.controlledValueId);
  }
  return [...values].map(([tagDefinitionId, controlledValueId]) => ({ tagDefinitionId, controlledValueId }));
}
