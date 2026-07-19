import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Save, X } from "lucide-react";
import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import {
  createControlledTagValue,
  listControlledTagValues,
  updateControlledTagValue,
  type ControlledTagValue,
  type TagDefinition
} from "./api/tagging";

type ValueDraft = { canonicalKey: string; displayName: string; description: string; color: string; sortOrder: string };

const emptyDraft = (): ValueDraft => ({ canonicalKey: "", displayName: "", description: "", color: "", sortOrder: "0" });

export function ControlledTagValuesManager({ context, definition, canManage }: {
  context: StudioEndpointContext;
  definition: TagDefinition;
  canManage: boolean;
}) {
  const [items, setItems] = useState<ControlledTagValue[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "unavailable">("loading");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<ValueDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<ValueDraft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setState("loading");
    setError("");
    try {
      const response = await listControlledTagValues(context, definition.id, false);
      setItems(response.items.sort((left, right) => left.sortOrder - right.sortOrder || left.displayName.localeCompare(right.displayName)));
      setState("ready");
    } catch (reason) {
      setState("unavailable");
      setError(reason instanceof Error ? reason.message : "Controlled values are unavailable.");
    }
  }, [context, definition.id]);

  useEffect(() => { void load(); }, [load]);

  const create = async () => {
    if (!draft.canonicalKey.trim() || !draft.displayName.trim()) return;
    setSaving(true);
    setError("");
    try {
      await createControlledTagValue(context, definition.id, {
        canonicalKey: draft.canonicalKey.trim(),
        displayName: draft.displayName.trim(),
        description: draft.description.trim() || null,
        color: draft.color || null,
        sortOrder: numberFromDraft(draft.sortOrder)
      });
      setDraft(emptyDraft());
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Couldn't create the controlled value.");
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (item: ControlledTagValue) => {
    setError("");
    setEditingId(item.id);
    setEditDraft({
      canonicalKey: item.key,
      displayName: item.displayName,
      description: item.description ?? "",
      color: item.color ?? "",
      sortOrder: String(item.sortOrder)
    });
  };

  const saveEdit = async (item: ControlledTagValue) => {
    if (!editDraft.displayName.trim()) return;
    setUpdatingId(item.id);
    setError("");
    try {
      await updateControlledTagValue(context, definition.id, item.id, item.revision, {
        displayName: editDraft.displayName.trim(),
        description: editDraft.description.trim() || null,
        color: editDraft.color || null,
        sortOrder: numberFromDraft(editDraft.sortOrder)
      });
      setEditingId(null);
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Couldn't update the controlled value.");
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleRetired = async (item: ControlledTagValue) => {
    setUpdatingId(item.id);
    setError("");
    try {
      await updateControlledTagValue(context, definition.id, item.id, item.revision, { status: item.status === "Retired" ? "Active" : "Retired" });
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Couldn't update the controlled value.");
    } finally {
      setUpdatingId(null);
    }
  };

  return <section className="wf-controlled-values" aria-label={`${definition.displayName} controlled values`}>
    <header><h3>Controlled values</h3><span className="wf-inline-note">Single value</span></header>
    {state === "loading" ? <p className="wf-inline-note">Loading values…</p> : null}
    {state === "unavailable" ? <p className="wf-inline-note">Controlled values are unavailable for this server. {error}</p> : null}
    {state === "ready" && canManage ? <form className="wf-tag-create" onSubmit={event => { event.preventDefault(); void create(); }}>
      <label>Key<input value={draft.canonicalKey} onChange={event => setDraft(current => ({ ...current, canonicalKey: event.target.value }))} placeholder="production" required /></label>
      <label>Name<input value={draft.displayName} onChange={event => setDraft(current => ({ ...current, displayName: event.target.value }))} placeholder="Production" required /></label>
      <label>Description<input value={draft.description} onChange={event => setDraft(current => ({ ...current, description: event.target.value }))} placeholder="Optional" /></label>
      <label>Order<input type="number" value={draft.sortOrder} onChange={event => setDraft(current => ({ ...current, sortOrder: event.target.value }))} /></label>
      <label>Color<input aria-label={`New ${definition.displayName} value color`} type="color" value={draft.color || definition.color || "#0ea5e9"} onChange={event => setDraft(current => ({ ...current, color: event.target.value }))} /></label>
      <button type="submit" disabled={saving}><Plus size={14} /> Create value</button>
    </form> : null}
    {state === "ready" ? <div className="wf-controlled-value-list">
      {items.map(item => {
        const editing = editingId === item.id;
        const updating = updatingId === item.id;
        return <div key={item.id} className="wf-controlled-value-row">
          {editing ? <>
            <input aria-label={`${item.displayName} value name`} value={editDraft.displayName} onChange={event => setEditDraft(current => ({ ...current, displayName: event.target.value }))} />
            <input aria-label={`${item.displayName} value description`} value={editDraft.description} onChange={event => setEditDraft(current => ({ ...current, description: event.target.value }))} placeholder="Optional description" />
            <input aria-label={`${item.displayName} value order`} type="number" value={editDraft.sortOrder} onChange={event => setEditDraft(current => ({ ...current, sortOrder: event.target.value }))} />
            <input aria-label={`${item.displayName} value color`} type="color" value={editDraft.color || definition.color || "#0ea5e9"} onChange={event => setEditDraft(current => ({ ...current, color: event.target.value }))} />
          </> : <><ValueColor color={item.color ?? definition.color} /><span><strong>{item.displayName}</strong><small>{item.key} · order {item.sortOrder}{item.status === "Retired" ? " · Retired" : ""}</small></span></>}
          {canManage ? <span className="wf-row-actions">{editing ? <>
            <button type="button" disabled={updating} onClick={() => void saveEdit(item)}><Save size={14} /> Save</button>
            <button type="button" disabled={updating} onClick={() => setEditingId(null)}><X size={14} /> Cancel</button>
          </> : <>
            <button type="button" disabled={updating} onClick={() => startEditing(item)}><Pencil size={14} /> Edit</button>
            <button type="button" disabled={updating} onClick={() => void toggleRetired(item)}>{item.status === "Retired" ? "Reactivate" : "Retire"}</button>
          </>}</span> : null}
        </div>;
      })}
      {items.length === 0 ? <p className="wf-inline-note">No controlled values have been defined.</p> : null}
    </div> : null}
  </section>;
}

function ValueColor({ color }: { color?: string | null }) {
  return color ? <span className="wf-tag-color" style={{ backgroundColor: color }} aria-hidden="true" /> : null;
}

function numberFromDraft(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
