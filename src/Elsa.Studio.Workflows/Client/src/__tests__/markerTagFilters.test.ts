import { describe, expect, it } from "vitest";
import { markerTagClausesFromSearch, searchWithMarkerTagClauses } from "../workflow-editor/markerTagFilters";

describe("marker tag filter URL state", () => {
  it("restores only valid repeated marker-tag clauses from a shared URL", () => {
    expect(markerTagClausesFromSearch("?definition=order-flow&markerTag=tag-environment%3Aexists&markerTag=tag-risk%3Amissing&markerTag=bad%3Avalue"))
      .toEqual(["tag-environment:exists", "tag-risk:missing"]);
  });

  it("updates marker-tag clauses without discarding other workflow URL state", () => {
    expect(searchWithMarkerTagClauses("?definition=order-flow&markerTag=tag-old%3Aexists", ["tag-environment:exists", "tag-risk:missing"]))
      .toBe("?definition=order-flow&markerTag=tag-environment%3Aexists&markerTag=tag-risk%3Amissing");
  });
});
