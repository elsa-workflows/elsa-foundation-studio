import React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { clearApiCapabilityCache } from "../api/capabilities";
import { workflowExecutableExportRelation } from "../api/executableArtifactExport";
import type { WorkflowDefinitionDetails, WorkflowDraft } from "../workflowTypes";
import { useWorkflowOperations } from "../workflow-editor/useWorkflowOperations";
import {
  selectPublishedExecutable,
  useExecutableArtifactExport,
  type ExecutableArtifactExportState
} from "../workflow-editor/useExecutableArtifactExport";

// Availability gating and the failure branches of the "Export artifact" action (studio #493).

type Operations = ReturnType<typeof useWorkflowOperations>;

let mounted: { root: ReturnType<typeof createRoot>; container: HTMLDivElement } | null = null;
let downloads: { name: string; blob: Blob }[] = [];
const objectUrlApi = URL as unknown as {
  createObjectURL?: (blob: Blob) => string;
  revokeObjectURL?: (url: string) => void;
};

beforeEach(() => {
  downloads = [];
  const blobsByUrl = new Map<string, Blob>();
  // jsdom defines no object-URL API at all, so it is installed rather than spied on.
  objectUrlApi.createObjectURL = (blob: Blob) => {
    const url = `blob:${blobsByUrl.size + 1}`;
    blobsByUrl.set(url, blob);
    return url;
  };
  objectUrlApi.revokeObjectURL = () => undefined;
  vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function click(this: HTMLAnchorElement) {
    downloads.push({ name: this.download, blob: blobsByUrl.get(this.href)! });
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  delete objectUrlApi.createObjectURL;
  delete objectUrlApi.revokeObjectURL;
  clearApiCapabilityCache();
  if (!mounted) return;
  flushSync(() => mounted!.root.unmount());
  mounted.container.remove();
  mounted = null;
});

describe("executable artifact export availability", () => {
  it("offers the published default slot as the export target", async () => {
    const fixture = renderAvailability();
    await flushUpdates();

    expect(fixture.current()).toMatchObject({
      status: "ready",
      supported: true,
      target: {
        versionId: "version-1",
        definitionId: "definition-1",
        artifactVersion: "1.0.0",
        slotName: "default"
      }
    });
  });

  it("hides the action when the server does not advertise the relation", async () => {
    const fixture = renderAvailability({ advertiseExport: false });
    await flushUpdates();

    expect(fixture.current()).toEqual({ status: "unavailable", supported: false, target: null });
    // Slots are never listed once the relation is known to be absent.
    expect(fixture.getJson.mock.calls.map(([url]) => url)).toEqual(["/capabilities"]);
  });

  it("reports no target for a workflow that was never published", async () => {
    const fixture = renderAvailability({ slots: [] });
    await flushUpdates();

    expect(fixture.current()).toMatchObject({ status: "ready", supported: true, target: null });
  });

  it("hides the action rather than erroring when the probe fails", async () => {
    const fixture = renderAvailability({ failSlots: true });
    await flushUpdates();

    expect(fixture.current()).toEqual({ status: "unavailable", supported: false, target: null });
  });

  it("prefers an active default slot, then any active slot, then any remaining publication", () => {
    expect(selectPublishedExecutable([
      publicationSlot({ slotName: "blue", status: "active", versionId: "version-blue" }),
      publicationSlot({ slotName: "default", status: "active", versionId: "version-default" })
    ])?.versionId).toBe("version-default");

    expect(selectPublishedExecutable([
      publicationSlot({ slotName: "green", status: "retired", versionId: "version-green" }),
      publicationSlot({ slotName: "blue", status: "active", versionId: "version-blue" })
    ])?.versionId).toBe("version-blue");

    expect(selectPublishedExecutable([
      publicationSlot({ slotName: "green", status: "retiring", versionId: "version-green" })
    ])?.versionId).toBe("version-green");

    // A slot whose publication carries no version id cannot address the endpoint.
    expect(selectPublishedExecutable([{ definitionId: "definition-1", slotName: "default", status: "active" }]))
      .toBeNull();
  });
});

describe("executable artifact export operation", () => {
  it("downloads the server closure verbatim under the endpoint's file name", async () => {
    const fixture = renderOperations();

    await fixture.current().exportExecutableArtifact();
    await flushUpdates();

    expect(fixture.getJson.mock.calls.map(([url]) => url)).toEqual([
      "/capabilities",
      "/publishing/workflows/version-1/executable-export"
    ]);
    expect(downloads).toHaveLength(1);
    expect(downloads[0].name).toBe("definition-1-1.0.0-closure.json");
    expect(JSON.parse(await readBlobText(downloads[0].blob))).toEqual(closurePayload);
    expect(fixture.setStatus).toHaveBeenLastCalledWith("Exported executable artifact.");
    expect(fixture.setError.mock.calls.map(([value]) => value)).toEqual([""]);
    // Nothing is saved, promoted, or published by an export.
    expect(fixture.saveDraft).not.toHaveBeenCalled();
  });

  it("asks for a publish instead of calling the endpoint when nothing is published", async () => {
    const fixture = renderOperations({ publishedExecutable: null });

    await fixture.current().exportExecutableArtifact();
    await flushUpdates();

    expect(fixture.getJson).not.toHaveBeenCalled();
    expect(downloads).toEqual([]);
    expect(fixture.setError.mock.calls.at(-1)?.[0]).toMatchObject({
      message: expect.stringContaining("Publish this workflow before exporting")
    });
  });

  it("offers a publish-first affordance for the never-published conflict", async () => {
    const fixture = renderOperations({
      failWith: {
        status: 409,
        detail: "Cannot export workflow definition version 'version-1': it has no Published source reference. Only 'TestRun'-scope reference(s) exist, and those are expiring, engine-local snapshots that are not portable."
      }
    });

    await fixture.current().exportExecutableArtifact();
    await flushUpdates();

    expect(downloads).toEqual([]);
    const error = fixture.setError.mock.calls.at(-1)?.[0];
    expect(error).toMatchObject({ status: 409, message: expect.stringContaining("Publish this workflow before exporting") });
    expect(error.detail).toContain("no Published source reference");
    expect(fixture.setStatus).toHaveBeenLastCalledWith("");
  });

  it("surfaces every missing dependency artifact id for an incomplete closure", async () => {
    const fixture = renderOperations({
      failWith: {
        status: 409,
        detail: "Cannot export workflow definition version 'version-1': the closure rooted at 'artifact-1' is incomplete.",
        errors: [
          { name: "generalErrors", reason: "Dependency artifact 'artifact-child-1' is missing from the executable store." },
          { name: "generalErrors", reason: "Dependency artifact 'artifact-child-2' is missing from the executable store." }
        ]
      }
    });

    await fixture.current().exportExecutableArtifact();
    await flushUpdates();

    expect(downloads).toEqual([]);
    const error = fixture.setError.mock.calls.at(-1)?.[0];
    expect(error.message).toContain("2 dependency artifacts are missing");
    expect(error.detail).toContain("Missing dependency artifacts: artifact-child-1, artifact-child-2");
  });

  it("reports an unknown version without downloading anything", async () => {
    const fixture = renderOperations({
      failWith: { status: 404, detail: "Cannot export workflow definition version 'version-1': no executable source reference of any scope exists for it." }
    });

    await fixture.current().exportExecutableArtifact();
    await flushUpdates();

    expect(downloads).toEqual([]);
    expect(fixture.setError.mock.calls.at(-1)?.[0]).toMatchObject({
      status: 404,
      message: expect.stringContaining("no exportable executable")
    });
  });

  it("reports a store fault without downloading anything", async () => {
    const fixture = renderOperations({
      failWith: { status: 500, detail: "Cannot export workflow definition version 'version-1': the engine failed to read the executable store." }
    });

    await fixture.current().exportExecutableArtifact();
    await flushUpdates();

    expect(downloads).toEqual([]);
    expect(fixture.setError.mock.calls.at(-1)?.[0]).toMatchObject({
      status: 500,
      message: expect.stringContaining("could not produce the executable artifact")
    });
  });

  it("names the engine composition when no export delivery is configured", async () => {
    const fixture = renderOperations({
      failWith: { status: 500, detail: "Workflow artifact export is not available on this engine." }
    });

    await fixture.current().exportExecutableArtifact();
    await flushUpdates();

    expect(downloads).toEqual([]);
    expect(fixture.setError.mock.calls.at(-1)?.[0]).toMatchObject({
      message: expect.stringContaining("no export delivery configured")
    });
  });

  it("does nothing while another editor operation is in flight", async () => {
    const fixture = renderOperations({ busy: true });

    await fixture.current().exportExecutableArtifact();
    await flushUpdates();

    expect(fixture.getJson).not.toHaveBeenCalled();
    expect(fixture.setError).not.toHaveBeenCalled();
    expect(downloads).toEqual([]);
  });
});

const closurePayload = {
  formatVersion: "1.0.0",
  rootArtifactId: "artifact-1",
  artifacts: [{ identity: { artifactId: "artifact-1", definitionId: "definition-1", artifactVersion: "1.0.0" } }]
};

/** jsdom's Blob exposes no `text()`, so the saved bytes are read back through a FileReader. */
function readBlobText(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error("Could not read the download blob."));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsText(blob);
  });
}

async function flushUpdates() {
  await new Promise(resolve => setTimeout(resolve, 0));
  flushSync(() => undefined);
}

function capabilities(advertiseExport: boolean) {
  return {
    capabilities: [{
      id: "elsa.api.publishing",
      contractVersion: "1",
      links: [
        { rel: "publication-slots", href: "publishing/workflows/{definitionId}/slots", templated: true },
        ...(advertiseExport
          ? [{ rel: workflowExecutableExportRelation, href: "publishing/workflows/{versionId}/executable-export", templated: true }]
          : [])
      ]
    }]
  };
}

function publicationSlot(options: { slotName: string; status: string; versionId: string }) {
  return {
    definitionId: "definition-1",
    slotName: options.slotName,
    status: options.status,
    activePublicationId: options.status === "active" ? `publication-${options.slotName}` : null,
    publication: {
      publicationId: `publication-${options.slotName}`,
      definitionId: "definition-1",
      versionId: options.versionId,
      artifactId: "artifact-1",
      artifactVersion: "1.0.0",
      slotName: options.slotName,
      sourceReferenceId: "reference-1",
      status: options.status
    }
  } as never;
}

function renderAvailability(options: { advertiseExport?: boolean; slots?: unknown[]; failSlots?: boolean } = {}) {
  const getJson = vi.fn(async (url: string) => {
    if (url === "/capabilities") return capabilities(options.advertiseExport ?? true);
    if (url === "/publishing/workflows/definition-1/slots") {
      if (options.failSlots) throw new Error("slots unavailable");
      return { items: options.slots ?? [publicationSlot({ slotName: "default", status: "active", versionId: "version-1" })] };
    }
    throw new Error(`Unexpected GET ${url}`);
  });
  const context = {
    baseUrl: `test://availability-${Math.random()}`,
    http: { getJson }
  } as unknown as StudioEndpointContext;

  let current: ExecutableArtifactExportState | null = null;
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  mounted = { root, container };
  const Harness = () => {
    current = useExecutableArtifactExport({ context, definitionId: "definition-1" });
    return null;
  };
  flushSync(() => root.render(<Harness />));
  return { current: () => current!, getJson };
}

function renderOperations(options: {
  busy?: boolean;
  publishedExecutable?: { versionId: string; definitionId: string; artifactVersion: string | null; artifactId: string | null; slotName: string } | null;
  failWith?: Record<string, unknown>;
} = {}) {
  const getJson = vi.fn(async (url: string) => {
    if (url === "/capabilities") return capabilities(true);
    if (url === "/publishing/workflows/version-1/executable-export") {
      if (options.failWith) {
        const status = options.failWith.status as number;
        throw Object.assign(new Error(String(options.failWith.detail ?? `Request failed with ${status}.`)), {
          status,
          payload: options.failWith
        });
      }
      return closurePayload;
    }
    throw new Error(`Unexpected GET ${url}`);
  });
  const context = {
    baseUrl: `test://export-operation-${Math.random()}`,
    http: { getJson, postJson: vi.fn() }
  } as unknown as StudioEndpointContext;
  const saveDraft = vi.fn(async (snapshot: WorkflowDraft) => snapshot);
  const callbacks = {
    flushPendingSave: vi.fn(async () => undefined),
    reload: vi.fn(async () => undefined),
    startTestRun: vi.fn(),
    clearTestRun: vi.fn(),
    setPublishedArtifact: vi.fn(),
    setOperation: vi.fn(),
    setStatus: vi.fn(),
    setError: vi.fn(),
    setActiveRightPanelId: vi.fn(),
    setInspectorCollapsed: vi.fn(),
    setAutosavePaused: vi.fn()
  };

  let current: Operations | null = null;
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  mounted = { root, container };
  const Harness = () => {
    current = useWorkflowOperations({
      context,
      draft: draft(),
      details: details(),
      catalog: [],
      busy: options.busy ?? false,
      publishedExecutable: options.publishedExecutable === undefined
        ? {
          versionId: "version-1",
          definitionId: "definition-1",
          artifactVersion: "1.0.0",
          artifactId: "artifact-1",
          slotName: "default"
        }
        : options.publishedExecutable,
      saveDraft,
      ...callbacks
    });
    return null;
  };
  flushSync(() => root.render(<Harness />));
  return { current: () => current!, getJson, saveDraft, ...callbacks };
}

function draft(): WorkflowDraft {
  return {
    id: "draft-1",
    definitionId: "definition-1",
    sourceVersionId: "version-1",
    state: { rootActivity: { nodeId: "root", activityVersionId: "root-v1", inputs: [], outputs: [] } },
    layout: [],
    validationErrors: []
  };
}

function details(): WorkflowDefinitionDetails {
  return {
    definition: {
      id: "definition-1",
      name: "Orders",
      createdAt: "2026-07-01T00:00:00Z",
      lastModifiedAt: "2026-07-01T00:00:00Z",
      latestVersion: "1.0.0",
      versionCount: 1
    },
    draft: draft(),
    versions: [{ id: "version-1", version: "1.0.0", createdAt: "2026-07-01T00:00:00Z" }]
  };
}
