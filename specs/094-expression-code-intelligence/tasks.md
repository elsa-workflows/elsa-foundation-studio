# Tasks: Expression Code Intelligence

Baseline implementation tasks are complete. File names below reflect the landed design rather than provisional planning names.

The baseline tasks T001-T025 are historical. Program #2310 reopens this feature for dependency-ordered tasks T026-T038. T026-T029 have exact-head normal-host evidence. T030-T031 pass the exact M2 automated gate under the documented unavailable-review fallback. T035 / Studio #553 settles the technical decision: reject the current service candidate and retain the baseline path. T032-T034 pass the exact M3 automated producer-consumer gate at Studio `473cf1a9` / Foundation `5cd44d63`, under the same explicitly documented unavailable-external-review fallback. Task#568 / T036 passes at immutable bc305150/5cd44d63; Task#572 / T037 passes at immutable ef523911/5cd44d63. Task#577 owns T038. Current-head manual assistive-technology acceptance, T038/human acceptance and delivery remain open; no deeper-service dependency is adopted.

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

- [x] T026 [US5] Add the normal-host Playwright configuration, package script and persisted-workflow JavaScript/Liquid journey in `tests/browser/playwright.expression-normal-host.config.ts`, `package.json` and `tests/browser/expression-normal-host.spec.ts`, including matching Studio/Foundation host startup and teardown plus every currently supported workflow and activity-definition authoring surface.
- [x] T027 [P] [US5] Add installed text-syntax readiness and independent module/provider degradation handling in `src/essentials/Elsa.Studio.Workflows/Client/src/ActivityPropertiesPanel.tsx` and focused Workflows tests.
- [x] T028 [US5] Add a negative normal-host regression that removes one editor feature and one backend capability in turn and asserts the exact missing/degraded state in `tests/browser/expression-normal-host.spec.ts`; do not modify the merged #545 discovery guard.
- [x] T029 [US5] Record rebuilt Studio/Foundation normal-host evidence, exact revisions and `pnpm test:browser:expression-normal-host` results in `specs/094-expression-code-intelligence/verification.md`.
- [x] T030 [US5] Align JavaScript editor grammar and local diagnostics with the runtime expression grammar in `src/essentials/Elsa.Studio.CodeEditor/Client/src/languages/javascriptCodeMirror.ts` and its tests after T029 passes.
- [x] T031 [US5] Add installed-text-syntax conformance cases for missing adapters/providers, permissions, incompatibility, incomplete source, syntax switching and independent composition under `tests/browser/` and the expression-editor module tests after T029 passes.

## Program #2310 continuation: User Story 6 — Receive precise, readable language help

- [x] T032 [US6] Merge local JavaScript completion/snippet sources with authorized workflow assistance in `src/essentials/Elsa.Studio.CodeEditor/Client/src/engines/codeMirrorCodeIntelligence.ts` and its tests after T031 passes.
- [x] T033 [P] [US6] Project parser-position-aware Liquid values, filters, tags, explicit generic interpolation snippets and signatures in `src/extensions/Elsa.Studio.ExpressionEditors.Liquid/Client/src/` with focused tests; Studio Task#561 / Decision18 permits bounded internal lazy-parser/cursor/range seams only, consuming Foundation#2379's reviewed policy-filtered profile through the existing rich context relation.
- [x] T034 [P] [US6] Deepen JavaScript local/member/signature projection without DOM or Node globals in `src/extensions/Elsa.Studio.ExpressionEditors.JavaScript/Client/src/` with focused tests and Foundation spec 143 T028 parity evidence.
- [x] T035 [US6] Complete the two-engineer-day deeper-JavaScript-language-service spike defined by Decision 16 in `specs/094-expression-code-intelligence/research.md`; reject the current TypeScript 5.9.3 candidate after independent root reproduction because the actual worker exceeds the unchanged chunk ceiling and synchronous-interruption/accessibility gates remain unproved. Keep the baseline path; this checkbox records the technical decision, not a shipping or human-acceptance gate.
- [x] T036 [US6] Studio Task#568 / Decision19 passes its automated technical gate at Studio bc305150 / Foundation5cd44d63: root rebuilt5/5 and exact-head CI37407169529 all jobs including paired5/5. Shared theme syntax/help/previews and narrow visibility are proved; unavailable external review fallback is explicit, not approval. Manual AT/human acceptance/delivery remain open.
- [x] T037 [P] [US6] Studio Task#572 / Decision20 passes its automated dependency at immutable Studio ef523911 / Foundation5cd44d63: root rebuilt5/5, actual runtime parity and exact-head CI37413241474 all jobs including hosted5/5. Actual signature arrays/parameters and explicit safe formatting satisfy [the frozen internal contract](contracts/signatures-and-formatting.md). Unavailable-external-review fallback is explicit, not approval; manual/human/delivery remain open.
- [ ] T038 [US6] Studio Task#577 owns the final acceptance matrix in `specs/094-expression-code-intelligence/verification.md`. Automated checkpoint b4083bd4/5cd44d63 passes root5/5, exact CI37417314313 all jobs, three restored negative controls, synthetic cross-browser/axe16/16 and actual CodeRabbit review with no actionable code comments. Actual Chrome/Safari VoiceOver remains unverified because native control reports a locked Mac; exact handoff is recorded. Root owns integration/complete gates; synthetic/DOM checks and historical July AT are not current-head manual acceptance. Human acceptance/delivery remain open; all PRs draft/unmerged.

## Dependencies

- T026 is the first executable implementation leaf; T027-T028 may follow on the same integration head, and T029 closes milestone 1 only after all three pass.
- T029 passes at Studio `c9479fba` with paired Foundation `f81be4be`; see `verification.md`. T030-T031 are unblocked.
- The committed-head T030-T031 and linked Foundation M2 automated gates pass at Studio `00677684` / Foundation `7457b7a4`; see `verification.md`. T035 settles the baseline technical path. Refine/assign T032-T034 only through their current Definition of Ready, with Foundation metadata dependencies explicit. Local implementation checkboxes are not human acceptance or delivery.
- T032-T034 settle their automated dependency at Studio `473cf1a9` / Foundation `5cd44d63`: root rebuilt normal hosts pass4/4 and exact-head full CI passes. See the final M3 section in `verification.md`, including unavailable-review, manual acceptance and draft/unmerged boundaries.
- T036 automated dependency passes at immutable bc305150/5cd44d63; T037 passes at immutable ef523911/5cd44d63 under frozen Decision20. Studio Task#577 / T038 is the sole active final acceptance leaf. No implementation checkbox substitutes for current-head manual AT, human acceptance or delivery.
