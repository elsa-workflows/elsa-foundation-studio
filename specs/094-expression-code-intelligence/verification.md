# Expression Code Intelligence — Verification

Last reconciled: 2026-10-03 for Program #2310 partial implementation evidence; normal-host acceptance pending

## Program #2310 status

The 2026-07-28 evidence below is retained as historical baseline evidence. It is not current-head normal-host proof. Studio PRs #546 and #545 now protect default-host feature discovery, but no persisted-workflow browser walkthrough has yet proved matching Studio/Foundation composition, actual location-scoped metadata, runtime-compatible JavaScript/Liquid help, the three themes, formatting, or the final accessibility/continuity matrix. T026-T038 remain open and all four program milestones remain incomplete.

## Passing evidence

### Program #2310 implementation checkpoint, 2026-10-03

On `claude/551-expression-normal-host`, with draft PR #557 stacked on Program #2310 planning revision `24a937bf3f271a201fbbc18809a54dd9d15c4e51`:

- `activityPropertyGroups.test.tsx`: 110 passing tests, including independent editor/provider readiness, global and scoped authorization invalidation, fresh-context confirmation, stale-result rejection, authored Liquid editing when its runtime descriptor is absent, synchronous/asynchronous descriptor faults, and unrelated-row render isolation. The three activity-expression orchestration tests also passed (113 focused tests in total).
- Root review corrected the render-isolation fixture to count only the unrelated row. A same-task uncommitted focus/blur sequence failed once and passed on rerun; the fixture now explicitly commits focus before testing blur. All three orchestration tests passed again with the immediate-validation and zero-pending-timer assertions retained.
- JavaScript and Liquid module tests: four passing tests each.
- Scoped ESLint and `git diff --check` passed. The latest Workflows typecheck exposed widened string literals and an incomplete capabilities object in new test mocks. Shared SDK-typed result factories now correct those fixtures; a passing typecheck/regression rerun is pending. Earlier typecheck evidence is not current-head proof.
- Normal-host lifecycle tests: five passed. Playwright collection: four real-host scenarios discovered, covering workflows, Activity Definitions, missing JavaScript editor, and missing Liquid provider.
- The full serial client build (`pnpm -r --workspace-concurrency=1 build`) and scoped Studio .NET Release build passed. The Workflows production build/bundle gate passed again after readiness review fixes: entry 127.43 kB / 127.50 kB, Definitions total 375.87 kB / 384.50 kB, upgrades total 366.89 kB / 375.50 kB.
- The browser scenarios now use version/node identity and fresh persisted reads instead of display-label selectors or a disabled save action. Scoped browser lint and four-scenario collection passed; actual host execution remains pending.
- A dedicated correctness job in the existing CI runs the unchanged normal-host command against Studio's tested head and immutable paired Foundation revision `e780a86a151e816a04136ae0ac8fd4eee99c0ce0`. It builds both applications from source and preserves fresh SQLite, real authentication, provider/editor removal controls, owned teardown, and trace-free failure reporting. It does not replace the existing synthetic browser or static/unit gates; hosted execution is not yet a pass. This proves only that paired revision, not arbitrary Foundation main; advance the pin to Foundation #2373's merged SHA and rerun before claiming compatibility with main.

These are partial local checks, not T029 acceptance. No current-head normal-host browser case or current-head manual assistive-technology run has passed yet. Foundation's hosted run reached the test body but exposed an outdated ReadLine output-name assertion, now corrected; request-envelope execution is pending. Local host readiness timed out under shared-machine load above 700; the negative missing-Liquid host case passed on the earlier compiled fixture. All milestone checkboxes remain open.

### Historical baseline, 2026-07-28

| Area | Evidence |
|---|---|
| Shared editor and projection | CodeEditor: 32 passing tests, including compact/expanded Tab indentation, Escape-then-Tab and Control-M exit, session continuity, authorization-revocation teardown, completion/signature/hover cancellation, diagnostics, and JavaScript/Liquid nested value-shape fallback |
| Language contributions | JavaScript: 4 passing tests; Liquid: 4 passing tests |
| Workflow integration | All feature-focused tests pass across tooling transport, activity orchestration, Object-editor regression, dynamic input options, property grouping, Test Run acknowledgement, and structured publication diagnostics |
| Real inspector | 16 production-build Playwright cases pass across desktop Chromium, Firefox, and WebKit plus a Chromium touch profile: accessibility, completion/keyboard/expanded/type-switch continuity, unavailable-tooling degradation, 50-field lazy activation under the 1.5 s bound, and narrow touch interaction |
| Manual assistive technology | Google Chrome and Safari pass with macOS VoiceOver enabled for focus, completion, signature/hover help, diagnostics, compact-to-expanded transition, Tab capture/escape, and unavailable-tooling editing |
| Static gates | `pnpm lint` passes with existing warnings; `pnpm typecheck` passes; CSS token lint passes |
| Build/bundles | `pnpm build` passes; Workflows entry 122.01 kB/122.50 kB, Definitions 376.93 kB/379 kB, upgrades 365.34 kB/367.50 kB, and largest JavaScript chunk 259.74 kB/500 kB |
| .NET Studio | `dotnet test Elsa.Studio.slnx --no-build --no-restore` passes |
| Foundation coordination | 108 Expressions, 344 Design, 89 Design API, and 459 Publishing API tests pass; expression-tooling/custom-host architecture filters pass |
| Performance | Production fixture: warm activation p95 12.60 ms, cold activation p95 253.80 ms, and typing-task p95 0.50 ms for 100 keys at 4× CPU throttling |

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
| SC-012 | Automated browser accessibility checks and manual Google Chrome/Safari VoiceOver acceptance pass with no remaining release blocker |

No CodeMirror type crosses the Studio SDK boundary, no expression source enters metadata caches, and no generic “Elsa globals” are synthesized. Each expression provider owns its globals/functions/variables.

## Manual assistive-technology evidence

The production fixture was exercised in Google Chrome and Safari with macOS VoiceOver enabled. Both runs confirmed:

- the compact and expanded editors expose stable JavaScript text-entry names and discoverable keyboard instructions;
- `formatTotal(value)` signature help, the named completion collection, keyboard hover documentation, and `BROWSER001` diagnostics are present in the accessibility tree;
- Tab indents while editing, Escape then Tab leaves compact editing, and Control-M then Tab leaves expanded editing for the conversion control;
- the compact-to-expanded transition preserves source and focuses the expanded expression;
- unavailable tooling leaves the expression editable and exposes “JavaScript code intelligence is unavailable. Syntax highlighting remains active.”

The first manual pass caught a macOS-specific mismatch: the announced Control-M route was bound to `Mod-m`, which maps to Command-M on macOS. The binding was corrected to `Ctrl-m`, covered by a focused regression test, rebuilt, and repeated successfully in both browsers. VoiceOver was restored to its original off state after acceptance.
