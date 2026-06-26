import ht, { memo as Se, forwardRef as Wo, useRef as ce, useEffect as re, useCallback as ge, useContext as Rn, useMemo as me, useState as Y, createContext as di, useLayoutEffect as ql, createElement as Xr, useId as va } from "react";
import "@tanstack/react-query";
function Zl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var _r = { exports: {} }, hn = {};
var Oi;
function Kl() {
  if (Oi) return hn;
  Oi = 1;
  var e = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.fragment");
  function n(o, r, i) {
    var s = null;
    if (i !== void 0 && (s = "" + i), r.key !== void 0 && (s = "" + r.key), "key" in r) {
      i = {};
      for (var c in r)
        c !== "key" && (i[c] = r[c]);
    } else i = r;
    return r = i.ref, {
      $$typeof: e,
      type: o,
      key: s,
      ref: r !== void 0 ? r : null,
      props: i
    };
  }
  return hn.Fragment = t, hn.jsx = n, hn.jsxs = n, hn;
}
var Bi;
function Ul() {
  return Bi || (Bi = 1, _r.exports = Kl()), _r.exports;
}
var a = Ul();
function Ce(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let t = "";
  if (Array.isArray(e))
    for (let n = 0, o; n < e.length; n++)
      (o = Ce(e[n])) !== "" && (t += (t && " ") + o);
  else
    for (let n in e)
      e[n] && (t += (t && " ") + n);
  return t;
}
var Gl = { value: () => {
} };
function Xo() {
  for (var e = 0, t = arguments.length, n = {}, o; e < t; ++e) {
    if (!(o = arguments[e] + "") || o in n || /[\s.]/.test(o)) throw new Error("illegal type: " + o);
    n[o] = [];
  }
  return new bo(n);
}
function bo(e) {
  this._ = e;
}
function Jl(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var o = "", r = n.indexOf(".");
    if (r >= 0 && (o = n.slice(r + 1), n = n.slice(0, r)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: o };
  });
}
bo.prototype = Xo.prototype = {
  constructor: bo,
  on: function(e, t) {
    var n = this._, o = Jl(e + "", n), r, i = -1, s = o.length;
    if (arguments.length < 2) {
      for (; ++i < s; ) if ((r = (e = o[i]).type) && (r = Ql(n[r], e.name))) return r;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++i < s; )
      if (r = (e = o[i]).type) n[r] = Fi(n[r], e.name, t);
      else if (t == null) for (r in n) n[r] = Fi(n[r], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new bo(e);
  },
  call: function(e, t) {
    if ((r = arguments.length - 2) > 0) for (var n = new Array(r), o = 0, r, i; o < r; ++o) n[o] = arguments[o + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (i = this._[e], o = 0, r = i.length; o < r; ++o) i[o].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var o = this._[e], r = 0, i = o.length; r < i; ++r) o[r].value.apply(t, n);
  }
};
function Ql(e, t) {
  for (var n = 0, o = e.length, r; n < o; ++n)
    if ((r = e[n]).name === t)
      return r.value;
}
function Fi(e, t, n) {
  for (var o = 0, r = e.length; o < r; ++o)
    if (e[o].name === t) {
      e[o] = Gl, e = e.slice(0, o).concat(e.slice(o + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Yr = "http://www.w3.org/1999/xhtml";
const Wi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Yr,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Yo(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Wi.hasOwnProperty(t) ? { space: Wi[t], local: e } : e;
}
function eu(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Yr && t.documentElement.namespaceURI === Yr ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function tu(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function ba(e) {
  var t = Yo(e);
  return (t.local ? tu : eu)(t);
}
function nu() {
}
function fi(e) {
  return e == null ? nu : function() {
    return this.querySelector(e);
  };
}
function ou(e) {
  typeof e != "function" && (e = fi(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var i = t[r], s = i.length, c = o[r] = new Array(s), u, l, f = 0; f < s; ++f)
      (u = i[f]) && (l = e.call(u, u.__data__, f, i)) && ("__data__" in u && (l.__data__ = u.__data__), c[f] = l);
  return new Ve(o, this._parents);
}
function ru(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function iu() {
  return [];
}
function Sa(e) {
  return e == null ? iu : function() {
    return this.querySelectorAll(e);
  };
}
function su(e) {
  return function() {
    return ru(e.apply(this, arguments));
  };
}
function au(e) {
  typeof e == "function" ? e = su(e) : e = Sa(e);
  for (var t = this._groups, n = t.length, o = [], r = [], i = 0; i < n; ++i)
    for (var s = t[i], c = s.length, u, l = 0; l < c; ++l)
      (u = s[l]) && (o.push(e.call(u, u.__data__, l, s)), r.push(u));
  return new Ve(o, r);
}
function Na(e) {
  return function() {
    return this.matches(e);
  };
}
function Ea(e) {
  return function(t) {
    return t.matches(e);
  };
}
var cu = Array.prototype.find;
function lu(e) {
  return function() {
    return cu.call(this.children, e);
  };
}
function uu() {
  return this.firstElementChild;
}
function du(e) {
  return this.select(e == null ? uu : lu(typeof e == "function" ? e : Ea(e)));
}
var fu = Array.prototype.filter;
function hu() {
  return Array.from(this.children);
}
function pu(e) {
  return function() {
    return fu.call(this.children, e);
  };
}
function gu(e) {
  return this.selectAll(e == null ? hu : pu(typeof e == "function" ? e : Ea(e)));
}
function mu(e) {
  typeof e != "function" && (e = Na(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var i = t[r], s = i.length, c = o[r] = [], u, l = 0; l < s; ++l)
      (u = i[l]) && e.call(u, u.__data__, l, i) && c.push(u);
  return new Ve(o, this._parents);
}
function Ca(e) {
  return new Array(e.length);
}
function yu() {
  return new Ve(this._enter || this._groups.map(Ca), this._parents);
}
function _o(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
_o.prototype = {
  constructor: _o,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function xu(e) {
  return function() {
    return e;
  };
}
function wu(e, t, n, o, r, i) {
  for (var s = 0, c, u = t.length, l = i.length; s < l; ++s)
    (c = t[s]) ? (c.__data__ = i[s], o[s] = c) : n[s] = new _o(e, i[s]);
  for (; s < u; ++s)
    (c = t[s]) && (r[s] = c);
}
function vu(e, t, n, o, r, i, s) {
  var c, u, l = /* @__PURE__ */ new Map(), f = t.length, d = i.length, h = new Array(f), p;
  for (c = 0; c < f; ++c)
    (u = t[c]) && (h[c] = p = s.call(u, u.__data__, c, t) + "", l.has(p) ? r[c] = u : l.set(p, u));
  for (c = 0; c < d; ++c)
    p = s.call(e, i[c], c, i) + "", (u = l.get(p)) ? (o[c] = u, u.__data__ = i[c], l.delete(p)) : n[c] = new _o(e, i[c]);
  for (c = 0; c < f; ++c)
    (u = t[c]) && l.get(h[c]) === u && (r[c] = u);
}
function bu(e) {
  return e.__data__;
}
function Su(e, t) {
  if (!arguments.length) return Array.from(this, bu);
  var n = t ? vu : wu, o = this._parents, r = this._groups;
  typeof e != "function" && (e = xu(e));
  for (var i = r.length, s = new Array(i), c = new Array(i), u = new Array(i), l = 0; l < i; ++l) {
    var f = o[l], d = r[l], h = d.length, p = Nu(e.call(f, f && f.__data__, l, o)), g = p.length, x = c[l] = new Array(g), w = s[l] = new Array(g), y = u[l] = new Array(h);
    n(f, d, x, w, y, p, t);
    for (var N = 0, m = 0, v, E; N < g; ++N)
      if (v = x[N]) {
        for (N >= m && (m = N + 1); !(E = w[m]) && ++m < g; ) ;
        v._next = E || null;
      }
  }
  return s = new Ve(s, o), s._enter = c, s._exit = u, s;
}
function Nu(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Eu() {
  return new Ve(this._exit || this._groups.map(Ca), this._parents);
}
function Cu(e, t, n) {
  var o = this.enter(), r = this, i = this.exit();
  return typeof e == "function" ? (o = e(o), o && (o = o.selection())) : o = o.append(e + ""), t != null && (r = t(r), r && (r = r.selection())), n == null ? i.remove() : n(i), o && r ? o.merge(r).order() : r;
}
function ku(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, o = t._groups, r = n.length, i = o.length, s = Math.min(r, i), c = new Array(r), u = 0; u < s; ++u)
    for (var l = n[u], f = o[u], d = l.length, h = c[u] = new Array(d), p, g = 0; g < d; ++g)
      (p = l[g] || f[g]) && (h[g] = p);
  for (; u < r; ++u)
    c[u] = n[u];
  return new Ve(c, this._parents);
}
function Iu() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var o = e[t], r = o.length - 1, i = o[r], s; --r >= 0; )
      (s = o[r]) && (i && s.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(s, i), i = s);
  return this;
}
function ju(e) {
  e || (e = _u);
  function t(d, h) {
    return d && h ? e(d.__data__, h.__data__) : !d - !h;
  }
  for (var n = this._groups, o = n.length, r = new Array(o), i = 0; i < o; ++i) {
    for (var s = n[i], c = s.length, u = r[i] = new Array(c), l, f = 0; f < c; ++f)
      (l = s[f]) && (u[f] = l);
    u.sort(t);
  }
  return new Ve(r, this._parents).order();
}
function _u(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Au() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Mu() {
  return Array.from(this);
}
function Du() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], r = 0, i = o.length; r < i; ++r) {
      var s = o[r];
      if (s) return s;
    }
  return null;
}
function Pu() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function $u() {
  return !this.node();
}
function Tu(e) {
  for (var t = this._groups, n = 0, o = t.length; n < o; ++n)
    for (var r = t[n], i = 0, s = r.length, c; i < s; ++i)
      (c = r[i]) && e.call(c, c.__data__, i, r);
  return this;
}
function zu(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Ru(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Lu(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Vu(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Hu(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function Ou(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Bu(e, t) {
  var n = Yo(e);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Ru : zu : typeof t == "function" ? n.local ? Ou : Hu : n.local ? Vu : Lu)(n, t));
}
function ka(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Fu(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Wu(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function Xu(e, t, n) {
  return function() {
    var o = t.apply(this, arguments);
    o == null ? this.style.removeProperty(e) : this.style.setProperty(e, o, n);
  };
}
function Yu(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? Fu : typeof t == "function" ? Xu : Wu)(e, t, n ?? "")) : Ht(this.node(), e);
}
function Ht(e, t) {
  return e.style.getPropertyValue(t) || ka(e).getComputedStyle(e, null).getPropertyValue(t);
}
function qu(e) {
  return function() {
    delete this[e];
  };
}
function Zu(e, t) {
  return function() {
    this[e] = t;
  };
}
function Ku(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function Uu(e, t) {
  return arguments.length > 1 ? this.each((t == null ? qu : typeof t == "function" ? Ku : Zu)(e, t)) : this.node()[e];
}
function Ia(e) {
  return e.trim().split(/^|\s+/);
}
function hi(e) {
  return e.classList || new ja(e);
}
function ja(e) {
  this._node = e, this._names = Ia(e.getAttribute("class") || "");
}
ja.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function _a(e, t) {
  for (var n = hi(e), o = -1, r = t.length; ++o < r; ) n.add(t[o]);
}
function Aa(e, t) {
  for (var n = hi(e), o = -1, r = t.length; ++o < r; ) n.remove(t[o]);
}
function Gu(e) {
  return function() {
    _a(this, e);
  };
}
function Ju(e) {
  return function() {
    Aa(this, e);
  };
}
function Qu(e, t) {
  return function() {
    (t.apply(this, arguments) ? _a : Aa)(this, e);
  };
}
function ed(e, t) {
  var n = Ia(e + "");
  if (arguments.length < 2) {
    for (var o = hi(this.node()), r = -1, i = n.length; ++r < i; ) if (!o.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Qu : t ? Gu : Ju)(n, t));
}
function td() {
  this.textContent = "";
}
function nd(e) {
  return function() {
    this.textContent = e;
  };
}
function od(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function rd(e) {
  return arguments.length ? this.each(e == null ? td : (typeof e == "function" ? od : nd)(e)) : this.node().textContent;
}
function id() {
  this.innerHTML = "";
}
function sd(e) {
  return function() {
    this.innerHTML = e;
  };
}
function ad(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function cd(e) {
  return arguments.length ? this.each(e == null ? id : (typeof e == "function" ? ad : sd)(e)) : this.node().innerHTML;
}
function ld() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ud() {
  return this.each(ld);
}
function dd() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function fd() {
  return this.each(dd);
}
function hd(e) {
  var t = typeof e == "function" ? e : ba(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function pd() {
  return null;
}
function gd(e, t) {
  var n = typeof e == "function" ? e : ba(e), o = t == null ? pd : typeof t == "function" ? t : fi(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function md() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function yd() {
  return this.each(md);
}
function xd() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function wd() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function vd(e) {
  return this.select(e ? wd : xd);
}
function bd(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Sd(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Nd(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", o = t.indexOf(".");
    return o >= 0 && (n = t.slice(o + 1), t = t.slice(0, o)), { type: t, name: n };
  });
}
function Ed(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, o = -1, r = t.length, i; n < r; ++n)
        i = t[n], (!e.type || i.type === e.type) && i.name === e.name ? this.removeEventListener(i.type, i.listener, i.options) : t[++o] = i;
      ++o ? t.length = o : delete this.__on;
    }
  };
}
function Cd(e, t, n) {
  return function() {
    var o = this.__on, r, i = Sd(t);
    if (o) {
      for (var s = 0, c = o.length; s < c; ++s)
        if ((r = o[s]).type === e.type && r.name === e.name) {
          this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = i, r.options = n), r.value = t;
          return;
        }
    }
    this.addEventListener(e.type, i, n), r = { type: e.type, name: e.name, value: t, listener: i, options: n }, o ? o.push(r) : this.__on = [r];
  };
}
function kd(e, t, n) {
  var o = Nd(e + ""), r, i = o.length, s;
  if (arguments.length < 2) {
    var c = this.node().__on;
    if (c) {
      for (var u = 0, l = c.length, f; u < l; ++u)
        for (r = 0, f = c[u]; r < i; ++r)
          if ((s = o[r]).type === f.type && s.name === f.name)
            return f.value;
    }
    return;
  }
  for (c = t ? Cd : Ed, r = 0; r < i; ++r) this.each(c(o[r], t, n));
  return this;
}
function Ma(e, t, n) {
  var o = ka(e), r = o.CustomEvent;
  typeof r == "function" ? r = new r(t, n) : (r = o.document.createEvent("Event"), n ? (r.initEvent(t, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(t, !1, !1)), e.dispatchEvent(r);
}
function Id(e, t) {
  return function() {
    return Ma(this, e, t);
  };
}
function jd(e, t) {
  return function() {
    return Ma(this, e, t.apply(this, arguments));
  };
}
function _d(e, t) {
  return this.each((typeof t == "function" ? jd : Id)(e, t));
}
function* Ad() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], r = 0, i = o.length, s; r < i; ++r)
      (s = o[r]) && (yield s);
}
var Da = [null];
function Ve(e, t) {
  this._groups = e, this._parents = t;
}
function Ln() {
  return new Ve([[document.documentElement]], Da);
}
function Md() {
  return this;
}
Ve.prototype = Ln.prototype = {
  constructor: Ve,
  select: ou,
  selectAll: au,
  selectChild: du,
  selectChildren: gu,
  filter: mu,
  data: Su,
  enter: yu,
  exit: Eu,
  join: Cu,
  merge: ku,
  selection: Md,
  order: Iu,
  sort: ju,
  call: Au,
  nodes: Mu,
  node: Du,
  size: Pu,
  empty: $u,
  each: Tu,
  attr: Bu,
  style: Yu,
  property: Uu,
  classed: ed,
  text: rd,
  html: cd,
  raise: ud,
  lower: fd,
  append: hd,
  insert: gd,
  remove: yd,
  clone: vd,
  datum: bd,
  on: kd,
  dispatch: _d,
  [Symbol.iterator]: Ad
};
function Le(e) {
  return typeof e == "string" ? new Ve([[document.querySelector(e)]], [document.documentElement]) : new Ve([[e]], Da);
}
function Dd(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function We(e, t) {
  if (e = Dd(e), t === void 0 && (t = e.currentTarget), t) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var o = n.createSVGPoint();
      return o.x = e.clientX, o.y = e.clientY, o = o.matrixTransform(t.getScreenCTM().inverse()), [o.x, o.y];
    }
    if (t.getBoundingClientRect) {
      var r = t.getBoundingClientRect();
      return [e.clientX - r.left - t.clientLeft, e.clientY - r.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
const Pd = { passive: !1 }, In = { capture: !0, passive: !1 };
function Ar(e) {
  e.stopImmediatePropagation();
}
function Lt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Pa(e) {
  var t = e.document.documentElement, n = Le(e).on("dragstart.drag", Lt, In);
  "onselectstart" in t ? n.on("selectstart.drag", Lt, In) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function $a(e, t) {
  var n = e.document.documentElement, o = Le(e).on("dragstart.drag", null);
  t && (o.on("click.drag", Lt, In), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const lo = (e) => () => e;
function qr(e, {
  sourceEvent: t,
  subject: n,
  target: o,
  identifier: r,
  active: i,
  x: s,
  y: c,
  dx: u,
  dy: l,
  dispatch: f
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    identifier: { value: r, enumerable: !0, configurable: !0 },
    active: { value: i, enumerable: !0, configurable: !0 },
    x: { value: s, enumerable: !0, configurable: !0 },
    y: { value: c, enumerable: !0, configurable: !0 },
    dx: { value: u, enumerable: !0, configurable: !0 },
    dy: { value: l, enumerable: !0, configurable: !0 },
    _: { value: f }
  });
}
qr.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function $d(e) {
  return !e.ctrlKey && !e.button;
}
function Td() {
  return this.parentNode;
}
function zd(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function Rd() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ta() {
  var e = $d, t = Td, n = zd, o = Rd, r = {}, i = Xo("start", "drag", "end"), s = 0, c, u, l, f, d = 0;
  function h(v) {
    v.on("mousedown.drag", p).filter(o).on("touchstart.drag", w).on("touchmove.drag", y, Pd).on("touchend.drag touchcancel.drag", N).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(v, E) {
    if (!(f || !e.call(this, v, E))) {
      var C = m(this, t.call(this, v, E), v, E, "mouse");
      C && (Le(v.view).on("mousemove.drag", g, In).on("mouseup.drag", x, In), Pa(v.view), Ar(v), l = !1, c = v.clientX, u = v.clientY, C("start", v));
    }
  }
  function g(v) {
    if (Lt(v), !l) {
      var E = v.clientX - c, C = v.clientY - u;
      l = E * E + C * C > d;
    }
    r.mouse("drag", v);
  }
  function x(v) {
    Le(v.view).on("mousemove.drag mouseup.drag", null), $a(v.view, l), Lt(v), r.mouse("end", v);
  }
  function w(v, E) {
    if (e.call(this, v, E)) {
      var C = v.changedTouches, k = t.call(this, v, E), _ = C.length, P, W;
      for (P = 0; P < _; ++P)
        (W = m(this, k, v, E, C[P].identifier, C[P])) && (Ar(v), W("start", v, C[P]));
    }
  }
  function y(v) {
    var E = v.changedTouches, C = E.length, k, _;
    for (k = 0; k < C; ++k)
      (_ = r[E[k].identifier]) && (Lt(v), _("drag", v, E[k]));
  }
  function N(v) {
    var E = v.changedTouches, C = E.length, k, _;
    for (f && clearTimeout(f), f = setTimeout(function() {
      f = null;
    }, 500), k = 0; k < C; ++k)
      (_ = r[E[k].identifier]) && (Ar(v), _("end", v, E[k]));
  }
  function m(v, E, C, k, _, P) {
    var W = i.copy(), A = We(P || C, E), z, H, b;
    if ((b = n.call(v, new qr("beforestart", {
      sourceEvent: C,
      target: h,
      identifier: _,
      active: s,
      x: A[0],
      y: A[1],
      dx: 0,
      dy: 0,
      dispatch: W
    }), k)) != null)
      return z = b.x - A[0] || 0, H = b.y - A[1] || 0, function j(I, D, T) {
        var $ = A, V;
        switch (I) {
          case "start":
            r[_] = j, V = s++;
            break;
          case "end":
            delete r[_], --s;
          // falls through
          case "drag":
            A = We(T || D, E), V = s;
            break;
        }
        W.call(
          I,
          v,
          new qr(I, {
            sourceEvent: D,
            subject: b,
            target: h,
            identifier: _,
            active: V,
            x: A[0] + z,
            y: A[1] + H,
            dx: A[0] - $[0],
            dy: A[1] - $[1],
            dispatch: W
          }),
          k
        );
      };
  }
  return h.filter = function(v) {
    return arguments.length ? (e = typeof v == "function" ? v : lo(!!v), h) : e;
  }, h.container = function(v) {
    return arguments.length ? (t = typeof v == "function" ? v : lo(v), h) : t;
  }, h.subject = function(v) {
    return arguments.length ? (n = typeof v == "function" ? v : lo(v), h) : n;
  }, h.touchable = function(v) {
    return arguments.length ? (o = typeof v == "function" ? v : lo(!!v), h) : o;
  }, h.on = function() {
    var v = i.on.apply(i, arguments);
    return v === i ? h : v;
  }, h.clickDistance = function(v) {
    return arguments.length ? (d = (v = +v) * v, h) : Math.sqrt(d);
  }, h;
}
function pi(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function za(e, t) {
  var n = Object.create(e.prototype);
  for (var o in t) n[o] = t[o];
  return n;
}
function Vn() {
}
var jn = 0.7, Ao = 1 / jn, Vt = "\\s*([+-]?\\d+)\\s*", _n = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ue = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ld = /^#([0-9a-f]{3,8})$/, Vd = new RegExp(`^rgb\\(${Vt},${Vt},${Vt}\\)$`), Hd = new RegExp(`^rgb\\(${Ue},${Ue},${Ue}\\)$`), Od = new RegExp(`^rgba\\(${Vt},${Vt},${Vt},${_n}\\)$`), Bd = new RegExp(`^rgba\\(${Ue},${Ue},${Ue},${_n}\\)$`), Fd = new RegExp(`^hsl\\(${_n},${Ue},${Ue}\\)$`), Wd = new RegExp(`^hsla\\(${_n},${Ue},${Ue},${_n}\\)$`), Xi = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
pi(Vn, Ct, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Yi,
  // Deprecated! Use color.formatHex.
  formatHex: Yi,
  formatHex8: Xd,
  formatHsl: Yd,
  formatRgb: qi,
  toString: qi
});
function Yi() {
  return this.rgb().formatHex();
}
function Xd() {
  return this.rgb().formatHex8();
}
function Yd() {
  return Ra(this).formatHsl();
}
function qi() {
  return this.rgb().formatRgb();
}
function Ct(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Ld.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Zi(t) : n === 3 ? new Pe(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? uo(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? uo(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Vd.exec(e)) ? new Pe(t[1], t[2], t[3], 1) : (t = Hd.exec(e)) ? new Pe(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Od.exec(e)) ? uo(t[1], t[2], t[3], t[4]) : (t = Bd.exec(e)) ? uo(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Fd.exec(e)) ? Gi(t[1], t[2] / 100, t[3] / 100, 1) : (t = Wd.exec(e)) ? Gi(t[1], t[2] / 100, t[3] / 100, t[4]) : Xi.hasOwnProperty(e) ? Zi(Xi[e]) : e === "transparent" ? new Pe(NaN, NaN, NaN, 0) : null;
}
function Zi(e) {
  return new Pe(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function uo(e, t, n, o) {
  return o <= 0 && (e = t = n = NaN), new Pe(e, t, n, o);
}
function qd(e) {
  return e instanceof Vn || (e = Ct(e)), e ? (e = e.rgb(), new Pe(e.r, e.g, e.b, e.opacity)) : new Pe();
}
function Zr(e, t, n, o) {
  return arguments.length === 1 ? qd(e) : new Pe(e, t, n, o ?? 1);
}
function Pe(e, t, n, o) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +o;
}
pi(Pe, Zr, za(Vn, {
  brighter(e) {
    return e = e == null ? Ao : Math.pow(Ao, e), new Pe(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? jn : Math.pow(jn, e), new Pe(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Pe(Nt(this.r), Nt(this.g), Nt(this.b), Mo(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ki,
  // Deprecated! Use color.formatHex.
  formatHex: Ki,
  formatHex8: Zd,
  formatRgb: Ui,
  toString: Ui
}));
function Ki() {
  return `#${St(this.r)}${St(this.g)}${St(this.b)}`;
}
function Zd() {
  return `#${St(this.r)}${St(this.g)}${St(this.b)}${St((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ui() {
  const e = Mo(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Nt(this.r)}, ${Nt(this.g)}, ${Nt(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Mo(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Nt(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function St(e) {
  return e = Nt(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Gi(e, t, n, o) {
  return o <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Xe(e, t, n, o);
}
function Ra(e) {
  if (e instanceof Xe) return new Xe(e.h, e.s, e.l, e.opacity);
  if (e instanceof Vn || (e = Ct(e)), !e) return new Xe();
  if (e instanceof Xe) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, o = e.b / 255, r = Math.min(t, n, o), i = Math.max(t, n, o), s = NaN, c = i - r, u = (i + r) / 2;
  return c ? (t === i ? s = (n - o) / c + (n < o) * 6 : n === i ? s = (o - t) / c + 2 : s = (t - n) / c + 4, c /= u < 0.5 ? i + r : 2 - i - r, s *= 60) : c = u > 0 && u < 1 ? 0 : s, new Xe(s, c, u, e.opacity);
}
function Kd(e, t, n, o) {
  return arguments.length === 1 ? Ra(e) : new Xe(e, t, n, o ?? 1);
}
function Xe(e, t, n, o) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +o;
}
pi(Xe, Kd, za(Vn, {
  brighter(e) {
    return e = e == null ? Ao : Math.pow(Ao, e), new Xe(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? jn : Math.pow(jn, e), new Xe(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * t, r = 2 * n - o;
    return new Pe(
      Mr(e >= 240 ? e - 240 : e + 120, r, o),
      Mr(e, r, o),
      Mr(e < 120 ? e + 240 : e - 120, r, o),
      this.opacity
    );
  },
  clamp() {
    return new Xe(Ji(this.h), fo(this.s), fo(this.l), Mo(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Mo(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Ji(this.h)}, ${fo(this.s) * 100}%, ${fo(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Ji(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function fo(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Mr(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const gi = (e) => () => e;
function Ud(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Gd(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(o) {
    return Math.pow(e + o * t, n);
  };
}
function Jd(e) {
  return (e = +e) == 1 ? La : function(t, n) {
    return n - t ? Gd(t, n, e) : gi(isNaN(t) ? n : t);
  };
}
function La(e, t) {
  var n = t - e;
  return n ? Ud(e, n) : gi(isNaN(e) ? t : e);
}
const Do = (function e(t) {
  var n = Jd(t);
  function o(r, i) {
    var s = n((r = Zr(r)).r, (i = Zr(i)).r), c = n(r.g, i.g), u = n(r.b, i.b), l = La(r.opacity, i.opacity);
    return function(f) {
      return r.r = s(f), r.g = c(f), r.b = u(f), r.opacity = l(f), r + "";
    };
  }
  return o.gamma = e, o;
})(1);
function Qd(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, o = t.slice(), r;
  return function(i) {
    for (r = 0; r < n; ++r) o[r] = e[r] * (1 - i) + t[r] * i;
    return o;
  };
}
function ef(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function tf(e, t) {
  var n = t ? t.length : 0, o = e ? Math.min(n, e.length) : 0, r = new Array(o), i = new Array(n), s;
  for (s = 0; s < o; ++s) r[s] = En(e[s], t[s]);
  for (; s < n; ++s) i[s] = t[s];
  return function(c) {
    for (s = 0; s < o; ++s) i[s] = r[s](c);
    return i;
  };
}
function nf(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(o) {
    return n.setTime(e * (1 - o) + t * o), n;
  };
}
function Ke(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function of(e, t) {
  var n = {}, o = {}, r;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (r in t)
    r in e ? n[r] = En(e[r], t[r]) : o[r] = t[r];
  return function(i) {
    for (r in n) o[r] = n[r](i);
    return o;
  };
}
var Kr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Dr = new RegExp(Kr.source, "g");
function rf(e) {
  return function() {
    return e;
  };
}
function sf(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Va(e, t) {
  var n = Kr.lastIndex = Dr.lastIndex = 0, o, r, i, s = -1, c = [], u = [];
  for (e = e + "", t = t + ""; (o = Kr.exec(e)) && (r = Dr.exec(t)); )
    (i = r.index) > n && (i = t.slice(n, i), c[s] ? c[s] += i : c[++s] = i), (o = o[0]) === (r = r[0]) ? c[s] ? c[s] += r : c[++s] = r : (c[++s] = null, u.push({ i: s, x: Ke(o, r) })), n = Dr.lastIndex;
  return n < t.length && (i = t.slice(n), c[s] ? c[s] += i : c[++s] = i), c.length < 2 ? u[0] ? sf(u[0].x) : rf(t) : (t = u.length, function(l) {
    for (var f = 0, d; f < t; ++f) c[(d = u[f]).i] = d.x(l);
    return c.join("");
  });
}
function En(e, t) {
  var n = typeof t, o;
  return t == null || n === "boolean" ? gi(t) : (n === "number" ? Ke : n === "string" ? (o = Ct(t)) ? (t = o, Do) : Va : t instanceof Ct ? Do : t instanceof Date ? nf : ef(t) ? Qd : Array.isArray(t) ? tf : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? of : Ke)(e, t);
}
var Qi = 180 / Math.PI, Ur = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Ha(e, t, n, o, r, i) {
  var s, c, u;
  return (s = Math.sqrt(e * e + t * t)) && (e /= s, t /= s), (u = e * n + t * o) && (n -= e * u, o -= t * u), (c = Math.sqrt(n * n + o * o)) && (n /= c, o /= c, u /= c), e * o < t * n && (e = -e, t = -t, u = -u, s = -s), {
    translateX: r,
    translateY: i,
    rotate: Math.atan2(t, e) * Qi,
    skewX: Math.atan(u) * Qi,
    scaleX: s,
    scaleY: c
  };
}
var ho;
function af(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Ur : Ha(t.a, t.b, t.c, t.d, t.e, t.f);
}
function cf(e) {
  return e == null || (ho || (ho = document.createElementNS("http://www.w3.org/2000/svg", "g")), ho.setAttribute("transform", e), !(e = ho.transform.baseVal.consolidate())) ? Ur : (e = e.matrix, Ha(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Oa(e, t, n, o) {
  function r(l) {
    return l.length ? l.pop() + " " : "";
  }
  function i(l, f, d, h, p, g) {
    if (l !== d || f !== h) {
      var x = p.push("translate(", null, t, null, n);
      g.push({ i: x - 4, x: Ke(l, d) }, { i: x - 2, x: Ke(f, h) });
    } else (d || h) && p.push("translate(" + d + t + h + n);
  }
  function s(l, f, d, h) {
    l !== f ? (l - f > 180 ? f += 360 : f - l > 180 && (l += 360), h.push({ i: d.push(r(d) + "rotate(", null, o) - 2, x: Ke(l, f) })) : f && d.push(r(d) + "rotate(" + f + o);
  }
  function c(l, f, d, h) {
    l !== f ? h.push({ i: d.push(r(d) + "skewX(", null, o) - 2, x: Ke(l, f) }) : f && d.push(r(d) + "skewX(" + f + o);
  }
  function u(l, f, d, h, p, g) {
    if (l !== d || f !== h) {
      var x = p.push(r(p) + "scale(", null, ",", null, ")");
      g.push({ i: x - 4, x: Ke(l, d) }, { i: x - 2, x: Ke(f, h) });
    } else (d !== 1 || h !== 1) && p.push(r(p) + "scale(" + d + "," + h + ")");
  }
  return function(l, f) {
    var d = [], h = [];
    return l = e(l), f = e(f), i(l.translateX, l.translateY, f.translateX, f.translateY, d, h), s(l.rotate, f.rotate, d, h), c(l.skewX, f.skewX, d, h), u(l.scaleX, l.scaleY, f.scaleX, f.scaleY, d, h), l = f = null, function(p) {
      for (var g = -1, x = h.length, w; ++g < x; ) d[(w = h[g]).i] = w.x(p);
      return d.join("");
    };
  };
}
var lf = Oa(af, "px, ", "px)", "deg)"), uf = Oa(cf, ", ", ")", ")"), df = 1e-12;
function es(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function ff(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function hf(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const So = (function e(t, n, o) {
  function r(i, s) {
    var c = i[0], u = i[1], l = i[2], f = s[0], d = s[1], h = s[2], p = f - c, g = d - u, x = p * p + g * g, w, y;
    if (x < df)
      y = Math.log(h / l) / t, w = function(k) {
        return [
          c + k * p,
          u + k * g,
          l * Math.exp(t * k * y)
        ];
      };
    else {
      var N = Math.sqrt(x), m = (h * h - l * l + o * x) / (2 * l * n * N), v = (h * h - l * l - o * x) / (2 * h * n * N), E = Math.log(Math.sqrt(m * m + 1) - m), C = Math.log(Math.sqrt(v * v + 1) - v);
      y = (C - E) / t, w = function(k) {
        var _ = k * y, P = es(E), W = l / (n * N) * (P * hf(t * _ + E) - ff(E));
        return [
          c + W * p,
          u + W * g,
          l * P / es(t * _ + E)
        ];
      };
    }
    return w.duration = y * 1e3 * t / Math.SQRT2, w;
  }
  return r.rho = function(i) {
    var s = Math.max(1e-3, +i), c = s * s, u = c * c;
    return e(s, c, u);
  }, r;
})(Math.SQRT2, 2, 4);
var Ot = 0, bn = 0, pn = 0, Ba = 1e3, Po, Sn, $o = 0, kt = 0, qo = 0, An = typeof performance == "object" && performance.now ? performance : Date, Fa = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function mi() {
  return kt || (Fa(pf), kt = An.now() + qo);
}
function pf() {
  kt = 0;
}
function To() {
  this._call = this._time = this._next = null;
}
To.prototype = Wa.prototype = {
  constructor: To,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? mi() : +n) + (t == null ? 0 : +t), !this._next && Sn !== this && (Sn ? Sn._next = this : Po = this, Sn = this), this._call = e, this._time = n, Gr();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Gr());
  }
};
function Wa(e, t, n) {
  var o = new To();
  return o.restart(e, t, n), o;
}
function gf() {
  mi(), ++Ot;
  for (var e = Po, t; e; )
    (t = kt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Ot;
}
function ts() {
  kt = ($o = An.now()) + qo, Ot = bn = 0;
  try {
    gf();
  } finally {
    Ot = 0, yf(), kt = 0;
  }
}
function mf() {
  var e = An.now(), t = e - $o;
  t > Ba && (qo -= t, $o = e);
}
function yf() {
  for (var e, t = Po, n, o = 1 / 0; t; )
    t._call ? (o > t._time && (o = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Po = n);
  Sn = e, Gr(o);
}
function Gr(e) {
  if (!Ot) {
    bn && (bn = clearTimeout(bn));
    var t = e - kt;
    t > 24 ? (e < 1 / 0 && (bn = setTimeout(ts, e - An.now() - qo)), pn && (pn = clearInterval(pn))) : (pn || ($o = An.now(), pn = setInterval(mf, Ba)), Ot = 1, Fa(ts));
  }
}
function ns(e, t, n) {
  var o = new To();
  return t = t == null ? 0 : +t, o.restart((r) => {
    o.stop(), e(r + t);
  }, t, n), o;
}
var xf = Xo("start", "end", "cancel", "interrupt"), wf = [], Xa = 0, os = 1, Jr = 2, No = 3, rs = 4, Qr = 5, Eo = 6;
function Zo(e, t, n, o, r, i) {
  var s = e.__transition;
  if (!s) e.__transition = {};
  else if (n in s) return;
  vf(e, n, {
    name: t,
    index: o,
    // For context during callback.
    group: r,
    // For context during callback.
    on: xf,
    tween: wf,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: Xa
  });
}
function yi(e, t) {
  var n = Ze(e, t);
  if (n.state > Xa) throw new Error("too late; already scheduled");
  return n;
}
function Je(e, t) {
  var n = Ze(e, t);
  if (n.state > No) throw new Error("too late; already running");
  return n;
}
function Ze(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function vf(e, t, n) {
  var o = e.__transition, r;
  o[t] = n, n.timer = Wa(i, 0, n.time);
  function i(l) {
    n.state = os, n.timer.restart(s, n.delay, n.time), n.delay <= l && s(l - n.delay);
  }
  function s(l) {
    var f, d, h, p;
    if (n.state !== os) return u();
    for (f in o)
      if (p = o[f], p.name === n.name) {
        if (p.state === No) return ns(s);
        p.state === rs ? (p.state = Eo, p.timer.stop(), p.on.call("interrupt", e, e.__data__, p.index, p.group), delete o[f]) : +f < t && (p.state = Eo, p.timer.stop(), p.on.call("cancel", e, e.__data__, p.index, p.group), delete o[f]);
      }
    if (ns(function() {
      n.state === No && (n.state = rs, n.timer.restart(c, n.delay, n.time), c(l));
    }), n.state = Jr, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Jr) {
      for (n.state = No, r = new Array(h = n.tween.length), f = 0, d = -1; f < h; ++f)
        (p = n.tween[f].value.call(e, e.__data__, n.index, n.group)) && (r[++d] = p);
      r.length = d + 1;
    }
  }
  function c(l) {
    for (var f = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(u), n.state = Qr, 1), d = -1, h = r.length; ++d < h; )
      r[d].call(e, f);
    n.state === Qr && (n.on.call("end", e, e.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = Eo, n.timer.stop(), delete o[t];
    for (var l in o) return;
    delete e.__transition;
  }
}
function Co(e, t) {
  var n = e.__transition, o, r, i = !0, s;
  if (n) {
    t = t == null ? null : t + "";
    for (s in n) {
      if ((o = n[s]).name !== t) {
        i = !1;
        continue;
      }
      r = o.state > Jr && o.state < Qr, o.state = Eo, o.timer.stop(), o.on.call(r ? "interrupt" : "cancel", e, e.__data__, o.index, o.group), delete n[s];
    }
    i && delete e.__transition;
  }
}
function bf(e) {
  return this.each(function() {
    Co(this, e);
  });
}
function Sf(e, t) {
  var n, o;
  return function() {
    var r = Je(this, e), i = r.tween;
    if (i !== n) {
      o = n = i;
      for (var s = 0, c = o.length; s < c; ++s)
        if (o[s].name === t) {
          o = o.slice(), o.splice(s, 1);
          break;
        }
    }
    r.tween = o;
  };
}
function Nf(e, t, n) {
  var o, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var i = Je(this, e), s = i.tween;
    if (s !== o) {
      r = (o = s).slice();
      for (var c = { name: t, value: n }, u = 0, l = r.length; u < l; ++u)
        if (r[u].name === t) {
          r[u] = c;
          break;
        }
      u === l && r.push(c);
    }
    i.tween = r;
  };
}
function Ef(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var o = Ze(this.node(), n).tween, r = 0, i = o.length, s; r < i; ++r)
      if ((s = o[r]).name === e)
        return s.value;
    return null;
  }
  return this.each((t == null ? Sf : Nf)(n, e, t));
}
function xi(e, t, n) {
  var o = e._id;
  return e.each(function() {
    var r = Je(this, o);
    (r.value || (r.value = {}))[t] = n.apply(this, arguments);
  }), function(r) {
    return Ze(r, o).value[t];
  };
}
function Ya(e, t) {
  var n;
  return (typeof t == "number" ? Ke : t instanceof Ct ? Do : (n = Ct(t)) ? (t = n, Do) : Va)(e, t);
}
function Cf(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function kf(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function If(e, t, n) {
  var o, r = n + "", i;
  return function() {
    var s = this.getAttribute(e);
    return s === r ? null : s === o ? i : i = t(o = s, n);
  };
}
function jf(e, t, n) {
  var o, r = n + "", i;
  return function() {
    var s = this.getAttributeNS(e.space, e.local);
    return s === r ? null : s === o ? i : i = t(o = s, n);
  };
}
function _f(e, t, n) {
  var o, r, i;
  return function() {
    var s, c = n(this), u;
    return c == null ? void this.removeAttribute(e) : (s = this.getAttribute(e), u = c + "", s === u ? null : s === o && u === r ? i : (r = u, i = t(o = s, c)));
  };
}
function Af(e, t, n) {
  var o, r, i;
  return function() {
    var s, c = n(this), u;
    return c == null ? void this.removeAttributeNS(e.space, e.local) : (s = this.getAttributeNS(e.space, e.local), u = c + "", s === u ? null : s === o && u === r ? i : (r = u, i = t(o = s, c)));
  };
}
function Mf(e, t) {
  var n = Yo(e), o = n === "transform" ? uf : Ya;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Af : _f)(n, o, xi(this, "attr." + e, t)) : t == null ? (n.local ? kf : Cf)(n) : (n.local ? jf : If)(n, o, t));
}
function Df(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function Pf(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function $f(e, t) {
  var n, o;
  function r() {
    var i = t.apply(this, arguments);
    return i !== o && (n = (o = i) && Pf(e, i)), n;
  }
  return r._value = t, r;
}
function Tf(e, t) {
  var n, o;
  function r() {
    var i = t.apply(this, arguments);
    return i !== o && (n = (o = i) && Df(e, i)), n;
  }
  return r._value = t, r;
}
function zf(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var o = Yo(e);
  return this.tween(n, (o.local ? $f : Tf)(o, t));
}
function Rf(e, t) {
  return function() {
    yi(this, e).delay = +t.apply(this, arguments);
  };
}
function Lf(e, t) {
  return t = +t, function() {
    yi(this, e).delay = t;
  };
}
function Vf(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Rf : Lf)(t, e)) : Ze(this.node(), t).delay;
}
function Hf(e, t) {
  return function() {
    Je(this, e).duration = +t.apply(this, arguments);
  };
}
function Of(e, t) {
  return t = +t, function() {
    Je(this, e).duration = t;
  };
}
function Bf(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Hf : Of)(t, e)) : Ze(this.node(), t).duration;
}
function Ff(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Je(this, e).ease = t;
  };
}
function Wf(e) {
  var t = this._id;
  return arguments.length ? this.each(Ff(t, e)) : Ze(this.node(), t).ease;
}
function Xf(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Je(this, e).ease = n;
  };
}
function Yf(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Xf(this._id, e));
}
function qf(e) {
  typeof e != "function" && (e = Na(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var i = t[r], s = i.length, c = o[r] = [], u, l = 0; l < s; ++l)
      (u = i[l]) && e.call(u, u.__data__, l, i) && c.push(u);
  return new rt(o, this._parents, this._name, this._id);
}
function Zf(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, o = t.length, r = n.length, i = Math.min(o, r), s = new Array(o), c = 0; c < i; ++c)
    for (var u = t[c], l = n[c], f = u.length, d = s[c] = new Array(f), h, p = 0; p < f; ++p)
      (h = u[p] || l[p]) && (d[p] = h);
  for (; c < o; ++c)
    s[c] = t[c];
  return new rt(s, this._parents, this._name, this._id);
}
function Kf(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function Uf(e, t, n) {
  var o, r, i = Kf(t) ? yi : Je;
  return function() {
    var s = i(this, e), c = s.on;
    c !== o && (r = (o = c).copy()).on(t, n), s.on = r;
  };
}
function Gf(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Ze(this.node(), n).on.on(e) : this.each(Uf(n, e, t));
}
function Jf(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function Qf() {
  return this.on("end.remove", Jf(this._id));
}
function eh(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = fi(e));
  for (var o = this._groups, r = o.length, i = new Array(r), s = 0; s < r; ++s)
    for (var c = o[s], u = c.length, l = i[s] = new Array(u), f, d, h = 0; h < u; ++h)
      (f = c[h]) && (d = e.call(f, f.__data__, h, c)) && ("__data__" in f && (d.__data__ = f.__data__), l[h] = d, Zo(l[h], t, n, h, l, Ze(f, n)));
  return new rt(i, this._parents, t, n);
}
function th(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Sa(e));
  for (var o = this._groups, r = o.length, i = [], s = [], c = 0; c < r; ++c)
    for (var u = o[c], l = u.length, f, d = 0; d < l; ++d)
      if (f = u[d]) {
        for (var h = e.call(f, f.__data__, d, u), p, g = Ze(f, n), x = 0, w = h.length; x < w; ++x)
          (p = h[x]) && Zo(p, t, n, x, h, g);
        i.push(h), s.push(f);
      }
  return new rt(i, s, t, n);
}
var nh = Ln.prototype.constructor;
function oh() {
  return new nh(this._groups, this._parents);
}
function rh(e, t) {
  var n, o, r;
  return function() {
    var i = Ht(this, e), s = (this.style.removeProperty(e), Ht(this, e));
    return i === s ? null : i === n && s === o ? r : r = t(n = i, o = s);
  };
}
function qa(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function ih(e, t, n) {
  var o, r = n + "", i;
  return function() {
    var s = Ht(this, e);
    return s === r ? null : s === o ? i : i = t(o = s, n);
  };
}
function sh(e, t, n) {
  var o, r, i;
  return function() {
    var s = Ht(this, e), c = n(this), u = c + "";
    return c == null && (u = c = (this.style.removeProperty(e), Ht(this, e))), s === u ? null : s === o && u === r ? i : (r = u, i = t(o = s, c));
  };
}
function ah(e, t) {
  var n, o, r, i = "style." + t, s = "end." + i, c;
  return function() {
    var u = Je(this, e), l = u.on, f = u.value[i] == null ? c || (c = qa(t)) : void 0;
    (l !== n || r !== f) && (o = (n = l).copy()).on(s, r = f), u.on = o;
  };
}
function ch(e, t, n) {
  var o = (e += "") == "transform" ? lf : Ya;
  return t == null ? this.styleTween(e, rh(e, o)).on("end.style." + e, qa(e)) : typeof t == "function" ? this.styleTween(e, sh(e, o, xi(this, "style." + e, t))).each(ah(this._id, e)) : this.styleTween(e, ih(e, o, t), n).on("end.style." + e, null);
}
function lh(e, t, n) {
  return function(o) {
    this.style.setProperty(e, t.call(this, o), n);
  };
}
function uh(e, t, n) {
  var o, r;
  function i() {
    var s = t.apply(this, arguments);
    return s !== r && (o = (r = s) && lh(e, s, n)), o;
  }
  return i._value = t, i;
}
function dh(e, t, n) {
  var o = "style." + (e += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (t == null) return this.tween(o, null);
  if (typeof t != "function") throw new Error();
  return this.tween(o, uh(e, t, n ?? ""));
}
function fh(e) {
  return function() {
    this.textContent = e;
  };
}
function hh(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function ph(e) {
  return this.tween("text", typeof e == "function" ? hh(xi(this, "text", e)) : fh(e == null ? "" : e + ""));
}
function gh(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function mh(e) {
  var t, n;
  function o() {
    var r = e.apply(this, arguments);
    return r !== n && (t = (n = r) && gh(r)), t;
  }
  return o._value = e, o;
}
function yh(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, mh(e));
}
function xh() {
  for (var e = this._name, t = this._id, n = Za(), o = this._groups, r = o.length, i = 0; i < r; ++i)
    for (var s = o[i], c = s.length, u, l = 0; l < c; ++l)
      if (u = s[l]) {
        var f = Ze(u, t);
        Zo(u, e, n, l, s, {
          time: f.time + f.delay + f.duration,
          delay: 0,
          duration: f.duration,
          ease: f.ease
        });
      }
  return new rt(o, this._parents, e, n);
}
function wh() {
  var e, t, n = this, o = n._id, r = n.size();
  return new Promise(function(i, s) {
    var c = { value: s }, u = { value: function() {
      --r === 0 && i();
    } };
    n.each(function() {
      var l = Je(this, o), f = l.on;
      f !== e && (t = (e = f).copy(), t._.cancel.push(c), t._.interrupt.push(c), t._.end.push(u)), l.on = t;
    }), r === 0 && i();
  });
}
var vh = 0;
function rt(e, t, n, o) {
  this._groups = e, this._parents = t, this._name = n, this._id = o;
}
function Za() {
  return ++vh;
}
var tt = Ln.prototype;
rt.prototype = {
  constructor: rt,
  select: eh,
  selectAll: th,
  selectChild: tt.selectChild,
  selectChildren: tt.selectChildren,
  filter: qf,
  merge: Zf,
  selection: oh,
  transition: xh,
  call: tt.call,
  nodes: tt.nodes,
  node: tt.node,
  size: tt.size,
  empty: tt.empty,
  each: tt.each,
  on: Gf,
  attr: Mf,
  attrTween: zf,
  style: ch,
  styleTween: dh,
  text: ph,
  textTween: yh,
  remove: Qf,
  tween: Ef,
  delay: Vf,
  duration: Bf,
  ease: Wf,
  easeVarying: Yf,
  end: wh,
  [Symbol.iterator]: tt[Symbol.iterator]
};
function bh(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Sh = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: bh
};
function Nh(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Eh(e) {
  var t, n;
  e instanceof rt ? (t = e._id, e = e._name) : (t = Za(), (n = Sh).time = mi(), e = e == null ? null : e + "");
  for (var o = this._groups, r = o.length, i = 0; i < r; ++i)
    for (var s = o[i], c = s.length, u, l = 0; l < c; ++l)
      (u = s[l]) && Zo(u, e, t, l, s, n || Nh(u, t));
  return new rt(o, this._parents, e, t);
}
Ln.prototype.interrupt = bf;
Ln.prototype.transition = Eh;
const po = (e) => () => e;
function Ch(e, {
  sourceEvent: t,
  target: n,
  transform: o,
  dispatch: r
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: o, enumerable: !0, configurable: !0 },
    _: { value: r }
  });
}
function nt(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
nt.prototype = {
  constructor: nt,
  scale: function(e) {
    return e === 1 ? this : new nt(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new nt(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var Ko = new nt(1, 0, 0);
Ka.prototype = nt.prototype;
function Ka(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return Ko;
  return e.__zoom;
}
function Pr(e) {
  e.stopImmediatePropagation();
}
function gn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function kh(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Ih() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function is() {
  return this.__zoom || Ko;
}
function jh(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function _h() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ah(e, t, n) {
  var o = e.invertX(t[0][0]) - n[0][0], r = e.invertX(t[1][0]) - n[1][0], i = e.invertY(t[0][1]) - n[0][1], s = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r),
    s > i ? (i + s) / 2 : Math.min(0, i) || Math.max(0, s)
  );
}
function Ua() {
  var e = kh, t = Ih, n = Ah, o = jh, r = _h, i = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], c = 250, u = So, l = Xo("start", "zoom", "end"), f, d, h, p = 500, g = 150, x = 0, w = 10;
  function y(b) {
    b.property("__zoom", is).on("wheel.zoom", _, { passive: !1 }).on("mousedown.zoom", P).on("dblclick.zoom", W).filter(r).on("touchstart.zoom", A).on("touchmove.zoom", z).on("touchend.zoom touchcancel.zoom", H).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(b, j, I, D) {
    var T = b.selection ? b.selection() : b;
    T.property("__zoom", is), b !== T ? E(b, j, I, D) : T.interrupt().each(function() {
      C(this, arguments).event(D).start().zoom(null, typeof j == "function" ? j.apply(this, arguments) : j).end();
    });
  }, y.scaleBy = function(b, j, I, D) {
    y.scaleTo(b, function() {
      var T = this.__zoom.k, $ = typeof j == "function" ? j.apply(this, arguments) : j;
      return T * $;
    }, I, D);
  }, y.scaleTo = function(b, j, I, D) {
    y.transform(b, function() {
      var T = t.apply(this, arguments), $ = this.__zoom, V = I == null ? v(T) : typeof I == "function" ? I.apply(this, arguments) : I, F = $.invert(V), B = typeof j == "function" ? j.apply(this, arguments) : j;
      return n(m(N($, B), V, F), T, s);
    }, I, D);
  }, y.translateBy = function(b, j, I, D) {
    y.transform(b, function() {
      return n(this.__zoom.translate(
        typeof j == "function" ? j.apply(this, arguments) : j,
        typeof I == "function" ? I.apply(this, arguments) : I
      ), t.apply(this, arguments), s);
    }, null, D);
  }, y.translateTo = function(b, j, I, D, T) {
    y.transform(b, function() {
      var $ = t.apply(this, arguments), V = this.__zoom, F = D == null ? v($) : typeof D == "function" ? D.apply(this, arguments) : D;
      return n(Ko.translate(F[0], F[1]).scale(V.k).translate(
        typeof j == "function" ? -j.apply(this, arguments) : -j,
        typeof I == "function" ? -I.apply(this, arguments) : -I
      ), $, s);
    }, D, T);
  };
  function N(b, j) {
    return j = Math.max(i[0], Math.min(i[1], j)), j === b.k ? b : new nt(j, b.x, b.y);
  }
  function m(b, j, I) {
    var D = j[0] - I[0] * b.k, T = j[1] - I[1] * b.k;
    return D === b.x && T === b.y ? b : new nt(b.k, D, T);
  }
  function v(b) {
    return [(+b[0][0] + +b[1][0]) / 2, (+b[0][1] + +b[1][1]) / 2];
  }
  function E(b, j, I, D) {
    b.on("start.zoom", function() {
      C(this, arguments).event(D).start();
    }).on("interrupt.zoom end.zoom", function() {
      C(this, arguments).event(D).end();
    }).tween("zoom", function() {
      var T = this, $ = arguments, V = C(T, $).event(D), F = t.apply(T, $), B = I == null ? v(F) : typeof I == "function" ? I.apply(T, $) : I, U = Math.max(F[1][0] - F[0][0], F[1][1] - F[0][1]), Z = T.__zoom, ee = typeof j == "function" ? j.apply(T, $) : j, se = u(Z.invert(B).concat(U / Z.k), ee.invert(B).concat(U / ee.k));
      return function(J) {
        if (J === 1) J = ee;
        else {
          var L = se(J), q = U / L[2];
          J = new nt(q, B[0] - L[0] * q, B[1] - L[1] * q);
        }
        V.zoom(null, J);
      };
    });
  }
  function C(b, j, I) {
    return !I && b.__zooming || new k(b, j);
  }
  function k(b, j) {
    this.that = b, this.args = j, this.active = 0, this.sourceEvent = null, this.extent = t.apply(b, j), this.taps = 0;
  }
  k.prototype = {
    event: function(b) {
      return b && (this.sourceEvent = b), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(b, j) {
      return this.mouse && b !== "mouse" && (this.mouse[1] = j.invert(this.mouse[0])), this.touch0 && b !== "touch" && (this.touch0[1] = j.invert(this.touch0[0])), this.touch1 && b !== "touch" && (this.touch1[1] = j.invert(this.touch1[0])), this.that.__zoom = j, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(b) {
      var j = Le(this.that).datum();
      l.call(
        b,
        this.that,
        new Ch(b, {
          sourceEvent: this.sourceEvent,
          target: y,
          transform: this.that.__zoom,
          dispatch: l
        }),
        j
      );
    }
  };
  function _(b, ...j) {
    if (!e.apply(this, arguments)) return;
    var I = C(this, j).event(b), D = this.__zoom, T = Math.max(i[0], Math.min(i[1], D.k * Math.pow(2, o.apply(this, arguments)))), $ = We(b);
    if (I.wheel)
      (I.mouse[0][0] !== $[0] || I.mouse[0][1] !== $[1]) && (I.mouse[1] = D.invert(I.mouse[0] = $)), clearTimeout(I.wheel);
    else {
      if (D.k === T) return;
      I.mouse = [$, D.invert($)], Co(this), I.start();
    }
    gn(b), I.wheel = setTimeout(V, g), I.zoom("mouse", n(m(N(D, T), I.mouse[0], I.mouse[1]), I.extent, s));
    function V() {
      I.wheel = null, I.end();
    }
  }
  function P(b, ...j) {
    if (h || !e.apply(this, arguments)) return;
    var I = b.currentTarget, D = C(this, j, !0).event(b), T = Le(b.view).on("mousemove.zoom", B, !0).on("mouseup.zoom", U, !0), $ = We(b, I), V = b.clientX, F = b.clientY;
    Pa(b.view), Pr(b), D.mouse = [$, this.__zoom.invert($)], Co(this), D.start();
    function B(Z) {
      if (gn(Z), !D.moved) {
        var ee = Z.clientX - V, se = Z.clientY - F;
        D.moved = ee * ee + se * se > x;
      }
      D.event(Z).zoom("mouse", n(m(D.that.__zoom, D.mouse[0] = We(Z, I), D.mouse[1]), D.extent, s));
    }
    function U(Z) {
      T.on("mousemove.zoom mouseup.zoom", null), $a(Z.view, D.moved), gn(Z), D.event(Z).end();
    }
  }
  function W(b, ...j) {
    if (e.apply(this, arguments)) {
      var I = this.__zoom, D = We(b.changedTouches ? b.changedTouches[0] : b, this), T = I.invert(D), $ = I.k * (b.shiftKey ? 0.5 : 2), V = n(m(N(I, $), D, T), t.apply(this, j), s);
      gn(b), c > 0 ? Le(this).transition().duration(c).call(E, V, D, b) : Le(this).call(y.transform, V, D, b);
    }
  }
  function A(b, ...j) {
    if (e.apply(this, arguments)) {
      var I = b.touches, D = I.length, T = C(this, j, b.changedTouches.length === D).event(b), $, V, F, B;
      for (Pr(b), V = 0; V < D; ++V)
        F = I[V], B = We(F, this), B = [B, this.__zoom.invert(B), F.identifier], T.touch0 ? !T.touch1 && T.touch0[2] !== B[2] && (T.touch1 = B, T.taps = 0) : (T.touch0 = B, $ = !0, T.taps = 1 + !!f);
      f && (f = clearTimeout(f)), $ && (T.taps < 2 && (d = B[0], f = setTimeout(function() {
        f = null;
      }, p)), Co(this), T.start());
    }
  }
  function z(b, ...j) {
    if (this.__zooming) {
      var I = C(this, j).event(b), D = b.changedTouches, T = D.length, $, V, F, B;
      for (gn(b), $ = 0; $ < T; ++$)
        V = D[$], F = We(V, this), I.touch0 && I.touch0[2] === V.identifier ? I.touch0[0] = F : I.touch1 && I.touch1[2] === V.identifier && (I.touch1[0] = F);
      if (V = I.that.__zoom, I.touch1) {
        var U = I.touch0[0], Z = I.touch0[1], ee = I.touch1[0], se = I.touch1[1], J = (J = ee[0] - U[0]) * J + (J = ee[1] - U[1]) * J, L = (L = se[0] - Z[0]) * L + (L = se[1] - Z[1]) * L;
        V = N(V, Math.sqrt(J / L)), F = [(U[0] + ee[0]) / 2, (U[1] + ee[1]) / 2], B = [(Z[0] + se[0]) / 2, (Z[1] + se[1]) / 2];
      } else if (I.touch0) F = I.touch0[0], B = I.touch0[1];
      else return;
      I.zoom("touch", n(m(V, F, B), I.extent, s));
    }
  }
  function H(b, ...j) {
    if (this.__zooming) {
      var I = C(this, j).event(b), D = b.changedTouches, T = D.length, $, V;
      for (Pr(b), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, p), $ = 0; $ < T; ++$)
        V = D[$], I.touch0 && I.touch0[2] === V.identifier ? delete I.touch0 : I.touch1 && I.touch1[2] === V.identifier && delete I.touch1;
      if (I.touch1 && !I.touch0 && (I.touch0 = I.touch1, delete I.touch1), I.touch0) I.touch0[1] = this.__zoom.invert(I.touch0[0]);
      else if (I.end(), I.taps === 2 && (V = We(V, this), Math.hypot(d[0] - V[0], d[1] - V[1]) < w)) {
        var F = Le(this).on("dblclick.zoom");
        F && F.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(b) {
    return arguments.length ? (o = typeof b == "function" ? b : po(+b), y) : o;
  }, y.filter = function(b) {
    return arguments.length ? (e = typeof b == "function" ? b : po(!!b), y) : e;
  }, y.touchable = function(b) {
    return arguments.length ? (r = typeof b == "function" ? b : po(!!b), y) : r;
  }, y.extent = function(b) {
    return arguments.length ? (t = typeof b == "function" ? b : po([[+b[0][0], +b[0][1]], [+b[1][0], +b[1][1]]]), y) : t;
  }, y.scaleExtent = function(b) {
    return arguments.length ? (i[0] = +b[0], i[1] = +b[1], y) : [i[0], i[1]];
  }, y.translateExtent = function(b) {
    return arguments.length ? (s[0][0] = +b[0][0], s[1][0] = +b[1][0], s[0][1] = +b[0][1], s[1][1] = +b[1][1], y) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, y.constrain = function(b) {
    return arguments.length ? (n = b, y) : n;
  }, y.duration = function(b) {
    return arguments.length ? (c = +b, y) : c;
  }, y.interpolate = function(b) {
    return arguments.length ? (u = b, y) : u;
  }, y.on = function() {
    var b = l.on.apply(l, arguments);
    return b === l ? y : b;
  }, y.clickDistance = function(b) {
    return arguments.length ? (x = (b = +b) * b, y) : Math.sqrt(x);
  }, y.tapDistance = function(b) {
    return arguments.length ? (w = +b, y) : w;
  }, y;
}
const He = {
  error001: (e = "react") => `Seems like you have not used zustand provider as an ancestor. Help: https://${e}flow.dev/error#001`,
  error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",
  error003: (e) => `Node type "${e}" not found. Using fallback type "default".`,
  error004: () => "The parent container needs a width and a height to render the graph.",
  error005: () => "Only child nodes can use a parent extent.",
  error006: () => "Can't create edge. An edge needs a source and a target.",
  error007: (e) => `The old edge with id=${e} does not exist.`,
  error009: (e) => `Marker type "${e}" doesn't exist.`,
  error008: (e, { id: t, sourceHandle: n, targetHandle: o }) => `Couldn't create edge for ${e} handle id: "${e === "source" ? n : o}", edge id: ${t}.`,
  error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.",
  error011: (e) => `Edge type "${e}" not found. Using fallback type "default".`,
  error012: (e) => `Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,
  error013: (e = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${e}/dist/style.css' or base.css to make sure everything is working properly.`,
  error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",
  error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",
  error016: (e) => `Edge with id "${e}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`
}, Mn = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], Ga = ["Enter", " ", "Escape"], Ja = {
  "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.",
  "node.a11yDescription.ariaLiveMessage": ({ direction: e, x: t, y: n }) => `Moved selected node ${e}. New position, x: ${t}, y: ${n}`,
  "edge.a11yDescription.default": "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.",
  // Control elements
  "controls.ariaLabel": "Control Panel",
  "controls.zoomIn.ariaLabel": "Zoom In",
  "controls.zoomOut.ariaLabel": "Zoom Out",
  "controls.fitView.ariaLabel": "Fit View",
  "controls.interactive.ariaLabel": "Toggle Interactivity",
  // Mini map
  "minimap.ariaLabel": "Mini Map",
  // Handle
  "handle.ariaLabel": "Handle"
};
var Bt;
(function(e) {
  e.Strict = "strict", e.Loose = "loose";
})(Bt || (Bt = {}));
var Et;
(function(e) {
  e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(Et || (Et = {}));
var Dn;
(function(e) {
  e.Partial = "partial", e.Full = "full";
})(Dn || (Dn = {}));
const Qa = {
  inProgress: !1,
  isValid: null,
  from: null,
  fromHandle: null,
  fromPosition: null,
  fromNode: null,
  to: null,
  toHandle: null,
  toPosition: null,
  toNode: null,
  pointer: null
};
var dt;
(function(e) {
  e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(dt || (dt = {}));
var zo;
(function(e) {
  e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(zo || (zo = {}));
var te;
(function(e) {
  e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(te || (te = {}));
const ss = {
  [te.Left]: te.Right,
  [te.Right]: te.Left,
  [te.Top]: te.Bottom,
  [te.Bottom]: te.Top
};
function ec(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const tc = (e) => "id" in e && "source" in e && "target" in e, Mh = (e) => "id" in e && "position" in e && !("source" in e) && !("target" in e), wi = (e) => "id" in e && "internals" in e && !("source" in e) && !("target" in e), Hn = (e, t = [0, 0]) => {
  const { width: n, height: o } = st(e), r = e.origin ?? t, i = n * r[0], s = o * r[1];
  return {
    x: e.position.x - i,
    y: e.position.y - s
  };
}, Dh = (e, t = { nodeOrigin: [0, 0] }) => {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const n = e.reduce((o, r) => {
    const i = typeof r == "string";
    let s = !t.nodeLookup && !i ? r : void 0;
    t.nodeLookup && (s = i ? t.nodeLookup.get(r) : wi(r) ? r : t.nodeLookup.get(r.id));
    const c = s ? Ro(s, t.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return Uo(o, c);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return Go(n);
}, On = (e, t = {}) => {
  let n = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, o = !1;
  return e.forEach((r) => {
    (t.filter === void 0 || t.filter(r)) && (n = Uo(n, Ro(r)), o = !0);
  }), o ? Go(n) : { x: 0, y: 0, width: 0, height: 0 };
}, vi = (e, t, [n, o, r] = [0, 0, 1], i = !1, s = !1) => {
  const c = {
    ...Kt(t, [n, o, r]),
    width: t.width / r,
    height: t.height / r
  }, u = [];
  for (const l of e.values()) {
    const { measured: f, selectable: d = !0, hidden: h = !1 } = l;
    if (s && !d || h)
      continue;
    const p = f.width ?? l.width ?? l.initialWidth ?? null, g = f.height ?? l.height ?? l.initialHeight ?? null, x = Pn(c, Wt(l)), w = (p ?? 0) * (g ?? 0), y = i && x > 0;
    (!l.internals.handleBounds || y || x >= w || l.dragging) && u.push(l);
  }
  return u;
}, Ph = (e, t) => {
  const n = /* @__PURE__ */ new Set();
  return e.forEach((o) => {
    n.add(o.id);
  }), t.filter((o) => n.has(o.source) || n.has(o.target));
};
function $h(e, t) {
  const n = /* @__PURE__ */ new Map(), o = t?.nodes ? new Set(t.nodes.map((r) => r.id)) : null;
  return e.forEach((r) => {
    r.measured.width && r.measured.height && (t?.includeHiddenNodes || !r.hidden) && (!o || o.has(r.id)) && n.set(r.id, r);
  }), n;
}
async function Th({ nodes: e, width: t, height: n, panZoom: o, minZoom: r, maxZoom: i }, s) {
  if (e.size === 0)
    return !0;
  const c = $h(e, s), u = On(c), l = Si(u, t, n, s?.minZoom ?? r, s?.maxZoom ?? i, s?.padding ?? 0.1);
  return await o.setViewport(l, {
    duration: s?.duration,
    ease: s?.ease,
    interpolate: s?.interpolate
  }), !0;
}
function nc({ nodeId: e, nextPosition: t, nodeLookup: n, nodeOrigin: o = [0, 0], nodeExtent: r, onError: i }) {
  const s = n.get(e), c = s.parentId ? n.get(s.parentId) : void 0, { x: u, y: l } = c ? c.internals.positionAbsolute : { x: 0, y: 0 }, f = s.origin ?? o;
  let d = s.extent || r;
  if (s.extent === "parent" && !s.expandParent)
    if (!c)
      i?.("005", He.error005());
    else {
      const p = c.measured.width, g = c.measured.height;
      p && g && (d = [
        [u, l],
        [u + p, l + g]
      ]);
    }
  else c && jt(s.extent) && (d = [
    [s.extent[0][0] + u, s.extent[0][1] + l],
    [s.extent[1][0] + u, s.extent[1][1] + l]
  ]);
  const h = jt(d) ? It(t, d, s.measured) : t;
  return (s.measured.width === void 0 || s.measured.height === void 0) && i?.("015", He.error015()), {
    position: {
      x: h.x - u + (s.measured.width ?? 0) * f[0],
      y: h.y - l + (s.measured.height ?? 0) * f[1]
    },
    positionAbsolute: h
  };
}
async function zh({ nodesToRemove: e = [], edgesToRemove: t = [], nodes: n, edges: o, onBeforeDelete: r }) {
  const i = new Set(e.map((h) => h.id)), s = [];
  for (const h of n) {
    if (h.deletable === !1)
      continue;
    const p = i.has(h.id), g = !p && h.parentId && s.find((x) => x.id === h.parentId);
    (p || g) && s.push(h);
  }
  const c = new Set(t.map((h) => h.id)), u = o.filter((h) => h.deletable !== !1), f = Ph(s, u);
  for (const h of u)
    c.has(h.id) && !f.find((g) => g.id === h.id) && f.push(h);
  if (!r)
    return {
      edges: f,
      nodes: s
    };
  const d = await r({
    nodes: s,
    edges: f
  });
  return typeof d == "boolean" ? d ? { edges: f, nodes: s } : { edges: [], nodes: [] } : d;
}
const Ft = (e, t = 0, n = 1) => Math.min(Math.max(e, t), n), It = (e = { x: 0, y: 0 }, t, n) => ({
  x: Ft(e.x, t[0][0], t[1][0] - (n?.width ?? 0)),
  y: Ft(e.y, t[0][1], t[1][1] - (n?.height ?? 0))
});
function oc(e, t, n) {
  const { width: o, height: r } = st(n), { x: i, y: s } = n.internals.positionAbsolute;
  return It(e, [
    [i, s],
    [i + o, s + r]
  ], t);
}
const as = (e, t, n) => e < t ? Ft(Math.abs(e - t), 1, t) / t : e > n ? -Ft(Math.abs(e - n), 1, t) / t : 0, bi = (e, t, n = 15, o = 40) => {
  const r = as(e.x, o, t.width - o) * n, i = as(e.y, o, t.height - o) * n;
  return [r, i];
}, Uo = (e, t) => ({
  x: Math.min(e.x, t.x),
  y: Math.min(e.y, t.y),
  x2: Math.max(e.x2, t.x2),
  y2: Math.max(e.y2, t.y2)
}), ei = ({ x: e, y: t, width: n, height: o }) => ({
  x: e,
  y: t,
  x2: e + n,
  y2: t + o
}), Go = ({ x: e, y: t, x2: n, y2: o }) => ({
  x: e,
  y: t,
  width: n - e,
  height: o - t
}), Wt = (e, t = [0, 0]) => {
  const { x: n, y: o } = wi(e) ? e.internals.positionAbsolute : Hn(e, t);
  return {
    x: n,
    y: o,
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}, Ro = (e, t = [0, 0]) => {
  const { x: n, y: o } = wi(e) ? e.internals.positionAbsolute : Hn(e, t);
  return {
    x: n,
    y: o,
    x2: n + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
    y2: o + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
  };
}, rc = (e, t) => Go(Uo(ei(e), ei(t))), Pn = (e, t) => {
  const n = Math.max(0, Math.min(e.x + e.width, t.x + t.width) - Math.max(e.x, t.x)), o = Math.max(0, Math.min(e.y + e.height, t.y + t.height) - Math.max(e.y, t.y));
  return Math.ceil(n * o);
}, cs = (e) => Ye(e.width) && Ye(e.height) && Ye(e.x) && Ye(e.y), Ye = (e) => !isNaN(e) && isFinite(e), ic = (e, t) => (n, o) => {
}, Bn = (e, t = [1, 1]) => ({
  x: t[0] * Math.round(e.x / t[0]),
  y: t[1] * Math.round(e.y / t[1])
}), Kt = ({ x: e, y: t }, [n, o, r], i = !1, s = [1, 1]) => {
  const c = {
    x: (e - n) / r,
    y: (t - o) / r
  };
  return i ? Bn(c, s) : c;
}, Xt = ({ x: e, y: t }, [n, o, r]) => ({
  x: e * r + n,
  y: t * r + o
});
function $t(e, t) {
  if (typeof e == "number")
    return Math.floor((t - t / (1 + e)) * 0.5);
  if (typeof e == "string" && e.endsWith("px")) {
    const n = parseFloat(e);
    if (!Number.isNaN(n))
      return Math.floor(n);
  }
  if (typeof e == "string" && e.endsWith("%")) {
    const n = parseFloat(e);
    if (!Number.isNaN(n))
      return Math.floor(t * n * 0.01);
  }
  return console.error(`The padding value "${e}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function Rh(e, t, n) {
  if (typeof e == "string" || typeof e == "number") {
    const o = $t(e, n), r = $t(e, t);
    return {
      top: o,
      right: r,
      bottom: o,
      left: r,
      x: r * 2,
      y: o * 2
    };
  }
  if (typeof e == "object") {
    const o = $t(e.top ?? e.y ?? 0, n), r = $t(e.bottom ?? e.y ?? 0, n), i = $t(e.left ?? e.x ?? 0, t), s = $t(e.right ?? e.x ?? 0, t);
    return { top: o, right: s, bottom: r, left: i, x: i + s, y: o + r };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function Lh(e, t, n, o, r, i) {
  const { x: s, y: c } = Xt(e, [t, n, o]), { x: u, y: l } = Xt({ x: e.x + e.width, y: e.y + e.height }, [t, n, o]), f = r - u, d = i - l;
  return {
    left: Math.floor(s),
    top: Math.floor(c),
    right: Math.floor(f),
    bottom: Math.floor(d)
  };
}
const Si = (e, t, n, o, r, i) => {
  const s = Rh(i, t, n), c = (t - s.x) / e.width, u = (n - s.y) / e.height, l = Math.min(c, u), f = Ft(l, o, r), d = e.x + e.width / 2, h = e.y + e.height / 2, p = t / 2 - d * f, g = n / 2 - h * f, x = Lh(e, p, g, f, t, n), w = {
    left: Math.min(x.left - s.left, 0),
    top: Math.min(x.top - s.top, 0),
    right: Math.min(x.right - s.right, 0),
    bottom: Math.min(x.bottom - s.bottom, 0)
  };
  return {
    x: p - w.left + w.right,
    y: g - w.top + w.bottom,
    zoom: f
  };
}, $n = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function jt(e) {
  return e != null && e !== "parent";
}
function st(e) {
  return {
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}
function sc(e) {
  return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function ac(e, t = { width: 0, height: 0 }, n, o, r) {
  const i = { ...e }, s = o.get(n);
  if (s) {
    const c = s.origin || r;
    i.x += s.internals.positionAbsolute.x - (t.width ?? 0) * c[0], i.y += s.internals.positionAbsolute.y - (t.height ?? 0) * c[1];
  }
  return i;
}
function ls(e, t) {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
}
function Vh() {
  let e, t;
  return { promise: new Promise((o, r) => {
    e = o, t = r;
  }), resolve: e, reject: t };
}
function Hh(e) {
  return { ...Ja, ...e || {} };
}
function Cn(e, { snapGrid: t = [0, 0], snapToGrid: n = !1, transform: o, containerBounds: r }) {
  const { x: i, y: s } = qe(e), c = Kt({ x: i - (r?.left ?? 0), y: s - (r?.top ?? 0) }, o), { x: u, y: l } = n ? Bn(c, t) : c;
  return {
    xSnapped: u,
    ySnapped: l,
    ...c
  };
}
const Ni = (e) => ({
  width: e.offsetWidth,
  height: e.offsetHeight
}), cc = (e) => e?.getRootNode?.() || window?.document, Oh = ["INPUT", "SELECT", "TEXTAREA"];
function lc(e) {
  const t = e.composedPath?.()?.[0] || e.target;
  return t?.nodeType !== 1 ? !1 : Oh.includes(t.nodeName) || t.hasAttribute("contenteditable") || !!t.closest(".nokey");
}
const uc = (e) => "clientX" in e, qe = (e, t) => {
  const n = uc(e), o = n ? e.clientX : e.touches?.[0].clientX, r = n ? e.clientY : e.touches?.[0].clientY;
  return {
    x: o - (t?.left ?? 0),
    y: r - (t?.top ?? 0)
  };
}, us = (e, t, n, o, r) => {
  const i = t.querySelectorAll(`.${e}`);
  return !i || !i.length ? null : Array.from(i).map((s) => {
    const c = s.getBoundingClientRect();
    return {
      id: s.getAttribute("data-handleid"),
      type: e,
      nodeId: r,
      position: s.getAttribute("data-handlepos"),
      x: (c.left - n.left) / o,
      y: (c.top - n.top) / o,
      ...Ni(s)
    };
  });
};
function dc({ sourceX: e, sourceY: t, targetX: n, targetY: o, sourceControlX: r, sourceControlY: i, targetControlX: s, targetControlY: c }) {
  const u = e * 0.125 + r * 0.375 + s * 0.375 + n * 0.125, l = t * 0.125 + i * 0.375 + c * 0.375 + o * 0.125, f = Math.abs(u - e), d = Math.abs(l - t);
  return [u, l, f, d];
}
function go(e, t) {
  return e >= 0 ? 0.5 * e : t * 25 * Math.sqrt(-e);
}
function ds({ pos: e, x1: t, y1: n, x2: o, y2: r, c: i }) {
  switch (e) {
    case te.Left:
      return [t - go(t - o, i), n];
    case te.Right:
      return [t + go(o - t, i), n];
    case te.Top:
      return [t, n - go(n - r, i)];
    case te.Bottom:
      return [t, n + go(r - n, i)];
  }
}
function fc({ sourceX: e, sourceY: t, sourcePosition: n = te.Bottom, targetX: o, targetY: r, targetPosition: i = te.Top, curvature: s = 0.25 }) {
  const [c, u] = ds({
    pos: n,
    x1: e,
    y1: t,
    x2: o,
    y2: r,
    c: s
  }), [l, f] = ds({
    pos: i,
    x1: o,
    y1: r,
    x2: e,
    y2: t,
    c: s
  }), [d, h, p, g] = dc({
    sourceX: e,
    sourceY: t,
    targetX: o,
    targetY: r,
    sourceControlX: c,
    sourceControlY: u,
    targetControlX: l,
    targetControlY: f
  });
  return [
    `M${e},${t} C${c},${u} ${l},${f} ${o},${r}`,
    d,
    h,
    p,
    g
  ];
}
function hc({ sourceX: e, sourceY: t, targetX: n, targetY: o }) {
  const r = Math.abs(n - e) / 2, i = n < e ? n + r : n - r, s = Math.abs(o - t) / 2, c = o < t ? o + s : o - s;
  return [i, c, r, s];
}
function Bh({ sourceNode: e, targetNode: t, selected: n = !1, zIndex: o = 0, elevateOnSelect: r = !1, zIndexMode: i = "basic" }) {
  if (i === "manual")
    return o;
  const s = r && n ? o + 1e3 : o, c = Math.max(e.parentId || r && e.selected ? e.internals.z : 0, t.parentId || r && t.selected ? t.internals.z : 0);
  return s + c;
}
function Fh({ sourceNode: e, targetNode: t, width: n, height: o, transform: r }) {
  const i = Uo(Ro(e), Ro(t));
  i.x === i.x2 && (i.x2 += 1), i.y === i.y2 && (i.y2 += 1);
  const s = {
    x: -r[0] / r[2],
    y: -r[1] / r[2],
    width: n / r[2],
    height: o / r[2]
  };
  return Pn(s, Go(i)) > 0;
}
const pc = ({ source: e, sourceHandle: t, target: n, targetHandle: o }) => `xy-edge__${e}${t || ""}-${n}${o || ""}`, Wh = (e, t) => t.some((n) => n.source === e.source && n.target === e.target && (n.sourceHandle === e.sourceHandle || !n.sourceHandle && !e.sourceHandle) && (n.targetHandle === e.targetHandle || !n.targetHandle && !e.targetHandle)), Xh = (e, t, n = {}) => {
  if (!e.source || !e.target)
    return n.onError?.("006", He.error006()), t;
  const o = n.getEdgeId || pc;
  let r;
  return tc(e) ? r = { ...e } : r = {
    ...e,
    id: o(e)
  }, Wh(r, t) ? t : (r.sourceHandle === null && delete r.sourceHandle, r.targetHandle === null && delete r.targetHandle, t.concat(r));
}, Yh = (e, t, n, o = { shouldReplaceId: !0 }) => {
  const { id: r, ...i } = e;
  if (!t.source || !t.target)
    return o.onError?.("006", He.error006()), n;
  if (!n.find((l) => l.id === e.id))
    return o.onError?.("007", He.error007(r)), n;
  const c = o.getEdgeId || pc, u = {
    ...i,
    id: o.shouldReplaceId ? c(t) : r,
    source: t.source,
    target: t.target,
    sourceHandle: t.sourceHandle,
    targetHandle: t.targetHandle
  };
  return n.filter((l) => l.id !== r).concat(u);
};
function gc({ sourceX: e, sourceY: t, targetX: n, targetY: o }) {
  const [r, i, s, c] = hc({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: o
  });
  return [`M ${e},${t}L ${n},${o}`, r, i, s, c];
}
const fs = {
  [te.Left]: { x: -1, y: 0 },
  [te.Right]: { x: 1, y: 0 },
  [te.Top]: { x: 0, y: -1 },
  [te.Bottom]: { x: 0, y: 1 }
}, qh = ({ source: e, sourcePosition: t = te.Bottom, target: n }) => t === te.Left || t === te.Right ? e.x < n.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < n.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, hs = (e, t) => Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
function Zh({ source: e, sourcePosition: t = te.Bottom, target: n, targetPosition: o = te.Top, center: r, offset: i, stepPosition: s }) {
  const c = fs[t], u = fs[o], l = { x: e.x + c.x * i, y: e.y + c.y * i }, f = { x: n.x + u.x * i, y: n.y + u.y * i }, d = qh({
    source: l,
    sourcePosition: t,
    target: f
  }), h = d.x !== 0 ? "x" : "y", p = d[h];
  let g = [], x, w;
  const y = { x: 0, y: 0 }, N = { x: 0, y: 0 }, [, , m, v] = hc({
    sourceX: e.x,
    sourceY: e.y,
    targetX: n.x,
    targetY: n.y
  });
  if (c[h] * u[h] === -1) {
    h === "x" ? (x = r.x ?? l.x + (f.x - l.x) * s, w = r.y ?? (l.y + f.y) / 2) : (x = r.x ?? (l.x + f.x) / 2, w = r.y ?? l.y + (f.y - l.y) * s);
    const _ = [
      { x, y: l.y },
      { x, y: f.y }
    ], P = [
      { x: l.x, y: w },
      { x: f.x, y: w }
    ];
    c[h] === p ? g = h === "x" ? _ : P : g = h === "x" ? P : _;
  } else {
    const _ = [{ x: l.x, y: f.y }], P = [{ x: f.x, y: l.y }];
    if (h === "x" ? g = c.x === p ? P : _ : g = c.y === p ? _ : P, t === o) {
      const b = Math.abs(e[h] - n[h]);
      if (b <= i) {
        const j = Math.min(i - 1, i - b);
        c[h] === p ? y[h] = (l[h] > e[h] ? -1 : 1) * j : N[h] = (f[h] > n[h] ? -1 : 1) * j;
      }
    }
    if (t !== o) {
      const b = h === "x" ? "y" : "x", j = c[h] === u[b], I = l[b] > f[b], D = l[b] < f[b];
      (c[h] === 1 && (!j && I || j && D) || c[h] !== 1 && (!j && D || j && I)) && (g = h === "x" ? _ : P);
    }
    const W = { x: l.x + y.x, y: l.y + y.y }, A = { x: f.x + N.x, y: f.y + N.y }, z = Math.max(Math.abs(W.x - g[0].x), Math.abs(A.x - g[0].x)), H = Math.max(Math.abs(W.y - g[0].y), Math.abs(A.y - g[0].y));
    z >= H ? (x = (W.x + A.x) / 2, w = g[0].y) : (x = g[0].x, w = (W.y + A.y) / 2);
  }
  const E = { x: l.x + y.x, y: l.y + y.y }, C = { x: f.x + N.x, y: f.y + N.y };
  return [[
    e,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...E.x !== g[0].x || E.y !== g[0].y ? [E] : [],
    ...g,
    ...C.x !== g[g.length - 1].x || C.y !== g[g.length - 1].y ? [C] : [],
    n
  ], x, w, m, v];
}
function Kh(e, t, n, o) {
  const r = Math.min(hs(e, t) / 2, hs(t, n) / 2, o), { x: i, y: s } = t;
  if (e.x === i && i === n.x || e.y === s && s === n.y)
    return `L${i} ${s}`;
  if (e.y === s) {
    const l = e.x < n.x ? -1 : 1, f = e.y < n.y ? 1 : -1;
    return `L ${i + r * l},${s}Q ${i},${s} ${i},${s + r * f}`;
  }
  const c = e.x < n.x ? 1 : -1, u = e.y < n.y ? -1 : 1;
  return `L ${i},${s + r * u}Q ${i},${s} ${i + r * c},${s}`;
}
function Lo({ sourceX: e, sourceY: t, sourcePosition: n = te.Bottom, targetX: o, targetY: r, targetPosition: i = te.Top, borderRadius: s = 5, centerX: c, centerY: u, offset: l = 20, stepPosition: f = 0.5 }) {
  const [d, h, p, g, x] = Zh({
    source: { x: e, y: t },
    sourcePosition: n,
    target: { x: o, y: r },
    targetPosition: i,
    center: { x: c, y: u },
    offset: l,
    stepPosition: f
  });
  let w = `M${d[0].x} ${d[0].y}`;
  for (let y = 1; y < d.length - 1; y++)
    w += Kh(d[y - 1], d[y], d[y + 1], s);
  return w += `L${d[d.length - 1].x} ${d[d.length - 1].y}`, [w, h, p, g, x];
}
function ps(e) {
  return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function Uh(e) {
  const { sourceNode: t, targetNode: n } = e;
  if (!ps(t) || !ps(n))
    return null;
  const o = t.internals.handleBounds || gs(t.handles), r = n.internals.handleBounds || gs(n.handles), i = ms(o?.source ?? [], e.sourceHandle), s = ms(
    // when connection type is loose we can define all handles as sources and connect source -> source
    e.connectionMode === Bt.Strict ? r?.target ?? [] : (r?.target ?? []).concat(r?.source ?? []),
    e.targetHandle
  );
  if (!i || !s)
    return e.onError?.("008", He.error008(i ? "target" : "source", {
      id: e.id,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle
    })), null;
  const c = i?.position || te.Bottom, u = s?.position || te.Top, l = _t(t, i, c), f = _t(n, s, u);
  return {
    sourceX: l.x,
    sourceY: l.y,
    targetX: f.x,
    targetY: f.y,
    sourcePosition: c,
    targetPosition: u
  };
}
function gs(e) {
  if (!e)
    return null;
  const t = [], n = [];
  for (const o of e)
    o.width = o.width ?? 1, o.height = o.height ?? 1, o.type === "source" ? t.push(o) : o.type === "target" && n.push(o);
  return {
    source: t,
    target: n
  };
}
function _t(e, t, n = te.Left, o = !1) {
  const r = (t?.x ?? 0) + e.internals.positionAbsolute.x, i = (t?.y ?? 0) + e.internals.positionAbsolute.y, { width: s, height: c } = t ?? st(e);
  if (o)
    return { x: r + s / 2, y: i + c / 2 };
  switch (t?.position ?? n) {
    case te.Top:
      return { x: r + s / 2, y: i };
    case te.Right:
      return { x: r + s, y: i + c / 2 };
    case te.Bottom:
      return { x: r + s / 2, y: i + c };
    case te.Left:
      return { x: r, y: i + c / 2 };
  }
}
function ms(e, t) {
  return e && (t ? e.find((n) => n.id === t) : e[0]) || null;
}
function ti(e, t) {
  return e ? typeof e == "string" ? e : `${t ? `${t}__` : ""}${Object.keys(e).sort().map((o) => `${o}=${e[o]}`).join("&")}` : "";
}
function Gh(e, { id: t, defaultColor: n, defaultMarkerStart: o, defaultMarkerEnd: r }) {
  const i = /* @__PURE__ */ new Set();
  return e.reduce((s, c) => ([c.markerStart || o, c.markerEnd || r].forEach((u) => {
    if (u && typeof u == "object") {
      const l = ti(u, t);
      i.has(l) || (s.push({ id: l, color: u.color || n, ...u }), i.add(l));
    }
  }), s), []).sort((s, c) => s.id.localeCompare(c.id));
}
const mc = 1e3, Jh = 10, Ei = {
  nodeOrigin: [0, 0],
  nodeExtent: Mn,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, Qh = {
  ...Ei,
  checkEquality: !0
};
function Ci(e, t) {
  const n = { ...e };
  for (const o in t)
    t[o] !== void 0 && (n[o] = t[o]);
  return n;
}
function ep(e, t, n) {
  const o = Ci(Ei, n);
  for (const r of e.values())
    if (r.parentId)
      Ii(r, e, t, o);
    else {
      const i = Hn(r, o.nodeOrigin), s = jt(r.extent) ? r.extent : o.nodeExtent, c = It(i, s, st(r));
      r.internals.positionAbsolute = c;
    }
}
function tp(e, t) {
  if (!e.handles)
    return e.measured ? t?.internals.handleBounds : void 0;
  const n = [], o = [];
  for (const r of e.handles) {
    const i = {
      id: r.id,
      width: r.width ?? 1,
      height: r.height ?? 1,
      nodeId: e.id,
      x: r.x,
      y: r.y,
      position: r.position,
      type: r.type
    };
    r.type === "source" ? n.push(i) : r.type === "target" && o.push(i);
  }
  return {
    source: n,
    target: o
  };
}
function ki(e) {
  return e === "manual";
}
function ni(e, t, n, o = {}) {
  const r = Ci(Qh, o), i = { i: 0 }, s = new Map(t), c = r?.elevateNodesOnSelect && !ki(r.zIndexMode) ? mc : 0;
  let u = e.length > 0, l = !1;
  t.clear(), n.clear();
  for (const f of e) {
    let d = s.get(f.id);
    if (r.checkEquality && f === d?.internals.userNode)
      t.set(f.id, d);
    else {
      const h = Hn(f, r.nodeOrigin), p = jt(f.extent) ? f.extent : r.nodeExtent, g = It(h, p, st(f));
      d = {
        ...r.defaults,
        ...f,
        measured: {
          width: f.measured?.width,
          height: f.measured?.height
        },
        internals: {
          positionAbsolute: g,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: tp(f, d),
          z: yc(f, c, r.zIndexMode),
          userNode: f
        }
      }, t.set(f.id, d);
    }
    (d.measured === void 0 || d.measured.width === void 0 || d.measured.height === void 0) && !d.hidden && (u = !1), f.parentId && Ii(d, t, n, o, i), l ||= f.selected ?? !1;
  }
  return { nodesInitialized: u, hasSelectedNodes: l };
}
function np(e, t) {
  if (!e.parentId)
    return;
  const n = t.get(e.parentId);
  n ? n.set(e.id, e) : t.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function Ii(e, t, n, o, r) {
  const { elevateNodesOnSelect: i, nodeOrigin: s, nodeExtent: c, zIndexMode: u } = Ci(Ei, o), l = e.parentId, f = t.get(l);
  if (!f) {
    console.warn(`Parent node ${l} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  np(e, n), r && !f.parentId && f.internals.rootParentIndex === void 0 && u === "auto" && (f.internals.rootParentIndex = ++r.i, f.internals.z = f.internals.z + r.i * Jh), r && f.internals.rootParentIndex !== void 0 && (r.i = f.internals.rootParentIndex);
  const d = i && !ki(u) ? mc : 0, { x: h, y: p, z: g } = op(e, f, s, c, d, u), { positionAbsolute: x } = e.internals, w = h !== x.x || p !== x.y;
  (w || g !== e.internals.z) && t.set(e.id, {
    ...e,
    internals: {
      ...e.internals,
      positionAbsolute: w ? { x: h, y: p } : x,
      z: g
    }
  });
}
function yc(e, t, n) {
  const o = Ye(e.zIndex) ? e.zIndex : 0;
  return ki(n) ? o : o + (e.selected ? t : 0);
}
function op(e, t, n, o, r, i) {
  const { x: s, y: c } = t.internals.positionAbsolute, u = st(e), l = Hn(e, n), f = jt(e.extent) ? It(l, e.extent, u) : l;
  let d = It({ x: s + f.x, y: c + f.y }, o, u);
  e.extent === "parent" && (d = oc(d, u, t));
  const h = yc(e, r, i), p = t.internals.z ?? 0;
  return {
    x: d.x,
    y: d.y,
    z: p >= h ? p + 1 : h
  };
}
function ji(e, t, n, o = [0, 0]) {
  const r = [], i = /* @__PURE__ */ new Map();
  for (const s of e) {
    const c = t.get(s.parentId);
    if (!c)
      continue;
    const u = i.get(s.parentId)?.expandedRect ?? Wt(c), l = rc(u, s.rect);
    i.set(s.parentId, { expandedRect: l, parent: c });
  }
  return i.size > 0 && i.forEach(({ expandedRect: s, parent: c }, u) => {
    const l = c.internals.positionAbsolute, f = st(c), d = c.origin ?? o, h = s.x < l.x ? Math.round(Math.abs(l.x - s.x)) : 0, p = s.y < l.y ? Math.round(Math.abs(l.y - s.y)) : 0, g = Math.max(f.width, Math.round(s.width)), x = Math.max(f.height, Math.round(s.height)), w = (g - f.width) * d[0], y = (x - f.height) * d[1];
    (h > 0 || p > 0 || w || y) && (r.push({
      id: u,
      type: "position",
      position: {
        x: c.position.x - h + w,
        y: c.position.y - p + y
      }
    }), n.get(u)?.forEach((N) => {
      e.some((m) => m.id === N.id) || r.push({
        id: N.id,
        type: "position",
        position: {
          x: N.position.x + h,
          y: N.position.y + p
        }
      });
    })), (f.width < s.width || f.height < s.height || h || p) && r.push({
      id: u,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: g + (h ? d[0] * h - w : 0),
        height: x + (p ? d[1] * p - y : 0)
      }
    });
  }), r;
}
function rp(e, t, n, o, r, i, s) {
  const c = o?.querySelector(".xyflow__viewport");
  let u = !1;
  if (!c)
    return { changes: [], updatedInternals: u };
  const l = [], f = window.getComputedStyle(c), { m22: d } = new window.DOMMatrixReadOnly(f.transform), h = [];
  for (const p of e.values()) {
    const g = t.get(p.id);
    if (!g)
      continue;
    if (g.hidden) {
      t.set(g.id, {
        ...g,
        internals: {
          ...g.internals,
          handleBounds: void 0
        }
      }), u = !0;
      continue;
    }
    const x = Ni(p.nodeElement), w = g.measured.width !== x.width || g.measured.height !== x.height;
    if (!!(x.width && x.height && (w || !g.internals.handleBounds || p.force))) {
      const N = p.nodeElement.getBoundingClientRect(), m = jt(g.extent) ? g.extent : i;
      let { positionAbsolute: v } = g.internals;
      g.parentId && g.extent === "parent" ? v = oc(v, x, t.get(g.parentId)) : m && (v = It(v, m, x));
      const E = {
        ...g,
        measured: x,
        internals: {
          ...g.internals,
          positionAbsolute: v,
          handleBounds: {
            source: us("source", p.nodeElement, N, d, g.id),
            target: us("target", p.nodeElement, N, d, g.id)
          }
        }
      };
      t.set(g.id, E), g.parentId && Ii(E, t, n, { nodeOrigin: r, zIndexMode: s }), u = !0, w && (l.push({
        id: g.id,
        type: "dimensions",
        dimensions: x
      }), g.expandParent && g.parentId && h.push({
        id: g.id,
        parentId: g.parentId,
        rect: Wt(E, r)
      }));
    }
  }
  if (h.length > 0) {
    const p = ji(h, t, n, r);
    l.push(...p);
  }
  return { changes: l, updatedInternals: u };
}
async function ip({ delta: e, panZoom: t, transform: n, translateExtent: o, width: r, height: i }) {
  if (!t || !e.x && !e.y)
    return !1;
  const s = await t.setViewportConstrained({
    x: n[0] + e.x,
    y: n[1] + e.y,
    zoom: n[2]
  }, [
    [0, 0],
    [r, i]
  ], o);
  return !!s && (s.x !== n[0] || s.y !== n[1] || s.k !== n[2]);
}
function ys(e, t, n, o, r, i) {
  let s = r;
  const c = o.get(s) || /* @__PURE__ */ new Map();
  o.set(s, c.set(n, t)), s = `${r}-${e}`;
  const u = o.get(s) || /* @__PURE__ */ new Map();
  if (o.set(s, u.set(n, t)), i) {
    s = `${r}-${e}-${i}`;
    const l = o.get(s) || /* @__PURE__ */ new Map();
    o.set(s, l.set(n, t));
  }
}
function xc(e, t, n) {
  e.clear(), t.clear();
  for (const o of n) {
    const { source: r, target: i, sourceHandle: s = null, targetHandle: c = null } = o, u = { edgeId: o.id, source: r, target: i, sourceHandle: s, targetHandle: c }, l = `${r}-${s}--${i}-${c}`, f = `${i}-${c}--${r}-${s}`;
    ys("source", u, f, e, r, s), ys("target", u, l, e, i, c), t.set(o.id, o);
  }
}
function wc(e, t) {
  if (!e.parentId)
    return !1;
  const n = t.get(e.parentId);
  return n ? n.selected ? !0 : wc(n, t) : !1;
}
function xs(e, t, n) {
  let o = e;
  do {
    if (o?.matches?.(t))
      return !0;
    if (o === n)
      return !1;
    o = o?.parentElement;
  } while (o);
  return !1;
}
function sp(e, t, n, o) {
  const r = /* @__PURE__ */ new Map();
  for (const [i, s] of e)
    if ((s.selected || s.id === o) && (!s.parentId || !wc(s, e)) && (s.draggable || t && typeof s.draggable > "u")) {
      const c = e.get(i);
      c && r.set(i, {
        id: i,
        position: c.position || { x: 0, y: 0 },
        distance: {
          x: n.x - c.internals.positionAbsolute.x,
          y: n.y - c.internals.positionAbsolute.y
        },
        extent: c.extent,
        parentId: c.parentId,
        origin: c.origin,
        expandParent: c.expandParent,
        internals: {
          positionAbsolute: c.internals.positionAbsolute || { x: 0, y: 0 }
        },
        measured: {
          width: c.measured.width ?? 0,
          height: c.measured.height ?? 0
        }
      });
    }
  return r;
}
function $r({ nodeId: e, dragItems: t, nodeLookup: n, dragging: o = !0 }) {
  const r = [];
  for (const [s, c] of t) {
    const u = n.get(s)?.internals.userNode;
    u && r.push({
      ...u,
      position: c.position,
      dragging: o
    });
  }
  if (!e)
    return [r[0], r];
  const i = n.get(e)?.internals.userNode;
  return [
    i ? {
      ...i,
      position: t.get(e)?.position || i.position,
      dragging: o
    } : r[0],
    r
  ];
}
function ap({ dragItems: e, snapGrid: t, x: n, y: o }) {
  const r = e.values().next().value;
  if (!r)
    return null;
  const i = {
    x: n - r.distance.x,
    y: o - r.distance.y
  }, s = Bn(i, t);
  return {
    x: s.x - i.x,
    y: s.y - i.y
  };
}
function cp({ onNodeMouseDown: e, getStoreItems: t, onDragStart: n, onDrag: o, onDragStop: r }) {
  let i = { x: null, y: null }, s = 0, c = /* @__PURE__ */ new Map(), u = !1, l = { x: 0, y: 0 }, f = null, d = !1, h = null, p = !1, g = !1, x = null;
  function w({ noDragClassName: N, handleSelector: m, domNode: v, isSelectable: E, nodeId: C, nodeClickDistance: k = 0 }) {
    h = Le(v);
    function _({ x: z, y: H }) {
      const { nodeLookup: b, nodeExtent: j, snapGrid: I, snapToGrid: D, nodeOrigin: T, onNodeDrag: $, onSelectionDrag: V, onError: F, updateNodePositions: B } = t();
      i = { x: z, y: H };
      let U = !1;
      const Z = c.size > 1, ee = Z && j ? ei(On(c)) : null, se = Z && D ? ap({
        dragItems: c,
        snapGrid: I,
        x: z,
        y: H
      }) : null;
      for (const [J, L] of c) {
        if (!b.has(J))
          continue;
        let q = { x: z - L.distance.x, y: H - L.distance.y };
        D && (q = se ? {
          x: Math.round(q.x + se.x),
          y: Math.round(q.y + se.y)
        } : Bn(q, I));
        let ie = null;
        if (Z && j && !L.extent && ee) {
          const { positionAbsolute: Q } = L.internals, ae = Q.x - ee.x + j[0][0], R = Q.x + L.measured.width - ee.x2 + j[1][0], G = Q.y - ee.y + j[0][1], de = Q.y + L.measured.height - ee.y2 + j[1][1];
          ie = [
            [ae, G],
            [R, de]
          ];
        }
        const { position: oe, positionAbsolute: K } = nc({
          nodeId: J,
          nextPosition: q,
          nodeLookup: b,
          nodeExtent: ie || j,
          nodeOrigin: T,
          onError: F
        });
        U = U || L.position.x !== oe.x || L.position.y !== oe.y, L.position = oe, L.internals.positionAbsolute = K;
      }
      if (g = g || U, !!U && (B(c, !0), x && (o || $ || !C && V))) {
        const [J, L] = $r({
          nodeId: C,
          dragItems: c,
          nodeLookup: b
        });
        o?.(x, c, J, L), $?.(x, J, L), C || V?.(x, L);
      }
    }
    async function P() {
      if (!f)
        return;
      const { transform: z, panBy: H, autoPanSpeed: b, autoPanOnNodeDrag: j } = t();
      if (!j) {
        u = !1, cancelAnimationFrame(s);
        return;
      }
      const [I, D] = bi(l, f, b);
      (I !== 0 || D !== 0) && (i.x = (i.x ?? 0) - I / z[2], i.y = (i.y ?? 0) - D / z[2], await H({ x: I, y: D }) && _(i)), s = requestAnimationFrame(P);
    }
    function W(z) {
      const { nodeLookup: H, multiSelectionActive: b, nodesDraggable: j, transform: I, snapGrid: D, snapToGrid: T, selectNodesOnDrag: $, onNodeDragStart: V, onSelectionDragStart: F, unselectNodesAndEdges: B } = t();
      d = !0, (!$ || !E) && !b && C && (H.get(C)?.selected || B()), E && $ && C && e?.(C);
      const U = Cn(z.sourceEvent, { transform: I, snapGrid: D, snapToGrid: T, containerBounds: f });
      if (i = U, c = sp(H, j, U, C), c.size > 0 && (n || V || !C && F)) {
        const [Z, ee] = $r({
          nodeId: C,
          dragItems: c,
          nodeLookup: H
        });
        n?.(z.sourceEvent, c, Z, ee), V?.(z.sourceEvent, Z, ee), C || F?.(z.sourceEvent, ee);
      }
    }
    const A = Ta().clickDistance(k).on("start", (z) => {
      const { domNode: H, nodeDragThreshold: b, transform: j, snapGrid: I, snapToGrid: D } = t();
      f = H?.getBoundingClientRect() || null, p = !1, g = !1, x = z.sourceEvent, b === 0 && W(z), i = Cn(z.sourceEvent, { transform: j, snapGrid: I, snapToGrid: D, containerBounds: f }), l = qe(z.sourceEvent, f);
    }).on("drag", (z) => {
      const { autoPanOnNodeDrag: H, transform: b, snapGrid: j, snapToGrid: I, nodeDragThreshold: D, nodeLookup: T } = t(), $ = Cn(z.sourceEvent, { transform: b, snapGrid: j, snapToGrid: I, containerBounds: f });
      if (x = z.sourceEvent, (z.sourceEvent.type === "touchmove" && z.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      C && !T.has(C)) && (p = !0), !p) {
        if (!u && H && d && (u = !0, P()), !d) {
          const V = qe(z.sourceEvent, f), F = V.x - l.x, B = V.y - l.y;
          Math.sqrt(F * F + B * B) > D && W(z);
        }
        (i.x !== $.xSnapped || i.y !== $.ySnapped) && c && d && (l = qe(z.sourceEvent, f), _($));
      }
    }).on("end", (z) => {
      if (!d || p) {
        p && c.size > 0 && t().updateNodePositions(c, !1);
        return;
      }
      if (u = !1, d = !1, cancelAnimationFrame(s), c.size > 0) {
        const { nodeLookup: H, updateNodePositions: b, onNodeDragStop: j, onSelectionDragStop: I } = t();
        if (g && (b(c, !1), g = !1), r || j || !C && I) {
          const [D, T] = $r({
            nodeId: C,
            dragItems: c,
            nodeLookup: H,
            dragging: !1
          });
          r?.(z.sourceEvent, c, D, T), j?.(z.sourceEvent, D, T), C || I?.(z.sourceEvent, T);
        }
      }
    }).filter((z) => {
      const H = z.target;
      return !z.button && (!N || !xs(H, `.${N}`, v)) && (!m || xs(H, m, v));
    });
    h.call(A);
  }
  function y() {
    h?.on(".drag", null);
  }
  return {
    update: w,
    destroy: y
  };
}
function lp(e, t, n) {
  const o = [], r = {
    x: e.x - n,
    y: e.y - n,
    width: n * 2,
    height: n * 2
  };
  for (const i of t.values())
    Pn(r, Wt(i)) > 0 && o.push(i);
  return o;
}
const up = 250;
function dp(e, t, n, o) {
  let r = [], i = 1 / 0;
  const s = lp(e, n, t + up);
  for (const c of s) {
    const u = [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []];
    for (const l of u) {
      if (o.nodeId === l.nodeId && o.type === l.type && o.id === l.id)
        continue;
      const { x: f, y: d } = _t(c, l, l.position, !0), h = Math.sqrt(Math.pow(f - e.x, 2) + Math.pow(d - e.y, 2));
      h > t || (h < i ? (r = [{ ...l, x: f, y: d }], i = h) : h === i && r.push({ ...l, x: f, y: d }));
    }
  }
  if (!r.length)
    return null;
  if (r.length > 1) {
    const c = o.type === "source" ? "target" : "source";
    return r.find((u) => u.type === c) ?? r[0];
  }
  return r[0];
}
function vc(e, t, n, o, r, i = !1) {
  const s = o.get(e);
  if (!s)
    return null;
  const c = r === "strict" ? s.internals.handleBounds?.[t] : [...s.internals.handleBounds?.source ?? [], ...s.internals.handleBounds?.target ?? []], u = (n ? c?.find((l) => l.id === n) : c?.[0]) ?? null;
  return u && i ? { ...u, ..._t(s, u, u.position, !0) } : u;
}
function bc(e, t) {
  return e || (t?.classList.contains("target") ? "target" : t?.classList.contains("source") ? "source" : null);
}
function fp(e, t) {
  let n = null;
  return t ? n = !0 : e && !t && (n = !1), n;
}
const Sc = () => !0;
function hp(e, { connectionMode: t, connectionRadius: n, handleId: o, nodeId: r, edgeUpdaterType: i, isTarget: s, domNode: c, nodeLookup: u, lib: l, autoPanOnConnect: f, flowId: d, panBy: h, cancelConnection: p, onConnectStart: g, onConnect: x, onConnectEnd: w, isValidConnection: y = Sc, onReconnectEnd: N, updateConnection: m, getTransform: v, getFromHandle: E, autoPanSpeed: C, dragThreshold: k = 1, handleDomNode: _ }) {
  const P = cc(e.target);
  let W = 0, A;
  const { x: z, y: H } = qe(e), b = bc(i, _), j = c?.getBoundingClientRect();
  let I = !1;
  if (!j || !b)
    return;
  const D = vc(r, b, o, u, t);
  if (!D)
    return;
  let T = qe(e, j), $ = !1, V = null, F = !1, B = null;
  function U() {
    if (!f || !j)
      return;
    const [oe, K] = bi(T, j, C);
    h({ x: oe, y: K }), W = requestAnimationFrame(U);
  }
  const Z = {
    ...D,
    nodeId: r,
    type: b,
    position: D.position
  }, ee = u.get(r);
  let J = {
    inProgress: !0,
    isValid: null,
    from: _t(ee, Z, te.Left, !0),
    fromHandle: Z,
    fromPosition: Z.position,
    fromNode: ee,
    to: T,
    toHandle: null,
    toPosition: ss[Z.position],
    toNode: null,
    pointer: T
  };
  function L() {
    I = !0, m(J), g?.(e, { nodeId: r, handleId: o, handleType: b });
  }
  k === 0 && L();
  function q(oe) {
    if (!I) {
      const { x: de, y: ye } = qe(oe), pe = de - z, _e = ye - H;
      if (!(pe * pe + _e * _e > k * k))
        return;
      L();
    }
    if (!E() || !Z) {
      ie(oe);
      return;
    }
    const K = v();
    T = qe(oe, j), A = dp(Kt(T, K, !1, [1, 1]), n, u, Z), $ || (U(), $ = !0);
    const Q = Nc(oe, {
      handle: A,
      connectionMode: t,
      fromNodeId: r,
      fromHandleId: o,
      fromType: s ? "target" : "source",
      isValidConnection: y,
      doc: P,
      lib: l,
      flowId: d,
      nodeLookup: u
    });
    B = Q.handleDomNode, V = Q.connection, F = fp(!!A, Q.isValid);
    const ae = u.get(r), R = ae ? _t(ae, Z, te.Left, !0) : J.from, G = {
      ...J,
      from: R,
      isValid: F,
      to: Q.toHandle && F ? Xt({ x: Q.toHandle.x, y: Q.toHandle.y }, K) : T,
      toHandle: Q.toHandle,
      toPosition: F && Q.toHandle ? Q.toHandle.position : ss[Z.position],
      toNode: Q.toHandle ? u.get(Q.toHandle.nodeId) : null,
      pointer: T
    };
    m(G), J = G;
  }
  function ie(oe) {
    if (!("touches" in oe && oe.touches.length > 0)) {
      if (I) {
        (A || B) && V && F && x?.(V);
        const { inProgress: K, ...Q } = J, ae = {
          ...Q,
          toPosition: J.toHandle ? J.toPosition : null
        };
        w?.(oe, ae), i && N?.(oe, ae);
      }
      p(), cancelAnimationFrame(W), $ = !1, F = !1, V = null, B = null, P.removeEventListener("mousemove", q), P.removeEventListener("mouseup", ie), P.removeEventListener("touchmove", q), P.removeEventListener("touchend", ie);
    }
  }
  P.addEventListener("mousemove", q), P.addEventListener("mouseup", ie), P.addEventListener("touchmove", q), P.addEventListener("touchend", ie);
}
function Nc(e, { handle: t, connectionMode: n, fromNodeId: o, fromHandleId: r, fromType: i, doc: s, lib: c, flowId: u, isValidConnection: l = Sc, nodeLookup: f }) {
  const d = i === "target", h = t ? s.querySelector(`.${c}-flow__handle[data-id="${u}-${t?.nodeId}-${t?.id}-${t?.type}"]`) : null, { x: p, y: g } = qe(e), x = s.elementFromPoint(p, g), w = x?.classList.contains(`${c}-flow__handle`) ? x : h, y = {
    handleDomNode: w,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (w) {
    const N = bc(void 0, w), m = w.getAttribute("data-nodeid"), v = w.getAttribute("data-handleid"), E = w.classList.contains("connectable"), C = w.classList.contains("connectableend");
    if (!m || !N)
      return y;
    const k = {
      source: d ? m : o,
      sourceHandle: d ? v : r,
      target: d ? o : m,
      targetHandle: d ? r : v
    };
    y.connection = k;
    const P = E && C && (n === Bt.Strict ? d && N === "source" || !d && N === "target" : m !== o || v !== r);
    y.isValid = P && l(k), y.toHandle = vc(m, N, v, f, n, !0);
  }
  return y;
}
const oi = {
  onPointerDown: hp,
  isValid: Nc
};
function pp({ domNode: e, panZoom: t, getTransform: n, getViewScale: o }) {
  const r = Le(e);
  function i({ translateExtent: c, width: u, height: l, zoomStep: f = 1, pannable: d = !0, zoomable: h = !0, inversePan: p = !1 }) {
    const g = (m) => {
      if (m.sourceEvent.type !== "wheel" || !t)
        return;
      const v = n(), E = m.sourceEvent.ctrlKey && $n() ? 10 : 1, C = -m.sourceEvent.deltaY * (m.sourceEvent.deltaMode === 1 ? 0.05 : m.sourceEvent.deltaMode ? 1 : 2e-3) * f, k = v[2] * Math.pow(2, C * E);
      t.scaleTo(k);
    };
    let x = [0, 0];
    const w = (m) => {
      (m.sourceEvent.type === "mousedown" || m.sourceEvent.type === "touchstart") && (x = [
        m.sourceEvent.clientX ?? m.sourceEvent.touches[0].clientX,
        m.sourceEvent.clientY ?? m.sourceEvent.touches[0].clientY
      ]);
    }, y = (m) => {
      const v = n();
      if (m.sourceEvent.type !== "mousemove" && m.sourceEvent.type !== "touchmove" || !t)
        return;
      const E = [
        m.sourceEvent.clientX ?? m.sourceEvent.touches[0].clientX,
        m.sourceEvent.clientY ?? m.sourceEvent.touches[0].clientY
      ], C = [E[0] - x[0], E[1] - x[1]];
      x = E;
      const k = o() * Math.max(v[2], Math.log(v[2])) * (p ? -1 : 1), _ = {
        x: v[0] - C[0] * k,
        y: v[1] - C[1] * k
      }, P = [
        [0, 0],
        [u, l]
      ];
      t.setViewportConstrained({
        x: _.x,
        y: _.y,
        zoom: v[2]
      }, P, c);
    }, N = Ua().on("start", w).on("zoom", d ? y : null).on("zoom.wheel", h ? g : null);
    r.call(N, {});
  }
  function s() {
    r.on("zoom", null);
  }
  return {
    update: i,
    destroy: s,
    pointer: We
  };
}
const Jo = (e) => ({
  x: e.x,
  y: e.y,
  zoom: e.k
}), Tr = ({ x: e, y: t, zoom: n }) => Ko.translate(e, t).scale(n), zt = (e, t) => e.target.closest(`.${t}`), Ec = (e, t) => t === 2 && Array.isArray(e) && e.includes(2), gp = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, zr = (e, t = 0, n = gp, o = () => {
}) => {
  const r = typeof t == "number" && t > 0;
  return r || o(), r ? e.transition().duration(t).ease(n).on("end", o) : e;
}, Cc = (e) => {
  const t = e.ctrlKey && $n() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * t;
};
function mp({ zoomPanValues: e, noWheelClassName: t, d3Selection: n, d3Zoom: o, panOnScrollMode: r, panOnScrollSpeed: i, zoomOnPinch: s, onPanZoomStart: c, onPanZoom: u, onPanZoomEnd: l }) {
  return (f) => {
    if (zt(f, t))
      return f.ctrlKey && f.preventDefault(), !1;
    f.preventDefault(), f.stopImmediatePropagation();
    const d = n.property("__zoom").k || 1;
    if (f.ctrlKey && s) {
      const w = We(f), y = Cc(f), N = d * Math.pow(2, y);
      o.scaleTo(n, N, w, f);
      return;
    }
    const h = f.deltaMode === 1 ? 20 : 1;
    let p = r === Et.Vertical ? 0 : f.deltaX * h, g = r === Et.Horizontal ? 0 : f.deltaY * h;
    !$n() && f.shiftKey && r !== Et.Vertical && (p = f.deltaY * h, g = 0), o.translateBy(
      n,
      -(p / d) * i,
      -(g / d) * i,
      // @ts-ignore
      { internal: !0 }
    );
    const x = Jo(n.property("__zoom"));
    clearTimeout(e.panScrollTimeout), e.isPanScrolling ? (u?.(f, x), e.panScrollTimeout = setTimeout(() => {
      l?.(f, x), e.isPanScrolling = !1;
    }, 150)) : (e.isPanScrolling = !0, c?.(f, x));
  };
}
function yp({ noWheelClassName: e, preventScrolling: t, d3ZoomHandler: n }) {
  return function(o, r) {
    const i = o.type === "wheel", s = !t && i && !o.ctrlKey, c = zt(o, e);
    if (o.ctrlKey && i && c && o.preventDefault(), s || c)
      return null;
    o.preventDefault(), n.call(this, o, r);
  };
}
function xp({ zoomPanValues: e, onDraggingChange: t, onPanZoomStart: n }) {
  return (o) => {
    if (o.sourceEvent?.internal)
      return;
    const r = Jo(o.transform);
    e.mouseButton = o.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = r, o.sourceEvent?.type === "mousedown" && t(!0), n && n?.(o.sourceEvent, r);
  };
}
function wp({ zoomPanValues: e, panOnDrag: t, onPaneContextMenu: n, onTransformChange: o, onPanZoom: r }) {
  return (i) => {
    e.usedRightMouseButton = !!(n && Ec(t, e.mouseButton ?? 0)), i.sourceEvent?.sync || o([i.transform.x, i.transform.y, i.transform.k]), r && !i.sourceEvent?.internal && r?.(i.sourceEvent, Jo(i.transform));
  };
}
function vp({ zoomPanValues: e, panOnDrag: t, panOnScroll: n, onDraggingChange: o, onPanZoomEnd: r, onPaneContextMenu: i }) {
  return (s) => {
    if (!s.sourceEvent?.internal && (e.isZoomingOrPanning = !1, i && Ec(t, e.mouseButton ?? 0) && !e.usedRightMouseButton && s.sourceEvent && i(s.sourceEvent), e.usedRightMouseButton = !1, o(!1), r)) {
      const c = Jo(s.transform);
      e.prevViewport = c, clearTimeout(e.timerId), e.timerId = setTimeout(
        () => {
          r?.(s.sourceEvent, c);
        },
        // we need a setTimeout for panOnScroll to suppress multiple end events fired during scroll
        n ? 150 : 0
      );
    }
  };
}
function bp({ zoomActivationKeyPressed: e, zoomOnScroll: t, zoomOnPinch: n, panOnDrag: o, panOnScroll: r, zoomOnDoubleClick: i, userSelectionActive: s, noWheelClassName: c, noPanClassName: u, lib: l, connectionInProgress: f }) {
  return (d) => {
    const h = e || t, p = n && d.ctrlKey, g = d.type === "wheel";
    if (d.button === 1 && d.type === "mousedown" && (zt(d, `${l}-flow__node`) || zt(d, `${l}-flow__edge`)))
      return !0;
    if (!o && !h && !r && !i && !n || s || f && !g || zt(d, c) && g || zt(d, u) && (!g || r && g && !e) || !n && d.ctrlKey && g)
      return !1;
    if (!n && d.type === "touchstart" && d.touches?.length > 1)
      return d.preventDefault(), !1;
    if (!h && !r && !p && g || !o && (d.type === "mousedown" || d.type === "touchstart") || Array.isArray(o) && !o.includes(d.button) && d.type === "mousedown")
      return !1;
    const x = Array.isArray(o) && o.includes(d.button) || !d.button || d.button <= 1;
    return (!d.ctrlKey || g) && x;
  };
}
function Sp({ domNode: e, minZoom: t, maxZoom: n, translateExtent: o, viewport: r, onPanZoom: i, onPanZoomStart: s, onPanZoomEnd: c, onDraggingChange: u }) {
  const l = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, f = e.getBoundingClientRect(), d = Ua().scaleExtent([t, n]).translateExtent(o), h = Le(e).call(d);
  N({
    x: r.x,
    y: r.y,
    zoom: Ft(r.zoom, t, n)
  }, [
    [0, 0],
    [f.width, f.height]
  ], o);
  const p = h.on("wheel.zoom"), g = h.on("dblclick.zoom");
  d.wheelDelta(Cc);
  async function x(A, z) {
    return h ? new Promise((H) => {
      d?.interpolate(z?.interpolate === "linear" ? En : So).transform(zr(h, z?.duration, z?.ease, () => H(!0)), A);
    }) : !1;
  }
  function w({ noWheelClassName: A, noPanClassName: z, onPaneContextMenu: H, userSelectionActive: b, panOnScroll: j, panOnDrag: I, panOnScrollMode: D, panOnScrollSpeed: T, preventScrolling: $, zoomOnPinch: V, zoomOnScroll: F, zoomOnDoubleClick: B, zoomActivationKeyPressed: U, lib: Z, onTransformChange: ee, connectionInProgress: se, paneClickDistance: J, selectionOnDrag: L }) {
    b && !l.isZoomingOrPanning && y();
    const q = j && !U && !b;
    d.clickDistance(L ? 1 / 0 : !Ye(J) || J < 0 ? 0 : J);
    const ie = q ? mp({
      zoomPanValues: l,
      noWheelClassName: A,
      d3Selection: h,
      d3Zoom: d,
      panOnScrollMode: D,
      panOnScrollSpeed: T,
      zoomOnPinch: V,
      onPanZoomStart: s,
      onPanZoom: i,
      onPanZoomEnd: c
    }) : yp({
      noWheelClassName: A,
      preventScrolling: $,
      d3ZoomHandler: p
    });
    h.on("wheel.zoom", ie, { passive: !1 });
    const oe = xp({
      zoomPanValues: l,
      onDraggingChange: u,
      onPanZoomStart: s
    });
    d.on("start", oe);
    const K = wp({
      zoomPanValues: l,
      panOnDrag: I,
      onPaneContextMenu: !!H,
      onPanZoom: i,
      onTransformChange: ee
    });
    d.on("zoom", K);
    const Q = vp({
      zoomPanValues: l,
      panOnDrag: I,
      panOnScroll: j,
      onPaneContextMenu: H,
      onPanZoomEnd: c,
      onDraggingChange: u
    });
    d.on("end", Q);
    const ae = bp({
      zoomActivationKeyPressed: U,
      panOnDrag: I,
      zoomOnScroll: F,
      panOnScroll: j,
      zoomOnDoubleClick: B,
      zoomOnPinch: V,
      userSelectionActive: b,
      noPanClassName: z,
      noWheelClassName: A,
      lib: Z,
      connectionInProgress: se
    });
    d.filter(ae), B ? h.on("dblclick.zoom", g) : h.on("dblclick.zoom", null);
  }
  function y() {
    d.on("zoom", null);
  }
  async function N(A, z, H) {
    const b = Tr(A), j = d?.constrain()(b, z, H);
    return j && await x(j), j;
  }
  async function m(A, z) {
    const H = Tr(A);
    return await x(H, z), H;
  }
  function v(A) {
    if (h) {
      const z = Tr(A), H = h.property("__zoom");
      (H.k !== A.zoom || H.x !== A.x || H.y !== A.y) && d?.transform(h, z, null, { sync: !0 });
    }
  }
  function E() {
    const A = h ? Ka(h.node()) : { x: 0, y: 0, k: 1 };
    return { x: A.x, y: A.y, zoom: A.k };
  }
  async function C(A, z) {
    return h ? new Promise((H) => {
      d?.interpolate(z?.interpolate === "linear" ? En : So).scaleTo(zr(h, z?.duration, z?.ease, () => H(!0)), A);
    }) : !1;
  }
  async function k(A, z) {
    return h ? new Promise((H) => {
      d?.interpolate(z?.interpolate === "linear" ? En : So).scaleBy(zr(h, z?.duration, z?.ease, () => H(!0)), A);
    }) : !1;
  }
  function _(A) {
    d?.scaleExtent(A);
  }
  function P(A) {
    d?.translateExtent(A);
  }
  function W(A) {
    const z = !Ye(A) || A < 0 ? 0 : A;
    d?.clickDistance(z);
  }
  return {
    update: w,
    destroy: y,
    setViewport: m,
    setViewportConstrained: N,
    getViewport: E,
    scaleTo: C,
    scaleBy: k,
    setScaleExtent: _,
    setTranslateExtent: P,
    syncViewport: v,
    setClickDistance: W
  };
}
var Yt;
(function(e) {
  e.Line = "line", e.Handle = "handle";
})(Yt || (Yt = {}));
function Np({ width: e, prevWidth: t, height: n, prevHeight: o, affectsX: r, affectsY: i }) {
  const s = e - t, c = n - o, u = [s > 0 ? 1 : s < 0 ? -1 : 0, c > 0 ? 1 : c < 0 ? -1 : 0];
  return s && r && (u[0] = u[0] * -1), c && i && (u[1] = u[1] * -1), u;
}
function ws(e) {
  const t = e.includes("right") || e.includes("left"), n = e.includes("bottom") || e.includes("top"), o = e.includes("left"), r = e.includes("top");
  return {
    isHorizontal: t,
    isVertical: n,
    affectsX: o,
    affectsY: r
  };
}
function lt(e, t) {
  return Math.max(0, t - e);
}
function ut(e, t) {
  return Math.max(0, e - t);
}
function mo(e, t, n) {
  return Math.max(0, t - e, e - n);
}
function vs(e, t) {
  return e ? !t : t;
}
function Ep(e, t, n, o, r, i, s, c) {
  let { affectsX: u, affectsY: l } = t;
  const { isHorizontal: f, isVertical: d } = t, h = f && d, { xSnapped: p, ySnapped: g } = n, { minWidth: x, maxWidth: w, minHeight: y, maxHeight: N } = o, { x: m, y: v, width: E, height: C, aspectRatio: k } = e;
  let _ = Math.floor(f ? p - e.pointerX : 0), P = Math.floor(d ? g - e.pointerY : 0);
  const W = E + (u ? -_ : _), A = C + (l ? -P : P), z = -i[0] * E, H = -i[1] * C;
  let b = mo(W, x, w), j = mo(A, y, N);
  if (s) {
    let T = 0, $ = 0;
    u && _ < 0 ? T = lt(m + _ + z, s[0][0]) : !u && _ > 0 && (T = ut(m + W + z, s[1][0])), l && P < 0 ? $ = lt(v + P + H, s[0][1]) : !l && P > 0 && ($ = ut(v + A + H, s[1][1])), b = Math.max(b, T), j = Math.max(j, $);
  }
  if (c) {
    let T = 0, $ = 0;
    u && _ > 0 ? T = ut(m + _, c[0][0]) : !u && _ < 0 && (T = lt(m + W, c[1][0])), l && P > 0 ? $ = ut(v + P, c[0][1]) : !l && P < 0 && ($ = lt(v + A, c[1][1])), b = Math.max(b, T), j = Math.max(j, $);
  }
  if (r) {
    if (f) {
      const T = mo(W / k, y, N) * k;
      if (b = Math.max(b, T), s) {
        let $ = 0;
        !u && !l || u && !l && h ? $ = ut(v + H + W / k, s[1][1]) * k : $ = lt(v + H + (u ? _ : -_) / k, s[0][1]) * k, b = Math.max(b, $);
      }
      if (c) {
        let $ = 0;
        !u && !l || u && !l && h ? $ = lt(v + W / k, c[1][1]) * k : $ = ut(v + (u ? _ : -_) / k, c[0][1]) * k, b = Math.max(b, $);
      }
    }
    if (d) {
      const T = mo(A * k, x, w) / k;
      if (j = Math.max(j, T), s) {
        let $ = 0;
        !u && !l || l && !u && h ? $ = ut(m + A * k + z, s[1][0]) / k : $ = lt(m + (l ? P : -P) * k + z, s[0][0]) / k, j = Math.max(j, $);
      }
      if (c) {
        let $ = 0;
        !u && !l || l && !u && h ? $ = lt(m + A * k, c[1][0]) / k : $ = ut(m + (l ? P : -P) * k, c[0][0]) / k, j = Math.max(j, $);
      }
    }
  }
  P = P + (P < 0 ? j : -j), _ = _ + (_ < 0 ? b : -b), r && (h ? W > A * k ? P = (vs(u, l) ? -_ : _) / k : _ = (vs(u, l) ? -P : P) * k : f ? (P = _ / k, l = u) : (_ = P * k, u = l));
  const I = u ? m + _ : m, D = l ? v + P : v;
  return {
    width: E + (u ? -_ : _),
    height: C + (l ? -P : P),
    x: i[0] * _ * (u ? -1 : 1) + I,
    y: i[1] * P * (l ? -1 : 1) + D
  };
}
const kc = { width: 0, height: 0, x: 0, y: 0 }, Cp = {
  ...kc,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function kp(e, t, n) {
  const o = t.position.x + e.position.x, r = t.position.y + e.position.y, i = e.measured.width ?? 0, s = e.measured.height ?? 0, c = n[0] * i, u = n[1] * s;
  return [
    [o - c, r - u],
    [o + i - c, r + s - u]
  ];
}
function Ip({ domNode: e, nodeId: t, getStoreItems: n, onChange: o, onEnd: r }) {
  const i = Le(e);
  let s = {
    controlDirection: ws("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function c({ controlPosition: l, boundaries: f, keepAspectRatio: d, resizeDirection: h, onResizeStart: p, onResize: g, onResizeEnd: x, shouldResize: w }) {
    let y = { ...kc }, N = { ...Cp };
    s = {
      boundaries: f,
      resizeDirection: h,
      keepAspectRatio: d,
      controlDirection: ws(l)
    };
    let m, v = null, E = [], C, k, _, P = !1;
    const W = Ta().on("start", (A) => {
      const { nodeLookup: z, transform: H, snapGrid: b, snapToGrid: j, nodeOrigin: I, paneDomNode: D } = n();
      if (m = z.get(t), !m)
        return;
      v = D?.getBoundingClientRect() ?? null;
      const { xSnapped: T, ySnapped: $ } = Cn(A.sourceEvent, {
        transform: H,
        snapGrid: b,
        snapToGrid: j,
        containerBounds: v
      });
      y = {
        width: m.measured.width ?? 0,
        height: m.measured.height ?? 0,
        x: m.position.x ?? 0,
        y: m.position.y ?? 0
      }, N = {
        ...y,
        pointerX: T,
        pointerY: $,
        aspectRatio: y.width / y.height
      }, C = void 0, k = jt(m.extent) ? m.extent : void 0, m.parentId && (m.extent === "parent" || m.expandParent) && (C = z.get(m.parentId)), C && m.extent === "parent" && (k = [
        [0, 0],
        [C.measured.width, C.measured.height]
      ]), E = [], _ = void 0;
      for (const [V, F] of z)
        if (F.parentId === t && (E.push({
          id: V,
          position: { ...F.position },
          extent: F.extent
        }), F.extent === "parent" || F.expandParent)) {
          const B = kp(F, m, F.origin ?? I);
          _ ? _ = [
            [Math.min(B[0][0], _[0][0]), Math.min(B[0][1], _[0][1])],
            [Math.max(B[1][0], _[1][0]), Math.max(B[1][1], _[1][1])]
          ] : _ = B;
        }
      p?.(A, { ...y });
    }).on("drag", (A) => {
      const { transform: z, snapGrid: H, snapToGrid: b, nodeOrigin: j } = n(), I = Cn(A.sourceEvent, {
        transform: z,
        snapGrid: H,
        snapToGrid: b,
        containerBounds: v
      }), D = [];
      if (!m)
        return;
      const { x: T, y: $, width: V, height: F } = y, B = {}, U = m.origin ?? j, { width: Z, height: ee, x: se, y: J } = Ep(N, s.controlDirection, I, s.boundaries, s.keepAspectRatio, U, k, _), L = Z !== V, q = ee !== F, ie = se !== T && L, oe = J !== $ && q;
      if (!ie && !oe && !L && !q)
        return;
      if ((ie || oe || U[0] === 1 || U[1] === 1) && (B.x = ie ? se : y.x, B.y = oe ? J : y.y, y.x = B.x, y.y = B.y, E.length > 0)) {
        const R = se - T, G = J - $;
        for (const de of E)
          de.position = {
            x: de.position.x - R + U[0] * (Z - V),
            y: de.position.y - G + U[1] * (ee - F)
          }, D.push(de);
      }
      if ((L || q) && (B.width = L && (!s.resizeDirection || s.resizeDirection === "horizontal") ? Z : y.width, B.height = q && (!s.resizeDirection || s.resizeDirection === "vertical") ? ee : y.height, y.width = B.width, y.height = B.height), C && m.expandParent) {
        const R = U[0] * (B.width ?? 0);
        B.x && B.x < R && (y.x = R, N.x = N.x - (B.x - R));
        const G = U[1] * (B.height ?? 0);
        B.y && B.y < G && (y.y = G, N.y = N.y - (B.y - G));
      }
      const K = Np({
        width: y.width,
        prevWidth: V,
        height: y.height,
        prevHeight: F,
        affectsX: s.controlDirection.affectsX,
        affectsY: s.controlDirection.affectsY
      }), Q = { ...y, direction: K };
      w?.(A, Q) !== !1 && (P = !0, g?.(A, Q), o(B, D));
    }).on("end", (A) => {
      P && (x?.(A, { ...y }), r?.({ ...y }), P = !1);
    });
    i.call(W);
  }
  function u() {
    i.on(".drag", null);
  }
  return {
    update: c,
    destroy: u
  };
}
var Rr = { exports: {} }, Lr = {}, Vr = { exports: {} }, Hr = {};
var bs;
function jp() {
  if (bs) return Hr;
  bs = 1;
  var e = ht;
  function t(d, h) {
    return d === h && (d !== 0 || 1 / d === 1 / h) || d !== d && h !== h;
  }
  var n = typeof Object.is == "function" ? Object.is : t, o = e.useState, r = e.useEffect, i = e.useLayoutEffect, s = e.useDebugValue;
  function c(d, h) {
    var p = h(), g = o({ inst: { value: p, getSnapshot: h } }), x = g[0].inst, w = g[1];
    return i(
      function() {
        x.value = p, x.getSnapshot = h, u(x) && w({ inst: x });
      },
      [d, p, h]
    ), r(
      function() {
        return u(x) && w({ inst: x }), d(function() {
          u(x) && w({ inst: x });
        });
      },
      [d]
    ), s(p), p;
  }
  function u(d) {
    var h = d.getSnapshot;
    d = d.value;
    try {
      var p = h();
      return !n(d, p);
    } catch {
      return !0;
    }
  }
  function l(d, h) {
    return h();
  }
  var f = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : c;
  return Hr.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : f, Hr;
}
var Ss;
function _p() {
  return Ss || (Ss = 1, Vr.exports = jp()), Vr.exports;
}
var Ns;
function Ap() {
  if (Ns) return Lr;
  Ns = 1;
  var e = ht, t = _p();
  function n(l, f) {
    return l === f && (l !== 0 || 1 / l === 1 / f) || l !== l && f !== f;
  }
  var o = typeof Object.is == "function" ? Object.is : n, r = t.useSyncExternalStore, i = e.useRef, s = e.useEffect, c = e.useMemo, u = e.useDebugValue;
  return Lr.useSyncExternalStoreWithSelector = function(l, f, d, h, p) {
    var g = i(null);
    if (g.current === null) {
      var x = { hasValue: !1, value: null };
      g.current = x;
    } else x = g.current;
    g = c(
      function() {
        function y(C) {
          if (!N) {
            if (N = !0, m = C, C = h(C), p !== void 0 && x.hasValue) {
              var k = x.value;
              if (p(k, C))
                return v = k;
            }
            return v = C;
          }
          if (k = v, o(m, C)) return k;
          var _ = h(C);
          return p !== void 0 && p(k, _) ? (m = C, k) : (m = C, v = _);
        }
        var N = !1, m, v, E = d === void 0 ? null : d;
        return [
          function() {
            return y(f());
          },
          E === null ? void 0 : function() {
            return y(E());
          }
        ];
      },
      [f, d, h, p]
    );
    var w = r(l, g[0], g[1]);
    return s(
      function() {
        x.hasValue = !0, x.value = w;
      },
      [w]
    ), u(w), w;
  }, Lr;
}
var Es;
function Mp() {
  return Es || (Es = 1, Rr.exports = Ap()), Rr.exports;
}
var Dp = Mp();
const Pp = /* @__PURE__ */ Zl(Dp), $p = {}, Cs = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), o = (f, d) => {
    const h = typeof f == "function" ? f(t) : f;
    if (!Object.is(h, t)) {
      const p = t;
      t = d ?? (typeof h != "object" || h === null) ? h : Object.assign({}, t, h), n.forEach((g) => g(t, p));
    }
  }, r = () => t, u = { setState: o, getState: r, getInitialState: () => l, subscribe: (f) => (n.add(f), () => n.delete(f)), destroy: () => {
    ($p ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), n.clear();
  } }, l = t = e(o, r, u);
  return u;
}, Tp = (e) => e ? Cs(e) : Cs, { useDebugValue: zp } = ht, { useSyncExternalStoreWithSelector: Rp } = Pp, Lp = (e) => e;
function Ic(e, t = Lp, n) {
  const o = Rp(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n
  );
  return zp(o), o;
}
const ks = (e, t) => {
  const n = Tp(e), o = (r, i = t) => Ic(n, r, i);
  return Object.assign(o, n), o;
}, Vp = (e, t) => e ? ks(e, t) : ks;
function xe(e, t) {
  if (Object.is(e, t))
    return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  if (e instanceof Map && t instanceof Map) {
    if (e.size !== t.size) return !1;
    for (const [o, r] of e)
      if (!Object.is(r, t.get(o)))
        return !1;
    return !0;
  }
  if (e instanceof Set && t instanceof Set) {
    if (e.size !== t.size) return !1;
    for (const o of e)
      if (!t.has(o))
        return !1;
    return !0;
  }
  const n = Object.keys(e);
  if (n.length !== Object.keys(t).length)
    return !1;
  for (const o of n)
    if (!Object.prototype.hasOwnProperty.call(t, o) || !Object.is(e[o], t[o]))
      return !1;
  return !0;
}
var Or = { exports: {} }, Me = {};
var Is;
function Hp() {
  if (Is) return Me;
  Is = 1;
  var e = ht;
  function t(u) {
    var l = "https://react.dev/errors/" + u;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var f = 2; f < arguments.length; f++)
        l += "&args[]=" + encodeURIComponent(arguments[f]);
    }
    return "Minified React error #" + u + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function n() {
  }
  var o = {
    d: {
      f: n,
      r: function() {
        throw Error(t(522));
      },
      D: n,
      C: n,
      L: n,
      m: n,
      X: n,
      S: n,
      M: n
    },
    p: 0,
    findDOMNode: null
  }, r = /* @__PURE__ */ Symbol.for("react.portal");
  function i(u, l, f) {
    var d = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: d == null ? null : "" + d,
      children: u,
      containerInfo: l,
      implementation: f
    };
  }
  var s = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function c(u, l) {
    if (u === "font") return "";
    if (typeof l == "string")
      return l === "use-credentials" ? l : "";
  }
  return Me.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, Me.createPortal = function(u, l) {
    var f = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11)
      throw Error(t(299));
    return i(u, l, null, f);
  }, Me.flushSync = function(u) {
    var l = s.T, f = o.p;
    try {
      if (s.T = null, o.p = 2, u) return u();
    } finally {
      s.T = l, o.p = f, o.d.f();
    }
  }, Me.preconnect = function(u, l) {
    typeof u == "string" && (l ? (l = l.crossOrigin, l = typeof l == "string" ? l === "use-credentials" ? l : "" : void 0) : l = null, o.d.C(u, l));
  }, Me.prefetchDNS = function(u) {
    typeof u == "string" && o.d.D(u);
  }, Me.preinit = function(u, l) {
    if (typeof u == "string" && l && typeof l.as == "string") {
      var f = l.as, d = c(f, l.crossOrigin), h = typeof l.integrity == "string" ? l.integrity : void 0, p = typeof l.fetchPriority == "string" ? l.fetchPriority : void 0;
      f === "style" ? o.d.S(
        u,
        typeof l.precedence == "string" ? l.precedence : void 0,
        {
          crossOrigin: d,
          integrity: h,
          fetchPriority: p
        }
      ) : f === "script" && o.d.X(u, {
        crossOrigin: d,
        integrity: h,
        fetchPriority: p,
        nonce: typeof l.nonce == "string" ? l.nonce : void 0
      });
    }
  }, Me.preinitModule = function(u, l) {
    if (typeof u == "string")
      if (typeof l == "object" && l !== null) {
        if (l.as == null || l.as === "script") {
          var f = c(
            l.as,
            l.crossOrigin
          );
          o.d.M(u, {
            crossOrigin: f,
            integrity: typeof l.integrity == "string" ? l.integrity : void 0,
            nonce: typeof l.nonce == "string" ? l.nonce : void 0
          });
        }
      } else l == null && o.d.M(u);
  }, Me.preload = function(u, l) {
    if (typeof u == "string" && typeof l == "object" && l !== null && typeof l.as == "string") {
      var f = l.as, d = c(f, l.crossOrigin);
      o.d.L(u, f, {
        crossOrigin: d,
        integrity: typeof l.integrity == "string" ? l.integrity : void 0,
        nonce: typeof l.nonce == "string" ? l.nonce : void 0,
        type: typeof l.type == "string" ? l.type : void 0,
        fetchPriority: typeof l.fetchPriority == "string" ? l.fetchPriority : void 0,
        referrerPolicy: typeof l.referrerPolicy == "string" ? l.referrerPolicy : void 0,
        imageSrcSet: typeof l.imageSrcSet == "string" ? l.imageSrcSet : void 0,
        imageSizes: typeof l.imageSizes == "string" ? l.imageSizes : void 0,
        media: typeof l.media == "string" ? l.media : void 0
      });
    }
  }, Me.preloadModule = function(u, l) {
    if (typeof u == "string")
      if (l) {
        var f = c(l.as, l.crossOrigin);
        o.d.m(u, {
          as: typeof l.as == "string" && l.as !== "script" ? l.as : void 0,
          crossOrigin: f,
          integrity: typeof l.integrity == "string" ? l.integrity : void 0
        });
      } else o.d.m(u);
  }, Me.requestFormReset = function(u) {
    o.d.r(u);
  }, Me.unstable_batchedUpdates = function(u, l) {
    return u(l);
  }, Me.useFormState = function(u, l, f) {
    return s.H.useFormState(u, l, f);
  }, Me.useFormStatus = function() {
    return s.H.useHostTransitionStatus();
  }, Me.version = "19.2.7", Me;
}
var js;
function Op() {
  if (js) return Or.exports;
  js = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return e(), Or.exports = Hp(), Or.exports;
}
var Bp = Op();
const Qo = di(null), Fp = Qo.Provider, jc = He.error001("react");
function ue(e, t) {
  const n = Rn(Qo);
  if (n === null)
    throw new Error(jc);
  return Ic(n, e, t);
}
function we() {
  const e = Rn(Qo);
  if (e === null)
    throw new Error(jc);
  return me(() => ({
    getState: e.getState,
    setState: e.setState,
    subscribe: e.subscribe
  }), [e]);
}
const _s = { display: "none" }, Wp = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, _c = "react-flow__node-desc", Ac = "react-flow__edge-desc", Xp = "react-flow__aria-live", Yp = (e) => e.ariaLiveMessage, qp = (e) => e.ariaLabelConfig;
function Zp({ rfId: e }) {
  const t = ue(Yp);
  return a.jsx("div", { id: `${Xp}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: Wp, children: t });
}
function Kp({ rfId: e, disableKeyboardA11y: t }) {
  const n = ue(qp);
  return a.jsxs(a.Fragment, { children: [a.jsx("div", { id: `${_c}-${e}`, style: _s, children: t ? n["node.a11yDescription.default"] : n["node.a11yDescription.keyboardDisabled"] }), a.jsx("div", { id: `${Ac}-${e}`, style: _s, children: n["edge.a11yDescription.default"] }), !t && a.jsx(Zp, { rfId: e })] });
}
const er = Wo(({ position: e = "top-left", children: t, className: n, style: o, ...r }, i) => {
  const s = `${e}`.split("-");
  return a.jsx("div", { className: Ce(["react-flow__panel", n, ...s]), style: o, ref: i, ...r, children: t });
});
er.displayName = "Panel";
function Up({ proOptions: e, position: t = "bottom-right" }) {
  return e?.hideAttribution ? null : a.jsx(er, { position: t, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: a.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const Gp = (e) => {
  const t = [], n = [];
  for (const [, o] of e.nodeLookup)
    o.selected && t.push(o.internals.userNode);
  for (const [, o] of e.edgeLookup)
    o.selected && n.push(o);
  return { selectedNodes: t, selectedEdges: n };
}, yo = (e) => e.id;
function Jp(e, t) {
  return xe(e.selectedNodes.map(yo), t.selectedNodes.map(yo)) && xe(e.selectedEdges.map(yo), t.selectedEdges.map(yo));
}
function Qp({ onSelectionChange: e }) {
  const t = we(), { selectedNodes: n, selectedEdges: o } = ue(Gp, Jp);
  return re(() => {
    const r = { nodes: n, edges: o };
    e?.(r), t.getState().onSelectionChangeHandlers.forEach((i) => i(r));
  }, [n, o, e]), null;
}
const eg = (e) => !!e.onSelectionChangeHandlers;
function tg({ onSelectionChange: e }) {
  const t = ue(eg);
  return e || t ? a.jsx(Qp, { onSelectionChange: e }) : null;
}
const Mc = [0, 0], ng = { x: 0, y: 0, zoom: 1 }, og = [
  "nodes",
  "edges",
  "defaultNodes",
  "defaultEdges",
  "onConnect",
  "onConnectStart",
  "onConnectEnd",
  "onClickConnectStart",
  "onClickConnectEnd",
  "nodesDraggable",
  "autoPanOnNodeFocus",
  "nodesConnectable",
  "nodesFocusable",
  "edgesFocusable",
  "edgesReconnectable",
  "elevateNodesOnSelect",
  "elevateEdgesOnSelect",
  "minZoom",
  "maxZoom",
  "nodeExtent",
  "onNodesChange",
  "onEdgesChange",
  "elementsSelectable",
  "connectionMode",
  "snapGrid",
  "snapToGrid",
  "translateExtent",
  "connectOnClick",
  "defaultEdgeOptions",
  "fitView",
  "fitViewOptions",
  "onNodesDelete",
  "onEdgesDelete",
  "onDelete",
  "onNodeDrag",
  "onNodeDragStart",
  "onNodeDragStop",
  "onSelectionDrag",
  "onSelectionDragStart",
  "onSelectionDragStop",
  "onMoveStart",
  "onMove",
  "onMoveEnd",
  "noPanClassName",
  "nodeOrigin",
  "autoPanOnConnect",
  "autoPanOnNodeDrag",
  "onError",
  "connectionRadius",
  "isValidConnection",
  "selectNodesOnDrag",
  "nodeDragThreshold",
  "connectionDragThreshold",
  "onBeforeDelete",
  "debug",
  "autoPanSpeed",
  "ariaLabelConfig",
  "zIndexMode"
], As = [...og, "rfId"], rg = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges
}), Ms = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: Mn,
  nodeOrigin: Mc,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function ig(e) {
  const { setNodes: t, setEdges: n, setMinZoom: o, setMaxZoom: r, setTranslateExtent: i, setNodeExtent: s, reset: c, setDefaultNodesAndEdges: u } = ue(rg, xe), l = we();
  re(() => (u(e.defaultNodes, e.defaultEdges), () => {
    f.current = Ms, c();
  }), []);
  const f = ce(Ms);
  return re(
    () => {
      for (const d of As) {
        const h = e[d], p = f.current[d];
        h !== p && (typeof e[d] > "u" || (d === "nodes" ? t(h) : d === "edges" ? n(h) : d === "minZoom" ? o(h) : d === "maxZoom" ? r(h) : d === "translateExtent" ? i(h) : d === "nodeExtent" ? s(h) : d === "ariaLabelConfig" ? l.setState({ ariaLabelConfig: Hh(h) }) : d === "fitView" ? l.setState({ fitViewQueued: h }) : d === "fitViewOptions" ? l.setState({ fitViewOptions: h }) : l.setState({ [d]: h })));
      }
      f.current = e;
    },
    // Only re-run the effect if one of the fields we track changes
    As.map((d) => e[d])
  ), null;
}
function Ds() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function sg(e) {
  const [t, n] = Y(e === "system" ? null : e);
  return re(() => {
    if (e !== "system") {
      n(e);
      return;
    }
    const o = Ds(), r = () => n(o?.matches ? "dark" : "light");
    return r(), o?.addEventListener("change", r), () => {
      o?.removeEventListener("change", r);
    };
  }, [e]), t !== null ? t : Ds()?.matches ? "dark" : "light";
}
const Ps = typeof document < "u" ? document : null;
function Tn(e = null, t = { target: Ps, actInsideInputWithModifier: !0 }) {
  const [n, o] = Y(!1), r = ce(!1), i = ce(/* @__PURE__ */ new Set([])), [s, c] = me(() => {
    if (e !== null) {
      const l = (Array.isArray(e) ? e : [e]).filter((d) => typeof d == "string").map((d) => d.replace("+", `
`).replace(`

`, `
+`).split(`
`)), f = l.reduce((d, h) => d.concat(...h), []);
      return [l, f];
    }
    return [[], []];
  }, [e]);
  return re(() => {
    const u = t?.target ?? Ps, l = t?.actInsideInputWithModifier ?? !0;
    if (e !== null) {
      const f = (p) => {
        if (r.current = p.ctrlKey || p.metaKey || p.shiftKey || p.altKey, (!r.current || r.current && !l) && lc(p))
          return !1;
        const x = Ts(p.code, c);
        if (i.current.add(p[x]), $s(s, i.current, !1)) {
          const w = p.composedPath?.()?.[0] || p.target, y = w?.nodeName === "BUTTON" || w?.nodeName === "A";
          t.preventDefault !== !1 && (r.current || !y) && p.preventDefault(), o(!0);
        }
      }, d = (p) => {
        const g = Ts(p.code, c);
        $s(s, i.current, !0) ? (o(!1), i.current.clear()) : i.current.delete(p[g]), p.key === "Meta" && i.current.clear(), r.current = !1;
      }, h = () => {
        i.current.clear(), o(!1);
      };
      return u?.addEventListener("keydown", f), u?.addEventListener("keyup", d), window.addEventListener("blur", h), window.addEventListener("contextmenu", h), () => {
        u?.removeEventListener("keydown", f), u?.removeEventListener("keyup", d), window.removeEventListener("blur", h), window.removeEventListener("contextmenu", h);
      };
    }
  }, [e, o]), n;
}
function $s(e, t, n) {
  return e.filter((o) => n || o.length === t.size).some((o) => o.every((r) => t.has(r)));
}
function Ts(e, t) {
  return t.includes(e) ? "code" : "key";
}
const ag = () => {
  const e = we();
  return me(() => ({
    zoomIn: async (t) => {
      const { panZoom: n } = e.getState();
      return n ? n.scaleBy(1.2, t) : !1;
    },
    zoomOut: async (t) => {
      const { panZoom: n } = e.getState();
      return n ? n.scaleBy(1 / 1.2, t) : !1;
    },
    zoomTo: async (t, n) => {
      const { panZoom: o } = e.getState();
      return o ? o.scaleTo(t, n) : !1;
    },
    getZoom: () => e.getState().transform[2],
    setViewport: async (t, n) => {
      const { transform: [o, r, i], panZoom: s } = e.getState();
      return s ? (await s.setViewport({
        x: t.x ?? o,
        y: t.y ?? r,
        zoom: t.zoom ?? i
      }, n), !0) : !1;
    },
    getViewport: () => {
      const [t, n, o] = e.getState().transform;
      return { x: t, y: n, zoom: o };
    },
    setCenter: async (t, n, o) => e.getState().setCenter(t, n, o),
    fitBounds: async (t, n) => {
      const { width: o, height: r, minZoom: i, maxZoom: s, panZoom: c } = e.getState(), u = Si(t, o, r, i, s, n?.padding ?? 0.1);
      return c ? (await c.setViewport(u, {
        duration: n?.duration,
        ease: n?.ease,
        interpolate: n?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (t, n = {}) => {
      const { transform: o, snapGrid: r, snapToGrid: i, domNode: s } = e.getState();
      if (!s)
        return t;
      const { x: c, y: u } = s.getBoundingClientRect(), l = {
        x: t.x - c,
        y: t.y - u
      }, f = n.snapGrid ?? r, d = n.snapToGrid ?? i;
      return Kt(l, o, d, f);
    },
    flowToScreenPosition: (t) => {
      const { transform: n, domNode: o } = e.getState();
      if (!o)
        return t;
      const { x: r, y: i } = o.getBoundingClientRect(), s = Xt(t, n);
      return {
        x: s.x + r,
        y: s.y + i
      };
    }
  }), []);
};
function Dc(e, t) {
  const n = [], o = /* @__PURE__ */ new Map(), r = [];
  for (const i of e)
    if (i.type === "add") {
      r.push(i);
      continue;
    } else if (i.type === "remove" || i.type === "replace")
      o.set(i.id, [i]);
    else {
      const s = o.get(i.id);
      s ? s.push(i) : o.set(i.id, [i]);
    }
  for (const i of t) {
    const s = o.get(i.id);
    if (!s) {
      n.push(i);
      continue;
    }
    if (s[0].type === "remove")
      continue;
    if (s[0].type === "replace") {
      n.push({ ...s[0].item });
      continue;
    }
    const c = { ...i };
    for (const u of s)
      cg(u, c);
    n.push(c);
  }
  return r.length && r.forEach((i) => {
    i.index !== void 0 ? n.splice(i.index, 0, { ...i.item }) : n.push({ ...i.item });
  }), n;
}
function cg(e, t) {
  switch (e.type) {
    case "select": {
      t.selected = e.selected;
      break;
    }
    case "position": {
      typeof e.position < "u" && (t.position = e.position), typeof e.dragging < "u" && (t.dragging = e.dragging);
      break;
    }
    case "dimensions": {
      typeof e.dimensions < "u" && (t.measured = {
        ...e.dimensions
      }, e.setAttributes && ((e.setAttributes === !0 || e.setAttributes === "width") && (t.width = e.dimensions.width), (e.setAttributes === !0 || e.setAttributes === "height") && (t.height = e.dimensions.height))), typeof e.resizing == "boolean" && (t.resizing = e.resizing);
      break;
    }
  }
}
function Pc(e, t) {
  return Dc(e, t);
}
function $c(e, t) {
  return Dc(e, t);
}
function bt(e, t) {
  return {
    id: e,
    type: "select",
    selected: t
  };
}
function Rt(e, t = /* @__PURE__ */ new Set(), n = !1) {
  const o = [];
  for (const [r, i] of e) {
    const s = t.has(r);
    !(i.selected === void 0 && !s) && i.selected !== s && (n && (i.selected = s), o.push(bt(i.id, s)));
  }
  return o;
}
function zs({ items: e = [], lookup: t }) {
  const n = [], o = new Map(e.map((r) => [r.id, r]));
  for (const [r, i] of e.entries()) {
    const s = t.get(i.id), c = s?.internals?.userNode ?? s;
    c !== void 0 && c !== i && n.push({ id: i.id, item: i, type: "replace" }), c === void 0 && n.push({ item: i, type: "add", index: r });
  }
  for (const [r] of t)
    o.get(r) === void 0 && n.push({ id: r, type: "remove" });
  return n;
}
function Rs(e) {
  return {
    id: e.id,
    type: "remove"
  };
}
const Tc = ic();
function zc(e, t, n = {}) {
  return Xh(e, t, {
    ...n,
    onError: n.onError ?? Tc
  });
}
function lg(e, t, n, o = { shouldReplaceId: !0 }) {
  return Yh(e, t, n, {
    ...o,
    onError: o.onError ?? Tc
  });
}
const Ls = (e) => Mh(e), ug = (e) => tc(e);
function Rc(e) {
  return Wo(e);
}
const dg = typeof window < "u" ? ql : re;
function Vs(e) {
  const [t, n] = Y(BigInt(0)), [o] = Y(() => fg(() => n((r) => r + BigInt(1))));
  return dg(() => {
    const r = o.get();
    r.length && (e(r), o.reset());
  }, [t]), o;
}
function fg(e) {
  let t = [];
  return {
    get: () => t,
    reset: () => {
      t = [];
    },
    push: (n) => {
      t.push(n), e();
    }
  };
}
const Lc = di(null);
function hg({ children: e }) {
  const t = we(), n = ge((c) => {
    const { nodes: u = [], setNodes: l, hasDefaultNodes: f, onNodesChange: d, nodeLookup: h, fitViewQueued: p, onNodesChangeMiddlewareMap: g } = t.getState();
    let x = u;
    for (const y of c)
      x = typeof y == "function" ? y(x) : y;
    let w = zs({
      items: x,
      lookup: h
    });
    for (const y of g.values())
      w = y(w);
    f && l(x), w.length > 0 ? d?.(w) : p && window.requestAnimationFrame(() => {
      const { fitViewQueued: y, nodes: N, setNodes: m } = t.getState();
      y && m(N);
    });
  }, []), o = Vs(n), r = ge((c) => {
    const { edges: u = [], setEdges: l, hasDefaultEdges: f, onEdgesChange: d, edgeLookup: h } = t.getState();
    let p = u;
    for (const g of c)
      p = typeof g == "function" ? g(p) : g;
    f ? l(p) : d && d(zs({
      items: p,
      lookup: h
    }));
  }, []), i = Vs(r), s = me(() => ({ nodeQueue: o, edgeQueue: i }), []);
  return a.jsx(Lc.Provider, { value: s, children: e });
}
function pg() {
  const e = Rn(Lc);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const gg = (e) => !!e.panZoom;
function _i() {
  const e = ag(), t = we(), n = pg(), o = ue(gg), r = me(() => {
    const i = (d) => t.getState().nodeLookup.get(d), s = (d) => {
      n.nodeQueue.push(d);
    }, c = (d) => {
      n.edgeQueue.push(d);
    }, u = (d) => {
      const { nodeLookup: h, nodeOrigin: p } = t.getState(), g = Ls(d) ? d : h.get(d.id), x = g.parentId ? ac(g.position, g.measured, g.parentId, h, p) : g.position, w = {
        ...g,
        position: x,
        width: g.measured?.width ?? g.width,
        height: g.measured?.height ?? g.height
      };
      return Wt(w);
    }, l = (d, h, p = { replace: !1 }) => {
      s((g) => g.map((x) => {
        if (x.id === d) {
          const w = typeof h == "function" ? h(x) : h;
          return p.replace && Ls(w) ? w : { ...x, ...w };
        }
        return x;
      }));
    }, f = (d, h, p = { replace: !1 }) => {
      c((g) => g.map((x) => {
        if (x.id === d) {
          const w = typeof h == "function" ? h(x) : h;
          return p.replace && ug(w) ? w : { ...x, ...w };
        }
        return x;
      }));
    };
    return {
      getNodes: () => t.getState().nodes.map((d) => ({ ...d })),
      getNode: (d) => i(d)?.internals.userNode,
      getInternalNode: i,
      getEdges: () => {
        const { edges: d = [] } = t.getState();
        return d.map((h) => ({ ...h }));
      },
      getEdge: (d) => t.getState().edgeLookup.get(d),
      setNodes: s,
      setEdges: c,
      addNodes: (d) => {
        const h = Array.isArray(d) ? d : [d];
        n.nodeQueue.push((p) => [...p, ...h]);
      },
      addEdges: (d) => {
        const h = Array.isArray(d) ? d : [d];
        n.edgeQueue.push((p) => [...p, ...h]);
      },
      toObject: () => {
        const { nodes: d = [], edges: h = [], transform: p } = t.getState(), [g, x, w] = p;
        return {
          nodes: d.map((y) => ({ ...y })),
          edges: h.map((y) => ({ ...y })),
          viewport: {
            x: g,
            y: x,
            zoom: w
          }
        };
      },
      deleteElements: async ({ nodes: d = [], edges: h = [] }) => {
        const { nodes: p, edges: g, onNodesDelete: x, onEdgesDelete: w, triggerNodeChanges: y, triggerEdgeChanges: N, onDelete: m, onBeforeDelete: v } = t.getState(), { nodes: E, edges: C } = await zh({
          nodesToRemove: d,
          edgesToRemove: h,
          nodes: p,
          edges: g,
          onBeforeDelete: v
        }), k = C.length > 0, _ = E.length > 0;
        if (k) {
          const P = C.map(Rs);
          w?.(C), N(P);
        }
        if (_) {
          const P = E.map(Rs);
          x?.(E), y(P);
        }
        return (_ || k) && m?.({ nodes: E, edges: C }), { deletedNodes: E, deletedEdges: C };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (d, h = !0, p) => {
        const g = cs(d), x = g ? d : u(d), w = p !== void 0;
        return x ? (p || t.getState().nodes).filter((y) => {
          const N = t.getState().nodeLookup.get(y.id);
          if (N && !g && (y.id === d.id || !N.internals.positionAbsolute))
            return !1;
          const m = Wt(w ? y : N), v = Pn(m, x);
          return h && v > 0 || v >= m.width * m.height || v >= x.width * x.height;
        }) : [];
      },
      isNodeIntersecting: (d, h, p = !0) => {
        const x = cs(d) ? d : u(d);
        if (!x)
          return !1;
        const w = Pn(x, h);
        return p && w > 0 || w >= h.width * h.height || w >= x.width * x.height;
      },
      updateNode: l,
      updateNodeData: (d, h, p = { replace: !1 }) => {
        l(d, (g) => {
          const x = typeof h == "function" ? h(g) : h;
          return p.replace ? { ...g, data: x } : { ...g, data: { ...g.data, ...x } };
        }, p);
      },
      updateEdge: f,
      updateEdgeData: (d, h, p = { replace: !1 }) => {
        f(d, (g) => {
          const x = typeof h == "function" ? h(g) : h;
          return p.replace ? { ...g, data: x } : { ...g, data: { ...g.data, ...x } };
        }, p);
      },
      getNodesBounds: (d) => {
        const { nodeLookup: h, nodeOrigin: p } = t.getState();
        return Dh(d, { nodeLookup: h, nodeOrigin: p });
      },
      getHandleConnections: ({ type: d, id: h, nodeId: p }) => Array.from(t.getState().connectionLookup.get(`${p}-${d}${h ? `-${h}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: d, handleId: h, nodeId: p }) => Array.from(t.getState().connectionLookup.get(`${p}${d ? h ? `-${d}-${h}` : `-${d}` : ""}`)?.values() ?? []),
      fitView: async (d) => {
        const h = t.getState().fitViewResolver ?? Vh();
        return t.setState({ fitViewQueued: !0, fitViewOptions: d, fitViewResolver: h }), n.nodeQueue.push((p) => [...p]), h.promise;
      }
    };
  }, []);
  return me(() => ({
    ...r,
    ...e,
    viewportInitialized: o
  }), [o]);
}
const Hs = (e) => e.selected, mg = typeof window < "u" ? window : void 0;
function yg({ deleteKeyCode: e, multiSelectionKeyCode: t }) {
  const n = we(), { deleteElements: o } = _i(), r = Tn(e, { actInsideInputWithModifier: !1 }), i = Tn(t, { target: mg });
  re(() => {
    if (r) {
      const { edges: s, nodes: c } = n.getState();
      o({ nodes: c.filter(Hs), edges: s.filter(Hs) }), n.setState({ nodesSelectionActive: !1 });
    }
  }, [r]), re(() => {
    n.setState({ multiSelectionActive: i });
  }, [i]);
}
function xg(e) {
  const t = we();
  re(() => {
    const n = () => {
      if (!e.current || !(e.current.checkVisibility?.() ?? !0))
        return !1;
      const o = Ni(e.current);
      (o.height === 0 || o.width === 0) && t.getState().onError?.("004", He.error004()), t.setState({ width: o.width || 500, height: o.height || 500 });
    };
    if (e.current) {
      n(), window.addEventListener("resize", n);
      const o = new ResizeObserver(() => n());
      return o.observe(e.current), () => {
        window.removeEventListener("resize", n), o && e.current && o.unobserve(e.current);
      };
    }
  }, []);
}
const tr = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, wg = (e) => ({
  userSelectionActive: e.userSelectionActive,
  lib: e.lib,
  connectionInProgress: e.connection.inProgress
});
function vg({ onPaneContextMenu: e, zoomOnScroll: t = !0, zoomOnPinch: n = !0, panOnScroll: o = !1, panOnScrollSpeed: r = 0.5, panOnScrollMode: i = Et.Free, zoomOnDoubleClick: s = !0, panOnDrag: c = !0, defaultViewport: u, translateExtent: l, minZoom: f, maxZoom: d, zoomActivationKeyCode: h, preventScrolling: p = !0, children: g, noWheelClassName: x, noPanClassName: w, onViewportChange: y, isControlledViewport: N, paneClickDistance: m, selectionOnDrag: v }) {
  const E = we(), C = ce(null), { userSelectionActive: k, lib: _, connectionInProgress: P } = ue(wg, xe), W = Tn(h), A = ce();
  xg(C);
  const z = ge((H) => {
    y?.({ x: H[0], y: H[1], zoom: H[2] }), N || E.setState({ transform: H });
  }, [y, N]);
  return re(() => {
    if (C.current) {
      A.current = Sp({
        domNode: C.current,
        minZoom: f,
        maxZoom: d,
        translateExtent: l,
        viewport: u,
        onDraggingChange: (I) => E.setState((D) => D.paneDragging === I ? D : { paneDragging: I }),
        onPanZoomStart: (I, D) => {
          const { onViewportChangeStart: T, onMoveStart: $ } = E.getState();
          $?.(I, D), T?.(D);
        },
        onPanZoom: (I, D) => {
          const { onViewportChange: T, onMove: $ } = E.getState();
          $?.(I, D), T?.(D);
        },
        onPanZoomEnd: (I, D) => {
          const { onViewportChangeEnd: T, onMoveEnd: $ } = E.getState();
          $?.(I, D), T?.(D);
        }
      });
      const { x: H, y: b, zoom: j } = A.current.getViewport();
      return E.setState({
        panZoom: A.current,
        transform: [H, b, j],
        domNode: C.current.closest(".react-flow")
      }), () => {
        A.current?.destroy();
      };
    }
  }, []), re(() => {
    A.current?.update({
      onPaneContextMenu: e,
      zoomOnScroll: t,
      zoomOnPinch: n,
      panOnScroll: o,
      panOnScrollSpeed: r,
      panOnScrollMode: i,
      zoomOnDoubleClick: s,
      panOnDrag: c,
      zoomActivationKeyPressed: W,
      preventScrolling: p,
      noPanClassName: w,
      userSelectionActive: k,
      noWheelClassName: x,
      lib: _,
      onTransformChange: z,
      connectionInProgress: P,
      selectionOnDrag: v,
      paneClickDistance: m
    });
  }, [
    e,
    t,
    n,
    o,
    r,
    i,
    s,
    c,
    W,
    p,
    w,
    k,
    x,
    _,
    z,
    P,
    v,
    m
  ]), a.jsx("div", { className: "react-flow__renderer", ref: C, style: tr, children: g });
}
const bg = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect
});
function Sg() {
  const { userSelectionActive: e, userSelectionRect: t } = ue(bg, xe);
  return e && t ? a.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: t.width,
    height: t.height,
    transform: `translate(${t.x}px, ${t.y}px)`
  } }) : null;
}
const Br = (e, t) => (n) => {
  n.target === t.current && e?.(n);
}, Ng = (e) => ({
  userSelectionActive: e.userSelectionActive,
  elementsSelectable: e.elementsSelectable,
  connectionInProgress: e.connection.inProgress,
  dragging: e.paneDragging,
  panBy: e.panBy,
  autoPanSpeed: e.autoPanSpeed
});
function Eg({ isSelecting: e, selectionKeyPressed: t, selectionMode: n = Dn.Full, panOnDrag: o, autoPanOnSelection: r, paneClickDistance: i, selectionOnDrag: s, onSelectionStart: c, onSelectionEnd: u, onPaneClick: l, onPaneContextMenu: f, onPaneScroll: d, onPaneMouseEnter: h, onPaneMouseMove: p, onPaneMouseLeave: g, children: x }) {
  const w = ce(0), y = we(), { userSelectionActive: N, elementsSelectable: m, dragging: v, connectionInProgress: E, panBy: C, autoPanSpeed: k } = ue(Ng, xe), _ = m && (e || N), P = ce(null), W = ce(), A = ce(/* @__PURE__ */ new Set()), z = ce(/* @__PURE__ */ new Set()), H = ce(!1), b = ce({ x: 0, y: 0 }), j = ce(!1), I = (L) => {
    if (H.current || E) {
      H.current = !1;
      return;
    }
    l?.(L), y.getState().resetSelectedElements(), y.setState({ nodesSelectionActive: !1 });
  }, D = (L) => {
    if (Array.isArray(o) && o?.includes(2)) {
      L.preventDefault();
      return;
    }
    f?.(L);
  }, T = d ? (L) => d(L) : void 0, $ = (L) => {
    H.current && (L.stopPropagation(), H.current = !1);
  }, V = (L) => {
    const { domNode: q, transform: ie } = y.getState();
    if (W.current = q?.getBoundingClientRect(), !W.current)
      return;
    const oe = L.target === P.current;
    if (!oe && !!L.target.closest(".nokey") || !e || !(s && oe || t) || L.button !== 0 || !L.isPrimary)
      return;
    L.target?.setPointerCapture?.(L.pointerId), H.current = !1;
    const { x: ae, y: R } = qe(L.nativeEvent, W.current), G = Kt({ x: ae, y: R }, ie);
    y.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: G.x,
        startY: G.y,
        x: ae,
        y: R
      }
    }), oe || (L.stopPropagation(), L.preventDefault());
  };
  function F(L, q) {
    const { userSelectionRect: ie } = y.getState();
    if (!ie)
      return;
    const { transform: oe, nodeLookup: K, edgeLookup: Q, connectionLookup: ae, triggerNodeChanges: R, triggerEdgeChanges: G, defaultEdgeOptions: de } = y.getState(), ye = { x: ie.startX, y: ie.startY }, { x: pe, y: _e } = Xt(ye, oe), Oe = {
      startX: ye.x,
      startY: ye.y,
      x: L < pe ? L : pe,
      y: q < _e ? q : _e,
      width: Math.abs(L - pe),
      height: Math.abs(q - _e)
    }, pt = A.current, Qe = z.current;
    A.current = new Set(vi(K, Oe, oe, n === Dn.Partial, !0).map((ve) => ve.id)), z.current = /* @__PURE__ */ new Set();
    const et = de?.selectable ?? !0;
    for (const ve of A.current) {
      const De = ae.get(ve);
      if (De)
        for (const { edgeId: Te } of De.values()) {
          const Be = Q.get(Te);
          Be && (Be.selectable ?? et) && z.current.add(Te);
        }
    }
    if (!ls(pt, A.current)) {
      const ve = Rt(K, A.current, !0);
      R(ve);
    }
    if (!ls(Qe, z.current)) {
      const ve = Rt(Q, z.current);
      G(ve);
    }
    y.setState({
      userSelectionRect: Oe,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function B() {
    if (!r || !W.current)
      return;
    const [L, q] = bi(b.current, W.current, k);
    C({ x: L, y: q }).then((ie) => {
      if (!H.current || !ie) {
        w.current = requestAnimationFrame(B);
        return;
      }
      const { x: oe, y: K } = b.current;
      F(oe, K), w.current = requestAnimationFrame(B);
    });
  }
  const U = () => {
    cancelAnimationFrame(w.current), w.current = 0, j.current = !1;
  };
  re(() => () => U(), []);
  const Z = (L) => {
    const { userSelectionRect: q, transform: ie, resetSelectedElements: oe } = y.getState();
    if (!W.current || !q)
      return;
    const { x: K, y: Q } = qe(L.nativeEvent, W.current);
    b.current = { x: K, y: Q };
    const ae = Xt({ x: q.startX, y: q.startY }, ie);
    if (!H.current) {
      const R = t ? 0 : i;
      if (Math.hypot(K - ae.x, Q - ae.y) <= R)
        return;
      oe(), c?.(L);
    }
    H.current = !0, j.current || (B(), j.current = !0), F(K, Q);
  }, ee = (L) => {
    L.button === 0 && (L.target?.releasePointerCapture?.(L.pointerId), !N && L.target === P.current && y.getState().userSelectionRect && I?.(L), y.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), H.current && (u?.(L), y.setState({
      nodesSelectionActive: A.current.size > 0
    })), U());
  }, se = (L) => {
    L.target?.releasePointerCapture?.(L.pointerId), U();
  }, J = o === !0 || Array.isArray(o) && o.includes(0);
  return a.jsxs("div", { className: Ce(["react-flow__pane", { draggable: J, dragging: v, selection: e }]), onClick: _ ? void 0 : Br(I, P), onContextMenu: Br(D, P), onWheel: Br(T, P), onPointerEnter: _ ? void 0 : h, onPointerMove: _ ? Z : p, onPointerUp: _ ? ee : void 0, onPointerCancel: _ ? se : void 0, onPointerDownCapture: _ ? V : void 0, onClickCapture: _ ? $ : void 0, onPointerLeave: g, ref: P, style: tr, children: [x, a.jsx(Sg, {})] });
}
function ri({ id: e, store: t, unselect: n = !1, nodeRef: o }) {
  const { addSelectedNodes: r, unselectNodesAndEdges: i, multiSelectionActive: s, nodeLookup: c, onError: u } = t.getState(), l = c.get(e);
  if (!l) {
    u?.("012", He.error012(e));
    return;
  }
  t.setState({ nodesSelectionActive: !1 }), l.selected ? (n || l.selected && s) && (i({ nodes: [l], edges: [] }), requestAnimationFrame(() => o?.current?.blur())) : r([e]);
}
function Vc({ nodeRef: e, disabled: t = !1, noDragClassName: n, handleSelector: o, nodeId: r, isSelectable: i, nodeClickDistance: s }) {
  const c = we(), [u, l] = Y(!1), f = ce();
  return re(() => {
    f.current = cp({
      getStoreItems: () => c.getState(),
      onNodeMouseDown: (d) => {
        ri({
          id: d,
          store: c,
          nodeRef: e
        });
      },
      onDragStart: () => {
        l(!0);
      },
      onDragStop: () => {
        l(!1);
      }
    });
  }, []), re(() => {
    if (!(t || !e.current || !f.current))
      return f.current.update({
        noDragClassName: n,
        handleSelector: o,
        domNode: e.current,
        isSelectable: i,
        nodeId: r,
        nodeClickDistance: s
      }), () => {
        f.current?.destroy();
      };
  }, [n, o, t, i, e, r, s]), u;
}
const Cg = (e) => (t) => t.selected && (t.draggable || e && typeof t.draggable > "u");
function Hc() {
  const e = we();
  return ge((n) => {
    const { nodeExtent: o, snapToGrid: r, snapGrid: i, nodesDraggable: s, onError: c, updateNodePositions: u, nodeLookup: l, nodeOrigin: f } = e.getState(), d = /* @__PURE__ */ new Map(), h = Cg(s), p = r ? i[0] : 5, g = r ? i[1] : 5, x = n.direction.x * p * n.factor, w = n.direction.y * g * n.factor;
    for (const [, y] of l) {
      if (!h(y))
        continue;
      let N = {
        x: y.internals.positionAbsolute.x + x,
        y: y.internals.positionAbsolute.y + w
      };
      r && (N = Bn(N, i));
      const { position: m, positionAbsolute: v } = nc({
        nodeId: y.id,
        nextPosition: N,
        nodeLookup: l,
        nodeExtent: o,
        nodeOrigin: f,
        onError: c
      });
      y.position = m, y.internals.positionAbsolute = v, d.set(y.id, y);
    }
    u(d);
  }, []);
}
const Ai = di(null), kg = Ai.Provider;
Ai.Consumer;
const Oc = () => Rn(Ai), Ig = (e) => ({
  connectOnClick: e.connectOnClick,
  noPanClassName: e.noPanClassName,
  rfId: e.rfId
}), jg = (e, t, n) => (o) => {
  const { connectionClickStartHandle: r, connectionMode: i, connection: s } = o, { fromHandle: c, toHandle: u, isValid: l } = s, f = u?.nodeId === e && u?.id === t && u?.type === n;
  return {
    connectingFrom: c?.nodeId === e && c?.id === t && c?.type === n,
    connectingTo: f,
    clickConnecting: r?.nodeId === e && r?.id === t && r?.type === n,
    isPossibleEndHandle: i === Bt.Strict ? c?.type !== n : e !== c?.nodeId || t !== c?.id,
    connectionInProcess: !!c,
    clickConnectionInProcess: !!r,
    valid: f && l
  };
};
function _g({ type: e = "source", position: t = te.Top, isValidConnection: n, isConnectable: o = !0, isConnectableStart: r = !0, isConnectableEnd: i = !0, id: s, onConnect: c, children: u, className: l, onMouseDown: f, onTouchStart: d, ...h }, p) {
  const g = s || null, x = e === "target", w = we(), y = Oc(), { connectOnClick: N, noPanClassName: m, rfId: v } = ue(Ig, xe), { connectingFrom: E, connectingTo: C, clickConnecting: k, isPossibleEndHandle: _, connectionInProcess: P, clickConnectionInProcess: W, valid: A } = ue(jg(y, g, e), xe);
  y || w.getState().onError?.("010", He.error010());
  const z = (j) => {
    const { defaultEdgeOptions: I, onConnect: D, hasDefaultEdges: T } = w.getState(), $ = {
      ...I,
      ...j
    };
    if (T) {
      const { edges: V, setEdges: F, onError: B } = w.getState();
      F(zc($, V, { onError: B }));
    }
    D?.($), c?.($);
  }, H = (j) => {
    if (!y)
      return;
    const I = uc(j.nativeEvent);
    if (r && (I && j.button === 0 || !I)) {
      const D = w.getState();
      oi.onPointerDown(j.nativeEvent, {
        handleDomNode: j.currentTarget,
        autoPanOnConnect: D.autoPanOnConnect,
        connectionMode: D.connectionMode,
        connectionRadius: D.connectionRadius,
        domNode: D.domNode,
        nodeLookup: D.nodeLookup,
        lib: D.lib,
        isTarget: x,
        handleId: g,
        nodeId: y,
        flowId: D.rfId,
        panBy: D.panBy,
        cancelConnection: D.cancelConnection,
        onConnectStart: D.onConnectStart,
        onConnectEnd: (...T) => w.getState().onConnectEnd?.(...T),
        updateConnection: D.updateConnection,
        onConnect: z,
        isValidConnection: n || ((...T) => w.getState().isValidConnection?.(...T) ?? !0),
        getTransform: () => w.getState().transform,
        getFromHandle: () => w.getState().connection.fromHandle,
        autoPanSpeed: D.autoPanSpeed,
        dragThreshold: D.connectionDragThreshold
      });
    }
    I ? f?.(j) : d?.(j);
  }, b = (j) => {
    const { onClickConnectStart: I, onClickConnectEnd: D, connectionClickStartHandle: T, connectionMode: $, isValidConnection: V, lib: F, rfId: B, nodeLookup: U, connection: Z } = w.getState();
    if (!y || !T && !r)
      return;
    if (!T) {
      I?.(j.nativeEvent, { nodeId: y, handleId: g, handleType: e }), w.setState({ connectionClickStartHandle: { nodeId: y, type: e, id: g } });
      return;
    }
    const ee = cc(j.target), se = n || V, { connection: J, isValid: L } = oi.isValid(j.nativeEvent, {
      handle: {
        nodeId: y,
        id: g,
        type: e
      },
      connectionMode: $,
      fromNodeId: T.nodeId,
      fromHandleId: T.id || null,
      fromType: T.type,
      isValidConnection: se,
      flowId: B,
      doc: ee,
      lib: F,
      nodeLookup: U
    });
    L && J && z(J);
    const q = structuredClone(Z);
    delete q.inProgress, q.toPosition = q.toHandle ? q.toHandle.position : null, D?.(j, q), w.setState({ connectionClickStartHandle: null });
  };
  return a.jsx("div", { "data-handleid": g, "data-nodeid": y, "data-handlepos": t, "data-id": `${v}-${y}-${g}-${e}`, className: Ce([
    "react-flow__handle",
    `react-flow__handle-${t}`,
    "nodrag",
    m,
    l,
    {
      source: !x,
      target: x,
      connectable: o,
      connectablestart: r,
      connectableend: i,
      clickconnecting: k,
      connectingfrom: E,
      connectingto: C,
      valid: A,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: o && (!P || _) && (P || W ? i : r)
    }
  ]), onMouseDown: H, onTouchStart: H, onClick: N ? b : void 0, ref: p, ...h, children: u });
}
const qt = Se(Rc(_g));
function Ag({ data: e, isConnectable: t, sourcePosition: n = te.Bottom }) {
  return a.jsxs(a.Fragment, { children: [e?.label, a.jsx(qt, { type: "source", position: n, isConnectable: t })] });
}
function Mg({ data: e, isConnectable: t, targetPosition: n = te.Top, sourcePosition: o = te.Bottom }) {
  return a.jsxs(a.Fragment, { children: [a.jsx(qt, { type: "target", position: n, isConnectable: t }), e?.label, a.jsx(qt, { type: "source", position: o, isConnectable: t })] });
}
function Dg() {
  return null;
}
function Pg({ data: e, isConnectable: t, targetPosition: n = te.Top }) {
  return a.jsxs(a.Fragment, { children: [a.jsx(qt, { type: "target", position: n, isConnectable: t }), e?.label] });
}
const Vo = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, Os = {
  input: Ag,
  default: Mg,
  output: Pg,
  group: Dg
};
function $g(e) {
  return e.internals.handleBounds === void 0 ? {
    width: e.width ?? e.initialWidth ?? e.style?.width,
    height: e.height ?? e.initialHeight ?? e.style?.height
  } : {
    width: e.width ?? e.style?.width,
    height: e.height ?? e.style?.height
  };
}
const Tg = (e) => {
  const { width: t, height: n, x: o, y: r } = On(e.nodeLookup, {
    filter: (i) => !!i.selected
  });
  return {
    width: Ye(t) ? t : null,
    height: Ye(n) ? n : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${o}px,${r}px)`
  };
};
function zg({ onSelectionContextMenu: e, noPanClassName: t, disableKeyboardA11y: n }) {
  const o = we(), { width: r, height: i, transformString: s, userSelectionActive: c } = ue(Tg, xe), u = Hc(), l = ce(null);
  re(() => {
    n || l.current?.focus({
      preventScroll: !0
    });
  }, [n]);
  const f = !c && r !== null && i !== null;
  if (Vc({
    nodeRef: l,
    disabled: !f
  }), !f)
    return null;
  const d = e ? (p) => {
    const g = o.getState().nodes.filter((x) => x.selected);
    e(p, g);
  } : void 0, h = (p) => {
    Object.prototype.hasOwnProperty.call(Vo, p.key) && (p.preventDefault(), u({
      direction: Vo[p.key],
      factor: p.shiftKey ? 4 : 1
    }));
  };
  return a.jsx("div", { className: Ce(["react-flow__nodesselection", "react-flow__container", t]), style: {
    transform: s
  }, children: a.jsx("div", { ref: l, className: "react-flow__nodesselection-rect", onContextMenu: d, tabIndex: n ? void 0 : -1, onKeyDown: n ? void 0 : h, style: {
    width: r,
    height: i
  } }) });
}
const Bs = typeof window < "u" ? window : void 0, Rg = (e) => ({ nodesSelectionActive: e.nodesSelectionActive, userSelectionActive: e.userSelectionActive });
function Bc({ children: e, onPaneClick: t, onPaneMouseEnter: n, onPaneMouseMove: o, onPaneMouseLeave: r, onPaneContextMenu: i, onPaneScroll: s, paneClickDistance: c, deleteKeyCode: u, selectionKeyCode: l, selectionOnDrag: f, selectionMode: d, onSelectionStart: h, onSelectionEnd: p, multiSelectionKeyCode: g, panActivationKeyCode: x, zoomActivationKeyCode: w, elementsSelectable: y, zoomOnScroll: N, zoomOnPinch: m, panOnScroll: v, panOnScrollSpeed: E, panOnScrollMode: C, zoomOnDoubleClick: k, panOnDrag: _, autoPanOnSelection: P, defaultViewport: W, translateExtent: A, minZoom: z, maxZoom: H, preventScrolling: b, onSelectionContextMenu: j, noWheelClassName: I, noPanClassName: D, disableKeyboardA11y: T, onViewportChange: $, isControlledViewport: V }) {
  const { nodesSelectionActive: F, userSelectionActive: B } = ue(Rg, xe), U = Tn(l, { target: Bs }), Z = Tn(x, { target: Bs }), ee = Z || _, se = Z || v, J = f && ee !== !0, L = U || B || J;
  return yg({ deleteKeyCode: u, multiSelectionKeyCode: g }), a.jsx(vg, { onPaneContextMenu: i, elementsSelectable: y, zoomOnScroll: N, zoomOnPinch: m, panOnScroll: se, panOnScrollSpeed: E, panOnScrollMode: C, zoomOnDoubleClick: k, panOnDrag: !U && ee, defaultViewport: W, translateExtent: A, minZoom: z, maxZoom: H, zoomActivationKeyCode: w, preventScrolling: b, noWheelClassName: I, noPanClassName: D, onViewportChange: $, isControlledViewport: V, paneClickDistance: c, selectionOnDrag: J, children: a.jsxs(Eg, { onSelectionStart: h, onSelectionEnd: p, onPaneClick: t, onPaneMouseEnter: n, onPaneMouseMove: o, onPaneMouseLeave: r, onPaneContextMenu: i, onPaneScroll: s, panOnDrag: ee, autoPanOnSelection: P, isSelecting: !!L, selectionMode: d, selectionKeyPressed: U, paneClickDistance: c, selectionOnDrag: J, children: [e, F && a.jsx(zg, { onSelectionContextMenu: j, noPanClassName: D, disableKeyboardA11y: T })] }) });
}
Bc.displayName = "FlowRenderer";
const Lg = Se(Bc), Vg = (e) => (t) => e ? vi(t.nodeLookup, { x: 0, y: 0, width: t.width, height: t.height }, t.transform, !0).map((n) => n.id) : Array.from(t.nodeLookup.keys());
function Hg(e) {
  return ue(ge(Vg(e), [e]), xe);
}
const Og = (e) => e.updateNodeInternals;
function Bg() {
  const e = ue(Og), [t] = Y(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((n) => {
    const o = /* @__PURE__ */ new Map();
    n.forEach((r) => {
      const i = r.target.getAttribute("data-id");
      o.set(i, {
        id: i,
        nodeElement: r.target,
        force: !0
      });
    }), e(o);
  }));
  return re(() => () => {
    t?.disconnect();
  }, [t]), t;
}
function Fg({ node: e, nodeType: t, hasDimensions: n, resizeObserver: o }) {
  const r = we(), i = ce(null), s = ce(null), c = ce(e.sourcePosition), u = ce(e.targetPosition), l = ce(t), f = n && !!e.internals.handleBounds;
  return re(() => {
    i.current && !e.hidden && (!f || s.current !== i.current) && (s.current && o?.unobserve(s.current), o?.observe(i.current), s.current = i.current);
  }, [f, e.hidden]), re(() => () => {
    s.current && (o?.unobserve(s.current), s.current = null);
  }, []), re(() => {
    if (i.current) {
      const d = l.current !== t, h = c.current !== e.sourcePosition, p = u.current !== e.targetPosition;
      (d || h || p) && (l.current = t, c.current = e.sourcePosition, u.current = e.targetPosition, r.getState().updateNodeInternals(/* @__PURE__ */ new Map([[e.id, { id: e.id, nodeElement: i.current, force: !0 }]])));
    }
  }, [e.id, t, e.sourcePosition, e.targetPosition]), i;
}
function Wg({ id: e, onClick: t, onMouseEnter: n, onMouseMove: o, onMouseLeave: r, onContextMenu: i, onDoubleClick: s, nodesDraggable: c, elementsSelectable: u, nodesConnectable: l, nodesFocusable: f, resizeObserver: d, noDragClassName: h, noPanClassName: p, disableKeyboardA11y: g, rfId: x, nodeTypes: w, nodeClickDistance: y, onError: N }) {
  const { node: m, internals: v, isParent: E } = ue((L) => {
    const q = L.nodeLookup.get(e), ie = L.parentLookup.has(e);
    return {
      node: q,
      internals: q.internals,
      isParent: ie
    };
  }, xe);
  let C = m.type || "default", k = w?.[C] || Os[C];
  k === void 0 && (N?.("003", He.error003(C)), C = "default", k = w?.default || Os.default);
  const _ = !!(m.draggable || c && typeof m.draggable > "u"), P = !!(m.selectable || u && typeof m.selectable > "u"), W = !!(m.connectable || l && typeof m.connectable > "u"), A = !!(m.focusable || f && typeof m.focusable > "u"), z = we(), H = sc(m), b = Fg({ node: m, nodeType: C, hasDimensions: H, resizeObserver: d }), j = Vc({
    nodeRef: b,
    disabled: m.hidden || !_,
    noDragClassName: h,
    handleSelector: m.dragHandle,
    nodeId: e,
    isSelectable: P,
    nodeClickDistance: y
  }), I = Hc();
  if (m.hidden)
    return null;
  const D = st(m), T = $g(m), $ = P || _ || t || n || o || r, V = n ? (L) => n(L, { ...v.userNode }) : void 0, F = o ? (L) => o(L, { ...v.userNode }) : void 0, B = r ? (L) => r(L, { ...v.userNode }) : void 0, U = i ? (L) => i(L, { ...v.userNode }) : void 0, Z = s ? (L) => s(L, { ...v.userNode }) : void 0, ee = (L) => {
    const { selectNodesOnDrag: q, nodeDragThreshold: ie } = z.getState();
    P && (!q || !_ || ie > 0) && ri({
      id: e,
      store: z,
      nodeRef: b
    }), t && t(L, { ...v.userNode });
  }, se = (L) => {
    if (!(lc(L.nativeEvent) || g)) {
      if (Ga.includes(L.key) && P) {
        const q = L.key === "Escape";
        ri({
          id: e,
          store: z,
          unselect: q,
          nodeRef: b
        });
      } else if (_ && m.selected && Object.prototype.hasOwnProperty.call(Vo, L.key)) {
        L.preventDefault();
        const { ariaLabelConfig: q } = z.getState();
        z.setState({
          ariaLiveMessage: q["node.a11yDescription.ariaLiveMessage"]({
            direction: L.key.replace("Arrow", "").toLowerCase(),
            x: ~~v.positionAbsolute.x,
            y: ~~v.positionAbsolute.y
          })
        }), I({
          direction: Vo[L.key],
          factor: L.shiftKey ? 4 : 1
        });
      }
    }
  }, J = () => {
    if (g || !b.current?.matches(":focus-visible"))
      return;
    const { transform: L, width: q, height: ie, autoPanOnNodeFocus: oe, setCenter: K } = z.getState();
    if (!oe)
      return;
    vi(/* @__PURE__ */ new Map([[e, m]]), { x: 0, y: 0, width: q, height: ie }, L, !0).length > 0 || K(m.position.x + D.width / 2, m.position.y + D.height / 2, {
      zoom: L[2]
    });
  };
  return a.jsx("div", { className: Ce([
    "react-flow__node",
    `react-flow__node-${C}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [p]: _
    },
    m.className,
    {
      selected: m.selected,
      selectable: P,
      parent: E,
      draggable: _,
      dragging: j
    }
  ]), ref: b, style: {
    zIndex: v.z,
    transform: `translate(${v.positionAbsolute.x}px,${v.positionAbsolute.y}px)`,
    pointerEvents: $ ? "all" : "none",
    visibility: H ? "visible" : "hidden",
    ...m.style,
    ...T
  }, "data-id": e, "data-testid": `rf__node-${e}`, onMouseEnter: V, onMouseMove: F, onMouseLeave: B, onContextMenu: U, onClick: ee, onDoubleClick: Z, onKeyDown: A ? se : void 0, tabIndex: A ? 0 : void 0, onFocus: A ? J : void 0, role: m.ariaRole ?? (A ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": g ? void 0 : `${_c}-${x}`, "aria-label": m.ariaLabel, ...m.domAttributes, children: a.jsx(kg, { value: e, children: a.jsx(k, { id: e, data: m.data, type: C, positionAbsoluteX: v.positionAbsolute.x, positionAbsoluteY: v.positionAbsolute.y, selected: m.selected ?? !1, selectable: P, draggable: _, deletable: m.deletable ?? !0, isConnectable: W, sourcePosition: m.sourcePosition, targetPosition: m.targetPosition, dragging: j, dragHandle: m.dragHandle, zIndex: v.z, parentId: m.parentId, ...D }) }) });
}
var Xg = Se(Wg);
const Yg = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError
});
function Fc(e) {
  const { nodesDraggable: t, nodesConnectable: n, nodesFocusable: o, elementsSelectable: r, onError: i } = ue(Yg, xe), s = Hg(e.onlyRenderVisibleElements), c = Bg();
  return a.jsx("div", { className: "react-flow__nodes", style: tr, children: s.map((u) => (
    /*
     * The split of responsibilities between NodeRenderer and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For example, when you’re dragging a single node, that node gets
     * updated multiple times per second. If `NodeRenderer` were to update
     * every time, it would have to re-run the `nodes.map()` loop every
     * time. This gets pricey with hundreds of nodes, especially if every
     * loop cycle does more than just rendering a JSX element!
     *
     * As a result of this choice, we took the following implementation
     * decisions:
     * - NodeRenderer subscribes *only* to node IDs – and therefore
     *   rerender *only* when visible nodes are added or removed.
     * - NodeRenderer performs all operations the result of which can be
     *   shared between nodes (such as creating the `ResizeObserver`
     *   instance, or subscribing to `selector`). This means extra prop
     *   drilling into `NodeComponentWrapper`, but it means we need to run
     *   these operations only once – instead of once per node.
     * - Any operations that you’d normally write inside `nodes.map` are
     *   moved into `NodeComponentWrapper`. This ensures they are
     *   memorized – so if `NodeRenderer` *has* to rerender, it only
     *   needs to regenerate the list of nodes, nothing else.
     */
    a.jsx(Xg, { id: u, nodeTypes: e.nodeTypes, nodeExtent: e.nodeExtent, onClick: e.onNodeClick, onMouseEnter: e.onNodeMouseEnter, onMouseMove: e.onNodeMouseMove, onMouseLeave: e.onNodeMouseLeave, onContextMenu: e.onNodeContextMenu, onDoubleClick: e.onNodeDoubleClick, noDragClassName: e.noDragClassName, noPanClassName: e.noPanClassName, rfId: e.rfId, disableKeyboardA11y: e.disableKeyboardA11y, resizeObserver: c, nodesDraggable: t, nodesConnectable: n, nodesFocusable: o, elementsSelectable: r, nodeClickDistance: e.nodeClickDistance, onError: i }, u)
  )) });
}
Fc.displayName = "NodeRenderer";
const qg = Se(Fc);
function Zg(e) {
  return ue(ge((n) => {
    if (!e)
      return n.edges.map((r) => r.id);
    const o = [];
    if (n.width && n.height)
      for (const r of n.edges) {
        const i = n.nodeLookup.get(r.source), s = n.nodeLookup.get(r.target);
        i && s && Fh({
          sourceNode: i,
          targetNode: s,
          width: n.width,
          height: n.height,
          transform: n.transform
        }) && o.push(r.id);
      }
    return o;
  }, [e]), xe);
}
const Kg = ({ color: e = "none", strokeWidth: t = 1 }) => {
  const n = {
    strokeWidth: t,
    ...e && { stroke: e }
  };
  return a.jsx("polyline", { className: "arrow", style: n, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, Ug = ({ color: e = "none", strokeWidth: t = 1 }) => {
  const n = {
    strokeWidth: t,
    ...e && { stroke: e, fill: e }
  };
  return a.jsx("polyline", { className: "arrowclosed", style: n, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, Fs = {
  [zo.Arrow]: Kg,
  [zo.ArrowClosed]: Ug
};
function Gg(e) {
  const t = we();
  return me(() => Object.prototype.hasOwnProperty.call(Fs, e) ? Fs[e] : (t.getState().onError?.("009", He.error009(e)), null), [e]);
}
const Jg = ({ id: e, type: t, color: n, width: o = 12.5, height: r = 12.5, markerUnits: i = "strokeWidth", strokeWidth: s, orient: c = "auto-start-reverse" }) => {
  const u = Gg(t);
  return u ? a.jsx("marker", { className: "react-flow__arrowhead", id: e, markerWidth: `${o}`, markerHeight: `${r}`, viewBox: "-10 -10 20 20", markerUnits: i, orient: c, refX: "0", refY: "0", children: a.jsx(u, { color: n, strokeWidth: s }) }) : null;
}, Wc = ({ defaultColor: e, rfId: t }) => {
  const n = ue((i) => i.edges), o = ue((i) => i.defaultEdgeOptions), r = me(() => Gh(n, {
    id: t,
    defaultColor: e,
    defaultMarkerStart: o?.markerStart,
    defaultMarkerEnd: o?.markerEnd
  }), [n, o, t, e]);
  return r.length ? a.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: a.jsx("defs", { children: r.map((i) => a.jsx(Jg, { id: i.id, type: i.type, color: i.color, width: i.width, height: i.height, markerUnits: i.markerUnits, strokeWidth: i.strokeWidth, orient: i.orient }, i.id)) }) }) : null;
};
Wc.displayName = "MarkerDefinitions";
var Qg = Se(Wc);
function Xc({ x: e, y: t, label: n, labelStyle: o, labelShowBg: r = !0, labelBgStyle: i, labelBgPadding: s = [2, 4], labelBgBorderRadius: c = 2, children: u, className: l, ...f }) {
  const [d, h] = Y({ x: 1, y: 0, width: 0, height: 0 }), p = Ce(["react-flow__edge-textwrapper", l]), g = ce(null);
  return re(() => {
    if (g.current) {
      const x = g.current.getBBox();
      h({
        x: x.x,
        y: x.y,
        width: x.width,
        height: x.height
      });
    }
  }, [n]), n ? a.jsxs("g", { transform: `translate(${e - d.width / 2} ${t - d.height / 2})`, className: p, visibility: d.width ? "visible" : "hidden", ...f, children: [r && a.jsx("rect", { width: d.width + 2 * s[0], x: -s[0], y: -s[1], height: d.height + 2 * s[1], className: "react-flow__edge-textbg", style: i, rx: c, ry: c }), a.jsx("text", { className: "react-flow__edge-text", y: d.height / 2, dy: "0.3em", ref: g, style: o, children: n }), u] }) : null;
}
Xc.displayName = "EdgeText";
const em = Se(Xc);
function Fn({ path: e, labelX: t, labelY: n, label: o, labelStyle: r, labelShowBg: i, labelBgStyle: s, labelBgPadding: c, labelBgBorderRadius: u, interactionWidth: l = 20, ...f }) {
  return a.jsxs(a.Fragment, { children: [a.jsx("path", { ...f, d: e, fill: "none", className: Ce(["react-flow__edge-path", f.className]) }), l ? a.jsx("path", { d: e, fill: "none", strokeOpacity: 0, strokeWidth: l, className: "react-flow__edge-interaction" }) : null, o && Ye(t) && Ye(n) ? a.jsx(em, { x: t, y: n, label: o, labelStyle: r, labelShowBg: i, labelBgStyle: s, labelBgPadding: c, labelBgBorderRadius: u }) : null] });
}
function Ws({ pos: e, x1: t, y1: n, x2: o, y2: r }) {
  return e === te.Left || e === te.Right ? [0.5 * (t + o), n] : [t, 0.5 * (n + r)];
}
function Yc({ sourceX: e, sourceY: t, sourcePosition: n = te.Bottom, targetX: o, targetY: r, targetPosition: i = te.Top }) {
  const [s, c] = Ws({
    pos: n,
    x1: e,
    y1: t,
    x2: o,
    y2: r
  }), [u, l] = Ws({
    pos: i,
    x1: o,
    y1: r,
    x2: e,
    y2: t
  }), [f, d, h, p] = dc({
    sourceX: e,
    sourceY: t,
    targetX: o,
    targetY: r,
    sourceControlX: s,
    sourceControlY: c,
    targetControlX: u,
    targetControlY: l
  });
  return [
    `M${e},${t} C${s},${c} ${u},${l} ${o},${r}`,
    f,
    d,
    h,
    p
  ];
}
function qc(e) {
  return Se(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: i, sourcePosition: s, targetPosition: c, label: u, labelStyle: l, labelShowBg: f, labelBgStyle: d, labelBgPadding: h, labelBgBorderRadius: p, style: g, markerEnd: x, markerStart: w, interactionWidth: y }) => {
    const [N, m, v] = Yc({
      sourceX: n,
      sourceY: o,
      sourcePosition: s,
      targetX: r,
      targetY: i,
      targetPosition: c
    }), E = e.isInternal ? void 0 : t;
    return a.jsx(Fn, { id: E, path: N, labelX: m, labelY: v, label: u, labelStyle: l, labelShowBg: f, labelBgStyle: d, labelBgPadding: h, labelBgBorderRadius: p, style: g, markerEnd: x, markerStart: w, interactionWidth: y });
  });
}
const tm = qc({ isInternal: !1 }), Zc = qc({ isInternal: !0 });
tm.displayName = "SimpleBezierEdge";
Zc.displayName = "SimpleBezierEdgeInternal";
function Kc(e) {
  return Se(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: i, label: s, labelStyle: c, labelShowBg: u, labelBgStyle: l, labelBgPadding: f, labelBgBorderRadius: d, style: h, sourcePosition: p = te.Bottom, targetPosition: g = te.Top, markerEnd: x, markerStart: w, pathOptions: y, interactionWidth: N }) => {
    const [m, v, E] = Lo({
      sourceX: n,
      sourceY: o,
      sourcePosition: p,
      targetX: r,
      targetY: i,
      targetPosition: g,
      borderRadius: y?.borderRadius,
      offset: y?.offset,
      stepPosition: y?.stepPosition
    }), C = e.isInternal ? void 0 : t;
    return a.jsx(Fn, { id: C, path: m, labelX: v, labelY: E, label: s, labelStyle: c, labelShowBg: u, labelBgStyle: l, labelBgPadding: f, labelBgBorderRadius: d, style: h, markerEnd: x, markerStart: w, interactionWidth: N });
  });
}
const Uc = Kc({ isInternal: !1 }), Gc = Kc({ isInternal: !0 });
Uc.displayName = "SmoothStepEdge";
Gc.displayName = "SmoothStepEdgeInternal";
function Jc(e) {
  return Se(({ id: t, ...n }) => {
    const o = e.isInternal ? void 0 : t;
    return a.jsx(Uc, { ...n, id: o, pathOptions: me(() => ({ borderRadius: 0, offset: n.pathOptions?.offset }), [n.pathOptions?.offset]) });
  });
}
const nm = Jc({ isInternal: !1 }), Qc = Jc({ isInternal: !0 });
nm.displayName = "StepEdge";
Qc.displayName = "StepEdgeInternal";
function el(e) {
  return Se(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: i, label: s, labelStyle: c, labelShowBg: u, labelBgStyle: l, labelBgPadding: f, labelBgBorderRadius: d, style: h, markerEnd: p, markerStart: g, interactionWidth: x }) => {
    const [w, y, N] = gc({ sourceX: n, sourceY: o, targetX: r, targetY: i }), m = e.isInternal ? void 0 : t;
    return a.jsx(Fn, { id: m, path: w, labelX: y, labelY: N, label: s, labelStyle: c, labelShowBg: u, labelBgStyle: l, labelBgPadding: f, labelBgBorderRadius: d, style: h, markerEnd: p, markerStart: g, interactionWidth: x });
  });
}
const om = el({ isInternal: !1 }), tl = el({ isInternal: !0 });
om.displayName = "StraightEdge";
tl.displayName = "StraightEdgeInternal";
function nl(e) {
  return Se(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: i, sourcePosition: s = te.Bottom, targetPosition: c = te.Top, label: u, labelStyle: l, labelShowBg: f, labelBgStyle: d, labelBgPadding: h, labelBgBorderRadius: p, style: g, markerEnd: x, markerStart: w, pathOptions: y, interactionWidth: N }) => {
    const [m, v, E] = fc({
      sourceX: n,
      sourceY: o,
      sourcePosition: s,
      targetX: r,
      targetY: i,
      targetPosition: c,
      curvature: y?.curvature
    }), C = e.isInternal ? void 0 : t;
    return a.jsx(Fn, { id: C, path: m, labelX: v, labelY: E, label: u, labelStyle: l, labelShowBg: f, labelBgStyle: d, labelBgPadding: h, labelBgBorderRadius: p, style: g, markerEnd: x, markerStart: w, interactionWidth: N });
  });
}
const rm = nl({ isInternal: !1 }), ol = nl({ isInternal: !0 });
rm.displayName = "BezierEdge";
ol.displayName = "BezierEdgeInternal";
const Xs = {
  default: ol,
  straight: tl,
  step: Qc,
  smoothstep: Gc,
  simplebezier: Zc
}, Ys = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, im = (e, t, n) => n === te.Left ? e - t : n === te.Right ? e + t : e, sm = (e, t, n) => n === te.Top ? e - t : n === te.Bottom ? e + t : e, qs = "react-flow__edgeupdater";
function Zs({ position: e, centerX: t, centerY: n, radius: o = 10, onMouseDown: r, onMouseEnter: i, onMouseOut: s, type: c }) {
  return a.jsx("circle", { onMouseDown: r, onMouseEnter: i, onMouseOut: s, className: Ce([qs, `${qs}-${c}`]), cx: im(t, o, e), cy: sm(n, o, e), r: o, stroke: "transparent", fill: "transparent" });
}
function am({ isReconnectable: e, reconnectRadius: t, edge: n, sourceX: o, sourceY: r, targetX: i, targetY: s, sourcePosition: c, targetPosition: u, onReconnect: l, onReconnectStart: f, onReconnectEnd: d, setReconnecting: h, setUpdateHover: p }) {
  const g = we(), x = (v, E) => {
    if (v.button !== 0)
      return;
    const { autoPanOnConnect: C, domNode: k, connectionMode: _, connectionRadius: P, lib: W, onConnectStart: A, cancelConnection: z, nodeLookup: H, rfId: b, panBy: j, updateConnection: I } = g.getState(), D = E.type === "target", T = (F, B) => {
      h(!1), d?.(F, n, E.type, B);
    }, $ = (F) => l?.(n, F), V = (F, B) => {
      h(!0), f?.(v, n, E.type), A?.(F, B);
    };
    oi.onPointerDown(v.nativeEvent, {
      autoPanOnConnect: C,
      connectionMode: _,
      connectionRadius: P,
      domNode: k,
      handleId: E.id,
      nodeId: E.nodeId,
      nodeLookup: H,
      isTarget: D,
      edgeUpdaterType: E.type,
      lib: W,
      flowId: b,
      cancelConnection: z,
      panBy: j,
      isValidConnection: (...F) => g.getState().isValidConnection?.(...F) ?? !0,
      onConnect: $,
      onConnectStart: V,
      onConnectEnd: (...F) => g.getState().onConnectEnd?.(...F),
      onReconnectEnd: T,
      updateConnection: I,
      getTransform: () => g.getState().transform,
      getFromHandle: () => g.getState().connection.fromHandle,
      dragThreshold: g.getState().connectionDragThreshold,
      handleDomNode: v.currentTarget
    });
  }, w = (v) => x(v, { nodeId: n.target, id: n.targetHandle ?? null, type: "target" }), y = (v) => x(v, { nodeId: n.source, id: n.sourceHandle ?? null, type: "source" }), N = () => p(!0), m = () => p(!1);
  return a.jsxs(a.Fragment, { children: [(e === !0 || e === "source") && a.jsx(Zs, { position: c, centerX: o, centerY: r, radius: t, onMouseDown: w, onMouseEnter: N, onMouseOut: m, type: "source" }), (e === !0 || e === "target") && a.jsx(Zs, { position: u, centerX: i, centerY: s, radius: t, onMouseDown: y, onMouseEnter: N, onMouseOut: m, type: "target" })] });
}
function cm({ id: e, edgesFocusable: t, edgesReconnectable: n, elementsSelectable: o, onClick: r, onDoubleClick: i, onContextMenu: s, onMouseEnter: c, onMouseMove: u, onMouseLeave: l, reconnectRadius: f, onReconnect: d, onReconnectStart: h, onReconnectEnd: p, rfId: g, edgeTypes: x, noPanClassName: w, onError: y, disableKeyboardA11y: N }) {
  let m = ue((K) => K.edgeLookup.get(e));
  const v = ue((K) => K.defaultEdgeOptions);
  m = v ? { ...v, ...m } : m;
  let E = m.type || "default", C = x?.[E] || Xs[E];
  C === void 0 && (y?.("011", He.error011(E)), E = "default", C = x?.default || Xs.default);
  const k = !!(m.focusable || t && typeof m.focusable > "u"), _ = typeof d < "u" && (m.reconnectable || n && typeof m.reconnectable > "u"), P = !!(m.selectable || o && typeof m.selectable > "u"), W = ce(null), [A, z] = Y(!1), [H, b] = Y(!1), j = we(), { zIndex: I, sourceX: D, sourceY: T, targetX: $, targetY: V, sourcePosition: F, targetPosition: B } = ue(ge((K) => {
    const Q = K.nodeLookup.get(m.source), ae = K.nodeLookup.get(m.target);
    if (!Q || !ae)
      return {
        zIndex: m.zIndex,
        ...Ys
      };
    const R = Uh({
      id: e,
      sourceNode: Q,
      targetNode: ae,
      sourceHandle: m.sourceHandle || null,
      targetHandle: m.targetHandle || null,
      connectionMode: K.connectionMode,
      onError: y
    });
    return {
      zIndex: Bh({
        selected: m.selected,
        zIndex: m.zIndex,
        sourceNode: Q,
        targetNode: ae,
        elevateOnSelect: K.elevateEdgesOnSelect,
        zIndexMode: K.zIndexMode
      }),
      ...R || Ys
    };
  }, [m.source, m.target, m.sourceHandle, m.targetHandle, m.selected, m.zIndex]), xe), U = me(() => m.markerStart ? `url('#${ti(m.markerStart, g)}')` : void 0, [m.markerStart, g]), Z = me(() => m.markerEnd ? `url('#${ti(m.markerEnd, g)}')` : void 0, [m.markerEnd, g]);
  if (m.hidden || D === null || T === null || $ === null || V === null)
    return null;
  const ee = (K) => {
    const { addSelectedEdges: Q, unselectNodesAndEdges: ae, multiSelectionActive: R } = j.getState();
    P && (j.setState({ nodesSelectionActive: !1 }), m.selected && R ? (ae({ nodes: [], edges: [m] }), W.current?.blur()) : Q([e])), r && r(K, m);
  }, se = i ? (K) => {
    i(K, { ...m });
  } : void 0, J = s ? (K) => {
    s(K, { ...m });
  } : void 0, L = c ? (K) => {
    c(K, { ...m });
  } : void 0, q = u ? (K) => {
    u(K, { ...m });
  } : void 0, ie = l ? (K) => {
    l(K, { ...m });
  } : void 0, oe = (K) => {
    if (!N && Ga.includes(K.key) && P) {
      const { unselectNodesAndEdges: Q, addSelectedEdges: ae } = j.getState();
      K.key === "Escape" ? (W.current?.blur(), Q({ edges: [m] })) : ae([e]);
    }
  };
  return a.jsx("svg", { style: { zIndex: I }, children: a.jsxs("g", { className: Ce([
    "react-flow__edge",
    `react-flow__edge-${E}`,
    m.className,
    w,
    {
      selected: m.selected,
      animated: m.animated,
      inactive: !P && !r,
      updating: A,
      selectable: P
    }
  ]), onClick: ee, onDoubleClick: se, onContextMenu: J, onMouseEnter: L, onMouseMove: q, onMouseLeave: ie, onKeyDown: k ? oe : void 0, tabIndex: k ? 0 : void 0, role: m.ariaRole ?? (k ? "group" : "img"), "aria-roledescription": "edge", "data-id": e, "data-testid": `rf__edge-${e}`, "aria-label": m.ariaLabel === null ? void 0 : m.ariaLabel || `Edge from ${m.source} to ${m.target}`, "aria-describedby": k ? `${Ac}-${g}` : void 0, ref: W, ...m.domAttributes, children: [!H && a.jsx(C, { id: e, source: m.source, target: m.target, type: m.type, selected: m.selected, animated: m.animated, selectable: P, deletable: m.deletable ?? !0, label: m.label, labelStyle: m.labelStyle, labelShowBg: m.labelShowBg, labelBgStyle: m.labelBgStyle, labelBgPadding: m.labelBgPadding, labelBgBorderRadius: m.labelBgBorderRadius, sourceX: D, sourceY: T, targetX: $, targetY: V, sourcePosition: F, targetPosition: B, data: m.data, style: m.style, sourceHandleId: m.sourceHandle, targetHandleId: m.targetHandle, markerStart: U, markerEnd: Z, pathOptions: "pathOptions" in m ? m.pathOptions : void 0, interactionWidth: m.interactionWidth }), _ && a.jsx(am, { edge: m, isReconnectable: _, reconnectRadius: f, onReconnect: d, onReconnectStart: h, onReconnectEnd: p, sourceX: D, sourceY: T, targetX: $, targetY: V, sourcePosition: F, targetPosition: B, setUpdateHover: z, setReconnecting: b })] }) });
}
var lm = Se(cm);
const um = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError
});
function rl({ defaultMarkerColor: e, onlyRenderVisibleElements: t, rfId: n, edgeTypes: o, noPanClassName: r, onReconnect: i, onEdgeContextMenu: s, onEdgeMouseEnter: c, onEdgeMouseMove: u, onEdgeMouseLeave: l, onEdgeClick: f, reconnectRadius: d, onEdgeDoubleClick: h, onReconnectStart: p, onReconnectEnd: g, disableKeyboardA11y: x }) {
  const { edgesFocusable: w, edgesReconnectable: y, elementsSelectable: N, onError: m } = ue(um, xe), v = Zg(t);
  return a.jsxs("div", { className: "react-flow__edges", children: [a.jsx(Qg, { defaultColor: e, rfId: n }), v.map((E) => a.jsx(lm, { id: E, edgesFocusable: w, edgesReconnectable: y, elementsSelectable: N, noPanClassName: r, onReconnect: i, onContextMenu: s, onMouseEnter: c, onMouseMove: u, onMouseLeave: l, onClick: f, reconnectRadius: d, onDoubleClick: h, onReconnectStart: p, onReconnectEnd: g, rfId: n, onError: m, edgeTypes: o, disableKeyboardA11y: x }, E))] });
}
rl.displayName = "EdgeRenderer";
const dm = Se(rl), fm = (e) => `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function hm({ children: e }) {
  const t = ue(fm);
  return a.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: t }, children: e });
}
function pm(e) {
  const t = _i(), n = ce(!1);
  re(() => {
    !n.current && t.viewportInitialized && e && (setTimeout(() => e(t), 1), n.current = !0);
  }, [e, t.viewportInitialized]);
}
const gm = (e) => e.panZoom?.syncViewport;
function mm(e) {
  const t = ue(gm), n = we();
  return re(() => {
    e && (t?.(e), n.setState({ transform: [e.x, e.y, e.zoom] }));
  }, [e, t]), null;
}
function ym(e) {
  return e.connection.inProgress ? { ...e.connection, to: Kt(e.connection.to, e.transform) } : { ...e.connection };
}
function xm(e) {
  return ym;
}
function wm(e) {
  const t = xm();
  return ue(t, xe);
}
const vm = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height
});
function bm({ containerStyle: e, style: t, type: n, component: o }) {
  const { nodesConnectable: r, width: i, height: s, isValid: c, inProgress: u } = ue(vm, xe);
  return !(i && r && u) ? null : a.jsx("svg", { style: e, width: i, height: s, className: "react-flow__connectionline react-flow__container", children: a.jsx("g", { className: Ce(["react-flow__connection", ec(c)]), children: a.jsx(il, { style: t, type: n, CustomComponent: o, isValid: c }) }) });
}
const il = ({ style: e, type: t = dt.Bezier, CustomComponent: n, isValid: o }) => {
  const { inProgress: r, from: i, fromNode: s, fromHandle: c, fromPosition: u, to: l, toNode: f, toHandle: d, toPosition: h, pointer: p } = wm();
  if (!r)
    return;
  if (n)
    return a.jsx(n, { connectionLineType: t, connectionLineStyle: e, fromNode: s, fromHandle: c, fromX: i.x, fromY: i.y, toX: l.x, toY: l.y, fromPosition: u, toPosition: h, connectionStatus: ec(o), toNode: f, toHandle: d, pointer: p });
  let g = "";
  const x = {
    sourceX: i.x,
    sourceY: i.y,
    sourcePosition: u,
    targetX: l.x,
    targetY: l.y,
    targetPosition: h
  };
  switch (t) {
    case dt.Bezier:
      [g] = fc(x);
      break;
    case dt.SimpleBezier:
      [g] = Yc(x);
      break;
    case dt.Step:
      [g] = Lo({
        ...x,
        borderRadius: 0
      });
      break;
    case dt.SmoothStep:
      [g] = Lo(x);
      break;
    default:
      [g] = gc(x);
  }
  return a.jsx("path", { d: g, fill: "none", className: "react-flow__connection-path", style: e });
};
il.displayName = "ConnectionLine";
const Sm = {};
function Ks(e = Sm) {
  ce(e), we(), re(() => {
  }, [e]);
}
function Nm() {
  we(), ce(!1), re(() => {
  }, []);
}
function sl({ nodeTypes: e, edgeTypes: t, onInit: n, onNodeClick: o, onEdgeClick: r, onNodeDoubleClick: i, onEdgeDoubleClick: s, onNodeMouseEnter: c, onNodeMouseMove: u, onNodeMouseLeave: l, onNodeContextMenu: f, onSelectionContextMenu: d, onSelectionStart: h, onSelectionEnd: p, connectionLineType: g, connectionLineStyle: x, connectionLineComponent: w, connectionLineContainerStyle: y, selectionKeyCode: N, selectionOnDrag: m, selectionMode: v, multiSelectionKeyCode: E, panActivationKeyCode: C, zoomActivationKeyCode: k, deleteKeyCode: _, onlyRenderVisibleElements: P, elementsSelectable: W, defaultViewport: A, translateExtent: z, minZoom: H, maxZoom: b, preventScrolling: j, defaultMarkerColor: I, zoomOnScroll: D, zoomOnPinch: T, panOnScroll: $, panOnScrollSpeed: V, panOnScrollMode: F, zoomOnDoubleClick: B, panOnDrag: U, autoPanOnSelection: Z, onPaneClick: ee, onPaneMouseEnter: se, onPaneMouseMove: J, onPaneMouseLeave: L, onPaneScroll: q, onPaneContextMenu: ie, paneClickDistance: oe, nodeClickDistance: K, onEdgeContextMenu: Q, onEdgeMouseEnter: ae, onEdgeMouseMove: R, onEdgeMouseLeave: G, reconnectRadius: de, onReconnect: ye, onReconnectStart: pe, onReconnectEnd: _e, noDragClassName: Oe, noWheelClassName: pt, noPanClassName: Qe, disableKeyboardA11y: et, nodeExtent: ve, rfId: De, viewport: Te, onViewportChange: Be }) {
  return Ks(e), Ks(t), Nm(), pm(n), mm(Te), a.jsx(Lg, { onPaneClick: ee, onPaneMouseEnter: se, onPaneMouseMove: J, onPaneMouseLeave: L, onPaneContextMenu: ie, onPaneScroll: q, paneClickDistance: oe, deleteKeyCode: _, selectionKeyCode: N, selectionOnDrag: m, selectionMode: v, onSelectionStart: h, onSelectionEnd: p, multiSelectionKeyCode: E, panActivationKeyCode: C, zoomActivationKeyCode: k, elementsSelectable: W, zoomOnScroll: D, zoomOnPinch: T, zoomOnDoubleClick: B, panOnScroll: $, panOnScrollSpeed: V, panOnScrollMode: F, panOnDrag: U, autoPanOnSelection: Z, defaultViewport: A, translateExtent: z, minZoom: H, maxZoom: b, onSelectionContextMenu: d, preventScrolling: j, noDragClassName: Oe, noWheelClassName: pt, noPanClassName: Qe, disableKeyboardA11y: et, onViewportChange: Be, isControlledViewport: !!Te, children: a.jsxs(hm, { children: [a.jsx(dm, { edgeTypes: t, onEdgeClick: r, onEdgeDoubleClick: s, onReconnect: ye, onReconnectStart: pe, onReconnectEnd: _e, onlyRenderVisibleElements: P, onEdgeContextMenu: Q, onEdgeMouseEnter: ae, onEdgeMouseMove: R, onEdgeMouseLeave: G, reconnectRadius: de, defaultMarkerColor: I, noPanClassName: Qe, disableKeyboardA11y: et, rfId: De }), a.jsx(bm, { style: x, type: g, component: w, containerStyle: y }), a.jsx("div", { className: "react-flow__edgelabel-renderer" }), a.jsx(qg, { nodeTypes: e, onNodeClick: o, onNodeDoubleClick: i, onNodeMouseEnter: c, onNodeMouseMove: u, onNodeMouseLeave: l, onNodeContextMenu: f, nodeClickDistance: K, onlyRenderVisibleElements: P, noPanClassName: Qe, noDragClassName: Oe, disableKeyboardA11y: et, nodeExtent: ve, rfId: De }), a.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
sl.displayName = "GraphView";
const Em = Se(sl), Cm = ic(), Us = ({ nodes: e, edges: t, defaultNodes: n, defaultEdges: o, width: r, height: i, fitView: s, fitViewOptions: c, minZoom: u = 0.5, maxZoom: l = 2, nodeOrigin: f, nodeExtent: d, zIndexMode: h = "basic" } = {}) => {
  const p = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), y = o ?? t ?? [], N = n ?? e ?? [], m = f ?? [0, 0], v = d ?? Mn;
  xc(x, w, y);
  const { nodesInitialized: E } = ni(N, p, g, {
    nodeOrigin: m,
    nodeExtent: v,
    zIndexMode: h
  });
  let C = [0, 0, 1];
  if (s && r && i) {
    const k = On(p, {
      filter: (A) => !!((A.width || A.initialWidth) && (A.height || A.initialHeight))
    }), { x: _, y: P, zoom: W } = Si(k, r, i, u, l, c?.padding ?? 0.1);
    C = [_, P, W];
  }
  return {
    rfId: "1",
    width: r ?? 0,
    height: i ?? 0,
    transform: C,
    nodes: N,
    nodesInitialized: E,
    nodeLookup: p,
    parentLookup: g,
    edges: y,
    edgeLookup: w,
    connectionLookup: x,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: n !== void 0,
    hasDefaultEdges: o !== void 0,
    panZoom: null,
    minZoom: u,
    maxZoom: l,
    translateExtent: Mn,
    nodeExtent: v,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: Bt.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: m,
    nodeDragThreshold: 1,
    connectionDragThreshold: 1,
    snapGrid: [15, 15],
    snapToGrid: !1,
    nodesDraggable: !0,
    nodesConnectable: !0,
    nodesFocusable: !0,
    edgesFocusable: !0,
    edgesReconnectable: !0,
    elementsSelectable: !0,
    elevateNodesOnSelect: !0,
    elevateEdgesOnSelect: !0,
    selectNodesOnDrag: !0,
    multiSelectionActive: !1,
    fitViewQueued: s ?? !1,
    fitViewOptions: c,
    fitViewResolver: null,
    connection: { ...Qa },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: Cm,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: Ja,
    zIndexMode: h,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, km = ({ nodes: e, edges: t, defaultNodes: n, defaultEdges: o, width: r, height: i, fitView: s, fitViewOptions: c, minZoom: u, maxZoom: l, nodeOrigin: f, nodeExtent: d, zIndexMode: h }) => Vp((p, g) => {
  async function x() {
    const { nodeLookup: w, panZoom: y, fitViewOptions: N, fitViewResolver: m, width: v, height: E, minZoom: C, maxZoom: k } = g();
    y && (await Th({
      nodes: w,
      width: v,
      height: E,
      panZoom: y,
      minZoom: C,
      maxZoom: k
    }, N), m?.resolve(!0), p({ fitViewResolver: null }));
  }
  return {
    ...Us({
      nodes: e,
      edges: t,
      width: r,
      height: i,
      fitView: s,
      fitViewOptions: c,
      minZoom: u,
      maxZoom: l,
      nodeOrigin: f,
      nodeExtent: d,
      defaultNodes: n,
      defaultEdges: o,
      zIndexMode: h
    }),
    setNodes: (w) => {
      const { nodeLookup: y, parentLookup: N, nodeOrigin: m, elevateNodesOnSelect: v, fitViewQueued: E, zIndexMode: C, nodesSelectionActive: k } = g(), { nodesInitialized: _, hasSelectedNodes: P } = ni(w, y, N, {
        nodeOrigin: m,
        nodeExtent: d,
        elevateNodesOnSelect: v,
        checkEquality: !0,
        zIndexMode: C
      }), W = k && P;
      E && _ ? (x(), p({
        nodes: w,
        nodesInitialized: _,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: W
      })) : p({ nodes: w, nodesInitialized: _, nodesSelectionActive: W });
    },
    setEdges: (w) => {
      const { connectionLookup: y, edgeLookup: N } = g();
      xc(y, N, w), p({ edges: w });
    },
    setDefaultNodesAndEdges: (w, y) => {
      if (w) {
        const { setNodes: N } = g();
        N(w), p({ hasDefaultNodes: !0 });
      }
      if (y) {
        const { setEdges: N } = g();
        N(y), p({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (w) => {
      const { triggerNodeChanges: y, nodeLookup: N, parentLookup: m, domNode: v, nodeOrigin: E, nodeExtent: C, debug: k, fitViewQueued: _, zIndexMode: P } = g(), { changes: W, updatedInternals: A } = rp(w, N, m, v, E, C, P);
      A && (ep(N, m, { nodeOrigin: E, nodeExtent: C, zIndexMode: P }), _ ? (x(), p({ fitViewQueued: !1, fitViewOptions: void 0 })) : p({}), W?.length > 0 && (k && console.log("React Flow: trigger node changes", W), y?.(W)));
    },
    updateNodePositions: (w, y = !1) => {
      const N = [];
      let m = [];
      const { nodeLookup: v, triggerNodeChanges: E, connection: C, updateConnection: k, onNodesChangeMiddlewareMap: _ } = g();
      for (const [P, W] of w) {
        const A = v.get(P), z = !!(A?.expandParent && A?.parentId && W?.position), H = {
          id: P,
          type: "position",
          position: z ? {
            x: Math.max(0, W.position.x),
            y: Math.max(0, W.position.y)
          } : W.position,
          dragging: y
        };
        if (A && C.inProgress && C.fromNode.id === A.id) {
          const b = _t(A, C.fromHandle, te.Left, !0);
          k({ ...C, from: b });
        }
        z && A.parentId && N.push({
          id: P,
          parentId: A.parentId,
          rect: {
            ...W.internals.positionAbsolute,
            width: W.measured.width ?? 0,
            height: W.measured.height ?? 0
          }
        }), m.push(H);
      }
      if (N.length > 0) {
        const { parentLookup: P, nodeOrigin: W } = g(), A = ji(N, v, P, W);
        m.push(...A);
      }
      for (const P of _.values())
        m = P(m);
      E(m);
    },
    triggerNodeChanges: (w) => {
      const { onNodesChange: y, setNodes: N, nodes: m, hasDefaultNodes: v, debug: E } = g();
      if (w?.length) {
        if (v) {
          const C = Pc(w, m);
          N(C);
        }
        E && console.log("React Flow: trigger node changes", w), y?.(w);
      }
    },
    triggerEdgeChanges: (w) => {
      const { onEdgesChange: y, setEdges: N, edges: m, hasDefaultEdges: v, debug: E } = g();
      if (w?.length) {
        if (v) {
          const C = $c(w, m);
          N(C);
        }
        E && console.log("React Flow: trigger edge changes", w), y?.(w);
      }
    },
    addSelectedNodes: (w) => {
      const { multiSelectionActive: y, edgeLookup: N, nodeLookup: m, triggerNodeChanges: v, triggerEdgeChanges: E } = g();
      if (y) {
        const C = w.map((k) => bt(k, !0));
        v(C);
        return;
      }
      v(Rt(m, /* @__PURE__ */ new Set([...w]), !0)), E(Rt(N));
    },
    addSelectedEdges: (w) => {
      const { multiSelectionActive: y, edgeLookup: N, nodeLookup: m, triggerNodeChanges: v, triggerEdgeChanges: E } = g();
      if (y) {
        const C = w.map((k) => bt(k, !0));
        E(C);
        return;
      }
      E(Rt(N, /* @__PURE__ */ new Set([...w]))), v(Rt(m, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: w, edges: y } = {}) => {
      const { edges: N, nodes: m, nodeLookup: v, triggerNodeChanges: E, triggerEdgeChanges: C } = g(), k = w || m, _ = y || N, P = [];
      for (const A of k) {
        if (!A.selected)
          continue;
        const z = v.get(A.id);
        z && (z.selected = !1), P.push(bt(A.id, !1));
      }
      const W = [];
      for (const A of _)
        A.selected && W.push(bt(A.id, !1));
      E(P), C(W);
    },
    setMinZoom: (w) => {
      const { panZoom: y, maxZoom: N } = g();
      y?.setScaleExtent([w, N]), p({ minZoom: w });
    },
    setMaxZoom: (w) => {
      const { panZoom: y, minZoom: N } = g();
      y?.setScaleExtent([N, w]), p({ maxZoom: w });
    },
    setTranslateExtent: (w) => {
      g().panZoom?.setTranslateExtent(w), p({ translateExtent: w });
    },
    resetSelectedElements: () => {
      const { edges: w, nodes: y, triggerNodeChanges: N, triggerEdgeChanges: m, elementsSelectable: v } = g();
      if (!v)
        return;
      const E = y.reduce((k, _) => _.selected ? [...k, bt(_.id, !1)] : k, []), C = w.reduce((k, _) => _.selected ? [...k, bt(_.id, !1)] : k, []);
      N(E), m(C);
    },
    setNodeExtent: (w) => {
      const { nodes: y, nodeLookup: N, parentLookup: m, nodeOrigin: v, elevateNodesOnSelect: E, nodeExtent: C, zIndexMode: k } = g();
      w[0][0] === C[0][0] && w[0][1] === C[0][1] && w[1][0] === C[1][0] && w[1][1] === C[1][1] || (ni(y, N, m, {
        nodeOrigin: v,
        nodeExtent: w,
        elevateNodesOnSelect: E,
        checkEquality: !1,
        zIndexMode: k
      }), p({ nodeExtent: w }));
    },
    panBy: (w) => {
      const { transform: y, width: N, height: m, panZoom: v, translateExtent: E } = g();
      return ip({ delta: w, panZoom: v, transform: y, translateExtent: E, width: N, height: m });
    },
    setCenter: async (w, y, N) => {
      const { width: m, height: v, maxZoom: E, panZoom: C } = g();
      if (!C)
        return !1;
      const k = typeof N?.zoom < "u" ? N.zoom : E;
      return await C.setViewport({
        x: m / 2 - w * k,
        y: v / 2 - y * k,
        zoom: k
      }, { duration: N?.duration, ease: N?.ease, interpolate: N?.interpolate }), !0;
    },
    cancelConnection: () => {
      p({
        connection: { ...Qa }
      });
    },
    updateConnection: (w) => {
      p({ connection: w });
    },
    reset: () => p({ ...Us() })
  };
}, Object.is);
function Im({ initialNodes: e, initialEdges: t, defaultNodes: n, defaultEdges: o, initialWidth: r, initialHeight: i, initialMinZoom: s, initialMaxZoom: c, initialFitViewOptions: u, fitView: l, nodeOrigin: f, nodeExtent: d, zIndexMode: h, children: p }) {
  const [g] = Y(() => km({
    nodes: e,
    edges: t,
    defaultNodes: n,
    defaultEdges: o,
    width: r,
    height: i,
    fitView: l,
    minZoom: s,
    maxZoom: c,
    fitViewOptions: u,
    nodeOrigin: f,
    nodeExtent: d,
    zIndexMode: h
  }));
  return a.jsx(Fp, { value: g, children: a.jsx(hg, { children: p }) });
}
function jm({ children: e, nodes: t, edges: n, defaultNodes: o, defaultEdges: r, width: i, height: s, fitView: c, fitViewOptions: u, minZoom: l, maxZoom: f, nodeOrigin: d, nodeExtent: h, zIndexMode: p }) {
  return Rn(Qo) ? a.jsx(a.Fragment, { children: e }) : a.jsx(Im, { initialNodes: t, initialEdges: n, defaultNodes: o, defaultEdges: r, initialWidth: i, initialHeight: s, fitView: c, initialFitViewOptions: u, initialMinZoom: l, initialMaxZoom: f, nodeOrigin: d, nodeExtent: h, zIndexMode: p, children: e });
}
const _m = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function Am({ nodes: e, edges: t, defaultNodes: n, defaultEdges: o, className: r, nodeTypes: i, edgeTypes: s, onNodeClick: c, onEdgeClick: u, onInit: l, onMove: f, onMoveStart: d, onMoveEnd: h, onConnect: p, onConnectStart: g, onConnectEnd: x, onClickConnectStart: w, onClickConnectEnd: y, onNodeMouseEnter: N, onNodeMouseMove: m, onNodeMouseLeave: v, onNodeContextMenu: E, onNodeDoubleClick: C, onNodeDragStart: k, onNodeDrag: _, onNodeDragStop: P, onNodesDelete: W, onEdgesDelete: A, onDelete: z, onSelectionChange: H, onSelectionDragStart: b, onSelectionDrag: j, onSelectionDragStop: I, onSelectionContextMenu: D, onSelectionStart: T, onSelectionEnd: $, onBeforeDelete: V, connectionMode: F, connectionLineType: B = dt.Bezier, connectionLineStyle: U, connectionLineComponent: Z, connectionLineContainerStyle: ee, deleteKeyCode: se = "Backspace", selectionKeyCode: J = "Shift", selectionOnDrag: L = !1, selectionMode: q = Dn.Full, panActivationKeyCode: ie = "Space", multiSelectionKeyCode: oe = $n() ? "Meta" : "Control", zoomActivationKeyCode: K = $n() ? "Meta" : "Control", snapToGrid: Q, snapGrid: ae, onlyRenderVisibleElements: R = !1, selectNodesOnDrag: G, nodesDraggable: de, autoPanOnNodeFocus: ye, nodesConnectable: pe, nodesFocusable: _e, nodeOrigin: Oe = Mc, edgesFocusable: pt, edgesReconnectable: Qe, elementsSelectable: et = !0, defaultViewport: ve = ng, minZoom: De = 0.5, maxZoom: Te = 2, translateExtent: Be = Mn, preventScrolling: qn = !0, nodeExtent: at, defaultMarkerColor: gt = "#b1b1b7", zoomOnScroll: mt = !0, zoomOnPinch: yt = !0, panOnScroll: Zn = !1, panOnScrollSpeed: ze = 0.5, panOnScrollMode: Kn = Et.Free, zoomOnDoubleClick: be = !0, panOnDrag: Fe = !0, onPaneClick: Ut, onPaneMouseEnter: ke, onPaneMouseMove: Gt, onPaneMouseLeave: Jt, onPaneScroll: je, onPaneContextMenu: xt, paneClickDistance: ct = 1, nodeClickDistance: ir = 0, children: Un, onReconnect: Gn, onReconnectStart: Qt, onReconnectEnd: sr, onEdgeContextMenu: en, onEdgeDoubleClick: Dt, onEdgeMouseEnter: Re, onEdgeMouseMove: tn, onEdgeMouseLeave: nn, reconnectRadius: on = 10, onNodesChange: Pt, onEdgesChange: ar, noDragClassName: cr = "nodrag", noWheelClassName: lr = "nowheel", noPanClassName: Jn = "nopan", fitView: rn, fitViewOptions: sn, connectOnClick: Qn, attributionPosition: ur, proOptions: an, defaultEdgeOptions: dr, elevateNodesOnSelect: fr = !0, elevateEdgesOnSelect: hr = !1, disableKeyboardA11y: eo = !1, autoPanOnConnect: pr, autoPanOnNodeDrag: cn, autoPanOnSelection: gr = !0, autoPanSpeed: mr, connectionRadius: yr, isValidConnection: xr, onError: wr, style: vr, id: to, nodeDragThreshold: no, connectionDragThreshold: oo, viewport: br, onViewportChange: Sr, width: Nr, height: Er, colorMode: Cr = "light", debug: ro, onScroll: ln, ariaLabelConfig: io, zIndexMode: un = "basic", ...so }, kr) {
  const dn = to || "1", ao = sg(Cr), co = ge((fn) => {
    fn.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), ln?.(fn);
  }, [ln]);
  return a.jsx("div", { "data-testid": "rf__wrapper", ...so, onScroll: co, style: { ...vr, ..._m }, ref: kr, className: Ce(["react-flow", r, ao]), id: to, role: "application", children: a.jsxs(jm, { nodes: e, edges: t, width: Nr, height: Er, fitView: rn, fitViewOptions: sn, minZoom: De, maxZoom: Te, nodeOrigin: Oe, nodeExtent: at, zIndexMode: un, children: [a.jsx(ig, { nodes: e, edges: t, defaultNodes: n, defaultEdges: o, onConnect: p, onConnectStart: g, onConnectEnd: x, onClickConnectStart: w, onClickConnectEnd: y, nodesDraggable: de, autoPanOnNodeFocus: ye, nodesConnectable: pe, nodesFocusable: _e, edgesFocusable: pt, edgesReconnectable: Qe, elementsSelectable: et, elevateNodesOnSelect: fr, elevateEdgesOnSelect: hr, minZoom: De, maxZoom: Te, nodeExtent: at, onNodesChange: Pt, onEdgesChange: ar, snapToGrid: Q, snapGrid: ae, connectionMode: F, translateExtent: Be, connectOnClick: Qn, defaultEdgeOptions: dr, fitView: rn, fitViewOptions: sn, onNodesDelete: W, onEdgesDelete: A, onDelete: z, onNodeDragStart: k, onNodeDrag: _, onNodeDragStop: P, onSelectionDrag: j, onSelectionDragStart: b, onSelectionDragStop: I, onMove: f, onMoveStart: d, onMoveEnd: h, noPanClassName: Jn, nodeOrigin: Oe, rfId: dn, autoPanOnConnect: pr, autoPanOnNodeDrag: cn, autoPanSpeed: mr, onError: wr, connectionRadius: yr, isValidConnection: xr, selectNodesOnDrag: G, nodeDragThreshold: no, connectionDragThreshold: oo, onBeforeDelete: V, debug: ro, ariaLabelConfig: io, zIndexMode: un }), a.jsx(Em, { onInit: l, onNodeClick: c, onEdgeClick: u, onNodeMouseEnter: N, onNodeMouseMove: m, onNodeMouseLeave: v, onNodeContextMenu: E, onNodeDoubleClick: C, nodeTypes: i, edgeTypes: s, connectionLineType: B, connectionLineStyle: U, connectionLineComponent: Z, connectionLineContainerStyle: ee, selectionKeyCode: J, selectionOnDrag: L, selectionMode: q, deleteKeyCode: se, multiSelectionKeyCode: oe, panActivationKeyCode: ie, zoomActivationKeyCode: K, onlyRenderVisibleElements: R, defaultViewport: ve, translateExtent: Be, minZoom: De, maxZoom: Te, preventScrolling: qn, zoomOnScroll: mt, zoomOnPinch: yt, zoomOnDoubleClick: be, panOnScroll: Zn, panOnScrollSpeed: ze, panOnScrollMode: Kn, panOnDrag: Fe, autoPanOnSelection: gr, onPaneClick: Ut, onPaneMouseEnter: ke, onPaneMouseMove: Gt, onPaneMouseLeave: Jt, onPaneScroll: je, onPaneContextMenu: xt, paneClickDistance: ct, nodeClickDistance: ir, onSelectionContextMenu: D, onSelectionStart: T, onSelectionEnd: $, onReconnect: Gn, onReconnectStart: Qt, onReconnectEnd: sr, onEdgeContextMenu: en, onEdgeDoubleClick: Dt, onEdgeMouseEnter: Re, onEdgeMouseMove: tn, onEdgeMouseLeave: nn, reconnectRadius: on, defaultMarkerColor: gt, noDragClassName: cr, noWheelClassName: lr, noPanClassName: Jn, rfId: dn, disableKeyboardA11y: eo, nodeExtent: at, viewport: br, onViewportChange: Sr }), a.jsx(tg, { onSelectionChange: H }), Un, a.jsx(Up, { proOptions: an, position: ur }), a.jsx(Kp, { rfId: dn, disableKeyboardA11y: eo })] }) });
}
var al = Rc(Am);
const Mm = (e) => e.domNode?.querySelector(".react-flow__edgelabel-renderer");
function Dm({ children: e }) {
  const t = ue(Mm);
  return t ? Bp.createPortal(e, t) : null;
}
function Pm({ dimensions: e, lineWidth: t, variant: n, className: o }) {
  return a.jsx("path", { strokeWidth: t, d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`, className: Ce(["react-flow__background-pattern", n, o]) });
}
function $m({ radius: e, className: t }) {
  return a.jsx("circle", { cx: e, cy: e, r: e, className: Ce(["react-flow__background-pattern", "dots", t]) });
}
var ft;
(function(e) {
  e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(ft || (ft = {}));
const Tm = {
  [ft.Dots]: 1,
  [ft.Lines]: 1,
  [ft.Cross]: 6
}, zm = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function cl({
  id: e,
  variant: t = ft.Dots,
  // only used for dots and cross
  gap: n = 20,
  // only used for lines and cross
  size: o,
  lineWidth: r = 1,
  offset: i = 0,
  color: s,
  bgColor: c,
  style: u,
  className: l,
  patternClassName: f
}) {
  const d = ce(null), { transform: h, patternId: p } = ue(zm, xe), g = o || Tm[t], x = t === ft.Dots, w = t === ft.Cross, y = Array.isArray(n) ? n : [n, n], N = [y[0] * h[2] || 1, y[1] * h[2] || 1], m = g * h[2], v = Array.isArray(i) ? i : [i, i], E = w ? [m, m] : N, C = [
    v[0] * h[2] || 1 + E[0] / 2,
    v[1] * h[2] || 1 + E[1] / 2
  ], k = `${p}${e || ""}`;
  return a.jsxs("svg", { className: Ce(["react-flow__background", l]), style: {
    ...u,
    ...tr,
    "--xy-background-color-props": c,
    "--xy-background-pattern-color-props": s
  }, ref: d, "data-testid": "rf__background", children: [a.jsx("pattern", { id: k, x: h[0] % N[0], y: h[1] % N[1], width: N[0], height: N[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${C[0]},-${C[1]})`, children: x ? a.jsx($m, { radius: m / 2, className: f }) : a.jsx(Pm, { dimensions: E, lineWidth: r, variant: t, className: f }) }), a.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${k})` })] });
}
cl.displayName = "Background";
const ll = Se(cl);
function Rm() {
  return a.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: a.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function Lm() {
  return a.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: a.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function Vm() {
  return a.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: a.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function Hm() {
  return a.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: a.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function Om() {
  return a.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: a.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function xo({ children: e, className: t, ...n }) {
  return a.jsx("button", { type: "button", className: Ce(["react-flow__controls-button", t]), ...n, children: e });
}
const Bm = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig
});
function ul({ style: e, showZoom: t = !0, showFitView: n = !0, showInteractive: o = !0, fitViewOptions: r, onZoomIn: i, onZoomOut: s, onFitView: c, onInteractiveChange: u, className: l, children: f, position: d = "bottom-left", orientation: h = "vertical", "aria-label": p }) {
  const g = we(), { isInteractive: x, minZoomReached: w, maxZoomReached: y, ariaLabelConfig: N } = ue(Bm, xe), { zoomIn: m, zoomOut: v, fitView: E } = _i(), C = () => {
    m(), i?.();
  }, k = () => {
    v(), s?.();
  }, _ = () => {
    E(r), c?.();
  }, P = () => {
    g.setState({
      nodesDraggable: !x,
      nodesConnectable: !x,
      elementsSelectable: !x
    }), u?.(!x);
  }, W = h === "horizontal" ? "horizontal" : "vertical";
  return a.jsxs(er, { className: Ce(["react-flow__controls", W, l]), position: d, style: e, "data-testid": "rf__controls", "aria-label": p ?? N["controls.ariaLabel"], children: [t && a.jsxs(a.Fragment, { children: [a.jsx(xo, { onClick: C, className: "react-flow__controls-zoomin", title: N["controls.zoomIn.ariaLabel"], "aria-label": N["controls.zoomIn.ariaLabel"], disabled: y, children: a.jsx(Rm, {}) }), a.jsx(xo, { onClick: k, className: "react-flow__controls-zoomout", title: N["controls.zoomOut.ariaLabel"], "aria-label": N["controls.zoomOut.ariaLabel"], disabled: w, children: a.jsx(Lm, {}) })] }), n && a.jsx(xo, { className: "react-flow__controls-fitview", onClick: _, title: N["controls.fitView.ariaLabel"], "aria-label": N["controls.fitView.ariaLabel"], children: a.jsx(Vm, {}) }), o && a.jsx(xo, { className: "react-flow__controls-interactive", onClick: P, title: N["controls.interactive.ariaLabel"], "aria-label": N["controls.interactive.ariaLabel"], children: x ? a.jsx(Om, {}) : a.jsx(Hm, {}) }), f] });
}
ul.displayName = "Controls";
const dl = Se(ul);
function Fm({ id: e, x: t, y: n, width: o, height: r, style: i, color: s, strokeColor: c, strokeWidth: u, className: l, borderRadius: f, shapeRendering: d, selected: h, onClick: p }) {
  const { background: g, backgroundColor: x } = i || {}, w = s || g || x;
  return a.jsx("rect", { className: Ce(["react-flow__minimap-node", { selected: h }, l]), x: t, y: n, rx: f, ry: f, width: o, height: r, style: {
    fill: w,
    stroke: c,
    strokeWidth: u
  }, shapeRendering: d, onClick: p ? (y) => p(y, e) : void 0 });
}
const Wm = Se(Fm), Xm = (e) => e.nodes.map((t) => t.id), Fr = (e) => e instanceof Function ? e : () => e;
function Ym({
  nodeStrokeColor: e,
  nodeColor: t,
  nodeClassName: n = "",
  nodeBorderRadius: o = 5,
  nodeStrokeWidth: r,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: i = Wm,
  onClick: s
}) {
  const c = ue(Xm, xe), u = Fr(t), l = Fr(e), f = Fr(n), d = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return a.jsx(a.Fragment, { children: c.map((h) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    a.jsx(Zm, { id: h, nodeColorFunc: u, nodeStrokeColorFunc: l, nodeClassNameFunc: f, nodeBorderRadius: o, nodeStrokeWidth: r, NodeComponent: i, onClick: s, shapeRendering: d }, h)
  )) });
}
function qm({ id: e, nodeColorFunc: t, nodeStrokeColorFunc: n, nodeClassNameFunc: o, nodeBorderRadius: r, nodeStrokeWidth: i, shapeRendering: s, NodeComponent: c, onClick: u }) {
  const { node: l, x: f, y: d, width: h, height: p } = ue((g) => {
    const x = g.nodeLookup.get(e);
    if (!x)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const w = x.internals.userNode, { x: y, y: N } = x.internals.positionAbsolute, { width: m, height: v } = st(w);
    return {
      node: w,
      x: y,
      y: N,
      width: m,
      height: v
    };
  }, xe);
  return !l || l.hidden || !sc(l) ? null : a.jsx(c, { x: f, y: d, width: h, height: p, style: l.style, selected: !!l.selected, className: o(l), color: t(l), borderRadius: r, strokeColor: n(l), strokeWidth: i, shapeRendering: s, onClick: u, id: l.id });
}
const Zm = Se(qm);
var Km = Se(Ym);
const Um = 200, Gm = 150, Jm = (e) => !e.hidden, Qm = (e) => {
  const t = {
    x: -e.transform[0] / e.transform[2],
    y: -e.transform[1] / e.transform[2],
    width: e.width / e.transform[2],
    height: e.height / e.transform[2]
  };
  return {
    viewBB: t,
    boundingRect: e.nodeLookup.size > 0 ? rc(On(e.nodeLookup, { filter: Jm }), t) : t,
    rfId: e.rfId,
    panZoom: e.panZoom,
    translateExtent: e.translateExtent,
    flowWidth: e.width,
    flowHeight: e.height,
    ariaLabelConfig: e.ariaLabelConfig
  };
}, ey = "react-flow__minimap-desc";
function fl({
  style: e,
  className: t,
  nodeStrokeColor: n,
  nodeColor: o,
  nodeClassName: r = "",
  nodeBorderRadius: i = 5,
  nodeStrokeWidth: s,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: c,
  bgColor: u,
  maskColor: l,
  maskStrokeColor: f,
  maskStrokeWidth: d,
  position: h = "bottom-right",
  onClick: p,
  onNodeClick: g,
  pannable: x = !1,
  zoomable: w = !1,
  ariaLabel: y,
  inversePan: N,
  zoomStep: m = 1,
  offsetScale: v = 5
}) {
  const E = we(), C = ce(null), { boundingRect: k, viewBB: _, rfId: P, panZoom: W, translateExtent: A, flowWidth: z, flowHeight: H, ariaLabelConfig: b } = ue(Qm, xe), j = e?.width ?? Um, I = e?.height ?? Gm, D = k.width / j, T = k.height / I, $ = Math.max(D, T), V = $ * j, F = $ * I, B = v * $, U = k.x - (V - k.width) / 2 - B, Z = k.y - (F - k.height) / 2 - B, ee = V + B * 2, se = F + B * 2, J = `${ey}-${P}`, L = ce(0), q = ce();
  L.current = $, re(() => {
    if (C.current && W)
      return q.current = pp({
        domNode: C.current,
        panZoom: W,
        getTransform: () => E.getState().transform,
        getViewScale: () => L.current
      }), () => {
        q.current?.destroy();
      };
  }, [W]), re(() => {
    q.current?.update({
      translateExtent: A,
      width: z,
      height: H,
      inversePan: N,
      pannable: x,
      zoomStep: m,
      zoomable: w
    });
  }, [x, w, N, m, A, z, H]);
  const ie = p ? (Q) => {
    const [ae, R] = q.current?.pointer(Q) || [0, 0];
    p(Q, { x: ae, y: R });
  } : void 0, oe = g ? ge((Q, ae) => {
    const R = E.getState().nodeLookup.get(ae).internals.userNode;
    g(Q, R);
  }, []) : void 0, K = y ?? b["minimap.ariaLabel"];
  return a.jsx(er, { position: h, style: {
    ...e,
    "--xy-minimap-background-color-props": typeof u == "string" ? u : void 0,
    "--xy-minimap-mask-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof f == "string" ? f : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof d == "number" ? d * $ : void 0,
    "--xy-minimap-node-background-color-props": typeof o == "string" ? o : void 0,
    "--xy-minimap-node-stroke-color-props": typeof n == "string" ? n : void 0,
    "--xy-minimap-node-stroke-width-props": typeof s == "number" ? s : void 0
  }, className: Ce(["react-flow__minimap", t]), "data-testid": "rf__minimap", children: a.jsxs("svg", { width: j, height: I, viewBox: `${U} ${Z} ${ee} ${se}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": J, ref: C, onClick: ie, children: [K && a.jsx("title", { id: J, children: K }), a.jsx(Km, { onClick: oe, nodeColor: o, nodeStrokeColor: n, nodeBorderRadius: i, nodeClassName: r, nodeStrokeWidth: s, nodeComponent: c }), a.jsx("path", { className: "react-flow__minimap-mask", d: `M${U - B},${Z - B}h${ee + B * 2}v${se + B * 2}h${-ee - B * 2}z
        M${_.x},${_.y}h${_.width}v${_.height}h${-_.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
fl.displayName = "MiniMap";
const hl = Se(fl), ty = (e) => (t) => e ? `${Math.max(1 / t.transform[2], 1)}` : void 0, ny = {
  [Yt.Line]: "right",
  [Yt.Handle]: "bottom-right"
};
function oy({ nodeId: e, position: t, variant: n = Yt.Handle, className: o, style: r = void 0, children: i, color: s, minWidth: c = 10, minHeight: u = 10, maxWidth: l = Number.MAX_VALUE, maxHeight: f = Number.MAX_VALUE, keepAspectRatio: d = !1, resizeDirection: h, autoScale: p = !0, shouldResize: g, onResizeStart: x, onResize: w, onResizeEnd: y }) {
  const N = Oc(), m = typeof e == "string" ? e : N, v = we(), E = ce(null), C = n === Yt.Handle, k = ue(ge(ty(C && p), [C, p]), xe), _ = ce(null), P = t ?? ny[n];
  re(() => {
    if (!(!E.current || !m))
      return _.current || (_.current = Ip({
        domNode: E.current,
        nodeId: m,
        getStoreItems: () => {
          const { nodeLookup: A, transform: z, snapGrid: H, snapToGrid: b, nodeOrigin: j, domNode: I } = v.getState();
          return {
            nodeLookup: A,
            transform: z,
            snapGrid: H,
            snapToGrid: b,
            nodeOrigin: j,
            paneDomNode: I
          };
        },
        onChange: (A, z) => {
          const { triggerNodeChanges: H, nodeLookup: b, parentLookup: j, nodeOrigin: I } = v.getState(), D = [], T = { x: A.x, y: A.y }, $ = b.get(m);
          if ($ && $.expandParent && $.parentId) {
            const V = $.origin ?? I, F = A.width ?? $.measured.width ?? 0, B = A.height ?? $.measured.height ?? 0, U = {
              id: $.id,
              parentId: $.parentId,
              rect: {
                width: F,
                height: B,
                ...ac({
                  x: A.x ?? $.position.x,
                  y: A.y ?? $.position.y
                }, { width: F, height: B }, $.parentId, b, V)
              }
            }, Z = ji([U], b, j, I);
            D.push(...Z), T.x = A.x ? Math.max(V[0] * F, A.x) : void 0, T.y = A.y ? Math.max(V[1] * B, A.y) : void 0;
          }
          if (T.x !== void 0 && T.y !== void 0) {
            const V = {
              id: m,
              type: "position",
              position: { ...T }
            };
            D.push(V);
          }
          if (A.width !== void 0 && A.height !== void 0) {
            const F = {
              id: m,
              type: "dimensions",
              resizing: !0,
              setAttributes: h ? h === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: A.width,
                height: A.height
              }
            };
            D.push(F);
          }
          for (const V of z) {
            const F = {
              ...V,
              type: "position"
            };
            D.push(F);
          }
          H(D);
        },
        onEnd: ({ width: A, height: z }) => {
          const H = {
            id: m,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: A,
              height: z
            }
          };
          v.getState().triggerNodeChanges([H]);
        }
      })), _.current.update({
        controlPosition: P,
        boundaries: {
          minWidth: c,
          minHeight: u,
          maxWidth: l,
          maxHeight: f
        },
        keepAspectRatio: d,
        resizeDirection: h,
        onResizeStart: x,
        onResize: w,
        onResizeEnd: y,
        shouldResize: g
      }), () => {
        _.current?.destroy();
      };
  }, [
    P,
    c,
    u,
    l,
    f,
    d,
    x,
    w,
    y,
    g
  ]);
  const W = P.split("-");
  return a.jsx("div", { className: Ce(["react-flow__resize-control", "nodrag", ...W, n, o]), ref: E, style: {
    ...r,
    scale: k,
    ...s && { [C ? "backgroundColor" : "borderColor"]: s }
  }, children: i });
}
Se(oy);
const ry = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), pl = (...e) => e.filter((t, n, o) => !!t && t.trim() !== "" && o.indexOf(t) === n).join(" ").trim();
var iy = {
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
const sy = Wo(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: o,
    className: r = "",
    children: i,
    iconNode: s,
    ...c
  }, u) => Xr(
    "svg",
    {
      ref: u,
      ...iy,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: o ? Number(n) * 24 / Number(t) : n,
      className: pl("lucide", r),
      ...c
    },
    [
      ...s.map(([l, f]) => Xr(l, f)),
      ...Array.isArray(i) ? i : [i]
    ]
  )
);
const Ne = (e, t) => {
  const n = Wo(
    ({ className: o, ...r }, i) => Xr(sy, {
      ref: i,
      iconNode: t,
      className: pl(`lucide-${ry(e)}`, o),
      ...r
    })
  );
  return n.displayName = `${e}`, n;
};
const gl = Ne("Boxes", [
  [
    "path",
    {
      d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
      key: "lc1i9w"
    }
  ],
  ["path", { d: "m7 16.5-4.74-2.85", key: "1o9zyk" }],
  ["path", { d: "m7 16.5 5-3", key: "va8pkn" }],
  ["path", { d: "M7 16.5v5.17", key: "jnp8gn" }],
  [
    "path",
    {
      d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
      key: "8zsnat"
    }
  ],
  ["path", { d: "m17 16.5-5-3", key: "8arw3v" }],
  ["path", { d: "m17 16.5 4.74-2.85", key: "8rfmw" }],
  ["path", { d: "M17 16.5v5.17", key: "k6z78m" }],
  [
    "path",
    {
      d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
      key: "1xygjf"
    }
  ],
  ["path", { d: "M12 8 7.26 5.15", key: "1vbdud" }],
  ["path", { d: "m12 8 4.74-2.85", key: "3rx089" }],
  ["path", { d: "M12 13.5V8", key: "1io7kd" }]
]);
const Wn = Ne("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
const ay = Ne("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
const Ho = Ne("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
const Tt = Ne("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
const it = Ne("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
const ml = Ne("GitBranch", [
  ["line", { x1: "6", x2: "6", y1: "3", y2: "15", key: "17qcm7" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M18 9a9 9 0 0 1-9 9", key: "n2h4wq" }]
]);
const cy = Ne("GripVertical", [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
]);
const yl = Ne("ListTree", [
  ["path", { d: "M21 12h-8", key: "1bmf0i" }],
  ["path", { d: "M21 6H8", key: "1pqkrb" }],
  ["path", { d: "M21 18h-8", key: "1tm79t" }],
  ["path", { d: "M3 6v4c0 1.1.9 2 2 2h3", key: "1ywdgy" }],
  ["path", { d: "M3 10v6c0 1.1.9 2 2 2h3", key: "2wc746" }]
]);
const Oo = Ne("Maximize2", [
  ["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }],
  ["polyline", { points: "9 21 3 21 3 15", key: "1avn1i" }],
  ["line", { x1: "21", x2: "14", y1: "3", y2: "10", key: "ota7mn" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]);
const Gs = Ne("Minimize2", [
  ["polyline", { points: "4 14 10 14 10 20", key: "11kfnr" }],
  ["polyline", { points: "20 10 14 10 14 4", key: "rlmsce" }],
  ["line", { x1: "14", x2: "21", y1: "10", y2: "3", key: "o5lafz" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]);
const Mi = Ne("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
const Di = Ne("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
const xl = Ne("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
const ly = Ne("Save", [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
]);
const uy = Ne("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
const At = Ne("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
]);
const dy = Ne("Terminal", [
  ["polyline", { points: "4 17 10 11 4 5", key: "akl6gq" }],
  ["line", { x1: "12", x2: "20", y1: "19", y2: "19", key: "q2wloq" }]
]);
const ii = Ne("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
const fy = Ne("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const hy = Ne("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]), $e = "/_elsa/workflow-management", py = "/_elsa/publishing";
async function gy(e, t) {
  const n = new URLSearchParams({
    state: t.state ?? "active",
    page: t.page.toString(),
    pageSize: t.pageSize.toString()
  }), o = t.search.trim();
  return o && n.set("search", o), e.http.getJson(`${$e}/definitions?${n.toString()}`);
}
async function my(e, t) {
  return e.http.getJson(`${$e}/definitions/${encodeURIComponent(t)}`);
}
async function yy(e, t) {
  return e.http.getJson(`${$e}/versions/${encodeURIComponent(t)}`);
}
async function xy(e, t) {
  return e.http.postJson(`${$e}/definitions`, t);
}
async function wy(e, t) {
  await e.http.deleteJson(`${$e}/definitions/${encodeURIComponent(t)}`);
}
async function vy(e, t) {
  await e.http.postJson(`${$e}/definitions/${encodeURIComponent(t)}/restore`, {});
}
async function by(e, t) {
  await e.http.deleteJson(`${$e}/definitions/${encodeURIComponent(t)}/permanent`);
}
async function Sy(e, t) {
  return e.http.putJson(`${$e}/drafts/${encodeURIComponent(t.id)}`, { state: t.state, layout: t.layout });
}
async function Ny(e, t) {
  return e.http.postJson(`${$e}/drafts/${encodeURIComponent(t)}/promote`, {});
}
async function Ey(e, t) {
  return e.http.postJson(`${$e}/versions/${encodeURIComponent(t)}/publish`, {});
}
async function Cy(e, t) {
  try {
    return await e.http.postJson(`${py}/workflows/drafts/test-runs`, t);
  } catch (n) {
    const o = Dy(n);
    if (o) return o;
    throw n;
  }
}
async function ky(e, t) {
  return e.http.postJson(`${$e}/executables/${encodeURIComponent(t)}/run`, {});
}
async function Iy(e) {
  return e.http.getJson("/_demo/workflows/executables");
}
async function jy(e, t = {}) {
  const n = new URLSearchParams();
  t.status && n.set("status", t.status), t.definitionId && n.set("definitionId", t.definitionId), t.correlationId && n.set("correlationId", t.correlationId), t.take && n.set("take", String(t.take));
  const o = n.toString();
  return e.http.getJson(`/runtime/workflows/instances${o ? `?${o}` : ""}`);
}
async function _y(e, t) {
  return e.http.getJson(`/runtime/workflows/instances/${encodeURIComponent(t)}`);
}
async function Pi(e) {
  return e.http.getJson(`${$e}/activities`);
}
async function Ay(e) {
  const t = await wl(e, [
    `${$e}/descriptors/activities`,
    "/descriptors/activities"
  ]);
  return Array.isArray(t) ? Js(t) : Js(t.items ?? t.activities ?? t.descriptors ?? []);
}
async function My(e) {
  const t = await wl(e, [
    `${$e}/descriptors/expression-descriptors`,
    "/descriptors/expression-descriptors"
  ]);
  if (Array.isArray(t)) return t;
  const n = t.items ?? t.descriptors ?? t.expressionDescriptors ?? [];
  return n.length > 0 ? n : ko;
}
async function wl(e, t) {
  let n;
  for (const o of t)
    try {
      return await e.http.getJson(o);
    } catch (r) {
      n = r;
    }
  throw n;
}
function Js(e) {
  return Array.isArray(e) ? e.filter((t) => {
    if (!t || typeof t != "object") return !1;
    const n = t;
    return typeof n.typeName == "string" && Array.isArray(n.inputs);
  }).map((t) => ({
    ...t,
    inputs: t.inputs ?? [],
    outputs: t.outputs ?? [],
    ports: t.ports ?? []
  })) : [];
}
function Dy(e) {
  const t = e && typeof e == "object" && "payload" in e ? e.payload : null, n = Qs(t);
  if (n) return n;
  if (!(e instanceof Error)) return null;
  try {
    return Qs(JSON.parse(e.message));
  } catch {
    return null;
  }
}
function Qs(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  return typeof t.testRunId == "string" && typeof t.status == "string" ? t : null;
}
const ko = [
  { type: "Literal", displayName: "Literal" },
  { type: "JavaScript", displayName: "JavaScript" },
  { type: "Liquid", displayName: "Liquid" },
  { type: "Object", displayName: "Object" },
  { type: "Variable", displayName: "Variable" },
  { type: "Input", displayName: "Input" }
], nr = "elsa.sequence.structure", Xn = "elsa.flowchart.structure";
function vl(e, t) {
  if (!e) return null;
  let n = e;
  for (const o of t) {
    const r = Ge(n).find((s) => s.id === o.slotId);
    if (!r) return null;
    const i = r.activities.find((s) => s.nodeId === o.ownerNodeId);
    if (!i) return null;
    n = i;
  }
  return n;
}
function kn(e, t) {
  const n = vl(e, t);
  if (!n) return null;
  let o = Ge(n)[0];
  return o ? { owner: n, slot: o } : null;
}
function Ge(e) {
  const t = e.structure;
  if (!t || !t.payload || typeof t.payload != "object") return [];
  const n = t.payload, o = Jy(t), r = Wr(n.activities);
  return r ? [{
    id: `${t.kind}:activities`,
    label: Qy(t),
    property: "activities",
    mode: o,
    activities: r
  }] : Object.entries(n).filter(([, i]) => Wr(i)).map(([i, s]) => ({
    id: `${t.kind}:${i}`,
    label: tx(i),
    property: i,
    mode: "generic",
    activities: Wr(s) ?? []
  }));
}
function bl(e, t, n) {
  const o = new Map(t.map((s) => [s.activityVersionId, s])), r = new Map(n.map((s) => [s.nodeId, s])), i = e.slot.activities.map((s, c) => {
    const u = o.get(s.activityVersionId), l = r.get(s.nodeId) ?? ex(e.slot.mode, c);
    return El(s, u, { x: l.x, y: l.y });
  });
  return {
    nodes: i,
    edges: e.slot.mode === "flowchart" ? Wy(e.owner) : Fy(e.slot, i)
  };
}
function si(e, t, n) {
  const o = t.find((i) => i.activityVersionId === e.activityVersionId), r = n.find((i) => i.nodeId === e.nodeId) ?? { x: 0, y: 0 };
  return {
    nodes: [El(e, o, { x: r.x, y: r.y }, {
      connectable: !1,
      deletable: !1,
      draggable: !1,
      suppressFlowPorts: !0
    })],
    edges: []
  };
}
function Py(e, t, n, o = null) {
  const r = new Map(t.map((c) => [c.activityExecutionId, c])), i = na(t, (c) => c.authoredActivityId || c.executableNodeId), s = na(n, (c) => c.executableNodeId ? c.executableNodeId : c.activityExecutionId ? r.get(c.activityExecutionId)?.authoredActivityId ?? "" : "");
  return e.map((c) => {
    const u = i.get(c.id) ?? [], l = s.get(c.id) ?? [];
    if (u.length === 0 && l.length === 0) return c;
    const f = Ky(u), d = o === c.id || u.some((p) => p.activityExecutionId === o) || l.some((p) => p.incidentId === o), h = {
      status: f?.status,
      subStatus: f?.subStatus,
      activityExecutionId: f?.activityExecutionId,
      faultCount: u.reduce((p, g) => p + g.faultCount + g.aggregateFaultCount, 0),
      incidentCount: l.length,
      hasBlockingIncident: l.some((p) => p.isBlocking),
      selected: d
    };
    return {
      ...c,
      selected: d,
      className: d ? "wf-runtime-node-selected" : c.className,
      data: {
        ...c.data,
        runtime: h
      }
    };
  });
}
function $i(e, t) {
  return e?.structure?.kind === Xn || Ly(t) ? "flowchart" : e?.structure?.kind === nr || Vy(t) ? "sequence" : "unsupported";
}
function ai(e, t, n) {
  if (t.length === 0) {
    const c = Ge(e)[0];
    return c ? zn(e, c, n) : e;
  }
  const [o, ...r] = t, i = Ge(e).find((c) => c.id === o.slotId);
  if (!i) return e;
  const s = i.activities.map((c) => c.nodeId === o.ownerNodeId ? ai(c, r, n) : c);
  return zn(e, i, s);
}
function Sl(e, t, n) {
  if (t.length === 0) return n;
  const [o, ...r] = t, i = Ge(e).find((c) => c.id === o.slotId);
  if (!i) return e;
  const s = i.activities.map((c) => c.nodeId === o.ownerNodeId ? Sl(c, r, n) : c);
  return zn(e, i, s);
}
function Nl(e, t, n) {
  if (e.nodeId === t) return n(e);
  const o = Ge(e);
  if (o.length === 0) return e;
  let r = !1, i = e;
  for (const s of o) {
    const c = s.activities.map((u) => {
      const l = Nl(u, t, n);
      return l !== u && (r = !0), l;
    });
    r && (i = zn(i, s, c));
  }
  return r ? i : e;
}
function zn(e, t, n) {
  return e.structure ? {
    ...e,
    structure: {
      ...e.structure,
      payload: {
        ...e.structure.payload,
        [t.property]: n
      }
    }
  } : e;
}
function $y(e, t, n, o = []) {
  const r = new Map(e.slot.activities.map((s) => [s.nodeId, s]));
  for (const s of o)
    r.set(s.nodeId, s);
  const i = t.map((s) => r.get(s.id)).filter((s) => !!s);
  return e.slot.mode === "sequence" && i.sort((s, c) => {
    const u = t.find((f) => f.id === s.nodeId), l = t.find((f) => f.id === c.nodeId);
    return (u?.position.x ?? 0) - (l?.position.x ?? 0);
  }), zn(e.owner, e.slot, i);
}
function Ty(e, t) {
  return {
    ...e,
    structure: By(e.structure, t)
  };
}
function zy(e, t) {
  const n = new Map(e.map((o) => [o.nodeId, o]));
  for (const o of t)
    n.set(o.id, {
      ...n.get(o.id) ?? { nodeId: o.id },
      nodeId: o.id,
      x: Math.round(o.position.x),
      y: Math.round(o.position.y)
    });
  return [...n.values()];
}
function ea(e, t) {
  return {
    nodeId: t,
    activityVersionId: e.activityVersionId,
    inputs: [],
    outputs: [],
    structure: Oy(e)
  };
}
function Ie(e) {
  const t = e.activityTypeKey.split(".").at(-1) || e.activityTypeKey, n = e.displayName?.trim();
  return !n || n === e.activityTypeKey || n.includes(".") ? Hy(t) : n;
}
function El(e, t, n, o = {}) {
  return {
    id: e.nodeId,
    type: "workflowActivity",
    position: n,
    connectable: o.connectable,
    deletable: o.deletable,
    draggable: o.draggable,
    data: {
      label: t ? Ie(t) : e.activityVersionId,
      activityVersionId: e.activityVersionId,
      activityTypeKey: t?.activityTypeKey,
      category: t?.category,
      executionType: t?.executionType,
      icon: ci(t),
      childSlots: Ge(e),
      acceptsInbound: Xy(e, t),
      sourcePorts: o.suppressFlowPorts ? [] : Cl(e, t),
      suppressFlowPorts: o.suppressFlowPorts
    }
  };
}
function ci(e) {
  if (!e) return "activity";
  const t = Ry(e.icon);
  if (t) return t;
  const n = e.activityTypeKey.toLowerCase(), o = Ie(e).toLowerCase(), r = e.category?.toLowerCase() ?? "", i = e.executionType?.toLowerCase() ?? "";
  return n.endsWith(".flowchart") || o === "flowchart" ? "flowchart" : n.endsWith(".sequence") || o === "sequence" ? "sequence" : n.includes("writeline") || o.includes("write line") ? "terminal" : r.includes("runtime") ? "runtime" : i === "trigger" ? "trigger" : "activity";
}
function Ry(e) {
  if (!e) return null;
  const t = e.trim().toLowerCase();
  return ["activity", "flowchart", "sequence", "terminal", "runtime", "trigger"].includes(t) ? t : null;
}
function Ly(e) {
  return !!e && (Ie(e) === "Flowchart" || e.activityTypeKey.endsWith(".Flowchart"));
}
function Vy(e) {
  return !!e && (Ie(e) === "Sequence" || e.activityTypeKey.endsWith(".Sequence"));
}
function Hy(e) {
  return e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").trim();
}
function Oy(e) {
  return e.activityTypeKey.endsWith(".Sequence") || e.displayName === "Sequence" ? {
    kind: nr,
    schemaVersion: "1.0.0",
    payload: { activities: [] }
  } : e.activityTypeKey.endsWith(".Flowchart") || e.displayName === "Flowchart" ? {
    kind: Xn,
    schemaVersion: "1.0.0",
    payload: {
      activities: [],
      connections: [],
      startNodeId: null,
      nodeMetadata: {},
      connectionMetadata: {}
    }
  } : null;
}
function By(e, t) {
  if (!e) return e ?? null;
  const n = Array.isArray(e.payload.connections) ? e.payload.connections : [], o = /* @__PURE__ */ new Map();
  for (const r of n) {
    if (!Ti(r)) continue;
    const i = r.id;
    typeof i == "string" && o.set(i, r);
  }
  return {
    ...e,
    payload: {
      ...e.payload,
      connections: t.map((r) => {
        const i = o.get(r.id) ?? {}, s = r.data?.vertices, { vertices: c, ...u } = i;
        return {
          ...u,
          id: r.id,
          source: { nodeId: r.source, port: r.sourceHandle ?? "Done" },
          target: r.targetHandle ? { nodeId: r.target, port: r.targetHandle } : { nodeId: r.target },
          ...s?.length ? { vertices: s.map((l) => ({ x: Math.round(l.x), y: Math.round(l.y) })) } : {}
        };
      })
    }
  };
}
function Fy(e, t) {
  return e.mode === "sequence" ? t.slice(0, -1).map((n, o) => ({
    id: `sequence-${n.id}-${t[o + 1].id}`,
    source: n.id,
    target: t[o + 1].id,
    type: "smoothstep",
    animated: !1
  })) : [];
}
function Wy(e) {
  if (e.structure?.kind !== Xn) return [];
  const t = e.structure.payload.connections;
  return Array.isArray(t) ? t.map((n, o) => {
    if (!n || typeof n != "object") return null;
    const r = n.source, i = n.target;
    if (!r?.nodeId || !i?.nodeId) return null;
    const s = Array.isArray(n.vertices) ? n.vertices.filter(Uy) : [];
    return {
      id: typeof n.id == "string" ? String(n.id) : `flow-${o}-${r.nodeId}-${i.nodeId}`,
      source: r.nodeId,
      target: i.nodeId,
      sourceHandle: r.port,
      targetHandle: i.port && i.port !== "Done" ? i.port : void 0,
      type: "workflow",
      label: r.port && r.port !== "Done" ? r.port : void 0,
      data: s.length ? { vertices: s } : void 0
    };
  }).filter((n) => !!n) : [];
}
function Cl(e, t) {
  const n = ta(e.cases);
  if (qy(e, t) && n.length > 0)
    return [...n.map((i) => ({ name: i, displayName: i })), { name: "Default", displayName: "Default" }];
  const o = [
    ...Io(t?.designFacets),
    ...Io(t?.ports),
    ...Io(t?.outputs)
  ];
  if (o.length > 0) return Zy(o);
  const r = ta(e.outcomes);
  return r.length > 0 ? r.map((i) => ({ name: i, displayName: i })) : [{ name: "Done", displayName: "Done" }];
}
function Xy(e, t) {
  return String(t?.executionType ?? "").toLowerCase() !== "trigger";
}
function Bo(e, t, n, o) {
  const r = n ?? "Done";
  return {
    id: `flow-${e}-${t}-${r}-${crypto.randomUUID().slice(0, 8)}`,
    source: e,
    target: t,
    sourceHandle: r,
    targetHandle: o ?? void 0,
    type: "workflow",
    label: r !== "Done" ? r : void 0
  };
}
function Yy(e, t, n) {
  const o = Bo(t.source, n, t.sourceHandle ?? "Done", void 0), r = Bo(n, t.target, "Done", t.targetHandle ?? void 0);
  return e.filter((i) => i.id !== t.id).concat(o, r);
}
function Wr(e) {
  return Array.isArray(e) ? e.filter(Gy) : null;
}
function qy(e, t) {
  const n = t?.activityTypeKey ?? e.activityVersionId, o = t?.displayName ?? "";
  return n.endsWith(".FlowSwitch") || n === "FlowSwitch" || o === "FlowSwitch";
}
function Io(e) {
  if (!Array.isArray(e)) return [];
  const t = [];
  for (const n of e) {
    if (!Ti(n)) continue;
    if (Array.isArray(n.ports)) {
      t.push(...Io(n.ports));
      continue;
    }
    const o = typeof n.type == "string" ? n.type : typeof n.portType == "string" ? n.portType : "", r = n.isBrowsable !== !1 && n.browsable !== !1, i = typeof n.name == "string" ? n.name : typeof n.id == "string" ? n.id : "";
    if (r && o.toLowerCase() === "flow" && i) {
      const s = typeof n.displayName == "string" ? n.displayName : i;
      t.push({ name: i, displayName: s });
    }
  }
  return t;
}
function Zy(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.has(n.name) || t.set(n.name, n);
  return [...t.values()];
}
function ta(e) {
  return Array.isArray(e) ? e.filter((t) => typeof t == "string" && t.length > 0) : [];
}
function na(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const o of e) {
    const r = t(o);
    r && n.set(r, [...n.get(r) ?? [], o]);
  }
  return n;
}
function Ky(e) {
  return [...e].sort((t, n) => oa(n).localeCompare(oa(t)))[0];
}
function oa(e) {
  return e.completedAt ?? e.startedAt ?? e.scheduledAt;
}
function Uy(e) {
  return Ti(e) && typeof e.x == "number" && typeof e.y == "number";
}
function Ti(e) {
  return typeof e == "object" && e !== null;
}
function Gy(e) {
  return typeof e == "object" && e !== null && typeof e.nodeId == "string" && typeof e.activityVersionId == "string";
}
function Jy(e) {
  return e.kind === nr ? "sequence" : e.kind === Xn ? "flowchart" : "generic";
}
function Qy(e) {
  return e.kind === nr || e.kind === Xn, "Activities";
}
function ex(e, t) {
  return e === "sequence" ? { nodeId: "", x: t * 280, y: 0 } : { nodeId: "", x: t % 4 * 280, y: Math.floor(t / 4) * 150 };
}
function tx(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
const nx = [
  { type: "Literal", displayName: "Literal" },
  { type: "JavaScript", displayName: "JavaScript" },
  { type: "Liquid", displayName: "Liquid" },
  { type: "Object", displayName: "Object" },
  { type: "Variable", displayName: "Variable" },
  { type: "Input", displayName: "Input" }
];
function ox(e) {
  const t = e.trim();
  return t ? t.charAt(0).toLowerCase() + t.slice(1) : e;
}
function zi(e) {
  return ox(e.name);
}
function rx(e, t) {
  const n = zi(t), o = e[n];
  return t.isWrapped === !1 ? o ?? t.defaultValue ?? "" : Il(o, t);
}
function kl(e, t) {
  return Il(e[zi(t)], t);
}
function ix(e, t) {
  return {
    ...e,
    expression: {
      type: e.expression.type || "Literal",
      value: t
    }
  };
}
function sx(e, t) {
  return {
    ...e,
    expression: {
      type: t,
      value: e.expression.value
    }
  };
}
function ra(e, t, n) {
  return {
    ...e,
    [zi(t)]: n
  };
}
function ax(e, t) {
  return t.isWrapped === !1 ? rx(e, t) : kl(e, t).expression.value;
}
function Il(e, t) {
  return cx(e) ? {
    typeName: e.typeName || t.typeName,
    expression: {
      type: e.expression.type || t.defaultSyntax || "Literal",
      value: e.expression.value
    },
    ...e.memoryReference ? { memoryReference: e.memoryReference } : {}
  } : {
    typeName: t.typeName,
    expression: {
      type: t.defaultSyntax || "Literal",
      value: e ?? t.defaultValue ?? ""
    }
  };
}
function cx(e) {
  if (!e || typeof e != "object") return !1;
  const t = e, n = t.expression;
  return typeof t.typeName == "string" && !!n && typeof n == "object" && typeof n.type == "string";
}
const jl = /* @__PURE__ */ new Set(["studio.property.singleline", "studio.property.text-fallback"]);
function lx({
  activity: e,
  descriptor: t,
  editors: n,
  expressionEditors: o,
  expressionDescriptors: r,
  descriptorStatus: i,
  onChange: s
}) {
  if (i === "loading")
    return /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "Loading activity properties..." });
  if (!t)
    return /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "No activity descriptor is available for this activity." });
  const c = t.inputs.filter((f) => f.isBrowsable !== !1).sort((f, d) => (f.order ?? 0) - (d.order ?? 0) || f.name.localeCompare(d.name));
  if (c.length === 0)
    return /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "This activity does not expose editable properties." });
  const u = px(c), l = r.length > 0 ? r : nx;
  return /* @__PURE__ */ a.jsxs("div", { className: "wf-properties", children: [
    /* @__PURE__ */ a.jsx("span", { className: "wf-section-label", children: "Properties" }),
    u.map((f) => /* @__PURE__ */ a.jsxs("section", { className: "wf-property-group", children: [
      u.length > 1 ? /* @__PURE__ */ a.jsx("h4", { children: f.category }) : null,
      f.inputs.map((d) => /* @__PURE__ */ a.jsx(
        ux,
        {
          activity: e,
          input: d,
          editors: n,
          expressionEditors: o,
          expressionDescriptors: l,
          onChange: s
        },
        d.name
      ))
    ] }, f.category))
  ] });
}
function ux({
  activity: e,
  input: t,
  editors: n,
  expressionEditors: o,
  expressionDescriptors: r,
  onChange: i
}) {
  const s = t.isReadOnly === !0, c = { activity: e, expressionDescriptors: r, readOnly: s }, u = hx(n, t, c), l = u?.component, f = t.isWrapped !== !1 ? kl(e, t) : null, d = f?.expression.type ?? "Literal", h = ax(e, t), p = f ? {
    activity: e,
    descriptor: t,
    expressionDescriptors: r,
    readOnly: s,
    surface: "inline",
    syntax: d
  } : null, g = p ? _l(o, p) : null, x = g?.surfaces.inline, w = g && p ? Al(g, p, h) : [], y = !!(f && gx(t, u?.id)), N = !!(f && mx(t, u?.id)), [m, v] = Y(!1), E = (_) => {
    const P = f ? ix(f, _) : _;
    i(ra(e, t, P));
  }, C = (_) => {
    f && i(ra(e, t, sx(f, _)));
  }, k = x && p ? /* @__PURE__ */ a.jsx(
    x,
    {
      descriptor: t,
      syntax: d,
      value: h,
      disabled: s,
      context: p,
      onChange: E
    }
  ) : fx(l, t, h, s, c, E);
  return /* @__PURE__ */ a.jsxs("div", { className: "wf-property-row", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-property-row-header", children: [
      /* @__PURE__ */ a.jsx("label", { children: t.displayName || t.name }),
      /* @__PURE__ */ a.jsx("span", { children: Ml(t.typeName) })
    ] }),
    t.description ? /* @__PURE__ */ a.jsx("p", { children: t.description }) : null,
    f && !y ? /* @__PURE__ */ a.jsx(
      li,
      {
        label: `${t.displayName || t.name} expression syntax`,
        value: d,
        descriptors: r,
        disabled: s,
        onChange: C
      }
    ) : null,
    y ? /* @__PURE__ */ a.jsxs("div", { className: "wf-expression-field", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "wf-expression-editor", children: [
        k,
        ui(w)
      ] }),
      /* @__PURE__ */ a.jsx(
        li,
        {
          label: `${t.displayName || t.name} expression syntax`,
          value: d,
          descriptors: r,
          disabled: s,
          variant: "inline",
          onChange: C
        }
      ),
      N ? /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "wf-expression-expand-button",
          "aria-label": `Open expanded ${t.displayName || t.name} editor`,
          title: "Open expanded editor",
          onClick: () => v(!0),
          children: /* @__PURE__ */ a.jsx(Oo, { size: 13 })
        }
      ) : null
    ] }) : /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      k,
      ui(w)
    ] }),
    N && !y ? /* @__PURE__ */ a.jsxs(
      "button",
      {
        type: "button",
        className: "wf-property-expand-row",
        "aria-label": `Open expanded ${t.displayName || t.name} editor`,
        onClick: () => v(!0),
        children: [
          /* @__PURE__ */ a.jsx(Oo, { size: 13 }),
          " Open expanded editor"
        ]
      }
    ) : null,
    m ? /* @__PURE__ */ a.jsx(
      dx,
      {
        input: t,
        value: h,
        syntax: d,
        descriptors: r,
        activity: e,
        expressionEditors: o,
        disabled: s,
        onChange: E,
        onSyntaxChange: C,
        onClose: () => v(!1)
      }
    ) : null
  ] });
}
function dx({
  input: e,
  value: t,
  syntax: n,
  descriptors: o,
  activity: r,
  expressionEditors: i,
  disabled: s,
  onChange: c,
  onSyntaxChange: u,
  onClose: l
}) {
  const f = va(), d = e.displayName || e.name, h = {
    activity: r,
    descriptor: e,
    expressionDescriptors: o,
    readOnly: s,
    surface: "expanded",
    syntax: n
  }, p = _l(i, h), g = p?.surfaces.expanded, x = p ? Al(p, h, t) : [], w = !g && n.toLowerCase() !== "literal";
  return re(() => {
    const y = (N) => {
      N.key === "Escape" && l();
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [l]), /* @__PURE__ */ a.jsx("div", { className: "wf-property-editor-backdrop", children: /* @__PURE__ */ a.jsxs("section", { className: "wf-property-editor-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": f, children: [
    /* @__PURE__ */ a.jsxs("header", { children: [
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("span", { children: "Property editor" }),
        /* @__PURE__ */ a.jsx("h3", { id: f, children: d })
      ] }),
      /* @__PURE__ */ a.jsx("button", { type: "button", "aria-label": `Close ${d} editor`, onClick: l, children: /* @__PURE__ */ a.jsx(fy, { size: 16 }) })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "wf-property-editor-body", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "wf-property-editor-toolbar", children: [
        /* @__PURE__ */ a.jsx(
          li,
          {
            label: `${d} expression syntax`,
            value: n,
            descriptors: o,
            disabled: s,
            onChange: u
          }
        ),
        /* @__PURE__ */ a.jsx("span", { children: Ml(e.typeName) })
      ] }),
      e.description ? /* @__PURE__ */ a.jsx("p", { children: e.description }) : null,
      g ? /* @__PURE__ */ a.jsx(
        g,
        {
          descriptor: e,
          syntax: n,
          value: t,
          disabled: s,
          context: h,
          onChange: c
        }
      ) : /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        w ? /* @__PURE__ */ a.jsxs("p", { className: "wf-expression-editor-hint", children: [
          "No enhanced editor is registered for ",
          n,
          ". Using the generic text editor."
        ] }) : null,
        /* @__PURE__ */ a.jsx(
          "textarea",
          {
            "aria-label": `${d} expanded value`,
            value: t == null ? "" : String(t),
            disabled: s,
            spellCheck: !1,
            onChange: (y) => c(y.target.value)
          }
        )
      ] }),
      ui(x)
    ] }),
    /* @__PURE__ */ a.jsxs("footer", { children: [
      /* @__PURE__ */ a.jsx("span", { children: "Changes update the draft immediately." }),
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: l, children: "Close" })
    ] })
  ] }) });
}
function fx(e, t, n, o, r, i) {
  return e ? /* @__PURE__ */ a.jsx(
    e,
    {
      descriptor: t,
      value: n,
      disabled: o,
      context: r,
      onChange: i
    }
  ) : /* @__PURE__ */ a.jsx("input", { type: "text", value: n == null ? "" : String(n), disabled: o, onChange: (s) => i(s.target.value) });
}
function li({
  label: e,
  value: t,
  descriptors: n,
  disabled: o,
  variant: r = "block",
  onChange: i
}) {
  const [s, c] = Y(!1), u = va(), l = n.find((d) => d.type === t), f = [
    "wf-syntax-picker-trigger",
    r === "inline" ? "inline" : "",
    s ? "open" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ a.jsxs("div", { className: r === "inline" ? "wf-syntax-picker inline" : "wf-syntax-picker", onBlur: (d) => {
    d.currentTarget.contains(d.relatedTarget) || c(!1);
  }, children: [
    /* @__PURE__ */ a.jsx(
      "button",
      {
        type: "button",
        className: f,
        "aria-label": e,
        "aria-haspopup": "listbox",
        "aria-expanded": s,
        "aria-controls": u,
        disabled: o,
        onClick: () => c((d) => !d),
        children: /* @__PURE__ */ a.jsx("span", { children: l?.displayName || l?.type || t })
      }
    ),
    s ? /* @__PURE__ */ a.jsx("div", { id: u, role: "listbox", className: "wf-syntax-picker-menu", "aria-label": e, children: n.map((d) => {
      const h = d.displayName || d.type, p = d.type === t;
      return /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": p,
          className: p ? "selected" : "",
          onClick: () => {
            i(d.type), c(!1);
          },
          children: h
        },
        d.type
      );
    }) }) : null
  ] });
}
function hx(e, t, n) {
  return [...e].sort((o, r) => (o.order ?? 500) - (r.order ?? 500)).find((o) => o.supports(t, n));
}
function _l(e, t) {
  return [...e].sort((n, o) => (n.order ?? 500) - (o.order ?? 500)).find((n) => !!n.surfaces[t.surface] && n.supports(t));
}
function Al(e, t, n) {
  return e.diagnostics?.(t, n) ?? [];
}
function ui(e) {
  return e.length === 0 ? null : /* @__PURE__ */ a.jsx("div", { className: "wf-expression-editor-diagnostics", role: "status", children: e.map((t, n) => {
    const o = t.severity ?? "info";
    return /* @__PURE__ */ a.jsxs("p", { className: `wf-expression-editor-diagnostic ${o}`, children: [
      t.code ? /* @__PURE__ */ a.jsx("span", { children: t.code }) : null,
      t.message
    ] }, `${t.code ?? "diagnostic"}-${n}`);
  }) });
}
function px(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = n.category?.trim() || "General";
    t.set(o, [...t.get(o) ?? [], n]);
  }
  return [...t.entries()].map(([n, o]) => ({ category: n, inputs: o }));
}
function Ml(e) {
  return e.split(".").filter(Boolean).at(-1) ?? e;
}
function gx(e, t) {
  if (e.uiHint?.toLowerCase() === "multiline" || t && !jl.has(t)) return !1;
  const n = e.typeName.toLowerCase();
  return ["string", "system.string", "text"].includes(n) || e.uiHint?.toLowerCase() === "singleline";
}
function mx(e, t) {
  const n = e.uiHint?.toLowerCase();
  if (n === "checkbox" || n === "dropdown" || t && !jl.has(t) && n !== "multiline") return !1;
  const o = e.typeName.toLowerCase();
  return ["string", "system.string", "text"].includes(o) || n === "singleline" || n === "multiline";
}
const Dl = { workflowActivity: Jx }, Pl = { workflow: e0 }, ia = "application/x-elsa-activity-version-id", yx = 6, xx = 1200, wx = [10, 25, 50], vx = 10, sa = "elsa-studio-workflow-palette-width", aa = "elsa-studio-workflow-inspector-width", ca = "elsa-studio-workflow-palette-collapsed", la = "elsa-studio-workflow-inspector-collapsed", $l = "elsa-studio-workflow-side-panel-maximized", mn = 180, yn = 460, bx = 260, xn = 260, wn = 560, Sx = 320, ua = 42, wo = 16, Tl = ht.createContext(null);
function d0(e) {
  e.featureAreas.add({
    id: "workflows",
    title: "Workflows",
    description: "Design, publish and run workflow definitions and inspect instances.",
    navGroup: "Workspace",
    ownedPaths: ["/workflows"],
    required: !0,
    defaultEnabled: !0,
    order: 20,
    nav: {
      title: "Workflows",
      path: "/workflows/definitions",
      iconColor: "#0ea5e9",
      items: [
        { title: "Definitions", path: "/workflows/definitions", iconColor: "#0ea5e9" },
        { title: "Executables", path: "/workflows/executables", iconColor: "#0ea5e9" },
        { title: "Instances", path: "/workflows/instances", iconColor: "#0ea5e9" }
      ]
    },
    routes: [
      {
        id: "workflows-definitions",
        path: "/workflows/definitions",
        label: "Workflow definitions",
        component: () => /* @__PURE__ */ a.jsx(Nx, { context: e.backend, ai: e.ai, propertyEditors: e.propertyEditors.list(), expressionEditors: e.expressionEditors.list(), workflowDesignerPanels: e.workflowDesigner.panels.list() })
      },
      {
        id: "workflows-executables",
        path: "/workflows/executables",
        label: "Workflow executables",
        component: () => /* @__PURE__ */ a.jsx(Ex, { context: e.backend, ai: e.ai })
      },
      {
        id: "workflows-instances",
        path: "/workflows/instances",
        label: "Workflow instances",
        component: () => /* @__PURE__ */ a.jsx(Cx, { context: e.backend, ai: e.ai })
      },
      {
        id: "workflows-instance-detail",
        path: "/workflows/instances/:workflowExecutionId",
        label: "Workflow instance",
        component: () => /* @__PURE__ */ a.jsx(kx, { context: e.backend, ai: e.ai })
      }
    ]
  });
}
function Nx({
  context: e,
  ai: t,
  propertyEditors: n,
  expressionEditors: o,
  workflowDesignerPanels: r
}) {
  const [i, s] = Y(da);
  re(() => {
    const u = () => s(da());
    return window.addEventListener("popstate", u), () => window.removeEventListener("popstate", u);
  }, []);
  const c = (u) => {
    const l = u ? `/workflows/definitions?definition=${encodeURIComponent(u)}` : "/workflows/definitions";
    window.history.pushState({}, "", l), window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return i ? /* @__PURE__ */ a.jsx(Gx, { context: e, definitionId: i, ai: t, propertyEditors: n, expressionEditors: o, workflowDesignerPanels: r, onBack: () => c(null) }) : /* @__PURE__ */ a.jsx(or, { title: "Definitions", children: /* @__PURE__ */ a.jsx(jx, { context: e, ai: t, onOpen: c }) });
}
function Ex({ context: e, ai: t }) {
  const [n, o] = Y(fa);
  return re(() => {
    const r = () => o(fa());
    return window.addEventListener("popstate", r), () => window.removeEventListener("popstate", r);
  }, []), /* @__PURE__ */ a.jsx(or, { title: "Executables", children: /* @__PURE__ */ a.jsx(Ax, { context: e, ai: t, definitionFilter: n }) });
}
function Cx({ context: e, ai: t }) {
  return /* @__PURE__ */ a.jsx(or, { title: "Instances", children: /* @__PURE__ */ a.jsx(Mx, { context: e, ai: t }) });
}
function kx({ context: e, ai: t }) {
  const n = Ix();
  return /* @__PURE__ */ a.jsx(or, { title: "Instance", children: /* @__PURE__ */ a.jsx(Dx, { context: e, ai: t, workflowExecutionId: n }) });
}
function or({ title: e, children: t }) {
  return /* @__PURE__ */ a.jsxs("section", { className: "wf-page", children: [
    /* @__PURE__ */ a.jsx("div", { className: "wf-page-header", children: /* @__PURE__ */ a.jsxs("div", { children: [
      /* @__PURE__ */ a.jsx("span", { className: "wf-kicker", children: "Workflow management" }),
      /* @__PURE__ */ a.jsx("h2", { children: e })
    ] }) }),
    t
  ] });
}
function da() {
  return new URLSearchParams(window.location.search).get("definition");
}
function fa() {
  return new URLSearchParams(window.location.search).get("definition");
}
function Ix() {
  const e = /^\/workflows\/instances\/([^/]+)$/.exec(window.location.pathname);
  return e ? decodeURIComponent(e[1]) : "";
}
function jx({ context: e, ai: t, onOpen: n }) {
  const [o, r] = Y(""), [i, s] = Y("active"), [c, u] = Y(1), [l, f] = Y(vx), [d, h] = Y("loading"), [p, g] = Y(""), [x, w] = Y(""), [y, N] = Y([]), [m, v] = Y(0), [E, C] = Y(() => /* @__PURE__ */ new Set()), [k, _] = Y(null), [P, W] = Y(!1), [A, z] = Y([]), [H, b] = Y("idle"), j = ce(null), I = me(() => y.map((R) => R.id), [y]), D = Zt(t, "weaver.workflows.suggest-create-metadata"), T = Zt(t, "weaver.workflows.explain-definition"), $ = I.filter((R) => E.has(R)).length, V = I.length > 0 && $ === I.length, F = ge(async () => {
    h("loading"), g("");
    try {
      const R = await gy(e, { search: o, state: i, page: c, pageSize: l }), G = typeof R.totalCount == "number", de = R.totalCount ?? R.definitions.length, ye = zl(de, l);
      if (de > 0 && c > ye) {
        u(ye);
        return;
      }
      N(G ? R.definitions : Hx(R.definitions, c, l)), v(de), h("ready");
    } catch (R) {
      g(R instanceof Error ? R.message : String(R)), h("failed");
    }
  }, [e, o, i, c, l]);
  re(() => {
    F();
  }, [F]), re(() => {
    j.current && (j.current.indeterminate = $ > 0 && !V);
  }, [V, $]);
  const B = ge(async () => {
    if (!(H === "loading" || H === "ready")) {
      b("loading");
      try {
        const R = await Pi(e);
        z(R.activities ?? []), b("ready");
      } catch (R) {
        b("failed"), g(R instanceof Error ? R.message : String(R));
      }
    }
  }, [H, e]), U = () => {
    g(""), w(""), _({ name: "", description: "", rootKind: "flowchart" }), B();
  }, Z = async () => {
    if (k?.name.trim()) {
      W(!0), g(""), w("");
      try {
        const R = await xy(e, {
          name: k.name.trim(),
          description: k.description.trim() || null,
          rootKind: k.rootKind,
          rootActivityVersionId: Fx(k, A)
        });
        _(null), n(R.definition.id);
      } catch (R) {
        g(R instanceof Error ? R.message : String(R));
      } finally {
        W(!1);
      }
    }
  }, ee = (R) => {
    window.history.pushState({}, "", `/workflows/executables?definition=${encodeURIComponent(R)}`), window.dispatchEvent(new PopStateEvent("popstate"));
  }, se = async () => {
    if (y.length === 1 && c > 1) {
      u(c - 1);
      return;
    }
    await F();
  }, J = () => C(/* @__PURE__ */ new Set()), L = (R, G) => {
    C((de) => {
      const ye = new Set(de);
      return G ? ye.add(R) : ye.delete(R), ye;
    });
  }, q = (R) => {
    C((G) => {
      const de = new Set(G);
      for (const ye of I)
        R ? de.add(ye) : de.delete(ye);
      return de;
    });
  }, ie = (R) => {
    s(R), u(1), J();
  }, oe = (R) => {
    r(R), u(1), J();
  }, K = async (R) => {
    if (window.confirm(`Delete workflow definition "${R.name}"? You can restore it from the Deleted view.`)) {
      w(""), g("");
      try {
        await wy(e, R.id), L(R.id, !1), w(`Deleted ${R.name}`), await se();
      } catch (G) {
        g(G instanceof Error ? G.message : String(G));
      }
    }
  }, Q = async (R) => {
    w(""), g("");
    try {
      await vy(e, R.id), L(R.id, !1), w(`Restored ${R.name}`), await se();
    } catch (G) {
      g(G instanceof Error ? G.message : String(G));
    }
  }, ae = async (R) => {
    if (window.confirm(`Permanently delete workflow definition "${R.name}"? This removes its drafts, versions, layouts, and validations and cannot be undone.`)) {
      w(""), g("");
      try {
        await by(e, R.id), L(R.id, !1), w(`Permanently deleted ${R.name}`), await se();
      } catch (G) {
        g(G instanceof Error ? G.message : String(G));
      }
    }
  };
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-toolbar", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "wf-segmented", role: "tablist", "aria-label": "Definition state", children: [
        /* @__PURE__ */ a.jsx("button", { type: "button", className: i === "active" ? "active" : "", "aria-selected": i === "active", onClick: () => ie("active"), children: "Active" }),
        /* @__PURE__ */ a.jsx("button", { type: "button", className: i === "deleted" ? "active" : "", "aria-selected": i === "deleted", onClick: () => ie("deleted"), children: "Deleted" })
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "wf-search", children: [
        /* @__PURE__ */ a.jsx(uy, { size: 15 }),
        /* @__PURE__ */ a.jsx("input", { value: o, onChange: (R) => oe(R.target.value), placeholder: "Search definitions" })
      ] }),
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => {
        F();
      }, children: "Refresh" }),
      /* @__PURE__ */ a.jsx("div", { className: "wf-actions", children: /* @__PURE__ */ a.jsxs("button", { type: "button", title: "Create workflow", onClick: U, children: [
        /* @__PURE__ */ a.jsx(Di, { size: 15 }),
        " Create"
      ] }) })
    ] }),
    d === "failed" ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(it, { size: 16 }),
      " ",
      p
    ] }) : null,
    d !== "failed" && p ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(it, { size: 16 }),
      " ",
      p
    ] }) : null,
    x ? /* @__PURE__ */ a.jsxs("div", { className: "wf-status-line", children: [
      /* @__PURE__ */ a.jsx(Wn, { size: 14 }),
      " ",
      x
    ] }) : null,
    E.size > 0 ? /* @__PURE__ */ a.jsxs("div", { className: "wf-selection-bar", "aria-live": "polite", children: [
      /* @__PURE__ */ a.jsxs("span", { children: [
        E.size,
        " selected"
      ] }),
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: J, children: "Clear selection" })
    ] }) : null,
    d === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Loading workflow definitions..." }) : null,
    d === "ready" && y.length === 0 ? /* @__PURE__ */ a.jsxs("div", { className: "wf-empty", children: [
      "No ",
      i,
      " workflow definitions found."
    ] }) : null,
    d === "ready" && y.length > 0 ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsxs("div", { className: "wf-grid", role: "table", "aria-label": "Workflow definitions", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "wf-grid-head", role: "row", children: [
          /* @__PURE__ */ a.jsx("label", { className: "wf-row-select", children: /* @__PURE__ */ a.jsx(
            "input",
            {
              ref: j,
              type: "checkbox",
              checked: V,
              onChange: (R) => q(R.target.checked),
              "aria-label": "Select visible workflow definitions"
            }
          ) }),
          /* @__PURE__ */ a.jsx("span", { children: "Name" }),
          /* @__PURE__ */ a.jsx("span", { children: "Latest version" }),
          /* @__PURE__ */ a.jsx("span", { children: i === "deleted" ? "Deleted" : "Draft" }),
          /* @__PURE__ */ a.jsx("span", { children: "Modified" }),
          /* @__PURE__ */ a.jsx("span", { children: "Actions" })
        ] }),
        y.map((R) => /* @__PURE__ */ a.jsxs(
          "div",
          {
            className: "wf-grid-row",
            role: "row",
            "aria-label": `Open workflow definition ${R.name}`,
            "aria-selected": E.has(R.id),
            tabIndex: 0,
            onClick: () => n(R.id),
            onKeyDown: (G) => {
              G.currentTarget === G.target && (G.key !== "Enter" && G.key !== " " || (G.preventDefault(), n(R.id)));
            },
            children: [
              /* @__PURE__ */ a.jsx("label", { className: "wf-row-select", onClick: (G) => G.stopPropagation(), children: /* @__PURE__ */ a.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: E.has(R.id),
                  onChange: (G) => L(R.id, G.target.checked),
                  "aria-label": `Select workflow definition ${R.name}`
                }
              ) }),
              /* @__PURE__ */ a.jsxs("span", { children: [
                /* @__PURE__ */ a.jsx("strong", { children: R.name }),
                /* @__PURE__ */ a.jsx("small", { children: R.description || R.id })
              ] }),
              /* @__PURE__ */ a.jsx("span", { children: R.latestVersion ?? "No version" }),
              /* @__PURE__ */ a.jsx("span", { children: i === "deleted" ? ot(R.deletedAt) : R.draftId ? "Draft" : "None" }),
              /* @__PURE__ */ a.jsx("span", { children: ot(R.lastModifiedAt) }),
              /* @__PURE__ */ a.jsx("span", { className: "wf-row-actions", onClick: (G) => G.stopPropagation(), children: i === "active" ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
                /* @__PURE__ */ a.jsx("button", { type: "button", onClick: (G) => {
                  G.stopPropagation(), n(R.id);
                }, children: "Open" }),
                /* @__PURE__ */ a.jsx("button", { type: "button", onClick: (G) => {
                  G.stopPropagation(), ee(R.id);
                }, children: "Artifacts" }),
                T ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => Mt(t, T, R), children: [
                  /* @__PURE__ */ a.jsx(At, { size: 13 }),
                  " Explain"
                ] }) : null,
                /* @__PURE__ */ a.jsxs("button", { type: "button", className: "danger", onClick: () => {
                  K(R);
                }, children: [
                  /* @__PURE__ */ a.jsx(ii, { size: 13 }),
                  " Delete"
                ] })
              ] }) : /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
                /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => {
                  Q(R);
                }, children: [
                  /* @__PURE__ */ a.jsx(xl, { size: 13 }),
                  " Restore"
                ] }),
                /* @__PURE__ */ a.jsxs("button", { type: "button", className: "danger", onClick: () => {
                  ae(R);
                }, children: [
                  /* @__PURE__ */ a.jsx(ii, { size: 13 }),
                  " Delete permanently"
                ] })
              ] }) })
            ]
          },
          R.id
        ))
      ] }),
      /* @__PURE__ */ a.jsx(
        Vx,
        {
          page: c,
          pageSize: l,
          totalCount: m,
          onPageChange: u,
          onPageSizeChange: (R) => {
            f(R), u(1);
          }
        }
      )
    ] }) : null,
    k ? /* @__PURE__ */ a.jsx(
      _x,
      {
        draft: k,
        activities: A,
        catalogState: H,
        creating: P,
        suggestMetadataAction: D,
        onSuggestMetadata: D ? () => Mt(t, D, { draft: k, activities: A }) : void 0,
        onChange: (R) => _(R),
        onClose: () => _(null),
        onSubmit: Z
      }
    ) : null
  ] });
}
function _x({ draft: e, activities: t, catalogState: n, creating: o, suggestMetadataAction: r, onSuggestMetadata: i, onChange: s, onClose: c, onSubmit: u }) {
  const l = me(() => Ox(t), [t]), f = Bx(e, t), d = (h) => {
    if (h.startsWith("kind:")) {
      s({ ...e, rootKind: h.slice(5), rootActivityVersionId: null });
      return;
    }
    const p = t.find((g) => g.activityVersionId === h);
    s({
      ...e,
      rootKind: Rl(p) ?? e.rootKind,
      rootActivityVersionId: h
    });
  };
  return /* @__PURE__ */ a.jsx("div", { className: "wf-dialog-backdrop", role: "presentation", children: /* @__PURE__ */ a.jsx("section", { className: "wf-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": "workflow-create-title", children: /* @__PURE__ */ a.jsxs(
    "form",
    {
      onSubmit: (h) => {
        h.preventDefault(), u();
      },
      children: [
        /* @__PURE__ */ a.jsxs("div", { className: "wf-dialog-heading", children: [
          /* @__PURE__ */ a.jsx("h3", { id: "workflow-create-title", children: "Create Workflow" }),
          r ? /* @__PURE__ */ a.jsxs("button", { type: "button", className: "wf-ai-action", onClick: i, title: r.description ?? r.label, children: [
            /* @__PURE__ */ a.jsx(At, { size: 13 }),
            " ",
            r.label
          ] }) : null
        ] }),
        /* @__PURE__ */ a.jsxs("label", { className: "wf-form-field", children: [
          /* @__PURE__ */ a.jsx("span", { children: "Display name" }),
          /* @__PURE__ */ a.jsx(
            "input",
            {
              autoFocus: !0,
              "aria-label": "Display name",
              value: e.name,
              onChange: (h) => s({ ...e, name: h.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ a.jsxs("label", { className: "wf-form-field", children: [
          /* @__PURE__ */ a.jsx("span", { children: "Description" }),
          /* @__PURE__ */ a.jsx(
            "textarea",
            {
              "aria-label": "Description",
              rows: 3,
              value: e.description,
              onChange: (h) => s({ ...e, description: h.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ a.jsxs("label", { className: "wf-form-field", children: [
          /* @__PURE__ */ a.jsx("span", { children: "Root activity" }),
          /* @__PURE__ */ a.jsxs(
            "select",
            {
              "aria-label": "Root activity",
              value: f,
              onChange: (h) => d(h.target.value),
              disabled: n === "loading",
              children: [
                /* @__PURE__ */ a.jsx("optgroup", { label: "Composite roots", children: l.compositeRoots.map((h) => /* @__PURE__ */ a.jsx("option", { value: h.value, children: h.label }, h.value)) }),
                l.otherCategories.map((h) => /* @__PURE__ */ a.jsx("optgroup", { label: h.name, children: h.activities.map((p) => /* @__PURE__ */ a.jsx("option", { value: p.activityVersionId, children: Ie(p) }, p.activityVersionId)) }, h.name))
              ]
            }
          )
        ] }),
        n === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "wf-dialog-note", children: "Loading activity catalog..." }) : null,
        n === "failed" ? /* @__PURE__ */ a.jsx("div", { className: "wf-dialog-note", children: "Activity catalog could not be loaded. Composite roots remain available." }) : null,
        /* @__PURE__ */ a.jsxs("div", { className: "wf-dialog-actions", children: [
          /* @__PURE__ */ a.jsx("button", { type: "button", onClick: c, disabled: o, children: "Cancel" }),
          /* @__PURE__ */ a.jsx("button", { type: "submit", disabled: o || !e.name.trim(), children: o ? "Creating..." : "Create" })
        ] })
      ]
    }
  ) }) });
}
function Ax({ context: e, ai: t, definitionFilter: n }) {
  const [o, r] = Y("loading"), [i, s] = Y(""), [c, u] = Y(""), [l, f] = Y([]), d = me(
    () => n ? l.filter((x) => x.definitionId === n || x.sourceId === n) : l,
    [n, l]
  ), h = Zt(t, "weaver.workflows.explain-executable"), p = ge(async () => {
    r("loading"), s("");
    try {
      f(await Iy(e)), r("ready");
    } catch (x) {
      s(x instanceof Error ? x.message : String(x)), r("failed");
    }
  }, [e]);
  re(() => {
    p();
  }, [p]);
  const g = async (x) => {
    u(""), s("");
    try {
      await ky(e, x.artifactId), u(`Started ${x.artifactId}`);
    } catch (w) {
      s(w instanceof Error ? w.message : String(w));
    }
  };
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-toolbar", children: [
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => {
        p();
      }, children: "Refresh" }),
      n ? /* @__PURE__ */ a.jsxs("span", { className: "wf-filter-chip", children: [
        "Definition ",
        n
      ] }) : null
    ] }),
    o === "failed" ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(it, { size: 16 }),
      " ",
      i
    ] }) : null,
    c ? /* @__PURE__ */ a.jsxs("div", { className: "wf-status-line", children: [
      /* @__PURE__ */ a.jsx(Wn, { size: 14 }),
      " ",
      c
    ] }) : null,
    o === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Loading workflow executables..." }) : null,
    o === "ready" && d.length === 0 ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: n ? "No workflow executables found for this definition." : "No workflow executables found. Publish a workflow definition to create one." }) : null,
    o === "ready" && d.length > 0 ? /* @__PURE__ */ a.jsxs("div", { className: "wf-grid wf-executable-grid", role: "table", "aria-label": "Workflow executables", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "wf-grid-head", role: "row", children: [
        /* @__PURE__ */ a.jsx("span", { children: "Artifact" }),
        /* @__PURE__ */ a.jsx("span", { children: "Version" }),
        /* @__PURE__ */ a.jsx("span", { children: "Source" }),
        /* @__PURE__ */ a.jsx("span", { children: "Root" }),
        /* @__PURE__ */ a.jsx("span", { children: "Published" }),
        /* @__PURE__ */ a.jsx("span", { children: "Actions" })
      ] }),
      d.map((x) => /* @__PURE__ */ a.jsxs("div", { className: "wf-grid-row", role: "row", children: [
        /* @__PURE__ */ a.jsxs("span", { children: [
          /* @__PURE__ */ a.jsx("strong", { children: x.artifactId }),
          /* @__PURE__ */ a.jsx("small", { children: x.artifactHash })
        ] }),
        /* @__PURE__ */ a.jsx("span", { children: x.artifactVersion }),
        /* @__PURE__ */ a.jsx("span", { children: Xx(x) }),
        /* @__PURE__ */ a.jsx("span", { children: Yx(x) }),
        /* @__PURE__ */ a.jsx("span", { children: ot(x.publishedAt ?? x.createdAt) }),
        /* @__PURE__ */ a.jsxs("span", { className: "wf-row-actions", children: [
          /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => {
            g(x);
          }, children: [
            /* @__PURE__ */ a.jsx(Mi, { size: 13 }),
            " Run"
          ] }),
          h ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => Mt(t, h, x), children: [
            /* @__PURE__ */ a.jsx(At, { size: 13 }),
            " Explain"
          ] }) : null
        ] })
      ] }, x.artifactId))
    ] }) : null
  ] });
}
function Mx({ context: e }) {
  const [t, n] = Y("loading"), [o, r] = Y(""), [i, s] = Y(""), [c, u] = Y([]), l = ge(async () => {
    n("loading"), r("");
    try {
      const d = await jy(e, { status: i || void 0, take: 100 });
      u(d), n("ready");
    } catch (d) {
      r(d instanceof Error ? d.message : String(d)), u([]), n("failed");
    }
  }, [e, i]);
  re(() => {
    l();
  }, [l]);
  const f = (d) => {
    window.history.pushState({}, "", `/workflows/instances/${encodeURIComponent(d)}`), window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-toolbar", children: [
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => {
        l();
      }, children: "Refresh" }),
      /* @__PURE__ */ a.jsxs("label", { className: "wf-toolbar-field", children: [
        /* @__PURE__ */ a.jsx("span", { children: "Status" }),
        /* @__PURE__ */ a.jsxs("select", { "aria-label": "Workflow instance status", value: i, onChange: (d) => s(d.target.value), children: [
          /* @__PURE__ */ a.jsx("option", { value: "", children: "All statuses" }),
          /* @__PURE__ */ a.jsx("option", { value: "Pending", children: "Pending" }),
          /* @__PURE__ */ a.jsx("option", { value: "Running", children: "Running" }),
          /* @__PURE__ */ a.jsx("option", { value: "Suspended", children: "Suspended" }),
          /* @__PURE__ */ a.jsx("option", { value: "Completed", children: "Completed" }),
          /* @__PURE__ */ a.jsx("option", { value: "Faulted", children: "Faulted" }),
          /* @__PURE__ */ a.jsx("option", { value: "Cancelled", children: "Cancelled" })
        ] })
      ] })
    ] }),
    t === "failed" ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(it, { size: 16 }),
      " ",
      o
    ] }) : null,
    t === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Loading workflow instances..." }) : null,
    t === "ready" && c.length === 0 ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "No workflow instances found. Run a published workflow executable to create instance history." }) : null,
    t === "ready" && c.length > 0 ? /* @__PURE__ */ a.jsxs("div", { className: "wf-grid wf-instance-grid", role: "table", "aria-label": "Workflow instances", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "wf-grid-head", role: "row", children: [
        /* @__PURE__ */ a.jsx("span", { children: "Instance" }),
        /* @__PURE__ */ a.jsx("span", { children: "Status" }),
        /* @__PURE__ */ a.jsx("span", { children: "Definition" }),
        /* @__PURE__ */ a.jsx("span", { children: "Activity" }),
        /* @__PURE__ */ a.jsx("span", { children: "Started" }),
        /* @__PURE__ */ a.jsx("span", { children: "Duration" })
      ] }),
      c.map((d) => /* @__PURE__ */ a.jsxs(
        "button",
        {
          type: "button",
          className: "wf-grid-row",
          role: "row",
          "aria-label": `Inspect workflow instance ${d.workflowExecutionId}`,
          onClick: () => f(d.workflowExecutionId),
          children: [
            /* @__PURE__ */ a.jsxs("span", { children: [
              /* @__PURE__ */ a.jsx("strong", { children: d.workflowExecutionId }),
              /* @__PURE__ */ a.jsx("small", { children: d.artifactId })
            ] }),
            /* @__PURE__ */ a.jsx("span", { children: /* @__PURE__ */ a.jsx(Yn, { status: d.status, subStatus: d.subStatus }) }),
            /* @__PURE__ */ a.jsxs("span", { children: [
              /* @__PURE__ */ a.jsx("strong", { children: d.definitionId }),
              /* @__PURE__ */ a.jsx("small", { children: d.definitionVersionId })
            ] }),
            /* @__PURE__ */ a.jsxs("span", { children: [
              /* @__PURE__ */ a.jsxs("strong", { children: [
                d.activityCount,
                " activities"
              ] }),
              /* @__PURE__ */ a.jsxs("small", { children: [
                d.incidentCount,
                " incidents"
              ] })
            ] }),
            /* @__PURE__ */ a.jsx("span", { children: ot(d.startedAt ?? d.createdAt) }),
            /* @__PURE__ */ a.jsx("span", { children: c0(d.startedAt ?? d.createdAt, d.completedAt ?? d.updatedAt) })
          ]
        },
        d.workflowExecutionId
      ))
    ] }) : null
  ] });
}
function Dx({ context: e, ai: t, workflowExecutionId: n }) {
  const [o, r] = Y("loading"), [i, s] = Y(""), [c, u] = Y(null), [l, f] = Y(null), d = Zt(t, "weaver.workflows.explain-instance"), h = ge(async () => {
    if (!n) {
      s("No workflow execution id was provided."), r("failed");
      return;
    }
    r("loading"), s("");
    try {
      const g = await _y(e, n), [x, w] = await Promise.all([
        yy(e, g.instance.definitionVersionId),
        Pi(e)
      ]);
      u({ details: g, definitionVersion: x, activityCatalog: w.activities }), f(null), r("ready");
    } catch (g) {
      u(null), s(g instanceof Error ? g.message : String(g)), r("failed");
    }
  }, [e, n]);
  re(() => {
    h();
  }, [h]);
  const p = () => {
    window.history.pushState({}, "", "/workflows/instances"), window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-toolbar", children: [
      /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: p, children: [
        /* @__PURE__ */ a.jsx(Ho, { size: 14 }),
        " Instances"
      ] }),
      /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => {
        h();
      }, children: [
        /* @__PURE__ */ a.jsx(xl, { size: 14 }),
        " Refresh"
      ] }),
      c && d ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => Mt(t, d, c.details), children: [
        /* @__PURE__ */ a.jsx(At, { size: 13 }),
        " Explain"
      ] }) : null
    ] }),
    o === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Loading workflow instance..." }) : null,
    o === "failed" ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(it, { size: 16 }),
      " ",
      i
    ] }) : null,
    o === "ready" && c ? /* @__PURE__ */ a.jsxs("div", { className: "wf-instance-detail-workbench", children: [
      /* @__PURE__ */ a.jsx(
        Px,
        {
          definitionVersion: c.definitionVersion,
          activityCatalog: c.activityCatalog,
          details: c.details,
          selectedEvidenceId: l,
          onSelectEvidence: f
        }
      ),
      /* @__PURE__ */ a.jsx(
        $x,
        {
          ai: t,
          action: d,
          summary: c.details.instance,
          details: c.details,
          state: "ready",
          error: "",
          selectedEvidenceId: l,
          onSelectEvidence: f,
          graphNodeIds: Lx(c.definitionVersion, c.activityCatalog)
        }
      )
    ] }) : null
  ] });
}
function Px({ definitionVersion: e, activityCatalog: t, details: n, selectedEvidenceId: o, onSelectEvidence: r }) {
  const i = me(() => {
    const s = e.state.rootActivity;
    if (!s) return { nodes: [], edges: [] };
    const c = t.find((h) => h.activityVersionId === s.activityVersionId), u = $i(s, c), l = u === "unsupported" ? null : kn(s, []), f = u === "unsupported" ? si(s, t, e.layout) : l ? bl(l, t, e.layout) : si(s, t, e.layout), d = f.nodes.map((h) => ({
      ...h,
      draggable: !1,
      connectable: !1,
      deletable: !1
    }));
    return {
      nodes: Py(d, n.activities, n.incidents, o),
      edges: f.edges.map((h) => ({ ...h, deletable: !1 }))
    };
  }, [t, e, n, o]);
  return /* @__PURE__ */ a.jsxs("section", { className: "wf-instance-canvas-shell", "aria-label": "Workflow instance canvas", children: [
    /* @__PURE__ */ a.jsxs("header", { children: [
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("span", { children: "Definition version" }),
        /* @__PURE__ */ a.jsxs("h3", { children: [
          e.definition.name,
          " ",
          /* @__PURE__ */ a.jsx("small", { children: e.version })
        ] })
      ] }),
      /* @__PURE__ */ a.jsx(Yn, { status: n.instance.status, subStatus: n.instance.subStatus })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "wf-instance-canvas", children: [
      i.nodes.length === 0 ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "No workflow activities are available for this definition version." }) : null,
      i.nodes.length > 0 ? /* @__PURE__ */ a.jsxs(
        al,
        {
          nodes: i.nodes,
          edges: i.edges,
          nodeTypes: Dl,
          edgeTypes: Pl,
          fitView: !0,
          nodesDraggable: !1,
          nodesConnectable: !1,
          elementsSelectable: !0,
          onNodeClick: (s, c) => r(c.id),
          onPaneClick: () => r(null),
          children: [
            /* @__PURE__ */ a.jsx(ll, {}),
            /* @__PURE__ */ a.jsx(hl, { pannable: !0, zoomable: !0 }),
            /* @__PURE__ */ a.jsx(dl, {})
          ]
        }
      ) : null
    ] })
  ] });
}
function $x({ ai: e, action: t, summary: n, details: o, state: r, error: i, selectedEvidenceId: s = null, onSelectEvidence: c, graphNodeIds: u }) {
  return n ? /* @__PURE__ */ a.jsxs("aside", { className: "wf-instance-inspector", "aria-label": "Workflow instance details", children: [
    /* @__PURE__ */ a.jsxs("header", { children: [
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("span", { children: "Workflow instance" }),
        /* @__PURE__ */ a.jsx("h3", { children: n.workflowExecutionId })
      ] }),
      t ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => Mt(e, t, o ?? n), children: [
        /* @__PURE__ */ a.jsx(At, { size: 13 }),
        " Explain"
      ] }) : null
    ] }),
    /* @__PURE__ */ a.jsxs("dl", { className: "wf-instance-meta", children: [
      /* @__PURE__ */ a.jsx("dt", { children: "Status" }),
      /* @__PURE__ */ a.jsx("dd", { children: /* @__PURE__ */ a.jsx(Yn, { status: n.status, subStatus: n.subStatus }) }),
      /* @__PURE__ */ a.jsx("dt", { children: "Artifact" }),
      /* @__PURE__ */ a.jsxs("dd", { children: [
        n.artifactId,
        " ",
        /* @__PURE__ */ a.jsx("small", { children: n.artifactVersion })
      ] }),
      /* @__PURE__ */ a.jsx("dt", { children: "Definition" }),
      /* @__PURE__ */ a.jsxs("dd", { children: [
        n.definitionId,
        " ",
        /* @__PURE__ */ a.jsx("small", { children: n.definitionVersionId })
      ] }),
      /* @__PURE__ */ a.jsx("dt", { children: "Created" }),
      /* @__PURE__ */ a.jsx("dd", { children: ot(n.createdAt) }),
      /* @__PURE__ */ a.jsx("dt", { children: "Started" }),
      /* @__PURE__ */ a.jsx("dd", { children: ot(n.startedAt) }),
      /* @__PURE__ */ a.jsx("dt", { children: "Completed" }),
      /* @__PURE__ */ a.jsx("dd", { children: ot(n.completedAt) }),
      /* @__PURE__ */ a.jsx("dt", { children: "Correlation" }),
      /* @__PURE__ */ a.jsx("dd", { children: n.correlationId || "None" })
    ] }),
    r === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Loading instance details..." }) : null,
    r === "failed" ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(it, { size: 16 }),
      " ",
      i
    ] }) : null,
    r === "ready" && o ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsx(Tx, { activities: o.activities, selectedEvidenceId: s, onSelectEvidence: c }),
      /* @__PURE__ */ a.jsx(zx, { incidents: o.incidents, selectedEvidenceId: s, onSelectEvidence: c }),
      /* @__PURE__ */ a.jsx(Rx, { details: o, graphNodeIds: u })
    ] }) : null
  ] }) : /* @__PURE__ */ a.jsx("aside", { className: "wf-instance-inspector", children: /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Select a workflow instance to inspect activity history." }) });
}
function Tx({ activities: e, selectedEvidenceId: t = null, onSelectEvidence: n }) {
  return /* @__PURE__ */ a.jsxs("section", { className: "wf-instance-section", children: [
    /* @__PURE__ */ a.jsx("h4", { children: "Activity history" }),
    e.length === 0 ? /* @__PURE__ */ a.jsx("p", { children: "No activity executions recorded yet." }) : null,
    e.length > 0 ? /* @__PURE__ */ a.jsx("div", { className: "wf-instance-activity-list", children: e.map((o) => /* @__PURE__ */ a.jsxs(
      "button",
      {
        type: "button",
        className: "wf-instance-activity",
        "data-selected": o.activityExecutionId === t,
        onClick: () => n?.(o.activityExecutionId),
        children: [
          /* @__PURE__ */ a.jsx("span", { children: /* @__PURE__ */ a.jsx(Yn, { status: o.status, subStatus: o.subStatus }) }),
          /* @__PURE__ */ a.jsx("strong", { children: Ri(o.activityType) ?? o.activityType }),
          /* @__PURE__ */ a.jsx("small", { children: o.activityExecutionId }),
          /* @__PURE__ */ a.jsx("time", { children: ot(o.scheduledAt) })
        ]
      },
      o.activityExecutionId
    )) }) : null
  ] });
}
function zx({ incidents: e, selectedEvidenceId: t = null, onSelectEvidence: n }) {
  return /* @__PURE__ */ a.jsxs("section", { className: "wf-instance-section", children: [
    /* @__PURE__ */ a.jsx("h4", { children: "Incidents" }),
    e.length === 0 ? /* @__PURE__ */ a.jsx("p", { children: "No incidents recorded." }) : null,
    e.map((o) => /* @__PURE__ */ a.jsxs(
      "button",
      {
        type: "button",
        className: "wf-instance-incident",
        "data-severity": o.severity.toLowerCase(),
        "data-selected": o.incidentId === t,
        onClick: () => n?.(o.incidentId),
        children: [
          /* @__PURE__ */ a.jsx("strong", { children: o.failureType }),
          /* @__PURE__ */ a.jsxs("span", { children: [
            o.status,
            " · ",
            o.severity
          ] }),
          /* @__PURE__ */ a.jsx("p", { children: o.message })
        ]
      },
      o.incidentId
    ))
  ] });
}
function Rx({ details: e, graphNodeIds: t }) {
  if (!t) return null;
  const n = new Map(e.activities.map((i) => [i.activityExecutionId, i])), o = e.activities.filter((i) => !t.has(ha(i))), r = e.incidents.filter((i) => {
    const s = i.activityExecutionId ? n.get(i.activityExecutionId) : null, c = i.executableNodeId ?? (s ? ha(s) : "");
    return !c || !t.has(c);
  });
  return o.length === 0 && r.length === 0 ? null : /* @__PURE__ */ a.jsxs("section", { className: "wf-instance-section", children: [
    /* @__PURE__ */ a.jsx("h4", { children: "Unmatched runtime evidence" }),
    /* @__PURE__ */ a.jsxs("div", { className: "wf-instance-unmatched-list", children: [
      o.map((i) => /* @__PURE__ */ a.jsxs("div", { className: "wf-instance-unmatched", children: [
        /* @__PURE__ */ a.jsx("strong", { children: Ri(i.activityType) ?? i.activityType }),
        /* @__PURE__ */ a.jsx("small", { children: i.activityExecutionId })
      ] }, `activity-${i.activityExecutionId}`)),
      r.map((i) => /* @__PURE__ */ a.jsxs("div", { className: "wf-instance-unmatched", children: [
        /* @__PURE__ */ a.jsx("strong", { children: i.failureType }),
        /* @__PURE__ */ a.jsx("small", { children: i.incidentId })
      ] }, `incident-${i.incidentId}`))
    ] })
  ] });
}
function Yn({ status: e, subStatus: t }) {
  return /* @__PURE__ */ a.jsx("span", { className: "wf-status-badge", "data-status": e.toLowerCase(), children: t ? `${e} · ${t}` : e });
}
function Lx(e, t) {
  const n = e.state.rootActivity;
  if (!n) return /* @__PURE__ */ new Set();
  const o = t.find((i) => i.activityVersionId === n.activityVersionId);
  if ($i(n, o) === "unsupported") return /* @__PURE__ */ new Set([n.nodeId]);
  const r = kn(n, []);
  return new Set(r?.slot.activities.map((i) => i.nodeId) ?? [n.nodeId]);
}
function ha(e) {
  return e.authoredActivityId || e.executableNodeId;
}
function Vx({ page: e, pageSize: t, totalCount: n, onPageChange: o, onPageSizeChange: r }) {
  const i = zl(n, t), s = n === 0 ? 0 : (e - 1) * t + 1, c = Math.min(e * t, n);
  return /* @__PURE__ */ a.jsxs("div", { className: "wf-pagination", "aria-label": "Workflow definition pagination", children: [
    /* @__PURE__ */ a.jsxs("span", { className: "wf-pagination-summary", "aria-live": "polite", children: [
      "Showing ",
      s,
      "-",
      c,
      " of ",
      n
    ] }),
    /* @__PURE__ */ a.jsxs("label", { className: "wf-page-size", children: [
      "Rows",
      /* @__PURE__ */ a.jsx("select", { value: t, onChange: (u) => r(Number(u.target.value)), children: wx.map((u) => /* @__PURE__ */ a.jsx("option", { value: u, children: u }, u)) })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "wf-page-controls", children: [
      /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => o(e - 1), disabled: e <= 1, "aria-label": "Previous page", title: "Previous page", children: [
        /* @__PURE__ */ a.jsx(Ho, { size: 14 }),
        " Previous"
      ] }),
      /* @__PURE__ */ a.jsxs("span", { children: [
        "Page ",
        e,
        " of ",
        i
      ] }),
      /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => o(e + 1), disabled: e >= i, "aria-label": "Next page", title: "Next page", children: [
        "Next ",
        /* @__PURE__ */ a.jsx(Tt, { size: 14 })
      ] })
    ] })
  ] });
}
function Hx(e, t, n) {
  return e.slice((t - 1) * n, t * n);
}
function zl(e, t) {
  return Math.max(1, Math.ceil(e / t));
}
function Zt(e, t) {
  return e.promptActions.list().find((n) => n.id === t) ?? null;
}
function Mt(e, t, n) {
  const o = t.createPrompt(n);
  o && e.dispatchPrompt(o);
}
function Ox(e) {
  const t = Fo(e, "flowchart"), n = Fo(e, "sequence"), o = [
    { value: t?.activityVersionId ?? "kind:flowchart", label: "Flowchart" },
    { value: n?.activityVersionId ?? "kind:sequence", label: "Sequence" }
  ], r = /* @__PURE__ */ new Map();
  for (const s of e.filter(Ol)) {
    if (Wx(s)) continue;
    const c = s.category || "Uncategorized";
    r.set(c, [...r.get(c) ?? [], s]);
  }
  const i = Array.from(r.entries()).sort(([s], [c]) => s.localeCompare(c)).map(([s, c]) => ({
    name: s,
    activities: c.sort((u, l) => Ie(u).localeCompare(Ie(l)))
  }));
  return { compositeRoots: o, otherCategories: i };
}
function Bx(e, t) {
  return e.rootActivityVersionId ?? Fo(t, e.rootKind)?.activityVersionId ?? `kind:${e.rootKind}`;
}
function Fx(e, t) {
  return e.rootActivityVersionId ?? Fo(t, e.rootKind)?.activityVersionId ?? null;
}
function Fo(e, t) {
  return e.find((n) => Rl(n) === t);
}
function Rl(e) {
  return e ? Vl(e) ? "flowchart" : Hl(e) ? "sequence" : null : null;
}
function Ll(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = n.category?.trim() || "Uncategorized";
    t.set(o, [...t.get(o) ?? [], n]);
  }
  return Array.from(t.entries()).sort(([n], [o]) => n.localeCompare(o)).map(([n, o]) => ({
    category: n,
    activities: o.sort((r, i) => Ie(r).localeCompare(Ie(i)))
  }));
}
function Wx(e) {
  return Vl(e) || Hl(e);
}
function Vl(e) {
  return Ie(e) === "Flowchart" || e.activityTypeKey.endsWith(".Flowchart");
}
function Hl(e) {
  return Ie(e) === "Sequence" || e.activityTypeKey.endsWith(".Sequence");
}
function Ol(e) {
  return e.isBrowsable !== !1 && e.browsable !== !1;
}
function Xx(e) {
  return e.sourceKind || e.sourceId || e.sourceVersion ? [e.sourceKind, e.sourceId, e.sourceVersion].filter(Boolean).join(" / ") : e.definitionId;
}
function Yx(e) {
  return qx(e.rootActivityType) || e.rootActivityType;
}
function qx(e) {
  return e.split(".").filter(Boolean).at(-1) ?? e;
}
function Zx(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    vo(t, n.typeName, n), vo(t, n.name, n), vo(t, n.displayName, n);
    const o = n.typeName.split(".").filter(Boolean).at(-1);
    vo(t, o, n);
  }
  return t;
}
function Kx(e, t, n) {
  const o = t.get(e.activityVersionId);
  return n.get(Nn(o?.activityTypeKey)) ?? n.get(Nn(Ri(o?.activityTypeKey))) ?? n.get(Nn(o?.displayName)) ?? n.get(Nn(e.activityVersionId)) ?? null;
}
function vo(e, t, n) {
  const o = Nn(t);
  o && !e.has(o) && e.set(o, n);
}
function Nn(e) {
  return e?.trim().toLowerCase() ?? "";
}
function Ri(e) {
  return e?.split(".").filter(Boolean).at(-1);
}
function pa(e, t, n, o) {
  const r = rr();
  if (!r) return t;
  const i = r.getItem(e);
  if (i == null) return t;
  const s = Number(i);
  return Number.isFinite(s) ? jo(s, n, o) : t;
}
function ga(e, t) {
  const n = rr();
  if (!n) return t;
  const o = n.getItem(e);
  return o === "true" ? !0 : o === "false" ? !1 : t;
}
function Ux() {
  const e = rr();
  if (!e) return null;
  const t = e.getItem($l);
  return t === "palette" || t === "inspector" ? t : null;
}
function rr() {
  if (typeof window > "u") return null;
  const e = window.localStorage;
  return e && typeof e.getItem == "function" && typeof e.setItem == "function" && typeof e.removeItem == "function" ? e : null;
}
function vn(e, t) {
  const n = rr();
  n && (t == null ? n.removeItem(e) : n.setItem(e, t));
}
function jo(e, t, n) {
  return Math.min(n, Math.max(t, Math.round(e)));
}
function Gx({
  context: e,
  definitionId: t,
  ai: n,
  propertyEditors: o,
  expressionEditors: r,
  workflowDesignerPanels: i,
  onBack: s
}) {
  const [c, u] = Y(null), [l, f] = Y(null), [d, h] = Y([]), [p, g] = Y([]), [x, w] = Y(ko), [y, N] = Y("loading"), [m, v] = Y([]), [E, C] = Y([]), [k, _] = Y([]), [P, W] = Y(null), [A, z] = Y(null), [H, b] = Y(null), [j, I] = Y(null), [D, T] = Y(""), [$, V] = Y(""), [F, B] = Y("idle"), [U, Z] = Y(null), [ee, se] = Y(!1), [J, L] = Y(null), [q, ie] = Y(() => /* @__PURE__ */ new Set()), [oe, K] = Y(() => pa(sa, bx, mn, yn)), [Q, ae] = Y(() => pa(aa, Sx, xn, wn)), [R, G] = Y(() => ga(ca, !1)), [de, ye] = Y(() => ga(la, !1)), [pe, _e] = Y(Ux), [Oe, pt] = Y("activities"), [Qe, et] = Y("inspector"), ve = ce(null), De = ce(null), Te = ce(""), Be = ce(0), qn = ce(Promise.resolve()), at = ce(null), gt = ce(!1), mt = l?.state.rootActivity ?? null, yt = me(() => new Map(d.map((S) => [S.activityVersionId, S])), [d]), Zn = me(() => Zx(p), [p]), ze = me(() => vl(mt, m), [mt, m]), Kn = $i(ze, ze ? yt.get(ze.activityVersionId) : void 0), be = !!ze && Kn === "unsupported", Fe = me(() => be ? null : kn(mt, m), [mt, m, be]), Ut = me(() => Ll(d), [d]), ke = me(() => be && ze?.nodeId === A ? ze : Fe?.slot.activities.find((S) => S.nodeId === A) ?? null, [be, Fe, ze, A]), Gt = me(
    () => ke ? Kx(ke, yt, Zn) : null,
    [yt, Zn, ke]
  ), Jt = ke ? Ge(ke) : [], je = Kn === "flowchart" && Fe?.slot.mode === "flowchart", xt = !mt || !be, ct = F !== "idle", ir = !!l?.state.rootActivity && !ct, Un = Zt(n, "weaver.workflows.find-draft-risks"), Gn = Zt(n, "weaver.workflows.propose-update");
  re(() => {
    vn(sa, String(oe));
  }, [oe]), re(() => {
    vn(aa, String(Q));
  }, [Q]), re(() => {
    vn(ca, String(R));
  }, [R]), re(() => {
    vn(la, String(de));
  }, [de]), re(() => {
    vn($l, pe);
  }, [pe]), re(() => {
    if (!pe) return;
    const S = (M) => {
      M.key === "Escape" && _e(null);
    };
    return window.addEventListener("keydown", S), () => window.removeEventListener("keydown", S);
  }, [pe]);
  const Qt = ge(async () => {
    T(""), N("loading");
    const [S, M, O, X] = await Promise.all([
      my(e, t),
      Pi(e),
      Ay(e).then(
        (fe) => ({ ok: !0, descriptors: fe }),
        () => ({ ok: !1, descriptors: [] })
      ),
      My(e).then(
        (fe) => ({ ok: !0, descriptors: fe }),
        () => ({ ok: !1, descriptors: ko })
      )
    ]), ne = S.draft ?? null;
    u(S), Te.current = ne ? vt(ne) : "", f(ne), h(M.activities ?? []), g(O.descriptors), w(X.descriptors.length > 0 ? X.descriptors : ko), N(O.ok ? "ready" : "failed"), v([]), z(null);
  }, [e, t]);
  re(() => {
    Qt().catch((S) => T(S instanceof Error ? S.message : String(S)));
  }, [Qt]), re(() => {
    ie((S) => {
      let M = !1;
      const O = new Set(S);
      for (const X of Ut)
        O.has(X.category) || (O.add(X.category), M = !0);
      return M ? O : S;
    });
  }, [Ut]), re(() => {
    if (!ze) {
      C([]), _([]);
      return;
    }
    const S = be ? si(ze, d, l?.layout ?? []) : Fe ? bl(Fe, d, l?.layout ?? []) : { nodes: [], edges: [] };
    C(S.nodes), _(S.edges);
  }, [d, l?.layout, be, Fe, ze]);
  const sr = (S) => {
    f((M) => M && { ...M, state: { ...M.state, rootActivity: S } });
  }, en = ge((S, M) => {
    if (l?.state.rootActivity && be)
      return;
    const O = ea(S, xa(S));
    if (!l?.state.rootActivity) {
      sr(O), z(O.nodeId);
      return;
    }
    if (!Fe) {
      if (!Ge(O)[0]) {
        V(""), T("The current root activity does not accept child activities. Drop Flowchart or Sequence to wrap it in a composite root.");
        return;
      }
      f((ne) => {
        if (!ne?.state.rootActivity) return ne;
        const fe = ne.state.rootActivity, le = ai(O, [], [fe]), he = M ? [
          ...ne.layout.filter((Ee) => Ee.nodeId !== fe.nodeId),
          {
            nodeId: fe.nodeId,
            x: Math.round(M.x),
            y: Math.round(M.y)
          }
        ] : ne.layout;
        return {
          ...ne,
          layout: he,
          state: {
            ...ne.state,
            rootActivity: le
          }
        };
      }), z(l.state.rootActivity.nodeId), T(""), V(`Wrapped root in ${Ie(S)}`);
      return;
    }
    f((X) => {
      if (!X?.state.rootActivity) return X;
      const ne = kn(X.state.rootActivity, m);
      if (!ne) return X;
      const fe = ai(X.state.rootActivity, m, [...ne.slot.activities, O]), le = M ? [
        ...X.layout.filter((he) => he.nodeId !== O.nodeId),
        {
          nodeId: O.nodeId,
          x: Math.round(M.x),
          y: Math.round(M.y)
        }
      ] : X.layout;
      return {
        ...X,
        layout: le,
        state: {
          ...X.state,
          rootActivity: fe
        }
      };
    }), z(O.nodeId);
  }, [l?.state.rootActivity, m, be, Fe]), Dt = ge((S, M) => {
    const O = ea(S, xa(S)), X = {
      id: O.nodeId,
      type: "workflowActivity",
      position: M,
      selected: !0,
      data: {
        label: Ie(S),
        activityVersionId: S.activityVersionId,
        activityTypeKey: S.activityTypeKey,
        category: S.category,
        executionType: S.executionType,
        icon: ci(S),
        childSlots: Ge(O),
        acceptsInbound: String(S.executionType ?? "").toLowerCase() !== "trigger",
        sourcePorts: Cl(O, S)
      }
    };
    return { activityNode: O, node: X };
  }, []), Re = ge((S, M, O = []) => {
    be || f((X) => {
      if (!X) return X;
      const ne = zy(X.layout, S), fe = X.state.rootActivity;
      if (!fe) return { ...X, layout: ne };
      const le = kn(fe, m);
      if (!le) return { ...X, layout: ne };
      const he = $y(le, S, M, O), Ee = le.slot.mode === "flowchart" ? Ty(he, M) : he;
      return {
        ...X,
        layout: ne,
        state: {
          ...X.state,
          rootActivity: Sl(fe, m, Ee)
        }
      };
    });
  }, [m, be]), tn = ge((S, M) => {
    if (!ve.current) return null;
    const O = ve.current.getBoundingClientRect();
    return P ? P.screenToFlowPosition({ x: S, y: M }) : {
      x: S - O.left,
      y: M - O.top
    };
  }, [P]), nn = ge((S, M) => document.elementFromPoint(S, M)?.closest(".react-flow__edge")?.getAttribute("data-id") ?? null, []), on = ge((S, M, O) => {
    const X = E.find((Ae) => Ae.id === M.source), ne = E.find((Ae) => Ae.id === M.target), fe = X && ne ? r0(X, ne) : X ? wa(X) : O, le = Dt(S, fe), Ee = [...E.map((Ae) => Ae.selected ? { ...Ae, selected: !1 } : Ae), le.node], wt = Yy(k, M, le.node.id);
    C(Ee), _(wt), z(le.node.id), Re(Ee, wt, [le.activityNode]);
  }, [Re, Dt, k, E]), Pt = ge((S, M, O) => {
    if (!xt || !ve.current) return !1;
    const X = ve.current.getBoundingClientRect();
    if (!(M >= X.left && M <= X.right && O >= X.top && O <= X.bottom)) return !1;
    const fe = tn(M, O);
    if (!fe) return !1;
    if (je) {
      const le = nn(M, O), he = le ? k.find((Ee) => Ee.id === le) : void 0;
      if (he)
        return on(S, he, fe), !0;
    }
    return en(S, fe), !0;
  }, [en, xt, k, nn, je, on, tn]);
  re(() => {
    const S = (O) => {
      const X = at.current;
      if (!X) return;
      Math.hypot(O.clientX - X.startX, O.clientY - X.startY) >= yx && (X.dragging = !0);
    }, M = (O) => {
      const X = at.current;
      if (at.current = null, !X?.dragging || !ve.current) return;
      const ne = ve.current.getBoundingClientRect();
      O.clientX >= ne.left && O.clientX <= ne.right && O.clientY >= ne.top && O.clientY <= ne.bottom && (gt.current = !0, window.setTimeout(() => {
        gt.current = !1;
      }, 0), Pt(X.activity, O.clientX, O.clientY));
    };
    return window.addEventListener("pointermove", S), window.addEventListener("pointerup", M), window.addEventListener("pointercancel", M), () => {
      window.removeEventListener("pointermove", S), window.removeEventListener("pointerup", M), window.removeEventListener("pointercancel", M);
    };
  }, [P, Pt]);
  const ar = (S, M) => {
    S.dataTransfer.setData(ia, M.activityVersionId), S.dataTransfer.setData("text/plain", M.activityVersionId), S.dataTransfer.effectAllowed = "copy";
  }, cr = (S, M) => {
    S.clientX === 0 && S.clientY === 0 || Pt(M, S.clientX, S.clientY) && (gt.current = !0, window.setTimeout(() => {
      gt.current = !1;
    }, 0));
  }, lr = (S, M) => {
    S.button === 0 && (at.current = {
      activity: M,
      startX: S.clientX,
      startY: S.clientY,
      dragging: !1
    });
  }, Jn = (S) => {
    gt.current || xt && en(S);
  }, rn = (S) => {
    if (!xt) {
      S.dataTransfer.dropEffect = "none";
      return;
    }
    if (S.preventDefault(), S.dataTransfer.dropEffect = "copy", !je) return;
    const M = nn(S.clientX, S.clientY);
    I(M);
  }, sn = (S) => {
    if (!ve.current) return;
    const M = S.relatedTarget;
    M && ve.current.contains(M) || I(null);
  }, Qn = (S) => {
    if (S.preventDefault(), I(null), !xt) return;
    const M = S.dataTransfer.getData(ia) || S.dataTransfer.getData("text/plain"), O = yt.get(M);
    O && Pt(O, S.clientX, S.clientY);
  }, ur = () => {
    if (!je) return;
    const S = ve.current?.getBoundingClientRect();
    S && b({
      kind: "fromEmpty",
      clientX: S.left + S.width / 2,
      clientY: S.top + S.height / 2
    });
  }, an = ge(async (S, M) => {
    const O = async () => {
      const ne = ++Be.current, fe = vt(S);
      T("");
      try {
        const le = await Sy(e, S), he = vt(le);
        return Te.current = he, f((Ee) => !Ee || Ee.id !== le.id ? Ee : vt(Ee) === fe ? le : { ...Ee, validationErrors: le.validationErrors }), ne === Be.current && V(M), le;
      } catch (le) {
        throw ne === Be.current && (V(""), T(le instanceof Error ? le.message : String(le))), le;
      }
    }, X = qn.current.then(O, O);
    return qn.current = X.catch(() => {
    }), X;
  }, [e]);
  re(() => {
    if (!ee || !l || vt(l) === Te.current) return;
    V("Autosaving...");
    const M = window.setTimeout(() => {
      an(l, "Autosaved").catch(() => {
      });
    }, xx);
    return () => window.clearTimeout(M);
  }, [ee, l, an]);
  const dr = async () => {
    if (!(!l || ct)) {
      B("saving"), V("Saving...");
      try {
        await an(l, "Saved");
      } catch {
      } finally {
        B("idle");
      }
    }
  }, fr = async () => {
    if (!(!l || ct)) {
      B("promoting"), V("Promoting...");
      try {
        const S = await Ny(e, l.id), M = await Ey(e, S.versionId);
        L(M.artifactId), V(`Published ${M.artifactVersion}`), await Qt();
      } catch (S) {
        V(""), T(S instanceof Error ? S.message : String(S));
      } finally {
        B("idle");
      }
    }
  }, hr = async () => {
    if (!l?.state.rootActivity || ct) return;
    const S = l, M = vt(S);
    Z(null), V("Preparing test run...");
    try {
      B("testRunPreparing"), V("Preparing test run...");
      const O = s0(S);
      B("testRunStarting"), V("Starting test run...");
      const X = await Cy(e, {
        definitionId: S.definitionId,
        snapshotId: O,
        state: S.state
      });
      Z({ draftSignature: M, view: X }), V(Fl(X) ? "Test run rejected" : "Test run dispatched");
    } catch (O) {
      V(""), T(O instanceof Error ? O.message : String(O));
    } finally {
      B("idle");
    }
  }, eo = (S) => {
    const M = be ? S.filter((O) => O.type === "select") : S;
    M.length !== 0 && C((O) => Pc(M, O));
  }, pr = (S) => {
    be || _((M) => $c(S, M));
  }, cn = (S) => !S.source || !S.target || S.source === S.target || !je ? !1 : !S.targetHandle, gr = (S) => {
    if (!l?.state.rootActivity || !Fe || !je || !cn(S)) return;
    const M = Bo(S.source, S.target, S.sourceHandle ?? "Done", S.targetHandle ?? void 0), O = zc(M, k);
    _(O), Re(E, O);
  }, mr = () => {
    Re(E, k);
  }, yr = (S, M) => {
    if (!M.nodeId || M.handleType === "target") {
      De.current = null;
      return;
    }
    De.current = {
      nodeId: M.nodeId,
      handleId: M.handleId ?? null
    };
  }, xr = (S) => {
    const M = De.current;
    if (De.current = null, !M || !je || S.target?.closest(".react-flow__handle, .react-flow__node")) return;
    const X = i0(S);
    b({
      kind: "fromPort",
      sourceNodeId: M.nodeId,
      sourceHandleId: M.handleId,
      clientX: X.x,
      clientY: X.y
    });
  }, wr = (S, M) => {
    if (!je || !cn(M)) return;
    const O = lg(S, {
      ...M,
      sourceHandle: M.sourceHandle ?? "Done",
      targetHandle: M.targetHandle ?? void 0
    }, k, { shouldReplaceId: !1 });
    _(O), Re(E, O);
  }, vr = (S) => {
    if (be || S.length === 0) return;
    const M = new Set(S.map((ne) => ne.id)), O = E.filter((ne) => !M.has(ne.id)), X = k.filter((ne) => !M.has(ne.source) && !M.has(ne.target));
    C(O), _(X), A && M.has(A) && z(null), Re(O, X);
  }, to = (S) => {
    if (be || S.length === 0) return;
    const M = new Set(S.map((X) => X.id)), O = k.filter((X) => !M.has(X.id));
    _(O), Re(E, O);
  }, no = ge((S) => {
    if (be) return;
    const M = k.filter((O) => O.id !== S);
    _(M), Re(E, M);
  }, [Re, k, be, E]), oo = ge((S, M, O) => {
    je && b({ kind: "spliceEdge", edgeId: S, clientX: M, clientY: O });
  }, [je]), br = (S) => {
    const M = H;
    if (!M) return;
    b(null);
    const O = tn(M.clientX, M.clientY) ?? { x: 0, y: 0 };
    if (M.kind === "fromEmpty") {
      const ne = Dt(S, O), le = [...E.map((he) => he.selected ? { ...he, selected: !1 } : he), ne.node];
      C(le), z(ne.node.id), Re(le, k, [ne.activityNode]);
      return;
    }
    if (M.kind === "fromPort") {
      const ne = E.find((Ae) => Ae.id === M.sourceNodeId), fe = ne ? wa(ne) : O, le = Dt(S, fe), Ee = [...E.map((Ae) => Ae.selected ? { ...Ae, selected: !1 } : Ae), le.node], wt = [...k, Bo(M.sourceNodeId, le.node.id, M.sourceHandleId ?? "Done")];
      C(Ee), _(wt), z(le.node.id), Re(Ee, wt, [le.activityNode]);
      return;
    }
    const X = k.find((ne) => ne.id === M.edgeId);
    X && on(S, X, O);
  }, Sr = me(() => ({
    highlightedEdgeId: j,
    deleteEdge: no,
    requestInsertActivity: oo
  }), [no, j, oo]), Nr = (S, M, O) => {
    v((X) => [...X, { ownerNodeId: S.nodeId, slotId: M, label: O }]), z(null);
  }, Er = ge((S) => {
    f((M) => {
      const O = M?.state.rootActivity;
      return !M || !O ? M : {
        ...M,
        state: {
          ...M.state,
          rootActivity: Nl(O, S.nodeId, () => S)
        }
      };
    });
  }, []), Cr = (S) => {
    ie((M) => {
      const O = new Set(M);
      return O.has(S) ? O.delete(S) : O.add(S), O;
    });
  }, ro = (S) => {
    _e((M) => M === S ? null : M), S === "palette" ? G((M) => !M) : ye((M) => !M);
  }, ln = (S) => {
    S === "palette" ? G(!1) : ye(!1), _e((M) => M === S ? null : S);
  }, io = (S, M) => {
    _e(null), S === "palette" ? (G(!1), K((O) => jo(O + M, mn, yn))) : (ye(!1), ae((O) => jo(O + M, xn, wn)));
  }, un = (S, M) => {
    M.preventDefault(), _e(null), S === "palette" ? G(!1) : ye(!1);
    const O = M.clientX, X = S === "palette" ? oe : Q, ne = S === "palette" ? mn : xn, fe = S === "palette" ? yn : wn;
    document.body.classList.add("wf-side-panel-resizing");
    const le = (Ee) => {
      const wt = S === "palette" ? Ee.clientX - O : O - Ee.clientX, Ae = jo(X + wt, ne, fe);
      S === "palette" ? K(Ae) : ae(Ae);
    }, he = () => {
      document.body.classList.remove("wf-side-panel-resizing"), window.removeEventListener("pointermove", le), window.removeEventListener("pointerup", he), window.removeEventListener("pointercancel", he);
    };
    window.addEventListener("pointermove", le), window.addEventListener("pointerup", he), window.addEventListener("pointercancel", he);
  }, so = (S, M) => {
    M.key === "ArrowLeft" ? (M.preventDefault(), io(S, S === "palette" ? -wo : wo)) : M.key === "ArrowRight" ? (M.preventDefault(), io(S, S === "palette" ? wo : -wo)) : M.key === "Home" ? (M.preventDefault(), S === "palette" ? K(mn) : ae(xn)) : M.key === "End" && (M.preventDefault(), S === "palette" ? K(yn) : ae(wn));
  };
  if (!c || !l)
    return /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: D || "Loading workflow editor..." });
  const kr = [
    "wf-editor-body",
    R ? "palette-collapsed" : "",
    de ? "inspector-collapsed" : "",
    pe === "palette" ? "palette-maximized" : "",
    pe === "inspector" ? "inspector-maximized" : ""
  ].filter(Boolean).join(" "), dn = {
    "--wf-palette-width": `${R ? ua : oe}px`,
    "--wf-inspector-width": `${de ? ua : Q}px`
  }, ao = !R && pe !== "inspector", co = !de && pe !== "palette", fn = U?.draftSignature === vt(l) ? U.view : null, Wl = {
    definition: c.definition,
    draft: l,
    selectedActivity: ke,
    selectedActivityDescriptor: Gt,
    selectedActivitySlots: Jt,
    catalog: d,
    currentScopeOwner: ze,
    frames: m
  }, Li = i.map((S) => {
    const M = S.component;
    return {
      id: S.id,
      title: S.title,
      side: S.side,
      order: S.order ?? 500,
      icon: null,
      render: () => /* @__PURE__ */ a.jsx(M, { context: Wl })
    };
  }), Ir = [
    {
      id: "activities",
      title: "Activities",
      order: 0,
      icon: /* @__PURE__ */ a.jsx(gl, { size: 15 }),
      render: Xl
    },
    ...Li.filter((S) => S.side === "left")
  ].sort(ya), jr = [
    {
      id: "inspector",
      title: "Inspector",
      order: 0,
      icon: /* @__PURE__ */ a.jsx(yl, { size: 15 }),
      render: Yl
    },
    ...Li.filter((S) => S.side === "right")
  ].sort(ya), Vi = Ir.find((S) => S.id === Oe) ?? Ir[0], Hi = jr.find((S) => S.id === Qe) ?? jr[0];
  function Xl() {
    return /* @__PURE__ */ a.jsx("div", { className: "wf-palette-list", role: "tree", "aria-label": "Available activities", children: Ut.map((S) => {
      const M = q.has(S.category);
      return /* @__PURE__ */ a.jsxs("div", { className: "wf-palette-category", children: [
        /* @__PURE__ */ a.jsxs(
          "button",
          {
            type: "button",
            className: "wf-palette-category-toggle",
            role: "treeitem",
            "aria-expanded": M,
            onClick: () => Cr(S.category),
            children: [
              M ? /* @__PURE__ */ a.jsx(ay, { size: 14 }) : /* @__PURE__ */ a.jsx(Tt, { size: 14 }),
              /* @__PURE__ */ a.jsx("span", { children: S.category }),
              /* @__PURE__ */ a.jsx("small", { children: S.activities.length })
            ]
          }
        ),
        M ? /* @__PURE__ */ a.jsx("div", { className: "wf-palette-activities", role: "group", children: S.activities.map((O) => {
          const X = O.description?.trim(), ne = X ? `wf-palette-description-${O.activityVersionId}` : void 0, fe = Ie(O), le = ci(O);
          return /* @__PURE__ */ a.jsxs(
            "button",
            {
              type: "button",
              className: "wf-palette-activity",
              role: "treeitem",
              draggable: !0,
              title: X || Ie(O),
              "aria-describedby": ne,
              onClick: () => Jn(O),
              onDragStart: (he) => ar(he, O),
              onDragEnd: (he) => cr(he, O),
              onPointerDown: (he) => lr(he, O),
              children: [
                /* @__PURE__ */ a.jsx("span", { className: "wf-activity-icon", "data-icon": le, "aria-hidden": "true", children: Bl(le) }),
                /* @__PURE__ */ a.jsxs("span", { className: "wf-palette-activity-text", children: [
                  /* @__PURE__ */ a.jsx("strong", { children: fe }),
                  X ? /* @__PURE__ */ a.jsx("small", { id: ne, children: X }) : null
                ] }),
                /* @__PURE__ */ a.jsx(cy, { className: "wf-palette-activity-grip", size: 14, "aria-hidden": "true" })
              ]
            },
            O.activityVersionId
          );
        }) }) : null
      ] }, S.category);
    }) });
  }
  function Yl() {
    return ke ? /* @__PURE__ */ a.jsxs("div", { className: "wf-inspector-content", children: [
      /* @__PURE__ */ a.jsx("h3", { children: E.find((S) => S.id === ke.nodeId)?.data.label ?? ke.nodeId }),
      /* @__PURE__ */ a.jsxs("dl", { children: [
        /* @__PURE__ */ a.jsx("dt", { children: "Node ID" }),
        /* @__PURE__ */ a.jsx("dd", { children: ke.nodeId }),
        /* @__PURE__ */ a.jsx("dt", { children: "Activity type" }),
        /* @__PURE__ */ a.jsx("dd", { children: Gt?.typeName ?? yt.get(ke.activityVersionId)?.activityTypeKey ?? "Unknown" }),
        /* @__PURE__ */ a.jsx("dt", { children: "Activity version" }),
        /* @__PURE__ */ a.jsx("dd", { children: ke.activityVersionId })
      ] }),
      /* @__PURE__ */ a.jsx(
        lx,
        {
          activity: ke,
          descriptor: Gt,
          editors: o,
          expressionEditors: r,
          expressionDescriptors: x,
          descriptorStatus: y,
          onChange: Er
        }
      ),
      Jt.length > 0 ? /* @__PURE__ */ a.jsxs("div", { className: "wf-slot-list", children: [
        /* @__PURE__ */ a.jsx("span", { children: "Embedded slots" }),
        Jt.map((S) => /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => Nr(ke, S.id, `${E.find((M) => M.id === ke.nodeId)?.data.label ?? ke.nodeId} / ${S.label}`), children: [
          S.label,
          /* @__PURE__ */ a.jsxs("small", { children: [
            S.activities.length,
            " activit",
            S.activities.length === 1 ? "y" : "ies"
          ] })
        ] }, S.id))
      ] }) : /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "This activity does not expose embedded child slots." })
    ] }) : /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "Select an activity to inspect properties and embedded slots." });
  }
  return /* @__PURE__ */ a.jsxs("section", { className: "wf-editor", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-editor-top", children: [
      /* @__PURE__ */ a.jsx("button", { type: "button", className: "wf-link-button", onClick: s, children: "Definitions" }),
      /* @__PURE__ */ a.jsx(Tt, { size: 14 }),
      /* @__PURE__ */ a.jsx("strong", { children: c.definition.name }),
      /* @__PURE__ */ a.jsx("span", { className: "wf-chip", children: "Draft" }),
      $ ? /* @__PURE__ */ a.jsxs("span", { className: "wf-status", children: [
        /* @__PURE__ */ a.jsx(Wn, { size: 13 }),
        " ",
        $
      ] }) : null,
      /* @__PURE__ */ a.jsxs("div", { className: "wf-editor-actions", children: [
        /* @__PURE__ */ a.jsxs("label", { className: "wf-autosave-toggle", children: [
          /* @__PURE__ */ a.jsx("input", { type: "checkbox", checked: ee, onChange: (S) => se(S.target.checked) }),
          /* @__PURE__ */ a.jsx("span", { children: "Autosave" })
        ] }),
        Un ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => Mt(n, Un, { definition: c.definition, draft: l }), children: [
          /* @__PURE__ */ a.jsx(At, { size: 15 }),
          " Risks"
        ] }) : null,
        Gn ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => Mt(n, Gn, { definition: c.definition, draft: l }), children: [
          /* @__PURE__ */ a.jsx(At, { size: 15 }),
          " Propose"
        ] }) : null,
        /* @__PURE__ */ a.jsxs("button", { type: "button", disabled: ct, onClick: () => {
          dr();
        }, children: [
          /* @__PURE__ */ a.jsx(ly, { size: 15 }),
          " Save"
        ] }),
        /* @__PURE__ */ a.jsxs("button", { type: "button", disabled: ct, onClick: () => {
          fr();
        }, children: [
          /* @__PURE__ */ a.jsx(ml, { size: 15 }),
          " Promote"
        ] }),
        /* @__PURE__ */ a.jsxs(
          "button",
          {
            type: "button",
            disabled: !ir,
            title: l.state.rootActivity ? "Run a transient test of the current design" : "Add a root activity before running",
            onClick: () => {
              hr();
            },
            children: [
              /* @__PURE__ */ a.jsx(Mi, { size: 15 }),
              " Run"
            ]
          }
        )
      ] })
    ] }),
    D ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(it, { size: 16 }),
      " ",
      D
    ] }) : null,
    fn ? /* @__PURE__ */ a.jsx(o0, { testRun: fn }) : null,
    /* @__PURE__ */ a.jsxs("div", { className: kr, style: dn, children: [
      /* @__PURE__ */ a.jsxs("aside", { className: "wf-palette", "aria-label": "Activities panel", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "wf-panel-title", children: [
          /* @__PURE__ */ a.jsx(
            ma,
            {
              label: "Activities panel tabs",
              tabs: Ir,
              activeTabId: Vi.id,
              onSelect: pt
            }
          ),
          /* @__PURE__ */ a.jsxs("span", { className: "wf-panel-actions", children: [
            /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": R ? "Expand activities panel" : "Collapse activities panel",
                title: R ? "Expand" : "Collapse",
                onClick: () => ro("palette"),
                children: R ? /* @__PURE__ */ a.jsx(Tt, { size: 14 }) : /* @__PURE__ */ a.jsx(Ho, { size: 14 })
              }
            ),
            R ? null : /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": pe === "palette" ? "Restore activities panel" : "Maximize activities panel",
                title: pe === "palette" ? "Restore" : "Maximize",
                onClick: () => ln("palette"),
                children: pe === "palette" ? /* @__PURE__ */ a.jsx(Gs, { size: 14 }) : /* @__PURE__ */ a.jsx(Oo, { size: 14 })
              }
            )
          ] })
        ] }),
        ao ? Vi.render() : null
      ] }),
      ao && !pe ? /* @__PURE__ */ a.jsx(
        "div",
        {
          className: "wf-side-resize-handle left",
          role: "separator",
          "aria-label": "Resize activities panel",
          "aria-orientation": "vertical",
          "aria-valuemin": mn,
          "aria-valuemax": yn,
          "aria-valuenow": oe,
          tabIndex: 0,
          onPointerDown: (S) => un("palette", S),
          onKeyDown: (S) => so("palette", S)
        }
      ) : /* @__PURE__ */ a.jsx("div", { className: "wf-side-resize-spacer" }),
      /* @__PURE__ */ a.jsxs("main", { className: "wf-canvas-shell", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "wf-breadcrumb", children: [
          /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => {
            v([]), z(null);
          }, children: "Root" }),
          m.map((S, M) => /* @__PURE__ */ a.jsxs(ht.Fragment, { children: [
            /* @__PURE__ */ a.jsx(Tt, { size: 13 }),
            /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => {
              v(m.slice(0, M + 1)), z(null);
            }, children: S.label })
          ] }, `${S.ownerNodeId}-${S.slotId}-${M}`))
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "wf-canvas", ref: ve, onDragOver: rn, onDragLeave: sn, onDrop: Qn, children: [
          /* @__PURE__ */ a.jsx(Tl.Provider, { value: Sr, children: /* @__PURE__ */ a.jsxs(
            al,
            {
              nodes: E,
              edges: k,
              nodeTypes: Dl,
              edgeTypes: Pl,
              onInit: W,
              onNodesChange: eo,
              onEdgesChange: pr,
              onNodesDelete: vr,
              onEdgesDelete: to,
              onConnect: gr,
              onConnectStart: je ? yr : void 0,
              onConnectEnd: je ? xr : void 0,
              onReconnect: je ? wr : void 0,
              isValidConnection: cn,
              onDragOver: rn,
              onDragLeave: sn,
              onDrop: Qn,
              onPaneClick: () => z(null),
              onNodeClick: (S, M) => z(M.id),
              onNodeDragStop: be ? void 0 : mr,
              fitView: !0,
              minZoom: 0.2,
              maxZoom: 1.8,
              nodesConnectable: je,
              nodesDraggable: !be,
              selectionOnDrag: !0,
              multiSelectionKeyCode: ["Shift", "Meta", "Control"],
              deleteKeyCode: be ? null : ["Backspace", "Delete"],
              panActivationKeyCode: null,
              defaultEdgeOptions: { type: "workflow" },
              children: [
                /* @__PURE__ */ a.jsx(ll, { gap: 18, size: 1 }),
                /* @__PURE__ */ a.jsx(dl, {}),
                /* @__PURE__ */ a.jsx(hl, { pannable: !0, zoomable: !0 })
              ]
            }
          ) }),
          je && E.length === 0 ? /* @__PURE__ */ a.jsxs("button", { type: "button", className: "wf-empty-canvas-add", onClick: () => ur(), children: [
            /* @__PURE__ */ a.jsx(Di, { size: 15 }),
            " Add activity"
          ] }) : null,
          H ? /* @__PURE__ */ a.jsx(
            t0,
            {
              clientX: H.clientX,
              clientY: H.clientY,
              activities: d,
              onPick: br,
              onClose: () => b(null)
            }
          ) : null
        ] }),
        /* @__PURE__ */ a.jsx(n0, { draft: l })
      ] }),
      co && !pe ? /* @__PURE__ */ a.jsx(
        "div",
        {
          className: "wf-side-resize-handle right",
          role: "separator",
          "aria-label": "Resize inspector panel",
          "aria-orientation": "vertical",
          "aria-valuemin": xn,
          "aria-valuemax": wn,
          "aria-valuenow": Q,
          tabIndex: 0,
          onPointerDown: (S) => un("inspector", S),
          onKeyDown: (S) => so("inspector", S)
        }
      ) : /* @__PURE__ */ a.jsx("div", { className: "wf-side-resize-spacer" }),
      /* @__PURE__ */ a.jsxs("aside", { className: "wf-inspector", "aria-label": "Inspector panel", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "wf-panel-title", children: [
          /* @__PURE__ */ a.jsx(
            ma,
            {
              label: "Inspector panel tabs",
              tabs: jr,
              activeTabId: Hi.id,
              onSelect: et
            }
          ),
          /* @__PURE__ */ a.jsxs("span", { className: "wf-panel-actions", children: [
            /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": de ? "Expand inspector panel" : "Collapse inspector panel",
                title: de ? "Expand" : "Collapse",
                onClick: () => ro("inspector"),
                children: de ? /* @__PURE__ */ a.jsx(Ho, { size: 14 }) : /* @__PURE__ */ a.jsx(Tt, { size: 14 })
              }
            ),
            de ? null : /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": pe === "inspector" ? "Restore inspector panel" : "Maximize inspector panel",
                title: pe === "inspector" ? "Restore" : "Maximize",
                onClick: () => ln("inspector"),
                children: pe === "inspector" ? /* @__PURE__ */ a.jsx(Gs, { size: 14 }) : /* @__PURE__ */ a.jsx(Oo, { size: 14 })
              }
            )
          ] })
        ] }),
        co ? Hi.render() : null
      ] })
    ] })
  ] });
}
function ma({
  label: e,
  tabs: t,
  activeTabId: n,
  onSelect: o
}) {
  return /* @__PURE__ */ a.jsx("div", { className: "wf-panel-tab-list", role: "tablist", "aria-label": e, children: t.map((r) => /* @__PURE__ */ a.jsxs(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": r.id === n,
      className: r.id === n ? "active" : "",
      title: r.title,
      onClick: () => o(r.id),
      children: [
        r.icon ? /* @__PURE__ */ a.jsx("span", { className: "wf-panel-tab-icon", "aria-hidden": "true", children: r.icon }) : null,
        /* @__PURE__ */ a.jsx("span", { children: r.title })
      ]
    },
    r.id
  )) });
}
function ya(e, t) {
  return e.order - t.order || e.title.localeCompare(t.title);
}
function Jx({ data: e, selected: t }) {
  const n = e, o = n.runtime, r = !n.suppressFlowPorts, i = r ? n.sourcePorts.length > 0 ? n.sourcePorts : [{ name: "Done", displayName: "Done" }] : [], s = Qx(n);
  return /* @__PURE__ */ a.jsxs(
    "div",
    {
      className: ["wf-node", t ? "selected" : "", o ? "wf-node-runtime" : "", o?.hasBlockingIncident ? "faulted" : ""].filter(Boolean).join(" "),
      "data-icon": n.icon ?? "activity",
      children: [
        r && n.acceptsInbound ? /* @__PURE__ */ a.jsx(qt, { type: "target", position: te.Left }) : null,
        /* @__PURE__ */ a.jsxs("div", { className: "wf-node-content", children: [
          /* @__PURE__ */ a.jsx("span", { className: "wf-node-icon", "aria-hidden": "true", children: Bl(n.icon) }),
          /* @__PURE__ */ a.jsxs("span", { className: "wf-node-copy", children: [
            /* @__PURE__ */ a.jsx("strong", { children: n.label }),
            s ? /* @__PURE__ */ a.jsx("small", { children: s }) : null
          ] })
        ] }),
        n.childSlots.length > 0 ? /* @__PURE__ */ a.jsxs("span", { className: "wf-node-slot-badge", children: [
          n.childSlots.length,
          " slot",
          n.childSlots.length === 1 ? "" : "s"
        ] }) : null,
        o ? /* @__PURE__ */ a.jsxs("div", { className: "wf-node-runtime-strip", children: [
          o.status ? /* @__PURE__ */ a.jsx(Yn, { status: o.status, subStatus: o.subStatus }) : null,
          o.incidentCount > 0 ? /* @__PURE__ */ a.jsxs("span", { className: "wf-node-runtime-count", children: [
            o.incidentCount,
            " incident",
            o.incidentCount === 1 ? "" : "s"
          ] }) : null,
          o.faultCount > 0 ? /* @__PURE__ */ a.jsxs("span", { className: "wf-node-runtime-count", children: [
            o.faultCount,
            " faults"
          ] }) : null
        ] }) : null,
        i.map((c, u) => {
          const l = `${(u + 1) / (i.length + 1) * 100}%`;
          return /* @__PURE__ */ a.jsxs(ht.Fragment, { children: [
            /* @__PURE__ */ a.jsx("span", { className: "wf-node-port-label", style: { top: l }, children: c.displayName }),
            /* @__PURE__ */ a.jsx(qt, { type: "source", position: te.Right, id: c.name, style: { top: l } })
          ] }, c.name);
        })
      ]
    }
  );
}
function Qx(e) {
  const t = e.category?.trim(), n = e.executionType?.trim();
  return [t, n].filter((r) => !!r).join(" · ");
}
function Bl(e) {
  switch (e) {
    case "flowchart":
      return /* @__PURE__ */ a.jsx(ml, { size: 15 });
    case "sequence":
      return /* @__PURE__ */ a.jsx(yl, { size: 15 });
    case "terminal":
      return /* @__PURE__ */ a.jsx(dy, { size: 15 });
    case "runtime":
      return /* @__PURE__ */ a.jsx(Mi, { size: 15 });
    case "trigger":
      return /* @__PURE__ */ a.jsx(hy, { size: 15 });
    default:
      return /* @__PURE__ */ a.jsx(gl, { size: 15 });
  }
}
function e0(e) {
  const {
    id: t,
    sourceX: n,
    sourceY: o,
    targetX: r,
    targetY: i,
    sourcePosition: s,
    targetPosition: c,
    markerEnd: u,
    style: l,
    label: f,
    labelStyle: d
  } = e, h = ht.useContext(Tl), [p, g] = Y(!1), [x, w, y] = Lo({ sourceX: n, sourceY: o, targetX: r, targetY: i, sourcePosition: s, targetPosition: c }), N = h?.highlightedEdgeId === t;
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx(
      Fn,
      {
        id: t,
        path: x,
        markerEnd: u,
        style: {
          ...l,
          strokeWidth: N ? 2.5 : l?.strokeWidth
        },
        label: f,
        labelX: w,
        labelY: y,
        labelStyle: d,
        onMouseEnter: () => g(!0),
        onMouseLeave: () => g(!1)
      }
    ),
    h ? /* @__PURE__ */ a.jsx(Dm, { children: /* @__PURE__ */ a.jsxs(
      "div",
      {
        className: ["wf-edge-actions", p ? "visible" : "", N ? "highlighted" : ""].filter(Boolean).join(" "),
        style: { transform: `translate(-50%, -50%) translate(${w}px, ${y}px)` },
        onMouseEnter: () => g(!0),
        onMouseLeave: () => g(!1),
        children: [
          /* @__PURE__ */ a.jsx("button", { type: "button", "aria-label": "Insert activity into connection", title: "Insert activity", onClick: (m) => h.requestInsertActivity(t, m.clientX, m.clientY), children: /* @__PURE__ */ a.jsx(Di, { size: 12 }) }),
          /* @__PURE__ */ a.jsx("button", { type: "button", "aria-label": "Delete connection", title: "Delete connection", onClick: () => h.deleteEdge(t), children: /* @__PURE__ */ a.jsx(ii, { size: 12 }) })
        ]
      }
    ) }) : null
  ] });
}
function t0({ clientX: e, clientY: t, activities: n, onPick: o, onClose: r }) {
  const [i, s] = Y(""), [c, u] = Y(0), l = ce(null), f = ce(null), d = me(() => {
    const N = i.trim().toLowerCase(), m = n.filter(Ol);
    return N ? m.filter((v) => Ie(v).toLowerCase().includes(N) || v.activityTypeKey.toLowerCase().includes(N) || (v.category ?? "").toLowerCase().includes(N) || (v.description ?? "").toLowerCase().includes(N)) : m;
  }, [n, i]), h = me(() => Ll(d), [d]), p = me(() => h.flatMap((N) => N.activities), [h]);
  re(() => {
    requestAnimationFrame(() => f.current?.focus());
  }, []), re(() => {
    const N = (v) => {
      l.current?.contains(v.target) || r();
    }, m = (v) => {
      v.key === "Escape" && r();
    };
    return document.addEventListener("mousedown", N, !0), document.addEventListener("keydown", m), () => {
      document.removeEventListener("mousedown", N, !0), document.removeEventListener("keydown", m);
    };
  }, [r]);
  const g = (N) => {
    if (N.key === "ArrowDown")
      N.preventDefault(), u((m) => Math.min(m + 1, p.length - 1));
    else if (N.key === "ArrowUp")
      N.preventDefault(), u((m) => Math.max(m - 1, 0));
    else if (N.key === "Enter") {
      N.preventDefault();
      const m = p[c];
      m && o(m);
    }
  }, x = Math.max(8, Math.min(e + 4, window.innerWidth - 328)), w = Math.max(8, Math.min(t + 4, window.innerHeight - 360));
  let y = -1;
  return /* @__PURE__ */ a.jsxs("div", { ref: l, className: "wf-connect-menu", style: { left: x, top: w }, onMouseDown: (N) => N.stopPropagation(), onClick: (N) => N.stopPropagation(), children: [
    /* @__PURE__ */ a.jsx(
      "input",
      {
        ref: f,
        type: "search",
        value: i,
        placeholder: "Search activities...",
        "aria-label": "Search activities",
        onChange: (N) => {
          s(N.target.value), u(0);
        },
        onKeyDown: g
      }
    ),
    /* @__PURE__ */ a.jsx("div", { className: "wf-connect-menu-list", role: "listbox", "aria-label": "Activity picker", children: h.length === 0 ? /* @__PURE__ */ a.jsx("p", { children: "No matching activities." }) : h.map((N) => /* @__PURE__ */ a.jsxs("section", { children: [
      /* @__PURE__ */ a.jsx("h4", { children: N.category }),
      N.activities.map((m) => {
        y += 1;
        const v = y, E = v === c;
        return /* @__PURE__ */ a.jsxs(
          "button",
          {
            type: "button",
            role: "option",
            "aria-selected": E,
            className: E ? "active" : "",
            onMouseEnter: () => u(v),
            onClick: () => o(m),
            children: [
              /* @__PURE__ */ a.jsx("strong", { children: Ie(m) }),
              /* @__PURE__ */ a.jsx("small", { children: m.category || m.activityTypeKey })
            ]
          },
          m.activityVersionId
        );
      })
    ] }, N.category)) })
  ] });
}
function n0({ draft: e }) {
  return e.validationErrors.length ? /* @__PURE__ */ a.jsxs("div", { className: "wf-validation", children: [
    /* @__PURE__ */ a.jsx(it, { size: 14 }),
    e.validationErrors.length,
    " validation issue",
    e.validationErrors.length === 1 ? "" : "s"
  ] }) : /* @__PURE__ */ a.jsxs("div", { className: "wf-validation ok", children: [
    /* @__PURE__ */ a.jsx(Wn, { size: 14 }),
    " No validation errors"
  ] });
}
function o0({ testRun: e }) {
  const t = Fl(e);
  return /* @__PURE__ */ a.jsxs("section", { className: "wf-test-run-capsule", "data-state": t ? "rejected" : "accepted", "aria-live": "polite", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-test-run-heading", children: [
      t ? /* @__PURE__ */ a.jsx(it, { size: 16 }) : /* @__PURE__ */ a.jsx(Wn, { size: 16 }),
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("strong", { children: t ? "Test run rejected" : "Test run dispatched" }),
        /* @__PURE__ */ a.jsx("span", { children: "Ephemeral - not promoted" })
      ] })
    ] }),
    t && e.reason ? /* @__PURE__ */ a.jsx("p", { children: e.reason }) : null,
    /* @__PURE__ */ a.jsxs("dl", { children: [
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("dt", { children: "Status" }),
        /* @__PURE__ */ a.jsx("dd", { children: e.status })
      ] }),
      e.commandDispatchStatus ? /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("dt", { children: "Dispatch" }),
        /* @__PURE__ */ a.jsx("dd", { children: e.commandDispatchStatus })
      ] }) : null,
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("dt", { children: "Test run" }),
        /* @__PURE__ */ a.jsx("dd", { children: e.testRunId })
      ] }),
      e.artifactId ? /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("dt", { children: "Transient artifact" }),
        /* @__PURE__ */ a.jsx("dd", { children: e.artifactId })
      ] }) : null,
      e.workflowExecutionId ? /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("dt", { children: "Execution" }),
        /* @__PURE__ */ a.jsx("dd", { children: e.workflowExecutionId })
      ] }) : null,
      e.expiresAt ? /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("dt", { children: "Expires" }),
        /* @__PURE__ */ a.jsx("dd", { children: ot(e.expiresAt) })
      ] }) : null
    ] })
  ] });
}
function xa(e) {
  return `${Ie(e).replace(/[^a-z0-9]+/gi, "").toLowerCase() || "activity"}-${crypto.randomUUID().slice(0, 8)}`;
}
function wa(e) {
  return { x: e.position.x + 280, y: e.position.y };
}
function r0(e, t) {
  return {
    x: Math.round((e.position.x + t.position.x) / 2),
    y: Math.round((e.position.y + t.position.y) / 2)
  };
}
function i0(e) {
  return "changedTouches" in e && e.changedTouches.length > 0 ? { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY } : { x: e.clientX, y: e.clientY };
}
function vt(e) {
  return JSON.stringify({ state: e.state, layout: e.layout });
}
function s0(e) {
  return `${e.id}-${a0(JSON.stringify(e.state))}`;
}
function a0(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n += 1)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16).padStart(8, "0");
}
function Fl(e) {
  return e.status.toLowerCase() === "rejected";
}
function ot(e) {
  if (!e) return "";
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : t.toLocaleString();
}
function c0(e, t) {
  if (!e || !t) return "";
  const n = Date.parse(e), o = Date.parse(t);
  if (Number.isNaN(n) || Number.isNaN(o) || o < n) return "";
  const r = Math.round((o - n) / 1e3);
  if (r < 60) return `${r}s`;
  const i = Math.floor(r / 60), s = r % 60;
  if (i < 60) return s ? `${i}m ${s}s` : `${i}m`;
  const c = Math.floor(i / 60), u = i % 60;
  return u ? `${c}h ${u}m` : `${c}h`;
}
export {
  d0 as register
};
