import yt, { memo as be, forwardRef as qo, useRef as le, useEffect as oe, useCallback as ge, useContext as On, useMemo as ye, useState as Y, createContext as yi, useLayoutEffect as au, createElement as Kr, useId as Aa } from "react";
import "@tanstack/react-query";
function cu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Dr = { exports: {} }, mn = {};
var Zi;
function lu() {
  if (Zi) return mn;
  Zi = 1;
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
  return mn.Fragment = t, mn.jsx = n, mn.jsxs = n, mn;
}
var Ki;
function uu() {
  return Ki || (Ki = 1, Dr.exports = lu()), Dr.exports;
}
var a = uu();
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
var du = { value: () => {
} };
function Zo() {
  for (var e = 0, t = arguments.length, n = {}, o; e < t; ++e) {
    if (!(o = arguments[e] + "") || o in n || /[\s.]/.test(o)) throw new Error("illegal type: " + o);
    n[o] = [];
  }
  return new Eo(n);
}
function Eo(e) {
  this._ = e;
}
function fu(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var o = "", r = n.indexOf(".");
    if (r >= 0 && (o = n.slice(r + 1), n = n.slice(0, r)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: o };
  });
}
Eo.prototype = Zo.prototype = {
  constructor: Eo,
  on: function(e, t) {
    var n = this._, o = fu(e + "", n), r, i = -1, s = o.length;
    if (arguments.length < 2) {
      for (; ++i < s; ) if ((r = (e = o[i]).type) && (r = hu(n[r], e.name))) return r;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++i < s; )
      if (r = (e = o[i]).type) n[r] = Ui(n[r], e.name, t);
      else if (t == null) for (r in n) n[r] = Ui(n[r], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new Eo(e);
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
function hu(e, t) {
  for (var n = 0, o = e.length, r; n < o; ++n)
    if ((r = e[n]).name === t)
      return r.value;
}
function Ui(e, t, n) {
  for (var o = 0, r = e.length; o < r; ++o)
    if (e[o].name === t) {
      e[o] = du, e = e.slice(0, o).concat(e.slice(o + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Ur = "http://www.w3.org/1999/xhtml";
const Gi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ur,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ko(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Gi.hasOwnProperty(t) ? { space: Gi[t], local: e } : e;
}
function pu(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Ur && t.documentElement.namespaceURI === Ur ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function gu(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Ma(e) {
  var t = Ko(e);
  return (t.local ? gu : pu)(t);
}
function yu() {
}
function mi(e) {
  return e == null ? yu : function() {
    return this.querySelector(e);
  };
}
function mu(e) {
  typeof e != "function" && (e = mi(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var i = t[r], s = i.length, c = o[r] = new Array(s), u, l, f = 0; f < s; ++f)
      (u = i[f]) && (l = e.call(u, u.__data__, f, i)) && ("__data__" in u && (l.__data__ = u.__data__), c[f] = l);
  return new He(o, this._parents);
}
function xu(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function wu() {
  return [];
}
function Da(e) {
  return e == null ? wu : function() {
    return this.querySelectorAll(e);
  };
}
function vu(e) {
  return function() {
    return xu(e.apply(this, arguments));
  };
}
function bu(e) {
  typeof e == "function" ? e = vu(e) : e = Da(e);
  for (var t = this._groups, n = t.length, o = [], r = [], i = 0; i < n; ++i)
    for (var s = t[i], c = s.length, u, l = 0; l < c; ++l)
      (u = s[l]) && (o.push(e.call(u, u.__data__, l, s)), r.push(u));
  return new He(o, r);
}
function Pa(e) {
  return function() {
    return this.matches(e);
  };
}
function Ta(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Nu = Array.prototype.find;
function Su(e) {
  return function() {
    return Nu.call(this.children, e);
  };
}
function Eu() {
  return this.firstElementChild;
}
function ku(e) {
  return this.select(e == null ? Eu : Su(typeof e == "function" ? e : Ta(e)));
}
var Iu = Array.prototype.filter;
function Cu() {
  return Array.from(this.children);
}
function _u(e) {
  return function() {
    return Iu.call(this.children, e);
  };
}
function ju(e) {
  return this.selectAll(e == null ? Cu : _u(typeof e == "function" ? e : Ta(e)));
}
function Au(e) {
  typeof e != "function" && (e = Pa(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var i = t[r], s = i.length, c = o[r] = [], u, l = 0; l < s; ++l)
      (u = i[l]) && e.call(u, u.__data__, l, i) && c.push(u);
  return new He(o, this._parents);
}
function $a(e) {
  return new Array(e.length);
}
function Mu() {
  return new He(this._enter || this._groups.map($a), this._parents);
}
function Do(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Do.prototype = {
  constructor: Do,
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
function Du(e) {
  return function() {
    return e;
  };
}
function Pu(e, t, n, o, r, i) {
  for (var s = 0, c, u = t.length, l = i.length; s < l; ++s)
    (c = t[s]) ? (c.__data__ = i[s], o[s] = c) : n[s] = new Do(e, i[s]);
  for (; s < u; ++s)
    (c = t[s]) && (r[s] = c);
}
function Tu(e, t, n, o, r, i, s) {
  var c, u, l = /* @__PURE__ */ new Map(), f = t.length, d = i.length, h = new Array(f), p;
  for (c = 0; c < f; ++c)
    (u = t[c]) && (h[c] = p = s.call(u, u.__data__, c, t) + "", l.has(p) ? r[c] = u : l.set(p, u));
  for (c = 0; c < d; ++c)
    p = s.call(e, i[c], c, i) + "", (u = l.get(p)) ? (o[c] = u, u.__data__ = i[c], l.delete(p)) : n[c] = new Do(e, i[c]);
  for (c = 0; c < f; ++c)
    (u = t[c]) && l.get(h[c]) === u && (r[c] = u);
}
function $u(e) {
  return e.__data__;
}
function zu(e, t) {
  if (!arguments.length) return Array.from(this, $u);
  var n = t ? Tu : Pu, o = this._parents, r = this._groups;
  typeof e != "function" && (e = Du(e));
  for (var i = r.length, s = new Array(i), c = new Array(i), u = new Array(i), l = 0; l < i; ++l) {
    var f = o[l], d = r[l], h = d.length, p = Ru(e.call(f, f && f.__data__, l, o)), g = p.length, x = c[l] = new Array(g), w = s[l] = new Array(g), m = u[l] = new Array(h);
    n(f, d, x, w, m, p, t);
    for (var b = 0, y = 0, v, k; b < g; ++b)
      if (v = x[b]) {
        for (b >= y && (y = b + 1); !(k = w[y]) && ++y < g; ) ;
        v._next = k || null;
      }
  }
  return s = new He(s, o), s._enter = c, s._exit = u, s;
}
function Ru(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Lu() {
  return new He(this._exit || this._groups.map($a), this._parents);
}
function Vu(e, t, n) {
  var o = this.enter(), r = this, i = this.exit();
  return typeof e == "function" ? (o = e(o), o && (o = o.selection())) : o = o.append(e + ""), t != null && (r = t(r), r && (r = r.selection())), n == null ? i.remove() : n(i), o && r ? o.merge(r).order() : r;
}
function Hu(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, o = t._groups, r = n.length, i = o.length, s = Math.min(r, i), c = new Array(r), u = 0; u < s; ++u)
    for (var l = n[u], f = o[u], d = l.length, h = c[u] = new Array(d), p, g = 0; g < d; ++g)
      (p = l[g] || f[g]) && (h[g] = p);
  for (; u < r; ++u)
    c[u] = n[u];
  return new He(c, this._parents);
}
function Ou() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var o = e[t], r = o.length - 1, i = o[r], s; --r >= 0; )
      (s = o[r]) && (i && s.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(s, i), i = s);
  return this;
}
function Bu(e) {
  e || (e = Fu);
  function t(d, h) {
    return d && h ? e(d.__data__, h.__data__) : !d - !h;
  }
  for (var n = this._groups, o = n.length, r = new Array(o), i = 0; i < o; ++i) {
    for (var s = n[i], c = s.length, u = r[i] = new Array(c), l, f = 0; f < c; ++f)
      (l = s[f]) && (u[f] = l);
    u.sort(t);
  }
  return new He(r, this._parents).order();
}
function Fu(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Wu() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Xu() {
  return Array.from(this);
}
function Yu() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], r = 0, i = o.length; r < i; ++r) {
      var s = o[r];
      if (s) return s;
    }
  return null;
}
function qu() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Zu() {
  return !this.node();
}
function Ku(e) {
  for (var t = this._groups, n = 0, o = t.length; n < o; ++n)
    for (var r = t[n], i = 0, s = r.length, c; i < s; ++i)
      (c = r[i]) && e.call(c, c.__data__, i, r);
  return this;
}
function Uu(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Gu(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ju(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Qu(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function ed(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function td(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function nd(e, t) {
  var n = Ko(e);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Gu : Uu : typeof t == "function" ? n.local ? td : ed : n.local ? Qu : Ju)(n, t));
}
function za(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function od(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function rd(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function id(e, t, n) {
  return function() {
    var o = t.apply(this, arguments);
    o == null ? this.style.removeProperty(e) : this.style.setProperty(e, o, n);
  };
}
function sd(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? od : typeof t == "function" ? id : rd)(e, t, n ?? "")) : Wt(this.node(), e);
}
function Wt(e, t) {
  return e.style.getPropertyValue(t) || za(e).getComputedStyle(e, null).getPropertyValue(t);
}
function ad(e) {
  return function() {
    delete this[e];
  };
}
function cd(e, t) {
  return function() {
    this[e] = t;
  };
}
function ld(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function ud(e, t) {
  return arguments.length > 1 ? this.each((t == null ? ad : typeof t == "function" ? ld : cd)(e, t)) : this.node()[e];
}
function Ra(e) {
  return e.trim().split(/^|\s+/);
}
function xi(e) {
  return e.classList || new La(e);
}
function La(e) {
  this._node = e, this._names = Ra(e.getAttribute("class") || "");
}
La.prototype = {
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
function Va(e, t) {
  for (var n = xi(e), o = -1, r = t.length; ++o < r; ) n.add(t[o]);
}
function Ha(e, t) {
  for (var n = xi(e), o = -1, r = t.length; ++o < r; ) n.remove(t[o]);
}
function dd(e) {
  return function() {
    Va(this, e);
  };
}
function fd(e) {
  return function() {
    Ha(this, e);
  };
}
function hd(e, t) {
  return function() {
    (t.apply(this, arguments) ? Va : Ha)(this, e);
  };
}
function pd(e, t) {
  var n = Ra(e + "");
  if (arguments.length < 2) {
    for (var o = xi(this.node()), r = -1, i = n.length; ++r < i; ) if (!o.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? hd : t ? dd : fd)(n, t));
}
function gd() {
  this.textContent = "";
}
function yd(e) {
  return function() {
    this.textContent = e;
  };
}
function md(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function xd(e) {
  return arguments.length ? this.each(e == null ? gd : (typeof e == "function" ? md : yd)(e)) : this.node().textContent;
}
function wd() {
  this.innerHTML = "";
}
function vd(e) {
  return function() {
    this.innerHTML = e;
  };
}
function bd(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Nd(e) {
  return arguments.length ? this.each(e == null ? wd : (typeof e == "function" ? bd : vd)(e)) : this.node().innerHTML;
}
function Sd() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ed() {
  return this.each(Sd);
}
function kd() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Id() {
  return this.each(kd);
}
function Cd(e) {
  var t = typeof e == "function" ? e : Ma(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function _d() {
  return null;
}
function jd(e, t) {
  var n = typeof e == "function" ? e : Ma(e), o = t == null ? _d : typeof t == "function" ? t : mi(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function Ad() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Md() {
  return this.each(Ad);
}
function Dd() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Pd() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Td(e) {
  return this.select(e ? Pd : Dd);
}
function $d(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function zd(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Rd(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", o = t.indexOf(".");
    return o >= 0 && (n = t.slice(o + 1), t = t.slice(0, o)), { type: t, name: n };
  });
}
function Ld(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, o = -1, r = t.length, i; n < r; ++n)
        i = t[n], (!e.type || i.type === e.type) && i.name === e.name ? this.removeEventListener(i.type, i.listener, i.options) : t[++o] = i;
      ++o ? t.length = o : delete this.__on;
    }
  };
}
function Vd(e, t, n) {
  return function() {
    var o = this.__on, r, i = zd(t);
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
function Hd(e, t, n) {
  var o = Rd(e + ""), r, i = o.length, s;
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
  for (c = t ? Vd : Ld, r = 0; r < i; ++r) this.each(c(o[r], t, n));
  return this;
}
function Oa(e, t, n) {
  var o = za(e), r = o.CustomEvent;
  typeof r == "function" ? r = new r(t, n) : (r = o.document.createEvent("Event"), n ? (r.initEvent(t, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(t, !1, !1)), e.dispatchEvent(r);
}
function Od(e, t) {
  return function() {
    return Oa(this, e, t);
  };
}
function Bd(e, t) {
  return function() {
    return Oa(this, e, t.apply(this, arguments));
  };
}
function Fd(e, t) {
  return this.each((typeof t == "function" ? Bd : Od)(e, t));
}
function* Wd() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], r = 0, i = o.length, s; r < i; ++r)
      (s = o[r]) && (yield s);
}
var Ba = [null];
function He(e, t) {
  this._groups = e, this._parents = t;
}
function Bn() {
  return new He([[document.documentElement]], Ba);
}
function Xd() {
  return this;
}
He.prototype = Bn.prototype = {
  constructor: He,
  select: mu,
  selectAll: bu,
  selectChild: ku,
  selectChildren: ju,
  filter: Au,
  data: zu,
  enter: Mu,
  exit: Lu,
  join: Vu,
  merge: Hu,
  selection: Xd,
  order: Ou,
  sort: Bu,
  call: Wu,
  nodes: Xu,
  node: Yu,
  size: qu,
  empty: Zu,
  each: Ku,
  attr: nd,
  style: sd,
  property: ud,
  classed: pd,
  text: xd,
  html: Nd,
  raise: Ed,
  lower: Id,
  append: Cd,
  insert: jd,
  remove: Md,
  clone: Td,
  datum: $d,
  on: Hd,
  dispatch: Fd,
  [Symbol.iterator]: Wd
};
function Ve(e) {
  return typeof e == "string" ? new He([[document.querySelector(e)]], [document.documentElement]) : new He([[e]], Ba);
}
function Yd(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Xe(e, t) {
  if (e = Yd(e), t === void 0 && (t = e.currentTarget), t) {
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
const qd = { passive: !1 }, Mn = { capture: !0, passive: !1 };
function Pr(e) {
  e.stopImmediatePropagation();
}
function Bt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Fa(e) {
  var t = e.document.documentElement, n = Ve(e).on("dragstart.drag", Bt, Mn);
  "onselectstart" in t ? n.on("selectstart.drag", Bt, Mn) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Wa(e, t) {
  var n = e.document.documentElement, o = Ve(e).on("dragstart.drag", null);
  t && (o.on("click.drag", Bt, Mn), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const ho = (e) => () => e;
function Gr(e, {
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
Gr.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function Zd(e) {
  return !e.ctrlKey && !e.button;
}
function Kd() {
  return this.parentNode;
}
function Ud(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function Gd() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Xa() {
  var e = Zd, t = Kd, n = Ud, o = Gd, r = {}, i = Zo("start", "drag", "end"), s = 0, c, u, l, f, d = 0;
  function h(v) {
    v.on("mousedown.drag", p).filter(o).on("touchstart.drag", w).on("touchmove.drag", m, qd).on("touchend.drag touchcancel.drag", b).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(v, k) {
    if (!(f || !e.call(this, v, k))) {
      var E = y(this, t.call(this, v, k), v, k, "mouse");
      E && (Ve(v.view).on("mousemove.drag", g, Mn).on("mouseup.drag", x, Mn), Fa(v.view), Pr(v), l = !1, c = v.clientX, u = v.clientY, E("start", v));
    }
  }
  function g(v) {
    if (Bt(v), !l) {
      var k = v.clientX - c, E = v.clientY - u;
      l = k * k + E * E > d;
    }
    r.mouse("drag", v);
  }
  function x(v) {
    Ve(v.view).on("mousemove.drag mouseup.drag", null), Wa(v.view, l), Bt(v), r.mouse("end", v);
  }
  function w(v, k) {
    if (e.call(this, v, k)) {
      var E = v.changedTouches, C = t.call(this, v, k), P = E.length, T, B;
      for (T = 0; T < P; ++T)
        (B = y(this, C, v, k, E[T].identifier, E[T])) && (Pr(v), B("start", v, E[T]));
    }
  }
  function m(v) {
    var k = v.changedTouches, E = k.length, C, P;
    for (C = 0; C < E; ++C)
      (P = r[k[C].identifier]) && (Bt(v), P("drag", v, k[C]));
  }
  function b(v) {
    var k = v.changedTouches, E = k.length, C, P;
    for (f && clearTimeout(f), f = setTimeout(function() {
      f = null;
    }, 500), C = 0; C < E; ++C)
      (P = r[k[C].identifier]) && (Pr(v), P("end", v, k[C]));
  }
  function y(v, k, E, C, P, T) {
    var B = i.copy(), _ = Xe(T || E, k), z, H, N;
    if ((N = n.call(v, new Gr("beforestart", {
      sourceEvent: E,
      target: h,
      identifier: P,
      active: s,
      x: _[0],
      y: _[1],
      dx: 0,
      dy: 0,
      dispatch: B
    }), C)) != null)
      return z = N.x - _[0] || 0, H = N.y - _[1] || 0, function j(I, A, $) {
        var D = _, W;
        switch (I) {
          case "start":
            r[P] = j, W = s++;
            break;
          case "end":
            delete r[P], --s;
          // falls through
          case "drag":
            _ = Xe($ || A, k), W = s;
            break;
        }
        B.call(
          I,
          v,
          new Gr(I, {
            sourceEvent: A,
            subject: N,
            target: h,
            identifier: P,
            active: W,
            x: _[0] + z,
            y: _[1] + H,
            dx: _[0] - D[0],
            dy: _[1] - D[1],
            dispatch: B
          }),
          C
        );
      };
  }
  return h.filter = function(v) {
    return arguments.length ? (e = typeof v == "function" ? v : ho(!!v), h) : e;
  }, h.container = function(v) {
    return arguments.length ? (t = typeof v == "function" ? v : ho(v), h) : t;
  }, h.subject = function(v) {
    return arguments.length ? (n = typeof v == "function" ? v : ho(v), h) : n;
  }, h.touchable = function(v) {
    return arguments.length ? (o = typeof v == "function" ? v : ho(!!v), h) : o;
  }, h.on = function() {
    var v = i.on.apply(i, arguments);
    return v === i ? h : v;
  }, h.clickDistance = function(v) {
    return arguments.length ? (d = (v = +v) * v, h) : Math.sqrt(d);
  }, h;
}
function wi(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Ya(e, t) {
  var n = Object.create(e.prototype);
  for (var o in t) n[o] = t[o];
  return n;
}
function Fn() {
}
var Dn = 0.7, Po = 1 / Dn, Ft = "\\s*([+-]?\\d+)\\s*", Pn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", et = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Jd = /^#([0-9a-f]{3,8})$/, Qd = new RegExp(`^rgb\\(${Ft},${Ft},${Ft}\\)$`), ef = new RegExp(`^rgb\\(${et},${et},${et}\\)$`), tf = new RegExp(`^rgba\\(${Ft},${Ft},${Ft},${Pn}\\)$`), nf = new RegExp(`^rgba\\(${et},${et},${et},${Pn}\\)$`), of = new RegExp(`^hsl\\(${Pn},${et},${et}\\)$`), rf = new RegExp(`^hsla\\(${Pn},${et},${et},${Pn}\\)$`), Ji = {
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
wi(Fn, _t, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Qi,
  // Deprecated! Use color.formatHex.
  formatHex: Qi,
  formatHex8: sf,
  formatHsl: af,
  formatRgb: es,
  toString: es
});
function Qi() {
  return this.rgb().formatHex();
}
function sf() {
  return this.rgb().formatHex8();
}
function af() {
  return qa(this).formatHsl();
}
function es() {
  return this.rgb().formatRgb();
}
function _t(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Jd.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? ts(t) : n === 3 ? new Pe(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? po(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? po(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Qd.exec(e)) ? new Pe(t[1], t[2], t[3], 1) : (t = ef.exec(e)) ? new Pe(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = tf.exec(e)) ? po(t[1], t[2], t[3], t[4]) : (t = nf.exec(e)) ? po(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = of.exec(e)) ? rs(t[1], t[2] / 100, t[3] / 100, 1) : (t = rf.exec(e)) ? rs(t[1], t[2] / 100, t[3] / 100, t[4]) : Ji.hasOwnProperty(e) ? ts(Ji[e]) : e === "transparent" ? new Pe(NaN, NaN, NaN, 0) : null;
}
function ts(e) {
  return new Pe(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function po(e, t, n, o) {
  return o <= 0 && (e = t = n = NaN), new Pe(e, t, n, o);
}
function cf(e) {
  return e instanceof Fn || (e = _t(e)), e ? (e = e.rgb(), new Pe(e.r, e.g, e.b, e.opacity)) : new Pe();
}
function Jr(e, t, n, o) {
  return arguments.length === 1 ? cf(e) : new Pe(e, t, n, o ?? 1);
}
function Pe(e, t, n, o) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +o;
}
wi(Pe, Jr, Ya(Fn, {
  brighter(e) {
    return e = e == null ? Po : Math.pow(Po, e), new Pe(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Dn : Math.pow(Dn, e), new Pe(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Pe(kt(this.r), kt(this.g), kt(this.b), To(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ns,
  // Deprecated! Use color.formatHex.
  formatHex: ns,
  formatHex8: lf,
  formatRgb: os,
  toString: os
}));
function ns() {
  return `#${Et(this.r)}${Et(this.g)}${Et(this.b)}`;
}
function lf() {
  return `#${Et(this.r)}${Et(this.g)}${Et(this.b)}${Et((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function os() {
  const e = To(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${kt(this.r)}, ${kt(this.g)}, ${kt(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function To(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function kt(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Et(e) {
  return e = kt(e), (e < 16 ? "0" : "") + e.toString(16);
}
function rs(e, t, n, o) {
  return o <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ye(e, t, n, o);
}
function qa(e) {
  if (e instanceof Ye) return new Ye(e.h, e.s, e.l, e.opacity);
  if (e instanceof Fn || (e = _t(e)), !e) return new Ye();
  if (e instanceof Ye) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, o = e.b / 255, r = Math.min(t, n, o), i = Math.max(t, n, o), s = NaN, c = i - r, u = (i + r) / 2;
  return c ? (t === i ? s = (n - o) / c + (n < o) * 6 : n === i ? s = (o - t) / c + 2 : s = (t - n) / c + 4, c /= u < 0.5 ? i + r : 2 - i - r, s *= 60) : c = u > 0 && u < 1 ? 0 : s, new Ye(s, c, u, e.opacity);
}
function uf(e, t, n, o) {
  return arguments.length === 1 ? qa(e) : new Ye(e, t, n, o ?? 1);
}
function Ye(e, t, n, o) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +o;
}
wi(Ye, uf, Ya(Fn, {
  brighter(e) {
    return e = e == null ? Po : Math.pow(Po, e), new Ye(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Dn : Math.pow(Dn, e), new Ye(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * t, r = 2 * n - o;
    return new Pe(
      Tr(e >= 240 ? e - 240 : e + 120, r, o),
      Tr(e, r, o),
      Tr(e < 120 ? e + 240 : e - 120, r, o),
      this.opacity
    );
  },
  clamp() {
    return new Ye(is(this.h), go(this.s), go(this.l), To(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = To(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${is(this.h)}, ${go(this.s) * 100}%, ${go(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function is(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function go(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Tr(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const vi = (e) => () => e;
function df(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function ff(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(o) {
    return Math.pow(e + o * t, n);
  };
}
function hf(e) {
  return (e = +e) == 1 ? Za : function(t, n) {
    return n - t ? ff(t, n, e) : vi(isNaN(t) ? n : t);
  };
}
function Za(e, t) {
  var n = t - e;
  return n ? df(e, n) : vi(isNaN(e) ? t : e);
}
const $o = (function e(t) {
  var n = hf(t);
  function o(r, i) {
    var s = n((r = Jr(r)).r, (i = Jr(i)).r), c = n(r.g, i.g), u = n(r.b, i.b), l = Za(r.opacity, i.opacity);
    return function(f) {
      return r.r = s(f), r.g = c(f), r.b = u(f), r.opacity = l(f), r + "";
    };
  }
  return o.gamma = e, o;
})(1);
function pf(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, o = t.slice(), r;
  return function(i) {
    for (r = 0; r < n; ++r) o[r] = e[r] * (1 - i) + t[r] * i;
    return o;
  };
}
function gf(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function yf(e, t) {
  var n = t ? t.length : 0, o = e ? Math.min(n, e.length) : 0, r = new Array(o), i = new Array(n), s;
  for (s = 0; s < o; ++s) r[s] = _n(e[s], t[s]);
  for (; s < n; ++s) i[s] = t[s];
  return function(c) {
    for (s = 0; s < o; ++s) i[s] = r[s](c);
    return i;
  };
}
function mf(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(o) {
    return n.setTime(e * (1 - o) + t * o), n;
  };
}
function Qe(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function xf(e, t) {
  var n = {}, o = {}, r;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (r in t)
    r in e ? n[r] = _n(e[r], t[r]) : o[r] = t[r];
  return function(i) {
    for (r in n) o[r] = n[r](i);
    return o;
  };
}
var Qr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, $r = new RegExp(Qr.source, "g");
function wf(e) {
  return function() {
    return e;
  };
}
function vf(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Ka(e, t) {
  var n = Qr.lastIndex = $r.lastIndex = 0, o, r, i, s = -1, c = [], u = [];
  for (e = e + "", t = t + ""; (o = Qr.exec(e)) && (r = $r.exec(t)); )
    (i = r.index) > n && (i = t.slice(n, i), c[s] ? c[s] += i : c[++s] = i), (o = o[0]) === (r = r[0]) ? c[s] ? c[s] += r : c[++s] = r : (c[++s] = null, u.push({ i: s, x: Qe(o, r) })), n = $r.lastIndex;
  return n < t.length && (i = t.slice(n), c[s] ? c[s] += i : c[++s] = i), c.length < 2 ? u[0] ? vf(u[0].x) : wf(t) : (t = u.length, function(l) {
    for (var f = 0, d; f < t; ++f) c[(d = u[f]).i] = d.x(l);
    return c.join("");
  });
}
function _n(e, t) {
  var n = typeof t, o;
  return t == null || n === "boolean" ? vi(t) : (n === "number" ? Qe : n === "string" ? (o = _t(t)) ? (t = o, $o) : Ka : t instanceof _t ? $o : t instanceof Date ? mf : gf(t) ? pf : Array.isArray(t) ? yf : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? xf : Qe)(e, t);
}
var ss = 180 / Math.PI, ei = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Ua(e, t, n, o, r, i) {
  var s, c, u;
  return (s = Math.sqrt(e * e + t * t)) && (e /= s, t /= s), (u = e * n + t * o) && (n -= e * u, o -= t * u), (c = Math.sqrt(n * n + o * o)) && (n /= c, o /= c, u /= c), e * o < t * n && (e = -e, t = -t, u = -u, s = -s), {
    translateX: r,
    translateY: i,
    rotate: Math.atan2(t, e) * ss,
    skewX: Math.atan(u) * ss,
    scaleX: s,
    scaleY: c
  };
}
var yo;
function bf(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? ei : Ua(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Nf(e) {
  return e == null || (yo || (yo = document.createElementNS("http://www.w3.org/2000/svg", "g")), yo.setAttribute("transform", e), !(e = yo.transform.baseVal.consolidate())) ? ei : (e = e.matrix, Ua(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Ga(e, t, n, o) {
  function r(l) {
    return l.length ? l.pop() + " " : "";
  }
  function i(l, f, d, h, p, g) {
    if (l !== d || f !== h) {
      var x = p.push("translate(", null, t, null, n);
      g.push({ i: x - 4, x: Qe(l, d) }, { i: x - 2, x: Qe(f, h) });
    } else (d || h) && p.push("translate(" + d + t + h + n);
  }
  function s(l, f, d, h) {
    l !== f ? (l - f > 180 ? f += 360 : f - l > 180 && (l += 360), h.push({ i: d.push(r(d) + "rotate(", null, o) - 2, x: Qe(l, f) })) : f && d.push(r(d) + "rotate(" + f + o);
  }
  function c(l, f, d, h) {
    l !== f ? h.push({ i: d.push(r(d) + "skewX(", null, o) - 2, x: Qe(l, f) }) : f && d.push(r(d) + "skewX(" + f + o);
  }
  function u(l, f, d, h, p, g) {
    if (l !== d || f !== h) {
      var x = p.push(r(p) + "scale(", null, ",", null, ")");
      g.push({ i: x - 4, x: Qe(l, d) }, { i: x - 2, x: Qe(f, h) });
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
var Sf = Ga(bf, "px, ", "px)", "deg)"), Ef = Ga(Nf, ", ", ")", ")"), kf = 1e-12;
function as(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function If(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Cf(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const ko = (function e(t, n, o) {
  function r(i, s) {
    var c = i[0], u = i[1], l = i[2], f = s[0], d = s[1], h = s[2], p = f - c, g = d - u, x = p * p + g * g, w, m;
    if (x < kf)
      m = Math.log(h / l) / t, w = function(C) {
        return [
          c + C * p,
          u + C * g,
          l * Math.exp(t * C * m)
        ];
      };
    else {
      var b = Math.sqrt(x), y = (h * h - l * l + o * x) / (2 * l * n * b), v = (h * h - l * l - o * x) / (2 * h * n * b), k = Math.log(Math.sqrt(y * y + 1) - y), E = Math.log(Math.sqrt(v * v + 1) - v);
      m = (E - k) / t, w = function(C) {
        var P = C * m, T = as(k), B = l / (n * b) * (T * Cf(t * P + k) - If(k));
        return [
          c + B * p,
          u + B * g,
          l * T / as(t * P + k)
        ];
      };
    }
    return w.duration = m * 1e3 * t / Math.SQRT2, w;
  }
  return r.rho = function(i) {
    var s = Math.max(1e-3, +i), c = s * s, u = c * c;
    return e(s, c, u);
  }, r;
})(Math.SQRT2, 2, 4);
var Xt = 0, kn = 0, xn = 0, Ja = 1e3, zo, In, Ro = 0, jt = 0, Uo = 0, Tn = typeof performance == "object" && performance.now ? performance : Date, Qa = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function bi() {
  return jt || (Qa(_f), jt = Tn.now() + Uo);
}
function _f() {
  jt = 0;
}
function Lo() {
  this._call = this._time = this._next = null;
}
Lo.prototype = ec.prototype = {
  constructor: Lo,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? bi() : +n) + (t == null ? 0 : +t), !this._next && In !== this && (In ? In._next = this : zo = this, In = this), this._call = e, this._time = n, ti();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ti());
  }
};
function ec(e, t, n) {
  var o = new Lo();
  return o.restart(e, t, n), o;
}
function jf() {
  bi(), ++Xt;
  for (var e = zo, t; e; )
    (t = jt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Xt;
}
function cs() {
  jt = (Ro = Tn.now()) + Uo, Xt = kn = 0;
  try {
    jf();
  } finally {
    Xt = 0, Mf(), jt = 0;
  }
}
function Af() {
  var e = Tn.now(), t = e - Ro;
  t > Ja && (Uo -= t, Ro = e);
}
function Mf() {
  for (var e, t = zo, n, o = 1 / 0; t; )
    t._call ? (o > t._time && (o = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : zo = n);
  In = e, ti(o);
}
function ti(e) {
  if (!Xt) {
    kn && (kn = clearTimeout(kn));
    var t = e - jt;
    t > 24 ? (e < 1 / 0 && (kn = setTimeout(cs, e - Tn.now() - Uo)), xn && (xn = clearInterval(xn))) : (xn || (Ro = Tn.now(), xn = setInterval(Af, Ja)), Xt = 1, Qa(cs));
  }
}
function ls(e, t, n) {
  var o = new Lo();
  return t = t == null ? 0 : +t, o.restart((r) => {
    o.stop(), e(r + t);
  }, t, n), o;
}
var Df = Zo("start", "end", "cancel", "interrupt"), Pf = [], tc = 0, us = 1, ni = 2, Io = 3, ds = 4, oi = 5, Co = 6;
function Go(e, t, n, o, r, i) {
  var s = e.__transition;
  if (!s) e.__transition = {};
  else if (n in s) return;
  Tf(e, n, {
    name: t,
    index: o,
    // For context during callback.
    group: r,
    // For context during callback.
    on: Df,
    tween: Pf,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: tc
  });
}
function Ni(e, t) {
  var n = Ue(e, t);
  if (n.state > tc) throw new Error("too late; already scheduled");
  return n;
}
function tt(e, t) {
  var n = Ue(e, t);
  if (n.state > Io) throw new Error("too late; already running");
  return n;
}
function Ue(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function Tf(e, t, n) {
  var o = e.__transition, r;
  o[t] = n, n.timer = ec(i, 0, n.time);
  function i(l) {
    n.state = us, n.timer.restart(s, n.delay, n.time), n.delay <= l && s(l - n.delay);
  }
  function s(l) {
    var f, d, h, p;
    if (n.state !== us) return u();
    for (f in o)
      if (p = o[f], p.name === n.name) {
        if (p.state === Io) return ls(s);
        p.state === ds ? (p.state = Co, p.timer.stop(), p.on.call("interrupt", e, e.__data__, p.index, p.group), delete o[f]) : +f < t && (p.state = Co, p.timer.stop(), p.on.call("cancel", e, e.__data__, p.index, p.group), delete o[f]);
      }
    if (ls(function() {
      n.state === Io && (n.state = ds, n.timer.restart(c, n.delay, n.time), c(l));
    }), n.state = ni, n.on.call("start", e, e.__data__, n.index, n.group), n.state === ni) {
      for (n.state = Io, r = new Array(h = n.tween.length), f = 0, d = -1; f < h; ++f)
        (p = n.tween[f].value.call(e, e.__data__, n.index, n.group)) && (r[++d] = p);
      r.length = d + 1;
    }
  }
  function c(l) {
    for (var f = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(u), n.state = oi, 1), d = -1, h = r.length; ++d < h; )
      r[d].call(e, f);
    n.state === oi && (n.on.call("end", e, e.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = Co, n.timer.stop(), delete o[t];
    for (var l in o) return;
    delete e.__transition;
  }
}
function _o(e, t) {
  var n = e.__transition, o, r, i = !0, s;
  if (n) {
    t = t == null ? null : t + "";
    for (s in n) {
      if ((o = n[s]).name !== t) {
        i = !1;
        continue;
      }
      r = o.state > ni && o.state < oi, o.state = Co, o.timer.stop(), o.on.call(r ? "interrupt" : "cancel", e, e.__data__, o.index, o.group), delete n[s];
    }
    i && delete e.__transition;
  }
}
function $f(e) {
  return this.each(function() {
    _o(this, e);
  });
}
function zf(e, t) {
  var n, o;
  return function() {
    var r = tt(this, e), i = r.tween;
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
function Rf(e, t, n) {
  var o, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var i = tt(this, e), s = i.tween;
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
function Lf(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var o = Ue(this.node(), n).tween, r = 0, i = o.length, s; r < i; ++r)
      if ((s = o[r]).name === e)
        return s.value;
    return null;
  }
  return this.each((t == null ? zf : Rf)(n, e, t));
}
function Si(e, t, n) {
  var o = e._id;
  return e.each(function() {
    var r = tt(this, o);
    (r.value || (r.value = {}))[t] = n.apply(this, arguments);
  }), function(r) {
    return Ue(r, o).value[t];
  };
}
function nc(e, t) {
  var n;
  return (typeof t == "number" ? Qe : t instanceof _t ? $o : (n = _t(t)) ? (t = n, $o) : Ka)(e, t);
}
function Vf(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Hf(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Of(e, t, n) {
  var o, r = n + "", i;
  return function() {
    var s = this.getAttribute(e);
    return s === r ? null : s === o ? i : i = t(o = s, n);
  };
}
function Bf(e, t, n) {
  var o, r = n + "", i;
  return function() {
    var s = this.getAttributeNS(e.space, e.local);
    return s === r ? null : s === o ? i : i = t(o = s, n);
  };
}
function Ff(e, t, n) {
  var o, r, i;
  return function() {
    var s, c = n(this), u;
    return c == null ? void this.removeAttribute(e) : (s = this.getAttribute(e), u = c + "", s === u ? null : s === o && u === r ? i : (r = u, i = t(o = s, c)));
  };
}
function Wf(e, t, n) {
  var o, r, i;
  return function() {
    var s, c = n(this), u;
    return c == null ? void this.removeAttributeNS(e.space, e.local) : (s = this.getAttributeNS(e.space, e.local), u = c + "", s === u ? null : s === o && u === r ? i : (r = u, i = t(o = s, c)));
  };
}
function Xf(e, t) {
  var n = Ko(e), o = n === "transform" ? Ef : nc;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Wf : Ff)(n, o, Si(this, "attr." + e, t)) : t == null ? (n.local ? Hf : Vf)(n) : (n.local ? Bf : Of)(n, o, t));
}
function Yf(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function qf(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function Zf(e, t) {
  var n, o;
  function r() {
    var i = t.apply(this, arguments);
    return i !== o && (n = (o = i) && qf(e, i)), n;
  }
  return r._value = t, r;
}
function Kf(e, t) {
  var n, o;
  function r() {
    var i = t.apply(this, arguments);
    return i !== o && (n = (o = i) && Yf(e, i)), n;
  }
  return r._value = t, r;
}
function Uf(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var o = Ko(e);
  return this.tween(n, (o.local ? Zf : Kf)(o, t));
}
function Gf(e, t) {
  return function() {
    Ni(this, e).delay = +t.apply(this, arguments);
  };
}
function Jf(e, t) {
  return t = +t, function() {
    Ni(this, e).delay = t;
  };
}
function Qf(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Gf : Jf)(t, e)) : Ue(this.node(), t).delay;
}
function eh(e, t) {
  return function() {
    tt(this, e).duration = +t.apply(this, arguments);
  };
}
function th(e, t) {
  return t = +t, function() {
    tt(this, e).duration = t;
  };
}
function nh(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? eh : th)(t, e)) : Ue(this.node(), t).duration;
}
function oh(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    tt(this, e).ease = t;
  };
}
function rh(e) {
  var t = this._id;
  return arguments.length ? this.each(oh(t, e)) : Ue(this.node(), t).ease;
}
function ih(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    tt(this, e).ease = n;
  };
}
function sh(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ih(this._id, e));
}
function ah(e) {
  typeof e != "function" && (e = Pa(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var i = t[r], s = i.length, c = o[r] = [], u, l = 0; l < s; ++l)
      (u = i[l]) && e.call(u, u.__data__, l, i) && c.push(u);
  return new st(o, this._parents, this._name, this._id);
}
function ch(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, o = t.length, r = n.length, i = Math.min(o, r), s = new Array(o), c = 0; c < i; ++c)
    for (var u = t[c], l = n[c], f = u.length, d = s[c] = new Array(f), h, p = 0; p < f; ++p)
      (h = u[p] || l[p]) && (d[p] = h);
  for (; c < o; ++c)
    s[c] = t[c];
  return new st(s, this._parents, this._name, this._id);
}
function lh(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function uh(e, t, n) {
  var o, r, i = lh(t) ? Ni : tt;
  return function() {
    var s = i(this, e), c = s.on;
    c !== o && (r = (o = c).copy()).on(t, n), s.on = r;
  };
}
function dh(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Ue(this.node(), n).on.on(e) : this.each(uh(n, e, t));
}
function fh(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function hh() {
  return this.on("end.remove", fh(this._id));
}
function ph(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = mi(e));
  for (var o = this._groups, r = o.length, i = new Array(r), s = 0; s < r; ++s)
    for (var c = o[s], u = c.length, l = i[s] = new Array(u), f, d, h = 0; h < u; ++h)
      (f = c[h]) && (d = e.call(f, f.__data__, h, c)) && ("__data__" in f && (d.__data__ = f.__data__), l[h] = d, Go(l[h], t, n, h, l, Ue(f, n)));
  return new st(i, this._parents, t, n);
}
function gh(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Da(e));
  for (var o = this._groups, r = o.length, i = [], s = [], c = 0; c < r; ++c)
    for (var u = o[c], l = u.length, f, d = 0; d < l; ++d)
      if (f = u[d]) {
        for (var h = e.call(f, f.__data__, d, u), p, g = Ue(f, n), x = 0, w = h.length; x < w; ++x)
          (p = h[x]) && Go(p, t, n, x, h, g);
        i.push(h), s.push(f);
      }
  return new st(i, s, t, n);
}
var yh = Bn.prototype.constructor;
function mh() {
  return new yh(this._groups, this._parents);
}
function xh(e, t) {
  var n, o, r;
  return function() {
    var i = Wt(this, e), s = (this.style.removeProperty(e), Wt(this, e));
    return i === s ? null : i === n && s === o ? r : r = t(n = i, o = s);
  };
}
function oc(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function wh(e, t, n) {
  var o, r = n + "", i;
  return function() {
    var s = Wt(this, e);
    return s === r ? null : s === o ? i : i = t(o = s, n);
  };
}
function vh(e, t, n) {
  var o, r, i;
  return function() {
    var s = Wt(this, e), c = n(this), u = c + "";
    return c == null && (u = c = (this.style.removeProperty(e), Wt(this, e))), s === u ? null : s === o && u === r ? i : (r = u, i = t(o = s, c));
  };
}
function bh(e, t) {
  var n, o, r, i = "style." + t, s = "end." + i, c;
  return function() {
    var u = tt(this, e), l = u.on, f = u.value[i] == null ? c || (c = oc(t)) : void 0;
    (l !== n || r !== f) && (o = (n = l).copy()).on(s, r = f), u.on = o;
  };
}
function Nh(e, t, n) {
  var o = (e += "") == "transform" ? Sf : nc;
  return t == null ? this.styleTween(e, xh(e, o)).on("end.style." + e, oc(e)) : typeof t == "function" ? this.styleTween(e, vh(e, o, Si(this, "style." + e, t))).each(bh(this._id, e)) : this.styleTween(e, wh(e, o, t), n).on("end.style." + e, null);
}
function Sh(e, t, n) {
  return function(o) {
    this.style.setProperty(e, t.call(this, o), n);
  };
}
function Eh(e, t, n) {
  var o, r;
  function i() {
    var s = t.apply(this, arguments);
    return s !== r && (o = (r = s) && Sh(e, s, n)), o;
  }
  return i._value = t, i;
}
function kh(e, t, n) {
  var o = "style." + (e += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (t == null) return this.tween(o, null);
  if (typeof t != "function") throw new Error();
  return this.tween(o, Eh(e, t, n ?? ""));
}
function Ih(e) {
  return function() {
    this.textContent = e;
  };
}
function Ch(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function _h(e) {
  return this.tween("text", typeof e == "function" ? Ch(Si(this, "text", e)) : Ih(e == null ? "" : e + ""));
}
function jh(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Ah(e) {
  var t, n;
  function o() {
    var r = e.apply(this, arguments);
    return r !== n && (t = (n = r) && jh(r)), t;
  }
  return o._value = e, o;
}
function Mh(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Ah(e));
}
function Dh() {
  for (var e = this._name, t = this._id, n = rc(), o = this._groups, r = o.length, i = 0; i < r; ++i)
    for (var s = o[i], c = s.length, u, l = 0; l < c; ++l)
      if (u = s[l]) {
        var f = Ue(u, t);
        Go(u, e, n, l, s, {
          time: f.time + f.delay + f.duration,
          delay: 0,
          duration: f.duration,
          ease: f.ease
        });
      }
  return new st(o, this._parents, e, n);
}
function Ph() {
  var e, t, n = this, o = n._id, r = n.size();
  return new Promise(function(i, s) {
    var c = { value: s }, u = { value: function() {
      --r === 0 && i();
    } };
    n.each(function() {
      var l = tt(this, o), f = l.on;
      f !== e && (t = (e = f).copy(), t._.cancel.push(c), t._.interrupt.push(c), t._.end.push(u)), l.on = t;
    }), r === 0 && i();
  });
}
var Th = 0;
function st(e, t, n, o) {
  this._groups = e, this._parents = t, this._name = n, this._id = o;
}
function rc() {
  return ++Th;
}
var ot = Bn.prototype;
st.prototype = {
  constructor: st,
  select: ph,
  selectAll: gh,
  selectChild: ot.selectChild,
  selectChildren: ot.selectChildren,
  filter: ah,
  merge: ch,
  selection: mh,
  transition: Dh,
  call: ot.call,
  nodes: ot.nodes,
  node: ot.node,
  size: ot.size,
  empty: ot.empty,
  each: ot.each,
  on: dh,
  attr: Xf,
  attrTween: Uf,
  style: Nh,
  styleTween: kh,
  text: _h,
  textTween: Mh,
  remove: hh,
  tween: Lf,
  delay: Qf,
  duration: nh,
  ease: rh,
  easeVarying: sh,
  end: Ph,
  [Symbol.iterator]: ot[Symbol.iterator]
};
function $h(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var zh = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: $h
};
function Rh(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Lh(e) {
  var t, n;
  e instanceof st ? (t = e._id, e = e._name) : (t = rc(), (n = zh).time = bi(), e = e == null ? null : e + "");
  for (var o = this._groups, r = o.length, i = 0; i < r; ++i)
    for (var s = o[i], c = s.length, u, l = 0; l < c; ++l)
      (u = s[l]) && Go(u, e, t, l, s, n || Rh(u, t));
  return new st(o, this._parents, e, t);
}
Bn.prototype.interrupt = $f;
Bn.prototype.transition = Lh;
const mo = (e) => () => e;
function Vh(e, {
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
function rt(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
rt.prototype = {
  constructor: rt,
  scale: function(e) {
    return e === 1 ? this : new rt(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new rt(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Jo = new rt(1, 0, 0);
ic.prototype = rt.prototype;
function ic(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return Jo;
  return e.__zoom;
}
function zr(e) {
  e.stopImmediatePropagation();
}
function wn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Hh(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Oh() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function fs() {
  return this.__zoom || Jo;
}
function Bh(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Fh() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Wh(e, t, n) {
  var o = e.invertX(t[0][0]) - n[0][0], r = e.invertX(t[1][0]) - n[1][0], i = e.invertY(t[0][1]) - n[0][1], s = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r),
    s > i ? (i + s) / 2 : Math.min(0, i) || Math.max(0, s)
  );
}
function sc() {
  var e = Hh, t = Oh, n = Wh, o = Bh, r = Fh, i = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], c = 250, u = ko, l = Zo("start", "zoom", "end"), f, d, h, p = 500, g = 150, x = 0, w = 10;
  function m(N) {
    N.property("__zoom", fs).on("wheel.zoom", P, { passive: !1 }).on("mousedown.zoom", T).on("dblclick.zoom", B).filter(r).on("touchstart.zoom", _).on("touchmove.zoom", z).on("touchend.zoom touchcancel.zoom", H).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  m.transform = function(N, j, I, A) {
    var $ = N.selection ? N.selection() : N;
    $.property("__zoom", fs), N !== $ ? k(N, j, I, A) : $.interrupt().each(function() {
      E(this, arguments).event(A).start().zoom(null, typeof j == "function" ? j.apply(this, arguments) : j).end();
    });
  }, m.scaleBy = function(N, j, I, A) {
    m.scaleTo(N, function() {
      var $ = this.__zoom.k, D = typeof j == "function" ? j.apply(this, arguments) : j;
      return $ * D;
    }, I, A);
  }, m.scaleTo = function(N, j, I, A) {
    m.transform(N, function() {
      var $ = t.apply(this, arguments), D = this.__zoom, W = I == null ? v($) : typeof I == "function" ? I.apply(this, arguments) : I, O = D.invert(W), F = typeof j == "function" ? j.apply(this, arguments) : j;
      return n(y(b(D, F), W, O), $, s);
    }, I, A);
  }, m.translateBy = function(N, j, I, A) {
    m.transform(N, function() {
      return n(this.__zoom.translate(
        typeof j == "function" ? j.apply(this, arguments) : j,
        typeof I == "function" ? I.apply(this, arguments) : I
      ), t.apply(this, arguments), s);
    }, null, A);
  }, m.translateTo = function(N, j, I, A, $) {
    m.transform(N, function() {
      var D = t.apply(this, arguments), W = this.__zoom, O = A == null ? v(D) : typeof A == "function" ? A.apply(this, arguments) : A;
      return n(Jo.translate(O[0], O[1]).scale(W.k).translate(
        typeof j == "function" ? -j.apply(this, arguments) : -j,
        typeof I == "function" ? -I.apply(this, arguments) : -I
      ), D, s);
    }, A, $);
  };
  function b(N, j) {
    return j = Math.max(i[0], Math.min(i[1], j)), j === N.k ? N : new rt(j, N.x, N.y);
  }
  function y(N, j, I) {
    var A = j[0] - I[0] * N.k, $ = j[1] - I[1] * N.k;
    return A === N.x && $ === N.y ? N : new rt(N.k, A, $);
  }
  function v(N) {
    return [(+N[0][0] + +N[1][0]) / 2, (+N[0][1] + +N[1][1]) / 2];
  }
  function k(N, j, I, A) {
    N.on("start.zoom", function() {
      E(this, arguments).event(A).start();
    }).on("interrupt.zoom end.zoom", function() {
      E(this, arguments).event(A).end();
    }).tween("zoom", function() {
      var $ = this, D = arguments, W = E($, D).event(A), O = t.apply($, D), F = I == null ? v(O) : typeof I == "function" ? I.apply($, D) : I, U = Math.max(O[1][0] - O[0][0], O[1][1] - O[0][1]), Z = $.__zoom, ne = typeof j == "function" ? j.apply($, D) : j, ce = u(Z.invert(F).concat(U / Z.k), ne.invert(F).concat(U / ne.k));
      return function(J) {
        if (J === 1) J = ne;
        else {
          var R = ce(J), q = U / R[2];
          J = new rt(q, F[0] - R[0] * q, F[1] - R[1] * q);
        }
        W.zoom(null, J);
      };
    });
  }
  function E(N, j, I) {
    return !I && N.__zooming || new C(N, j);
  }
  function C(N, j) {
    this.that = N, this.args = j, this.active = 0, this.sourceEvent = null, this.extent = t.apply(N, j), this.taps = 0;
  }
  C.prototype = {
    event: function(N) {
      return N && (this.sourceEvent = N), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(N, j) {
      return this.mouse && N !== "mouse" && (this.mouse[1] = j.invert(this.mouse[0])), this.touch0 && N !== "touch" && (this.touch0[1] = j.invert(this.touch0[0])), this.touch1 && N !== "touch" && (this.touch1[1] = j.invert(this.touch1[0])), this.that.__zoom = j, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(N) {
      var j = Ve(this.that).datum();
      l.call(
        N,
        this.that,
        new Vh(N, {
          sourceEvent: this.sourceEvent,
          target: m,
          transform: this.that.__zoom,
          dispatch: l
        }),
        j
      );
    }
  };
  function P(N, ...j) {
    if (!e.apply(this, arguments)) return;
    var I = E(this, j).event(N), A = this.__zoom, $ = Math.max(i[0], Math.min(i[1], A.k * Math.pow(2, o.apply(this, arguments)))), D = Xe(N);
    if (I.wheel)
      (I.mouse[0][0] !== D[0] || I.mouse[0][1] !== D[1]) && (I.mouse[1] = A.invert(I.mouse[0] = D)), clearTimeout(I.wheel);
    else {
      if (A.k === $) return;
      I.mouse = [D, A.invert(D)], _o(this), I.start();
    }
    wn(N), I.wheel = setTimeout(W, g), I.zoom("mouse", n(y(b(A, $), I.mouse[0], I.mouse[1]), I.extent, s));
    function W() {
      I.wheel = null, I.end();
    }
  }
  function T(N, ...j) {
    if (h || !e.apply(this, arguments)) return;
    var I = N.currentTarget, A = E(this, j, !0).event(N), $ = Ve(N.view).on("mousemove.zoom", F, !0).on("mouseup.zoom", U, !0), D = Xe(N, I), W = N.clientX, O = N.clientY;
    Fa(N.view), zr(N), A.mouse = [D, this.__zoom.invert(D)], _o(this), A.start();
    function F(Z) {
      if (wn(Z), !A.moved) {
        var ne = Z.clientX - W, ce = Z.clientY - O;
        A.moved = ne * ne + ce * ce > x;
      }
      A.event(Z).zoom("mouse", n(y(A.that.__zoom, A.mouse[0] = Xe(Z, I), A.mouse[1]), A.extent, s));
    }
    function U(Z) {
      $.on("mousemove.zoom mouseup.zoom", null), Wa(Z.view, A.moved), wn(Z), A.event(Z).end();
    }
  }
  function B(N, ...j) {
    if (e.apply(this, arguments)) {
      var I = this.__zoom, A = Xe(N.changedTouches ? N.changedTouches[0] : N, this), $ = I.invert(A), D = I.k * (N.shiftKey ? 0.5 : 2), W = n(y(b(I, D), A, $), t.apply(this, j), s);
      wn(N), c > 0 ? Ve(this).transition().duration(c).call(k, W, A, N) : Ve(this).call(m.transform, W, A, N);
    }
  }
  function _(N, ...j) {
    if (e.apply(this, arguments)) {
      var I = N.touches, A = I.length, $ = E(this, j, N.changedTouches.length === A).event(N), D, W, O, F;
      for (zr(N), W = 0; W < A; ++W)
        O = I[W], F = Xe(O, this), F = [F, this.__zoom.invert(F), O.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== F[2] && ($.touch1 = F, $.taps = 0) : ($.touch0 = F, D = !0, $.taps = 1 + !!f);
      f && (f = clearTimeout(f)), D && ($.taps < 2 && (d = F[0], f = setTimeout(function() {
        f = null;
      }, p)), _o(this), $.start());
    }
  }
  function z(N, ...j) {
    if (this.__zooming) {
      var I = E(this, j).event(N), A = N.changedTouches, $ = A.length, D, W, O, F;
      for (wn(N), D = 0; D < $; ++D)
        W = A[D], O = Xe(W, this), I.touch0 && I.touch0[2] === W.identifier ? I.touch0[0] = O : I.touch1 && I.touch1[2] === W.identifier && (I.touch1[0] = O);
      if (W = I.that.__zoom, I.touch1) {
        var U = I.touch0[0], Z = I.touch0[1], ne = I.touch1[0], ce = I.touch1[1], J = (J = ne[0] - U[0]) * J + (J = ne[1] - U[1]) * J, R = (R = ce[0] - Z[0]) * R + (R = ce[1] - Z[1]) * R;
        W = b(W, Math.sqrt(J / R)), O = [(U[0] + ne[0]) / 2, (U[1] + ne[1]) / 2], F = [(Z[0] + ce[0]) / 2, (Z[1] + ce[1]) / 2];
      } else if (I.touch0) O = I.touch0[0], F = I.touch0[1];
      else return;
      I.zoom("touch", n(y(W, O, F), I.extent, s));
    }
  }
  function H(N, ...j) {
    if (this.__zooming) {
      var I = E(this, j).event(N), A = N.changedTouches, $ = A.length, D, W;
      for (zr(N), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, p), D = 0; D < $; ++D)
        W = A[D], I.touch0 && I.touch0[2] === W.identifier ? delete I.touch0 : I.touch1 && I.touch1[2] === W.identifier && delete I.touch1;
      if (I.touch1 && !I.touch0 && (I.touch0 = I.touch1, delete I.touch1), I.touch0) I.touch0[1] = this.__zoom.invert(I.touch0[0]);
      else if (I.end(), I.taps === 2 && (W = Xe(W, this), Math.hypot(d[0] - W[0], d[1] - W[1]) < w)) {
        var O = Ve(this).on("dblclick.zoom");
        O && O.apply(this, arguments);
      }
    }
  }
  return m.wheelDelta = function(N) {
    return arguments.length ? (o = typeof N == "function" ? N : mo(+N), m) : o;
  }, m.filter = function(N) {
    return arguments.length ? (e = typeof N == "function" ? N : mo(!!N), m) : e;
  }, m.touchable = function(N) {
    return arguments.length ? (r = typeof N == "function" ? N : mo(!!N), m) : r;
  }, m.extent = function(N) {
    return arguments.length ? (t = typeof N == "function" ? N : mo([[+N[0][0], +N[0][1]], [+N[1][0], +N[1][1]]]), m) : t;
  }, m.scaleExtent = function(N) {
    return arguments.length ? (i[0] = +N[0], i[1] = +N[1], m) : [i[0], i[1]];
  }, m.translateExtent = function(N) {
    return arguments.length ? (s[0][0] = +N[0][0], s[1][0] = +N[1][0], s[0][1] = +N[0][1], s[1][1] = +N[1][1], m) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, m.constrain = function(N) {
    return arguments.length ? (n = N, m) : n;
  }, m.duration = function(N) {
    return arguments.length ? (c = +N, m) : c;
  }, m.interpolate = function(N) {
    return arguments.length ? (u = N, m) : u;
  }, m.on = function() {
    var N = l.on.apply(l, arguments);
    return N === l ? m : N;
  }, m.clickDistance = function(N) {
    return arguments.length ? (x = (N = +N) * N, m) : Math.sqrt(x);
  }, m.tapDistance = function(N) {
    return arguments.length ? (w = +N, m) : w;
  }, m;
}
const Oe = {
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
}, $n = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], ac = ["Enter", " ", "Escape"], cc = {
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
var Yt;
(function(e) {
  e.Strict = "strict", e.Loose = "loose";
})(Yt || (Yt = {}));
var It;
(function(e) {
  e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(It || (It = {}));
var zn;
(function(e) {
  e.Partial = "partial", e.Full = "full";
})(zn || (zn = {}));
const lc = {
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
var pt;
(function(e) {
  e.Bezier = "default", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e.SimpleBezier = "simplebezier";
})(pt || (pt = {}));
var Vo;
(function(e) {
  e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(Vo || (Vo = {}));
var te;
(function(e) {
  e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(te || (te = {}));
const hs = {
  [te.Left]: te.Right,
  [te.Right]: te.Left,
  [te.Top]: te.Bottom,
  [te.Bottom]: te.Top
};
function uc(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const dc = (e) => "id" in e && "source" in e && "target" in e, Xh = (e) => "id" in e && "position" in e && !("source" in e) && !("target" in e), Ei = (e) => "id" in e && "internals" in e && !("source" in e) && !("target" in e), Wn = (e, t = [0, 0]) => {
  const { width: n, height: o } = ct(e), r = e.origin ?? t, i = n * r[0], s = o * r[1];
  return {
    x: e.position.x - i,
    y: e.position.y - s
  };
}, Yh = (e, t = { nodeOrigin: [0, 0] }) => {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const n = e.reduce((o, r) => {
    const i = typeof r == "string";
    let s = !t.nodeLookup && !i ? r : void 0;
    t.nodeLookup && (s = i ? t.nodeLookup.get(r) : Ei(r) ? r : t.nodeLookup.get(r.id));
    const c = s ? Ho(s, t.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return Qo(o, c);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return er(n);
}, Xn = (e, t = {}) => {
  let n = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, o = !1;
  return e.forEach((r) => {
    (t.filter === void 0 || t.filter(r)) && (n = Qo(n, Ho(r)), o = !0);
  }), o ? er(n) : { x: 0, y: 0, width: 0, height: 0 };
}, ki = (e, t, [n, o, r] = [0, 0, 1], i = !1, s = !1) => {
  const c = {
    ...Qt(t, [n, o, r]),
    width: t.width / r,
    height: t.height / r
  }, u = [];
  for (const l of e.values()) {
    const { measured: f, selectable: d = !0, hidden: h = !1 } = l;
    if (s && !d || h)
      continue;
    const p = f.width ?? l.width ?? l.initialWidth ?? null, g = f.height ?? l.height ?? l.initialHeight ?? null, x = Rn(c, Zt(l)), w = (p ?? 0) * (g ?? 0), m = i && x > 0;
    (!l.internals.handleBounds || m || x >= w || l.dragging) && u.push(l);
  }
  return u;
}, qh = (e, t) => {
  const n = /* @__PURE__ */ new Set();
  return e.forEach((o) => {
    n.add(o.id);
  }), t.filter((o) => n.has(o.source) || n.has(o.target));
};
function Zh(e, t) {
  const n = /* @__PURE__ */ new Map(), o = t?.nodes ? new Set(t.nodes.map((r) => r.id)) : null;
  return e.forEach((r) => {
    r.measured.width && r.measured.height && (t?.includeHiddenNodes || !r.hidden) && (!o || o.has(r.id)) && n.set(r.id, r);
  }), n;
}
async function Kh({ nodes: e, width: t, height: n, panZoom: o, minZoom: r, maxZoom: i }, s) {
  if (e.size === 0)
    return !0;
  const c = Zh(e, s), u = Xn(c), l = Ci(u, t, n, s?.minZoom ?? r, s?.maxZoom ?? i, s?.padding ?? 0.1);
  return await o.setViewport(l, {
    duration: s?.duration,
    ease: s?.ease,
    interpolate: s?.interpolate
  }), !0;
}
function fc({ nodeId: e, nextPosition: t, nodeLookup: n, nodeOrigin: o = [0, 0], nodeExtent: r, onError: i }) {
  const s = n.get(e), c = s.parentId ? n.get(s.parentId) : void 0, { x: u, y: l } = c ? c.internals.positionAbsolute : { x: 0, y: 0 }, f = s.origin ?? o;
  let d = s.extent || r;
  if (s.extent === "parent" && !s.expandParent)
    if (!c)
      i?.("005", Oe.error005());
    else {
      const p = c.measured.width, g = c.measured.height;
      p && g && (d = [
        [u, l],
        [u + p, l + g]
      ]);
    }
  else c && Mt(s.extent) && (d = [
    [s.extent[0][0] + u, s.extent[0][1] + l],
    [s.extent[1][0] + u, s.extent[1][1] + l]
  ]);
  const h = Mt(d) ? At(t, d, s.measured) : t;
  return (s.measured.width === void 0 || s.measured.height === void 0) && i?.("015", Oe.error015()), {
    position: {
      x: h.x - u + (s.measured.width ?? 0) * f[0],
      y: h.y - l + (s.measured.height ?? 0) * f[1]
    },
    positionAbsolute: h
  };
}
async function Uh({ nodesToRemove: e = [], edgesToRemove: t = [], nodes: n, edges: o, onBeforeDelete: r }) {
  const i = new Set(e.map((h) => h.id)), s = [];
  for (const h of n) {
    if (h.deletable === !1)
      continue;
    const p = i.has(h.id), g = !p && h.parentId && s.find((x) => x.id === h.parentId);
    (p || g) && s.push(h);
  }
  const c = new Set(t.map((h) => h.id)), u = o.filter((h) => h.deletable !== !1), f = qh(s, u);
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
const qt = (e, t = 0, n = 1) => Math.min(Math.max(e, t), n), At = (e = { x: 0, y: 0 }, t, n) => ({
  x: qt(e.x, t[0][0], t[1][0] - (n?.width ?? 0)),
  y: qt(e.y, t[0][1], t[1][1] - (n?.height ?? 0))
});
function hc(e, t, n) {
  const { width: o, height: r } = ct(n), { x: i, y: s } = n.internals.positionAbsolute;
  return At(e, [
    [i, s],
    [i + o, s + r]
  ], t);
}
const ps = (e, t, n) => e < t ? qt(Math.abs(e - t), 1, t) / t : e > n ? -qt(Math.abs(e - n), 1, t) / t : 0, Ii = (e, t, n = 15, o = 40) => {
  const r = ps(e.x, o, t.width - o) * n, i = ps(e.y, o, t.height - o) * n;
  return [r, i];
}, Qo = (e, t) => ({
  x: Math.min(e.x, t.x),
  y: Math.min(e.y, t.y),
  x2: Math.max(e.x2, t.x2),
  y2: Math.max(e.y2, t.y2)
}), ri = ({ x: e, y: t, width: n, height: o }) => ({
  x: e,
  y: t,
  x2: e + n,
  y2: t + o
}), er = ({ x: e, y: t, x2: n, y2: o }) => ({
  x: e,
  y: t,
  width: n - e,
  height: o - t
}), Zt = (e, t = [0, 0]) => {
  const { x: n, y: o } = Ei(e) ? e.internals.positionAbsolute : Wn(e, t);
  return {
    x: n,
    y: o,
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}, Ho = (e, t = [0, 0]) => {
  const { x: n, y: o } = Ei(e) ? e.internals.positionAbsolute : Wn(e, t);
  return {
    x: n,
    y: o,
    x2: n + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
    y2: o + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
  };
}, pc = (e, t) => er(Qo(ri(e), ri(t))), Rn = (e, t) => {
  const n = Math.max(0, Math.min(e.x + e.width, t.x + t.width) - Math.max(e.x, t.x)), o = Math.max(0, Math.min(e.y + e.height, t.y + t.height) - Math.max(e.y, t.y));
  return Math.ceil(n * o);
}, gs = (e) => qe(e.width) && qe(e.height) && qe(e.x) && qe(e.y), qe = (e) => !isNaN(e) && isFinite(e), gc = (e, t) => (n, o) => {
}, Yn = (e, t = [1, 1]) => ({
  x: t[0] * Math.round(e.x / t[0]),
  y: t[1] * Math.round(e.y / t[1])
}), Qt = ({ x: e, y: t }, [n, o, r], i = !1, s = [1, 1]) => {
  const c = {
    x: (e - n) / r,
    y: (t - o) / r
  };
  return i ? Yn(c, s) : c;
}, Kt = ({ x: e, y: t }, [n, o, r]) => ({
  x: e * r + n,
  y: t * r + o
});
function Lt(e, t) {
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
function Gh(e, t, n) {
  if (typeof e == "string" || typeof e == "number") {
    const o = Lt(e, n), r = Lt(e, t);
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
    const o = Lt(e.top ?? e.y ?? 0, n), r = Lt(e.bottom ?? e.y ?? 0, n), i = Lt(e.left ?? e.x ?? 0, t), s = Lt(e.right ?? e.x ?? 0, t);
    return { top: o, right: s, bottom: r, left: i, x: i + s, y: o + r };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function Jh(e, t, n, o, r, i) {
  const { x: s, y: c } = Kt(e, [t, n, o]), { x: u, y: l } = Kt({ x: e.x + e.width, y: e.y + e.height }, [t, n, o]), f = r - u, d = i - l;
  return {
    left: Math.floor(s),
    top: Math.floor(c),
    right: Math.floor(f),
    bottom: Math.floor(d)
  };
}
const Ci = (e, t, n, o, r, i) => {
  const s = Gh(i, t, n), c = (t - s.x) / e.width, u = (n - s.y) / e.height, l = Math.min(c, u), f = qt(l, o, r), d = e.x + e.width / 2, h = e.y + e.height / 2, p = t / 2 - d * f, g = n / 2 - h * f, x = Jh(e, p, g, f, t, n), w = {
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
}, Ln = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Mt(e) {
  return e != null && e !== "parent";
}
function ct(e) {
  return {
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}
function yc(e) {
  return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function mc(e, t = { width: 0, height: 0 }, n, o, r) {
  const i = { ...e }, s = o.get(n);
  if (s) {
    const c = s.origin || r;
    i.x += s.internals.positionAbsolute.x - (t.width ?? 0) * c[0], i.y += s.internals.positionAbsolute.y - (t.height ?? 0) * c[1];
  }
  return i;
}
function ys(e, t) {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
}
function Qh() {
  let e, t;
  return { promise: new Promise((o, r) => {
    e = o, t = r;
  }), resolve: e, reject: t };
}
function ep(e) {
  return { ...cc, ...e || {} };
}
function jn(e, { snapGrid: t = [0, 0], snapToGrid: n = !1, transform: o, containerBounds: r }) {
  const { x: i, y: s } = Ze(e), c = Qt({ x: i - (r?.left ?? 0), y: s - (r?.top ?? 0) }, o), { x: u, y: l } = n ? Yn(c, t) : c;
  return {
    xSnapped: u,
    ySnapped: l,
    ...c
  };
}
const _i = (e) => ({
  width: e.offsetWidth,
  height: e.offsetHeight
}), xc = (e) => e?.getRootNode?.() || window?.document, tp = ["INPUT", "SELECT", "TEXTAREA"];
function wc(e) {
  const t = e.composedPath?.()?.[0] || e.target;
  return t?.nodeType !== 1 ? !1 : tp.includes(t.nodeName) || t.hasAttribute("contenteditable") || !!t.closest(".nokey");
}
const vc = (e) => "clientX" in e, Ze = (e, t) => {
  const n = vc(e), o = n ? e.clientX : e.touches?.[0].clientX, r = n ? e.clientY : e.touches?.[0].clientY;
  return {
    x: o - (t?.left ?? 0),
    y: r - (t?.top ?? 0)
  };
}, ms = (e, t, n, o, r) => {
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
      ..._i(s)
    };
  });
};
function bc({ sourceX: e, sourceY: t, targetX: n, targetY: o, sourceControlX: r, sourceControlY: i, targetControlX: s, targetControlY: c }) {
  const u = e * 0.125 + r * 0.375 + s * 0.375 + n * 0.125, l = t * 0.125 + i * 0.375 + c * 0.375 + o * 0.125, f = Math.abs(u - e), d = Math.abs(l - t);
  return [u, l, f, d];
}
function xo(e, t) {
  return e >= 0 ? 0.5 * e : t * 25 * Math.sqrt(-e);
}
function xs({ pos: e, x1: t, y1: n, x2: o, y2: r, c: i }) {
  switch (e) {
    case te.Left:
      return [t - xo(t - o, i), n];
    case te.Right:
      return [t + xo(o - t, i), n];
    case te.Top:
      return [t, n - xo(n - r, i)];
    case te.Bottom:
      return [t, n + xo(r - n, i)];
  }
}
function Nc({ sourceX: e, sourceY: t, sourcePosition: n = te.Bottom, targetX: o, targetY: r, targetPosition: i = te.Top, curvature: s = 0.25 }) {
  const [c, u] = xs({
    pos: n,
    x1: e,
    y1: t,
    x2: o,
    y2: r,
    c: s
  }), [l, f] = xs({
    pos: i,
    x1: o,
    y1: r,
    x2: e,
    y2: t,
    c: s
  }), [d, h, p, g] = bc({
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
function Sc({ sourceX: e, sourceY: t, targetX: n, targetY: o }) {
  const r = Math.abs(n - e) / 2, i = n < e ? n + r : n - r, s = Math.abs(o - t) / 2, c = o < t ? o + s : o - s;
  return [i, c, r, s];
}
function np({ sourceNode: e, targetNode: t, selected: n = !1, zIndex: o = 0, elevateOnSelect: r = !1, zIndexMode: i = "basic" }) {
  if (i === "manual")
    return o;
  const s = r && n ? o + 1e3 : o, c = Math.max(e.parentId || r && e.selected ? e.internals.z : 0, t.parentId || r && t.selected ? t.internals.z : 0);
  return s + c;
}
function op({ sourceNode: e, targetNode: t, width: n, height: o, transform: r }) {
  const i = Qo(Ho(e), Ho(t));
  i.x === i.x2 && (i.x2 += 1), i.y === i.y2 && (i.y2 += 1);
  const s = {
    x: -r[0] / r[2],
    y: -r[1] / r[2],
    width: n / r[2],
    height: o / r[2]
  };
  return Rn(s, er(i)) > 0;
}
const Ec = ({ source: e, sourceHandle: t, target: n, targetHandle: o }) => `xy-edge__${e}${t || ""}-${n}${o || ""}`, rp = (e, t) => t.some((n) => n.source === e.source && n.target === e.target && (n.sourceHandle === e.sourceHandle || !n.sourceHandle && !e.sourceHandle) && (n.targetHandle === e.targetHandle || !n.targetHandle && !e.targetHandle)), ip = (e, t, n = {}) => {
  if (!e.source || !e.target)
    return n.onError?.("006", Oe.error006()), t;
  const o = n.getEdgeId || Ec;
  let r;
  return dc(e) ? r = { ...e } : r = {
    ...e,
    id: o(e)
  }, rp(r, t) ? t : (r.sourceHandle === null && delete r.sourceHandle, r.targetHandle === null && delete r.targetHandle, t.concat(r));
}, sp = (e, t, n, o = { shouldReplaceId: !0 }) => {
  const { id: r, ...i } = e;
  if (!t.source || !t.target)
    return o.onError?.("006", Oe.error006()), n;
  if (!n.find((l) => l.id === e.id))
    return o.onError?.("007", Oe.error007(r)), n;
  const c = o.getEdgeId || Ec, u = {
    ...i,
    id: o.shouldReplaceId ? c(t) : r,
    source: t.source,
    target: t.target,
    sourceHandle: t.sourceHandle,
    targetHandle: t.targetHandle
  };
  return n.filter((l) => l.id !== r).concat(u);
};
function kc({ sourceX: e, sourceY: t, targetX: n, targetY: o }) {
  const [r, i, s, c] = Sc({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: o
  });
  return [`M ${e},${t}L ${n},${o}`, r, i, s, c];
}
const ws = {
  [te.Left]: { x: -1, y: 0 },
  [te.Right]: { x: 1, y: 0 },
  [te.Top]: { x: 0, y: -1 },
  [te.Bottom]: { x: 0, y: 1 }
}, ap = ({ source: e, sourcePosition: t = te.Bottom, target: n }) => t === te.Left || t === te.Right ? e.x < n.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < n.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, vs = (e, t) => Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
function cp({ source: e, sourcePosition: t = te.Bottom, target: n, targetPosition: o = te.Top, center: r, offset: i, stepPosition: s }) {
  const c = ws[t], u = ws[o], l = { x: e.x + c.x * i, y: e.y + c.y * i }, f = { x: n.x + u.x * i, y: n.y + u.y * i }, d = ap({
    source: l,
    sourcePosition: t,
    target: f
  }), h = d.x !== 0 ? "x" : "y", p = d[h];
  let g = [], x, w;
  const m = { x: 0, y: 0 }, b = { x: 0, y: 0 }, [, , y, v] = Sc({
    sourceX: e.x,
    sourceY: e.y,
    targetX: n.x,
    targetY: n.y
  });
  if (c[h] * u[h] === -1) {
    h === "x" ? (x = r.x ?? l.x + (f.x - l.x) * s, w = r.y ?? (l.y + f.y) / 2) : (x = r.x ?? (l.x + f.x) / 2, w = r.y ?? l.y + (f.y - l.y) * s);
    const P = [
      { x, y: l.y },
      { x, y: f.y }
    ], T = [
      { x: l.x, y: w },
      { x: f.x, y: w }
    ];
    c[h] === p ? g = h === "x" ? P : T : g = h === "x" ? T : P;
  } else {
    const P = [{ x: l.x, y: f.y }], T = [{ x: f.x, y: l.y }];
    if (h === "x" ? g = c.x === p ? T : P : g = c.y === p ? P : T, t === o) {
      const N = Math.abs(e[h] - n[h]);
      if (N <= i) {
        const j = Math.min(i - 1, i - N);
        c[h] === p ? m[h] = (l[h] > e[h] ? -1 : 1) * j : b[h] = (f[h] > n[h] ? -1 : 1) * j;
      }
    }
    if (t !== o) {
      const N = h === "x" ? "y" : "x", j = c[h] === u[N], I = l[N] > f[N], A = l[N] < f[N];
      (c[h] === 1 && (!j && I || j && A) || c[h] !== 1 && (!j && A || j && I)) && (g = h === "x" ? P : T);
    }
    const B = { x: l.x + m.x, y: l.y + m.y }, _ = { x: f.x + b.x, y: f.y + b.y }, z = Math.max(Math.abs(B.x - g[0].x), Math.abs(_.x - g[0].x)), H = Math.max(Math.abs(B.y - g[0].y), Math.abs(_.y - g[0].y));
    z >= H ? (x = (B.x + _.x) / 2, w = g[0].y) : (x = g[0].x, w = (B.y + _.y) / 2);
  }
  const k = { x: l.x + m.x, y: l.y + m.y }, E = { x: f.x + b.x, y: f.y + b.y };
  return [[
    e,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...k.x !== g[0].x || k.y !== g[0].y ? [k] : [],
    ...g,
    ...E.x !== g[g.length - 1].x || E.y !== g[g.length - 1].y ? [E] : [],
    n
  ], x, w, y, v];
}
function lp(e, t, n, o) {
  const r = Math.min(vs(e, t) / 2, vs(t, n) / 2, o), { x: i, y: s } = t;
  if (e.x === i && i === n.x || e.y === s && s === n.y)
    return `L${i} ${s}`;
  if (e.y === s) {
    const l = e.x < n.x ? -1 : 1, f = e.y < n.y ? 1 : -1;
    return `L ${i + r * l},${s}Q ${i},${s} ${i},${s + r * f}`;
  }
  const c = e.x < n.x ? 1 : -1, u = e.y < n.y ? -1 : 1;
  return `L ${i},${s + r * u}Q ${i},${s} ${i + r * c},${s}`;
}
function Oo({ sourceX: e, sourceY: t, sourcePosition: n = te.Bottom, targetX: o, targetY: r, targetPosition: i = te.Top, borderRadius: s = 5, centerX: c, centerY: u, offset: l = 20, stepPosition: f = 0.5 }) {
  const [d, h, p, g, x] = cp({
    source: { x: e, y: t },
    sourcePosition: n,
    target: { x: o, y: r },
    targetPosition: i,
    center: { x: c, y: u },
    offset: l,
    stepPosition: f
  });
  let w = `M${d[0].x} ${d[0].y}`;
  for (let m = 1; m < d.length - 1; m++)
    w += lp(d[m - 1], d[m], d[m + 1], s);
  return w += `L${d[d.length - 1].x} ${d[d.length - 1].y}`, [w, h, p, g, x];
}
function bs(e) {
  return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function up(e) {
  const { sourceNode: t, targetNode: n } = e;
  if (!bs(t) || !bs(n))
    return null;
  const o = t.internals.handleBounds || Ns(t.handles), r = n.internals.handleBounds || Ns(n.handles), i = Ss(o?.source ?? [], e.sourceHandle), s = Ss(
    // when connection type is loose we can define all handles as sources and connect source -> source
    e.connectionMode === Yt.Strict ? r?.target ?? [] : (r?.target ?? []).concat(r?.source ?? []),
    e.targetHandle
  );
  if (!i || !s)
    return e.onError?.("008", Oe.error008(i ? "target" : "source", {
      id: e.id,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle
    })), null;
  const c = i?.position || te.Bottom, u = s?.position || te.Top, l = Dt(t, i, c), f = Dt(n, s, u);
  return {
    sourceX: l.x,
    sourceY: l.y,
    targetX: f.x,
    targetY: f.y,
    sourcePosition: c,
    targetPosition: u
  };
}
function Ns(e) {
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
function Dt(e, t, n = te.Left, o = !1) {
  const r = (t?.x ?? 0) + e.internals.positionAbsolute.x, i = (t?.y ?? 0) + e.internals.positionAbsolute.y, { width: s, height: c } = t ?? ct(e);
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
function Ss(e, t) {
  return e && (t ? e.find((n) => n.id === t) : e[0]) || null;
}
function ii(e, t) {
  return e ? typeof e == "string" ? e : `${t ? `${t}__` : ""}${Object.keys(e).sort().map((o) => `${o}=${e[o]}`).join("&")}` : "";
}
function dp(e, { id: t, defaultColor: n, defaultMarkerStart: o, defaultMarkerEnd: r }) {
  const i = /* @__PURE__ */ new Set();
  return e.reduce((s, c) => ([c.markerStart || o, c.markerEnd || r].forEach((u) => {
    if (u && typeof u == "object") {
      const l = ii(u, t);
      i.has(l) || (s.push({ id: l, color: u.color || n, ...u }), i.add(l));
    }
  }), s), []).sort((s, c) => s.id.localeCompare(c.id));
}
const Ic = 1e3, fp = 10, ji = {
  nodeOrigin: [0, 0],
  nodeExtent: $n,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, hp = {
  ...ji,
  checkEquality: !0
};
function Ai(e, t) {
  const n = { ...e };
  for (const o in t)
    t[o] !== void 0 && (n[o] = t[o]);
  return n;
}
function pp(e, t, n) {
  const o = Ai(ji, n);
  for (const r of e.values())
    if (r.parentId)
      Di(r, e, t, o);
    else {
      const i = Wn(r, o.nodeOrigin), s = Mt(r.extent) ? r.extent : o.nodeExtent, c = At(i, s, ct(r));
      r.internals.positionAbsolute = c;
    }
}
function gp(e, t) {
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
function Mi(e) {
  return e === "manual";
}
function si(e, t, n, o = {}) {
  const r = Ai(hp, o), i = { i: 0 }, s = new Map(t), c = r?.elevateNodesOnSelect && !Mi(r.zIndexMode) ? Ic : 0;
  let u = e.length > 0, l = !1;
  t.clear(), n.clear();
  for (const f of e) {
    let d = s.get(f.id);
    if (r.checkEquality && f === d?.internals.userNode)
      t.set(f.id, d);
    else {
      const h = Wn(f, r.nodeOrigin), p = Mt(f.extent) ? f.extent : r.nodeExtent, g = At(h, p, ct(f));
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
          handleBounds: gp(f, d),
          z: Cc(f, c, r.zIndexMode),
          userNode: f
        }
      }, t.set(f.id, d);
    }
    (d.measured === void 0 || d.measured.width === void 0 || d.measured.height === void 0) && !d.hidden && (u = !1), f.parentId && Di(d, t, n, o, i), l ||= f.selected ?? !1;
  }
  return { nodesInitialized: u, hasSelectedNodes: l };
}
function yp(e, t) {
  if (!e.parentId)
    return;
  const n = t.get(e.parentId);
  n ? n.set(e.id, e) : t.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function Di(e, t, n, o, r) {
  const { elevateNodesOnSelect: i, nodeOrigin: s, nodeExtent: c, zIndexMode: u } = Ai(ji, o), l = e.parentId, f = t.get(l);
  if (!f) {
    console.warn(`Parent node ${l} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  yp(e, n), r && !f.parentId && f.internals.rootParentIndex === void 0 && u === "auto" && (f.internals.rootParentIndex = ++r.i, f.internals.z = f.internals.z + r.i * fp), r && f.internals.rootParentIndex !== void 0 && (r.i = f.internals.rootParentIndex);
  const d = i && !Mi(u) ? Ic : 0, { x: h, y: p, z: g } = mp(e, f, s, c, d, u), { positionAbsolute: x } = e.internals, w = h !== x.x || p !== x.y;
  (w || g !== e.internals.z) && t.set(e.id, {
    ...e,
    internals: {
      ...e.internals,
      positionAbsolute: w ? { x: h, y: p } : x,
      z: g
    }
  });
}
function Cc(e, t, n) {
  const o = qe(e.zIndex) ? e.zIndex : 0;
  return Mi(n) ? o : o + (e.selected ? t : 0);
}
function mp(e, t, n, o, r, i) {
  const { x: s, y: c } = t.internals.positionAbsolute, u = ct(e), l = Wn(e, n), f = Mt(e.extent) ? At(l, e.extent, u) : l;
  let d = At({ x: s + f.x, y: c + f.y }, o, u);
  e.extent === "parent" && (d = hc(d, u, t));
  const h = Cc(e, r, i), p = t.internals.z ?? 0;
  return {
    x: d.x,
    y: d.y,
    z: p >= h ? p + 1 : h
  };
}
function Pi(e, t, n, o = [0, 0]) {
  const r = [], i = /* @__PURE__ */ new Map();
  for (const s of e) {
    const c = t.get(s.parentId);
    if (!c)
      continue;
    const u = i.get(s.parentId)?.expandedRect ?? Zt(c), l = pc(u, s.rect);
    i.set(s.parentId, { expandedRect: l, parent: c });
  }
  return i.size > 0 && i.forEach(({ expandedRect: s, parent: c }, u) => {
    const l = c.internals.positionAbsolute, f = ct(c), d = c.origin ?? o, h = s.x < l.x ? Math.round(Math.abs(l.x - s.x)) : 0, p = s.y < l.y ? Math.round(Math.abs(l.y - s.y)) : 0, g = Math.max(f.width, Math.round(s.width)), x = Math.max(f.height, Math.round(s.height)), w = (g - f.width) * d[0], m = (x - f.height) * d[1];
    (h > 0 || p > 0 || w || m) && (r.push({
      id: u,
      type: "position",
      position: {
        x: c.position.x - h + w,
        y: c.position.y - p + m
      }
    }), n.get(u)?.forEach((b) => {
      e.some((y) => y.id === b.id) || r.push({
        id: b.id,
        type: "position",
        position: {
          x: b.position.x + h,
          y: b.position.y + p
        }
      });
    })), (f.width < s.width || f.height < s.height || h || p) && r.push({
      id: u,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: g + (h ? d[0] * h - w : 0),
        height: x + (p ? d[1] * p - m : 0)
      }
    });
  }), r;
}
function xp(e, t, n, o, r, i, s) {
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
    const x = _i(p.nodeElement), w = g.measured.width !== x.width || g.measured.height !== x.height;
    if (!!(x.width && x.height && (w || !g.internals.handleBounds || p.force))) {
      const b = p.nodeElement.getBoundingClientRect(), y = Mt(g.extent) ? g.extent : i;
      let { positionAbsolute: v } = g.internals;
      g.parentId && g.extent === "parent" ? v = hc(v, x, t.get(g.parentId)) : y && (v = At(v, y, x));
      const k = {
        ...g,
        measured: x,
        internals: {
          ...g.internals,
          positionAbsolute: v,
          handleBounds: {
            source: ms("source", p.nodeElement, b, d, g.id),
            target: ms("target", p.nodeElement, b, d, g.id)
          }
        }
      };
      t.set(g.id, k), g.parentId && Di(k, t, n, { nodeOrigin: r, zIndexMode: s }), u = !0, w && (l.push({
        id: g.id,
        type: "dimensions",
        dimensions: x
      }), g.expandParent && g.parentId && h.push({
        id: g.id,
        parentId: g.parentId,
        rect: Zt(k, r)
      }));
    }
  }
  if (h.length > 0) {
    const p = Pi(h, t, n, r);
    l.push(...p);
  }
  return { changes: l, updatedInternals: u };
}
async function wp({ delta: e, panZoom: t, transform: n, translateExtent: o, width: r, height: i }) {
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
function Es(e, t, n, o, r, i) {
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
function _c(e, t, n) {
  e.clear(), t.clear();
  for (const o of n) {
    const { source: r, target: i, sourceHandle: s = null, targetHandle: c = null } = o, u = { edgeId: o.id, source: r, target: i, sourceHandle: s, targetHandle: c }, l = `${r}-${s}--${i}-${c}`, f = `${i}-${c}--${r}-${s}`;
    Es("source", u, f, e, r, s), Es("target", u, l, e, i, c), t.set(o.id, o);
  }
}
function jc(e, t) {
  if (!e.parentId)
    return !1;
  const n = t.get(e.parentId);
  return n ? n.selected ? !0 : jc(n, t) : !1;
}
function ks(e, t, n) {
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
function vp(e, t, n, o) {
  const r = /* @__PURE__ */ new Map();
  for (const [i, s] of e)
    if ((s.selected || s.id === o) && (!s.parentId || !jc(s, e)) && (s.draggable || t && typeof s.draggable > "u")) {
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
function Rr({ nodeId: e, dragItems: t, nodeLookup: n, dragging: o = !0 }) {
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
function bp({ dragItems: e, snapGrid: t, x: n, y: o }) {
  const r = e.values().next().value;
  if (!r)
    return null;
  const i = {
    x: n - r.distance.x,
    y: o - r.distance.y
  }, s = Yn(i, t);
  return {
    x: s.x - i.x,
    y: s.y - i.y
  };
}
function Np({ onNodeMouseDown: e, getStoreItems: t, onDragStart: n, onDrag: o, onDragStop: r }) {
  let i = { x: null, y: null }, s = 0, c = /* @__PURE__ */ new Map(), u = !1, l = { x: 0, y: 0 }, f = null, d = !1, h = null, p = !1, g = !1, x = null;
  function w({ noDragClassName: b, handleSelector: y, domNode: v, isSelectable: k, nodeId: E, nodeClickDistance: C = 0 }) {
    h = Ve(v);
    function P({ x: z, y: H }) {
      const { nodeLookup: N, nodeExtent: j, snapGrid: I, snapToGrid: A, nodeOrigin: $, onNodeDrag: D, onSelectionDrag: W, onError: O, updateNodePositions: F } = t();
      i = { x: z, y: H };
      let U = !1;
      const Z = c.size > 1, ne = Z && j ? ri(Xn(c)) : null, ce = Z && A ? bp({
        dragItems: c,
        snapGrid: I,
        x: z,
        y: H
      }) : null;
      for (const [J, R] of c) {
        if (!N.has(J))
          continue;
        let q = { x: z - R.distance.x, y: H - R.distance.y };
        A && (q = ce ? {
          x: Math.round(q.x + ce.x),
          y: Math.round(q.y + ce.y)
        } : Yn(q, I));
        let ie = null;
        if (Z && j && !R.extent && ne) {
          const { positionAbsolute: ee } = R.internals, ae = ee.x - ne.x + j[0][0], L = ee.x + R.measured.width - ne.x2 + j[1][0], K = ee.y - ne.y + j[0][1], pe = ee.y + R.measured.height - ne.y2 + j[1][1];
          ie = [
            [ae, K],
            [L, pe]
          ];
        }
        const { position: re, positionAbsolute: G } = fc({
          nodeId: J,
          nextPosition: q,
          nodeLookup: N,
          nodeExtent: ie || j,
          nodeOrigin: $,
          onError: O
        });
        U = U || R.position.x !== re.x || R.position.y !== re.y, R.position = re, R.internals.positionAbsolute = G;
      }
      if (g = g || U, !!U && (F(c, !0), x && (o || D || !E && W))) {
        const [J, R] = Rr({
          nodeId: E,
          dragItems: c,
          nodeLookup: N
        });
        o?.(x, c, J, R), D?.(x, J, R), E || W?.(x, R);
      }
    }
    async function T() {
      if (!f)
        return;
      const { transform: z, panBy: H, autoPanSpeed: N, autoPanOnNodeDrag: j } = t();
      if (!j) {
        u = !1, cancelAnimationFrame(s);
        return;
      }
      const [I, A] = Ii(l, f, N);
      (I !== 0 || A !== 0) && (i.x = (i.x ?? 0) - I / z[2], i.y = (i.y ?? 0) - A / z[2], await H({ x: I, y: A }) && P(i)), s = requestAnimationFrame(T);
    }
    function B(z) {
      const { nodeLookup: H, multiSelectionActive: N, nodesDraggable: j, transform: I, snapGrid: A, snapToGrid: $, selectNodesOnDrag: D, onNodeDragStart: W, onSelectionDragStart: O, unselectNodesAndEdges: F } = t();
      d = !0, (!D || !k) && !N && E && (H.get(E)?.selected || F()), k && D && E && e?.(E);
      const U = jn(z.sourceEvent, { transform: I, snapGrid: A, snapToGrid: $, containerBounds: f });
      if (i = U, c = vp(H, j, U, E), c.size > 0 && (n || W || !E && O)) {
        const [Z, ne] = Rr({
          nodeId: E,
          dragItems: c,
          nodeLookup: H
        });
        n?.(z.sourceEvent, c, Z, ne), W?.(z.sourceEvent, Z, ne), E || O?.(z.sourceEvent, ne);
      }
    }
    const _ = Xa().clickDistance(C).on("start", (z) => {
      const { domNode: H, nodeDragThreshold: N, transform: j, snapGrid: I, snapToGrid: A } = t();
      f = H?.getBoundingClientRect() || null, p = !1, g = !1, x = z.sourceEvent, N === 0 && B(z), i = jn(z.sourceEvent, { transform: j, snapGrid: I, snapToGrid: A, containerBounds: f }), l = Ze(z.sourceEvent, f);
    }).on("drag", (z) => {
      const { autoPanOnNodeDrag: H, transform: N, snapGrid: j, snapToGrid: I, nodeDragThreshold: A, nodeLookup: $ } = t(), D = jn(z.sourceEvent, { transform: N, snapGrid: j, snapToGrid: I, containerBounds: f });
      if (x = z.sourceEvent, (z.sourceEvent.type === "touchmove" && z.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      E && !$.has(E)) && (p = !0), !p) {
        if (!u && H && d && (u = !0, T()), !d) {
          const W = Ze(z.sourceEvent, f), O = W.x - l.x, F = W.y - l.y;
          Math.sqrt(O * O + F * F) > A && B(z);
        }
        (i.x !== D.xSnapped || i.y !== D.ySnapped) && c && d && (l = Ze(z.sourceEvent, f), P(D));
      }
    }).on("end", (z) => {
      if (!d || p) {
        p && c.size > 0 && t().updateNodePositions(c, !1);
        return;
      }
      if (u = !1, d = !1, cancelAnimationFrame(s), c.size > 0) {
        const { nodeLookup: H, updateNodePositions: N, onNodeDragStop: j, onSelectionDragStop: I } = t();
        if (g && (N(c, !1), g = !1), r || j || !E && I) {
          const [A, $] = Rr({
            nodeId: E,
            dragItems: c,
            nodeLookup: H,
            dragging: !1
          });
          r?.(z.sourceEvent, c, A, $), j?.(z.sourceEvent, A, $), E || I?.(z.sourceEvent, $);
        }
      }
    }).filter((z) => {
      const H = z.target;
      return !z.button && (!b || !ks(H, `.${b}`, v)) && (!y || ks(H, y, v));
    });
    h.call(_);
  }
  function m() {
    h?.on(".drag", null);
  }
  return {
    update: w,
    destroy: m
  };
}
function Sp(e, t, n) {
  const o = [], r = {
    x: e.x - n,
    y: e.y - n,
    width: n * 2,
    height: n * 2
  };
  for (const i of t.values())
    Rn(r, Zt(i)) > 0 && o.push(i);
  return o;
}
const Ep = 250;
function kp(e, t, n, o) {
  let r = [], i = 1 / 0;
  const s = Sp(e, n, t + Ep);
  for (const c of s) {
    const u = [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []];
    for (const l of u) {
      if (o.nodeId === l.nodeId && o.type === l.type && o.id === l.id)
        continue;
      const { x: f, y: d } = Dt(c, l, l.position, !0), h = Math.sqrt(Math.pow(f - e.x, 2) + Math.pow(d - e.y, 2));
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
function Ac(e, t, n, o, r, i = !1) {
  const s = o.get(e);
  if (!s)
    return null;
  const c = r === "strict" ? s.internals.handleBounds?.[t] : [...s.internals.handleBounds?.source ?? [], ...s.internals.handleBounds?.target ?? []], u = (n ? c?.find((l) => l.id === n) : c?.[0]) ?? null;
  return u && i ? { ...u, ...Dt(s, u, u.position, !0) } : u;
}
function Mc(e, t) {
  return e || (t?.classList.contains("target") ? "target" : t?.classList.contains("source") ? "source" : null);
}
function Ip(e, t) {
  let n = null;
  return t ? n = !0 : e && !t && (n = !1), n;
}
const Dc = () => !0;
function Cp(e, { connectionMode: t, connectionRadius: n, handleId: o, nodeId: r, edgeUpdaterType: i, isTarget: s, domNode: c, nodeLookup: u, lib: l, autoPanOnConnect: f, flowId: d, panBy: h, cancelConnection: p, onConnectStart: g, onConnect: x, onConnectEnd: w, isValidConnection: m = Dc, onReconnectEnd: b, updateConnection: y, getTransform: v, getFromHandle: k, autoPanSpeed: E, dragThreshold: C = 1, handleDomNode: P }) {
  const T = xc(e.target);
  let B = 0, _;
  const { x: z, y: H } = Ze(e), N = Mc(i, P), j = c?.getBoundingClientRect();
  let I = !1;
  if (!j || !N)
    return;
  const A = Ac(r, N, o, u, t);
  if (!A)
    return;
  let $ = Ze(e, j), D = !1, W = null, O = !1, F = null;
  function U() {
    if (!f || !j)
      return;
    const [re, G] = Ii($, j, E);
    h({ x: re, y: G }), B = requestAnimationFrame(U);
  }
  const Z = {
    ...A,
    nodeId: r,
    type: N,
    position: A.position
  }, ne = u.get(r);
  let J = {
    inProgress: !0,
    isValid: null,
    from: Dt(ne, Z, te.Left, !0),
    fromHandle: Z,
    fromPosition: Z.position,
    fromNode: ne,
    to: $,
    toHandle: null,
    toPosition: hs[Z.position],
    toNode: null,
    pointer: $
  };
  function R() {
    I = !0, y(J), g?.(e, { nodeId: r, handleId: o, handleType: N });
  }
  C === 0 && R();
  function q(re) {
    if (!I) {
      const { x: pe, y: ue } = Ze(re), _e = pe - z, Be = ue - H;
      if (!(_e * _e + Be * Be > C * C))
        return;
      R();
    }
    if (!k() || !Z) {
      ie(re);
      return;
    }
    const G = v();
    $ = Ze(re, j), _ = kp(Qt($, G, !1, [1, 1]), n, u, Z), D || (U(), D = !0);
    const ee = Pc(re, {
      handle: _,
      connectionMode: t,
      fromNodeId: r,
      fromHandleId: o,
      fromType: s ? "target" : "source",
      isValidConnection: m,
      doc: T,
      lib: l,
      flowId: d,
      nodeLookup: u
    });
    F = ee.handleDomNode, W = ee.connection, O = Ip(!!_, ee.isValid);
    const ae = u.get(r), L = ae ? Dt(ae, Z, te.Left, !0) : J.from, K = {
      ...J,
      from: L,
      isValid: O,
      to: ee.toHandle && O ? Kt({ x: ee.toHandle.x, y: ee.toHandle.y }, G) : $,
      toHandle: ee.toHandle,
      toPosition: O && ee.toHandle ? ee.toHandle.position : hs[Z.position],
      toNode: ee.toHandle ? u.get(ee.toHandle.nodeId) : null,
      pointer: $
    };
    y(K), J = K;
  }
  function ie(re) {
    if (!("touches" in re && re.touches.length > 0)) {
      if (I) {
        (_ || F) && W && O && x?.(W);
        const { inProgress: G, ...ee } = J, ae = {
          ...ee,
          toPosition: J.toHandle ? J.toPosition : null
        };
        w?.(re, ae), i && b?.(re, ae);
      }
      p(), cancelAnimationFrame(B), D = !1, O = !1, W = null, F = null, T.removeEventListener("mousemove", q), T.removeEventListener("mouseup", ie), T.removeEventListener("touchmove", q), T.removeEventListener("touchend", ie);
    }
  }
  T.addEventListener("mousemove", q), T.addEventListener("mouseup", ie), T.addEventListener("touchmove", q), T.addEventListener("touchend", ie);
}
function Pc(e, { handle: t, connectionMode: n, fromNodeId: o, fromHandleId: r, fromType: i, doc: s, lib: c, flowId: u, isValidConnection: l = Dc, nodeLookup: f }) {
  const d = i === "target", h = t ? s.querySelector(`.${c}-flow__handle[data-id="${u}-${t?.nodeId}-${t?.id}-${t?.type}"]`) : null, { x: p, y: g } = Ze(e), x = s.elementFromPoint(p, g), w = x?.classList.contains(`${c}-flow__handle`) ? x : h, m = {
    handleDomNode: w,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (w) {
    const b = Mc(void 0, w), y = w.getAttribute("data-nodeid"), v = w.getAttribute("data-handleid"), k = w.classList.contains("connectable"), E = w.classList.contains("connectableend");
    if (!y || !b)
      return m;
    const C = {
      source: d ? y : o,
      sourceHandle: d ? v : r,
      target: d ? o : y,
      targetHandle: d ? r : v
    };
    m.connection = C;
    const T = k && E && (n === Yt.Strict ? d && b === "source" || !d && b === "target" : y !== o || v !== r);
    m.isValid = T && l(C), m.toHandle = Ac(y, b, v, f, n, !0);
  }
  return m;
}
const ai = {
  onPointerDown: Cp,
  isValid: Pc
};
function _p({ domNode: e, panZoom: t, getTransform: n, getViewScale: o }) {
  const r = Ve(e);
  function i({ translateExtent: c, width: u, height: l, zoomStep: f = 1, pannable: d = !0, zoomable: h = !0, inversePan: p = !1 }) {
    const g = (y) => {
      if (y.sourceEvent.type !== "wheel" || !t)
        return;
      const v = n(), k = y.sourceEvent.ctrlKey && Ln() ? 10 : 1, E = -y.sourceEvent.deltaY * (y.sourceEvent.deltaMode === 1 ? 0.05 : y.sourceEvent.deltaMode ? 1 : 2e-3) * f, C = v[2] * Math.pow(2, E * k);
      t.scaleTo(C);
    };
    let x = [0, 0];
    const w = (y) => {
      (y.sourceEvent.type === "mousedown" || y.sourceEvent.type === "touchstart") && (x = [
        y.sourceEvent.clientX ?? y.sourceEvent.touches[0].clientX,
        y.sourceEvent.clientY ?? y.sourceEvent.touches[0].clientY
      ]);
    }, m = (y) => {
      const v = n();
      if (y.sourceEvent.type !== "mousemove" && y.sourceEvent.type !== "touchmove" || !t)
        return;
      const k = [
        y.sourceEvent.clientX ?? y.sourceEvent.touches[0].clientX,
        y.sourceEvent.clientY ?? y.sourceEvent.touches[0].clientY
      ], E = [k[0] - x[0], k[1] - x[1]];
      x = k;
      const C = o() * Math.max(v[2], Math.log(v[2])) * (p ? -1 : 1), P = {
        x: v[0] - E[0] * C,
        y: v[1] - E[1] * C
      }, T = [
        [0, 0],
        [u, l]
      ];
      t.setViewportConstrained({
        x: P.x,
        y: P.y,
        zoom: v[2]
      }, T, c);
    }, b = sc().on("start", w).on("zoom", d ? m : null).on("zoom.wheel", h ? g : null);
    r.call(b, {});
  }
  function s() {
    r.on("zoom", null);
  }
  return {
    update: i,
    destroy: s,
    pointer: Xe
  };
}
const tr = (e) => ({
  x: e.x,
  y: e.y,
  zoom: e.k
}), Lr = ({ x: e, y: t, zoom: n }) => Jo.translate(e, t).scale(n), Ht = (e, t) => e.target.closest(`.${t}`), Tc = (e, t) => t === 2 && Array.isArray(e) && e.includes(2), jp = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, Vr = (e, t = 0, n = jp, o = () => {
}) => {
  const r = typeof t == "number" && t > 0;
  return r || o(), r ? e.transition().duration(t).ease(n).on("end", o) : e;
}, $c = (e) => {
  const t = e.ctrlKey && Ln() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * t;
};
function Ap({ zoomPanValues: e, noWheelClassName: t, d3Selection: n, d3Zoom: o, panOnScrollMode: r, panOnScrollSpeed: i, zoomOnPinch: s, onPanZoomStart: c, onPanZoom: u, onPanZoomEnd: l }) {
  return (f) => {
    if (Ht(f, t))
      return f.ctrlKey && f.preventDefault(), !1;
    f.preventDefault(), f.stopImmediatePropagation();
    const d = n.property("__zoom").k || 1;
    if (f.ctrlKey && s) {
      const w = Xe(f), m = $c(f), b = d * Math.pow(2, m);
      o.scaleTo(n, b, w, f);
      return;
    }
    const h = f.deltaMode === 1 ? 20 : 1;
    let p = r === It.Vertical ? 0 : f.deltaX * h, g = r === It.Horizontal ? 0 : f.deltaY * h;
    !Ln() && f.shiftKey && r !== It.Vertical && (p = f.deltaY * h, g = 0), o.translateBy(
      n,
      -(p / d) * i,
      -(g / d) * i,
      // @ts-ignore
      { internal: !0 }
    );
    const x = tr(n.property("__zoom"));
    clearTimeout(e.panScrollTimeout), e.isPanScrolling ? (u?.(f, x), e.panScrollTimeout = setTimeout(() => {
      l?.(f, x), e.isPanScrolling = !1;
    }, 150)) : (e.isPanScrolling = !0, c?.(f, x));
  };
}
function Mp({ noWheelClassName: e, preventScrolling: t, d3ZoomHandler: n }) {
  return function(o, r) {
    const i = o.type === "wheel", s = !t && i && !o.ctrlKey, c = Ht(o, e);
    if (o.ctrlKey && i && c && o.preventDefault(), s || c)
      return null;
    o.preventDefault(), n.call(this, o, r);
  };
}
function Dp({ zoomPanValues: e, onDraggingChange: t, onPanZoomStart: n }) {
  return (o) => {
    if (o.sourceEvent?.internal)
      return;
    const r = tr(o.transform);
    e.mouseButton = o.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = r, o.sourceEvent?.type === "mousedown" && t(!0), n && n?.(o.sourceEvent, r);
  };
}
function Pp({ zoomPanValues: e, panOnDrag: t, onPaneContextMenu: n, onTransformChange: o, onPanZoom: r }) {
  return (i) => {
    e.usedRightMouseButton = !!(n && Tc(t, e.mouseButton ?? 0)), i.sourceEvent?.sync || o([i.transform.x, i.transform.y, i.transform.k]), r && !i.sourceEvent?.internal && r?.(i.sourceEvent, tr(i.transform));
  };
}
function Tp({ zoomPanValues: e, panOnDrag: t, panOnScroll: n, onDraggingChange: o, onPanZoomEnd: r, onPaneContextMenu: i }) {
  return (s) => {
    if (!s.sourceEvent?.internal && (e.isZoomingOrPanning = !1, i && Tc(t, e.mouseButton ?? 0) && !e.usedRightMouseButton && s.sourceEvent && i(s.sourceEvent), e.usedRightMouseButton = !1, o(!1), r)) {
      const c = tr(s.transform);
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
function $p({ zoomActivationKeyPressed: e, zoomOnScroll: t, zoomOnPinch: n, panOnDrag: o, panOnScroll: r, zoomOnDoubleClick: i, userSelectionActive: s, noWheelClassName: c, noPanClassName: u, lib: l, connectionInProgress: f }) {
  return (d) => {
    const h = e || t, p = n && d.ctrlKey, g = d.type === "wheel";
    if (d.button === 1 && d.type === "mousedown" && (Ht(d, `${l}-flow__node`) || Ht(d, `${l}-flow__edge`)))
      return !0;
    if (!o && !h && !r && !i && !n || s || f && !g || Ht(d, c) && g || Ht(d, u) && (!g || r && g && !e) || !n && d.ctrlKey && g)
      return !1;
    if (!n && d.type === "touchstart" && d.touches?.length > 1)
      return d.preventDefault(), !1;
    if (!h && !r && !p && g || !o && (d.type === "mousedown" || d.type === "touchstart") || Array.isArray(o) && !o.includes(d.button) && d.type === "mousedown")
      return !1;
    const x = Array.isArray(o) && o.includes(d.button) || !d.button || d.button <= 1;
    return (!d.ctrlKey || g) && x;
  };
}
function zp({ domNode: e, minZoom: t, maxZoom: n, translateExtent: o, viewport: r, onPanZoom: i, onPanZoomStart: s, onPanZoomEnd: c, onDraggingChange: u }) {
  const l = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, f = e.getBoundingClientRect(), d = sc().scaleExtent([t, n]).translateExtent(o), h = Ve(e).call(d);
  b({
    x: r.x,
    y: r.y,
    zoom: qt(r.zoom, t, n)
  }, [
    [0, 0],
    [f.width, f.height]
  ], o);
  const p = h.on("wheel.zoom"), g = h.on("dblclick.zoom");
  d.wheelDelta($c);
  async function x(_, z) {
    return h ? new Promise((H) => {
      d?.interpolate(z?.interpolate === "linear" ? _n : ko).transform(Vr(h, z?.duration, z?.ease, () => H(!0)), _);
    }) : !1;
  }
  function w({ noWheelClassName: _, noPanClassName: z, onPaneContextMenu: H, userSelectionActive: N, panOnScroll: j, panOnDrag: I, panOnScrollMode: A, panOnScrollSpeed: $, preventScrolling: D, zoomOnPinch: W, zoomOnScroll: O, zoomOnDoubleClick: F, zoomActivationKeyPressed: U, lib: Z, onTransformChange: ne, connectionInProgress: ce, paneClickDistance: J, selectionOnDrag: R }) {
    N && !l.isZoomingOrPanning && m();
    const q = j && !U && !N;
    d.clickDistance(R ? 1 / 0 : !qe(J) || J < 0 ? 0 : J);
    const ie = q ? Ap({
      zoomPanValues: l,
      noWheelClassName: _,
      d3Selection: h,
      d3Zoom: d,
      panOnScrollMode: A,
      panOnScrollSpeed: $,
      zoomOnPinch: W,
      onPanZoomStart: s,
      onPanZoom: i,
      onPanZoomEnd: c
    }) : Mp({
      noWheelClassName: _,
      preventScrolling: D,
      d3ZoomHandler: p
    });
    h.on("wheel.zoom", ie, { passive: !1 });
    const re = Dp({
      zoomPanValues: l,
      onDraggingChange: u,
      onPanZoomStart: s
    });
    d.on("start", re);
    const G = Pp({
      zoomPanValues: l,
      panOnDrag: I,
      onPaneContextMenu: !!H,
      onPanZoom: i,
      onTransformChange: ne
    });
    d.on("zoom", G);
    const ee = Tp({
      zoomPanValues: l,
      panOnDrag: I,
      panOnScroll: j,
      onPaneContextMenu: H,
      onPanZoomEnd: c,
      onDraggingChange: u
    });
    d.on("end", ee);
    const ae = $p({
      zoomActivationKeyPressed: U,
      panOnDrag: I,
      zoomOnScroll: O,
      panOnScroll: j,
      zoomOnDoubleClick: F,
      zoomOnPinch: W,
      userSelectionActive: N,
      noPanClassName: z,
      noWheelClassName: _,
      lib: Z,
      connectionInProgress: ce
    });
    d.filter(ae), F ? h.on("dblclick.zoom", g) : h.on("dblclick.zoom", null);
  }
  function m() {
    d.on("zoom", null);
  }
  async function b(_, z, H) {
    const N = Lr(_), j = d?.constrain()(N, z, H);
    return j && await x(j), j;
  }
  async function y(_, z) {
    const H = Lr(_);
    return await x(H, z), H;
  }
  function v(_) {
    if (h) {
      const z = Lr(_), H = h.property("__zoom");
      (H.k !== _.zoom || H.x !== _.x || H.y !== _.y) && d?.transform(h, z, null, { sync: !0 });
    }
  }
  function k() {
    const _ = h ? ic(h.node()) : { x: 0, y: 0, k: 1 };
    return { x: _.x, y: _.y, zoom: _.k };
  }
  async function E(_, z) {
    return h ? new Promise((H) => {
      d?.interpolate(z?.interpolate === "linear" ? _n : ko).scaleTo(Vr(h, z?.duration, z?.ease, () => H(!0)), _);
    }) : !1;
  }
  async function C(_, z) {
    return h ? new Promise((H) => {
      d?.interpolate(z?.interpolate === "linear" ? _n : ko).scaleBy(Vr(h, z?.duration, z?.ease, () => H(!0)), _);
    }) : !1;
  }
  function P(_) {
    d?.scaleExtent(_);
  }
  function T(_) {
    d?.translateExtent(_);
  }
  function B(_) {
    const z = !qe(_) || _ < 0 ? 0 : _;
    d?.clickDistance(z);
  }
  return {
    update: w,
    destroy: m,
    setViewport: y,
    setViewportConstrained: b,
    getViewport: k,
    scaleTo: E,
    scaleBy: C,
    setScaleExtent: P,
    setTranslateExtent: T,
    syncViewport: v,
    setClickDistance: B
  };
}
var Ut;
(function(e) {
  e.Line = "line", e.Handle = "handle";
})(Ut || (Ut = {}));
function Rp({ width: e, prevWidth: t, height: n, prevHeight: o, affectsX: r, affectsY: i }) {
  const s = e - t, c = n - o, u = [s > 0 ? 1 : s < 0 ? -1 : 0, c > 0 ? 1 : c < 0 ? -1 : 0];
  return s && r && (u[0] = u[0] * -1), c && i && (u[1] = u[1] * -1), u;
}
function Is(e) {
  const t = e.includes("right") || e.includes("left"), n = e.includes("bottom") || e.includes("top"), o = e.includes("left"), r = e.includes("top");
  return {
    isHorizontal: t,
    isVertical: n,
    affectsX: o,
    affectsY: r
  };
}
function dt(e, t) {
  return Math.max(0, t - e);
}
function ft(e, t) {
  return Math.max(0, e - t);
}
function wo(e, t, n) {
  return Math.max(0, t - e, e - n);
}
function Cs(e, t) {
  return e ? !t : t;
}
function Lp(e, t, n, o, r, i, s, c) {
  let { affectsX: u, affectsY: l } = t;
  const { isHorizontal: f, isVertical: d } = t, h = f && d, { xSnapped: p, ySnapped: g } = n, { minWidth: x, maxWidth: w, minHeight: m, maxHeight: b } = o, { x: y, y: v, width: k, height: E, aspectRatio: C } = e;
  let P = Math.floor(f ? p - e.pointerX : 0), T = Math.floor(d ? g - e.pointerY : 0);
  const B = k + (u ? -P : P), _ = E + (l ? -T : T), z = -i[0] * k, H = -i[1] * E;
  let N = wo(B, x, w), j = wo(_, m, b);
  if (s) {
    let $ = 0, D = 0;
    u && P < 0 ? $ = dt(y + P + z, s[0][0]) : !u && P > 0 && ($ = ft(y + B + z, s[1][0])), l && T < 0 ? D = dt(v + T + H, s[0][1]) : !l && T > 0 && (D = ft(v + _ + H, s[1][1])), N = Math.max(N, $), j = Math.max(j, D);
  }
  if (c) {
    let $ = 0, D = 0;
    u && P > 0 ? $ = ft(y + P, c[0][0]) : !u && P < 0 && ($ = dt(y + B, c[1][0])), l && T > 0 ? D = ft(v + T, c[0][1]) : !l && T < 0 && (D = dt(v + _, c[1][1])), N = Math.max(N, $), j = Math.max(j, D);
  }
  if (r) {
    if (f) {
      const $ = wo(B / C, m, b) * C;
      if (N = Math.max(N, $), s) {
        let D = 0;
        !u && !l || u && !l && h ? D = ft(v + H + B / C, s[1][1]) * C : D = dt(v + H + (u ? P : -P) / C, s[0][1]) * C, N = Math.max(N, D);
      }
      if (c) {
        let D = 0;
        !u && !l || u && !l && h ? D = dt(v + B / C, c[1][1]) * C : D = ft(v + (u ? P : -P) / C, c[0][1]) * C, N = Math.max(N, D);
      }
    }
    if (d) {
      const $ = wo(_ * C, x, w) / C;
      if (j = Math.max(j, $), s) {
        let D = 0;
        !u && !l || l && !u && h ? D = ft(y + _ * C + z, s[1][0]) / C : D = dt(y + (l ? T : -T) * C + z, s[0][0]) / C, j = Math.max(j, D);
      }
      if (c) {
        let D = 0;
        !u && !l || l && !u && h ? D = dt(y + _ * C, c[1][0]) / C : D = ft(y + (l ? T : -T) * C, c[0][0]) / C, j = Math.max(j, D);
      }
    }
  }
  T = T + (T < 0 ? j : -j), P = P + (P < 0 ? N : -N), r && (h ? B > _ * C ? T = (Cs(u, l) ? -P : P) / C : P = (Cs(u, l) ? -T : T) * C : f ? (T = P / C, l = u) : (P = T * C, u = l));
  const I = u ? y + P : y, A = l ? v + T : v;
  return {
    width: k + (u ? -P : P),
    height: E + (l ? -T : T),
    x: i[0] * P * (u ? -1 : 1) + I,
    y: i[1] * T * (l ? -1 : 1) + A
  };
}
const zc = { width: 0, height: 0, x: 0, y: 0 }, Vp = {
  ...zc,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function Hp(e, t, n) {
  const o = t.position.x + e.position.x, r = t.position.y + e.position.y, i = e.measured.width ?? 0, s = e.measured.height ?? 0, c = n[0] * i, u = n[1] * s;
  return [
    [o - c, r - u],
    [o + i - c, r + s - u]
  ];
}
function Op({ domNode: e, nodeId: t, getStoreItems: n, onChange: o, onEnd: r }) {
  const i = Ve(e);
  let s = {
    controlDirection: Is("bottom-right"),
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
    let m = { ...zc }, b = { ...Vp };
    s = {
      boundaries: f,
      resizeDirection: h,
      keepAspectRatio: d,
      controlDirection: Is(l)
    };
    let y, v = null, k = [], E, C, P, T = !1;
    const B = Xa().on("start", (_) => {
      const { nodeLookup: z, transform: H, snapGrid: N, snapToGrid: j, nodeOrigin: I, paneDomNode: A } = n();
      if (y = z.get(t), !y)
        return;
      v = A?.getBoundingClientRect() ?? null;
      const { xSnapped: $, ySnapped: D } = jn(_.sourceEvent, {
        transform: H,
        snapGrid: N,
        snapToGrid: j,
        containerBounds: v
      });
      m = {
        width: y.measured.width ?? 0,
        height: y.measured.height ?? 0,
        x: y.position.x ?? 0,
        y: y.position.y ?? 0
      }, b = {
        ...m,
        pointerX: $,
        pointerY: D,
        aspectRatio: m.width / m.height
      }, E = void 0, C = Mt(y.extent) ? y.extent : void 0, y.parentId && (y.extent === "parent" || y.expandParent) && (E = z.get(y.parentId)), E && y.extent === "parent" && (C = [
        [0, 0],
        [E.measured.width, E.measured.height]
      ]), k = [], P = void 0;
      for (const [W, O] of z)
        if (O.parentId === t && (k.push({
          id: W,
          position: { ...O.position },
          extent: O.extent
        }), O.extent === "parent" || O.expandParent)) {
          const F = Hp(O, y, O.origin ?? I);
          P ? P = [
            [Math.min(F[0][0], P[0][0]), Math.min(F[0][1], P[0][1])],
            [Math.max(F[1][0], P[1][0]), Math.max(F[1][1], P[1][1])]
          ] : P = F;
        }
      p?.(_, { ...m });
    }).on("drag", (_) => {
      const { transform: z, snapGrid: H, snapToGrid: N, nodeOrigin: j } = n(), I = jn(_.sourceEvent, {
        transform: z,
        snapGrid: H,
        snapToGrid: N,
        containerBounds: v
      }), A = [];
      if (!y)
        return;
      const { x: $, y: D, width: W, height: O } = m, F = {}, U = y.origin ?? j, { width: Z, height: ne, x: ce, y: J } = Lp(b, s.controlDirection, I, s.boundaries, s.keepAspectRatio, U, C, P), R = Z !== W, q = ne !== O, ie = ce !== $ && R, re = J !== D && q;
      if (!ie && !re && !R && !q)
        return;
      if ((ie || re || U[0] === 1 || U[1] === 1) && (F.x = ie ? ce : m.x, F.y = re ? J : m.y, m.x = F.x, m.y = F.y, k.length > 0)) {
        const L = ce - $, K = J - D;
        for (const pe of k)
          pe.position = {
            x: pe.position.x - L + U[0] * (Z - W),
            y: pe.position.y - K + U[1] * (ne - O)
          }, A.push(pe);
      }
      if ((R || q) && (F.width = R && (!s.resizeDirection || s.resizeDirection === "horizontal") ? Z : m.width, F.height = q && (!s.resizeDirection || s.resizeDirection === "vertical") ? ne : m.height, m.width = F.width, m.height = F.height), E && y.expandParent) {
        const L = U[0] * (F.width ?? 0);
        F.x && F.x < L && (m.x = L, b.x = b.x - (F.x - L));
        const K = U[1] * (F.height ?? 0);
        F.y && F.y < K && (m.y = K, b.y = b.y - (F.y - K));
      }
      const G = Rp({
        width: m.width,
        prevWidth: W,
        height: m.height,
        prevHeight: O,
        affectsX: s.controlDirection.affectsX,
        affectsY: s.controlDirection.affectsY
      }), ee = { ...m, direction: G };
      w?.(_, ee) !== !1 && (T = !0, g?.(_, ee), o(F, A));
    }).on("end", (_) => {
      T && (x?.(_, { ...m }), r?.({ ...m }), T = !1);
    });
    i.call(B);
  }
  function u() {
    i.on(".drag", null);
  }
  return {
    update: c,
    destroy: u
  };
}
var Hr = { exports: {} }, Or = {}, Br = { exports: {} }, Fr = {};
var _s;
function Bp() {
  if (_s) return Fr;
  _s = 1;
  var e = yt;
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
  return Fr.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : f, Fr;
}
var js;
function Fp() {
  return js || (js = 1, Br.exports = Bp()), Br.exports;
}
var As;
function Wp() {
  if (As) return Or;
  As = 1;
  var e = yt, t = Fp();
  function n(l, f) {
    return l === f && (l !== 0 || 1 / l === 1 / f) || l !== l && f !== f;
  }
  var o = typeof Object.is == "function" ? Object.is : n, r = t.useSyncExternalStore, i = e.useRef, s = e.useEffect, c = e.useMemo, u = e.useDebugValue;
  return Or.useSyncExternalStoreWithSelector = function(l, f, d, h, p) {
    var g = i(null);
    if (g.current === null) {
      var x = { hasValue: !1, value: null };
      g.current = x;
    } else x = g.current;
    g = c(
      function() {
        function m(E) {
          if (!b) {
            if (b = !0, y = E, E = h(E), p !== void 0 && x.hasValue) {
              var C = x.value;
              if (p(C, E))
                return v = C;
            }
            return v = E;
          }
          if (C = v, o(y, E)) return C;
          var P = h(E);
          return p !== void 0 && p(C, P) ? (y = E, C) : (y = E, v = P);
        }
        var b = !1, y, v, k = d === void 0 ? null : d;
        return [
          function() {
            return m(f());
          },
          k === null ? void 0 : function() {
            return m(k());
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
  }, Or;
}
var Ms;
function Xp() {
  return Ms || (Ms = 1, Hr.exports = Wp()), Hr.exports;
}
var Yp = Xp();
const qp = /* @__PURE__ */ cu(Yp), Zp = {}, Ds = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), o = (f, d) => {
    const h = typeof f == "function" ? f(t) : f;
    if (!Object.is(h, t)) {
      const p = t;
      t = d ?? (typeof h != "object" || h === null) ? h : Object.assign({}, t, h), n.forEach((g) => g(t, p));
    }
  }, r = () => t, u = { setState: o, getState: r, getInitialState: () => l, subscribe: (f) => (n.add(f), () => n.delete(f)), destroy: () => {
    (Zp ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), n.clear();
  } }, l = t = e(o, r, u);
  return u;
}, Kp = (e) => e ? Ds(e) : Ds, { useDebugValue: Up } = yt, { useSyncExternalStoreWithSelector: Gp } = qp, Jp = (e) => e;
function Rc(e, t = Jp, n) {
  const o = Gp(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n
  );
  return Up(o), o;
}
const Ps = (e, t) => {
  const n = Kp(e), o = (r, i = t) => Rc(n, r, i);
  return Object.assign(o, n), o;
}, Qp = (e, t) => e ? Ps(e, t) : Ps;
function me(e, t) {
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
var Wr = { exports: {} }, Me = {};
var Ts;
function eg() {
  if (Ts) return Me;
  Ts = 1;
  var e = yt;
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
var $s;
function tg() {
  if ($s) return Wr.exports;
  $s = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return e(), Wr.exports = eg(), Wr.exports;
}
var ng = tg();
const nr = yi(null), og = nr.Provider, Lc = Oe.error001("react");
function fe(e, t) {
  const n = On(nr);
  if (n === null)
    throw new Error(Lc);
  return Rc(n, e, t);
}
function xe() {
  const e = On(nr);
  if (e === null)
    throw new Error(Lc);
  return ye(() => ({
    getState: e.getState,
    setState: e.setState,
    subscribe: e.subscribe
  }), [e]);
}
const zs = { display: "none" }, rg = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, Vc = "react-flow__node-desc", Hc = "react-flow__edge-desc", ig = "react-flow__aria-live", sg = (e) => e.ariaLiveMessage, ag = (e) => e.ariaLabelConfig;
function cg({ rfId: e }) {
  const t = fe(sg);
  return a.jsx("div", { id: `${ig}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: rg, children: t });
}
function lg({ rfId: e, disableKeyboardA11y: t }) {
  const n = fe(ag);
  return a.jsxs(a.Fragment, { children: [a.jsx("div", { id: `${Vc}-${e}`, style: zs, children: t ? n["node.a11yDescription.default"] : n["node.a11yDescription.keyboardDisabled"] }), a.jsx("div", { id: `${Hc}-${e}`, style: zs, children: n["edge.a11yDescription.default"] }), !t && a.jsx(cg, { rfId: e })] });
}
const or = qo(({ position: e = "top-left", children: t, className: n, style: o, ...r }, i) => {
  const s = `${e}`.split("-");
  return a.jsx("div", { className: Ee(["react-flow__panel", n, ...s]), style: o, ref: i, ...r, children: t });
});
or.displayName = "Panel";
function ug({ proOptions: e, position: t = "bottom-right" }) {
  return e?.hideAttribution ? null : a.jsx(or, { position: t, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: a.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const dg = (e) => {
  const t = [], n = [];
  for (const [, o] of e.nodeLookup)
    o.selected && t.push(o.internals.userNode);
  for (const [, o] of e.edgeLookup)
    o.selected && n.push(o);
  return { selectedNodes: t, selectedEdges: n };
}, vo = (e) => e.id;
function fg(e, t) {
  return me(e.selectedNodes.map(vo), t.selectedNodes.map(vo)) && me(e.selectedEdges.map(vo), t.selectedEdges.map(vo));
}
function hg({ onSelectionChange: e }) {
  const t = xe(), { selectedNodes: n, selectedEdges: o } = fe(dg, fg);
  return oe(() => {
    const r = { nodes: n, edges: o };
    e?.(r), t.getState().onSelectionChangeHandlers.forEach((i) => i(r));
  }, [n, o, e]), null;
}
const pg = (e) => !!e.onSelectionChangeHandlers;
function gg({ onSelectionChange: e }) {
  const t = fe(pg);
  return e || t ? a.jsx(hg, { onSelectionChange: e }) : null;
}
const Oc = [0, 0], yg = { x: 0, y: 0, zoom: 1 }, mg = [
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
], Rs = [...mg, "rfId"], xg = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges
}), Ls = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: $n,
  nodeOrigin: Oc,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function wg(e) {
  const { setNodes: t, setEdges: n, setMinZoom: o, setMaxZoom: r, setTranslateExtent: i, setNodeExtent: s, reset: c, setDefaultNodesAndEdges: u } = fe(xg, me), l = xe();
  oe(() => (u(e.defaultNodes, e.defaultEdges), () => {
    f.current = Ls, c();
  }), []);
  const f = le(Ls);
  return oe(
    () => {
      for (const d of Rs) {
        const h = e[d], p = f.current[d];
        h !== p && (typeof e[d] > "u" || (d === "nodes" ? t(h) : d === "edges" ? n(h) : d === "minZoom" ? o(h) : d === "maxZoom" ? r(h) : d === "translateExtent" ? i(h) : d === "nodeExtent" ? s(h) : d === "ariaLabelConfig" ? l.setState({ ariaLabelConfig: ep(h) }) : d === "fitView" ? l.setState({ fitViewQueued: h }) : d === "fitViewOptions" ? l.setState({ fitViewOptions: h }) : l.setState({ [d]: h })));
      }
      f.current = e;
    },
    // Only re-run the effect if one of the fields we track changes
    Rs.map((d) => e[d])
  ), null;
}
function Vs() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function vg(e) {
  const [t, n] = Y(e === "system" ? null : e);
  return oe(() => {
    if (e !== "system") {
      n(e);
      return;
    }
    const o = Vs(), r = () => n(o?.matches ? "dark" : "light");
    return r(), o?.addEventListener("change", r), () => {
      o?.removeEventListener("change", r);
    };
  }, [e]), t !== null ? t : Vs()?.matches ? "dark" : "light";
}
const Hs = typeof document < "u" ? document : null;
function Vn(e = null, t = { target: Hs, actInsideInputWithModifier: !0 }) {
  const [n, o] = Y(!1), r = le(!1), i = le(/* @__PURE__ */ new Set([])), [s, c] = ye(() => {
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
  return oe(() => {
    const u = t?.target ?? Hs, l = t?.actInsideInputWithModifier ?? !0;
    if (e !== null) {
      const f = (p) => {
        if (r.current = p.ctrlKey || p.metaKey || p.shiftKey || p.altKey, (!r.current || r.current && !l) && wc(p))
          return !1;
        const x = Bs(p.code, c);
        if (i.current.add(p[x]), Os(s, i.current, !1)) {
          const w = p.composedPath?.()?.[0] || p.target, m = w?.nodeName === "BUTTON" || w?.nodeName === "A";
          t.preventDefault !== !1 && (r.current || !m) && p.preventDefault(), o(!0);
        }
      }, d = (p) => {
        const g = Bs(p.code, c);
        Os(s, i.current, !0) ? (o(!1), i.current.clear()) : i.current.delete(p[g]), p.key === "Meta" && i.current.clear(), r.current = !1;
      }, h = () => {
        i.current.clear(), o(!1);
      };
      return u?.addEventListener("keydown", f), u?.addEventListener("keyup", d), window.addEventListener("blur", h), window.addEventListener("contextmenu", h), () => {
        u?.removeEventListener("keydown", f), u?.removeEventListener("keyup", d), window.removeEventListener("blur", h), window.removeEventListener("contextmenu", h);
      };
    }
  }, [e, o]), n;
}
function Os(e, t, n) {
  return e.filter((o) => n || o.length === t.size).some((o) => o.every((r) => t.has(r)));
}
function Bs(e, t) {
  return t.includes(e) ? "code" : "key";
}
const bg = () => {
  const e = xe();
  return ye(() => ({
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
      const { width: o, height: r, minZoom: i, maxZoom: s, panZoom: c } = e.getState(), u = Ci(t, o, r, i, s, n?.padding ?? 0.1);
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
      return Qt(l, o, d, f);
    },
    flowToScreenPosition: (t) => {
      const { transform: n, domNode: o } = e.getState();
      if (!o)
        return t;
      const { x: r, y: i } = o.getBoundingClientRect(), s = Kt(t, n);
      return {
        x: s.x + r,
        y: s.y + i
      };
    }
  }), []);
};
function Bc(e, t) {
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
      Ng(u, c);
    n.push(c);
  }
  return r.length && r.forEach((i) => {
    i.index !== void 0 ? n.splice(i.index, 0, { ...i.item }) : n.push({ ...i.item });
  }), n;
}
function Ng(e, t) {
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
function Fc(e, t) {
  return Bc(e, t);
}
function Wc(e, t) {
  return Bc(e, t);
}
function St(e, t) {
  return {
    id: e,
    type: "select",
    selected: t
  };
}
function Ot(e, t = /* @__PURE__ */ new Set(), n = !1) {
  const o = [];
  for (const [r, i] of e) {
    const s = t.has(r);
    !(i.selected === void 0 && !s) && i.selected !== s && (n && (i.selected = s), o.push(St(i.id, s)));
  }
  return o;
}
function Fs({ items: e = [], lookup: t }) {
  const n = [], o = new Map(e.map((r) => [r.id, r]));
  for (const [r, i] of e.entries()) {
    const s = t.get(i.id), c = s?.internals?.userNode ?? s;
    c !== void 0 && c !== i && n.push({ id: i.id, item: i, type: "replace" }), c === void 0 && n.push({ item: i, type: "add", index: r });
  }
  for (const [r] of t)
    o.get(r) === void 0 && n.push({ id: r, type: "remove" });
  return n;
}
function Ws(e) {
  return {
    id: e.id,
    type: "remove"
  };
}
const Xc = gc();
function Yc(e, t, n = {}) {
  return ip(e, t, {
    ...n,
    onError: n.onError ?? Xc
  });
}
function Sg(e, t, n, o = { shouldReplaceId: !0 }) {
  return sp(e, t, n, {
    ...o,
    onError: o.onError ?? Xc
  });
}
const Xs = (e) => Xh(e), Eg = (e) => dc(e);
function qc(e) {
  return qo(e);
}
const kg = typeof window < "u" ? au : oe;
function Ys(e) {
  const [t, n] = Y(BigInt(0)), [o] = Y(() => Ig(() => n((r) => r + BigInt(1))));
  return kg(() => {
    const r = o.get();
    r.length && (e(r), o.reset());
  }, [t]), o;
}
function Ig(e) {
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
const Zc = yi(null);
function Cg({ children: e }) {
  const t = xe(), n = ge((c) => {
    const { nodes: u = [], setNodes: l, hasDefaultNodes: f, onNodesChange: d, nodeLookup: h, fitViewQueued: p, onNodesChangeMiddlewareMap: g } = t.getState();
    let x = u;
    for (const m of c)
      x = typeof m == "function" ? m(x) : m;
    let w = Fs({
      items: x,
      lookup: h
    });
    for (const m of g.values())
      w = m(w);
    f && l(x), w.length > 0 ? d?.(w) : p && window.requestAnimationFrame(() => {
      const { fitViewQueued: m, nodes: b, setNodes: y } = t.getState();
      m && y(b);
    });
  }, []), o = Ys(n), r = ge((c) => {
    const { edges: u = [], setEdges: l, hasDefaultEdges: f, onEdgesChange: d, edgeLookup: h } = t.getState();
    let p = u;
    for (const g of c)
      p = typeof g == "function" ? g(p) : g;
    f ? l(p) : d && d(Fs({
      items: p,
      lookup: h
    }));
  }, []), i = Ys(r), s = ye(() => ({ nodeQueue: o, edgeQueue: i }), []);
  return a.jsx(Zc.Provider, { value: s, children: e });
}
function _g() {
  const e = On(Zc);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const jg = (e) => !!e.panZoom;
function Ti() {
  const e = bg(), t = xe(), n = _g(), o = fe(jg), r = ye(() => {
    const i = (d) => t.getState().nodeLookup.get(d), s = (d) => {
      n.nodeQueue.push(d);
    }, c = (d) => {
      n.edgeQueue.push(d);
    }, u = (d) => {
      const { nodeLookup: h, nodeOrigin: p } = t.getState(), g = Xs(d) ? d : h.get(d.id), x = g.parentId ? mc(g.position, g.measured, g.parentId, h, p) : g.position, w = {
        ...g,
        position: x,
        width: g.measured?.width ?? g.width,
        height: g.measured?.height ?? g.height
      };
      return Zt(w);
    }, l = (d, h, p = { replace: !1 }) => {
      s((g) => g.map((x) => {
        if (x.id === d) {
          const w = typeof h == "function" ? h(x) : h;
          return p.replace && Xs(w) ? w : { ...x, ...w };
        }
        return x;
      }));
    }, f = (d, h, p = { replace: !1 }) => {
      c((g) => g.map((x) => {
        if (x.id === d) {
          const w = typeof h == "function" ? h(x) : h;
          return p.replace && Eg(w) ? w : { ...x, ...w };
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
          nodes: d.map((m) => ({ ...m })),
          edges: h.map((m) => ({ ...m })),
          viewport: {
            x: g,
            y: x,
            zoom: w
          }
        };
      },
      deleteElements: async ({ nodes: d = [], edges: h = [] }) => {
        const { nodes: p, edges: g, onNodesDelete: x, onEdgesDelete: w, triggerNodeChanges: m, triggerEdgeChanges: b, onDelete: y, onBeforeDelete: v } = t.getState(), { nodes: k, edges: E } = await Uh({
          nodesToRemove: d,
          edgesToRemove: h,
          nodes: p,
          edges: g,
          onBeforeDelete: v
        }), C = E.length > 0, P = k.length > 0;
        if (C) {
          const T = E.map(Ws);
          w?.(E), b(T);
        }
        if (P) {
          const T = k.map(Ws);
          x?.(k), m(T);
        }
        return (P || C) && y?.({ nodes: k, edges: E }), { deletedNodes: k, deletedEdges: E };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (d, h = !0, p) => {
        const g = gs(d), x = g ? d : u(d), w = p !== void 0;
        return x ? (p || t.getState().nodes).filter((m) => {
          const b = t.getState().nodeLookup.get(m.id);
          if (b && !g && (m.id === d.id || !b.internals.positionAbsolute))
            return !1;
          const y = Zt(w ? m : b), v = Rn(y, x);
          return h && v > 0 || v >= y.width * y.height || v >= x.width * x.height;
        }) : [];
      },
      isNodeIntersecting: (d, h, p = !0) => {
        const x = gs(d) ? d : u(d);
        if (!x)
          return !1;
        const w = Rn(x, h);
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
        return Yh(d, { nodeLookup: h, nodeOrigin: p });
      },
      getHandleConnections: ({ type: d, id: h, nodeId: p }) => Array.from(t.getState().connectionLookup.get(`${p}-${d}${h ? `-${h}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: d, handleId: h, nodeId: p }) => Array.from(t.getState().connectionLookup.get(`${p}${d ? h ? `-${d}-${h}` : `-${d}` : ""}`)?.values() ?? []),
      fitView: async (d) => {
        const h = t.getState().fitViewResolver ?? Qh();
        return t.setState({ fitViewQueued: !0, fitViewOptions: d, fitViewResolver: h }), n.nodeQueue.push((p) => [...p]), h.promise;
      }
    };
  }, []);
  return ye(() => ({
    ...r,
    ...e,
    viewportInitialized: o
  }), [o]);
}
const qs = (e) => e.selected, Ag = typeof window < "u" ? window : void 0;
function Mg({ deleteKeyCode: e, multiSelectionKeyCode: t }) {
  const n = xe(), { deleteElements: o } = Ti(), r = Vn(e, { actInsideInputWithModifier: !1 }), i = Vn(t, { target: Ag });
  oe(() => {
    if (r) {
      const { edges: s, nodes: c } = n.getState();
      o({ nodes: c.filter(qs), edges: s.filter(qs) }), n.setState({ nodesSelectionActive: !1 });
    }
  }, [r]), oe(() => {
    n.setState({ multiSelectionActive: i });
  }, [i]);
}
function Dg(e) {
  const t = xe();
  oe(() => {
    const n = () => {
      if (!e.current || !(e.current.checkVisibility?.() ?? !0))
        return !1;
      const o = _i(e.current);
      (o.height === 0 || o.width === 0) && t.getState().onError?.("004", Oe.error004()), t.setState({ width: o.width || 500, height: o.height || 500 });
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
const rr = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, Pg = (e) => ({
  userSelectionActive: e.userSelectionActive,
  lib: e.lib,
  connectionInProgress: e.connection.inProgress
});
function Tg({ onPaneContextMenu: e, zoomOnScroll: t = !0, zoomOnPinch: n = !0, panOnScroll: o = !1, panOnScrollSpeed: r = 0.5, panOnScrollMode: i = It.Free, zoomOnDoubleClick: s = !0, panOnDrag: c = !0, defaultViewport: u, translateExtent: l, minZoom: f, maxZoom: d, zoomActivationKeyCode: h, preventScrolling: p = !0, children: g, noWheelClassName: x, noPanClassName: w, onViewportChange: m, isControlledViewport: b, paneClickDistance: y, selectionOnDrag: v }) {
  const k = xe(), E = le(null), { userSelectionActive: C, lib: P, connectionInProgress: T } = fe(Pg, me), B = Vn(h), _ = le();
  Dg(E);
  const z = ge((H) => {
    m?.({ x: H[0], y: H[1], zoom: H[2] }), b || k.setState({ transform: H });
  }, [m, b]);
  return oe(() => {
    if (E.current) {
      _.current = zp({
        domNode: E.current,
        minZoom: f,
        maxZoom: d,
        translateExtent: l,
        viewport: u,
        onDraggingChange: (I) => k.setState((A) => A.paneDragging === I ? A : { paneDragging: I }),
        onPanZoomStart: (I, A) => {
          const { onViewportChangeStart: $, onMoveStart: D } = k.getState();
          D?.(I, A), $?.(A);
        },
        onPanZoom: (I, A) => {
          const { onViewportChange: $, onMove: D } = k.getState();
          D?.(I, A), $?.(A);
        },
        onPanZoomEnd: (I, A) => {
          const { onViewportChangeEnd: $, onMoveEnd: D } = k.getState();
          D?.(I, A), $?.(A);
        }
      });
      const { x: H, y: N, zoom: j } = _.current.getViewport();
      return k.setState({
        panZoom: _.current,
        transform: [H, N, j],
        domNode: E.current.closest(".react-flow")
      }), () => {
        _.current?.destroy();
      };
    }
  }, []), oe(() => {
    _.current?.update({
      onPaneContextMenu: e,
      zoomOnScroll: t,
      zoomOnPinch: n,
      panOnScroll: o,
      panOnScrollSpeed: r,
      panOnScrollMode: i,
      zoomOnDoubleClick: s,
      panOnDrag: c,
      zoomActivationKeyPressed: B,
      preventScrolling: p,
      noPanClassName: w,
      userSelectionActive: C,
      noWheelClassName: x,
      lib: P,
      onTransformChange: z,
      connectionInProgress: T,
      selectionOnDrag: v,
      paneClickDistance: y
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
    B,
    p,
    w,
    C,
    x,
    P,
    z,
    T,
    v,
    y
  ]), a.jsx("div", { className: "react-flow__renderer", ref: E, style: rr, children: g });
}
const $g = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect
});
function zg() {
  const { userSelectionActive: e, userSelectionRect: t } = fe($g, me);
  return e && t ? a.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: t.width,
    height: t.height,
    transform: `translate(${t.x}px, ${t.y}px)`
  } }) : null;
}
const Xr = (e, t) => (n) => {
  n.target === t.current && e?.(n);
}, Rg = (e) => ({
  userSelectionActive: e.userSelectionActive,
  elementsSelectable: e.elementsSelectable,
  connectionInProgress: e.connection.inProgress,
  dragging: e.paneDragging,
  panBy: e.panBy,
  autoPanSpeed: e.autoPanSpeed
});
function Lg({ isSelecting: e, selectionKeyPressed: t, selectionMode: n = zn.Full, panOnDrag: o, autoPanOnSelection: r, paneClickDistance: i, selectionOnDrag: s, onSelectionStart: c, onSelectionEnd: u, onPaneClick: l, onPaneContextMenu: f, onPaneScroll: d, onPaneMouseEnter: h, onPaneMouseMove: p, onPaneMouseLeave: g, children: x }) {
  const w = le(0), m = xe(), { userSelectionActive: b, elementsSelectable: y, dragging: v, connectionInProgress: k, panBy: E, autoPanSpeed: C } = fe(Rg, me), P = y && (e || b), T = le(null), B = le(), _ = le(/* @__PURE__ */ new Set()), z = le(/* @__PURE__ */ new Set()), H = le(!1), N = le({ x: 0, y: 0 }), j = le(!1), I = (R) => {
    if (H.current || k) {
      H.current = !1;
      return;
    }
    l?.(R), m.getState().resetSelectedElements(), m.setState({ nodesSelectionActive: !1 });
  }, A = (R) => {
    if (Array.isArray(o) && o?.includes(2)) {
      R.preventDefault();
      return;
    }
    f?.(R);
  }, $ = d ? (R) => d(R) : void 0, D = (R) => {
    H.current && (R.stopPropagation(), H.current = !1);
  }, W = (R) => {
    const { domNode: q, transform: ie } = m.getState();
    if (B.current = q?.getBoundingClientRect(), !B.current)
      return;
    const re = R.target === T.current;
    if (!re && !!R.target.closest(".nokey") || !e || !(s && re || t) || R.button !== 0 || !R.isPrimary)
      return;
    R.target?.setPointerCapture?.(R.pointerId), H.current = !1;
    const { x: ae, y: L } = Ze(R.nativeEvent, B.current), K = Qt({ x: ae, y: L }, ie);
    m.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: K.x,
        startY: K.y,
        x: ae,
        y: L
      }
    }), re || (R.stopPropagation(), R.preventDefault());
  };
  function O(R, q) {
    const { userSelectionRect: ie } = m.getState();
    if (!ie)
      return;
    const { transform: re, nodeLookup: G, edgeLookup: ee, connectionLookup: ae, triggerNodeChanges: L, triggerEdgeChanges: K, defaultEdgeOptions: pe } = m.getState(), ue = { x: ie.startX, y: ie.startY }, { x: _e, y: Be } = Kt(ue, re), Fe = {
      startX: ue.x,
      startY: ue.y,
      x: R < _e ? R : _e,
      y: q < Be ? q : Be,
      width: Math.abs(R - _e),
      height: Math.abs(q - Be)
    }, mt = _.current, nt = z.current;
    _.current = new Set(ki(G, Fe, re, n === zn.Partial, !0).map((je) => je.id)), z.current = /* @__PURE__ */ new Set();
    const Ie = pe?.selectable ?? !0;
    for (const je of _.current) {
      const $e = ae.get(je);
      if ($e)
        for (const { edgeId: ze } of $e.values()) {
          const Ge = ee.get(ze);
          Ge && (Ge.selectable ?? Ie) && z.current.add(ze);
        }
    }
    if (!ys(mt, _.current)) {
      const je = Ot(G, _.current, !0);
      L(je);
    }
    if (!ys(nt, z.current)) {
      const je = Ot(ee, z.current);
      K(je);
    }
    m.setState({
      userSelectionRect: Fe,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function F() {
    if (!r || !B.current)
      return;
    const [R, q] = Ii(N.current, B.current, C);
    E({ x: R, y: q }).then((ie) => {
      if (!H.current || !ie) {
        w.current = requestAnimationFrame(F);
        return;
      }
      const { x: re, y: G } = N.current;
      O(re, G), w.current = requestAnimationFrame(F);
    });
  }
  const U = () => {
    cancelAnimationFrame(w.current), w.current = 0, j.current = !1;
  };
  oe(() => () => U(), []);
  const Z = (R) => {
    const { userSelectionRect: q, transform: ie, resetSelectedElements: re } = m.getState();
    if (!B.current || !q)
      return;
    const { x: G, y: ee } = Ze(R.nativeEvent, B.current);
    N.current = { x: G, y: ee };
    const ae = Kt({ x: q.startX, y: q.startY }, ie);
    if (!H.current) {
      const L = t ? 0 : i;
      if (Math.hypot(G - ae.x, ee - ae.y) <= L)
        return;
      re(), c?.(R);
    }
    H.current = !0, j.current || (F(), j.current = !0), O(G, ee);
  }, ne = (R) => {
    R.button === 0 && (R.target?.releasePointerCapture?.(R.pointerId), !b && R.target === T.current && m.getState().userSelectionRect && I?.(R), m.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), H.current && (u?.(R), m.setState({
      nodesSelectionActive: _.current.size > 0
    })), U());
  }, ce = (R) => {
    R.target?.releasePointerCapture?.(R.pointerId), U();
  }, J = o === !0 || Array.isArray(o) && o.includes(0);
  return a.jsxs("div", { className: Ee(["react-flow__pane", { draggable: J, dragging: v, selection: e }]), onClick: P ? void 0 : Xr(I, T), onContextMenu: Xr(A, T), onWheel: Xr($, T), onPointerEnter: P ? void 0 : h, onPointerMove: P ? Z : p, onPointerUp: P ? ne : void 0, onPointerCancel: P ? ce : void 0, onPointerDownCapture: P ? W : void 0, onClickCapture: P ? D : void 0, onPointerLeave: g, ref: T, style: rr, children: [x, a.jsx(zg, {})] });
}
function ci({ id: e, store: t, unselect: n = !1, nodeRef: o }) {
  const { addSelectedNodes: r, unselectNodesAndEdges: i, multiSelectionActive: s, nodeLookup: c, onError: u } = t.getState(), l = c.get(e);
  if (!l) {
    u?.("012", Oe.error012(e));
    return;
  }
  t.setState({ nodesSelectionActive: !1 }), l.selected ? (n || l.selected && s) && (i({ nodes: [l], edges: [] }), requestAnimationFrame(() => o?.current?.blur())) : r([e]);
}
function Kc({ nodeRef: e, disabled: t = !1, noDragClassName: n, handleSelector: o, nodeId: r, isSelectable: i, nodeClickDistance: s }) {
  const c = xe(), [u, l] = Y(!1), f = le();
  return oe(() => {
    f.current = Np({
      getStoreItems: () => c.getState(),
      onNodeMouseDown: (d) => {
        ci({
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
  }, []), oe(() => {
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
const Vg = (e) => (t) => t.selected && (t.draggable || e && typeof t.draggable > "u");
function Uc() {
  const e = xe();
  return ge((n) => {
    const { nodeExtent: o, snapToGrid: r, snapGrid: i, nodesDraggable: s, onError: c, updateNodePositions: u, nodeLookup: l, nodeOrigin: f } = e.getState(), d = /* @__PURE__ */ new Map(), h = Vg(s), p = r ? i[0] : 5, g = r ? i[1] : 5, x = n.direction.x * p * n.factor, w = n.direction.y * g * n.factor;
    for (const [, m] of l) {
      if (!h(m))
        continue;
      let b = {
        x: m.internals.positionAbsolute.x + x,
        y: m.internals.positionAbsolute.y + w
      };
      r && (b = Yn(b, i));
      const { position: y, positionAbsolute: v } = fc({
        nodeId: m.id,
        nextPosition: b,
        nodeLookup: l,
        nodeExtent: o,
        nodeOrigin: f,
        onError: c
      });
      m.position = y, m.internals.positionAbsolute = v, d.set(m.id, m);
    }
    u(d);
  }, []);
}
const $i = yi(null), Hg = $i.Provider;
$i.Consumer;
const Gc = () => On($i), Og = (e) => ({
  connectOnClick: e.connectOnClick,
  noPanClassName: e.noPanClassName,
  rfId: e.rfId
}), Bg = (e, t, n) => (o) => {
  const { connectionClickStartHandle: r, connectionMode: i, connection: s } = o, { fromHandle: c, toHandle: u, isValid: l } = s, f = u?.nodeId === e && u?.id === t && u?.type === n;
  return {
    connectingFrom: c?.nodeId === e && c?.id === t && c?.type === n,
    connectingTo: f,
    clickConnecting: r?.nodeId === e && r?.id === t && r?.type === n,
    isPossibleEndHandle: i === Yt.Strict ? c?.type !== n : e !== c?.nodeId || t !== c?.id,
    connectionInProcess: !!c,
    clickConnectionInProcess: !!r,
    valid: f && l
  };
};
function Fg({ type: e = "source", position: t = te.Top, isValidConnection: n, isConnectable: o = !0, isConnectableStart: r = !0, isConnectableEnd: i = !0, id: s, onConnect: c, children: u, className: l, onMouseDown: f, onTouchStart: d, ...h }, p) {
  const g = s || null, x = e === "target", w = xe(), m = Gc(), { connectOnClick: b, noPanClassName: y, rfId: v } = fe(Og, me), { connectingFrom: k, connectingTo: E, clickConnecting: C, isPossibleEndHandle: P, connectionInProcess: T, clickConnectionInProcess: B, valid: _ } = fe(Bg(m, g, e), me);
  m || w.getState().onError?.("010", Oe.error010());
  const z = (j) => {
    const { defaultEdgeOptions: I, onConnect: A, hasDefaultEdges: $ } = w.getState(), D = {
      ...I,
      ...j
    };
    if ($) {
      const { edges: W, setEdges: O, onError: F } = w.getState();
      O(Yc(D, W, { onError: F }));
    }
    A?.(D), c?.(D);
  }, H = (j) => {
    if (!m)
      return;
    const I = vc(j.nativeEvent);
    if (r && (I && j.button === 0 || !I)) {
      const A = w.getState();
      ai.onPointerDown(j.nativeEvent, {
        handleDomNode: j.currentTarget,
        autoPanOnConnect: A.autoPanOnConnect,
        connectionMode: A.connectionMode,
        connectionRadius: A.connectionRadius,
        domNode: A.domNode,
        nodeLookup: A.nodeLookup,
        lib: A.lib,
        isTarget: x,
        handleId: g,
        nodeId: m,
        flowId: A.rfId,
        panBy: A.panBy,
        cancelConnection: A.cancelConnection,
        onConnectStart: A.onConnectStart,
        onConnectEnd: (...$) => w.getState().onConnectEnd?.(...$),
        updateConnection: A.updateConnection,
        onConnect: z,
        isValidConnection: n || ((...$) => w.getState().isValidConnection?.(...$) ?? !0),
        getTransform: () => w.getState().transform,
        getFromHandle: () => w.getState().connection.fromHandle,
        autoPanSpeed: A.autoPanSpeed,
        dragThreshold: A.connectionDragThreshold
      });
    }
    I ? f?.(j) : d?.(j);
  }, N = (j) => {
    const { onClickConnectStart: I, onClickConnectEnd: A, connectionClickStartHandle: $, connectionMode: D, isValidConnection: W, lib: O, rfId: F, nodeLookup: U, connection: Z } = w.getState();
    if (!m || !$ && !r)
      return;
    if (!$) {
      I?.(j.nativeEvent, { nodeId: m, handleId: g, handleType: e }), w.setState({ connectionClickStartHandle: { nodeId: m, type: e, id: g } });
      return;
    }
    const ne = xc(j.target), ce = n || W, { connection: J, isValid: R } = ai.isValid(j.nativeEvent, {
      handle: {
        nodeId: m,
        id: g,
        type: e
      },
      connectionMode: D,
      fromNodeId: $.nodeId,
      fromHandleId: $.id || null,
      fromType: $.type,
      isValidConnection: ce,
      flowId: F,
      doc: ne,
      lib: O,
      nodeLookup: U
    });
    R && J && z(J);
    const q = structuredClone(Z);
    delete q.inProgress, q.toPosition = q.toHandle ? q.toHandle.position : null, A?.(j, q), w.setState({ connectionClickStartHandle: null });
  };
  return a.jsx("div", { "data-handleid": g, "data-nodeid": m, "data-handlepos": t, "data-id": `${v}-${m}-${g}-${e}`, className: Ee([
    "react-flow__handle",
    `react-flow__handle-${t}`,
    "nodrag",
    y,
    l,
    {
      source: !x,
      target: x,
      connectable: o,
      connectablestart: r,
      connectableend: i,
      clickconnecting: C,
      connectingfrom: k,
      connectingto: E,
      valid: _,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: o && (!T || P) && (T || B ? i : r)
    }
  ]), onMouseDown: H, onTouchStart: H, onClick: b ? N : void 0, ref: p, ...h, children: u });
}
const Gt = be(qc(Fg));
function Wg({ data: e, isConnectable: t, sourcePosition: n = te.Bottom }) {
  return a.jsxs(a.Fragment, { children: [e?.label, a.jsx(Gt, { type: "source", position: n, isConnectable: t })] });
}
function Xg({ data: e, isConnectable: t, targetPosition: n = te.Top, sourcePosition: o = te.Bottom }) {
  return a.jsxs(a.Fragment, { children: [a.jsx(Gt, { type: "target", position: n, isConnectable: t }), e?.label, a.jsx(Gt, { type: "source", position: o, isConnectable: t })] });
}
function Yg() {
  return null;
}
function qg({ data: e, isConnectable: t, targetPosition: n = te.Top }) {
  return a.jsxs(a.Fragment, { children: [a.jsx(Gt, { type: "target", position: n, isConnectable: t }), e?.label] });
}
const Bo = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, Zs = {
  input: Wg,
  default: Xg,
  output: qg,
  group: Yg
};
function Zg(e) {
  return e.internals.handleBounds === void 0 ? {
    width: e.width ?? e.initialWidth ?? e.style?.width,
    height: e.height ?? e.initialHeight ?? e.style?.height
  } : {
    width: e.width ?? e.style?.width,
    height: e.height ?? e.style?.height
  };
}
const Kg = (e) => {
  const { width: t, height: n, x: o, y: r } = Xn(e.nodeLookup, {
    filter: (i) => !!i.selected
  });
  return {
    width: qe(t) ? t : null,
    height: qe(n) ? n : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${o}px,${r}px)`
  };
};
function Ug({ onSelectionContextMenu: e, noPanClassName: t, disableKeyboardA11y: n }) {
  const o = xe(), { width: r, height: i, transformString: s, userSelectionActive: c } = fe(Kg, me), u = Uc(), l = le(null);
  oe(() => {
    n || l.current?.focus({
      preventScroll: !0
    });
  }, [n]);
  const f = !c && r !== null && i !== null;
  if (Kc({
    nodeRef: l,
    disabled: !f
  }), !f)
    return null;
  const d = e ? (p) => {
    const g = o.getState().nodes.filter((x) => x.selected);
    e(p, g);
  } : void 0, h = (p) => {
    Object.prototype.hasOwnProperty.call(Bo, p.key) && (p.preventDefault(), u({
      direction: Bo[p.key],
      factor: p.shiftKey ? 4 : 1
    }));
  };
  return a.jsx("div", { className: Ee(["react-flow__nodesselection", "react-flow__container", t]), style: {
    transform: s
  }, children: a.jsx("div", { ref: l, className: "react-flow__nodesselection-rect", onContextMenu: d, tabIndex: n ? void 0 : -1, onKeyDown: n ? void 0 : h, style: {
    width: r,
    height: i
  } }) });
}
const Ks = typeof window < "u" ? window : void 0, Gg = (e) => ({ nodesSelectionActive: e.nodesSelectionActive, userSelectionActive: e.userSelectionActive });
function Jc({ children: e, onPaneClick: t, onPaneMouseEnter: n, onPaneMouseMove: o, onPaneMouseLeave: r, onPaneContextMenu: i, onPaneScroll: s, paneClickDistance: c, deleteKeyCode: u, selectionKeyCode: l, selectionOnDrag: f, selectionMode: d, onSelectionStart: h, onSelectionEnd: p, multiSelectionKeyCode: g, panActivationKeyCode: x, zoomActivationKeyCode: w, elementsSelectable: m, zoomOnScroll: b, zoomOnPinch: y, panOnScroll: v, panOnScrollSpeed: k, panOnScrollMode: E, zoomOnDoubleClick: C, panOnDrag: P, autoPanOnSelection: T, defaultViewport: B, translateExtent: _, minZoom: z, maxZoom: H, preventScrolling: N, onSelectionContextMenu: j, noWheelClassName: I, noPanClassName: A, disableKeyboardA11y: $, onViewportChange: D, isControlledViewport: W }) {
  const { nodesSelectionActive: O, userSelectionActive: F } = fe(Gg, me), U = Vn(l, { target: Ks }), Z = Vn(x, { target: Ks }), ne = Z || P, ce = Z || v, J = f && ne !== !0, R = U || F || J;
  return Mg({ deleteKeyCode: u, multiSelectionKeyCode: g }), a.jsx(Tg, { onPaneContextMenu: i, elementsSelectable: m, zoomOnScroll: b, zoomOnPinch: y, panOnScroll: ce, panOnScrollSpeed: k, panOnScrollMode: E, zoomOnDoubleClick: C, panOnDrag: !U && ne, defaultViewport: B, translateExtent: _, minZoom: z, maxZoom: H, zoomActivationKeyCode: w, preventScrolling: N, noWheelClassName: I, noPanClassName: A, onViewportChange: D, isControlledViewport: W, paneClickDistance: c, selectionOnDrag: J, children: a.jsxs(Lg, { onSelectionStart: h, onSelectionEnd: p, onPaneClick: t, onPaneMouseEnter: n, onPaneMouseMove: o, onPaneMouseLeave: r, onPaneContextMenu: i, onPaneScroll: s, panOnDrag: ne, autoPanOnSelection: T, isSelecting: !!R, selectionMode: d, selectionKeyPressed: U, paneClickDistance: c, selectionOnDrag: J, children: [e, O && a.jsx(Ug, { onSelectionContextMenu: j, noPanClassName: A, disableKeyboardA11y: $ })] }) });
}
Jc.displayName = "FlowRenderer";
const Jg = be(Jc), Qg = (e) => (t) => e ? ki(t.nodeLookup, { x: 0, y: 0, width: t.width, height: t.height }, t.transform, !0).map((n) => n.id) : Array.from(t.nodeLookup.keys());
function ey(e) {
  return fe(ge(Qg(e), [e]), me);
}
const ty = (e) => e.updateNodeInternals;
function ny() {
  const e = fe(ty), [t] = Y(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((n) => {
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
  return oe(() => () => {
    t?.disconnect();
  }, [t]), t;
}
function oy({ node: e, nodeType: t, hasDimensions: n, resizeObserver: o }) {
  const r = xe(), i = le(null), s = le(null), c = le(e.sourcePosition), u = le(e.targetPosition), l = le(t), f = n && !!e.internals.handleBounds;
  return oe(() => {
    i.current && !e.hidden && (!f || s.current !== i.current) && (s.current && o?.unobserve(s.current), o?.observe(i.current), s.current = i.current);
  }, [f, e.hidden]), oe(() => () => {
    s.current && (o?.unobserve(s.current), s.current = null);
  }, []), oe(() => {
    if (i.current) {
      const d = l.current !== t, h = c.current !== e.sourcePosition, p = u.current !== e.targetPosition;
      (d || h || p) && (l.current = t, c.current = e.sourcePosition, u.current = e.targetPosition, r.getState().updateNodeInternals(/* @__PURE__ */ new Map([[e.id, { id: e.id, nodeElement: i.current, force: !0 }]])));
    }
  }, [e.id, t, e.sourcePosition, e.targetPosition]), i;
}
function ry({ id: e, onClick: t, onMouseEnter: n, onMouseMove: o, onMouseLeave: r, onContextMenu: i, onDoubleClick: s, nodesDraggable: c, elementsSelectable: u, nodesConnectable: l, nodesFocusable: f, resizeObserver: d, noDragClassName: h, noPanClassName: p, disableKeyboardA11y: g, rfId: x, nodeTypes: w, nodeClickDistance: m, onError: b }) {
  const { node: y, internals: v, isParent: k } = fe((R) => {
    const q = R.nodeLookup.get(e), ie = R.parentLookup.has(e);
    return {
      node: q,
      internals: q.internals,
      isParent: ie
    };
  }, me);
  let E = y.type || "default", C = w?.[E] || Zs[E];
  C === void 0 && (b?.("003", Oe.error003(E)), E = "default", C = w?.default || Zs.default);
  const P = !!(y.draggable || c && typeof y.draggable > "u"), T = !!(y.selectable || u && typeof y.selectable > "u"), B = !!(y.connectable || l && typeof y.connectable > "u"), _ = !!(y.focusable || f && typeof y.focusable > "u"), z = xe(), H = yc(y), N = oy({ node: y, nodeType: E, hasDimensions: H, resizeObserver: d }), j = Kc({
    nodeRef: N,
    disabled: y.hidden || !P,
    noDragClassName: h,
    handleSelector: y.dragHandle,
    nodeId: e,
    isSelectable: T,
    nodeClickDistance: m
  }), I = Uc();
  if (y.hidden)
    return null;
  const A = ct(y), $ = Zg(y), D = T || P || t || n || o || r, W = n ? (R) => n(R, { ...v.userNode }) : void 0, O = o ? (R) => o(R, { ...v.userNode }) : void 0, F = r ? (R) => r(R, { ...v.userNode }) : void 0, U = i ? (R) => i(R, { ...v.userNode }) : void 0, Z = s ? (R) => s(R, { ...v.userNode }) : void 0, ne = (R) => {
    const { selectNodesOnDrag: q, nodeDragThreshold: ie } = z.getState();
    T && (!q || !P || ie > 0) && ci({
      id: e,
      store: z,
      nodeRef: N
    }), t && t(R, { ...v.userNode });
  }, ce = (R) => {
    if (!(wc(R.nativeEvent) || g)) {
      if (ac.includes(R.key) && T) {
        const q = R.key === "Escape";
        ci({
          id: e,
          store: z,
          unselect: q,
          nodeRef: N
        });
      } else if (P && y.selected && Object.prototype.hasOwnProperty.call(Bo, R.key)) {
        R.preventDefault();
        const { ariaLabelConfig: q } = z.getState();
        z.setState({
          ariaLiveMessage: q["node.a11yDescription.ariaLiveMessage"]({
            direction: R.key.replace("Arrow", "").toLowerCase(),
            x: ~~v.positionAbsolute.x,
            y: ~~v.positionAbsolute.y
          })
        }), I({
          direction: Bo[R.key],
          factor: R.shiftKey ? 4 : 1
        });
      }
    }
  }, J = () => {
    if (g || !N.current?.matches(":focus-visible"))
      return;
    const { transform: R, width: q, height: ie, autoPanOnNodeFocus: re, setCenter: G } = z.getState();
    if (!re)
      return;
    ki(/* @__PURE__ */ new Map([[e, y]]), { x: 0, y: 0, width: q, height: ie }, R, !0).length > 0 || G(y.position.x + A.width / 2, y.position.y + A.height / 2, {
      zoom: R[2]
    });
  };
  return a.jsx("div", { className: Ee([
    "react-flow__node",
    `react-flow__node-${E}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [p]: P
    },
    y.className,
    {
      selected: y.selected,
      selectable: T,
      parent: k,
      draggable: P,
      dragging: j
    }
  ]), ref: N, style: {
    zIndex: v.z,
    transform: `translate(${v.positionAbsolute.x}px,${v.positionAbsolute.y}px)`,
    pointerEvents: D ? "all" : "none",
    visibility: H ? "visible" : "hidden",
    ...y.style,
    ...$
  }, "data-id": e, "data-testid": `rf__node-${e}`, onMouseEnter: W, onMouseMove: O, onMouseLeave: F, onContextMenu: U, onClick: ne, onDoubleClick: Z, onKeyDown: _ ? ce : void 0, tabIndex: _ ? 0 : void 0, onFocus: _ ? J : void 0, role: y.ariaRole ?? (_ ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": g ? void 0 : `${Vc}-${x}`, "aria-label": y.ariaLabel, ...y.domAttributes, children: a.jsx(Hg, { value: e, children: a.jsx(C, { id: e, data: y.data, type: E, positionAbsoluteX: v.positionAbsolute.x, positionAbsoluteY: v.positionAbsolute.y, selected: y.selected ?? !1, selectable: T, draggable: P, deletable: y.deletable ?? !0, isConnectable: B, sourcePosition: y.sourcePosition, targetPosition: y.targetPosition, dragging: j, dragHandle: y.dragHandle, zIndex: v.z, parentId: y.parentId, ...A }) }) });
}
var iy = be(ry);
const sy = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError
});
function Qc(e) {
  const { nodesDraggable: t, nodesConnectable: n, nodesFocusable: o, elementsSelectable: r, onError: i } = fe(sy, me), s = ey(e.onlyRenderVisibleElements), c = ny();
  return a.jsx("div", { className: "react-flow__nodes", style: rr, children: s.map((u) => (
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
    a.jsx(iy, { id: u, nodeTypes: e.nodeTypes, nodeExtent: e.nodeExtent, onClick: e.onNodeClick, onMouseEnter: e.onNodeMouseEnter, onMouseMove: e.onNodeMouseMove, onMouseLeave: e.onNodeMouseLeave, onContextMenu: e.onNodeContextMenu, onDoubleClick: e.onNodeDoubleClick, noDragClassName: e.noDragClassName, noPanClassName: e.noPanClassName, rfId: e.rfId, disableKeyboardA11y: e.disableKeyboardA11y, resizeObserver: c, nodesDraggable: t, nodesConnectable: n, nodesFocusable: o, elementsSelectable: r, nodeClickDistance: e.nodeClickDistance, onError: i }, u)
  )) });
}
Qc.displayName = "NodeRenderer";
const ay = be(Qc);
function cy(e) {
  return fe(ge((n) => {
    if (!e)
      return n.edges.map((r) => r.id);
    const o = [];
    if (n.width && n.height)
      for (const r of n.edges) {
        const i = n.nodeLookup.get(r.source), s = n.nodeLookup.get(r.target);
        i && s && op({
          sourceNode: i,
          targetNode: s,
          width: n.width,
          height: n.height,
          transform: n.transform
        }) && o.push(r.id);
      }
    return o;
  }, [e]), me);
}
const ly = ({ color: e = "none", strokeWidth: t = 1 }) => {
  const n = {
    strokeWidth: t,
    ...e && { stroke: e }
  };
  return a.jsx("polyline", { className: "arrow", style: n, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, uy = ({ color: e = "none", strokeWidth: t = 1 }) => {
  const n = {
    strokeWidth: t,
    ...e && { stroke: e, fill: e }
  };
  return a.jsx("polyline", { className: "arrowclosed", style: n, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, Us = {
  [Vo.Arrow]: ly,
  [Vo.ArrowClosed]: uy
};
function dy(e) {
  const t = xe();
  return ye(() => Object.prototype.hasOwnProperty.call(Us, e) ? Us[e] : (t.getState().onError?.("009", Oe.error009(e)), null), [e]);
}
const fy = ({ id: e, type: t, color: n, width: o = 12.5, height: r = 12.5, markerUnits: i = "strokeWidth", strokeWidth: s, orient: c = "auto-start-reverse" }) => {
  const u = dy(t);
  return u ? a.jsx("marker", { className: "react-flow__arrowhead", id: e, markerWidth: `${o}`, markerHeight: `${r}`, viewBox: "-10 -10 20 20", markerUnits: i, orient: c, refX: "0", refY: "0", children: a.jsx(u, { color: n, strokeWidth: s }) }) : null;
}, el = ({ defaultColor: e, rfId: t }) => {
  const n = fe((i) => i.edges), o = fe((i) => i.defaultEdgeOptions), r = ye(() => dp(n, {
    id: t,
    defaultColor: e,
    defaultMarkerStart: o?.markerStart,
    defaultMarkerEnd: o?.markerEnd
  }), [n, o, t, e]);
  return r.length ? a.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: a.jsx("defs", { children: r.map((i) => a.jsx(fy, { id: i.id, type: i.type, color: i.color, width: i.width, height: i.height, markerUnits: i.markerUnits, strokeWidth: i.strokeWidth, orient: i.orient }, i.id)) }) }) : null;
};
el.displayName = "MarkerDefinitions";
var hy = be(el);
function tl({ x: e, y: t, label: n, labelStyle: o, labelShowBg: r = !0, labelBgStyle: i, labelBgPadding: s = [2, 4], labelBgBorderRadius: c = 2, children: u, className: l, ...f }) {
  const [d, h] = Y({ x: 1, y: 0, width: 0, height: 0 }), p = Ee(["react-flow__edge-textwrapper", l]), g = le(null);
  return oe(() => {
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
tl.displayName = "EdgeText";
const py = be(tl);
function qn({ path: e, labelX: t, labelY: n, label: o, labelStyle: r, labelShowBg: i, labelBgStyle: s, labelBgPadding: c, labelBgBorderRadius: u, interactionWidth: l = 20, ...f }) {
  return a.jsxs(a.Fragment, { children: [a.jsx("path", { ...f, d: e, fill: "none", className: Ee(["react-flow__edge-path", f.className]) }), l ? a.jsx("path", { d: e, fill: "none", strokeOpacity: 0, strokeWidth: l, className: "react-flow__edge-interaction" }) : null, o && qe(t) && qe(n) ? a.jsx(py, { x: t, y: n, label: o, labelStyle: r, labelShowBg: i, labelBgStyle: s, labelBgPadding: c, labelBgBorderRadius: u }) : null] });
}
function Gs({ pos: e, x1: t, y1: n, x2: o, y2: r }) {
  return e === te.Left || e === te.Right ? [0.5 * (t + o), n] : [t, 0.5 * (n + r)];
}
function nl({ sourceX: e, sourceY: t, sourcePosition: n = te.Bottom, targetX: o, targetY: r, targetPosition: i = te.Top }) {
  const [s, c] = Gs({
    pos: n,
    x1: e,
    y1: t,
    x2: o,
    y2: r
  }), [u, l] = Gs({
    pos: i,
    x1: o,
    y1: r,
    x2: e,
    y2: t
  }), [f, d, h, p] = bc({
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
function ol(e) {
  return be(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: i, sourcePosition: s, targetPosition: c, label: u, labelStyle: l, labelShowBg: f, labelBgStyle: d, labelBgPadding: h, labelBgBorderRadius: p, style: g, markerEnd: x, markerStart: w, interactionWidth: m }) => {
    const [b, y, v] = nl({
      sourceX: n,
      sourceY: o,
      sourcePosition: s,
      targetX: r,
      targetY: i,
      targetPosition: c
    }), k = e.isInternal ? void 0 : t;
    return a.jsx(qn, { id: k, path: b, labelX: y, labelY: v, label: u, labelStyle: l, labelShowBg: f, labelBgStyle: d, labelBgPadding: h, labelBgBorderRadius: p, style: g, markerEnd: x, markerStart: w, interactionWidth: m });
  });
}
const gy = ol({ isInternal: !1 }), rl = ol({ isInternal: !0 });
gy.displayName = "SimpleBezierEdge";
rl.displayName = "SimpleBezierEdgeInternal";
function il(e) {
  return be(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: i, label: s, labelStyle: c, labelShowBg: u, labelBgStyle: l, labelBgPadding: f, labelBgBorderRadius: d, style: h, sourcePosition: p = te.Bottom, targetPosition: g = te.Top, markerEnd: x, markerStart: w, pathOptions: m, interactionWidth: b }) => {
    const [y, v, k] = Oo({
      sourceX: n,
      sourceY: o,
      sourcePosition: p,
      targetX: r,
      targetY: i,
      targetPosition: g,
      borderRadius: m?.borderRadius,
      offset: m?.offset,
      stepPosition: m?.stepPosition
    }), E = e.isInternal ? void 0 : t;
    return a.jsx(qn, { id: E, path: y, labelX: v, labelY: k, label: s, labelStyle: c, labelShowBg: u, labelBgStyle: l, labelBgPadding: f, labelBgBorderRadius: d, style: h, markerEnd: x, markerStart: w, interactionWidth: b });
  });
}
const sl = il({ isInternal: !1 }), al = il({ isInternal: !0 });
sl.displayName = "SmoothStepEdge";
al.displayName = "SmoothStepEdgeInternal";
function cl(e) {
  return be(({ id: t, ...n }) => {
    const o = e.isInternal ? void 0 : t;
    return a.jsx(sl, { ...n, id: o, pathOptions: ye(() => ({ borderRadius: 0, offset: n.pathOptions?.offset }), [n.pathOptions?.offset]) });
  });
}
const yy = cl({ isInternal: !1 }), ll = cl({ isInternal: !0 });
yy.displayName = "StepEdge";
ll.displayName = "StepEdgeInternal";
function ul(e) {
  return be(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: i, label: s, labelStyle: c, labelShowBg: u, labelBgStyle: l, labelBgPadding: f, labelBgBorderRadius: d, style: h, markerEnd: p, markerStart: g, interactionWidth: x }) => {
    const [w, m, b] = kc({ sourceX: n, sourceY: o, targetX: r, targetY: i }), y = e.isInternal ? void 0 : t;
    return a.jsx(qn, { id: y, path: w, labelX: m, labelY: b, label: s, labelStyle: c, labelShowBg: u, labelBgStyle: l, labelBgPadding: f, labelBgBorderRadius: d, style: h, markerEnd: p, markerStart: g, interactionWidth: x });
  });
}
const my = ul({ isInternal: !1 }), dl = ul({ isInternal: !0 });
my.displayName = "StraightEdge";
dl.displayName = "StraightEdgeInternal";
function fl(e) {
  return be(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: i, sourcePosition: s = te.Bottom, targetPosition: c = te.Top, label: u, labelStyle: l, labelShowBg: f, labelBgStyle: d, labelBgPadding: h, labelBgBorderRadius: p, style: g, markerEnd: x, markerStart: w, pathOptions: m, interactionWidth: b }) => {
    const [y, v, k] = Nc({
      sourceX: n,
      sourceY: o,
      sourcePosition: s,
      targetX: r,
      targetY: i,
      targetPosition: c,
      curvature: m?.curvature
    }), E = e.isInternal ? void 0 : t;
    return a.jsx(qn, { id: E, path: y, labelX: v, labelY: k, label: u, labelStyle: l, labelShowBg: f, labelBgStyle: d, labelBgPadding: h, labelBgBorderRadius: p, style: g, markerEnd: x, markerStart: w, interactionWidth: b });
  });
}
const xy = fl({ isInternal: !1 }), hl = fl({ isInternal: !0 });
xy.displayName = "BezierEdge";
hl.displayName = "BezierEdgeInternal";
const Js = {
  default: hl,
  straight: dl,
  step: ll,
  smoothstep: al,
  simplebezier: rl
}, Qs = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, wy = (e, t, n) => n === te.Left ? e - t : n === te.Right ? e + t : e, vy = (e, t, n) => n === te.Top ? e - t : n === te.Bottom ? e + t : e, ea = "react-flow__edgeupdater";
function ta({ position: e, centerX: t, centerY: n, radius: o = 10, onMouseDown: r, onMouseEnter: i, onMouseOut: s, type: c }) {
  return a.jsx("circle", { onMouseDown: r, onMouseEnter: i, onMouseOut: s, className: Ee([ea, `${ea}-${c}`]), cx: wy(t, o, e), cy: vy(n, o, e), r: o, stroke: "transparent", fill: "transparent" });
}
function by({ isReconnectable: e, reconnectRadius: t, edge: n, sourceX: o, sourceY: r, targetX: i, targetY: s, sourcePosition: c, targetPosition: u, onReconnect: l, onReconnectStart: f, onReconnectEnd: d, setReconnecting: h, setUpdateHover: p }) {
  const g = xe(), x = (v, k) => {
    if (v.button !== 0)
      return;
    const { autoPanOnConnect: E, domNode: C, connectionMode: P, connectionRadius: T, lib: B, onConnectStart: _, cancelConnection: z, nodeLookup: H, rfId: N, panBy: j, updateConnection: I } = g.getState(), A = k.type === "target", $ = (O, F) => {
      h(!1), d?.(O, n, k.type, F);
    }, D = (O) => l?.(n, O), W = (O, F) => {
      h(!0), f?.(v, n, k.type), _?.(O, F);
    };
    ai.onPointerDown(v.nativeEvent, {
      autoPanOnConnect: E,
      connectionMode: P,
      connectionRadius: T,
      domNode: C,
      handleId: k.id,
      nodeId: k.nodeId,
      nodeLookup: H,
      isTarget: A,
      edgeUpdaterType: k.type,
      lib: B,
      flowId: N,
      cancelConnection: z,
      panBy: j,
      isValidConnection: (...O) => g.getState().isValidConnection?.(...O) ?? !0,
      onConnect: D,
      onConnectStart: W,
      onConnectEnd: (...O) => g.getState().onConnectEnd?.(...O),
      onReconnectEnd: $,
      updateConnection: I,
      getTransform: () => g.getState().transform,
      getFromHandle: () => g.getState().connection.fromHandle,
      dragThreshold: g.getState().connectionDragThreshold,
      handleDomNode: v.currentTarget
    });
  }, w = (v) => x(v, { nodeId: n.target, id: n.targetHandle ?? null, type: "target" }), m = (v) => x(v, { nodeId: n.source, id: n.sourceHandle ?? null, type: "source" }), b = () => p(!0), y = () => p(!1);
  return a.jsxs(a.Fragment, { children: [(e === !0 || e === "source") && a.jsx(ta, { position: c, centerX: o, centerY: r, radius: t, onMouseDown: w, onMouseEnter: b, onMouseOut: y, type: "source" }), (e === !0 || e === "target") && a.jsx(ta, { position: u, centerX: i, centerY: s, radius: t, onMouseDown: m, onMouseEnter: b, onMouseOut: y, type: "target" })] });
}
function Ny({ id: e, edgesFocusable: t, edgesReconnectable: n, elementsSelectable: o, onClick: r, onDoubleClick: i, onContextMenu: s, onMouseEnter: c, onMouseMove: u, onMouseLeave: l, reconnectRadius: f, onReconnect: d, onReconnectStart: h, onReconnectEnd: p, rfId: g, edgeTypes: x, noPanClassName: w, onError: m, disableKeyboardA11y: b }) {
  let y = fe((G) => G.edgeLookup.get(e));
  const v = fe((G) => G.defaultEdgeOptions);
  y = v ? { ...v, ...y } : y;
  let k = y.type || "default", E = x?.[k] || Js[k];
  E === void 0 && (m?.("011", Oe.error011(k)), k = "default", E = x?.default || Js.default);
  const C = !!(y.focusable || t && typeof y.focusable > "u"), P = typeof d < "u" && (y.reconnectable || n && typeof y.reconnectable > "u"), T = !!(y.selectable || o && typeof y.selectable > "u"), B = le(null), [_, z] = Y(!1), [H, N] = Y(!1), j = xe(), { zIndex: I, sourceX: A, sourceY: $, targetX: D, targetY: W, sourcePosition: O, targetPosition: F } = fe(ge((G) => {
    const ee = G.nodeLookup.get(y.source), ae = G.nodeLookup.get(y.target);
    if (!ee || !ae)
      return {
        zIndex: y.zIndex,
        ...Qs
      };
    const L = up({
      id: e,
      sourceNode: ee,
      targetNode: ae,
      sourceHandle: y.sourceHandle || null,
      targetHandle: y.targetHandle || null,
      connectionMode: G.connectionMode,
      onError: m
    });
    return {
      zIndex: np({
        selected: y.selected,
        zIndex: y.zIndex,
        sourceNode: ee,
        targetNode: ae,
        elevateOnSelect: G.elevateEdgesOnSelect,
        zIndexMode: G.zIndexMode
      }),
      ...L || Qs
    };
  }, [y.source, y.target, y.sourceHandle, y.targetHandle, y.selected, y.zIndex]), me), U = ye(() => y.markerStart ? `url('#${ii(y.markerStart, g)}')` : void 0, [y.markerStart, g]), Z = ye(() => y.markerEnd ? `url('#${ii(y.markerEnd, g)}')` : void 0, [y.markerEnd, g]);
  if (y.hidden || A === null || $ === null || D === null || W === null)
    return null;
  const ne = (G) => {
    const { addSelectedEdges: ee, unselectNodesAndEdges: ae, multiSelectionActive: L } = j.getState();
    T && (j.setState({ nodesSelectionActive: !1 }), y.selected && L ? (ae({ nodes: [], edges: [y] }), B.current?.blur()) : ee([e])), r && r(G, y);
  }, ce = i ? (G) => {
    i(G, { ...y });
  } : void 0, J = s ? (G) => {
    s(G, { ...y });
  } : void 0, R = c ? (G) => {
    c(G, { ...y });
  } : void 0, q = u ? (G) => {
    u(G, { ...y });
  } : void 0, ie = l ? (G) => {
    l(G, { ...y });
  } : void 0, re = (G) => {
    if (!b && ac.includes(G.key) && T) {
      const { unselectNodesAndEdges: ee, addSelectedEdges: ae } = j.getState();
      G.key === "Escape" ? (B.current?.blur(), ee({ edges: [y] })) : ae([e]);
    }
  };
  return a.jsx("svg", { style: { zIndex: I }, children: a.jsxs("g", { className: Ee([
    "react-flow__edge",
    `react-flow__edge-${k}`,
    y.className,
    w,
    {
      selected: y.selected,
      animated: y.animated,
      inactive: !T && !r,
      updating: _,
      selectable: T
    }
  ]), onClick: ne, onDoubleClick: ce, onContextMenu: J, onMouseEnter: R, onMouseMove: q, onMouseLeave: ie, onKeyDown: C ? re : void 0, tabIndex: C ? 0 : void 0, role: y.ariaRole ?? (C ? "group" : "img"), "aria-roledescription": "edge", "data-id": e, "data-testid": `rf__edge-${e}`, "aria-label": y.ariaLabel === null ? void 0 : y.ariaLabel || `Edge from ${y.source} to ${y.target}`, "aria-describedby": C ? `${Hc}-${g}` : void 0, ref: B, ...y.domAttributes, children: [!H && a.jsx(E, { id: e, source: y.source, target: y.target, type: y.type, selected: y.selected, animated: y.animated, selectable: T, deletable: y.deletable ?? !0, label: y.label, labelStyle: y.labelStyle, labelShowBg: y.labelShowBg, labelBgStyle: y.labelBgStyle, labelBgPadding: y.labelBgPadding, labelBgBorderRadius: y.labelBgBorderRadius, sourceX: A, sourceY: $, targetX: D, targetY: W, sourcePosition: O, targetPosition: F, data: y.data, style: y.style, sourceHandleId: y.sourceHandle, targetHandleId: y.targetHandle, markerStart: U, markerEnd: Z, pathOptions: "pathOptions" in y ? y.pathOptions : void 0, interactionWidth: y.interactionWidth }), P && a.jsx(by, { edge: y, isReconnectable: P, reconnectRadius: f, onReconnect: d, onReconnectStart: h, onReconnectEnd: p, sourceX: A, sourceY: $, targetX: D, targetY: W, sourcePosition: O, targetPosition: F, setUpdateHover: z, setReconnecting: N })] }) });
}
var Sy = be(Ny);
const Ey = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError
});
function pl({ defaultMarkerColor: e, onlyRenderVisibleElements: t, rfId: n, edgeTypes: o, noPanClassName: r, onReconnect: i, onEdgeContextMenu: s, onEdgeMouseEnter: c, onEdgeMouseMove: u, onEdgeMouseLeave: l, onEdgeClick: f, reconnectRadius: d, onEdgeDoubleClick: h, onReconnectStart: p, onReconnectEnd: g, disableKeyboardA11y: x }) {
  const { edgesFocusable: w, edgesReconnectable: m, elementsSelectable: b, onError: y } = fe(Ey, me), v = cy(t);
  return a.jsxs("div", { className: "react-flow__edges", children: [a.jsx(hy, { defaultColor: e, rfId: n }), v.map((k) => a.jsx(Sy, { id: k, edgesFocusable: w, edgesReconnectable: m, elementsSelectable: b, noPanClassName: r, onReconnect: i, onContextMenu: s, onMouseEnter: c, onMouseMove: u, onMouseLeave: l, onClick: f, reconnectRadius: d, onDoubleClick: h, onReconnectStart: p, onReconnectEnd: g, rfId: n, onError: y, edgeTypes: o, disableKeyboardA11y: x }, k))] });
}
pl.displayName = "EdgeRenderer";
const ky = be(pl), Iy = (e) => `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function Cy({ children: e }) {
  const t = fe(Iy);
  return a.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: t }, children: e });
}
function _y(e) {
  const t = Ti(), n = le(!1);
  oe(() => {
    !n.current && t.viewportInitialized && e && (setTimeout(() => e(t), 1), n.current = !0);
  }, [e, t.viewportInitialized]);
}
const jy = (e) => e.panZoom?.syncViewport;
function Ay(e) {
  const t = fe(jy), n = xe();
  return oe(() => {
    e && (t?.(e), n.setState({ transform: [e.x, e.y, e.zoom] }));
  }, [e, t]), null;
}
function My(e) {
  return e.connection.inProgress ? { ...e.connection, to: Qt(e.connection.to, e.transform) } : { ...e.connection };
}
function Dy(e) {
  return My;
}
function Py(e) {
  const t = Dy();
  return fe(t, me);
}
const Ty = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height
});
function $y({ containerStyle: e, style: t, type: n, component: o }) {
  const { nodesConnectable: r, width: i, height: s, isValid: c, inProgress: u } = fe(Ty, me);
  return !(i && r && u) ? null : a.jsx("svg", { style: e, width: i, height: s, className: "react-flow__connectionline react-flow__container", children: a.jsx("g", { className: Ee(["react-flow__connection", uc(c)]), children: a.jsx(gl, { style: t, type: n, CustomComponent: o, isValid: c }) }) });
}
const gl = ({ style: e, type: t = pt.Bezier, CustomComponent: n, isValid: o }) => {
  const { inProgress: r, from: i, fromNode: s, fromHandle: c, fromPosition: u, to: l, toNode: f, toHandle: d, toPosition: h, pointer: p } = Py();
  if (!r)
    return;
  if (n)
    return a.jsx(n, { connectionLineType: t, connectionLineStyle: e, fromNode: s, fromHandle: c, fromX: i.x, fromY: i.y, toX: l.x, toY: l.y, fromPosition: u, toPosition: h, connectionStatus: uc(o), toNode: f, toHandle: d, pointer: p });
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
    case pt.Bezier:
      [g] = Nc(x);
      break;
    case pt.SimpleBezier:
      [g] = nl(x);
      break;
    case pt.Step:
      [g] = Oo({
        ...x,
        borderRadius: 0
      });
      break;
    case pt.SmoothStep:
      [g] = Oo(x);
      break;
    default:
      [g] = kc(x);
  }
  return a.jsx("path", { d: g, fill: "none", className: "react-flow__connection-path", style: e });
};
gl.displayName = "ConnectionLine";
const zy = {};
function na(e = zy) {
  le(e), xe(), oe(() => {
  }, [e]);
}
function Ry() {
  xe(), le(!1), oe(() => {
  }, []);
}
function yl({ nodeTypes: e, edgeTypes: t, onInit: n, onNodeClick: o, onEdgeClick: r, onNodeDoubleClick: i, onEdgeDoubleClick: s, onNodeMouseEnter: c, onNodeMouseMove: u, onNodeMouseLeave: l, onNodeContextMenu: f, onSelectionContextMenu: d, onSelectionStart: h, onSelectionEnd: p, connectionLineType: g, connectionLineStyle: x, connectionLineComponent: w, connectionLineContainerStyle: m, selectionKeyCode: b, selectionOnDrag: y, selectionMode: v, multiSelectionKeyCode: k, panActivationKeyCode: E, zoomActivationKeyCode: C, deleteKeyCode: P, onlyRenderVisibleElements: T, elementsSelectable: B, defaultViewport: _, translateExtent: z, minZoom: H, maxZoom: N, preventScrolling: j, defaultMarkerColor: I, zoomOnScroll: A, zoomOnPinch: $, panOnScroll: D, panOnScrollSpeed: W, panOnScrollMode: O, zoomOnDoubleClick: F, panOnDrag: U, autoPanOnSelection: Z, onPaneClick: ne, onPaneMouseEnter: ce, onPaneMouseMove: J, onPaneMouseLeave: R, onPaneScroll: q, onPaneContextMenu: ie, paneClickDistance: re, nodeClickDistance: G, onEdgeContextMenu: ee, onEdgeMouseEnter: ae, onEdgeMouseMove: L, onEdgeMouseLeave: K, reconnectRadius: pe, onReconnect: ue, onReconnectStart: _e, onReconnectEnd: Be, noDragClassName: Fe, noWheelClassName: mt, noPanClassName: nt, disableKeyboardA11y: Ie, nodeExtent: je, rfId: $e, viewport: ze, onViewportChange: Ge }) {
  return na(e), na(t), Ry(), _y(n), Ay(ze), a.jsx(Jg, { onPaneClick: ne, onPaneMouseEnter: ce, onPaneMouseMove: J, onPaneMouseLeave: R, onPaneContextMenu: ie, onPaneScroll: q, paneClickDistance: re, deleteKeyCode: P, selectionKeyCode: b, selectionOnDrag: y, selectionMode: v, onSelectionStart: h, onSelectionEnd: p, multiSelectionKeyCode: k, panActivationKeyCode: E, zoomActivationKeyCode: C, elementsSelectable: B, zoomOnScroll: A, zoomOnPinch: $, zoomOnDoubleClick: F, panOnScroll: D, panOnScrollSpeed: W, panOnScrollMode: O, panOnDrag: U, autoPanOnSelection: Z, defaultViewport: _, translateExtent: z, minZoom: H, maxZoom: N, onSelectionContextMenu: d, preventScrolling: j, noDragClassName: Fe, noWheelClassName: mt, noPanClassName: nt, disableKeyboardA11y: Ie, onViewportChange: Ge, isControlledViewport: !!ze, children: a.jsxs(Cy, { children: [a.jsx(ky, { edgeTypes: t, onEdgeClick: r, onEdgeDoubleClick: s, onReconnect: ue, onReconnectStart: _e, onReconnectEnd: Be, onlyRenderVisibleElements: T, onEdgeContextMenu: ee, onEdgeMouseEnter: ae, onEdgeMouseMove: L, onEdgeMouseLeave: K, reconnectRadius: pe, defaultMarkerColor: I, noPanClassName: nt, disableKeyboardA11y: Ie, rfId: $e }), a.jsx($y, { style: x, type: g, component: w, containerStyle: m }), a.jsx("div", { className: "react-flow__edgelabel-renderer" }), a.jsx(ay, { nodeTypes: e, onNodeClick: o, onNodeDoubleClick: i, onNodeMouseEnter: c, onNodeMouseMove: u, onNodeMouseLeave: l, onNodeContextMenu: f, nodeClickDistance: G, onlyRenderVisibleElements: T, noPanClassName: nt, noDragClassName: Fe, disableKeyboardA11y: Ie, nodeExtent: je, rfId: $e }), a.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
yl.displayName = "GraphView";
const Ly = be(yl), Vy = gc(), oa = ({ nodes: e, edges: t, defaultNodes: n, defaultEdges: o, width: r, height: i, fitView: s, fitViewOptions: c, minZoom: u = 0.5, maxZoom: l = 2, nodeOrigin: f, nodeExtent: d, zIndexMode: h = "basic" } = {}) => {
  const p = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), m = o ?? t ?? [], b = n ?? e ?? [], y = f ?? [0, 0], v = d ?? $n;
  _c(x, w, m);
  const { nodesInitialized: k } = si(b, p, g, {
    nodeOrigin: y,
    nodeExtent: v,
    zIndexMode: h
  });
  let E = [0, 0, 1];
  if (s && r && i) {
    const C = Xn(p, {
      filter: (_) => !!((_.width || _.initialWidth) && (_.height || _.initialHeight))
    }), { x: P, y: T, zoom: B } = Ci(C, r, i, u, l, c?.padding ?? 0.1);
    E = [P, T, B];
  }
  return {
    rfId: "1",
    width: r ?? 0,
    height: i ?? 0,
    transform: E,
    nodes: b,
    nodesInitialized: k,
    nodeLookup: p,
    parentLookup: g,
    edges: m,
    edgeLookup: w,
    connectionLookup: x,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: n !== void 0,
    hasDefaultEdges: o !== void 0,
    panZoom: null,
    minZoom: u,
    maxZoom: l,
    translateExtent: $n,
    nodeExtent: v,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: Yt.Strict,
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
    fitViewQueued: s ?? !1,
    fitViewOptions: c,
    fitViewResolver: null,
    connection: { ...lc },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: Vy,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: cc,
    zIndexMode: h,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, Hy = ({ nodes: e, edges: t, defaultNodes: n, defaultEdges: o, width: r, height: i, fitView: s, fitViewOptions: c, minZoom: u, maxZoom: l, nodeOrigin: f, nodeExtent: d, zIndexMode: h }) => Qp((p, g) => {
  async function x() {
    const { nodeLookup: w, panZoom: m, fitViewOptions: b, fitViewResolver: y, width: v, height: k, minZoom: E, maxZoom: C } = g();
    m && (await Kh({
      nodes: w,
      width: v,
      height: k,
      panZoom: m,
      minZoom: E,
      maxZoom: C
    }, b), y?.resolve(!0), p({ fitViewResolver: null }));
  }
  return {
    ...oa({
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
      const { nodeLookup: m, parentLookup: b, nodeOrigin: y, elevateNodesOnSelect: v, fitViewQueued: k, zIndexMode: E, nodesSelectionActive: C } = g(), { nodesInitialized: P, hasSelectedNodes: T } = si(w, m, b, {
        nodeOrigin: y,
        nodeExtent: d,
        elevateNodesOnSelect: v,
        checkEquality: !0,
        zIndexMode: E
      }), B = C && T;
      k && P ? (x(), p({
        nodes: w,
        nodesInitialized: P,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: B
      })) : p({ nodes: w, nodesInitialized: P, nodesSelectionActive: B });
    },
    setEdges: (w) => {
      const { connectionLookup: m, edgeLookup: b } = g();
      _c(m, b, w), p({ edges: w });
    },
    setDefaultNodesAndEdges: (w, m) => {
      if (w) {
        const { setNodes: b } = g();
        b(w), p({ hasDefaultNodes: !0 });
      }
      if (m) {
        const { setEdges: b } = g();
        b(m), p({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (w) => {
      const { triggerNodeChanges: m, nodeLookup: b, parentLookup: y, domNode: v, nodeOrigin: k, nodeExtent: E, debug: C, fitViewQueued: P, zIndexMode: T } = g(), { changes: B, updatedInternals: _ } = xp(w, b, y, v, k, E, T);
      _ && (pp(b, y, { nodeOrigin: k, nodeExtent: E, zIndexMode: T }), P ? (x(), p({ fitViewQueued: !1, fitViewOptions: void 0 })) : p({}), B?.length > 0 && (C && console.log("React Flow: trigger node changes", B), m?.(B)));
    },
    updateNodePositions: (w, m = !1) => {
      const b = [];
      let y = [];
      const { nodeLookup: v, triggerNodeChanges: k, connection: E, updateConnection: C, onNodesChangeMiddlewareMap: P } = g();
      for (const [T, B] of w) {
        const _ = v.get(T), z = !!(_?.expandParent && _?.parentId && B?.position), H = {
          id: T,
          type: "position",
          position: z ? {
            x: Math.max(0, B.position.x),
            y: Math.max(0, B.position.y)
          } : B.position,
          dragging: m
        };
        if (_ && E.inProgress && E.fromNode.id === _.id) {
          const N = Dt(_, E.fromHandle, te.Left, !0);
          C({ ...E, from: N });
        }
        z && _.parentId && b.push({
          id: T,
          parentId: _.parentId,
          rect: {
            ...B.internals.positionAbsolute,
            width: B.measured.width ?? 0,
            height: B.measured.height ?? 0
          }
        }), y.push(H);
      }
      if (b.length > 0) {
        const { parentLookup: T, nodeOrigin: B } = g(), _ = Pi(b, v, T, B);
        y.push(..._);
      }
      for (const T of P.values())
        y = T(y);
      k(y);
    },
    triggerNodeChanges: (w) => {
      const { onNodesChange: m, setNodes: b, nodes: y, hasDefaultNodes: v, debug: k } = g();
      if (w?.length) {
        if (v) {
          const E = Fc(w, y);
          b(E);
        }
        k && console.log("React Flow: trigger node changes", w), m?.(w);
      }
    },
    triggerEdgeChanges: (w) => {
      const { onEdgesChange: m, setEdges: b, edges: y, hasDefaultEdges: v, debug: k } = g();
      if (w?.length) {
        if (v) {
          const E = Wc(w, y);
          b(E);
        }
        k && console.log("React Flow: trigger edge changes", w), m?.(w);
      }
    },
    addSelectedNodes: (w) => {
      const { multiSelectionActive: m, edgeLookup: b, nodeLookup: y, triggerNodeChanges: v, triggerEdgeChanges: k } = g();
      if (m) {
        const E = w.map((C) => St(C, !0));
        v(E);
        return;
      }
      v(Ot(y, /* @__PURE__ */ new Set([...w]), !0)), k(Ot(b));
    },
    addSelectedEdges: (w) => {
      const { multiSelectionActive: m, edgeLookup: b, nodeLookup: y, triggerNodeChanges: v, triggerEdgeChanges: k } = g();
      if (m) {
        const E = w.map((C) => St(C, !0));
        k(E);
        return;
      }
      k(Ot(b, /* @__PURE__ */ new Set([...w]))), v(Ot(y, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: w, edges: m } = {}) => {
      const { edges: b, nodes: y, nodeLookup: v, triggerNodeChanges: k, triggerEdgeChanges: E } = g(), C = w || y, P = m || b, T = [];
      for (const _ of C) {
        if (!_.selected)
          continue;
        const z = v.get(_.id);
        z && (z.selected = !1), T.push(St(_.id, !1));
      }
      const B = [];
      for (const _ of P)
        _.selected && B.push(St(_.id, !1));
      k(T), E(B);
    },
    setMinZoom: (w) => {
      const { panZoom: m, maxZoom: b } = g();
      m?.setScaleExtent([w, b]), p({ minZoom: w });
    },
    setMaxZoom: (w) => {
      const { panZoom: m, minZoom: b } = g();
      m?.setScaleExtent([b, w]), p({ maxZoom: w });
    },
    setTranslateExtent: (w) => {
      g().panZoom?.setTranslateExtent(w), p({ translateExtent: w });
    },
    resetSelectedElements: () => {
      const { edges: w, nodes: m, triggerNodeChanges: b, triggerEdgeChanges: y, elementsSelectable: v } = g();
      if (!v)
        return;
      const k = m.reduce((C, P) => P.selected ? [...C, St(P.id, !1)] : C, []), E = w.reduce((C, P) => P.selected ? [...C, St(P.id, !1)] : C, []);
      b(k), y(E);
    },
    setNodeExtent: (w) => {
      const { nodes: m, nodeLookup: b, parentLookup: y, nodeOrigin: v, elevateNodesOnSelect: k, nodeExtent: E, zIndexMode: C } = g();
      w[0][0] === E[0][0] && w[0][1] === E[0][1] && w[1][0] === E[1][0] && w[1][1] === E[1][1] || (si(m, b, y, {
        nodeOrigin: v,
        nodeExtent: w,
        elevateNodesOnSelect: k,
        checkEquality: !1,
        zIndexMode: C
      }), p({ nodeExtent: w }));
    },
    panBy: (w) => {
      const { transform: m, width: b, height: y, panZoom: v, translateExtent: k } = g();
      return wp({ delta: w, panZoom: v, transform: m, translateExtent: k, width: b, height: y });
    },
    setCenter: async (w, m, b) => {
      const { width: y, height: v, maxZoom: k, panZoom: E } = g();
      if (!E)
        return !1;
      const C = typeof b?.zoom < "u" ? b.zoom : k;
      return await E.setViewport({
        x: y / 2 - w * C,
        y: v / 2 - m * C,
        zoom: C
      }, { duration: b?.duration, ease: b?.ease, interpolate: b?.interpolate }), !0;
    },
    cancelConnection: () => {
      p({
        connection: { ...lc }
      });
    },
    updateConnection: (w) => {
      p({ connection: w });
    },
    reset: () => p({ ...oa() })
  };
}, Object.is);
function Oy({ initialNodes: e, initialEdges: t, defaultNodes: n, defaultEdges: o, initialWidth: r, initialHeight: i, initialMinZoom: s, initialMaxZoom: c, initialFitViewOptions: u, fitView: l, nodeOrigin: f, nodeExtent: d, zIndexMode: h, children: p }) {
  const [g] = Y(() => Hy({
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
  return a.jsx(og, { value: g, children: a.jsx(Cg, { children: p }) });
}
function By({ children: e, nodes: t, edges: n, defaultNodes: o, defaultEdges: r, width: i, height: s, fitView: c, fitViewOptions: u, minZoom: l, maxZoom: f, nodeOrigin: d, nodeExtent: h, zIndexMode: p }) {
  return On(nr) ? a.jsx(a.Fragment, { children: e }) : a.jsx(Oy, { initialNodes: t, initialEdges: n, defaultNodes: o, defaultEdges: r, initialWidth: i, initialHeight: s, fitView: c, initialFitViewOptions: u, initialMinZoom: l, initialMaxZoom: f, nodeOrigin: d, nodeExtent: h, zIndexMode: p, children: e });
}
const Fy = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function Wy({ nodes: e, edges: t, defaultNodes: n, defaultEdges: o, className: r, nodeTypes: i, edgeTypes: s, onNodeClick: c, onEdgeClick: u, onInit: l, onMove: f, onMoveStart: d, onMoveEnd: h, onConnect: p, onConnectStart: g, onConnectEnd: x, onClickConnectStart: w, onClickConnectEnd: m, onNodeMouseEnter: b, onNodeMouseMove: y, onNodeMouseLeave: v, onNodeContextMenu: k, onNodeDoubleClick: E, onNodeDragStart: C, onNodeDrag: P, onNodeDragStop: T, onNodesDelete: B, onEdgesDelete: _, onDelete: z, onSelectionChange: H, onSelectionDragStart: N, onSelectionDrag: j, onSelectionDragStop: I, onSelectionContextMenu: A, onSelectionStart: $, onSelectionEnd: D, onBeforeDelete: W, connectionMode: O, connectionLineType: F = pt.Bezier, connectionLineStyle: U, connectionLineComponent: Z, connectionLineContainerStyle: ne, deleteKeyCode: ce = "Backspace", selectionKeyCode: J = "Shift", selectionOnDrag: R = !1, selectionMode: q = zn.Full, panActivationKeyCode: ie = "Space", multiSelectionKeyCode: re = Ln() ? "Meta" : "Control", zoomActivationKeyCode: G = Ln() ? "Meta" : "Control", snapToGrid: ee, snapGrid: ae, onlyRenderVisibleElements: L = !1, selectNodesOnDrag: K, nodesDraggable: pe, autoPanOnNodeFocus: ue, nodesConnectable: _e, nodesFocusable: Be, nodeOrigin: Fe = Oc, edgesFocusable: mt, edgesReconnectable: nt, elementsSelectable: Ie = !0, defaultViewport: je = yg, minZoom: $e = 0.5, maxZoom: ze = 2, translateExtent: Ge = $n, preventScrolling: en = !0, nodeExtent: lt, defaultMarkerColor: xt = "#b1b1b7", zoomOnScroll: wt = !0, zoomOnPinch: Je = !0, panOnScroll: Gn = !1, panOnScrollSpeed: Re = 0.5, panOnScrollMode: Jn = It.Free, zoomOnDoubleClick: we = !0, panOnDrag: We = !0, onPaneClick: tn, onPaneMouseEnter: ve, onPaneMouseMove: vt, onPaneMouseLeave: nn, onPaneScroll: Ce, onPaneContextMenu: bt, paneClickDistance: ut = 1, nodeClickDistance: cr = 0, children: Qn, onReconnect: eo, onReconnectStart: on, onReconnectEnd: lr, onEdgeContextMenu: rn, onEdgeDoubleClick: zt, onEdgeMouseEnter: Le, onEdgeMouseMove: sn, onEdgeMouseLeave: an, reconnectRadius: cn = 10, onNodesChange: Rt, onEdgesChange: ur, noDragClassName: dr = "nodrag", noWheelClassName: fr = "nowheel", noPanClassName: to = "nopan", fitView: ln, fitViewOptions: un, connectOnClick: no, attributionPosition: hr, proOptions: dn, defaultEdgeOptions: pr, elevateNodesOnSelect: gr = !0, elevateEdgesOnSelect: yr = !1, disableKeyboardA11y: oo = !1, autoPanOnConnect: mr, autoPanOnNodeDrag: fn, autoPanOnSelection: xr = !0, autoPanSpeed: wr, connectionRadius: vr, isValidConnection: br, onError: Nr, style: Sr, id: ro, nodeDragThreshold: io, connectionDragThreshold: so, viewport: Er, onViewportChange: kr, width: Ir, height: Cr, colorMode: _r = "light", debug: ao, onScroll: hn, ariaLabelConfig: co, zIndexMode: pn = "basic", ...lo }, jr) {
  const gn = ro || "1", uo = vg(_r), fo = ge((yn) => {
    yn.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), hn?.(yn);
  }, [hn]);
  return a.jsx("div", { "data-testid": "rf__wrapper", ...lo, onScroll: fo, style: { ...Sr, ...Fy }, ref: jr, className: Ee(["react-flow", r, uo]), id: ro, role: "application", children: a.jsxs(By, { nodes: e, edges: t, width: Ir, height: Cr, fitView: ln, fitViewOptions: un, minZoom: $e, maxZoom: ze, nodeOrigin: Fe, nodeExtent: lt, zIndexMode: pn, children: [a.jsx(wg, { nodes: e, edges: t, defaultNodes: n, defaultEdges: o, onConnect: p, onConnectStart: g, onConnectEnd: x, onClickConnectStart: w, onClickConnectEnd: m, nodesDraggable: pe, autoPanOnNodeFocus: ue, nodesConnectable: _e, nodesFocusable: Be, edgesFocusable: mt, edgesReconnectable: nt, elementsSelectable: Ie, elevateNodesOnSelect: gr, elevateEdgesOnSelect: yr, minZoom: $e, maxZoom: ze, nodeExtent: lt, onNodesChange: Rt, onEdgesChange: ur, snapToGrid: ee, snapGrid: ae, connectionMode: O, translateExtent: Ge, connectOnClick: no, defaultEdgeOptions: pr, fitView: ln, fitViewOptions: un, onNodesDelete: B, onEdgesDelete: _, onDelete: z, onNodeDragStart: C, onNodeDrag: P, onNodeDragStop: T, onSelectionDrag: j, onSelectionDragStart: N, onSelectionDragStop: I, onMove: f, onMoveStart: d, onMoveEnd: h, noPanClassName: to, nodeOrigin: Fe, rfId: gn, autoPanOnConnect: mr, autoPanOnNodeDrag: fn, autoPanSpeed: wr, onError: Nr, connectionRadius: vr, isValidConnection: br, selectNodesOnDrag: K, nodeDragThreshold: io, connectionDragThreshold: so, onBeforeDelete: W, debug: ao, ariaLabelConfig: co, zIndexMode: pn }), a.jsx(Ly, { onInit: l, onNodeClick: c, onEdgeClick: u, onNodeMouseEnter: b, onNodeMouseMove: y, onNodeMouseLeave: v, onNodeContextMenu: k, onNodeDoubleClick: E, nodeTypes: i, edgeTypes: s, connectionLineType: F, connectionLineStyle: U, connectionLineComponent: Z, connectionLineContainerStyle: ne, selectionKeyCode: J, selectionOnDrag: R, selectionMode: q, deleteKeyCode: ce, multiSelectionKeyCode: re, panActivationKeyCode: ie, zoomActivationKeyCode: G, onlyRenderVisibleElements: L, defaultViewport: je, translateExtent: Ge, minZoom: $e, maxZoom: ze, preventScrolling: en, zoomOnScroll: wt, zoomOnPinch: Je, zoomOnDoubleClick: we, panOnScroll: Gn, panOnScrollSpeed: Re, panOnScrollMode: Jn, panOnDrag: We, autoPanOnSelection: xr, onPaneClick: tn, onPaneMouseEnter: ve, onPaneMouseMove: vt, onPaneMouseLeave: nn, onPaneScroll: Ce, onPaneContextMenu: bt, paneClickDistance: ut, nodeClickDistance: cr, onSelectionContextMenu: A, onSelectionStart: $, onSelectionEnd: D, onReconnect: eo, onReconnectStart: on, onReconnectEnd: lr, onEdgeContextMenu: rn, onEdgeDoubleClick: zt, onEdgeMouseEnter: Le, onEdgeMouseMove: sn, onEdgeMouseLeave: an, reconnectRadius: cn, defaultMarkerColor: xt, noDragClassName: dr, noWheelClassName: fr, noPanClassName: to, rfId: gn, disableKeyboardA11y: oo, nodeExtent: lt, viewport: Er, onViewportChange: kr }), a.jsx(gg, { onSelectionChange: H }), Qn, a.jsx(ug, { proOptions: dn, position: hr }), a.jsx(lg, { rfId: gn, disableKeyboardA11y: oo })] }) });
}
var ml = qc(Wy);
const Xy = (e) => e.domNode?.querySelector(".react-flow__edgelabel-renderer");
function Yy({ children: e }) {
  const t = fe(Xy);
  return t ? ng.createPortal(e, t) : null;
}
function qy({ dimensions: e, lineWidth: t, variant: n, className: o }) {
  return a.jsx("path", { strokeWidth: t, d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`, className: Ee(["react-flow__background-pattern", n, o]) });
}
function Zy({ radius: e, className: t }) {
  return a.jsx("circle", { cx: e, cy: e, r: e, className: Ee(["react-flow__background-pattern", "dots", t]) });
}
var gt;
(function(e) {
  e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(gt || (gt = {}));
const Ky = {
  [gt.Dots]: 1,
  [gt.Lines]: 1,
  [gt.Cross]: 6
}, Uy = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function xl({
  id: e,
  variant: t = gt.Dots,
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
  const d = le(null), { transform: h, patternId: p } = fe(Uy, me), g = o || Ky[t], x = t === gt.Dots, w = t === gt.Cross, m = Array.isArray(n) ? n : [n, n], b = [m[0] * h[2] || 1, m[1] * h[2] || 1], y = g * h[2], v = Array.isArray(i) ? i : [i, i], k = w ? [y, y] : b, E = [
    v[0] * h[2] || 1 + k[0] / 2,
    v[1] * h[2] || 1 + k[1] / 2
  ], C = `${p}${e || ""}`;
  return a.jsxs("svg", { className: Ee(["react-flow__background", l]), style: {
    ...u,
    ...rr,
    "--xy-background-color-props": c,
    "--xy-background-pattern-color-props": s
  }, ref: d, "data-testid": "rf__background", children: [a.jsx("pattern", { id: C, x: h[0] % b[0], y: h[1] % b[1], width: b[0], height: b[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${E[0]},-${E[1]})`, children: x ? a.jsx(Zy, { radius: y / 2, className: f }) : a.jsx(qy, { dimensions: k, lineWidth: r, variant: t, className: f }) }), a.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${C})` })] });
}
xl.displayName = "Background";
const wl = be(xl);
function Gy() {
  return a.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: a.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function Jy() {
  return a.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: a.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function Qy() {
  return a.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: a.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function em() {
  return a.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: a.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function tm() {
  return a.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: a.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function bo({ children: e, className: t, ...n }) {
  return a.jsx("button", { type: "button", className: Ee(["react-flow__controls-button", t]), ...n, children: e });
}
const nm = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig
});
function vl({ style: e, showZoom: t = !0, showFitView: n = !0, showInteractive: o = !0, fitViewOptions: r, onZoomIn: i, onZoomOut: s, onFitView: c, onInteractiveChange: u, className: l, children: f, position: d = "bottom-left", orientation: h = "vertical", "aria-label": p }) {
  const g = xe(), { isInteractive: x, minZoomReached: w, maxZoomReached: m, ariaLabelConfig: b } = fe(nm, me), { zoomIn: y, zoomOut: v, fitView: k } = Ti(), E = () => {
    y(), i?.();
  }, C = () => {
    v(), s?.();
  }, P = () => {
    k(r), c?.();
  }, T = () => {
    g.setState({
      nodesDraggable: !x,
      nodesConnectable: !x,
      elementsSelectable: !x
    }), u?.(!x);
  }, B = h === "horizontal" ? "horizontal" : "vertical";
  return a.jsxs(or, { className: Ee(["react-flow__controls", B, l]), position: d, style: e, "data-testid": "rf__controls", "aria-label": p ?? b["controls.ariaLabel"], children: [t && a.jsxs(a.Fragment, { children: [a.jsx(bo, { onClick: E, className: "react-flow__controls-zoomin", title: b["controls.zoomIn.ariaLabel"], "aria-label": b["controls.zoomIn.ariaLabel"], disabled: m, children: a.jsx(Gy, {}) }), a.jsx(bo, { onClick: C, className: "react-flow__controls-zoomout", title: b["controls.zoomOut.ariaLabel"], "aria-label": b["controls.zoomOut.ariaLabel"], disabled: w, children: a.jsx(Jy, {}) })] }), n && a.jsx(bo, { className: "react-flow__controls-fitview", onClick: P, title: b["controls.fitView.ariaLabel"], "aria-label": b["controls.fitView.ariaLabel"], children: a.jsx(Qy, {}) }), o && a.jsx(bo, { className: "react-flow__controls-interactive", onClick: T, title: b["controls.interactive.ariaLabel"], "aria-label": b["controls.interactive.ariaLabel"], children: x ? a.jsx(tm, {}) : a.jsx(em, {}) }), f] });
}
vl.displayName = "Controls";
const bl = be(vl);
function om({ id: e, x: t, y: n, width: o, height: r, style: i, color: s, strokeColor: c, strokeWidth: u, className: l, borderRadius: f, shapeRendering: d, selected: h, onClick: p }) {
  const { background: g, backgroundColor: x } = i || {}, w = s || g || x;
  return a.jsx("rect", { className: Ee(["react-flow__minimap-node", { selected: h }, l]), x: t, y: n, rx: f, ry: f, width: o, height: r, style: {
    fill: w,
    stroke: c,
    strokeWidth: u
  }, shapeRendering: d, onClick: p ? (m) => p(m, e) : void 0 });
}
const rm = be(om), im = (e) => e.nodes.map((t) => t.id), Yr = (e) => e instanceof Function ? e : () => e;
function sm({
  nodeStrokeColor: e,
  nodeColor: t,
  nodeClassName: n = "",
  nodeBorderRadius: o = 5,
  nodeStrokeWidth: r,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: i = rm,
  onClick: s
}) {
  const c = fe(im, me), u = Yr(t), l = Yr(e), f = Yr(n), d = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return a.jsx(a.Fragment, { children: c.map((h) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    a.jsx(cm, { id: h, nodeColorFunc: u, nodeStrokeColorFunc: l, nodeClassNameFunc: f, nodeBorderRadius: o, nodeStrokeWidth: r, NodeComponent: i, onClick: s, shapeRendering: d }, h)
  )) });
}
function am({ id: e, nodeColorFunc: t, nodeStrokeColorFunc: n, nodeClassNameFunc: o, nodeBorderRadius: r, nodeStrokeWidth: i, shapeRendering: s, NodeComponent: c, onClick: u }) {
  const { node: l, x: f, y: d, width: h, height: p } = fe((g) => {
    const x = g.nodeLookup.get(e);
    if (!x)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const w = x.internals.userNode, { x: m, y: b } = x.internals.positionAbsolute, { width: y, height: v } = ct(w);
    return {
      node: w,
      x: m,
      y: b,
      width: y,
      height: v
    };
  }, me);
  return !l || l.hidden || !yc(l) ? null : a.jsx(c, { x: f, y: d, width: h, height: p, style: l.style, selected: !!l.selected, className: o(l), color: t(l), borderRadius: r, strokeColor: n(l), strokeWidth: i, shapeRendering: s, onClick: u, id: l.id });
}
const cm = be(am);
var lm = be(sm);
const um = 200, dm = 150, fm = (e) => !e.hidden, hm = (e) => {
  const t = {
    x: -e.transform[0] / e.transform[2],
    y: -e.transform[1] / e.transform[2],
    width: e.width / e.transform[2],
    height: e.height / e.transform[2]
  };
  return {
    viewBB: t,
    boundingRect: e.nodeLookup.size > 0 ? pc(Xn(e.nodeLookup, { filter: fm }), t) : t,
    rfId: e.rfId,
    panZoom: e.panZoom,
    translateExtent: e.translateExtent,
    flowWidth: e.width,
    flowHeight: e.height,
    ariaLabelConfig: e.ariaLabelConfig
  };
}, pm = "react-flow__minimap-desc";
function Nl({
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
  ariaLabel: m,
  inversePan: b,
  zoomStep: y = 1,
  offsetScale: v = 5
}) {
  const k = xe(), E = le(null), { boundingRect: C, viewBB: P, rfId: T, panZoom: B, translateExtent: _, flowWidth: z, flowHeight: H, ariaLabelConfig: N } = fe(hm, me), j = e?.width ?? um, I = e?.height ?? dm, A = C.width / j, $ = C.height / I, D = Math.max(A, $), W = D * j, O = D * I, F = v * D, U = C.x - (W - C.width) / 2 - F, Z = C.y - (O - C.height) / 2 - F, ne = W + F * 2, ce = O + F * 2, J = `${pm}-${T}`, R = le(0), q = le();
  R.current = D, oe(() => {
    if (E.current && B)
      return q.current = _p({
        domNode: E.current,
        panZoom: B,
        getTransform: () => k.getState().transform,
        getViewScale: () => R.current
      }), () => {
        q.current?.destroy();
      };
  }, [B]), oe(() => {
    q.current?.update({
      translateExtent: _,
      width: z,
      height: H,
      inversePan: b,
      pannable: x,
      zoomStep: y,
      zoomable: w
    });
  }, [x, w, b, y, _, z, H]);
  const ie = p ? (ee) => {
    const [ae, L] = q.current?.pointer(ee) || [0, 0];
    p(ee, { x: ae, y: L });
  } : void 0, re = g ? ge((ee, ae) => {
    const L = k.getState().nodeLookup.get(ae).internals.userNode;
    g(ee, L);
  }, []) : void 0, G = m ?? N["minimap.ariaLabel"];
  return a.jsx(or, { position: h, style: {
    ...e,
    "--xy-minimap-background-color-props": typeof u == "string" ? u : void 0,
    "--xy-minimap-mask-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof f == "string" ? f : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof d == "number" ? d * D : void 0,
    "--xy-minimap-node-background-color-props": typeof o == "string" ? o : void 0,
    "--xy-minimap-node-stroke-color-props": typeof n == "string" ? n : void 0,
    "--xy-minimap-node-stroke-width-props": typeof s == "number" ? s : void 0
  }, className: Ee(["react-flow__minimap", t]), "data-testid": "rf__minimap", children: a.jsxs("svg", { width: j, height: I, viewBox: `${U} ${Z} ${ne} ${ce}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": J, ref: E, onClick: ie, children: [G && a.jsx("title", { id: J, children: G }), a.jsx(lm, { onClick: re, nodeColor: o, nodeStrokeColor: n, nodeBorderRadius: i, nodeClassName: r, nodeStrokeWidth: s, nodeComponent: c }), a.jsx("path", { className: "react-flow__minimap-mask", d: `M${U - F},${Z - F}h${ne + F * 2}v${ce + F * 2}h${-ne - F * 2}z
        M${P.x},${P.y}h${P.width}v${P.height}h${-P.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
Nl.displayName = "MiniMap";
const Sl = be(Nl), gm = (e) => (t) => e ? `${Math.max(1 / t.transform[2], 1)}` : void 0, ym = {
  [Ut.Line]: "right",
  [Ut.Handle]: "bottom-right"
};
function mm({ nodeId: e, position: t, variant: n = Ut.Handle, className: o, style: r = void 0, children: i, color: s, minWidth: c = 10, minHeight: u = 10, maxWidth: l = Number.MAX_VALUE, maxHeight: f = Number.MAX_VALUE, keepAspectRatio: d = !1, resizeDirection: h, autoScale: p = !0, shouldResize: g, onResizeStart: x, onResize: w, onResizeEnd: m }) {
  const b = Gc(), y = typeof e == "string" ? e : b, v = xe(), k = le(null), E = n === Ut.Handle, C = fe(ge(gm(E && p), [E, p]), me), P = le(null), T = t ?? ym[n];
  oe(() => {
    if (!(!k.current || !y))
      return P.current || (P.current = Op({
        domNode: k.current,
        nodeId: y,
        getStoreItems: () => {
          const { nodeLookup: _, transform: z, snapGrid: H, snapToGrid: N, nodeOrigin: j, domNode: I } = v.getState();
          return {
            nodeLookup: _,
            transform: z,
            snapGrid: H,
            snapToGrid: N,
            nodeOrigin: j,
            paneDomNode: I
          };
        },
        onChange: (_, z) => {
          const { triggerNodeChanges: H, nodeLookup: N, parentLookup: j, nodeOrigin: I } = v.getState(), A = [], $ = { x: _.x, y: _.y }, D = N.get(y);
          if (D && D.expandParent && D.parentId) {
            const W = D.origin ?? I, O = _.width ?? D.measured.width ?? 0, F = _.height ?? D.measured.height ?? 0, U = {
              id: D.id,
              parentId: D.parentId,
              rect: {
                width: O,
                height: F,
                ...mc({
                  x: _.x ?? D.position.x,
                  y: _.y ?? D.position.y
                }, { width: O, height: F }, D.parentId, N, W)
              }
            }, Z = Pi([U], N, j, I);
            A.push(...Z), $.x = _.x ? Math.max(W[0] * O, _.x) : void 0, $.y = _.y ? Math.max(W[1] * F, _.y) : void 0;
          }
          if ($.x !== void 0 && $.y !== void 0) {
            const W = {
              id: y,
              type: "position",
              position: { ...$ }
            };
            A.push(W);
          }
          if (_.width !== void 0 && _.height !== void 0) {
            const O = {
              id: y,
              type: "dimensions",
              resizing: !0,
              setAttributes: h ? h === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: _.width,
                height: _.height
              }
            };
            A.push(O);
          }
          for (const W of z) {
            const O = {
              ...W,
              type: "position"
            };
            A.push(O);
          }
          H(A);
        },
        onEnd: ({ width: _, height: z }) => {
          const H = {
            id: y,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: _,
              height: z
            }
          };
          v.getState().triggerNodeChanges([H]);
        }
      })), P.current.update({
        controlPosition: T,
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
        onResizeEnd: m,
        shouldResize: g
      }), () => {
        P.current?.destroy();
      };
  }, [
    T,
    c,
    u,
    l,
    f,
    d,
    x,
    w,
    m,
    g
  ]);
  const B = T.split("-");
  return a.jsx("div", { className: Ee(["react-flow__resize-control", "nodrag", ...B, n, o]), ref: k, style: {
    ...r,
    scale: C,
    ...s && { [E ? "backgroundColor" : "borderColor"]: s }
  }, children: i });
}
be(mm);
const xm = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), El = (...e) => e.filter((t, n, o) => !!t && t.trim() !== "" && o.indexOf(t) === n).join(" ").trim();
var wm = {
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
const vm = qo(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: o,
    className: r = "",
    children: i,
    iconNode: s,
    ...c
  }, u) => Kr(
    "svg",
    {
      ref: u,
      ...wm,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: o ? Number(n) * 24 / Number(t) : n,
      className: El("lucide", r),
      ...c
    },
    [
      ...s.map(([l, f]) => Kr(l, f)),
      ...Array.isArray(i) ? i : [i]
    ]
  )
);
const Ne = (e, t) => {
  const n = qo(
    ({ className: o, ...r }, i) => Kr(vm, {
      ref: i,
      iconNode: t,
      className: El(`lucide-${xm(e)}`, o),
      ...r
    })
  );
  return n.displayName = `${e}`, n;
};
const kl = Ne("Boxes", [
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
const Zn = Ne("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
const bm = Ne("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
const Fo = Ne("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
const Vt = Ne("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
const at = Ne("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
const Il = Ne("GitBranch", [
  ["line", { x1: "6", x2: "6", y1: "3", y2: "15", key: "17qcm7" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M18 9a9 9 0 0 1-9 9", key: "n2h4wq" }]
]);
const Nm = Ne("GripVertical", [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
]);
const Cl = Ne("ListTree", [
  ["path", { d: "M21 12h-8", key: "1bmf0i" }],
  ["path", { d: "M21 6H8", key: "1pqkrb" }],
  ["path", { d: "M21 18h-8", key: "1tm79t" }],
  ["path", { d: "M3 6v4c0 1.1.9 2 2 2h3", key: "1ywdgy" }],
  ["path", { d: "M3 10v6c0 1.1.9 2 2 2h3", key: "2wc746" }]
]);
const Wo = Ne("Maximize2", [
  ["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }],
  ["polyline", { points: "9 21 3 21 3 15", key: "1avn1i" }],
  ["line", { x1: "21", x2: "14", y1: "3", y2: "10", key: "ota7mn" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]);
const ra = Ne("Minimize2", [
  ["polyline", { points: "4 14 10 14 10 20", key: "11kfnr" }],
  ["polyline", { points: "20 10 14 10 14 4", key: "rlmsce" }],
  ["line", { x1: "14", x2: "21", y1: "10", y2: "3", key: "o5lafz" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]);
const zi = Ne("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
const Ri = Ne("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
const _l = Ne("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
const Sm = Ne("Save", [
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
const Em = Ne("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
const Pt = Ne("Sparkles", [
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
const km = Ne("Terminal", [
  ["polyline", { points: "4 17 10 11 4 5", key: "akl6gq" }],
  ["line", { x1: "12", x2: "20", y1: "19", y2: "19", key: "q2wloq" }]
]);
const li = Ne("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
const Im = Ne("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const Cm = Ne("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]), Te = "/_elsa/workflow-management", _m = "/_elsa/publishing";
async function jm(e, t) {
  const n = new URLSearchParams({
    state: t.state ?? "active",
    page: t.page.toString(),
    pageSize: t.pageSize.toString()
  }), o = t.search.trim();
  return o && n.set("search", o), e.http.getJson(`${Te}/definitions?${n.toString()}`);
}
async function Am(e, t) {
  return e.http.getJson(`${Te}/definitions/${encodeURIComponent(t)}`);
}
async function Mm(e, t) {
  return e.http.getJson(`${Te}/versions/${encodeURIComponent(t)}`);
}
async function Dm(e, t) {
  return e.http.postJson(`${Te}/definitions`, t);
}
async function Pm(e, t) {
  await e.http.deleteJson(`${Te}/definitions/${encodeURIComponent(t)}`);
}
async function Tm(e, t) {
  await e.http.postJson(`${Te}/definitions/${encodeURIComponent(t)}/restore`, {});
}
async function $m(e, t) {
  await e.http.deleteJson(`${Te}/definitions/${encodeURIComponent(t)}/permanent`);
}
async function zm(e, t) {
  return e.http.putJson(`${Te}/drafts/${encodeURIComponent(t.id)}`, { state: t.state, layout: t.layout });
}
async function Rm(e, t) {
  return e.http.postJson(`${Te}/drafts/${encodeURIComponent(t)}/promote`, {});
}
async function Lm(e, t) {
  return e.http.postJson(`${Te}/versions/${encodeURIComponent(t)}/publish`, {});
}
async function Vm(e, t) {
  try {
    return await e.http.postJson(`${_m}/workflows/drafts/test-runs`, t);
  } catch (n) {
    const o = Ym(n);
    if (o) return o;
    throw n;
  }
}
async function Hm(e, t) {
  return e.http.postJson(`${Te}/executables/${encodeURIComponent(t)}/run`, {});
}
async function Om(e) {
  return e.http.getJson("/_demo/workflows/executables");
}
async function Bm(e, t = {}) {
  const n = new URLSearchParams();
  t.status && n.set("status", t.status), t.definitionId && n.set("definitionId", t.definitionId), t.correlationId && n.set("correlationId", t.correlationId), t.take && n.set("take", String(t.take));
  const o = n.toString();
  return e.http.getJson(`/runtime/workflows/instances${o ? `?${o}` : ""}`);
}
async function Fm(e, t) {
  return e.http.getJson(`/runtime/workflows/instances/${encodeURIComponent(t)}`);
}
async function Li(e) {
  return e.http.getJson(`${Te}/activities`);
}
async function Wm(e) {
  const t = await jl(e, [
    `${Te}/descriptors/activities`,
    "/descriptors/activities"
  ]);
  return Array.isArray(t) ? ia(t) : ia(t.items ?? t.activities ?? t.descriptors ?? []);
}
async function Xm(e) {
  const t = await jl(e, [
    `${Te}/descriptors/expression-descriptors`,
    "/descriptors/expression-descriptors"
  ]);
  if (Array.isArray(t)) return t;
  const n = t.items ?? t.descriptors ?? t.expressionDescriptors ?? [];
  return n.length > 0 ? n : jo;
}
async function jl(e, t) {
  let n;
  for (const o of t)
    try {
      return await e.http.getJson(o);
    } catch (r) {
      n = r;
    }
  throw n;
}
function ia(e) {
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
function Ym(e) {
  const t = e && typeof e == "object" && "payload" in e ? e.payload : null, n = sa(t);
  if (n) return n;
  if (!(e instanceof Error)) return null;
  try {
    return sa(JSON.parse(e.message));
  } catch {
    return null;
  }
}
function sa(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  return typeof t.testRunId == "string" && typeof t.status == "string" ? t : null;
}
const jo = [
  { type: "Literal", displayName: "Literal" },
  { type: "JavaScript", displayName: "JavaScript" },
  { type: "Liquid", displayName: "Liquid" },
  { type: "Object", displayName: "Object" },
  { type: "Variable", displayName: "Variable" },
  { type: "Input", displayName: "Input" }
], ir = "elsa.sequence.structure", Kn = "elsa.flowchart.structure";
function Al(e, t) {
  if (!e) return null;
  let n = e;
  for (const o of t) {
    const r = Ke(n).find((s) => s.id === o.slotId);
    if (!r) return null;
    const i = r.activities.find((s) => s.nodeId === o.ownerNodeId);
    if (!i) return null;
    n = i;
  }
  return n;
}
function An(e, t) {
  const n = Al(e, t);
  if (!n) return null;
  let o = Ke(n)[0];
  return o ? { owner: n, slot: o } : null;
}
function Ke(e) {
  const t = e.structure;
  if (!t || !t.payload || typeof t.payload != "object") return [];
  const n = t.payload, o = f0(t), r = qr(n.activities);
  return r ? [{
    id: `${t.kind}:activities`,
    label: h0(t),
    property: "activities",
    mode: o,
    activities: r
  }] : Object.entries(n).filter(([, i]) => qr(i)).map(([i, s]) => ({
    id: `${t.kind}:${i}`,
    label: g0(i),
    property: i,
    mode: "generic",
    activities: qr(s) ?? []
  }));
}
function Ml(e, t, n) {
  const o = new Map(t.map((s) => [s.activityVersionId, s])), r = new Map(n.map((s) => [s.nodeId, s])), i = e.slot.activities.map((s, c) => {
    const u = o.get(s.activityVersionId), l = r.get(s.nodeId) ?? p0(e.slot.mode, c);
    return Tl(s, u, { x: l.x, y: l.y });
  });
  return {
    nodes: i,
    edges: e.slot.mode === "flowchart" ? r0(e.owner) : o0(e.slot, i)
  };
}
function ui(e, t, n) {
  const o = t.find((i) => i.activityVersionId === e.activityVersionId), r = n.find((i) => i.nodeId === e.nodeId) ?? { x: 0, y: 0 };
  return {
    nodes: [Tl(e, o, { x: r.x, y: r.y }, {
      connectable: !1,
      deletable: !1,
      draggable: !1,
      suppressFlowPorts: !0
    })],
    edges: []
  };
}
function qm(e, t, n, o = null) {
  const r = new Map(t.map((c) => [c.activityExecutionId, c])), i = ca(t, (c) => c.authoredActivityId || c.executableNodeId), s = ca(n, (c) => c.executableNodeId ? c.executableNodeId : c.activityExecutionId ? r.get(c.activityExecutionId)?.authoredActivityId ?? "" : "");
  return e.map((c) => {
    const u = i.get(c.id) ?? [], l = s.get(c.id) ?? [];
    if (u.length === 0 && l.length === 0) return c;
    const f = l0(u), d = o === c.id || u.some((p) => p.activityExecutionId === o) || l.some((p) => p.incidentId === o), h = {
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
function Vi(e, t) {
  return e?.structure?.kind === Kn || Jm(t) ? "flowchart" : e?.structure?.kind === ir || Qm(t) ? "sequence" : "unsupported";
}
function di(e, t, n) {
  if (t.length === 0) {
    const c = Ke(e)[0];
    return c ? Hn(e, c, n) : e;
  }
  const [o, ...r] = t, i = Ke(e).find((c) => c.id === o.slotId);
  if (!i) return e;
  const s = i.activities.map((c) => c.nodeId === o.ownerNodeId ? di(c, r, n) : c);
  return Hn(e, i, s);
}
function Dl(e, t, n) {
  if (t.length === 0) return n;
  const [o, ...r] = t, i = Ke(e).find((c) => c.id === o.slotId);
  if (!i) return e;
  const s = i.activities.map((c) => c.nodeId === o.ownerNodeId ? Dl(c, r, n) : c);
  return Hn(e, i, s);
}
function Pl(e, t, n) {
  if (e.nodeId === t) return n(e);
  const o = Ke(e);
  if (o.length === 0) return e;
  let r = !1, i = e;
  for (const s of o) {
    const c = s.activities.map((u) => {
      const l = Pl(u, t, n);
      return l !== u && (r = !0), l;
    });
    r && (i = Hn(i, s, c));
  }
  return r ? i : e;
}
function Hn(e, t, n) {
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
function Zm(e, t, n, o = []) {
  const r = new Map(e.slot.activities.map((s) => [s.nodeId, s]));
  for (const s of o)
    r.set(s.nodeId, s);
  const i = t.map((s) => r.get(s.id)).filter((s) => !!s);
  return e.slot.mode === "sequence" && i.sort((s, c) => {
    const u = t.find((f) => f.id === s.nodeId), l = t.find((f) => f.id === c.nodeId);
    return (u?.position.x ?? 0) - (l?.position.x ?? 0);
  }), Hn(e.owner, e.slot, i);
}
function Km(e, t) {
  return {
    ...e,
    structure: n0(e.structure, t)
  };
}
function Um(e, t) {
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
function fi(e, t) {
  return {
    nodeId: t,
    activityVersionId: e.activityVersionId,
    inputs: [],
    outputs: [],
    structure: t0(e)
  };
}
function ke(e) {
  const t = e.activityTypeKey.split(".").at(-1) || e.activityTypeKey, n = e.displayName?.trim();
  return !n || n === e.activityTypeKey || n.includes(".") ? e0(t) : n;
}
function Tl(e, t, n, o = {}) {
  return {
    id: e.nodeId,
    type: "workflowActivity",
    position: n,
    connectable: o.connectable,
    deletable: o.deletable,
    draggable: o.draggable,
    data: {
      label: t ? ke(t) : e.activityVersionId,
      activityVersionId: e.activityVersionId,
      activityTypeKey: t?.activityTypeKey,
      category: t?.category,
      executionType: t?.executionType,
      icon: hi(t),
      childSlots: Ke(e),
      acceptsInbound: i0(e, t),
      sourcePorts: o.suppressFlowPorts ? [] : $l(e, t),
      suppressFlowPorts: o.suppressFlowPorts
    }
  };
}
function hi(e) {
  if (!e) return "activity";
  const t = Gm(e.icon);
  if (t) return t;
  const n = e.activityTypeKey.toLowerCase(), o = ke(e).toLowerCase(), r = e.category?.toLowerCase() ?? "", i = e.executionType?.toLowerCase() ?? "";
  return n.endsWith(".flowchart") || o === "flowchart" ? "flowchart" : n.endsWith(".sequence") || o === "sequence" ? "sequence" : n.includes("writeline") || o.includes("write line") ? "terminal" : r.includes("runtime") ? "runtime" : i === "trigger" ? "trigger" : "activity";
}
function Gm(e) {
  if (!e) return null;
  const t = e.trim().toLowerCase();
  return ["activity", "flowchart", "sequence", "terminal", "runtime", "trigger"].includes(t) ? t : null;
}
function Jm(e) {
  return !!e && (ke(e) === "Flowchart" || e.activityTypeKey.endsWith(".Flowchart"));
}
function Qm(e) {
  return !!e && (ke(e) === "Sequence" || e.activityTypeKey.endsWith(".Sequence"));
}
function e0(e) {
  return e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").trim();
}
function t0(e) {
  return e.activityTypeKey.endsWith(".Sequence") || e.displayName === "Sequence" ? {
    kind: ir,
    schemaVersion: "1.0.0",
    payload: { activities: [] }
  } : e.activityTypeKey.endsWith(".Flowchart") || e.displayName === "Flowchart" ? {
    kind: Kn,
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
function n0(e, t) {
  if (!e) return e ?? null;
  const n = Array.isArray(e.payload.connections) ? e.payload.connections : [], o = /* @__PURE__ */ new Map();
  for (const r of n) {
    if (!Hi(r)) continue;
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
function o0(e, t) {
  return e.mode === "sequence" ? t.slice(0, -1).map((n, o) => ({
    id: `sequence-${n.id}-${t[o + 1].id}`,
    source: n.id,
    target: t[o + 1].id,
    type: "smoothstep",
    animated: !1
  })) : [];
}
function r0(e) {
  if (e.structure?.kind !== Kn) return [];
  const t = e.structure.payload.connections;
  return Array.isArray(t) ? t.map((n, o) => {
    if (!n || typeof n != "object") return null;
    const r = n.source, i = n.target;
    if (!r?.nodeId || !i?.nodeId) return null;
    const s = Array.isArray(n.vertices) ? n.vertices.filter(u0) : [];
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
function $l(e, t) {
  const n = aa(e.cases);
  if (a0(e, t) && n.length > 0)
    return [...n.map((i) => ({ name: i, displayName: i })), { name: "Default", displayName: "Default" }];
  const o = [
    ...Ao(t?.designFacets),
    ...Ao(t?.ports),
    ...Ao(t?.outputs)
  ];
  if (o.length > 0) return c0(o);
  const r = aa(e.outcomes);
  return r.length > 0 ? r.map((i) => ({ name: i, displayName: i })) : [{ name: "Done", displayName: "Done" }];
}
function i0(e, t) {
  return String(t?.executionType ?? "").toLowerCase() !== "trigger";
}
function Xo(e, t, n, o) {
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
function s0(e, t, n) {
  const o = Xo(t.source, n, t.sourceHandle ?? "Done", void 0), r = Xo(n, t.target, "Done", t.targetHandle ?? void 0);
  return e.filter((i) => i.id !== t.id).concat(o, r);
}
function qr(e) {
  return Array.isArray(e) ? e.filter(d0) : null;
}
function a0(e, t) {
  const n = t?.activityTypeKey ?? e.activityVersionId, o = t?.displayName ?? "";
  return n.endsWith(".FlowSwitch") || n === "FlowSwitch" || o === "FlowSwitch";
}
function Ao(e) {
  if (!Array.isArray(e)) return [];
  const t = [];
  for (const n of e) {
    if (!Hi(n)) continue;
    if (Array.isArray(n.ports)) {
      t.push(...Ao(n.ports));
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
function c0(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.has(n.name) || t.set(n.name, n);
  return [...t.values()];
}
function aa(e) {
  return Array.isArray(e) ? e.filter((t) => typeof t == "string" && t.length > 0) : [];
}
function ca(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const o of e) {
    const r = t(o);
    r && n.set(r, [...n.get(r) ?? [], o]);
  }
  return n;
}
function l0(e) {
  return [...e].sort((t, n) => la(n).localeCompare(la(t)))[0];
}
function la(e) {
  return e.completedAt ?? e.startedAt ?? e.scheduledAt;
}
function u0(e) {
  return Hi(e) && typeof e.x == "number" && typeof e.y == "number";
}
function Hi(e) {
  return typeof e == "object" && e !== null;
}
function d0(e) {
  return typeof e == "object" && e !== null && typeof e.nodeId == "string" && typeof e.activityVersionId == "string";
}
function f0(e) {
  return e.kind === ir ? "sequence" : e.kind === Kn ? "flowchart" : "generic";
}
function h0(e) {
  return e.kind === ir || e.kind === Kn, "Activities";
}
function p0(e, t) {
  return e === "sequence" ? { nodeId: "", x: t * 280, y: 0 } : { nodeId: "", x: t % 4 * 280, y: Math.floor(t / 4) * 150 };
}
function g0(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
const y0 = [
  { type: "Literal", displayName: "Literal" },
  { type: "JavaScript", displayName: "JavaScript" },
  { type: "Liquid", displayName: "Liquid" },
  { type: "Object", displayName: "Object" },
  { type: "Variable", displayName: "Variable" },
  { type: "Input", displayName: "Input" }
];
function zl(e) {
  const t = e.trim();
  return t ? t.charAt(0).toLowerCase() + t.slice(1) : e;
}
function Oi(e) {
  return zl(e.name);
}
function m0(e, t) {
  const n = Oi(t), o = e[n];
  return t.isWrapped === !1 ? o ?? t.defaultValue ?? "" : Ll(o, t);
}
function Rl(e, t) {
  return Ll(e[Oi(t)], t);
}
function x0(e, t) {
  return {
    ...e,
    expression: {
      type: e.expression.type || "Literal",
      value: t
    }
  };
}
function w0(e, t) {
  return {
    ...e,
    expression: {
      type: t,
      value: e.expression.value
    }
  };
}
function ua(e, t, n) {
  return {
    ...e,
    [Oi(t)]: n
  };
}
function v0(e, t) {
  return t.isWrapped === !1 ? m0(e, t) : Rl(e, t).expression.value;
}
function Ll(e, t) {
  return b0(e) ? {
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
function b0(e) {
  if (!e || typeof e != "object") return !1;
  const t = e, n = t.expression;
  return typeof t.typeName == "string" && !!n && typeof n == "object" && typeof n.type == "string";
}
const Vl = /* @__PURE__ */ new Set(["studio.property.singleline", "studio.property.text-fallback"]);
function N0({
  activity: e,
  descriptor: t,
  editors: n,
  expressionDescriptors: o,
  descriptorStatus: r,
  onChange: i
}) {
  if (r === "loading")
    return /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "Loading activity properties..." });
  if (!t)
    return /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "No activity descriptor is available for this activity." });
  const s = t.inputs.filter((l) => l.isBrowsable !== !1).sort((l, f) => (l.order ?? 0) - (f.order ?? 0) || l.name.localeCompare(f.name));
  if (s.length === 0)
    return /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "This activity does not expose editable properties." });
  const c = I0(s), u = o.length > 0 ? o : y0;
  return /* @__PURE__ */ a.jsxs("div", { className: "wf-properties", children: [
    /* @__PURE__ */ a.jsx("span", { className: "wf-section-label", children: "Properties" }),
    c.map((l) => /* @__PURE__ */ a.jsxs("section", { className: "wf-property-group", children: [
      c.length > 1 ? /* @__PURE__ */ a.jsx("h4", { children: l.category }) : null,
      l.inputs.map((f) => /* @__PURE__ */ a.jsx(
        S0,
        {
          activity: e,
          input: f,
          editors: n,
          expressionDescriptors: u,
          onChange: i
        },
        f.name
      ))
    ] }, l.category))
  ] });
}
function S0({
  activity: e,
  input: t,
  editors: n,
  expressionDescriptors: o,
  onChange: r
}) {
  const i = t.isReadOnly === !0, s = { activity: e, expressionDescriptors: o, readOnly: i }, c = k0(n, t, s), u = c?.component, l = t.isWrapped !== !1 ? Rl(e, t) : null, f = l?.expression.type ?? "Literal", d = v0(e, t), h = !!(l && C0(t, c?.id)), p = !!(l && _0(t, c?.id)), [g, x] = Y(!1), w = (b) => {
    const y = l ? x0(l, b) : b;
    r(ua(e, t, y));
  }, m = (b) => {
    l && r(ua(e, t, w0(l, b)));
  };
  return /* @__PURE__ */ a.jsxs("div", { className: "wf-property-row", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-property-row-header", children: [
      /* @__PURE__ */ a.jsx("label", { children: t.displayName || t.name }),
      /* @__PURE__ */ a.jsx("span", { children: Hl(t.typeName) })
    ] }),
    t.description ? /* @__PURE__ */ a.jsx("p", { children: t.description }) : null,
    l && !h ? /* @__PURE__ */ a.jsx(
      pi,
      {
        label: `${t.displayName || t.name} expression syntax`,
        value: f,
        descriptors: o,
        disabled: i,
        onChange: m
      }
    ) : null,
    h ? /* @__PURE__ */ a.jsxs("div", { className: "wf-expression-field", children: [
      /* @__PURE__ */ a.jsx("div", { className: "wf-expression-editor", children: da(u, t, d, i, s, w) }),
      /* @__PURE__ */ a.jsx(
        pi,
        {
          label: `${t.displayName || t.name} expression syntax`,
          value: f,
          descriptors: o,
          disabled: i,
          variant: "inline",
          onChange: m
        }
      ),
      p ? /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "wf-expression-expand-button",
          "aria-label": `Open expanded ${t.displayName || t.name} editor`,
          title: "Open expanded editor",
          onClick: () => x(!0),
          children: /* @__PURE__ */ a.jsx(Wo, { size: 13 })
        }
      ) : null
    ] }) : da(u, t, d, i, s, w),
    p && !h ? /* @__PURE__ */ a.jsxs(
      "button",
      {
        type: "button",
        className: "wf-property-expand-row",
        "aria-label": `Open expanded ${t.displayName || t.name} editor`,
        onClick: () => x(!0),
        children: [
          /* @__PURE__ */ a.jsx(Wo, { size: 13 }),
          " Open expanded editor"
        ]
      }
    ) : null,
    g ? /* @__PURE__ */ a.jsx(
      E0,
      {
        input: t,
        value: d,
        syntax: f,
        descriptors: o,
        disabled: i,
        onChange: w,
        onSyntaxChange: m,
        onClose: () => x(!1)
      }
    ) : null
  ] });
}
function E0({
  input: e,
  value: t,
  syntax: n,
  descriptors: o,
  disabled: r,
  onChange: i,
  onSyntaxChange: s,
  onClose: c
}) {
  const u = Aa(), l = e.displayName || e.name;
  return oe(() => {
    const f = (d) => {
      d.key === "Escape" && c();
    };
    return window.addEventListener("keydown", f), () => window.removeEventListener("keydown", f);
  }, [c]), /* @__PURE__ */ a.jsx("div", { className: "wf-property-editor-backdrop", children: /* @__PURE__ */ a.jsxs("section", { className: "wf-property-editor-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": u, children: [
    /* @__PURE__ */ a.jsxs("header", { children: [
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("span", { children: "Property editor" }),
        /* @__PURE__ */ a.jsx("h3", { id: u, children: l })
      ] }),
      /* @__PURE__ */ a.jsx("button", { type: "button", "aria-label": `Close ${l} editor`, onClick: c, children: /* @__PURE__ */ a.jsx(Im, { size: 16 }) })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "wf-property-editor-body", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "wf-property-editor-toolbar", children: [
        /* @__PURE__ */ a.jsx(
          pi,
          {
            label: `${l} expression syntax`,
            value: n,
            descriptors: o,
            disabled: r,
            onChange: s
          }
        ),
        /* @__PURE__ */ a.jsx("span", { children: Hl(e.typeName) })
      ] }),
      e.description ? /* @__PURE__ */ a.jsx("p", { children: e.description }) : null,
      /* @__PURE__ */ a.jsx(
        "textarea",
        {
          "aria-label": `${l} expanded value`,
          value: t == null ? "" : String(t),
          disabled: r,
          spellCheck: !1,
          onChange: (f) => i(f.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ a.jsxs("footer", { children: [
      /* @__PURE__ */ a.jsx("span", { children: "Changes update the draft immediately." }),
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: c, children: "Close" })
    ] })
  ] }) });
}
function da(e, t, n, o, r, i) {
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
function pi({
  label: e,
  value: t,
  descriptors: n,
  disabled: o,
  variant: r = "block",
  onChange: i
}) {
  const [s, c] = Y(!1), u = Aa(), l = n.find((d) => d.type === t), f = [
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
function k0(e, t, n) {
  return [...e].sort((o, r) => (o.order ?? 500) - (r.order ?? 500)).find((o) => o.supports(t, n));
}
function I0(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = n.category?.trim() || "General";
    t.set(o, [...t.get(o) ?? [], n]);
  }
  return [...t.entries()].map(([n, o]) => ({ category: n, inputs: o }));
}
function Hl(e) {
  return e.split(".").filter(Boolean).at(-1) ?? e;
}
function C0(e, t) {
  if (e.uiHint?.toLowerCase() === "multiline" || t && !Vl.has(t)) return !1;
  const n = e.typeName.toLowerCase();
  return ["string", "system.string", "text"].includes(n) || e.uiHint?.toLowerCase() === "singleline";
}
function _0(e, t) {
  const n = e.uiHint?.toLowerCase();
  if (n === "checkbox" || n === "dropdown" || t && !Vl.has(t) && n !== "multiline") return !1;
  const o = e.typeName.toLowerCase();
  return ["string", "system.string", "text"].includes(o) || n === "singleline" || n === "multiline";
}
const fa = "elsa-studio:apply-workflow-graph-operation-batch", ha = "elsa-studio:undo-workflow-graph-operation-batch", j0 = [
  "add-activity",
  "update-activity",
  "remove-activity",
  "connect-activities",
  "disconnect-activities",
  "set-root",
  "set-designer-position",
  "set-activity-property"
];
function A0(e, t, n) {
  if (!Array.isArray(t.operations)) throw new Error("Weaver batch does not contain operations.");
  const o = L0(e), r = Bl(o.state.rootActivity), i = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = [];
  for (const u of t.operations) {
    const l = R0(u.kind), f = u.parameters ?? {};
    if (l === "add-activity") {
      const d = De(f.activityId) ?? u.temporaryReferences?.[0], h = z0(d ?? De(f.displayName) ?? De(f.activityType) ?? "weaver-activity", r), p = M0(u, h, n);
      s.set(h, p), c.push(h), d && i.set(d, h), o.state.rootActivity && D0(o.state.rootActivity, p);
      const g = Ct(f.position) ? gi(f.position, { x: 280, y: 160 }) : null;
      g && (o.layout = pa(o.layout, h, g));
      continue;
    }
    if (l === "set-root") {
      const d = Zr(o, f.activityId, i, s);
      if (!d) throw new Error("Weaver batch referenced an unknown root activity.");
      o.state.rootActivity = d;
      continue;
    }
    if (l === "set-designer-position") {
      const d = Tt(f.activityId, i);
      if (!d || !Bi(o.state.rootActivity, d)) throw new Error("Weaver batch referenced an unknown activity position.");
      o.layout = pa(o.layout, d, gi(f, { x: 280, y: 160 }));
      continue;
    }
    if (l === "set-activity-property") {
      const d = Zr(o, f.activityId, i, s);
      if (!d) throw new Error("Weaver batch referenced an unknown activity property target.");
      $0(d, De(f.propertyName) ?? "Value", f.value ?? "");
      continue;
    }
    if (l === "update-activity") {
      const d = Zr(o, f.activityId, i, s);
      if (!d) throw new Error("Weaver batch referenced an unknown activity update target.");
      const h = Ct(f.patch) ? f.patch : f;
      Object.assign(d, h);
      continue;
    }
    if (l === "remove-activity") {
      const d = Tt(f.activityId, i);
      if (!d) throw new Error("Weaver batch referenced an unknown activity remove target.");
      o.state.rootActivity = Ol(o.state.rootActivity, d), o.layout = o.layout.filter((h) => h.nodeId !== d);
      continue;
    }
    if (l === "connect-activities") {
      P0(o, f, i);
      continue;
    }
    if (l === "disconnect-activities") {
      T0(o, f, i);
      continue;
    }
    throw new Error(`Weaver batch operation '${String(u.kind || "unknown")}' is not supported by this designer apply path.`);
  }
  if (!o.state.rootActivity) throw new Error("Weaver batch did not produce a root activity.");
  return o.sourceVersionId = null, {
    draft: o,
    appliedCount: t.operations.length,
    finalActivityIds: c,
    temporaryReferences: Object.fromEntries(i),
    summary: `Applied ${t.operations.length} workflow operation${t.operations.length === 1 ? "" : "s"} to the working draft.`
  };
}
function M0(e, t, n) {
  const o = e.parameters ?? {}, r = De(o.activityVersionId) ?? De(o.activityType) ?? "Elsa.Workflows.Activity", i = n.find((s) => s.activityVersionId === r || s.activityTypeKey === r || s.displayName === De(o.displayName));
  return i ? fi(i, t) : {
    nodeId: t,
    activityVersionId: i?.activityVersionId ?? r,
    inputs: [],
    outputs: [],
    ...De(o.displayName) ? { displayName: De(o.displayName) } : {},
    designer: { position: gi(o.position, { x: 280, y: 160 }) }
  };
}
function D0(e, t) {
  if (e.nodeId === t.nodeId) return;
  const n = Fi(e);
  n && !n.some((o) => o.nodeId === t.nodeId) && n.push(t);
}
function P0(e, t, n) {
  const o = e.state.rootActivity;
  if (!o?.structure) throw new Error("Weaver batch cannot connect activities without a flowchart root.");
  const r = Tt(t.sourceActivityId ?? t.sourceId ?? t.from, n), i = Tt(t.targetActivityId ?? t.targetId ?? t.to, n);
  if (!r || !i) throw new Error("Weaver batch connection is missing source or target activity.");
  const s = o.structure.payload, c = Array.isArray(s.connections) ? s.connections : [], u = De(t.connectionId) ?? `flow-${r}-${i}`;
  s.connections = [
    ...c.filter((l) => !Ct(l) || l.id !== u),
    {
      id: u,
      source: { nodeId: r, port: De(t.outcome) ?? De(t.sourcePort) ?? "Done" },
      target: { nodeId: i }
    }
  ];
}
function T0(e, t, n) {
  const o = e.state.rootActivity, r = o?.structure?.payload.connections;
  if (!Array.isArray(r)) return;
  const i = De(t.connectionId), s = Tt(t.sourceActivityId ?? t.sourceId ?? t.from, n), c = Tt(t.targetActivityId ?? t.targetId ?? t.to, n);
  o.structure.payload.connections = r.filter((u) => {
    if (!Ct(u)) return !0;
    if (i && u.id === i) return !1;
    const l = Ct(u.source) ? u.source.nodeId : void 0, f = Ct(u.target) ? u.target.nodeId : void 0;
    return l !== s || f !== c;
  });
}
function $0(e, t, n) {
  e[zl(t)] = {
    typeName: typeof n == "string" ? "String" : "Object",
    expression: { type: "Literal", value: n }
  };
}
function Zr(e, t, n, o) {
  const r = Tt(t, n);
  return r ? Bi(e.state.rootActivity, r) ?? o.get(r) ?? null : null;
}
function Tt(e, t) {
  const n = De(e);
  return n ? t.get(n) ?? n : null;
}
function Bi(e, t) {
  if (!e) return null;
  if (e.nodeId === t) return e;
  for (const n of Fl(e)) {
    const o = Bi(n, t);
    if (o) return o;
  }
  return null;
}
function Ol(e, t) {
  if (!e || e.nodeId === t) return null;
  const n = Fi(e);
  if (n) {
    const o = n.map((r) => Ol(r, t)).filter((r) => !!r);
    n.splice(0, n.length, ...o);
  }
  return e;
}
function Bl(e, t = /* @__PURE__ */ new Set()) {
  if (!e) return t;
  t.add(e.nodeId);
  for (const n of Fl(e)) Bl(n, t);
  return t;
}
function Fl(e) {
  return Fi(e) ?? [];
}
function Fi(e) {
  const t = e.structure?.payload;
  return Array.isArray(t?.activities) ? t.activities : null;
}
function pa(e, t, n) {
  return [
    ...e.filter((o) => o.nodeId !== t),
    { nodeId: t, x: n.x, y: n.y }
  ];
}
function gi(e, t) {
  const n = Ct(e) ? e : {}, o = Number(n.x), r = Number(n.y);
  return {
    x: Number.isFinite(o) ? Math.max(40, Math.round(o)) : t.x,
    y: Number.isFinite(r) ? Math.max(40, Math.round(r)) : t.y
  };
}
function z0(e, t) {
  const n = e.replace(/^temp:/, "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() || "weaver-activity";
  let o = n, r = 2;
  for (; t.has(o); )
    o = `${n}-${r}`, r += 1;
  return t.add(o), o;
}
function R0(e) {
  return typeof e == "number" ? j0[e] ?? "" : e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function De(e) {
  return typeof e == "string" && e.trim() ? e : null;
}
function L0(e) {
  return typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
function Ct(e) {
  return typeof e == "object" && e !== null;
}
const Wl = { workflowActivity: vx }, Xl = { workflow: Nx }, ga = "application/x-elsa-activity-version-id", V0 = 6, H0 = 1200, O0 = [10, 25, 50], B0 = 10, ya = "elsa-studio-workflow-palette-width", ma = "elsa-studio-workflow-inspector-width", xa = "elsa-studio-workflow-palette-collapsed", wa = "elsa-studio-workflow-inspector-collapsed", Yl = "elsa-studio-workflow-side-panel-maximized", vn = 180, bn = 460, F0 = 260, Nn = 260, Sn = 560, W0 = 320, va = 42, No = 16, ql = yt.createContext(null);
function Tx(e) {
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
        component: () => /* @__PURE__ */ a.jsx(X0, { context: e.backend, ai: e.ai, propertyEditors: e.propertyEditors.list(), workflowDesignerPanels: e.workflowDesigner.panels.list() })
      },
      {
        id: "workflows-executables",
        path: "/workflows/executables",
        label: "Workflow executables",
        component: () => /* @__PURE__ */ a.jsx(Y0, { context: e.backend, ai: e.ai })
      },
      {
        id: "workflows-instances",
        path: "/workflows/instances",
        label: "Workflow instances",
        component: () => /* @__PURE__ */ a.jsx(q0, { context: e.backend, ai: e.ai })
      },
      {
        id: "workflows-instance-detail",
        path: "/workflows/instances/:workflowExecutionId",
        label: "Workflow instance",
        component: () => /* @__PURE__ */ a.jsx(Z0, { context: e.backend, ai: e.ai })
      }
    ]
  });
}
function X0({
  context: e,
  ai: t,
  propertyEditors: n,
  workflowDesignerPanels: o
}) {
  const [r, i] = Y(ba);
  oe(() => {
    const c = () => i(ba());
    return window.addEventListener("popstate", c), () => window.removeEventListener("popstate", c);
  }, []);
  const s = (c) => {
    const u = c ? `/workflows/definitions?definition=${encodeURIComponent(c)}` : "/workflows/definitions";
    window.history.pushState({}, "", u), window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return r ? /* @__PURE__ */ a.jsx(wx, { context: e, definitionId: r, ai: t, propertyEditors: n, workflowDesignerPanels: o, onBack: () => s(null) }) : /* @__PURE__ */ a.jsx(sr, { title: "Definitions", children: /* @__PURE__ */ a.jsx(U0, { context: e, ai: t, onOpen: s }) });
}
function Y0({ context: e, ai: t }) {
  const [n, o] = Y(Na);
  return oe(() => {
    const r = () => o(Na());
    return window.addEventListener("popstate", r), () => window.removeEventListener("popstate", r);
  }, []), /* @__PURE__ */ a.jsx(sr, { title: "Executables", children: /* @__PURE__ */ a.jsx(J0, { context: e, ai: t, definitionFilter: n }) });
}
function q0({ context: e, ai: t }) {
  return /* @__PURE__ */ a.jsx(sr, { title: "Instances", children: /* @__PURE__ */ a.jsx(Q0, { context: e, ai: t }) });
}
function Z0({ context: e, ai: t }) {
  const n = K0();
  return /* @__PURE__ */ a.jsx(sr, { title: "Instance", children: /* @__PURE__ */ a.jsx(ex, { context: e, ai: t, workflowExecutionId: n }) });
}
function sr({ title: e, children: t }) {
  return /* @__PURE__ */ a.jsxs("section", { className: "wf-page", children: [
    /* @__PURE__ */ a.jsx("div", { className: "wf-page-header", children: /* @__PURE__ */ a.jsxs("div", { children: [
      /* @__PURE__ */ a.jsx("span", { className: "wf-kicker", children: "Workflow management" }),
      /* @__PURE__ */ a.jsx("h2", { children: e })
    ] }) }),
    t
  ] });
}
function ba() {
  return new URLSearchParams(window.location.search).get("definition");
}
function Na() {
  return new URLSearchParams(window.location.search).get("definition");
}
function K0() {
  const e = /^\/workflows\/instances\/([^/]+)$/.exec(window.location.pathname);
  return e ? decodeURIComponent(e[1]) : "";
}
function U0({ context: e, ai: t, onOpen: n }) {
  const [o, r] = Y(""), [i, s] = Y("active"), [c, u] = Y(1), [l, f] = Y(B0), [d, h] = Y("loading"), [p, g] = Y(""), [x, w] = Y(""), [m, b] = Y([]), [y, v] = Y(0), [k, E] = Y(() => /* @__PURE__ */ new Set()), [C, P] = Y(null), [T, B] = Y(!1), [_, z] = Y([]), [H, N] = Y("idle"), j = le(null), I = ye(() => m.map((L) => L.id), [m]), A = Jt(t, "weaver.workflows.suggest-create-metadata"), $ = Jt(t, "weaver.workflows.explain-definition"), D = I.filter((L) => k.has(L)).length, W = I.length > 0 && D === I.length, O = ge(async () => {
    h("loading"), g("");
    try {
      const L = await jm(e, { search: o, state: i, page: c, pageSize: l }), K = typeof L.totalCount == "number", pe = L.totalCount ?? L.definitions.length, ue = Zl(pe, l);
      if (pe > 0 && c > ue) {
        u(ue);
        return;
      }
      b(K ? L.definitions : cx(L.definitions, c, l)), v(pe), h("ready");
    } catch (L) {
      g(L instanceof Error ? L.message : String(L)), h("failed");
    }
  }, [e, o, i, c, l]);
  oe(() => {
    O();
  }, [O]), oe(() => {
    j.current && (j.current.indeterminate = D > 0 && !W);
  }, [W, D]);
  const F = ge(async () => {
    if (!(H === "loading" || H === "ready")) {
      N("loading");
      try {
        const L = await Li(e);
        z(L.activities ?? []), N("ready");
      } catch (L) {
        N("failed"), g(L instanceof Error ? L.message : String(L));
      }
    }
  }, [H, e]), U = () => {
    g(""), w(""), P({ name: "", description: "", rootKind: "flowchart" }), F();
  }, Z = async () => {
    if (C?.name.trim()) {
      B(!0), g(""), w("");
      try {
        const L = await Dm(e, {
          name: C.name.trim(),
          description: C.description.trim() || null,
          rootKind: C.rootKind,
          rootActivityVersionId: dx(C, _)
        });
        P(null), n(L.definition.id);
      } catch (L) {
        g(L instanceof Error ? L.message : String(L));
      } finally {
        B(!1);
      }
    }
  }, ne = (L) => {
    window.history.pushState({}, "", `/workflows/executables?definition=${encodeURIComponent(L)}`), window.dispatchEvent(new PopStateEvent("popstate"));
  }, ce = async () => {
    if (m.length === 1 && c > 1) {
      u(c - 1);
      return;
    }
    await O();
  }, J = () => E(/* @__PURE__ */ new Set()), R = (L, K) => {
    E((pe) => {
      const ue = new Set(pe);
      return K ? ue.add(L) : ue.delete(L), ue;
    });
  }, q = (L) => {
    E((K) => {
      const pe = new Set(K);
      for (const ue of I)
        L ? pe.add(ue) : pe.delete(ue);
      return pe;
    });
  }, ie = (L) => {
    s(L), u(1), J();
  }, re = (L) => {
    r(L), u(1), J();
  }, G = async (L) => {
    if (window.confirm(`Delete workflow definition "${L.name}"? You can restore it from the Deleted view.`)) {
      w(""), g("");
      try {
        await Pm(e, L.id), R(L.id, !1), w(`Deleted ${L.name}`), await ce();
      } catch (K) {
        g(K instanceof Error ? K.message : String(K));
      }
    }
  }, ee = async (L) => {
    w(""), g("");
    try {
      await Tm(e, L.id), R(L.id, !1), w(`Restored ${L.name}`), await ce();
    } catch (K) {
      g(K instanceof Error ? K.message : String(K));
    }
  }, ae = async (L) => {
    if (window.confirm(`Permanently delete workflow definition "${L.name}"? This removes its drafts, versions, layouts, and validations and cannot be undone.`)) {
      w(""), g("");
      try {
        await $m(e, L.id), R(L.id, !1), w(`Permanently deleted ${L.name}`), await ce();
      } catch (K) {
        g(K instanceof Error ? K.message : String(K));
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
        /* @__PURE__ */ a.jsx(Em, { size: 15 }),
        /* @__PURE__ */ a.jsx("input", { value: o, onChange: (L) => re(L.target.value), placeholder: "Search definitions" })
      ] }),
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => {
        O();
      }, children: "Refresh" }),
      /* @__PURE__ */ a.jsx("div", { className: "wf-actions", children: /* @__PURE__ */ a.jsxs("button", { type: "button", title: "Create workflow", onClick: U, children: [
        /* @__PURE__ */ a.jsx(Ri, { size: 15 }),
        " Create"
      ] }) })
    ] }),
    d === "failed" ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(at, { size: 16 }),
      " ",
      p
    ] }) : null,
    d !== "failed" && p ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(at, { size: 16 }),
      " ",
      p
    ] }) : null,
    x ? /* @__PURE__ */ a.jsxs("div", { className: "wf-status-line", children: [
      /* @__PURE__ */ a.jsx(Zn, { size: 14 }),
      " ",
      x
    ] }) : null,
    k.size > 0 ? /* @__PURE__ */ a.jsxs("div", { className: "wf-selection-bar", "aria-live": "polite", children: [
      /* @__PURE__ */ a.jsxs("span", { children: [
        k.size,
        " selected"
      ] }),
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: J, children: "Clear selection" })
    ] }) : null,
    d === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Loading workflow definitions..." }) : null,
    d === "ready" && m.length === 0 ? /* @__PURE__ */ a.jsxs("div", { className: "wf-empty", children: [
      "No ",
      i,
      " workflow definitions found."
    ] }) : null,
    d === "ready" && m.length > 0 ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsxs("div", { className: "wf-grid", role: "table", "aria-label": "Workflow definitions", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "wf-grid-head", role: "row", children: [
          /* @__PURE__ */ a.jsx("label", { className: "wf-row-select", children: /* @__PURE__ */ a.jsx(
            "input",
            {
              ref: j,
              type: "checkbox",
              checked: W,
              onChange: (L) => q(L.target.checked),
              "aria-label": "Select visible workflow definitions"
            }
          ) }),
          /* @__PURE__ */ a.jsx("span", { children: "Name" }),
          /* @__PURE__ */ a.jsx("span", { children: "Latest version" }),
          /* @__PURE__ */ a.jsx("span", { children: i === "deleted" ? "Deleted" : "Draft" }),
          /* @__PURE__ */ a.jsx("span", { children: "Modified" }),
          /* @__PURE__ */ a.jsx("span", { children: "Actions" })
        ] }),
        m.map((L) => /* @__PURE__ */ a.jsxs(
          "div",
          {
            className: "wf-grid-row",
            role: "row",
            "aria-label": `Open workflow definition ${L.name}`,
            "aria-selected": k.has(L.id),
            tabIndex: 0,
            onClick: () => n(L.id),
            onKeyDown: (K) => {
              K.currentTarget === K.target && (K.key !== "Enter" && K.key !== " " || (K.preventDefault(), n(L.id)));
            },
            children: [
              /* @__PURE__ */ a.jsx("label", { className: "wf-row-select", onClick: (K) => K.stopPropagation(), children: /* @__PURE__ */ a.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: k.has(L.id),
                  onChange: (K) => R(L.id, K.target.checked),
                  "aria-label": `Select workflow definition ${L.name}`
                }
              ) }),
              /* @__PURE__ */ a.jsxs("span", { children: [
                /* @__PURE__ */ a.jsx("strong", { children: L.name }),
                /* @__PURE__ */ a.jsx("small", { children: L.description || L.id })
              ] }),
              /* @__PURE__ */ a.jsx("span", { children: L.latestVersion ?? "No version" }),
              /* @__PURE__ */ a.jsx("span", { children: i === "deleted" ? it(L.deletedAt) : L.draftId ? "Draft" : "None" }),
              /* @__PURE__ */ a.jsx("span", { children: it(L.lastModifiedAt) }),
              /* @__PURE__ */ a.jsx("span", { className: "wf-row-actions", onClick: (K) => K.stopPropagation(), children: i === "active" ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
                /* @__PURE__ */ a.jsx("button", { type: "button", onClick: (K) => {
                  K.stopPropagation(), n(L.id);
                }, children: "Open" }),
                /* @__PURE__ */ a.jsx("button", { type: "button", onClick: (K) => {
                  K.stopPropagation(), ne(L.id);
                }, children: "Artifacts" }),
                $ ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => $t(t, $, L), children: [
                  /* @__PURE__ */ a.jsx(Pt, { size: 13 }),
                  " Explain"
                ] }) : null,
                /* @__PURE__ */ a.jsxs("button", { type: "button", className: "danger", onClick: () => {
                  G(L);
                }, children: [
                  /* @__PURE__ */ a.jsx(li, { size: 13 }),
                  " Delete"
                ] })
              ] }) : /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
                /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => {
                  ee(L);
                }, children: [
                  /* @__PURE__ */ a.jsx(_l, { size: 13 }),
                  " Restore"
                ] }),
                /* @__PURE__ */ a.jsxs("button", { type: "button", className: "danger", onClick: () => {
                  ae(L);
                }, children: [
                  /* @__PURE__ */ a.jsx(li, { size: 13 }),
                  " Delete permanently"
                ] })
              ] }) })
            ]
          },
          L.id
        ))
      ] }),
      /* @__PURE__ */ a.jsx(
        ax,
        {
          page: c,
          pageSize: l,
          totalCount: y,
          onPageChange: u,
          onPageSizeChange: (L) => {
            f(L), u(1);
          }
        }
      )
    ] }) : null,
    C ? /* @__PURE__ */ a.jsx(
      G0,
      {
        draft: C,
        activities: _,
        catalogState: H,
        creating: T,
        suggestMetadataAction: A,
        onSuggestMetadata: A ? () => $t(t, A, { draft: C, activities: _ }) : void 0,
        onChange: (L) => P(L),
        onClose: () => P(null),
        onSubmit: Z
      }
    ) : null
  ] });
}
function G0({ draft: e, activities: t, catalogState: n, creating: o, suggestMetadataAction: r, onSuggestMetadata: i, onChange: s, onClose: c, onSubmit: u }) {
  const l = ye(() => lx(t), [t]), f = ux(e, t), d = (h) => {
    if (h.startsWith("kind:")) {
      s({ ...e, rootKind: h.slice(5), rootActivityVersionId: null });
      return;
    }
    const p = t.find((g) => g.activityVersionId === h);
    s({
      ...e,
      rootKind: Kl(p) ?? e.rootKind,
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
            /* @__PURE__ */ a.jsx(Pt, { size: 13 }),
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
                l.otherCategories.map((h) => /* @__PURE__ */ a.jsx("optgroup", { label: h.name, children: h.activities.map((p) => /* @__PURE__ */ a.jsx("option", { value: p.activityVersionId, children: ke(p) }, p.activityVersionId)) }, h.name))
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
function J0({ context: e, ai: t, definitionFilter: n }) {
  const [o, r] = Y("loading"), [i, s] = Y(""), [c, u] = Y(""), [l, f] = Y([]), d = ye(
    () => n ? l.filter((x) => x.definitionId === n || x.sourceId === n) : l,
    [n, l]
  ), h = Jt(t, "weaver.workflows.explain-executable"), p = ge(async () => {
    r("loading"), s("");
    try {
      f(await Om(e)), r("ready");
    } catch (x) {
      s(x instanceof Error ? x.message : String(x)), r("failed");
    }
  }, [e]);
  oe(() => {
    p();
  }, [p]);
  const g = async (x) => {
    u(""), s("");
    try {
      await Hm(e, x.artifactId), u(`Started ${x.artifactId}`);
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
      /* @__PURE__ */ a.jsx(at, { size: 16 }),
      " ",
      i
    ] }) : null,
    c ? /* @__PURE__ */ a.jsxs("div", { className: "wf-status-line", children: [
      /* @__PURE__ */ a.jsx(Zn, { size: 14 }),
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
        /* @__PURE__ */ a.jsx("span", { children: hx(x) }),
        /* @__PURE__ */ a.jsx("span", { children: px(x) }),
        /* @__PURE__ */ a.jsx("span", { children: it(x.publishedAt ?? x.createdAt) }),
        /* @__PURE__ */ a.jsxs("span", { className: "wf-row-actions", children: [
          /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => {
            g(x);
          }, children: [
            /* @__PURE__ */ a.jsx(zi, { size: 13 }),
            " Run"
          ] }),
          h ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => $t(t, h, x), children: [
            /* @__PURE__ */ a.jsx(Pt, { size: 13 }),
            " Explain"
          ] }) : null
        ] })
      ] }, x.artifactId))
    ] }) : null
  ] });
}
function Q0({ context: e }) {
  const [t, n] = Y("loading"), [o, r] = Y(""), [i, s] = Y(""), [c, u] = Y([]), l = ge(async () => {
    n("loading"), r("");
    try {
      const d = await Bm(e, { status: i || void 0, take: 100 });
      u(d), n("ready");
    } catch (d) {
      r(d instanceof Error ? d.message : String(d)), u([]), n("failed");
    }
  }, [e, i]);
  oe(() => {
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
      /* @__PURE__ */ a.jsx(at, { size: 16 }),
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
            /* @__PURE__ */ a.jsx("span", { children: /* @__PURE__ */ a.jsx(Un, { status: d.status, subStatus: d.subStatus }) }),
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
            /* @__PURE__ */ a.jsx("span", { children: it(d.startedAt ?? d.createdAt) }),
            /* @__PURE__ */ a.jsx("span", { children: Mx(d.startedAt ?? d.createdAt, d.completedAt ?? d.updatedAt) })
          ]
        },
        d.workflowExecutionId
      ))
    ] }) : null
  ] });
}
function ex({ context: e, ai: t, workflowExecutionId: n }) {
  const [o, r] = Y("loading"), [i, s] = Y(""), [c, u] = Y(null), [l, f] = Y(null), d = Jt(t, "weaver.workflows.explain-instance"), h = ge(async () => {
    if (!n) {
      s("No workflow execution id was provided."), r("failed");
      return;
    }
    r("loading"), s("");
    try {
      const g = await Fm(e, n), [x, w] = await Promise.all([
        Mm(e, g.instance.definitionVersionId),
        Li(e)
      ]);
      u({ details: g, definitionVersion: x, activityCatalog: w.activities }), f(null), r("ready");
    } catch (g) {
      u(null), s(g instanceof Error ? g.message : String(g)), r("failed");
    }
  }, [e, n]);
  oe(() => {
    h();
  }, [h]);
  const p = () => {
    window.history.pushState({}, "", "/workflows/instances"), window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-toolbar", children: [
      /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: p, children: [
        /* @__PURE__ */ a.jsx(Fo, { size: 14 }),
        " Instances"
      ] }),
      /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => {
        h();
      }, children: [
        /* @__PURE__ */ a.jsx(_l, { size: 14 }),
        " Refresh"
      ] }),
      c && d ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => $t(t, d, c.details), children: [
        /* @__PURE__ */ a.jsx(Pt, { size: 13 }),
        " Explain"
      ] }) : null
    ] }),
    o === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Loading workflow instance..." }) : null,
    o === "failed" ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(at, { size: 16 }),
      " ",
      i
    ] }) : null,
    o === "ready" && c ? /* @__PURE__ */ a.jsxs("div", { className: "wf-instance-detail-workbench", children: [
      /* @__PURE__ */ a.jsx(
        tx,
        {
          definitionVersion: c.definitionVersion,
          activityCatalog: c.activityCatalog,
          details: c.details,
          selectedEvidenceId: l,
          onSelectEvidence: f
        }
      ),
      /* @__PURE__ */ a.jsx(
        nx,
        {
          ai: t,
          action: d,
          summary: c.details.instance,
          details: c.details,
          state: "ready",
          error: "",
          selectedEvidenceId: l,
          onSelectEvidence: f,
          graphNodeIds: sx(c.definitionVersion, c.activityCatalog)
        }
      )
    ] }) : null
  ] });
}
function tx({ definitionVersion: e, activityCatalog: t, details: n, selectedEvidenceId: o, onSelectEvidence: r }) {
  const i = ye(() => {
    const s = e.state.rootActivity;
    if (!s) return { nodes: [], edges: [] };
    const c = t.find((h) => h.activityVersionId === s.activityVersionId), u = Vi(s, c), l = u === "unsupported" ? null : An(s, []), f = u === "unsupported" ? ui(s, t, e.layout) : l ? Ml(l, t, e.layout) : ui(s, t, e.layout), d = f.nodes.map((h) => ({
      ...h,
      draggable: !1,
      connectable: !1,
      deletable: !1
    }));
    return {
      nodes: qm(d, n.activities, n.incidents, o),
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
      /* @__PURE__ */ a.jsx(Un, { status: n.instance.status, subStatus: n.instance.subStatus })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "wf-instance-canvas", children: [
      i.nodes.length === 0 ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "No workflow activities are available for this definition version." }) : null,
      i.nodes.length > 0 ? /* @__PURE__ */ a.jsxs(
        ml,
        {
          nodes: i.nodes,
          edges: i.edges,
          nodeTypes: Wl,
          edgeTypes: Xl,
          fitView: !0,
          nodesDraggable: !1,
          nodesConnectable: !1,
          elementsSelectable: !0,
          onNodeClick: (s, c) => r(c.id),
          onPaneClick: () => r(null),
          children: [
            /* @__PURE__ */ a.jsx(wl, {}),
            /* @__PURE__ */ a.jsx(Sl, { pannable: !0, zoomable: !0 }),
            /* @__PURE__ */ a.jsx(bl, {})
          ]
        }
      ) : null
    ] })
  ] });
}
function nx({ ai: e, action: t, summary: n, details: o, state: r, error: i, selectedEvidenceId: s = null, onSelectEvidence: c, graphNodeIds: u }) {
  return n ? /* @__PURE__ */ a.jsxs("aside", { className: "wf-instance-inspector", "aria-label": "Workflow instance details", children: [
    /* @__PURE__ */ a.jsxs("header", { children: [
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("span", { children: "Workflow instance" }),
        /* @__PURE__ */ a.jsx("h3", { children: n.workflowExecutionId })
      ] }),
      t ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => $t(e, t, o ?? n), children: [
        /* @__PURE__ */ a.jsx(Pt, { size: 13 }),
        " Explain"
      ] }) : null
    ] }),
    /* @__PURE__ */ a.jsxs("dl", { className: "wf-instance-meta", children: [
      /* @__PURE__ */ a.jsx("dt", { children: "Status" }),
      /* @__PURE__ */ a.jsx("dd", { children: /* @__PURE__ */ a.jsx(Un, { status: n.status, subStatus: n.subStatus }) }),
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
      /* @__PURE__ */ a.jsx("dd", { children: it(n.createdAt) }),
      /* @__PURE__ */ a.jsx("dt", { children: "Started" }),
      /* @__PURE__ */ a.jsx("dd", { children: it(n.startedAt) }),
      /* @__PURE__ */ a.jsx("dt", { children: "Completed" }),
      /* @__PURE__ */ a.jsx("dd", { children: it(n.completedAt) }),
      /* @__PURE__ */ a.jsx("dt", { children: "Correlation" }),
      /* @__PURE__ */ a.jsx("dd", { children: n.correlationId || "None" })
    ] }),
    r === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Loading instance details..." }) : null,
    r === "failed" ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(at, { size: 16 }),
      " ",
      i
    ] }) : null,
    r === "ready" && o ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsx(ox, { activities: o.activities, selectedEvidenceId: s, onSelectEvidence: c }),
      /* @__PURE__ */ a.jsx(rx, { incidents: o.incidents, selectedEvidenceId: s, onSelectEvidence: c }),
      /* @__PURE__ */ a.jsx(ix, { details: o, graphNodeIds: u })
    ] }) : null
  ] }) : /* @__PURE__ */ a.jsx("aside", { className: "wf-instance-inspector", children: /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Select a workflow instance to inspect activity history." }) });
}
function ox({ activities: e, selectedEvidenceId: t = null, onSelectEvidence: n }) {
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
          /* @__PURE__ */ a.jsx("span", { children: /* @__PURE__ */ a.jsx(Un, { status: o.status, subStatus: o.subStatus }) }),
          /* @__PURE__ */ a.jsx("strong", { children: Wi(o.activityType) ?? o.activityType }),
          /* @__PURE__ */ a.jsx("small", { children: o.activityExecutionId }),
          /* @__PURE__ */ a.jsx("time", { children: it(o.scheduledAt) })
        ]
      },
      o.activityExecutionId
    )) }) : null
  ] });
}
function rx({ incidents: e, selectedEvidenceId: t = null, onSelectEvidence: n }) {
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
function ix({ details: e, graphNodeIds: t }) {
  if (!t) return null;
  const n = new Map(e.activities.map((i) => [i.activityExecutionId, i])), o = e.activities.filter((i) => !t.has(Sa(i))), r = e.incidents.filter((i) => {
    const s = i.activityExecutionId ? n.get(i.activityExecutionId) : null, c = i.executableNodeId ?? (s ? Sa(s) : "");
    return !c || !t.has(c);
  });
  return o.length === 0 && r.length === 0 ? null : /* @__PURE__ */ a.jsxs("section", { className: "wf-instance-section", children: [
    /* @__PURE__ */ a.jsx("h4", { children: "Unmatched runtime evidence" }),
    /* @__PURE__ */ a.jsxs("div", { className: "wf-instance-unmatched-list", children: [
      o.map((i) => /* @__PURE__ */ a.jsxs("div", { className: "wf-instance-unmatched", children: [
        /* @__PURE__ */ a.jsx("strong", { children: Wi(i.activityType) ?? i.activityType }),
        /* @__PURE__ */ a.jsx("small", { children: i.activityExecutionId })
      ] }, `activity-${i.activityExecutionId}`)),
      r.map((i) => /* @__PURE__ */ a.jsxs("div", { className: "wf-instance-unmatched", children: [
        /* @__PURE__ */ a.jsx("strong", { children: i.failureType }),
        /* @__PURE__ */ a.jsx("small", { children: i.incidentId })
      ] }, `incident-${i.incidentId}`))
    ] })
  ] });
}
function Un({ status: e, subStatus: t }) {
  return /* @__PURE__ */ a.jsx("span", { className: "wf-status-badge", "data-status": e.toLowerCase(), children: t ? `${e} · ${t}` : e });
}
function sx(e, t) {
  const n = e.state.rootActivity;
  if (!n) return /* @__PURE__ */ new Set();
  const o = t.find((i) => i.activityVersionId === n.activityVersionId);
  if (Vi(n, o) === "unsupported") return /* @__PURE__ */ new Set([n.nodeId]);
  const r = An(n, []);
  return new Set(r?.slot.activities.map((i) => i.nodeId) ?? [n.nodeId]);
}
function Sa(e) {
  return e.authoredActivityId || e.executableNodeId;
}
function ax({ page: e, pageSize: t, totalCount: n, onPageChange: o, onPageSizeChange: r }) {
  const i = Zl(n, t), s = n === 0 ? 0 : (e - 1) * t + 1, c = Math.min(e * t, n);
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
      /* @__PURE__ */ a.jsx("select", { value: t, onChange: (u) => r(Number(u.target.value)), children: O0.map((u) => /* @__PURE__ */ a.jsx("option", { value: u, children: u }, u)) })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "wf-page-controls", children: [
      /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => o(e - 1), disabled: e <= 1, "aria-label": "Previous page", title: "Previous page", children: [
        /* @__PURE__ */ a.jsx(Fo, { size: 14 }),
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
        /* @__PURE__ */ a.jsx(Vt, { size: 14 })
      ] })
    ] })
  ] });
}
function cx(e, t, n) {
  return e.slice((t - 1) * n, t * n);
}
function Zl(e, t) {
  return Math.max(1, Math.ceil(e / t));
}
function Jt(e, t) {
  return e.promptActions.list().find((n) => n.id === t) ?? null;
}
function $t(e, t, n) {
  const o = t.createPrompt(n);
  o && e.dispatchPrompt(o);
}
function lx(e) {
  const t = Yo(e, "flowchart"), n = Yo(e, "sequence"), o = [
    { value: t?.activityVersionId ?? "kind:flowchart", label: "Flowchart" },
    { value: n?.activityVersionId ?? "kind:sequence", label: "Sequence" }
  ], r = /* @__PURE__ */ new Map();
  for (const s of e.filter(Ql)) {
    if (fx(s)) continue;
    const c = s.category || "Uncategorized";
    r.set(c, [...r.get(c) ?? [], s]);
  }
  const i = Array.from(r.entries()).sort(([s], [c]) => s.localeCompare(c)).map(([s, c]) => ({
    name: s,
    activities: c.sort((u, l) => ke(u).localeCompare(ke(l)))
  }));
  return { compositeRoots: o, otherCategories: i };
}
function ux(e, t) {
  return e.rootActivityVersionId ?? Yo(t, e.rootKind)?.activityVersionId ?? `kind:${e.rootKind}`;
}
function dx(e, t) {
  return e.rootActivityVersionId ?? Yo(t, e.rootKind)?.activityVersionId ?? null;
}
function Yo(e, t) {
  return e.find((n) => Kl(n) === t);
}
function Kl(e) {
  return e ? Gl(e) ? "flowchart" : Jl(e) ? "sequence" : null : null;
}
function Ul(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = n.category?.trim() || "Uncategorized";
    t.set(o, [...t.get(o) ?? [], n]);
  }
  return Array.from(t.entries()).sort(([n], [o]) => n.localeCompare(o)).map(([n, o]) => ({
    category: n,
    activities: o.sort((r, i) => ke(r).localeCompare(ke(i)))
  }));
}
function fx(e) {
  return Gl(e) || Jl(e);
}
function Gl(e) {
  return ke(e) === "Flowchart" || e.activityTypeKey.endsWith(".Flowchart");
}
function Jl(e) {
  return ke(e) === "Sequence" || e.activityTypeKey.endsWith(".Sequence");
}
function Ql(e) {
  return e.isBrowsable !== !1 && e.browsable !== !1;
}
function hx(e) {
  return e.sourceKind || e.sourceId || e.sourceVersion ? [e.sourceKind, e.sourceId, e.sourceVersion].filter(Boolean).join(" / ") : e.definitionId;
}
function px(e) {
  return gx(e.rootActivityType) || e.rootActivityType;
}
function gx(e) {
  return e.split(".").filter(Boolean).at(-1) ?? e;
}
function yx(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    So(t, n.typeName, n), So(t, n.name, n), So(t, n.displayName, n);
    const o = n.typeName.split(".").filter(Boolean).at(-1);
    So(t, o, n);
  }
  return t;
}
function mx(e, t, n) {
  const o = t.get(e.activityVersionId);
  return n.get(Cn(o?.activityTypeKey)) ?? n.get(Cn(Wi(o?.activityTypeKey))) ?? n.get(Cn(o?.displayName)) ?? n.get(Cn(e.activityVersionId)) ?? null;
}
function So(e, t, n) {
  const o = Cn(t);
  o && !e.has(o) && e.set(o, n);
}
function Cn(e) {
  return e?.trim().toLowerCase() ?? "";
}
function Wi(e) {
  return e?.split(".").filter(Boolean).at(-1);
}
function Ea(e, t, n, o) {
  const r = ar();
  if (!r) return t;
  const i = r.getItem(e);
  if (i == null) return t;
  const s = Number(i);
  return Number.isFinite(s) ? Mo(s, n, o) : t;
}
function ka(e, t) {
  const n = ar();
  if (!n) return t;
  const o = n.getItem(e);
  return o === "true" ? !0 : o === "false" ? !1 : t;
}
function xx() {
  const e = ar();
  if (!e) return null;
  const t = e.getItem(Yl);
  return t === "palette" || t === "inspector" ? t : null;
}
function ar() {
  if (typeof window > "u") return null;
  const e = window.localStorage;
  return e && typeof e.getItem == "function" && typeof e.setItem == "function" && typeof e.removeItem == "function" ? e : null;
}
function En(e, t) {
  const n = ar();
  n && (t == null ? n.removeItem(e) : n.setItem(e, t));
}
function Mo(e, t, n) {
  return Math.min(n, Math.max(t, Math.round(e)));
}
function wx({
  context: e,
  definitionId: t,
  ai: n,
  propertyEditors: o,
  workflowDesignerPanels: r,
  onBack: i
}) {
  const [s, c] = Y(null), [u, l] = Y(null), [f, d] = Y([]), [h, p] = Y([]), [g, x] = Y(jo), [w, m] = Y("loading"), [b, y] = Y([]), [v, k] = Y([]), [E, C] = Y([]), [P, T] = Y(null), [B, _] = Y(null), [z, H] = Y(null), [N, j] = Y(null), [I, A] = Y(""), [$, D] = Y(""), [W, O] = Y("idle"), [F, U] = Y(null), [Z, ne] = Y(!1), [ce, J] = Y(null), [R, q] = Y(() => /* @__PURE__ */ new Set()), [ie, re] = Y(() => Ea(ya, F0, vn, bn)), [G, ee] = Y(() => Ea(ma, W0, Nn, Sn)), [ae, L] = Y(() => ka(xa, !1)), [K, pe] = Y(() => ka(wa, !1)), [ue, _e] = Y(xx), [Be, Fe] = Y("activities"), [mt, nt] = Y("inspector"), Ie = le(null), je = le(null), $e = le(""), ze = le(0), Ge = le(Promise.resolve()), en = le(/* @__PURE__ */ new Map()), lt = le(null), xt = le(!1), wt = u?.state.rootActivity ?? null, Je = ye(() => new Map(f.map((S) => [S.activityVersionId, S])), [f]), Gn = ye(() => yx(h), [h]), Re = ye(() => Al(wt, b), [wt, b]), Jn = Vi(Re, Re ? Je.get(Re.activityVersionId) : void 0), we = !!Re && Jn === "unsupported", We = ye(() => we ? null : An(wt, b), [wt, b, we]), tn = ye(() => Ul(f), [f]), ve = ye(() => we && Re?.nodeId === B ? Re : We?.slot.activities.find((S) => S.nodeId === B) ?? null, [we, We, Re, B]), vt = ye(
    () => ve ? mx(ve, Je, Gn) : null,
    [Je, Gn, ve]
  ), nn = ve ? Ke(ve) : [], Ce = Jn === "flowchart" && We?.slot.mode === "flowchart", bt = !wt || !we, ut = W !== "idle", cr = !!u?.state.rootActivity && !ut, Qn = Jt(n, "weaver.workflows.find-draft-risks"), eo = Jt(n, "weaver.workflows.propose-update");
  oe(() => {
    if (!(!s || !u))
      return window.__ELSA_STUDIO_WORKFLOW_CONTEXT__ = {
        workflowId: s.definition.id,
        workflowDefinitionId: s.definition.id,
        workflowVersionId: u.sourceVersionId ?? null,
        draftId: u.id,
        revision: _x(u),
        selectedNodeId: B,
        selectedActivityType: vt?.typeName ?? (ve ? Je.get(ve.activityVersionId)?.activityTypeKey ?? ve.activityVersionId : null),
        summary: s.definition.name,
        activities: tu(u.state.rootActivity, Je),
        diagnostics: u.validationErrors.map((S) => ({ severity: S.code ?? "warning", message: S.message ?? "Workflow validation issue." }))
      }, () => {
        window.__ELSA_STUDIO_WORKFLOW_CONTEXT__?.workflowId === s.definition.id && (window.__ELSA_STUDIO_WORKFLOW_CONTEXT__ = void 0);
      };
  }, [Je, s, u, vt, ve, B]), oe(() => {
    const S = (V) => {
      const X = V.detail;
      if (!X?.batch || !X.respond) return;
      if (!u || !s) {
        X.respond({ ok: !1, message: "No active workflow draft is open." });
        return;
      }
      const Q = X.batch.workflowDefinitionId;
      if (Q && Q !== "active-draft" && Q !== s.definition.id) {
        X.respond({ ok: !1, message: `Batch targets workflow '${Q}', but '${s.definition.id}' is active.` });
        return;
      }
      try {
        const de = jx(u), se = A0(u, X.batch, f), he = `weaver-batch-${Date.now()}`;
        en.current.set(he, de), l(se.draft), y([]), _(se.finalActivityIds.at(-1) ?? null), J(null), U(null), D(se.summary), A(""), X.respond({ ok: !0, result: { ...se, undoToken: he } });
      } catch (de) {
        const se = de instanceof Error ? de.message : String(de);
        A(se), X.respond({ ok: !1, message: se });
      }
    }, M = (V) => {
      const X = V.detail;
      if (!X?.undoToken || !X.respond) return;
      const Q = en.current.get(X.undoToken);
      if (!Q) {
        X.respond({ ok: !1, message: "The Weaver batch undo point is no longer available." });
        return;
      }
      en.current.delete(X.undoToken), l(Q), y([]), _(null), J(null), U(null), D("Restored workflow draft before Weaver batch."), A(""), X.respond({ ok: !0, summary: "Restored workflow draft before Weaver batch." });
    };
    return window.addEventListener(fa, S), window.addEventListener(ha, M), () => {
      window.removeEventListener(fa, S), window.removeEventListener(ha, M);
    };
  }, [f, s, u]), oe(() => {
    En(ya, String(ie));
  }, [ie]), oe(() => {
    En(ma, String(G));
  }, [G]), oe(() => {
    En(xa, String(ae));
  }, [ae]), oe(() => {
    En(wa, String(K));
  }, [K]), oe(() => {
    En(Yl, ue);
  }, [ue]), oe(() => {
    if (!ue) return;
    const S = (M) => {
      M.key === "Escape" && _e(null);
    };
    return window.addEventListener("keydown", S), () => window.removeEventListener("keydown", S);
  }, [ue]);
  const on = ge(async () => {
    A(""), m("loading");
    const [S, M, V, X] = await Promise.all([
      Am(e, t),
      Li(e),
      Wm(e).then(
        (de) => ({ ok: !0, descriptors: de }),
        () => ({ ok: !1, descriptors: [] })
      ),
      Xm(e).then(
        (de) => ({ ok: !0, descriptors: de }),
        () => ({ ok: !1, descriptors: jo })
      )
    ]), Q = S.draft ?? null;
    c(S), $e.current = Q ? ht(Q) : "", l(Q), d(M.activities ?? []), p(V.descriptors), x(X.descriptors.length > 0 ? X.descriptors : jo), m(V.ok ? "ready" : "failed"), y([]), _(null);
  }, [e, t]);
  oe(() => {
    on().catch((S) => A(S instanceof Error ? S.message : String(S)));
  }, [on]), oe(() => {
    q((S) => {
      let M = !1;
      const V = new Set(S);
      for (const X of tn)
        V.has(X.category) || (V.add(X.category), M = !0);
      return M ? V : S;
    });
  }, [tn]), oe(() => {
    if (!Re) {
      k([]), C([]);
      return;
    }
    const S = we ? ui(Re, f, u?.layout ?? []) : We ? Ml(We, f, u?.layout ?? []) : { nodes: [], edges: [] };
    k(S.nodes), C(S.edges);
  }, [f, u?.layout, we, We, Re]);
  const lr = (S) => {
    l((M) => M && { ...M, state: { ...M.state, rootActivity: S } });
  }, rn = ge((S, M) => {
    if (u?.state.rootActivity && we)
      return;
    const V = fi(S, _a(S));
    if (!u?.state.rootActivity) {
      lr(V), _(V.nodeId);
      return;
    }
    if (!We) {
      if (!Ke(V)[0]) {
        D(""), A("The current root activity does not accept child activities. Drop Flowchart or Sequence to wrap it in a composite root.");
        return;
      }
      l((Q) => {
        if (!Q?.state.rootActivity) return Q;
        const de = Q.state.rootActivity, se = di(V, [], [de]), he = M ? [
          ...Q.layout.filter((Se) => Se.nodeId !== de.nodeId),
          {
            nodeId: de.nodeId,
            x: Math.round(M.x),
            y: Math.round(M.y)
          }
        ] : Q.layout;
        return {
          ...Q,
          layout: he,
          state: {
            ...Q.state,
            rootActivity: se
          }
        };
      }), _(u.state.rootActivity.nodeId), A(""), D(`Wrapped root in ${ke(S)}`);
      return;
    }
    l((X) => {
      if (!X?.state.rootActivity) return X;
      const Q = An(X.state.rootActivity, b);
      if (!Q) return X;
      const de = di(X.state.rootActivity, b, [...Q.slot.activities, V]), se = M ? [
        ...X.layout.filter((he) => he.nodeId !== V.nodeId),
        {
          nodeId: V.nodeId,
          x: Math.round(M.x),
          y: Math.round(M.y)
        }
      ] : X.layout;
      return {
        ...X,
        layout: se,
        state: {
          ...X.state,
          rootActivity: de
        }
      };
    }), _(V.nodeId);
  }, [u?.state.rootActivity, b, we, We]), zt = ge((S, M) => {
    const V = fi(S, _a(S)), X = {
      id: V.nodeId,
      type: "workflowActivity",
      position: M,
      selected: !0,
      data: {
        label: ke(S),
        activityVersionId: S.activityVersionId,
        activityTypeKey: S.activityTypeKey,
        category: S.category,
        executionType: S.executionType,
        icon: hi(S),
        childSlots: Ke(V),
        acceptsInbound: String(S.executionType ?? "").toLowerCase() !== "trigger",
        sourcePorts: $l(V, S)
      }
    };
    return { activityNode: V, node: X };
  }, []), Le = ge((S, M, V = []) => {
    we || l((X) => {
      if (!X) return X;
      const Q = Um(X.layout, S), de = X.state.rootActivity;
      if (!de) return { ...X, layout: Q };
      const se = An(de, b);
      if (!se) return { ...X, layout: Q };
      const he = Zm(se, S, M, V), Se = se.slot.mode === "flowchart" ? Km(he, M) : he;
      return {
        ...X,
        layout: Q,
        state: {
          ...X.state,
          rootActivity: Dl(de, b, Se)
        }
      };
    });
  }, [b, we]), sn = ge((S, M) => {
    if (!Ie.current) return null;
    const V = Ie.current.getBoundingClientRect();
    return P ? P.screenToFlowPosition({ x: S, y: M }) : {
      x: S - V.left,
      y: M - V.top
    };
  }, [P]), an = ge((S, M) => document.elementFromPoint(S, M)?.closest(".react-flow__edge")?.getAttribute("data-id") ?? null, []), cn = ge((S, M, V) => {
    const X = v.find((Ae) => Ae.id === M.source), Q = v.find((Ae) => Ae.id === M.target), de = X && Q ? Ix(X, Q) : X ? ja(X) : V, se = zt(S, de), Se = [...v.map((Ae) => Ae.selected ? { ...Ae, selected: !1 } : Ae), se.node], Nt = s0(E, M, se.node.id);
    k(Se), C(Nt), _(se.node.id), Le(Se, Nt, [se.activityNode]);
  }, [Le, zt, E, v]), Rt = ge((S, M, V) => {
    if (!bt || !Ie.current) return !1;
    const X = Ie.current.getBoundingClientRect();
    if (!(M >= X.left && M <= X.right && V >= X.top && V <= X.bottom)) return !1;
    const de = sn(M, V);
    if (!de) return !1;
    if (Ce) {
      const se = an(M, V), he = se ? E.find((Se) => Se.id === se) : void 0;
      if (he)
        return cn(S, he, de), !0;
    }
    return rn(S, de), !0;
  }, [rn, bt, E, an, Ce, cn, sn]);
  oe(() => {
    const S = (V) => {
      const X = lt.current;
      if (!X) return;
      Math.hypot(V.clientX - X.startX, V.clientY - X.startY) >= V0 && (X.dragging = !0);
    }, M = (V) => {
      const X = lt.current;
      if (lt.current = null, !X?.dragging || !Ie.current) return;
      const Q = Ie.current.getBoundingClientRect();
      V.clientX >= Q.left && V.clientX <= Q.right && V.clientY >= Q.top && V.clientY <= Q.bottom && (xt.current = !0, window.setTimeout(() => {
        xt.current = !1;
      }, 0), Rt(X.activity, V.clientX, V.clientY));
    };
    return window.addEventListener("pointermove", S), window.addEventListener("pointerup", M), window.addEventListener("pointercancel", M), () => {
      window.removeEventListener("pointermove", S), window.removeEventListener("pointerup", M), window.removeEventListener("pointercancel", M);
    };
  }, [P, Rt]);
  const ur = (S, M) => {
    S.dataTransfer.setData(ga, M.activityVersionId), S.dataTransfer.setData("text/plain", M.activityVersionId), S.dataTransfer.effectAllowed = "copy";
  }, dr = (S, M) => {
    S.clientX === 0 && S.clientY === 0 || Rt(M, S.clientX, S.clientY) && (xt.current = !0, window.setTimeout(() => {
      xt.current = !1;
    }, 0));
  }, fr = (S, M) => {
    S.button === 0 && (lt.current = {
      activity: M,
      startX: S.clientX,
      startY: S.clientY,
      dragging: !1
    });
  }, to = (S) => {
    xt.current || bt && rn(S);
  }, ln = (S) => {
    if (!bt) {
      S.dataTransfer.dropEffect = "none";
      return;
    }
    if (S.preventDefault(), S.dataTransfer.dropEffect = "copy", !Ce) return;
    const M = an(S.clientX, S.clientY);
    j(M);
  }, un = (S) => {
    if (!Ie.current) return;
    const M = S.relatedTarget;
    M && Ie.current.contains(M) || j(null);
  }, no = (S) => {
    if (S.preventDefault(), j(null), !bt) return;
    const M = S.dataTransfer.getData(ga) || S.dataTransfer.getData("text/plain"), V = Je.get(M);
    V && Rt(V, S.clientX, S.clientY);
  }, hr = () => {
    if (!Ce) return;
    const S = Ie.current?.getBoundingClientRect();
    S && H({
      kind: "fromEmpty",
      clientX: S.left + S.width / 2,
      clientY: S.top + S.height / 2
    });
  }, dn = ge(async (S, M) => {
    const V = async () => {
      const Q = ++ze.current, de = ht(S);
      A("");
      try {
        const se = await zm(e, S), he = ht(se);
        return $e.current = he, l((Se) => !Se || Se.id !== se.id ? Se : ht(Se) === de ? se : { ...Se, validationErrors: se.validationErrors }), Q === ze.current && D(M), se;
      } catch (se) {
        throw Q === ze.current && (D(""), A(se instanceof Error ? se.message : String(se))), se;
      }
    }, X = Ge.current.then(V, V);
    return Ge.current = X.catch(() => {
    }), X;
  }, [e]);
  oe(() => {
    if (!Z || !u || ht(u) === $e.current) return;
    D("Autosaving...");
    const M = window.setTimeout(() => {
      dn(u, "Autosaved").catch(() => {
      });
    }, H0);
    return () => window.clearTimeout(M);
  }, [Z, u, dn]);
  const pr = async () => {
    if (!(!u || ut)) {
      O("saving"), D("Saving...");
      try {
        await dn(u, "Saved");
      } catch {
      } finally {
        O("idle");
      }
    }
  }, gr = async () => {
    if (!(!u || ut)) {
      O("promoting"), D("Promoting...");
      try {
        const S = await Rm(e, u.id), M = await Lm(e, S.versionId);
        J(M.artifactId), D(`Published ${M.artifactVersion}`), await on();
      } catch (S) {
        D(""), A(S instanceof Error ? S.message : String(S));
      } finally {
        O("idle");
      }
    }
  }, yr = async () => {
    if (!u?.state.rootActivity || ut) return;
    const S = u, M = ht(S);
    U(null), D("Preparing test run...");
    try {
      O("testRunPreparing"), D("Preparing test run...");
      const V = Ax(S);
      O("testRunStarting"), D("Starting test run...");
      const X = await Vm(e, {
        definitionId: S.definitionId,
        snapshotId: V,
        state: S.state
      });
      U({ draftSignature: M, view: X }), D(ou(X) ? "Test run rejected" : "Test run dispatched");
    } catch (V) {
      D(""), A(V instanceof Error ? V.message : String(V));
    } finally {
      O("idle");
    }
  }, oo = (S) => {
    const M = we ? S.filter((V) => V.type === "select") : S;
    M.length !== 0 && k((V) => Fc(M, V));
  }, mr = (S) => {
    we || C((M) => Wc(S, M));
  }, fn = (S) => !S.source || !S.target || S.source === S.target || !Ce ? !1 : !S.targetHandle, xr = (S) => {
    if (!u?.state.rootActivity || !We || !Ce || !fn(S)) return;
    const M = Xo(S.source, S.target, S.sourceHandle ?? "Done", S.targetHandle ?? void 0), V = Yc(M, E);
    C(V), Le(v, V);
  }, wr = () => {
    Le(v, E);
  }, vr = (S, M) => {
    if (!M.nodeId || M.handleType === "target") {
      je.current = null;
      return;
    }
    je.current = {
      nodeId: M.nodeId,
      handleId: M.handleId ?? null
    };
  }, br = (S) => {
    const M = je.current;
    if (je.current = null, !M || !Ce || S.target?.closest(".react-flow__handle, .react-flow__node")) return;
    const X = Cx(S);
    H({
      kind: "fromPort",
      sourceNodeId: M.nodeId,
      sourceHandleId: M.handleId,
      clientX: X.x,
      clientY: X.y
    });
  }, Nr = (S, M) => {
    if (!Ce || !fn(M)) return;
    const V = Sg(S, {
      ...M,
      sourceHandle: M.sourceHandle ?? "Done",
      targetHandle: M.targetHandle ?? void 0
    }, E, { shouldReplaceId: !1 });
    C(V), Le(v, V);
  }, Sr = (S) => {
    if (we || S.length === 0) return;
    const M = new Set(S.map((Q) => Q.id)), V = v.filter((Q) => !M.has(Q.id)), X = E.filter((Q) => !M.has(Q.source) && !M.has(Q.target));
    k(V), C(X), B && M.has(B) && _(null), Le(V, X);
  }, ro = (S) => {
    if (we || S.length === 0) return;
    const M = new Set(S.map((X) => X.id)), V = E.filter((X) => !M.has(X.id));
    C(V), Le(v, V);
  }, io = ge((S) => {
    if (we) return;
    const M = E.filter((V) => V.id !== S);
    C(M), Le(v, M);
  }, [Le, E, we, v]), so = ge((S, M, V) => {
    Ce && H({ kind: "spliceEdge", edgeId: S, clientX: M, clientY: V });
  }, [Ce]), Er = (S) => {
    const M = z;
    if (!M) return;
    H(null);
    const V = sn(M.clientX, M.clientY) ?? { x: 0, y: 0 };
    if (M.kind === "fromEmpty") {
      const Q = zt(S, V), se = [...v.map((he) => he.selected ? { ...he, selected: !1 } : he), Q.node];
      k(se), _(Q.node.id), Le(se, E, [Q.activityNode]);
      return;
    }
    if (M.kind === "fromPort") {
      const Q = v.find((Ae) => Ae.id === M.sourceNodeId), de = Q ? ja(Q) : V, se = zt(S, de), Se = [...v.map((Ae) => Ae.selected ? { ...Ae, selected: !1 } : Ae), se.node], Nt = [...E, Xo(M.sourceNodeId, se.node.id, M.sourceHandleId ?? "Done")];
      k(Se), C(Nt), _(se.node.id), Le(Se, Nt, [se.activityNode]);
      return;
    }
    const X = E.find((Q) => Q.id === M.edgeId);
    X && cn(S, X, V);
  }, kr = ye(() => ({
    highlightedEdgeId: N,
    deleteEdge: io,
    requestInsertActivity: so
  }), [io, N, so]), Ir = (S, M, V) => {
    y((X) => [...X, { ownerNodeId: S.nodeId, slotId: M, label: V }]), _(null);
  }, Cr = ge((S) => {
    l((M) => {
      const V = M?.state.rootActivity;
      return !M || !V ? M : {
        ...M,
        state: {
          ...M.state,
          rootActivity: Pl(V, S.nodeId, () => S)
        }
      };
    });
  }, []), _r = (S) => {
    q((M) => {
      const V = new Set(M);
      return V.has(S) ? V.delete(S) : V.add(S), V;
    });
  }, ao = (S) => {
    _e((M) => M === S ? null : M), S === "palette" ? L((M) => !M) : pe((M) => !M);
  }, hn = (S) => {
    S === "palette" ? L(!1) : pe(!1), _e((M) => M === S ? null : S);
  }, co = (S, M) => {
    _e(null), S === "palette" ? (L(!1), re((V) => Mo(V + M, vn, bn))) : (pe(!1), ee((V) => Mo(V + M, Nn, Sn)));
  }, pn = (S, M) => {
    M.preventDefault(), _e(null), S === "palette" ? L(!1) : pe(!1);
    const V = M.clientX, X = S === "palette" ? ie : G, Q = S === "palette" ? vn : Nn, de = S === "palette" ? bn : Sn;
    document.body.classList.add("wf-side-panel-resizing");
    const se = (Se) => {
      const Nt = S === "palette" ? Se.clientX - V : V - Se.clientX, Ae = Mo(X + Nt, Q, de);
      S === "palette" ? re(Ae) : ee(Ae);
    }, he = () => {
      document.body.classList.remove("wf-side-panel-resizing"), window.removeEventListener("pointermove", se), window.removeEventListener("pointerup", he), window.removeEventListener("pointercancel", he);
    };
    window.addEventListener("pointermove", se), window.addEventListener("pointerup", he), window.addEventListener("pointercancel", he);
  }, lo = (S, M) => {
    M.key === "ArrowLeft" ? (M.preventDefault(), co(S, S === "palette" ? -No : No)) : M.key === "ArrowRight" ? (M.preventDefault(), co(S, S === "palette" ? No : -No)) : M.key === "Home" ? (M.preventDefault(), S === "palette" ? re(vn) : ee(Nn)) : M.key === "End" && (M.preventDefault(), S === "palette" ? re(bn) : ee(Sn));
  };
  if (!s || !u)
    return /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: I || "Loading workflow editor..." });
  const jr = [
    "wf-editor-body",
    ae ? "palette-collapsed" : "",
    K ? "inspector-collapsed" : "",
    ue === "palette" ? "palette-maximized" : "",
    ue === "inspector" ? "inspector-maximized" : ""
  ].filter(Boolean).join(" "), gn = {
    "--wf-palette-width": `${ae ? va : ie}px`,
    "--wf-inspector-width": `${K ? va : G}px`
  }, uo = !ae && ue !== "inspector", fo = !K && ue !== "palette", yn = F?.draftSignature === ht(u) ? F.view : null, ru = {
    definition: s.definition,
    draft: u,
    selectedActivity: ve,
    selectedActivityDescriptor: vt,
    selectedActivitySlots: nn,
    catalog: f,
    currentScopeOwner: Re,
    frames: b
  }, Xi = r.map((S) => {
    const M = S.component;
    return {
      id: S.id,
      title: S.title,
      side: S.side,
      order: S.order ?? 500,
      icon: null,
      render: () => /* @__PURE__ */ a.jsx(M, { context: ru })
    };
  }), Ar = [
    {
      id: "activities",
      title: "Activities",
      order: 0,
      icon: /* @__PURE__ */ a.jsx(kl, { size: 15 }),
      render: iu
    },
    ...Xi.filter((S) => S.side === "left")
  ].sort(Ca), Mr = [
    {
      id: "inspector",
      title: "Inspector",
      order: 0,
      icon: /* @__PURE__ */ a.jsx(Cl, { size: 15 }),
      render: su
    },
    ...Xi.filter((S) => S.side === "right")
  ].sort(Ca), Yi = Ar.find((S) => S.id === Be) ?? Ar[0], qi = Mr.find((S) => S.id === mt) ?? Mr[0];
  function iu() {
    return /* @__PURE__ */ a.jsx("div", { className: "wf-palette-list", role: "tree", "aria-label": "Available activities", children: tn.map((S) => {
      const M = R.has(S.category);
      return /* @__PURE__ */ a.jsxs("div", { className: "wf-palette-category", children: [
        /* @__PURE__ */ a.jsxs(
          "button",
          {
            type: "button",
            className: "wf-palette-category-toggle",
            role: "treeitem",
            "aria-expanded": M,
            onClick: () => _r(S.category),
            children: [
              M ? /* @__PURE__ */ a.jsx(bm, { size: 14 }) : /* @__PURE__ */ a.jsx(Vt, { size: 14 }),
              /* @__PURE__ */ a.jsx("span", { children: S.category }),
              /* @__PURE__ */ a.jsx("small", { children: S.activities.length })
            ]
          }
        ),
        M ? /* @__PURE__ */ a.jsx("div", { className: "wf-palette-activities", role: "group", children: S.activities.map((V) => {
          const X = V.description?.trim(), Q = X ? `wf-palette-description-${V.activityVersionId}` : void 0, de = ke(V), se = hi(V);
          return /* @__PURE__ */ a.jsxs(
            "button",
            {
              type: "button",
              className: "wf-palette-activity",
              role: "treeitem",
              draggable: !0,
              title: X || ke(V),
              "aria-describedby": Q,
              onClick: () => to(V),
              onDragStart: (he) => ur(he, V),
              onDragEnd: (he) => dr(he, V),
              onPointerDown: (he) => fr(he, V),
              children: [
                /* @__PURE__ */ a.jsx("span", { className: "wf-activity-icon", "data-icon": se, "aria-hidden": "true", children: eu(se) }),
                /* @__PURE__ */ a.jsxs("span", { className: "wf-palette-activity-text", children: [
                  /* @__PURE__ */ a.jsx("strong", { children: de }),
                  X ? /* @__PURE__ */ a.jsx("small", { id: Q, children: X }) : null
                ] }),
                /* @__PURE__ */ a.jsx(Nm, { className: "wf-palette-activity-grip", size: 14, "aria-hidden": "true" })
              ]
            },
            V.activityVersionId
          );
        }) }) : null
      ] }, S.category);
    }) });
  }
  function su() {
    return ve ? /* @__PURE__ */ a.jsxs("div", { className: "wf-inspector-content", children: [
      /* @__PURE__ */ a.jsx("h3", { children: v.find((S) => S.id === ve.nodeId)?.data.label ?? ve.nodeId }),
      /* @__PURE__ */ a.jsxs("dl", { children: [
        /* @__PURE__ */ a.jsx("dt", { children: "Node ID" }),
        /* @__PURE__ */ a.jsx("dd", { children: ve.nodeId }),
        /* @__PURE__ */ a.jsx("dt", { children: "Activity type" }),
        /* @__PURE__ */ a.jsx("dd", { children: vt?.typeName ?? Je.get(ve.activityVersionId)?.activityTypeKey ?? "Unknown" }),
        /* @__PURE__ */ a.jsx("dt", { children: "Activity version" }),
        /* @__PURE__ */ a.jsx("dd", { children: ve.activityVersionId })
      ] }),
      /* @__PURE__ */ a.jsx(
        N0,
        {
          activity: ve,
          descriptor: vt,
          editors: o,
          expressionDescriptors: g,
          descriptorStatus: w,
          onChange: Cr
        }
      ),
      nn.length > 0 ? /* @__PURE__ */ a.jsxs("div", { className: "wf-slot-list", children: [
        /* @__PURE__ */ a.jsx("span", { children: "Embedded slots" }),
        nn.map((S) => /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => Ir(ve, S.id, `${v.find((M) => M.id === ve.nodeId)?.data.label ?? ve.nodeId} / ${S.label}`), children: [
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
      /* @__PURE__ */ a.jsx("button", { type: "button", className: "wf-link-button", onClick: i, children: "Definitions" }),
      /* @__PURE__ */ a.jsx(Vt, { size: 14 }),
      /* @__PURE__ */ a.jsx("strong", { children: s.definition.name }),
      /* @__PURE__ */ a.jsx("span", { className: "wf-chip", children: "Draft" }),
      $ ? /* @__PURE__ */ a.jsxs("span", { className: "wf-status", children: [
        /* @__PURE__ */ a.jsx(Zn, { size: 13 }),
        " ",
        $
      ] }) : null,
      /* @__PURE__ */ a.jsxs("div", { className: "wf-editor-actions", children: [
        /* @__PURE__ */ a.jsxs("label", { className: "wf-autosave-toggle", children: [
          /* @__PURE__ */ a.jsx("input", { type: "checkbox", checked: Z, onChange: (S) => ne(S.target.checked) }),
          /* @__PURE__ */ a.jsx("span", { children: "Autosave" })
        ] }),
        Qn ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => $t(n, Qn, { definition: s.definition, draft: u }), children: [
          /* @__PURE__ */ a.jsx(Pt, { size: 15 }),
          " Risks"
        ] }) : null,
        eo ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => $t(n, eo, { definition: s.definition, draft: u }), children: [
          /* @__PURE__ */ a.jsx(Pt, { size: 15 }),
          " Propose"
        ] }) : null,
        /* @__PURE__ */ a.jsxs("button", { type: "button", disabled: ut, onClick: () => {
          pr();
        }, children: [
          /* @__PURE__ */ a.jsx(Sm, { size: 15 }),
          " Save"
        ] }),
        /* @__PURE__ */ a.jsxs("button", { type: "button", disabled: ut, onClick: () => {
          gr();
        }, children: [
          /* @__PURE__ */ a.jsx(Il, { size: 15 }),
          " Promote"
        ] }),
        /* @__PURE__ */ a.jsxs(
          "button",
          {
            type: "button",
            disabled: !cr,
            title: u.state.rootActivity ? "Run a transient test of the current design" : "Add a root activity before running",
            onClick: () => {
              yr();
            },
            children: [
              /* @__PURE__ */ a.jsx(zi, { size: 15 }),
              " Run"
            ]
          }
        )
      ] })
    ] }),
    I ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(at, { size: 16 }),
      " ",
      I
    ] }) : null,
    yn ? /* @__PURE__ */ a.jsx(kx, { testRun: yn }) : null,
    /* @__PURE__ */ a.jsxs("div", { className: jr, style: gn, children: [
      /* @__PURE__ */ a.jsxs("aside", { className: "wf-palette", "aria-label": "Activities panel", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "wf-panel-title", children: [
          /* @__PURE__ */ a.jsx(
            Ia,
            {
              label: "Activities panel tabs",
              tabs: Ar,
              activeTabId: Yi.id,
              onSelect: Fe
            }
          ),
          /* @__PURE__ */ a.jsxs("span", { className: "wf-panel-actions", children: [
            /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": ae ? "Expand activities panel" : "Collapse activities panel",
                title: ae ? "Expand" : "Collapse",
                onClick: () => ao("palette"),
                children: ae ? /* @__PURE__ */ a.jsx(Vt, { size: 14 }) : /* @__PURE__ */ a.jsx(Fo, { size: 14 })
              }
            ),
            ae ? null : /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": ue === "palette" ? "Restore activities panel" : "Maximize activities panel",
                title: ue === "palette" ? "Restore" : "Maximize",
                onClick: () => hn("palette"),
                children: ue === "palette" ? /* @__PURE__ */ a.jsx(ra, { size: 14 }) : /* @__PURE__ */ a.jsx(Wo, { size: 14 })
              }
            )
          ] })
        ] }),
        uo ? Yi.render() : null
      ] }),
      uo && !ue ? /* @__PURE__ */ a.jsx(
        "div",
        {
          className: "wf-side-resize-handle left",
          role: "separator",
          "aria-label": "Resize activities panel",
          "aria-orientation": "vertical",
          "aria-valuemin": vn,
          "aria-valuemax": bn,
          "aria-valuenow": ie,
          tabIndex: 0,
          onPointerDown: (S) => pn("palette", S),
          onKeyDown: (S) => lo("palette", S)
        }
      ) : /* @__PURE__ */ a.jsx("div", { className: "wf-side-resize-spacer" }),
      /* @__PURE__ */ a.jsxs("main", { className: "wf-canvas-shell", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "wf-breadcrumb", children: [
          /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => {
            y([]), _(null);
          }, children: "Root" }),
          b.map((S, M) => /* @__PURE__ */ a.jsxs(yt.Fragment, { children: [
            /* @__PURE__ */ a.jsx(Vt, { size: 13 }),
            /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => {
              y(b.slice(0, M + 1)), _(null);
            }, children: S.label })
          ] }, `${S.ownerNodeId}-${S.slotId}-${M}`))
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "wf-canvas", ref: Ie, onDragOver: ln, onDragLeave: un, onDrop: no, children: [
          /* @__PURE__ */ a.jsx(ql.Provider, { value: kr, children: /* @__PURE__ */ a.jsxs(
            ml,
            {
              nodes: v,
              edges: E,
              nodeTypes: Wl,
              edgeTypes: Xl,
              onInit: T,
              onNodesChange: oo,
              onEdgesChange: mr,
              onNodesDelete: Sr,
              onEdgesDelete: ro,
              onConnect: xr,
              onConnectStart: Ce ? vr : void 0,
              onConnectEnd: Ce ? br : void 0,
              onReconnect: Ce ? Nr : void 0,
              isValidConnection: fn,
              onDragOver: ln,
              onDragLeave: un,
              onDrop: no,
              onPaneClick: () => _(null),
              onNodeClick: (S, M) => _(M.id),
              onNodeDragStop: we ? void 0 : wr,
              fitView: !0,
              minZoom: 0.2,
              maxZoom: 1.8,
              nodesConnectable: Ce,
              nodesDraggable: !we,
              selectionOnDrag: !0,
              multiSelectionKeyCode: ["Shift", "Meta", "Control"],
              deleteKeyCode: we ? null : ["Backspace", "Delete"],
              panActivationKeyCode: null,
              defaultEdgeOptions: { type: "workflow" },
              children: [
                /* @__PURE__ */ a.jsx(wl, { gap: 18, size: 1 }),
                /* @__PURE__ */ a.jsx(bl, {}),
                /* @__PURE__ */ a.jsx(Sl, { pannable: !0, zoomable: !0 })
              ]
            }
          ) }),
          Ce && v.length === 0 ? /* @__PURE__ */ a.jsxs("button", { type: "button", className: "wf-empty-canvas-add", onClick: () => hr(), children: [
            /* @__PURE__ */ a.jsx(Ri, { size: 15 }),
            " Add activity"
          ] }) : null,
          z ? /* @__PURE__ */ a.jsx(
            Sx,
            {
              clientX: z.clientX,
              clientY: z.clientY,
              activities: f,
              onPick: Er,
              onClose: () => H(null)
            }
          ) : null
        ] }),
        /* @__PURE__ */ a.jsx(Ex, { draft: u })
      ] }),
      fo && !ue ? /* @__PURE__ */ a.jsx(
        "div",
        {
          className: "wf-side-resize-handle right",
          role: "separator",
          "aria-label": "Resize inspector panel",
          "aria-orientation": "vertical",
          "aria-valuemin": Nn,
          "aria-valuemax": Sn,
          "aria-valuenow": G,
          tabIndex: 0,
          onPointerDown: (S) => pn("inspector", S),
          onKeyDown: (S) => lo("inspector", S)
        }
      ) : /* @__PURE__ */ a.jsx("div", { className: "wf-side-resize-spacer" }),
      /* @__PURE__ */ a.jsxs("aside", { className: "wf-inspector", "aria-label": "Inspector panel", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "wf-panel-title", children: [
          /* @__PURE__ */ a.jsx(
            Ia,
            {
              label: "Inspector panel tabs",
              tabs: Mr,
              activeTabId: qi.id,
              onSelect: nt
            }
          ),
          /* @__PURE__ */ a.jsxs("span", { className: "wf-panel-actions", children: [
            /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": K ? "Expand inspector panel" : "Collapse inspector panel",
                title: K ? "Expand" : "Collapse",
                onClick: () => ao("inspector"),
                children: K ? /* @__PURE__ */ a.jsx(Fo, { size: 14 }) : /* @__PURE__ */ a.jsx(Vt, { size: 14 })
              }
            ),
            K ? null : /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": ue === "inspector" ? "Restore inspector panel" : "Maximize inspector panel",
                title: ue === "inspector" ? "Restore" : "Maximize",
                onClick: () => hn("inspector"),
                children: ue === "inspector" ? /* @__PURE__ */ a.jsx(ra, { size: 14 }) : /* @__PURE__ */ a.jsx(Wo, { size: 14 })
              }
            )
          ] })
        ] }),
        fo ? qi.render() : null
      ] })
    ] })
  ] });
}
function Ia({
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
function Ca(e, t) {
  return e.order - t.order || e.title.localeCompare(t.title);
}
function vx({ data: e, selected: t }) {
  const n = e, o = n.runtime, r = !n.suppressFlowPorts, i = r ? n.sourcePorts.length > 0 ? n.sourcePorts : [{ name: "Done", displayName: "Done" }] : [], s = bx(n);
  return /* @__PURE__ */ a.jsxs(
    "div",
    {
      className: ["wf-node", t ? "selected" : "", o ? "wf-node-runtime" : "", o?.hasBlockingIncident ? "faulted" : ""].filter(Boolean).join(" "),
      "data-icon": n.icon ?? "activity",
      children: [
        r && n.acceptsInbound ? /* @__PURE__ */ a.jsx(Gt, { type: "target", position: te.Left }) : null,
        /* @__PURE__ */ a.jsxs("div", { className: "wf-node-content", children: [
          /* @__PURE__ */ a.jsx("span", { className: "wf-node-icon", "aria-hidden": "true", children: eu(n.icon) }),
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
          o.status ? /* @__PURE__ */ a.jsx(Un, { status: o.status, subStatus: o.subStatus }) : null,
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
          return /* @__PURE__ */ a.jsxs(yt.Fragment, { children: [
            /* @__PURE__ */ a.jsx("span", { className: "wf-node-port-label", style: { top: l }, children: c.displayName }),
            /* @__PURE__ */ a.jsx(Gt, { type: "source", position: te.Right, id: c.name, style: { top: l } })
          ] }, c.name);
        })
      ]
    }
  );
}
function bx(e) {
  const t = e.category?.trim(), n = e.executionType?.trim();
  return [t, n].filter((r) => !!r).join(" · ");
}
function eu(e) {
  switch (e) {
    case "flowchart":
      return /* @__PURE__ */ a.jsx(Il, { size: 15 });
    case "sequence":
      return /* @__PURE__ */ a.jsx(Cl, { size: 15 });
    case "terminal":
      return /* @__PURE__ */ a.jsx(km, { size: 15 });
    case "runtime":
      return /* @__PURE__ */ a.jsx(zi, { size: 15 });
    case "trigger":
      return /* @__PURE__ */ a.jsx(Cm, { size: 15 });
    default:
      return /* @__PURE__ */ a.jsx(kl, { size: 15 });
  }
}
function Nx(e) {
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
  } = e, h = yt.useContext(ql), [p, g] = Y(!1), [x, w, m] = Oo({ sourceX: n, sourceY: o, targetX: r, targetY: i, sourcePosition: s, targetPosition: c }), b = h?.highlightedEdgeId === t;
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx(
      qn,
      {
        id: t,
        path: x,
        markerEnd: u,
        style: {
          ...l,
          strokeWidth: b ? 2.5 : l?.strokeWidth
        },
        label: f,
        labelX: w,
        labelY: m,
        labelStyle: d,
        onMouseEnter: () => g(!0),
        onMouseLeave: () => g(!1)
      }
    ),
    h ? /* @__PURE__ */ a.jsx(Yy, { children: /* @__PURE__ */ a.jsxs(
      "div",
      {
        className: ["wf-edge-actions", p ? "visible" : "", b ? "highlighted" : ""].filter(Boolean).join(" "),
        style: { transform: `translate(-50%, -50%) translate(${w}px, ${m}px)` },
        onMouseEnter: () => g(!0),
        onMouseLeave: () => g(!1),
        children: [
          /* @__PURE__ */ a.jsx("button", { type: "button", "aria-label": "Insert activity into connection", title: "Insert activity", onClick: (y) => h.requestInsertActivity(t, y.clientX, y.clientY), children: /* @__PURE__ */ a.jsx(Ri, { size: 12 }) }),
          /* @__PURE__ */ a.jsx("button", { type: "button", "aria-label": "Delete connection", title: "Delete connection", onClick: () => h.deleteEdge(t), children: /* @__PURE__ */ a.jsx(li, { size: 12 }) })
        ]
      }
    ) }) : null
  ] });
}
function Sx({ clientX: e, clientY: t, activities: n, onPick: o, onClose: r }) {
  const [i, s] = Y(""), [c, u] = Y(0), l = le(null), f = le(null), d = ye(() => {
    const b = i.trim().toLowerCase(), y = n.filter(Ql);
    return b ? y.filter((v) => ke(v).toLowerCase().includes(b) || v.activityTypeKey.toLowerCase().includes(b) || (v.category ?? "").toLowerCase().includes(b) || (v.description ?? "").toLowerCase().includes(b)) : y;
  }, [n, i]), h = ye(() => Ul(d), [d]), p = ye(() => h.flatMap((b) => b.activities), [h]);
  oe(() => {
    requestAnimationFrame(() => f.current?.focus());
  }, []), oe(() => {
    const b = (v) => {
      l.current?.contains(v.target) || r();
    }, y = (v) => {
      v.key === "Escape" && r();
    };
    return document.addEventListener("mousedown", b, !0), document.addEventListener("keydown", y), () => {
      document.removeEventListener("mousedown", b, !0), document.removeEventListener("keydown", y);
    };
  }, [r]);
  const g = (b) => {
    if (b.key === "ArrowDown")
      b.preventDefault(), u((y) => Math.min(y + 1, p.length - 1));
    else if (b.key === "ArrowUp")
      b.preventDefault(), u((y) => Math.max(y - 1, 0));
    else if (b.key === "Enter") {
      b.preventDefault();
      const y = p[c];
      y && o(y);
    }
  }, x = Math.max(8, Math.min(e + 4, window.innerWidth - 328)), w = Math.max(8, Math.min(t + 4, window.innerHeight - 360));
  let m = -1;
  return /* @__PURE__ */ a.jsxs("div", { ref: l, className: "wf-connect-menu", style: { left: x, top: w }, onMouseDown: (b) => b.stopPropagation(), onClick: (b) => b.stopPropagation(), children: [
    /* @__PURE__ */ a.jsx(
      "input",
      {
        ref: f,
        type: "search",
        value: i,
        placeholder: "Search activities...",
        "aria-label": "Search activities",
        onChange: (b) => {
          s(b.target.value), u(0);
        },
        onKeyDown: g
      }
    ),
    /* @__PURE__ */ a.jsx("div", { className: "wf-connect-menu-list", role: "listbox", "aria-label": "Activity picker", children: h.length === 0 ? /* @__PURE__ */ a.jsx("p", { children: "No matching activities." }) : h.map((b) => /* @__PURE__ */ a.jsxs("section", { children: [
      /* @__PURE__ */ a.jsx("h4", { children: b.category }),
      b.activities.map((y) => {
        m += 1;
        const v = m, k = v === c;
        return /* @__PURE__ */ a.jsxs(
          "button",
          {
            type: "button",
            role: "option",
            "aria-selected": k,
            className: k ? "active" : "",
            onMouseEnter: () => u(v),
            onClick: () => o(y),
            children: [
              /* @__PURE__ */ a.jsx("strong", { children: ke(y) }),
              /* @__PURE__ */ a.jsx("small", { children: y.category || y.activityTypeKey })
            ]
          },
          y.activityVersionId
        );
      })
    ] }, b.category)) })
  ] });
}
function Ex({ draft: e }) {
  return e.validationErrors.length ? /* @__PURE__ */ a.jsxs("div", { className: "wf-validation", children: [
    /* @__PURE__ */ a.jsx(at, { size: 14 }),
    e.validationErrors.length,
    " validation issue",
    e.validationErrors.length === 1 ? "" : "s"
  ] }) : /* @__PURE__ */ a.jsxs("div", { className: "wf-validation ok", children: [
    /* @__PURE__ */ a.jsx(Zn, { size: 14 }),
    " No validation errors"
  ] });
}
function kx({ testRun: e }) {
  const t = ou(e);
  return /* @__PURE__ */ a.jsxs("section", { className: "wf-test-run-capsule", "data-state": t ? "rejected" : "accepted", "aria-live": "polite", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-test-run-heading", children: [
      t ? /* @__PURE__ */ a.jsx(at, { size: 16 }) : /* @__PURE__ */ a.jsx(Zn, { size: 16 }),
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
        /* @__PURE__ */ a.jsx("dd", { children: it(e.expiresAt) })
      ] }) : null
    ] })
  ] });
}
function _a(e) {
  return `${ke(e).replace(/[^a-z0-9]+/gi, "").toLowerCase() || "activity"}-${crypto.randomUUID().slice(0, 8)}`;
}
function ja(e) {
  return { x: e.position.x + 280, y: e.position.y };
}
function Ix(e, t) {
  return {
    x: Math.round((e.position.x + t.position.x) / 2),
    y: Math.round((e.position.y + t.position.y) / 2)
  };
}
function Cx(e) {
  return "changedTouches" in e && e.changedTouches.length > 0 ? { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY } : { x: e.clientX, y: e.clientY };
}
function ht(e) {
  return JSON.stringify({ state: e.state, layout: e.layout });
}
function _x(e) {
  return nu(ht(e));
}
function tu(e, t, n = []) {
  if (!e) return n;
  const o = t.get(e.activityVersionId);
  n.push({
    id: e.nodeId,
    type: o?.activityTypeKey ?? e.activityVersionId,
    displayName: o ? ke(o) : void 0
  });
  for (const r of Ke(e))
    for (const i of r.activities) tu(i, t, n);
  return n;
}
function jx(e) {
  return typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
function Ax(e) {
  return `${e.id}-${nu(JSON.stringify(e.state))}`;
}
function nu(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n += 1)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16).padStart(8, "0");
}
function ou(e) {
  return e.status.toLowerCase() === "rejected";
}
function it(e) {
  if (!e) return "";
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : t.toLocaleString();
}
function Mx(e, t) {
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
  Tx as register
};
