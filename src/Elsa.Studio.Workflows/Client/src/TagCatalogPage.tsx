import { useCallback, useEffect, useState } from "react";
import { Check, Pencil, Plus, RefreshCw, Save, X } from "lucide-react";
import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { createTagDefinition, listTagDefinitions, updateTagDefinition, type TagDefinition } from "./api/tagging";

type TagDraft = { canonicalKey: string; displayName: string; description: string; color: string };

const emptyDraft = (): TagDraft => ({ canonicalKey: "", displayName: "", description: "", color: "" });

export function TagCatalogPage({ context }: { context: StudioEndpointContext }) {
  const [items, setItems] = useState<TagDefinition[]>([]);
  const [canManage, setCanManage] = useState(false);
  const [state, setState] = useState<"loading" | "ready" | "forbidden" | "unavailable">("loading");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<TagDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<TagDraft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setState("loading");
    setError("");
    try {
      const response = await listTagDefinitions(context);
      setItems(response.items);
      setCanManage(response.canManage || response.items.some(item => item.canManage));
      setState("ready");
    } catch (reason) {
      const status = typeof reason === "object" && reason && "status" in reason ? (reason as { status?: unknown }).status : undefined;
      setState(status === 403 ? "forbidden" : "unavailable");
      setError(reason instanceof Error ? reason.message : "Tagging is unavailable.");
    }
  }, [context]);

  useEffect(() => { void load(); }, [load]);

  const create = async () => {
    if (!draft.canonicalKey.trim() || !draft.displayName.trim()) return;
    setSaving(true);
    setError("");
    try {
      await createTagDefinition(context, {
        canonicalKey: draft.canonicalKey.trim(),
        displayName: draft.displayName.trim(),
        description: draft.description.trim() || null,
        color: draft.color || null
      });
      await load();
      setDraft(emptyDraft());
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Couldn't create the tag.");
    } finally {
      setSaving(false);
    }
  };

  const toggleRetired = async (item: TagDefinition) => {
    setUpdatingId(item.id);
    setError("");
    try {
      await updateTagDefinition(context, item.id, item.revision, { status: item.status === "Retired" ? "Active" : "Retired" });
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Couldn't update the tag.");
    } finally {
      setUpdatingId(null);
    }
  };

  const startEditing = (item: TagDefinition) => {
    setError("");
    setEditingId(item.id);
    setEditDraft({ canonicalKey: item.key, displayName: item.displayName, description: item.description ?? "", color: item.color ?? "" });
  };

  const saveEdit = async (item: TagDefinition) => {
    if (!editDraft.displayName.trim()) return;
    setUpdatingId(item.id);
    setError("");
    try {
      await updateTagDefinition(context, item.id, item.revision, {
        displayName: editDraft.displayName.trim(),
        description: editDraft.description.trim() || null,
        color: editDraft.color || null
      });
      await load();
      setEditingId(null);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Couldn't update the tag.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (state === "loading") return <div className="wf-empty">Loading marker tags…</div>;
  if (state === "forbidden") return <div className="wf-empty">You don’t have permission to view marker tags.</div>;
  if (state === "unavailable") return <div className="wf-empty">Marker tags are unavailable for this server. {error}</div>;

  return <section className="wf-page">
    <header className="wf-page-header">
      <div><div className="wf-kicker">Workflow design</div><h2>Marker tags</h2></div>
      <button type="button" onClick={() => void load()}><RefreshCw size={15} /> Refresh</button>
    </header>
    {error ? <div className="wf-alert">{error}</div> : null}
    {canManage ? <form className="wf-tag-create" onSubmit={event => { event.preventDefault(); void create(); }}>
      <label>Key<input value={draft.canonicalKey} onChange={event => setDraft(current => ({ ...current, canonicalKey: event.target.value }))} placeholder="environment" required /></label>
      <label>Name<input value={draft.displayName} onChange={event => setDraft(current => ({ ...current, displayName: event.target.value }))} placeholder="Environment" required /></label>
      <label>Description<input value={draft.description} onChange={event => setDraft(current => ({ ...current, description: event.target.value }))} placeholder="Optional" /></label>
      <label>Color<input aria-label="New tag color" type="color" value={draft.color || "#0ea5e9"} onChange={event => setDraft(current => ({ ...current, color: event.target.value }))} /></label>
      <button type="submit" disabled={saving}><Plus size={15} /> Create tag</button>
    </form> : <p className="wf-inline-note wf-tag-note">You can use marker tags, but only tag managers can change the catalog.</p>}
    <div className="wf-grid wf-tag-catalog-grid" role="table" aria-label="Marker tag definitions">
      <div className="wf-grid-head" role="row"><span>Name</span><span>Key</span><span>Status</span><span>Actions</span></div>
      {items.map(item => {
        const canEdit = canManage || item.canManage;
        const editing = editingId === item.id;
        const updating = updatingId === item.id;
        return <div className="wf-grid-row" role="row" key={item.id}>
          <span>
            {editing ? <>
              <label className="wf-visually-hidden" htmlFor={`tag-name-${item.id}`}>Name</label>
              <input id={`tag-name-${item.id}`} value={editDraft.displayName} onChange={event => setEditDraft(current => ({ ...current, displayName: event.target.value }))} />
              <label className="wf-visually-hidden" htmlFor={`tag-description-${item.id}`}>Description</label>
              <input id={`tag-description-${item.id}`} value={editDraft.description} onChange={event => setEditDraft(current => ({ ...current, description: event.target.value }))} placeholder="Optional description" />
              <label className="wf-visually-hidden" htmlFor={`tag-color-${item.id}`}>Color</label>
              <input id={`tag-color-${item.id}`} type="color" value={editDraft.color || "#0ea5e9"} onChange={event => setEditDraft(current => ({ ...current, color: event.target.value }))} />
            </> : <><TagColor color={item.color} /><strong>{item.displayName}</strong><small>{item.description}</small></>}
          </span>
          <span><code>{item.key}</code></span>
          <span>{item.status}</span>
          <span>{canEdit ? editing ? <>
            <button type="button" disabled={updating} onClick={() => void saveEdit(item)}><Save size={14} /> Save</button>
            <button type="button" disabled={updating} onClick={() => setEditingId(null)}><X size={14} /> Cancel</button>
          </> : <>
            <button type="button" disabled={updating} onClick={() => startEditing(item)}><Pencil size={14} /> Edit</button>
            <button type="button" disabled={updating} onClick={() => void toggleRetired(item)}>{item.status === "Retired" ? "Reactivate" : "Retire"}</button>
          </> : <span className="wf-inline-note">Managed</span>}</span>
        </div>;
      })}
    </div>
    {items.length === 0 ? <div className="wf-empty">No marker tags have been defined.</div> : null}
    <p className="wf-tag-note"><Check size={14} /> Marker tags are labels only; they never change runtime workflow behavior.</p>
  </section>;
}

function TagColor({ color }: { color?: string | null }) {
  return color ? <span className="wf-tag-color" style={{ backgroundColor: color }} aria-hidden="true" /> : null;
}
