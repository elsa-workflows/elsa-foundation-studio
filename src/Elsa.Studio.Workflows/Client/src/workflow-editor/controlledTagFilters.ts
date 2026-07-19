export type ControlledTagFilterOperator = "exists" | "missing" | "anyOf" | "noneOf";

export interface ControlledTagClause {
  definitionId: string;
  operator: ControlledTagFilterOperator;
  controlledValueIds: string[];
}

const parameter = "controlledTag";
const groupingParameter = "groupByControlledTag";
const identifier = /^[^,:\s]+$/;

export function controlledTagClausesFromSearch(search: string): ControlledTagClause[] {
  const seen = new Set<string>();
  return new URLSearchParams(search).getAll(parameter).flatMap(parseClause).filter(clause => {
    const key = controlledTagClauseToWire(clause);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function controlledTagClauseToWire(clause: ControlledTagClause) {
  if (!identifier.test(clause.definitionId)) return "";
  if (clause.operator === "exists" || clause.operator === "missing") return `${clause.definitionId}:${clause.operator}`;
  const values = [...new Set(clause.controlledValueIds.filter(value => identifier.test(value)))];
  return values.length > 0 ? `${clause.definitionId}:${clause.operator}:${values.join(",")}` : "";
}

export function searchWithControlledTagState(search: string, clauses: ControlledTagClause[], groupByDefinitionId: string | null) {
  const parameters = new URLSearchParams(search);
  parameters.delete(parameter);
  parameters.delete(groupingParameter);
  for (const clause of clauses) {
    const value = controlledTagClauseToWire(clause);
    if (value) parameters.append(parameter, value);
  }
  if (groupByDefinitionId && identifier.test(groupByDefinitionId)) parameters.set(groupingParameter, groupByDefinitionId);
  const next = parameters.toString();
  return next ? `?${next}` : "";
}

export function controlledTagGroupingFromSearch(search: string) {
  const value = new URLSearchParams(search).get(groupingParameter);
  return value && identifier.test(value) ? value : null;
}

export function writeControlledTagStateToLocation(clauses: ControlledTagClause[], groupByDefinitionId: string | null) {
  const search = searchWithControlledTagState(window.location.search, clauses, groupByDefinitionId);
  window.history.replaceState({}, "", `${window.location.pathname}${search}${window.location.hash}`);
}

function parseClause(value: string): ControlledTagClause[] {
  const [definitionId, rawOperator, rawValues, ...extra] = value.split(":");
  if (!identifier.test(definitionId) || extra.length > 0) return [];
  if (rawOperator === "exists" || rawOperator === "missing") return rawValues === undefined ? [{ definitionId, operator: rawOperator, controlledValueIds: [] }] : [];
  if (rawOperator !== "anyOf" && rawOperator !== "noneOf") return [];
  const controlledValueIds = rawValues?.split(",").filter(value => identifier.test(value)) ?? [];
  return controlledValueIds.length > 0 ? [{ definitionId, operator: rawOperator, controlledValueIds }] : [];
}
