import React, { lazy, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ActivityPropertiesPanel } from "../../src/Elsa.Studio.Workflows/Client/src/ActivityPropertiesPanel";
import { WorkflowLazyBoundary } from "../../src/Elsa.Studio.Workflows/Client/src/WorkflowLazyBoundary";
import { WorkflowDefinitions } from "../../src/Elsa.Studio.Workflows/Client/src/workflow-editor/WorkflowDefinitions";
import { WorkflowDefinitionTagsPanel } from "../../src/Elsa.Studio.Workflows/Client/src/workflow-editor/WorkflowDefinitionTagsPanel";
import { TagCatalogPage } from "../../src/Elsa.Studio.Workflows/Client/src/TagCatalogPage";
import { useRunDetailLayout } from "../../src/Elsa.Studio.Workflows/Client/src/workflow-editor/useRunDetailLayout";
import type { StudioActivityDescriptor, StudioAiContributionApi, StudioEndpointContext, StudioExpressionDescriptor } from "@elsa-workflows/studio-sdk";
import type { ActivityNode } from "../../src/Elsa.Studio.Workflows/Client/src/workflowTypes";
import "../../src/Elsa.Studio.Web/Client/src/app/ui/tokens.css";
import "../../src/Elsa.Studio.Workflows/Client/src/styles.css";
import "./fixture.css";

const searchParams = new URLSearchParams(window.location.search);
const scrollingFixture = searchParams.get("mode") === "scroll";
const dictionaryFixture = searchParams.get("mode") === "dictionary";
const lazyBoundaryFixture = searchParams.get("mode") === "lazy-boundary";
const runDetailFixture = searchParams.get("mode") === "run-detail";
const workflowDefinitionListFixture = searchParams.get("mode") === "workflow-definitions";
const controlledTagAuthoringFixture = searchParams.get("mode") === "controlled-tag-authoring";

type FixtureControlledValue = {
  id: string;
  tagDefinitionId: string;
  canonicalKey: string;
  displayName: string;
  color: string | null;
  sortOrder: number;
  status: "Active" | "Retired";
  revision: string;
};

type FixtureTagSet = {
  workflowDefinitionId: string;
  revision: string;
  canAssign: boolean;
  assertions: {
    tagDefinitionId: string;
    controlledValueId: string | null;
    origin: string;
  }[];
};

const DeferredWorkflowPanel = lazy(() => new Promise<{ default: React.ComponentType }>(resolve => {
  window.setTimeout(() => resolve({ default: () => <section aria-label="Deferred workflow designer">Workflow designer ready</section> }), 3_000);
}));

const expressionDescriptors: StudioExpressionDescriptor[] = [
  { type: "Input", displayName: "Input", editingMode: "reference" },
  { type: "JavaScript", displayName: "JavaScript", editingMode: "text" },
  { type: "Liquid", displayName: "Liquid", editingMode: "text" },
  { type: "Literal", displayName: "Literal", editingMode: "literal" },
  { type: "Object", displayName: "Object", editingMode: "structured" },
  { type: "Secret", displayName: "Secret", editingMode: "reference" },
  { type: "Variable", displayName: "Variable", editingMode: "reference" }
];

const descriptor: StudioActivityDescriptor = {
  typeName: "Elsa.Activities.Http.Activities.HttpEndpoint",
  displayName: "HTTP Endpoint",
  inputs: [{
    name: "Path",
    typeName: "System.String",
    displayName: "Path",
    description: "The route handled by this endpoint.",
    order: 0,
    category: "General",
    isBrowsable: true,
    uiHint: "singleline",
    isWrapped: true,
    defaultSyntax: "Literal"
  }],
  outputs: [],
  ports: []
};

const dictionaryDescriptor: StudioActivityDescriptor = {
  typeName: "Elsa.Activities.Http.Activities.HttpRequest",
  displayName: "HTTP Request",
  inputs: [{
    name: "Headers",
    typeName: "System.Collections.Generic.IDictionary`2[System.String,System.String]",
    displayName: "Headers",
    description: "Headers sent with the request.",
    order: 0,
    category: "General",
    isBrowsable: true,
    isWrapped: true,
    defaultSyntax: "Literal",
    uiSpecifications: {
      dictionary: {
        keyLabel: "Header name",
        valueLabel: "Header value",
        keyPlaceholder: "Content-Type",
        valuePlaceholder: "application/json",
        keyComparison: "ordinalIgnoreCase"
      }
    }
  }],
  outputs: [],
  ports: []
};

function Fixture() {
  const [activity, setActivity] = useState<ActivityNode>({
    nodeId: "http-endpoint-1",
    activityVersionId: "http-endpoint-v1",
    inputs: [{ referenceKey: "Path", value: { value: "/orders", expressionType: "Literal" } }],
    outputs: [],
    structure: null,
    ...(dictionaryFixture ? {
      headers: {
        typeName: "System.Collections.Generic.IDictionary`2[System.String,System.String]",
        expression: {
          type: "Literal",
          value: {
            Accept: "application/json",
            "X-Correlation-Id": "{{ correlationId }}",
            "Cache-Control": "no-cache",
            "User-Agent": "Elsa Studio",
            "X-Region": "eu-west",
            "X-Trace": "enabled"
          }
        }
      }
    } : {})
  });

  const activeDescriptor = dictionaryFixture ? dictionaryDescriptor : descriptor;

  return (
    <main className="wf-editor browser-fixture">
      <div className="browser-fixture-copy">
        <h1>Workflow designer</h1>
        <p>The inspector intentionally clips its own content to reproduce the original stacking defect.</p>
      </div>
      <aside className={`wf-inspector browser-inspector${scrollingFixture ? " browser-inspector--scroll" : ""}`} aria-label="Activity inspector">
        <h2>{dictionaryFixture ? "HTTP Request" : "HTTP Endpoint"}</h2>
        <div className="browser-inspector-spacer" aria-hidden="true" />
        <ActivityPropertiesPanel
          activity={activity}
          descriptor={activeDescriptor}
          editors={[]}
          expressionEditors={[]}
          expressionDescriptors={expressionDescriptors}
          expressionDescriptorStatus="ready"
          descriptorStatus="ready"
          visibleVariables={[]}
          scopeStatus="ready"
          onChange={setActivity}
        />
        {scrollingFixture ? <div className="browser-inspector-tail" aria-hidden="true" /> : null}
      </aside>
    </main>
  );
}

function LazyBoundaryFixture() {
  return (
    <main className="browser-fixture">
      <h1>Workflow management</h1>
      <WorkflowLazyBoundary label="workflow designer">
        <DeferredWorkflowPanel />
      </WorkflowLazyBoundary>
    </main>
  );
}

function RunDetailFixture() {
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const layout = useRunDetailLayout({ selectedActivityId });

  return (
    <div className="browser-run-shell">
      <header className="browser-run-shell-header">Elsa Foundation Studio</header>
      <div className="content browser-run-content">
        <section className="wf-page wf-page--run-workbench">
          <div className="wf-page-header">
            <div><span className="wf-kicker">Workflow management</span><h2>Run</h2></div>
            <code>wfexec-browser</code>
          </div>
          <div className="wf-toolbar">
            <button type="button" onClick={() => setSelectedActivityId("activity-1")}>Select activity</button>
            <button type="button" onClick={() => {
              layout.closeInspector();
              setSelectedActivityId(null);
            }}>Close details</button>
          </div>
          <div
            ref={layout.containerRef}
            className={layout.workbenchClassName}
            style={layout.workbenchStyle}
            data-testid="run-workbench"
            data-layout-mode={layout.mode}
          >
            <section className="wf-instance-canvas-shell" aria-label="Workflow run canvas">
              <header><h3>Canvas</h3></header>
              <div className="wf-instance-canvas">Activity graph</div>
            </section>
            <div className="wf-side-resize-spacer" />
            <aside className="wf-instance-inspector" aria-label="Run details">
              <header><h3>Activity details</h3></header>
              <div className="wf-instance-section">Evaluated inputs</div>
            </aside>
          </div>
        </section>
      </div>
      <footer className="browser-run-console">Console</footer>
    </div>
  );
}

function WorkflowDefinitionListFixture() {
  const [requests, setRequests] = useState<string[]>([]);
  const context = useMemo(() => ({
    baseUrl: "https://studio.example",
    http: {
      getJson: async (url: string) => {
        if (url === "/capabilities") {
          return {
            capabilities: [{
              id: "elsa.api.workflow-design",
              contractVersion: "1",
              links: [
                { rel: "workflow-definitions", href: "design/workflows/definitions" },
                {
                  rel: "workflow-definition-tags",
                  href: "design/workflows/definitions/{definitionId}/tags",
                  templated: true
                }
              ]
            }, {
              id: "elsa.api.tagging",
              contractVersion: "1",
              links: [
                { rel: "tag-definitions", href: "tagging/definitions" },
                {
                  rel: "tag-definition-values",
                  href: "tagging/definitions/{tagDefinitionId}/values",
                  templated: true
                }
              ]
            }]
          };
        }

        if (url === "/tagging/definitions") {
          return {
            canManage: true,
            items: [
              {
                id: "tag-environment",
                canonicalKey: "environment",
                displayName: "Environment",
                valueMode: "Marker",
                cardinality: "Single",
                status: "Active",
                revision: "\"tag-v1\""
              },
              {
                id: "tag-region",
                canonicalKey: "region",
                displayName: "Region",
                color: "#475569",
                valueMode: "Controlled",
                cardinality: "Single",
                status: "Active",
                revision: "\"tag-v2\""
              }
            ]
          };
        }

        if (url === "/tagging/definitions/tag-region/values?activeOnly=false") {
          return {
            canManage: true,
            items: [
              {
                id: "value-east",
                tagDefinitionId: "tag-region",
                canonicalKey: "east",
                displayName: "East",
                color: "#0ea5e9",
                sortOrder: 10,
                status: "Active",
                revision: "\"value-v1\""
              },
              {
                id: "value-west",
                tagDefinitionId: "tag-region",
                canonicalKey: "west",
                displayName: "West",
                color: "#f97316",
                sortOrder: 20,
                status: "Active",
                revision: "\"value-v2\""
              }
            ]
          };
        }

        setRequests(current => [...current, url]);
        const parameters = new URL(url, "https://studio.example").searchParams;
        const page = Number(parameters.get("page") ?? "1");
        const pageSize = Number(parameters.get("pageSize") ?? "50");
        const state = parameters.get("state") ?? "active";
        const searchTerm = (parameters.get("searchTerm") ?? "").toLowerCase();
        const definitions = Array.from({ length: 51 }, (_, index) => ({
          id: `${state}-definition-${index + 1}`,
          name: `${state === "deleted" ? "Deleted" : "Active"} workflow ${index + 1}`,
          createdAt: "2026-07-19T00:00:00Z",
          lastModifiedAt: "2026-07-19T00:00:00Z",
          versionCount: 0,
          markerTags: index % 3 === 0 ? [{ tagDefinitionId: "tag-environment", canonicalKey: "environment", displayName: "Environment" }] : [],
          tagChips: [
            ...(index % 3 === 0 ? [{ tagDefinitionId: "tag-environment", canonicalKey: "environment", displayName: "Environment" }] : []),
            ...(index % 2 === 0 ? [{
              tagDefinitionId: "tag-region",
              canonicalKey: "region",
              displayName: "Region",
              color: "#475569",
              controlledValueId: "value-east",
              controlledValueDisplayName: "East",
              controlledValueColor: "#0ea5e9"
            }] : [])
          ],
          group: parameters.get("groupByControlledTagDefinitionId") === "tag-region"
            ? index % 5 === 0
              ? { kind: "Conflicted" }
              : index % 2 === 0
                ? { kind: "Value", controlledValueId: "value-east" }
                : { kind: "Untagged" }
            : null
        })).filter(definition => definition.name.toLowerCase().includes(searchTerm));
        const offset = (page - 1) * pageSize;
        return {
          items: definitions.slice(offset, offset + pageSize),
          page,
          pageSize,
          totalCount: definitions.length,
          controlledTagFacets: parameters.has("controlledTagFacets")
            ? [{
              tagDefinitionId: "tag-region",
              values: [
                { controlledValueId: "value-east", canonicalKey: "east", displayName: "East", color: "#0ea5e9", status: "Active", sortOrder: 10, count: 21 },
                { controlledValueId: "value-west", canonicalKey: "west", displayName: "West", color: "#f97316", status: "Active", sortOrder: 20, count: 17 }
              ]
            }]
            : [],
          controlledTagGroups: parameters.get("groupByControlledTagDefinitionId") === "tag-region"
            ? [
              { kind: "Value", controlledValueId: "value-east", label: "East", color: "#0ea5e9", count: 21 },
              { kind: "Value", controlledValueId: "value-west", label: "West", color: "#f97316", count: 17 },
              { kind: "Untagged", label: "Untagged", count: 11 },
              { kind: "Conflicted", label: "Conflicted", count: 2 }
            ]
            : []
        };
      }
    }
  }) as StudioEndpointContext, []);
  const ai = useMemo(() => ({ promptActions: { list: () => [] } }) as StudioAiContributionApi, []);

  return (
    <main className="wf-page browser-fixture">
      <WorkflowDefinitions context={context} ai={ai} onOpen={() => undefined} />
      <output aria-label="Workflow definition requests">{requests.join("\n")}</output>
    </main>
  );
}

function ControlledTagAuthoringFixture() {
  const requests = useRef<string[]>([]);
  const [requestOutput, setRequestOutput] = useState("");
  const values = useRef<FixtureControlledValue[]>([
    {
      id: "value-production",
      tagDefinitionId: "tag-environment",
      canonicalKey: "production",
      displayName: "Production",
      color: "#16a34a",
      sortOrder: 10,
      status: "Active",
      revision: "\"value-v1\""
    },
    {
      id: "value-legacy",
      tagDefinitionId: "tag-environment",
      canonicalKey: "legacy",
      displayName: "Legacy",
      color: "#64748b",
      sortOrder: 20,
      status: "Retired",
      revision: "\"value-v2\""
    }
  ]);
  const tagSet = useRef<FixtureTagSet>({
    workflowDefinitionId: "definition-1",
    revision: "\"tags-v1\"",
    canAssign: true,
    assertions: [{
      tagDefinitionId: "tag-environment",
      controlledValueId: "value-legacy",
      origin: "manual"
    }]
  });
  const record = (entry: string) => {
    requests.current.push(entry);
    setRequestOutput(requests.current.join("\n"));
  };
  const context = useMemo(() => ({
    baseUrl: "https://studio.example",
    http: {
      getJson: async (url: string) => {
        if (url === "/capabilities") {
          return {
            capabilities: [
              {
                id: "elsa.api.tagging",
                contractVersion: "1",
                links: [
                  { rel: "tag-definitions", href: "tagging/definitions" },
                  {
                    rel: "tag-definition-values",
                    href: "tagging/definitions/{tagDefinitionId}/values",
                    templated: true
                  }
                ]
              },
              {
                id: "elsa.api.workflow-design",
                contractVersion: "1",
                links: [{
                  rel: "workflow-definition-tags",
                  href: "design/workflows/definitions/{definitionId}/tags",
                  templated: true
                }]
              }
            ]
          };
        }
        if (url === "/tagging/definitions") {
          return {
            canManage: true,
            items: [{
              id: "tag-environment",
              canonicalKey: "environment",
              displayName: "Environment",
              color: "#475569",
              valueMode: "Controlled",
              cardinality: "Single",
              status: "Active",
              revision: "\"tag-v1\""
            }]
          };
        }
        if (url === "/tagging/definitions/tag-environment/values?activeOnly=false") {
          return { canManage: true, items: values.current };
        }
        if (url === "/design/workflows/definitions/definition-1/tags") return tagSet.current;
        throw new Error(`Unexpected browser fixture request: ${url}`);
      },
      postJson: async (url: string, body: unknown) => {
        const request = body as { canonicalKey: string; displayName: string; sortOrder: number };
        const created = {
          id: `value-${request.canonicalKey}`,
          tagDefinitionId: "tag-environment",
          canonicalKey: request.canonicalKey,
          displayName: request.displayName,
          color: null,
          sortOrder: request.sortOrder,
          status: "Active",
          revision: "\"value-created\""
        };
        values.current = [...values.current, created];
        record(`POST ${url} ${JSON.stringify(body)}`);
        return created;
      },
      requestJson: async (url: string, init: RequestInit) => {
        const body = JSON.parse(String(init.body ?? "{}")) as {
          status?: "Active" | "Retired";
          tagDefinitionIds?: string[];
          controlledValues?: { tagDefinitionId: string; controlledValueId: string }[];
        };
        record(`${init.method} ${url} ${JSON.stringify(body)}`);
        if (init.method === "PATCH") {
          const id = url.split("/").at(-1);
          const current = values.current.find(value => value.id === id);
          if (!current) throw new Error("Controlled value not found.");
          Object.assign(current, body, { revision: "\"value-updated\"" });
          return current;
        }
        tagSet.current = {
          ...tagSet.current,
          revision: "\"tags-v2\"",
          assertions: [
            ...(body.tagDefinitionIds ?? []).map(tagDefinitionId => ({
              tagDefinitionId,
              controlledValueId: null,
              origin: "manual"
            })),
            ...(body.controlledValues ?? []).map(value => ({ ...value, origin: "manual" }))
          ]
        };
        return tagSet.current;
      }
    }
  }) as StudioEndpointContext, []);

  return (
    <main className="wf-page browser-fixture">
      <TagCatalogPage context={context} />
      <section aria-label="Workflow assignment">
        <h2>Workflow assignment</h2>
        <WorkflowDefinitionTagsPanel context={context} definitionId="definition-1" />
      </section>
      <output aria-label="Controlled tag authoring requests">{requestOutput}</output>
    </main>
  );
}

const theme = searchParams.get("theme");
document.documentElement.dataset.theme = theme === "black-glass" ? "black-glass" : "harbor";
document.documentElement.dataset.themeMode = theme === "black-glass" ? "dark" : "light";
createRoot(document.getElementById("root")!).render(
  controlledTagAuthoringFixture
    ? <ControlledTagAuthoringFixture />
    : workflowDefinitionListFixture
      ? <WorkflowDefinitionListFixture />
      : runDetailFixture
        ? <RunDetailFixture />
        : lazyBoundaryFixture
          ? <LazyBoundaryFixture />
          : <Fixture />
);
