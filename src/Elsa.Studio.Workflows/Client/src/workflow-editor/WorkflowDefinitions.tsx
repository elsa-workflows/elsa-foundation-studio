import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AlertCircle, Check, Package, Plus, RotateCcw, Search, Sparkles, Trash2 } from "lucide-react";
import type { StudioAiContributionApi, StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { createDefinition, deleteDefinition, deleteDefinitionPermanently, listDefinitions, restoreDefinition } from "../api/workflowDesign";
import { listActivities } from "../api/activityDesign";
import { listControlledTagValues, listTagDefinitions, type ControlledTagValue, type TagDefinition } from "../api/tagging";
import { capabilityIds, resolveCapabilityLink } from "../api/capabilities";
import type { ActivityCatalogItem, ControlledTagFacet, ControlledTagGroup, DefinitionListSortBy, DefinitionListSortDirection, DefinitionListState, WorkflowDefinitionDetails } from "../workflowTypes";
import { formatDate } from "../workflowFormatting";
import { getDialogs } from "./dialogs";
import { defaultDefinitionPageSize } from "./constants";
import type { CreateWorkflowDraft } from "./editorTypes";
import { dispatchAiAction, findAiAction, getCreateInitialState, getTotalPages } from "./editorHelpers";
import { WfEmptyState, WfErrorCard, WfListSkeleton } from "./StatusViews";
import { DefinitionPager } from "./DefinitionPager";
import { CreateWorkflowDialog } from "./CreateWorkflowDialog";
import { markerTagClausesFromSearch, writeMarkerTagClausesToLocation } from "./markerTagFilters";
import {
  controlledTagClauseToWire,
  controlledTagClausesFromSearch,
  controlledTagGroupingFromSearch,
  writeControlledTagStateToLocation,
  type ControlledTagClause,
  type ControlledTagFilterOperator
} from "./controlledTagFilters";

const definitionSortOptions: { value: string; label: string; sortBy: DefinitionListSortBy; sortDirection: DefinitionListSortDirection }[] = [
  { value: "name:asc", label: "Name A–Z", sortBy: "name", sortDirection: "asc" },
  { value: "name:desc", label: "Name Z–A", sortBy: "name", sortDirection: "desc" },
  { value: "lastModifiedAt:desc", label: "Modified newest", sortBy: "lastModifiedAt", sortDirection: "desc" },
  { value: "lastModifiedAt:asc", label: "Modified oldest", sortBy: "lastModifiedAt", sortDirection: "asc" },
  { value: "createdAt:desc", label: "Created newest", sortBy: "createdAt", sortDirection: "desc" },
  { value: "createdAt:asc", label: "Created oldest", sortBy: "createdAt", sortDirection: "asc" }
];
const noMarkerTagClauses: string[] = [];
const noControlledTagClauses: ControlledTagClause[] = [];

export function WorkflowDefinitions({ context, ai, onOpen }: { context: StudioEndpointContext; ai: StudioAiContributionApi; onOpen(id: string): void }) {
  const [search, setSearch] = useState("");
  const [listState, setListState] = useState<DefinitionListState>("active");
  const [sortBy, setSortBy] = useState<DefinitionListSortBy>("name");
  const [sortDirection, setSortDirection] = useState<DefinitionListSortDirection>("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultDefinitionPageSize);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [definitions, setDefinitions] = useState<WorkflowDefinitionDetails["definition"][]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedDefinitionIds, setSelectedDefinitionIds] = useState<Set<string>>(() => new Set());
  const [createDraft, setCreateDraft] = useState<CreateWorkflowDraft | null>(null);
  const [creating, setCreating] = useState(false);
  const [catalog, setCatalog] = useState<ActivityCatalogItem[]>([]);
  const [catalogState, setCatalogState] = useState<"idle" | "loading" | "ready" | "failed">("idle");
  const [tagDefinitions, setTagDefinitions] = useState<TagDefinition[]>([]);
  const [controlledValues, setControlledValues] = useState<Record<string, ControlledTagValue[]>>({});
  const [controlledValuesAvailable, setControlledValuesAvailable] = useState(false);
  const [taggingState, setTaggingState] = useState<"loading" | "ready" | "unavailable" | "forbidden">("loading");
  const [markerTagClauses, setMarkerTagClauses] = useState<string[]>(() => markerTagClausesFromSearch(window.location.search));
  const [controlledTagClauses, setControlledTagClauses] = useState<ControlledTagClause[]>(() => controlledTagClausesFromSearch(window.location.search));
  const [groupByControlledTagDefinitionId, setGroupByControlledTagDefinitionId] = useState<string | null>(() => controlledTagGroupingFromSearch(window.location.search));
  const [controlledTagFacets, setControlledTagFacets] = useState<ControlledTagFacet[]>([]);
  const [controlledTagGroups, setControlledTagGroups] = useState<ControlledTagGroup[]>([]);
  const filterableTagDefinitions = useMemo(
    () => tagDefinitions.filter(tag =>
      tag.valueMode === "Marker"
      && (tag.status === "Active"
          || markerTagClauses.some(clause => clause.startsWith(`${tag.id}:`)))),
    [markerTagClauses, tagDefinitions]);
  const applicableMarkerTagClauses = useMemo(
    () => taggingState === "ready" ? markerTagClauses : noMarkerTagClauses,
    [markerTagClauses, taggingState]);
  const applicableControlledTagClauses = useMemo(
    () => taggingState === "ready" && controlledValuesAvailable ? controlledTagClauses : noControlledTagClauses,
    [controlledTagClauses, controlledValuesAvailable, taggingState]);
  const visibleControlledDefinitions = useMemo(() => controlledValuesAvailable ? tagDefinitions.filter(tag => tag.valueMode === "Controlled" && tag.cardinality === "Single" && (
    tag.status === "Active" || controlledTagClauses.some(clause => clause.definitionId === tag.id))) : [], [controlledTagClauses, controlledValuesAvailable, tagDefinitions]);
  const selectVisibleRef = useRef<HTMLInputElement | null>(null);
  const requestSequenceRef = useRef(0);
  const visibleDefinitionIds = useMemo(() => definitions.map(definition => definition.id), [definitions]);
  const suggestMetadataAction = findAiAction(ai, "weaver.workflows.suggest-create-metadata");
  const explainDefinitionAction = findAiAction(ai, "weaver.workflows.explain-definition");
  const selectedVisibleCount = visibleDefinitionIds.filter(id => selectedDefinitionIds.has(id)).length;
  const allVisibleSelected = visibleDefinitionIds.length > 0 && selectedVisibleCount === visibleDefinitionIds.length;

  const load = useCallback(async () => {
    const requestSequence = ++requestSequenceRef.current;
    setState("loading");
    setError("");
    try {
      const response = await listDefinitions(context, {
        searchTerm: search,
        state: listState,
        page,
        pageSize,
        sortBy,
        sortDirection,
        markerTagClauses: applicableMarkerTagClauses,
        controlledTagClauses: applicableControlledTagClauses.map(controlledTagClauseToWire).filter(Boolean),
        controlledTagFacetDefinitionIds: visibleControlledDefinitions.slice(0, 4).map(definition => definition.id),
        groupByControlledTagDefinitionId: controlledValuesAvailable
          ? groupByControlledTagDefinitionId
          : null
      });
      if (requestSequence !== requestSequenceRef.current) return;
      const effectiveTotalPages = getTotalPages(response.totalCount, response.pageSize);

      if (response.totalCount > 0 && page > effectiveTotalPages) {
        setPage(effectiveTotalPages);
        return;
      }

      setDefinitions(response.definitions);
      setTotalCount(response.totalCount);
      setControlledTagFacets(response.controlledTagFacets ?? []);
      setControlledTagGroups(response.controlledTagGroups ?? []);
      setState("ready");
    } catch (e) {
      if (requestSequence !== requestSequenceRef.current) return;
      setError(e instanceof Error ? e.message : String(e));
      setState("failed");
    }
  }, [context, search, listState, page, pageSize, sortBy, sortDirection, applicableMarkerTagClauses, applicableControlledTagClauses, visibleControlledDefinitions, groupByControlledTagDefinitionId]);

  useEffect(() => {
    void load();
    return () => {
      requestSequenceRef.current += 1;
    };
  }, [load]);

  useEffect(() => {
    let active = true;
    void Promise.all([
      listTagDefinitions(context),
      resolveCapabilityLink(
        context,
        capabilityIds.workflowDesign,
        "workflow-definition-tags",
        { definitionId: "capability-check" })
    ])
      .then(async ([response]) => {
        if (!active) return;
        const valuesAvailable = await resolveCapabilityLink(context, capabilityIds.tagging, "tag-definition-values", { tagDefinitionId: "capability-check" }).then(() => true, () => false);
        const valueEntries = valuesAvailable ? await Promise.all(response.items
          .filter(tag => tag.valueMode === "Controlled" && tag.cardinality === "Single")
          .map(async tag => [tag.id, await listControlledTagValues(context, tag.id, false).then(value => value.items, () => [])] as const)) : [];
        setTagDefinitions(response.items);
        setControlledValues(Object.fromEntries(valueEntries));
        setControlledValuesAvailable(valuesAvailable);
        setTaggingState("ready");
      })
      .catch((reason: unknown) => {
        if (!active) return;
        setTagDefinitions(current => current.length === 0 ? current : []);
        setControlledValues(current => Object.keys(current).length === 0 ? current : {});
        setControlledValuesAvailable(false);
        setMarkerTagClauses(current => current.length === 0 ? current : []);
        setControlledTagClauses(current => current.length === 0 ? current : []);
        setGroupByControlledTagDefinitionId(null);
        const status = typeof reason === "object" && reason && "status" in reason ? (reason as { status?: unknown }).status : undefined;
        setTaggingState(status === 403 ? "forbidden" : "unavailable");
      });
    return () => { active = false; };
  }, [context]);

  useEffect(() => {
    const restoreMarkerTagClauses = () => {
      setMarkerTagClauses(
        taggingState === "unavailable" || taggingState === "forbidden"
          ? []
          : markerTagClausesFromSearch(window.location.search));
      setControlledTagClauses(
        taggingState === "unavailable" || taggingState === "forbidden"
          ? []
          : controlledTagClausesFromSearch(window.location.search));
      setGroupByControlledTagDefinitionId(
        taggingState === "unavailable" || taggingState === "forbidden"
          ? null
          : controlledTagGroupingFromSearch(window.location.search));
      setPage(1);
      setSelectedDefinitionIds(new Set());
    };
    window.addEventListener("popstate", restoreMarkerTagClauses);
    return () => window.removeEventListener("popstate", restoreMarkerTagClauses);
  }, [taggingState]);

  useEffect(() => {
    writeMarkerTagClausesToLocation(markerTagClauses);
  }, [markerTagClauses]);

  useEffect(() => {
    writeControlledTagStateToLocation(controlledTagClauses, groupByControlledTagDefinitionId);
  }, [controlledTagClauses, groupByControlledTagDefinitionId]);

  useEffect(() => {
    if (taggingState === "ready" && !controlledValuesAvailable) {
      setControlledTagClauses(current => current.length === 0 ? current : []);
      setGroupByControlledTagDefinitionId(null);
    }
  }, [controlledValuesAvailable, taggingState]);

  useEffect(() => {
    if (selectVisibleRef.current) {
      selectVisibleRef.current.indeterminate = selectedVisibleCount > 0 && !allVisibleSelected;
    }
  }, [allVisibleSelected, selectedVisibleCount]);

  const loadCatalog = useCallback(async () => {
    if (catalogState === "loading" || catalogState === "ready") return;
    setCatalogState("loading");
    try {
      const response = await listActivities(context);
      setCatalog(response.activities ?? []);
      setCatalogState("ready");
    } catch (e) {
      setCatalogState("failed");
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [catalogState, context]);

  const openCreateDialog = () => {
    setError("");
    setStatus("");
    setCreateDraft({ name: "", description: "", rootActivityVersionId: null });
    void loadCatalog();
  };

  const submitCreate = async () => {
    if (!createDraft?.name.trim()) return;
    setCreating(true);
    setError("");
    setStatus("");
    try {
      const details = await createDefinition(context, {
        name: createDraft.name.trim(),
        description: createDraft.description.trim() || null,
        initialState: getCreateInitialState(createDraft, catalog)
      });
      setCreateDraft(null);
      onOpen(details.definition.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setCreating(false);
    }
  };

  const openDefinitionArtifacts = (definitionId: string) => {
    window.history.pushState({}, "", `/workflows/executables?definition=${encodeURIComponent(definitionId)}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const refreshAfterMutation = async () => {
    if (definitions.length === 1 && page > 1) {
      setPage(page - 1);
      return;
    }

    await load();
  };

  const clearSelection = () => setSelectedDefinitionIds(new Set());

  const toggleDefinitionSelection = (definitionId: string, selected: boolean) => {
    setSelectedDefinitionIds(current => {
      const next = new Set(current);
      if (selected) next.add(definitionId);
      else next.delete(definitionId);
      return next;
    });
  };

  const toggleVisibleSelection = (selected: boolean) => {
    setSelectedDefinitionIds(current => {
      const next = new Set(current);
      for (const definitionId of visibleDefinitionIds) {
        if (selected) next.add(definitionId);
        else next.delete(definitionId);
      }
      return next;
    });
  };

  const changeListState = (nextState: DefinitionListState) => {
    setListState(nextState);
    setPage(1);
    clearSelection();
  };

  const changeSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    clearSelection();
  };

  const changeSort = (value: string) => {
    const option = definitionSortOptions.find(candidate => candidate.value === value);
    if (!option) return;
    setSortBy(option.sortBy);
    setSortDirection(option.sortDirection);
    setPage(1);
  };

  const changeMarkerTagClause = (tagDefinitionId: string, operator: "" | "exists" | "missing") => {
    setMarkerTagClauses(current => {
      const next = current.filter(clause => !clause.startsWith(`${tagDefinitionId}:`));
      if (operator) next.push(`${tagDefinitionId}:${operator}`);
      return next;
    });
    setPage(1);
    clearSelection();
  };

  const changeControlledTagExistence = (definitionId: string, operator: "" | "exists" | "missing") => {
    setControlledTagClauses(current => {
      const next = current.filter(clause => clause.definitionId !== definitionId || (clause.operator !== "exists" && clause.operator !== "missing"));
      return operator ? [...next, { definitionId, operator, controlledValueIds: [] }] : next;
    });
    setPage(1);
    clearSelection();
  };

  const changeControlledTagValueOperator = (definitionId: string, operator: "" | "anyOf" | "noneOf") => {
    setControlledTagClauses(current => {
      const existing = current.find(clause => clause.definitionId === definitionId && (clause.operator === "anyOf" || clause.operator === "noneOf"));
      const next = current.filter(clause => clause !== existing);
      return operator ? [...next, existing ? { ...existing, operator } : { definitionId, operator, controlledValueIds: [] }] : next;
    });
    setPage(1);
    clearSelection();
  };

  const changeControlledTagValues = (definitionId: string, values: string[]) => {
    setControlledTagClauses(current => {
      const existing = current.find(clause => clause.definitionId === definitionId && (clause.operator === "anyOf" || clause.operator === "noneOf"));
      const next = current.filter(clause => clause !== existing);
      return existing && values.length ? [...next, { ...existing, controlledValueIds: values }] : next;
    });
    setPage(1);
    clearSelection();
  };

  const changeControlledTagGrouping = (definitionId: string) => {
    setGroupByControlledTagDefinitionId(definitionId || null);
    setPage(1);
    clearSelection();
  };

  const softDelete = async (definition: WorkflowDefinitionDetails["definition"]) => {
    if (!(await getDialogs().confirm({ message: `Delete workflow definition "${definition.name}"? You can restore it from the Deleted view.`, confirmLabel: "Delete", tone: "danger" }))) return;
    setStatus("");
    setError("");
    try {
      await deleteDefinition(context, definition.id);
      toggleDefinitionSelection(definition.id, false);
      setStatus(`Deleted ${definition.name}`);
      await refreshAfterMutation();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const restore = async (definition: WorkflowDefinitionDetails["definition"]) => {
    setStatus("");
    setError("");
    try {
      await restoreDefinition(context, definition.id);
      toggleDefinitionSelection(definition.id, false);
      setStatus(`Restored ${definition.name}`);
      await refreshAfterMutation();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const permanentDelete = async (definition: WorkflowDefinitionDetails["definition"]) => {
    if (!(await getDialogs().confirm({ message: `Permanently delete workflow definition "${definition.name}"? This removes its drafts, versions, layouts, and validations and cannot be undone.`, confirmLabel: "Delete permanently", tone: "danger" }))) return;
    setStatus("");
    setError("");
    try {
      await deleteDefinitionPermanently(context, definition.id);
      toggleDefinitionSelection(definition.id, false);
      setStatus(`Permanently deleted ${definition.name}`);
      await refreshAfterMutation();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <>
      <div className="wf-toolbar">
        <div className="wf-segmented" role="tablist" aria-label="Definition state">
          <button type="button" className={listState === "active" ? "active" : ""} aria-selected={listState === "active"} onClick={() => changeListState("active")}>Active</button>
          <button type="button" className={listState === "deleted" ? "active" : ""} aria-selected={listState === "deleted"} onClick={() => changeListState("deleted")}>Deleted</button>
        </div>
        <label className="wf-search">
          <Search size={15} />
          <input value={search} onChange={event => changeSearch(event.target.value)} placeholder="Search definitions" />
        </label>
        <label className="wf-page-size">
          Sort
          <select aria-label="Sort workflow definitions" value={`${sortBy}:${sortDirection}`} onChange={event => changeSort(event.target.value)}>
            {definitionSortOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        {taggingState === "ready" && filterableTagDefinitions.length > 0 ? (
          <fieldset className="wf-tag-filters">
            <legend>Marker tags</legend>
            {filterableTagDefinitions.map(tag => {
              const clause = markerTagClauses.find(value => value.startsWith(`${tag.id}:`));
              const value = clause?.split(":")[1] ?? "";
              const filterLabel = `${tag.displayName}${tag.status === "Retired" ? " (Retired)" : ""}`;
              return <label key={tag.id}>
                {filterLabel}
                <select aria-label={`${filterLabel} marker tag filter`} value={value} onChange={event => changeMarkerTagClause(tag.id, event.target.value as "" | "exists" | "missing")}>
                  <option value="">Any</option>
                  <option value="exists">Has tag</option>
                  <option value="missing">Missing tag</option>
                </select>
              </label>;
            })}
          </fieldset>
        ) : null}
        {taggingState === "ready" && visibleControlledDefinitions.length > 0 ? (
          <>
            <fieldset className="wf-tag-filters wf-controlled-tag-filters">
              <legend>Controlled tags</legend>
              {visibleControlledDefinitions.map(tag => {
                const existence = controlledTagClauses.find(clause => clause.definitionId === tag.id && (clause.operator === "exists" || clause.operator === "missing"));
                const valuesClause = controlledTagClauses.find(clause => clause.definitionId === tag.id && (clause.operator === "anyOf" || clause.operator === "noneOf"));
                const facet = controlledTagFacets.find(candidate => candidate.tagDefinitionId === tag.id);
                const values = facet ? facet.values : (controlledValues[tag.id] ?? []).map(value => ({
                  controlledValueId: value.id,
                  canonicalKey: value.key,
                  displayName: value.displayName,
                  description: value.description,
                  color: value.color,
                  status: value.status,
                  sortOrder: value.sortOrder,
                  count: 0
                }));
                return <fieldset key={tag.id} className="wf-controlled-tag-filter">
                  <legend>{tag.displayName}</legend>
                  <label>Presence
                    <select aria-label={`${tag.displayName} controlled tag presence`} value={existence?.operator ?? ""} onChange={event => changeControlledTagExistence(tag.id, event.target.value as "" | "exists" | "missing")}>
                      <option value="">Any</option><option value="exists">Has value</option><option value="missing">Missing</option>
                    </select>
                  </label>
                  <label>Values
                    <select aria-label={`${tag.displayName} controlled tag value mode`} value={valuesClause?.operator ?? ""} onChange={event => changeControlledTagValueOperator(tag.id, event.target.value as "" | "anyOf" | "noneOf")}>
                      <option value="">No value filter</option><option value="anyOf">Any of</option><option value="noneOf">None of</option>
                    </select>
                  </label>
                  <label>Choices
                    <select multiple aria-label={`${tag.displayName} controlled tag values`} disabled={!valuesClause} value={valuesClause?.controlledValueIds ?? []} onChange={event => changeControlledTagValues(tag.id, [...event.currentTarget.selectedOptions].map(option => option.value))}>
                      {values.map(value => <option key={value.controlledValueId} value={value.controlledValueId}>{value.displayName} ({value.count}){value.status === "Retired" ? " · Retired" : ""}</option>)}
                    </select>
                  </label>
                </fieldset>;
              })}
            </fieldset>
            <label className="wf-page-size">Group
              <select aria-label="Group workflow definitions by controlled tag" value={groupByControlledTagDefinitionId ?? ""} onChange={event => changeControlledTagGrouping(event.target.value)}>
                <option value="">No grouping</option>
                {visibleControlledDefinitions.map(tag => <option key={tag.id} value={tag.id}>{tag.displayName}</option>)}
              </select>
            </label>
          </>
        ) : null}
        {taggingState === "forbidden" ? <span className="wf-inline-note">Tag filters require tagging access.</span> : null}
        <button type="button" onClick={() => void load()}>Refresh</button>
        <div className="wf-actions">
          <button type="button" title="Create workflow" onClick={openCreateDialog}><Plus size={15} /> Create</button>
        </div>
      </div>

      {state === "failed" ? <WfErrorCard message={error} title="Couldn't load workflow definitions" /> : null}
      {state !== "failed" && error ? <div className="wf-alert"><AlertCircle size={16} /> {error}</div> : null}
      {status ? <div className="wf-status-line"><Check size={14} /> {status}</div> : null}
      {selectedDefinitionIds.size > 0 ? (
        <div className="wf-selection-bar" aria-live="polite">
          <span>{selectedDefinitionIds.size} selected</span>
          <button type="button" onClick={clearSelection}>Clear selection</button>
        </div>
      ) : null}
      {state === "loading" ? <WfListSkeleton /> : null}
      {state === "ready" && definitions.length === 0 ? (
        <WfEmptyState
          icon={<Package size={22} />}
          title={`No ${listState} workflow definitions`}
          description="Create a workflow to start designing automation, or adjust your filters to see more."
          action={<button type="button" className="wf-link-button" onClick={openCreateDialog}><Plus size={15} /> Create workflow</button>}
        />
      ) : null}
      {state === "ready" && definitions.length > 0 ? (
        <>
          <div className="wf-grid wf-definition-grid" role="table" aria-label="Workflow definitions">
            <div className="wf-grid-head" role="row">
              <label className="wf-row-select">
                <input
                  ref={selectVisibleRef}
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={event => toggleVisibleSelection(event.target.checked)}
                  aria-label="Select visible workflow definitions"
                />
              </label>
              <span>Name</span>
              <span>Tags</span>
              <span>Latest version</span>
              <span>{listState === "deleted" ? "Deleted" : "Draft"}</span>
              <span>Modified</span>
              <span>Actions</span>
            </div>
            {definitions.flatMap((definition, index) => {
              const group = definition.group;
              const previousGroup = definitions[index - 1]?.group;
              const groupChanged = groupByControlledTagDefinitionId && group && groupKey(group) !== groupKey(previousGroup);
              const groupInfo = group ? controlledTagGroups.find(candidate => groupKey(candidate) === groupKey(group)) : null;
              return [
                groupChanged ? <div className="wf-definition-group" role="row" key={`group-${groupKey(group)}`}>
                  {groupInfo?.color ? <span className="wf-tag-chip-color" style={{ backgroundColor: groupInfo.color }} aria-hidden="true" /> : null}
                  <strong>{groupInfo?.label ?? group?.kind}</strong><small>{groupInfo?.count ?? 0}</small>
                </div> : null,
              <div
                className="wf-grid-row"
                role="row"
                aria-label={`Open workflow definition ${definition.name}`}
                aria-selected={selectedDefinitionIds.has(definition.id)}
                tabIndex={0}
                onClick={() => onOpen(definition.id)}
                onKeyDown={event => {
                  if (event.currentTarget !== event.target) return;
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  onOpen(definition.id);
                }}
                key={definition.id}
              >
                <label className="wf-row-select" onClick={event => event.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedDefinitionIds.has(definition.id)}
                    onChange={event => toggleDefinitionSelection(definition.id, event.target.checked)}
                    aria-label={`Select workflow definition ${definition.name}`}
                  />
                </label>
                <span>
                  <strong>{definition.name}</strong>
                  <small>{definition.description || definition.id}</small>
                </span>
                <span><MarkerTagChips definition={definition} /></span>
                <span>{definition.latestVersion ?? "No version"}</span>
                <span>{listState === "deleted" ? formatDate(definition.deletedAt) : (definition.draftId ? "Draft" : "None")}</span>
                <span>{formatDate(definition.lastModifiedAt)}</span>
                <span className="wf-row-actions" onClick={event => event.stopPropagation()}>
                  {listState === "active" ? (
                    <>
                      <button type="button" onClick={event => { event.stopPropagation(); onOpen(definition.id); }}>Open</button>
                      <button type="button" onClick={event => { event.stopPropagation(); openDefinitionArtifacts(definition.id); }}>Artifacts</button>
                      {explainDefinitionAction ? (
                        <button type="button" onClick={() => dispatchAiAction(ai, explainDefinitionAction, definition)}><Sparkles size={13} /> Explain</button>
                      ) : null}
                      <button type="button" className="danger" onClick={() => void softDelete(definition)}><Trash2 size={13} /> Delete</button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => void restore(definition)}><RotateCcw size={13} /> Restore</button>
                      <button type="button" className="danger" onClick={() => void permanentDelete(definition)}><Trash2 size={13} /> Delete permanently</button>
                    </>
                  )}
                </span>
              </div>
              ];
            })}
          </div>
          <DefinitionPager
            page={page}
            pageSize={pageSize}
            totalCount={totalCount}
            onPageChange={setPage}
            onPageSizeChange={value => {
              setPageSize(value);
              setPage(1);
            }}
          />
        </>
      ) : null}
      {createDraft ? (
        <CreateWorkflowDialog
          draft={createDraft}
          catalog={catalog}
          creating={creating}
          ai={ai}
          suggestMetadataAction={suggestMetadataAction}
          onChange={nextDraft => setCreateDraft(nextDraft)}
          onClose={() => setCreateDraft(null)}
          onSubmit={submitCreate}
        />
      ) : null}
    </>
  );
}

export function MarkerTagChips({ definition }: { definition: Pick<WorkflowDefinitionDetails["definition"], "markerTags" | "tagChips"> }) {
  const tags = definition.tagChips ?? definition.markerTags ?? [];
  const [overflowOpen, setOverflowOpen] = useState(false);
  const overflowId = useId();
  if (tags.length === 0) return <span className="wf-inline-note">None</span>;
  const visible = tags.slice(0, 2);
  const overflow = tags.slice(2);
  return <span className="wf-tag-chip-list" aria-label={`Tags: ${tags.map(tagLabel).join(", ")}`}>
    {visible.map(tag => <TagChip key={tag.tagDefinitionId} tag={tag} />)}
    {overflow.length > 0 ? <span className="wf-tag-overflow">
      <button
        type="button"
        className="wf-tag-chip wf-tag-chip-button"
        aria-expanded={overflowOpen}
        aria-controls={overflowId}
        aria-label={`Show ${overflow.length} more tag${overflow.length === 1 ? "" : "s"}`}
        onClick={event => { event.stopPropagation(); setOverflowOpen(current => !current); }}
      >+{overflow.length}</button>
      {overflowOpen ? <ul id={overflowId} className="wf-tag-overflow-list" role="list">
        {overflow.map(tag => <li key={tag.tagDefinitionId}>{tagLabel(tag)}</li>)}
      </ul> : null}
    </span> : null}
  </span>;
}

function TagChip({ tag }: { tag: NonNullable<WorkflowDefinitionDetails["definition"]["tagChips"]>[number] | NonNullable<WorkflowDefinitionDetails["definition"]["markerTags"]>[number] }) {
  const color = "controlledValueColor" in tag && tag.controlledValueColor ? tag.controlledValueColor : tag.color;
  return <span className="wf-tag-chip" title={tagLabel(tag)}>
    {color ? <span className="wf-tag-chip-color" style={{ backgroundColor: color }} aria-hidden="true" /> : null}
    {tagLabel(tag)}
  </span>;
}

function tagLabel(tag: NonNullable<WorkflowDefinitionDetails["definition"]["tagChips"]>[number] | NonNullable<WorkflowDefinitionDetails["definition"]["markerTags"]>[number]) {
  if ("conflict" in tag && tag.conflict) return `${tag.displayName}: Conflicted`;
  return "controlledValueDisplayName" in tag && tag.controlledValueDisplayName
    ? `${tag.displayName}: ${tag.controlledValueDisplayName}`
    : tag.displayName;
}

function groupKey(group: { kind: "Value" | "Untagged" | "Conflicted"; controlledValueId?: string | null } | null | undefined) {
  return group ? `${group.kind}:${group.controlledValueId ?? ""}` : "";
}
