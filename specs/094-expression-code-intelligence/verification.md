# Expression Code Intelligence — Verification

Last reconciled: 2026-07-28

## Passing evidence

| Area | Evidence |
|---|---|
| Shared editor and projection | CodeEditor: 31 passing tests, including compact/expanded Tab indentation, Escape-then-Tab exit, session continuity, authorization-revocation teardown, completion/signature/hover cancellation, diagnostics, and JavaScript/Liquid nested value-shape fallback |
| Language contributions | JavaScript: 4 passing tests; Liquid: 4 passing tests |
| Workflow integration | All feature-focused tests pass across tooling transport, activity orchestration, Object-editor regression, dynamic input options, property grouping, Test Run acknowledgement, and structured publication diagnostics |
| Real inspector | 13 production-build Playwright cases pass across desktop Chromium, Firefox, and WebKit plus a Chromium touch profile: accessibility, completion/keyboard/expanded/type-switch continuity, 50-field lazy activation under the 1.5 s bound, and narrow touch interaction |
| Static gates | `pnpm lint` passes with existing warnings; `pnpm typecheck` passes; CSS token lint passes |
| Build/bundles | `pnpm build` passes; Workflows entry 122.01 kB/122.50 kB, Definitions 376.93 kB/379 kB, upgrades 365.34 kB/367.50 kB, and largest JavaScript chunk 259.74 kB/500 kB |
| .NET Studio | `dotnet test Elsa.Studio.slnx --no-build --no-restore` passes |
| Foundation coordination | 108 Expressions, 340 Design, 89 Design API, and 459 Publishing API tests pass; expression-tooling/custom-host architecture filters pass |
| Performance | Production fixture: warm activation p95 17.60 ms, cold activation p95 255.90 ms, and typing-task p95 0.50 ms for 100 keys at 4× CPU throttling |

The browser fixture mounts the real `ActivityPropertiesPanel` with the JavaScript and Liquid contributions and a versioned, permission-safe tooling client. Fifty unfocused fields remain previews; only the selected field creates a CodeMirror surface.

## Known repository-baseline failures

The complete Workflows Vitest suite reports 1,059 passing and three failures that reproduce outside this feature:

- unsupported-root category copy expects `Primitives`;
- the older-response browse-location test reaches its five-second timeout;
- the empty-folder focus-restoration test observes no focused parent.

All feature-focused Workflows tests pass. The complete Foundation architecture suite passes all 320 tests.

## Requirement audit

| Requirement group | Evidence |
|---|---|
| FR-001–FR-013 | Shared compact/expanded CodeMirror sessions, exact text-to-text carryover, completion-aware Enter, Tab/Shift+Tab, Escape exit, multiline preservation, and workflow autosave/undo integration |
| FR-014–FR-024 | Versioned metadata-only authoring contexts, symbols, shapes, descriptors, bounded catalogs, permission/policy revisions, and independent per-expression-type providers |
| FR-025–FR-037 | Automatic/explicit completion, JavaScript/Liquid syntax, nested members, hover/signatures, sanitized docs, local/semantic diagnostics, debounce/cancel/stale rejection, and compact/full presentation |
| FR-038–FR-047 | Editing remains available; full-draft Test Run/publication gates are authoritative; unavailable/unauthorized/incompatible states degrade safely; caches are memory-only and authorization-purged; no sensitive telemetry is emitted |
| FR-048–FR-058 | Keyboard instructions/status semantics, pointer/touch viewport coverage, generic fallback, only JavaScript/Liquid advertised, stable module contract, design tokens, 50-field performance proof, unit degradation states, and real-inspector browser coverage |
| SC-001–SC-011 | Focused/editor/browser tests, bundle budgets, version/cache tests, exact-source tests, Foundation gates, and cross-repository review provide the measurable automated acceptance evidence |
| SC-012 | Automated browser accessibility checks pass; required manual Chromium screen-reader and Safari VoiceOver evidence remains a release blocker |

No CodeMirror type crosses the Studio SDK boundary, no expression source enters metadata caches, and no generic “Elsa globals” are synthesized. Each expression provider owns its globals/functions/variables.

## Manual assistive-technology evidence

The automated accessibility matrix passes, including the touch viewport. The named Chromium screen-reader and Safari VoiceOver checks remain to be recorded against the production fixture before release; the current test environment's macOS desktop is locked.
