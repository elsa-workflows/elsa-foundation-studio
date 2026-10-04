import React, { useEffect, useMemo, useRef, useState } from "react";
import { describeActivationSource, type PublicationIntent } from "../api/publishing";
import {
  publicationBaselineFor,
  publicationBlockCause,
  publicationBlockedMessage,
  publicationChangesFor,
  publicationChannelOccupancy,
  publicationIntentForChannel,
  publicationPreflightMatchesIntent,
  type PublicationChangeCount,
  type PublicationChannelOccupancy,
  type PublicationReviewState,
  type PublicationVersionSelection
} from "./publicationReview";
import { DialogDisclosure } from "./DialogDisclosure";
import { useDialogFocus } from "./useDialogFocus";
import "./publicationReview.css";

const createChannelValue = "__create-publication-channel__";

export function PublicationReviewDialog({
  review,
  busy,
  onReview,
  onPublish,
  onCancel,
  onOpenPublishedExecutable = () => undefined
}: {
  review: PublicationReviewState;
  busy: boolean;
  onReview?(
    review: PublicationReviewState,
    intent: PublicationIntent,
    versionSelection: PublicationVersionSelection
  ): Promise<void>;
  onPublish(intent: PublicationIntent, versionSelection?: PublicationVersionSelection): Promise<void>;
  onCancel(): void;
  onOpenPublishedExecutable?(): void;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  const channelNames = useMemo(
    () => [...new Set([review.policy.defaultSlotName, ...review.slots.map(slot => slot.slotName)])],
    [review.policy.defaultSlotName, review.slots]);
  const initialChannel = review.intent.slotName || review.policy.defaultSlotName;
  const [channelMode, setChannelMode] = useState<"existing" | "create">(
    channelNames.includes(initialChannel) ? "existing" : "create");
  const [existingChannel, setExistingChannel] = useState(
    channelNames.includes(initialChannel) ? initialChannel : review.policy.defaultSlotName);
  const [newChannel, setNewChannel] = useState(
    channelNames.includes(initialChannel) ? "" : initialChannel);
  const [versionSelection, setVersionSelection] = useState<PublicationVersionSelection>(review.versionSelection);
  const editableReview = review.phase === "review" || review.phase === "validationBlocked";
  const selectedChannel = channelMode === "existing" ? existingChannel : newChannel.trim();
  const channelIsValid = Boolean(selectedChannel)
    && !(channelMode === "create" && selectedChannel.toLowerCase() === review.policy.defaultSlotName.toLowerCase());
  const intent = useMemo(
    () => publicationIntentForChannel(review, selectedChannel),
    [review, selectedChannel]);
  const reviewedPreflight = publicationPreflightMatchesIntent(review.preflight, intent) ? review.preflight : undefined;
  const versionEvidenceMatches = !review.versionPreflightSupported
    || Boolean(review.versionPreflight
      && review.versionPreflight.assignmentMode === versionSelection.mode
      && (versionSelection.mode === "automatic"
        || review.versionPreflight.requestedVersion === versionSelection.requestedVersion.trim()));
  const matchingVersionPreflight = versionEvidenceMatches ? review.versionPreflight : undefined;
  const currentSelectionMatches = review.intent.action === intent.action
    && review.intent.slotName === intent.slotName
    && review.intent.expectedPublicationId === intent.expectedPublicationId
    && review.versionSelection.mode === versionSelection.mode
    && (versionSelection.mode === "automatic"
      || review.versionSelection.mode === "exact"
      && review.versionSelection.requestedVersion.trim() === versionSelection.requestedVersion.trim());
  const closeOnEscape = !busy && review.phase !== "publishing" ? onCancel : null;
  useDialogFocus(dialogRef, closeOnEscape);

  useEffect(() => {
    if (!onReview || !editableReview || !channelIsValid || review.validationErrors.length > 0) return;
    if (review.reviewFailed && currentSelectionMatches) return;
    if ((review.reviewPending && currentSelectionMatches) || (reviewedPreflight && versionEvidenceMatches)) return;
    void onReview(review, intent, versionSelection);
  }, [
    channelIsValid,
    editableReview,
    intent,
    onReview,
    currentSelectionMatches,
    review,
    reviewedPreflight,
    versionEvidenceMatches,
    versionSelection
  ]);

  const activeSlot = review.slots.find(slot => slot.slotName === selectedChannel);
  const occupancy = publicationChannelOccupancy(review, selectedChannel);
  const isReplacement = reviewedPreflight
    ? reviewedPreflight.resolvedAction === "replace"
    : occupancy.kind === "publication" || occupancy.kind === "foreign"
      || selectedChannel === review.policy.defaultSlotName;
  const changes = publicationChangesFor(review, activeSlot?.slotName ?? "");
  const preflightChanges = reviewedPreflight?.triggers ?? reviewedPreflight?.changes ?? [];
  const triggerSummary = reviewedPreflight
    ? preflightChanges.length
      ? preflightChanges.map(change => `${change.change} ${change.key} (${change.cardinality})`).join("; ")
      : "No trigger changes."
    : formatChangeCount(changes?.triggers);
  const versionIssues = matchingVersionPreflight?.issues ?? [];
  // A host predating elsa-foundation#1659 can still block without reporting why: no targetSlotOwner
  // and no conflicts. Say so honestly instead of rendering neither blocker and leaving the author
  // pointed at nothing.
  const blockCause = reviewedPreflight ? publicationBlockCause(reviewedPreflight) : null;
  const causeNeutralBlockMessage = reviewedPreflight && blockCause === "unknown"
    ? publicationBlockedMessage(reviewedPreflight)
    : undefined;
  const blocked = review.validationErrors.length > 0
    || !channelIsValid
    || review.reviewPending
    || !reviewedPreflight
    || !reviewedPreflight.canActivate
    || review.versionPreflightSupported && !versionEvidenceMatches
    || matchingVersionPreflight?.isReady === false;
  const statusMessage = publicationStatusMessage(review, blocked, causeNeutralBlockMessage);
  const submitDisabled = busy || (review.phase === "partialFailure"
    ? Boolean(review.reviewPending)
    : review.phase === "savedFailure"
      ? review.validationErrors.length > 0
      : blocked);

  useEffect(() => {
    if (review.phase !== "success" && review.phase !== "partialFailure" && review.phase !== "savedFailure") return;
    dialogRef.current?.querySelector<HTMLElement>(".wf-publication-outcome h4")?.focus();
  }, [review.phase]);

  return (
    <div className="wf-dialog-backdrop" role="presentation">
      <section
        ref={dialogRef}
        className="wf-dialog wf-publication-review"
        role="dialog"
        aria-modal="true"
        aria-labelledby="publication-review-title"
        aria-describedby="publication-review-status"
        tabIndex={-1}
      >
        <form onSubmit={event => {
          event.preventDefault();
          if (submitDisabled) return;
          void onPublish(intent, versionSelection);
        }}>
          <header className="wf-dialog-heading wf-publication-header">
            <div>
              <h3 id="publication-review-title">
                {review.phase === "success"
                  ? "Publication complete"
                  : review.phase === "partialFailure"
                    ? "Publication needs attention"
                    : "Review and publish"}
              </h3>
            </div>
          </header>

          <div className="wf-publication-body">
            <output
              id="publication-review-status"
              className="wf-publication-status"
              data-phase={review.phase}
              aria-live="polite"
            >
              {statusMessage}
            </output>

            {review.phase === "success" && review.published ? (
              <PublicationSuccess review={review} />
            ) : review.phase === "partialFailure" ? (
              <PublicationRecovery review={review} />
            ) : review.phase === "savedFailure" ? (
              <PublicationSavedFailure review={review} />
            ) : (
              <>
                <section className="wf-publication-decision" aria-label="Publication decision">
                  <dl className="wf-publication-summary">
                    <DecisionFact label="Version" value={versionSelection.mode === "exact"
                      ? matchingVersionPreflight?.resolvedVersion || versionSelection.requestedVersion || "Choose a version"
                      : matchingVersionPreflight?.resolvedVersion || "Automatic"} />
                    <DecisionFact label="Channel" value={selectedChannel || "Choose a channel"} />
                  </dl>
                  <p>{publicationEffect(occupancy, selectedChannel, review.policy.defaultSlotName, isReplacement)}</p>
                  {review.slotsUnavailableReason ? (
                    <p className="wf-dialog-note" role="note">{review.slotsUnavailableReason}</p>
                  ) : null}
                </section>

                <DialogDisclosure title="Publication settings">
                  <label className="wf-form-field">
                    <span>Publication channel</span>
                    <select
                      aria-label="Publication channel"
                      value={channelMode === "create" ? createChannelValue : existingChannel}
                      disabled={!editableReview || busy}
                      onChange={event => {
                        if (event.target.value === createChannelValue) {
                          setChannelMode("create");
                          setNewChannel("");
                        } else {
                          setChannelMode("existing");
                          setExistingChannel(event.target.value);
                        }
                      }}
                    >
                      {channelNames.map(channel => (
                        <option key={channel} value={channel}>
                          {channel === review.policy.defaultSlotName ? `${channel} (normal)` : channel}
                        </option>
                      ))}
                      <option value={createChannelValue}>Create new channel…</option>
                    </select>
                    <small>Named channels remain separately addressable.</small>
                  </label>


                  {channelMode === "create" ? (
                    <label className="wf-form-field">
                      <span>New channel name</span>
                      <input
                        aria-label="New publication channel"
                        value={newChannel}
                        disabled={!editableReview || busy}
                        onChange={event => setNewChannel(event.target.value)}
                        placeholder="canary"
                      />
                      {!newChannel.trim() ? <small role="alert">Enter a channel name.</small> : null}
                      {newChannel.trim().toLowerCase() === review.policy.defaultSlotName.toLowerCase()
                        ? <small role="alert">Choose {review.policy.defaultSlotName} from the existing channels.</small>
                        : null}
                    </label>
                  ) : null}

                  {review.exactVersionSupported ? (
                    <fieldset className="wf-publication-version-settings">
                      <legend>Version assignment</legend>
                      <div className="wf-publication-disclosure-body">
                        <label className="wf-publication-version-option">
                          <input
                            type="radio"
                            name="publication-version-mode"
                            checked={versionSelection.mode === "automatic"}
                            disabled={!editableReview || busy}
                            onChange={() => setVersionSelection({ mode: "automatic" })}
                          />
                          <span><strong>Automatic</strong><small>Assigned by policy.</small></span>
                        </label>
                        <label className="wf-publication-version-option">
                          <input
                            type="radio"
                            name="publication-version-mode"
                            checked={versionSelection.mode === "exact"}
                            disabled={!editableReview || busy}
                            onChange={() => setVersionSelection({
                              mode: "exact",
                              requestedVersion: versionSelection.mode === "exact"
                                ? versionSelection.requestedVersion
                                : ""
                            })}
                          />
                          <span><strong>Exact semantic version</strong><small>Unused and newer than the latest promoted version.</small></span>
                        </label>
                        {versionSelection.mode === "exact" ? (
                          <label className="wf-form-field">
                            <span>Exact version</span>
                            <input
                              aria-label="Exact semantic version"
                              value={versionSelection.requestedVersion}
                              disabled={!editableReview || busy}
                              onChange={event => setVersionSelection({
                                mode: "exact",
                                requestedVersion: event.target.value
                              })}
                              placeholder="2.1.0 or 2.1.0-rc.1"
                            />
                          </label>
                        ) : null}
                      </div>
                    </fieldset>
                  ) : null}
                </DialogDisclosure>

                {review.validationErrors.length ? (
                  <div className="wf-publication-risks" role="alert">
                    <strong>Fix validation errors</strong>
                    <ul>{review.validationErrors.map((message, index) => <li key={`${index}-${message}`}>{message}</li>)}</ul>
                  </div>
                ) : null}

                {versionIssues.length ? (
                  <div className="wf-publication-risks" role="alert">
                    <strong>Version is not ready</strong>
                    <ul>{versionIssues.map(issue => <li key={`${issue.code}-${issue.message}`}>{issue.message}</li>)}</ul>
                  </div>
                ) : null}

                {reviewedPreflight?.targetSlotOwner ? (
                  <div className="wf-publication-risks" role="alert">
                    <strong>Publication channel is owned by another activation source</strong>
                    <p>
                      {selectedChannel || reviewedPreflight.slotName} is occupied by an activation from {describeActivationSource(reviewedPreflight.targetSlotOwner)}.
                      Taking over requires an operator action. Choose another channel to publish side by side.
                    </p>
                  </div>
                ) : null}

                {reviewedPreflight?.conflicts.length ? (
                  <div className="wf-publication-risks" role="alert">
                    <strong>Publication channel conflicts</strong>
                    <ul>
                      {reviewedPreflight.conflicts.map(conflict => (
                        <li key={`${conflict.publicationId}-${conflict.key}`}>
                          Conflict with {conflict.slotName}: {conflict.key}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {causeNeutralBlockMessage ? (
                  <div className="wf-publication-risks" role="alert">
                    <strong>Publication blocked</strong>
                    <p>{causeNeutralBlockMessage}</p>
                  </div>
                ) : null}

                {review.failureMessage ? (
                  <div className="wf-publication-recovery" role="alert">
                    <p>{review.failureMessage}</p>
                    {review.reviewFailed && onReview ? (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void onReview(review, intent, versionSelection)}
                      >
                        Retry review
                      </button>
                    ) : null}
                  </div>
                ) : null}

                <DialogDisclosure title="Change details" hint={changes ? compactChangeSummary(changes) : "Comparison unavailable"}>
                  <p className="wf-publication-baseline">Baseline: {publicationBaselineFor(review, selectedChannel)}</p>
                  {!changes ? <p>{comparisonUnavailableMessage(occupancy, selectedChannel)}</p> : null}
                  <dl className="wf-publication-detail-grid">
                    <ChangeSummary label="Activities" value={changes?.activities} />
                    <ChangeSummary label="Inputs" value={changes?.inputs} />
                    <ChangeSummary label="Outputs" value={changes?.outputs} />
                    <div><dt>Triggers</dt><dd>{triggerSummary}</dd></div>
                  </dl>
                </DialogDisclosure>

                <DialogDisclosure title="Advanced details">
                  <p>Publishing saves this captured draft, promotes a version and activates it in the selected channel.</p>
                  <dl className="wf-publication-detail-grid">
                    <DecisionFact
                      label="Policy"
                      value={reviewedPreflight
                        ? `${reviewedPreflight.policySource}${reviewedPreflight.policyRevision == null ? "" : ` · revision ${reviewedPreflight.policyRevision}`}`
                        : "Awaiting authoritative review"}
                    />
                    <DecisionFact label="Resolved action" value={reviewedPreflight?.resolvedAction ?? "Awaiting authoritative review"} />
                    <DecisionFact label="Internal slot" value={(reviewedPreflight?.slotName ?? selectedChannel) || "—"} />
                    <DecisionFact label="Preflight token" value={reviewedPreflight?.preflightToken ?? "—"} />
                  </dl>
                  <div className="wf-publication-claims">
                    <strong>Authoritative trigger claims</strong>
                    {reviewedPreflight?.claims.length
                      ? <ul>{reviewedPreflight.claims.map(claim => <li key={`${claim.key}-${claim.cardinality}`}>{claim.key} ({claim.cardinality})</li>)}</ul>
                      : <p>No trigger claims.</p>}
                  </div>
                </DialogDisclosure>
              </>
            )}
          </div>

          <footer className="wf-publication-footer">
            {editableReview || review.phase === "publishing" ? <p>Saves and publishes this draft.</p> : null}
            <div className="wf-dialog-actions">
              <button
                type="button"
                className={review.phase === "success" ? "wf-primary-action" : undefined}
                onClick={onCancel}
                disabled={busy}
              >
                {review.phase === "review" || review.phase === "validationBlocked" ? "Cancel" : "Close"}
              </button>
              {review.phase === "success" ? (
                <button type="button" onClick={onOpenPublishedExecutable}>
                  Open published executable
                </button>
              ) : review.phase === "partialFailure" ? (
                <button type="submit" disabled={submitDisabled}>
                  Retry publication
                </button>
              ) : review.phase === "savedFailure" ? (
                review.validationErrors.length === 0
                  ? <button type="submit" disabled={submitDisabled}>Retry publication</button>
                  : null
              ) : (
                <button type="submit" disabled={submitDisabled}>
                  {busy && review.phase === "publishing" ? "Publishing…" : "Publish"}
                </button>
              )}
            </div>
          </footer>
        </form>
      </section>
    </div>
  );
}

function PublicationSuccess({ review }: { review: PublicationReviewState }) {
  return (
    <section className="wf-publication-outcome wf-publication-outcome-success" aria-labelledby="publication-success-title">
      <div className="wf-publication-outcome-mark" aria-hidden="true">✓</div>
      <div>
        <h4 id="publication-success-title" tabIndex={-1}>Workflow is published</h4>
        <p>
          Version <strong>{review.proposedVersion}</strong> is active in Publication channel{" "}
          <strong>{review.published?.slotName}</strong>.
        </p>
      </div>
      <DialogDisclosure title="Published details">
        <dl className="wf-publication-detail-grid">
          <DecisionFact label="Executable" value={review.published?.artifactId ?? "—"} />
          <DecisionFact label="Source Reference" value={review.published?.sourceReferenceId ?? "—"} />
          <DecisionFact label="Promoted version ID" value={review.promotedVersionId ?? "—"} />
        </dl>
      </DialogDisclosure>
    </section>
  );
}

function PublicationRecovery({ review }: { review: PublicationReviewState }) {
  return (
    <section className="wf-publication-outcome" aria-labelledby="publication-recovery-title">
      <h4 id="publication-recovery-title" tabIndex={-1}>The version was retained, but the channel was not activated</h4>
      <p>{review.failureMessage}</p>
      <dl className="wf-publication-detail-grid">
        <DecisionFact label="Retained version" value={review.proposedVersion} />
        <DecisionFact label="Publication channel" value={review.intent.slotName || review.policy.defaultSlotName} />
      </dl>
    </section>
  );
}

function PublicationSavedFailure({ review }: { review: PublicationReviewState }) {
  return (
    <section className="wf-publication-outcome" aria-labelledby="publication-saved-failure-title">
      <h4 id="publication-saved-failure-title" tabIndex={-1}>No version or publication was created</h4>
      <p>{review.failureMessage}</p>
      {review.validationErrors.length ? (
        <div className="wf-publication-risks" role="alert">
          <ul>{review.validationErrors.map((message, index) => <li key={`${index}-${message}`}>{message}</li>)}</ul>
        </div>
      ) : null}
    </section>
  );
}

function DecisionFact({ label, value }: { label: string; value: string }) {
  return <div><dt>{label}</dt><dd>{value}</dd></div>;
}

function ChangeSummary({ label, value }: { label: string; value?: PublicationChangeCount }) {
  return <div><dt>{label}</dt><dd>{formatChangeCount(value)}</dd></div>;
}

function formatChangeCount(value?: PublicationChangeCount) {
  return value ? `${value.added} added, ${value.changed} changed, ${value.removed} removed` : "Not compared";
}

function comparisonUnavailableMessage(occupancy: PublicationChannelOccupancy, channel: string) {
  return occupancy.kind === "foreign"
    ? `Not compared: ${channel} is occupied by an activation from ${describeActivationSource(occupancy.slot)}, not by a Studio design version.`
    : "Not compared: the current publication in this channel is unknown on this backend.";
}

function publicationEffect(occupancy: PublicationChannelOccupancy, channel: string, defaultChannel: string, replacement: boolean) {
  if (!channel) return "Choose a publication channel in Publication settings.";
  if (occupancy.kind === "unknown") return `Activate in ${channel}. Current publication unknown.`;
  if (occupancy.kind === "foreign") return `Replaces the current activation in ${channel}.`;
  if (occupancy.kind === "empty") return channel === defaultChannel
    ? `First publication in ${channel}.`
    : `Creates a separate publication in ${channel}.`;
  return replacement ? `Replaces the published version in ${channel}.` : `Creates a separate publication in ${channel}.`;
}

function compactChangeSummary(changes: PublicationReviewState["changes"]) {
  return Object.entries(changes)
    .map(([kind, value]) => ({ kind, count: value.added + value.changed + value.removed }))
    .filter(({ count }) => count > 0)
    .map(({ kind, count }) => `${count} ${kind === "activities" ? "activity" : kind.slice(0, -1)} ${count === 1 ? "change" : "changes"}`)
    .join(" · ") || "No structural changes";
}

function publicationStatusMessage(review: PublicationReviewState, blocked: boolean, causeNeutralBlockMessage?: string) {
  if (review.phase === "success") return "Publication completed successfully.";
  if (review.phase === "validationBlocked") return "Resolve the blocking validation before publishing.";
  if (review.phase === "savedFailure") return "The captured draft was saved, but no version or publication was created.";
  if (review.phase === "partialFailure") return `Promoted version ${review.proposedVersion} was retained and can be retried.`;
  if (review.phase === "publishing") {
    const messages = {
      saving: "Saving the captured workflow state…",
      promoting: "Promoting the saved workflow version…",
      preflight: "Checking publication policy and trigger conflicts…",
      publishing: "Activating the published executable…"
    };
    return review.progressStep ? messages[review.progressStep] : "Publishing…";
  }
  if (review.reviewPending) return "Checking channel and version…";
  if (blocked) return causeNeutralBlockMessage ?? "Review the highlighted issue before publishing.";
  return "Ready to publish";
}
