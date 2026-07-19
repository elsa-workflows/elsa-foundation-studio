import { describe, expect, it } from "vitest";
import {
  controlledTagClausesFromSearch,
  controlledTagGroupingFromSearch,
  searchWithControlledTagState
} from "../workflow-editor/controlledTagFilters";

describe("controlled tag filter URL state", () => {
  it("retains stable IDs for Exists plus NoneOf and a controlled grouping", () => {
    const search = searchWithControlledTagState("?definition=order-flow&markerTag=tag-risk%3Aexists", [
      { definitionId: "tag-environment", operator: "exists", controlledValueIds: [] },
      { definitionId: "tag-environment", operator: "noneOf", controlledValueIds: ["value-production", "value-staging"] }
    ], "tag-environment");

    expect(search).toBe("?definition=order-flow&markerTag=tag-risk%3Aexists&controlledTag=tag-environment%3Aexists&controlledTag=tag-environment%3AnoneOf%3Avalue-production%2Cvalue-staging&groupByControlledTag=tag-environment");
    expect(controlledTagClausesFromSearch(search)).toEqual([
      { definitionId: "tag-environment", operator: "exists", controlledValueIds: [] },
      { definitionId: "tag-environment", operator: "noneOf", controlledValueIds: ["value-production", "value-staging"] }
    ]);
    expect(controlledTagGroupingFromSearch(search)).toBe("tag-environment");
  });

  it("drops malformed or incomplete controlled clauses", () => {
    expect(controlledTagClausesFromSearch("?controlledTag=tag-env%3AanyOf&controlledTag=tag-env%3Aexists%3Avalue-production&controlledTag=tag-env%3AanyOf%3Avalue-production"))
      .toEqual([{ definitionId: "tag-env", operator: "anyOf", controlledValueIds: ["value-production"] }]);
  });
});
