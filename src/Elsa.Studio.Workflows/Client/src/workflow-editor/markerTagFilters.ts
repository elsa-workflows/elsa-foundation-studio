const markerTagParameter = "markerTag";
const markerTagClause = /^[^:\s]+:(?:exists|missing)$/;

export function markerTagClausesFromSearch(search: string): string[] {
  return [...new URLSearchParams(search).getAll(markerTagParameter)]
    .filter(value => markerTagClause.test(value));
}

export function searchWithMarkerTagClauses(search: string, clauses: string[]): string {
  const parameters = new URLSearchParams(search);
  parameters.delete(markerTagParameter);
  for (const clause of clauses) {
    if (markerTagClause.test(clause)) parameters.append(markerTagParameter, clause);
  }
  const next = parameters.toString();
  return next ? `?${next}` : "";
}

export function writeMarkerTagClausesToLocation(clauses: string[]) {
  const search = searchWithMarkerTagClauses(window.location.search, clauses);
  window.history.replaceState({}, "", `${window.location.pathname}${search}${window.location.hash}`);
}
