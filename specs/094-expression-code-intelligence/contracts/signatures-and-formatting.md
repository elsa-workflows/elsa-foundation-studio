# Decision 20: Authorized signature semantics and explicit conservative formatting

Studio Task#572 owns T037, stacked on passing automated Studio bc305150 / Foundation5cd44d63. Root freezes this internal contract and retains final acceptance. This is not a new SDK/wire/runtime contract and does not mark a formatter supported before its action and handler pass.

## Signatures

Extend the existing internal neutral single-signature shape additively with actual signature-info arrays plus zero-based active signature/parameter. Preserve the legacy top-level label/parameters/docs/return shape. Only an absent array normalizes to the one legacy signature; an explicitly empty authorized array hides signature help and has no valid selected index. Missing active parameter means unknown, never a guessed ordinal. Default selected overload is zero only for a nonempty list, not inferred type resolution. Navigation exposes only actual authorized catalog signatures, bounded by the existing catalog envelope; no synthesized overloads or extra query per navigation. If that envelope reports truncation, present the delivered available subset without implying completeness. Display the active parameter by its actual name/docs because current metadata has no proven label offsets. No substring highlight guessed from parameter names.

Use a distinct `StudioCodeSignatureInfo` item type, not recursive help envelopes. Optional callable identity plus the current document/language and exact ordered actual signature list may retain a user-selected index across a same-call refresh; reset it when any of those change or the index is no longer valid. Never retain old authorized signature objects behind the new list. Legacy responses without a callable identity may reset selection; the single-signature path remains unchanged. Recompute the active parameter against the newly selected authorized signature on overload navigation. Validate array/index bounds: a proved argument ordinal outside that signature's actual parameters is unknown, not clamped to the last parameter or interpreted as undocumented variadic arity.

Each `StudioCodeSignatureInfo` carries its own optional activeParameter computed from that
same parser-proven ordinal against that item's actual parameter list. The selected envelope
activeParameter is derived from the selected item. This preserves the proof when an initially
selected short overload cannot represent it: at ordinal1, `[f(x), f(x,y)]` has item indices
`[unknown,1]`; navigating to the second shows1 without another provider query. Cursor-derived
indices are fresh-response state, not part of the ordered catalog-metadata identity used to
retain the user-selected overload across a same-call refresh.

Language-owned bounded parser classifiers return plain callable identity/argument ordinal only. JavaScript selects the live SingleExpression profile, distinguishes nested calls/arrays/objects/strings/comments/templates/regex and counts only proven direct argument separators. Liquid distinguishes filter identity from value completion; explicit filter arguments start at colon (the piped value is not an extra declared parameter). Built-in/custom tag grammar must not be inferred from metadata: show actual signatures but leave the active parameter unknown unless a parser-owned rule proves it. Completion/hover quiet rules do not falsely imply that valid string argument positions have no enclosing signature. Unknown syntax stays unknown.

Clear or identity-gate displayed signature help on cursor/source/request-generation and session/catalog/permission/policy changes before a new result resolves, even when source and cursor remain identical. Preserve abort, exact source/context/catalog/permission/policy/revocation and disposal guards. Accessible overload controls/keyboard navigation must preserve compact editing and the existing Escape-then-Tab route; test pointer and keyboard behavior, stale responses and cursor movement. Manual AT remains a separate gate.

Focus-ownership preflight: the current engine's native content blur callback immediately calls
the wrapper's compact-session release, even if focus moves to another control inside the same
code-editor section. New overload/format controls must retain that editor ownership on internal
keyboard/pointer focus transfers; do not solve it with pointer-only preventDefault or by making
controls unreachable. A genuine external blur still releases compact ownership and fires the
existing host blur action. Invalidate/abort help and pending format requests before a compact
view is parked, as well as on destruction/revocation; no inactive view may apply a late format.
Route the host blur callback and compact release through one section-boundary decision;
internal focus fires neither, external blur fires the host callback exactly once. Root owns
the shared engine/wrapper focus/lifecycle seam so the two bounded writers do not race it.

## Explicit conservative formatting

Optional internal language-owned lazy formatter/provider: build the request from live `view.state`, not lagging parent props. Capture document identity/source version, exact language + grammar profile, a plain UTF-16 selection set (`ranges` of anchor/head plus `mainIndex`) and AbortSignal; result is bounded non-overlapping `{from,to,insert}` edits and optional post-edit plain selection set, with explicit ready/unsupported outcome. Bind/verify language/profile against the selected formatter. No evaluator, runtime request, source telemetry, engine type or source cache. Apply only through one engine-owned undoable transaction and normal `onChange`, never parent prop replacement. A monotonic engine-owned request generation changes on every document/selection/language-profile/session/read-only/revocation/disposal transition; host source version and equal source strings alone are insufficient for change-then-undo-to-identical-source races. Check generation, full selection-set identity and all source/lifecycle guards before applying. A real action trigger and handler must exist before modules advertise formatting true; no automatic formatting or format-on-save. Keep primary actions stationary.

JavaScript is a conservative whitespace normalizer, not a conventional pretty-printer. Alter only proven inter-node ASCII space/tab/empty gaps, preserve all line terminator sequences and leading/trailing whitespace, never touch opaque string/template/regex/comment bytes or unsupported/error grammar. Reparse with the same profile and require identical recursive node kinds and token/opaque lexemes; mismatch/uncertainty returns no changes. Preserve expression/program separation. Runtime Jint differential golden cases, including ASI and opaque tokens, remain required because parser identity is not runtime proof.

Validate returned edits as one all-or-nothing set: integral half-open UTF-16 code-unit ranges within the captured source, sorted non-overlapping ranges with no conflicting same-position insertions, bounded count/output size and valid post-edit selection against the resulting source. No edit or returned selection boundary may split a surrogate pair; validate every anchor/head and an integral mainIndex within the nonempty ranges array. No partial acceptance, out-of-range clamping, stale application or history-free replacement. Bound source and parser-node work; over-limit/unsupported results leave source and selection byte-for-byte unchanged with an honest status. A ready outcome with zero edits means safely already normalized and creates no transaction/history entry or selection remap; unsupported means safety was not proved. Do not collapse those outcomes into a success claim.

Liquid's initial safe scope is plain text plus interpolation/filter documents only. Leave all literal text and trim-marker/quote bytes exact; normalize only parser-proven interpolation/filter horizontal gaps; preserve every linebreak. If any tag, raw/comment/custom/unknown or erroneous/unsupported construct prevents proof, return the document unchanged with an honest unsupported/no-safe-change result. Do not assume an arbitrary registered tag's grammar, even if its signature metadata exists. Same-parser recursive token identity is required but not sufficient; actual Fluid rendered-output differential goldens must cover meaningful text whitespace, whitespace trimming, quotes, filters and quiet unsupported documents. No tag pretty-printing claim.

## Proof and sequencing

Minimum signature freshness counterexample: at `f(a, b)` in the second argument, authorized
overloads `[f(x, y), f(x)]` initially permit active parameter1 for the first overload. Begin a
refresh, revoke that overload, resolve with `[f(x)]` and unknown active parameter, then deliver
the old result. Old signature help must not reappear, parameter1 must not clamp to0, and the
removed overload must not be selectable. Also distinguish absent versus empty signature arrays.

Runtime-proof implementation preflight (read-only, 2026-10-06): the pinned Foundation production
services can be exercised without editing Foundation. Root confirms the exact5cd44d63 source:
on a fresh ServiceCollection call ConfigureServices for ExpressionsFeature, JavaScriptFeature,
JintFeature and LiquidExpressionsFeature, then build/dispose a provider and scope. The existing
ExplicitExpressionParametersTests.BuildProvider already uses the first three public registrations;
Liquid adds its actual default profile and scoped FluidParser with TryAdd, not a composition host.
Resolve IPortableExpressionEvaluator for BOTH JavaScript and Liquid expressions (it selects the
registered handler); resolve IJavaScriptScriptEvaluator for program JavaScript. Liquid's concrete
handler is registered through IPortableExpressionHandler, not as a directly resolvable concrete.
Use a binding-pure ExpressionDefinition with exactly matching literal parameter bindings/values,
empty-object options and String result alias for exact Liquid rendered text. Other Liquid aliases
may parse/convert that output. The program evaluator's nullable result distinguishes undefined
(C# null) from JavaScript null (a present JsonElement with Null kind); preserve this distinction.
The registered Jint implementations stay internal; do not copy their strict IIFE wrappers or
substitute a new evaluator. A small Studio-owned test harness can reference the pinned
Foundation projects and consume synthetic before/after fixtures emitted by the actual formatter,
asserting identical JSON/null outcomes and exact Liquid String results. Include Jint expression AND
program/ASI cases and quiet unsupported Liquid tags, not only parser-shape equality. No speculative
harness code is written before assignment; this is source feasibility, not runtime parity evidence.
The six project references in the existing Jint test project provide the reference set; checkout/
reference exact5cd44d63 reproducibly in Studio CI, not an unverified neighboring Foundation head.

Default installed catalogs declare no multi-signature callable: Math.pow(base, exponent) is a
real JS active-parameter host case, and append(value) is a real Liquid filter case. Overload
navigation/freshness controls use synthetic authorized provider metadata in unit tests, not
fabricated live-host metadata, routes, or an inferred production multi-overload proof. Root
verifies both default catalog builders before adopting this bounded evidence distinction.

The final integrated T038 browser journey should explicitly require the long Liquid match-start
to be horizontally clipped while its native caret is visible when opening completion, preserving
the T036 fallback regression even if future layout changes. Unit left/right geometry guards and
the retained actual T036 native diagnosis remain separate from that future-proof host precondition.

Task#568's exact-head CI37407169529 and root rebuilt all-five pass; separate bounded signature and formatting writers may now implement; shared internal contract is root-owned. Add positive tests first, reproduce their missing behavior, then guard mutations for freshness/authority/one-undo and runtime parity. Root reviews/integrates both, runs complete affected suites/lint/typecheck/build/bundles and rebuilt normal-host exact source/undo/action/signature journey. Do not relax assertion or timing/retention/bundle gates. All PRs draft/unmerged. T038 manual AT/human acceptance/delivery remain open.

