import { test } from "node:test";
import assert from "node:assert/strict";
import { hasFreshAssistance } from "./expression-assistance-traffic.mjs";

// Pure traffic controls run without starting browsers or either application.
const contextPath = "/expression-tooling/context";
const hoverPath = "/expression-tooling/hover";
const draft = { draftId: "draft", targetNodeId: "node", propertyKey: "input" };
const successful = {
  method: "POST", host: "foundation", status: 200, outcomeState: 0,
  workflowDraftId: draft.draftId, nodeId: draft.targetNodeId, propertyKey: draft.propertyKey,
  expressionType: "JavaScript", documentRevision: "2", responseDocumentRevision: "2",
  contextRevision: "a".repeat(32), responseContextRevision: "a".repeat(32)
};
const context = { ...successful, path: contextPath, isCatalogSearch: false };
const hover = { ...successful, path: hoverPath };
const accepts = traffic => hasFreshAssistance(traffic, draft, "JavaScript", hoverPath, 1);

test("successful direct assistance matches the latest authoring context", () => {
  assert.equal(accepts([context, hover]), true);
});

for (const catalog of [
  { ...context, isCatalogSearch: true, status: undefined, outcomeState: undefined },
  { ...context, isCatalogSearch: true, documentRevision: "3", responseDocumentRevision: "3" }
]) {
  test(`catalog traffic cannot replace authoring provenance (${catalog.status ?? "pending or canceled"})`, () => {
    assert.equal(accepts([context, hover, catalog]), true);
  });
}

for (const [name, traffic] of [
  ["missing direct hover", [context]],
  ["failed direct hover", [context, { ...hover, status: 500 }]],
  ["unsupported direct hover", [context, { ...hover, outcomeState: 1 }]],
  ["wrong draft", [context, { ...hover, workflowDraftId: "other" }]],
  ["wrong node", [context, { ...hover, nodeId: "other" }]],
  ["wrong property", [context, { ...hover, propertyKey: "other" }]],
  ["wrong syntax", [context, { ...hover, expressionType: "Liquid" }]],
  ["stale document", [context, { ...hover, documentRevision: "1", responseDocumentRevision: "1" }]],
  ["mismatched response document", [context, { ...hover, responseDocumentRevision: "3" }]],
  ["mismatched response context", [context, { ...hover, responseContextRevision: "b".repeat(32) }]],
  ["newer authoring revision", [context, hover, { ...context, documentRevision: "3", responseDocumentRevision: "3" }]],
  ["pending latest authoring context", [context, hover, { ...context, status: undefined }]],
  ["catalog cannot substitute for authoring context", [{ ...context, isCatalogSearch: true }, hover]]
]) {
  test(`rejects ${name}`, () => assert.equal(accepts(traffic), false));
}
