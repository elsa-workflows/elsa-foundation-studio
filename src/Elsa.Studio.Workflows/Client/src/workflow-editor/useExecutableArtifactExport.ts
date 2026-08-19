import { useEffect, useRef, useState } from "react";
import type { StudioEndpointContext } from "@elsa-workflows/studio-sdk";
import { isWorkflowExecutableExportAvailable } from "../api/executableArtifactExport";
import { listPublicationSlots, type PublicationSlot } from "../api/publishing";

/** The published version whose compiled artifact closure can be exported, plus the identity its file is named from. */
export interface PublishedExecutableTarget {
  versionId: string;
  definitionId: string;
  artifactVersion: string | null;
  artifactId: string | null;
  slotName: string;
}

export interface ExecutableArtifactExportState {
  status: "loading" | "ready" | "unavailable";
  /** True only when the backend advertises the executable-export relation (foundation #1304). */
  supported: boolean;
  /** The published version to export, or null when this workflow has no published version yet. */
  target: PublishedExecutableTarget | null;
}

const unavailable: ExecutableArtifactExportState = { status: "unavailable", supported: false, target: null };

/**
 * Gates the "Export artifact" action on the two things it needs: the server advertising the export
 * relation, and the workflow having a published version to export.
 *
 * Degrades the way the publish and draft-validation integrations do — a runtime-less or older server
 * simply does not advertise the relation, so the action is hidden instead of erroring (FR-C-003). A
 * failed probe is treated the same way: an action that cannot work is better absent than broken.
 */
export function useExecutableArtifactExport({
  context,
  definitionId,
  publishedArtifactId,
  enabled = true
}: {
  context: StudioEndpointContext;
  definitionId: string;
  /** Re-probes after a publish so a freshly published workflow becomes exportable without a reload. */
  publishedArtifactId?: string | null;
  enabled?: boolean;
}): ExecutableArtifactExportState {
  const [state, setState] = useState<ExecutableArtifactExportState>({ status: "loading", supported: false, target: null });
  // Hold the context in a ref so the effect depends on the stable `baseUrl` string rather than on the
  // context object identity, which changes on every parent render.
  const contextRef = useRef(context);
  contextRef.current = context;
  const baseUrl = context.baseUrl ?? "";

  useEffect(() => {
    if (!enabled || !definitionId) {
      setState(unavailable);
      return;
    }

    let active = true;
    setState(previous => previous.status === "loading" ? previous : { ...previous, status: "loading" });
    void (async () => {
      try {
        const supported = await isWorkflowExecutableExportAvailable(contextRef.current);
        if (!active) return;
        if (!supported) {
          setState(unavailable);
          return;
        }
        const slots = await listPublicationSlots(contextRef.current, definitionId);
        if (!active) return;
        setState({ status: "ready", supported: true, target: selectPublishedExecutable(slots) });
      } catch {
        if (active) setState(unavailable);
      }
    })();

    return () => { active = false; };
  }, [baseUrl, definitionId, publishedArtifactId, enabled]);

  return state;
}

/**
 * Picks the version to export from the definition's publication slots: the active default slot first,
 * then any other active slot, then any slot that still carries a publication. Slots whose publication
 * has no version id are skipped — there is nothing to address the endpoint with.
 */
export function selectPublishedExecutable(slots: PublicationSlot[]): PublishedExecutableTarget | null {
  const candidates = slots.filter(slot => !!slot.publication?.versionId);
  const preferred = candidates.find(slot => slot.slotName === "default" && isActive(slot))
    ?? candidates.find(isActive)
    ?? candidates[0];
  if (!preferred?.publication) return null;

  const publication = preferred.publication;
  return {
    versionId: publication.versionId,
    definitionId: publication.definitionId || preferred.definitionId,
    artifactVersion: publication.artifactVersion ?? null,
    artifactId: publication.artifactId ?? null,
    slotName: preferred.slotName
  };
}

function isActive(slot: PublicationSlot) {
  return slot.publication?.status === "active" || slot.status === "active";
}
