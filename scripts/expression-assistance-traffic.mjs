/** @typedef {import('../tests/browser/expression-normal-host-fixtures').SafeBackendTraffic} SafeBackendTraffic */
/** @typedef {import('../tests/browser/expression-normal-host-fixtures').PersistedExpressionDraft} PersistedExpressionDraft */

/** @param {SafeBackendTraffic} request @param {PersistedExpressionDraft} draft @param {string} syntax */
export function matchesDraftLocation(request, draft, syntax) {
  return request.workflowDraftId === draft.draftId && request.expressionType === syntax &&
    request.nodeId === draft.targetNodeId && request.propertyKey === draft.propertyKey;
}

/**
 * @param {SafeBackendTraffic[]} traffic
 * @param {PersistedExpressionDraft} draft
 * @param {string} syntax
 * @param {string} relation
 * @param {number} previousRevision
 * @param {{ diagnosticCode?: string, allowSupportedEmpty?: boolean }} options
 */
export function hasFreshAssistance(traffic, draft, syntax, relation, previousRevision,
  { diagnosticCode, allowSupportedEmpty = false } = {}) {
  // Catalog paging uses the same route but is not the current authoring snapshot.
  // Keep the latest authoring request, including pending/failed requests: an older
  // successful pair must not prove assistance for a newer source revision.
  const context = traffic.filter(request => request.path.endsWith("/expression-tooling/context") &&
    request.isCatalogSearch !== true &&
    matchesDraftLocation(request, draft, syntax)).at(-1);
  return traffic.some(request => request.path.endsWith(relation) && request.status === 200 &&
    (request.outcomeState === 0 || (allowSupportedEmpty && relation === "/expression-tooling/validate" && request.outcomeState === 1)) &&
    matchesDraftLocation(request, draft, syntax) &&
    request.contextRevision !== undefined && request.responseContextRevision === request.contextRevision &&
    request.responseDocumentRevision === request.documentRevision && Number(request.documentRevision) > previousRevision &&
    (diagnosticCode === undefined || request.diagnosticCodes?.includes(diagnosticCode)) &&
    context?.status === 200 && context.outcomeState === 0 &&
      context.responseDocumentRevision === request.documentRevision && context.documentRevision === request.documentRevision &&
      context.responseContextRevision === request.contextRevision);
}
