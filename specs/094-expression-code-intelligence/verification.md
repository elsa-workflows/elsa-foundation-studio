# Expression Code Intelligence — Verification

Last reconciled: 2026-10-06 for Program #2310 T037 automated acceptance and in-progress T038 / Studio Task#577; all PRs draft/unmerged, current-head manual AT and human acceptance pending

## Program #2310 status

T026-T029 pass at the exact M1 pair below. T030-T031 pass their exact-head automated M2 gate under the documented unavailable-external-review fallback. Studio spike #553 / T035 settles the technical decision: reject the current deeper-service candidate and retain the baseline path. No deeper-service dependency is adopted. T032-T034 pass their final exact-head automated M3 gate below. T036 passes its immutable bc305150/5cd44d63 automated gate; Task#572 / T037 passes at immutable ef523911/5cd44d63. Task#577 owns T038. Current-head manual accessibility, T038/human acceptance and delivery remain open. The 2026-07-28 evidence remains historical. All program PRs remain draft and unmerged.

## Verification evidence

### T038 / Studio Task#577 — final matrix in progress, 2026-10-06

The integration branch `codex/577-expression-acceptance-matrix` stacks over immutable
T037 `ef523911` and retains the paired clean Foundation `5cd44d63`. This leaf changes
acceptance tests/evidence only, not production editors, SDK/wire contracts or runtime.
The root reviewed the bounded test writer's delta and corrected two proof gaps before
the coherent run: observe the original native paste target after compact DOM replacement,
and perform the one-format undo **after** Format/Escape/Tab exit and reactivation.
Independent source review agrees. The executable checkpoint below passes its automated
matrix; actual native AT and owner acceptance remain open.

| Acceptance surface | Current-head observation required | State |
|---|---|---|
| Real persisted workflow and Activity Definition | JavaScript/Liquid compact/expanded, authorized live assistance, exact saves and independent missing-module/provider editing | PASS at b4083bd4/5cd44d63: root5/5 and hosted5/5 |
| Light/Dark/Dim, narrow inspector | Preview/editor/selection/help/completion/diagnostic contrast, native visible caret, clipped Liquid match-start precondition | PASS at the same exact pair |
| Native multiline paste | Trusted browser paste event with exact synthetic payload, preserved whitespace, automatic expansion, persisted text, native caret and one undo/redo | PASS at the same exact pair; restored negative control fails without trusted paste |
| Explicit Format and native exit | Visible narrow real Format control, mapped collapsed caret, exact source/persistence, Escape-to-editor and actual Tab exit, reactivation followed by one undo | PASS at the same exact pair; restored negative control catches omitted exit undo |
| Generic cross-browser/axe | Synthetic Chromium/Firefox/WebKit/touch fixture; not real-host/runtime or actual screen-reader evidence | PASS16/16 at b4083bd4, traces off |
| Chrome + VoiceOver; Safari + VoiceOver | Actual current-head screen-reader navigation/announcements, settings restored | UNVERIFIED: native control reports locked Mac; manual unlock required |
| Human acceptance and delivery | Owner acceptance; draft-to-ready/merge/delivery separately authorized | OPEN; all PRs draft/unmerged |

The first coherent candidate run passes3/5 (5.3m) and exposes two test-assumption failures,
not accepted product regressions: the Liquid caret now opens signature status alongside
formatter status, making the former broad status locator ambiguous; single-line preview
focus immediately activates its editor, so waiting for that preview to remain focused is
incorrect. The corrected test selects the exact formatter status, also measures its contrast,
and observes native Shift+Tab reactivation directly. This failed run remains retained in
`/private/tmp/elsa-577-root-normal-host-candidate.log`; the final corrected result is below.

Committed `cadd58ba` passes4/5 (8.6m): the persisted-workflow/Activity Definition and both
independent degradation cases pass. The narrow case reaches native paste but the added
clipboard guard incorrectly infers headless mode from a user agent overridden by the
Desktop Chrome device profile. It refuses the write before touching clipboard data.
The correction uses Playwright's resolved built-in `headless` fixture instead; headed
execution remains refused. Log: `/private/tmp/elsa-577-root-normal-host-cadd58ba.log`.
CI37415408459 passes static/workspace and generic Chromium jobs; its paired job fails4/5
on the same guard, with production-runtime parity skipped, not accepted. An explicit manual CodeRabbit request starts actual review of
`cadd58ba` while keeping the PR draft; this is distinct from the initial draft skip.
That review subsequently aborts when the head changes (bot reply6009576375), and the
summary reverts to draft-skipped. No completed external review is claimed; the corrected
checkpoint requires a fresh request and actual review-ledger inspection.

The extra strict browser-harness typecheck also exposes three pre-existing variant alias
type errors (redeclaring an already registered option fixture). Bare value overrides preserve
the pinned Playwright1.61.1 option metadata and exact host variants, without dependency or
host behavior changes. The rerun uses the existing bundled Node declarations, not a new
repository package or weakened compiler option. Both raw failures are retained in
`/private/tmp/elsa-577-root-harness-typecheck.log` and
`/private/tmp/elsa-577-root-harness-typecheck-bundled.log`. Corrected strict compilation
passes with no diagnostics in `/private/tmp/elsa-577-root-harness-typecheck-corrected.log`;
changed-harness ESLint, five-case collection and diff checks pass.

Committed `6f298c28` passes4/5 (6.7m): trusted native JavaScript paste, caret, exact saves,
undo and redo pass. Liquid trusted paste, text and offset pass, but the empty final line
returns a zero-sized native collapsed Range. Exact-head CI37416192618 fails the paired
case on that visibility assertion; static/workspace and generic Chromium pass, actual
runtime parity is skipped. Logs: `/private/tmp/elsa-577-root-normal-host-6f298c28.log`
and `/private/tmp/elsa-577-root-ci-6f298c28-failed.log`.

A root narrow rebuilt diagnostic confirms actual native selection at offset123, the empty
line DIV at child offset0, no measurable collapsed Range, and its BR anchor at x92.8125,
y406.5625–423.5625 within viewport x44–346.875/y358.1875–436.75. An independent synthetic
Chromium probe corroborates the DOM limitation; it is not real-host acceptance. The
correction permits that BR anchor only for this exact empty-line/zero-Range selection
shape and keeps nonempty Range geometry, positive height and the same ±1 viewport bounds.
The diagnostic remains `/private/tmp/elsa-577-root-empty-line-diagnostic.log`. The exact
helper's independent synthetic probe returns visible for text-backed and in-viewport BR
carets, false for offscreen and hidden BR anchors. Root review finds no actionable issue;
these synthetic checks are not actual host or screen-reader acceptance.

#### Executable checkpoint b4083bd4 — automated matrix passes

Studio `b4083bd487164218265bd7b7e48b286b44f6813d` / clean pinned Foundation
`5cd44d6312d9de85b13f4619fc7aa972a557d033` pass root canonical coherent rebuilt normal
hosts5/5 (5.4m) and exact-head [CI37417314313](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37417314313)
ALL jobs: lint/layout/typecheck, complete workspace units and Workflows shuffle seeds1/11/29,
bundle budget, generic Chromium, Foundation persisted-host request envelopes, hosted5/5
(6.0m), and actual registered Jint/Fluid formatter parity. This is an executable checkpoint,
not a claim that any later documentation-only reconciliation already passed its own CI.
Root actual registered-runtime parity also passes its ten synthetic fixtures; log:
`/private/tmp/elsa-577-root-runtime-parity-b4083bd4.log`.

Three root temporary harness mutations use the canonical rebuilt setup with only the
narrow-case selection, unchanged timing and no configuration fork. Each fails at its
intended assertion and is restored exactly (`git diff --exit-code`):

- Replacing native paste with `keyboard.insertText` produces no trusted paste observation.
- Omitting logical newline accounting reports native offset22 rather than23.
- Omitting the single format undo after actual exit/reactivation leaves formatted source
  instead of the exact unformatted source.

These discriminate the acceptance assertions, not mutations of production editing code.
Logs: `/private/tmp/elsa-577-root-negative-native-paste.log`,
`/private/tmp/elsa-577-root-negative-newline-offset.log`,
`/private/tmp/elsa-577-root-negative-format-exit-undo.log`.

The synthetic cross-browser/axe matrix initially passes6/16 but cannot launch ten Firefox/
WebKit cases because the pinned browser binaries are absent. Installing only Playwright's
official matching test binaries fixes that environment prerequisite; no dependencies,
personal browsers or test configuration are changed. The unchanged rerun passes16/16
(39.6s) with trace capture explicitly off. This remains separate from real host/runtime
and native AT evidence. Logs: `/private/tmp/elsa-577-root-expression-matrix-b4083bd4.log`,
`/private/tmp/elsa-577-root-test-browser-install.log`,
`/private/tmp/elsa-577-root-expression-matrix-b4083bd4-retry.log`.

Actual CodeRabbit review completes at this exact head: summary comment6009541054,
run4ff5830f-58d8-4c6a-b264-f58704a9226a, all four changed files, no actionable code
comments and no unresolved review threads. Its default docstring-coverage warning remains
explicitly recorded, not silently passed; that advisory is not a required repository gate,
and existing focused helper comments explain the non-obvious proof boundaries. No bulk
documentation boilerplate is added. This is completed bot review evidence, not a GitHub
APPROVED review or human acceptance. Copilot is requested but actual request/review/inline
arrays remain empty after the window; no Greptile review is claimed.

Primary root logs: `/private/tmp/elsa-577-root-normal-host-b4083bd4.log`,
`/private/tmp/elsa-577-root-ci-b4083bd4-pass.log`,
`/private/tmp/elsa-577-root-external-review-b4083bd4.json`.

The native preflight confirms VoiceOver is not running and macOS UI automation is
available, without changing accessibility settings. The connected Chrome browser is
extension-backed, not the isolated Playwright context. Its initial native binding unexpectedly
exposed an unrelated existing window; that content was not used and no unrelated action was
taken. The owned blank tab was focused and a new Incognito window was then created and
verified before further native QA. No personal credentials or clipboard contents are read,
and no native announcement has been counted. Both owned browser surfaces are closed after
preflight. The VoiceOver utility process opens but repeated native observation attempts fail
with a timeout and capture-stream failure, with no utility window exposed in the native
inventory. No VoiceOver/caption setting was changed; this is an observation limitation,
not current-head AT acceptance. Synthetic automated paste is guarded to
headless Chromium, whose [platform-independent clipboard implementation](https://chromium.googlesource.com/chromium/src/+/HEAD/components/headless/clipboard/headless_clipboard.cc)
is installed by both headless Chrome and the headless shell; no platform clipboard restore/read
is used by the test.
Default live catalogs supply single signatures; overload navigation remains separately
proved by synthetic authorized-provider component tests, not invented live host data.

#### Native AT blocker and exact acceptance handoff

On resume, an owned blank QA tab opens, but native Chrome control reports the Mac locked
and unable to unlock automatically. Manual unlock is requested; the temporary tab is
closed. No native host is started, no personal surface is used, VoiceOver remains off,
and no caption/accessibility setting is changed. The documented native keyboard caption
path is still untried because the locked desktop prevents it; utility capture failure alone
is not being treated as proof that all native observation paths are unavailable.

After manual unlock, retain this branch and pinned Foundation checkout, rebuild using
`ELSA_FOUNDATION_WORKTREE=/private/tmp/elsa-2379-foundation pnpm test:browser:expression-normal-host`.
The prepared local bootstrap `/private/tmp/elsa-577-native-at-host.mjs` (Node25, import
and syntax preflight pass; not yet run) reuses the actual host lifecycle and live-catalog
draft seeder. Start it with
`ELSA_FOUNDATION_WORKTREE=/private/tmp/elsa-2379-foundation node /private/tmp/elsa-577-native-at-host.mjs`.
For independent degradation, repeat with its validated `missing-javascript-editor` or
`missing-liquid-provider` argument, stopping the previous owned pair first. It prints only
owned loopback login/workflow URLs and bounded fixture labels; it owns fresh SQLite and
stops its hosts on SIGINT/SIGTERM. Sign into each owned Chrome/Safari private window
using only the synthetic local fixture account, then use the printed JavaScript/Liquid
workflow URLs and select the `target` activity's Text input.

For both actual browser/VoiceOver combinations, observe actual speech or the native
caption panel, not just page AX/DOM: preview/editor names and keyboard instructions;
completion invocation/navigation/acceptance; `Math.pow(2, 3)` active-parameter signature
and keyboard hover; local syntax diagnostics; compact/expanded source/focus/undo;
real Format status and Escape-to-editor/Tab exit; Control-M/Tab expanded escape; the
applicable theme/narrow flow and independent unavailable-editor/provider editing.
Use only synthetic authored values and actual supplied signatures; do not invent live
overloads. Record browser/OS/AT versions, exact source pair, expected versus observed
announcements and any failure. Preserve original VoiceOver/caption settings, restore
them, close only owned windows and stop only owned hosts. A failure keeps T038 unchecked.
Human acceptance, Ready/merge and delivery remain separate and unauthorized here.

### Final T037 automated technical gate, 2026-10-06

Immutable Studio `ef523911c72aad209d483580dcd24dcb638686a9` / clean Foundation
`5cd44d6312d9de85b13f4619fc7aa972a557d033` pass root coherent rebuilt normal hosts5/5
(6.0m), final actual registered Jint/Fluid parity (ten synthetic fixtures), and exact-head
[CI37413241474](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37413241474)
ALL jobs: full lint/layout/typecheck, complete workspace units (CodeEditor196, JS16, Liquid28,
Workflows1506), three Workflows shuffle seeds1/11/29, unchanged bundles, generic Chromium,
Foundation persisted-host request envelopes, paired hosts5/5 (6.9m) and actual runtime parity.
Actual Studio-only solution restore/build also passes0warnings/errors without Foundation.

Root final integrated-delta review and independent latest-delta source review find no remaining
actionable blocker. Signature evidence preserves actual supplied arrays/per-item arity and
parser-proven positions; default catalogs expose single signatures, so authorized synthetic
provider overload controls remain separate from live-host signature proof. Formatter edit/
selection freshness and fail-closed atomicity, native focus and one-undo controls discriminate;
intentional arithmetic/overlap mutations fail and are restored. Predecessor failed CI/host
checkpoints below retain their original boundaries.

Copilot is explicitly re-requested after the final push but actual requests/reviews/inline
comments remain empty after the review window; no Greptile signal appears, and CodeRabbit
skips the draft. Completed root/independent/local/hosted evidence uses the documented unavailable
external-review fallback, not actual external approval. DraftPR#574 remains immutable,
draft/open/unmerged; Task572's implementation claim is released, automated verification Passed,
separate ReviewRequired/human/delivery boundaries preserved.

CI budgets remain primary127.50/127.50kB, CSS145.86/185kB, Definitions380.70/384.50kB,
upgrades370.70/375.50kB, largest263.18/500kB, eight heavy surfaces deferred. Logs:
`/private/tmp/elsa-572-root-normal-host-ef523911.log`,
`/private/tmp/elsa-572-root-runtime-parity-ef523911.log`,
`/private/tmp/elsa-572-root-ci-ef523911-pass.log`,
`/private/tmp/elsa-572-root-solution-registration.log`.

At T037 acceptance, Task577 / T038 became the sole active final acceptance leaf for native
clipboard paste, Format caret/undo, narrow activation and native control exit. Its latest
automated matrix and native AT blocker are recorded above. Current-head Chrome/Safari
VoiceOver, human acceptance and delivery remain OPEN; DOM/axe/Playwright and July historical
AT evidence do not satisfy those gates. All PRs stay draft/unmerged.

### T037 integration dd6bc1aa — complete gate pending

Studio `dd6bc1aa7ff591ffdb6f4a66ec6a7e8922e5a459` / clean immutable Foundation
`5cd44d6312d9de85b13f4619fc7aa972a557d033` pass root canonical coherent rebuilt normal
hosts5/5 (9.4m, initially under high machine load). Actual compact/expanded JS/Liquid button
and shortcut formatting, persisted source, completed announcement, same editor and one-step
undo pass. The theme journey additionally proves the Liquid match-start is horizontally clipped
while the native caret remains visible on the same visual row, then completion stays visible.
Activity Definition and both independent missing-module/provider paths pass. Log:
`/private/tmp/elsa-572-root-normal-host-dd6bc1aa.log`.

Exact-head CI37412147300 fails the layout gate because the new paired-runtime harness was
not registered in `Elsa.Studio.slnx`; generic Chromium passes, paired-host job remains running
at this reconciliation. The solution registration correction uses explicit `Build=false`,
not a layout exception: paired CI still obligatorily builds/runs the harness directly. Native
SDK10.0.300 scratch solution restore/build both prove this excludes the harness without a
Foundation root. Logs: `/private/tmp/elsa-572-parity-solution-restore-probe.log`,
`/private/tmp/elsa-572-parity-solution-build-probe.log`,
`/private/tmp/elsa-572-root-ci-dd6bc1aa-static.log`. The corrected actual Studio solution
restore/build passes without a Foundation root (0 warnings/errors), and the unchanged layout
guard passes20 projects/20 packages/19 module roots. Logs:
`/private/tmp/elsa-572-root-solution-registration.log`,
`/private/tmp/elsa-572-root-layout-registration.log`. Successor exact-head CI remains pending;
this checkpoint does not accept T037.

Full repository lint passes with48 pre-existing warnings/0errors, and full workspace typecheck
passes after registration. Logs: `/private/tmp/elsa-572-root-full-lint-registration.log`,
`/private/tmp/elsa-572-root-full-typecheck-registration.log`.

Independent latest-delta source review finds no blocker in native control focus, cancellation,
status preservation or conservative formatters, and flags the solution restore risk above.
Root retains final integration/QA; this review is not browser/runtime/human acceptance.

### Earlier T037 checkpoints — not accepted

Current in-progress integration resolves native-action focus boundaries, URI/session identity,
render-time async provider generation and layout-phase source/provider invalidation. Initial
passive formatter cleanup after lazy mounting could cancel the first action: localized with a
value-free stack diagnostic, then moved into layout phase; temporary diagnostics are removed.
Final affected suites pass240/240 (CodeEditor196, JavaScript16, Liquid28), including
program-grammar controls and focus recovery before signature-authority refresh removes its
focused native control. Owning TypeScript checks, changed-source ESLint, CSS Stylelint and
diff check pass. Log: `/private/tmp/elsa-572-root-final-affected-units.log`.

Actual registered-runtime parity passes ten synthetic fixtures against clean pinned Foundation5cd44d63:
meaningfully changed JavaScript expression/program and Liquid filter output, opaque tokens/ASI,
undefined versus JSON null and exact quiet Liquid text/tag/raw/comment/trim outputs.
An intentional changed arithmetic output fails the actual runtime golden; it is restored.
Removing overlap/same-position/ordering validation makes three real atomic-edit tests fail;
that mutation is also restored. Logs: `/private/tmp/elsa-572-root-runtime-parity.log`,
`/private/tmp/elsa-572-root-runtime-parity-mutation.log`,
`/private/tmp/elsa-572-root-atomic-edit-mutation.log`.

The final integration rerun also passes all ten fixtures after the program-grammar guard;
log: `/private/tmp/elsa-572-root-runtime-parity-final.log`. This is actual registered runtime
proof, not a substitute for the still-pending rebuilt normal-host and exact-head CI gates.

The first coherent integration rebuild finishes4/5 (4.5m): the existing theme/fresh-hover,
Activity Definition and both missing-module/provider paths pass. The persisted workflow case
proves changed formatting source persisted, then fails because autosave erases its completed
live announcement. Root keeps completed announcements through host acknowledgements but still
cancels pending work and clears status on new source/selection edits. Targeted announcement/
native-boundary controls reproduce RED2failed/37passed then GREEN39/39. Chromium separately
confirms disabling the focused native button loses focus; navigation now uses bounded no-op
`aria-disabled` actions without disabling/removing that control. Explicit format/overload
Escape-to-editor/native-Tab controls reproduce RED2failed then GREEN2/2. Corrected coherent
host proof remains pending. Logs: `/private/tmp/elsa-572-root-normal-host-integration.log`,
`/private/tmp/elsa-572-root-status-focus-red.log`,
`/private/tmp/elsa-572-root-status-focus-green.log`,
`/private/tmp/elsa-572-root-control-exit-red.log`,
`/private/tmp/elsa-572-root-control-exit-green.log`.

Program formatting additionally declines JSX/TypeScript/module constructs accepted by the
broader legacy authoring grammar but unsupported by the registered runtime. JSX/TypeScript
quiet controls reproduce two failures; installed plain-parser checks alone miss a TypeAnnotation,
so the selected-tree feature-node guard is also required. Final affected-suite verification
passes; corrected coherent rebuilt-host verification remains pending. Independent source-only review confirms the earlier
old-entry/pinned-dirty-source gaps are closed; it does not claim hosted/runtime acceptance.

DraftPR#574 starts at Studio `863e55ef712e62cb6023b659a6efd4d83bd3122b`
on immutable Foundation `5cd44d6312d9de85b13f4619fc7aa972a557d033`.
[CI37408723729](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37408723729)
is terminal failed: generic Chromium passes; the units job has two failing synthetic-blur
tests (118 pass), and normal hosts pass four cases but fail the theme journey's fresh-hover
revision assertion at line203 after its unchanged30s limit (6.1m).
Log: `/private/tmp/elsa-572-root-ci-863e55ef-failed.log`.

The two unit fixtures dispatch a synthetic blur without moving native focus outside the
editor. The corrected fixtures use actual native blur and retain their parked-view and
repeated-activation assertions. Current root wrapper/controller suites pass68/68, including
internal native-button focus, explicit button/shortcut formatting, atomic selection/edit
validation, late-result rejection and one-step undo. Log:
`/private/tmp/elsa-572-root-engine-wrapper-tests-final.log`.
This is focused in-progress evidence, not acceptance. The hosted fresh-hover failure remains
unaccepted until a coherent rebuilt run proves the current integration. T037 implementation,
production-runtime formatting parity, T038, manual AT and human acceptance remain open.

### Final T036 automated technical gate, 2026-10-06

Immutable Studio `bc3051501a4ec8bf391e8bb80727339409b77f98` / Foundation
`5cd44d6312d9de85b13f4619fc7aa972a557d033` pass root coherent rebuilt normal hosts **5/5 (6.1m)**
and exact-head [CI37407169529](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37407169529)
**all jobs**, including full units/three Workflows shuffle seeds/lint/typecheck/bundles,
generic Chromium, Foundation persisted-host envelopes and paired normal hosts **5/5 (6.3m)**.
The CI log records both exact revisions. Final CodeEditor119/119, owning tsc, scoped ESLint,
diff and frozen/offline install pass. Original-dependency anchor RED2failed/12passed becomes
patched GREEN14/14, with final geometry controls and all retained predecessor failures below.
Root integrated-delta review and independent current patch/harness review find no blocker.
Copilot is explicitly re-requested but actual requests/reviews remain empty; the documented
unavailable-external-review fallback is used, not actual external approval.

Unchanged exact rebuilt budgets: primary127.44/127.50kB, stylesheet145.19/185kB,
definitions379.97/384.50kB, upgrades369.97/375.50kB, largest263.18/500kB, eight heavy surfaces deferred.
Logs: `/private/tmp/elsa-568-root-all-five-bc305150.log` and
`/private/tmp/elsa-568-root-ci-bc305150-pass.log`. DraftPR#569 stays draft/open/unmerged;
Task#568 implementation claim is released and automated verification is Passed.
This clears T037's dependency, assigned Task#572 / Decision20. Manual AT, human acceptance,
T038 and delivery stay OPEN. This reconciliation is recorded on the child without moving
the immutable tested T036 head; candidate evidence below retains its historical boundaries.

### M4 T036 guarded completion-anchor candidate (not accepted)

Root reviews the independent tests-first and source-review inputs and applies a reproducible
pnpm patch to installed autocomplete6.20.3, without upgrading any resolved dependency version.
The identical17-line ESM/CommonJS addition uses the documented TooltipView.getCoords hook:
retain the match-start anchor normally; only a horizontally clipped start may fall back to
the visible collapsed main caret still inside that same active result and visual row (under1px
coordinate tolerance). Native effective-margin/window/vertical clipping remains in force.
No result.from/to/filter/apply, editor scroll, source, selection or undo mutation is added.
Decision19 records this bounded presentation seam; no T037 semantics are assigned.

Focused original-dependency RED is2failed/12passed: both left/right clipped-prefix anchors
remain offscreen. Installed-patch GREEN is14/14. Seven geometry controls include normal visible
start, both clipped edges/fractional row, offscreen caret, different row, missing caret coords,
and missing start coords despite a visible caret. Successful fallback preserves the descriptor
position and exact source/selection, then full-token replacement and undo. Geometry alone is
stubbed in jsdom; real CodeMirror completion/selection/history/tooltip state remain in use.
Complete final CodeEditor119/119 (eight files,14.32s), owning package tsc, changed-test ESLint,
diff check and frozen/offline pnpm install pass. Patch hash/lock references are regenerated by
pnpm and reviewed: no unrelated resolved version changes. Logs:
`/private/tmp/elsa-568-root-completion-anchor-red.log`,
`/private/tmp/elsa-568-root-completion-anchor-green.log`,
`/private/tmp/elsa-568-root-completion-anchor-editor-units.log`,
`/private/tmp/elsa-568-root-completion-anchor-editor-typecheck.log`,
`/private/tmp/elsa-568-root-completion-anchor-frozen-install.log`.

The normal-host harness additionally requires the exact native collapsed caret and its full
physical viewport visibility before and after completion opens. Its existing Home/End/Home
measurement is extracted into the same helper, retaining all source, scroll and readability
assertions. Temporary diagnostics/no-build config remain removed. Coherent rebuilt all-five,
successor exact-head CI and review reconciliation remain required; this candidate is not T036
acceptance. Foundation stays immutable5cd44d63 and all program PRs remain draft/unmerged.

### M4 T036 committed9cf43b4c — completion anchor localized (not accepted)

Root canonical coherent all-five rebuild at Studio9cf43b4c / immutable Foundation5cd44d63
finishes4pass/1fail (5.7m). The real one-horizontal-row navigation assertion and full physical
code-scroller intersection pass. JavaScript Light/Dark/Dim journeys pass; Liquid Light's
selected completion still has viewport-intersection ratio0 for the unchanged30s assertion.
The independently valid narrow-shell correction does not resolve this popup failure.
Log: `/private/tmp/elsa-568-root-all-five-9cf43b4c.log`.
Exact-head CI37405108191 is terminal failed at the same selected-completion ratio0, with
the original4passing (6.2m). Static/full workspace units, three Workflows shuffle seeds,
lint/typecheck/bundles and generic Chromium pass, not the theme gate. Retained CI log:
`/private/tmp/elsa-568-root-ci-9cf43b4c-failure.log`. Canonical rebuilt budgets remain
primary127.44/127.50kB, stylesheet145.19/185kB, definitions379.97/384.50kB,
upgrades369.97/375.50kB, largest263.18/500kB, eight heavy surfaces deferred.

Fresh owned-host diagnosis reuses only that immediately preceding coherent build, not an
acceptance rebuild. Native caret is collapsed at offset24, x5.281/y486.281..503.281;
the actual code scroller is x0..365/y478.281..512.469 with scrollLeft198. The matched token's
start18 is x-41.547: horizontally clipped while the caret remains visible. The pinned
autocomplete6.20.3 anchors its tooltip at the minimum result.from; the pinned view correctly
hides that offscreen anchor at top-10000. Bottom panels start at y512.469, outside the physical
scroller, rather than covering this caret. This localizes the completion failure independently
of the earlier ancestor-height hypothesis. No source/authority data is logged, and temporary
geometry/no-build configuration are removed. Log:
`/private/tmp/elsa-568-root-liquid-anchor-geometry.log`. Correction and coherent acceptance
remain pending; no filtering/replacement/clipping assertion is relaxed.

### M4 T036 committed9041ad35 — completion visibility failure (not accepted)

Root commits/pushes `9041ad355dae29acafefa892d1dc5707e5471273`, including the scoped atomic
preview-color correction and independently reviewed long-source/scroller measurement fixes.
Complete CodeEditor112/112, changed CSS Stylelint, harness ESLint and diff check pass. A fresh
canonical coherent rebuild passes primary127.44/127.50kB, stylesheet145.19/185kB,
definitions379.97/384.50kB, upgrades369.97/375.50kB, largest263.18/500kB; eight heavy surfaces
remain deferred. Foundation stays immutable5cd44d63. Temporary diagnostics are removed before
this commit; Copilot is explicitly re-requested but actual review requests/reviews remain empty.

Canonical all-five finishes4pass/1fail in5.3m. The new theme case progresses through JavaScript
Light/Dark/Dim and Liquid Light preview, long-source native caret/scroll, signature and keyboard
hover checks. Liquid's selected completion is present but has native viewport-intersection
ratio0 for the full unchanged30s assertion. Root diagnoses actual popup bounds/clipping in a
fresh owned host pair reusing only this immediately preceding coherent build; diagnosis is
not acceptance. No visibility assertion is weakened or replaced with forced scrolling.
Log: `/private/tmp/elsa-568-root-all-five-9041ad35.log`. Exact-head CI37404019028 is terminal
failed with the same selected-completion ratio0 and original4passing (6.3m). Full workspace
units/three Workflows shuffle seeds/lint/typecheck/bundles and generic Chromium pass; these
do not accept the failed theme gate. CI log: `/private/tmp/elsa-568-root-ci-9041ad35-failure.log`.
T036 is open; T037 is unassigned; manual AT/human/delivery gates remain open, all PRs draft.

Fresh-host geometry confirms the selected popup is intentionally parked at top-10000, not
mispositioned by an ancestor transform (all are none). Actual editor y765.391..825.578;
inspector-tab-panel y780.391..804.391/clientHeight24/scrollTop56; its flex tab-panels height0;
inspector-content height73, inspector113, main frame318. The nominal horizontal navigation
strip still occupies486px because its nested navigation sections/children retain vertical
grid layouts. This is a real independent narrow-height defect and an upstream clipping
candidate, not yet a localized explanation for CodeMirror's hidden-anchor sentinel. Root
reads the pinned engine implementation: it compares the actual tooltip anchor with its own
code-scroller rect and window bounds, not directly with every inspector ancestor. Corrected
native viewport and popup proof remains required; no causal success is inferred from CSS.
A tests-first actual
one-row navigation assertion fails430px vertical link span against the largest actual link
height90.813 (+1px tolerance), preserving every existing real-Tab/full-viewport/link-order and
route-continuity assertion. Root takes the bounded existing narrow-layout correction, not
popup coordinates, hidden links, fixed dimensions or a redesigned workbench. Actual code
scroller readability also requires full native viewport intersection (rather than partial
line visibility). Logs: `/private/tmp/elsa-568-root-liquid-completion-geometry.log`,
`/private/tmp/elsa-568-root-horizontal-nav-row-red.log`. Temporary ancestor geometry is removed;
corrected canonical proof remains pending.

Root reviews the narrow-only14-line CSS correction: the sidebar aligns its strip contents,
navigation sections/groups/children become non-shrinking horizontal flex containers, and
heading/child block margins reset while existing inline grouping, gaps, all links, DOM order,
route handling, search and focus rules remain. Complete Web445/445 (36files), direct changed
app CSS Stylelint, harness ESLint and diff check pass. Log:
`/private/tmp/elsa-568-root-horizontal-strip-web-units.log`. No new build or host proof is yet
claimed; temporary no-build config and full ancestor geometry probe are removed before commit.

### M4 T036 scrollable-content boundary correction (not accepted)

At committed Studio `d4f4362fd26e9c111321eea95e9bc5650d157c99`, the canonical all-five
run passes the original four cases and progresses through JavaScript Light/Dark/Dim including
expanded/gutter contrast and multiline continuity. It fails in Liquid Light because the helper
compares the intrinsic single-line `.cm-content` box with the screen boundary. A fresh-host
diagnostic reusing that immediately preceding coherent build shows: content right399.734px;
actual editor/scroller/inspector left0/right365px on a390px screen; editor and inspector
scrollWidth/clientWidth365; scroller scrollWidth400/clientWidth365/overflow-x:hidden.
The viewport is clipped/contained, not a whole-editor or inspector overflow.

The harness now uses the code scroller's bounds only for `.cm-content`. All other surfaces keep
their actual bounds, text contrast remains measured on every actual text parent, and the existing
inspector/viewport containment checks remain. Overflowing source additionally requires an actual
clipping/scrolling policy and contained editor width. End/Home keyboard checks prove horizontal
scroll movement in both directions and visible collapsed carets at the exact source end/start;
source/persistence assertions remain exact. No production layout, assertion threshold, timeout
or forced scroll changes. Corrected proof remains pending. Logs:
`/private/tmp/elsa-568-root-all-five-d4f4362f.log`,
`/private/tmp/elsa-568-root-liquid-content-geometry.log`.

Exact-head CI37401854948 is terminal: full workspace units, three Workflows shuffle seeds,
lint/typecheck/bundles and generic Chromium pass. Normal hosts reproduce the same Liquid
content-box boundary failure (right406 vs390px screen), with the original four cases passing.
Retained log: `/private/tmp/elsa-568-root-ci-d4f4362f-failure.log`. This is not theme acceptance.

The first navigation diagnostic observes scrollLeft0 after End; it does not prove actual caret
movement. Its failure is retained at `/private/tmp/elsa-568-root-liquid-viewport-navigation.log`.
The independent source review recommends Home before End, then Home again, because a restored
caret may already be at the end. That sequence also observes scrollLeft0 and remains failed at
`/private/tmp/elsa-568-root-liquid-home-end-navigation.log`. Root is measuring native selection
offsets and bounded geometry before inferring a key or product defect. The check also asserts
exact editor source after navigation; no unsuccessful diagnostic is labeled passing.

The key-position diagnostic confirms the keys work: Home moves the native collapsed caret to
offset0/x16, End moves it to offset32/x265.719, both within the365px viewport. The short actual
text fits even though the logical content has a400px minimum width; it needs no scrolling.
Root replaces only the new case's Liquid string argument with genuinely long representative
source to prove horizontal navigation, keeping the actual append metadata/help and exact-source
checks. Temporary selection-offset/platform console diagnostics are removed. Log:
`/private/tmp/elsa-568-root-liquid-navigation-keys.log`. Long-source proof remains pending.

The first long-source diagnostic reaches a visible end caret and scrolls horizontally, then
fails the return-Home assertion: scrollLeft11 rather than exactly0. Requiring an exact native
padding offset is not the accessibility contract. The corrected check requires genuine
overflow, exact start/end native selection offsets, visible carets and scroll movement in
both directions, plus unchanged exact source. It cannot silently skip a non-overflowing
fixture. Log: `/private/tmp/elsa-568-root-long-liquid-navigation.log`. Proof remains pending.

The revised long-source navigation passes its actual start/end caret and bidirectional-scroll
assertions, then the Liquid Light completion readability path times out inside its combined
interaction/readability retry. The selected append completion is present in the native snapshot.
Root separates surface readability from the existing bounded hotkey retry so a geometry or
contrast failure is reported directly rather than hidden by that retry; thresholds and wait
limits are unchanged. Log: `/private/tmp/elsa-568-root-long-liquid-caret-boundaries.log`.

The next run catches a real theme-switch contrast dip in the static Liquid preview:
Light string foreground `[23,96,32]` on an intermediate surface `[187,190,196]` gives
4.129539:1, below4.5. The global button rule animates all properties for0.15s; static syntax
roles change immediately. An actual native computed-style red confirms the preview inherits
`transition-property:all; transition-duration:0.15s`. The bounded production correction makes
only this code-preview button's foreground/background change atomically (`transition:none`),
without palette changes, injected waits, global motion-policy changes or relaxed contrast.
The browser check now guards that invariant in all six language/appearance paths. Logs:
`/private/tmp/elsa-568-root-liquid-completion-readability.log`,
`/private/tmp/elsa-568-root-preview-transition-red.log`. Canonical corrected proof is pending.

### M4 T036 committed-head reconciliation — multiline journey correction (not accepted)

At Studio `966d823e2b50b09339c31e5be72152ff823e0e96`, local all-five actual-host
verification and CI37399634010 both pass the original four cases and fail only the added
theme case at line211. The newline is persisted exactly; the compact engine intentionally
opens the expanded editor when a newline is inserted. The test incorrectly presses Escape
on the now-unmounted compact editor. The correction asserts the actual expanded focus/source,
closes that dialog, and enters the unchanged multiline-preview Shift+Tab/Enter assertions
from the syntax control. It does not change production behavior, timeouts or source checks.
Logs: `/private/tmp/elsa-568-root-normal-host-all-five-966d823e.log`,
`/private/tmp/elsa-568-root-ci-966-failure.log`. Corrected actual-host proof is pending.

The next canonical theme run progresses through the corrected multiline journey and fails
Dark expanded-source continuity: actual function-token contrast4.364519 is below the unchanged
4.5 threshold. A fresh-host diagnostic reusing only that immediately preceding coherent build
confirms foreground `[168,193,255]` against composited background
`[73.2,83.46666666666667,91.46666666666667]`. Expanded-only `highlightActiveLine` retains
CodeMirror's light default `#cceeff44`; no Studio active-line/gutter overrides exist. This
is not a reason to lighten the syntax palette or lower the assertion. The bounded correction
maps active-line/gutter fills and gutter chrome to existing Studio semantic tokens; expanded
continuity also checks actual gutter text contrast. Logs:
`/private/tmp/elsa-568-root-multiline-canonical-fix.log`,
`/private/tmp/elsa-568-root-expanded-contrast-confirmation.log`.

An intervening diagnostic fails because `closeExpanded` deliberately restores the expand-button
focus on the next animation frame after the test focuses syntax. The test now awaits that actual
button focus before the syntax/Shift+Tab entry; it does not add sleep, force-click or retries.
That failed diagnostic is retained at `/private/tmp/elsa-568-root-expanded-contrast-diagnostic.log`.

Root reviews the11-line shared-CSS correction, gives its scoped selectors greater specificity
than the engine's base theme selectors, removes the diagnostic no-build configuration, and
passes the complete112-test/eight-file CodeEditor suite plus changed CSS Stylelint, harness
ESLint and diff check. Log: `/private/tmp/elsa-568-root-expanded-editor-units.log`.
Fresh canonical all-five actual-host and successor committed-head CI remain pending; these
source/static/unit checks alone do not accept the corrected theme gate.

Configured recursive workspace typecheck passes. Root CodeEditor112/112 and Web445/445 pass.
The complete local Workflows run reports1505pass/1fail in unchanged activity-definition
diagnostic navigation; it is retained as failed, not renamed green. The same case passes
unchanged in isolation, then its whole48-case file plus both new Escape cases passes50/50.
The machine reaches load248 on8cores during the complete local run. Exact-head CI37399634010
passes the full workspace units, all three Workflows shuffle seeds, lint/typecheck/bundles and
generic Chromium; its normal-host job fails as described above. These rechecks reconcile the
unit failure without claiming load as a proven cause. Logs:
`/private/tmp/elsa-568-root-responsive-workflows-units.log`,
`/private/tmp/elsa-568-root-authoring-recheck.log`,
`/private/tmp/elsa-568-root-authoring-whole-file-recheck.log`,
`/private/tmp/elsa-568-root-responsive-workspace-typecheck.log`.

Copilot was explicitly requested on966d823e; no actual review feedback or approval is visible.
T036 remains unaccepted/ReviewRequired/VerificationRunning; T037 is unassigned and current-head
manual AT, human acceptance and delivery remain open. All program PRs are draft/unmerged.

### M4 T036 canonical responsive run — further viewport precondition (not accepted)

The twenty-fourth canonical command rebuilds both actual hosts and passes unchanged budgets
(primary entry127.44/127.50kB, stylesheet144.88/185kB, definitions379.66/384.50kB,
upgrades369.66/375.50kB). With all diagnostic injection removed, actual keyboard traversal passes
every sidebar link's ratio1 assertion. The case reaches diagnostics without a preceding failure
in preview/editor focus, selection tokens, signature/hover/completion or consumed-Escape/maximize
checks. It then fails the diagnostic viewport precondition (ratio0): the static-flow diagnostic
is below the narrow inspector fold. Root adds only ordinary `scrollIntoViewIfNeeded` for that
surface before the same visibility, containment and contrast assertions. Floating help surfaces
still require actual in-view rendering without that scroll precondition. This is not all-theme
or T036 acceptance. Log: `/private/tmp/elsa-568-root-responsive-canonical-twentyfourth.log`.

An additional standalone Web-project TypeScript check, which is not the configured recursive CI
typecheck command, fails with diagnostics outside the changed focus handler (including the
unchanged PNG import, auth/Weaver mock types and React DOM vendor version declaration). That
extra check is not reported as green or used to widen this task into project-configuration work.
Log: `/private/tmp/elsa-568-root-web-responsive-typecheck.log`. At this earlier checkpoint,
configured workspace typecheck, complete affected suites, all-five rebuilt-host proof and
committed-head CI were pending; the later committed-head reconciliation above supersedes it.

Root restores the complete CodeEditor112/112 (eight files) and Web445/445 (36files) suites on
the correction tree with one worker; Workflows' full affected suite was still running. Logs:
`/private/tmp/elsa-568-root-responsive-editor-units.log`,
`/private/tmp/elsa-568-root-responsive-web-units.log`. These do not substitute for all-theme,
all-five normal-host, configured workspace typecheck or committed-head CI acceptance.

### M4 T036 responsive-strip review round (not accepted)

The twelfth canonical rebuilt-host run passes compilation and unchanged bundle budgets, then
fails the added navigation check before expression contrast. Fresh-host diagnostics13-19 reuse
those coherent application assets only for diagnosis. Font readiness, visible overflow, a
single-frame focus reveal and a fixed search width do not correct the movement and are rejected;
none is adopted in production. The nineteenth run records actual active-element/class and child
geometry: Search modules grows from70px to235px while its `flex-shrink` interpolates to0 through
the existing150ms `transition:all`, moving the focused Dashboard link fromx239.6875 tox404.6875
without sidebar scrolling. Logs: `/private/tmp/elsa-568-root-narrow-canonical-twelfth.log`,
`/private/tmp/elsa-568-root-nav-children-nineteenth.log`.

A twentieth diagnostic waiting for that actual computed CSS state confirms native Tab scrolls
Dashboard fully into view; it still fails at Modules (ratio0.6639702916145325), so it is not a
passing navigation or T036 gate. The responsive strip's existing non-shrink rule now limits
transitions to paint roles only (`background-color`, `color`, `border-color`, `box-shadow`),
retaining visual transitions while making flex geometry immediate. That correction still needs
canonical rebuilt-host proof. Temporary preconditions, geometry output and no-build configuration
must be removed before committed-head acceptance. No focus handler, forced scroll, changed
viewport ratio, budget or retention policy is adopted. T036 stays open; T037 is unassigned.
Log: `/private/tmp/elsa-568-root-settled-nav-twentieth.log`.

The twenty-first run separates the remaining Modules failure: x295.09375/width142.9375
extends48px outside the390px strip, while its y97.796875/height90.796875 is vertically visible.
Native Tab leaves it partially clipped. The twenty-second synchronous nearest-focus probe leaves
only0.03125px right-edge clipping because the browser scroll offset is integral. A shared-spacing
scroll gutter in the twenty-third probe passes every navigation link's unchanged ratio1 check,
then fails the expression viewport precondition: the selected property is below the inspector fold.
That is not a passing theme gate. The harness now uses the same ordinary property scroll action
already required later in the case before asserting its viewport presence.
Logs: `/private/tmp/elsa-568-root-modules-geometry-twentyfirst.log`,
`/private/tmp/elsa-568-root-full-focus-reveal-twentysecond.log`,
`/private/tmp/elsa-568-root-focus-gutter-twentythird.log`.

The actual shell focus handler is limited to horizontally overflowing, `:focus-visible`
HTMLElement targets and nearest/instant reveal; it does not click, prevent default, navigate or
touch authority. Responsive scroll padding uses the existing shared spacing token. Independent
source review finds no actionable defect. Root scoped ESLint passes with zero errors/five existing
App warnings; direct Stylelint of all three changed stylesheets and diff check pass. Temporary
CSS injection, focus handler, CSS-state wait, geometry output and no-build configuration are
removed from the test tree. Canonical rebuilt-host/current-head proof remains pending. Shared
machine load peaks above370 on8cores; any timing-shaped failure needs lower-load reconciliation.

### M4 T036 rejected reduced-build diagnostic

The eleventh local diagnostic passes scoped compilation/bundle checks but fails before expression
setup at the console-stream-ready precondition. Its reduced build order is incoherent: Web's
`vite.config.ts` uses `emptyOutDir:true` on the shared `wwwroot/studio` directory and was rebuilt
after Workflows, removing the independent module/vendor artifacts. The canonical recursive build
orders the host and module outputs coherently. This is rejected diagnostic setup, not product red
or a passing narrow/contrast gate. Logs: `/private/tmp/elsa-568-root-narrow-scoped-build.log`,
`/private/tmp/elsa-568-root-narrow-focused-eleventh.log`.
Root removes the temporary no-build diagnostic configuration and returns to the canonical rebuilt
host command. No build policy, assertion, timing or retention setting is changed.

### M4 T036 keyboard geometry and consumed-Escape checkpoint (not accepted)

The ninth canonical rebuilt-host run catches a horizontal navigation regression introduced by
retaining the strip: the Modules link is focused through actual Tab but only0.9761136770248413
of it is in view. The unchanged full-visibility check fails. The tenth local diagnostic reuses
the just-built applications (no rebuild, not acceptance evidence) with fresh owned hosts and
records only numeric/class geometry. The navigation column shrinks to72.609375px while its
link needs105px, and its right edge is clipped. The bounded next correction stops the horizontal
strip's direct children shrinking; it does not reduce the viewport ratio or force scrolling/clicks.
Logs: `/private/tmp/elsa-568-root-focus-ninth.log`,
`/private/tmp/elsa-568-root-nav-diagnostic-tenth.log`.

The corrected nested-control hook fixture now reproduces two real failures (palette and inspector)
when consumed Escape still restores the panel. Root adds only `!event.defaultPrevented` to the
existing global Escape condition; both tests pass, including fresh unconsumed outside Escape
restoring the panel. Scoped hook/test/harness ESLint passes. Logs:
`/private/tmp/elsa-568-root-panel-escape-focused-red.log`,
`/private/tmp/elsa-568-root-panel-escape-green.log`,
`/private/tmp/elsa-568-root-panel-escape-lint.log`.
Independent source review finds no focus-token ownership blocker; actual runtime contrast remains
pending. Custom textured/material surfaces and current-head manual AT are not proven by the
solid-background helper. Temporary diagnostic configuration/output must be removed before final
committed-head all-five rebuilt-host/CI acceptance. T036 remains open; all PRs draft/unmerged.

### M4 T036 opaque-focus red checkpoint (not accepted)

The eighth rebuilt-host run, after the one-line phone sidebar correction, passes actual390px
preview visibility, syntax and text contrast, then fails focused rich-editor outline contrast:
1.4246653928201924 against the unchanged3:1 requirement. Log:
`/private/tmp/elsa-568-root-narrow-shell-eighth.log`. Root adds central
`--studio-focus-strong` defaulting to opaque primary text and consumes it only in the existing
shared code input/preview focus rule, retaining2px solid/2px offset and the primary-text fallback.
The global soft chrome ring and its material/high-contrast recipes remain unchanged. Central
token documentation and Decision19 record the distinction. Scoped harness ESLint and direct
changed CSS/token Stylelint pass; actual rebuilt-host contrast/Escape proof remains pending.

The harness now also requires real Tab traversal from brand through Search modules and every
navigation link at390px, each fully in view without changing route, and retains inspector maximize
after consumed help/completion Escape. Temporary numeric geometry output is removed. A new owning
hook-test fixture initially imports CodeMirror without a Workflows direct dependency and fails to
load; that is rejected fixture setup, not behavioral red. The original1504 cases pass in that run,
but the overall suite fails. The fixture is being corrected without dependency or engine-coupling
changes. No complete affected-suite or T036 acceptance is claimed from that checkpoint.

### M4 T036 narrow-shell geometry red checkpoint (not accepted)

Hosted CI37393109900 at pushed `da83976b` passes full lint/typecheck/unit/shuffled/bundle
and generic Chromium. Its normal-host gate reproduces the new narrow preview failure while
all four original cases pass; it is not a passing theme gate. Local focused fourth/fifth runs
fail the explicit viewport precondition, including after the real Maximize inspector action.
The seventh rebuilt-host diagnostic also uses the existing Collapse bottom panel action and
records only bounded numeric geometry/computed styles, not authored source or authority data.
At390x844 the shell rows are804px/0px/40px; main-frame/content/workflow editor are all zero-height.
The phone sidebar's column override consumes the auto row and starves the workflow viewport.
Logs: `/private/tmp/elsa-568-root-theme-focused-fourth.log`,
`/private/tmp/elsa-568-root-theme-focused-fifth.log`,
`/private/tmp/elsa-568-root-theme-geometry-seventh.log`.

The next bounded correction preserves the already intended horizontal navigation strip below
640px instead of introducing a new responsive workbench. Root keeps actual inspector-maximize
and bottom-panel-collapse setup, viewport/contrast/focus/source/undo assertions and all budgets.
Temporary geometry output must be removed before final acceptance. Independent review, rebuilt
focused proof, final all-five committed-head normal-host and CI proof remain required. T036
stays open; T037 is unassigned; manual AT/human acceptance and delivery remain open. All PRs draft.

### M4 T036 viewport precondition checkpoint — committed `da83976b` (not accepted)

The third canonical rebuilt-host run gets past the actual theme control but the new case finds no
syntax spans after resizing to390px. The first normal-host case and initial desktop preview succeed;
the new case does not establish narrow contrast or focus acceptance. Log:
`/private/tmp/elsa-568-root-normal-host-third.log`. Offscreen preview work is deliberately cancelled,
so root adds ordinary `scrollIntoViewIfNeeded` plus an explicit `toBeInViewport` precondition before
checking narrow tokens. This is a visibility hypothesis until the focused actual-host run proves it,
not a claimed product fix or permission to bypass IntersectionObserver. No production changes,
forced click, reduced assertion or timing/budget change. Root narrows the next diagnostic run to the
new case; final all-five committed-head normal-host/CI proof still remains required.

### M4 T036 normal-host harness correction — packaging head `aa29c973` (not accepted)

The second canonical command rebuilds both applications successfully against the corrected tree,
then passes all four original cases. The new theme case fails before contrast measurement: the
existing bottom panel intercepts the shell's Colour mode control at390px. It is not a syntax-color
failure or a passing theme gate. The command begins before the source-equivalent `aa29c973` commit
is created; it does not substitute for committed-head CI. Owned hosts stop through fixture teardown.
Log: `/private/tmp/elsa-568-root-normal-host-second.log`.

Root corrects only the new harness: choose each mode through its actual desktop UI, then shrink to
390px before every preview/editor/help/diagnostic/selection and narrow expanded measurement.
No forced click, shell change, assertion removal or timing/budget/retention relaxation. The shell's
phone-width colour-control overlap remains outside this task and is not claimed fixed. Independent
browser review also adds a real keyboard-focused multiline preview control: exact persisted source,
no editor mount, actual `:focus-visible` outline/contrast, Enter expansion and source restoration.
Scoped browser ESLint, five-case discovery and diff check pass. Corrected real-host/CI proof remains
pending; T036 is unchecked and T037 unassigned. Manual AT and human acceptance remain open.
Independent final harness-delta review finds no remaining material defect; it is source review only.
Root restored full CodeEditor112/112 and package build/typecheck pass at committed `aa29c973`.
Logs: `/private/tmp/elsa-568-root-editor-deferred-restored-final.log`,
`/private/tmp/elsa-568-root-deferred-restored-typecheck.log`,
`/private/tmp/elsa-568-root-theme-harness-correction-lint.log`,
`/private/tmp/elsa-568-root-theme-harness-correction-list.log`.

### M4 T036 packaging correction checkpoint — Studio #568 / draft #569 (not accepted)

The initial integrated head `08d1b31c1fe5e6152c26252eb1dab1bb502fa69e` passes root
CodeEditor108, JavaScript15, Liquid25 and Workflows1504, configured workspace typecheck,
full lint (zero errors,48 existing warnings) and app-token Stylelint. Its canonical rebuilt-host
command stops before browser execution: the unchanged primary Workflows budget is129.93/127.50kB.
CI37390942400 confirms failed lint/typecheck/bundle and normal-host jobs; generic Chromium passes.
These are rejected checkpoints, not theme/contrast acceptance.

Root moves only the static preview presentation into a lazy leaf. The eager shell retains the
same button, focus, current escaped plaintext and authorization boundary, including a failed-chunk
fallback. Existing session listeners are grouped without changing order or handlers, the existing
restoration event is shared privately, duplicate guidance/session/multiline calculations are
reused, and stable diagnostic priority is preserved without copying/sorting. No public SDK/wire,
JSON consumer, authority policy, source wording or bundle threshold changes.
Independent production review finds no remaining actionable finding. The presentation leaf may
load for any mounted compact preview, including JSON/offscreen; the language parser/highlighter
still loads only for a supported, bounded, actually visible preview. No editor session is created.

The scoped rebuilt bundle passes at127.44/127.50kB, definitions379.63/384.50kB,
upgrades369.63/375.50kB, stylesheet144.85/185kB and largest chunk263.18/500kB.
Root complete CodeEditor112/112 in eight files, package typecheck/build and scoped ESLint pass;
new controls cover stable diagnostic priority and presentation-chunk failure with current escaped
source, stationary focused button and revocation. The lazy fallback's initial TypeScript mismatch
is corrected before the passing typecheck. Removing only the late parsed-result guard again
fails all six old-source/URI/version/session/language/offscreen controls after the lazy correction;
the guard is restored. Logs: `/private/tmp/elsa-568-root-deferred-preview-bundle-fourth.log`,
`/private/tmp/elsa-568-root-editor-deferred-final.log`,
`/private/tmp/elsa-568-root-deferred-typecheck.log`,
`/private/tmp/elsa-568-root-deferred-lint.log`,
`/private/tmp/elsa-568-root-deferred-stale-guard-red.log`.

The corrected canonical rebuilt-host run, exact-head CI and final browser interaction review remain
pending. T036 is unchecked; T037 is not assigned. All PRs remain draft/unmerged, and current-head
manual AT, human acceptance and delivery remain open.

### M4 T036 readiness/red checkpoint — Studio #568, 2026-10-06 (not accepted)

Root integration starts at `69ee8e08` (spec reconciliation only; production remains473cf1a9).
The new actual-host Light/Dark/Dim/narrow journey fails on the unchanged implementation exactly
at the missing collapsed JavaScript `studio-code-token-*` span. Both hosts are rebuilt and their
owned processes stop after the failure. Log: `/private/tmp/elsa-568-root-theme-browser-red.log`.
The preceding setup-only invocation with missing node_modules is not feature red evidence;
frozen offline installation succeeds without dependency changes before the real red run.

The final test adds actual Colour mode controls, lazy first-preview/no rich mount, keyboard
activation, actual-text-parent foreground contrast on composited backgrounds, nonzero/contrasting
focus outline, property-pane containment, version-matched hover/catalog help, diagnostics,
actual native select-all with readable computed `::selection` colors that exactly match shared
accent/on-fill tokens, single undo restoring exact persisted source and shared compact/expanded continuity. Independent
harness review catches a diagnostic-container false-positive; root changes measurement to every
actual text parent's foreground and adds focus/pane checks. Final source re-review finds no
material test defect. That review is not runtime proof. Scoped browser ESLint and diff check pass.
The final selection review's possible browser-default false-positive is closed by normalizing
the pseudo colors and central token values through the same canvas and comparing their RGBA bytes.
Existing M3 assertions, bundle/timing budgets and trace/screenshot/video policies are unchanged.

The isolated presentation writer owns unit tests-first implementation. Final integrated browser,
affected complete suites, exact-head CI/review, manual AT and human acceptance remain pending;
T036 is unchecked and all PRs remain draft/unmerged. T037 refinement is separate, not an assigned
formatter implementation or new dependency adoption.

### Final M3 automated gate — Studio #560/#561 and Foundation #2379, 2026-10-06

Final integrated Studio `473cf1a9f9622c5abd3091b846e91037e7da55c6` (draft#565,
stacked on baseline `5ac5d71de80aa27ef6ed71bb0c3bae6fe003b6fd`, draft#562) pairs with
Foundation `5cd44d6312d9de85b13f4619fc7aa972a557d033` (draft#2380).
Root rebuilt normal hosts pass4/4 in3.2 minutes, including actual Liquid output-member help,
compact/expanded mid-token filter/tag application, signatures, explicit interpolation,
exact persisted source and undo, JavaScript help, activity-definition editing and independent
missing-editor/provider controls. No assertion, timing budget or retained-source policy was relaxed.
Log: `/private/tmp/elsa-561-root-normal-host-third.log`.

Studio CI37384606857 passes all three jobs at exact473cf: lint/typecheck, complete/shuffled
units, client builds and unchanged bundle budgets; generic Chromium; rebuilt paired normal hosts.
Baseline Studio CI37377085581 also passes all three jobs at exact5ac5d7. Foundation CI37376029424
and Maps37376054285 pass at exact5cd44d. Root Foundation scopes pass catalog27, Expressions236,
Design534, DesignAPI143, Publishing714, Jint126 and architecture17; authenticated rebuilt
Workbench3 and freshly rebuilt Debug JavaScript REST10 pass. Full local architecture is not
claimed: its full hosted gate passes. REST log: `/private/tmp/elsa-2379-root-rest-accessor-final.log`.

Root complete CodeEditor93/93, Liquid25/25, JavaScript15/15, CodeEditor typecheck/build,
scoped ESLint and diff checks pass. Removing the mid-token authoritative-ownership guard makes
the local-completion suffix control fail1/1 (the authoritative collision control still passes).
Root restores the guard, verifies the production diff is empty, and reruns all93 successfully.
Logs: `/private/tmp/elsa-565-root-midtoken-ownership-red.log`,
`/private/tmp/elsa-565-root-editor-ownership-restored-final.log`. Earlier red controls and paired-host
failures below are historical diagnostic checkpoints, not current failures or accepted heads.

Independent restored/final production and browser-harness review finds no actionable remaining
finding. Copilot CLI requests return success, but GitHub reports no current-head review or review
request for any M3 draft; this is not external approval. The documented unavailable-external-review
fallback applies only after the local, independent and hosted gates above pass. Last actual Copilot
reviews belong to predecessor M2 heads, not this pair. The automated M3 dependency is satisfied;
current-head manual AT, human acceptance and delivery remain open. All PRs stay draft/unmerged.

M4 Task#568 / Decision19 owns T036 on this immutable baseline; T037/T038 remain separate open gates.

### M3 Liquid mid-token completion correction — Studio #561, 2026-10-06

Integrated `b6fd1ca3e4b73cf514d43601adc0686bd9b6b5e2` fixes the missing activity-output
member: root rebuilt normal hosts now pass3/4, but the expanded depth case exposes a separate
compact `upXX` mid-token completion failure. Exact-head CI37383110522 reproduces the same
1 failure/3 passing controls; its full/shuffled units, lint/typecheck, bundle gate and generic
Chromium pass. Revision-matched successful rich catalog traffic is retained without source or
search text. Neither passing units nor the earlier member correction accepts this head.

Root reproduces the filter gap in a real CodeMirror test before changing production: the old
test's completion label matched the complete token and hid the defect. CodeMirror filters against
the result's full from/to range, so `upXX` suppresses `upcase` even though the cursor prefix is `up`.
The adapter now filters at the cursor and applies the parser's complete replacement span through
plain/snippet application. Mid-token results requery on every document edit rather than reuse
position-dependent closures. Independent review identifies that only explicitly ranged authoritative
items should own suffix replacement; root scopes application accordingly and adds mixed-source
controls for local prefix insertion and authoritative collision precedence. Ordinary completion
filtering and JavaScript local-help merging remain intact. No provider, SDK, wire, dependency,
authority, browser assertion or timing change.

Root complete CodeEditor passes93/93, including filter/tag mid-token acceptance, exact source and
selection undo, snippet tab stops and fresh queries after typing inside a token. Re-enabling cached
result reuse makes the new query-freshness control fail1/1; the guard is restored and all93 pass.
Complete Liquid25/25 and JavaScript15/15, CodeEditor typecheck/build and scoped ESLint pass.
The initial package-filter invocation for
Liquid/JavaScript matches no projects and is not passing evidence.
Logs: `/private/tmp/elsa-565-root-midtoken-filter-red.log`,
`/private/tmp/elsa-565-root-midtoken-reuse-guard-red.log`,
`/private/tmp/elsa-565-root-editor-midtoken-final.log`,
`/private/tmp/elsa-565-root-midtoken-typecheck.log`,
`/private/tmp/elsa-565-root-midtoken-lint.log`,
`/private/tmp/elsa-565-root-liquid-midtoken-final.log`,
`/private/tmp/elsa-565-root-js-midtoken-final.log`,
`/private/tmp/elsa-561-root-normal-host-second.log`; value-free traffic:
`/private/tmp/elsa-565-root-midtoken-failure-safe-traffic.json`.

Corrected exact-head independent review, rebuilt paired hosts and full CI remain pending.
M3/M4, manual AT and human acceptance remain open. All program PRs remain draft and unmerged.

### M3 Liquid member-projection correction — Studio #561, 2026-10-06

The previous integrated head's missing `Line` completion reproduces locally in the rebuilt
normal-host suite: the same two Liquid cases fail and the two controls pass in 19.3 minutes under
high shared-machine load. Its value-free traffic confirms a successful, document/context-matched
rich catalog response. Independent source review confirms that Foundation emits authorized
activity outputs as dotted names such as `predecessor.Line`; the rich transport preserves those
names, but the new Liquid path did not normalize their hierarchy. Trailing-dot classification was
already correct. A retained tests-first projection run fails on the real flattened output shape.

Root completes the dirty correction after the delegated writer stops on a model-capacity error;
there is no accepted final worker handoff. The bounded correction normalizes catalog and context
value names and shape members into at most four path segments, keeps filters/tags out of the value
tree, merges queried shape facts ahead of missing flattened metadata, and retains the actual member
name plus runtime documentation for hover. Duplicate context/output entries, catalog-only values,
same-name variable/filter separation, exact hover ranges, runtime shape-ID precedence and bounded
dotted shapes have controls. Root shares output fixtures and removes an unnecessary reverse-copy.
No producer, SDK, wire, dependency, runtime, theme or formatter change is introduced.

Root complete CodeEditor passes88/88, complete Liquid passes25/25 (projection21 and module4),
CodeEditor typecheck/build and scoped ESLint pass. Returning flattened children after a failed
parent-shape lookup makes exactly five authority controls fail; the guard is restored and the
complete Liquid suite passes again. The initial unnecessary-escape lint error is corrected, not
counted as a pass. Independent restored-production-delta review finds no actionable correctness
or security issue; this is source review, not external approval.

Root commits the correction at worker `f162c0a6a98cc6d28171b972d14e1f8f565f1df8` and integrates it
as `29e6adeb1916198bba7488b6e36cf91c7c79b796`. A complete CodeEditor/Liquid source comparison is
byte-identical after integration. Logs: `/private/tmp/elsa-565-liquid-projection-red.log`,
`/private/tmp/elsa-565-root-editor-correction-final.log`,
`/private/tmp/elsa-565-root-liquid-correction-final.log`,
`/private/tmp/elsa-565-root-shape-guard-red.log` and
`/private/tmp/elsa-561-root-normal-host-first.log`.

The corrected integrated paired browser and exact-head CI pass the original member gap but fail
1/4 at the subsequent mid-token filter case, documented above. The candidate is not accepted by
scoped units or source review. M3, M4, manual AT, human acceptance and delivery remain open;
all PRs stay draft and unmerged.

### M3 Liquid integration candidate — Studio #561, 2026-10-05

Root integrates bounded worker `855e7b115177e8dcc45de8acfc11a4ee6f271f78` on the corrected
Studio#560 branch, retaining immutable producer `5cd44d6312d9de85b13f4619fc7aa972a557d033`.
The worker changes only Liquid projection/module/tests and internal CodeEditor lazy parser,
plain cursor/range/snippet mapping/tests/exports. No SDK, wire, dependency, theme or formatter
change. Independent exact-commit source review finds no actionable remaining issue; root reviews
the implementation and integration delta separately.

Worker focused cursor/CodeMirror mapping tests pass10/10 and Liquid projection passes12/12;
CodeEditor typecheck/build and Liquid Vite build pass. Real CodeMirror tests prove full mid-token
replacement, snippet tab stops and exact source/selection undo. Bounded/deep/computed paths,
quiet strings/raw/comments, unavailable shapes, real delayed cancellation and source-version
non-mutation, failed rich outcomes and supported-empty filter/tag help have retained controls.
The builtin `if` operand regression fails before the parsed-child correction: `customer` is
misclassified as a tag range including the trim marker. The restored parser-based fix keeps
tag-name bounds and value arguments distinct. That red output is retained in the worker transcript,
not an on-disk log file. An earlier undo-test import error is corrected, not a product-failure claim.

Root extends the normal-host browser with compact single-line and expanded multiline Liquid
filter/tag replacement, exact literal source plus authenticated accepted/undo readback, explicit
interpolation snippets, exact append documentation/signature and interaction-local catalog-request
revision evidence. Safe traffic stores only a paging classification, not search text or source.
Independent harness review finds no material blocker. At exact Studio
`b58d55c0ceaac425e0b3e32d84db6ce93c477e59`,
[CI37378068886](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37378068886)
passes configured lint/typecheck, full/shuffled units, all client builds, unchanged bundle budgets
and generic Chromium. Paired normal hosts fail 2/4: existing Liquid `predecessor.` member completion
does not show the discovered runtime output. Activity Definition and missing-Liquid-provider cases
pass. Root local integrated CodeEditor passes87/87 and rebuilt authenticated Foundation host
passes3/3; those do not supersede the browser failure. Root is reproducing with rebuilt hosts while
the bounded worker adds parser/projection regressions. No assertion, authority boundary or timing
limit is relaxed. The new Liquid depth assertions remain unaccepted. Worker/scoped/predecessor
checks do not accept the candidate. All PRs remain draft/unmerged; M3, M4, manual AT and human
acceptance stay open.

### M3 accessor policy correction — Studio #560, 2026-10-05

Independent review finds the fixed `getVariable` accessor was synthesized after common profile
policy filtering in both producer and consumer. Retained failing controls reproduce denied
reinsertion, missing-binding leakage and lost approved metadata. The correction keeps only the
authorized declared candidate and omits it without visible bindings. A variable literally named
`variable` cannot restore a denied accessor under a generated getter ID or duplicate an approved
one; the reserved-name controls fail before correction. Complete JavaScript tests pass 15/15,
and independent exact-delta review finds no actionable remaining issue.

The immutable CI producer pin advances to Foundation `5cd44d6312d9de85b13f4619fc7aa972a557d033`.
Its corrected-tree catalog27/27, Expressions236/236, Design534/534, DesignAPI143/143,
PublishingAPI714/714, Jint126/126, scopedArchitecture17/17 and unchanged map freshness pass.
Runtime grants, SDK, wire and dependencies are unchanged. Exact Foundation5cd44d63 passes full
[CI37376029424](https://github.com/elsa-workflows/elsa-foundation/actions/runs/37376029424),
[Maps37376054285](https://github.com/elsa-workflows/elsa-foundation/actions/runs/37376054285)
and root rebuilt authenticated Workbench3/3. Root also rebuilds Debug with locked restore and
passes fresh isolated SQLite JavaScript REST10/10, stopping only its owned server. Evidence:
`/private/tmp/elsa-2379-root-debug-accessor-final.log` and
`/private/tmp/elsa-2379-root-rest-accessor-final.log`. Corrected Studio
`5ac5d71de80aa27ef6ed71bb0c3bae6fe003b6fd` passes all three jobs in
[CI37377085581](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37377085581),
including rebuilt paired normal hosts against Foundation5cd. This green baseline pair does not
accept the subsequent Liquid candidate; its paired-host failure is recorded above.

Predecessor Studio `8ab8fced71095b085e592442c65d01c143649f37` passes all three jobs in
[CI 37147792665](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37147792665),
including paired normal-host Chromium against predecessor Foundation58238b86. That producer
passes fullCI37147080477 on one failed-job retry and Maps37147082366. These historical green
heads do not accept the correction or Liquid Task#561. Copilot has no actual M3 review at the
restart checkpoint. All PRs remain draft/unmerged; M3, human and manual AT acceptance stay open.

### M3 baseline implementation checkpoint — Studio #560, 2026-10-03

The isolated candidate implements rich catalog transport through the existing context relation,
exact-identity shape retention and authorization/cancellation guards, expression-only local and
bounded const-object member sources, safe explicit expression templates and full callable lookup.
Runtime metadata wins completion collisions. Structured signature parameters and return-shape IDs
remain available to the internal presentation contract; no SDK/wire field or dependency is added.

Root checks pass CodeEditor 77/77 (including compact and expanded real CodeMirror merge tests),
JavaScript module 10/10 and full Workflows 1,504/1,504, including the complete 101-symbol paging and
supported-empty regression. Workspace typecheck and full repository lint pass (zero errors,
48 existing warnings). A controlled removal of the local source fails exactly three
positive local/member/sibling-scope cases (28/31 pass); a controlled removal of language-owned
callable lookup fails five signature/non-code cases (5/10 pass). Both controls are restored before
integration. Transport's original rich-response, shape, malformed/revision and delayed-cancel tests
also failed against the predecessor implementation. Logs are retained locally under
`/private/tmp/elsa-560-root-*.log`.

Independent read-only review covers catalog paging/lifetime, expression-local merging and full
callable-name safety. It identifies the structured-parameter mismatch, now corrected, and reports
no remaining concrete blocker in the reviewed areas. The bare JavaScript-module `tsc --noEmit`
command remains non-green: all 17 current diagnostics reproduce against clean Studio `ecc3edee`
with the same frozen dependency installation (missing React/JSX declarations and a pre-existing
SDK-versus-neutral result-state mismatch). The newly introduced parameter-shape mismatch is
corrected and does not appear in the final run. This extra command is not a passing gate and
is separate from the successful configured workspace typecheck.

Foundation #2379's reviewed root checkpoint `58238b8678dce6dc3dc7510d88c630d106892393`
is the immutable CI producer pin. Its corrected local affected suites, scoped architecture/maps,
real authenticated Workbench 3/3 and fresh SQLite JavaScript REST 10/10 pass; full local Architecture
is not claimed. Independent browser-test review catches a substring assertion that could confuse
local `customer` with backend `customerName`; the new browser helper now requires exact completion
labels. Rebuilt paired browser, final-head CI/review and manual assistive-technology acceptance remain
pending. T032/T034 are not yet checked complete; all PRs remain draft/unmerged.

The final canonical command `ELSA_FOUNDATION_WORKTREE=/private/tmp/elsa-2379-foundation pnpm
test:browser:expression-normal-host` passes all four Chromium scenarios in 2.8 minutes against
immutable Foundation `58238b8678dce6dc3dc7510d88c630d106892393`. It rebuilds both actual hosts and
all client packages serially, uses fresh SQLite and real authentication, and tears down only its
owned processes. The persisted workflow now proves exact parameter/local/member completion entries
and real `abs(x): Number` signature help in both compact and expanded editors, alongside existing
scope, hover, validation, Activity Definition readback and missing-module/provider controls.
Zero-console-error and exact persisted-source/fresh-revision checks remain intact. Evidence:
`/private/tmp/elsa-560-root-normal-host-third.log`.

The first paired attempt stops before browser execution on an unsupported test-only completion
kind; corrected CodeEditor build and all 77 tests pass. The second run has one pass and three
failures because the safe traffic fixture drops actual uppercase64-hex profile-composed revisions.
The final fixture retains only bounded32/64-hex revisions, preserving every identity/freshness
assertion. This fixes evidence collection, not the API or runtime. Serial clients and Studio Release
builds pass; unchanged bundle budgets pass (entry127.47/127.50kB, Definitions376.92/384.50kB,
upgrades366.93/375.50kB). Final committed-head CI/review, Liquid consumer T033 and current-head
manual assistive-technology/human acceptance remain separate outstanding gates.

### M3 optional service spike exit, 2026-10-03

Root reviews the isolated prototype based on Studio `00677684dcd32d5152f16df5b5fafd644df85d9a` and Foundation profile `7457b7a4564892bab4b28bd0d07fac9709462d56`, then independently runs `node tools/prototypes/javascript-service-spike/run.mjs` in `/private/tmp/elsa-553-worker.3l1Jcr`. The final rebuilt Chromium scenario passes 1/1 in 6.1 seconds with Node 25.8.0, TypeScript 5.9.3, Vite 7.3.5, Playwright 1.61.1 and Chromium 149.0.7827.55. Root log: `/private/tmp/elsa-553-root-spike-final.log`; runner log: `/private/tmp/elsa-553-worker-evidence-S9IpPO/run.log`. Prototype source and raw evidence are retained locally, not shipped in this docs change.

| Adoption gate | Actual evidence | Decision boundary |
|---|---|---|
| Runtime declarations | Curated manual fixture, `noLib`/`noResolve`, actual `Classic` enum, two virtual files, closed resolver hooks, no forbidden declarations or `Math.random`, zero unmapped reads in tested inputs | Pass for the bounded fixture only; no generated/custom-host parity or authored-import proof |
| Worker and cancellation | Real browser Worker, cancellation before analysis and synthetic in-flight stale-result rejection | Partial/unproved: no interruption of synchronous TypeScript analysis |
| Lazy loading and bundles | Worker loads only after prototype activation; emitted worker is 3,593,746 raw / 1,028,419 gzip bytes | Scratch application of unchanged 500,000-byte chunk ceiling fails; no shipping integration pass |
| Completion/accessibility | Nested/local-object members, callback quick info, callable signature and browser keyboard filtering/acceptance | Real screen-reader and current expression-only normal-host non-regression remain unproved |
| Disable/fallback | Baseline completions continue; source and cursor are exact after disabling | Pass for this synthetic fixture; no undo or persisted-workflow acceptance inferred |

The unchanged production command `pnpm check:bundle:workflows` passes in the worker worktree: entry 127.47/127.50 kB, Definitions total 376.92/384.50 kB, upgrades total 366.93/375.50 kB, largest existing chunk 263.18/500.00 kB. Root verifies that the scratch checker is byte-identical to the production checker (SHA-256 `a3d29de448835168b722362fd59815814188befee7cafc819144df6049bfabd0`) and its manifest changes no baseline entry, adding only the actual worker as a deferred entry. After rebuilding the corrected final prototype asset, root runs `node /private/tmp/elsa-553-workflows-gate-scratch-hczwsL/src/essentials/Elsa.Studio.Workflows/Client/scripts/check-bundle-size.mjs`; it exits 1 with only the 3,593.75/500.00 kB worker-chunk overage, retaining every baseline budget. Final log: `/private/tmp/elsa-553-root-scratch-gate-final.log`. This is checker/asset evidence, not a production integration or CI failure.

Earlier wrong language-service offsets and nonexistent `ModuleResolutionKind.None` labeling are corrected before the final root rerun. A separate synthetic `import("node:fs")` query times out after 30 seconds; it is not in the passing scenario, its cause is not inferred, and authored-import behavior stays unproved. No authored source is evaluated; only synthetic data is used. No prototype dependency, production file, lockfile, SDK or wire field is adopted. Decision 16 rejects the candidate because not every binary gate passes. T035's technical decision permits baseline M3 refinement; it is not M3 completion, final assistive-technology acceptance or delivery.

### M2 final exact-head automated gate, 2026-10-03

Studio `00677684dcd32d5152f16df5b5fafd644df85d9a` passes every job in [CI 37138361061](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37138361061), including generic Chromium 67/67 and rebuilt normal-host Chromium 4/4 against its immutable Foundation pin `7457b7a4564892bab4b28bd0d07fac9709462d56`. Foundation passes [full CI 37137966461](https://github.com/elsa-workflows/elsa-foundation/actions/runs/37137966461), including all selected EF suites, full Architecture and Core-only gates, plus [Maps 37137968339](https://github.com/elsa-workflows/elsa-foundation/actions/runs/37137968339).

Root independently runs `ELSA_FOUNDATION_WORKTREE=/private/tmp/elsa-2351-foundation pnpm test:browser:expression-normal-host` against these final heads and passes 4/4 in 2.8 minutes after rebuilding both applications. Actual authentication, isolated fresh SQLite, persisted exact-source/fresh-revision assertions, negative composition controls and owned teardown remain intact. Evidence is retained at `/private/tmp/elsa-552-root-normal-host-final.log`. Final producer local suites, real Workbench 3/3 and fresh JavaScript REST 10/10 are recorded in the next checkpoint. Full local Architecture is not claimed separately from the hosted full gate.

Copilot's last actual reviewed heads remain Studio `54fceb950e29d9f09d667bcb809aae4a73b0a9ac` (review 5401220606) and Foundation `59ef03004cb514520686de00467a425e340b11aa` (review 5401237320). Findings are corrected; final-head re-review requests still produce no new start/current-head review event. Root reviews the precise subsequent deltas: Studio test assertions, controlled stale-loader regression, popover sequencing harness, immutable producer pins and evidence; Foundation provider proof boundaries, native-error attribution guards, regression/real-host coverage and evidence. Final independent producer delta review is clean. This documented review plus complete final gates exercises the program-lead unavailable-review fallback, not Copilot or other external approval.

The automated M2 dependency is satisfied. Studio #553's subsequent disposable language-service spike rejects the current candidate under the five binary Decision 16 gates, as recorded above; no prototype code or dependency ships. M3 production leaves remain open for baseline-path refinement and implementation; M4 remains Not Ready. Human acceptance, current-head manual assistive-technology evidence, arbitrary Foundation-main compatibility, merges and delivery remain unclaimed. Earlier pending/failing checkpoints below are historical, not current gate state.

### M2 final immutable producer correction, 2026-10-03

Predecessor Studio `d2d4f4cd00c6e7ca93fc86e159841097292d902c` passes every job in [CI 37133114873](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37133114873), including generic Chromium 67/67 and paired normal-host 4/4 against Foundation `99a28c7ff63b8748550ade79dab0fcff7acf0350`. The browser focus synchronization is test-only; all original assertions remain intact and no production focus fix is claimed.

The immutable producer pin now advances to Foundation `7457b7a4564892bab4b28bd0d07fac9709462d56`. Independent and root reviews close absent-root optional-typeof, literal/coalescing, composed-fact retention, primitive-member and mutable-intrinsic identity findings. Root producer checks pass Expressions 218/218, Jint 126/126, Design 507/507, Design API 142/142, Publishing API 714/714, scoped Architecture 17/17, map freshness, rebuilt authenticated Workbench 3/3 and fresh Debug JavaScript REST 10/10. Runtime grants and actual evaluation are unchanged; the classifier preserves native errors when intrinsic identity is uncertain.

This Studio delta changes only the producer pin and verification record, not editor production code, SDK, persisted contracts or dependencies. Its rebuilt paired browser and exact-head full CI remain pending at this checkpoint. Predecessor results are not acceptance of the new pair. Copilot re-review requests have not produced a new work-start event/current-head review after a reasonable window; independent/root review is not Copilot approval. M2 remains open until the corrected pair passes; M3/M4 remain Not Ready here. No current-head manual assistive-technology pass, human acceptance or merge is claimed.

### M2 browser sequencing correction, 2026-10-03

At Studio `3c37b4869e034548a538830d9160bcfe08c5a2d3`, [CI 37131596196](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37131596196) passes lint/typecheck and the dedicated rebuilt normal-host Chromium job against Foundation `99a28c7ff63b8748550ade79dab0fcff7acf0350`, but its generic browser job fails one of 67 cases at the expression syntax popover keyboard reopening assertion. Root reproduces the same failure in four of 30 focused repetitions across both themes.

Syntax selection intentionally focuses the new editor synchronously and again on the row's requested animation frame. The test starts its next independent trigger-key interaction before that focus handoff finishes. Waiting only for initial textbox focus still fails two of 60 repetitions. The shared test helper now verifies textbox focus, crosses two animation frames, and verifies focus again before proceeding; there is no wall-clock sleep, retry, production change, or weakened keyboard assertion. All 60 focused repetitions and the full 67-case Chromium suite pass, as do scoped ESLint and diff review. Root reviews a bounded read-only worker assessment. This proves the scenario after transition completion, not rapid user input during the transition or a production focus fix.

The upcoming committed head requires fresh full CI. Copilot re-review requests through REST, GraphQL bot review requests and the documented CLI return success but produce no new work-start event or current-head review; this is not external approval. M2 remains open, M3/M4 remain Not Ready, and all PRs remain draft and unmerged.

### M2 first review correction, 2026-10-03

Studio `54fceb950e29d9f09d667bcb809aae4a73b0a9ac` passes all jobs in [CI 37129335170](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37129335170), including the normal-host job pinned to Foundation `59ef03004cb514520686de00467a425e340b11aa`. Copilot review 5401220606 identifies one valid test gap: the sequential profile-switch test cannot detect an out-of-order language load. This predecessor CI is not acceptance of the corrective commit.

A controlled loader regression starts expression and program loads without settling the first, confirms the compact editor reuses the same `EditorView`, resolves the program load first and then the stale expression load, and verifies that the active grammar remains `Script`, source is exact and diagnostics remain current. Removing only the generation guard makes the test fail because `SingleExpression` replaces `Script`; the guard is restored. The first expanded-editor variant did not discriminate because cleanup destroyed the old view, so that variant is not used as adverse proof. Root reviews the final test and the complete CodeEditor suite passes 65/65, with package typecheck, scoped lint and diff check passing. No production implementation or dependency changes are needed for this finding.

Foundation's four diagnostic findings are corrected at `99a28c7ff63b8748550ade79dab0fcff7acf0350`, which is now the immutable CI producer pin. Root complete Foundation suites pass Expressions 168/168, Jint 92/92, Design 507/507, Design API 142/142, Publishing API 714/714, scoped Architecture 17/17 and map freshness. At 14:58 UTC the canonical paired command rebuilds both Release hosts and serial clients and passes all four Chromium cases in 2.9 minutes against that producer, retaining exact persisted source, fresh revision correlation, real authentication, fresh SQLite, zero console errors and owned teardown. New exact-head CI/review remains pending after the coordinated corrective commits. M2 remains open and M3/M4 remain Not Ready; no merge or human acceptance is claimed.

### M2 reviewed local candidate, 2026-10-03

Branch `codex/552-javascript-expression-conformance` is based on reviewed M1 `c9479fba`, paired with Foundation's local `claude/2352-javascript-runtime-conformance` branch. Only the JavaScript ExpressionEditor adapter opts into the internal single-expression grammar profile. General-purpose JavaScript/TypeScript/JSX editors retain the existing program grammar and statement completion sources. No engine-specific type enters the Studio SDK or persisted expression document. Profile changes preserve source and undo while stale asynchronous language loads are rejected.

- CodeEditor passes 64/64, including 21 parser/profile tests, incomplete-source recovery, valid function-body returns, TypeScript/JSX/statement rejection, property-name false positives, program-editor preservation and source/undo continuity. JavaScript and Liquid module suites pass 4/4 each.
- The existing installed-syntax readiness matrix passes 122/122, covering missing adapters/providers, permission/session revocation, incompatible contract ranges, canceled/stale results, syntax switching and independent language composition. Orchestration/transport passes 25/25, and the complete Workflows suite passes 1,489/1,489 across 116 files. These are component/contract-layer edge cases, not claims of live role changes in the browser.
- Workspace typecheck and full lint pass (zero errors, 48 existing warnings). Both source-built Release hosts and serial client builds pass. Unchanged bundle budgets pass: entry 127.47/127.50 kB, Definitions 376.92/384.50 kB and upgrades 366.93/375.50 kB.
- The canonical rebuilt paired-host Chromium command passes 4/4 in 3.2 minutes. The persisted workflow checks unsupported TypeScript, JSX and top-level declarations in compact mode, blocked ambient access in expanded mode, and recovery to a valid Math/JSON function expression in both sizes. Existing Activity Definition, missing-editor and missing-provider controls remain green. Exact source is saved/read back and assistance is correlated to fresh post-save revisions; real authentication, fresh SQLite, zero console errors and owned teardown are retained.
- The first extended browser run passed three cases but its new recovery assertion incorrectly required a diagnostics panel to exist after all diagnostics disappeared. The assertion now checks that no matching diagnostic panel remains; the real backend SupportedEmpty recovery and exact persisted source requirements are unchanged. The full rebuilt rerun passes.
- Temporarily disabling the expression grammar causes seven of the 21 parser/profile cases to fail; the profile is restored and the full 64-case CodeEditor suite passes.
- After Foundation's final runtime error-attribution correction, root reviews the producer diff, its complete Jint suite passes 80/80, and the canonical paired command rebuilds both hosts and clients again and passes all four browser cases in 2.4 minutes. This final candidate run retains zero console errors, real authentication, fresh SQLite and owned teardown.

These are reviewed local candidate-tree checks. Exact committed-head CI and Copilot review remain pending. M2 is not accepted or shipped; no current-head manual assistive-technology pass or M3/M4 completion is claimed.

### M1 exact-head automated gate, 2026-10-03

Studio `c9479fba29613b6c58335c05e1d26fb40a51514e` passes all jobs in [CI 37123111128](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37123111128), including static/unit/bundle checks, the existing Chromium browser suite and the paired source-built normal-host suite, 4/4 against Foundation `f81be4beed6973378eb678b2327d789c19d8095e`. Exact-head Copilot 5400803545 reports no actionable findings; all M1 review threads are resolved. Root local Workflows passes 1,489/1,489 and the rebuilt paired browser passes 4/4, with real authentication, fresh SQLite, zero console errors and owned teardown. Null preservation is separately proved by adapter/API round trips, not a new live null scenario.

Paired Foundation has green [CI 37116214636](https://github.com/elsa-workflows/elsa-foundation/actions/runs/37116214636), full hosted Architecture, [Maps 37116216477](https://github.com/elsa-workflows/elsa-foundation/actions/runs/37116216477), and no Copilot findings in review 5400291420. Root local persisted-host 3/3, Design API 142/142, composition 11/11 and JavaScript REST e2e 10/10 pass. The full local Architecture attempt was not green because unrelated full-tree/Debug restore prerequisites were absent; the hosted gate passes instead.

This closes the automated T026-T029 dependency and unblocks M2. It does not prove arbitrary main compatibility, M2-M4 completion, current-head manual assistive-technology acceptance, final human acceptance or delivery. PR #557 and Foundation #2373 remain draft and unmerged. Earlier checkpoints below retain their historical failures and pending states.

### Program #2310 implementation checkpoint, 2026-10-03

On `claude/551-expression-normal-host`, with draft PR #557 stacked on Program #2310 planning revision `24a937bf3f271a201fbbc18809a54dd9d15c4e51`:

- `activityPropertyGroups.test.tsx`: 112 passing tests, including independent editor/provider readiness, global and scoped authorization invalidation, fresh-context confirmation, stale-result rejection, authored Liquid editing when its runtime descriptor is absent, synchronous/asynchronous descriptor faults, unrelated-row render isolation, expanded-only text editors, absent tooling clients, and structured-editor status isolation. The three activity-expression orchestration tests also passed (115 focused tests in total).
- Root review corrected the render-isolation fixture to count only the unrelated row. A same-task uncommitted focus/blur sequence failed once and passed on rerun; the fixture now explicitly commits focus before testing blur. All three orchestration tests passed again with the immediate-validation and zero-pending-timer assertions retained.
- JavaScript and Liquid module tests: four passing tests each.
- Shared SDK-typed result factories corrected widened string literals and an incomplete capabilities object in test mocks. The current Workflows typecheck, scoped ESLint, and `git diff --check` pass. The complete affected Workflows suite passes 1,458 tests across 116 files; the older baseline failures below did not reproduce. A temporary revert of the three readiness corrections failed all three targeted regressions; the corrected production code was restored before the passing focused/full runs.
- The real-host audit exposed a production transport mismatch: Foundation v1 serializes tooling state, symbol kind, value kind, and diagnostic severity as enum ordinals, while Studio previously accepted only string names. Studio now maps the explicit v1 ordinals and retains support for named enums; unknown/fractional state ordinals remain incompatible and data-free. New transport regressions failed before the correction (7 failures), then all 22 transport cases passed with typecheck/scoped lint. The complete affected Workflows suite passes 1,470 tests across 116 files after this correction, and the production build/bundle gate passes with the budgets listed below.
- Normal-host lifecycle tests: five passed. Playwright collection: four real-host scenarios discovered, covering workflows, Activity Definitions, missing JavaScript editor, and missing Liquid provider.
- The full serial client build (`pnpm -r --workspace-concurrency=1 build`) and scoped Studio .NET Release build passed. The Workflows production build/bundle gate passed again after readiness review fixes: entry 127.43 kB / 127.50 kB, Definitions total 375.87 kB / 384.50 kB, upgrades total 366.89 kB / 375.50 kB.
- The browser scenarios now use version/node identity and fresh persisted reads instead of display-label selectors or a disabled save action. Each JavaScript/Liquid compact and expanded completion, hover, and validation phase must correlate a fresh successful context and assistance response at the exact draft/node/property and an advanced document revision. Validation also requires the actual provider diagnostic code in the response and editor UI. Hotkeys retry against the result rather than racing context refresh. The independent remaining language in each removal control exercises all assistance operations. Scoped browser lint and four-scenario collection passed; actual host execution remains pending.
- A dedicated correctness job in the existing CI runs the unchanged normal-host command against Studio's tested head and immutable paired Foundation revision `f81be4beed6973378eb678b2327d789c19d8095e`. It builds both applications from source and preserves fresh SQLite, real authentication, provider/editor removal controls, owned teardown, and trace-free failure reporting. It does not replace the existing synthetic browser or static/unit gates. At `8de41473`, CI [37099572230](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37099572230) passed static/unit/bundle and existing Chromium browser jobs; the new normal-host job failed on Foundation `e780a86a`'s outdated create-status assertion before browser execution. The pin is advanced to the corrected Foundation revision; exact paired execution remains pending. This proves only the tested pair, not arbitrary Foundation main; advance the pin to Foundation #2373's merged SHA and rerun before claiming compatibility with main.

These are partial checks, not T029 acceptance. No current-head normal-host browser case or current-head manual assistive-technology run has passed yet. Foundation's exact `8c588ebac` CI [37103917688](https://github.com/elsa-workflows/elsa-foundation/actions/runs/37103917688) and Maps [37103919244](https://github.com/elsa-workflows/elsa-foundation/actions/runs/37103919244) pass, with no Copilot findings; local host/composition runs pass 2/2 and 11/11. The prior `b08679a4` Core-only disposed-SQLite-handle failure did not reproduce, without a repair or causal inference. The Studio seed fixture now asserts the endpoint's actual HTTP 200 response. The first source-built local browser run reached the apps but failed all four scenarios at incorrect `/studio/workflows/...` fixture routes; the registered `/workflows/...` paths and root login return URL are corrected, and a canonical rebuilt rerun is pending. Earlier local host readiness timed out under shared-machine load above 700. All milestone checkboxes remain open.

### Latest corrective iteration, 2026-10-03

- The real Studio path renews its bearer token for every backend call. Foundation now excludes only rotating token-instance metadata from permission revision hashing, preserving substantive authorization claims and validation. Its real persisted-host fresh-bearer regression failed with `Stale` before the fix and passes with both controls afterward (3/3). Exact Foundation `f81be4beed6973378eb678b2327d789c19d8095e` has green full [CI37116214636](https://github.com/elsa-workflows/elsa-foundation/actions/runs/37116214636), [Maps37116216477](https://github.com/elsa-workflows/elsa-foundation/actions/runs/37116216477), and Copilot review5400291420 with no findings. Local Design API142/142, scoped composition11/11, and the existing backend JavaScript REST suite10/10 pass. The full local Architecture attempt remains non-green because unrelated full-tree/Debug restore prerequisites are absent; the hosted Architecture gate passes.
- CodeMirror's real interaction guard rejects immediate completion acceptance. Enter now keeps a selected or pending completion active instead of expanding compact mode; expanded mode retains ordinary Enter/newline behavior without a completion. Four new regressions failed before the correction, then the full affected CodeEditor suite passed41/41. No interaction-delay override is introduced.
- Activity Definition graph writes bypassed the canonical input wire conversion, and reads bypassed editor hydration. The API facade now reuses the workflow conversion in both directions for `elsa.activity-graph` only, preserving foreign/redacted providers, unknown fields, conversion metadata, nested nodes, and layout. Three regressions failed before the correction and the focused API file passes6/6. The existing create-authoring assertion now checks canonical input/output arrays, not obsolete empty objects.
- The real expanded editor exposed a second Escape handler: CodeMirror dismissed hover help, then the outer dialog also closed. The dialog now respects `defaultPrevented`. The new regression fails before the change and passes afterward with all three dialog-focus tests, including ordinary dialog dismissal and focus restoration. Shared fixture teardown avoids leaking roots after failed assertions.
- Root review passes all 1,474 Workflows tests across 116 files, the final workspace typecheck, full repository lint (zero errors, 48 warnings), scoped editor/workflow/browser lint, and `git diff --check`. JavaScript and Liquid module tests pass 4/4 each; owned-host lifecycle tests pass 5/5. Rebuilt serial client and Studio .NET Release builds pass; Workflows bundles remain within the unchanged budgets (entry 127.43/127.50 kB, Definitions 376.84/384.50 kB, upgrades 366.89/375.50 kB).
- The browser gate now synchronizes on the exact saved source and matching post-save context/validation, correlates the latest context rather than any older success, selects the discovered output through real keyboard navigation, and selects the reloaded Activity Definition node through its actual keyboard-accessible graph surface. Authenticated readback is shared, restricted to the owned backend, and emits neither tokens nor source-bearing request traces. The latest completed all-four run passes the Activity Definition canonical save/read/reload case and missing-JavaScript-editor control; the other two reach successful expression assertions but fail the final zero-console-error check on background first-use preferences or stream startup cancellation. Source and safe owned-origin traffic identify the preferences 404 as the documented absent-record contract, not a missing route.
- The fixture logs in through the real form with the permitted local `/health/ready` return path, creates ordinary default Dashboard/Attention preferences through the authenticated API for its explicit Studio host ID before first app navigation, then waits for the real console stream to connect. No console error is ignored, feature disabled, route mocked, or authentication policy relaxed. An earlier absolute Foundation return URL was sanitized to `/` by the normal redirect policy; that superseded run failed its navigation wait and was stopped with owned teardown verified.
- At 11:33 UTC, `ELSA_FOUNDATION_WORKTREE=/private/tmp/elsa-2351-foundation pnpm test:browser:expression-normal-host` passes all four cases in Chromium (Playwright 1.61.1): persisted workflow JavaScript/Liquid completion, hover and provider diagnostics in both sizes; Activity Definition canonical save/read/reload; missing JavaScript editor with full remaining Liquid assistance; and missing Liquid provider with full remaining JavaScript assistance. Every final console-error assertion passes. The command rebuilds both hosts and serial client packages, uses fresh SQLite and real authentication, and tears down only its owned processes. This is reviewed local candidate-tree evidence against exact Foundation `f81be4beed6973378eb678b2327d789c19d8095e`; exact committed Studio-head CI and the next Copilot review remain pending. No M1 acceptance or current-head assistive-technology pass is claimed.

### Clean-runner dependency correction, 2026-10-03

Studio `f93c2f3e67210433ffcfccf3ff6a4e77b18396dd` [CI 37120125882](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37120125882) passes full lint/typecheck/units/shuffled Workflows/bundle budgets and the existing Chromium browser suite. Its paired normal-host job passes Foundation's persisted-host tests and rebuild, then fails before any browser case at Studio restore: `NU1603`, because `ConsoleLogStreaming.AspNetCore 1.0.0-preview.13` is absent from the configured public feeds. The local preview cache masked this prerequisite.

The central pin is corrected to published `1.1.0`. Its package provenance commit `d85097bf260dcc73bb84e93e81dcc10597deac0c` contains preview commit `0b35593c2a867799703978722e02cf82ffb498e4` plus additive release changes; no warning, feed, or authentication gate is relaxed. With `NUGET_PACKAGES` pointed at a newly created empty isolated cache, `dotnet test tests/Elsa.Studio.Tests/Elsa.Studio.Tests.csproj -c Release --filter 'FullyQualifiedName~ConsoleStream|FullyQualifiedName~PacedConsoleLogProvider|FullyQualifiedName~WebHostShellFeatureDiscovery'` restores, builds and passes 26/26, including hosting, pacing and the long-polling adverse control. The canonical rebuilt four-case browser rerun passes 4/4 again at 11:48 UTC, with zero console errors and owned teardown verified. Copilot review `5400582285` identifies the same restore blocker; its underlying finding is addressed by the central pin correction rather than a new warning exception. M1 remains open until the corrected committed-head CI and review pass.

### Provider readiness review correction, 2026-10-03

Exact Studio `14084a5b5a45a3e1dec0ff15860cdf78b1324ce0` [CI 37120902090](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37120902090) passes every job, including hosted paired normal-host browser 4/4 against Foundation `f81be4beed6973378eb678b2327d789c19d8095e`. Copilot review `5400624292` has a Findings: None headline but two actionable body findings; both are accepted, so that headline is not treated as clean-review acceptance.

Provider readiness now checks each descriptor's inclusive contract range against Studio client major v1. A provider-only v2/v0, reversed or fractional range is incompatible without disabling source editing or changing the other language's readiness. A settled canceled descriptor result with a non-aborted signal is unavailable, not an indefinitely pending checking state. Shared fixtures now satisfy the complete SDK client/descriptor shape, including capabilities.

Four new regressions fail before correction; the other 1,477 Workflows tests pass in that run. After correction and expanded range coverage, focused property tests pass 122/122, and root verification passes all 1,484 Workflows tests across 116 files, workspace typecheck, full repository lint (zero errors, 48 warnings), scoped lint and diff review/check. At 12:09 UTC the canonical rebuilt normal-host browser passes 4/4 again in 2.6 minutes, with zero console errors, fresh SQLite, real authentication and owned teardown. Both Release host builds and serial client builds pass; unchanged bundle budgets pass (entry 127.43/127.50 kB, Definitions 376.86/384.50 kB, upgrades 366.89/375.50 kB). These are reviewed candidate-tree results; the corrected committed-head CI and next Copilot review remain pending. M1 and subsequent milestones remain open; no merge or current-head assistive-technology acceptance is claimed.

### Null-preserving persisted-input correction, 2026-10-03

Exact Studio `70396345fddde4f8900436e18e69dc05719e36f4` [CI 37122025732](https://github.com/elsa-workflows/elsa-foundation-studio/actions/runs/37122025732) passes every job, including hosted paired browser 4/4 against unchanged Foundation f81. Copilot `5400715328`, inline `4173122281`, identifies a real data-loss path: shared hydration replaces explicit Literal null with an empty string; a subsequent Activity Definition save then writes the changed value. The finding is accepted, so the green predecessor CI is not M1 acceptance.

The shared adapter now defaults only undefined to an empty string and preserves null. Serialization already preserves null and is unchanged. The null regression fails before correction at both the wire and Activity Definition API boundaries. Shared table coverage protects null, undefined, false, zero and empty-string behavior; actual facade GET-read and save-response hydration followed by a layout-only save both preserve root and nested null inputs. Existing foreign/redacted providers, conversion, extras and layout assertions remain intact. Focused suites pass 42/42; root full Workflows suite passes 1,489/1,489 across 116 files. The first workspace typecheck exposed a test-only optional-payload/request-shape mismatch; the fixture explicitly reuses its asserted hydrated payload and final full workspace typecheck passes. Final full lint passes with zero errors and 48 warnings; scoped lint and diff review/check pass.

At 12:29 UTC the canonical rebuilt normal-host browser passes 4/4 again in 2.4 minutes, zero console errors and owned teardown. Both Release hosts and serial clients build; unchanged bundle gates pass (entry 127.43/127.50 kB, Definitions 376.88/384.50 kB, upgrades 366.89/375.50 kB). Null preservation itself is proved by the adapter/API round-trip regressions, not a new live null scenario. These are reviewed candidate-tree results; corrected committed-head CI and re-review remain pending. M1 remains open, M2 implementation remains blocked, and both PRs stay draft/no merge.

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

## Historical repository-baseline failures

The historical baseline complete Workflows Vitest suite reported 1,059 passing and three failures that reproduced outside this feature:

- unsupported-root category copy expects `Primitives`;
- the older-response browse-location test reaches its five-second timeout;
- the empty-folder focus-restoration test observes no focused parent.

The current complete Workflows suite passes 1,470 tests and none of these failures reproduced. The historical complete Foundation architecture suite passed all 320 tests; current-head architecture proof is tracked separately above.

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

## Historical manual assistive-technology evidence — 2026-07-28, not current-head acceptance

The production fixture was exercised in Google Chrome and Safari with macOS VoiceOver enabled. Both runs confirmed:

- the compact and expanded editors expose stable JavaScript text-entry names and discoverable keyboard instructions;
- `formatTotal(value)` signature help, the named completion collection, keyboard hover documentation, and `BROWSER001` diagnostics are present in the accessibility tree;
- Tab indents while editing, Escape then Tab leaves compact editing, and Control-M then Tab leaves expanded editing for the conversion control;
- the compact-to-expanded transition preserves source and focuses the expanded expression;
- unavailable tooling leaves the expression editable and exposes “JavaScript code intelligence is unavailable. Syntax highlighting remains active.”

The first manual pass caught a macOS-specific mismatch: the announced Control-M route was bound to `Mod-m`, which maps to Command-M on macOS. The binding was corrected to `Ctrl-m`, covered by a focused regression test, rebuilt, and repeated successfully in both browsers. VoiceOver was restored to its original off state after acceptance.
