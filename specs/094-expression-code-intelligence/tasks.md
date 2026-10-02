# Tasks: Expression Code Intelligence

Baseline implementation tasks are complete. File names below reflect the landed design rather than provisional planning names.

The baseline tasks T001-T025 are historical. Program #2310 reopens this feature for the dependency-ordered completion tasks T026-T038 below; they are not complete until current-head normal-host evidence passes.

## Contracts and transport

- [x] T001 Add editor-neutral documents, capabilities, authoring contexts, symbols, value shapes, tooling outcomes, diagnostics, and clients to the public Studio SDK and declaration mirrors.
- [x] T002 Add canonical Foundation capability-link clients and the coordinated OpenAPI contract.
- [x] T003 Implement explicit outcome/version mapping, cancellation, stale-result rejection, memory-only caches, permission/policy invalidation, and authorization purge.
- [x] T004 Keep expression source out of metadata caches and dispose all workflow/editor session state at authorization-session end.

## Shared rich editor

- [x] T005 Add CodeMirror 6 completion, lint, view, JavaScript, and Liquid dependencies.
- [x] T006 Implement compact and expanded profiles on one bounded workflow-lifetime editor session.
- [x] T007 Preserve exact source, selection, undo, diagnostics, and tooling state across compact/expanded transitions.
- [x] T008 Implement completion-aware Enter, Tab/Shift+Tab indentation, Escape-then-Tab exit, multiline expansion, read-only reconfiguration, and workflow-undo isolation.
- [x] T009 Add lightweight unfocused previews, accessible keyboard guidance/status, sanitized documentation, degraded fallback, and `--studio-*`-only styling.

## Per-language intelligence

- [x] T010 Register JavaScript and Liquid as independent Expression Editor Contributions with lazy language loading.
- [x] T011 Project JavaScript context through runtime-accurate `args`, `variables`, `getVariable`, and named getter symbols.
- [x] T012 Project Liquid context, tags, filters, direct variables, and nested member shapes without inventing generic Elsa globals.
- [x] T013 Consume authoritative completion/hover first and provide permission-filtered local catalog/value-shape fallback.
- [x] T014 Add automatic/explicit completion, hover, signatures, local syntax diagnostics, semantic diagnostic marks, and nested member completion.

## Workflow integration and consequential actions

- [x] T015 Derive stable draft/activity/property/type document identity and carry exact values between text Expression Types.
- [x] T016 Orchestrate authoring-context and semantic-validation requests with debounce, cancellation, source/context versions, blur validation, and stale response rejection.
- [x] T017 Present compact highest-priority and expanded full diagnostics while leaving editing/autosave available.
- [x] T018 Integrate full-draft validation with known-error Test Run blocking, unavailable-warning acknowledgement, and publication fail-closed behavior.
- [x] T019 Preserve source through unavailable/unauthorized/incompatible/module-missing states and provide retry/generic editing.

## Verification

- [x] T020 Cover shared editor, JavaScript, Liquid, transport, cache, authorization, diagnostics, workflow integration, and value-shape behavior with focused unit/component tests.
- [x] T021 Cover the real inspector in Chromium for compact activation, completion, Tab/Escape, expanded continuity, exact JavaScript-to-Liquid carryover, 50-field lazy activation, and narrow touch interaction.
- [x] T022 Validate Workflows bundle budgets with the expression tooling client deferred from landing routes.
- [x] T023 Reconcile the OpenAPI fixture with Foundation work unit 143 and record verification evidence.
- [x] T024 Run repository lint/typecheck/build, focused regression suites, browser tests, and Foundation coordinated gates.
- [x] T025 Complete iterative cross-repository self-review and required manual assistive-technology acceptance with no actionable release blockers.

## Program #2310 continuation: User Story 5 — Trust installed text-syntax support

- [ ] T026 [US5] Add the normal-host Playwright configuration, package script and persisted-workflow JavaScript/Liquid journey in `tests/browser/playwright.expression-normal-host.config.ts`, `package.json` and `tests/browser/expression-code-intelligence.normal-host.spec.ts`, including matching Studio/Foundation host startup and teardown plus every currently supported workflow and activity-definition authoring surface.
- [ ] T027 [P] [US5] Add installed text-syntax readiness and independent module/provider degradation handling in `src/essentials/Elsa.Studio.Workflows/Client/src/ActivityPropertiesPanel.tsx` and focused Workflows tests.
- [ ] T028 [US5] Add a negative normal-host regression that removes one editor feature and one backend capability in turn and asserts the exact missing/degraded state in `tests/browser/expression-code-intelligence.normal-host.spec.ts`; do not modify the merged #545 discovery guard.
- [ ] T029 [US5] Record rebuilt Studio/Foundation normal-host evidence, exact revisions and `pnpm test:browser:expression-normal-host` results in `specs/094-expression-code-intelligence/verification.md`.
- [ ] T030 [US5] Align JavaScript editor grammar and local diagnostics with the runtime expression grammar in `src/essentials/Elsa.Studio.CodeEditor/Client/src/languages/javascriptCodeMirror.ts` and its tests after T029 passes.
- [ ] T031 [US5] Add installed-text-syntax conformance cases for missing adapters/providers, permissions, incompatibility, incomplete source, syntax switching and independent composition under `tests/browser/` and the expression-editor module tests after T029 passes.

## Program #2310 continuation: User Story 6 — Receive precise, readable language help

- [ ] T032 [US6] Merge local JavaScript completion/snippet sources with authorized workflow assistance in `src/essentials/Elsa.Studio.CodeEditor/Client/src/engines/codeMirrorCodeIntelligence.ts` and its tests after T031 passes.
- [ ] T033 [P] [US6] Project parser-position-aware Liquid values, filters, tags, snippets and signatures in `src/extensions/Elsa.Studio.ExpressionEditors.Liquid/Client/src/` with focused tests, consuming the runtime-profile evidence delivered by Foundation spec 143 T028-T029.
- [ ] T034 [P] [US6] Deepen JavaScript local/member/signature projection without DOM or Node globals in `src/extensions/Elsa.Studio.ExpressionEditors.JavaScript/Client/src/` with focused tests and Foundation spec 143 T028 parity evidence.
- [ ] T035 [US6] Complete the two-engineer-day deeper-JavaScript-language-service spike defined by Decision 16 in `specs/094-expression-code-intelligence/research.md`; adopt a dependency only if every binary runtime-declaration, worker/cancellation, stale-result, existing-bundle, accessibility and fallback gate passes.
- [ ] T036 [US6] Add Studio-token themes, lightweight highlighted previews, readable help/diagnostics and light/dark/dim coverage in `src/essentials/Elsa.Studio.CodeEditor/Client/src/` and its styles/tests after T033-T035 settle language behavior.
- [ ] T037 [P] [US6] Add active-parameter and overload navigation plus explicit behavior-preserving JavaScript/Liquid format actions in the shared editor and language modules with undo/whitespace tests.
- [ ] T038 [US6] Run and document the current-head real-browser theme, narrow inspector, multiline paste, source/cursor/undo, keyboard exit/help/completion and screen-reader acceptance matrix in `specs/094-expression-code-intelligence/verification.md`.

## Dependencies

- T026 is the first executable implementation leaf; T027-T028 may follow on the same integration head, and T029 closes milestone 1 only after all three pass.
- T030-T031 remain Not Ready until T029 passes.
- T032-T035 remain Not Ready until T031 and the linked Foundation provider tasks pass.
- T036-T038 remain Not Ready until T032-T035 settle the language behavior they present.
