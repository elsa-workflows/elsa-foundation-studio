import ct, { memo as Se, forwardRef as kr, useRef as ie, useEffect as ee, useCallback as ue, useContext as ho, useMemo as de, useState as q, createContext as Zi, useLayoutEffect as pf, createElement as Si, useId as Wc, lazy as gf, Suspense as yf } from "react";
import { useQuery as Bc, useQueryClient as mf, useMutation as xf } from "@tanstack/react-query";
function wf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ii = { exports: {} }, Rn = {};
var Xs;
function vf() {
  if (Xs) return Rn;
  Xs = 1;
  var e = /* @__PURE__ */ Symbol.for("react.transitional.element"), t = /* @__PURE__ */ Symbol.for("react.fragment");
  function n(o, r, s) {
    var a = null;
    if (s !== void 0 && (a = "" + s), r.key !== void 0 && (a = "" + r.key), "key" in r) {
      s = {};
      for (var c in r)
        c !== "key" && (s[c] = r[c]);
    } else s = r;
    return r = s.ref, {
      $$typeof: e,
      type: o,
      key: a,
      ref: r !== void 0 ? r : null,
      props: s
    };
  }
  return Rn.Fragment = t, Rn.jsx = n, Rn.jsxs = n, Rn;
}
var Us;
function bf() {
  return Us || (Us = 1, ii.exports = vf()), ii.exports;
}
var i = bf();
function Ee(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let t = "";
  if (Array.isArray(e))
    for (let n = 0, o; n < e.length; n++)
      (o = Ee(e[n])) !== "" && (t += (t && " ") + o);
  else
    for (let n in e)
      e[n] && (t += (t && " ") + n);
  return t;
}
var Nf = { value: () => {
} };
function Er() {
  for (var e = 0, t = arguments.length, n = {}, o; e < t; ++e) {
    if (!(o = arguments[e] + "") || o in n || /[\s.]/.test(o)) throw new Error("illegal type: " + o);
    n[o] = [];
  }
  return new Uo(n);
}
function Uo(e) {
  this._ = e;
}
function jf(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var o = "", r = n.indexOf(".");
    if (r >= 0 && (o = n.slice(r + 1), n = n.slice(0, r)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: o };
  });
}
Uo.prototype = Er.prototype = {
  constructor: Uo,
  on: function(e, t) {
    var n = this._, o = jf(e + "", n), r, s = -1, a = o.length;
    if (arguments.length < 2) {
      for (; ++s < a; ) if ((r = (e = o[s]).type) && (r = Sf(n[r], e.name))) return r;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++s < a; )
      if (r = (e = o[s]).type) n[r] = Ys(n[r], e.name, t);
      else if (t == null) for (r in n) n[r] = Ys(n[r], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new Uo(e);
  },
  call: function(e, t) {
    if ((r = arguments.length - 2) > 0) for (var n = new Array(r), o = 0, r, s; o < r; ++o) n[o] = arguments[o + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (s = this._[e], o = 0, r = s.length; o < r; ++o) s[o].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var o = this._[e], r = 0, s = o.length; r < s; ++r) o[r].value.apply(t, n);
  }
};
function Sf(e, t) {
  for (var n = 0, o = e.length, r; n < o; ++n)
    if ((r = e[n]).name === t)
      return r.value;
}
function Ys(e, t, n) {
  for (var o = 0, r = e.length; o < r; ++o)
    if (e[o].name === t) {
      e[o] = Nf, e = e.slice(0, o).concat(e.slice(o + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var ki = "http://www.w3.org/1999/xhtml";
const Zs = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ki,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Cr(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Zs.hasOwnProperty(t) ? { space: Zs[t], local: e } : e;
}
function kf(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === ki && t.documentElement.namespaceURI === ki ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function Ef(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Fc(e) {
  var t = Cr(e);
  return (t.local ? Ef : kf)(t);
}
function Cf() {
}
function Gi(e) {
  return e == null ? Cf : function() {
    return this.querySelector(e);
  };
}
function If(e) {
  typeof e != "function" && (e = Gi(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var s = t[r], a = s.length, c = o[r] = new Array(a), u, l, d = 0; d < a; ++d)
      (u = s[d]) && (l = e.call(u, u.__data__, d, s)) && ("__data__" in u && (l.__data__ = u.__data__), c[d] = l);
  return new Ue(o, this._parents);
}
function Af(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function _f() {
  return [];
}
function Kc(e) {
  return e == null ? _f : function() {
    return this.querySelectorAll(e);
  };
}
function Df(e) {
  return function() {
    return Af(e.apply(this, arguments));
  };
}
function Mf(e) {
  typeof e == "function" ? e = Df(e) : e = Kc(e);
  for (var t = this._groups, n = t.length, o = [], r = [], s = 0; s < n; ++s)
    for (var a = t[s], c = a.length, u, l = 0; l < c; ++l)
      (u = a[l]) && (o.push(e.call(u, u.__data__, l, a)), r.push(u));
  return new Ue(o, r);
}
function qc(e) {
  return function() {
    return this.matches(e);
  };
}
function Xc(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Tf = Array.prototype.find;
function $f(e) {
  return function() {
    return Tf.call(this.children, e);
  };
}
function Pf() {
  return this.firstElementChild;
}
function Lf(e) {
  return this.select(e == null ? Pf : $f(typeof e == "function" ? e : Xc(e)));
}
var zf = Array.prototype.filter;
function Rf() {
  return Array.from(this.children);
}
function Vf(e) {
  return function() {
    return zf.call(this.children, e);
  };
}
function Of(e) {
  return this.selectAll(e == null ? Rf : Vf(typeof e == "function" ? e : Xc(e)));
}
function Hf(e) {
  typeof e != "function" && (e = qc(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var s = t[r], a = s.length, c = o[r] = [], u, l = 0; l < a; ++l)
      (u = s[l]) && e.call(u, u.__data__, l, s) && c.push(u);
  return new Ue(o, this._parents);
}
function Uc(e) {
  return new Array(e.length);
}
function Wf() {
  return new Ue(this._enter || this._groups.map(Uc), this._parents);
}
function rr(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
rr.prototype = {
  constructor: rr,
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
function Bf(e) {
  return function() {
    return e;
  };
}
function Ff(e, t, n, o, r, s) {
  for (var a = 0, c, u = t.length, l = s.length; a < l; ++a)
    (c = t[a]) ? (c.__data__ = s[a], o[a] = c) : n[a] = new rr(e, s[a]);
  for (; a < u; ++a)
    (c = t[a]) && (r[a] = c);
}
function Kf(e, t, n, o, r, s, a) {
  var c, u, l = /* @__PURE__ */ new Map(), d = t.length, f = s.length, h = new Array(d), p;
  for (c = 0; c < d; ++c)
    (u = t[c]) && (h[c] = p = a.call(u, u.__data__, c, t) + "", l.has(p) ? r[c] = u : l.set(p, u));
  for (c = 0; c < f; ++c)
    p = a.call(e, s[c], c, s) + "", (u = l.get(p)) ? (o[c] = u, u.__data__ = s[c], l.delete(p)) : n[c] = new rr(e, s[c]);
  for (c = 0; c < d; ++c)
    (u = t[c]) && l.get(h[c]) === u && (r[c] = u);
}
function qf(e) {
  return e.__data__;
}
function Xf(e, t) {
  if (!arguments.length) return Array.from(this, qf);
  var n = t ? Kf : Ff, o = this._parents, r = this._groups;
  typeof e != "function" && (e = Bf(e));
  for (var s = r.length, a = new Array(s), c = new Array(s), u = new Array(s), l = 0; l < s; ++l) {
    var d = o[l], f = r[l], h = f.length, p = Uf(e.call(d, d && d.__data__, l, o)), g = p.length, b = c[l] = new Array(g), x = a[l] = new Array(g), m = u[l] = new Array(h);
    n(d, f, b, x, m, p, t);
    for (var E = 0, y = 0, N, k; E < g; ++E)
      if (N = b[E]) {
        for (E >= y && (y = E + 1); !(k = x[y]) && ++y < g; ) ;
        N._next = k || null;
      }
  }
  return a = new Ue(a, o), a._enter = c, a._exit = u, a;
}
function Uf(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Yf() {
  return new Ue(this._exit || this._groups.map(Uc), this._parents);
}
function Zf(e, t, n) {
  var o = this.enter(), r = this, s = this.exit();
  return typeof e == "function" ? (o = e(o), o && (o = o.selection())) : o = o.append(e + ""), t != null && (r = t(r), r && (r = r.selection())), n == null ? s.remove() : n(s), o && r ? o.merge(r).order() : r;
}
function Gf(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, o = t._groups, r = n.length, s = o.length, a = Math.min(r, s), c = new Array(r), u = 0; u < a; ++u)
    for (var l = n[u], d = o[u], f = l.length, h = c[u] = new Array(f), p, g = 0; g < f; ++g)
      (p = l[g] || d[g]) && (h[g] = p);
  for (; u < r; ++u)
    c[u] = n[u];
  return new Ue(c, this._parents);
}
function Jf() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var o = e[t], r = o.length - 1, s = o[r], a; --r >= 0; )
      (a = o[r]) && (s && a.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(a, s), s = a);
  return this;
}
function Qf(e) {
  e || (e = eh);
  function t(f, h) {
    return f && h ? e(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, o = n.length, r = new Array(o), s = 0; s < o; ++s) {
    for (var a = n[s], c = a.length, u = r[s] = new Array(c), l, d = 0; d < c; ++d)
      (l = a[d]) && (u[d] = l);
    u.sort(t);
  }
  return new Ue(r, this._parents).order();
}
function eh(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function th() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function nh() {
  return Array.from(this);
}
function oh() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], r = 0, s = o.length; r < s; ++r) {
      var a = o[r];
      if (a) return a;
    }
  return null;
}
function rh() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function ih() {
  return !this.node();
}
function sh(e) {
  for (var t = this._groups, n = 0, o = t.length; n < o; ++n)
    for (var r = t[n], s = 0, a = r.length, c; s < a; ++s)
      (c = r[s]) && e.call(c, c.__data__, s, r);
  return this;
}
function ah(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ch(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function lh(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function uh(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function dh(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function fh(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function hh(e, t) {
  var n = Cr(e);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each((t == null ? n.local ? ch : ah : typeof t == "function" ? n.local ? fh : dh : n.local ? uh : lh)(n, t));
}
function Yc(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function ph(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function gh(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function yh(e, t, n) {
  return function() {
    var o = t.apply(this, arguments);
    o == null ? this.style.removeProperty(e) : this.style.setProperty(e, o, n);
  };
}
function mh(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? ph : typeof t == "function" ? yh : gh)(e, t, n ?? "")) : un(this.node(), e);
}
function un(e, t) {
  return e.style.getPropertyValue(t) || Yc(e).getComputedStyle(e, null).getPropertyValue(t);
}
function xh(e) {
  return function() {
    delete this[e];
  };
}
function wh(e, t) {
  return function() {
    this[e] = t;
  };
}
function vh(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function bh(e, t) {
  return arguments.length > 1 ? this.each((t == null ? xh : typeof t == "function" ? vh : wh)(e, t)) : this.node()[e];
}
function Zc(e) {
  return e.trim().split(/^|\s+/);
}
function Ji(e) {
  return e.classList || new Gc(e);
}
function Gc(e) {
  this._node = e, this._names = Zc(e.getAttribute("class") || "");
}
Gc.prototype = {
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
function Jc(e, t) {
  for (var n = Ji(e), o = -1, r = t.length; ++o < r; ) n.add(t[o]);
}
function Qc(e, t) {
  for (var n = Ji(e), o = -1, r = t.length; ++o < r; ) n.remove(t[o]);
}
function Nh(e) {
  return function() {
    Jc(this, e);
  };
}
function jh(e) {
  return function() {
    Qc(this, e);
  };
}
function Sh(e, t) {
  return function() {
    (t.apply(this, arguments) ? Jc : Qc)(this, e);
  };
}
function kh(e, t) {
  var n = Zc(e + "");
  if (arguments.length < 2) {
    for (var o = Ji(this.node()), r = -1, s = n.length; ++r < s; ) if (!o.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Sh : t ? Nh : jh)(n, t));
}
function Eh() {
  this.textContent = "";
}
function Ch(e) {
  return function() {
    this.textContent = e;
  };
}
function Ih(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Ah(e) {
  return arguments.length ? this.each(e == null ? Eh : (typeof e == "function" ? Ih : Ch)(e)) : this.node().textContent;
}
function _h() {
  this.innerHTML = "";
}
function Dh(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Mh(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Th(e) {
  return arguments.length ? this.each(e == null ? _h : (typeof e == "function" ? Mh : Dh)(e)) : this.node().innerHTML;
}
function $h() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ph() {
  return this.each($h);
}
function Lh() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function zh() {
  return this.each(Lh);
}
function Rh(e) {
  var t = typeof e == "function" ? e : Fc(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Vh() {
  return null;
}
function Oh(e, t) {
  var n = typeof e == "function" ? e : Fc(e), o = t == null ? Vh : typeof t == "function" ? t : Gi(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function Hh() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Wh() {
  return this.each(Hh);
}
function Bh() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Fh() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Kh(e) {
  return this.select(e ? Fh : Bh);
}
function qh(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Xh(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Uh(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", o = t.indexOf(".");
    return o >= 0 && (n = t.slice(o + 1), t = t.slice(0, o)), { type: t, name: n };
  });
}
function Yh(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, o = -1, r = t.length, s; n < r; ++n)
        s = t[n], (!e.type || s.type === e.type) && s.name === e.name ? this.removeEventListener(s.type, s.listener, s.options) : t[++o] = s;
      ++o ? t.length = o : delete this.__on;
    }
  };
}
function Zh(e, t, n) {
  return function() {
    var o = this.__on, r, s = Xh(t);
    if (o) {
      for (var a = 0, c = o.length; a < c; ++a)
        if ((r = o[a]).type === e.type && r.name === e.name) {
          this.removeEventListener(r.type, r.listener, r.options), this.addEventListener(r.type, r.listener = s, r.options = n), r.value = t;
          return;
        }
    }
    this.addEventListener(e.type, s, n), r = { type: e.type, name: e.name, value: t, listener: s, options: n }, o ? o.push(r) : this.__on = [r];
  };
}
function Gh(e, t, n) {
  var o = Uh(e + ""), r, s = o.length, a;
  if (arguments.length < 2) {
    var c = this.node().__on;
    if (c) {
      for (var u = 0, l = c.length, d; u < l; ++u)
        for (r = 0, d = c[u]; r < s; ++r)
          if ((a = o[r]).type === d.type && a.name === d.name)
            return d.value;
    }
    return;
  }
  for (c = t ? Zh : Yh, r = 0; r < s; ++r) this.each(c(o[r], t, n));
  return this;
}
function el(e, t, n) {
  var o = Yc(e), r = o.CustomEvent;
  typeof r == "function" ? r = new r(t, n) : (r = o.document.createEvent("Event"), n ? (r.initEvent(t, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(t, !1, !1)), e.dispatchEvent(r);
}
function Jh(e, t) {
  return function() {
    return el(this, e, t);
  };
}
function Qh(e, t) {
  return function() {
    return el(this, e, t.apply(this, arguments));
  };
}
function ep(e, t) {
  return this.each((typeof t == "function" ? Qh : Jh)(e, t));
}
function* tp() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], r = 0, s = o.length, a; r < s; ++r)
      (a = o[r]) && (yield a);
}
var tl = [null];
function Ue(e, t) {
  this._groups = e, this._parents = t;
}
function po() {
  return new Ue([[document.documentElement]], tl);
}
function np() {
  return this;
}
Ue.prototype = po.prototype = {
  constructor: Ue,
  select: If,
  selectAll: Mf,
  selectChild: Lf,
  selectChildren: Of,
  filter: Hf,
  data: Xf,
  enter: Wf,
  exit: Yf,
  join: Zf,
  merge: Gf,
  selection: np,
  order: Jf,
  sort: Qf,
  call: th,
  nodes: nh,
  node: oh,
  size: rh,
  empty: ih,
  each: sh,
  attr: hh,
  style: mh,
  property: bh,
  classed: kh,
  text: Ah,
  html: Th,
  raise: Ph,
  lower: zh,
  append: Rh,
  insert: Oh,
  remove: Wh,
  clone: Kh,
  datum: qh,
  on: Gh,
  dispatch: ep,
  [Symbol.iterator]: tp
};
function Xe(e) {
  return typeof e == "string" ? new Ue([[document.querySelector(e)]], [document.documentElement]) : new Ue([[e]], tl);
}
function op(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function et(e, t) {
  if (e = op(e), t === void 0 && (t = e.currentTarget), t) {
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
const rp = { passive: !1 }, eo = { capture: !0, passive: !1 };
function si(e) {
  e.stopImmediatePropagation();
}
function an(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function nl(e) {
  var t = e.document.documentElement, n = Xe(e).on("dragstart.drag", an, eo);
  "onselectstart" in t ? n.on("selectstart.drag", an, eo) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function ol(e, t) {
  var n = e.document.documentElement, o = Xe(e).on("dragstart.drag", null);
  t && (o.on("click.drag", an, eo), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const zo = (e) => () => e;
function Ei(e, {
  sourceEvent: t,
  subject: n,
  target: o,
  identifier: r,
  active: s,
  x: a,
  y: c,
  dx: u,
  dy: l,
  dispatch: d
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    identifier: { value: r, enumerable: !0, configurable: !0 },
    active: { value: s, enumerable: !0, configurable: !0 },
    x: { value: a, enumerable: !0, configurable: !0 },
    y: { value: c, enumerable: !0, configurable: !0 },
    dx: { value: u, enumerable: !0, configurable: !0 },
    dy: { value: l, enumerable: !0, configurable: !0 },
    _: { value: d }
  });
}
Ei.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function ip(e) {
  return !e.ctrlKey && !e.button;
}
function sp() {
  return this.parentNode;
}
function ap(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function cp() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function rl() {
  var e = ip, t = sp, n = ap, o = cp, r = {}, s = Er("start", "drag", "end"), a = 0, c, u, l, d, f = 0;
  function h(N) {
    N.on("mousedown.drag", p).filter(o).on("touchstart.drag", x).on("touchmove.drag", m, rp).on("touchend.drag touchcancel.drag", E).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(N, k) {
    if (!(d || !e.call(this, N, k))) {
      var v = y(this, t.call(this, N, k), N, k, "mouse");
      v && (Xe(N.view).on("mousemove.drag", g, eo).on("mouseup.drag", b, eo), nl(N.view), si(N), l = !1, c = N.clientX, u = N.clientY, v("start", N));
    }
  }
  function g(N) {
    if (an(N), !l) {
      var k = N.clientX - c, v = N.clientY - u;
      l = k * k + v * v > f;
    }
    r.mouse("drag", N);
  }
  function b(N) {
    Xe(N.view).on("mousemove.drag mouseup.drag", null), ol(N.view, l), an(N), r.mouse("end", N);
  }
  function x(N, k) {
    if (e.call(this, N, k)) {
      var v = N.changedTouches, j = t.call(this, N, k), _ = v.length, M, W;
      for (M = 0; M < _; ++M)
        (W = y(this, j, N, k, v[M].identifier, v[M])) && (si(N), W("start", N, v[M]));
    }
  }
  function m(N) {
    var k = N.changedTouches, v = k.length, j, _;
    for (j = 0; j < v; ++j)
      (_ = r[k[j].identifier]) && (an(N), _("drag", N, k[j]));
  }
  function E(N) {
    var k = N.changedTouches, v = k.length, j, _;
    for (d && clearTimeout(d), d = setTimeout(function() {
      d = null;
    }, 500), j = 0; j < v; ++j)
      (_ = r[k[j].identifier]) && (si(N), _("end", N, k[j]));
  }
  function y(N, k, v, j, _, M) {
    var W = s.copy(), D = et(M || v, k), T, R, S;
    if ((S = n.call(N, new Ei("beforestart", {
      sourceEvent: v,
      target: h,
      identifier: _,
      active: a,
      x: D[0],
      y: D[1],
      dx: 0,
      dy: 0,
      dispatch: W
    }), j)) != null)
      return T = S.x - D[0] || 0, R = S.y - D[1] || 0, function A(I, $, L) {
        var P = D, B;
        switch (I) {
          case "start":
            r[_] = A, B = a++;
            break;
          case "end":
            delete r[_], --a;
          // falls through
          case "drag":
            D = et(L || $, k), B = a;
            break;
        }
        W.call(
          I,
          N,
          new Ei(I, {
            sourceEvent: $,
            subject: S,
            target: h,
            identifier: _,
            active: B,
            x: D[0] + T,
            y: D[1] + R,
            dx: D[0] - P[0],
            dy: D[1] - P[1],
            dispatch: W
          }),
          j
        );
      };
  }
  return h.filter = function(N) {
    return arguments.length ? (e = typeof N == "function" ? N : zo(!!N), h) : e;
  }, h.container = function(N) {
    return arguments.length ? (t = typeof N == "function" ? N : zo(N), h) : t;
  }, h.subject = function(N) {
    return arguments.length ? (n = typeof N == "function" ? N : zo(N), h) : n;
  }, h.touchable = function(N) {
    return arguments.length ? (o = typeof N == "function" ? N : zo(!!N), h) : o;
  }, h.on = function() {
    var N = s.on.apply(s, arguments);
    return N === s ? h : N;
  }, h.clickDistance = function(N) {
    return arguments.length ? (f = (N = +N) * N, h) : Math.sqrt(f);
  }, h;
}
function Qi(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function il(e, t) {
  var n = Object.create(e.prototype);
  for (var o in t) n[o] = t[o];
  return n;
}
function go() {
}
var to = 0.7, ir = 1 / to, cn = "\\s*([+-]?\\d+)\\s*", no = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", at = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", lp = /^#([0-9a-f]{3,8})$/, up = new RegExp(`^rgb\\(${cn},${cn},${cn}\\)$`), dp = new RegExp(`^rgb\\(${at},${at},${at}\\)$`), fp = new RegExp(`^rgba\\(${cn},${cn},${cn},${no}\\)$`), hp = new RegExp(`^rgba\\(${at},${at},${at},${no}\\)$`), pp = new RegExp(`^hsl\\(${no},${at},${at}\\)$`), gp = new RegExp(`^hsla\\(${no},${at},${at},${no}\\)$`), Gs = {
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
Qi(go, Vt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Js,
  // Deprecated! Use color.formatHex.
  formatHex: Js,
  formatHex8: yp,
  formatHsl: mp,
  formatRgb: Qs,
  toString: Qs
});
function Js() {
  return this.rgb().formatHex();
}
function yp() {
  return this.rgb().formatHex8();
}
function mp() {
  return sl(this).formatHsl();
}
function Qs() {
  return this.rgb().formatRgb();
}
function Vt(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = lp.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? ea(t) : n === 3 ? new Re(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Ro(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Ro(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = up.exec(e)) ? new Re(t[1], t[2], t[3], 1) : (t = dp.exec(e)) ? new Re(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = fp.exec(e)) ? Ro(t[1], t[2], t[3], t[4]) : (t = hp.exec(e)) ? Ro(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = pp.exec(e)) ? oa(t[1], t[2] / 100, t[3] / 100, 1) : (t = gp.exec(e)) ? oa(t[1], t[2] / 100, t[3] / 100, t[4]) : Gs.hasOwnProperty(e) ? ea(Gs[e]) : e === "transparent" ? new Re(NaN, NaN, NaN, 0) : null;
}
function ea(e) {
  return new Re(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ro(e, t, n, o) {
  return o <= 0 && (e = t = n = NaN), new Re(e, t, n, o);
}
function xp(e) {
  return e instanceof go || (e = Vt(e)), e ? (e = e.rgb(), new Re(e.r, e.g, e.b, e.opacity)) : new Re();
}
function Ci(e, t, n, o) {
  return arguments.length === 1 ? xp(e) : new Re(e, t, n, o ?? 1);
}
function Re(e, t, n, o) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +o;
}
Qi(Re, Ci, il(go, {
  brighter(e) {
    return e = e == null ? ir : Math.pow(ir, e), new Re(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? to : Math.pow(to, e), new Re(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Re(Pt(this.r), Pt(this.g), Pt(this.b), sr(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ta,
  // Deprecated! Use color.formatHex.
  formatHex: ta,
  formatHex8: wp,
  formatRgb: na,
  toString: na
}));
function ta() {
  return `#${$t(this.r)}${$t(this.g)}${$t(this.b)}`;
}
function wp() {
  return `#${$t(this.r)}${$t(this.g)}${$t(this.b)}${$t((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function na() {
  const e = sr(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Pt(this.r)}, ${Pt(this.g)}, ${Pt(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function sr(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Pt(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function $t(e) {
  return e = Pt(e), (e < 16 ? "0" : "") + e.toString(16);
}
function oa(e, t, n, o) {
  return o <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new tt(e, t, n, o);
}
function sl(e) {
  if (e instanceof tt) return new tt(e.h, e.s, e.l, e.opacity);
  if (e instanceof go || (e = Vt(e)), !e) return new tt();
  if (e instanceof tt) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, o = e.b / 255, r = Math.min(t, n, o), s = Math.max(t, n, o), a = NaN, c = s - r, u = (s + r) / 2;
  return c ? (t === s ? a = (n - o) / c + (n < o) * 6 : n === s ? a = (o - t) / c + 2 : a = (t - n) / c + 4, c /= u < 0.5 ? s + r : 2 - s - r, a *= 60) : c = u > 0 && u < 1 ? 0 : a, new tt(a, c, u, e.opacity);
}
function vp(e, t, n, o) {
  return arguments.length === 1 ? sl(e) : new tt(e, t, n, o ?? 1);
}
function tt(e, t, n, o) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +o;
}
Qi(tt, vp, il(go, {
  brighter(e) {
    return e = e == null ? ir : Math.pow(ir, e), new tt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? to : Math.pow(to, e), new tt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * t, r = 2 * n - o;
    return new Re(
      ai(e >= 240 ? e - 240 : e + 120, r, o),
      ai(e, r, o),
      ai(e < 120 ? e + 240 : e - 120, r, o),
      this.opacity
    );
  },
  clamp() {
    return new tt(ra(this.h), Vo(this.s), Vo(this.l), sr(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = sr(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${ra(this.h)}, ${Vo(this.s) * 100}%, ${Vo(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function ra(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Vo(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ai(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const es = (e) => () => e;
function bp(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Np(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(o) {
    return Math.pow(e + o * t, n);
  };
}
function jp(e) {
  return (e = +e) == 1 ? al : function(t, n) {
    return n - t ? Np(t, n, e) : es(isNaN(t) ? n : t);
  };
}
function al(e, t) {
  var n = t - e;
  return n ? bp(e, n) : es(isNaN(e) ? t : e);
}
const ar = (function e(t) {
  var n = jp(t);
  function o(r, s) {
    var a = n((r = Ci(r)).r, (s = Ci(s)).r), c = n(r.g, s.g), u = n(r.b, s.b), l = al(r.opacity, s.opacity);
    return function(d) {
      return r.r = a(d), r.g = c(d), r.b = u(d), r.opacity = l(d), r + "";
    };
  }
  return o.gamma = e, o;
})(1);
function Sp(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, o = t.slice(), r;
  return function(s) {
    for (r = 0; r < n; ++r) o[r] = e[r] * (1 - s) + t[r] * s;
    return o;
  };
}
function kp(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function Ep(e, t) {
  var n = t ? t.length : 0, o = e ? Math.min(n, e.length) : 0, r = new Array(o), s = new Array(n), a;
  for (a = 0; a < o; ++a) r[a] = Zn(e[a], t[a]);
  for (; a < n; ++a) s[a] = t[a];
  return function(c) {
    for (a = 0; a < o; ++a) s[a] = r[a](c);
    return s;
  };
}
function Cp(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(o) {
    return n.setTime(e * (1 - o) + t * o), n;
  };
}
function st(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function Ip(e, t) {
  var n = {}, o = {}, r;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (r in t)
    r in e ? n[r] = Zn(e[r], t[r]) : o[r] = t[r];
  return function(s) {
    for (r in n) o[r] = n[r](s);
    return o;
  };
}
var Ii = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ci = new RegExp(Ii.source, "g");
function Ap(e) {
  return function() {
    return e;
  };
}
function _p(e) {
  return function(t) {
    return e(t) + "";
  };
}
function cl(e, t) {
  var n = Ii.lastIndex = ci.lastIndex = 0, o, r, s, a = -1, c = [], u = [];
  for (e = e + "", t = t + ""; (o = Ii.exec(e)) && (r = ci.exec(t)); )
    (s = r.index) > n && (s = t.slice(n, s), c[a] ? c[a] += s : c[++a] = s), (o = o[0]) === (r = r[0]) ? c[a] ? c[a] += r : c[++a] = r : (c[++a] = null, u.push({ i: a, x: st(o, r) })), n = ci.lastIndex;
  return n < t.length && (s = t.slice(n), c[a] ? c[a] += s : c[++a] = s), c.length < 2 ? u[0] ? _p(u[0].x) : Ap(t) : (t = u.length, function(l) {
    for (var d = 0, f; d < t; ++d) c[(f = u[d]).i] = f.x(l);
    return c.join("");
  });
}
function Zn(e, t) {
  var n = typeof t, o;
  return t == null || n === "boolean" ? es(t) : (n === "number" ? st : n === "string" ? (o = Vt(t)) ? (t = o, ar) : cl : t instanceof Vt ? ar : t instanceof Date ? Cp : kp(t) ? Sp : Array.isArray(t) ? Ep : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Ip : st)(e, t);
}
var ia = 180 / Math.PI, Ai = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ll(e, t, n, o, r, s) {
  var a, c, u;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (u = e * n + t * o) && (n -= e * u, o -= t * u), (c = Math.sqrt(n * n + o * o)) && (n /= c, o /= c, u /= c), e * o < t * n && (e = -e, t = -t, u = -u, a = -a), {
    translateX: r,
    translateY: s,
    rotate: Math.atan2(t, e) * ia,
    skewX: Math.atan(u) * ia,
    scaleX: a,
    scaleY: c
  };
}
var Oo;
function Dp(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Ai : ll(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Mp(e) {
  return e == null || (Oo || (Oo = document.createElementNS("http://www.w3.org/2000/svg", "g")), Oo.setAttribute("transform", e), !(e = Oo.transform.baseVal.consolidate())) ? Ai : (e = e.matrix, ll(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ul(e, t, n, o) {
  function r(l) {
    return l.length ? l.pop() + " " : "";
  }
  function s(l, d, f, h, p, g) {
    if (l !== f || d !== h) {
      var b = p.push("translate(", null, t, null, n);
      g.push({ i: b - 4, x: st(l, f) }, { i: b - 2, x: st(d, h) });
    } else (f || h) && p.push("translate(" + f + t + h + n);
  }
  function a(l, d, f, h) {
    l !== d ? (l - d > 180 ? d += 360 : d - l > 180 && (l += 360), h.push({ i: f.push(r(f) + "rotate(", null, o) - 2, x: st(l, d) })) : d && f.push(r(f) + "rotate(" + d + o);
  }
  function c(l, d, f, h) {
    l !== d ? h.push({ i: f.push(r(f) + "skewX(", null, o) - 2, x: st(l, d) }) : d && f.push(r(f) + "skewX(" + d + o);
  }
  function u(l, d, f, h, p, g) {
    if (l !== f || d !== h) {
      var b = p.push(r(p) + "scale(", null, ",", null, ")");
      g.push({ i: b - 4, x: st(l, f) }, { i: b - 2, x: st(d, h) });
    } else (f !== 1 || h !== 1) && p.push(r(p) + "scale(" + f + "," + h + ")");
  }
  return function(l, d) {
    var f = [], h = [];
    return l = e(l), d = e(d), s(l.translateX, l.translateY, d.translateX, d.translateY, f, h), a(l.rotate, d.rotate, f, h), c(l.skewX, d.skewX, f, h), u(l.scaleX, l.scaleY, d.scaleX, d.scaleY, f, h), l = d = null, function(p) {
      for (var g = -1, b = h.length, x; ++g < b; ) f[(x = h[g]).i] = x.x(p);
      return f.join("");
    };
  };
}
var Tp = ul(Dp, "px, ", "px)", "deg)"), $p = ul(Mp, ", ", ")", ")"), Pp = 1e-12;
function sa(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Lp(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function zp(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Yo = (function e(t, n, o) {
  function r(s, a) {
    var c = s[0], u = s[1], l = s[2], d = a[0], f = a[1], h = a[2], p = d - c, g = f - u, b = p * p + g * g, x, m;
    if (b < Pp)
      m = Math.log(h / l) / t, x = function(j) {
        return [
          c + j * p,
          u + j * g,
          l * Math.exp(t * j * m)
        ];
      };
    else {
      var E = Math.sqrt(b), y = (h * h - l * l + o * b) / (2 * l * n * E), N = (h * h - l * l - o * b) / (2 * h * n * E), k = Math.log(Math.sqrt(y * y + 1) - y), v = Math.log(Math.sqrt(N * N + 1) - N);
      m = (v - k) / t, x = function(j) {
        var _ = j * m, M = sa(k), W = l / (n * E) * (M * zp(t * _ + k) - Lp(k));
        return [
          c + W * p,
          u + W * g,
          l * M / sa(t * _ + k)
        ];
      };
    }
    return x.duration = m * 1e3 * t / Math.SQRT2, x;
  }
  return r.rho = function(s) {
    var a = Math.max(1e-3, +s), c = a * a, u = c * c;
    return e(a, c, u);
  }, r;
})(Math.SQRT2, 2, 4);
var dn = 0, Xn = 0, Vn = 0, dl = 1e3, cr, Un, lr = 0, Ot = 0, Ir = 0, oo = typeof performance == "object" && performance.now ? performance : Date, fl = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function ts() {
  return Ot || (fl(Rp), Ot = oo.now() + Ir);
}
function Rp() {
  Ot = 0;
}
function ur() {
  this._call = this._time = this._next = null;
}
ur.prototype = hl.prototype = {
  constructor: ur,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? ts() : +n) + (t == null ? 0 : +t), !this._next && Un !== this && (Un ? Un._next = this : cr = this, Un = this), this._call = e, this._time = n, _i();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, _i());
  }
};
function hl(e, t, n) {
  var o = new ur();
  return o.restart(e, t, n), o;
}
function Vp() {
  ts(), ++dn;
  for (var e = cr, t; e; )
    (t = Ot - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --dn;
}
function aa() {
  Ot = (lr = oo.now()) + Ir, dn = Xn = 0;
  try {
    Vp();
  } finally {
    dn = 0, Hp(), Ot = 0;
  }
}
function Op() {
  var e = oo.now(), t = e - lr;
  t > dl && (Ir -= t, lr = e);
}
function Hp() {
  for (var e, t = cr, n, o = 1 / 0; t; )
    t._call ? (o > t._time && (o = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : cr = n);
  Un = e, _i(o);
}
function _i(e) {
  if (!dn) {
    Xn && (Xn = clearTimeout(Xn));
    var t = e - Ot;
    t > 24 ? (e < 1 / 0 && (Xn = setTimeout(aa, e - oo.now() - Ir)), Vn && (Vn = clearInterval(Vn))) : (Vn || (lr = oo.now(), Vn = setInterval(Op, dl)), dn = 1, fl(aa));
  }
}
function ca(e, t, n) {
  var o = new ur();
  return t = t == null ? 0 : +t, o.restart((r) => {
    o.stop(), e(r + t);
  }, t, n), o;
}
var Wp = Er("start", "end", "cancel", "interrupt"), Bp = [], pl = 0, la = 1, Di = 2, Zo = 3, ua = 4, Mi = 5, Go = 6;
function Ar(e, t, n, o, r, s) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (n in a) return;
  Fp(e, n, {
    name: t,
    index: o,
    // For context during callback.
    group: r,
    // For context during callback.
    on: Wp,
    tween: Bp,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: pl
  });
}
function ns(e, t) {
  var n = it(e, t);
  if (n.state > pl) throw new Error("too late; already scheduled");
  return n;
}
function lt(e, t) {
  var n = it(e, t);
  if (n.state > Zo) throw new Error("too late; already running");
  return n;
}
function it(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function Fp(e, t, n) {
  var o = e.__transition, r;
  o[t] = n, n.timer = hl(s, 0, n.time);
  function s(l) {
    n.state = la, n.timer.restart(a, n.delay, n.time), n.delay <= l && a(l - n.delay);
  }
  function a(l) {
    var d, f, h, p;
    if (n.state !== la) return u();
    for (d in o)
      if (p = o[d], p.name === n.name) {
        if (p.state === Zo) return ca(a);
        p.state === ua ? (p.state = Go, p.timer.stop(), p.on.call("interrupt", e, e.__data__, p.index, p.group), delete o[d]) : +d < t && (p.state = Go, p.timer.stop(), p.on.call("cancel", e, e.__data__, p.index, p.group), delete o[d]);
      }
    if (ca(function() {
      n.state === Zo && (n.state = ua, n.timer.restart(c, n.delay, n.time), c(l));
    }), n.state = Di, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Di) {
      for (n.state = Zo, r = new Array(h = n.tween.length), d = 0, f = -1; d < h; ++d)
        (p = n.tween[d].value.call(e, e.__data__, n.index, n.group)) && (r[++f] = p);
      r.length = f + 1;
    }
  }
  function c(l) {
    for (var d = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(u), n.state = Mi, 1), f = -1, h = r.length; ++f < h; )
      r[f].call(e, d);
    n.state === Mi && (n.on.call("end", e, e.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = Go, n.timer.stop(), delete o[t];
    for (var l in o) return;
    delete e.__transition;
  }
}
function Jo(e, t) {
  var n = e.__transition, o, r, s = !0, a;
  if (n) {
    t = t == null ? null : t + "";
    for (a in n) {
      if ((o = n[a]).name !== t) {
        s = !1;
        continue;
      }
      r = o.state > Di && o.state < Mi, o.state = Go, o.timer.stop(), o.on.call(r ? "interrupt" : "cancel", e, e.__data__, o.index, o.group), delete n[a];
    }
    s && delete e.__transition;
  }
}
function Kp(e) {
  return this.each(function() {
    Jo(this, e);
  });
}
function qp(e, t) {
  var n, o;
  return function() {
    var r = lt(this, e), s = r.tween;
    if (s !== n) {
      o = n = s;
      for (var a = 0, c = o.length; a < c; ++a)
        if (o[a].name === t) {
          o = o.slice(), o.splice(a, 1);
          break;
        }
    }
    r.tween = o;
  };
}
function Xp(e, t, n) {
  var o, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = lt(this, e), a = s.tween;
    if (a !== o) {
      r = (o = a).slice();
      for (var c = { name: t, value: n }, u = 0, l = r.length; u < l; ++u)
        if (r[u].name === t) {
          r[u] = c;
          break;
        }
      u === l && r.push(c);
    }
    s.tween = r;
  };
}
function Up(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var o = it(this.node(), n).tween, r = 0, s = o.length, a; r < s; ++r)
      if ((a = o[r]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? qp : Xp)(n, e, t));
}
function os(e, t, n) {
  var o = e._id;
  return e.each(function() {
    var r = lt(this, o);
    (r.value || (r.value = {}))[t] = n.apply(this, arguments);
  }), function(r) {
    return it(r, o).value[t];
  };
}
function gl(e, t) {
  var n;
  return (typeof t == "number" ? st : t instanceof Vt ? ar : (n = Vt(t)) ? (t = n, ar) : cl)(e, t);
}
function Yp(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Zp(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Gp(e, t, n) {
  var o, r = n + "", s;
  return function() {
    var a = this.getAttribute(e);
    return a === r ? null : a === o ? s : s = t(o = a, n);
  };
}
function Jp(e, t, n) {
  var o, r = n + "", s;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === r ? null : a === o ? s : s = t(o = a, n);
  };
}
function Qp(e, t, n) {
  var o, r, s;
  return function() {
    var a, c = n(this), u;
    return c == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), u = c + "", a === u ? null : a === o && u === r ? s : (r = u, s = t(o = a, c)));
  };
}
function eg(e, t, n) {
  var o, r, s;
  return function() {
    var a, c = n(this), u;
    return c == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), u = c + "", a === u ? null : a === o && u === r ? s : (r = u, s = t(o = a, c)));
  };
}
function tg(e, t) {
  var n = Cr(e), o = n === "transform" ? $p : gl;
  return this.attrTween(e, typeof t == "function" ? (n.local ? eg : Qp)(n, o, os(this, "attr." + e, t)) : t == null ? (n.local ? Zp : Yp)(n) : (n.local ? Jp : Gp)(n, o, t));
}
function ng(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function og(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function rg(e, t) {
  var n, o;
  function r() {
    var s = t.apply(this, arguments);
    return s !== o && (n = (o = s) && og(e, s)), n;
  }
  return r._value = t, r;
}
function ig(e, t) {
  var n, o;
  function r() {
    var s = t.apply(this, arguments);
    return s !== o && (n = (o = s) && ng(e, s)), n;
  }
  return r._value = t, r;
}
function sg(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var o = Cr(e);
  return this.tween(n, (o.local ? rg : ig)(o, t));
}
function ag(e, t) {
  return function() {
    ns(this, e).delay = +t.apply(this, arguments);
  };
}
function cg(e, t) {
  return t = +t, function() {
    ns(this, e).delay = t;
  };
}
function lg(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ag : cg)(t, e)) : it(this.node(), t).delay;
}
function ug(e, t) {
  return function() {
    lt(this, e).duration = +t.apply(this, arguments);
  };
}
function dg(e, t) {
  return t = +t, function() {
    lt(this, e).duration = t;
  };
}
function fg(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ug : dg)(t, e)) : it(this.node(), t).duration;
}
function hg(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    lt(this, e).ease = t;
  };
}
function pg(e) {
  var t = this._id;
  return arguments.length ? this.each(hg(t, e)) : it(this.node(), t).ease;
}
function gg(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    lt(this, e).ease = n;
  };
}
function yg(e) {
  if (typeof e != "function") throw new Error();
  return this.each(gg(this._id, e));
}
function mg(e) {
  typeof e != "function" && (e = qc(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var s = t[r], a = s.length, c = o[r] = [], u, l = 0; l < a; ++l)
      (u = s[l]) && e.call(u, u.__data__, l, s) && c.push(u);
  return new gt(o, this._parents, this._name, this._id);
}
function xg(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, o = t.length, r = n.length, s = Math.min(o, r), a = new Array(o), c = 0; c < s; ++c)
    for (var u = t[c], l = n[c], d = u.length, f = a[c] = new Array(d), h, p = 0; p < d; ++p)
      (h = u[p] || l[p]) && (f[p] = h);
  for (; c < o; ++c)
    a[c] = t[c];
  return new gt(a, this._parents, this._name, this._id);
}
function wg(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function vg(e, t, n) {
  var o, r, s = wg(t) ? ns : lt;
  return function() {
    var a = s(this, e), c = a.on;
    c !== o && (r = (o = c).copy()).on(t, n), a.on = r;
  };
}
function bg(e, t) {
  var n = this._id;
  return arguments.length < 2 ? it(this.node(), n).on.on(e) : this.each(vg(n, e, t));
}
function Ng(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function jg() {
  return this.on("end.remove", Ng(this._id));
}
function Sg(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Gi(e));
  for (var o = this._groups, r = o.length, s = new Array(r), a = 0; a < r; ++a)
    for (var c = o[a], u = c.length, l = s[a] = new Array(u), d, f, h = 0; h < u; ++h)
      (d = c[h]) && (f = e.call(d, d.__data__, h, c)) && ("__data__" in d && (f.__data__ = d.__data__), l[h] = f, Ar(l[h], t, n, h, l, it(d, n)));
  return new gt(s, this._parents, t, n);
}
function kg(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Kc(e));
  for (var o = this._groups, r = o.length, s = [], a = [], c = 0; c < r; ++c)
    for (var u = o[c], l = u.length, d, f = 0; f < l; ++f)
      if (d = u[f]) {
        for (var h = e.call(d, d.__data__, f, u), p, g = it(d, n), b = 0, x = h.length; b < x; ++b)
          (p = h[b]) && Ar(p, t, n, b, h, g);
        s.push(h), a.push(d);
      }
  return new gt(s, a, t, n);
}
var Eg = po.prototype.constructor;
function Cg() {
  return new Eg(this._groups, this._parents);
}
function Ig(e, t) {
  var n, o, r;
  return function() {
    var s = un(this, e), a = (this.style.removeProperty(e), un(this, e));
    return s === a ? null : s === n && a === o ? r : r = t(n = s, o = a);
  };
}
function yl(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ag(e, t, n) {
  var o, r = n + "", s;
  return function() {
    var a = un(this, e);
    return a === r ? null : a === o ? s : s = t(o = a, n);
  };
}
function _g(e, t, n) {
  var o, r, s;
  return function() {
    var a = un(this, e), c = n(this), u = c + "";
    return c == null && (u = c = (this.style.removeProperty(e), un(this, e))), a === u ? null : a === o && u === r ? s : (r = u, s = t(o = a, c));
  };
}
function Dg(e, t) {
  var n, o, r, s = "style." + t, a = "end." + s, c;
  return function() {
    var u = lt(this, e), l = u.on, d = u.value[s] == null ? c || (c = yl(t)) : void 0;
    (l !== n || r !== d) && (o = (n = l).copy()).on(a, r = d), u.on = o;
  };
}
function Mg(e, t, n) {
  var o = (e += "") == "transform" ? Tp : gl;
  return t == null ? this.styleTween(e, Ig(e, o)).on("end.style." + e, yl(e)) : typeof t == "function" ? this.styleTween(e, _g(e, o, os(this, "style." + e, t))).each(Dg(this._id, e)) : this.styleTween(e, Ag(e, o, t), n).on("end.style." + e, null);
}
function Tg(e, t, n) {
  return function(o) {
    this.style.setProperty(e, t.call(this, o), n);
  };
}
function $g(e, t, n) {
  var o, r;
  function s() {
    var a = t.apply(this, arguments);
    return a !== r && (o = (r = a) && Tg(e, a, n)), o;
  }
  return s._value = t, s;
}
function Pg(e, t, n) {
  var o = "style." + (e += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (t == null) return this.tween(o, null);
  if (typeof t != "function") throw new Error();
  return this.tween(o, $g(e, t, n ?? ""));
}
function Lg(e) {
  return function() {
    this.textContent = e;
  };
}
function zg(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Rg(e) {
  return this.tween("text", typeof e == "function" ? zg(os(this, "text", e)) : Lg(e == null ? "" : e + ""));
}
function Vg(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Og(e) {
  var t, n;
  function o() {
    var r = e.apply(this, arguments);
    return r !== n && (t = (n = r) && Vg(r)), t;
  }
  return o._value = e, o;
}
function Hg(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Og(e));
}
function Wg() {
  for (var e = this._name, t = this._id, n = ml(), o = this._groups, r = o.length, s = 0; s < r; ++s)
    for (var a = o[s], c = a.length, u, l = 0; l < c; ++l)
      if (u = a[l]) {
        var d = it(u, t);
        Ar(u, e, n, l, a, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease
        });
      }
  return new gt(o, this._parents, e, n);
}
function Bg() {
  var e, t, n = this, o = n._id, r = n.size();
  return new Promise(function(s, a) {
    var c = { value: a }, u = { value: function() {
      --r === 0 && s();
    } };
    n.each(function() {
      var l = lt(this, o), d = l.on;
      d !== e && (t = (e = d).copy(), t._.cancel.push(c), t._.interrupt.push(c), t._.end.push(u)), l.on = t;
    }), r === 0 && s();
  });
}
var Fg = 0;
function gt(e, t, n, o) {
  this._groups = e, this._parents = t, this._name = n, this._id = o;
}
function ml() {
  return ++Fg;
}
var ht = po.prototype;
gt.prototype = {
  constructor: gt,
  select: Sg,
  selectAll: kg,
  selectChild: ht.selectChild,
  selectChildren: ht.selectChildren,
  filter: mg,
  merge: xg,
  selection: Cg,
  transition: Wg,
  call: ht.call,
  nodes: ht.nodes,
  node: ht.node,
  size: ht.size,
  empty: ht.empty,
  each: ht.each,
  on: bg,
  attr: tg,
  attrTween: sg,
  style: Mg,
  styleTween: Pg,
  text: Rg,
  textTween: Hg,
  remove: jg,
  tween: Up,
  delay: lg,
  duration: fg,
  ease: pg,
  easeVarying: yg,
  end: Bg,
  [Symbol.iterator]: ht[Symbol.iterator]
};
function Kg(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var qg = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Kg
};
function Xg(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Ug(e) {
  var t, n;
  e instanceof gt ? (t = e._id, e = e._name) : (t = ml(), (n = qg).time = ts(), e = e == null ? null : e + "");
  for (var o = this._groups, r = o.length, s = 0; s < r; ++s)
    for (var a = o[s], c = a.length, u, l = 0; l < c; ++l)
      (u = a[l]) && Ar(u, e, t, l, a, n || Xg(u, t));
  return new gt(o, this._parents, e, t);
}
po.prototype.interrupt = Kp;
po.prototype.transition = Ug;
const Ho = (e) => () => e;
function Yg(e, {
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
function pt(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
pt.prototype = {
  constructor: pt,
  scale: function(e) {
    return e === 1 ? this : new pt(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new pt(this.k, this.x + this.k * e, this.y + this.k * t);
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
var _r = new pt(1, 0, 0);
xl.prototype = pt.prototype;
function xl(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return _r;
  return e.__zoom;
}
function li(e) {
  e.stopImmediatePropagation();
}
function On(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Zg(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Gg() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function da() {
  return this.__zoom || _r;
}
function Jg(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Qg() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ey(e, t, n) {
  var o = e.invertX(t[0][0]) - n[0][0], r = e.invertX(t[1][0]) - n[1][0], s = e.invertY(t[0][1]) - n[0][1], a = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r),
    a > s ? (s + a) / 2 : Math.min(0, s) || Math.max(0, a)
  );
}
function wl() {
  var e = Zg, t = Gg, n = ey, o = Jg, r = Qg, s = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], c = 250, u = Yo, l = Er("start", "zoom", "end"), d, f, h, p = 500, g = 150, b = 0, x = 10;
  function m(S) {
    S.property("__zoom", da).on("wheel.zoom", _, { passive: !1 }).on("mousedown.zoom", M).on("dblclick.zoom", W).filter(r).on("touchstart.zoom", D).on("touchmove.zoom", T).on("touchend.zoom touchcancel.zoom", R).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  m.transform = function(S, A, I, $) {
    var L = S.selection ? S.selection() : S;
    L.property("__zoom", da), S !== L ? k(S, A, I, $) : L.interrupt().each(function() {
      v(this, arguments).event($).start().zoom(null, typeof A == "function" ? A.apply(this, arguments) : A).end();
    });
  }, m.scaleBy = function(S, A, I, $) {
    m.scaleTo(S, function() {
      var L = this.__zoom.k, P = typeof A == "function" ? A.apply(this, arguments) : A;
      return L * P;
    }, I, $);
  }, m.scaleTo = function(S, A, I, $) {
    m.transform(S, function() {
      var L = t.apply(this, arguments), P = this.__zoom, B = I == null ? N(L) : typeof I == "function" ? I.apply(this, arguments) : I, K = P.invert(B), O = typeof A == "function" ? A.apply(this, arguments) : A;
      return n(y(E(P, O), B, K), L, a);
    }, I, $);
  }, m.translateBy = function(S, A, I, $) {
    m.transform(S, function() {
      return n(this.__zoom.translate(
        typeof A == "function" ? A.apply(this, arguments) : A,
        typeof I == "function" ? I.apply(this, arguments) : I
      ), t.apply(this, arguments), a);
    }, null, $);
  }, m.translateTo = function(S, A, I, $, L) {
    m.transform(S, function() {
      var P = t.apply(this, arguments), B = this.__zoom, K = $ == null ? N(P) : typeof $ == "function" ? $.apply(this, arguments) : $;
      return n(_r.translate(K[0], K[1]).scale(B.k).translate(
        typeof A == "function" ? -A.apply(this, arguments) : -A,
        typeof I == "function" ? -I.apply(this, arguments) : -I
      ), P, a);
    }, $, L);
  };
  function E(S, A) {
    return A = Math.max(s[0], Math.min(s[1], A)), A === S.k ? S : new pt(A, S.x, S.y);
  }
  function y(S, A, I) {
    var $ = A[0] - I[0] * S.k, L = A[1] - I[1] * S.k;
    return $ === S.x && L === S.y ? S : new pt(S.k, $, L);
  }
  function N(S) {
    return [(+S[0][0] + +S[1][0]) / 2, (+S[0][1] + +S[1][1]) / 2];
  }
  function k(S, A, I, $) {
    S.on("start.zoom", function() {
      v(this, arguments).event($).start();
    }).on("interrupt.zoom end.zoom", function() {
      v(this, arguments).event($).end();
    }).tween("zoom", function() {
      var L = this, P = arguments, B = v(L, P).event($), K = t.apply(L, P), O = I == null ? N(K) : typeof I == "function" ? I.apply(L, P) : I, Z = Math.max(K[1][0] - K[0][0], K[1][1] - K[0][1]), X = L.__zoom, oe = typeof A == "function" ? A.apply(L, P) : A, se = u(X.invert(O).concat(Z / X.k), oe.invert(O).concat(Z / oe.k));
      return function(G) {
        if (G === 1) G = oe;
        else {
          var V = se(G), Y = Z / V[2];
          G = new pt(Y, O[0] - V[0] * Y, O[1] - V[1] * Y);
        }
        B.zoom(null, G);
      };
    });
  }
  function v(S, A, I) {
    return !I && S.__zooming || new j(S, A);
  }
  function j(S, A) {
    this.that = S, this.args = A, this.active = 0, this.sourceEvent = null, this.extent = t.apply(S, A), this.taps = 0;
  }
  j.prototype = {
    event: function(S) {
      return S && (this.sourceEvent = S), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(S, A) {
      return this.mouse && S !== "mouse" && (this.mouse[1] = A.invert(this.mouse[0])), this.touch0 && S !== "touch" && (this.touch0[1] = A.invert(this.touch0[0])), this.touch1 && S !== "touch" && (this.touch1[1] = A.invert(this.touch1[0])), this.that.__zoom = A, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(S) {
      var A = Xe(this.that).datum();
      l.call(
        S,
        this.that,
        new Yg(S, {
          sourceEvent: this.sourceEvent,
          target: m,
          transform: this.that.__zoom,
          dispatch: l
        }),
        A
      );
    }
  };
  function _(S, ...A) {
    if (!e.apply(this, arguments)) return;
    var I = v(this, A).event(S), $ = this.__zoom, L = Math.max(s[0], Math.min(s[1], $.k * Math.pow(2, o.apply(this, arguments)))), P = et(S);
    if (I.wheel)
      (I.mouse[0][0] !== P[0] || I.mouse[0][1] !== P[1]) && (I.mouse[1] = $.invert(I.mouse[0] = P)), clearTimeout(I.wheel);
    else {
      if ($.k === L) return;
      I.mouse = [P, $.invert(P)], Jo(this), I.start();
    }
    On(S), I.wheel = setTimeout(B, g), I.zoom("mouse", n(y(E($, L), I.mouse[0], I.mouse[1]), I.extent, a));
    function B() {
      I.wheel = null, I.end();
    }
  }
  function M(S, ...A) {
    if (h || !e.apply(this, arguments)) return;
    var I = S.currentTarget, $ = v(this, A, !0).event(S), L = Xe(S.view).on("mousemove.zoom", O, !0).on("mouseup.zoom", Z, !0), P = et(S, I), B = S.clientX, K = S.clientY;
    nl(S.view), li(S), $.mouse = [P, this.__zoom.invert(P)], Jo(this), $.start();
    function O(X) {
      if (On(X), !$.moved) {
        var oe = X.clientX - B, se = X.clientY - K;
        $.moved = oe * oe + se * se > b;
      }
      $.event(X).zoom("mouse", n(y($.that.__zoom, $.mouse[0] = et(X, I), $.mouse[1]), $.extent, a));
    }
    function Z(X) {
      L.on("mousemove.zoom mouseup.zoom", null), ol(X.view, $.moved), On(X), $.event(X).end();
    }
  }
  function W(S, ...A) {
    if (e.apply(this, arguments)) {
      var I = this.__zoom, $ = et(S.changedTouches ? S.changedTouches[0] : S, this), L = I.invert($), P = I.k * (S.shiftKey ? 0.5 : 2), B = n(y(E(I, P), $, L), t.apply(this, A), a);
      On(S), c > 0 ? Xe(this).transition().duration(c).call(k, B, $, S) : Xe(this).call(m.transform, B, $, S);
    }
  }
  function D(S, ...A) {
    if (e.apply(this, arguments)) {
      var I = S.touches, $ = I.length, L = v(this, A, S.changedTouches.length === $).event(S), P, B, K, O;
      for (li(S), B = 0; B < $; ++B)
        K = I[B], O = et(K, this), O = [O, this.__zoom.invert(O), K.identifier], L.touch0 ? !L.touch1 && L.touch0[2] !== O[2] && (L.touch1 = O, L.taps = 0) : (L.touch0 = O, P = !0, L.taps = 1 + !!d);
      d && (d = clearTimeout(d)), P && (L.taps < 2 && (f = O[0], d = setTimeout(function() {
        d = null;
      }, p)), Jo(this), L.start());
    }
  }
  function T(S, ...A) {
    if (this.__zooming) {
      var I = v(this, A).event(S), $ = S.changedTouches, L = $.length, P, B, K, O;
      for (On(S), P = 0; P < L; ++P)
        B = $[P], K = et(B, this), I.touch0 && I.touch0[2] === B.identifier ? I.touch0[0] = K : I.touch1 && I.touch1[2] === B.identifier && (I.touch1[0] = K);
      if (B = I.that.__zoom, I.touch1) {
        var Z = I.touch0[0], X = I.touch0[1], oe = I.touch1[0], se = I.touch1[1], G = (G = oe[0] - Z[0]) * G + (G = oe[1] - Z[1]) * G, V = (V = se[0] - X[0]) * V + (V = se[1] - X[1]) * V;
        B = E(B, Math.sqrt(G / V)), K = [(Z[0] + oe[0]) / 2, (Z[1] + oe[1]) / 2], O = [(X[0] + se[0]) / 2, (X[1] + se[1]) / 2];
      } else if (I.touch0) K = I.touch0[0], O = I.touch0[1];
      else return;
      I.zoom("touch", n(y(B, K, O), I.extent, a));
    }
  }
  function R(S, ...A) {
    if (this.__zooming) {
      var I = v(this, A).event(S), $ = S.changedTouches, L = $.length, P, B;
      for (li(S), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, p), P = 0; P < L; ++P)
        B = $[P], I.touch0 && I.touch0[2] === B.identifier ? delete I.touch0 : I.touch1 && I.touch1[2] === B.identifier && delete I.touch1;
      if (I.touch1 && !I.touch0 && (I.touch0 = I.touch1, delete I.touch1), I.touch0) I.touch0[1] = this.__zoom.invert(I.touch0[0]);
      else if (I.end(), I.taps === 2 && (B = et(B, this), Math.hypot(f[0] - B[0], f[1] - B[1]) < x)) {
        var K = Xe(this).on("dblclick.zoom");
        K && K.apply(this, arguments);
      }
    }
  }
  return m.wheelDelta = function(S) {
    return arguments.length ? (o = typeof S == "function" ? S : Ho(+S), m) : o;
  }, m.filter = function(S) {
    return arguments.length ? (e = typeof S == "function" ? S : Ho(!!S), m) : e;
  }, m.touchable = function(S) {
    return arguments.length ? (r = typeof S == "function" ? S : Ho(!!S), m) : r;
  }, m.extent = function(S) {
    return arguments.length ? (t = typeof S == "function" ? S : Ho([[+S[0][0], +S[0][1]], [+S[1][0], +S[1][1]]]), m) : t;
  }, m.scaleExtent = function(S) {
    return arguments.length ? (s[0] = +S[0], s[1] = +S[1], m) : [s[0], s[1]];
  }, m.translateExtent = function(S) {
    return arguments.length ? (a[0][0] = +S[0][0], a[1][0] = +S[1][0], a[0][1] = +S[0][1], a[1][1] = +S[1][1], m) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, m.constrain = function(S) {
    return arguments.length ? (n = S, m) : n;
  }, m.duration = function(S) {
    return arguments.length ? (c = +S, m) : c;
  }, m.interpolate = function(S) {
    return arguments.length ? (u = S, m) : u;
  }, m.on = function() {
    var S = l.on.apply(l, arguments);
    return S === l ? m : S;
  }, m.clickDistance = function(S) {
    return arguments.length ? (b = (S = +S) * S, m) : Math.sqrt(b);
  }, m.tapDistance = function(S) {
    return arguments.length ? (x = +S, m) : x;
  }, m;
}
const Ye = {
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
}, ro = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], vl = ["Enter", " ", "Escape"], bl = {
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
var fn;
(function(e) {
  e.Strict = "strict", e.Loose = "loose";
})(fn || (fn = {}));
var Lt;
(function(e) {
  e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(Lt || (Lt = {}));
var io;
(function(e) {
  e.Partial = "partial", e.Full = "full";
})(io || (io = {}));
const Nl = {
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
var Nt;
(function(e) {
  e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(Nt || (Nt = {}));
var dr;
(function(e) {
  e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(dr || (dr = {}));
var ne;
(function(e) {
  e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(ne || (ne = {}));
const fa = {
  [ne.Left]: ne.Right,
  [ne.Right]: ne.Left,
  [ne.Top]: ne.Bottom,
  [ne.Bottom]: ne.Top
};
function jl(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const Sl = (e) => "id" in e && "source" in e && "target" in e, ty = (e) => "id" in e && "position" in e && !("source" in e) && !("target" in e), rs = (e) => "id" in e && "internals" in e && !("source" in e) && !("target" in e), yo = (e, t = [0, 0]) => {
  const { width: n, height: o } = mt(e), r = e.origin ?? t, s = n * r[0], a = o * r[1];
  return {
    x: e.position.x - s,
    y: e.position.y - a
  };
}, ny = (e, t = { nodeOrigin: [0, 0] }) => {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const n = e.reduce((o, r) => {
    const s = typeof r == "string";
    let a = !t.nodeLookup && !s ? r : void 0;
    t.nodeLookup && (a = s ? t.nodeLookup.get(r) : rs(r) ? r : t.nodeLookup.get(r.id));
    const c = a ? fr(a, t.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return Dr(o, c);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return Mr(n);
}, mo = (e, t = {}) => {
  let n = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, o = !1;
  return e.forEach((r) => {
    (t.filter === void 0 || t.filter(r)) && (n = Dr(n, fr(r)), o = !0);
  }), o ? Mr(n) : { x: 0, y: 0, width: 0, height: 0 };
}, is = (e, t, [n, o, r] = [0, 0, 1], s = !1, a = !1) => {
  const c = {
    ...vn(t, [n, o, r]),
    width: t.width / r,
    height: t.height / r
  }, u = [];
  for (const l of e.values()) {
    const { measured: d, selectable: f = !0, hidden: h = !1 } = l;
    if (a && !f || h)
      continue;
    const p = d.width ?? l.width ?? l.initialWidth ?? null, g = d.height ?? l.height ?? l.initialHeight ?? null, b = so(c, pn(l)), x = (p ?? 0) * (g ?? 0), m = s && b > 0;
    (!l.internals.handleBounds || m || b >= x || l.dragging) && u.push(l);
  }
  return u;
}, oy = (e, t) => {
  const n = /* @__PURE__ */ new Set();
  return e.forEach((o) => {
    n.add(o.id);
  }), t.filter((o) => n.has(o.source) || n.has(o.target));
};
function ry(e, t) {
  const n = /* @__PURE__ */ new Map(), o = t?.nodes ? new Set(t.nodes.map((r) => r.id)) : null;
  return e.forEach((r) => {
    r.measured.width && r.measured.height && (t?.includeHiddenNodes || !r.hidden) && (!o || o.has(r.id)) && n.set(r.id, r);
  }), n;
}
async function iy({ nodes: e, width: t, height: n, panZoom: o, minZoom: r, maxZoom: s }, a) {
  if (e.size === 0)
    return !0;
  const c = ry(e, a), u = mo(c), l = as(u, t, n, a?.minZoom ?? r, a?.maxZoom ?? s, a?.padding ?? 0.1);
  return await o.setViewport(l, {
    duration: a?.duration,
    ease: a?.ease,
    interpolate: a?.interpolate
  }), !0;
}
function kl({ nodeId: e, nextPosition: t, nodeLookup: n, nodeOrigin: o = [0, 0], nodeExtent: r, onError: s }) {
  const a = n.get(e), c = a.parentId ? n.get(a.parentId) : void 0, { x: u, y: l } = c ? c.internals.positionAbsolute : { x: 0, y: 0 }, d = a.origin ?? o;
  let f = a.extent || r;
  if (a.extent === "parent" && !a.expandParent)
    if (!c)
      s?.("005", Ye.error005());
    else {
      const p = c.measured.width, g = c.measured.height;
      p && g && (f = [
        [u, l],
        [u + p, l + g]
      ]);
    }
  else c && Wt(a.extent) && (f = [
    [a.extent[0][0] + u, a.extent[0][1] + l],
    [a.extent[1][0] + u, a.extent[1][1] + l]
  ]);
  const h = Wt(f) ? Ht(t, f, a.measured) : t;
  return (a.measured.width === void 0 || a.measured.height === void 0) && s?.("015", Ye.error015()), {
    position: {
      x: h.x - u + (a.measured.width ?? 0) * d[0],
      y: h.y - l + (a.measured.height ?? 0) * d[1]
    },
    positionAbsolute: h
  };
}
async function sy({ nodesToRemove: e = [], edgesToRemove: t = [], nodes: n, edges: o, onBeforeDelete: r }) {
  const s = new Set(e.map((h) => h.id)), a = [];
  for (const h of n) {
    if (h.deletable === !1)
      continue;
    const p = s.has(h.id), g = !p && h.parentId && a.find((b) => b.id === h.parentId);
    (p || g) && a.push(h);
  }
  const c = new Set(t.map((h) => h.id)), u = o.filter((h) => h.deletable !== !1), d = oy(a, u);
  for (const h of u)
    c.has(h.id) && !d.find((g) => g.id === h.id) && d.push(h);
  if (!r)
    return {
      edges: d,
      nodes: a
    };
  const f = await r({
    nodes: a,
    edges: d
  });
  return typeof f == "boolean" ? f ? { edges: d, nodes: a } : { edges: [], nodes: [] } : f;
}
const hn = (e, t = 0, n = 1) => Math.min(Math.max(e, t), n), Ht = (e = { x: 0, y: 0 }, t, n) => ({
  x: hn(e.x, t[0][0], t[1][0] - (n?.width ?? 0)),
  y: hn(e.y, t[0][1], t[1][1] - (n?.height ?? 0))
});
function El(e, t, n) {
  const { width: o, height: r } = mt(n), { x: s, y: a } = n.internals.positionAbsolute;
  return Ht(e, [
    [s, a],
    [s + o, a + r]
  ], t);
}
const ha = (e, t, n) => e < t ? hn(Math.abs(e - t), 1, t) / t : e > n ? -hn(Math.abs(e - n), 1, t) / t : 0, ss = (e, t, n = 15, o = 40) => {
  const r = ha(e.x, o, t.width - o) * n, s = ha(e.y, o, t.height - o) * n;
  return [r, s];
}, Dr = (e, t) => ({
  x: Math.min(e.x, t.x),
  y: Math.min(e.y, t.y),
  x2: Math.max(e.x2, t.x2),
  y2: Math.max(e.y2, t.y2)
}), Ti = ({ x: e, y: t, width: n, height: o }) => ({
  x: e,
  y: t,
  x2: e + n,
  y2: t + o
}), Mr = ({ x: e, y: t, x2: n, y2: o }) => ({
  x: e,
  y: t,
  width: n - e,
  height: o - t
}), pn = (e, t = [0, 0]) => {
  const { x: n, y: o } = rs(e) ? e.internals.positionAbsolute : yo(e, t);
  return {
    x: n,
    y: o,
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}, fr = (e, t = [0, 0]) => {
  const { x: n, y: o } = rs(e) ? e.internals.positionAbsolute : yo(e, t);
  return {
    x: n,
    y: o,
    x2: n + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
    y2: o + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
  };
}, Cl = (e, t) => Mr(Dr(Ti(e), Ti(t))), so = (e, t) => {
  const n = Math.max(0, Math.min(e.x + e.width, t.x + t.width) - Math.max(e.x, t.x)), o = Math.max(0, Math.min(e.y + e.height, t.y + t.height) - Math.max(e.y, t.y));
  return Math.ceil(n * o);
}, pa = (e) => nt(e.width) && nt(e.height) && nt(e.x) && nt(e.y), nt = (e) => !isNaN(e) && isFinite(e), Il = (e, t) => (n, o) => {
}, xo = (e, t = [1, 1]) => ({
  x: t[0] * Math.round(e.x / t[0]),
  y: t[1] * Math.round(e.y / t[1])
}), vn = ({ x: e, y: t }, [n, o, r], s = !1, a = [1, 1]) => {
  const c = {
    x: (e - n) / r,
    y: (t - o) / r
  };
  return s ? xo(c, a) : c;
}, gn = ({ x: e, y: t }, [n, o, r]) => ({
  x: e * r + n,
  y: t * r + o
});
function nn(e, t) {
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
function ay(e, t, n) {
  if (typeof e == "string" || typeof e == "number") {
    const o = nn(e, n), r = nn(e, t);
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
    const o = nn(e.top ?? e.y ?? 0, n), r = nn(e.bottom ?? e.y ?? 0, n), s = nn(e.left ?? e.x ?? 0, t), a = nn(e.right ?? e.x ?? 0, t);
    return { top: o, right: a, bottom: r, left: s, x: s + a, y: o + r };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function cy(e, t, n, o, r, s) {
  const { x: a, y: c } = gn(e, [t, n, o]), { x: u, y: l } = gn({ x: e.x + e.width, y: e.y + e.height }, [t, n, o]), d = r - u, f = s - l;
  return {
    left: Math.floor(a),
    top: Math.floor(c),
    right: Math.floor(d),
    bottom: Math.floor(f)
  };
}
const as = (e, t, n, o, r, s) => {
  const a = ay(s, t, n), c = (t - a.x) / e.width, u = (n - a.y) / e.height, l = Math.min(c, u), d = hn(l, o, r), f = e.x + e.width / 2, h = e.y + e.height / 2, p = t / 2 - f * d, g = n / 2 - h * d, b = cy(e, p, g, d, t, n), x = {
    left: Math.min(b.left - a.left, 0),
    top: Math.min(b.top - a.top, 0),
    right: Math.min(b.right - a.right, 0),
    bottom: Math.min(b.bottom - a.bottom, 0)
  };
  return {
    x: p - x.left + x.right,
    y: g - x.top + x.bottom,
    zoom: d
  };
}, ao = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Wt(e) {
  return e != null && e !== "parent";
}
function mt(e) {
  return {
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}
function Al(e) {
  return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function _l(e, t = { width: 0, height: 0 }, n, o, r) {
  const s = { ...e }, a = o.get(n);
  if (a) {
    const c = a.origin || r;
    s.x += a.internals.positionAbsolute.x - (t.width ?? 0) * c[0], s.y += a.internals.positionAbsolute.y - (t.height ?? 0) * c[1];
  }
  return s;
}
function ga(e, t) {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
}
function ly() {
  let e, t;
  return { promise: new Promise((o, r) => {
    e = o, t = r;
  }), resolve: e, reject: t };
}
function uy(e) {
  return { ...bl, ...e || {} };
}
function Gn(e, { snapGrid: t = [0, 0], snapToGrid: n = !1, transform: o, containerBounds: r }) {
  const { x: s, y: a } = ot(e), c = vn({ x: s - (r?.left ?? 0), y: a - (r?.top ?? 0) }, o), { x: u, y: l } = n ? xo(c, t) : c;
  return {
    xSnapped: u,
    ySnapped: l,
    ...c
  };
}
const cs = (e) => ({
  width: e.offsetWidth,
  height: e.offsetHeight
}), Dl = (e) => e?.getRootNode?.() || window?.document, dy = ["INPUT", "SELECT", "TEXTAREA"];
function Ml(e) {
  const t = e.composedPath?.()?.[0] || e.target;
  return t?.nodeType !== 1 ? !1 : dy.includes(t.nodeName) || t.hasAttribute("contenteditable") || !!t.closest(".nokey");
}
const Tl = (e) => "clientX" in e, ot = (e, t) => {
  const n = Tl(e), o = n ? e.clientX : e.touches?.[0].clientX, r = n ? e.clientY : e.touches?.[0].clientY;
  return {
    x: o - (t?.left ?? 0),
    y: r - (t?.top ?? 0)
  };
}, ya = (e, t, n, o, r) => {
  const s = t.querySelectorAll(`.${e}`);
  return !s || !s.length ? null : Array.from(s).map((a) => {
    const c = a.getBoundingClientRect();
    return {
      id: a.getAttribute("data-handleid"),
      type: e,
      nodeId: r,
      position: a.getAttribute("data-handlepos"),
      x: (c.left - n.left) / o,
      y: (c.top - n.top) / o,
      ...cs(a)
    };
  });
};
function $l({ sourceX: e, sourceY: t, targetX: n, targetY: o, sourceControlX: r, sourceControlY: s, targetControlX: a, targetControlY: c }) {
  const u = e * 0.125 + r * 0.375 + a * 0.375 + n * 0.125, l = t * 0.125 + s * 0.375 + c * 0.375 + o * 0.125, d = Math.abs(u - e), f = Math.abs(l - t);
  return [u, l, d, f];
}
function Wo(e, t) {
  return e >= 0 ? 0.5 * e : t * 25 * Math.sqrt(-e);
}
function ma({ pos: e, x1: t, y1: n, x2: o, y2: r, c: s }) {
  switch (e) {
    case ne.Left:
      return [t - Wo(t - o, s), n];
    case ne.Right:
      return [t + Wo(o - t, s), n];
    case ne.Top:
      return [t, n - Wo(n - r, s)];
    case ne.Bottom:
      return [t, n + Wo(r - n, s)];
  }
}
function Pl({ sourceX: e, sourceY: t, sourcePosition: n = ne.Bottom, targetX: o, targetY: r, targetPosition: s = ne.Top, curvature: a = 0.25 }) {
  const [c, u] = ma({
    pos: n,
    x1: e,
    y1: t,
    x2: o,
    y2: r,
    c: a
  }), [l, d] = ma({
    pos: s,
    x1: o,
    y1: r,
    x2: e,
    y2: t,
    c: a
  }), [f, h, p, g] = $l({
    sourceX: e,
    sourceY: t,
    targetX: o,
    targetY: r,
    sourceControlX: c,
    sourceControlY: u,
    targetControlX: l,
    targetControlY: d
  });
  return [
    `M${e},${t} C${c},${u} ${l},${d} ${o},${r}`,
    f,
    h,
    p,
    g
  ];
}
function Ll({ sourceX: e, sourceY: t, targetX: n, targetY: o }) {
  const r = Math.abs(n - e) / 2, s = n < e ? n + r : n - r, a = Math.abs(o - t) / 2, c = o < t ? o + a : o - a;
  return [s, c, r, a];
}
function fy({ sourceNode: e, targetNode: t, selected: n = !1, zIndex: o = 0, elevateOnSelect: r = !1, zIndexMode: s = "basic" }) {
  if (s === "manual")
    return o;
  const a = r && n ? o + 1e3 : o, c = Math.max(e.parentId || r && e.selected ? e.internals.z : 0, t.parentId || r && t.selected ? t.internals.z : 0);
  return a + c;
}
function hy({ sourceNode: e, targetNode: t, width: n, height: o, transform: r }) {
  const s = Dr(fr(e), fr(t));
  s.x === s.x2 && (s.x2 += 1), s.y === s.y2 && (s.y2 += 1);
  const a = {
    x: -r[0] / r[2],
    y: -r[1] / r[2],
    width: n / r[2],
    height: o / r[2]
  };
  return so(a, Mr(s)) > 0;
}
const zl = ({ source: e, sourceHandle: t, target: n, targetHandle: o }) => `xy-edge__${e}${t || ""}-${n}${o || ""}`, py = (e, t) => t.some((n) => n.source === e.source && n.target === e.target && (n.sourceHandle === e.sourceHandle || !n.sourceHandle && !e.sourceHandle) && (n.targetHandle === e.targetHandle || !n.targetHandle && !e.targetHandle)), gy = (e, t, n = {}) => {
  if (!e.source || !e.target)
    return n.onError?.("006", Ye.error006()), t;
  const o = n.getEdgeId || zl;
  let r;
  return Sl(e) ? r = { ...e } : r = {
    ...e,
    id: o(e)
  }, py(r, t) ? t : (r.sourceHandle === null && delete r.sourceHandle, r.targetHandle === null && delete r.targetHandle, t.concat(r));
}, yy = (e, t, n, o = { shouldReplaceId: !0 }) => {
  const { id: r, ...s } = e;
  if (!t.source || !t.target)
    return o.onError?.("006", Ye.error006()), n;
  if (!n.find((l) => l.id === e.id))
    return o.onError?.("007", Ye.error007(r)), n;
  const c = o.getEdgeId || zl, u = {
    ...s,
    id: o.shouldReplaceId ? c(t) : r,
    source: t.source,
    target: t.target,
    sourceHandle: t.sourceHandle,
    targetHandle: t.targetHandle
  };
  return n.filter((l) => l.id !== r).concat(u);
};
function Rl({ sourceX: e, sourceY: t, targetX: n, targetY: o }) {
  const [r, s, a, c] = Ll({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: o
  });
  return [`M ${e},${t}L ${n},${o}`, r, s, a, c];
}
const xa = {
  [ne.Left]: { x: -1, y: 0 },
  [ne.Right]: { x: 1, y: 0 },
  [ne.Top]: { x: 0, y: -1 },
  [ne.Bottom]: { x: 0, y: 1 }
}, my = ({ source: e, sourcePosition: t = ne.Bottom, target: n }) => t === ne.Left || t === ne.Right ? e.x < n.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < n.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, wa = (e, t) => Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
function xy({ source: e, sourcePosition: t = ne.Bottom, target: n, targetPosition: o = ne.Top, center: r, offset: s, stepPosition: a }) {
  const c = xa[t], u = xa[o], l = { x: e.x + c.x * s, y: e.y + c.y * s }, d = { x: n.x + u.x * s, y: n.y + u.y * s }, f = my({
    source: l,
    sourcePosition: t,
    target: d
  }), h = f.x !== 0 ? "x" : "y", p = f[h];
  let g = [], b, x;
  const m = { x: 0, y: 0 }, E = { x: 0, y: 0 }, [, , y, N] = Ll({
    sourceX: e.x,
    sourceY: e.y,
    targetX: n.x,
    targetY: n.y
  });
  if (c[h] * u[h] === -1) {
    h === "x" ? (b = r.x ?? l.x + (d.x - l.x) * a, x = r.y ?? (l.y + d.y) / 2) : (b = r.x ?? (l.x + d.x) / 2, x = r.y ?? l.y + (d.y - l.y) * a);
    const _ = [
      { x: b, y: l.y },
      { x: b, y: d.y }
    ], M = [
      { x: l.x, y: x },
      { x: d.x, y: x }
    ];
    c[h] === p ? g = h === "x" ? _ : M : g = h === "x" ? M : _;
  } else {
    const _ = [{ x: l.x, y: d.y }], M = [{ x: d.x, y: l.y }];
    if (h === "x" ? g = c.x === p ? M : _ : g = c.y === p ? _ : M, t === o) {
      const S = Math.abs(e[h] - n[h]);
      if (S <= s) {
        const A = Math.min(s - 1, s - S);
        c[h] === p ? m[h] = (l[h] > e[h] ? -1 : 1) * A : E[h] = (d[h] > n[h] ? -1 : 1) * A;
      }
    }
    if (t !== o) {
      const S = h === "x" ? "y" : "x", A = c[h] === u[S], I = l[S] > d[S], $ = l[S] < d[S];
      (c[h] === 1 && (!A && I || A && $) || c[h] !== 1 && (!A && $ || A && I)) && (g = h === "x" ? _ : M);
    }
    const W = { x: l.x + m.x, y: l.y + m.y }, D = { x: d.x + E.x, y: d.y + E.y }, T = Math.max(Math.abs(W.x - g[0].x), Math.abs(D.x - g[0].x)), R = Math.max(Math.abs(W.y - g[0].y), Math.abs(D.y - g[0].y));
    T >= R ? (b = (W.x + D.x) / 2, x = g[0].y) : (b = g[0].x, x = (W.y + D.y) / 2);
  }
  const k = { x: l.x + m.x, y: l.y + m.y }, v = { x: d.x + E.x, y: d.y + E.y };
  return [[
    e,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...k.x !== g[0].x || k.y !== g[0].y ? [k] : [],
    ...g,
    ...v.x !== g[g.length - 1].x || v.y !== g[g.length - 1].y ? [v] : [],
    n
  ], b, x, y, N];
}
function wy(e, t, n, o) {
  const r = Math.min(wa(e, t) / 2, wa(t, n) / 2, o), { x: s, y: a } = t;
  if (e.x === s && s === n.x || e.y === a && a === n.y)
    return `L${s} ${a}`;
  if (e.y === a) {
    const l = e.x < n.x ? -1 : 1, d = e.y < n.y ? 1 : -1;
    return `L ${s + r * l},${a}Q ${s},${a} ${s},${a + r * d}`;
  }
  const c = e.x < n.x ? 1 : -1, u = e.y < n.y ? -1 : 1;
  return `L ${s},${a + r * u}Q ${s},${a} ${s + r * c},${a}`;
}
function hr({ sourceX: e, sourceY: t, sourcePosition: n = ne.Bottom, targetX: o, targetY: r, targetPosition: s = ne.Top, borderRadius: a = 5, centerX: c, centerY: u, offset: l = 20, stepPosition: d = 0.5 }) {
  const [f, h, p, g, b] = xy({
    source: { x: e, y: t },
    sourcePosition: n,
    target: { x: o, y: r },
    targetPosition: s,
    center: { x: c, y: u },
    offset: l,
    stepPosition: d
  });
  let x = `M${f[0].x} ${f[0].y}`;
  for (let m = 1; m < f.length - 1; m++)
    x += wy(f[m - 1], f[m], f[m + 1], a);
  return x += `L${f[f.length - 1].x} ${f[f.length - 1].y}`, [x, h, p, g, b];
}
function va(e) {
  return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function vy(e) {
  const { sourceNode: t, targetNode: n } = e;
  if (!va(t) || !va(n))
    return null;
  const o = t.internals.handleBounds || ba(t.handles), r = n.internals.handleBounds || ba(n.handles), s = Na(o?.source ?? [], e.sourceHandle), a = Na(
    // when connection type is loose we can define all handles as sources and connect source -> source
    e.connectionMode === fn.Strict ? r?.target ?? [] : (r?.target ?? []).concat(r?.source ?? []),
    e.targetHandle
  );
  if (!s || !a)
    return e.onError?.("008", Ye.error008(s ? "target" : "source", {
      id: e.id,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle
    })), null;
  const c = s?.position || ne.Bottom, u = a?.position || ne.Top, l = Bt(t, s, c), d = Bt(n, a, u);
  return {
    sourceX: l.x,
    sourceY: l.y,
    targetX: d.x,
    targetY: d.y,
    sourcePosition: c,
    targetPosition: u
  };
}
function ba(e) {
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
function Bt(e, t, n = ne.Left, o = !1) {
  const r = (t?.x ?? 0) + e.internals.positionAbsolute.x, s = (t?.y ?? 0) + e.internals.positionAbsolute.y, { width: a, height: c } = t ?? mt(e);
  if (o)
    return { x: r + a / 2, y: s + c / 2 };
  switch (t?.position ?? n) {
    case ne.Top:
      return { x: r + a / 2, y: s };
    case ne.Right:
      return { x: r + a, y: s + c / 2 };
    case ne.Bottom:
      return { x: r + a / 2, y: s + c };
    case ne.Left:
      return { x: r, y: s + c / 2 };
  }
}
function Na(e, t) {
  return e && (t ? e.find((n) => n.id === t) : e[0]) || null;
}
function $i(e, t) {
  return e ? typeof e == "string" ? e : `${t ? `${t}__` : ""}${Object.keys(e).sort().map((o) => `${o}=${e[o]}`).join("&")}` : "";
}
function by(e, { id: t, defaultColor: n, defaultMarkerStart: o, defaultMarkerEnd: r }) {
  const s = /* @__PURE__ */ new Set();
  return e.reduce((a, c) => ([c.markerStart || o, c.markerEnd || r].forEach((u) => {
    if (u && typeof u == "object") {
      const l = $i(u, t);
      s.has(l) || (a.push({ id: l, color: u.color || n, ...u }), s.add(l));
    }
  }), a), []).sort((a, c) => a.id.localeCompare(c.id));
}
const Vl = 1e3, Ny = 10, ls = {
  nodeOrigin: [0, 0],
  nodeExtent: ro,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, jy = {
  ...ls,
  checkEquality: !0
};
function us(e, t) {
  const n = { ...e };
  for (const o in t)
    t[o] !== void 0 && (n[o] = t[o]);
  return n;
}
function Sy(e, t, n) {
  const o = us(ls, n);
  for (const r of e.values())
    if (r.parentId)
      fs(r, e, t, o);
    else {
      const s = yo(r, o.nodeOrigin), a = Wt(r.extent) ? r.extent : o.nodeExtent, c = Ht(s, a, mt(r));
      r.internals.positionAbsolute = c;
    }
}
function ky(e, t) {
  if (!e.handles)
    return e.measured ? t?.internals.handleBounds : void 0;
  const n = [], o = [];
  for (const r of e.handles) {
    const s = {
      id: r.id,
      width: r.width ?? 1,
      height: r.height ?? 1,
      nodeId: e.id,
      x: r.x,
      y: r.y,
      position: r.position,
      type: r.type
    };
    r.type === "source" ? n.push(s) : r.type === "target" && o.push(s);
  }
  return {
    source: n,
    target: o
  };
}
function ds(e) {
  return e === "manual";
}
function Pi(e, t, n, o = {}) {
  const r = us(jy, o), s = { i: 0 }, a = new Map(t), c = r?.elevateNodesOnSelect && !ds(r.zIndexMode) ? Vl : 0;
  let u = e.length > 0, l = !1;
  t.clear(), n.clear();
  for (const d of e) {
    let f = a.get(d.id);
    if (r.checkEquality && d === f?.internals.userNode)
      t.set(d.id, f);
    else {
      const h = yo(d, r.nodeOrigin), p = Wt(d.extent) ? d.extent : r.nodeExtent, g = Ht(h, p, mt(d));
      f = {
        ...r.defaults,
        ...d,
        measured: {
          width: d.measured?.width,
          height: d.measured?.height
        },
        internals: {
          positionAbsolute: g,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: ky(d, f),
          z: Ol(d, c, r.zIndexMode),
          userNode: d
        }
      }, t.set(d.id, f);
    }
    (f.measured === void 0 || f.measured.width === void 0 || f.measured.height === void 0) && !f.hidden && (u = !1), d.parentId && fs(f, t, n, o, s), l ||= d.selected ?? !1;
  }
  return { nodesInitialized: u, hasSelectedNodes: l };
}
function Ey(e, t) {
  if (!e.parentId)
    return;
  const n = t.get(e.parentId);
  n ? n.set(e.id, e) : t.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function fs(e, t, n, o, r) {
  const { elevateNodesOnSelect: s, nodeOrigin: a, nodeExtent: c, zIndexMode: u } = us(ls, o), l = e.parentId, d = t.get(l);
  if (!d) {
    console.warn(`Parent node ${l} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  Ey(e, n), r && !d.parentId && d.internals.rootParentIndex === void 0 && u === "auto" && (d.internals.rootParentIndex = ++r.i, d.internals.z = d.internals.z + r.i * Ny), r && d.internals.rootParentIndex !== void 0 && (r.i = d.internals.rootParentIndex);
  const f = s && !ds(u) ? Vl : 0, { x: h, y: p, z: g } = Cy(e, d, a, c, f, u), { positionAbsolute: b } = e.internals, x = h !== b.x || p !== b.y;
  (x || g !== e.internals.z) && t.set(e.id, {
    ...e,
    internals: {
      ...e.internals,
      positionAbsolute: x ? { x: h, y: p } : b,
      z: g
    }
  });
}
function Ol(e, t, n) {
  const o = nt(e.zIndex) ? e.zIndex : 0;
  return ds(n) ? o : o + (e.selected ? t : 0);
}
function Cy(e, t, n, o, r, s) {
  const { x: a, y: c } = t.internals.positionAbsolute, u = mt(e), l = yo(e, n), d = Wt(e.extent) ? Ht(l, e.extent, u) : l;
  let f = Ht({ x: a + d.x, y: c + d.y }, o, u);
  e.extent === "parent" && (f = El(f, u, t));
  const h = Ol(e, r, s), p = t.internals.z ?? 0;
  return {
    x: f.x,
    y: f.y,
    z: p >= h ? p + 1 : h
  };
}
function hs(e, t, n, o = [0, 0]) {
  const r = [], s = /* @__PURE__ */ new Map();
  for (const a of e) {
    const c = t.get(a.parentId);
    if (!c)
      continue;
    const u = s.get(a.parentId)?.expandedRect ?? pn(c), l = Cl(u, a.rect);
    s.set(a.parentId, { expandedRect: l, parent: c });
  }
  return s.size > 0 && s.forEach(({ expandedRect: a, parent: c }, u) => {
    const l = c.internals.positionAbsolute, d = mt(c), f = c.origin ?? o, h = a.x < l.x ? Math.round(Math.abs(l.x - a.x)) : 0, p = a.y < l.y ? Math.round(Math.abs(l.y - a.y)) : 0, g = Math.max(d.width, Math.round(a.width)), b = Math.max(d.height, Math.round(a.height)), x = (g - d.width) * f[0], m = (b - d.height) * f[1];
    (h > 0 || p > 0 || x || m) && (r.push({
      id: u,
      type: "position",
      position: {
        x: c.position.x - h + x,
        y: c.position.y - p + m
      }
    }), n.get(u)?.forEach((E) => {
      e.some((y) => y.id === E.id) || r.push({
        id: E.id,
        type: "position",
        position: {
          x: E.position.x + h,
          y: E.position.y + p
        }
      });
    })), (d.width < a.width || d.height < a.height || h || p) && r.push({
      id: u,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: g + (h ? f[0] * h - x : 0),
        height: b + (p ? f[1] * p - m : 0)
      }
    });
  }), r;
}
function Iy(e, t, n, o, r, s, a) {
  const c = o?.querySelector(".xyflow__viewport");
  let u = !1;
  if (!c)
    return { changes: [], updatedInternals: u };
  const l = [], d = window.getComputedStyle(c), { m22: f } = new window.DOMMatrixReadOnly(d.transform), h = [];
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
    const b = cs(p.nodeElement), x = g.measured.width !== b.width || g.measured.height !== b.height;
    if (!!(b.width && b.height && (x || !g.internals.handleBounds || p.force))) {
      const E = p.nodeElement.getBoundingClientRect(), y = Wt(g.extent) ? g.extent : s;
      let { positionAbsolute: N } = g.internals;
      g.parentId && g.extent === "parent" ? N = El(N, b, t.get(g.parentId)) : y && (N = Ht(N, y, b));
      const k = {
        ...g,
        measured: b,
        internals: {
          ...g.internals,
          positionAbsolute: N,
          handleBounds: {
            source: ya("source", p.nodeElement, E, f, g.id),
            target: ya("target", p.nodeElement, E, f, g.id)
          }
        }
      };
      t.set(g.id, k), g.parentId && fs(k, t, n, { nodeOrigin: r, zIndexMode: a }), u = !0, x && (l.push({
        id: g.id,
        type: "dimensions",
        dimensions: b
      }), g.expandParent && g.parentId && h.push({
        id: g.id,
        parentId: g.parentId,
        rect: pn(k, r)
      }));
    }
  }
  if (h.length > 0) {
    const p = hs(h, t, n, r);
    l.push(...p);
  }
  return { changes: l, updatedInternals: u };
}
async function Ay({ delta: e, panZoom: t, transform: n, translateExtent: o, width: r, height: s }) {
  if (!t || !e.x && !e.y)
    return !1;
  const a = await t.setViewportConstrained({
    x: n[0] + e.x,
    y: n[1] + e.y,
    zoom: n[2]
  }, [
    [0, 0],
    [r, s]
  ], o);
  return !!a && (a.x !== n[0] || a.y !== n[1] || a.k !== n[2]);
}
function ja(e, t, n, o, r, s) {
  let a = r;
  const c = o.get(a) || /* @__PURE__ */ new Map();
  o.set(a, c.set(n, t)), a = `${r}-${e}`;
  const u = o.get(a) || /* @__PURE__ */ new Map();
  if (o.set(a, u.set(n, t)), s) {
    a = `${r}-${e}-${s}`;
    const l = o.get(a) || /* @__PURE__ */ new Map();
    o.set(a, l.set(n, t));
  }
}
function Hl(e, t, n) {
  e.clear(), t.clear();
  for (const o of n) {
    const { source: r, target: s, sourceHandle: a = null, targetHandle: c = null } = o, u = { edgeId: o.id, source: r, target: s, sourceHandle: a, targetHandle: c }, l = `${r}-${a}--${s}-${c}`, d = `${s}-${c}--${r}-${a}`;
    ja("source", u, d, e, r, a), ja("target", u, l, e, s, c), t.set(o.id, o);
  }
}
function Wl(e, t) {
  if (!e.parentId)
    return !1;
  const n = t.get(e.parentId);
  return n ? n.selected ? !0 : Wl(n, t) : !1;
}
function Sa(e, t, n) {
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
function _y(e, t, n, o) {
  const r = /* @__PURE__ */ new Map();
  for (const [s, a] of e)
    if ((a.selected || a.id === o) && (!a.parentId || !Wl(a, e)) && (a.draggable || t && typeof a.draggable > "u")) {
      const c = e.get(s);
      c && r.set(s, {
        id: s,
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
function ui({ nodeId: e, dragItems: t, nodeLookup: n, dragging: o = !0 }) {
  const r = [];
  for (const [a, c] of t) {
    const u = n.get(a)?.internals.userNode;
    u && r.push({
      ...u,
      position: c.position,
      dragging: o
    });
  }
  if (!e)
    return [r[0], r];
  const s = n.get(e)?.internals.userNode;
  return [
    s ? {
      ...s,
      position: t.get(e)?.position || s.position,
      dragging: o
    } : r[0],
    r
  ];
}
function Dy({ dragItems: e, snapGrid: t, x: n, y: o }) {
  const r = e.values().next().value;
  if (!r)
    return null;
  const s = {
    x: n - r.distance.x,
    y: o - r.distance.y
  }, a = xo(s, t);
  return {
    x: a.x - s.x,
    y: a.y - s.y
  };
}
function My({ onNodeMouseDown: e, getStoreItems: t, onDragStart: n, onDrag: o, onDragStop: r }) {
  let s = { x: null, y: null }, a = 0, c = /* @__PURE__ */ new Map(), u = !1, l = { x: 0, y: 0 }, d = null, f = !1, h = null, p = !1, g = !1, b = null;
  function x({ noDragClassName: E, handleSelector: y, domNode: N, isSelectable: k, nodeId: v, nodeClickDistance: j = 0 }) {
    h = Xe(N);
    function _({ x: T, y: R }) {
      const { nodeLookup: S, nodeExtent: A, snapGrid: I, snapToGrid: $, nodeOrigin: L, onNodeDrag: P, onSelectionDrag: B, onError: K, updateNodePositions: O } = t();
      s = { x: T, y: R };
      let Z = !1;
      const X = c.size > 1, oe = X && A ? Ti(mo(c)) : null, se = X && $ ? Dy({
        dragItems: c,
        snapGrid: I,
        x: T,
        y: R
      }) : null;
      for (const [G, V] of c) {
        if (!S.has(G))
          continue;
        let Y = { x: T - V.distance.x, y: R - V.distance.y };
        $ && (Y = se ? {
          x: Math.round(Y.x + se.x),
          y: Math.round(Y.y + se.y)
        } : xo(Y, I));
        let ae = null;
        if (X && A && !V.extent && oe) {
          const { positionAbsolute: te } = V.internals, fe = te.x - oe.x + A[0][0], H = te.x + V.measured.width - oe.x2 + A[1][0], Q = te.y - oe.y + A[0][1], ge = te.y + V.measured.height - oe.y2 + A[1][1];
          ae = [
            [fe, Q],
            [H, ge]
          ];
        }
        const { position: ce, positionAbsolute: J } = kl({
          nodeId: G,
          nextPosition: Y,
          nodeLookup: S,
          nodeExtent: ae || A,
          nodeOrigin: L,
          onError: K
        });
        Z = Z || V.position.x !== ce.x || V.position.y !== ce.y, V.position = ce, V.internals.positionAbsolute = J;
      }
      if (g = g || Z, !!Z && (O(c, !0), b && (o || P || !v && B))) {
        const [G, V] = ui({
          nodeId: v,
          dragItems: c,
          nodeLookup: S
        });
        o?.(b, c, G, V), P?.(b, G, V), v || B?.(b, V);
      }
    }
    async function M() {
      if (!d)
        return;
      const { transform: T, panBy: R, autoPanSpeed: S, autoPanOnNodeDrag: A } = t();
      if (!A) {
        u = !1, cancelAnimationFrame(a);
        return;
      }
      const [I, $] = ss(l, d, S);
      (I !== 0 || $ !== 0) && (s.x = (s.x ?? 0) - I / T[2], s.y = (s.y ?? 0) - $ / T[2], await R({ x: I, y: $ }) && _(s)), a = requestAnimationFrame(M);
    }
    function W(T) {
      const { nodeLookup: R, multiSelectionActive: S, nodesDraggable: A, transform: I, snapGrid: $, snapToGrid: L, selectNodesOnDrag: P, onNodeDragStart: B, onSelectionDragStart: K, unselectNodesAndEdges: O } = t();
      f = !0, (!P || !k) && !S && v && (R.get(v)?.selected || O()), k && P && v && e?.(v);
      const Z = Gn(T.sourceEvent, { transform: I, snapGrid: $, snapToGrid: L, containerBounds: d });
      if (s = Z, c = _y(R, A, Z, v), c.size > 0 && (n || B || !v && K)) {
        const [X, oe] = ui({
          nodeId: v,
          dragItems: c,
          nodeLookup: R
        });
        n?.(T.sourceEvent, c, X, oe), B?.(T.sourceEvent, X, oe), v || K?.(T.sourceEvent, oe);
      }
    }
    const D = rl().clickDistance(j).on("start", (T) => {
      const { domNode: R, nodeDragThreshold: S, transform: A, snapGrid: I, snapToGrid: $ } = t();
      d = R?.getBoundingClientRect() || null, p = !1, g = !1, b = T.sourceEvent, S === 0 && W(T), s = Gn(T.sourceEvent, { transform: A, snapGrid: I, snapToGrid: $, containerBounds: d }), l = ot(T.sourceEvent, d);
    }).on("drag", (T) => {
      const { autoPanOnNodeDrag: R, transform: S, snapGrid: A, snapToGrid: I, nodeDragThreshold: $, nodeLookup: L } = t(), P = Gn(T.sourceEvent, { transform: S, snapGrid: A, snapToGrid: I, containerBounds: d });
      if (b = T.sourceEvent, (T.sourceEvent.type === "touchmove" && T.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      v && !L.has(v)) && (p = !0), !p) {
        if (!u && R && f && (u = !0, M()), !f) {
          const B = ot(T.sourceEvent, d), K = B.x - l.x, O = B.y - l.y;
          Math.sqrt(K * K + O * O) > $ && W(T);
        }
        (s.x !== P.xSnapped || s.y !== P.ySnapped) && c && f && (l = ot(T.sourceEvent, d), _(P));
      }
    }).on("end", (T) => {
      if (!f || p) {
        p && c.size > 0 && t().updateNodePositions(c, !1);
        return;
      }
      if (u = !1, f = !1, cancelAnimationFrame(a), c.size > 0) {
        const { nodeLookup: R, updateNodePositions: S, onNodeDragStop: A, onSelectionDragStop: I } = t();
        if (g && (S(c, !1), g = !1), r || A || !v && I) {
          const [$, L] = ui({
            nodeId: v,
            dragItems: c,
            nodeLookup: R,
            dragging: !1
          });
          r?.(T.sourceEvent, c, $, L), A?.(T.sourceEvent, $, L), v || I?.(T.sourceEvent, L);
        }
      }
    }).filter((T) => {
      const R = T.target;
      return !T.button && (!E || !Sa(R, `.${E}`, N)) && (!y || Sa(R, y, N));
    });
    h.call(D);
  }
  function m() {
    h?.on(".drag", null);
  }
  return {
    update: x,
    destroy: m
  };
}
function Ty(e, t, n) {
  const o = [], r = {
    x: e.x - n,
    y: e.y - n,
    width: n * 2,
    height: n * 2
  };
  for (const s of t.values())
    so(r, pn(s)) > 0 && o.push(s);
  return o;
}
const $y = 250;
function Py(e, t, n, o) {
  let r = [], s = 1 / 0;
  const a = Ty(e, n, t + $y);
  for (const c of a) {
    const u = [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []];
    for (const l of u) {
      if (o.nodeId === l.nodeId && o.type === l.type && o.id === l.id)
        continue;
      const { x: d, y: f } = Bt(c, l, l.position, !0), h = Math.sqrt(Math.pow(d - e.x, 2) + Math.pow(f - e.y, 2));
      h > t || (h < s ? (r = [{ ...l, x: d, y: f }], s = h) : h === s && r.push({ ...l, x: d, y: f }));
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
function Bl(e, t, n, o, r, s = !1) {
  const a = o.get(e);
  if (!a)
    return null;
  const c = r === "strict" ? a.internals.handleBounds?.[t] : [...a.internals.handleBounds?.source ?? [], ...a.internals.handleBounds?.target ?? []], u = (n ? c?.find((l) => l.id === n) : c?.[0]) ?? null;
  return u && s ? { ...u, ...Bt(a, u, u.position, !0) } : u;
}
function Fl(e, t) {
  return e || (t?.classList.contains("target") ? "target" : t?.classList.contains("source") ? "source" : null);
}
function Ly(e, t) {
  let n = null;
  return t ? n = !0 : e && !t && (n = !1), n;
}
const Kl = () => !0;
function zy(e, { connectionMode: t, connectionRadius: n, handleId: o, nodeId: r, edgeUpdaterType: s, isTarget: a, domNode: c, nodeLookup: u, lib: l, autoPanOnConnect: d, flowId: f, panBy: h, cancelConnection: p, onConnectStart: g, onConnect: b, onConnectEnd: x, isValidConnection: m = Kl, onReconnectEnd: E, updateConnection: y, getTransform: N, getFromHandle: k, autoPanSpeed: v, dragThreshold: j = 1, handleDomNode: _ }) {
  const M = Dl(e.target);
  let W = 0, D;
  const { x: T, y: R } = ot(e), S = Fl(s, _), A = c?.getBoundingClientRect();
  let I = !1;
  if (!A || !S)
    return;
  const $ = Bl(r, S, o, u, t);
  if (!$)
    return;
  let L = ot(e, A), P = !1, B = null, K = !1, O = null;
  function Z() {
    if (!d || !A)
      return;
    const [ce, J] = ss(L, A, v);
    h({ x: ce, y: J }), W = requestAnimationFrame(Z);
  }
  const X = {
    ...$,
    nodeId: r,
    type: S,
    position: $.position
  }, oe = u.get(r);
  let G = {
    inProgress: !0,
    isValid: null,
    from: Bt(oe, X, ne.Left, !0),
    fromHandle: X,
    fromPosition: X.position,
    fromNode: oe,
    to: L,
    toHandle: null,
    toPosition: fa[X.position],
    toNode: null,
    pointer: L
  };
  function V() {
    I = !0, y(G), g?.(e, { nodeId: r, handleId: o, handleType: S });
  }
  j === 0 && V();
  function Y(ce) {
    if (!I) {
      const { x: ge, y: ve } = ot(ce), ke = ge - T, Te = ve - R;
      if (!(ke * ke + Te * Te > j * j))
        return;
      V();
    }
    if (!k() || !X) {
      ae(ce);
      return;
    }
    const J = N();
    L = ot(ce, A), D = Py(vn(L, J, !1, [1, 1]), n, u, X), P || (Z(), P = !0);
    const te = ql(ce, {
      handle: D,
      connectionMode: t,
      fromNodeId: r,
      fromHandleId: o,
      fromType: a ? "target" : "source",
      isValidConnection: m,
      doc: M,
      lib: l,
      flowId: f,
      nodeLookup: u
    });
    O = te.handleDomNode, B = te.connection, K = Ly(!!D, te.isValid);
    const fe = u.get(r), H = fe ? Bt(fe, X, ne.Left, !0) : G.from, Q = {
      ...G,
      from: H,
      isValid: K,
      to: te.toHandle && K ? gn({ x: te.toHandle.x, y: te.toHandle.y }, J) : L,
      toHandle: te.toHandle,
      toPosition: K && te.toHandle ? te.toHandle.position : fa[X.position],
      toNode: te.toHandle ? u.get(te.toHandle.nodeId) : null,
      pointer: L
    };
    y(Q), G = Q;
  }
  function ae(ce) {
    if (!("touches" in ce && ce.touches.length > 0)) {
      if (I) {
        (D || O) && B && K && b?.(B);
        const { inProgress: J, ...te } = G, fe = {
          ...te,
          toPosition: G.toHandle ? G.toPosition : null
        };
        x?.(ce, fe), s && E?.(ce, fe);
      }
      p(), cancelAnimationFrame(W), P = !1, K = !1, B = null, O = null, M.removeEventListener("mousemove", Y), M.removeEventListener("mouseup", ae), M.removeEventListener("touchmove", Y), M.removeEventListener("touchend", ae);
    }
  }
  M.addEventListener("mousemove", Y), M.addEventListener("mouseup", ae), M.addEventListener("touchmove", Y), M.addEventListener("touchend", ae);
}
function ql(e, { handle: t, connectionMode: n, fromNodeId: o, fromHandleId: r, fromType: s, doc: a, lib: c, flowId: u, isValidConnection: l = Kl, nodeLookup: d }) {
  const f = s === "target", h = t ? a.querySelector(`.${c}-flow__handle[data-id="${u}-${t?.nodeId}-${t?.id}-${t?.type}"]`) : null, { x: p, y: g } = ot(e), b = a.elementFromPoint(p, g), x = b?.classList.contains(`${c}-flow__handle`) ? b : h, m = {
    handleDomNode: x,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (x) {
    const E = Fl(void 0, x), y = x.getAttribute("data-nodeid"), N = x.getAttribute("data-handleid"), k = x.classList.contains("connectable"), v = x.classList.contains("connectableend");
    if (!y || !E)
      return m;
    const j = {
      source: f ? y : o,
      sourceHandle: f ? N : r,
      target: f ? o : y,
      targetHandle: f ? r : N
    };
    m.connection = j;
    const M = k && v && (n === fn.Strict ? f && E === "source" || !f && E === "target" : y !== o || N !== r);
    m.isValid = M && l(j), m.toHandle = Bl(y, E, N, d, n, !0);
  }
  return m;
}
const Li = {
  onPointerDown: zy,
  isValid: ql
};
function Ry({ domNode: e, panZoom: t, getTransform: n, getViewScale: o }) {
  const r = Xe(e);
  function s({ translateExtent: c, width: u, height: l, zoomStep: d = 1, pannable: f = !0, zoomable: h = !0, inversePan: p = !1 }) {
    const g = (y) => {
      if (y.sourceEvent.type !== "wheel" || !t)
        return;
      const N = n(), k = y.sourceEvent.ctrlKey && ao() ? 10 : 1, v = -y.sourceEvent.deltaY * (y.sourceEvent.deltaMode === 1 ? 0.05 : y.sourceEvent.deltaMode ? 1 : 2e-3) * d, j = N[2] * Math.pow(2, v * k);
      t.scaleTo(j);
    };
    let b = [0, 0];
    const x = (y) => {
      (y.sourceEvent.type === "mousedown" || y.sourceEvent.type === "touchstart") && (b = [
        y.sourceEvent.clientX ?? y.sourceEvent.touches[0].clientX,
        y.sourceEvent.clientY ?? y.sourceEvent.touches[0].clientY
      ]);
    }, m = (y) => {
      const N = n();
      if (y.sourceEvent.type !== "mousemove" && y.sourceEvent.type !== "touchmove" || !t)
        return;
      const k = [
        y.sourceEvent.clientX ?? y.sourceEvent.touches[0].clientX,
        y.sourceEvent.clientY ?? y.sourceEvent.touches[0].clientY
      ], v = [k[0] - b[0], k[1] - b[1]];
      b = k;
      const j = o() * Math.max(N[2], Math.log(N[2])) * (p ? -1 : 1), _ = {
        x: N[0] - v[0] * j,
        y: N[1] - v[1] * j
      }, M = [
        [0, 0],
        [u, l]
      ];
      t.setViewportConstrained({
        x: _.x,
        y: _.y,
        zoom: N[2]
      }, M, c);
    }, E = wl().on("start", x).on("zoom", f ? m : null).on("zoom.wheel", h ? g : null);
    r.call(E, {});
  }
  function a() {
    r.on("zoom", null);
  }
  return {
    update: s,
    destroy: a,
    pointer: et
  };
}
const Tr = (e) => ({
  x: e.x,
  y: e.y,
  zoom: e.k
}), di = ({ x: e, y: t, zoom: n }) => _r.translate(e, t).scale(n), rn = (e, t) => e.target.closest(`.${t}`), Xl = (e, t) => t === 2 && Array.isArray(e) && e.includes(2), Vy = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, fi = (e, t = 0, n = Vy, o = () => {
}) => {
  const r = typeof t == "number" && t > 0;
  return r || o(), r ? e.transition().duration(t).ease(n).on("end", o) : e;
}, Ul = (e) => {
  const t = e.ctrlKey && ao() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * t;
};
function Oy({ zoomPanValues: e, noWheelClassName: t, d3Selection: n, d3Zoom: o, panOnScrollMode: r, panOnScrollSpeed: s, zoomOnPinch: a, onPanZoomStart: c, onPanZoom: u, onPanZoomEnd: l }) {
  return (d) => {
    if (rn(d, t))
      return d.ctrlKey && d.preventDefault(), !1;
    d.preventDefault(), d.stopImmediatePropagation();
    const f = n.property("__zoom").k || 1;
    if (d.ctrlKey && a) {
      const x = et(d), m = Ul(d), E = f * Math.pow(2, m);
      o.scaleTo(n, E, x, d);
      return;
    }
    const h = d.deltaMode === 1 ? 20 : 1;
    let p = r === Lt.Vertical ? 0 : d.deltaX * h, g = r === Lt.Horizontal ? 0 : d.deltaY * h;
    !ao() && d.shiftKey && r !== Lt.Vertical && (p = d.deltaY * h, g = 0), o.translateBy(
      n,
      -(p / f) * s,
      -(g / f) * s,
      // @ts-ignore
      { internal: !0 }
    );
    const b = Tr(n.property("__zoom"));
    clearTimeout(e.panScrollTimeout), e.isPanScrolling ? (u?.(d, b), e.panScrollTimeout = setTimeout(() => {
      l?.(d, b), e.isPanScrolling = !1;
    }, 150)) : (e.isPanScrolling = !0, c?.(d, b));
  };
}
function Hy({ noWheelClassName: e, preventScrolling: t, d3ZoomHandler: n }) {
  return function(o, r) {
    const s = o.type === "wheel", a = !t && s && !o.ctrlKey, c = rn(o, e);
    if (o.ctrlKey && s && c && o.preventDefault(), a || c)
      return null;
    o.preventDefault(), n.call(this, o, r);
  };
}
function Wy({ zoomPanValues: e, onDraggingChange: t, onPanZoomStart: n }) {
  return (o) => {
    if (o.sourceEvent?.internal)
      return;
    const r = Tr(o.transform);
    e.mouseButton = o.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = r, o.sourceEvent?.type === "mousedown" && t(!0), n && n?.(o.sourceEvent, r);
  };
}
function By({ zoomPanValues: e, panOnDrag: t, onPaneContextMenu: n, onTransformChange: o, onPanZoom: r }) {
  return (s) => {
    e.usedRightMouseButton = !!(n && Xl(t, e.mouseButton ?? 0)), s.sourceEvent?.sync || o([s.transform.x, s.transform.y, s.transform.k]), r && !s.sourceEvent?.internal && r?.(s.sourceEvent, Tr(s.transform));
  };
}
function Fy({ zoomPanValues: e, panOnDrag: t, panOnScroll: n, onDraggingChange: o, onPanZoomEnd: r, onPaneContextMenu: s }) {
  return (a) => {
    if (!a.sourceEvent?.internal && (e.isZoomingOrPanning = !1, s && Xl(t, e.mouseButton ?? 0) && !e.usedRightMouseButton && a.sourceEvent && s(a.sourceEvent), e.usedRightMouseButton = !1, o(!1), r)) {
      const c = Tr(a.transform);
      e.prevViewport = c, clearTimeout(e.timerId), e.timerId = setTimeout(
        () => {
          r?.(a.sourceEvent, c);
        },
        // we need a setTimeout for panOnScroll to suppress multiple end events fired during scroll
        n ? 150 : 0
      );
    }
  };
}
function Ky({ zoomActivationKeyPressed: e, zoomOnScroll: t, zoomOnPinch: n, panOnDrag: o, panOnScroll: r, zoomOnDoubleClick: s, userSelectionActive: a, noWheelClassName: c, noPanClassName: u, lib: l, connectionInProgress: d }) {
  return (f) => {
    const h = e || t, p = n && f.ctrlKey, g = f.type === "wheel";
    if (f.button === 1 && f.type === "mousedown" && (rn(f, `${l}-flow__node`) || rn(f, `${l}-flow__edge`)))
      return !0;
    if (!o && !h && !r && !s && !n || a || d && !g || rn(f, c) && g || rn(f, u) && (!g || r && g && !e) || !n && f.ctrlKey && g)
      return !1;
    if (!n && f.type === "touchstart" && f.touches?.length > 1)
      return f.preventDefault(), !1;
    if (!h && !r && !p && g || !o && (f.type === "mousedown" || f.type === "touchstart") || Array.isArray(o) && !o.includes(f.button) && f.type === "mousedown")
      return !1;
    const b = Array.isArray(o) && o.includes(f.button) || !f.button || f.button <= 1;
    return (!f.ctrlKey || g) && b;
  };
}
function qy({ domNode: e, minZoom: t, maxZoom: n, translateExtent: o, viewport: r, onPanZoom: s, onPanZoomStart: a, onPanZoomEnd: c, onDraggingChange: u }) {
  const l = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, d = e.getBoundingClientRect(), f = wl().scaleExtent([t, n]).translateExtent(o), h = Xe(e).call(f);
  E({
    x: r.x,
    y: r.y,
    zoom: hn(r.zoom, t, n)
  }, [
    [0, 0],
    [d.width, d.height]
  ], o);
  const p = h.on("wheel.zoom"), g = h.on("dblclick.zoom");
  f.wheelDelta(Ul);
  async function b(D, T) {
    return h ? new Promise((R) => {
      f?.interpolate(T?.interpolate === "linear" ? Zn : Yo).transform(fi(h, T?.duration, T?.ease, () => R(!0)), D);
    }) : !1;
  }
  function x({ noWheelClassName: D, noPanClassName: T, onPaneContextMenu: R, userSelectionActive: S, panOnScroll: A, panOnDrag: I, panOnScrollMode: $, panOnScrollSpeed: L, preventScrolling: P, zoomOnPinch: B, zoomOnScroll: K, zoomOnDoubleClick: O, zoomActivationKeyPressed: Z, lib: X, onTransformChange: oe, connectionInProgress: se, paneClickDistance: G, selectionOnDrag: V }) {
    S && !l.isZoomingOrPanning && m();
    const Y = A && !Z && !S;
    f.clickDistance(V ? 1 / 0 : !nt(G) || G < 0 ? 0 : G);
    const ae = Y ? Oy({
      zoomPanValues: l,
      noWheelClassName: D,
      d3Selection: h,
      d3Zoom: f,
      panOnScrollMode: $,
      panOnScrollSpeed: L,
      zoomOnPinch: B,
      onPanZoomStart: a,
      onPanZoom: s,
      onPanZoomEnd: c
    }) : Hy({
      noWheelClassName: D,
      preventScrolling: P,
      d3ZoomHandler: p
    });
    h.on("wheel.zoom", ae, { passive: !1 });
    const ce = Wy({
      zoomPanValues: l,
      onDraggingChange: u,
      onPanZoomStart: a
    });
    f.on("start", ce);
    const J = By({
      zoomPanValues: l,
      panOnDrag: I,
      onPaneContextMenu: !!R,
      onPanZoom: s,
      onTransformChange: oe
    });
    f.on("zoom", J);
    const te = Fy({
      zoomPanValues: l,
      panOnDrag: I,
      panOnScroll: A,
      onPaneContextMenu: R,
      onPanZoomEnd: c,
      onDraggingChange: u
    });
    f.on("end", te);
    const fe = Ky({
      zoomActivationKeyPressed: Z,
      panOnDrag: I,
      zoomOnScroll: K,
      panOnScroll: A,
      zoomOnDoubleClick: O,
      zoomOnPinch: B,
      userSelectionActive: S,
      noPanClassName: T,
      noWheelClassName: D,
      lib: X,
      connectionInProgress: se
    });
    f.filter(fe), O ? h.on("dblclick.zoom", g) : h.on("dblclick.zoom", null);
  }
  function m() {
    f.on("zoom", null);
  }
  async function E(D, T, R) {
    const S = di(D), A = f?.constrain()(S, T, R);
    return A && await b(A), A;
  }
  async function y(D, T) {
    const R = di(D);
    return await b(R, T), R;
  }
  function N(D) {
    if (h) {
      const T = di(D), R = h.property("__zoom");
      (R.k !== D.zoom || R.x !== D.x || R.y !== D.y) && f?.transform(h, T, null, { sync: !0 });
    }
  }
  function k() {
    const D = h ? xl(h.node()) : { x: 0, y: 0, k: 1 };
    return { x: D.x, y: D.y, zoom: D.k };
  }
  async function v(D, T) {
    return h ? new Promise((R) => {
      f?.interpolate(T?.interpolate === "linear" ? Zn : Yo).scaleTo(fi(h, T?.duration, T?.ease, () => R(!0)), D);
    }) : !1;
  }
  async function j(D, T) {
    return h ? new Promise((R) => {
      f?.interpolate(T?.interpolate === "linear" ? Zn : Yo).scaleBy(fi(h, T?.duration, T?.ease, () => R(!0)), D);
    }) : !1;
  }
  function _(D) {
    f?.scaleExtent(D);
  }
  function M(D) {
    f?.translateExtent(D);
  }
  function W(D) {
    const T = !nt(D) || D < 0 ? 0 : D;
    f?.clickDistance(T);
  }
  return {
    update: x,
    destroy: m,
    setViewport: y,
    setViewportConstrained: E,
    getViewport: k,
    scaleTo: v,
    scaleBy: j,
    setScaleExtent: _,
    setTranslateExtent: M,
    syncViewport: N,
    setClickDistance: W
  };
}
var yn;
(function(e) {
  e.Line = "line", e.Handle = "handle";
})(yn || (yn = {}));
function Xy({ width: e, prevWidth: t, height: n, prevHeight: o, affectsX: r, affectsY: s }) {
  const a = e - t, c = n - o, u = [a > 0 ? 1 : a < 0 ? -1 : 0, c > 0 ? 1 : c < 0 ? -1 : 0];
  return a && r && (u[0] = u[0] * -1), c && s && (u[1] = u[1] * -1), u;
}
function ka(e) {
  const t = e.includes("right") || e.includes("left"), n = e.includes("bottom") || e.includes("top"), o = e.includes("left"), r = e.includes("top");
  return {
    isHorizontal: t,
    isVertical: n,
    affectsX: o,
    affectsY: r
  };
}
function vt(e, t) {
  return Math.max(0, t - e);
}
function bt(e, t) {
  return Math.max(0, e - t);
}
function Bo(e, t, n) {
  return Math.max(0, t - e, e - n);
}
function Ea(e, t) {
  return e ? !t : t;
}
function Uy(e, t, n, o, r, s, a, c) {
  let { affectsX: u, affectsY: l } = t;
  const { isHorizontal: d, isVertical: f } = t, h = d && f, { xSnapped: p, ySnapped: g } = n, { minWidth: b, maxWidth: x, minHeight: m, maxHeight: E } = o, { x: y, y: N, width: k, height: v, aspectRatio: j } = e;
  let _ = Math.floor(d ? p - e.pointerX : 0), M = Math.floor(f ? g - e.pointerY : 0);
  const W = k + (u ? -_ : _), D = v + (l ? -M : M), T = -s[0] * k, R = -s[1] * v;
  let S = Bo(W, b, x), A = Bo(D, m, E);
  if (a) {
    let L = 0, P = 0;
    u && _ < 0 ? L = vt(y + _ + T, a[0][0]) : !u && _ > 0 && (L = bt(y + W + T, a[1][0])), l && M < 0 ? P = vt(N + M + R, a[0][1]) : !l && M > 0 && (P = bt(N + D + R, a[1][1])), S = Math.max(S, L), A = Math.max(A, P);
  }
  if (c) {
    let L = 0, P = 0;
    u && _ > 0 ? L = bt(y + _, c[0][0]) : !u && _ < 0 && (L = vt(y + W, c[1][0])), l && M > 0 ? P = bt(N + M, c[0][1]) : !l && M < 0 && (P = vt(N + D, c[1][1])), S = Math.max(S, L), A = Math.max(A, P);
  }
  if (r) {
    if (d) {
      const L = Bo(W / j, m, E) * j;
      if (S = Math.max(S, L), a) {
        let P = 0;
        !u && !l || u && !l && h ? P = bt(N + R + W / j, a[1][1]) * j : P = vt(N + R + (u ? _ : -_) / j, a[0][1]) * j, S = Math.max(S, P);
      }
      if (c) {
        let P = 0;
        !u && !l || u && !l && h ? P = vt(N + W / j, c[1][1]) * j : P = bt(N + (u ? _ : -_) / j, c[0][1]) * j, S = Math.max(S, P);
      }
    }
    if (f) {
      const L = Bo(D * j, b, x) / j;
      if (A = Math.max(A, L), a) {
        let P = 0;
        !u && !l || l && !u && h ? P = bt(y + D * j + T, a[1][0]) / j : P = vt(y + (l ? M : -M) * j + T, a[0][0]) / j, A = Math.max(A, P);
      }
      if (c) {
        let P = 0;
        !u && !l || l && !u && h ? P = vt(y + D * j, c[1][0]) / j : P = bt(y + (l ? M : -M) * j, c[0][0]) / j, A = Math.max(A, P);
      }
    }
  }
  M = M + (M < 0 ? A : -A), _ = _ + (_ < 0 ? S : -S), r && (h ? W > D * j ? M = (Ea(u, l) ? -_ : _) / j : _ = (Ea(u, l) ? -M : M) * j : d ? (M = _ / j, l = u) : (_ = M * j, u = l));
  const I = u ? y + _ : y, $ = l ? N + M : N;
  return {
    width: k + (u ? -_ : _),
    height: v + (l ? -M : M),
    x: s[0] * _ * (u ? -1 : 1) + I,
    y: s[1] * M * (l ? -1 : 1) + $
  };
}
const Yl = { width: 0, height: 0, x: 0, y: 0 }, Yy = {
  ...Yl,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function Zy(e, t, n) {
  const o = t.position.x + e.position.x, r = t.position.y + e.position.y, s = e.measured.width ?? 0, a = e.measured.height ?? 0, c = n[0] * s, u = n[1] * a;
  return [
    [o - c, r - u],
    [o + s - c, r + a - u]
  ];
}
function Gy({ domNode: e, nodeId: t, getStoreItems: n, onChange: o, onEnd: r }) {
  const s = Xe(e);
  let a = {
    controlDirection: ka("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function c({ controlPosition: l, boundaries: d, keepAspectRatio: f, resizeDirection: h, onResizeStart: p, onResize: g, onResizeEnd: b, shouldResize: x }) {
    let m = { ...Yl }, E = { ...Yy };
    a = {
      boundaries: d,
      resizeDirection: h,
      keepAspectRatio: f,
      controlDirection: ka(l)
    };
    let y, N = null, k = [], v, j, _, M = !1;
    const W = rl().on("start", (D) => {
      const { nodeLookup: T, transform: R, snapGrid: S, snapToGrid: A, nodeOrigin: I, paneDomNode: $ } = n();
      if (y = T.get(t), !y)
        return;
      N = $?.getBoundingClientRect() ?? null;
      const { xSnapped: L, ySnapped: P } = Gn(D.sourceEvent, {
        transform: R,
        snapGrid: S,
        snapToGrid: A,
        containerBounds: N
      });
      m = {
        width: y.measured.width ?? 0,
        height: y.measured.height ?? 0,
        x: y.position.x ?? 0,
        y: y.position.y ?? 0
      }, E = {
        ...m,
        pointerX: L,
        pointerY: P,
        aspectRatio: m.width / m.height
      }, v = void 0, j = Wt(y.extent) ? y.extent : void 0, y.parentId && (y.extent === "parent" || y.expandParent) && (v = T.get(y.parentId)), v && y.extent === "parent" && (j = [
        [0, 0],
        [v.measured.width, v.measured.height]
      ]), k = [], _ = void 0;
      for (const [B, K] of T)
        if (K.parentId === t && (k.push({
          id: B,
          position: { ...K.position },
          extent: K.extent
        }), K.extent === "parent" || K.expandParent)) {
          const O = Zy(K, y, K.origin ?? I);
          _ ? _ = [
            [Math.min(O[0][0], _[0][0]), Math.min(O[0][1], _[0][1])],
            [Math.max(O[1][0], _[1][0]), Math.max(O[1][1], _[1][1])]
          ] : _ = O;
        }
      p?.(D, { ...m });
    }).on("drag", (D) => {
      const { transform: T, snapGrid: R, snapToGrid: S, nodeOrigin: A } = n(), I = Gn(D.sourceEvent, {
        transform: T,
        snapGrid: R,
        snapToGrid: S,
        containerBounds: N
      }), $ = [];
      if (!y)
        return;
      const { x: L, y: P, width: B, height: K } = m, O = {}, Z = y.origin ?? A, { width: X, height: oe, x: se, y: G } = Uy(E, a.controlDirection, I, a.boundaries, a.keepAspectRatio, Z, j, _), V = X !== B, Y = oe !== K, ae = se !== L && V, ce = G !== P && Y;
      if (!ae && !ce && !V && !Y)
        return;
      if ((ae || ce || Z[0] === 1 || Z[1] === 1) && (O.x = ae ? se : m.x, O.y = ce ? G : m.y, m.x = O.x, m.y = O.y, k.length > 0)) {
        const H = se - L, Q = G - P;
        for (const ge of k)
          ge.position = {
            x: ge.position.x - H + Z[0] * (X - B),
            y: ge.position.y - Q + Z[1] * (oe - K)
          }, $.push(ge);
      }
      if ((V || Y) && (O.width = V && (!a.resizeDirection || a.resizeDirection === "horizontal") ? X : m.width, O.height = Y && (!a.resizeDirection || a.resizeDirection === "vertical") ? oe : m.height, m.width = O.width, m.height = O.height), v && y.expandParent) {
        const H = Z[0] * (O.width ?? 0);
        O.x && O.x < H && (m.x = H, E.x = E.x - (O.x - H));
        const Q = Z[1] * (O.height ?? 0);
        O.y && O.y < Q && (m.y = Q, E.y = E.y - (O.y - Q));
      }
      const J = Xy({
        width: m.width,
        prevWidth: B,
        height: m.height,
        prevHeight: K,
        affectsX: a.controlDirection.affectsX,
        affectsY: a.controlDirection.affectsY
      }), te = { ...m, direction: J };
      x?.(D, te) !== !1 && (M = !0, g?.(D, te), o(O, $));
    }).on("end", (D) => {
      M && (b?.(D, { ...m }), r?.({ ...m }), M = !1);
    });
    s.call(W);
  }
  function u() {
    s.on(".drag", null);
  }
  return {
    update: c,
    destroy: u
  };
}
var hi = { exports: {} }, pi = {}, gi = { exports: {} }, yi = {};
var Ca;
function Jy() {
  if (Ca) return yi;
  Ca = 1;
  var e = ct;
  function t(f, h) {
    return f === h && (f !== 0 || 1 / f === 1 / h) || f !== f && h !== h;
  }
  var n = typeof Object.is == "function" ? Object.is : t, o = e.useState, r = e.useEffect, s = e.useLayoutEffect, a = e.useDebugValue;
  function c(f, h) {
    var p = h(), g = o({ inst: { value: p, getSnapshot: h } }), b = g[0].inst, x = g[1];
    return s(
      function() {
        b.value = p, b.getSnapshot = h, u(b) && x({ inst: b });
      },
      [f, p, h]
    ), r(
      function() {
        return u(b) && x({ inst: b }), f(function() {
          u(b) && x({ inst: b });
        });
      },
      [f]
    ), a(p), p;
  }
  function u(f) {
    var h = f.getSnapshot;
    f = f.value;
    try {
      var p = h();
      return !n(f, p);
    } catch {
      return !0;
    }
  }
  function l(f, h) {
    return h();
  }
  var d = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : c;
  return yi.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : d, yi;
}
var Ia;
function Qy() {
  return Ia || (Ia = 1, gi.exports = Jy()), gi.exports;
}
var Aa;
function em() {
  if (Aa) return pi;
  Aa = 1;
  var e = ct, t = Qy();
  function n(l, d) {
    return l === d && (l !== 0 || 1 / l === 1 / d) || l !== l && d !== d;
  }
  var o = typeof Object.is == "function" ? Object.is : n, r = t.useSyncExternalStore, s = e.useRef, a = e.useEffect, c = e.useMemo, u = e.useDebugValue;
  return pi.useSyncExternalStoreWithSelector = function(l, d, f, h, p) {
    var g = s(null);
    if (g.current === null) {
      var b = { hasValue: !1, value: null };
      g.current = b;
    } else b = g.current;
    g = c(
      function() {
        function m(v) {
          if (!E) {
            if (E = !0, y = v, v = h(v), p !== void 0 && b.hasValue) {
              var j = b.value;
              if (p(j, v))
                return N = j;
            }
            return N = v;
          }
          if (j = N, o(y, v)) return j;
          var _ = h(v);
          return p !== void 0 && p(j, _) ? (y = v, j) : (y = v, N = _);
        }
        var E = !1, y, N, k = f === void 0 ? null : f;
        return [
          function() {
            return m(d());
          },
          k === null ? void 0 : function() {
            return m(k());
          }
        ];
      },
      [d, f, h, p]
    );
    var x = r(l, g[0], g[1]);
    return a(
      function() {
        b.hasValue = !0, b.value = x;
      },
      [x]
    ), u(x), x;
  }, pi;
}
var _a;
function tm() {
  return _a || (_a = 1, hi.exports = em()), hi.exports;
}
var nm = tm();
const om = /* @__PURE__ */ wf(nm), rm = {}, Da = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), o = (d, f) => {
    const h = typeof d == "function" ? d(t) : d;
    if (!Object.is(h, t)) {
      const p = t;
      t = f ?? (typeof h != "object" || h === null) ? h : Object.assign({}, t, h), n.forEach((g) => g(t, p));
    }
  }, r = () => t, u = { setState: o, getState: r, getInitialState: () => l, subscribe: (d) => (n.add(d), () => n.delete(d)), destroy: () => {
    (rm ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), n.clear();
  } }, l = t = e(o, r, u);
  return u;
}, im = (e) => e ? Da(e) : Da, { useDebugValue: sm } = ct, { useSyncExternalStoreWithSelector: am } = om, cm = (e) => e;
function Zl(e, t = cm, n) {
  const o = am(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n
  );
  return sm(o), o;
}
const Ma = (e, t) => {
  const n = im(e), o = (r, s = t) => Zl(n, r, s);
  return Object.assign(o, n), o;
}, lm = (e, t) => e ? Ma(e, t) : Ma;
function Ne(e, t) {
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
var mi = { exports: {} }, Me = {};
var Ta;
function um() {
  if (Ta) return Me;
  Ta = 1;
  var e = ct;
  function t(u) {
    var l = "https://react.dev/errors/" + u;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var d = 2; d < arguments.length; d++)
        l += "&args[]=" + encodeURIComponent(arguments[d]);
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
  function s(u, l, d) {
    var f = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: f == null ? null : "" + f,
      children: u,
      containerInfo: l,
      implementation: d
    };
  }
  var a = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function c(u, l) {
    if (u === "font") return "";
    if (typeof l == "string")
      return l === "use-credentials" ? l : "";
  }
  return Me.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, Me.createPortal = function(u, l) {
    var d = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11)
      throw Error(t(299));
    return s(u, l, null, d);
  }, Me.flushSync = function(u) {
    var l = a.T, d = o.p;
    try {
      if (a.T = null, o.p = 2, u) return u();
    } finally {
      a.T = l, o.p = d, o.d.f();
    }
  }, Me.preconnect = function(u, l) {
    typeof u == "string" && (l ? (l = l.crossOrigin, l = typeof l == "string" ? l === "use-credentials" ? l : "" : void 0) : l = null, o.d.C(u, l));
  }, Me.prefetchDNS = function(u) {
    typeof u == "string" && o.d.D(u);
  }, Me.preinit = function(u, l) {
    if (typeof u == "string" && l && typeof l.as == "string") {
      var d = l.as, f = c(d, l.crossOrigin), h = typeof l.integrity == "string" ? l.integrity : void 0, p = typeof l.fetchPriority == "string" ? l.fetchPriority : void 0;
      d === "style" ? o.d.S(
        u,
        typeof l.precedence == "string" ? l.precedence : void 0,
        {
          crossOrigin: f,
          integrity: h,
          fetchPriority: p
        }
      ) : d === "script" && o.d.X(u, {
        crossOrigin: f,
        integrity: h,
        fetchPriority: p,
        nonce: typeof l.nonce == "string" ? l.nonce : void 0
      });
    }
  }, Me.preinitModule = function(u, l) {
    if (typeof u == "string")
      if (typeof l == "object" && l !== null) {
        if (l.as == null || l.as === "script") {
          var d = c(
            l.as,
            l.crossOrigin
          );
          o.d.M(u, {
            crossOrigin: d,
            integrity: typeof l.integrity == "string" ? l.integrity : void 0,
            nonce: typeof l.nonce == "string" ? l.nonce : void 0
          });
        }
      } else l == null && o.d.M(u);
  }, Me.preload = function(u, l) {
    if (typeof u == "string" && typeof l == "object" && l !== null && typeof l.as == "string") {
      var d = l.as, f = c(d, l.crossOrigin);
      o.d.L(u, d, {
        crossOrigin: f,
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
        var d = c(l.as, l.crossOrigin);
        o.d.m(u, {
          as: typeof l.as == "string" && l.as !== "script" ? l.as : void 0,
          crossOrigin: d,
          integrity: typeof l.integrity == "string" ? l.integrity : void 0
        });
      } else o.d.m(u);
  }, Me.requestFormReset = function(u) {
    o.d.r(u);
  }, Me.unstable_batchedUpdates = function(u, l) {
    return u(l);
  }, Me.useFormState = function(u, l, d) {
    return a.H.useFormState(u, l, d);
  }, Me.useFormStatus = function() {
    return a.H.useHostTransitionStatus();
  }, Me.version = "19.2.7", Me;
}
var $a;
function dm() {
  if ($a) return mi.exports;
  $a = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return e(), mi.exports = um(), mi.exports;
}
var fm = dm();
const $r = Zi(null), hm = $r.Provider, Gl = Ye.error001("react");
function pe(e, t) {
  const n = ho($r);
  if (n === null)
    throw new Error(Gl);
  return Zl(n, e, t);
}
function je() {
  const e = ho($r);
  if (e === null)
    throw new Error(Gl);
  return de(() => ({
    getState: e.getState,
    setState: e.setState,
    subscribe: e.subscribe
  }), [e]);
}
const Pa = { display: "none" }, pm = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, Jl = "react-flow__node-desc", Ql = "react-flow__edge-desc", gm = "react-flow__aria-live", ym = (e) => e.ariaLiveMessage, mm = (e) => e.ariaLabelConfig;
function xm({ rfId: e }) {
  const t = pe(ym);
  return i.jsx("div", { id: `${gm}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: pm, children: t });
}
function wm({ rfId: e, disableKeyboardA11y: t }) {
  const n = pe(mm);
  return i.jsxs(i.Fragment, { children: [i.jsx("div", { id: `${Jl}-${e}`, style: Pa, children: t ? n["node.a11yDescription.default"] : n["node.a11yDescription.keyboardDisabled"] }), i.jsx("div", { id: `${Ql}-${e}`, style: Pa, children: n["edge.a11yDescription.default"] }), !t && i.jsx(xm, { rfId: e })] });
}
const Pr = kr(({ position: e = "top-left", children: t, className: n, style: o, ...r }, s) => {
  const a = `${e}`.split("-");
  return i.jsx("div", { className: Ee(["react-flow__panel", n, ...a]), style: o, ref: s, ...r, children: t });
});
Pr.displayName = "Panel";
function vm({ proOptions: e, position: t = "bottom-right" }) {
  return e?.hideAttribution ? null : i.jsx(Pr, { position: t, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: i.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const bm = (e) => {
  const t = [], n = [];
  for (const [, o] of e.nodeLookup)
    o.selected && t.push(o.internals.userNode);
  for (const [, o] of e.edgeLookup)
    o.selected && n.push(o);
  return { selectedNodes: t, selectedEdges: n };
}, Fo = (e) => e.id;
function Nm(e, t) {
  return Ne(e.selectedNodes.map(Fo), t.selectedNodes.map(Fo)) && Ne(e.selectedEdges.map(Fo), t.selectedEdges.map(Fo));
}
function jm({ onSelectionChange: e }) {
  const t = je(), { selectedNodes: n, selectedEdges: o } = pe(bm, Nm);
  return ee(() => {
    const r = { nodes: n, edges: o };
    e?.(r), t.getState().onSelectionChangeHandlers.forEach((s) => s(r));
  }, [n, o, e]), null;
}
const Sm = (e) => !!e.onSelectionChangeHandlers;
function km({ onSelectionChange: e }) {
  const t = pe(Sm);
  return e || t ? i.jsx(jm, { onSelectionChange: e }) : null;
}
const eu = [0, 0], Em = { x: 0, y: 0, zoom: 1 }, Cm = [
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
], La = [...Cm, "rfId"], Im = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges
}), za = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: ro,
  nodeOrigin: eu,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function Am(e) {
  const { setNodes: t, setEdges: n, setMinZoom: o, setMaxZoom: r, setTranslateExtent: s, setNodeExtent: a, reset: c, setDefaultNodesAndEdges: u } = pe(Im, Ne), l = je();
  ee(() => (u(e.defaultNodes, e.defaultEdges), () => {
    d.current = za, c();
  }), []);
  const d = ie(za);
  return ee(
    () => {
      for (const f of La) {
        const h = e[f], p = d.current[f];
        h !== p && (typeof e[f] > "u" || (f === "nodes" ? t(h) : f === "edges" ? n(h) : f === "minZoom" ? o(h) : f === "maxZoom" ? r(h) : f === "translateExtent" ? s(h) : f === "nodeExtent" ? a(h) : f === "ariaLabelConfig" ? l.setState({ ariaLabelConfig: uy(h) }) : f === "fitView" ? l.setState({ fitViewQueued: h }) : f === "fitViewOptions" ? l.setState({ fitViewOptions: h }) : l.setState({ [f]: h })));
      }
      d.current = e;
    },
    // Only re-run the effect if one of the fields we track changes
    La.map((f) => e[f])
  ), null;
}
function Ra() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function _m(e) {
  const [t, n] = q(e === "system" ? null : e);
  return ee(() => {
    if (e !== "system") {
      n(e);
      return;
    }
    const o = Ra(), r = () => n(o?.matches ? "dark" : "light");
    return r(), o?.addEventListener("change", r), () => {
      o?.removeEventListener("change", r);
    };
  }, [e]), t !== null ? t : Ra()?.matches ? "dark" : "light";
}
const Va = typeof document < "u" ? document : null;
function co(e = null, t = { target: Va, actInsideInputWithModifier: !0 }) {
  const [n, o] = q(!1), r = ie(!1), s = ie(/* @__PURE__ */ new Set([])), [a, c] = de(() => {
    if (e !== null) {
      const l = (Array.isArray(e) ? e : [e]).filter((f) => typeof f == "string").map((f) => f.replace("+", `
`).replace(`

`, `
+`).split(`
`)), d = l.reduce((f, h) => f.concat(...h), []);
      return [l, d];
    }
    return [[], []];
  }, [e]);
  return ee(() => {
    const u = t?.target ?? Va, l = t?.actInsideInputWithModifier ?? !0;
    if (e !== null) {
      const d = (p) => {
        if (r.current = p.ctrlKey || p.metaKey || p.shiftKey || p.altKey, (!r.current || r.current && !l) && Ml(p))
          return !1;
        const b = Ha(p.code, c);
        if (s.current.add(p[b]), Oa(a, s.current, !1)) {
          const x = p.composedPath?.()?.[0] || p.target, m = x?.nodeName === "BUTTON" || x?.nodeName === "A";
          t.preventDefault !== !1 && (r.current || !m) && p.preventDefault(), o(!0);
        }
      }, f = (p) => {
        const g = Ha(p.code, c);
        Oa(a, s.current, !0) ? (o(!1), s.current.clear()) : s.current.delete(p[g]), p.key === "Meta" && s.current.clear(), r.current = !1;
      }, h = () => {
        s.current.clear(), o(!1);
      };
      return u?.addEventListener("keydown", d), u?.addEventListener("keyup", f), window.addEventListener("blur", h), window.addEventListener("contextmenu", h), () => {
        u?.removeEventListener("keydown", d), u?.removeEventListener("keyup", f), window.removeEventListener("blur", h), window.removeEventListener("contextmenu", h);
      };
    }
  }, [e, o]), n;
}
function Oa(e, t, n) {
  return e.filter((o) => n || o.length === t.size).some((o) => o.every((r) => t.has(r)));
}
function Ha(e, t) {
  return t.includes(e) ? "code" : "key";
}
const Dm = () => {
  const e = je();
  return de(() => ({
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
      const { transform: [o, r, s], panZoom: a } = e.getState();
      return a ? (await a.setViewport({
        x: t.x ?? o,
        y: t.y ?? r,
        zoom: t.zoom ?? s
      }, n), !0) : !1;
    },
    getViewport: () => {
      const [t, n, o] = e.getState().transform;
      return { x: t, y: n, zoom: o };
    },
    setCenter: async (t, n, o) => e.getState().setCenter(t, n, o),
    fitBounds: async (t, n) => {
      const { width: o, height: r, minZoom: s, maxZoom: a, panZoom: c } = e.getState(), u = as(t, o, r, s, a, n?.padding ?? 0.1);
      return c ? (await c.setViewport(u, {
        duration: n?.duration,
        ease: n?.ease,
        interpolate: n?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (t, n = {}) => {
      const { transform: o, snapGrid: r, snapToGrid: s, domNode: a } = e.getState();
      if (!a)
        return t;
      const { x: c, y: u } = a.getBoundingClientRect(), l = {
        x: t.x - c,
        y: t.y - u
      }, d = n.snapGrid ?? r, f = n.snapToGrid ?? s;
      return vn(l, o, f, d);
    },
    flowToScreenPosition: (t) => {
      const { transform: n, domNode: o } = e.getState();
      if (!o)
        return t;
      const { x: r, y: s } = o.getBoundingClientRect(), a = gn(t, n);
      return {
        x: a.x + r,
        y: a.y + s
      };
    }
  }), []);
};
function tu(e, t) {
  const n = [], o = /* @__PURE__ */ new Map(), r = [];
  for (const s of e)
    if (s.type === "add") {
      r.push(s);
      continue;
    } else if (s.type === "remove" || s.type === "replace")
      o.set(s.id, [s]);
    else {
      const a = o.get(s.id);
      a ? a.push(s) : o.set(s.id, [s]);
    }
  for (const s of t) {
    const a = o.get(s.id);
    if (!a) {
      n.push(s);
      continue;
    }
    if (a[0].type === "remove")
      continue;
    if (a[0].type === "replace") {
      n.push({ ...a[0].item });
      continue;
    }
    const c = { ...s };
    for (const u of a)
      Mm(u, c);
    n.push(c);
  }
  return r.length && r.forEach((s) => {
    s.index !== void 0 ? n.splice(s.index, 0, { ...s.item }) : n.push({ ...s.item });
  }), n;
}
function Mm(e, t) {
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
function nu(e, t) {
  return tu(e, t);
}
function ou(e, t) {
  return tu(e, t);
}
function Tt(e, t) {
  return {
    id: e,
    type: "select",
    selected: t
  };
}
function sn(e, t = /* @__PURE__ */ new Set(), n = !1) {
  const o = [];
  for (const [r, s] of e) {
    const a = t.has(r);
    !(s.selected === void 0 && !a) && s.selected !== a && (n && (s.selected = a), o.push(Tt(s.id, a)));
  }
  return o;
}
function Wa({ items: e = [], lookup: t }) {
  const n = [], o = new Map(e.map((r) => [r.id, r]));
  for (const [r, s] of e.entries()) {
    const a = t.get(s.id), c = a?.internals?.userNode ?? a;
    c !== void 0 && c !== s && n.push({ id: s.id, item: s, type: "replace" }), c === void 0 && n.push({ item: s, type: "add", index: r });
  }
  for (const [r] of t)
    o.get(r) === void 0 && n.push({ id: r, type: "remove" });
  return n;
}
function Ba(e) {
  return {
    id: e.id,
    type: "remove"
  };
}
const ru = Il();
function iu(e, t, n = {}) {
  return gy(e, t, {
    ...n,
    onError: n.onError ?? ru
  });
}
function Tm(e, t, n, o = { shouldReplaceId: !0 }) {
  return yy(e, t, n, {
    ...o,
    onError: o.onError ?? ru
  });
}
const Fa = (e) => ty(e), $m = (e) => Sl(e);
function su(e) {
  return kr(e);
}
const Pm = typeof window < "u" ? pf : ee;
function Ka(e) {
  const [t, n] = q(BigInt(0)), [o] = q(() => Lm(() => n((r) => r + BigInt(1))));
  return Pm(() => {
    const r = o.get();
    r.length && (e(r), o.reset());
  }, [t]), o;
}
function Lm(e) {
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
const au = Zi(null);
function zm({ children: e }) {
  const t = je(), n = ue((c) => {
    const { nodes: u = [], setNodes: l, hasDefaultNodes: d, onNodesChange: f, nodeLookup: h, fitViewQueued: p, onNodesChangeMiddlewareMap: g } = t.getState();
    let b = u;
    for (const m of c)
      b = typeof m == "function" ? m(b) : m;
    let x = Wa({
      items: b,
      lookup: h
    });
    for (const m of g.values())
      x = m(x);
    d && l(b), x.length > 0 ? f?.(x) : p && window.requestAnimationFrame(() => {
      const { fitViewQueued: m, nodes: E, setNodes: y } = t.getState();
      m && y(E);
    });
  }, []), o = Ka(n), r = ue((c) => {
    const { edges: u = [], setEdges: l, hasDefaultEdges: d, onEdgesChange: f, edgeLookup: h } = t.getState();
    let p = u;
    for (const g of c)
      p = typeof g == "function" ? g(p) : g;
    d ? l(p) : f && f(Wa({
      items: p,
      lookup: h
    }));
  }, []), s = Ka(r), a = de(() => ({ nodeQueue: o, edgeQueue: s }), []);
  return i.jsx(au.Provider, { value: a, children: e });
}
function Rm() {
  const e = ho(au);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const Vm = (e) => !!e.panZoom;
function ps() {
  const e = Dm(), t = je(), n = Rm(), o = pe(Vm), r = de(() => {
    const s = (f) => t.getState().nodeLookup.get(f), a = (f) => {
      n.nodeQueue.push(f);
    }, c = (f) => {
      n.edgeQueue.push(f);
    }, u = (f) => {
      const { nodeLookup: h, nodeOrigin: p } = t.getState(), g = Fa(f) ? f : h.get(f.id), b = g.parentId ? _l(g.position, g.measured, g.parentId, h, p) : g.position, x = {
        ...g,
        position: b,
        width: g.measured?.width ?? g.width,
        height: g.measured?.height ?? g.height
      };
      return pn(x);
    }, l = (f, h, p = { replace: !1 }) => {
      a((g) => g.map((b) => {
        if (b.id === f) {
          const x = typeof h == "function" ? h(b) : h;
          return p.replace && Fa(x) ? x : { ...b, ...x };
        }
        return b;
      }));
    }, d = (f, h, p = { replace: !1 }) => {
      c((g) => g.map((b) => {
        if (b.id === f) {
          const x = typeof h == "function" ? h(b) : h;
          return p.replace && $m(x) ? x : { ...b, ...x };
        }
        return b;
      }));
    };
    return {
      getNodes: () => t.getState().nodes.map((f) => ({ ...f })),
      getNode: (f) => s(f)?.internals.userNode,
      getInternalNode: s,
      getEdges: () => {
        const { edges: f = [] } = t.getState();
        return f.map((h) => ({ ...h }));
      },
      getEdge: (f) => t.getState().edgeLookup.get(f),
      setNodes: a,
      setEdges: c,
      addNodes: (f) => {
        const h = Array.isArray(f) ? f : [f];
        n.nodeQueue.push((p) => [...p, ...h]);
      },
      addEdges: (f) => {
        const h = Array.isArray(f) ? f : [f];
        n.edgeQueue.push((p) => [...p, ...h]);
      },
      toObject: () => {
        const { nodes: f = [], edges: h = [], transform: p } = t.getState(), [g, b, x] = p;
        return {
          nodes: f.map((m) => ({ ...m })),
          edges: h.map((m) => ({ ...m })),
          viewport: {
            x: g,
            y: b,
            zoom: x
          }
        };
      },
      deleteElements: async ({ nodes: f = [], edges: h = [] }) => {
        const { nodes: p, edges: g, onNodesDelete: b, onEdgesDelete: x, triggerNodeChanges: m, triggerEdgeChanges: E, onDelete: y, onBeforeDelete: N } = t.getState(), { nodes: k, edges: v } = await sy({
          nodesToRemove: f,
          edgesToRemove: h,
          nodes: p,
          edges: g,
          onBeforeDelete: N
        }), j = v.length > 0, _ = k.length > 0;
        if (j) {
          const M = v.map(Ba);
          x?.(v), E(M);
        }
        if (_) {
          const M = k.map(Ba);
          b?.(k), m(M);
        }
        return (_ || j) && y?.({ nodes: k, edges: v }), { deletedNodes: k, deletedEdges: v };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (f, h = !0, p) => {
        const g = pa(f), b = g ? f : u(f), x = p !== void 0;
        return b ? (p || t.getState().nodes).filter((m) => {
          const E = t.getState().nodeLookup.get(m.id);
          if (E && !g && (m.id === f.id || !E.internals.positionAbsolute))
            return !1;
          const y = pn(x ? m : E), N = so(y, b);
          return h && N > 0 || N >= y.width * y.height || N >= b.width * b.height;
        }) : [];
      },
      isNodeIntersecting: (f, h, p = !0) => {
        const b = pa(f) ? f : u(f);
        if (!b)
          return !1;
        const x = so(b, h);
        return p && x > 0 || x >= h.width * h.height || x >= b.width * b.height;
      },
      updateNode: l,
      updateNodeData: (f, h, p = { replace: !1 }) => {
        l(f, (g) => {
          const b = typeof h == "function" ? h(g) : h;
          return p.replace ? { ...g, data: b } : { ...g, data: { ...g.data, ...b } };
        }, p);
      },
      updateEdge: d,
      updateEdgeData: (f, h, p = { replace: !1 }) => {
        d(f, (g) => {
          const b = typeof h == "function" ? h(g) : h;
          return p.replace ? { ...g, data: b } : { ...g, data: { ...g.data, ...b } };
        }, p);
      },
      getNodesBounds: (f) => {
        const { nodeLookup: h, nodeOrigin: p } = t.getState();
        return ny(f, { nodeLookup: h, nodeOrigin: p });
      },
      getHandleConnections: ({ type: f, id: h, nodeId: p }) => Array.from(t.getState().connectionLookup.get(`${p}-${f}${h ? `-${h}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: f, handleId: h, nodeId: p }) => Array.from(t.getState().connectionLookup.get(`${p}${f ? h ? `-${f}-${h}` : `-${f}` : ""}`)?.values() ?? []),
      fitView: async (f) => {
        const h = t.getState().fitViewResolver ?? ly();
        return t.setState({ fitViewQueued: !0, fitViewOptions: f, fitViewResolver: h }), n.nodeQueue.push((p) => [...p]), h.promise;
      }
    };
  }, []);
  return de(() => ({
    ...r,
    ...e,
    viewportInitialized: o
  }), [o]);
}
const qa = (e) => e.selected, Om = typeof window < "u" ? window : void 0;
function Hm({ deleteKeyCode: e, multiSelectionKeyCode: t }) {
  const n = je(), { deleteElements: o } = ps(), r = co(e, { actInsideInputWithModifier: !1 }), s = co(t, { target: Om });
  ee(() => {
    if (r) {
      const { edges: a, nodes: c } = n.getState();
      o({ nodes: c.filter(qa), edges: a.filter(qa) }), n.setState({ nodesSelectionActive: !1 });
    }
  }, [r]), ee(() => {
    n.setState({ multiSelectionActive: s });
  }, [s]);
}
function Wm(e) {
  const t = je();
  ee(() => {
    const n = () => {
      if (!e.current || !(e.current.checkVisibility?.() ?? !0))
        return !1;
      const o = cs(e.current);
      (o.height === 0 || o.width === 0) && t.getState().onError?.("004", Ye.error004()), t.setState({ width: o.width || 500, height: o.height || 500 });
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
const Lr = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, Bm = (e) => ({
  userSelectionActive: e.userSelectionActive,
  lib: e.lib,
  connectionInProgress: e.connection.inProgress
});
function Fm({ onPaneContextMenu: e, zoomOnScroll: t = !0, zoomOnPinch: n = !0, panOnScroll: o = !1, panOnScrollSpeed: r = 0.5, panOnScrollMode: s = Lt.Free, zoomOnDoubleClick: a = !0, panOnDrag: c = !0, defaultViewport: u, translateExtent: l, minZoom: d, maxZoom: f, zoomActivationKeyCode: h, preventScrolling: p = !0, children: g, noWheelClassName: b, noPanClassName: x, onViewportChange: m, isControlledViewport: E, paneClickDistance: y, selectionOnDrag: N }) {
  const k = je(), v = ie(null), { userSelectionActive: j, lib: _, connectionInProgress: M } = pe(Bm, Ne), W = co(h), D = ie();
  Wm(v);
  const T = ue((R) => {
    m?.({ x: R[0], y: R[1], zoom: R[2] }), E || k.setState({ transform: R });
  }, [m, E]);
  return ee(() => {
    if (v.current) {
      D.current = qy({
        domNode: v.current,
        minZoom: d,
        maxZoom: f,
        translateExtent: l,
        viewport: u,
        onDraggingChange: (I) => k.setState(($) => $.paneDragging === I ? $ : { paneDragging: I }),
        onPanZoomStart: (I, $) => {
          const { onViewportChangeStart: L, onMoveStart: P } = k.getState();
          P?.(I, $), L?.($);
        },
        onPanZoom: (I, $) => {
          const { onViewportChange: L, onMove: P } = k.getState();
          P?.(I, $), L?.($);
        },
        onPanZoomEnd: (I, $) => {
          const { onViewportChangeEnd: L, onMoveEnd: P } = k.getState();
          P?.(I, $), L?.($);
        }
      });
      const { x: R, y: S, zoom: A } = D.current.getViewport();
      return k.setState({
        panZoom: D.current,
        transform: [R, S, A],
        domNode: v.current.closest(".react-flow")
      }), () => {
        D.current?.destroy();
      };
    }
  }, []), ee(() => {
    D.current?.update({
      onPaneContextMenu: e,
      zoomOnScroll: t,
      zoomOnPinch: n,
      panOnScroll: o,
      panOnScrollSpeed: r,
      panOnScrollMode: s,
      zoomOnDoubleClick: a,
      panOnDrag: c,
      zoomActivationKeyPressed: W,
      preventScrolling: p,
      noPanClassName: x,
      userSelectionActive: j,
      noWheelClassName: b,
      lib: _,
      onTransformChange: T,
      connectionInProgress: M,
      selectionOnDrag: N,
      paneClickDistance: y
    });
  }, [
    e,
    t,
    n,
    o,
    r,
    s,
    a,
    c,
    W,
    p,
    x,
    j,
    b,
    _,
    T,
    M,
    N,
    y
  ]), i.jsx("div", { className: "react-flow__renderer", ref: v, style: Lr, children: g });
}
const Km = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect
});
function qm() {
  const { userSelectionActive: e, userSelectionRect: t } = pe(Km, Ne);
  return e && t ? i.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: t.width,
    height: t.height,
    transform: `translate(${t.x}px, ${t.y}px)`
  } }) : null;
}
const xi = (e, t) => (n) => {
  n.target === t.current && e?.(n);
}, Xm = (e) => ({
  userSelectionActive: e.userSelectionActive,
  elementsSelectable: e.elementsSelectable,
  connectionInProgress: e.connection.inProgress,
  dragging: e.paneDragging,
  panBy: e.panBy,
  autoPanSpeed: e.autoPanSpeed
});
function Um({ isSelecting: e, selectionKeyPressed: t, selectionMode: n = io.Full, panOnDrag: o, autoPanOnSelection: r, paneClickDistance: s, selectionOnDrag: a, onSelectionStart: c, onSelectionEnd: u, onPaneClick: l, onPaneContextMenu: d, onPaneScroll: f, onPaneMouseEnter: h, onPaneMouseMove: p, onPaneMouseLeave: g, children: b }) {
  const x = ie(0), m = je(), { userSelectionActive: E, elementsSelectable: y, dragging: N, connectionInProgress: k, panBy: v, autoPanSpeed: j } = pe(Xm, Ne), _ = y && (e || E), M = ie(null), W = ie(), D = ie(/* @__PURE__ */ new Set()), T = ie(/* @__PURE__ */ new Set()), R = ie(!1), S = ie({ x: 0, y: 0 }), A = ie(!1), I = (V) => {
    if (R.current || k) {
      R.current = !1;
      return;
    }
    l?.(V), m.getState().resetSelectedElements(), m.setState({ nodesSelectionActive: !1 });
  }, $ = (V) => {
    if (Array.isArray(o) && o?.includes(2)) {
      V.preventDefault();
      return;
    }
    d?.(V);
  }, L = f ? (V) => f(V) : void 0, P = (V) => {
    R.current && (V.stopPropagation(), R.current = !1);
  }, B = (V) => {
    const { domNode: Y, transform: ae } = m.getState();
    if (W.current = Y?.getBoundingClientRect(), !W.current)
      return;
    const ce = V.target === M.current;
    if (!ce && !!V.target.closest(".nokey") || !e || !(a && ce || t) || V.button !== 0 || !V.isPrimary)
      return;
    V.target?.setPointerCapture?.(V.pointerId), R.current = !1;
    const { x: fe, y: H } = ot(V.nativeEvent, W.current), Q = vn({ x: fe, y: H }, ae);
    m.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: Q.x,
        startY: Q.y,
        x: fe,
        y: H
      }
    }), ce || (V.stopPropagation(), V.preventDefault());
  };
  function K(V, Y) {
    const { userSelectionRect: ae } = m.getState();
    if (!ae)
      return;
    const { transform: ce, nodeLookup: J, edgeLookup: te, connectionLookup: fe, triggerNodeChanges: H, triggerEdgeChanges: Q, defaultEdgeOptions: ge } = m.getState(), ve = { x: ae.startX, y: ae.startY }, { x: ke, y: Te } = gn(ve, ce), Ie = {
      startX: ve.x,
      startY: ve.y,
      x: V < ke ? V : ke,
      y: Y < Te ? Y : Te,
      width: Math.abs(V - ke),
      height: Math.abs(Y - Te)
    }, Oe = D.current, be = T.current;
    D.current = new Set(is(J, Ie, ce, n === io.Partial, !0).map((We) => We.id)), T.current = /* @__PURE__ */ new Set();
    const He = ge?.selectable ?? !0;
    for (const We of D.current) {
      const Ge = fe.get(We);
      if (Ge)
        for (const { edgeId: Je } of Ge.values()) {
          const Qe = te.get(Je);
          Qe && (Qe.selectable ?? He) && T.current.add(Je);
        }
    }
    if (!ga(Oe, D.current)) {
      const We = sn(J, D.current, !0);
      H(We);
    }
    if (!ga(be, T.current)) {
      const We = sn(te, T.current);
      Q(We);
    }
    m.setState({
      userSelectionRect: Ie,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function O() {
    if (!r || !W.current)
      return;
    const [V, Y] = ss(S.current, W.current, j);
    v({ x: V, y: Y }).then((ae) => {
      if (!R.current || !ae) {
        x.current = requestAnimationFrame(O);
        return;
      }
      const { x: ce, y: J } = S.current;
      K(ce, J), x.current = requestAnimationFrame(O);
    });
  }
  const Z = () => {
    cancelAnimationFrame(x.current), x.current = 0, A.current = !1;
  };
  ee(() => () => Z(), []);
  const X = (V) => {
    const { userSelectionRect: Y, transform: ae, resetSelectedElements: ce } = m.getState();
    if (!W.current || !Y)
      return;
    const { x: J, y: te } = ot(V.nativeEvent, W.current);
    S.current = { x: J, y: te };
    const fe = gn({ x: Y.startX, y: Y.startY }, ae);
    if (!R.current) {
      const H = t ? 0 : s;
      if (Math.hypot(J - fe.x, te - fe.y) <= H)
        return;
      ce(), c?.(V);
    }
    R.current = !0, A.current || (O(), A.current = !0), K(J, te);
  }, oe = (V) => {
    V.button === 0 && (V.target?.releasePointerCapture?.(V.pointerId), !E && V.target === M.current && m.getState().userSelectionRect && I?.(V), m.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), R.current && (u?.(V), m.setState({
      nodesSelectionActive: D.current.size > 0
    })), Z());
  }, se = (V) => {
    V.target?.releasePointerCapture?.(V.pointerId), Z();
  }, G = o === !0 || Array.isArray(o) && o.includes(0);
  return i.jsxs("div", { className: Ee(["react-flow__pane", { draggable: G, dragging: N, selection: e }]), onClick: _ ? void 0 : xi(I, M), onContextMenu: xi($, M), onWheel: xi(L, M), onPointerEnter: _ ? void 0 : h, onPointerMove: _ ? X : p, onPointerUp: _ ? oe : void 0, onPointerCancel: _ ? se : void 0, onPointerDownCapture: _ ? B : void 0, onClickCapture: _ ? P : void 0, onPointerLeave: g, ref: M, style: Lr, children: [b, i.jsx(qm, {})] });
}
function zi({ id: e, store: t, unselect: n = !1, nodeRef: o }) {
  const { addSelectedNodes: r, unselectNodesAndEdges: s, multiSelectionActive: a, nodeLookup: c, onError: u } = t.getState(), l = c.get(e);
  if (!l) {
    u?.("012", Ye.error012(e));
    return;
  }
  t.setState({ nodesSelectionActive: !1 }), l.selected ? (n || l.selected && a) && (s({ nodes: [l], edges: [] }), requestAnimationFrame(() => o?.current?.blur())) : r([e]);
}
function cu({ nodeRef: e, disabled: t = !1, noDragClassName: n, handleSelector: o, nodeId: r, isSelectable: s, nodeClickDistance: a }) {
  const c = je(), [u, l] = q(!1), d = ie();
  return ee(() => {
    d.current = My({
      getStoreItems: () => c.getState(),
      onNodeMouseDown: (f) => {
        zi({
          id: f,
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
  }, []), ee(() => {
    if (!(t || !e.current || !d.current))
      return d.current.update({
        noDragClassName: n,
        handleSelector: o,
        domNode: e.current,
        isSelectable: s,
        nodeId: r,
        nodeClickDistance: a
      }), () => {
        d.current?.destroy();
      };
  }, [n, o, t, s, e, r, a]), u;
}
const Ym = (e) => (t) => t.selected && (t.draggable || e && typeof t.draggable > "u");
function lu() {
  const e = je();
  return ue((n) => {
    const { nodeExtent: o, snapToGrid: r, snapGrid: s, nodesDraggable: a, onError: c, updateNodePositions: u, nodeLookup: l, nodeOrigin: d } = e.getState(), f = /* @__PURE__ */ new Map(), h = Ym(a), p = r ? s[0] : 5, g = r ? s[1] : 5, b = n.direction.x * p * n.factor, x = n.direction.y * g * n.factor;
    for (const [, m] of l) {
      if (!h(m))
        continue;
      let E = {
        x: m.internals.positionAbsolute.x + b,
        y: m.internals.positionAbsolute.y + x
      };
      r && (E = xo(E, s));
      const { position: y, positionAbsolute: N } = kl({
        nodeId: m.id,
        nextPosition: E,
        nodeLookup: l,
        nodeExtent: o,
        nodeOrigin: d,
        onError: c
      });
      m.position = y, m.internals.positionAbsolute = N, f.set(m.id, m);
    }
    u(f);
  }, []);
}
const gs = Zi(null), Zm = gs.Provider;
gs.Consumer;
const uu = () => ho(gs), Gm = (e) => ({
  connectOnClick: e.connectOnClick,
  noPanClassName: e.noPanClassName,
  rfId: e.rfId
}), Jm = (e, t, n) => (o) => {
  const { connectionClickStartHandle: r, connectionMode: s, connection: a } = o, { fromHandle: c, toHandle: u, isValid: l } = a, d = u?.nodeId === e && u?.id === t && u?.type === n;
  return {
    connectingFrom: c?.nodeId === e && c?.id === t && c?.type === n,
    connectingTo: d,
    clickConnecting: r?.nodeId === e && r?.id === t && r?.type === n,
    isPossibleEndHandle: s === fn.Strict ? c?.type !== n : e !== c?.nodeId || t !== c?.id,
    connectionInProcess: !!c,
    clickConnectionInProcess: !!r,
    valid: d && l
  };
};
function Qm({ type: e = "source", position: t = ne.Top, isValidConnection: n, isConnectable: o = !0, isConnectableStart: r = !0, isConnectableEnd: s = !0, id: a, onConnect: c, children: u, className: l, onMouseDown: d, onTouchStart: f, ...h }, p) {
  const g = a || null, b = e === "target", x = je(), m = uu(), { connectOnClick: E, noPanClassName: y, rfId: N } = pe(Gm, Ne), { connectingFrom: k, connectingTo: v, clickConnecting: j, isPossibleEndHandle: _, connectionInProcess: M, clickConnectionInProcess: W, valid: D } = pe(Jm(m, g, e), Ne);
  m || x.getState().onError?.("010", Ye.error010());
  const T = (A) => {
    const { defaultEdgeOptions: I, onConnect: $, hasDefaultEdges: L } = x.getState(), P = {
      ...I,
      ...A
    };
    if (L) {
      const { edges: B, setEdges: K, onError: O } = x.getState();
      K(iu(P, B, { onError: O }));
    }
    $?.(P), c?.(P);
  }, R = (A) => {
    if (!m)
      return;
    const I = Tl(A.nativeEvent);
    if (r && (I && A.button === 0 || !I)) {
      const $ = x.getState();
      Li.onPointerDown(A.nativeEvent, {
        handleDomNode: A.currentTarget,
        autoPanOnConnect: $.autoPanOnConnect,
        connectionMode: $.connectionMode,
        connectionRadius: $.connectionRadius,
        domNode: $.domNode,
        nodeLookup: $.nodeLookup,
        lib: $.lib,
        isTarget: b,
        handleId: g,
        nodeId: m,
        flowId: $.rfId,
        panBy: $.panBy,
        cancelConnection: $.cancelConnection,
        onConnectStart: $.onConnectStart,
        onConnectEnd: (...L) => x.getState().onConnectEnd?.(...L),
        updateConnection: $.updateConnection,
        onConnect: T,
        isValidConnection: n || ((...L) => x.getState().isValidConnection?.(...L) ?? !0),
        getTransform: () => x.getState().transform,
        getFromHandle: () => x.getState().connection.fromHandle,
        autoPanSpeed: $.autoPanSpeed,
        dragThreshold: $.connectionDragThreshold
      });
    }
    I ? d?.(A) : f?.(A);
  }, S = (A) => {
    const { onClickConnectStart: I, onClickConnectEnd: $, connectionClickStartHandle: L, connectionMode: P, isValidConnection: B, lib: K, rfId: O, nodeLookup: Z, connection: X } = x.getState();
    if (!m || !L && !r)
      return;
    if (!L) {
      I?.(A.nativeEvent, { nodeId: m, handleId: g, handleType: e }), x.setState({ connectionClickStartHandle: { nodeId: m, type: e, id: g } });
      return;
    }
    const oe = Dl(A.target), se = n || B, { connection: G, isValid: V } = Li.isValid(A.nativeEvent, {
      handle: {
        nodeId: m,
        id: g,
        type: e
      },
      connectionMode: P,
      fromNodeId: L.nodeId,
      fromHandleId: L.id || null,
      fromType: L.type,
      isValidConnection: se,
      flowId: O,
      doc: oe,
      lib: K,
      nodeLookup: Z
    });
    V && G && T(G);
    const Y = structuredClone(X);
    delete Y.inProgress, Y.toPosition = Y.toHandle ? Y.toHandle.position : null, $?.(A, Y), x.setState({ connectionClickStartHandle: null });
  };
  return i.jsx("div", { "data-handleid": g, "data-nodeid": m, "data-handlepos": t, "data-id": `${N}-${m}-${g}-${e}`, className: Ee([
    "react-flow__handle",
    `react-flow__handle-${t}`,
    "nodrag",
    y,
    l,
    {
      source: !b,
      target: b,
      connectable: o,
      connectablestart: r,
      connectableend: s,
      clickconnecting: j,
      connectingfrom: k,
      connectingto: v,
      valid: D,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: o && (!M || _) && (M || W ? s : r)
    }
  ]), onMouseDown: R, onTouchStart: R, onClick: E ? S : void 0, ref: p, ...h, children: u });
}
const mn = Se(su(Qm));
function ex({ data: e, isConnectable: t, sourcePosition: n = ne.Bottom }) {
  return i.jsxs(i.Fragment, { children: [e?.label, i.jsx(mn, { type: "source", position: n, isConnectable: t })] });
}
function tx({ data: e, isConnectable: t, targetPosition: n = ne.Top, sourcePosition: o = ne.Bottom }) {
  return i.jsxs(i.Fragment, { children: [i.jsx(mn, { type: "target", position: n, isConnectable: t }), e?.label, i.jsx(mn, { type: "source", position: o, isConnectable: t })] });
}
function nx() {
  return null;
}
function ox({ data: e, isConnectable: t, targetPosition: n = ne.Top }) {
  return i.jsxs(i.Fragment, { children: [i.jsx(mn, { type: "target", position: n, isConnectable: t }), e?.label] });
}
const pr = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, Xa = {
  input: ex,
  default: tx,
  output: ox,
  group: nx
};
function rx(e) {
  return e.internals.handleBounds === void 0 ? {
    width: e.width ?? e.initialWidth ?? e.style?.width,
    height: e.height ?? e.initialHeight ?? e.style?.height
  } : {
    width: e.width ?? e.style?.width,
    height: e.height ?? e.style?.height
  };
}
const ix = (e) => {
  const { width: t, height: n, x: o, y: r } = mo(e.nodeLookup, {
    filter: (s) => !!s.selected
  });
  return {
    width: nt(t) ? t : null,
    height: nt(n) ? n : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${o}px,${r}px)`
  };
};
function sx({ onSelectionContextMenu: e, noPanClassName: t, disableKeyboardA11y: n }) {
  const o = je(), { width: r, height: s, transformString: a, userSelectionActive: c } = pe(ix, Ne), u = lu(), l = ie(null);
  ee(() => {
    n || l.current?.focus({
      preventScroll: !0
    });
  }, [n]);
  const d = !c && r !== null && s !== null;
  if (cu({
    nodeRef: l,
    disabled: !d
  }), !d)
    return null;
  const f = e ? (p) => {
    const g = o.getState().nodes.filter((b) => b.selected);
    e(p, g);
  } : void 0, h = (p) => {
    Object.prototype.hasOwnProperty.call(pr, p.key) && (p.preventDefault(), u({
      direction: pr[p.key],
      factor: p.shiftKey ? 4 : 1
    }));
  };
  return i.jsx("div", { className: Ee(["react-flow__nodesselection", "react-flow__container", t]), style: {
    transform: a
  }, children: i.jsx("div", { ref: l, className: "react-flow__nodesselection-rect", onContextMenu: f, tabIndex: n ? void 0 : -1, onKeyDown: n ? void 0 : h, style: {
    width: r,
    height: s
  } }) });
}
const Ua = typeof window < "u" ? window : void 0, ax = (e) => ({ nodesSelectionActive: e.nodesSelectionActive, userSelectionActive: e.userSelectionActive });
function du({ children: e, onPaneClick: t, onPaneMouseEnter: n, onPaneMouseMove: o, onPaneMouseLeave: r, onPaneContextMenu: s, onPaneScroll: a, paneClickDistance: c, deleteKeyCode: u, selectionKeyCode: l, selectionOnDrag: d, selectionMode: f, onSelectionStart: h, onSelectionEnd: p, multiSelectionKeyCode: g, panActivationKeyCode: b, zoomActivationKeyCode: x, elementsSelectable: m, zoomOnScroll: E, zoomOnPinch: y, panOnScroll: N, panOnScrollSpeed: k, panOnScrollMode: v, zoomOnDoubleClick: j, panOnDrag: _, autoPanOnSelection: M, defaultViewport: W, translateExtent: D, minZoom: T, maxZoom: R, preventScrolling: S, onSelectionContextMenu: A, noWheelClassName: I, noPanClassName: $, disableKeyboardA11y: L, onViewportChange: P, isControlledViewport: B }) {
  const { nodesSelectionActive: K, userSelectionActive: O } = pe(ax, Ne), Z = co(l, { target: Ua }), X = co(b, { target: Ua }), oe = X || _, se = X || N, G = d && oe !== !0, V = Z || O || G;
  return Hm({ deleteKeyCode: u, multiSelectionKeyCode: g }), i.jsx(Fm, { onPaneContextMenu: s, elementsSelectable: m, zoomOnScroll: E, zoomOnPinch: y, panOnScroll: se, panOnScrollSpeed: k, panOnScrollMode: v, zoomOnDoubleClick: j, panOnDrag: !Z && oe, defaultViewport: W, translateExtent: D, minZoom: T, maxZoom: R, zoomActivationKeyCode: x, preventScrolling: S, noWheelClassName: I, noPanClassName: $, onViewportChange: P, isControlledViewport: B, paneClickDistance: c, selectionOnDrag: G, children: i.jsxs(Um, { onSelectionStart: h, onSelectionEnd: p, onPaneClick: t, onPaneMouseEnter: n, onPaneMouseMove: o, onPaneMouseLeave: r, onPaneContextMenu: s, onPaneScroll: a, panOnDrag: oe, autoPanOnSelection: M, isSelecting: !!V, selectionMode: f, selectionKeyPressed: Z, paneClickDistance: c, selectionOnDrag: G, children: [e, K && i.jsx(sx, { onSelectionContextMenu: A, noPanClassName: $, disableKeyboardA11y: L })] }) });
}
du.displayName = "FlowRenderer";
const cx = Se(du), lx = (e) => (t) => e ? is(t.nodeLookup, { x: 0, y: 0, width: t.width, height: t.height }, t.transform, !0).map((n) => n.id) : Array.from(t.nodeLookup.keys());
function ux(e) {
  return pe(ue(lx(e), [e]), Ne);
}
const dx = (e) => e.updateNodeInternals;
function fx() {
  const e = pe(dx), [t] = q(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((n) => {
    const o = /* @__PURE__ */ new Map();
    n.forEach((r) => {
      const s = r.target.getAttribute("data-id");
      o.set(s, {
        id: s,
        nodeElement: r.target,
        force: !0
      });
    }), e(o);
  }));
  return ee(() => () => {
    t?.disconnect();
  }, [t]), t;
}
function hx({ node: e, nodeType: t, hasDimensions: n, resizeObserver: o }) {
  const r = je(), s = ie(null), a = ie(null), c = ie(e.sourcePosition), u = ie(e.targetPosition), l = ie(t), d = n && !!e.internals.handleBounds;
  return ee(() => {
    s.current && !e.hidden && (!d || a.current !== s.current) && (a.current && o?.unobserve(a.current), o?.observe(s.current), a.current = s.current);
  }, [d, e.hidden]), ee(() => () => {
    a.current && (o?.unobserve(a.current), a.current = null);
  }, []), ee(() => {
    if (s.current) {
      const f = l.current !== t, h = c.current !== e.sourcePosition, p = u.current !== e.targetPosition;
      (f || h || p) && (l.current = t, c.current = e.sourcePosition, u.current = e.targetPosition, r.getState().updateNodeInternals(/* @__PURE__ */ new Map([[e.id, { id: e.id, nodeElement: s.current, force: !0 }]])));
    }
  }, [e.id, t, e.sourcePosition, e.targetPosition]), s;
}
function px({ id: e, onClick: t, onMouseEnter: n, onMouseMove: o, onMouseLeave: r, onContextMenu: s, onDoubleClick: a, nodesDraggable: c, elementsSelectable: u, nodesConnectable: l, nodesFocusable: d, resizeObserver: f, noDragClassName: h, noPanClassName: p, disableKeyboardA11y: g, rfId: b, nodeTypes: x, nodeClickDistance: m, onError: E }) {
  const { node: y, internals: N, isParent: k } = pe((V) => {
    const Y = V.nodeLookup.get(e), ae = V.parentLookup.has(e);
    return {
      node: Y,
      internals: Y.internals,
      isParent: ae
    };
  }, Ne);
  let v = y.type || "default", j = x?.[v] || Xa[v];
  j === void 0 && (E?.("003", Ye.error003(v)), v = "default", j = x?.default || Xa.default);
  const _ = !!(y.draggable || c && typeof y.draggable > "u"), M = !!(y.selectable || u && typeof y.selectable > "u"), W = !!(y.connectable || l && typeof y.connectable > "u"), D = !!(y.focusable || d && typeof y.focusable > "u"), T = je(), R = Al(y), S = hx({ node: y, nodeType: v, hasDimensions: R, resizeObserver: f }), A = cu({
    nodeRef: S,
    disabled: y.hidden || !_,
    noDragClassName: h,
    handleSelector: y.dragHandle,
    nodeId: e,
    isSelectable: M,
    nodeClickDistance: m
  }), I = lu();
  if (y.hidden)
    return null;
  const $ = mt(y), L = rx(y), P = M || _ || t || n || o || r, B = n ? (V) => n(V, { ...N.userNode }) : void 0, K = o ? (V) => o(V, { ...N.userNode }) : void 0, O = r ? (V) => r(V, { ...N.userNode }) : void 0, Z = s ? (V) => s(V, { ...N.userNode }) : void 0, X = a ? (V) => a(V, { ...N.userNode }) : void 0, oe = (V) => {
    const { selectNodesOnDrag: Y, nodeDragThreshold: ae } = T.getState();
    M && (!Y || !_ || ae > 0) && zi({
      id: e,
      store: T,
      nodeRef: S
    }), t && t(V, { ...N.userNode });
  }, se = (V) => {
    if (!(Ml(V.nativeEvent) || g)) {
      if (vl.includes(V.key) && M) {
        const Y = V.key === "Escape";
        zi({
          id: e,
          store: T,
          unselect: Y,
          nodeRef: S
        });
      } else if (_ && y.selected && Object.prototype.hasOwnProperty.call(pr, V.key)) {
        V.preventDefault();
        const { ariaLabelConfig: Y } = T.getState();
        T.setState({
          ariaLiveMessage: Y["node.a11yDescription.ariaLiveMessage"]({
            direction: V.key.replace("Arrow", "").toLowerCase(),
            x: ~~N.positionAbsolute.x,
            y: ~~N.positionAbsolute.y
          })
        }), I({
          direction: pr[V.key],
          factor: V.shiftKey ? 4 : 1
        });
      }
    }
  }, G = () => {
    if (g || !S.current?.matches(":focus-visible"))
      return;
    const { transform: V, width: Y, height: ae, autoPanOnNodeFocus: ce, setCenter: J } = T.getState();
    if (!ce)
      return;
    is(/* @__PURE__ */ new Map([[e, y]]), { x: 0, y: 0, width: Y, height: ae }, V, !0).length > 0 || J(y.position.x + $.width / 2, y.position.y + $.height / 2, {
      zoom: V[2]
    });
  };
  return i.jsx("div", { className: Ee([
    "react-flow__node",
    `react-flow__node-${v}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [p]: _
    },
    y.className,
    {
      selected: y.selected,
      selectable: M,
      parent: k,
      draggable: _,
      dragging: A
    }
  ]), ref: S, style: {
    zIndex: N.z,
    transform: `translate(${N.positionAbsolute.x}px,${N.positionAbsolute.y}px)`,
    pointerEvents: P ? "all" : "none",
    visibility: R ? "visible" : "hidden",
    ...y.style,
    ...L
  }, "data-id": e, "data-testid": `rf__node-${e}`, onMouseEnter: B, onMouseMove: K, onMouseLeave: O, onContextMenu: Z, onClick: oe, onDoubleClick: X, onKeyDown: D ? se : void 0, tabIndex: D ? 0 : void 0, onFocus: D ? G : void 0, role: y.ariaRole ?? (D ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": g ? void 0 : `${Jl}-${b}`, "aria-label": y.ariaLabel, ...y.domAttributes, children: i.jsx(Zm, { value: e, children: i.jsx(j, { id: e, data: y.data, type: v, positionAbsoluteX: N.positionAbsolute.x, positionAbsoluteY: N.positionAbsolute.y, selected: y.selected ?? !1, selectable: M, draggable: _, deletable: y.deletable ?? !0, isConnectable: W, sourcePosition: y.sourcePosition, targetPosition: y.targetPosition, dragging: A, dragHandle: y.dragHandle, zIndex: N.z, parentId: y.parentId, ...$ }) }) });
}
var gx = Se(px);
const yx = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError
});
function fu(e) {
  const { nodesDraggable: t, nodesConnectable: n, nodesFocusable: o, elementsSelectable: r, onError: s } = pe(yx, Ne), a = ux(e.onlyRenderVisibleElements), c = fx();
  return i.jsx("div", { className: "react-flow__nodes", style: Lr, children: a.map((u) => (
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
    i.jsx(gx, { id: u, nodeTypes: e.nodeTypes, nodeExtent: e.nodeExtent, onClick: e.onNodeClick, onMouseEnter: e.onNodeMouseEnter, onMouseMove: e.onNodeMouseMove, onMouseLeave: e.onNodeMouseLeave, onContextMenu: e.onNodeContextMenu, onDoubleClick: e.onNodeDoubleClick, noDragClassName: e.noDragClassName, noPanClassName: e.noPanClassName, rfId: e.rfId, disableKeyboardA11y: e.disableKeyboardA11y, resizeObserver: c, nodesDraggable: t, nodesConnectable: n, nodesFocusable: o, elementsSelectable: r, nodeClickDistance: e.nodeClickDistance, onError: s }, u)
  )) });
}
fu.displayName = "NodeRenderer";
const mx = Se(fu);
function xx(e) {
  return pe(ue((n) => {
    if (!e)
      return n.edges.map((r) => r.id);
    const o = [];
    if (n.width && n.height)
      for (const r of n.edges) {
        const s = n.nodeLookup.get(r.source), a = n.nodeLookup.get(r.target);
        s && a && hy({
          sourceNode: s,
          targetNode: a,
          width: n.width,
          height: n.height,
          transform: n.transform
        }) && o.push(r.id);
      }
    return o;
  }, [e]), Ne);
}
const wx = ({ color: e = "none", strokeWidth: t = 1 }) => {
  const n = {
    strokeWidth: t,
    ...e && { stroke: e }
  };
  return i.jsx("polyline", { className: "arrow", style: n, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, vx = ({ color: e = "none", strokeWidth: t = 1 }) => {
  const n = {
    strokeWidth: t,
    ...e && { stroke: e, fill: e }
  };
  return i.jsx("polyline", { className: "arrowclosed", style: n, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, Ya = {
  [dr.Arrow]: wx,
  [dr.ArrowClosed]: vx
};
function bx(e) {
  const t = je();
  return de(() => Object.prototype.hasOwnProperty.call(Ya, e) ? Ya[e] : (t.getState().onError?.("009", Ye.error009(e)), null), [e]);
}
const Nx = ({ id: e, type: t, color: n, width: o = 12.5, height: r = 12.5, markerUnits: s = "strokeWidth", strokeWidth: a, orient: c = "auto-start-reverse" }) => {
  const u = bx(t);
  return u ? i.jsx("marker", { className: "react-flow__arrowhead", id: e, markerWidth: `${o}`, markerHeight: `${r}`, viewBox: "-10 -10 20 20", markerUnits: s, orient: c, refX: "0", refY: "0", children: i.jsx(u, { color: n, strokeWidth: a }) }) : null;
}, hu = ({ defaultColor: e, rfId: t }) => {
  const n = pe((s) => s.edges), o = pe((s) => s.defaultEdgeOptions), r = de(() => by(n, {
    id: t,
    defaultColor: e,
    defaultMarkerStart: o?.markerStart,
    defaultMarkerEnd: o?.markerEnd
  }), [n, o, t, e]);
  return r.length ? i.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: i.jsx("defs", { children: r.map((s) => i.jsx(Nx, { id: s.id, type: s.type, color: s.color, width: s.width, height: s.height, markerUnits: s.markerUnits, strokeWidth: s.strokeWidth, orient: s.orient }, s.id)) }) }) : null;
};
hu.displayName = "MarkerDefinitions";
var jx = Se(hu);
function pu({ x: e, y: t, label: n, labelStyle: o, labelShowBg: r = !0, labelBgStyle: s, labelBgPadding: a = [2, 4], labelBgBorderRadius: c = 2, children: u, className: l, ...d }) {
  const [f, h] = q({ x: 1, y: 0, width: 0, height: 0 }), p = Ee(["react-flow__edge-textwrapper", l]), g = ie(null);
  return ee(() => {
    if (g.current) {
      const b = g.current.getBBox();
      h({
        x: b.x,
        y: b.y,
        width: b.width,
        height: b.height
      });
    }
  }, [n]), n ? i.jsxs("g", { transform: `translate(${e - f.width / 2} ${t - f.height / 2})`, className: p, visibility: f.width ? "visible" : "hidden", ...d, children: [r && i.jsx("rect", { width: f.width + 2 * a[0], x: -a[0], y: -a[1], height: f.height + 2 * a[1], className: "react-flow__edge-textbg", style: s, rx: c, ry: c }), i.jsx("text", { className: "react-flow__edge-text", y: f.height / 2, dy: "0.3em", ref: g, style: o, children: n }), u] }) : null;
}
pu.displayName = "EdgeText";
const Sx = Se(pu);
function wo({ path: e, labelX: t, labelY: n, label: o, labelStyle: r, labelShowBg: s, labelBgStyle: a, labelBgPadding: c, labelBgBorderRadius: u, interactionWidth: l = 20, ...d }) {
  return i.jsxs(i.Fragment, { children: [i.jsx("path", { ...d, d: e, fill: "none", className: Ee(["react-flow__edge-path", d.className]) }), l ? i.jsx("path", { d: e, fill: "none", strokeOpacity: 0, strokeWidth: l, className: "react-flow__edge-interaction" }) : null, o && nt(t) && nt(n) ? i.jsx(Sx, { x: t, y: n, label: o, labelStyle: r, labelShowBg: s, labelBgStyle: a, labelBgPadding: c, labelBgBorderRadius: u }) : null] });
}
function Za({ pos: e, x1: t, y1: n, x2: o, y2: r }) {
  return e === ne.Left || e === ne.Right ? [0.5 * (t + o), n] : [t, 0.5 * (n + r)];
}
function gu({ sourceX: e, sourceY: t, sourcePosition: n = ne.Bottom, targetX: o, targetY: r, targetPosition: s = ne.Top }) {
  const [a, c] = Za({
    pos: n,
    x1: e,
    y1: t,
    x2: o,
    y2: r
  }), [u, l] = Za({
    pos: s,
    x1: o,
    y1: r,
    x2: e,
    y2: t
  }), [d, f, h, p] = $l({
    sourceX: e,
    sourceY: t,
    targetX: o,
    targetY: r,
    sourceControlX: a,
    sourceControlY: c,
    targetControlX: u,
    targetControlY: l
  });
  return [
    `M${e},${t} C${a},${c} ${u},${l} ${o},${r}`,
    d,
    f,
    h,
    p
  ];
}
function yu(e) {
  return Se(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: s, sourcePosition: a, targetPosition: c, label: u, labelStyle: l, labelShowBg: d, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p, style: g, markerEnd: b, markerStart: x, interactionWidth: m }) => {
    const [E, y, N] = gu({
      sourceX: n,
      sourceY: o,
      sourcePosition: a,
      targetX: r,
      targetY: s,
      targetPosition: c
    }), k = e.isInternal ? void 0 : t;
    return i.jsx(wo, { id: k, path: E, labelX: y, labelY: N, label: u, labelStyle: l, labelShowBg: d, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p, style: g, markerEnd: b, markerStart: x, interactionWidth: m });
  });
}
const kx = yu({ isInternal: !1 }), mu = yu({ isInternal: !0 });
kx.displayName = "SimpleBezierEdge";
mu.displayName = "SimpleBezierEdgeInternal";
function xu(e) {
  return Se(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: s, label: a, labelStyle: c, labelShowBg: u, labelBgStyle: l, labelBgPadding: d, labelBgBorderRadius: f, style: h, sourcePosition: p = ne.Bottom, targetPosition: g = ne.Top, markerEnd: b, markerStart: x, pathOptions: m, interactionWidth: E }) => {
    const [y, N, k] = hr({
      sourceX: n,
      sourceY: o,
      sourcePosition: p,
      targetX: r,
      targetY: s,
      targetPosition: g,
      borderRadius: m?.borderRadius,
      offset: m?.offset,
      stepPosition: m?.stepPosition
    }), v = e.isInternal ? void 0 : t;
    return i.jsx(wo, { id: v, path: y, labelX: N, labelY: k, label: a, labelStyle: c, labelShowBg: u, labelBgStyle: l, labelBgPadding: d, labelBgBorderRadius: f, style: h, markerEnd: b, markerStart: x, interactionWidth: E });
  });
}
const wu = xu({ isInternal: !1 }), vu = xu({ isInternal: !0 });
wu.displayName = "SmoothStepEdge";
vu.displayName = "SmoothStepEdgeInternal";
function bu(e) {
  return Se(({ id: t, ...n }) => {
    const o = e.isInternal ? void 0 : t;
    return i.jsx(wu, { ...n, id: o, pathOptions: de(() => ({ borderRadius: 0, offset: n.pathOptions?.offset }), [n.pathOptions?.offset]) });
  });
}
const Ex = bu({ isInternal: !1 }), Nu = bu({ isInternal: !0 });
Ex.displayName = "StepEdge";
Nu.displayName = "StepEdgeInternal";
function ju(e) {
  return Se(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: s, label: a, labelStyle: c, labelShowBg: u, labelBgStyle: l, labelBgPadding: d, labelBgBorderRadius: f, style: h, markerEnd: p, markerStart: g, interactionWidth: b }) => {
    const [x, m, E] = Rl({ sourceX: n, sourceY: o, targetX: r, targetY: s }), y = e.isInternal ? void 0 : t;
    return i.jsx(wo, { id: y, path: x, labelX: m, labelY: E, label: a, labelStyle: c, labelShowBg: u, labelBgStyle: l, labelBgPadding: d, labelBgBorderRadius: f, style: h, markerEnd: p, markerStart: g, interactionWidth: b });
  });
}
const Cx = ju({ isInternal: !1 }), Su = ju({ isInternal: !0 });
Cx.displayName = "StraightEdge";
Su.displayName = "StraightEdgeInternal";
function ku(e) {
  return Se(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: s, sourcePosition: a = ne.Bottom, targetPosition: c = ne.Top, label: u, labelStyle: l, labelShowBg: d, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p, style: g, markerEnd: b, markerStart: x, pathOptions: m, interactionWidth: E }) => {
    const [y, N, k] = Pl({
      sourceX: n,
      sourceY: o,
      sourcePosition: a,
      targetX: r,
      targetY: s,
      targetPosition: c,
      curvature: m?.curvature
    }), v = e.isInternal ? void 0 : t;
    return i.jsx(wo, { id: v, path: y, labelX: N, labelY: k, label: u, labelStyle: l, labelShowBg: d, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p, style: g, markerEnd: b, markerStart: x, interactionWidth: E });
  });
}
const Ix = ku({ isInternal: !1 }), Eu = ku({ isInternal: !0 });
Ix.displayName = "BezierEdge";
Eu.displayName = "BezierEdgeInternal";
const Ga = {
  default: Eu,
  straight: Su,
  step: Nu,
  smoothstep: vu,
  simplebezier: mu
}, Ja = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, Ax = (e, t, n) => n === ne.Left ? e - t : n === ne.Right ? e + t : e, _x = (e, t, n) => n === ne.Top ? e - t : n === ne.Bottom ? e + t : e, Qa = "react-flow__edgeupdater";
function ec({ position: e, centerX: t, centerY: n, radius: o = 10, onMouseDown: r, onMouseEnter: s, onMouseOut: a, type: c }) {
  return i.jsx("circle", { onMouseDown: r, onMouseEnter: s, onMouseOut: a, className: Ee([Qa, `${Qa}-${c}`]), cx: Ax(t, o, e), cy: _x(n, o, e), r: o, stroke: "transparent", fill: "transparent" });
}
function Dx({ isReconnectable: e, reconnectRadius: t, edge: n, sourceX: o, sourceY: r, targetX: s, targetY: a, sourcePosition: c, targetPosition: u, onReconnect: l, onReconnectStart: d, onReconnectEnd: f, setReconnecting: h, setUpdateHover: p }) {
  const g = je(), b = (N, k) => {
    if (N.button !== 0)
      return;
    const { autoPanOnConnect: v, domNode: j, connectionMode: _, connectionRadius: M, lib: W, onConnectStart: D, cancelConnection: T, nodeLookup: R, rfId: S, panBy: A, updateConnection: I } = g.getState(), $ = k.type === "target", L = (K, O) => {
      h(!1), f?.(K, n, k.type, O);
    }, P = (K) => l?.(n, K), B = (K, O) => {
      h(!0), d?.(N, n, k.type), D?.(K, O);
    };
    Li.onPointerDown(N.nativeEvent, {
      autoPanOnConnect: v,
      connectionMode: _,
      connectionRadius: M,
      domNode: j,
      handleId: k.id,
      nodeId: k.nodeId,
      nodeLookup: R,
      isTarget: $,
      edgeUpdaterType: k.type,
      lib: W,
      flowId: S,
      cancelConnection: T,
      panBy: A,
      isValidConnection: (...K) => g.getState().isValidConnection?.(...K) ?? !0,
      onConnect: P,
      onConnectStart: B,
      onConnectEnd: (...K) => g.getState().onConnectEnd?.(...K),
      onReconnectEnd: L,
      updateConnection: I,
      getTransform: () => g.getState().transform,
      getFromHandle: () => g.getState().connection.fromHandle,
      dragThreshold: g.getState().connectionDragThreshold,
      handleDomNode: N.currentTarget
    });
  }, x = (N) => b(N, { nodeId: n.target, id: n.targetHandle ?? null, type: "target" }), m = (N) => b(N, { nodeId: n.source, id: n.sourceHandle ?? null, type: "source" }), E = () => p(!0), y = () => p(!1);
  return i.jsxs(i.Fragment, { children: [(e === !0 || e === "source") && i.jsx(ec, { position: c, centerX: o, centerY: r, radius: t, onMouseDown: x, onMouseEnter: E, onMouseOut: y, type: "source" }), (e === !0 || e === "target") && i.jsx(ec, { position: u, centerX: s, centerY: a, radius: t, onMouseDown: m, onMouseEnter: E, onMouseOut: y, type: "target" })] });
}
function Mx({ id: e, edgesFocusable: t, edgesReconnectable: n, elementsSelectable: o, onClick: r, onDoubleClick: s, onContextMenu: a, onMouseEnter: c, onMouseMove: u, onMouseLeave: l, reconnectRadius: d, onReconnect: f, onReconnectStart: h, onReconnectEnd: p, rfId: g, edgeTypes: b, noPanClassName: x, onError: m, disableKeyboardA11y: E }) {
  let y = pe((J) => J.edgeLookup.get(e));
  const N = pe((J) => J.defaultEdgeOptions);
  y = N ? { ...N, ...y } : y;
  let k = y.type || "default", v = b?.[k] || Ga[k];
  v === void 0 && (m?.("011", Ye.error011(k)), k = "default", v = b?.default || Ga.default);
  const j = !!(y.focusable || t && typeof y.focusable > "u"), _ = typeof f < "u" && (y.reconnectable || n && typeof y.reconnectable > "u"), M = !!(y.selectable || o && typeof y.selectable > "u"), W = ie(null), [D, T] = q(!1), [R, S] = q(!1), A = je(), { zIndex: I, sourceX: $, sourceY: L, targetX: P, targetY: B, sourcePosition: K, targetPosition: O } = pe(ue((J) => {
    const te = J.nodeLookup.get(y.source), fe = J.nodeLookup.get(y.target);
    if (!te || !fe)
      return {
        zIndex: y.zIndex,
        ...Ja
      };
    const H = vy({
      id: e,
      sourceNode: te,
      targetNode: fe,
      sourceHandle: y.sourceHandle || null,
      targetHandle: y.targetHandle || null,
      connectionMode: J.connectionMode,
      onError: m
    });
    return {
      zIndex: fy({
        selected: y.selected,
        zIndex: y.zIndex,
        sourceNode: te,
        targetNode: fe,
        elevateOnSelect: J.elevateEdgesOnSelect,
        zIndexMode: J.zIndexMode
      }),
      ...H || Ja
    };
  }, [y.source, y.target, y.sourceHandle, y.targetHandle, y.selected, y.zIndex]), Ne), Z = de(() => y.markerStart ? `url('#${$i(y.markerStart, g)}')` : void 0, [y.markerStart, g]), X = de(() => y.markerEnd ? `url('#${$i(y.markerEnd, g)}')` : void 0, [y.markerEnd, g]);
  if (y.hidden || $ === null || L === null || P === null || B === null)
    return null;
  const oe = (J) => {
    const { addSelectedEdges: te, unselectNodesAndEdges: fe, multiSelectionActive: H } = A.getState();
    M && (A.setState({ nodesSelectionActive: !1 }), y.selected && H ? (fe({ nodes: [], edges: [y] }), W.current?.blur()) : te([e])), r && r(J, y);
  }, se = s ? (J) => {
    s(J, { ...y });
  } : void 0, G = a ? (J) => {
    a(J, { ...y });
  } : void 0, V = c ? (J) => {
    c(J, { ...y });
  } : void 0, Y = u ? (J) => {
    u(J, { ...y });
  } : void 0, ae = l ? (J) => {
    l(J, { ...y });
  } : void 0, ce = (J) => {
    if (!E && vl.includes(J.key) && M) {
      const { unselectNodesAndEdges: te, addSelectedEdges: fe } = A.getState();
      J.key === "Escape" ? (W.current?.blur(), te({ edges: [y] })) : fe([e]);
    }
  };
  return i.jsx("svg", { style: { zIndex: I }, children: i.jsxs("g", { className: Ee([
    "react-flow__edge",
    `react-flow__edge-${k}`,
    y.className,
    x,
    {
      selected: y.selected,
      animated: y.animated,
      inactive: !M && !r,
      updating: D,
      selectable: M
    }
  ]), onClick: oe, onDoubleClick: se, onContextMenu: G, onMouseEnter: V, onMouseMove: Y, onMouseLeave: ae, onKeyDown: j ? ce : void 0, tabIndex: j ? 0 : void 0, role: y.ariaRole ?? (j ? "group" : "img"), "aria-roledescription": "edge", "data-id": e, "data-testid": `rf__edge-${e}`, "aria-label": y.ariaLabel === null ? void 0 : y.ariaLabel || `Edge from ${y.source} to ${y.target}`, "aria-describedby": j ? `${Ql}-${g}` : void 0, ref: W, ...y.domAttributes, children: [!R && i.jsx(v, { id: e, source: y.source, target: y.target, type: y.type, selected: y.selected, animated: y.animated, selectable: M, deletable: y.deletable ?? !0, label: y.label, labelStyle: y.labelStyle, labelShowBg: y.labelShowBg, labelBgStyle: y.labelBgStyle, labelBgPadding: y.labelBgPadding, labelBgBorderRadius: y.labelBgBorderRadius, sourceX: $, sourceY: L, targetX: P, targetY: B, sourcePosition: K, targetPosition: O, data: y.data, style: y.style, sourceHandleId: y.sourceHandle, targetHandleId: y.targetHandle, markerStart: Z, markerEnd: X, pathOptions: "pathOptions" in y ? y.pathOptions : void 0, interactionWidth: y.interactionWidth }), _ && i.jsx(Dx, { edge: y, isReconnectable: _, reconnectRadius: d, onReconnect: f, onReconnectStart: h, onReconnectEnd: p, sourceX: $, sourceY: L, targetX: P, targetY: B, sourcePosition: K, targetPosition: O, setUpdateHover: T, setReconnecting: S })] }) });
}
var Tx = Se(Mx);
const $x = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError
});
function Cu({ defaultMarkerColor: e, onlyRenderVisibleElements: t, rfId: n, edgeTypes: o, noPanClassName: r, onReconnect: s, onEdgeContextMenu: a, onEdgeMouseEnter: c, onEdgeMouseMove: u, onEdgeMouseLeave: l, onEdgeClick: d, reconnectRadius: f, onEdgeDoubleClick: h, onReconnectStart: p, onReconnectEnd: g, disableKeyboardA11y: b }) {
  const { edgesFocusable: x, edgesReconnectable: m, elementsSelectable: E, onError: y } = pe($x, Ne), N = xx(t);
  return i.jsxs("div", { className: "react-flow__edges", children: [i.jsx(jx, { defaultColor: e, rfId: n }), N.map((k) => i.jsx(Tx, { id: k, edgesFocusable: x, edgesReconnectable: m, elementsSelectable: E, noPanClassName: r, onReconnect: s, onContextMenu: a, onMouseEnter: c, onMouseMove: u, onMouseLeave: l, onClick: d, reconnectRadius: f, onDoubleClick: h, onReconnectStart: p, onReconnectEnd: g, rfId: n, onError: y, edgeTypes: o, disableKeyboardA11y: b }, k))] });
}
Cu.displayName = "EdgeRenderer";
const Px = Se(Cu), Lx = (e) => `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function zx({ children: e }) {
  const t = pe(Lx);
  return i.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: t }, children: e });
}
function Rx(e) {
  const t = ps(), n = ie(!1);
  ee(() => {
    !n.current && t.viewportInitialized && e && (setTimeout(() => e(t), 1), n.current = !0);
  }, [e, t.viewportInitialized]);
}
const Vx = (e) => e.panZoom?.syncViewport;
function Ox(e) {
  const t = pe(Vx), n = je();
  return ee(() => {
    e && (t?.(e), n.setState({ transform: [e.x, e.y, e.zoom] }));
  }, [e, t]), null;
}
function Hx(e) {
  return e.connection.inProgress ? { ...e.connection, to: vn(e.connection.to, e.transform) } : { ...e.connection };
}
function Wx(e) {
  return Hx;
}
function Bx(e) {
  const t = Wx();
  return pe(t, Ne);
}
const Fx = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height
});
function Kx({ containerStyle: e, style: t, type: n, component: o }) {
  const { nodesConnectable: r, width: s, height: a, isValid: c, inProgress: u } = pe(Fx, Ne);
  return !(s && r && u) ? null : i.jsx("svg", { style: e, width: s, height: a, className: "react-flow__connectionline react-flow__container", children: i.jsx("g", { className: Ee(["react-flow__connection", jl(c)]), children: i.jsx(Iu, { style: t, type: n, CustomComponent: o, isValid: c }) }) });
}
const Iu = ({ style: e, type: t = Nt.Bezier, CustomComponent: n, isValid: o }) => {
  const { inProgress: r, from: s, fromNode: a, fromHandle: c, fromPosition: u, to: l, toNode: d, toHandle: f, toPosition: h, pointer: p } = Bx();
  if (!r)
    return;
  if (n)
    return i.jsx(n, { connectionLineType: t, connectionLineStyle: e, fromNode: a, fromHandle: c, fromX: s.x, fromY: s.y, toX: l.x, toY: l.y, fromPosition: u, toPosition: h, connectionStatus: jl(o), toNode: d, toHandle: f, pointer: p });
  let g = "";
  const b = {
    sourceX: s.x,
    sourceY: s.y,
    sourcePosition: u,
    targetX: l.x,
    targetY: l.y,
    targetPosition: h
  };
  switch (t) {
    case Nt.Bezier:
      [g] = Pl(b);
      break;
    case Nt.SimpleBezier:
      [g] = gu(b);
      break;
    case Nt.Step:
      [g] = hr({
        ...b,
        borderRadius: 0
      });
      break;
    case Nt.SmoothStep:
      [g] = hr(b);
      break;
    default:
      [g] = Rl(b);
  }
  return i.jsx("path", { d: g, fill: "none", className: "react-flow__connection-path", style: e });
};
Iu.displayName = "ConnectionLine";
const qx = {};
function tc(e = qx) {
  ie(e), je(), ee(() => {
  }, [e]);
}
function Xx() {
  je(), ie(!1), ee(() => {
  }, []);
}
function Au({ nodeTypes: e, edgeTypes: t, onInit: n, onNodeClick: o, onEdgeClick: r, onNodeDoubleClick: s, onEdgeDoubleClick: a, onNodeMouseEnter: c, onNodeMouseMove: u, onNodeMouseLeave: l, onNodeContextMenu: d, onSelectionContextMenu: f, onSelectionStart: h, onSelectionEnd: p, connectionLineType: g, connectionLineStyle: b, connectionLineComponent: x, connectionLineContainerStyle: m, selectionKeyCode: E, selectionOnDrag: y, selectionMode: N, multiSelectionKeyCode: k, panActivationKeyCode: v, zoomActivationKeyCode: j, deleteKeyCode: _, onlyRenderVisibleElements: M, elementsSelectable: W, defaultViewport: D, translateExtent: T, minZoom: R, maxZoom: S, preventScrolling: A, defaultMarkerColor: I, zoomOnScroll: $, zoomOnPinch: L, panOnScroll: P, panOnScrollSpeed: B, panOnScrollMode: K, zoomOnDoubleClick: O, panOnDrag: Z, autoPanOnSelection: X, onPaneClick: oe, onPaneMouseEnter: se, onPaneMouseMove: G, onPaneMouseLeave: V, onPaneScroll: Y, onPaneContextMenu: ae, paneClickDistance: ce, nodeClickDistance: J, onEdgeContextMenu: te, onEdgeMouseEnter: fe, onEdgeMouseMove: H, onEdgeMouseLeave: Q, reconnectRadius: ge, onReconnect: ve, onReconnectStart: ke, onReconnectEnd: Te, noDragClassName: Ie, noWheelClassName: Oe, noPanClassName: be, disableKeyboardA11y: He, nodeExtent: We, rfId: Ge, viewport: Je, onViewportChange: Qe }) {
  return tc(e), tc(t), Xx(), Rx(n), Ox(Je), i.jsx(cx, { onPaneClick: oe, onPaneMouseEnter: se, onPaneMouseMove: G, onPaneMouseLeave: V, onPaneContextMenu: ae, onPaneScroll: Y, paneClickDistance: ce, deleteKeyCode: _, selectionKeyCode: E, selectionOnDrag: y, selectionMode: N, onSelectionStart: h, onSelectionEnd: p, multiSelectionKeyCode: k, panActivationKeyCode: v, zoomActivationKeyCode: j, elementsSelectable: W, zoomOnScroll: $, zoomOnPinch: L, zoomOnDoubleClick: O, panOnScroll: P, panOnScrollSpeed: B, panOnScrollMode: K, panOnDrag: Z, autoPanOnSelection: X, defaultViewport: D, translateExtent: T, minZoom: R, maxZoom: S, onSelectionContextMenu: f, preventScrolling: A, noDragClassName: Ie, noWheelClassName: Oe, noPanClassName: be, disableKeyboardA11y: He, onViewportChange: Qe, isControlledViewport: !!Je, children: i.jsxs(zx, { children: [i.jsx(Px, { edgeTypes: t, onEdgeClick: r, onEdgeDoubleClick: a, onReconnect: ve, onReconnectStart: ke, onReconnectEnd: Te, onlyRenderVisibleElements: M, onEdgeContextMenu: te, onEdgeMouseEnter: fe, onEdgeMouseMove: H, onEdgeMouseLeave: Q, reconnectRadius: ge, defaultMarkerColor: I, noPanClassName: be, disableKeyboardA11y: He, rfId: Ge }), i.jsx(Kx, { style: b, type: g, component: x, containerStyle: m }), i.jsx("div", { className: "react-flow__edgelabel-renderer" }), i.jsx(mx, { nodeTypes: e, onNodeClick: o, onNodeDoubleClick: s, onNodeMouseEnter: c, onNodeMouseMove: u, onNodeMouseLeave: l, onNodeContextMenu: d, nodeClickDistance: J, onlyRenderVisibleElements: M, noPanClassName: be, noDragClassName: Ie, disableKeyboardA11y: He, nodeExtent: We, rfId: Ge }), i.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
Au.displayName = "GraphView";
const Ux = Se(Au), Yx = Il(), nc = ({ nodes: e, edges: t, defaultNodes: n, defaultEdges: o, width: r, height: s, fitView: a, fitViewOptions: c, minZoom: u = 0.5, maxZoom: l = 2, nodeOrigin: d, nodeExtent: f, zIndexMode: h = "basic" } = {}) => {
  const p = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), m = o ?? t ?? [], E = n ?? e ?? [], y = d ?? [0, 0], N = f ?? ro;
  Hl(b, x, m);
  const { nodesInitialized: k } = Pi(E, p, g, {
    nodeOrigin: y,
    nodeExtent: N,
    zIndexMode: h
  });
  let v = [0, 0, 1];
  if (a && r && s) {
    const j = mo(p, {
      filter: (D) => !!((D.width || D.initialWidth) && (D.height || D.initialHeight))
    }), { x: _, y: M, zoom: W } = as(j, r, s, u, l, c?.padding ?? 0.1);
    v = [_, M, W];
  }
  return {
    rfId: "1",
    width: r ?? 0,
    height: s ?? 0,
    transform: v,
    nodes: E,
    nodesInitialized: k,
    nodeLookup: p,
    parentLookup: g,
    edges: m,
    edgeLookup: x,
    connectionLookup: b,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: n !== void 0,
    hasDefaultEdges: o !== void 0,
    panZoom: null,
    minZoom: u,
    maxZoom: l,
    translateExtent: ro,
    nodeExtent: N,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: fn.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: y,
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
    fitViewQueued: a ?? !1,
    fitViewOptions: c,
    fitViewResolver: null,
    connection: { ...Nl },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: Yx,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: bl,
    zIndexMode: h,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, Zx = ({ nodes: e, edges: t, defaultNodes: n, defaultEdges: o, width: r, height: s, fitView: a, fitViewOptions: c, minZoom: u, maxZoom: l, nodeOrigin: d, nodeExtent: f, zIndexMode: h }) => lm((p, g) => {
  async function b() {
    const { nodeLookup: x, panZoom: m, fitViewOptions: E, fitViewResolver: y, width: N, height: k, minZoom: v, maxZoom: j } = g();
    m && (await iy({
      nodes: x,
      width: N,
      height: k,
      panZoom: m,
      minZoom: v,
      maxZoom: j
    }, E), y?.resolve(!0), p({ fitViewResolver: null }));
  }
  return {
    ...nc({
      nodes: e,
      edges: t,
      width: r,
      height: s,
      fitView: a,
      fitViewOptions: c,
      minZoom: u,
      maxZoom: l,
      nodeOrigin: d,
      nodeExtent: f,
      defaultNodes: n,
      defaultEdges: o,
      zIndexMode: h
    }),
    setNodes: (x) => {
      const { nodeLookup: m, parentLookup: E, nodeOrigin: y, elevateNodesOnSelect: N, fitViewQueued: k, zIndexMode: v, nodesSelectionActive: j } = g(), { nodesInitialized: _, hasSelectedNodes: M } = Pi(x, m, E, {
        nodeOrigin: y,
        nodeExtent: f,
        elevateNodesOnSelect: N,
        checkEquality: !0,
        zIndexMode: v
      }), W = j && M;
      k && _ ? (b(), p({
        nodes: x,
        nodesInitialized: _,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: W
      })) : p({ nodes: x, nodesInitialized: _, nodesSelectionActive: W });
    },
    setEdges: (x) => {
      const { connectionLookup: m, edgeLookup: E } = g();
      Hl(m, E, x), p({ edges: x });
    },
    setDefaultNodesAndEdges: (x, m) => {
      if (x) {
        const { setNodes: E } = g();
        E(x), p({ hasDefaultNodes: !0 });
      }
      if (m) {
        const { setEdges: E } = g();
        E(m), p({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (x) => {
      const { triggerNodeChanges: m, nodeLookup: E, parentLookup: y, domNode: N, nodeOrigin: k, nodeExtent: v, debug: j, fitViewQueued: _, zIndexMode: M } = g(), { changes: W, updatedInternals: D } = Iy(x, E, y, N, k, v, M);
      D && (Sy(E, y, { nodeOrigin: k, nodeExtent: v, zIndexMode: M }), _ ? (b(), p({ fitViewQueued: !1, fitViewOptions: void 0 })) : p({}), W?.length > 0 && (j && console.log("React Flow: trigger node changes", W), m?.(W)));
    },
    updateNodePositions: (x, m = !1) => {
      const E = [];
      let y = [];
      const { nodeLookup: N, triggerNodeChanges: k, connection: v, updateConnection: j, onNodesChangeMiddlewareMap: _ } = g();
      for (const [M, W] of x) {
        const D = N.get(M), T = !!(D?.expandParent && D?.parentId && W?.position), R = {
          id: M,
          type: "position",
          position: T ? {
            x: Math.max(0, W.position.x),
            y: Math.max(0, W.position.y)
          } : W.position,
          dragging: m
        };
        if (D && v.inProgress && v.fromNode.id === D.id) {
          const S = Bt(D, v.fromHandle, ne.Left, !0);
          j({ ...v, from: S });
        }
        T && D.parentId && E.push({
          id: M,
          parentId: D.parentId,
          rect: {
            ...W.internals.positionAbsolute,
            width: W.measured.width ?? 0,
            height: W.measured.height ?? 0
          }
        }), y.push(R);
      }
      if (E.length > 0) {
        const { parentLookup: M, nodeOrigin: W } = g(), D = hs(E, N, M, W);
        y.push(...D);
      }
      for (const M of _.values())
        y = M(y);
      k(y);
    },
    triggerNodeChanges: (x) => {
      const { onNodesChange: m, setNodes: E, nodes: y, hasDefaultNodes: N, debug: k } = g();
      if (x?.length) {
        if (N) {
          const v = nu(x, y);
          E(v);
        }
        k && console.log("React Flow: trigger node changes", x), m?.(x);
      }
    },
    triggerEdgeChanges: (x) => {
      const { onEdgesChange: m, setEdges: E, edges: y, hasDefaultEdges: N, debug: k } = g();
      if (x?.length) {
        if (N) {
          const v = ou(x, y);
          E(v);
        }
        k && console.log("React Flow: trigger edge changes", x), m?.(x);
      }
    },
    addSelectedNodes: (x) => {
      const { multiSelectionActive: m, edgeLookup: E, nodeLookup: y, triggerNodeChanges: N, triggerEdgeChanges: k } = g();
      if (m) {
        const v = x.map((j) => Tt(j, !0));
        N(v);
        return;
      }
      N(sn(y, /* @__PURE__ */ new Set([...x]), !0)), k(sn(E));
    },
    addSelectedEdges: (x) => {
      const { multiSelectionActive: m, edgeLookup: E, nodeLookup: y, triggerNodeChanges: N, triggerEdgeChanges: k } = g();
      if (m) {
        const v = x.map((j) => Tt(j, !0));
        k(v);
        return;
      }
      k(sn(E, /* @__PURE__ */ new Set([...x]))), N(sn(y, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: x, edges: m } = {}) => {
      const { edges: E, nodes: y, nodeLookup: N, triggerNodeChanges: k, triggerEdgeChanges: v } = g(), j = x || y, _ = m || E, M = [];
      for (const D of j) {
        if (!D.selected)
          continue;
        const T = N.get(D.id);
        T && (T.selected = !1), M.push(Tt(D.id, !1));
      }
      const W = [];
      for (const D of _)
        D.selected && W.push(Tt(D.id, !1));
      k(M), v(W);
    },
    setMinZoom: (x) => {
      const { panZoom: m, maxZoom: E } = g();
      m?.setScaleExtent([x, E]), p({ minZoom: x });
    },
    setMaxZoom: (x) => {
      const { panZoom: m, minZoom: E } = g();
      m?.setScaleExtent([E, x]), p({ maxZoom: x });
    },
    setTranslateExtent: (x) => {
      g().panZoom?.setTranslateExtent(x), p({ translateExtent: x });
    },
    resetSelectedElements: () => {
      const { edges: x, nodes: m, triggerNodeChanges: E, triggerEdgeChanges: y, elementsSelectable: N } = g();
      if (!N)
        return;
      const k = m.reduce((j, _) => _.selected ? [...j, Tt(_.id, !1)] : j, []), v = x.reduce((j, _) => _.selected ? [...j, Tt(_.id, !1)] : j, []);
      E(k), y(v);
    },
    setNodeExtent: (x) => {
      const { nodes: m, nodeLookup: E, parentLookup: y, nodeOrigin: N, elevateNodesOnSelect: k, nodeExtent: v, zIndexMode: j } = g();
      x[0][0] === v[0][0] && x[0][1] === v[0][1] && x[1][0] === v[1][0] && x[1][1] === v[1][1] || (Pi(m, E, y, {
        nodeOrigin: N,
        nodeExtent: x,
        elevateNodesOnSelect: k,
        checkEquality: !1,
        zIndexMode: j
      }), p({ nodeExtent: x }));
    },
    panBy: (x) => {
      const { transform: m, width: E, height: y, panZoom: N, translateExtent: k } = g();
      return Ay({ delta: x, panZoom: N, transform: m, translateExtent: k, width: E, height: y });
    },
    setCenter: async (x, m, E) => {
      const { width: y, height: N, maxZoom: k, panZoom: v } = g();
      if (!v)
        return !1;
      const j = typeof E?.zoom < "u" ? E.zoom : k;
      return await v.setViewport({
        x: y / 2 - x * j,
        y: N / 2 - m * j,
        zoom: j
      }, { duration: E?.duration, ease: E?.ease, interpolate: E?.interpolate }), !0;
    },
    cancelConnection: () => {
      p({
        connection: { ...Nl }
      });
    },
    updateConnection: (x) => {
      p({ connection: x });
    },
    reset: () => p({ ...nc() })
  };
}, Object.is);
function Gx({ initialNodes: e, initialEdges: t, defaultNodes: n, defaultEdges: o, initialWidth: r, initialHeight: s, initialMinZoom: a, initialMaxZoom: c, initialFitViewOptions: u, fitView: l, nodeOrigin: d, nodeExtent: f, zIndexMode: h, children: p }) {
  const [g] = q(() => Zx({
    nodes: e,
    edges: t,
    defaultNodes: n,
    defaultEdges: o,
    width: r,
    height: s,
    fitView: l,
    minZoom: a,
    maxZoom: c,
    fitViewOptions: u,
    nodeOrigin: d,
    nodeExtent: f,
    zIndexMode: h
  }));
  return i.jsx(hm, { value: g, children: i.jsx(zm, { children: p }) });
}
function Jx({ children: e, nodes: t, edges: n, defaultNodes: o, defaultEdges: r, width: s, height: a, fitView: c, fitViewOptions: u, minZoom: l, maxZoom: d, nodeOrigin: f, nodeExtent: h, zIndexMode: p }) {
  return ho($r) ? i.jsx(i.Fragment, { children: e }) : i.jsx(Gx, { initialNodes: t, initialEdges: n, defaultNodes: o, defaultEdges: r, initialWidth: s, initialHeight: a, fitView: c, initialFitViewOptions: u, initialMinZoom: l, initialMaxZoom: d, nodeOrigin: f, nodeExtent: h, zIndexMode: p, children: e });
}
const Qx = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function ew({ nodes: e, edges: t, defaultNodes: n, defaultEdges: o, className: r, nodeTypes: s, edgeTypes: a, onNodeClick: c, onEdgeClick: u, onInit: l, onMove: d, onMoveStart: f, onMoveEnd: h, onConnect: p, onConnectStart: g, onConnectEnd: b, onClickConnectStart: x, onClickConnectEnd: m, onNodeMouseEnter: E, onNodeMouseMove: y, onNodeMouseLeave: N, onNodeContextMenu: k, onNodeDoubleClick: v, onNodeDragStart: j, onNodeDrag: _, onNodeDragStop: M, onNodesDelete: W, onEdgesDelete: D, onDelete: T, onSelectionChange: R, onSelectionDragStart: S, onSelectionDrag: A, onSelectionDragStop: I, onSelectionContextMenu: $, onSelectionStart: L, onSelectionEnd: P, onBeforeDelete: B, connectionMode: K, connectionLineType: O = Nt.Bezier, connectionLineStyle: Z, connectionLineComponent: X, connectionLineContainerStyle: oe, deleteKeyCode: se = "Backspace", selectionKeyCode: G = "Shift", selectionOnDrag: V = !1, selectionMode: Y = io.Full, panActivationKeyCode: ae = "Space", multiSelectionKeyCode: ce = ao() ? "Meta" : "Control", zoomActivationKeyCode: J = ao() ? "Meta" : "Control", snapToGrid: te, snapGrid: fe, onlyRenderVisibleElements: H = !1, selectNodesOnDrag: Q, nodesDraggable: ge, autoPanOnNodeFocus: ve, nodesConnectable: ke, nodesFocusable: Te, nodeOrigin: Ie = eu, edgesFocusable: Oe, edgesReconnectable: be, elementsSelectable: He = !0, defaultViewport: We = Em, minZoom: Ge = 0.5, maxZoom: Je = 2, translateExtent: Qe = ro, preventScrolling: Et = !0, nodeExtent: Ut, defaultMarkerColor: Ze = "#b1b1b7", zoomOnScroll: Yt = !0, zoomOnPinch: jn = !0, panOnScroll: Sn = !1, panOnScrollSpeed: So = 0.5, panOnScrollMode: kn = Lt.Free, zoomOnDoubleClick: Be = !0, panOnDrag: ut = !0, onPaneClick: dt, onPaneMouseEnter: Zt, onPaneMouseMove: Br, onPaneMouseLeave: En, onPaneScroll: Gt, onPaneContextMenu: xt, paneClickDistance: Ct = 1, nodeClickDistance: It = 0, children: Le, onReconnect: Cn, onReconnectStart: ko, onReconnectEnd: Fe, onEdgeContextMenu: Eo, onEdgeDoubleClick: we, onEdgeMouseEnter: Ke, onEdgeMouseMove: Jt, onEdgeMouseLeave: Co, reconnectRadius: ye = 10, onNodesChange: At, onEdgesChange: Io, noDragClassName: In = "nodrag", noWheelClassName: An = "nowheel", noPanClassName: _e = "nopan", fitView: wt, fitViewOptions: ft, connectOnClick: Fr, attributionPosition: Ao, proOptions: _o, defaultEdgeOptions: _n, elevateNodesOnSelect: Kr = !0, elevateEdgesOnSelect: Dn = !1, disableKeyboardA11y: _t = !1, autoPanOnConnect: $e, autoPanOnNodeDrag: Mn, autoPanOnSelection: Tn = !0, autoPanSpeed: $n, connectionRadius: Qt, isValidConnection: qr, onError: Xr, style: Ur, id: Do, nodeDragThreshold: Mo, connectionDragThreshold: To, viewport: $o, onViewportChange: Yr, width: Pn, height: Zr, colorMode: Gr = "light", debug: Jr, onScroll: Dt, ariaLabelConfig: en, zIndexMode: tn = "basic", ...Ln }, Qr) {
  const zn = Do || "1", ei = _m(Gr), ti = ue((Po) => {
    Po.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Dt?.(Po);
  }, [Dt]);
  return i.jsx("div", { "data-testid": "rf__wrapper", ...Ln, onScroll: ti, style: { ...Ur, ...Qx }, ref: Qr, className: Ee(["react-flow", r, ei]), id: Do, role: "application", children: i.jsxs(Jx, { nodes: e, edges: t, width: Pn, height: Zr, fitView: wt, fitViewOptions: ft, minZoom: Ge, maxZoom: Je, nodeOrigin: Ie, nodeExtent: Ut, zIndexMode: tn, children: [i.jsx(Am, { nodes: e, edges: t, defaultNodes: n, defaultEdges: o, onConnect: p, onConnectStart: g, onConnectEnd: b, onClickConnectStart: x, onClickConnectEnd: m, nodesDraggable: ge, autoPanOnNodeFocus: ve, nodesConnectable: ke, nodesFocusable: Te, edgesFocusable: Oe, edgesReconnectable: be, elementsSelectable: He, elevateNodesOnSelect: Kr, elevateEdgesOnSelect: Dn, minZoom: Ge, maxZoom: Je, nodeExtent: Ut, onNodesChange: At, onEdgesChange: Io, snapToGrid: te, snapGrid: fe, connectionMode: K, translateExtent: Qe, connectOnClick: Fr, defaultEdgeOptions: _n, fitView: wt, fitViewOptions: ft, onNodesDelete: W, onEdgesDelete: D, onDelete: T, onNodeDragStart: j, onNodeDrag: _, onNodeDragStop: M, onSelectionDrag: A, onSelectionDragStart: S, onSelectionDragStop: I, onMove: d, onMoveStart: f, onMoveEnd: h, noPanClassName: _e, nodeOrigin: Ie, rfId: zn, autoPanOnConnect: $e, autoPanOnNodeDrag: Mn, autoPanSpeed: $n, onError: Xr, connectionRadius: Qt, isValidConnection: qr, selectNodesOnDrag: Q, nodeDragThreshold: Mo, connectionDragThreshold: To, onBeforeDelete: B, debug: Jr, ariaLabelConfig: en, zIndexMode: tn }), i.jsx(Ux, { onInit: l, onNodeClick: c, onEdgeClick: u, onNodeMouseEnter: E, onNodeMouseMove: y, onNodeMouseLeave: N, onNodeContextMenu: k, onNodeDoubleClick: v, nodeTypes: s, edgeTypes: a, connectionLineType: O, connectionLineStyle: Z, connectionLineComponent: X, connectionLineContainerStyle: oe, selectionKeyCode: G, selectionOnDrag: V, selectionMode: Y, deleteKeyCode: se, multiSelectionKeyCode: ce, panActivationKeyCode: ae, zoomActivationKeyCode: J, onlyRenderVisibleElements: H, defaultViewport: We, translateExtent: Qe, minZoom: Ge, maxZoom: Je, preventScrolling: Et, zoomOnScroll: Yt, zoomOnPinch: jn, zoomOnDoubleClick: Be, panOnScroll: Sn, panOnScrollSpeed: So, panOnScrollMode: kn, panOnDrag: ut, autoPanOnSelection: Tn, onPaneClick: dt, onPaneMouseEnter: Zt, onPaneMouseMove: Br, onPaneMouseLeave: En, onPaneScroll: Gt, onPaneContextMenu: xt, paneClickDistance: Ct, nodeClickDistance: It, onSelectionContextMenu: $, onSelectionStart: L, onSelectionEnd: P, onReconnect: Cn, onReconnectStart: ko, onReconnectEnd: Fe, onEdgeContextMenu: Eo, onEdgeDoubleClick: we, onEdgeMouseEnter: Ke, onEdgeMouseMove: Jt, onEdgeMouseLeave: Co, reconnectRadius: ye, defaultMarkerColor: Ze, noDragClassName: In, noWheelClassName: An, noPanClassName: _e, rfId: zn, disableKeyboardA11y: _t, nodeExtent: Ut, viewport: $o, onViewportChange: Yr }), i.jsx(km, { onSelectionChange: R }), Le, i.jsx(vm, { proOptions: _o, position: Ao }), i.jsx(wm, { rfId: zn, disableKeyboardA11y: _t })] }) });
}
var _u = su(ew);
const tw = (e) => e.domNode?.querySelector(".react-flow__edgelabel-renderer");
function nw({ children: e }) {
  const t = pe(tw);
  return t ? fm.createPortal(e, t) : null;
}
function ow({ dimensions: e, lineWidth: t, variant: n, className: o }) {
  return i.jsx("path", { strokeWidth: t, d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`, className: Ee(["react-flow__background-pattern", n, o]) });
}
function rw({ radius: e, className: t }) {
  return i.jsx("circle", { cx: e, cy: e, r: e, className: Ee(["react-flow__background-pattern", "dots", t]) });
}
var St;
(function(e) {
  e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(St || (St = {}));
const iw = {
  [St.Dots]: 1,
  [St.Lines]: 1,
  [St.Cross]: 6
}, sw = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function Du({
  id: e,
  variant: t = St.Dots,
  // only used for dots and cross
  gap: n = 20,
  // only used for lines and cross
  size: o,
  lineWidth: r = 1,
  offset: s = 0,
  color: a,
  bgColor: c,
  style: u,
  className: l,
  patternClassName: d
}) {
  const f = ie(null), { transform: h, patternId: p } = pe(sw, Ne), g = o || iw[t], b = t === St.Dots, x = t === St.Cross, m = Array.isArray(n) ? n : [n, n], E = [m[0] * h[2] || 1, m[1] * h[2] || 1], y = g * h[2], N = Array.isArray(s) ? s : [s, s], k = x ? [y, y] : E, v = [
    N[0] * h[2] || 1 + k[0] / 2,
    N[1] * h[2] || 1 + k[1] / 2
  ], j = `${p}${e || ""}`;
  return i.jsxs("svg", { className: Ee(["react-flow__background", l]), style: {
    ...u,
    ...Lr,
    "--xy-background-color-props": c,
    "--xy-background-pattern-color-props": a
  }, ref: f, "data-testid": "rf__background", children: [i.jsx("pattern", { id: j, x: h[0] % E[0], y: h[1] % E[1], width: E[0], height: E[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${v[0]},-${v[1]})`, children: b ? i.jsx(rw, { radius: y / 2, className: d }) : i.jsx(ow, { dimensions: k, lineWidth: r, variant: t, className: d }) }), i.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${j})` })] });
}
Du.displayName = "Background";
const Mu = Se(Du);
function aw() {
  return i.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: i.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function cw() {
  return i.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: i.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function lw() {
  return i.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: i.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function uw() {
  return i.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: i.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function dw() {
  return i.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: i.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function Ko({ children: e, className: t, ...n }) {
  return i.jsx("button", { type: "button", className: Ee(["react-flow__controls-button", t]), ...n, children: e });
}
const fw = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig
});
function Tu({ style: e, showZoom: t = !0, showFitView: n = !0, showInteractive: o = !0, fitViewOptions: r, onZoomIn: s, onZoomOut: a, onFitView: c, onInteractiveChange: u, className: l, children: d, position: f = "bottom-left", orientation: h = "vertical", "aria-label": p }) {
  const g = je(), { isInteractive: b, minZoomReached: x, maxZoomReached: m, ariaLabelConfig: E } = pe(fw, Ne), { zoomIn: y, zoomOut: N, fitView: k } = ps(), v = () => {
    y(), s?.();
  }, j = () => {
    N(), a?.();
  }, _ = () => {
    k(r), c?.();
  }, M = () => {
    g.setState({
      nodesDraggable: !b,
      nodesConnectable: !b,
      elementsSelectable: !b
    }), u?.(!b);
  }, W = h === "horizontal" ? "horizontal" : "vertical";
  return i.jsxs(Pr, { className: Ee(["react-flow__controls", W, l]), position: f, style: e, "data-testid": "rf__controls", "aria-label": p ?? E["controls.ariaLabel"], children: [t && i.jsxs(i.Fragment, { children: [i.jsx(Ko, { onClick: v, className: "react-flow__controls-zoomin", title: E["controls.zoomIn.ariaLabel"], "aria-label": E["controls.zoomIn.ariaLabel"], disabled: m, children: i.jsx(aw, {}) }), i.jsx(Ko, { onClick: j, className: "react-flow__controls-zoomout", title: E["controls.zoomOut.ariaLabel"], "aria-label": E["controls.zoomOut.ariaLabel"], disabled: x, children: i.jsx(cw, {}) })] }), n && i.jsx(Ko, { className: "react-flow__controls-fitview", onClick: _, title: E["controls.fitView.ariaLabel"], "aria-label": E["controls.fitView.ariaLabel"], children: i.jsx(lw, {}) }), o && i.jsx(Ko, { className: "react-flow__controls-interactive", onClick: M, title: E["controls.interactive.ariaLabel"], "aria-label": E["controls.interactive.ariaLabel"], children: b ? i.jsx(dw, {}) : i.jsx(uw, {}) }), d] });
}
Tu.displayName = "Controls";
const $u = Se(Tu);
function hw({ id: e, x: t, y: n, width: o, height: r, style: s, color: a, strokeColor: c, strokeWidth: u, className: l, borderRadius: d, shapeRendering: f, selected: h, onClick: p }) {
  const { background: g, backgroundColor: b } = s || {}, x = a || g || b;
  return i.jsx("rect", { className: Ee(["react-flow__minimap-node", { selected: h }, l]), x: t, y: n, rx: d, ry: d, width: o, height: r, style: {
    fill: x,
    stroke: c,
    strokeWidth: u
  }, shapeRendering: f, onClick: p ? (m) => p(m, e) : void 0 });
}
const pw = Se(hw), gw = (e) => e.nodes.map((t) => t.id), wi = (e) => e instanceof Function ? e : () => e;
function yw({
  nodeStrokeColor: e,
  nodeColor: t,
  nodeClassName: n = "",
  nodeBorderRadius: o = 5,
  nodeStrokeWidth: r,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: s = pw,
  onClick: a
}) {
  const c = pe(gw, Ne), u = wi(t), l = wi(e), d = wi(n), f = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return i.jsx(i.Fragment, { children: c.map((h) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    i.jsx(xw, { id: h, nodeColorFunc: u, nodeStrokeColorFunc: l, nodeClassNameFunc: d, nodeBorderRadius: o, nodeStrokeWidth: r, NodeComponent: s, onClick: a, shapeRendering: f }, h)
  )) });
}
function mw({ id: e, nodeColorFunc: t, nodeStrokeColorFunc: n, nodeClassNameFunc: o, nodeBorderRadius: r, nodeStrokeWidth: s, shapeRendering: a, NodeComponent: c, onClick: u }) {
  const { node: l, x: d, y: f, width: h, height: p } = pe((g) => {
    const b = g.nodeLookup.get(e);
    if (!b)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const x = b.internals.userNode, { x: m, y: E } = b.internals.positionAbsolute, { width: y, height: N } = mt(x);
    return {
      node: x,
      x: m,
      y: E,
      width: y,
      height: N
    };
  }, Ne);
  return !l || l.hidden || !Al(l) ? null : i.jsx(c, { x: d, y: f, width: h, height: p, style: l.style, selected: !!l.selected, className: o(l), color: t(l), borderRadius: r, strokeColor: n(l), strokeWidth: s, shapeRendering: a, onClick: u, id: l.id });
}
const xw = Se(mw);
var ww = Se(yw);
const vw = 200, bw = 150, Nw = (e) => !e.hidden, jw = (e) => {
  const t = {
    x: -e.transform[0] / e.transform[2],
    y: -e.transform[1] / e.transform[2],
    width: e.width / e.transform[2],
    height: e.height / e.transform[2]
  };
  return {
    viewBB: t,
    boundingRect: e.nodeLookup.size > 0 ? Cl(mo(e.nodeLookup, { filter: Nw }), t) : t,
    rfId: e.rfId,
    panZoom: e.panZoom,
    translateExtent: e.translateExtent,
    flowWidth: e.width,
    flowHeight: e.height,
    ariaLabelConfig: e.ariaLabelConfig
  };
}, Sw = "react-flow__minimap-desc";
function Pu({
  style: e,
  className: t,
  nodeStrokeColor: n,
  nodeColor: o,
  nodeClassName: r = "",
  nodeBorderRadius: s = 5,
  nodeStrokeWidth: a,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: c,
  bgColor: u,
  maskColor: l,
  maskStrokeColor: d,
  maskStrokeWidth: f,
  position: h = "bottom-right",
  onClick: p,
  onNodeClick: g,
  pannable: b = !1,
  zoomable: x = !1,
  ariaLabel: m,
  inversePan: E,
  zoomStep: y = 1,
  offsetScale: N = 5
}) {
  const k = je(), v = ie(null), { boundingRect: j, viewBB: _, rfId: M, panZoom: W, translateExtent: D, flowWidth: T, flowHeight: R, ariaLabelConfig: S } = pe(jw, Ne), A = e?.width ?? vw, I = e?.height ?? bw, $ = j.width / A, L = j.height / I, P = Math.max($, L), B = P * A, K = P * I, O = N * P, Z = j.x - (B - j.width) / 2 - O, X = j.y - (K - j.height) / 2 - O, oe = B + O * 2, se = K + O * 2, G = `${Sw}-${M}`, V = ie(0), Y = ie();
  V.current = P, ee(() => {
    if (v.current && W)
      return Y.current = Ry({
        domNode: v.current,
        panZoom: W,
        getTransform: () => k.getState().transform,
        getViewScale: () => V.current
      }), () => {
        Y.current?.destroy();
      };
  }, [W]), ee(() => {
    Y.current?.update({
      translateExtent: D,
      width: T,
      height: R,
      inversePan: E,
      pannable: b,
      zoomStep: y,
      zoomable: x
    });
  }, [b, x, E, y, D, T, R]);
  const ae = p ? (te) => {
    const [fe, H] = Y.current?.pointer(te) || [0, 0];
    p(te, { x: fe, y: H });
  } : void 0, ce = g ? ue((te, fe) => {
    const H = k.getState().nodeLookup.get(fe).internals.userNode;
    g(te, H);
  }, []) : void 0, J = m ?? S["minimap.ariaLabel"];
  return i.jsx(Pr, { position: h, style: {
    ...e,
    "--xy-minimap-background-color-props": typeof u == "string" ? u : void 0,
    "--xy-minimap-mask-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof d == "string" ? d : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof f == "number" ? f * P : void 0,
    "--xy-minimap-node-background-color-props": typeof o == "string" ? o : void 0,
    "--xy-minimap-node-stroke-color-props": typeof n == "string" ? n : void 0,
    "--xy-minimap-node-stroke-width-props": typeof a == "number" ? a : void 0
  }, className: Ee(["react-flow__minimap", t]), "data-testid": "rf__minimap", children: i.jsxs("svg", { width: A, height: I, viewBox: `${Z} ${X} ${oe} ${se}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": G, ref: v, onClick: ae, children: [J && i.jsx("title", { id: G, children: J }), i.jsx(ww, { onClick: ce, nodeColor: o, nodeStrokeColor: n, nodeBorderRadius: s, nodeClassName: r, nodeStrokeWidth: a, nodeComponent: c }), i.jsx("path", { className: "react-flow__minimap-mask", d: `M${Z - O},${X - O}h${oe + O * 2}v${se + O * 2}h${-oe - O * 2}z
        M${_.x},${_.y}h${_.width}v${_.height}h${-_.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
Pu.displayName = "MiniMap";
const Lu = Se(Pu), kw = (e) => (t) => e ? `${Math.max(1 / t.transform[2], 1)}` : void 0, Ew = {
  [yn.Line]: "right",
  [yn.Handle]: "bottom-right"
};
function Cw({ nodeId: e, position: t, variant: n = yn.Handle, className: o, style: r = void 0, children: s, color: a, minWidth: c = 10, minHeight: u = 10, maxWidth: l = Number.MAX_VALUE, maxHeight: d = Number.MAX_VALUE, keepAspectRatio: f = !1, resizeDirection: h, autoScale: p = !0, shouldResize: g, onResizeStart: b, onResize: x, onResizeEnd: m }) {
  const E = uu(), y = typeof e == "string" ? e : E, N = je(), k = ie(null), v = n === yn.Handle, j = pe(ue(kw(v && p), [v, p]), Ne), _ = ie(null), M = t ?? Ew[n];
  ee(() => {
    if (!(!k.current || !y))
      return _.current || (_.current = Gy({
        domNode: k.current,
        nodeId: y,
        getStoreItems: () => {
          const { nodeLookup: D, transform: T, snapGrid: R, snapToGrid: S, nodeOrigin: A, domNode: I } = N.getState();
          return {
            nodeLookup: D,
            transform: T,
            snapGrid: R,
            snapToGrid: S,
            nodeOrigin: A,
            paneDomNode: I
          };
        },
        onChange: (D, T) => {
          const { triggerNodeChanges: R, nodeLookup: S, parentLookup: A, nodeOrigin: I } = N.getState(), $ = [], L = { x: D.x, y: D.y }, P = S.get(y);
          if (P && P.expandParent && P.parentId) {
            const B = P.origin ?? I, K = D.width ?? P.measured.width ?? 0, O = D.height ?? P.measured.height ?? 0, Z = {
              id: P.id,
              parentId: P.parentId,
              rect: {
                width: K,
                height: O,
                ..._l({
                  x: D.x ?? P.position.x,
                  y: D.y ?? P.position.y
                }, { width: K, height: O }, P.parentId, S, B)
              }
            }, X = hs([Z], S, A, I);
            $.push(...X), L.x = D.x ? Math.max(B[0] * K, D.x) : void 0, L.y = D.y ? Math.max(B[1] * O, D.y) : void 0;
          }
          if (L.x !== void 0 && L.y !== void 0) {
            const B = {
              id: y,
              type: "position",
              position: { ...L }
            };
            $.push(B);
          }
          if (D.width !== void 0 && D.height !== void 0) {
            const K = {
              id: y,
              type: "dimensions",
              resizing: !0,
              setAttributes: h ? h === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: D.width,
                height: D.height
              }
            };
            $.push(K);
          }
          for (const B of T) {
            const K = {
              ...B,
              type: "position"
            };
            $.push(K);
          }
          R($);
        },
        onEnd: ({ width: D, height: T }) => {
          const R = {
            id: y,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: D,
              height: T
            }
          };
          N.getState().triggerNodeChanges([R]);
        }
      })), _.current.update({
        controlPosition: M,
        boundaries: {
          minWidth: c,
          minHeight: u,
          maxWidth: l,
          maxHeight: d
        },
        keepAspectRatio: f,
        resizeDirection: h,
        onResizeStart: b,
        onResize: x,
        onResizeEnd: m,
        shouldResize: g
      }), () => {
        _.current?.destroy();
      };
  }, [
    M,
    c,
    u,
    l,
    d,
    f,
    b,
    x,
    m,
    g
  ]);
  const W = M.split("-");
  return i.jsx("div", { className: Ee(["react-flow__resize-control", "nodrag", ...W, n, o]), ref: k, style: {
    ...r,
    scale: j,
    ...a && { [v ? "backgroundColor" : "borderColor"]: a }
  }, children: s });
}
Se(Cw);
const Iw = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), zu = (...e) => e.filter((t, n, o) => !!t && t.trim() !== "" && o.indexOf(t) === n).join(" ").trim();
var Aw = {
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
const _w = kr(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: o,
    className: r = "",
    children: s,
    iconNode: a,
    ...c
  }, u) => Si(
    "svg",
    {
      ref: u,
      ...Aw,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: o ? Number(n) * 24 / Number(t) : n,
      className: zu("lucide", r),
      ...c
    },
    [
      ...a.map(([l, d]) => Si(l, d)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
const he = (e, t) => {
  const n = kr(
    ({ className: o, ...r }, s) => Si(_w, {
      ref: s,
      iconNode: t,
      className: zu(`lucide-${Iw(e)}`, o),
      ...r
    })
  );
  return n.displayName = `${e}`, n;
};
const Dw = he("Activity", [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
]);
const zr = he("Boxes", [
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
const bn = he("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
const Ru = he("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
const gr = he("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
const on = he("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
const Mw = he("ChevronUp", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);
const kt = he("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
const Tw = he("CodeXml", [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
]);
const $w = he("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
const Pw = he("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
const oc = he("EyeOff", [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
]);
const Vu = he("GitBranch", [
  ["line", { x1: "6", x2: "6", y1: "3", y2: "15", key: "17qcm7" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M18 9a9 9 0 0 1-9 9", key: "n2h4wq" }]
]);
const Ou = he("GripVertical", [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
]);
const Lw = he("ListChecks", [
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }],
  ["path", { d: "M13 6h8", key: "15sg57" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 18h8", key: "oe0vm4" }]
]);
const ys = he("ListTree", [
  ["path", { d: "M21 12h-8", key: "1bmf0i" }],
  ["path", { d: "M21 6H8", key: "1pqkrb" }],
  ["path", { d: "M21 18h-8", key: "1tm79t" }],
  ["path", { d: "M3 6v4c0 1.1.9 2 2 2h3", key: "1ywdgy" }],
  ["path", { d: "M3 10v6c0 1.1.9 2 2 2h3", key: "2wc746" }]
]);
const yr = he("Maximize2", [
  ["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }],
  ["polyline", { points: "9 21 3 21 3 15", key: "1avn1i" }],
  ["line", { x1: "21", x2: "14", y1: "3", y2: "10", key: "ota7mn" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]);
const rc = he("Minimize2", [
  ["polyline", { points: "4 14 10 14 10 20", key: "11kfnr" }],
  ["polyline", { points: "20 10 14 10 14 4", key: "rlmsce" }],
  ["line", { x1: "14", x2: "21", y1: "10", y2: "3", key: "o5lafz" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]);
const zw = he("Network", [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
]);
const Hu = he("Package", [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["path", { d: "m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7", key: "yx3hmr" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
]);
const xn = he("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
const wn = he("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
const Rw = he("Redo2", [
  ["path", { d: "m15 14 5-5-5-5", key: "12vg1m" }],
  ["path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13", key: "6uklza" }]
]);
const ms = he("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
const Wu = he("Save", [
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
const Rr = he("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
const ic = he("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
]);
const xs = he("SlidersHorizontal", [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
]);
const yt = he("Sparkles", [
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
const Vw = he("Terminal", [
  ["polyline", { points: "4 17 10 11 4 5", key: "akl6gq" }],
  ["line", { x1: "12", x2: "20", y1: "19", y2: "19", key: "q2wloq" }]
]);
const lo = he("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
const mr = he("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
const Ow = he("Undo2", [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
]);
const Hw = he("Workflow", [
  ["rect", { width: "8", height: "8", x: "3", y: "3", rx: "2", key: "by2w9f" }],
  ["path", { d: "M7 11v4a2 2 0 0 0 2 2h4", key: "xkn7yn" }],
  ["rect", { width: "8", height: "8", x: "13", y: "13", rx: "2", key: "1cgmvn" }]
]);
const Ww = he("Wrench", [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
      key: "cbrjhi"
    }
  ]
]);
const Bu = he("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const Bw = he("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]), Fw = /* @__PURE__ */ new Set(["nodeId", "activityVersionId", "inputs", "outputs", "structure"]);
function vo(e) {
  return Fu(e, Kw);
}
function Vr(e) {
  return Fu(e, qw);
}
function Fu(e, t) {
  return !e || !e.rootActivity ? e : { ...e, rootActivity: Ku(e.rootActivity, t) };
}
function Ku(e, t) {
  const n = t(e), o = n.structure;
  if (!o || !Ft(o.payload)) return n;
  let r = !1;
  const s = { ...o.payload };
  for (const [a, c] of Object.entries(o.payload))
    Array.isArray(c) && c.length > 0 && c.every(Jw) && (s[a] = c.map((u) => Ku(u, t)), r = !0);
  return r ? { ...n, structure: { ...o, payload: s } } : n;
}
function Kw(e) {
  const t = [], n = {};
  for (const [r, s] of Object.entries(e))
    Fw.has(r) || (Gw(s) ? t.push({
      referenceKey: Xw(r),
      value: { value: Yw(s.expression), expressionType: s.expression.type || "Literal" }
    }) : n[r] = s);
  const o = Array.isArray(e.inputs) ? e.inputs : [];
  return {
    ...n,
    nodeId: e.nodeId,
    activityVersionId: e.activityVersionId,
    inputs: [...o, ...t],
    outputs: Array.isArray(e.outputs) ? e.outputs : [],
    structure: e.structure
  };
}
function qw(e) {
  const t = Array.isArray(e.inputs) ? e.inputs : [], n = {};
  for (const o of t) {
    if (!Ft(o) || typeof o.referenceKey != "string") continue;
    const r = Ft(o.value) ? o.value : {};
    n[Uw(o.referenceKey)] = {
      typeName: "",
      expression: {
        type: typeof r.expressionType == "string" ? r.expressionType : "Literal",
        value: r.value ?? ""
      }
    };
  }
  return { ...e, ...n, inputs: [] };
}
function Xw(e) {
  return e && e.charAt(0).toUpperCase() + e.slice(1);
}
function Uw(e) {
  return e && e.charAt(0).toLowerCase() + e.slice(1);
}
function Yw(e) {
  return (e.type || "Literal") === "Variable" && Ft(e.value) ? e.value : Zw(e.value);
}
function Zw(e) {
  return e == null ? null : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : JSON.stringify(e);
}
function Gw(e) {
  if (!Ft(e) || Array.isArray(e)) return !1;
  const t = e.expression;
  return Ft(t) && typeof t.type == "string";
}
function Jw(e) {
  return Ft(e) && typeof e.nodeId == "string" && typeof e.activityVersionId == "string";
}
function Ft(e) {
  return typeof e == "object" && e !== null;
}
const bo = "elsa.sequence.structure", Nn = "elsa.flowchart.structure";
function qu(e, t) {
  if (!e) return null;
  let n = e;
  for (const o of t) {
    const r = Ve(n).find((a) => a.id === o.slotId);
    if (!r) return null;
    const s = r.activities.find((a) => a.nodeId === o.ownerNodeId);
    if (!s) return null;
    n = s;
  }
  return n;
}
function Qw(e, t, n = (o) => o.nodeId) {
  if (!e) return null;
  if (e.nodeId === t) return [];
  const o = (r, s) => {
    const a = Ve(r);
    if (a[0]?.activities.some((c) => c.nodeId === t)) return s;
    for (const c of a)
      for (const u of c.activities) {
        const l = o(u, [...s, { ownerNodeId: u.nodeId, slotId: c.id, label: n(u) }]);
        if (l) return l;
      }
    return null;
  };
  return o(e, []);
}
function Jn(e, t) {
  const n = qu(e, t);
  if (!n) return null;
  let o = Ve(n)[0];
  return o ? { owner: n, slot: o } : null;
}
function Ve(e) {
  const t = e.structure;
  if (!t || !t.payload || typeof t.payload != "object") return [];
  const n = t.payload, o = x0(t), r = vi(n.activities);
  return r ? [{
    id: `${t.kind}:activities`,
    label: w0(t),
    property: "activities",
    mode: o,
    activities: r
  }] : Object.entries(n).filter(([, s]) => vi(s)).map(([s, a]) => ({
    id: `${t.kind}:${s}`,
    label: b0(s),
    property: s,
    mode: "generic",
    activities: vi(a) ?? []
  }));
}
function Xu(e, t, n) {
  const o = new Map(t.map((a) => [a.activityVersionId, a])), r = new Map(n.map((a) => [a.nodeId, a])), s = e.slot.activities.map((a, c) => {
    const u = o.get(a.activityVersionId), l = r.get(a.nodeId) ?? v0(e.slot.mode, c);
    return Zu(a, u, { x: l.x, y: l.y });
  });
  return {
    nodes: s,
    edges: e.slot.mode === "flowchart" ? Gu(e.owner) : u0(e.slot, s)
  };
}
function Ri(e, t, n) {
  const o = t.find((s) => s.activityVersionId === e.activityVersionId), r = n.find((s) => s.nodeId === e.nodeId) ?? { x: 0, y: 0 };
  return {
    nodes: [Zu(e, o, { x: r.x, y: r.y }, {
      connectable: !1,
      deletable: !1,
      draggable: !1,
      suppressFlowPorts: !0
    })],
    edges: []
  };
}
function e0(e, t, n, o = null) {
  const r = new Map(t.map((c) => [c.activityExecutionId, c])), s = ac(t, (c) => c.authoredActivityId || c.executableNodeId), a = ac(n, (c) => c.executableNodeId ? c.executableNodeId : c.activityExecutionId ? r.get(c.activityExecutionId)?.authoredActivityId ?? "" : "");
  return e.map((c) => {
    const u = s.get(c.id) ?? [], l = a.get(c.id) ?? [];
    if (u.length === 0 && l.length === 0) return c;
    const d = g0(u), f = o === c.id || u.some((p) => p.activityExecutionId === o) || l.some((p) => p.incidentId === o), h = {
      status: d?.status,
      subStatus: d?.subStatus,
      activityExecutionId: d?.activityExecutionId,
      faultCount: u.reduce((p, g) => p + g.faultCount + g.aggregateFaultCount, 0),
      incidentCount: l.length,
      hasBlockingIncident: l.some((p) => p.isBlocking),
      selected: f
    };
    return {
      ...c,
      selected: f,
      className: f ? "wf-runtime-node-selected" : c.className,
      data: {
        ...c.data,
        runtime: h
      }
    };
  });
}
function ws(e, t) {
  return e?.structure?.kind === Nn || i0(t) ? "flowchart" : e?.structure?.kind === bo || s0(t) ? "sequence" : "unsupported";
}
function Vi(e, t, n) {
  if (t.length === 0) {
    const c = Ve(e)[0];
    return c ? uo(e, c, n) : e;
  }
  const [o, ...r] = t, s = Ve(e).find((c) => c.id === o.slotId);
  if (!s) return e;
  const a = s.activities.map((c) => c.nodeId === o.ownerNodeId ? Vi(c, r, n) : c);
  return uo(e, s, a);
}
function Uu(e, t, n) {
  if (t.length === 0) return n;
  const [o, ...r] = t, s = Ve(e).find((c) => c.id === o.slotId);
  if (!s) return e;
  const a = s.activities.map((c) => c.nodeId === o.ownerNodeId ? Uu(c, r, n) : c);
  return uo(e, s, a);
}
function Yu(e, t, n) {
  if (e.nodeId === t) return n(e);
  const o = Ve(e);
  if (o.length === 0) return e;
  let r = !1, s = e;
  for (const a of o) {
    const c = a.activities.map((u) => {
      const l = Yu(u, t, n);
      return l !== u && (r = !0), l;
    });
    r && (s = uo(s, a, c));
  }
  return r ? s : e;
}
function uo(e, t, n) {
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
function t0(e, t, n, o = []) {
  const r = new Map(e.slot.activities.map((a) => [a.nodeId, a]));
  for (const a of o)
    r.set(a.nodeId, a);
  const s = t.map((a) => r.get(a.id)).filter((a) => !!a);
  return e.slot.mode === "sequence" && s.sort((a, c) => {
    const u = t.find((d) => d.id === a.nodeId), l = t.find((d) => d.id === c.nodeId);
    return (u?.position.x ?? 0) - (l?.position.x ?? 0);
  }), uo(e.owner, e.slot, s);
}
function n0(e, t) {
  return {
    ...e,
    structure: l0(e.structure, t)
  };
}
function o0(e, t) {
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
function Oi(e, t) {
  return {
    nodeId: t,
    activityVersionId: e.activityVersionId,
    inputs: [],
    outputs: [],
    structure: c0(e)
  };
}
function Ae(e) {
  const t = e.activityTypeKey.split(".").at(-1) || e.activityTypeKey, n = e.displayName?.trim();
  return !n || n === e.activityTypeKey || n.includes(".") ? a0(t) : n;
}
function Zu(e, t, n, o = {}) {
  return {
    id: e.nodeId,
    type: "workflowActivity",
    position: n,
    connectable: o.connectable,
    deletable: o.deletable,
    draggable: o.draggable,
    data: {
      label: t ? Ae(t) : e.activityVersionId,
      activityVersionId: e.activityVersionId,
      activityTypeKey: t?.activityTypeKey,
      category: t?.category,
      executionType: t?.executionType,
      icon: xr(t),
      childSlots: Ve(e),
      acceptsInbound: d0(e, t),
      sourcePorts: o.suppressFlowPorts ? [] : Ju(e, t),
      suppressFlowPorts: o.suppressFlowPorts
    }
  };
}
function xr(e) {
  if (!e) return "activity";
  const t = r0(e.icon);
  if (t) return t;
  const n = e.activityTypeKey.toLowerCase(), o = Ae(e).toLowerCase(), r = e.category?.toLowerCase() ?? "", s = e.executionType?.toLowerCase() ?? "";
  return n.endsWith(".flowchart") || o === "flowchart" ? "flowchart" : n.endsWith(".sequence") || o === "sequence" ? "sequence" : n.includes("writeline") || o.includes("write line") ? "terminal" : r.includes("runtime") ? "runtime" : s === "trigger" ? "trigger" : "activity";
}
function r0(e) {
  if (!e) return null;
  const t = e.trim().toLowerCase();
  return ["activity", "flowchart", "sequence", "terminal", "runtime", "trigger"].includes(t) ? t : null;
}
function i0(e) {
  return !!e && (Ae(e) === "Flowchart" || e.activityTypeKey.endsWith(".Flowchart"));
}
function s0(e) {
  return !!e && (Ae(e) === "Sequence" || e.activityTypeKey.endsWith(".Sequence"));
}
function a0(e) {
  return e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").trim();
}
function c0(e) {
  return e.activityTypeKey.endsWith(".Sequence") || e.displayName === "Sequence" ? {
    kind: bo,
    schemaVersion: "1.0.0",
    payload: { activities: [] }
  } : e.activityTypeKey.endsWith(".Flowchart") || e.displayName === "Flowchart" ? {
    kind: Nn,
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
function l0(e, t) {
  if (!e) return e ?? null;
  const n = Array.isArray(e.payload.connections) ? e.payload.connections : [], o = /* @__PURE__ */ new Map();
  for (const r of n) {
    if (!vs(r)) continue;
    const s = r.id;
    typeof s == "string" && o.set(s, r);
  }
  return {
    ...e,
    payload: {
      ...e.payload,
      connections: t.map((r) => {
        const s = o.get(r.id) ?? {}, a = r.data?.vertices, { vertices: c, ...u } = s;
        return {
          ...u,
          id: r.id,
          source: { nodeId: r.source, port: r.sourceHandle ?? "Done" },
          target: r.targetHandle ? { nodeId: r.target, port: r.targetHandle } : { nodeId: r.target },
          ...a?.length ? { vertices: a.map((l) => ({ x: Math.round(l.x), y: Math.round(l.y) })) } : {}
        };
      })
    }
  };
}
function u0(e, t) {
  return e.mode === "sequence" ? t.slice(0, -1).map((n, o) => ({
    id: `sequence-${n.id}-${t[o + 1].id}`,
    source: n.id,
    target: t[o + 1].id,
    type: "smoothstep",
    animated: !1
  })) : [];
}
function Gu(e) {
  if (e.structure?.kind !== Nn) return [];
  const t = e.structure.payload.connections;
  return Array.isArray(t) ? t.map((n, o) => {
    if (!n || typeof n != "object") return null;
    const r = n.source, s = n.target;
    if (!r?.nodeId || !s?.nodeId) return null;
    const a = Array.isArray(n.vertices) ? n.vertices.filter(y0) : [];
    return {
      id: typeof n.id == "string" ? String(n.id) : `flow-${o}-${r.nodeId}-${s.nodeId}`,
      source: r.nodeId,
      target: s.nodeId,
      sourceHandle: r.port,
      targetHandle: s.port && s.port !== "Done" ? s.port : void 0,
      type: "workflow",
      label: r.port && r.port !== "Done" ? r.port : void 0,
      data: a.length ? { vertices: a } : void 0
    };
  }).filter((n) => !!n) : [];
}
function Ju(e, t) {
  const n = sc(e.cases);
  if (h0(e, t) && n.length > 0)
    return [...n.map((s) => ({ name: s, displayName: s })), { name: "Default", displayName: "Default" }];
  const o = [
    ...Qo(t?.designFacets),
    ...Qo(t?.ports),
    ...Qo(t?.outputs)
  ];
  if (o.length > 0) return p0(o);
  const r = sc(e.outcomes);
  return r.length > 0 ? r.map((s) => ({ name: s, displayName: s })) : [{ name: "Done", displayName: "Done" }];
}
function d0(e, t) {
  return String(t?.executionType ?? "").toLowerCase() !== "trigger";
}
function wr(e, t, n, o) {
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
function f0(e, t, n) {
  const o = wr(t.source, n, t.sourceHandle ?? "Done", void 0), r = wr(n, t.target, "Done", t.targetHandle ?? void 0);
  return e.filter((s) => s.id !== t.id).concat(o, r);
}
function vi(e) {
  return Array.isArray(e) ? e.filter(m0) : null;
}
function h0(e, t) {
  const n = t?.activityTypeKey ?? e.activityVersionId, o = t?.displayName ?? "";
  return n.endsWith(".FlowSwitch") || n === "FlowSwitch" || o === "FlowSwitch";
}
function Qo(e) {
  if (!Array.isArray(e)) return [];
  const t = [];
  for (const n of e) {
    if (!vs(n)) continue;
    if (Array.isArray(n.ports)) {
      t.push(...Qo(n.ports));
      continue;
    }
    const o = typeof n.type == "string" ? n.type : typeof n.portType == "string" ? n.portType : "", r = n.isBrowsable !== !1 && n.browsable !== !1, s = typeof n.name == "string" ? n.name : typeof n.id == "string" ? n.id : "";
    if (r && o.toLowerCase() === "flow" && s) {
      const a = typeof n.displayName == "string" ? n.displayName : s;
      t.push({ name: s, displayName: a });
    }
  }
  return t;
}
function p0(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.has(n.name) || t.set(n.name, n);
  return [...t.values()];
}
function sc(e) {
  return Array.isArray(e) ? e.filter((t) => typeof t == "string" && t.length > 0) : [];
}
function ac(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const o of e) {
    const r = t(o);
    r && n.set(r, [...n.get(r) ?? [], o]);
  }
  return n;
}
function g0(e) {
  return [...e].sort((t, n) => cc(n).localeCompare(cc(t)))[0];
}
function cc(e) {
  return e.completedAt ?? e.startedAt ?? e.scheduledAt;
}
function y0(e) {
  return vs(e) && typeof e.x == "number" && typeof e.y == "number";
}
function vs(e) {
  return typeof e == "object" && e !== null;
}
function m0(e) {
  return typeof e == "object" && e !== null && typeof e.nodeId == "string" && typeof e.activityVersionId == "string";
}
function x0(e) {
  return e.kind === bo ? "sequence" : e.kind === Nn ? "flowchart" : "generic";
}
function w0(e) {
  return e.kind === bo || e.kind === Nn, "Activities";
}
function v0(e, t) {
  return e === "sequence" ? { nodeId: "", x: t * 280, y: 0 } : { nodeId: "", x: t % 4 * 280, y: Math.floor(t / 4) * 150 };
}
function b0(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
const Qu = "String", N0 = "singleline";
function Pe(e, t, n = "") {
  return { typeName: e, namespace: t, assemblyName: n, assemblyVersion: "" };
}
const ed = [
  Pe("String", "System", "System.Private.CoreLib"),
  Pe("Boolean", "System", "System.Private.CoreLib"),
  Pe("Int32", "System", "System.Private.CoreLib"),
  Pe("Int64", "System", "System.Private.CoreLib"),
  Pe("Double", "System", "System.Private.CoreLib"),
  Pe("Decimal", "System", "System.Private.CoreLib"),
  Pe("DateTimeOffset", "System", "System.Private.CoreLib"),
  Pe("DateTime", "System", "System.Private.CoreLib"),
  Pe("TimeSpan", "System", "System.Private.CoreLib"),
  Pe("Guid", "System", "System.Private.CoreLib"),
  Pe("Object", "System", "System.Private.CoreLib")
], td = ed[0];
function Hi(e) {
  return !e || !e.typeName ? "" : e.namespace ? `${e.namespace}.${e.typeName}` : e.typeName;
}
function nd(e) {
  const t = e.trim();
  if (!t) return { ...td };
  const n = ed.find((r) => Hi(r) === t || r.typeName === t);
  if (n) return { ...n };
  const o = t.lastIndexOf(".");
  return o > 0 ? Pe(t.slice(o + 1), t.slice(0, o)) : Pe(t, "");
}
function od(e) {
  const t = (e ?? "").trim();
  if (!t) return null;
  const n = t.lastIndexOf(".");
  return n > 0 ? Pe(t.slice(n + 1), t.slice(0, n)) : Pe(t, "");
}
function j0() {
  return typeof crypto < "u" && typeof crypto.randomUUID == "function" ? crypto.randomUUID() : `id-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}
function S0(e, t) {
  const n = new Set(t);
  let o = 1, r = `${e}${o}`;
  for (; n.has(r); )
    o += 1, r = `${e}${o}`;
  return r;
}
function k0(e) {
  return {
    referenceKey: j0(),
    name: e.name,
    typeInformation: e.typeKey ? nd(e.typeKey) : { ...td },
    storageDriverType: od(e.storageDriverKey),
    default: null
  };
}
function E0(e, t) {
  return { ...e, ...t };
}
function C0(e) {
  return e === "" ? null : { value: e, expressionType: "Literal" };
}
function I0(e) {
  return e == null || e.value == null ? "" : typeof e.value == "object" ? JSON.stringify(e.value) : String(e.value);
}
function A0(e) {
  return {
    name: e.name,
    type: e.type?.trim() || Qu,
    displayName: e.name,
    description: "",
    category: "",
    isArray: !1,
    uiHint: N0,
    storageDriverType: e.storageDriverType ?? null,
    defaultValue: null,
    defaultSyntax: null,
    isReadOnly: null
  };
}
function _0(e, t) {
  return { ...e, ...t };
}
function D0(e) {
  return {
    name: e.name,
    type: e.type?.trim() || Qu,
    displayName: e.name,
    description: "",
    category: "",
    isArray: !1
  };
}
function M0(e, t) {
  return { ...e, ...t };
}
function T0(e) {
  const t = e.split(",")[0].trim();
  return (t.split(".").pop() ?? t).split("`")[0];
}
function rd(e, t) {
  return e && !e.includes(",") && !e.includes(".") ? e : T0(e || t);
}
function $0(e, t) {
  return rd(e, t).replace(/StorageDriver$/, "");
}
function id(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function jt(e, t) {
  for (const n of t) {
    const o = e[n];
    if (o != null && typeof o != "object") return String(o);
  }
  return "";
}
function sd(e, t) {
  for (const n of t)
    if (n in e && e[n] != null) return e[n] === !0 || e[n] === "true";
  return !1;
}
const lc = ["name", "Name"], vr = ["name", "Name"], ad = ["type", "Type", "typeName", "TypeName"], cd = ["isArray", "IsArray"], P0 = ["storageDriverType", "StorageDriverType"], L0 = ["defaultValue", "DefaultValue"], br = "workflow", z0 = /* @__PURE__ */ new Set([bo, Nn]);
function R0(e) {
  const t = e?.structure?.kind;
  return !!t && z0.has(t);
}
function ld(e) {
  const t = e?.structure?.payload?.variables;
  return Array.isArray(t) ? t.filter(id) : [];
}
function V0(e, t) {
  return e.structure ? {
    ...e,
    structure: {
      ...e.structure,
      payload: { ...e.structure.payload, variables: t }
    }
  } : e;
}
function O0(e, t) {
  return {
    referenceKey: e,
    declaringScopeId: t && t !== br ? t : br
  };
}
function ud(e) {
  if (e && typeof e == "object") {
    const t = e;
    return typeof t.referenceKey == "string" && t.referenceKey ? { referenceKey: t.referenceKey, declaringScopeId: typeof t.declaringScopeId == "string" ? t.declaringScopeId : null } : null;
  }
  if (typeof e == "string") {
    const t = e.trim();
    if (t.startsWith("{"))
      try {
        return ud(JSON.parse(t));
      } catch {
      }
    return t ? { referenceKey: t, declaringScopeId: null } : null;
  }
  return null;
}
function H0(e) {
  if (!e) return "";
  const t = [`workflow:${uc(e.variables)}`], n = (o) => {
    const r = Ve(o), s = r.flatMap((a) => a.activities.map((c) => c.nodeId));
    t.push(`${o.nodeId}:${uc(ld(o))}>${s.join(",")}`), r.forEach((a) => a.activities.forEach(n));
  };
  return e.rootActivity && n(e.rootActivity), t.join(";");
}
function uc(e) {
  return (e ?? []).map((t) => `${t.referenceKey}=${t.name}`).join(",");
}
function W0(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const o of e ?? [])
    o.scopeId === t && n.set(o.referenceKey, `Shadows "${o.name}" declared in an outer scope.`);
  return n;
}
const Ce = "/_elsa/workflow-management", B0 = "/publishing", Qn = {
  activities: ["workflows", "activities"],
  activityAvailabilitySettings: ["workflows", "activity-availability", "settings"],
  activityAvailabilityDiagnostics: ["workflows", "activity-availability", "diagnostics"]
};
function F0(e) {
  return Bc({
    queryKey: Qn.activityAvailabilitySettings,
    queryFn: () => cv(e)
  });
}
function K0(e) {
  return Bc({
    queryKey: Qn.activityAvailabilityDiagnostics,
    queryFn: () => hd(e)
  });
}
function q0(e) {
  const t = mf();
  return xf({
    mutationFn: (n) => lv(e, n),
    onSuccess: () => {
      t.invalidateQueries({ queryKey: Qn.activityAvailabilitySettings }), t.invalidateQueries({ queryKey: Qn.activityAvailabilityDiagnostics }), t.invalidateQueries({ queryKey: Qn.activities });
    }
  });
}
async function X0(e, t) {
  const n = new URLSearchParams({
    state: t.state ?? "active",
    page: t.page.toString(),
    pageSize: t.pageSize.toString()
  }), o = t.search.trim();
  return o && n.set("search", o), e.http.getJson(`${Ce}/definitions?${n.toString()}`);
}
async function U0(e, t) {
  const n = await e.http.getJson(`${Ce}/definitions/${encodeURIComponent(t)}`);
  return n.draft ? { ...n, draft: { ...n.draft, state: Vr(n.draft.state) } } : n;
}
async function Y0(e, t, n) {
  const o = await e.http.postJson(
    `${Ce}/design/scoped-variables/analyze`,
    { state: vo(t), nodeId: n }
  );
  return {
    visibleVariables: Array.isArray(o?.visibleVariables) ? o.visibleVariables : [],
    shadowingWarnings: Array.isArray(o?.shadowingWarnings) ? o.shadowingWarnings : []
  };
}
const bi = (e) => ({ visibleVariables: [], shadowingWarnings: [], status: e });
function Z0(e, t, n) {
  const o = de(() => H0(t), [t]), [r, s] = q(() => bi("loading"));
  return ee(() => {
    if (!t) {
      s(bi("unavailable"));
      return;
    }
    let a = !1;
    return s((c) => ({ ...c, status: "loading" })), Y0(e, t, n).then(
      (c) => {
        a || s({ ...c, status: "ready" });
      },
      () => {
        a || s(bi("unavailable"));
      }
    ), () => {
      a = !0;
    };
  }, [e, n, o]), r;
}
async function G0(e, t) {
  const n = await e.http.getJson(`${Ce}/versions/${encodeURIComponent(t)}`);
  return { ...n, state: Vr(n.state) };
}
async function J0(e, t) {
  return e.http.postJson(`${Ce}/definitions`, t);
}
async function Q0(e, t) {
  await e.http.deleteJson(`${Ce}/definitions/${encodeURIComponent(t)}`);
}
async function ev(e, t) {
  await e.http.postJson(`${Ce}/definitions/${encodeURIComponent(t)}/restore`, {});
}
async function tv(e, t) {
  await e.http.deleteJson(`${Ce}/definitions/${encodeURIComponent(t)}/permanent`);
}
async function nv(e, t) {
  const n = await e.http.putJson(
    `${Ce}/drafts/${encodeURIComponent(t.id)}`,
    { state: vo(t.state), layout: t.layout }
  );
  return { ...n, state: Vr(n.state) };
}
async function ov(e, t) {
  return e.http.postJson(`${Ce}/drafts/${encodeURIComponent(t)}/promote`, {});
}
async function rv(e, t) {
  return e.http.postJson(`${Ce}/versions/${encodeURIComponent(t)}/publish`, {});
}
async function iv(e, t) {
  const n = { ...t, state: vo(t.state) };
  try {
    return await e.http.postJson(`${B0}/workflows/drafts/test-runs`, n);
  } catch (o) {
    const r = pv(o);
    if (r) return r;
    throw o;
  }
}
async function dd(e, t) {
  return e.http.postJson(`${Ce}/executables/${encodeURIComponent(t)}/run`, {});
}
async function fd(e) {
  return e.http.getJson("/_demo/workflows/executables");
}
async function sv(e, t = {}) {
  const n = new URLSearchParams();
  t.status && n.set("status", t.status), t.runKind && n.set("runKind", t.runKind), t.definitionId && n.set("definitionId", t.definitionId), t.correlationId && n.set("correlationId", t.correlationId), t.take && n.set("take", String(t.take));
  const o = n.toString();
  return e.http.getJson(`/runtime/workflows/instances${o ? `?${o}` : ""}`);
}
async function av(e, t) {
  return e.http.getJson(`/runtime/workflows/instances/${encodeURIComponent(t)}`);
}
async function bs(e) {
  return e.http.getJson(`${Ce}/activities`);
}
async function cv(e) {
  return e.http.getJson(`${Ce}/activities/availability/settings`);
}
async function lv(e, t) {
  return e.http.putJson(`${Ce}/activities/availability/settings`, t);
}
async function hd(e) {
  return e.http.getJson(`${Ce}/activities/availability/diagnostics`);
}
async function uv(e) {
  const t = await Or(e, [
    `${Ce}/descriptors/activities`,
    "/descriptors/activities"
  ]);
  return Array.isArray(t) ? dc(t) : dc(t.items ?? t.activities ?? t.descriptors ?? []);
}
async function dv(e) {
  const t = await Or(e, [
    `${Ce}/descriptors/expression-descriptors`,
    "/descriptors/expression-descriptors"
  ]);
  if (Array.isArray(t)) return t;
  const n = t.items ?? t.descriptors ?? t.expressionDescriptors ?? [];
  return n.length > 0 ? n : er;
}
async function fv(e) {
  const t = await Or(e, [
    `${Ce}/descriptors/variables`,
    "/descriptors/variables"
  ]);
  return (Array.isArray(t) ? t : t.items ?? t.descriptors ?? []).filter((o) => pd(o));
}
async function hv(e) {
  const t = await Or(e, [
    `${Ce}/descriptors/storage-drivers`,
    "/descriptors/storage-drivers"
  ]);
  return (Array.isArray(t) ? t : t.items ?? t.descriptors ?? []).filter((o) => pd(o));
}
function pd(e) {
  return !!e && typeof e == "object" && typeof e.typeName == "string" && e.typeName.length > 0;
}
async function Or(e, t) {
  let n;
  for (const o of t)
    try {
      return await e.http.getJson(o);
    } catch (r) {
      n = r;
    }
  throw n;
}
function dc(e) {
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
function pv(e) {
  const t = e && typeof e == "object" && "payload" in e ? e.payload : null, n = fc(t);
  if (n) return n;
  if (!(e instanceof Error)) return null;
  try {
    return fc(JSON.parse(e.message));
  } catch {
    return null;
  }
}
function fc(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  return typeof t.testRunId == "string" && typeof t.status == "string" ? t : null;
}
const er = [
  { type: "Literal", displayName: "Literal" },
  { type: "JavaScript", displayName: "JavaScript" },
  { type: "Liquid", displayName: "Liquid" },
  { type: "Object", displayName: "Object" },
  { type: "Variable", displayName: "Variable" },
  { type: "Input", displayName: "Input" }
], gv = [
  "Available",
  "BlockedByHostBaseline",
  "HiddenByManagementSettings",
  "RemovedFromCatalog",
  "UnresolvedReference"
], yv = {
  Available: "Available",
  BlockedByHostBaseline: "Host blocked",
  HiddenByManagementSettings: "Management hidden",
  RemovedFromCatalog: "Removed",
  UnresolvedReference: "Unresolved"
};
function zt(e) {
  return typeof e == "string" ? e : typeof e == "number" ? gv[e] ?? "Available" : "Available";
}
function Nr(e) {
  const t = zt(e);
  return yv[t] ?? t;
}
function mv(e) {
  return zt(e).replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function xv(e) {
  return zt(e) !== "Available";
}
function wv(e) {
  return e === "Only" || e === 1 ? "Only" : "AllExcept";
}
function vv(e) {
  return e === "Only" ? 1 : 0;
}
function hc(e) {
  const t = e?.rules;
  return {
    mode: wv(e?.mode),
    activityTypes: t?.activityTypes ?? [],
    sets: t?.sets ?? []
  };
}
function bv(e) {
  return e.referenceKind === 0 || e.referenceKind === "ActivityType";
}
function Nv(e) {
  return [...e?.items ?? []].filter(bv).filter((t) => t.activityTypeKey && t.activityDefinitionId).sort((t, n) => jr(t).localeCompare(jr(n)));
}
function jv(e) {
  return [...e?.items ?? []].filter((t) => {
    const n = zt(t.state);
    return n === "RemovedFromCatalog" || n === "UnresolvedReference";
  }).sort((t, n) => (t.referenceName ?? "").localeCompare(n.referenceName ?? ""));
}
function pc(e, t) {
  return e.includes(t) ? e.filter((n) => n !== t) : [...e, t].sort((n, o) => n.localeCompare(o));
}
function jr(e) {
  const t = e?.displayName?.trim();
  if (t) return t;
  const n = e?.activityTypeKey?.split(".").filter(Boolean).at(-1) ?? "";
  return Sv(n) || e?.activityTypeKey || "Activity";
}
function Sv(e) {
  return e.replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").replace(/([a-z0-9])([A-Z])/g, "$1 $2").trim();
}
function kv(e, t) {
  const n = new Set(e.filter((o) => !!o));
  return (t?.items ?? []).find((o) => xv(o.state) ? [o.activityDefinitionId, o.activityTypeKey, o.referenceName].some((r) => r && n.has(r)) : !1) ?? null;
}
const Ev = [
  { type: "Literal", displayName: "Literal" },
  { type: "JavaScript", displayName: "JavaScript" },
  { type: "Liquid", displayName: "Liquid" },
  { type: "Object", displayName: "Object" },
  { type: "Variable", displayName: "Variable" },
  { type: "Input", displayName: "Input" }
];
function gd(e) {
  const t = e.trim();
  return t ? t.charAt(0).toLowerCase() + t.slice(1) : e;
}
function Ns(e) {
  return gd(e.name);
}
function Cv(e, t) {
  const n = Ns(t), o = e[n];
  return t.isWrapped === !1 ? o ?? t.defaultValue ?? "" : md(o, t);
}
function yd(e, t) {
  return md(e[Ns(t)], t);
}
function Iv(e, t) {
  return {
    ...e,
    expression: {
      type: e.expression.type || "Literal",
      value: t
    }
  };
}
function Av(e, t) {
  return {
    ...e,
    expression: {
      type: t,
      value: e.expression.value
    }
  };
}
function gc(e, t, n) {
  return {
    ...e,
    [Ns(t)]: n
  };
}
function _v(e, t) {
  return t.isWrapped === !1 ? Cv(e, t) : yd(e, t).expression.value;
}
function md(e, t) {
  return Rv(e) ? {
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
const Dv = /* @__PURE__ */ new Set([
  "icollection",
  "ireadonlycollection",
  "ilist",
  "ireadonlylist",
  "list",
  "collection",
  "ienumerable",
  "iset",
  "hashset",
  "sortedset",
  "observablecollection",
  "array"
]);
function Mv(e) {
  const t = e?.trim();
  if (!t) return null;
  const n = /^([\w.+]+)\[\]/.exec(t);
  if (n) return { elementTypeName: n[1] };
  const o = t.indexOf("`");
  if (o < 0) return null;
  const r = t.slice(0, o), s = (r.split(".").pop() ?? r).toLowerCase();
  return Dv.has(s) ? { elementTypeName: Tv(t.slice(o)) } : null;
}
function Tv(e) {
  const t = /\[\[([\w.+]+)/.exec(e);
  if (t) return t[1];
  const n = /\[([\w.+]+)/.exec(e);
  return n ? n[1] : null;
}
function $v(e) {
  const t = e.uiHint?.toLowerCase();
  return t === "json" || t === "code" ? !0 : e.uiSpecifications?.repeater === !1;
}
function Pv(e) {
  if (Array.isArray(e)) return e;
  if (e == null) return [];
  if (typeof e == "string") {
    const t = e.trim();
    if (!t) return [];
    if (t.startsWith("["))
      try {
        const n = JSON.parse(t);
        if (Array.isArray(n)) return n;
      } catch {
      }
    return [e];
  }
  return [e];
}
function Lv(e) {
  const t = (e ?? "").toLowerCase();
  return t === "system.boolean" || t === "boolean" || t === "bool" ? !1 : "";
}
function zv(e, t) {
  return {
    ...e,
    typeName: t ?? "System.String",
    isWrapped: !1,
    // The description documents the collection as a whole; repeating it on every row is noise.
    description: null
  };
}
function Ni(e, t, n) {
  if (t === n || t < 0 || n < 0 || t >= e.length || n >= e.length) return e;
  const o = [...e], [r] = o.splice(t, 1);
  return o.splice(n, 0, r), o;
}
function Rv(e) {
  if (!e || typeof e != "object") return !1;
  const t = e, n = t.expression;
  return typeof t.typeName == "string" && !!n && typeof n == "object" && typeof n.type == "string";
}
const xd = /* @__PURE__ */ new Set(["studio.property.singleline", "studio.property.text-fallback"]), Vv = "Variable";
function Ov({
  activity: e,
  descriptor: t,
  editors: n,
  expressionEditors: o,
  expressionDescriptors: r,
  descriptorStatus: s,
  visibleVariables: a,
  scopeStatus: c,
  onChange: u
}) {
  if (s === "loading")
    return /* @__PURE__ */ i.jsx("p", { className: "wf-muted", children: "Loading activity properties..." });
  if (!t)
    return /* @__PURE__ */ i.jsx("p", { className: "wf-muted", children: "No activity descriptor is available for this activity." });
  const l = t.inputs.filter((h) => h.isBrowsable !== !1).sort((h, p) => (h.order ?? 0) - (p.order ?? 0) || h.name.localeCompare(p.name));
  if (l.length === 0)
    return /* @__PURE__ */ i.jsx("p", { className: "wf-muted", children: "This activity does not expose editable properties." });
  const d = Uv(l), f = r.length > 0 ? r : Ev;
  return /* @__PURE__ */ i.jsxs("div", { className: "wf-properties", children: [
    /* @__PURE__ */ i.jsx("span", { className: "wf-section-label", children: "Properties" }),
    d.map((h) => /* @__PURE__ */ i.jsxs("section", { className: "wf-property-group", children: [
      d.length > 1 ? /* @__PURE__ */ i.jsx("h4", { children: h.category }) : null,
      h.inputs.map((p) => /* @__PURE__ */ i.jsx(
        Hv,
        {
          activity: e,
          input: p,
          editors: n,
          expressionEditors: o,
          expressionDescriptors: f,
          visibleVariables: a,
          scopeStatus: c,
          onChange: u
        },
        p.name
      ))
    ] }, h.category))
  ] });
}
function Hv({
  activity: e,
  input: t,
  editors: n,
  expressionEditors: o,
  expressionDescriptors: r,
  visibleVariables: s,
  scopeStatus: a,
  onChange: c
}) {
  const u = t.isReadOnly === !0, l = { activity: e, expressionDescriptors: r, readOnly: u }, d = Ki(n, t, l), f = d?.component, h = t.isWrapped !== !1 ? yd(e, t) : null, p = h?.expression.type ?? "Literal", g = _v(e, t), b = p.toLowerCase() === "literal", x = h && b && !$v(t) ? Mv(t.typeName) : null, m = x ? Ki(n, t, { ...l, scope: "collection" }) : void 0, E = h ? {
    activity: e,
    descriptor: t,
    expressionDescriptors: r,
    readOnly: u,
    surface: "inline",
    syntax: p
  } : null, y = E ? vd(o, E) : null, N = y?.surfaces.inline, k = y && E ? bd(y, E, g) : [], v = !!(h && Yv(t, d?.id)), j = !!(h && Zv(t, d?.id)), [_, M] = q(!1), W = (S) => {
    const A = h ? Iv(h, S) : S;
    c(gc(e, t, A));
  }, D = (S) => {
    h && c(gc(e, t, Av(h, S)));
  }, T = x ? m ? Wi(m.component, t, g, u, { ...l, scope: "collection" }, W) : /* @__PURE__ */ i.jsx(
    Bv,
    {
      input: t,
      elementTypeName: x.elementTypeName,
      value: g,
      editors: n,
      context: l,
      disabled: u,
      onChange: W
    }
  ) : null, R = p === Vv && h ? /* @__PURE__ */ i.jsx(
    qv,
    {
      value: g,
      visibleVariables: s,
      scopeStatus: a,
      disabled: u,
      onChange: W
    }
  ) : T ?? (N && E ? /* @__PURE__ */ i.jsx(
    N,
    {
      descriptor: t,
      syntax: p,
      value: g,
      disabled: u,
      context: E,
      onChange: W
    }
  ) : Wi(f, t, g, u, l, W));
  return /* @__PURE__ */ i.jsxs("div", { className: "wf-property-row", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "wf-property-row-header", children: [
      /* @__PURE__ */ i.jsx("label", { children: t.displayName || t.name }),
      /* @__PURE__ */ i.jsx("span", { children: Nd(t.typeName) })
    ] }),
    t.description ? /* @__PURE__ */ i.jsx("p", { children: t.description }) : null,
    h && !v ? /* @__PURE__ */ i.jsx(
      Bi,
      {
        label: `${t.displayName || t.name} expression syntax`,
        value: p,
        descriptors: r,
        disabled: u,
        onChange: D
      }
    ) : null,
    v ? /* @__PURE__ */ i.jsxs("div", { className: "wf-expression-field", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "wf-expression-editor", children: [
        R,
        qi(k)
      ] }),
      /* @__PURE__ */ i.jsx(
        Bi,
        {
          label: `${t.displayName || t.name} expression syntax`,
          value: p,
          descriptors: r,
          disabled: u,
          variant: "inline",
          onChange: D
        }
      ),
      j ? /* @__PURE__ */ i.jsx(
        "button",
        {
          type: "button",
          className: "wf-expression-expand-button",
          "aria-label": `Open expanded ${t.displayName || t.name} editor`,
          title: "Open expanded editor",
          onClick: () => M(!0),
          children: /* @__PURE__ */ i.jsx(yr, { size: 13 })
        }
      ) : null
    ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      R,
      qi(k)
    ] }),
    j && !v ? /* @__PURE__ */ i.jsxs(
      "button",
      {
        type: "button",
        className: "wf-property-expand-row",
        "aria-label": `Open expanded ${t.displayName || t.name} editor`,
        onClick: () => M(!0),
        children: [
          /* @__PURE__ */ i.jsx(yr, { size: 13 }),
          " Open expanded editor"
        ]
      }
    ) : null,
    _ ? /* @__PURE__ */ i.jsx(
      Fv,
      {
        input: t,
        value: g,
        syntax: p,
        descriptors: r,
        activity: e,
        expressionEditors: o,
        disabled: u,
        onChange: W,
        onSyntaxChange: D,
        onClose: () => M(!1)
      }
    ) : null
  ] });
}
function Wv(e, t, n) {
  return [
    "wf-collection-item",
    t === e ? "dragging" : "",
    t !== null && t !== e && n === e ? "drop-target" : ""
  ].filter(Boolean).join(" ");
}
function Bv({
  input: e,
  elementTypeName: t,
  value: n,
  editors: o,
  context: r,
  disabled: s,
  onChange: a
}) {
  const c = Pv(n), u = zv(e, t), l = { ...r, scope: "element" }, d = Ki(o, u, l)?.component, f = e.displayName || e.name, h = (k, v) => a(c.map((j, _) => _ === k ? v : j)), [p, g] = q(null), [b, x] = q(null), m = () => {
    g(null), x(null);
  }, E = (k) => (v) => {
    g(k), v.dataTransfer.effectAllowed = "move", v.dataTransfer.setData("text/plain", String(k));
  }, y = (k) => (v) => {
    p !== null && (v.preventDefault(), v.dataTransfer.dropEffect = "move", b !== k && x(k));
  }, N = (k) => (v) => {
    v.preventDefault(), p !== null && p !== k && a(Ni(c, p, k)), m();
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "wf-collection-editor", children: [
    c.length === 0 ? /* @__PURE__ */ i.jsx("p", { className: "wf-collection-empty", children: "No items yet." }) : /* @__PURE__ */ i.jsx("ul", { className: "wf-collection-items", children: c.map((k, v) => /* @__PURE__ */ i.jsxs(
      "li",
      {
        className: Wv(v, p, b),
        onDragOver: y(v),
        onDrop: N(v),
        children: [
          /* @__PURE__ */ i.jsx(
            "span",
            {
              className: "wf-collection-item-handle",
              draggable: !s,
              "aria-label": `Drag ${f} item ${v + 1} to reorder`,
              title: "Drag to reorder",
              onDragStart: E(v),
              onDragEnd: m,
              children: /* @__PURE__ */ i.jsx(Ou, { size: 13, "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ i.jsx("div", { className: "wf-collection-item-editor", children: Wi(d, u, k, s, l, (j) => h(v, j)) }),
          /* @__PURE__ */ i.jsxs("div", { className: "wf-collection-item-actions", children: [
            /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: "wf-collection-item-button",
                "aria-label": `Move ${f} item ${v + 1} up`,
                disabled: s || v === 0,
                onClick: () => a(Ni(c, v, v - 1)),
                children: /* @__PURE__ */ i.jsx(Mw, { size: 13 })
              }
            ),
            /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: "wf-collection-item-button",
                "aria-label": `Move ${f} item ${v + 1} down`,
                disabled: s || v === c.length - 1,
                onClick: () => a(Ni(c, v, v + 1)),
                children: /* @__PURE__ */ i.jsx(Ru, { size: 13 })
              }
            ),
            /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: "wf-collection-item-button danger",
                "aria-label": `Remove ${f} item ${v + 1}`,
                disabled: s,
                onClick: () => a(c.filter((j, _) => _ !== v)),
                children: /* @__PURE__ */ i.jsx(lo, { size: 13 })
              }
            )
          ] })
        ]
      },
      v
    )) }),
    /* @__PURE__ */ i.jsxs(
      "button",
      {
        type: "button",
        className: "wf-collection-add",
        disabled: s,
        onClick: () => a([...c, Lv(t)]),
        children: [
          /* @__PURE__ */ i.jsx(wn, { size: 13 }),
          " Add item"
        ]
      }
    )
  ] });
}
function Fv({
  input: e,
  value: t,
  syntax: n,
  descriptors: o,
  activity: r,
  expressionEditors: s,
  disabled: a,
  onChange: c,
  onSyntaxChange: u,
  onClose: l
}) {
  const d = Wc(), f = e.displayName || e.name, h = {
    activity: r,
    descriptor: e,
    expressionDescriptors: o,
    readOnly: a,
    surface: "expanded",
    syntax: n
  }, p = vd(s, h), g = p?.surfaces.expanded, b = p ? bd(p, h, t) : [], x = g ? null : Xv(s, h);
  return ee(() => {
    const m = (E) => {
      E.key === "Escape" && l();
    };
    return window.addEventListener("keydown", m), () => window.removeEventListener("keydown", m);
  }, [l]), /* @__PURE__ */ i.jsx("div", { className: "wf-property-editor-backdrop", children: /* @__PURE__ */ i.jsxs("section", { className: "wf-property-editor-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": d, children: [
    /* @__PURE__ */ i.jsxs("header", { children: [
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("span", { children: "Property editor" }),
        /* @__PURE__ */ i.jsx("h3", { id: d, children: f })
      ] }),
      /* @__PURE__ */ i.jsx("button", { type: "button", "aria-label": `Close ${f} editor`, onClick: l, children: /* @__PURE__ */ i.jsx(Bu, { size: 16 }) })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "wf-property-editor-body", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "wf-property-editor-toolbar", children: [
        /* @__PURE__ */ i.jsx(
          Bi,
          {
            label: `${f} expression syntax`,
            value: n,
            descriptors: o,
            disabled: a,
            onChange: u
          }
        ),
        /* @__PURE__ */ i.jsx("span", { children: Nd(e.typeName) })
      ] }),
      e.description ? /* @__PURE__ */ i.jsx("p", { children: e.description }) : null,
      g ? /* @__PURE__ */ i.jsx(
        g,
        {
          descriptor: e,
          syntax: n,
          value: t,
          disabled: a,
          context: h,
          onChange: c
        }
      ) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
        x ? /* @__PURE__ */ i.jsx("p", { className: "wf-expression-editor-hint", children: x }) : null,
        /* @__PURE__ */ i.jsx(
          "textarea",
          {
            "aria-label": `${f} expanded value`,
            value: t == null ? "" : String(t),
            disabled: a,
            spellCheck: !1,
            onChange: (m) => c(m.target.value)
          }
        )
      ] }),
      qi(b)
    ] }),
    /* @__PURE__ */ i.jsxs("footer", { children: [
      /* @__PURE__ */ i.jsx("span", { children: "Changes update the draft immediately." }),
      /* @__PURE__ */ i.jsx("button", { type: "button", onClick: l, children: "Close" })
    ] })
  ] }) });
}
function Wi(e, t, n, o, r, s) {
  return e ? /* @__PURE__ */ i.jsx(
    e,
    {
      descriptor: t,
      value: n,
      disabled: o,
      context: r,
      onChange: s
    }
  ) : /* @__PURE__ */ i.jsx("input", { type: "text", value: n == null ? "" : String(n), disabled: o, onChange: (a) => s(a.target.value) });
}
function Bi({
  label: e,
  value: t,
  descriptors: n,
  disabled: o,
  variant: r = "block",
  onChange: s
}) {
  const [a, c] = q(!1), u = Wc(), l = n.find((f) => f.type === t), d = [
    "wf-syntax-picker-trigger",
    r === "inline" ? "inline" : "",
    a ? "open" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ i.jsxs("div", { className: r === "inline" ? "wf-syntax-picker inline" : "wf-syntax-picker", onBlur: (f) => {
    f.currentTarget.contains(f.relatedTarget) || c(!1);
  }, children: [
    /* @__PURE__ */ i.jsx(
      "button",
      {
        type: "button",
        className: d,
        "aria-label": e,
        "aria-haspopup": "listbox",
        "aria-expanded": a,
        "aria-controls": u,
        disabled: o,
        onClick: () => c((f) => !f),
        children: /* @__PURE__ */ i.jsx("span", { children: l?.displayName || l?.type || t })
      }
    ),
    a ? /* @__PURE__ */ i.jsx("div", { id: u, role: "listbox", className: "wf-syntax-picker-menu", "aria-label": e, children: n.map((f) => {
      const h = f.displayName || f.type, p = f.type === t;
      return /* @__PURE__ */ i.jsx(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": p,
          className: p ? "selected" : "",
          onClick: () => {
            s(f.type), c(!1);
          },
          children: h
        },
        f.type
      );
    }) }) : null
  ] });
}
const Fi = "::";
function wd(e) {
  return !e || e === br ? br : e;
}
function yc(e, t) {
  return `${wd(t)}${Fi}${e}`;
}
function Kv(e) {
  const t = e.indexOf(Fi);
  if (t < 0) return null;
  const n = e.slice(t + Fi.length);
  return n ? { scopeId: e.slice(0, t), referenceKey: n } : null;
}
function qv({ value: e, visibleVariables: t, scopeStatus: n, disabled: o, onChange: r }) {
  const s = ud(e), a = !!e && typeof e == "object" || typeof e == "string" && e.trim().startsWith("{"), c = s && (a || t.some((d) => d.referenceKey === s.referenceKey)) ? s : null, u = c ? yc(c.referenceKey, c.declaringScopeId) : "", l = !!c && t.some(
    (d) => d.referenceKey === c.referenceKey && d.scopeId === wd(c.declaringScopeId)
  );
  return /* @__PURE__ */ i.jsxs("div", { className: "wf-variable-picker", children: [
    /* @__PURE__ */ i.jsxs(
      "select",
      {
        "aria-label": "Variable reference",
        value: u,
        disabled: o,
        onChange: (d) => {
          const f = Kv(d.target.value);
          f && r(O0(f.referenceKey, f.scopeId));
        },
        children: [
          /* @__PURE__ */ i.jsx("option", { value: "", children: "Select a variable…" }),
          c && !l ? /* @__PURE__ */ i.jsxs("option", { value: u, children: [
            c.referenceKey,
            " (not visible from this scope)"
          ] }) : null,
          t.map((d) => {
            const f = yc(d.referenceKey, d.scopeId);
            return /* @__PURE__ */ i.jsxs("option", { value: f, children: [
              d.name,
              d.isWorkflowScope ? " · workflow" : " · container"
            ] }, f);
          })
        ]
      }
    ),
    n === "unavailable" ? /* @__PURE__ */ i.jsx("p", { className: "wf-variable-picker-note", children: "Variable scope information is unavailable (pending backend support). Existing references are preserved." }) : n === "ready" && t.length === 0 ? /* @__PURE__ */ i.jsx("p", { className: "wf-variable-picker-note", children: "No variables are visible here. Declare one on the workflow or a container scope." }) : null
  ] });
}
function Ki(e, t, n) {
  return [...e].sort((o, r) => (o.order ?? 500) - (r.order ?? 500)).find((o) => o.supports(t, n));
}
function vd(e, t) {
  return [...e].sort((n, o) => (n.order ?? 500) - (o.order ?? 500)).find((n) => !!n.surfaces[t.surface] && n.supports(t));
}
function bd(e, t, n) {
  return e.diagnostics?.(t, n) ?? [];
}
function Xv(e, t) {
  if (t.syntax.toLowerCase() === "literal") return null;
  const n = [...e].sort((a, c) => (a.order ?? 500) - (c.order ?? 500)).find((a) => a.supports(t) && a.metadata)?.metadata;
  if (!n) return `No enhanced editor is registered for ${t.syntax}. Using the generic text editor.`;
  const o = n.displayName?.trim() || "enhanced editor", r = n.installHint?.trim(), s = `No ${o} is registered for ${t.syntax}. Using the generic text editor.`;
  return r ? `${s} ${r}` : s;
}
function qi(e) {
  return e.length === 0 ? null : /* @__PURE__ */ i.jsx("div", { className: "wf-expression-editor-diagnostics", role: "status", children: e.map((t, n) => {
    const o = t.severity ?? "info";
    return /* @__PURE__ */ i.jsxs("p", { className: `wf-expression-editor-diagnostic ${o}`, children: [
      t.code ? /* @__PURE__ */ i.jsx("span", { children: t.code }) : null,
      t.message
    ] }, `${t.code ?? "diagnostic"}-${n}`);
  }) });
}
function Uv(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = n.category?.trim() || "General";
    t.set(o, [...t.get(o) ?? [], n]);
  }
  return [...t.entries()].map(([n, o]) => ({ category: n, inputs: o }));
}
function Nd(e) {
  return e.split(".").filter(Boolean).at(-1) ?? e;
}
function Yv(e, t) {
  if (e.uiHint?.toLowerCase() === "multiline" || t && !xd.has(t)) return !1;
  const n = e.typeName.toLowerCase();
  return ["string", "system.string", "text"].includes(n) || e.uiHint?.toLowerCase() === "singleline";
}
function Zv(e, t) {
  const n = e.uiHint?.toLowerCase();
  if (n === "checkbox" || n === "dropdown" || t && !xd.has(t) && n !== "multiline") return !1;
  const o = e.typeName.toLowerCase();
  return ["string", "system.string", "text"].includes(o) || n === "singleline" || n === "multiline";
}
function Gv(e, t) {
  return {
    ...t ? { name: t } : {},
    definitionId: e.definitionId,
    state: vo(e.state),
    layout: e.layout
  };
}
function Jv(e) {
  return JSON.stringify(
    {
      state: vo(e.state),
      layout: e.layout
    },
    null,
    2
  );
}
function Qv(e, t) {
  let n;
  try {
    n = JSON.parse(e);
  } catch (r) {
    return { ok: !1, error: r instanceof Error ? r.message : String(r) };
  }
  if (!n || typeof n != "object")
    return { ok: !1, error: "Workflow JSON must be an object with a 'state' property." };
  const o = n;
  return !o.state || typeof o.state != "object" ? { ok: !1, error: "Workflow JSON is missing a valid 'state' object." } : o.layout !== void 0 && !Array.isArray(o.layout) ? { ok: !1, error: "'layout' must be an array when present." } : {
    ok: !0,
    draft: {
      ...t,
      state: Vr(o.state),
      layout: o.layout ?? t.layout
    }
  };
}
function eb(e, t) {
  const n = (t ?? "workflow").trim().replace(/[^\w.-]+/g, "-") || "workflow", o = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), r = URL.createObjectURL(o), s = document.createElement("a");
  s.href = r, s.download = `${n}.json`, document.body.appendChild(s), s.click(), s.remove(), URL.revokeObjectURL(r);
}
const tb = 320, nb = 140;
function ob(e, t, n) {
  return n === "sequence" ? rb(e) : ib(e, t);
}
function rb(e) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((n, o) => {
    t.set(n.id, { x: o * 280, y: 0 });
  }), t;
}
function ib(e, t) {
  const n = /* @__PURE__ */ new Map();
  if (e.length === 0) return n;
  const o = new Set(e.map((d) => d.id)), r = t.filter((d) => o.has(d.source) && o.has(d.target)), s = /* @__PURE__ */ new Set();
  for (const d of r)
    s.add(d.source), s.add(d.target);
  const a = /* @__PURE__ */ new Map();
  for (const d of e) a.set(d.id, 0);
  for (let d = 0; d < e.length; d += 1) {
    let f = !1;
    for (const h of r) {
      const p = (a.get(h.source) ?? 0) + 1;
      p > (a.get(h.target) ?? 0) && p <= e.length && (a.set(h.target, p), f = !0);
    }
    if (!f) break;
  }
  const c = Math.max(0, ...e.filter((d) => s.has(d.id)).map((d) => a.get(d.id) ?? 0)), u = s.size > 0 ? c + 1 : 0, l = /* @__PURE__ */ new Map();
  for (const d of e) {
    const f = s.has(d.id) ? a.get(d.id) ?? 0 : u, h = l.get(f);
    h ? h.push(d.id) : l.set(f, [d.id]);
  }
  for (const [d, f] of l)
    f.forEach((h, p) => {
      n.set(h, { x: d * tb, y: p * nb });
    });
  return n;
}
const sb = 50;
function mc() {
  return { past: [], future: [] };
}
function ab(e) {
  return e.past.length > 0;
}
function cb(e) {
  return e.future.length > 0;
}
function xc(e, t, n = sb) {
  const o = [...e.past, t];
  return o.length > n && o.splice(0, o.length - n), { past: o, future: [] };
}
function lb(e, t) {
  if (e.past.length === 0) return null;
  const n = e.past.slice(), o = n.pop();
  return { history: { past: n, future: [...e.future, t] }, snapshot: o };
}
function ub(e, t) {
  if (e.future.length === 0) return null;
  const n = e.future.slice(), o = n.pop();
  return { history: { past: [...e.past, t], future: n }, snapshot: o };
}
function rt(e) {
  if (!e) return "";
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : t.toLocaleString();
}
function jd(e, t) {
  if (!e || !t) return "";
  const n = Date.parse(e), o = Date.parse(t);
  if (Number.isNaN(n) || Number.isNaN(o) || o < n) return "";
  const r = Math.round((o - n) / 1e3);
  if (r < 60) return `${r}s`;
  const s = Math.floor(r / 60), a = r % 60;
  if (s < 60) return a ? `${s}m ${a}s` : `${s}m`;
  const c = Math.floor(s / 60), u = s % 60;
  return u ? `${c}h ${u}m` : `${c}h`;
}
function Sr(e) {
  return e?.split(".").filter(Boolean).at(-1);
}
function js(e) {
  switch (e) {
    case "flowchart":
      return /* @__PURE__ */ i.jsx(Vu, { size: 15 });
    case "sequence":
      return /* @__PURE__ */ i.jsx(ys, { size: 15 });
    case "terminal":
      return /* @__PURE__ */ i.jsx(Vw, { size: 15 });
    case "runtime":
      return /* @__PURE__ */ i.jsx(xn, { size: 15 });
    case "trigger":
      return /* @__PURE__ */ i.jsx(Bw, { size: 15 });
    default:
      return /* @__PURE__ */ i.jsx(zr, { size: 15 });
  }
}
function wc({
  document: e,
  readOnly: t,
  minHeight: n,
  ariaLabel: o,
  onChange: r
}) {
  const s = (a) => {
    t || r({ ...e, value: a.target.value });
  };
  return /* @__PURE__ */ i.jsx(
    "textarea",
    {
      "aria-label": o,
      "aria-readonly": t,
      className: "studio-code-editor-input",
      readOnly: t,
      spellCheck: !1,
      autoCapitalize: "off",
      autoCorrect: "off",
      value: e.value,
      style: { minHeight: n },
      onChange: s
    }
  );
}
function db({
  document: e,
  diagnostics: t = [],
  readOnly: n = !1,
  theme: o = "studio",
  minHeight: r = "220px",
  ariaLabel: s,
  languageAdapter: a,
  onChange: c
}) {
  const u = t.filter((h) => !h.uri || h.uri === e.uri), l = a?.displayName ?? e.language, d = a?.loadEditor, f = de(
    () => d ? gf(d) : null,
    [d]
  );
  return /* @__PURE__ */ i.jsxs(
    "section",
    {
      className: "studio-code-editor",
      "data-language": e.language,
      "data-theme": o,
      "data-readonly": n,
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: "studio-code-editor-header", children: [
          /* @__PURE__ */ i.jsx("span", { children: l }),
          /* @__PURE__ */ i.jsx("code", { children: e.uri })
        ] }),
        f ? /* @__PURE__ */ i.jsx(yf, { fallback: /* @__PURE__ */ i.jsx(
          wc,
          {
            document: e,
            readOnly: n,
            minHeight: r,
            ariaLabel: s,
            onChange: c
          }
        ), children: /* @__PURE__ */ i.jsx(
          f,
          {
            document: e,
            readOnly: n,
            theme: o,
            minHeight: r,
            ariaLabel: s,
            onChange: c
          }
        ) }) : /* @__PURE__ */ i.jsx(
          wc,
          {
            document: e,
            readOnly: n,
            minHeight: r,
            ariaLabel: s,
            onChange: c
          }
        ),
        /* @__PURE__ */ i.jsx(fb, { diagnostics: u })
      ]
    }
  );
}
function fb({ diagnostics: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ i.jsx("div", { className: "studio-code-editor-diagnostics", role: "status", children: e.map((t, n) => {
    const o = t.severity ?? "info", r = hb(t);
    return /* @__PURE__ */ i.jsxs(
      "p",
      {
        className: `studio-code-editor-diagnostic ${o}`,
        children: [
          t.code ? /* @__PURE__ */ i.jsx("span", { children: t.code }) : null,
          r ? /* @__PURE__ */ i.jsx("small", { children: r }) : null,
          t.message
        ]
      },
      `${t.uri ?? "document"}-${t.code ?? "diagnostic"}-${n}`
    );
  }) });
}
function hb(e) {
  return e.startLineNumber ? e.startColumn ? `${e.startLineNumber}:${e.startColumn}` : String(e.startLineNumber) : null;
}
const pb = { language: "json", displayName: "JSON" };
function gb({ draft: e, onApply: t }) {
  const n = de(() => Jv(e), [e]), [o, r] = q(n), [s, a] = q(n), [c, u] = q(null);
  ee(() => {
    r(n), a(n), u(null);
  }, [n]);
  const l = o !== s, d = c ? [{ severity: "error", message: c }] : [], f = () => u(t(o));
  return /* @__PURE__ */ i.jsxs("div", { className: "wf-code-view", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "wf-code-view-toolbar", children: [
      /* @__PURE__ */ i.jsx("span", { className: "wf-muted", children: "Edit the workflow definition as JSON. Changes apply to the draft when you click Apply." }),
      /* @__PURE__ */ i.jsxs("span", { className: "wf-code-view-actions", children: [
        /* @__PURE__ */ i.jsx("button", { type: "button", disabled: !l, onClick: () => {
          r(s), u(null);
        }, children: "Reset" }),
        /* @__PURE__ */ i.jsxs("button", { type: "button", disabled: !l, onClick: f, children: [
          /* @__PURE__ */ i.jsx(bn, { size: 14 }),
          " Apply"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "wf-code-view-editor", children: /* @__PURE__ */ i.jsx(
      db,
      {
        ariaLabel: "Workflow JSON",
        document: { uri: "elsa://workflows/definition.json", language: "json", value: o },
        languageAdapter: pb,
        diagnostics: d,
        minHeight: "100%",
        theme: "studio",
        onChange: (h) => {
          r(h.value), c && u(null);
        }
      }
    ) })
  ] });
}
function Sd(e) {
  const [t, n] = q(null), [o, r] = q(null);
  ee(() => {
    let c = !1;
    return fv(e).then(
      (u) => {
        c || n(u);
      },
      () => {
        c || n([]);
      }
    ), hv(e).then(
      (u) => {
        c || r(u);
      },
      () => {
        c || r([]);
      }
    ), () => {
      c = !0;
    };
  }, [e]);
  const s = de(
    () => t && t.length > 0 ? t.map((c) => ({
      value: c.typeName,
      label: rd(c.displayName, c.typeName),
      group: c.category?.trim() || "Other"
    })) : null,
    [t]
  ), a = de(
    () => o && o.length > 0 ? o.filter((c) => !c.deprecated).map((c) => ({
      value: c.typeName,
      label: $0(c.displayName, c.typeName)
    })) : null,
    [o]
  );
  return { typeOptions: s, storageOptions: a };
}
function Ss(e) {
  return !e || e.length === 0 ? void 0 : (e.find((n) => /(^|\.)String$/i.test(n.value) || n.label.toLowerCase() === "string") ?? e[0]).value;
}
function ks(e, t, n) {
  return {
    add: () => {
      const o = S0(n.namePrefix, e.map((r) => jt(r, n.nameKeys)));
      t([...e, n.create(o)]);
    },
    update: (o, r) => t(e.map((s, a) => a === o ? n.patch(s, r) : s)),
    remove: (o) => t(e.filter((r, s) => s !== o))
  };
}
function fo({ value: e, options: t, placeholder: n, allowEmpty: o, ariaLabel: r, onChange: s }) {
  if (!t)
    return /* @__PURE__ */ i.jsx(
      "input",
      {
        type: "text",
        "aria-label": r,
        value: e,
        placeholder: n,
        onChange: (l) => s(l.target.value)
      }
    );
  const a = e === "" || t.some((l) => l.value === e), c = Array.from(new Set(t.map((l) => l.group).filter((l) => !!l))), u = c.length > 0;
  return /* @__PURE__ */ i.jsxs("select", { "aria-label": r, value: e, onChange: (l) => s(l.target.value), children: [
    o ? /* @__PURE__ */ i.jsx("option", { value: "", children: n ?? "—" }) : null,
    a ? null : /* @__PURE__ */ i.jsx("option", { value: e, children: e }),
    u ? c.map((l) => /* @__PURE__ */ i.jsx("optgroup", { label: l, children: t.filter((d) => d.group === l).map((d) => /* @__PURE__ */ i.jsx("option", { value: d.value, children: d.label }, d.value)) }, l)) : t.map((l) => /* @__PURE__ */ i.jsx("option", { value: l.value, children: l.label }, l.value))
  ] });
}
function Es({ title: e, addLabel: t, emptyLabel: n, headers: o, isEmpty: r, onAdd: s, children: a }) {
  return /* @__PURE__ */ i.jsxs("section", { className: "wf-properties-section", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "wf-properties-section-head", children: [
      /* @__PURE__ */ i.jsx("h3", { children: e }),
      /* @__PURE__ */ i.jsxs("button", { type: "button", className: "wf-properties-add", onClick: s, children: [
        /* @__PURE__ */ i.jsx(wn, { size: 14 }),
        " ",
        t
      ] })
    ] }),
    r ? /* @__PURE__ */ i.jsx("p", { className: "wf-muted", children: n }) : /* @__PURE__ */ i.jsxs("table", { className: "wf-properties-table", children: [
      /* @__PURE__ */ i.jsx("thead", { children: /* @__PURE__ */ i.jsxs("tr", { children: [
        o.map((c) => /* @__PURE__ */ i.jsx("th", { children: c }, c)),
        /* @__PURE__ */ i.jsx("th", { "aria-label": "Actions" })
      ] }) }),
      /* @__PURE__ */ i.jsx("tbody", { children: a })
    ] })
  ] });
}
function Cs({ label: e, onRemove: t }) {
  return /* @__PURE__ */ i.jsx("td", { children: /* @__PURE__ */ i.jsx("button", { type: "button", className: "wf-properties-remove", "aria-label": e, title: e, onClick: t, children: /* @__PURE__ */ i.jsx(lo, { size: 14 }) }) });
}
function kd({ items: e, typeOptions: t, storageOptions: n, title: o = "Variables", addLabel: r = "Add variable", emptyLabel: s = "No variables defined.", warnings: a, onChange: c }) {
  const { add: u, update: l, remove: d } = ks(e, c, {
    namePrefix: "Variable",
    nameKeys: lc,
    create: (f) => k0({ name: f, typeKey: Ss(t) }),
    patch: E0
  });
  return /* @__PURE__ */ i.jsx(
    Es,
    {
      title: o,
      addLabel: r,
      emptyLabel: s,
      headers: ["Name", "Type", "Default", "Storage"],
      isEmpty: e.length === 0,
      onAdd: u,
      children: e.map((f, h) => {
        const p = f, g = jt(f, lc), b = a?.get(p.referenceKey);
        return /* @__PURE__ */ i.jsxs("tr", { children: [
          /* @__PURE__ */ i.jsxs("td", { children: [
            /* @__PURE__ */ i.jsx("input", { type: "text", "aria-label": "Variable name", value: g, onChange: (x) => l(h, { name: x.target.value }) }),
            b ? /* @__PURE__ */ i.jsx("span", { className: "wf-properties-warning", role: "note", title: b, children: b }) : null
          ] }),
          /* @__PURE__ */ i.jsx("td", { children: /* @__PURE__ */ i.jsx(
            fo,
            {
              ariaLabel: "Variable type",
              value: Hi(p.typeInformation),
              options: t,
              placeholder: "Type",
              onChange: (x) => l(h, { typeInformation: nd(x) })
            }
          ) }),
          /* @__PURE__ */ i.jsx("td", { children: /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "text",
              "aria-label": "Variable default value",
              value: I0(p.default),
              placeholder: "(empty)",
              onChange: (x) => l(h, { default: C0(x.target.value) })
            }
          ) }),
          /* @__PURE__ */ i.jsx("td", { children: /* @__PURE__ */ i.jsx(
            fo,
            {
              ariaLabel: "Variable storage driver",
              value: Hi(p.storageDriverType),
              options: n,
              placeholder: "—",
              allowEmpty: !0,
              onChange: (x) => l(h, { storageDriverType: od(x) })
            }
          ) }),
          /* @__PURE__ */ i.jsx(Cs, { label: `Remove variable ${g || h + 1}`, onRemove: () => d(h) })
        ] }, h);
      })
    }
  );
}
function yb({ items: e, typeOptions: t, storageOptions: n, onChange: o }) {
  const { add: r, update: s, remove: a } = ks(e, o, {
    namePrefix: "Input",
    nameKeys: vr,
    create: (c) => A0({ name: c, type: Ss(t) }),
    patch: _0
  });
  return /* @__PURE__ */ i.jsx(
    Es,
    {
      title: "Inputs",
      addLabel: "Add input",
      emptyLabel: "No inputs defined.",
      headers: ["Name", "Type", "Array", "Default", "Storage"],
      isEmpty: e.length === 0,
      onAdd: r,
      children: e.map((c, u) => {
        const l = jt(c, vr);
        return /* @__PURE__ */ i.jsxs("tr", { children: [
          /* @__PURE__ */ i.jsx("td", { children: /* @__PURE__ */ i.jsx("input", { type: "text", "aria-label": "Input name", value: l, onChange: (d) => s(u, { name: d.target.value }) }) }),
          /* @__PURE__ */ i.jsx("td", { children: /* @__PURE__ */ i.jsx(
            fo,
            {
              ariaLabel: "Input type",
              value: jt(c, ad),
              options: t,
              placeholder: "Type",
              onChange: (d) => s(u, { type: d })
            }
          ) }),
          /* @__PURE__ */ i.jsx("td", { className: "wf-properties-cell-center", children: /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "checkbox",
              "aria-label": "Input is array",
              checked: sd(c, cd),
              onChange: (d) => s(u, { isArray: d.target.checked })
            }
          ) }),
          /* @__PURE__ */ i.jsx("td", { children: /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "text",
              "aria-label": "Input default value",
              value: jt(c, L0),
              placeholder: "(empty)",
              onChange: (d) => s(u, { defaultValue: d.target.value === "" ? null : d.target.value })
            }
          ) }),
          /* @__PURE__ */ i.jsx("td", { children: /* @__PURE__ */ i.jsx(
            fo,
            {
              ariaLabel: "Input storage driver",
              value: jt(c, P0),
              options: n,
              placeholder: "—",
              allowEmpty: !0,
              onChange: (d) => s(u, { storageDriverType: d || null })
            }
          ) }),
          /* @__PURE__ */ i.jsx(Cs, { label: `Remove input ${l || u + 1}`, onRemove: () => a(u) })
        ] }, u);
      })
    }
  );
}
function mb({ items: e, typeOptions: t, onChange: n }) {
  const { add: o, update: r, remove: s } = ks(e, n, {
    namePrefix: "Output",
    nameKeys: vr,
    create: (a) => D0({ name: a, type: Ss(t) }),
    patch: M0
  });
  return /* @__PURE__ */ i.jsx(
    Es,
    {
      title: "Outputs",
      addLabel: "Add output",
      emptyLabel: "No outputs defined.",
      headers: ["Name", "Type", "Array"],
      isEmpty: e.length === 0,
      onAdd: o,
      children: e.map((a, c) => {
        const u = jt(a, vr);
        return /* @__PURE__ */ i.jsxs("tr", { children: [
          /* @__PURE__ */ i.jsx("td", { children: /* @__PURE__ */ i.jsx("input", { type: "text", "aria-label": "Output name", value: u, onChange: (l) => r(c, { name: l.target.value }) }) }),
          /* @__PURE__ */ i.jsx("td", { children: /* @__PURE__ */ i.jsx(
            fo,
            {
              ariaLabel: "Output type",
              value: jt(a, ad),
              options: t,
              placeholder: "Type",
              onChange: (l) => r(c, { type: l })
            }
          ) }),
          /* @__PURE__ */ i.jsx("td", { className: "wf-properties-cell-center", children: /* @__PURE__ */ i.jsx(
            "input",
            {
              type: "checkbox",
              "aria-label": "Output is array",
              checked: sd(a, cd),
              onChange: (l) => r(c, { isArray: l.target.checked })
            }
          ) }),
          /* @__PURE__ */ i.jsx(Cs, { label: `Remove output ${u || c + 1}`, onRemove: () => s(c) })
        ] }, c);
      })
    }
  );
}
function tr(e) {
  return (e ?? []).filter(id);
}
function xb({ context: e, variables: t, title: n, addLabel: o, emptyLabel: r, warnings: s, onChange: a }) {
  const { typeOptions: c, storageOptions: u } = Sd(e);
  return /* @__PURE__ */ i.jsx(
    kd,
    {
      items: tr(t),
      typeOptions: c,
      storageOptions: u,
      title: n,
      addLabel: o,
      emptyLabel: r,
      warnings: s,
      onChange: a
    }
  );
}
function wb({ details: e, draft: t, context: n, onStateChange: o }) {
  const { typeOptions: r, storageOptions: s } = Sd(n), a = tr(t.state.variables), c = tr(t.state.inputs), u = tr(t.state.outputs), l = e?.versions ?? [], d = e?.definition.description?.trim();
  return /* @__PURE__ */ i.jsxs("div", { className: "wf-properties-view", children: [
    /* @__PURE__ */ i.jsxs("section", { className: "wf-properties-section", children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Information" }),
      /* @__PURE__ */ i.jsxs("dl", { className: "wf-properties-info", children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Name" }),
        /* @__PURE__ */ i.jsx("dd", { children: e?.definition.name ?? "—" }),
        /* @__PURE__ */ i.jsx("dt", { children: "Description" }),
        /* @__PURE__ */ i.jsx("dd", { children: d || /* @__PURE__ */ i.jsx("span", { className: "wf-muted", children: "No description" }) }),
        /* @__PURE__ */ i.jsx("dt", { children: "Definition ID" }),
        /* @__PURE__ */ i.jsx("dd", { children: /* @__PURE__ */ i.jsx("code", { children: t.definitionId }) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsx(
      kd,
      {
        items: a,
        typeOptions: r,
        storageOptions: s,
        onChange: (f) => o((h) => ({ ...h, variables: f }))
      }
    ),
    /* @__PURE__ */ i.jsx(
      yb,
      {
        items: c,
        typeOptions: r,
        storageOptions: s,
        onChange: (f) => o((h) => ({ ...h, inputs: f }))
      }
    ),
    /* @__PURE__ */ i.jsx(
      mb,
      {
        items: u,
        typeOptions: r,
        onChange: (f) => o((h) => ({ ...h, outputs: f }))
      }
    ),
    /* @__PURE__ */ i.jsxs("section", { className: "wf-properties-section", children: [
      /* @__PURE__ */ i.jsx("h3", { children: "Versions" }),
      l.length === 0 ? /* @__PURE__ */ i.jsx("p", { className: "wf-muted", children: "No published versions yet." }) : /* @__PURE__ */ i.jsx("ul", { className: "wf-properties-versions", children: l.map((f) => /* @__PURE__ */ i.jsxs("li", { children: [
        /* @__PURE__ */ i.jsxs("span", { className: "wf-properties-version-tag", children: [
          "v",
          f.version
        ] }),
        /* @__PURE__ */ i.jsx("time", { children: rt(f.createdAt) })
      ] }, f.id)) })
    ] })
  ] });
}
const vb = "Expressions/UnresolvedVariable";
function bb(e) {
  return String(e.type ?? e.code ?? "");
}
function Nb(e) {
  return bb(e) === vb;
}
function jb(e) {
  const t = String(e ?? "").trim().split("/").filter(Boolean), [n, o, ...r] = t, s = n === "$workflow";
  return {
    nodeId: !n || s ? null : n,
    isWorkflowScope: s,
    bag: o === "inputs" || o === "outputs" || o === "variables" ? o : null,
    referenceKey: r.length > 0 ? r.join("/") : null
  };
}
function Sb(e) {
  return (e ?? []).filter(Nb).map((t) => ({
    error: t,
    path: jb(t.path),
    message: t.message ?? "Variable reference is not visible from this activity's scope."
  }));
}
function kb({ activities: e, activityCatalog: t, selectedEvidenceId: n = null, onSelectEvidence: o }) {
  const r = de(
    () => new Map(t.map((a) => [a.activityTypeKey, a])),
    [t]
  ), s = de(() => Cb(e), [e]);
  return s.length === 0 ? /* @__PURE__ */ i.jsx("div", { className: "wf-empty wf-timeline-empty", children: "No activity executions recorded yet." }) : /* @__PURE__ */ i.jsx("ol", { className: "wf-timeline", "aria-label": "Execution timeline", children: s.map((a) => {
    const c = r.get(a.activityType), u = xr(c), l = c ? Ae(c) : Sr(a.activityType) ?? a.activityType, d = Sr(a.activityType) ?? a.activityType, f = Ib(a.startedAt ?? a.scheduledAt), h = jd(a.startedAt, a.completedAt);
    return /* @__PURE__ */ i.jsx("li", { children: /* @__PURE__ */ i.jsxs(
      "button",
      {
        type: "button",
        className: "wf-timeline-entry",
        "data-selected": a.activityExecutionId === n,
        onClick: () => o?.(a.activityExecutionId),
        children: [
          /* @__PURE__ */ i.jsx("span", { className: "wf-timeline-icon wf-activity-icon", "data-icon": u, "aria-hidden": "true", children: js(u) }),
          /* @__PURE__ */ i.jsxs("span", { className: "wf-timeline-body", children: [
            /* @__PURE__ */ i.jsx("strong", { title: l, children: l }),
            /* @__PURE__ */ i.jsx("small", { title: d, children: d })
          ] }),
          /* @__PURE__ */ i.jsxs("span", { className: "wf-timeline-meta", children: [
            f ? /* @__PURE__ */ i.jsx("time", { children: f }) : null,
            h ? /* @__PURE__ */ i.jsxs("small", { children: [
              "took ",
              h
            ] }) : null
          ] }),
          /* @__PURE__ */ i.jsx(Eb, { status: a.status })
        ]
      }
    ) }, a.activityExecutionId);
  }) });
}
function Eb({ status: e }) {
  const t = e.toLowerCase(), n = t === "completed" ? "OK" : e;
  return /* @__PURE__ */ i.jsx("span", { className: "wf-status-badge wf-timeline-pill", "data-status": t, children: n });
}
function Cb(e) {
  return e.map((t, n) => ({ activity: t, index: n })).sort((t, n) => vc(t.activity) - vc(n.activity) || t.index - n.index).map((t) => t.activity);
}
function vc(e) {
  const t = e.startedAt ?? e.scheduledAt, n = t ? Date.parse(t) : Number.NaN;
  return Number.isNaN(n) ? Number.MAX_SAFE_INTEGER : n;
}
function Ib(e) {
  if (!e) return "";
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? "" : t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: !1 });
}
function Ab({ context: e }) {
  const t = F0(e), n = K0(e), o = q0(e), r = t.data ?? null, s = n.data ?? null, a = t.isLoading || n.isLoading, c = o.isPending, [u, l] = q(() => hc(r)), [d, f] = q(""), [h, p] = q(null);
  ee(() => {
    l(hc(r));
  }, [r]);
  const g = de(() => Nv(s), [s]), b = de(() => jv(s), [s]), x = s?.sets ?? [], m = de(() => {
    const T = d.trim().toLowerCase();
    return T ? g.filter(
      (R) => jr(R).toLowerCase().includes(T) || (R.activityTypeKey ?? "").toLowerCase().includes(T)
    ) : g;
  }, [g, d]), E = new Set(u.activityTypes), y = new Set(u.sets), N = g.filter((T) => zt(T.state) === "BlockedByHostBaseline").length, k = g.filter((T) => zt(T.state) === "HiddenByManagementSettings").length, v = o.error ?? t.error ?? n.error, j = v instanceof Error ? v.message : v ? "Activity availability could not be loaded." : null, _ = (T) => l((R) => ({ ...R, mode: T })), M = (T) => l((R) => ({ ...R, activityTypes: pc(R.activityTypes, T) })), W = (T) => l((R) => ({ ...R, sets: pc(R.sets, T) })), D = () => {
    p(null), o.mutate(
      {
        scope: r?.scope ?? "host-default",
        mode: vv(u.mode),
        rules: { activityTypes: u.activityTypes, sets: u.sets }
      },
      { onSuccess: () => p("Activity availability saved.") }
    );
  };
  return /* @__PURE__ */ i.jsxs("section", { className: "wf-page availability-page", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "wf-page-header", children: [
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("div", { className: "wf-kicker", children: "Workflows" }),
        /* @__PURE__ */ i.jsxs("h2", { children: [
          /* @__PURE__ */ i.jsx(Lw, { size: 18 }),
          " Activity availability"
        ] }),
        /* @__PURE__ */ i.jsx("p", { className: "wf-muted", children: "Control which activities can be added to new workflows. Host baseline rules always take precedence." })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "wf-actions", children: /* @__PURE__ */ i.jsxs("button", { type: "button", className: "availability-save", onClick: D, disabled: a || c, children: [
        /* @__PURE__ */ i.jsx(Wu, { size: 15 }),
        c ? "Saving…" : "Save"
      ] }) })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "availability-body", children: [
      j && /* @__PURE__ */ i.jsx("div", { className: "availability-banner availability-banner-error", children: j }),
      h && !j && /* @__PURE__ */ i.jsx("div", { className: "availability-banner availability-banner-success", children: h }),
      /* @__PURE__ */ i.jsxs("div", { className: "availability-mode", role: "group", "aria-label": "Activity availability mode", children: [
        /* @__PURE__ */ i.jsxs("button", { type: "button", className: u.mode === "AllExcept" ? "active" : "", onClick: () => _("AllExcept"), disabled: a || c, children: [
          /* @__PURE__ */ i.jsx(oc, { size: 15 }),
          /* @__PURE__ */ i.jsxs("span", { children: [
            /* @__PURE__ */ i.jsx("strong", { children: "All except" }),
            /* @__PURE__ */ i.jsx("em", { children: "Show everything except the selected activities" })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("button", { type: "button", className: u.mode === "Only" ? "active" : "", onClick: () => _("Only"), disabled: a || c, children: [
          /* @__PURE__ */ i.jsx(ic, { size: 15 }),
          /* @__PURE__ */ i.jsxs("span", { children: [
            /* @__PURE__ */ i.jsx("strong", { children: "Only" }),
            /* @__PURE__ */ i.jsx("em", { children: "Show only the selected activities" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "availability-counts", children: [
        /* @__PURE__ */ i.jsxs("span", { children: [
          /* @__PURE__ */ i.jsx(ic, { size: 14 }),
          " ",
          N,
          " host blocked"
        ] }),
        /* @__PURE__ */ i.jsxs("span", { children: [
          /* @__PURE__ */ i.jsx(oc, { size: 14 }),
          " ",
          k,
          " management hidden"
        ] }),
        /* @__PURE__ */ i.jsxs("span", { children: [
          /* @__PURE__ */ i.jsx(mr, { size: 14 }),
          " ",
          b.length,
          " unresolved"
        ] })
      ] }),
      x.length > 0 && /* @__PURE__ */ i.jsxs("section", { className: "availability-section", children: [
        /* @__PURE__ */ i.jsxs("h3", { className: "wf-section-label", children: [
          /* @__PURE__ */ i.jsx(xs, { size: 14 }),
          " Sets"
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "availability-set-list", children: x.map((T) => /* @__PURE__ */ i.jsxs("label", { className: "availability-set-option", children: [
          /* @__PURE__ */ i.jsx("input", { type: "checkbox", checked: y.has(T.name), disabled: a || c, onChange: () => W(T.name) }),
          /* @__PURE__ */ i.jsx("span", { children: T.name }),
          /* @__PURE__ */ i.jsx("code", { children: (T.activityTypeKeys ?? []).length })
        ] }, T.name)) })
      ] }),
      /* @__PURE__ */ i.jsxs("section", { className: "availability-section availability-section-grow", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "availability-section-head", children: [
          /* @__PURE__ */ i.jsxs("h3", { className: "wf-section-label", children: [
            /* @__PURE__ */ i.jsx(Dw, { size: 14 }),
            " Activities"
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "wf-search availability-search", children: [
            /* @__PURE__ */ i.jsx(Rr, { size: 14 }),
            /* @__PURE__ */ i.jsx("input", { type: "search", value: d, placeholder: "Filter activities…", onChange: (T) => f(T.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "availability-activity-list", children: [
          a && g.length === 0 && /* @__PURE__ */ i.jsx("p", { className: "wf-muted", children: "Loading availability…" }),
          !a && g.length === 0 && /* @__PURE__ */ i.jsx("p", { className: "wf-muted", children: "No availability diagnostics reported." }),
          !a && g.length > 0 && m.length === 0 && /* @__PURE__ */ i.jsx("p", { className: "wf-muted", children: "No activities match the filter." }),
          m.map((T) => {
            const S = zt(T.state) === "BlockedByHostBaseline", A = T.activityTypeKey ?? T.activityDefinitionId ?? "";
            return /* @__PURE__ */ i.jsxs("label", { className: `availability-activity-option ${S ? "disabled" : ""}`, children: [
              /* @__PURE__ */ i.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: E.has(A),
                  disabled: a || c || S,
                  onChange: () => M(A)
                }
              ),
              /* @__PURE__ */ i.jsxs("span", { className: "availability-activity-main", children: [
                /* @__PURE__ */ i.jsx("strong", { children: jr(T) }),
                /* @__PURE__ */ i.jsx("code", { children: T.activityTypeKey })
              ] }),
              /* @__PURE__ */ i.jsx("em", { className: `availability-state ${mv(T.state)}`, children: Nr(T.state) })
            ] }, A);
          })
        ] })
      ] }),
      b.length > 0 && /* @__PURE__ */ i.jsxs("section", { className: "availability-section", children: [
        /* @__PURE__ */ i.jsxs("h3", { className: "wf-section-label", children: [
          /* @__PURE__ */ i.jsx(mr, { size: 14 }),
          " Unresolved references"
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "availability-unresolved-list", children: b.map((T) => /* @__PURE__ */ i.jsxs("span", { children: [
          /* @__PURE__ */ i.jsx("strong", { children: T.referenceName }),
          /* @__PURE__ */ i.jsx("em", { children: Nr(T.state) })
        ] }, `${T.layer}-${T.referenceKind}-${T.referenceName}`)) })
      ] })
    ] })
  ] });
}
const bc = "elsa-studio:apply-workflow-graph-operation-batch", Nc = "elsa-studio:undo-workflow-graph-operation-batch", _b = [
  "add-activity",
  "update-activity",
  "remove-activity",
  "connect-activities",
  "disconnect-activities",
  "set-root",
  "set-designer-position",
  "set-activity-property"
];
function Db(e, t, n) {
  if (!Array.isArray(t.operations)) throw new Error("Weaver batch does not contain operations.");
  const o = Vb(e), r = Cd(o.state.rootActivity), s = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), c = [];
  for (const u of t.operations) {
    const l = Rb(u.kind), d = u.parameters ?? {};
    if (l === "add-activity") {
      const f = ze(d.activityId) ?? u.temporaryReferences?.[0], h = zb(f ?? ze(d.displayName) ?? ze(d.activityType) ?? "weaver-activity", r), p = Mb(u, h, n);
      a.set(h, p), c.push(h), f && s.set(f, h), o.state.rootActivity && Tb(o.state.rootActivity, p);
      const g = Rt(d.position) ? Xi(d.position, { x: 280, y: 160 }) : null;
      g && (o.layout = jc(o.layout, h, g));
      continue;
    }
    if (l === "set-root") {
      const f = ji(o, d.activityId, s, a);
      if (!f) throw new Error("Weaver batch referenced an unknown root activity.");
      o.state.rootActivity = f;
      continue;
    }
    if (l === "set-designer-position") {
      const f = Kt(d.activityId, s);
      if (!f || !Is(o.state.rootActivity, f)) throw new Error("Weaver batch referenced an unknown activity position.");
      o.layout = jc(o.layout, f, Xi(d, { x: 280, y: 160 }));
      continue;
    }
    if (l === "set-activity-property") {
      const f = ji(o, d.activityId, s, a);
      if (!f) throw new Error("Weaver batch referenced an unknown activity property target.");
      Lb(f, ze(d.propertyName) ?? "Value", d.value ?? "");
      continue;
    }
    if (l === "update-activity") {
      const f = ji(o, d.activityId, s, a);
      if (!f) throw new Error("Weaver batch referenced an unknown activity update target.");
      const h = Rt(d.patch) ? d.patch : d;
      Object.assign(f, h);
      continue;
    }
    if (l === "remove-activity") {
      const f = Kt(d.activityId, s);
      if (!f) throw new Error("Weaver batch referenced an unknown activity remove target.");
      o.state.rootActivity = Ed(o.state.rootActivity, f), o.layout = o.layout.filter((h) => h.nodeId !== f);
      continue;
    }
    if (l === "connect-activities") {
      $b(o, d, s);
      continue;
    }
    if (l === "disconnect-activities") {
      Pb(o, d, s);
      continue;
    }
    throw new Error(`Weaver batch operation '${String(u.kind || "unknown")}' is not supported by this designer apply path.`);
  }
  if (!o.state.rootActivity) throw new Error("Weaver batch did not produce a root activity.");
  return o.sourceVersionId = null, {
    draft: o,
    appliedCount: t.operations.length,
    finalActivityIds: c,
    temporaryReferences: Object.fromEntries(s),
    summary: `Applied ${t.operations.length} workflow operation${t.operations.length === 1 ? "" : "s"} to the working draft.`
  };
}
function Mb(e, t, n) {
  const o = e.parameters ?? {}, r = ze(o.activityVersionId) ?? ze(o.activityType) ?? "Elsa.Workflows.Activity", s = n.find((a) => a.activityVersionId === r || a.activityTypeKey === r || a.displayName === ze(o.displayName));
  return s ? Oi(s, t) : {
    nodeId: t,
    activityVersionId: s?.activityVersionId ?? r,
    inputs: [],
    outputs: [],
    ...ze(o.displayName) ? { displayName: ze(o.displayName) } : {},
    designer: { position: Xi(o.position, { x: 280, y: 160 }) }
  };
}
function Tb(e, t) {
  if (e.nodeId === t.nodeId) return;
  const n = As(e);
  n && !n.some((o) => o.nodeId === t.nodeId) && n.push(t);
}
function $b(e, t, n) {
  const o = e.state.rootActivity;
  if (!o?.structure) throw new Error("Weaver batch cannot connect activities without a flowchart root.");
  const r = Kt(t.sourceActivityId ?? t.sourceId ?? t.from, n), s = Kt(t.targetActivityId ?? t.targetId ?? t.to, n);
  if (!r || !s) throw new Error("Weaver batch connection is missing source or target activity.");
  const a = o.structure.payload, c = Array.isArray(a.connections) ? a.connections : [], u = ze(t.connectionId) ?? `flow-${r}-${s}`;
  a.connections = [
    ...c.filter((l) => !Rt(l) || l.id !== u),
    {
      id: u,
      source: { nodeId: r, port: ze(t.outcome) ?? ze(t.sourcePort) ?? "Done" },
      target: { nodeId: s }
    }
  ];
}
function Pb(e, t, n) {
  const o = e.state.rootActivity, r = o?.structure?.payload.connections;
  if (!Array.isArray(r)) return;
  const s = ze(t.connectionId), a = Kt(t.sourceActivityId ?? t.sourceId ?? t.from, n), c = Kt(t.targetActivityId ?? t.targetId ?? t.to, n);
  o.structure.payload.connections = r.filter((u) => {
    if (!Rt(u)) return !0;
    if (s && u.id === s) return !1;
    const l = Rt(u.source) ? u.source.nodeId : void 0, d = Rt(u.target) ? u.target.nodeId : void 0;
    return l !== a || d !== c;
  });
}
function Lb(e, t, n) {
  e[gd(t)] = {
    typeName: typeof n == "string" ? "String" : "Object",
    expression: { type: "Literal", value: n }
  };
}
function ji(e, t, n, o) {
  const r = Kt(t, n);
  return r ? Is(e.state.rootActivity, r) ?? o.get(r) ?? null : null;
}
function Kt(e, t) {
  const n = ze(e);
  return n ? t.get(n) ?? n : null;
}
function Is(e, t) {
  if (!e) return null;
  if (e.nodeId === t) return e;
  for (const n of Id(e)) {
    const o = Is(n, t);
    if (o) return o;
  }
  return null;
}
function Ed(e, t) {
  if (!e || e.nodeId === t) return null;
  const n = As(e);
  if (n) {
    const o = n.map((r) => Ed(r, t)).filter((r) => !!r);
    n.splice(0, n.length, ...o);
  }
  return e;
}
function Cd(e, t = /* @__PURE__ */ new Set()) {
  if (!e) return t;
  t.add(e.nodeId);
  for (const n of Id(e)) Cd(n, t);
  return t;
}
function Id(e) {
  return As(e) ?? [];
}
function As(e) {
  const t = e.structure?.payload;
  return Array.isArray(t?.activities) ? t.activities : null;
}
function jc(e, t, n) {
  return [
    ...e.filter((o) => o.nodeId !== t),
    { nodeId: t, x: n.x, y: n.y }
  ];
}
function Xi(e, t) {
  const n = Rt(e) ? e : {}, o = Number(n.x), r = Number(n.y);
  return {
    x: Number.isFinite(o) ? Math.max(40, Math.round(o)) : t.x,
    y: Number.isFinite(r) ? Math.max(40, Math.round(r)) : t.y
  };
}
function zb(e, t) {
  const n = e.replace(/^temp:/, "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() || "weaver-activity";
  let o = n, r = 2;
  for (; t.has(o); )
    o = `${n}-${r}`, r += 1;
  return t.add(o), o;
}
function Rb(e) {
  return typeof e == "number" ? _b[e] ?? "" : e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function ze(e) {
  return typeof e == "string" && e.trim() ? e : null;
}
function Vb(e) {
  return typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
function Rt(e) {
  return typeof e == "object" && e !== null;
}
function _s({ rows: e = 5 }) {
  return /* @__PURE__ */ i.jsx("div", { className: "wf-grid", "aria-busy": "true", "aria-label": "Loading", children: Array.from({ length: e }).map((t, n) => /* @__PURE__ */ i.jsx("div", { className: "wf-skeleton wf-skeleton-row", style: { width: `${90 - n % 3 * 12}%` } }, n)) });
}
function Ds({ icon: e, title: t, description: n, action: o }) {
  return /* @__PURE__ */ i.jsxs("div", { className: "wf-empty-state", role: "status", children: [
    /* @__PURE__ */ i.jsx("div", { className: "wf-empty-state-icon", "aria-hidden": !0, children: e ?? /* @__PURE__ */ i.jsx(zr, { size: 22 }) }),
    /* @__PURE__ */ i.jsx("h3", { children: t }),
    n ? /* @__PURE__ */ i.jsx("p", { children: n }) : null,
    o ? /* @__PURE__ */ i.jsx("div", { className: "wf-empty-state-action", children: o }) : null
  ] });
}
function No({ message: e, title: t = "Something went wrong" }) {
  return /* @__PURE__ */ i.jsxs("div", { className: "wf-error-card", role: "alert", children: [
    /* @__PURE__ */ i.jsx(kt, { size: 18 }),
    /* @__PURE__ */ i.jsxs("div", { className: "wf-error-card-body", children: [
      /* @__PURE__ */ i.jsx("strong", { children: t }),
      /* @__PURE__ */ i.jsx("span", { children: e || "Please try again, or check that the Elsa server is reachable." })
    ] })
  ] });
}
const Ad = { workflowActivity: _1 }, _d = { workflow: M1 }, Sc = "application/x-elsa-activity-version-id", Ob = 6, Hb = 1200, Wb = 250, Bb = [10, 25, 50], Fb = 10, kc = "elsa-studio-workflow-palette-width", Ec = "elsa-studio-workflow-inspector-width", Cc = "elsa-studio-workflow-palette-collapsed", Ic = "elsa-studio-workflow-inspector-collapsed", Dd = "elsa-studio-workflow-side-panel-maximized", Hn = 180, Wn = 460, Kb = 260, Bn = 260, Fn = 560, qb = 320, Ac = 42, qo = 16, Xb = [
  {
    value: "flowchart",
    label: "Flowchart",
    hint: "Free-form activities with explicit connections between ports."
  },
  {
    value: "sequence",
    label: "Sequence",
    hint: "Activities run top-to-bottom in the order you place them."
  }
], Md = ct.createContext(null), Td = ct.createContext(null);
let Ui;
function X1(e) {
  Ui = e.dialogs, e.featureAreas.add({
    id: "workflows",
    title: "Workflows",
    description: "Design, publish and run workflow definitions and inspect runs.",
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
        { title: "Runs", path: "/workflows/instances", iconColor: "#0ea5e9" },
        { title: "Activity Availability", path: "/workflows/activity-availability", iconColor: "#0ea5e9" }
      ]
    },
    routes: [
      {
        id: "workflows-definitions",
        path: "/workflows/definitions",
        label: "Workflow definitions",
        component: () => /* @__PURE__ */ i.jsx(Ub, { context: e.backend, ai: e.ai, propertyEditors: e.propertyEditors.list(), expressionEditors: e.expressionEditors?.list() ?? [], workflowDesignerPanels: e.workflowDesigner.panels.list() })
      },
      {
        id: "workflows-executables",
        path: "/workflows/executables",
        label: "Workflow executables",
        component: () => /* @__PURE__ */ i.jsx(Yb, { context: e.backend, ai: e.ai })
      },
      {
        id: "workflows-instances",
        path: "/workflows/instances",
        label: "Workflow runs",
        component: () => /* @__PURE__ */ i.jsx(Zb, { context: e.backend, ai: e.ai })
      },
      {
        id: "workflows-instance-detail",
        path: "/workflows/instances/:workflowExecutionId",
        label: "Workflow run",
        component: () => /* @__PURE__ */ i.jsx(Gb, { context: e.backend, ai: e.ai })
      },
      {
        id: "workflows-activity-availability",
        path: "/workflows/activity-availability",
        label: "Activity availability",
        component: () => /* @__PURE__ */ i.jsx(Ab, { context: e.backend })
      }
    ]
  });
}
function Ub({
  context: e,
  ai: t,
  propertyEditors: n,
  expressionEditors: o,
  workflowDesignerPanels: r
}) {
  const [s, a] = q(_c);
  ee(() => {
    const u = () => a(_c());
    return window.addEventListener("popstate", u), () => window.removeEventListener("popstate", u);
  }, []);
  const c = (u) => {
    const l = u ? `/workflows/definitions?definition=${encodeURIComponent(u)}` : "/workflows/definitions";
    window.history.pushState({}, "", l), window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return s ? /* @__PURE__ */ i.jsx(A1, { context: e, definitionId: s, ai: t, propertyEditors: n, expressionEditors: o, workflowDesignerPanels: r, onBack: () => c(null) }) : /* @__PURE__ */ i.jsx(Hr, { title: "Definitions", children: /* @__PURE__ */ i.jsx(Qb, { context: e, ai: t, onOpen: c }) });
}
function Yb({ context: e, ai: t }) {
  const [n, o] = q(Dc);
  ee(() => {
    const s = () => o(Dc());
    return window.addEventListener("popstate", s), () => window.removeEventListener("popstate", s);
  }, []);
  const r = ue((s) => {
    const a = s?.trim() ?? "", c = new URL(window.location.href);
    a ? c.searchParams.set("definition", a) : c.searchParams.delete("definition"), o(a || null), window.history.replaceState({}, "", `${c.pathname}${c.search}${c.hash}`);
  }, []);
  return /* @__PURE__ */ i.jsx(Hr, { title: "Executables", children: /* @__PURE__ */ i.jsx(t1, { context: e, ai: t, definitionFilter: n, onDefinitionFilterChange: r }) });
}
function Zb({ context: e, ai: t }) {
  return /* @__PURE__ */ i.jsx(Hr, { title: "Runs", children: /* @__PURE__ */ i.jsx(r1, { context: e, ai: t }) });
}
function Gb({ context: e, ai: t }) {
  const n = Jb();
  return /* @__PURE__ */ i.jsx(Hr, { title: "Run", children: /* @__PURE__ */ i.jsx(i1, { context: e, ai: t, workflowExecutionId: n }) });
}
function Hr({ title: e, children: t }) {
  return /* @__PURE__ */ i.jsxs("section", { className: "wf-page", children: [
    /* @__PURE__ */ i.jsx("div", { className: "wf-page-header", children: /* @__PURE__ */ i.jsxs("div", { children: [
      /* @__PURE__ */ i.jsx("span", { className: "wf-kicker", children: "Workflow management" }),
      /* @__PURE__ */ i.jsx("h2", { children: e })
    ] }) }),
    t
  ] });
}
function _c() {
  return new URLSearchParams(window.location.search).get("definition");
}
function Dc() {
  return new URLSearchParams(window.location.search).get("definition");
}
function Jb() {
  const e = /^\/workflows\/instances\/([^/]+)$/.exec(window.location.pathname);
  return e ? decodeURIComponent(e[1]) : "";
}
function Qb({ context: e, ai: t, onOpen: n }) {
  const [o, r] = q(""), [s, a] = q("active"), [c, u] = q(1), [l, d] = q(Fb), [f, h] = q("loading"), [p, g] = q(""), [b, x] = q(""), [m, E] = q([]), [y, N] = q(0), [k, v] = q(() => /* @__PURE__ */ new Set()), [j, _] = q(null), [M, W] = q(!1), [D, T] = q([]), [R, S] = q("idle"), A = ie(null), I = de(() => m.map((H) => H.id), [m]), $ = qt(t, "weaver.workflows.suggest-create-metadata"), L = qt(t, "weaver.workflows.explain-definition"), P = I.filter((H) => k.has(H)).length, B = I.length > 0 && P === I.length, K = ue(async () => {
    h("loading"), g("");
    try {
      const H = await X0(e, { search: o, state: s, page: c, pageSize: l }), Q = typeof H.totalCount == "number", ge = H.totalCount ?? H.definitions.length, ve = Ld(ge, l);
      if (ge > 0 && c > ve) {
        u(ve);
        return;
      }
      E(Q ? H.definitions : h1(H.definitions, c, l)), N(ge), h("ready");
    } catch (H) {
      g(H instanceof Error ? H.message : String(H)), h("failed");
    }
  }, [e, o, s, c, l]);
  ee(() => {
    K();
  }, [K]), ee(() => {
    A.current && (A.current.indeterminate = P > 0 && !B);
  }, [B, P]);
  const O = ue(async () => {
    if (!(R === "loading" || R === "ready")) {
      S("loading");
      try {
        const H = await bs(e);
        T(H.activities ?? []), S("ready");
      } catch (H) {
        S("failed"), g(H instanceof Error ? H.message : String(H));
      }
    }
  }, [R, e]), Z = () => {
    g(""), x(""), _({ name: "", description: "", rootKind: "flowchart" }), O();
  }, X = async () => {
    if (j?.name.trim()) {
      W(!0), g(""), x("");
      try {
        const H = await J0(e, {
          name: j.name.trim(),
          description: j.description.trim() || null,
          rootKind: j.rootKind,
          rootActivityVersionId: g1(j, D)
        });
        _(null), n(H.definition.id);
      } catch (H) {
        g(H instanceof Error ? H.message : String(H));
      } finally {
        W(!1);
      }
    }
  }, oe = (H) => {
    window.history.pushState({}, "", `/workflows/executables?definition=${encodeURIComponent(H)}`), window.dispatchEvent(new PopStateEvent("popstate"));
  }, se = async () => {
    if (m.length === 1 && c > 1) {
      u(c - 1);
      return;
    }
    await K();
  }, G = () => v(/* @__PURE__ */ new Set()), V = (H, Q) => {
    v((ge) => {
      const ve = new Set(ge);
      return Q ? ve.add(H) : ve.delete(H), ve;
    });
  }, Y = (H) => {
    v((Q) => {
      const ge = new Set(Q);
      for (const ve of I)
        H ? ge.add(ve) : ge.delete(ve);
      return ge;
    });
  }, ae = (H) => {
    a(H), u(1), G();
  }, ce = (H) => {
    r(H), u(1), G();
  }, J = async (H) => {
    if (await Ui.confirm({ message: `Delete workflow definition "${H.name}"? You can restore it from the Deleted view.`, confirmLabel: "Delete", tone: "danger" })) {
      x(""), g("");
      try {
        await Q0(e, H.id), V(H.id, !1), x(`Deleted ${H.name}`), await se();
      } catch (Q) {
        g(Q instanceof Error ? Q.message : String(Q));
      }
    }
  }, te = async (H) => {
    x(""), g("");
    try {
      await ev(e, H.id), V(H.id, !1), x(`Restored ${H.name}`), await se();
    } catch (Q) {
      g(Q instanceof Error ? Q.message : String(Q));
    }
  }, fe = async (H) => {
    if (await Ui.confirm({ message: `Permanently delete workflow definition "${H.name}"? This removes its drafts, versions, layouts, and validations and cannot be undone.`, confirmLabel: "Delete permanently", tone: "danger" })) {
      x(""), g("");
      try {
        await tv(e, H.id), V(H.id, !1), x(`Permanently deleted ${H.name}`), await se();
      } catch (Q) {
        g(Q instanceof Error ? Q.message : String(Q));
      }
    }
  };
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs("div", { className: "wf-toolbar", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "wf-segmented", role: "tablist", "aria-label": "Definition state", children: [
        /* @__PURE__ */ i.jsx("button", { type: "button", className: s === "active" ? "active" : "", "aria-selected": s === "active", onClick: () => ae("active"), children: "Active" }),
        /* @__PURE__ */ i.jsx("button", { type: "button", className: s === "deleted" ? "active" : "", "aria-selected": s === "deleted", onClick: () => ae("deleted"), children: "Deleted" })
      ] }),
      /* @__PURE__ */ i.jsxs("label", { className: "wf-search", children: [
        /* @__PURE__ */ i.jsx(Rr, { size: 15 }),
        /* @__PURE__ */ i.jsx("input", { value: o, onChange: (H) => ce(H.target.value), placeholder: "Search definitions" })
      ] }),
      /* @__PURE__ */ i.jsx("button", { type: "button", onClick: () => {
        K();
      }, children: "Refresh" }),
      /* @__PURE__ */ i.jsx("div", { className: "wf-actions", children: /* @__PURE__ */ i.jsxs("button", { type: "button", title: "Create workflow", onClick: Z, children: [
        /* @__PURE__ */ i.jsx(wn, { size: 15 }),
        " Create"
      ] }) })
    ] }),
    f === "failed" ? /* @__PURE__ */ i.jsx(No, { message: p, title: "Couldn't load workflow definitions" }) : null,
    f !== "failed" && p ? /* @__PURE__ */ i.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ i.jsx(kt, { size: 16 }),
      " ",
      p
    ] }) : null,
    b ? /* @__PURE__ */ i.jsxs("div", { className: "wf-status-line", children: [
      /* @__PURE__ */ i.jsx(bn, { size: 14 }),
      " ",
      b
    ] }) : null,
    k.size > 0 ? /* @__PURE__ */ i.jsxs("div", { className: "wf-selection-bar", "aria-live": "polite", children: [
      /* @__PURE__ */ i.jsxs("span", { children: [
        k.size,
        " selected"
      ] }),
      /* @__PURE__ */ i.jsx("button", { type: "button", onClick: G, children: "Clear selection" })
    ] }) : null,
    f === "loading" ? /* @__PURE__ */ i.jsx(_s, {}) : null,
    f === "ready" && m.length === 0 ? /* @__PURE__ */ i.jsx(
      Ds,
      {
        icon: /* @__PURE__ */ i.jsx(Hu, { size: 22 }),
        title: `No ${s} workflow definitions`,
        description: "Create a workflow to start designing automation, or adjust your filters to see more.",
        action: /* @__PURE__ */ i.jsxs("button", { type: "button", className: "wf-link-button", onClick: Z, children: [
          /* @__PURE__ */ i.jsx(wn, { size: 15 }),
          " Create workflow"
        ] })
      }
    ) : null,
    f === "ready" && m.length > 0 ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsxs("div", { className: "wf-grid", role: "table", "aria-label": "Workflow definitions", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "wf-grid-head", role: "row", children: [
          /* @__PURE__ */ i.jsx("label", { className: "wf-row-select", children: /* @__PURE__ */ i.jsx(
            "input",
            {
              ref: A,
              type: "checkbox",
              checked: B,
              onChange: (H) => Y(H.target.checked),
              "aria-label": "Select visible workflow definitions"
            }
          ) }),
          /* @__PURE__ */ i.jsx("span", { children: "Name" }),
          /* @__PURE__ */ i.jsx("span", { children: "Latest version" }),
          /* @__PURE__ */ i.jsx("span", { children: s === "deleted" ? "Deleted" : "Draft" }),
          /* @__PURE__ */ i.jsx("span", { children: "Modified" }),
          /* @__PURE__ */ i.jsx("span", { children: "Actions" })
        ] }),
        m.map((H) => /* @__PURE__ */ i.jsxs(
          "div",
          {
            className: "wf-grid-row",
            role: "row",
            "aria-label": `Open workflow definition ${H.name}`,
            "aria-selected": k.has(H.id),
            tabIndex: 0,
            onClick: () => n(H.id),
            onKeyDown: (Q) => {
              Q.currentTarget === Q.target && (Q.key !== "Enter" && Q.key !== " " || (Q.preventDefault(), n(H.id)));
            },
            children: [
              /* @__PURE__ */ i.jsx("label", { className: "wf-row-select", onClick: (Q) => Q.stopPropagation(), children: /* @__PURE__ */ i.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: k.has(H.id),
                  onChange: (Q) => V(H.id, Q.target.checked),
                  "aria-label": `Select workflow definition ${H.name}`
                }
              ) }),
              /* @__PURE__ */ i.jsxs("span", { children: [
                /* @__PURE__ */ i.jsx("strong", { children: H.name }),
                /* @__PURE__ */ i.jsx("small", { children: H.description || H.id })
              ] }),
              /* @__PURE__ */ i.jsx("span", { children: H.latestVersion ?? "No version" }),
              /* @__PURE__ */ i.jsx("span", { children: s === "deleted" ? rt(H.deletedAt) : H.draftId ? "Draft" : "None" }),
              /* @__PURE__ */ i.jsx("span", { children: rt(H.lastModifiedAt) }),
              /* @__PURE__ */ i.jsx("span", { className: "wf-row-actions", onClick: (Q) => Q.stopPropagation(), children: s === "active" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
                /* @__PURE__ */ i.jsx("button", { type: "button", onClick: (Q) => {
                  Q.stopPropagation(), n(H.id);
                }, children: "Open" }),
                /* @__PURE__ */ i.jsx("button", { type: "button", onClick: (Q) => {
                  Q.stopPropagation(), oe(H.id);
                }, children: "Artifacts" }),
                L ? /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => Xt(t, L, H), children: [
                  /* @__PURE__ */ i.jsx(yt, { size: 13 }),
                  " Explain"
                ] }) : null,
                /* @__PURE__ */ i.jsxs("button", { type: "button", className: "danger", onClick: () => {
                  J(H);
                }, children: [
                  /* @__PURE__ */ i.jsx(lo, { size: 13 }),
                  " Delete"
                ] })
              ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
                /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => {
                  te(H);
                }, children: [
                  /* @__PURE__ */ i.jsx(ms, { size: 13 }),
                  " Restore"
                ] }),
                /* @__PURE__ */ i.jsxs("button", { type: "button", className: "danger", onClick: () => {
                  fe(H);
                }, children: [
                  /* @__PURE__ */ i.jsx(lo, { size: 13 }),
                  " Delete permanently"
                ] })
              ] }) })
            ]
          },
          H.id
        ))
      ] }),
      /* @__PURE__ */ i.jsx(
        f1,
        {
          page: c,
          pageSize: l,
          totalCount: y,
          onPageChange: u,
          onPageSizeChange: (H) => {
            d(H), u(1);
          }
        }
      )
    ] }) : null,
    j ? /* @__PURE__ */ i.jsx(
      e1,
      {
        draft: j,
        creating: M,
        ai: t,
        suggestMetadataAction: $,
        onChange: (H) => _(H),
        onClose: () => _(null),
        onSubmit: X
      }
    ) : null
  ] });
}
function e1({ draft: e, creating: t, ai: n, suggestMetadataAction: o, onChange: r, onClose: s, onSubmit: a }) {
  const [c, u] = q(!1), [l, d] = q(""), [f, h] = q(!1), [p, g] = q(null), [b, x] = q(null), m = ie(null), E = ie(e);
  E.current = e;
  const y = ie(r);
  y.current = r;
  const N = ue((v) => {
    const j = { ...E.current };
    v.name && (j.name = v.name), v.description && (j.description = v.description), y.current(j), g(null), x(null);
  }, []);
  ee(() => {
    if (o)
      return n.onPromptResult((v) => {
        if (v.requestId !== m.current) return;
        if (m.current = null, h(!1), v.status !== "completed") {
          x(v.status === "cancelled" ? "Weaver needs more detail — continue in the assistant panel." : "Weaver couldn't generate a suggestion. Try again or fill the fields manually.");
          return;
        }
        const j = p1(v.text);
        if (!j) {
          x("Couldn't read a suggestion from Weaver's reply. See the assistant panel.");
          return;
        }
        v.autoApply ? N(j) : g(j);
      });
  }, [n, o, N]);
  const k = () => {
    if (!o) return;
    const v = o.createPrompt({ draft: E.current, intent: l });
    if (!v) return;
    const j = `wf-suggest-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    m.current = j, h(!0), g(null), x(null), n.dispatchPrompt({ ...v, requestId: j });
  };
  return /* @__PURE__ */ i.jsx("div", { className: "wf-dialog-backdrop", role: "presentation", children: /* @__PURE__ */ i.jsx("section", { className: "wf-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": "workflow-create-title", children: /* @__PURE__ */ i.jsxs(
    "form",
    {
      onSubmit: (v) => {
        v.preventDefault(), a();
      },
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: "wf-dialog-heading", children: [
          /* @__PURE__ */ i.jsx("h3", { id: "workflow-create-title", children: "Create Workflow" }),
          o ? /* @__PURE__ */ i.jsxs(
            "button",
            {
              type: "button",
              className: "wf-ai-action",
              "aria-expanded": c,
              onClick: () => u((v) => !v),
              title: o.description ?? o.label,
              children: [
                /* @__PURE__ */ i.jsx(yt, { size: 13 }),
                " ",
                o.label
              ]
            }
          ) : null
        ] }),
        o && c ? /* @__PURE__ */ i.jsxs("div", { className: "wf-ai-suggest", role: "group", "aria-label": "Suggest name and description", children: [
          /* @__PURE__ */ i.jsxs("label", { className: "wf-form-field", children: [
            /* @__PURE__ */ i.jsx("span", { children: "What should this workflow do?" }),
            /* @__PURE__ */ i.jsx(
              "textarea",
              {
                autoFocus: !0,
                "aria-label": "Workflow intent",
                rows: 2,
                placeholder: "e.g. Route incoming support tickets to the right team and notify on SLA breach (optional)",
                value: l,
                disabled: f,
                onChange: (v) => d(v.target.value),
                onKeyDown: (v) => {
                  (v.metaKey || v.ctrlKey) && v.key === "Enter" && (v.preventDefault(), k());
                }
              }
            )
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: "wf-ai-suggest-actions", children: /* @__PURE__ */ i.jsxs("button", { type: "button", className: "wf-ai-action", onClick: k, disabled: f, children: [
            /* @__PURE__ */ i.jsx(yt, { size: 13 }),
            " ",
            f ? "Generating…" : "Generate"
          ] }) }),
          b ? /* @__PURE__ */ i.jsx("p", { className: "wf-ai-suggest-error", role: "alert", children: b }) : null,
          p ? /* @__PURE__ */ i.jsxs("div", { className: "wf-ai-suggest-preview", children: [
            p.name ? /* @__PURE__ */ i.jsx("p", { children: /* @__PURE__ */ i.jsx("strong", { children: p.name }) }) : null,
            p.description ? /* @__PURE__ */ i.jsx("p", { children: p.description }) : null,
            /* @__PURE__ */ i.jsxs("div", { className: "wf-ai-suggest-actions", children: [
              /* @__PURE__ */ i.jsx("button", { type: "button", onClick: () => N(p), children: "Apply" }),
              /* @__PURE__ */ i.jsx("button", { type: "button", onClick: () => g(null), children: "Dismiss" })
            ] })
          ] }) : null
        ] }) : null,
        /* @__PURE__ */ i.jsxs("label", { className: "wf-form-field", children: [
          /* @__PURE__ */ i.jsx("span", { children: "Display name" }),
          /* @__PURE__ */ i.jsx(
            "input",
            {
              autoFocus: !0,
              "aria-label": "Display name",
              value: e.name,
              onChange: (v) => r({ ...e, name: v.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ i.jsxs("label", { className: "wf-form-field", children: [
          /* @__PURE__ */ i.jsx("span", { children: "Description" }),
          /* @__PURE__ */ i.jsx(
            "textarea",
            {
              "aria-label": "Description",
              rows: 3,
              value: e.description,
              onChange: (v) => r({ ...e, description: v.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ i.jsxs("fieldset", { className: "wf-form-field wf-root-field", children: [
          /* @__PURE__ */ i.jsx("legend", { children: "Root activity" }),
          /* @__PURE__ */ i.jsx("div", { className: "wf-root-cards", role: "radiogroup", "aria-label": "Root activity", children: Xb.map((v) => {
            const j = e.rootKind === v.value;
            return /* @__PURE__ */ i.jsxs("label", { className: "wf-root-card", "data-checked": j || void 0, children: [
              /* @__PURE__ */ i.jsx(
                "input",
                {
                  type: "radio",
                  name: "wf-root-kind",
                  "aria-label": v.label,
                  value: v.value,
                  checked: j,
                  onChange: () => r({ ...e, rootKind: v.value, rootActivityVersionId: null })
                }
              ),
              /* @__PURE__ */ i.jsx("span", { className: "wf-root-card-title", children: v.label }),
              /* @__PURE__ */ i.jsx("span", { className: "wf-root-card-hint", children: v.hint })
            ] }, v.value);
          }) })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "wf-dialog-actions", children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", onClick: s, disabled: t, children: "Cancel" }),
          /* @__PURE__ */ i.jsx("button", { type: "submit", disabled: t || !e.name.trim(), children: t ? "Creating..." : "Create" })
        ] })
      ]
    }
  ) }) });
}
function t1({ context: e, ai: t, definitionFilter: n, onDefinitionFilterChange: o }) {
  const [r, s] = q("loading"), [a, c] = q(""), [u, l] = q(""), [d, f] = q(null), [h, p] = q([]), g = n?.trim().toLowerCase() ?? "", b = de(
    () => g ? h.filter((j) => b1(j, g)) : h,
    [g, h]
  ), x = de(
    () => Array.from(new Set(h.flatMap((j) => [
      j.definitionId,
      j.definitionVersionId,
      j.sourceId
    ]).filter((j) => !!j))).sort((j, _) => j.localeCompare(_)),
    [h]
  ), m = qt(t, "weaver.workflows.explain-executable"), E = ue(async () => {
    s("loading"), c("");
    try {
      p(await fd(e)), s("ready");
    } catch (j) {
      c(j instanceof Error ? j.message : String(j)), s("failed");
    }
  }, [e]);
  ee(() => {
    E();
  }, [E]);
  const y = async (j) => {
    l(""), f(null), c("");
    try {
      const _ = await dd(e, j.artifactId), M = Vd(_);
      f({ artifactId: j.artifactId, workflowExecutionId: M }), l(`Started ${j.artifactId}`);
    } catch (_) {
      c(_ instanceof Error ? _.message : String(_));
    }
  }, N = (j) => {
    m && Xt(t, m, j) && (c(""), f(null), l(`Sent ${j.artifactId} to Weaver`));
  }, k = (j) => {
    c(""), f(null), l(`Copied ${j}`);
  }, v = (j) => {
    l(""), f(null), c(`Could not copy ${j}.`);
  };
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs("div", { className: "wf-toolbar", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", onClick: () => {
        E();
      }, children: "Refresh" }),
      /* @__PURE__ */ i.jsxs("label", { className: "wf-search wf-executable-definition-filter", children: [
        /* @__PURE__ */ i.jsx(Rr, { size: 14 }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            "aria-label": "Filter executables by workflow definition",
            list: "wf-executable-definition-options",
            placeholder: "Filter by definition ID",
            value: n ?? "",
            onChange: (j) => o(j.currentTarget.value || null)
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx("datalist", { id: "wf-executable-definition-options", children: x.map((j) => /* @__PURE__ */ i.jsx("option", { value: j }, j)) }),
      n ? /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => o(null), children: [
        /* @__PURE__ */ i.jsx(Bu, { size: 13 }),
        " Clear"
      ] }) : null
    ] }),
    r === "failed" ? /* @__PURE__ */ i.jsx(No, { message: a }) : null,
    u ? /* @__PURE__ */ i.jsx($d, { status: u, run: d }) : null,
    r === "loading" ? /* @__PURE__ */ i.jsx(_s, {}) : null,
    r === "ready" && b.length === 0 ? /* @__PURE__ */ i.jsx(
      Ds,
      {
        icon: /* @__PURE__ */ i.jsx(xn, { size: 22 }),
        title: "No workflow executables",
        description: n ? "No executables match this definition filter." : "Publish a workflow definition to make it executable."
      }
    ) : null,
    r === "ready" && b.length > 0 ? /* @__PURE__ */ i.jsxs("div", { className: "wf-grid wf-executable-grid", role: "table", "aria-label": "Workflow executables", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "wf-grid-head", role: "row", children: [
        /* @__PURE__ */ i.jsx("span", { children: "Artifact" }),
        /* @__PURE__ */ i.jsx("span", { children: "Version" }),
        /* @__PURE__ */ i.jsx("span", { children: "Source" }),
        /* @__PURE__ */ i.jsx("span", { children: "Root" }),
        /* @__PURE__ */ i.jsx("span", { children: "Published" }),
        /* @__PURE__ */ i.jsx("span", { children: "Actions" })
      ] }),
      b.map((j) => /* @__PURE__ */ i.jsxs("div", { className: "wf-grid-row", role: "row", children: [
        /* @__PURE__ */ i.jsxs("span", { className: "wf-artifact-cell", children: [
          /* @__PURE__ */ i.jsxs("span", { className: "wf-cell-line", children: [
            /* @__PURE__ */ i.jsx("strong", { title: j.artifactId, children: j.artifactId }),
            /* @__PURE__ */ i.jsx(ln, { value: j.artifactId, ariaLabel: `Copy artifact ID ${j.artifactId}`, copiedLabel: "artifact ID", onCopied: k, onCopyFailed: v })
          ] }),
          /* @__PURE__ */ i.jsxs("span", { className: "wf-cell-line wf-cell-line-muted", children: [
            /* @__PURE__ */ i.jsx("small", { title: j.artifactHash, children: j.artifactHash }),
            /* @__PURE__ */ i.jsx(ln, { value: j.artifactHash, ariaLabel: `Copy artifact hash ${j.artifactHash}`, copiedLabel: "artifact hash", onCopied: k, onCopyFailed: v })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("span", { className: "wf-cell-line wf-version-cell", children: [
          /* @__PURE__ */ i.jsx("span", { children: j.artifactVersion }),
          /* @__PURE__ */ i.jsx(ln, { value: j.artifactVersion, ariaLabel: `Copy artifact version ${j.artifactVersion}`, copiedLabel: "artifact version", onCopied: k, onCopyFailed: v })
        ] }),
        /* @__PURE__ */ i.jsx(n1, { executable: j, onCopied: k, onCopyFailed: v }),
        /* @__PURE__ */ i.jsx("span", { children: zd(j) }),
        /* @__PURE__ */ i.jsx("span", { children: rt(j.publishedAt ?? j.createdAt) }),
        /* @__PURE__ */ i.jsxs("span", { className: "wf-row-actions", children: [
          /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => {
            y(j);
          }, children: [
            /* @__PURE__ */ i.jsx(xn, { size: 13 }),
            " Run"
          ] }),
          m ? /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => N(j), children: [
            /* @__PURE__ */ i.jsx(yt, { size: 13 }),
            " Explain"
          ] }) : null
        ] })
      ] }, j.artifactId))
    ] }) : null
  ] });
}
function n1({ executable: e, onCopied: t, onCopyFailed: n }) {
  const o = e.sourceId || e.definitionVersionId || e.definitionId, r = e.sourceVersion;
  return /* @__PURE__ */ i.jsxs("span", { className: "wf-source-cell", children: [
    /* @__PURE__ */ i.jsx("span", { className: "wf-source-kind", children: Rd(e.sourceKind) }),
    o ? /* @__PURE__ */ i.jsxs("span", { className: "wf-cell-line", children: [
      /* @__PURE__ */ i.jsx("code", { title: o, children: o }),
      /* @__PURE__ */ i.jsx(ln, { value: o, ariaLabel: `Copy source ID ${o}`, copiedLabel: "source ID", onCopied: t, onCopyFailed: n })
    ] }) : null,
    r ? /* @__PURE__ */ i.jsxs("small", { children: [
      "Version ",
      r
    ] }) : null
  ] });
}
function $d({ status: e, run: t, compact: n = !1 }) {
  const o = () => {
    t?.workflowExecutionId && (window.history.pushState({}, "", `/workflows/instances/${encodeURIComponent(t.workflowExecutionId)}`), window.dispatchEvent(new PopStateEvent("popstate")));
  };
  return /* @__PURE__ */ i.jsxs("div", { className: `wf-status-line${n ? " compact" : ""}`, children: [
    /* @__PURE__ */ i.jsx(bn, { size: n ? 13 : 14 }),
    /* @__PURE__ */ i.jsx("span", { children: e }),
    t?.workflowExecutionId ? /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: o, children: [
      "Open Run ",
      t.workflowExecutionId
    ] }) : null
  ] });
}
function ln({ value: e, ariaLabel: t, copiedLabel: n, onCopied: o, onCopyFailed: r }) {
  if (!e) return null;
  const s = async (a) => {
    a.preventDefault(), a.stopPropagation();
    try {
      await S1(e), o(n);
    } catch {
      r(n);
    }
  };
  return /* @__PURE__ */ i.jsx("button", { type: "button", className: "wf-copy-button", "aria-label": t, title: t, onClick: (a) => {
    s(a);
  }, children: /* @__PURE__ */ i.jsx($w, { size: 12 }) });
}
function o1({ context: e, ai: t, definitionId: n, publishedArtifactId: o }) {
  const [r, s] = q("loading"), [a, c] = q(""), [u, l] = q(""), [d, f] = q(null), [h, p] = q([]), g = qt(t, "weaver.workflows.explain-executable"), b = ue(async () => {
    s("loading"), c("");
    try {
      const k = await fd(e);
      p(k.filter((v) => N1(v, n)).sort(j1)), s("ready");
    } catch (k) {
      c(k instanceof Error ? k.message : String(k)), p([]), s("failed");
    }
  }, [e, n]);
  ee(() => {
    b();
  }, [b, o]);
  const x = async (k) => {
    l(""), f(null), c("");
    try {
      const v = await dd(e, k.artifactId);
      f({ artifactId: k.artifactId, workflowExecutionId: Vd(v) }), l(`Started ${k.artifactId}`);
    } catch (v) {
      c(v instanceof Error ? v.message : String(v));
    }
  }, m = (k) => {
    g && Xt(t, g, k) && (c(""), f(null), l(`Sent ${k.artifactId} to Weaver`));
  }, E = () => {
    window.history.pushState({}, "", `/workflows/executables?definition=${encodeURIComponent(n)}`), window.dispatchEvent(new PopStateEvent("popstate"));
  }, y = (k) => {
    c(""), f(null), l(`Copied ${k}`);
  }, N = (k) => {
    l(""), f(null), c(`Could not copy ${k}.`);
  };
  return /* @__PURE__ */ i.jsxs("div", { className: "wf-artifacts-panel", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "wf-artifacts-toolbar", children: [
      /* @__PURE__ */ i.jsxs("span", { children: [
        h.length,
        " artifact",
        h.length === 1 ? "" : "s"
      ] }),
      /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => {
        b();
      }, children: [
        /* @__PURE__ */ i.jsx(ms, { size: 13 }),
        " Refresh"
      ] }),
      /* @__PURE__ */ i.jsx("button", { type: "button", onClick: E, children: "Open list" })
    ] }),
    r === "failed" ? /* @__PURE__ */ i.jsxs("div", { className: "wf-alert compact", children: [
      /* @__PURE__ */ i.jsx(kt, { size: 14 }),
      " ",
      a
    ] }) : null,
    u ? /* @__PURE__ */ i.jsx($d, { status: u, run: d, compact: !0 }) : null,
    r === "loading" ? /* @__PURE__ */ i.jsx("p", { className: "wf-muted", children: "Loading artifacts..." }) : null,
    r === "ready" && h.length === 0 ? /* @__PURE__ */ i.jsx("p", { className: "wf-muted", children: "No published artifacts for this workflow yet." }) : null,
    r === "ready" && h.length > 0 ? /* @__PURE__ */ i.jsx("div", { className: "wf-artifact-list", role: "list", "aria-label": "Workflow artifacts", children: h.map((k) => /* @__PURE__ */ i.jsxs("article", { className: "wf-artifact-card", role: "listitem", "data-active": k.artifactId === o ? "true" : void 0, children: [
      /* @__PURE__ */ i.jsxs("div", { className: "wf-artifact-card-heading", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsxs("span", { className: "wf-artifact-version", children: [
            "Version ",
            k.artifactVersion
          ] }),
          k.artifactId === o ? /* @__PURE__ */ i.jsx("span", { className: "wf-chip", children: "Latest publish" }) : null
        ] }),
        /* @__PURE__ */ i.jsx("span", { children: rt(k.publishedAt ?? k.createdAt) })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "wf-artifact-card-values", children: [
        /* @__PURE__ */ i.jsxs("span", { className: "wf-cell-line", children: [
          /* @__PURE__ */ i.jsx("code", { title: k.artifactId, children: k.artifactId }),
          /* @__PURE__ */ i.jsx(ln, { value: k.artifactId, ariaLabel: `Copy artifact ID ${k.artifactId}`, copiedLabel: "artifact ID", onCopied: y, onCopyFailed: N })
        ] }),
        /* @__PURE__ */ i.jsxs("span", { className: "wf-cell-line wf-cell-line-muted", children: [
          /* @__PURE__ */ i.jsx("code", { title: k.artifactHash, children: k.artifactHash }),
          /* @__PURE__ */ i.jsx(ln, { value: k.artifactHash, ariaLabel: `Copy artifact hash ${k.artifactHash}`, copiedLabel: "artifact hash", onCopied: y, onCopyFailed: N })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("dl", { children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: "Source" }),
          /* @__PURE__ */ i.jsxs("dd", { children: [
            Rd(k.sourceKind),
            " ",
            k.sourceVersion ? `v${k.sourceVersion}` : ""
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("dt", { children: "Root" }),
          /* @__PURE__ */ i.jsx("dd", { children: zd(k) })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "wf-row-actions", children: [
        /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => {
          x(k);
        }, children: [
          /* @__PURE__ */ i.jsx(xn, { size: 13 }),
          " Run"
        ] }),
        g ? /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => m(k), children: [
          /* @__PURE__ */ i.jsx(yt, { size: 13 }),
          " Explain"
        ] }) : null
      ] })
    ] }, k.artifactId)) }) : null
  ] });
}
function r1({ context: e }) {
  const [t, n] = q("loading"), [o, r] = q(""), [s, a] = q(""), [c, u] = q(""), [l, d] = q([]), f = ue(async () => {
    n("loading"), r("");
    try {
      const p = await sv(e, {
        status: s || void 0,
        runKind: c || void 0,
        take: 100
      });
      d(p), n("ready");
    } catch (p) {
      r(p instanceof Error ? p.message : String(p)), d([]), n("failed");
    }
  }, [e, c, s]);
  ee(() => {
    f();
  }, [f]);
  const h = (p) => {
    window.history.pushState({}, "", `/workflows/instances/${encodeURIComponent(p)}`), window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs("div", { className: "wf-toolbar", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", onClick: () => {
        f();
      }, children: "Refresh" }),
      /* @__PURE__ */ i.jsxs("label", { className: "wf-toolbar-field", children: [
        /* @__PURE__ */ i.jsx("span", { children: "Status" }),
        /* @__PURE__ */ i.jsxs("select", { "aria-label": "Workflow run status", value: s, onChange: (p) => a(p.target.value), children: [
          /* @__PURE__ */ i.jsx("option", { value: "", children: "All statuses" }),
          /* @__PURE__ */ i.jsx("option", { value: "Pending", children: "Pending" }),
          /* @__PURE__ */ i.jsx("option", { value: "Running", children: "Running" }),
          /* @__PURE__ */ i.jsx("option", { value: "Suspended", children: "Suspended" }),
          /* @__PURE__ */ i.jsx("option", { value: "Completed", children: "Completed" }),
          /* @__PURE__ */ i.jsx("option", { value: "Faulted", children: "Faulted" }),
          /* @__PURE__ */ i.jsx("option", { value: "Cancelled", children: "Cancelled" })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("label", { className: "wf-toolbar-field", children: [
        /* @__PURE__ */ i.jsx("span", { children: "Kind" }),
        /* @__PURE__ */ i.jsxs("select", { "aria-label": "Run Kind", value: c, onChange: (p) => u(p.target.value), children: [
          /* @__PURE__ */ i.jsx("option", { value: "", children: "All kinds" }),
          /* @__PURE__ */ i.jsx("option", { value: "TestRun", children: "Test Run" }),
          /* @__PURE__ */ i.jsx("option", { value: "PublishedRun", children: "Published Run" }),
          /* @__PURE__ */ i.jsx("option", { value: "BackgroundWeaverRun", children: "Background Weaver Run" }),
          /* @__PURE__ */ i.jsx("option", { value: "Unknown", children: "Unknown / legacy" })
        ] })
      ] })
    ] }),
    t === "failed" ? /* @__PURE__ */ i.jsx(No, { message: o }) : null,
    t === "loading" ? /* @__PURE__ */ i.jsx(_s, {}) : null,
    t === "ready" && l.length === 0 ? /* @__PURE__ */ i.jsx(
      Ds,
      {
        icon: /* @__PURE__ */ i.jsx(zr, { size: 22 }),
        title: "No workflow runs yet",
        description: "Run a published workflow executable to create execution history here."
      }
    ) : null,
    t === "ready" && l.length > 0 ? /* @__PURE__ */ i.jsxs("div", { className: "wf-grid wf-instance-grid", role: "table", "aria-label": "Workflow runs", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "wf-grid-head", role: "row", children: [
        /* @__PURE__ */ i.jsx("span", { children: "Run" }),
        /* @__PURE__ */ i.jsx("span", { children: "Kind" }),
        /* @__PURE__ */ i.jsx("span", { children: "Status" }),
        /* @__PURE__ */ i.jsx("span", { children: "Definition" }),
        /* @__PURE__ */ i.jsx("span", { children: "Activity" }),
        /* @__PURE__ */ i.jsx("span", { children: "Started" }),
        /* @__PURE__ */ i.jsx("span", { children: "Duration" })
      ] }),
      l.map((p) => /* @__PURE__ */ i.jsxs(
        "button",
        {
          type: "button",
          className: "wf-grid-row",
          role: "row",
          "aria-label": `Inspect workflow run ${p.workflowExecutionId}`,
          onClick: () => h(p.workflowExecutionId),
          children: [
            /* @__PURE__ */ i.jsxs("span", { children: [
              /* @__PURE__ */ i.jsx("strong", { children: p.workflowExecutionId }),
              /* @__PURE__ */ i.jsx("small", { children: p.artifactId })
            ] }),
            /* @__PURE__ */ i.jsx("span", { children: Pd(p.runKind) }),
            /* @__PURE__ */ i.jsx("span", { children: /* @__PURE__ */ i.jsx(jo, { status: p.status, subStatus: p.subStatus }) }),
            /* @__PURE__ */ i.jsxs("span", { children: [
              /* @__PURE__ */ i.jsx("strong", { children: p.definitionId }),
              /* @__PURE__ */ i.jsx("small", { children: p.definitionVersionId })
            ] }),
            /* @__PURE__ */ i.jsxs("span", { children: [
              /* @__PURE__ */ i.jsxs("strong", { children: [
                p.activityCount,
                " activities"
              ] }),
              /* @__PURE__ */ i.jsxs("small", { children: [
                p.incidentCount,
                " incidents"
              ] })
            ] }),
            /* @__PURE__ */ i.jsx("span", { children: rt(p.startedAt ?? p.createdAt) }),
            /* @__PURE__ */ i.jsx("span", { children: jd(p.startedAt ?? p.createdAt, p.completedAt ?? p.updatedAt) })
          ]
        },
        p.workflowExecutionId
      ))
    ] }) : null
  ] });
}
function i1({ context: e, ai: t, workflowExecutionId: n }) {
  const [o, r] = q("loading"), [s, a] = q(""), [c, u] = q(null), [l, d] = q(null), f = qt(t, "weaver.workflows.explain-instance"), h = ue(async () => {
    if (!n) {
      a("No workflow execution id was provided."), r("failed");
      return;
    }
    r("loading"), a("");
    try {
      const g = await av(e, n), [b, x] = await Promise.all([
        G0(e, g.instance.definitionVersionId).then(
          (m) => ({ definitionVersion: m, error: "" }),
          (m) => ({ definitionVersion: null, error: m instanceof Error ? m.message : String(m) })
        ),
        bs(e)
      ]);
      u({
        details: g,
        definitionVersion: b.definitionVersion,
        definitionVersionError: b.error,
        activityCatalog: x.activities
      }), d(null), r("ready");
    } catch (g) {
      u(null), a(B1(g, n)), r("failed");
    }
  }, [e, n]);
  ee(() => {
    h();
  }, [h]);
  const p = () => {
    window.history.pushState({}, "", "/workflows/instances"), window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsxs("div", { className: "wf-toolbar", children: [
      /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: p, children: [
        /* @__PURE__ */ i.jsx(gr, { size: 14 }),
        " Runs"
      ] }),
      /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => {
        h();
      }, children: [
        /* @__PURE__ */ i.jsx(ms, { size: 14 }),
        " Refresh"
      ] }),
      c && f ? /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => Xt(t, f, c.details), children: [
        /* @__PURE__ */ i.jsx(yt, { size: 13 }),
        " Explain"
      ] }) : null
    ] }),
    o === "loading" ? /* @__PURE__ */ i.jsx("div", { className: "wf-empty", children: "Loading workflow run..." }) : null,
    o === "failed" ? /* @__PURE__ */ i.jsx(No, { message: s }) : null,
    o === "ready" && c ? /* @__PURE__ */ i.jsxs("div", { className: "wf-instance-detail-workbench", children: [
      /* @__PURE__ */ i.jsx(
        s1,
        {
          definitionVersion: c.definitionVersion,
          definitionVersionError: c.definitionVersionError,
          activityCatalog: c.activityCatalog,
          details: c.details,
          selectedEvidenceId: l,
          onSelectEvidence: d
        }
      ),
      /* @__PURE__ */ i.jsx(
        a1,
        {
          ai: t,
          action: f,
          summary: c.details.instance,
          details: c.details,
          state: "ready",
          error: "",
          selectedEvidenceId: l,
          onSelectEvidence: d,
          activityCatalog: c.activityCatalog,
          graphNodeIds: c.definitionVersion ? d1(c.definitionVersion, c.activityCatalog) : void 0
        }
      )
    ] }) : null
  ] });
}
function s1({ definitionVersion: e, definitionVersionError: t, activityCatalog: n, details: o, selectedEvidenceId: r, onSelectEvidence: s }) {
  const a = de(() => {
    if (!e) return { nodes: [], edges: [] };
    const c = e.state.rootActivity;
    if (!c) return { nodes: [], edges: [] };
    const u = n.find((p) => p.activityVersionId === c.activityVersionId), l = ws(c, u), d = l === "unsupported" ? null : Jn(c, []), f = l === "unsupported" ? Ri(c, n, e.layout) : d ? Xu(d, n, e.layout) : Ri(c, n, e.layout), h = f.nodes.map((p) => ({
      ...p,
      draggable: !1,
      connectable: !1,
      deletable: !1
    }));
    return {
      nodes: e0(h, o.activities, o.incidents, r),
      edges: f.edges.map((p) => ({ ...p, deletable: !1 }))
    };
  }, [n, e, o, r]);
  return /* @__PURE__ */ i.jsxs("section", { className: "wf-instance-canvas-shell", "aria-label": "Workflow run canvas", children: [
    /* @__PURE__ */ i.jsxs("header", { children: [
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("span", { children: "Definition version" }),
        /* @__PURE__ */ i.jsx("h3", { children: e ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
          e.definition.name,
          " ",
          /* @__PURE__ */ i.jsx("small", { children: e.version })
        ] }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
          "Definition graph unavailable ",
          /* @__PURE__ */ i.jsx("small", { children: o.instance.definitionVersionId })
        ] }) })
      ] }),
      /* @__PURE__ */ i.jsx(jo, { status: o.instance.status, subStatus: o.instance.subStatus })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "wf-instance-canvas", children: [
      e ? null : /* @__PURE__ */ i.jsxs("div", { className: "wf-empty", children: [
        "The workflow run loaded, but its definition graph could not be resolved for this version.",
        t ? /* @__PURE__ */ i.jsx("small", { children: W1(t) }) : null
      ] }),
      e && a.nodes.length === 0 ? /* @__PURE__ */ i.jsx("div", { className: "wf-empty", children: "No workflow activities are available for this definition version." }) : null,
      a.nodes.length > 0 ? /* @__PURE__ */ i.jsxs(
        _u,
        {
          nodes: a.nodes,
          edges: a.edges,
          nodeTypes: Ad,
          edgeTypes: _d,
          fitView: !0,
          nodesDraggable: !1,
          nodesConnectable: !1,
          elementsSelectable: !0,
          onNodeClick: (c, u) => s(u.id),
          onPaneClick: () => s(null),
          children: [
            /* @__PURE__ */ i.jsx(Mu, {}),
            /* @__PURE__ */ i.jsx(Lu, { pannable: !0, zoomable: !0 }),
            /* @__PURE__ */ i.jsx($u, {})
          ]
        }
      ) : null
    ] })
  ] });
}
function a1({ ai: e, action: t, summary: n, details: o, state: r, error: s, selectedEvidenceId: a = null, onSelectEvidence: c, graphNodeIds: u, activityCatalog: l = [] }) {
  const [d, f] = q("timeline");
  if (!n)
    return /* @__PURE__ */ i.jsx("aside", { className: "wf-instance-inspector", children: /* @__PURE__ */ i.jsx("div", { className: "wf-empty", children: "Select a workflow run to inspect its timeline." }) });
  const h = o?.incidents.length ?? 0, p = [
    { id: "timeline", title: "Timeline", order: 0, icon: /* @__PURE__ */ i.jsx(ys, { size: 14 }), render: () => null },
    { id: "issues", title: h > 0 ? `Issues (${h})` : "Issues", order: 1, icon: /* @__PURE__ */ i.jsx(kt, { size: 14 }), render: () => null },
    { id: "details", title: "Details", order: 2, icon: /* @__PURE__ */ i.jsx(xs, { size: 14 }), render: () => null }
  ];
  return /* @__PURE__ */ i.jsxs("aside", { className: "wf-instance-inspector", "aria-label": "Workflow run details", children: [
    /* @__PURE__ */ i.jsxs("header", { children: [
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("span", { children: "Workflow Instance ID" }),
        /* @__PURE__ */ i.jsx("h3", { children: n.workflowExecutionId })
      ] }),
      t ? /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => Xt(e, t, o ?? n), children: [
        /* @__PURE__ */ i.jsx(yt, { size: 13 }),
        " Explain"
      ] }) : null
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "wf-instance-tabs", children: /* @__PURE__ */ i.jsx(or, { label: "Workflow run tabs", tabs: p, activeTabId: d, onSelect: (g) => f(g) }) }),
    r === "loading" ? /* @__PURE__ */ i.jsx("div", { className: "wf-empty", children: "Loading run details..." }) : null,
    r === "failed" ? /* @__PURE__ */ i.jsx(No, { message: s }) : null,
    r === "ready" && o ? /* @__PURE__ */ i.jsx("div", { className: "wf-instance-tab-content", children: d === "timeline" ? /* @__PURE__ */ i.jsx(
      kb,
      {
        activities: o.activities,
        activityCatalog: l,
        selectedEvidenceId: a,
        onSelectEvidence: c
      }
    ) : d === "issues" ? /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
      /* @__PURE__ */ i.jsx(c1, { incidents: o.incidents, selectedEvidenceId: a, onSelectEvidence: c }),
      /* @__PURE__ */ i.jsx(l1, { details: o, graphNodeIds: u })
    ] }) : /* @__PURE__ */ i.jsxs("dl", { className: "wf-instance-meta", children: [
      /* @__PURE__ */ i.jsx("dt", { children: "Status" }),
      /* @__PURE__ */ i.jsx("dd", { children: /* @__PURE__ */ i.jsx(jo, { status: n.status, subStatus: n.subStatus }) }),
      /* @__PURE__ */ i.jsx("dt", { children: "Run Kind" }),
      /* @__PURE__ */ i.jsx("dd", { children: Pd(n.runKind) }),
      /* @__PURE__ */ i.jsx("dt", { children: "Artifact" }),
      /* @__PURE__ */ i.jsxs("dd", { children: [
        n.artifactId,
        " ",
        /* @__PURE__ */ i.jsx("small", { children: n.artifactVersion })
      ] }),
      /* @__PURE__ */ i.jsx("dt", { children: "Definition" }),
      /* @__PURE__ */ i.jsxs("dd", { children: [
        n.definitionId,
        " ",
        /* @__PURE__ */ i.jsx("small", { children: n.definitionVersionId })
      ] }),
      /* @__PURE__ */ i.jsx("dt", { children: "Created" }),
      /* @__PURE__ */ i.jsx("dd", { children: rt(n.createdAt) }),
      /* @__PURE__ */ i.jsx("dt", { children: "Started" }),
      /* @__PURE__ */ i.jsx("dd", { children: rt(n.startedAt) }),
      /* @__PURE__ */ i.jsx("dt", { children: "Completed" }),
      /* @__PURE__ */ i.jsx("dd", { children: rt(n.completedAt) }),
      /* @__PURE__ */ i.jsx("dt", { children: "Correlation" }),
      /* @__PURE__ */ i.jsx("dd", { children: n.correlationId || "None" })
    ] }) }) : null
  ] });
}
function c1({ incidents: e, selectedEvidenceId: t = null, onSelectEvidence: n }) {
  return /* @__PURE__ */ i.jsxs("section", { className: "wf-instance-section", children: [
    /* @__PURE__ */ i.jsx("h4", { children: "Incidents" }),
    e.length === 0 ? /* @__PURE__ */ i.jsx("p", { children: "No incidents recorded." }) : null,
    e.map((o) => /* @__PURE__ */ i.jsxs(
      "button",
      {
        type: "button",
        className: "wf-instance-incident",
        "data-severity": o.severity.toLowerCase(),
        "data-selected": o.incidentId === t,
        onClick: () => n?.(o.incidentId),
        children: [
          /* @__PURE__ */ i.jsx("strong", { children: o.failureType }),
          /* @__PURE__ */ i.jsxs("span", { children: [
            o.status,
            " · ",
            o.severity
          ] }),
          /* @__PURE__ */ i.jsx("p", { children: o.message })
        ]
      },
      o.incidentId
    ))
  ] });
}
function l1({ details: e, graphNodeIds: t }) {
  if (!t) return null;
  const n = new Map(e.activities.map((s) => [s.activityExecutionId, s])), o = e.activities.filter((s) => !t.has(Mc(s))), r = e.incidents.filter((s) => {
    const a = s.activityExecutionId ? n.get(s.activityExecutionId) : null, c = s.executableNodeId ?? (a ? Mc(a) : "");
    return !c || !t.has(c);
  });
  return o.length === 0 && r.length === 0 ? null : /* @__PURE__ */ i.jsxs("section", { className: "wf-instance-section", children: [
    /* @__PURE__ */ i.jsx("h4", { children: "Unmatched runtime evidence" }),
    /* @__PURE__ */ i.jsxs("div", { className: "wf-instance-unmatched-list", children: [
      o.map((s) => /* @__PURE__ */ i.jsxs("div", { className: "wf-instance-unmatched", children: [
        /* @__PURE__ */ i.jsx("strong", { children: Sr(s.activityType) ?? s.activityType }),
        /* @__PURE__ */ i.jsx("small", { children: s.activityExecutionId })
      ] }, `activity-${s.activityExecutionId}`)),
      r.map((s) => /* @__PURE__ */ i.jsxs("div", { className: "wf-instance-unmatched", children: [
        /* @__PURE__ */ i.jsx("strong", { children: s.failureType }),
        /* @__PURE__ */ i.jsx("small", { children: s.incidentId })
      ] }, `incident-${s.incidentId}`))
    ] })
  ] });
}
function jo({ status: e, subStatus: t }) {
  return /* @__PURE__ */ i.jsx("span", { className: "wf-status-badge", "data-status": e.toLowerCase(), children: t ? `${e} · ${t}` : e });
}
function Pd(e) {
  switch (u1(e)) {
    case "testrun":
      return "Test Run";
    case "publishedrun":
      return "Published Run";
    case "backgroundweaverrun":
      return "Background Weaver Run";
    default:
      return "Unknown / legacy";
  }
}
function u1(e) {
  return (e ?? "").replace(/[\s_-]+/g, "").toLowerCase();
}
function d1(e, t) {
  const n = e.state.rootActivity;
  if (!n) return /* @__PURE__ */ new Set();
  const o = t.find((s) => s.activityVersionId === n.activityVersionId);
  if (ws(n, o) === "unsupported") return /* @__PURE__ */ new Set([n.nodeId]);
  const r = Jn(n, []);
  return new Set(r?.slot.activities.map((s) => s.nodeId) ?? [n.nodeId]);
}
function Mc(e) {
  return e.authoredActivityId || e.executableNodeId;
}
function f1({ page: e, pageSize: t, totalCount: n, onPageChange: o, onPageSizeChange: r }) {
  const s = Ld(n, t), a = n === 0 ? 0 : (e - 1) * t + 1, c = Math.min(e * t, n);
  return /* @__PURE__ */ i.jsxs("div", { className: "wf-pagination", "aria-label": "Workflow definition pagination", children: [
    /* @__PURE__ */ i.jsxs("span", { className: "wf-pagination-summary", "aria-live": "polite", children: [
      "Showing ",
      a,
      "-",
      c,
      " of ",
      n
    ] }),
    /* @__PURE__ */ i.jsxs("label", { className: "wf-page-size", children: [
      "Rows",
      /* @__PURE__ */ i.jsx("select", { value: t, onChange: (u) => r(Number(u.target.value)), children: Bb.map((u) => /* @__PURE__ */ i.jsx("option", { value: u, children: u }, u)) })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "wf-page-controls", children: [
      /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => o(e - 1), disabled: e <= 1, "aria-label": "Previous page", title: "Previous page", children: [
        /* @__PURE__ */ i.jsx(gr, { size: 14 }),
        " Previous"
      ] }),
      /* @__PURE__ */ i.jsxs("span", { children: [
        "Page ",
        e,
        " of ",
        s
      ] }),
      /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => o(e + 1), disabled: e >= s, "aria-label": "Next page", title: "Next page", children: [
        "Next ",
        /* @__PURE__ */ i.jsx(on, { size: 14 })
      ] })
    ] })
  ] });
}
function h1(e, t, n) {
  return e.slice((t - 1) * n, t * n);
}
function Ld(e, t) {
  return Math.max(1, Math.ceil(e / t));
}
function qt(e, t) {
  return e.promptActions.list().find((n) => n.id === t) ?? null;
}
function Xt(e, t, n) {
  const o = t.createPrompt(n);
  return o ? (e.dispatchPrompt(o), !0) : !1;
}
function p1(e) {
  if (!e) return null;
  const t = [], n = e.match(/```(?:json)?\s*([\s\S]*?)```/i);
  n && t.push(n[1]);
  const o = e.match(/\{[\s\S]*?\}/);
  o && t.push(o[0]);
  for (const a of t)
    try {
      const c = JSON.parse(a.trim()), u = Tc(c.name, c.description);
      if (u) return u;
    } catch {
    }
  const r = e.match(/name\s*[:\-]\s*(.+)/i)?.[1], s = e.match(/description\s*[:\-]\s*(.+)/i)?.[1];
  return Tc(r, s);
}
function Tc(e, t) {
  const n = typeof e == "string" ? $c(e) : void 0, o = typeof t == "string" ? $c(t) : void 0;
  return n || o ? { name: n || void 0, description: o || void 0 } : null;
}
function $c(e) {
  return e.trim().replace(/,$/, "").trim().replace(/^["']/, "").replace(/["']$/, "").trim();
}
function g1(e, t) {
  return e.rootActivityVersionId ?? y1(t, e.rootKind)?.activityVersionId ?? null;
}
function y1(e, t) {
  return e.find((n) => m1(n) === t);
}
function m1(e) {
  return e ? x1(e) ? "flowchart" : w1(e) ? "sequence" : null : null;
}
function Yi(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = n.category?.trim() || "Uncategorized";
    t.set(o, [...t.get(o) ?? [], n]);
  }
  return Array.from(t.entries()).sort(([n], [o]) => n.localeCompare(o)).map(([n, o]) => ({
    category: n,
    activities: o.sort((r, s) => Ae(r).localeCompare(Ae(s)))
  }));
}
function x1(e) {
  return Ae(e) === "Flowchart" || e.activityTypeKey.endsWith(".Flowchart");
}
function w1(e) {
  return Ae(e) === "Sequence" || e.activityTypeKey.endsWith(".Sequence");
}
function v1(e) {
  return e.isBrowsable !== !1 && e.browsable !== !1;
}
function zd(e) {
  return k1(e.rootActivityType) || e.rootActivityType;
}
function b1(e, t) {
  return [
    e.definitionId,
    e.definitionVersionId,
    e.sourceId,
    e.sourceVersion
  ].some((n) => n?.toLowerCase().includes(t));
}
function N1(e, t) {
  return e.definitionId === t || e.sourceId === t;
}
function j1(e, t) {
  return Pc(t) - Pc(e);
}
function Pc(e) {
  const t = e.publishedAt ?? e.createdAt, n = t ? new Date(t).getTime() : 0;
  return Number.isNaN(n) ? 0 : n;
}
function Rd(e) {
  const t = e?.trim().toLowerCase() ?? "";
  return !t || t === "definition" || t === "workflowdefinition" ? "Definition" : t === "definitionversion" || t === "workflowdefinitionversion" ? "Definition version" : e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (n) => n.toUpperCase());
}
function Vd(e) {
  const t = e?.workflowExecutionId ?? e?.runId ?? e?.executionId;
  return typeof t == "string" && t.trim() ? t : null;
}
async function S1(e) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(e);
    return;
  }
  const t = document.createElement("textarea");
  t.value = e, t.setAttribute("readonly", ""), t.style.position = "fixed", t.style.opacity = "0", document.body.appendChild(t), t.select();
  const n = document.execCommand("copy");
  if (t.remove(), !n)
    throw new Error("Clipboard copy failed.");
}
function k1(e) {
  return e.split(".").filter(Boolean).at(-1) ?? e;
}
function E1(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    Xo(t, n.typeName, n), Xo(t, n.name, n), Xo(t, n.displayName, n);
    const o = n.typeName.split(".").filter(Boolean).at(-1);
    Xo(t, o, n);
  }
  return t;
}
function C1(e, t, n) {
  const o = t.get(e.activityVersionId);
  return n.get(Yn(o?.activityTypeKey)) ?? n.get(Yn(Sr(o?.activityTypeKey))) ?? n.get(Yn(o?.displayName)) ?? n.get(Yn(e.activityVersionId)) ?? null;
}
function Xo(e, t, n) {
  const o = Yn(t);
  o && !e.has(o) && e.set(o, n);
}
function Yn(e) {
  return e?.trim().toLowerCase() ?? "";
}
function Lc(e, t, n, o) {
  const r = Wr();
  if (!r) return t;
  const s = r.getItem(e);
  if (s == null) return t;
  const a = Number(s);
  return Number.isFinite(a) ? nr(a, n, o) : t;
}
function zc(e, t) {
  const n = Wr();
  if (!n) return t;
  const o = n.getItem(e);
  return o === "true" ? !0 : o === "false" ? !1 : t;
}
function I1() {
  const e = Wr();
  if (!e) return null;
  const t = e.getItem(Dd);
  return t === "palette" || t === "inspector" ? t : null;
}
function Wr() {
  if (typeof window > "u") return null;
  const e = window.localStorage;
  return e && typeof e.getItem == "function" && typeof e.setItem == "function" && typeof e.removeItem == "function" ? e : null;
}
function Kn(e, t) {
  const n = Wr();
  n && (t == null ? n.removeItem(e) : n.setItem(e, t));
}
function nr(e, t, n) {
  return Math.min(n, Math.max(t, Math.round(e)));
}
function A1({
  context: e,
  definitionId: t,
  ai: n,
  propertyEditors: o,
  expressionEditors: r,
  workflowDesignerPanels: s,
  onBack: a
}) {
  const [c, u] = q(null), [l, d] = q(null), [f, h] = q([]), [p, g] = q([]), [b, x] = q(null), [m, E] = q(er), [y, N] = q("loading"), [k, v] = q([]), [j, _] = q([]), [M, W] = q([]), [D, T] = q(null), [R, S] = q(null), [A, I] = q(null), [$, L] = q(null), [P, B] = q(""), [K, O] = q(""), [Z, X] = q("idle"), [oe, se] = q(null), [G, V] = q(!1), [Y, ae] = q(null), [ce, J] = q(() => /* @__PURE__ */ new Set()), [te, fe] = q(""), [H, Q] = q(() => Lc(kc, Kb, Hn, Wn)), [ge, ve] = q(() => Lc(Ec, qb, Bn, Fn)), [ke, Te] = q(() => zc(Cc, !1)), [Ie, Oe] = q(() => zc(Ic, !1)), [be, He] = q(I1), [We, Ge] = q("activities"), [Je, Qe] = q("inspector"), [Et, Ut] = q("designer"), Ze = ie(null), Yt = ie(null), jn = ie(""), Sn = ie(0), So = ie(Promise.resolve()), kn = ie(/* @__PURE__ */ new Map()), Be = ie(mc()), ut = ie(null), dt = ie(""), Zt = ie(!1), [Br, En] = q(0), Gt = ie(null), xt = ie(null), Ct = ie(!1), It = l?.state.rootActivity ?? null, Le = de(() => new Map(f.map((w) => [w.activityVersionId, w])), [f]), Cn = ue(
    (w) => kv([w.activityVersionId, w.activityTypeKey], b),
    [b]
  ), ko = de(() => E1(p), [p]), Fe = de(() => qu(It, k), [It, k]), Eo = ws(Fe, Fe ? Le.get(Fe.activityVersionId) : void 0), we = !!Fe && Eo === "unsupported", Ke = de(() => we ? null : Jn(It, k), [It, k, we]), Jt = de(() => Yi(f), [f]), Co = de(() => {
    const w = te.trim().toLowerCase();
    if (!w) return Jt;
    const C = f.filter((z) => Ae(z).toLowerCase().includes(w) || z.activityTypeKey.toLowerCase().includes(w) || (z.category ?? "").toLowerCase().includes(w) || (z.description ?? "").toLowerCase().includes(w));
    return Yi(C);
  }, [f, te, Jt]), ye = de(() => we && Fe?.nodeId === R ? Fe : Ke?.slot.activities.find((w) => w.nodeId === R) ?? null, [we, Ke, Fe, R]), At = de(
    () => ye ? C1(ye, Le, ko) : null,
    [Le, ko, ye]
  ), Io = de(
    () => ye ? Cn({ activityVersionId: ye.activityVersionId, activityTypeKey: Le.get(ye.activityVersionId)?.activityTypeKey }) : null,
    [Cn, Le, ye]
  ), In = ye ? Ve(ye) : [], An = Z0(e, l?.state, R), _e = Eo === "flowchart" && Ke?.slot.mode === "flowchart", wt = !It || !we, ft = Z !== "idle", Fr = !!l?.state.rootActivity && !ft, Ao = qt(n, "weaver.workflows.find-draft-risks"), _o = qt(n, "weaver.workflows.propose-update");
  ee(() => {
    if (!(!c || !l))
      return window.__ELSA_STUDIO_WORKFLOW_CONTEXT__ = {
        workflowId: c.definition.id,
        workflowDefinitionId: c.definition.id,
        workflowVersionId: l.sourceVersionId ?? null,
        draftId: l.id,
        revision: O1(l),
        selectedNodeId: R,
        selectedActivityType: At?.typeName ?? (ye ? Le.get(ye.activityVersionId)?.activityTypeKey ?? ye.activityVersionId : null),
        summary: c.definition.name,
        activities: Hd(l.state.rootActivity, Le),
        connections: Wd(l.state.rootActivity),
        diagnostics: l.validationErrors.map((w) => ({ severity: w.code ?? "warning", message: w.message ?? "Workflow validation issue." }))
      }, () => {
        window.__ELSA_STUDIO_WORKFLOW_CONTEXT__?.workflowId === c.definition.id && (window.__ELSA_STUDIO_WORKFLOW_CONTEXT__ = void 0);
      };
  }, [Le, c, l, At, ye, R]), ee(() => {
    const w = (z) => {
      const F = z.detail;
      if (!F?.batch || !F.respond) return;
      if (!l || !c) {
        F.respond({ ok: !1, message: "No active workflow draft is open." });
        return;
      }
      const U = F.batch.workflowDefinitionId;
      if (U && U !== "active-draft" && U !== c.definition.id) {
        F.respond({ ok: !1, message: `Batch targets workflow '${U}', but '${c.definition.id}' is active.` });
        return;
      }
      try {
        const le = qn(l), re = Db(l, F.batch, f), me = `weaver-batch-${Date.now()}`;
        kn.current.set(me, le), d(re.draft), v([]), S(re.finalActivityIds.at(-1) ?? null), ae(null), se(null), O(re.summary), B(""), F.respond({ ok: !0, result: { ...re, undoToken: me } });
      } catch (le) {
        const re = le instanceof Error ? le.message : String(le);
        B(re), F.respond({ ok: !1, message: re });
      }
    }, C = (z) => {
      const F = z.detail;
      if (!F?.undoToken || !F.respond) return;
      const U = kn.current.get(F.undoToken);
      if (!U) {
        F.respond({ ok: !1, message: "The Weaver batch undo point is no longer available." });
        return;
      }
      kn.current.delete(F.undoToken), d(U), v([]), S(null), ae(null), se(null), O("Restored workflow draft before Weaver batch."), B(""), F.respond({ ok: !0, summary: "Restored workflow draft before Weaver batch." });
    };
    return window.addEventListener(bc, w), window.addEventListener(Nc, C), () => {
      window.removeEventListener(bc, w), window.removeEventListener(Nc, C);
    };
  }, [f, c, l]), ee(() => {
    Kn(kc, String(H));
  }, [H]), ee(() => {
    Kn(Ec, String(ge));
  }, [ge]), ee(() => {
    Kn(Cc, String(ke));
  }, [ke]), ee(() => {
    Kn(Ic, String(Ie));
  }, [Ie]), ee(() => {
    Kn(Dd, be);
  }, [be]), ee(() => {
    if (!be) return;
    const w = (C) => {
      C.key === "Escape" && He(null);
    };
    return window.addEventListener("keydown", w), () => window.removeEventListener("keydown", w);
  }, [be]);
  const _n = ue(async () => {
    B(""), N("loading");
    const [w, C, z, F, U] = await Promise.all([
      U0(e, t),
      bs(e),
      uv(e).then(
        (re) => ({ ok: !0, descriptors: re }),
        () => ({ ok: !1, descriptors: [] })
      ),
      dv(e).then(
        (re) => ({ ok: !0, descriptors: re }),
        () => ({ ok: !1, descriptors: er })
      ),
      // Non-essential: drives only the non-blocking availability warnings, so failure is tolerated.
      hd(e).then(
        (re) => re,
        () => null
      )
    ]), le = w.draft ?? null;
    u(w), jn.current = le ? qe(le) : "", Be.current = mc(), ut.current = le ? qn(le) : null, dt.current = le ? qe(le) : "", Zt.current = !1, En(0), d(le), h(C.activities ?? []), g(z.descriptors), x(U), E(F.descriptors.length > 0 ? F.descriptors : er), N(z.ok ? "ready" : "failed"), v([]), S(null);
  }, [e, t]);
  ee(() => {
    _n().catch((w) => B(w instanceof Error ? w.message : String(w)));
  }, [_n]), ee(() => {
    J((w) => {
      let C = !1;
      const z = new Set(w);
      for (const F of Jt)
        z.has(F.category) || (z.add(F.category), C = !0);
      return C ? z : w;
    });
  }, [Jt]), ee(() => {
    if (!Fe) {
      _([]), W([]);
      return;
    }
    const w = we ? Ri(Fe, f, l?.layout ?? []) : Ke ? Xu(Ke, f, l?.layout ?? []) : { nodes: [], edges: [] };
    _(w.nodes), W(w.edges);
  }, [f, l?.layout, we, Ke, Fe]);
  const Kr = (w) => {
    d((C) => C && { ...C, state: { ...C.state, rootActivity: w } });
  }, Dn = ue((w, C) => {
    if (l?.state.rootActivity && we)
      return;
    const z = Oi(w, Oc(w));
    if (!l?.state.rootActivity) {
      Kr(z), S(z.nodeId);
      return;
    }
    if (!Ke) {
      if (!Ve(z)[0]) {
        O(""), B("The current root activity does not accept child activities. Drop Flowchart or Sequence to wrap it in a composite root.");
        return;
      }
      d((U) => {
        if (!U?.state.rootActivity) return U;
        const le = U.state.rootActivity, re = Vi(z, [], [le]), me = C ? [
          ...U.layout.filter((xe) => xe.nodeId !== le.nodeId),
          {
            nodeId: le.nodeId,
            x: Math.round(C.x),
            y: Math.round(C.y)
          }
        ] : U.layout;
        return {
          ...U,
          layout: me,
          state: {
            ...U.state,
            rootActivity: re
          }
        };
      }), S(l.state.rootActivity.nodeId), B(""), O(`Wrapped root in ${Ae(w)}`);
      return;
    }
    d((F) => {
      if (!F?.state.rootActivity) return F;
      const U = Jn(F.state.rootActivity, k);
      if (!U) return F;
      const le = Vi(F.state.rootActivity, k, [...U.slot.activities, z]), re = C ? [
        ...F.layout.filter((me) => me.nodeId !== z.nodeId),
        {
          nodeId: z.nodeId,
          x: Math.round(C.x),
          y: Math.round(C.y)
        }
      ] : F.layout;
      return {
        ...F,
        layout: re,
        state: {
          ...F.state,
          rootActivity: le
        }
      };
    }), S(z.nodeId);
  }, [l?.state.rootActivity, k, we, Ke]), _t = ue((w, C) => {
    const z = Oi(w, Oc(w)), F = {
      id: z.nodeId,
      type: "workflowActivity",
      position: C,
      selected: !0,
      data: {
        label: Ae(w),
        activityVersionId: w.activityVersionId,
        activityTypeKey: w.activityTypeKey,
        category: w.category,
        executionType: w.executionType,
        icon: xr(w),
        childSlots: Ve(z),
        acceptsInbound: String(w.executionType ?? "").toLowerCase() !== "trigger",
        sourcePorts: Ju(z, w)
      }
    };
    return { activityNode: z, node: F };
  }, []), $e = ue((w, C, z = []) => {
    we || d((F) => {
      if (!F) return F;
      const U = o0(F.layout, w), le = F.state.rootActivity;
      if (!le) return { ...F, layout: U };
      const re = Jn(le, k);
      if (!re) return { ...F, layout: U };
      const me = t0(re, w, C, z), xe = re.slot.mode === "flowchart" ? n0(me, C) : me;
      return {
        ...F,
        layout: U,
        state: {
          ...F.state,
          rootActivity: Uu(le, k, xe)
        }
      };
    });
  }, [k, we]), Mn = ue((w, C) => {
    if (!Ze.current) return null;
    const z = Ze.current.getBoundingClientRect();
    return D ? D.screenToFlowPosition({ x: w, y: C }) : {
      x: w - z.left,
      y: C - z.top
    };
  }, [D]), Tn = ue((w, C) => document.elementFromPoint(w, C)?.closest(".react-flow__edge")?.getAttribute("data-id") ?? null, []), $n = ue((w, C, z) => {
    const F = j.find((De) => De.id === C.source), U = j.find((De) => De.id === C.target), le = F && U ? z1(F, U) : F ? Hc(F) : z, re = _t(w, le), xe = [...j.map((De) => De.selected ? { ...De, selected: !1 } : De), re.node], Mt = f0(M, C, re.node.id);
    _(xe), W(Mt), S(re.node.id), $e(xe, Mt, [re.activityNode]);
  }, [$e, _t, M, j]), Qt = ue((w, C, z) => {
    if (!wt || !Ze.current) return !1;
    const F = Ze.current.getBoundingClientRect();
    if (!(C >= F.left && C <= F.right && z >= F.top && z <= F.bottom)) return !1;
    const le = Mn(C, z);
    if (!le) return !1;
    if (_e) {
      const re = Tn(C, z), me = re ? M.find((xe) => xe.id === re) : void 0;
      if (me)
        return $n(w, me, le), !0;
    }
    return Dn(w, le), !0;
  }, [Dn, wt, M, Tn, _e, $n, Mn]);
  ee(() => {
    const w = (z) => {
      const F = Gt.current;
      if (!F) return;
      Math.hypot(z.clientX - F.startX, z.clientY - F.startY) >= Ob && (F.dragging = !0);
    }, C = (z) => {
      const F = Gt.current;
      if (Gt.current = null, !F?.dragging || !Ze.current || xt.current) return;
      const U = Ze.current.getBoundingClientRect();
      z.clientX >= U.left && z.clientX <= U.right && z.clientY >= U.top && z.clientY <= U.bottom && (Ct.current = !0, window.setTimeout(() => {
        Ct.current = !1;
      }, 0), Qt(F.activity, z.clientX, z.clientY));
    };
    return window.addEventListener("pointermove", w), window.addEventListener("pointerup", C), window.addEventListener("pointercancel", C), () => {
      window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", C), window.removeEventListener("pointercancel", C);
    };
  }, [D, Qt]);
  const qr = (w, C) => {
    xt.current = { activityVersionId: C.activityVersionId, handledDrop: !1 }, w.dataTransfer.setData(Sc, C.activityVersionId), w.dataTransfer.setData("text/plain", C.activityVersionId), w.dataTransfer.effectAllowed = "copy";
  }, Xr = (w, C) => {
    const z = xt.current;
    xt.current = null, !z?.handledDrop && (w.clientX === 0 && w.clientY === 0 || Qt(C, w.clientX, w.clientY) && (Ct.current = !0, window.setTimeout(() => {
      Ct.current = !1;
    }, 0)));
  }, Ur = (w, C) => {
    w.button === 0 && (Gt.current = {
      activity: C,
      startX: w.clientX,
      startY: w.clientY,
      dragging: !1
    });
  }, Do = (w) => {
    Ct.current || wt && Dn(w);
  }, Mo = (w) => {
    if (!wt) {
      w.dataTransfer.dropEffect = "none";
      return;
    }
    if (w.preventDefault(), w.dataTransfer.dropEffect = "copy", !_e) return;
    const C = Tn(w.clientX, w.clientY);
    L(C);
  }, To = (w) => {
    if (!Ze.current) return;
    const C = w.relatedTarget;
    C && Ze.current.contains(C) || L(null);
  }, $o = (w) => {
    w.preventDefault(), L(null);
    const C = w.dataTransfer.getData(Sc) || w.dataTransfer.getData("text/plain");
    if (!C || (w.stopPropagation(), xt.current?.activityVersionId === C && (xt.current.handledDrop = !0), !wt)) return;
    const z = Le.get(C);
    z && Qt(z, w.clientX, w.clientY);
  }, Yr = () => {
    if (!_e) return;
    const w = Ze.current?.getBoundingClientRect();
    w && I({
      kind: "fromEmpty",
      clientX: w.left + w.width / 2,
      clientY: w.top + w.height / 2
    });
  }, Pn = ue(async (w, C) => {
    const z = async () => {
      const U = ++Sn.current, le = qe(w);
      B("");
      try {
        const re = await nv(e, w), me = qe(re);
        return jn.current = me, d((xe) => !xe || xe.id !== re.id ? xe : qe(xe) === le ? re : { ...xe, validationErrors: re.validationErrors }), U === Sn.current && O(C), re;
      } catch (re) {
        throw U === Sn.current && (O(""), B(re instanceof Error ? re.message : String(re))), re;
      }
    }, F = So.current.then(z, z);
    return So.current = F.catch(() => {
    }), F;
  }, [e]);
  ee(() => {
    if (!G || !l || qe(l) === jn.current) return;
    O("Autosaving...");
    const C = window.setTimeout(() => {
      Pn(l, "Autosaved").catch(() => {
      });
    }, Hb);
    return () => window.clearTimeout(C);
  }, [G, l, Pn]), ee(() => {
    if (!l) return;
    if (Zt.current) {
      Zt.current = !1;
      return;
    }
    const w = qe(l);
    if (w === dt.current) return;
    const C = window.setTimeout(() => {
      const z = ut.current;
      z && (Be.current = xc(Be.current, z), En((F) => F + 1)), ut.current = qn(l), dt.current = w;
    }, Wb);
    return () => window.clearTimeout(C);
  }, [l]);
  const Zr = ue(() => {
    if (!l) return;
    const w = c?.definition.name;
    eb(Gv(l, w), w), O("Exported workflow as JSON.");
  }, [l, c]), Gr = ue((w) => {
    d((C) => C && { ...C, state: w(C.state) });
  }, []), Jr = ue((w) => {
    if (!l) return "No draft is loaded.";
    const C = Qv(w, l);
    return C.ok ? (d(C.draft), S(null), v([]), O("Applied workflow JSON."), null) : C.error;
  }, [l]), Dt = ue(() => {
    if (!l) return;
    const w = qe(l);
    if (w === dt.current) return;
    const C = ut.current;
    C && (Be.current = xc(Be.current, C)), ut.current = qn(l), dt.current = w;
  }, [l]), en = ue((w) => {
    Zt.current = !0, ut.current = qn(w), dt.current = qe(w), d(w), S(null), v([]), En((C) => C + 1);
  }, []), tn = ue(() => {
    if (!l) return;
    Dt();
    const w = lb(Be.current, l);
    w && (Be.current = w.history, en(w.snapshot));
  }, [l, Dt, en]), Ln = ue(() => {
    if (!l) return;
    Dt();
    const w = ub(Be.current, l);
    w && (Be.current = w.history, en(w.snapshot));
  }, [l, Dt, en]), { canUndoNow: Qr, canRedoNow: zn } = de(() => {
    const w = !!l && !!ut.current && qe(l) !== dt.current;
    return {
      canUndoNow: ab(Be.current) || w,
      canRedoNow: cb(Be.current) && !w
    };
  }, [l, Br]);
  ee(() => {
    const w = (C) => {
      if (Et !== "designer" || !(C.metaKey || C.ctrlKey)) return;
      const z = C.target;
      if (z && (z.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(z.tagName))) return;
      const F = C.key.toLowerCase();
      F === "z" && !C.shiftKey ? (C.preventDefault(), tn()) : (F === "z" && C.shiftKey || F === "y") && (C.preventDefault(), Ln());
    };
    return window.addEventListener("keydown", w), () => window.removeEventListener("keydown", w);
  }, [Et, tn, Ln]);
  const ei = async () => {
    if (!(!l || ft)) {
      X("saving"), O("Saving...");
      try {
        await Pn(l, "Saved");
      } catch {
      } finally {
        X("idle");
      }
    }
  }, ti = async () => {
    if (!(!l || ft)) {
      X("promoting"), O("Promoting...");
      try {
        const w = await ov(e, l.id), C = await rv(e, w.versionId);
        ae(C.artifactId), O(`Published ${C.artifactVersion}`), await _n();
      } catch (w) {
        O(""), B(w instanceof Error ? w.message : String(w));
      } finally {
        X("idle");
      }
    }
  }, Po = async () => {
    if (!l?.state.rootActivity || ft) return;
    const w = l, C = qe(w);
    se(null), O("Preparing test run...");
    try {
      X("testRunPreparing"), O("Preparing test run...");
      const z = H1(w);
      X("testRunStarting"), O("Starting test run...");
      const F = await iv(e, {
        definitionId: w.definitionId,
        snapshotId: z,
        state: w.state
      });
      se({ draftSignature: C, view: F }), Qe("runtime"), Oe(!1), O(Ms(F) ? "Test run rejected" : "Test run dispatched");
    } catch (z) {
      O(""), B(z instanceof Error ? z.message : String(z));
    } finally {
      X("idle");
    }
  }, Fd = (w) => {
    const C = we ? w.filter((z) => z.type === "select") : w;
    C.length !== 0 && _((z) => nu(C, z));
  }, Kd = (w) => {
    we || W((C) => ou(w, C));
  }, ni = (w) => !w.source || !w.target || w.source === w.target || !_e ? !1 : !w.targetHandle, qd = (w) => {
    if (!l?.state.rootActivity || !Ke || !_e || !ni(w)) return;
    const C = wr(w.source, w.target, w.sourceHandle ?? "Done", w.targetHandle ?? void 0), z = iu(C, M);
    W(z), $e(j, z);
  }, Xd = () => {
    $e(j, M);
  }, Ud = !we && j.length > 0, Yd = ue(() => {
    if (we || j.length === 0) return;
    const w = Ke?.slot.mode === "sequence" ? "sequence" : "flowchart", C = ob(j, M, w), z = j.map((F) => {
      const U = C.get(F.id);
      return U ? { ...F, position: U } : F;
    });
    _(z), $e(z, M), window.requestAnimationFrame(() => D?.fitView({ padding: 0.2 })), O("Rearranged the canvas.");
  }, [M, j, Ke, we, $e, D]), Zd = (w, C) => {
    if (!C.nodeId || C.handleType === "target") {
      Yt.current = null;
      return;
    }
    Yt.current = {
      nodeId: C.nodeId,
      handleId: C.handleId ?? null
    };
  }, Gd = (w, C) => {
    const z = V1(Yt.current, C);
    if (Yt.current = null, !z || !_e || C.toNode || C.toHandle || R1(w)) return;
    const F = Od(w);
    I({
      kind: "fromPort",
      sourceNodeId: z.nodeId,
      sourceHandleId: z.handleId,
      clientX: F.x,
      clientY: F.y
    });
  }, Jd = (w, C) => {
    if (!_e || !ni(C)) return;
    const z = Tm(w, {
      ...C,
      sourceHandle: C.sourceHandle ?? "Done",
      targetHandle: C.targetHandle ?? void 0
    }, M, { shouldReplaceId: !1 });
    W(z), $e(j, z);
  }, Qd = (w) => {
    if (we || w.length === 0) return;
    const C = new Set(w.map((U) => U.id)), z = j.filter((U) => !C.has(U.id)), F = M.filter((U) => !C.has(U.source) && !C.has(U.target));
    _(z), W(F), R && C.has(R) && S(null), $e(z, F);
  }, ef = (w) => {
    if (we || w.length === 0) return;
    const C = new Set(w.map((F) => F.id)), z = M.filter((F) => !C.has(F.id));
    W(z), $e(j, z);
  }, Ts = ue((w) => {
    if (we) return;
    const C = M.filter((z) => z.id !== w);
    W(C), $e(j, C);
  }, [$e, M, we, j]), $s = ue((w, C, z) => {
    _e && I({ kind: "spliceEdge", edgeId: w, clientX: C, clientY: z });
  }, [_e]), tf = (w) => {
    const C = A;
    if (!C) return;
    I(null);
    const z = Mn(C.clientX, C.clientY) ?? { x: 0, y: 0 };
    if (C.kind === "fromEmpty") {
      const U = _t(w, z), re = [...j.map((me) => me.selected ? { ...me, selected: !1 } : me), U.node];
      _(re), S(U.node.id), $e(re, M, [U.activityNode]);
      return;
    }
    if (C.kind === "fromPort") {
      const U = j.find((De) => De.id === C.sourceNodeId), le = U ? Hc(U) : z, re = _t(w, le), xe = [...j.map((De) => De.selected ? { ...De, selected: !1 } : De), re.node], Mt = [...M, wr(C.sourceNodeId, re.node.id, C.sourceHandleId ?? "Done")];
      _(xe), W(Mt), S(re.node.id), $e(xe, Mt, [re.activityNode]);
      return;
    }
    const F = M.find((U) => U.id === C.edgeId);
    F && $n(w, F, z);
  }, nf = de(() => ({
    highlightedEdgeId: $,
    deleteEdge: Ts,
    requestInsertActivity: $s
  }), [Ts, $, $s]), of = (w, C, z) => {
    v((F) => [...F, { ownerNodeId: w.nodeId, slotId: C, label: z }]), S(null);
  }, Ps = ue((w) => {
    d((C) => {
      const z = C?.state.rootActivity;
      return !C || !z ? C : {
        ...C,
        state: {
          ...C.state,
          rootActivity: Yu(z, w.nodeId, () => w)
        }
      };
    });
  }, []), rf = ue((w) => {
    if (!w) return;
    const C = l?.state.rootActivity;
    if (!C) return;
    const z = Qw(C, w, (F) => {
      const U = Le.get(F.activityVersionId);
      return U ? Ae(U) : F.nodeId;
    });
    z && (Ut("designer"), v(z), S(w), Oe(!1));
  }, [l?.state.rootActivity, Le]), sf = (w) => {
    J((C) => {
      const z = new Set(C);
      return z.has(w) ? z.delete(w) : z.add(w), z;
    });
  }, Ls = (w) => {
    He((C) => C === w ? null : C), w === "palette" ? Te((C) => !C) : Oe((C) => !C);
  }, zs = (w) => {
    w === "palette" ? Te(!1) : Oe(!1), He((C) => C === w ? null : w);
  }, Rs = (w, C) => {
    He(null), w === "palette" ? (Te(!1), Q((z) => nr(z + C, Hn, Wn))) : (Oe(!1), ve((z) => nr(z + C, Bn, Fn)));
  }, Vs = (w, C) => {
    C.preventDefault(), He(null), w === "palette" ? Te(!1) : Oe(!1);
    const z = C.clientX, F = w === "palette" ? H : ge, U = w === "palette" ? Hn : Bn, le = w === "palette" ? Wn : Fn;
    document.body.classList.add("wf-side-panel-resizing");
    const re = (xe) => {
      const Mt = w === "palette" ? xe.clientX - z : z - xe.clientX, De = nr(F + Mt, U, le);
      w === "palette" ? Q(De) : ve(De);
    }, me = () => {
      document.body.classList.remove("wf-side-panel-resizing"), window.removeEventListener("pointermove", re), window.removeEventListener("pointerup", me), window.removeEventListener("pointercancel", me);
    };
    window.addEventListener("pointermove", re), window.addEventListener("pointerup", me), window.addEventListener("pointercancel", me);
  }, Os = (w, C) => {
    C.key === "ArrowLeft" ? (C.preventDefault(), Rs(w, w === "palette" ? -qo : qo)) : C.key === "ArrowRight" ? (C.preventDefault(), Rs(w, w === "palette" ? qo : -qo)) : C.key === "Home" ? (C.preventDefault(), w === "palette" ? Q(Hn) : ve(Bn)) : C.key === "End" && (C.preventDefault(), w === "palette" ? Q(Wn) : ve(Fn));
  };
  if (!c || !l)
    return /* @__PURE__ */ i.jsx("div", { className: "wf-empty", children: P || "Loading workflow editor..." });
  const af = [
    "wf-editor-body",
    ke ? "palette-collapsed" : "",
    Ie ? "inspector-collapsed" : "",
    be === "palette" ? "palette-maximized" : "",
    be === "inspector" ? "inspector-maximized" : ""
  ].filter(Boolean).join(" "), cf = {
    "--wf-palette-width": `${ke ? Ac : H}px`,
    "--wf-inspector-width": `${Ie ? Ac : ge}px`
  }, Hs = !ke && be !== "inspector", Ws = !Ie && be !== "palette", Lo = oe?.draftSignature === qe(l) ? oe.view : null, Bs = Lo && K.startsWith("Test run") ? "" : K, lf = (w) => {
    window.history.pushState({}, "", `/workflows/instances/${encodeURIComponent(w)}`), window.dispatchEvent(new PopStateEvent("popstate"));
  }, uf = {
    definition: c.definition,
    draft: l,
    selectedActivity: ye,
    selectedActivityDescriptor: At,
    selectedActivitySlots: In,
    catalog: f,
    currentScopeOwner: Fe,
    frames: k
  }, Fs = s.map((w) => {
    const C = w.component;
    return {
      id: w.id,
      title: w.title,
      side: w.side,
      order: w.order ?? 500,
      icon: null,
      render: () => /* @__PURE__ */ i.jsx(C, { context: uf })
    };
  }), oi = [
    {
      id: "activities",
      title: "Activities",
      order: 0,
      icon: /* @__PURE__ */ i.jsx(zr, { size: 15 }),
      render: ff
    },
    ...Fs.filter((w) => w.side === "left")
  ].sort(Rc), ri = [
    {
      id: "inspector",
      title: "Inspector",
      order: 0,
      icon: /* @__PURE__ */ i.jsx(ys, { size: 15 }),
      render: hf
    },
    {
      id: "runtime",
      title: "Runtime",
      order: 5,
      icon: /* @__PURE__ */ i.jsx(xn, { size: 15 }),
      render: () => /* @__PURE__ */ i.jsx(L1, { testRun: Lo, onOpenRun: lf })
    },
    {
      id: "artifacts",
      title: "Artifacts",
      order: 10,
      icon: /* @__PURE__ */ i.jsx(Hu, { size: 15 }),
      render: () => /* @__PURE__ */ i.jsx(
        o1,
        {
          context: e,
          ai: n,
          definitionId: c.definition.id,
          publishedArtifactId: Y
        }
      )
    },
    ...Fs.filter((w) => w.side === "right")
  ].sort(Rc), Ks = oi.find((w) => w.id === We) ?? oi[0], qs = ri.find((w) => w.id === Je) ?? ri[0], df = [
    { id: "designer", title: "Designer", order: 0, icon: /* @__PURE__ */ i.jsx(Hw, { size: 14 }), render: () => null },
    { id: "code", title: "Code", order: 1, icon: /* @__PURE__ */ i.jsx(Tw, { size: 14 }), render: () => null },
    { id: "properties", title: "Properties", order: 2, icon: /* @__PURE__ */ i.jsx(xs, { size: 14 }), render: () => null }
  ];
  function ff() {
    const w = te.trim().length > 0;
    return /* @__PURE__ */ i.jsxs("div", { className: "wf-palette-body", children: [
      /* @__PURE__ */ i.jsxs("label", { className: "wf-palette-search", children: [
        /* @__PURE__ */ i.jsx(Rr, { size: 14, "aria-hidden": "true" }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "search",
            value: te,
            placeholder: "Search activities",
            "aria-label": "Search activity palette",
            onChange: (C) => fe(C.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "wf-palette-list", role: "tree", "aria-label": "Available activities", children: Co.length === 0 ? /* @__PURE__ */ i.jsx("p", { className: "wf-muted wf-palette-empty", children: "No matching activities." }) : Co.map((C) => {
        const z = w || ce.has(C.category);
        return /* @__PURE__ */ i.jsxs("div", { className: "wf-palette-category", children: [
          /* @__PURE__ */ i.jsxs(
            "button",
            {
              type: "button",
              className: "wf-palette-category-toggle",
              role: "treeitem",
              "aria-expanded": z,
              onClick: () => sf(C.category),
              children: [
                z ? /* @__PURE__ */ i.jsx(Ru, { size: 14 }) : /* @__PURE__ */ i.jsx(on, { size: 14 }),
                /* @__PURE__ */ i.jsx("span", { children: C.category }),
                /* @__PURE__ */ i.jsx("small", { children: C.activities.length })
              ]
            }
          ),
          z ? /* @__PURE__ */ i.jsx("div", { className: "wf-palette-activities", role: "group", children: C.activities.map((F) => {
            const U = F.description?.trim(), le = U ? `wf-palette-description-${F.activityVersionId}` : void 0, re = Ae(F), me = xr(F);
            return /* @__PURE__ */ i.jsxs(
              "button",
              {
                type: "button",
                className: "wf-palette-activity",
                role: "treeitem",
                draggable: !0,
                title: U || Ae(F),
                "aria-describedby": le,
                onClick: () => Do(F),
                onDragStart: (xe) => qr(xe, F),
                onDragEnd: (xe) => Xr(xe, F),
                onPointerDown: (xe) => Ur(xe, F),
                children: [
                  /* @__PURE__ */ i.jsx("span", { className: "wf-activity-icon", "data-icon": me, "aria-hidden": "true", children: js(me) }),
                  /* @__PURE__ */ i.jsxs("span", { className: "wf-palette-activity-text", children: [
                    /* @__PURE__ */ i.jsx("strong", { children: re }),
                    U ? /* @__PURE__ */ i.jsx("small", { id: le, children: U }) : null
                  ] }),
                  /* @__PURE__ */ i.jsx(Ou, { className: "wf-palette-activity-grip", size: 14, "aria-hidden": "true" })
                ]
              },
              F.activityVersionId
            );
          }) }) : null
        ] }, C.category);
      }) })
    ] });
  }
  function hf() {
    return ye ? /* @__PURE__ */ i.jsxs("div", { className: "wf-inspector-content", children: [
      /* @__PURE__ */ i.jsx("h3", { children: j.find((w) => w.id === ye.nodeId)?.data.label ?? ye.nodeId }),
      /* @__PURE__ */ i.jsxs("dl", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Node ID" }),
        /* @__PURE__ */ i.jsx("dd", { children: ye.nodeId }),
        /* @__PURE__ */ i.jsx("dt", { children: "Activity type" }),
        /* @__PURE__ */ i.jsx("dd", { children: At?.typeName ?? Le.get(ye.activityVersionId)?.activityTypeKey ?? "Unknown" }),
        /* @__PURE__ */ i.jsx("dt", { children: "Activity version" }),
        /* @__PURE__ */ i.jsx("dd", { children: ye.activityVersionId })
      ] }),
      Io ? /* @__PURE__ */ i.jsxs("div", { className: "wf-availability-notice", children: [
        /* @__PURE__ */ i.jsx(mr, { size: 14 }),
        /* @__PURE__ */ i.jsxs("span", { children: [
          "No longer available for new use · ",
          Nr(Io.state)
        ] })
      ] }) : null,
      /* @__PURE__ */ i.jsx(
        Ov,
        {
          activity: ye,
          descriptor: At,
          editors: o,
          expressionEditors: r,
          expressionDescriptors: m,
          descriptorStatus: y,
          visibleVariables: An.visibleVariables,
          scopeStatus: An.status,
          onChange: Ps
        }
      ),
      R0(ye) ? /* @__PURE__ */ i.jsx("div", { className: "wf-container-variables", children: /* @__PURE__ */ i.jsx(
        xb,
        {
          context: e,
          variables: ld(ye),
          title: "Container variables",
          addLabel: "Add container variable",
          emptyLabel: "No container variables declared on this activity.",
          warnings: W0(An.shadowingWarnings, ye.nodeId),
          onChange: (w) => Ps(V0(ye, w))
        }
      ) }) : null,
      In.length > 0 ? /* @__PURE__ */ i.jsxs("div", { className: "wf-slot-list", children: [
        /* @__PURE__ */ i.jsx("span", { children: "Embedded slots" }),
        In.map((w) => /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => of(ye, w.id, `${j.find((C) => C.id === ye.nodeId)?.data.label ?? ye.nodeId} / ${w.label}`), children: [
          w.label,
          /* @__PURE__ */ i.jsxs("small", { children: [
            w.activities.length,
            " activit",
            w.activities.length === 1 ? "y" : "ies"
          ] })
        ] }, w.id))
      ] }) : /* @__PURE__ */ i.jsx("p", { className: "wf-muted", children: "This activity does not expose embedded child slots." })
    ] }) : /* @__PURE__ */ i.jsx("p", { className: "wf-muted", children: "Select an activity to inspect properties and embedded slots." });
  }
  return /* @__PURE__ */ i.jsxs("section", { className: "wf-editor", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "wf-editor-top", children: [
      /* @__PURE__ */ i.jsx("button", { type: "button", className: "wf-link-button", onClick: a, children: "Definitions" }),
      /* @__PURE__ */ i.jsx(on, { size: 14 }),
      /* @__PURE__ */ i.jsx("strong", { children: c.definition.name }),
      /* @__PURE__ */ i.jsx("span", { className: "wf-chip", children: "Draft" }),
      Bs ? /* @__PURE__ */ i.jsxs("span", { className: "wf-status", children: [
        /* @__PURE__ */ i.jsx(bn, { size: 13 }),
        " ",
        Bs
      ] }) : null,
      /* @__PURE__ */ i.jsxs("div", { className: "wf-editor-actions", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "wf-canvas-tools", role: "group", "aria-label": "Canvas tools", children: [
          /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              className: "wf-icon-button",
              "aria-label": "Undo",
              title: "Undo (Ctrl+Z)",
              disabled: !Qr,
              onClick: tn,
              children: /* @__PURE__ */ i.jsx(Ow, { size: 16 })
            }
          ),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              className: "wf-icon-button",
              "aria-label": "Redo",
              title: "Redo (Ctrl+Shift+Z)",
              disabled: !zn,
              onClick: Ln,
              children: /* @__PURE__ */ i.jsx(Rw, { size: 16 })
            }
          ),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              className: "wf-icon-button",
              "aria-label": "Auto-layout",
              title: "Auto-layout the canvas",
              disabled: !Ud,
              onClick: Yd,
              children: /* @__PURE__ */ i.jsx(zw, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ i.jsxs("label", { className: "wf-autosave-toggle", children: [
          /* @__PURE__ */ i.jsx("input", { className: "wf-autosave-switch-input", type: "checkbox", checked: G, onChange: (w) => V(w.target.checked) }),
          /* @__PURE__ */ i.jsx("span", { children: "Autosave" })
        ] }),
        Ao ? /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => Xt(n, Ao, { definition: c.definition, draft: l }), children: [
          /* @__PURE__ */ i.jsx(yt, { size: 15 }),
          " Risks"
        ] }) : null,
        _o ? /* @__PURE__ */ i.jsxs("button", { type: "button", onClick: () => Xt(n, _o, { definition: c.definition, draft: l }), children: [
          /* @__PURE__ */ i.jsx(yt, { size: 15 }),
          " Propose"
        ] }) : null,
        /* @__PURE__ */ i.jsxs("button", { type: "button", title: "Export workflow as JSON", onClick: Zr, children: [
          /* @__PURE__ */ i.jsx(Pw, { size: 15 }),
          " Export"
        ] }),
        /* @__PURE__ */ i.jsxs("button", { type: "button", disabled: ft, onClick: () => {
          ei();
        }, children: [
          /* @__PURE__ */ i.jsx(Wu, { size: 15 }),
          " Save"
        ] }),
        /* @__PURE__ */ i.jsxs("button", { type: "button", disabled: ft, onClick: () => {
          ti();
        }, children: [
          /* @__PURE__ */ i.jsx(Vu, { size: 15 }),
          " Promote"
        ] }),
        Lo ? /* @__PURE__ */ i.jsx(
          P1,
          {
            testRun: Lo,
            onOpenDetails: () => {
              Qe("runtime"), Oe(!1);
            }
          }
        ) : null,
        /* @__PURE__ */ i.jsxs(
          "button",
          {
            type: "button",
            disabled: !Fr,
            title: l.state.rootActivity ? "Run a transient test of the current design" : "Add a root activity before running",
            onClick: () => {
              Po();
            },
            children: [
              /* @__PURE__ */ i.jsx(xn, { size: 15 }),
              " Run"
            ]
          }
        )
      ] })
    ] }),
    P ? /* @__PURE__ */ i.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ i.jsx(kt, { size: 16 }),
      " ",
      P
    ] }) : null,
    /* @__PURE__ */ i.jsxs("div", { className: af, style: cf, children: [
      /* @__PURE__ */ i.jsxs("aside", { className: "wf-palette", "aria-label": "Activities panel", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "wf-panel-title", children: [
          /* @__PURE__ */ i.jsx(
            or,
            {
              label: "Activities panel tabs",
              tabs: oi,
              activeTabId: Ks.id,
              onSelect: Ge
            }
          ),
          /* @__PURE__ */ i.jsxs("span", { className: "wf-panel-actions", children: [
            /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": ke ? "Expand activities panel" : "Collapse activities panel",
                title: ke ? "Expand" : "Collapse",
                onClick: () => Ls("palette"),
                children: ke ? /* @__PURE__ */ i.jsx(on, { size: 14 }) : /* @__PURE__ */ i.jsx(gr, { size: 14 })
              }
            ),
            ke ? null : /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": be === "palette" ? "Restore activities panel" : "Maximize activities panel",
                title: be === "palette" ? "Restore" : "Maximize",
                onClick: () => zs("palette"),
                children: be === "palette" ? /* @__PURE__ */ i.jsx(rc, { size: 14 }) : /* @__PURE__ */ i.jsx(yr, { size: 14 })
              }
            )
          ] })
        ] }),
        Hs ? Ks.render() : null
      ] }),
      Hs && !be ? /* @__PURE__ */ i.jsx(
        "div",
        {
          className: "wf-side-resize-handle left",
          role: "separator",
          "aria-label": "Resize activities panel",
          "aria-orientation": "vertical",
          "aria-valuemin": Hn,
          "aria-valuemax": Wn,
          "aria-valuenow": H,
          tabIndex: 0,
          onPointerDown: (w) => Vs("palette", w),
          onKeyDown: (w) => Os("palette", w)
        }
      ) : /* @__PURE__ */ i.jsx("div", { className: "wf-side-resize-spacer" }),
      /* @__PURE__ */ i.jsxs("main", { className: "wf-canvas-shell", children: [
        /* @__PURE__ */ i.jsx("div", { className: "wf-canvas-tabs", children: /* @__PURE__ */ i.jsx(
          or,
          {
            label: "Editor view tabs",
            tabs: df,
            activeTabId: Et,
            onSelect: (w) => Ut(w)
          }
        ) }),
        Et === "code" ? /* @__PURE__ */ i.jsx(gb, { draft: l, onApply: Jr }) : Et === "properties" ? /* @__PURE__ */ i.jsx(wb, { details: c, draft: l, context: e, onStateChange: Gr }) : /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
          /* @__PURE__ */ i.jsxs("div", { className: "wf-breadcrumb", children: [
            /* @__PURE__ */ i.jsx("button", { type: "button", onClick: () => {
              v([]), S(null);
            }, children: "Root" }),
            k.map((w, C) => /* @__PURE__ */ i.jsxs(ct.Fragment, { children: [
              /* @__PURE__ */ i.jsx(on, { size: 13 }),
              /* @__PURE__ */ i.jsx("button", { type: "button", onClick: () => {
                v(k.slice(0, C + 1)), S(null);
              }, children: w.label })
            ] }, `${w.ownerNodeId}-${w.slotId}-${C}`))
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "wf-canvas", ref: Ze, onDragOver: Mo, onDragLeave: To, onDrop: $o, children: [
            /* @__PURE__ */ i.jsx(Md.Provider, { value: nf, children: /* @__PURE__ */ i.jsx(Td.Provider, { value: Cn, children: /* @__PURE__ */ i.jsxs(
              _u,
              {
                nodes: j,
                edges: M,
                nodeTypes: Ad,
                edgeTypes: _d,
                onInit: T,
                onNodesChange: Fd,
                onEdgesChange: Kd,
                onNodesDelete: Qd,
                onEdgesDelete: ef,
                onConnect: qd,
                onConnectStart: _e ? Zd : void 0,
                onConnectEnd: _e ? Gd : void 0,
                onReconnect: _e ? Jd : void 0,
                isValidConnection: ni,
                onDragOver: Mo,
                onDragLeave: To,
                onDrop: $o,
                onPaneClick: () => S(null),
                onNodeClick: (w, C) => S(C.id),
                onNodeDragStop: we ? void 0 : Xd,
                fitView: !0,
                minZoom: 0.2,
                maxZoom: 1.8,
                nodesConnectable: _e,
                nodesDraggable: !we,
                selectionOnDrag: !0,
                multiSelectionKeyCode: ["Shift", "Meta", "Control"],
                deleteKeyCode: we ? null : ["Backspace", "Delete"],
                panActivationKeyCode: null,
                defaultEdgeOptions: { type: "workflow" },
                children: [
                  /* @__PURE__ */ i.jsx(Mu, { gap: 18, size: 1 }),
                  /* @__PURE__ */ i.jsx($u, {}),
                  /* @__PURE__ */ i.jsx(Lu, { pannable: !0, zoomable: !0 })
                ]
              }
            ) }) }),
            _e && j.length === 0 ? /* @__PURE__ */ i.jsxs("button", { type: "button", className: "wf-empty-canvas-add", onClick: () => Yr(), children: [
              /* @__PURE__ */ i.jsx(wn, { size: 15 }),
              " Add activity"
            ] }) : null,
            A ? /* @__PURE__ */ i.jsx(
              T1,
              {
                clientX: A.clientX,
                clientY: A.clientY,
                activities: f,
                onPick: tf,
                onClose: () => I(null)
              }
            ) : null
          ] }),
          /* @__PURE__ */ i.jsx($1, { draft: l, onRepair: rf })
        ] })
      ] }),
      Ws && !be ? /* @__PURE__ */ i.jsx(
        "div",
        {
          className: "wf-side-resize-handle right",
          role: "separator",
          "aria-label": "Resize inspector panel",
          "aria-orientation": "vertical",
          "aria-valuemin": Bn,
          "aria-valuemax": Fn,
          "aria-valuenow": ge,
          tabIndex: 0,
          onPointerDown: (w) => Vs("inspector", w),
          onKeyDown: (w) => Os("inspector", w)
        }
      ) : /* @__PURE__ */ i.jsx("div", { className: "wf-side-resize-spacer" }),
      /* @__PURE__ */ i.jsxs("aside", { className: "wf-inspector", "aria-label": "Inspector panel", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "wf-panel-title", children: [
          /* @__PURE__ */ i.jsx(
            or,
            {
              label: "Inspector panel tabs",
              tabs: ri,
              activeTabId: qs.id,
              onSelect: Qe
            }
          ),
          /* @__PURE__ */ i.jsxs("span", { className: "wf-panel-actions", children: [
            /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": Ie ? "Expand inspector panel" : "Collapse inspector panel",
                title: Ie ? "Expand" : "Collapse",
                onClick: () => Ls("inspector"),
                children: Ie ? /* @__PURE__ */ i.jsx(gr, { size: 14 }) : /* @__PURE__ */ i.jsx(on, { size: 14 })
              }
            ),
            Ie ? null : /* @__PURE__ */ i.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": be === "inspector" ? "Restore inspector panel" : "Maximize inspector panel",
                title: be === "inspector" ? "Restore" : "Maximize",
                onClick: () => zs("inspector"),
                children: be === "inspector" ? /* @__PURE__ */ i.jsx(rc, { size: 14 }) : /* @__PURE__ */ i.jsx(yr, { size: 14 })
              }
            )
          ] })
        ] }),
        Ws ? qs.render() : null
      ] })
    ] })
  ] });
}
function or({
  label: e,
  tabs: t,
  activeTabId: n,
  onSelect: o
}) {
  return /* @__PURE__ */ i.jsx("div", { className: "wf-panel-tab-list", role: "tablist", "aria-label": e, children: t.map((r) => /* @__PURE__ */ i.jsxs(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": r.id === n,
      className: r.id === n ? "active" : "",
      title: r.title,
      onClick: () => o(r.id),
      children: [
        r.icon ? /* @__PURE__ */ i.jsx("span", { className: "wf-panel-tab-icon", "aria-hidden": "true", children: r.icon }) : null,
        /* @__PURE__ */ i.jsx("span", { children: r.title })
      ]
    },
    r.id
  )) });
}
function Rc(e, t) {
  return e.order - t.order || e.title.localeCompare(t.title);
}
function _1({ data: e, selected: t }) {
  const n = e, o = n.runtime, r = !n.suppressFlowPorts, s = r ? n.sourcePorts.length > 0 ? n.sourcePorts : [{ name: "Done", displayName: "Done" }] : [], a = D1(n), u = ct.useContext(Td)?.({ activityVersionId: n.activityVersionId, activityTypeKey: n.activityTypeKey }) ?? null;
  return /* @__PURE__ */ i.jsxs(
    "div",
    {
      className: ["wf-node", t ? "selected" : "", o ? "wf-node-runtime" : "", o?.hasBlockingIncident ? "faulted" : "", u ? "wf-node-unavailable" : ""].filter(Boolean).join(" "),
      "data-icon": n.icon ?? "activity",
      children: [
        r && n.acceptsInbound ? /* @__PURE__ */ i.jsx(mn, { type: "target", position: ne.Left }) : null,
        u ? /* @__PURE__ */ i.jsx("span", { className: "wf-node-availability", title: `No longer available for new use · ${Nr(u.state)}`, children: /* @__PURE__ */ i.jsx(mr, { size: 13 }) }) : null,
        /* @__PURE__ */ i.jsxs("div", { className: "wf-node-content", children: [
          /* @__PURE__ */ i.jsx("span", { className: "wf-node-icon", "aria-hidden": "true", children: js(n.icon) }),
          /* @__PURE__ */ i.jsxs("span", { className: "wf-node-copy", children: [
            /* @__PURE__ */ i.jsx("strong", { children: n.label }),
            a ? /* @__PURE__ */ i.jsx("small", { children: a }) : null
          ] })
        ] }),
        n.childSlots.length > 0 ? /* @__PURE__ */ i.jsxs("span", { className: "wf-node-slot-badge", children: [
          n.childSlots.length,
          " slot",
          n.childSlots.length === 1 ? "" : "s"
        ] }) : null,
        o ? /* @__PURE__ */ i.jsxs("div", { className: "wf-node-runtime-strip", children: [
          o.status ? /* @__PURE__ */ i.jsx(jo, { status: o.status, subStatus: o.subStatus }) : null,
          o.incidentCount > 0 ? /* @__PURE__ */ i.jsxs("span", { className: "wf-node-runtime-count", children: [
            o.incidentCount,
            " incident",
            o.incidentCount === 1 ? "" : "s"
          ] }) : null,
          o.faultCount > 0 ? /* @__PURE__ */ i.jsxs("span", { className: "wf-node-runtime-count", children: [
            o.faultCount,
            " faults"
          ] }) : null
        ] }) : null,
        s.map((l, d) => {
          const f = `${(d + 1) / (s.length + 1) * 100}%`;
          return /* @__PURE__ */ i.jsxs(ct.Fragment, { children: [
            /* @__PURE__ */ i.jsx("span", { className: "wf-node-port-label", style: { top: f }, children: l.displayName }),
            /* @__PURE__ */ i.jsx(mn, { type: "source", position: ne.Right, id: l.name, style: { top: f } })
          ] }, l.name);
        })
      ]
    }
  );
}
function D1(e) {
  const t = e.category?.trim(), n = e.executionType?.trim();
  return [t, n].filter((r) => !!r).join(" · ");
}
function M1(e) {
  const {
    id: t,
    sourceX: n,
    sourceY: o,
    targetX: r,
    targetY: s,
    sourcePosition: a,
    targetPosition: c,
    markerEnd: u,
    style: l,
    label: d,
    labelStyle: f
  } = e, h = ct.useContext(Md), [p, g] = q(!1), [b, x, m] = hr({ sourceX: n, sourceY: o, targetX: r, targetY: s, sourcePosition: a, targetPosition: c }), E = h?.highlightedEdgeId === t;
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    /* @__PURE__ */ i.jsx(
      wo,
      {
        id: t,
        path: b,
        markerEnd: u,
        style: {
          ...l,
          strokeWidth: E ? 2.5 : l?.strokeWidth
        },
        label: d,
        labelX: x,
        labelY: m,
        labelStyle: f,
        onMouseEnter: () => g(!0),
        onMouseLeave: () => g(!1)
      }
    ),
    h ? /* @__PURE__ */ i.jsx(nw, { children: /* @__PURE__ */ i.jsxs(
      "div",
      {
        className: ["wf-edge-actions", p ? "visible" : "", E ? "highlighted" : ""].filter(Boolean).join(" "),
        style: { transform: `translate(-50%, -50%) translate(${x}px, ${m}px)` },
        onMouseEnter: () => g(!0),
        onMouseLeave: () => g(!1),
        children: [
          /* @__PURE__ */ i.jsx("button", { type: "button", "aria-label": "Insert activity into connection", title: "Insert activity", onClick: (y) => h.requestInsertActivity(t, y.clientX, y.clientY), children: /* @__PURE__ */ i.jsx(wn, { size: 12 }) }),
          /* @__PURE__ */ i.jsx("button", { type: "button", "aria-label": "Delete connection", title: "Delete connection", onClick: () => h.deleteEdge(t), children: /* @__PURE__ */ i.jsx(lo, { size: 12 }) })
        ]
      }
    ) }) : null
  ] });
}
function T1({ clientX: e, clientY: t, activities: n, onPick: o, onClose: r }) {
  const [s, a] = q(""), [c, u] = q(0), l = ie(null), d = ie(null), f = de(() => {
    const E = s.trim().toLowerCase(), y = n.filter(v1);
    return E ? y.filter((N) => Ae(N).toLowerCase().includes(E) || N.activityTypeKey.toLowerCase().includes(E) || (N.category ?? "").toLowerCase().includes(E) || (N.description ?? "").toLowerCase().includes(E)) : y;
  }, [n, s]), h = de(() => Yi(f), [f]), p = de(() => h.flatMap((E) => E.activities), [h]);
  ee(() => {
    requestAnimationFrame(() => d.current?.focus());
  }, []), ee(() => {
    const E = (N) => {
      l.current?.contains(N.target) || r();
    }, y = (N) => {
      N.key === "Escape" && r();
    };
    return document.addEventListener("mousedown", E, !0), document.addEventListener("keydown", y), () => {
      document.removeEventListener("mousedown", E, !0), document.removeEventListener("keydown", y);
    };
  }, [r]);
  const g = (E) => {
    if (E.key === "ArrowDown")
      E.preventDefault(), u((y) => Math.min(y + 1, p.length - 1));
    else if (E.key === "ArrowUp")
      E.preventDefault(), u((y) => Math.max(y - 1, 0));
    else if (E.key === "Enter") {
      E.preventDefault();
      const y = p[c];
      y && o(y);
    }
  }, b = Math.max(8, Math.min(e + 4, window.innerWidth - 328)), x = Math.max(8, Math.min(t + 4, window.innerHeight - 360));
  let m = -1;
  return /* @__PURE__ */ i.jsxs("div", { ref: l, className: "wf-connect-menu", style: { left: b, top: x }, onMouseDown: (E) => E.stopPropagation(), onClick: (E) => E.stopPropagation(), children: [
    /* @__PURE__ */ i.jsx(
      "input",
      {
        ref: d,
        type: "search",
        value: s,
        placeholder: "Search activities...",
        "aria-label": "Search activities",
        onChange: (E) => {
          a(E.target.value), u(0);
        },
        onKeyDown: g
      }
    ),
    /* @__PURE__ */ i.jsx("div", { className: "wf-connect-menu-list", role: "listbox", "aria-label": "Activity picker", children: h.length === 0 ? /* @__PURE__ */ i.jsx("p", { children: "No matching activities." }) : h.map((E) => /* @__PURE__ */ i.jsxs("section", { children: [
      /* @__PURE__ */ i.jsx("h4", { children: E.category }),
      E.activities.map((y) => {
        m += 1;
        const N = m, k = N === c;
        return /* @__PURE__ */ i.jsxs(
          "button",
          {
            type: "button",
            role: "option",
            "aria-selected": k,
            className: k ? "active" : "",
            onMouseEnter: () => u(N),
            onClick: () => o(y),
            children: [
              /* @__PURE__ */ i.jsx("strong", { children: Ae(y) }),
              /* @__PURE__ */ i.jsx("small", { children: y.category || y.activityTypeKey })
            ]
          },
          y.activityVersionId
        );
      })
    ] }, E.category)) })
  ] });
}
function $1({ draft: e, onRepair: t }) {
  const n = e.validationErrors;
  if (!n.length)
    return /* @__PURE__ */ i.jsxs("div", { className: "wf-validation ok", children: [
      /* @__PURE__ */ i.jsx(bn, { size: 14 }),
      " No validation errors"
    ] });
  const o = Sb(n), r = new Map(o.map((s) => [s.error, s]));
  return /* @__PURE__ */ i.jsxs("div", { className: "wf-validation", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "wf-validation-summary", children: [
      /* @__PURE__ */ i.jsx(kt, { size: 14 }),
      n.length,
      " validation issue",
      n.length === 1 ? "" : "s",
      o.length > 0 ? /* @__PURE__ */ i.jsxs("span", { className: "wf-validation-variable-count", children: [
        " · ",
        o.length,
        " invalid variable reference",
        o.length === 1 ? "" : "s"
      ] }) : null
    ] }),
    /* @__PURE__ */ i.jsx("ul", { className: "wf-validation-list", children: n.map((s, a) => {
      const c = r.get(s);
      return /* @__PURE__ */ i.jsxs("li", { className: c ? "wf-validation-item repairable" : "wf-validation-item", children: [
        /* @__PURE__ */ i.jsx("span", { className: "wf-validation-message", children: s.message ?? "Validation issue." }),
        c?.path.nodeId ? /* @__PURE__ */ i.jsxs("button", { type: "button", className: "wf-validation-repair", onClick: () => t(c.path.nodeId), children: [
          /* @__PURE__ */ i.jsx(Ww, { size: 12 }),
          " Repair"
        ] }) : null
      ] }, a);
    }) })
  ] });
}
function P1({
  testRun: e,
  onOpenDetails: t
}) {
  const n = Ms(e);
  return /* @__PURE__ */ i.jsx("div", { className: "wf-test-run-status", "data-state": n ? "rejected" : "accepted", children: /* @__PURE__ */ i.jsxs(
    "button",
    {
      type: "button",
      className: "wf-test-run-trigger",
      onClick: t,
      children: [
        n ? /* @__PURE__ */ i.jsx(kt, { size: 16 }) : /* @__PURE__ */ i.jsx(bn, { size: 16 }),
        n ? "Test run rejected" : "Test run dispatched"
      ]
    }
  ) });
}
function L1({ testRun: e, onOpenRun: t }) {
  if (!e)
    return /* @__PURE__ */ i.jsx("div", { className: "wf-runtime-panel", children: /* @__PURE__ */ i.jsx("div", { className: "wf-empty", children: "Run the draft to see Runtime Evidence." }) });
  const n = Ms(e), o = e.workflowExecutionId;
  return /* @__PURE__ */ i.jsx("div", { className: "wf-runtime-panel", children: /* @__PURE__ */ i.jsxs("section", { className: "wf-runtime-card", "data-state": n ? "rejected" : "accepted", children: [
    /* @__PURE__ */ i.jsxs("header", { children: [
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("span", { children: "Latest Test Run" }),
        /* @__PURE__ */ i.jsx("h3", { children: n ? "Rejected by the server" : "Transient run accepted" })
      ] }),
      /* @__PURE__ */ i.jsx(jo, { status: e.status, subStatus: e.commandDispatchStatus ?? void 0 })
    ] }),
    /* @__PURE__ */ i.jsx("p", { children: "Ephemeral - not saved, promoted, or published." }),
    n && e.reason ? /* @__PURE__ */ i.jsxs("div", { className: "wf-runtime-reason", children: [
      /* @__PURE__ */ i.jsx(kt, { size: 14 }),
      " ",
      e.reason
    ] }) : null,
    /* @__PURE__ */ i.jsxs("dl", { className: "wf-runtime-meta", children: [
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Dispatch" }),
        /* @__PURE__ */ i.jsx("dd", { title: e.commandDispatchStatus ?? e.status, children: e.commandDispatchStatus ?? e.status })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Test Run" }),
        /* @__PURE__ */ i.jsx("dd", { title: e.testRunId, children: e.testRunId })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Artifact" }),
        /* @__PURE__ */ i.jsx("dd", { title: e.artifactId ?? "None", children: e.artifactId ?? "None" })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Run / Instance" }),
        /* @__PURE__ */ i.jsx("dd", { title: o ?? "None", children: o ? /* @__PURE__ */ i.jsx("button", { type: "button", onClick: () => t(o), children: o }) : "None" })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Activities" }),
        /* @__PURE__ */ i.jsx("dd", { children: Vc(e.activityCount, "activity") })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Incidents" }),
        /* @__PURE__ */ i.jsx("dd", { children: Vc(e.incidentCount, "incident") })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("dt", { children: "Expires" }),
        /* @__PURE__ */ i.jsx("dd", { title: e.expiresAt ? rt(e.expiresAt) : "None", children: e.expiresAt ? rt(e.expiresAt) : "None" })
      ] })
    ] })
  ] }) });
}
function Vc(e, t) {
  return typeof e != "number" ? "Available on linked Run" : `${e} ${t}${e === 1 ? "" : "s"}`;
}
function Oc(e) {
  return `${Ae(e).replace(/[^a-z0-9]+/gi, "").toLowerCase() || "activity"}-${crypto.randomUUID().slice(0, 8)}`;
}
function Hc(e) {
  return { x: e.position.x + 280, y: e.position.y };
}
function z1(e, t) {
  return {
    x: Math.round((e.position.x + t.position.x) / 2),
    y: Math.round((e.position.y + t.position.y) / 2)
  };
}
function Od(e) {
  return "changedTouches" in e && e.changedTouches.length > 0 ? { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY } : { x: e.clientX, y: e.clientY };
}
function R1(e) {
  const t = Od(e);
  return !!(document.elementFromPoint?.(t.x, t.y) ?? e.target)?.closest(".react-flow__handle, .react-flow__node");
}
function V1(e, t) {
  if (e) return e;
  const n = t.fromNode?.id;
  return n ? { nodeId: n, handleId: t.fromHandle?.id ?? null } : null;
}
function qe(e) {
  return JSON.stringify({ state: e.state, layout: e.layout });
}
function O1(e) {
  return Bd(qe(e));
}
function Hd(e, t, n = []) {
  if (!e) return n;
  const o = t.get(e.activityVersionId);
  n.push({
    id: e.nodeId,
    type: o?.activityTypeKey ?? e.activityVersionId,
    displayName: o ? Ae(o) : void 0
  });
  for (const r of Ve(e))
    for (const s of r.activities) Hd(s, t, n);
  return n;
}
function Wd(e, t = []) {
  if (!e) return t;
  for (const n of Gu(e))
    t.push({ source: n.source, target: n.target, sourcePort: n.sourceHandle ?? void 0, targetPort: n.targetHandle ?? void 0 });
  for (const n of Ve(e))
    for (const o of n.activities) Wd(o, t);
  return t;
}
function qn(e) {
  return typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
function H1(e) {
  return `${e.id}-${Bd(JSON.stringify(e.state))}`;
}
function Bd(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n += 1)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16).padStart(8, "0");
}
function Ms(e) {
  return e.status.toLowerCase() === "rejected";
}
function W1(e) {
  try {
    const t = JSON.parse(e);
    if (typeof t.error == "string") return t.error;
  } catch {
  }
  return e;
}
function B1(e, t) {
  const n = e instanceof Error ? e.message : String(e);
  return F1(e, n) ? `Run ${t} was not found.` : n;
}
function F1(e, t) {
  if ((typeof e == "object" && e ? e.response?.status ?? e.status : void 0) === 404 || /\b404\b/.test(t)) return !0;
  try {
    const o = JSON.parse(t);
    return [o.error, o.title, o.detail].some((r) => typeof r == "string" && /not found/i.test(r));
  } catch {
    return /not found/i.test(t);
  }
}
export {
  R1 as isConnectEndOverExistingWorkflowNode,
  X1 as register,
  V1 as resolveConnectEndSource
};
