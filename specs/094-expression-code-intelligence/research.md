# Research: Expression Code Intelligence

## Decision 1: Use CodeMirror 6 behind the existing Studio editor contract

**Decision**: Continue with the existing `Elsa.Studio.CodeEditor` abstraction and use CodeMirror 6 for compact and expanded profiles.

**Rationale**: The repository already lazy-loads CodeMirror for JavaScript. CodeMirror supports small embedded editors, configurable keymaps, completion/lint extensions, a first-party Liquid language package, touch browsers, and persistent `EditorState`. The engine remains replaceable because no CodeMirror type enters the public Studio SDK.

**Alternatives considered**:

- Monaco: excellent JavaScript service but substantially heavier, explicitly lacks mobile support, and is awkward for many tiny inspector fields.
- Plain inputs plus highlighted overlays: lightweight but fragile for selection, IME, completion, diagnostics, accessibility, and shared undo.
- Separate engines for compact and expanded: rejected because it breaks session continuity and parity.

## Decision 2: Keep one workflow-lifetime editor session per Expression Document

**Decision**: Key memory-only sessions by backend, tenant/user scope, draft ID, activity/node ID, property reference key, and Expression Type. Store CodeMirror editor state, current diagnostic/tooling versions, and surface-independent presentation state.

**Rationale**: The current URI uses only the property name and collides across activities. A shared session preserves selection and undo when compact and expanded surfaces unmount/remount.

**Alternatives considered**:

- Keep the expanded editor mounted offscreen: wastes memory and risks hidden focus/a11y content.
- Persist selection/undo in the workflow draft: editor state is transient and must not become workflow data.
- Separate sessions per surface: contradicts the continuity requirement.

## Decision 3: Focus activates compact rich editing

**Decision**: Unfocused compact fields render a lightweight, syntax-colored preview; focusing a single-line value mounts the compact rich editor. Multiline values render a one-line preview and an accessible expand control. A newline pasted/inserted in compact mode is preserved and opens expanded editing.

**Rationale**: This meets the latency and density goals without sacrificing source fidelity.

**Alternatives considered**:

- Mount every visible editor: rejected for memory/startup cost.
- Strip or reject newlines: rejected because source is durable user data.

## Decision 4: Split language-neutral context from language projection

**Decision**: Workflows supplies a versioned `ExpressionAuthoringContext` containing design-time names, shapes, and scope relations. JavaScript and Liquid adapters project that context and the module catalog into language-appropriate completion/hover/signature items.

**Rationale**: Workflow scope is not owned by any expression language, while spelling, insertion text, tags, filters, and member rules are language-specific.

**Alternatives considered**:

- A universal list of “Elsa globals”: rejected because symbols and access syntax differ per Expression Type.
- Each language re-derives workflow scope: duplicates complex scope rules and risks disagreement.

## Decision 5: Foundation is authoritative; Studio uses additive capability links

**Decision**: Consume the optional Foundation capability `expressions.tooling.v1`, whose five no-store relations provide context, bounded symbols, source-aware completions, hover, and validation. Missing links, forbidden responses, incompatible versions, stale revisions, and cancellation map to distinct states.

**Rationale**: Studio's existing capability resolver rejects unknown capability majors. Additive links preserve old clients while a separate tooling contract version permits independent negotiation. Runtime modules remain authoritative.

**Alternatives considered**:

- Increase the Expressions capability major: would make the entire expression API incompatible with current Studio.
- Add a Studio bridge that invents runtime symbols: violates backend/module authority.
- Embed static catalogs in the UI only: cannot represent installed modules, policy, permissions, or runtime semantics.

## Decision 6: Cache reusable catalogs, not field context

**Decision**: Reuse only bounded, permission-scoped symbol pages in memory, keyed by backend, user, tenant, Expression Type, context revision, query, and page. Source-aware completion, hover, and validation results are never cached. Cancel stale searches and semantic requests.

**Rationale**: Built-in module metadata is shared by many fields; workflow scope is field-specific and changes with the draft.

**Alternatives considered**:

- Fetch a full catalog per field: unnecessary latency and load.
- Persist catalogs across browser sessions: risks stale permissions and cross-session disclosure.

## Decision 7: Local syntax feedback and authoritative semantic feedback are separate

**Decision**: CodeMirror language parsers provide immediate local syntax diagnostics. Studio debounces and cancels backend semantic validation and discards results whose document, source, context, or catalog versions no longer match.

**Rationale**: Responsive parsing and runtime-accurate semantics have different latency/authority characteristics.

**Alternatives considered**:

- Backend-only diagnostics: poor typing experience and network-sensitive.
- Client-only diagnostics: cannot guarantee runtime agreement or gate publication.
- Initial full TypeScript language service: too heavy for the required JavaScript scope.

## Decision 8: Consequential gates are backend-owned

**Decision**: Studio displays full-draft results and warnings, but Foundation rejects known-invalid Test Runs/publications. Test Run may proceed with a warning only when authoritative validation is unavailable and no known syntax/semantic error exists; publication fails closed.

**Rationale**: UI-only gates are bypassable and cannot protect API callers.

**Alternatives considered**:

- Disable buttons from client diagnostics only: insufficient authority.
- Block draft save: conflicts with iterative authoring and current draft behavior.

## Decision 9: Formatting is explicit and optional

**Decision**: No formatting on typing, blur, expand/collapse, or autosave. Expose a format action only when the Expression Type advertises it.

**Rationale**: Exact source preservation is more important than normalization, especially across type switching.

## Decision 10: Documentation and telemetry are treated as sensitive boundaries

**Decision**: Render module documentation as sanitized Markdown with HTML and executable links disabled. Telemetry records only aggregate usage, latency, availability, and non-sensitive error codes.

**Rationale**: Catalog documentation is untrusted, and expression/source-derived identifiers can contain secrets or business data.

## Decision 11: Installed text syntax requires explicit readiness conformance

**Decision**: Treat an installed runtime Expression Type, its Studio editor Contribution, and its Foundation tooling provider as independently composed capabilities. Studio reports their resolved readiness and degrades explicitly when one part is missing.

**Rationale**: Runtime installation does not prove that the editor module loaded or that backend tooling is reachable. A plain input must not silently look like the intended developer experience.

**Alternatives considered**:

- Infer readiness from the expression descriptor alone: rejected because PR #546 proved editor modules can be absent while the runtime type exists.
- Force every Expression Type into the code editor: rejected because reference and structured types have purpose-built editors.

## Decision 12: JavaScript editing follows the runtime expression grammar

**Decision**: Configure local JavaScript parsing and advertised libraries for expressions only. Do not enable TypeScript, JSX, statement bodies, DOM, browser, or Node APIs unless the Foundation runtime explicitly supports them.

**Rationale**: Editor acceptance and completion are promises about executable source. A broader browser-side grammar creates false positives that authoritative validation must later retract.

**Alternatives considered**:

- Keep the current TypeScript/JSX parser for richer coloring: rejected because visual acceptance implies unsupported source is viable.
- Adopt a full language service immediately: deferred behind a bounded spike; baseline grammar alignment and local completion merging are smaller reversible changes.

## Decision 13: Merge local and runtime-owned JavaScript assistance

**Decision**: Preserve useful CodeMirror-local JavaScript completions and snippets while combining them with authorized workflow/context results. Runtime-owned items retain authority for workflow scope and known shapes, with deterministic de-duplication and ranking.

**Rationale**: Replacing the local completion source removes local bindings and snippets; using only local help loses workflow scope and permission filtering.

## Decision 14: Liquid help uses effective runtime metadata and parser position

**Decision**: Foundation exposes the same binding-pure Liquid filter/tag profile used by runtime evaluation. Studio classifies interpolation, filter, tag and template positions before presenting values, filters, tags, snippets and signatures.

**Rationale**: A fresh default parser catalog can advertise filters or tags unavailable in the actual host, while a single prefix list cannot provide relevant help at different Liquid positions.

## Decision 15: Formatting is language-owned, explicit and behavior-preserving

**Decision**: Each language advertises a formatter only after tests prove runtime-equivalent output; formatting is a single undoable edit. Liquid formatting preserves meaningful whitespace and trim markers.

**Rationale**: Generic or automatic formatting can change template output and violates the exact-source editing contract.

## Decision 16: Bound the deeper JavaScript language-service spike

**Decision**: Limit the spike to two engineer-days and a disposable prototype. Adoption requires all of the following evidence: runtime-specific declarations contain no DOM or Node surface; analysis runs in a cancellable worker and rejects stale results; the service loads lazily and stays within the existing Workflows bundle gate; current completion, keyboard and screen-reader flows remain operable; and disabling the prototype restores the baseline local-plus-authorized completion path without source loss. If any gate fails or remains unproved at the timebox, reject the dependency and continue with the baseline projection.

**Rationale**: A timebox and binary exit criteria prevent an optional inference experiment from delaying the required runtime-compatible experience or becoming an unreviewed architecture commitment.

### Exit decision — 2026-10-03, Studio #553

**Decision**: Reject the current TypeScript 5.9.3 language-service candidate. Continue T032/T034 with expression-safe local JavaScript assistance and authorized runtime-owned metadata behind the existing CodeMirror/editor contracts. No service dependency, prototype code, production integration or budget increase is adopted.

The disposable browser prototype demonstrates nested members, local-object members, callback-parameter quick info, a callable signature, lazy worker loading, request cancellation before analysis, stale-response rejection and exact source/cursor preservation when disabled. Its virtual host uses `noLib`/`noResolve`, two in-memory files and module-resolution hooks that return no targets; the declaration fixture excludes DOM/Node, denied ambient globals and `Math.random`. The fixture is a manually authored curated subset, not generated metadata or proof of every customized host surface. TypeScript's actual resolution enum is `Classic`; `ModuleResolutionKind.None` does not exist and must not be claimed as the isolation boundary.

The emitted worker is approximately 3.59 MB raw / 1.03 MB gzip. The unchanged Workflows baseline build passes, but a scratch copy containing that actual worker fails the byte-identical checker's 500,000-byte individual-chunk ceiling. This is a controlled checker/asset experiment, not a shipping integration run. The lazy-load observation does not make the worker compliant with the size limit.

Cancellation during a synchronous TypeScript analysis call remains unproved: the same worker cannot process its cancel message while executing that call. Keyboard filtering/acceptance is browser-fixture evidence only; no real screen-reader session or expression-only normal-host non-regression matrix is proved for the spike candidate. The separate M2 baseline normal-host pass does not prove candidate non-regression. Consequently not every adoption gate passes. Earlier incorrect query offsets and the nonexistent enum/audit wording are corrected before retaining final evidence; those earlier claims are not acceptance.

A synthetic `import("node:fs")` host-boundary query did not return within the browser test's 30-second timeout. It is removed from the passing scenario, and authored-import behavior remains unproved; neither the cause of that timeout nor runtime authorization of import syntax is inferred.

The root reviews the prototype, independently repeats the browser command and unchanged scratch checker, and records exact commands, sizes and evidence bounds in [verification.md](verification.md). The optional spike's technical decision is settled, not the M3 product milestone or final human acceptance. Revisit only with a materially different candidate that proves every existing adoption gate; do not relax them or delay the baseline help path.

Primary API references: [TypeScript Language Service host](https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API) and [noLib](https://www.typescriptlang.org/tsconfig/noLib.html).

## Decision 17: Preserve rich runtime metadata through the existing context relation

**Decision**: For subsequent M3 implementation, consume search/paged runtime symbols through the existing rich authoring-context relation rather than reconstructing signatures from the lossy symbol-item relation. Foundation will compose immutable profile metadata through the existing symbol-filter chain before paging and revision checks; Studio will preserve signatures, return-shape references, documentation, cancellation and authorization boundaries when mapping that existing response. This records planned work, not shipped behavior.

**Rationale**: The current context `RootSymbols` already carries the required symbol/signature/value-shape model and accepts search, skip and take. The existing symbol-item projection discards signatures. Reusing the context response avoids a new wire field, SDK type, endpoint or parallel catalog authority. Its provider-capability lookup and explicit outcome mapping remain consequential and must be tested, not bypassed.

**Consequences**: Runtime catalogs stay Foundation-owned. Local inference remains advisory; unknown or truncated shapes must not be diagnosed as closed schemas. Language modules own cursor/member/call spelling while the shared editor keeps engine-neutral presentation and lifecycle behavior.
