import { useCallback, useEffect, useState } from "react";
import { Check, Plus, RefreshCw } from "lucide-react";
import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { createTagDefinition, listTagDefinitions, updateTagDefinition, type TagDefinition } from "./api/tagging";

export function TagCatalogPage({ context }: { context: StudioEndpointContext }) {
  const [items, setItems] = useState<TagDefinition[]>([]);
  const [canManage, setCanManage] = useState(false);
  const [state, setState] = useState<"loading" | "ready" | "forbidden" | "unavailable">("loading");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState({ canonicalKey: "", displayName: "", description: "" });
  const [saving, setSaving] = useState(false);

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
      const created = await createTagDefinition(context, {
        canonicalKey: draft.canonicalKey.trim(),
        displayName: draft.displayName.trim(),
        description: draft.description.trim() || null
      });
      setItems(current => [...current, created].sort((left, right) => left.displayName.localeCompare(right.displayName)));
      setDraft({ canonicalKey: "", displayName: "", description: "" });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Couldn't create the tag.");
    } finally {
      setSaving(false);
    }
  };

  const toggleDeleted = async (item: TagDefinition) => {
    setError("");
    try {
      const saved = await updateTagDefinition(context, item.id, { status: item.deleted ? "Active" : "Retired" });
      setItems(current => current.map(candidate => candidate.id === saved.id ? saved : candidate));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Couldn't update the tag.");
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
      <button type="submit" disabled={saving}><Plus size={15} /> Create tag</button>
    </form> : <p className="wf-inline-note wf-tag-note">You can use marker tags, but only tag managers can change the catalog.</p>}
    <div className="wf-grid wf-tag-catalog-grid" role="table" aria-label="Marker tag definitions">
      <div className="wf-grid-head" role="row"><span>Name</span><span>Key</span><span>Status</span><span>Actions</span></div>
      {items.map(item => <div className="wf-grid-row" role="row" key={item.id}>
        <span><strong>{item.displayName}</strong><small>{item.description}</small></span>
        <span><code>{item.key}</code></span>
        <span>{item.deleted ? "Deleted" : "Active"}</span>
        <span>{canManage || item.canManage ? <button type="button" onClick={() => void toggleDeleted(item)}>{item.deleted ? "Restore" : "Delete"}</button> : <span className="wf-inline-note">Managed</span>}</span>
      </div>)}
    </div>
    {items.length === 0 ? <div className="wf-empty">No marker tags have been defined.</div> : null}
    <p className="wf-tag-note"><Check size={14} /> Marker tags are labels only; they never change runtime workflow behavior.</p>
  </section>;
}
