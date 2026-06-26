import { forwardRef as Y, createElement as L, useState as h, useMemo as I, useCallback as ae, useEffect as M } from "react";
var P = { exports: {} }, S = {};
var U;
function oe() {
  if (U) return S;
  U = 1;
  var e = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.fragment");
  function r(n, o, i) {
    var l = null;
    if (i !== void 0 && (l = "" + i), o.key !== void 0 && (l = "" + o.key), "key" in o) {
      i = {};
      for (var v in o)
        v !== "key" && (i[v] = o[v]);
    } else i = o;
    return o = i.ref, {
      $$typeof: e,
      type: n,
      key: l,
      ref: o !== void 0 ? o : null,
      props: i
    };
  }
  return S.Fragment = t, S.jsx = r, S.jsxs = r, S;
}
var B;
function ie() {
  return B || (B = 1, P.exports = oe()), P.exports;
}
var s = ie();
const ce = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Z = (...e) => e.filter((t, r, n) => !!t && t.trim() !== "" && n.indexOf(t) === r).join(" ").trim();
var de = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const le = Y(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: n,
    className: o = "",
    children: i,
    iconNode: l,
    ...v
  }, x) => L(
    "svg",
    {
      ref: x,
      ...de,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: n ? Number(r) * 24 / Number(t) : r,
      className: Z("lucide", o),
      ...v
    },
    [
      ...l.map(([f, u]) => L(f, u)),
      ...Array.isArray(i) ? i : [i]
    ]
  )
);
const R = (e, t) => {
  const r = Y(
    ({ className: n, ...o }, i) => L(le, {
      ref: i,
      iconNode: t,
      className: Z(`lucide-${ce(e)}`, n),
      ...o
    })
  );
  return r.displayName = `${e}`, r;
};
const ue = R("Bot", [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
]);
const pe = R("MessageSquare", [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
]);
const ve = R("RefreshCcw", [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }]
]);
const he = R("Send", [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
]);
async function fe(e) {
  const t = E(await e.http.getJson("/_elsa/agent/bootstrap"));
  return be(t);
}
async function me(e, t) {
  const r = E(await e.http.getJson("/_elsa/agent/bootstrap"));
  return we(r, t);
}
async function ge(e, t, r) {
  const n = E(await e.http.getJson("/_elsa/agent/bootstrap")), o = t.agent || n.providers.find((b) => b.isAvailable)?.providerId, i = t.conversationId || await ye(e, o);
  await e.http.postJson(`/_elsa/agent/sessions/${encodeURIComponent(i)}/messages`, {
    role: "user",
    content: t.message,
    message: t.message,
    mode: "explain",
    contextAttachments: (t.attachments ?? []).map(ke)
  });
  const l = await fetch(new URL(`/_elsa/agent/sessions/${encodeURIComponent(i)}/stream`, e.baseUrl).toString(), xe(e.headers, {
    headers: { Accept: "text/event-stream" }
  }));
  if (!l.ok)
    throw new Error(await l.text() || `Weaver chat failed with ${l.status}.`);
  if (!l.body)
    return;
  const v = l.body.getReader(), x = new TextDecoder();
  let f = "";
  for (; ; ) {
    const { value: b, done: j } = await v.read();
    if (j) break;
    f += x.decode(b, { stream: !0 });
    const w = f.split(`

`);
    f = w.pop() ?? "";
    for (const m of w) {
      const y = F(m);
      y && r({ ...y, conversationId: y.conversationId || i });
    }
  }
  const u = F(f);
  u && r({ ...u, conversationId: u.conversationId || i });
}
function F(e) {
  const t = e.split(`
`).map((r) => r.trim()).find((r) => r.startsWith("data:"));
  return t ? je(JSON.parse(t.slice(5).trim())) : null;
}
function xe(e, t = {}) {
  if (!e) return t;
  const r = new Headers(e);
  return new Headers(t.headers).forEach((n, o) => r.set(o, n)), { ...t, headers: r };
}
function E(e) {
  if (e.error) throw new Error(e.error.message || e.error.code || "Weaver request failed.");
  if (e.data === void 0 || e.data === null) throw new Error("Weaver backend returned an empty response.");
  return e.data;
}
function be(e) {
  const r = (e.providers ?? []).filter((n) => n.isAvailable);
  return {
    streaming: e.enabled !== !1 && e.providerStatus !== "unavailable" && r.length > 0,
    conversationPersistence: !0,
    proposalReview: e.policy?.requiresApprovalForMutations ?? (e.capabilities ?? []).some((n) => n.requiresApproval || n.risk === "review-required"),
    supportedAttachmentKinds: ["workflow.definition", "workflow.instance", "studio.context"],
    agents: r.map((n) => ({
      name: n.providerId,
      displayName: n.providerId,
      description: n.status ?? "Weaver provider"
    }))
  };
}
function we(e, t) {
  return (e.providers ?? []).filter((n) => n.isAvailable && (!t || n.providerId === t)).flatMap((n) => (n.supportedOperations ?? []).map((o) => ({
    name: `${n.providerId}.${o}`,
    displayName: H(o),
    description: `${H(o)} support exposed by ${n.providerId}.`,
    mutability: o === "chat" || o === "streaming" ? "read-only" : "proposal",
    dangerLevel: n.riskProfile === "privileged-execution" ? "high" : "low",
    permissions: [],
    agentScopes: [n.providerId],
    isEnabled: !0
  })));
}
async function ye(e, t) {
  const r = E(await e.http.postJson("/_elsa/agent/sessions", {
    conversationId: "weaver-chat",
    ...t ? { providerId: t } : {},
    mode: "explain",
    activeSurface: { route: "/weaver" },
    clientContext: { studioVersion: "studio", sdkVersion: "studio", moduleIds: ["Elsa.Studio.Weaver.Chat"] },
    metadata: { route: "/weaver", source: "weaver-chat" }
  })), n = r.sessionId ?? r.id;
  if (!n) throw new Error("Weaver backend did not return an agent session.");
  return n;
}
function ke(e) {
  return {
    id: e.id ?? `${e.kind}:${e.referenceId ?? e.scope ?? "context"}`,
    kind: e.kind,
    displayName: e.kind,
    sensitivity: "public",
    summary: e.referenceId ?? e.scope ?? e.kind,
    references: {
      source: e.kind,
      sourceId: e.referenceId ?? "",
      scope: e.scope ?? ""
    },
    metadata: e.metadata ?? {}
  };
}
function je(e) {
  if (!e || typeof e != "object") return null;
  const t = e, r = C(t, "type") ?? C(t, "kind"), n = Ie(r), o = V(t, "error"), i = V(t, "data"), l = k(t, "content") ?? k(i, "content") ?? k(o, "message") ?? "";
  return n === "assistant.delta" ? q("assistant.delta", t, { content: l }) : n === "conversation.error" ? q("conversation.error", t, { content: l || "Weaver is unavailable for this request." }) : n === "conversation.completed" ? q("conversation.completed", t, {}) : n === "conversation.started" ? null : e;
}
function q(e, t, r) {
  return {
    type: e,
    conversationId: k(t, "conversationId") ?? "",
    sequence: Number(C(t, "sequence") ?? 0),
    timestamp: k(t, "timestamp") ?? k(t, "createdAt") ?? (/* @__PURE__ */ new Date()).toISOString(),
    data: r
  };
}
function Ie(e) {
  if (typeof e == "number")
    return ["conversation.started", "assistant.delta", "tool.approval", "proposal.created", "conversation.completed", "conversation.error"][e] ?? "";
  const t = String(e ?? "").replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  return t === "message-delta" ? "assistant.delta" : t === "completed" ? "conversation.completed" : t === "error" ? "conversation.error" : String(e ?? "");
}
function H(e) {
  return e.replace(/[-_.]+/g, " ").replace(/\b\w/g, (t) => t.toUpperCase());
}
function k(e, t) {
  const r = C(e, t);
  return typeof r == "string" ? r : void 0;
}
function V(e, t) {
  const r = C(e, t);
  return r && typeof r == "object" ? r : void 0;
}
function C(e, t) {
  if (!e) return;
  if (t in e) return e[t];
  const r = t.toLowerCase(), n = Object.keys(e).find((o) => o.toLowerCase() === r);
  return n ? e[n] : void 0;
}
const W = /* @__PURE__ */ new Set(), _ = [];
let Se = 0;
function $e(e) {
  e.navigation.add({
    id: "weaver",
    label: "Weaver",
    path: "/weaver",
    order: 30,
    iconColor: "#2563eb"
  }), e.routes.add({
    id: "weaver-chat",
    path: "/weaver",
    label: "Weaver",
    component: () => /* @__PURE__ */ s.jsx(Q, { api: e, variant: "route" })
  }), e.panels.add({
    id: "weaver-chat",
    title: "Weaver",
    order: 40,
    component: () => /* @__PURE__ */ s.jsx(Q, { api: e, variant: "panel" })
  }), e.ai.surfaces.add({
    id: "weaver-chat",
    title: "Weaver chat",
    placement: "panel",
    moduleId: "Elsa.Studio.Weaver.Chat"
  }), e.ai.onPrompt((t) => We(t));
}
function Q({ api: e, variant: t }) {
  const [r, n] = h("loading"), [o, i] = h(null), [l, v] = h([]), [x, f] = h([]), [u, b] = h([]), [j, w] = h(""), [m, y] = h(""), [G, X] = h(null), [g, z] = h("idle"), [J, A] = h(""), K = I(() => e.ai.promptActions.list(), [e]), ee = I(() => e.ai.contextProviders.list(), [e]), te = I(() => e.ai.proposalRenderers.list(), [e]), re = I(() => e.ai.surfaces.list(), [e]), se = I(
    () => u.flatMap((a) => a.attachments ?? []).slice(0, 8),
    [u]
  ), $ = ae(async () => {
    n("loading"), A("");
    try {
      const a = await fe(e.backend);
      i(a), y((d) => d || a.agents[0]?.name || ""), n(a.streaming ? "ready" : "unavailable"), a.streaming && v(await me(e.backend, m || a.agents[0]?.name));
    } catch (a) {
      i(null), v([]), n("unavailable"), A(a instanceof Error ? a.message : String(a));
    }
  }, [e.backend, m]);
  M(() => {
    $();
  }, [$]), M(() => {
    const a = (d) => {
      b((p) => [...p, d]), d.mode === "steer" && w(d.message);
    };
    if (W.add(a), _.length > 0) {
      const d = _.splice(0);
      for (const p of d)
        a(p);
    }
    return () => {
      W.delete(a);
    };
  }, []), M(() => {
    if (r !== "ready" || g !== "idle") return;
    const a = u.find((d) => d.mode !== "steer");
    a && O(a);
  }, [r, g, u]);
  async function D(a) {
    const d = a.message.trim();
    if (!d || r !== "ready" || g === "streaming") return;
    const p = T("assistant");
    z("streaming"), A(""), w(""), f((c) => [
      ...c,
      { id: T("user"), role: "user", content: d },
      { id: p, role: "assistant", content: "" }
    ]);
    try {
      await ge(e.backend, {
        conversationId: G,
        message: d,
        agent: a.agent ?? m,
        attachments: a.attachments
      }, (c) => {
        c.conversationId && X(c.conversationId), (c.type === "assistant.delta" && typeof c.data.content == "string" || c.type === "conversation.error" && typeof c.data.content == "string") && N(p, c.data.content);
      });
    } catch (c) {
      A(c instanceof Error ? c.message : String(c)), N(p, "Weaver is unavailable for this request.");
    } finally {
      z("idle");
    }
  }
  function N(a, d) {
    f((p) => p.map((c) => c.id === a ? { ...c, content: `${c.content}${d}` } : c));
  }
  function O(a) {
    b((d) => d.filter((p) => p.id !== a.id)), D(a);
  }
  function ne() {
    D({ message: j, agent: m || null, mode: "enqueue" });
  }
  return /* @__PURE__ */ s.jsxs("section", { className: t === "panel" ? "weaver-surface panel" : "weaver-surface", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "weaver-header", children: [
      /* @__PURE__ */ s.jsxs("div", { children: [
        /* @__PURE__ */ s.jsx("h2", { children: "Weaver" }),
        /* @__PURE__ */ s.jsx("p", { children: Re(r, o) })
      ] }),
      /* @__PURE__ */ s.jsx("button", { type: "button", className: "weaver-icon-button", "aria-label": "Refresh Weaver capabilities", title: "Refresh", onClick: () => {
        $();
      }, children: /* @__PURE__ */ s.jsx(ve, { size: 15 }) })
    ] }),
    J ? /* @__PURE__ */ s.jsx("div", { className: "weaver-alert", children: J }) : null,
    /* @__PURE__ */ s.jsxs("div", { className: "weaver-layout", children: [
      /* @__PURE__ */ s.jsxs("aside", { className: "weaver-sidebar", children: [
        /* @__PURE__ */ s.jsxs("label", { className: "weaver-field", children: [
          /* @__PURE__ */ s.jsx("span", { children: "Agent" }),
          /* @__PURE__ */ s.jsx("select", { value: m, onChange: (a) => y(a.target.value), disabled: r !== "ready", children: o?.agents.length ? o.agents.map((a) => /* @__PURE__ */ s.jsx("option", { value: a.name, children: a.displayName || a.name }, a.name)) : /* @__PURE__ */ s.jsx("option", { value: "", children: "No agent" }) })
        ] }),
        /* @__PURE__ */ s.jsx(Ce, { attachments: se }),
        /* @__PURE__ */ s.jsx(
          Ae,
          {
            promptActions: K.length,
            contextProviders: ee.length,
            proposalRenderers: te.length,
            surfaces: re.length,
            tools: l.length
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("main", { className: "weaver-chat", children: [
        /* @__PURE__ */ s.jsx("div", { className: "weaver-messages", "aria-live": "polite", children: x.length === 0 ? /* @__PURE__ */ s.jsxs("div", { className: "weaver-empty", children: [
          /* @__PURE__ */ s.jsx(ue, { size: 24 }),
          /* @__PURE__ */ s.jsx("strong", { children: "Ask Weaver about the current Studio context." }),
          /* @__PURE__ */ s.jsx("span", { children: "Workflow modules and third-party modules can attach resources, tools, and proposals when their Weaver features are enabled." })
        ] }) : x.map((a) => /* @__PURE__ */ s.jsxs("article", { className: `weaver-message ${a.role}`, children: [
          /* @__PURE__ */ s.jsx("span", { children: a.role === "user" ? "You" : "Weaver" }),
          /* @__PURE__ */ s.jsx("p", { children: a.content || (g === "streaming" && a.role === "assistant" ? "Thinking..." : "") })
        ] }, a.id)) }),
        u.length > 0 ? /* @__PURE__ */ s.jsx("div", { className: "weaver-queue", "aria-label": "Queued Weaver prompts", children: u.map((a) => /* @__PURE__ */ s.jsxs("button", { type: "button", onClick: () => O(a), disabled: g === "streaming" || r !== "ready", children: [
          /* @__PURE__ */ s.jsx(pe, { size: 13 }),
          /* @__PURE__ */ s.jsx("span", { children: a.source?.label ?? a.message })
        ] }, a.id)) }) : null,
        /* @__PURE__ */ s.jsxs("div", { className: "weaver-composer", children: [
          /* @__PURE__ */ s.jsx(
            "textarea",
            {
              "aria-label": "Prompt Weaver",
              placeholder: r === "ready" ? "Ask Weaver..." : "Weaver backend is unavailable",
              value: j,
              onChange: (a) => w(a.target.value),
              disabled: r !== "ready",
              rows: t === "panel" ? 2 : 3
            }
          ),
          /* @__PURE__ */ s.jsxs("button", { type: "button", onClick: ne, disabled: !j.trim() || r !== "ready" || g === "streaming", children: [
            /* @__PURE__ */ s.jsx(he, { size: 15 }),
            g === "streaming" ? "Streaming" : "Send"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Ce({ attachments: e }) {
  return /* @__PURE__ */ s.jsxs("section", { className: "weaver-context-stack", children: [
    /* @__PURE__ */ s.jsx("h3", { children: "Context stack" }),
    e.length === 0 ? /* @__PURE__ */ s.jsx("p", { children: "No context attached." }) : e.map((t, r) => /* @__PURE__ */ s.jsxs("div", { className: "weaver-context-item", children: [
      /* @__PURE__ */ s.jsx("strong", { children: t.kind }),
      /* @__PURE__ */ s.jsx("span", { children: t.referenceId ?? t.scope ?? "current selection" })
    ] }, `${t.kind}-${t.referenceId ?? r}`))
  ] });
}
function Ae({ promptActions: e, contextProviders: t, proposalRenderers: r, surfaces: n, tools: o }) {
  return /* @__PURE__ */ s.jsxs("section", { className: "weaver-contributions", children: [
    /* @__PURE__ */ s.jsx("h3", { children: "Enabled contributions" }),
    /* @__PURE__ */ s.jsxs("span", { children: [
      e,
      " prompt actions"
    ] }),
    /* @__PURE__ */ s.jsxs("span", { children: [
      t,
      " context providers"
    ] }),
    /* @__PURE__ */ s.jsxs("span", { children: [
      r,
      " proposal renderers"
    ] }),
    /* @__PURE__ */ s.jsxs("span", { children: [
      n,
      " surfaces"
    ] }),
    /* @__PURE__ */ s.jsxs("span", { children: [
      o,
      " backend tools"
    ] })
  ] });
}
function We(e) {
  const t = { ...e, id: T("prompt") };
  if (W.size === 0) {
    _.push(t);
    return;
  }
  for (const r of W)
    r(t);
}
function Re(e, t) {
  if (e === "loading") return "Checking backend AI capabilities.";
  if (e === "unavailable") return "Enable Elsa Server AI capabilities to use Weaver chat.";
  const r = t?.conversationPersistence ? "durable sessions" : "ephemeral sessions", n = t?.proposalReview ? "proposal review" : "draft-only suggestions";
  return `${t?.agents.length ?? 0} agent(s), ${r}, ${n}.`;
}
function T(e) {
  return `${e}-${Date.now()}-${++Se}`;
}
export {
  $e as register
};
