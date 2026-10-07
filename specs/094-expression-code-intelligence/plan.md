# Implementation Plan: Expression Code Intelligence

**Branch**: `claude/2310-expression-dx-studio` | **Date**: 2026-10-02 continuation of the 2026-07-28 baseline | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/094-expression-code-intelligence/spec.md`

## Summary

Add rich JavaScript and Liquid expression authoring to the activity-properties inspector by extending the existing engine-neutral `Elsa.Studio.CodeEditor` package with compact and expanded CodeMirror 6 profiles, workflow-lifetime editor sessions, and neutral completion/diagnostic inputs. Extend the public Studio expression-editor SDK with stable document identity, language-neutral authoring context, capability/status envelopes, and cancellation/version metadata. JavaScript and Liquid modules remain responsible for language projection and editor adapters; Workflows remains responsible for draft/activity/property scope and consequential-action integration.

Authoritative symbol metadata, source-aware completion/hover, semantic validation, and full-draft execution/publication gates are delivered by the coordinated Elsa Foundation work unit `143-expression-code-intelligence` through capability `expressions.tooling.v1`. Studio discovers those additive API relations, uses them when compatible, and retains syntax-aware or generic editing when they are absent.

Program #2310 now completes the baseline through four thin milestones: prove normal-host persisted-workflow integration; enforce installed-text-syntax and JavaScript-runtime conformance; deepen JavaScript and Liquid assistance with runtime-owned metadata; then finish theme, preview, signature, formatting, accessibility and continuity behavior. Historical fixture evidence remains regression evidence, not a substitute for the normal-host demonstration.

**Owner scope amendment, 2026-10-06:** Actual current-head Chrome+VoiceOver and Safari+VoiceOver observation is **SKIPPED BY OWNER DECISION — NEVER PASSED**, not a required program acceptance gate. Native behavior remains unverified; historical manual-AT statements below retain their checkpoint meaning, not current acceptance. All other keyboard, automated accessibility, continuity, runtime, review and technical gates remain required. Final owner acceptance precedes Ready/merge; required green post-merge main and public completion records follow. See [verification](verification.md#owner-acceptance-scope-amendment--2026-10-06).

## Technical Context

**Language/Version**: TypeScript 5.6, React 19, C# 13 / .NET 10

**Primary Dependencies**: CodeMirror 6 through `@uiw/react-codemirror`; `@codemirror/lang-javascript`; new `@codemirror/lang-liquid`, `@codemirror/autocomplete`, `@codemirror/lint`, `@codemirror/state`, and `@codemirror/view`; existing Studio SDK and hypermedia capability client

**Storage**: Existing persisted workflow drafts only; editor sessions and tooling caches are memory-only and scoped to the browser/workflow lifetime

**Testing**: Vitest + jsdom for package/module/host tests, Playwright for real inspector journeys, xUnit for any Studio server contract tests, TypeScript typecheck, ESLint, Stylelint, Vite builds, .NET solution build/tests

**Target Platform**: Current stable desktop Chromium/Firefox/Safari and supported touch browsers; ASP.NET Core Studio host connected to an Elsa Foundation backend

**Project Type**: Modular web application with separately packaged Studio client modules and an external hypermedia API backend

**Performance Goals**: p95 focused compact activation ≤100 ms warm and ≤500 ms cold; no p95 typing task >50 ms in the defined 50-field fixture; only the focused compact field mounts a rich editor

**Constraints**: Preserve exact source; keep CodeMirror types internal; do not adopt a project-wide TypeScript service without the bounded Program #2310 spike; no evaluation or live values for intelligence; permission/Host Policy filtering is server-authoritative; draft autosave/history stays authoritative; semantic features must degrade independently; JavaScript help must stay within runtime grammar/APIs; Liquid metadata must match the effective runtime profile

**Scale/Scope**: Complete JavaScript and Liquid behavior plus conformance for every installed supported text Expression Type; one shared editor substrate; bounded/searchable catalogs; recursive value shapes by reference; workflow drafts with high-density inspectors and expressions up to 2,000 characters in the benchmark

## Constitution Check

*GATE: Passed before Phase 0 and re-checked after Phase 1 design.*

- **Modular UI contract — PASS**: `Elsa.Studio.CodeEditor` owns the reusable editor/session primitive. Workflows contributes language-neutral context, while JavaScript and Liquid modules contribute their adapters. No module consumes another module's private CSS or CodeMirror types through the public SDK.
- **Workbench pattern fit — PASS**: This extends the existing workflow master/detail workbench's activity-properties inspector and modal property editor; no new page archetype is introduced.
- **Typography and token discipline — PASS**: Changed module CSS uses only the stable `--studio-*` token contract. CodeMirror theme projection is centralized in `Elsa.Studio.CodeEditor`.
- **Accessible interaction — PASS**: Compact focus activation, completion acceptance, multiline expansion, diagnostic announcements, loading/degraded states, Tab behavior, Escape handling, and the expanded-editor Tab escape are explicit test scenarios.
- **Fixture-screen regression coverage — HISTORICAL PASS**: Playwright exercises the real activity-properties components in the synthetic browser fixture across compact, expanded, multiline, invalid, unavailable, and touch viewport states. This remains useful regression evidence but is not the normal-host gate.
- **Cross-repository authority — PASS**: Studio consumes additive Elsa API capability links. Runtime-owned JavaScript/Liquid metadata and semantic validation remain in Foundation modules, avoiding a Studio authority inversion.
- **Installed-syntax conformance — PASS**: Readiness is projected through the existing Expression Editor Contribution and tooling contracts. Reference and structured Expression Types retain their specialized editors.
- **Real-screen proof — OPEN GATE**: Historical fixture and assistive-technology evidence is retained, but Program #2310 cannot close until rebuilt matching Studio/Foundation hosts pass the persisted-workflow demonstration in light, dark and dim presentation.

## Project Structure

### Documentation (this feature)

```text
specs/094-expression-code-intelligence/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── expression-tooling-api.openapi.yaml
│   └── studio-expression-tooling.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── Elsa.Studio.CodeEditor/Client/
│   └── src/
│       ├── engines/
│       ├── languages/
│       ├── sessions/
│       └── __tests__/
├── Elsa.Studio.Web/Client/src/sdk/
├── Elsa.Studio.Workflows/Client/src/
│   ├── api/
│   ├── expression-tooling/
│   ├── workflow-editor/
│   └── __tests__/
├── Elsa.Studio.ExpressionEditors.JavaScript/Client/src/
└── Elsa.Studio.ExpressionEditors.Liquid/Client/src/

tests/
└── browser/
    ├── src.tsx
    └── expression-code-intelligence.spec.ts
```

**Structure Decision**: Extend the existing module boundaries. The editor engine/session substrate remains internal to `Elsa.Studio.CodeEditor`; the engine-neutral expression contract remains in the public Studio SDK; workflow-context orchestration remains in `Elsa.Studio.Workflows`; and language-specific projection remains in each expression-editor module. No new Studio server project or proxy is introduced.

## Delivery Dependency

The Studio implementation can be built and tested against fixtures independently, but authoritative semantic capability is available only when Elsa Foundation work unit `143-expression-code-intelligence` is deployed. The Studio PR therefore:

1. consumes optional additive capability relations without changing the existing Expressions capability major;
2. treats missing relations as an explicit unavailable state;
3. ships contract fixtures that match the coordinated Foundation OpenAPI;
4. never substitutes a client-only validator for authoritative publication or Test Run gates.

## Program #2310 milestone design

1. **Normally composed baseline**: run Studio and Foundation from matching reviewed heads; create a persisted workflow containing scoped inputs, variables and outputs; prove JavaScript/Liquid module discovery, syntax selection, compact/expanded editing, real authoring-context relations and explicit degraded states. Add normal-host regression coverage without duplicating the merged #545/#546 discovery guard.
2. **Installed-syntax conformance**: add a shared readiness/conformance matrix for supported text Expression Types and align the JavaScript expression-editor parser with the runtime expression grammar while preserving general-purpose program editors. Local completion merging remains milestone 3, as scoped by task #552 and T032.
3. **Language depth**: merge expression-safe local JavaScript completions with authorized workflow assistance; use Foundation runtime metadata for Liquid filters/tags and parser-position-aware Studio projection; deepen known JavaScript member/signature help. Run a bounded worker/service spike before any deeper JavaScript language-service dependency is adopted.
4. **Experience polish**: project syntax/help surfaces onto shared theme tokens, render lightweight highlighted previews, show active parameters and overloads, add explicit behavior-preserving formatters, and complete real keyboard/continuity and automated accessibility proof. Current-head Chrome+VoiceOver and Safari+VoiceOver observation is skipped and never passed under the 2026-10-06 owner amendment; screen-reader usability remains a product requirement, not a verified delivery claim.

Each milestone retains one integration lane and separate exact-head review and live-verification evidence. A failed live demonstration reopens the owning task and keeps the milestone incomplete.

### T033 implementation boundary — Studio Task#561

Decision18 freezes the smallest Liquid consumer slice on the reviewed rich-catalog producer/consumer
pair. Keep `lang-liquid` lazy behind CodeEditor; Liquid owns only plain cursor classification and
runtime-metadata projection. Any shared range/snippet/cursor additions remain internal. Use parser
position rather than prefix-only guesses, current rich authorized catalogs rather than baked lists,
and fail-closed asynchronous outcomes. Root retains the integration/browser lane; the worker owns
only the bounded code/tests. Existing JavaScript/program behavior, SDK/wire/dependencies, runtime
and meaningful Liquid whitespace stay unchanged. T033 acceptance requires final paired-host,
affected complete-suite, unchanged bundle and current-head CI/review evidence.

### T036 implementation boundary — Studio Task#568

Decision19 starts from the exact passing M3 pair (`473cf1a9` / `5cd44d63`). The shared CodeEditor
owns bounded plain-span static highlighting, escaped lightweight previews and the same category
mapping in the lazy rich engine. The central UI token contract owns syntax-foreground roles for
Light/Dark/Dim; module CSS remains `--studio-*`-only. No collapsed field may create an editor
session just to highlight its preview. Source/language/authorization/unmount changes reject late
spans and preserve the existing source-hiding boundary. Root verifies actual normal-host themes,
computed contrast, narrow interaction and exact persistence, without changing retained-source or
timing/bundle policies. Active parameters, actual overloads and formatting require their separate
T037 contract. Current-head manual AT and human acceptance remain explicitly open.

## Complexity Tracking

### T037 implementation boundary — Studio Task#572

Decision20 freezes [signature/formatting semantics](contracts/signatures-and-formatting.md) on
the passing immutable T036 pair bc305150/5cd44d63. Separate bounded writers own language
signature projection/panel and parser-only conservative formatters. Root owns neutral types,
shared focus/session/request-generation seams, one-transaction edits, registered production
Jint/Fluid differential harness, real-host proof and complete QA. No new dependency, language
service, SDK/wire/runtime field, automatic formatting or evaluation in production tooling.
This follows the existing constitution and ADR0002/0006; final manual/human/delivery gates remain open.

No constitution violations require justification.
