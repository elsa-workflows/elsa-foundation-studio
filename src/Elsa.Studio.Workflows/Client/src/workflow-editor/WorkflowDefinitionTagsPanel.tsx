import { useCallback, useEffect, useMemo, useState } from "react";
import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { getWorkflowDefinitionTags, listTagDefinitions, replaceWorkflowDefinitionTags, TagSetRevisionConflictError, type TagDefinition, type WorkflowDefinitionTagSet } from "../api/tagging";

export function WorkflowDefinitionTagsPanel({ context, definitionId }: { context: StudioEndpointContext; definitionId: string }) {
  const [definitions, setDefinitions] = useState<TagDefinition[]>([]);
  const [tagSet, setTagSet] = useState<WorkflowDefinitionTagSet | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "forbidden" | "unavailable">("loading");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (conflict = false) => {
    setState("loading");
    try {
      const [catalog, current] = await Promise.all([listTagDefinitions(context), getWorkflowDefinitionTags(context, definitionId)]);
      setDefinitions(catalog.items);
      setTagSet(current);
      setState("ready");
      setStatus(conflict ? "Tags changed elsewhere. The latest assignments are shown." : "");
    } catch (reason) {
      const httpStatus = typeof reason === "object" && reason && "status" in reason ? (reason as { status?: unknown }).status : undefined;
      setState(httpStatus === 403 ? "forbidden" : "unavailable");
    }
  }, [context, definitionId]);

  useEffect(() => { void load(); }, [load]);

  const assignedIds = useMemo(() => new Set(tagSet?.assertions.map(assertion => assertion.tagDefinitionId) ?? []), [tagSet]);
  const toggle = async (tagDefinitionId: string) => {
    if (!tagSet || !tagSet.canAssign || saving) return;
    const next = new Set(assignedIds);
    if (next.has(tagDefinitionId)) next.delete(tagDefinitionId);
    else next.add(tagDefinitionId);
    setSaving(true);
    setStatus("");
    try {
      const saved = await replaceWorkflowDefinitionTags(context, definitionId, tagSet.revision, [...next].sort());
      setTagSet(saved);
    } catch (reason) {
      if (reason instanceof TagSetRevisionConflictError) await load(true);
      else setStatus(reason instanceof Error ? reason.message : "Couldn't save tags.");
    } finally {
      setSaving(false);
    }
  };

  if (state === "loading") return <div className="wf-panel-empty">Loading tags…</div>;
  if (state === "forbidden") return <div className="wf-panel-empty">You don’t have access to this workflow’s tags.</div>;
  if (state === "unavailable") return <div className="wf-panel-empty">Tagging is unavailable for this server.</div>;

  return <div className="wf-tag-panel">
    <p className="wf-inline-note">Marker tags group workflow definitions. They never affect runtime behavior.</p>
    {!tagSet?.canAssign ? <p className="wf-inline-note">You can view tags but need assignment permission to change them.</p> : null}
    {definitions.map(tag => {
      const assigned = assignedIds.has(tag.id);
      const disabled = saving || !tagSet?.canAssign || tag.deleted;
      return <label className="wf-tag-toggle" key={tag.id} title={tag.deleted ? "This tag has been deleted and cannot be assigned." : undefined}>
        <input type="checkbox" checked={assigned} disabled={disabled} onChange={() => void toggle(tag.id)} />
        <span><strong>{tag.displayName}</strong><small>{tag.deleted ? "Deleted" : tag.key}</small></span>
      </label>;
    })}
    {definitions.length === 0 ? <div className="wf-panel-empty">No marker tags are available.</div> : null}
    {status ? <p className="wf-inline-note" role="status">{status}</p> : null}
  </div>;
}
