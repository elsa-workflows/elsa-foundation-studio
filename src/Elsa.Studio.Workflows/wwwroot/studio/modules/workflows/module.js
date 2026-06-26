import xt, { memo as Se, forwardRef as Qo, useRef as ce, useEffect as oe, useCallback as he, useContext as Bn, useMemo as me, useState as Y, createContext as bi, useLayoutEffect as Cd, createElement as ei, useId as Ha } from "react";
import "@tanstack/react-query";
function jd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Rr = { exports: {} }, wn = {};
var os;
function _d() {
  if (os) return wn;
  os = 1;
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
  return wn.Fragment = t, wn.jsx = n, wn.jsxs = n, wn;
}
var rs;
function Ad() {
  return rs || (rs = 1, Rr.exports = _d()), Rr.exports;
}
var a = Ad();
function Ie(e) {
  if (typeof e == "string" || typeof e == "number") return "" + e;
  let t = "";
  if (Array.isArray(e))
    for (let n = 0, o; n < e.length; n++)
      (o = Ie(e[n])) !== "" && (t += (t && " ") + o);
  else
    for (let n in e)
      e[n] && (t += (t && " ") + n);
  return t;
}
var Md = { value: () => {
} };
function er() {
  for (var e = 0, t = arguments.length, n = {}, o; e < t; ++e) {
    if (!(o = arguments[e] + "") || o in n || /[\s.]/.test(o)) throw new Error("illegal type: " + o);
    n[o] = [];
  }
  return new _o(n);
}
function _o(e) {
  this._ = e;
}
function Dd(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var o = "", r = n.indexOf(".");
    if (r >= 0 && (o = n.slice(r + 1), n = n.slice(0, r)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: o };
  });
}
_o.prototype = er.prototype = {
  constructor: _o,
  on: function(e, t) {
    var n = this._, o = Dd(e + "", n), r, i = -1, s = o.length;
    if (arguments.length < 2) {
      for (; ++i < s; ) if ((r = (e = o[i]).type) && (r = Pd(n[r], e.name))) return r;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++i < s; )
      if (r = (e = o[i]).type) n[r] = is(n[r], e.name, t);
      else if (t == null) for (r in n) n[r] = is(n[r], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new _o(e);
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
function Pd(e, t) {
  for (var n = 0, o = e.length, r; n < o; ++n)
    if ((r = e[n]).name === t)
      return r.value;
}
function is(e, t, n) {
  for (var o = 0, r = e.length; o < r; ++o)
    if (e[o].name === t) {
      e[o] = Md, e = e.slice(0, o).concat(e.slice(o + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var ti = "http://www.w3.org/1999/xhtml";
const ss = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ti,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function tr(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), ss.hasOwnProperty(t) ? { space: ss[t], local: e } : e;
}
function $d(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === ti && t.documentElement.namespaceURI === ti ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function Td(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Oa(e) {
  var t = tr(e);
  return (t.local ? Td : $d)(t);
}
function zd() {
}
function Ni(e) {
  return e == null ? zd : function() {
    return this.querySelector(e);
  };
}
function Rd(e) {
  typeof e != "function" && (e = Ni(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var i = t[r], s = i.length, c = o[r] = new Array(s), d, l, u = 0; u < s; ++u)
      (d = i[u]) && (l = e.call(d, d.__data__, u, i)) && ("__data__" in d && (l.__data__ = d.__data__), c[u] = l);
  return new Oe(o, this._parents);
}
function Ld(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Vd() {
  return [];
}
function Fa(e) {
  return e == null ? Vd : function() {
    return this.querySelectorAll(e);
  };
}
function Hd(e) {
  return function() {
    return Ld(e.apply(this, arguments));
  };
}
function Od(e) {
  typeof e == "function" ? e = Hd(e) : e = Fa(e);
  for (var t = this._groups, n = t.length, o = [], r = [], i = 0; i < n; ++i)
    for (var s = t[i], c = s.length, d, l = 0; l < c; ++l)
      (d = s[l]) && (o.push(e.call(d, d.__data__, l, s)), r.push(d));
  return new Oe(o, r);
}
function Ba(e) {
  return function() {
    return this.matches(e);
  };
}
function Wa(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Fd = Array.prototype.find;
function Bd(e) {
  return function() {
    return Fd.call(this.children, e);
  };
}
function Wd() {
  return this.firstElementChild;
}
function Xd(e) {
  return this.select(e == null ? Wd : Bd(typeof e == "function" ? e : Wa(e)));
}
var Yd = Array.prototype.filter;
function qd() {
  return Array.from(this.children);
}
function Zd(e) {
  return function() {
    return Yd.call(this.children, e);
  };
}
function Ud(e) {
  return this.selectAll(e == null ? qd : Zd(typeof e == "function" ? e : Wa(e)));
}
function Kd(e) {
  typeof e != "function" && (e = Ba(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var i = t[r], s = i.length, c = o[r] = [], d, l = 0; l < s; ++l)
      (d = i[l]) && e.call(d, d.__data__, l, i) && c.push(d);
  return new Oe(o, this._parents);
}
function Xa(e) {
  return new Array(e.length);
}
function Gd() {
  return new Oe(this._enter || this._groups.map(Xa), this._parents);
}
function Ro(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Ro.prototype = {
  constructor: Ro,
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
function Jd(e) {
  return function() {
    return e;
  };
}
function Qd(e, t, n, o, r, i) {
  for (var s = 0, c, d = t.length, l = i.length; s < l; ++s)
    (c = t[s]) ? (c.__data__ = i[s], o[s] = c) : n[s] = new Ro(e, i[s]);
  for (; s < d; ++s)
    (c = t[s]) && (r[s] = c);
}
function eu(e, t, n, o, r, i, s) {
  var c, d, l = /* @__PURE__ */ new Map(), u = t.length, f = i.length, h = new Array(u), p;
  for (c = 0; c < u; ++c)
    (d = t[c]) && (h[c] = p = s.call(d, d.__data__, c, t) + "", l.has(p) ? r[c] = d : l.set(p, d));
  for (c = 0; c < f; ++c)
    p = s.call(e, i[c], c, i) + "", (d = l.get(p)) ? (o[c] = d, d.__data__ = i[c], l.delete(p)) : n[c] = new Ro(e, i[c]);
  for (c = 0; c < u; ++c)
    (d = t[c]) && l.get(h[c]) === d && (r[c] = d);
}
function tu(e) {
  return e.__data__;
}
function nu(e, t) {
  if (!arguments.length) return Array.from(this, tu);
  var n = t ? eu : Qd, o = this._parents, r = this._groups;
  typeof e != "function" && (e = Jd(e));
  for (var i = r.length, s = new Array(i), c = new Array(i), d = new Array(i), l = 0; l < i; ++l) {
    var u = o[l], f = r[l], h = f.length, p = ou(e.call(u, u && u.__data__, l, o)), y = p.length, v = c[l] = new Array(y), w = s[l] = new Array(y), m = d[l] = new Array(h);
    n(u, f, v, w, m, p, t);
    for (var N = 0, g = 0, x, S; N < y; ++N)
      if (x = v[N]) {
        for (N >= g && (g = N + 1); !(S = w[g]) && ++g < y; ) ;
        x._next = S || null;
      }
  }
  return s = new Oe(s, o), s._enter = c, s._exit = d, s;
}
function ou(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function ru() {
  return new Oe(this._exit || this._groups.map(Xa), this._parents);
}
function iu(e, t, n) {
  var o = this.enter(), r = this, i = this.exit();
  return typeof e == "function" ? (o = e(o), o && (o = o.selection())) : o = o.append(e + ""), t != null && (r = t(r), r && (r = r.selection())), n == null ? i.remove() : n(i), o && r ? o.merge(r).order() : r;
}
function su(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, o = t._groups, r = n.length, i = o.length, s = Math.min(r, i), c = new Array(r), d = 0; d < s; ++d)
    for (var l = n[d], u = o[d], f = l.length, h = c[d] = new Array(f), p, y = 0; y < f; ++y)
      (p = l[y] || u[y]) && (h[y] = p);
  for (; d < r; ++d)
    c[d] = n[d];
  return new Oe(c, this._parents);
}
function au() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var o = e[t], r = o.length - 1, i = o[r], s; --r >= 0; )
      (s = o[r]) && (i && s.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(s, i), i = s);
  return this;
}
function cu(e) {
  e || (e = lu);
  function t(f, h) {
    return f && h ? e(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, o = n.length, r = new Array(o), i = 0; i < o; ++i) {
    for (var s = n[i], c = s.length, d = r[i] = new Array(c), l, u = 0; u < c; ++u)
      (l = s[u]) && (d[u] = l);
    d.sort(t);
  }
  return new Oe(r, this._parents).order();
}
function lu(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function du() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function uu() {
  return Array.from(this);
}
function fu() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], r = 0, i = o.length; r < i; ++r) {
      var s = o[r];
      if (s) return s;
    }
  return null;
}
function hu() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function pu() {
  return !this.node();
}
function gu(e) {
  for (var t = this._groups, n = 0, o = t.length; n < o; ++n)
    for (var r = t[n], i = 0, s = r.length, c; i < s; ++i)
      (c = r[i]) && e.call(c, c.__data__, i, r);
  return this;
}
function yu(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function mu(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function xu(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function wu(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function vu(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function bu(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Nu(e, t) {
  var n = tr(e);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each((t == null ? n.local ? mu : yu : typeof t == "function" ? n.local ? bu : vu : n.local ? wu : xu)(n, t));
}
function Ya(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Su(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Eu(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function ku(e, t, n) {
  return function() {
    var o = t.apply(this, arguments);
    o == null ? this.style.removeProperty(e) : this.style.setProperty(e, o, n);
  };
}
function Iu(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? Su : typeof t == "function" ? ku : Eu)(e, t, n ?? "")) : Kt(this.node(), e);
}
function Kt(e, t) {
  return e.style.getPropertyValue(t) || Ya(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Cu(e) {
  return function() {
    delete this[e];
  };
}
function ju(e, t) {
  return function() {
    this[e] = t;
  };
}
function _u(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function Au(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Cu : typeof t == "function" ? _u : ju)(e, t)) : this.node()[e];
}
function qa(e) {
  return e.trim().split(/^|\s+/);
}
function Si(e) {
  return e.classList || new Za(e);
}
function Za(e) {
  this._node = e, this._names = qa(e.getAttribute("class") || "");
}
Za.prototype = {
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
function Ua(e, t) {
  for (var n = Si(e), o = -1, r = t.length; ++o < r; ) n.add(t[o]);
}
function Ka(e, t) {
  for (var n = Si(e), o = -1, r = t.length; ++o < r; ) n.remove(t[o]);
}
function Mu(e) {
  return function() {
    Ua(this, e);
  };
}
function Du(e) {
  return function() {
    Ka(this, e);
  };
}
function Pu(e, t) {
  return function() {
    (t.apply(this, arguments) ? Ua : Ka)(this, e);
  };
}
function $u(e, t) {
  var n = qa(e + "");
  if (arguments.length < 2) {
    for (var o = Si(this.node()), r = -1, i = n.length; ++r < i; ) if (!o.contains(n[r])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Pu : t ? Mu : Du)(n, t));
}
function Tu() {
  this.textContent = "";
}
function zu(e) {
  return function() {
    this.textContent = e;
  };
}
function Ru(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Lu(e) {
  return arguments.length ? this.each(e == null ? Tu : (typeof e == "function" ? Ru : zu)(e)) : this.node().textContent;
}
function Vu() {
  this.innerHTML = "";
}
function Hu(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Ou(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Fu(e) {
  return arguments.length ? this.each(e == null ? Vu : (typeof e == "function" ? Ou : Hu)(e)) : this.node().innerHTML;
}
function Bu() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Wu() {
  return this.each(Bu);
}
function Xu() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Yu() {
  return this.each(Xu);
}
function qu(e) {
  var t = typeof e == "function" ? e : Oa(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Zu() {
  return null;
}
function Uu(e, t) {
  var n = typeof e == "function" ? e : Oa(e), o = t == null ? Zu : typeof t == "function" ? t : Ni(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function Ku() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Gu() {
  return this.each(Ku);
}
function Ju() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Qu() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function ef(e) {
  return this.select(e ? Qu : Ju);
}
function tf(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function nf(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function of(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", o = t.indexOf(".");
    return o >= 0 && (n = t.slice(o + 1), t = t.slice(0, o)), { type: t, name: n };
  });
}
function rf(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, o = -1, r = t.length, i; n < r; ++n)
        i = t[n], (!e.type || i.type === e.type) && i.name === e.name ? this.removeEventListener(i.type, i.listener, i.options) : t[++o] = i;
      ++o ? t.length = o : delete this.__on;
    }
  };
}
function sf(e, t, n) {
  return function() {
    var o = this.__on, r, i = nf(t);
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
function af(e, t, n) {
  var o = of(e + ""), r, i = o.length, s;
  if (arguments.length < 2) {
    var c = this.node().__on;
    if (c) {
      for (var d = 0, l = c.length, u; d < l; ++d)
        for (r = 0, u = c[d]; r < i; ++r)
          if ((s = o[r]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (c = t ? sf : rf, r = 0; r < i; ++r) this.each(c(o[r], t, n));
  return this;
}
function Ga(e, t, n) {
  var o = Ya(e), r = o.CustomEvent;
  typeof r == "function" ? r = new r(t, n) : (r = o.document.createEvent("Event"), n ? (r.initEvent(t, n.bubbles, n.cancelable), r.detail = n.detail) : r.initEvent(t, !1, !1)), e.dispatchEvent(r);
}
function cf(e, t) {
  return function() {
    return Ga(this, e, t);
  };
}
function lf(e, t) {
  return function() {
    return Ga(this, e, t.apply(this, arguments));
  };
}
function df(e, t) {
  return this.each((typeof t == "function" ? lf : cf)(e, t));
}
function* uf() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], r = 0, i = o.length, s; r < i; ++r)
      (s = o[r]) && (yield s);
}
var Ja = [null];
function Oe(e, t) {
  this._groups = e, this._parents = t;
}
function Wn() {
  return new Oe([[document.documentElement]], Ja);
}
function ff() {
  return this;
}
Oe.prototype = Wn.prototype = {
  constructor: Oe,
  select: Rd,
  selectAll: Od,
  selectChild: Xd,
  selectChildren: Ud,
  filter: Kd,
  data: nu,
  enter: Gd,
  exit: ru,
  join: iu,
  merge: su,
  selection: ff,
  order: au,
  sort: cu,
  call: du,
  nodes: uu,
  node: fu,
  size: hu,
  empty: pu,
  each: gu,
  attr: Nu,
  style: Iu,
  property: Au,
  classed: $u,
  text: Lu,
  html: Fu,
  raise: Wu,
  lower: Yu,
  append: qu,
  insert: Uu,
  remove: Gu,
  clone: ef,
  datum: tf,
  on: af,
  dispatch: df,
  [Symbol.iterator]: uf
};
function He(e) {
  return typeof e == "string" ? new Oe([[document.querySelector(e)]], [document.documentElement]) : new Oe([[e]], Ja);
}
function hf(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Ye(e, t) {
  if (e = hf(e), t === void 0 && (t = e.currentTarget), t) {
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
const pf = { passive: !1 }, Pn = { capture: !0, passive: !1 };
function Lr(e) {
  e.stopImmediatePropagation();
}
function qt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Qa(e) {
  var t = e.document.documentElement, n = He(e).on("dragstart.drag", qt, Pn);
  "onselectstart" in t ? n.on("selectstart.drag", qt, Pn) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function ec(e, t) {
  var n = e.document.documentElement, o = He(e).on("dragstart.drag", null);
  t && (o.on("click.drag", qt, Pn), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const xo = (e) => () => e;
function ni(e, {
  sourceEvent: t,
  subject: n,
  target: o,
  identifier: r,
  active: i,
  x: s,
  y: c,
  dx: d,
  dy: l,
  dispatch: u
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
    dx: { value: d, enumerable: !0, configurable: !0 },
    dy: { value: l, enumerable: !0, configurable: !0 },
    _: { value: u }
  });
}
ni.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function gf(e) {
  return !e.ctrlKey && !e.button;
}
function yf() {
  return this.parentNode;
}
function mf(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function xf() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function tc() {
  var e = gf, t = yf, n = mf, o = xf, r = {}, i = er("start", "drag", "end"), s = 0, c, d, l, u, f = 0;
  function h(x) {
    x.on("mousedown.drag", p).filter(o).on("touchstart.drag", w).on("touchmove.drag", m, pf).on("touchend.drag touchcancel.drag", N).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function p(x, S) {
    if (!(u || !e.call(this, x, S))) {
      var k = g(this, t.call(this, x, S), x, S, "mouse");
      k && (He(x.view).on("mousemove.drag", y, Pn).on("mouseup.drag", v, Pn), Qa(x.view), Lr(x), l = !1, c = x.clientX, d = x.clientY, k("start", x));
    }
  }
  function y(x) {
    if (qt(x), !l) {
      var S = x.clientX - c, k = x.clientY - d;
      l = S * S + k * k > f;
    }
    r.mouse("drag", x);
  }
  function v(x) {
    He(x.view).on("mousemove.drag mouseup.drag", null), ec(x.view, l), qt(x), r.mouse("end", x);
  }
  function w(x, S) {
    if (e.call(this, x, S)) {
      var k = x.changedTouches, C = t.call(this, x, S), P = k.length, $, F;
      for ($ = 0; $ < P; ++$)
        (F = g(this, C, x, S, k[$].identifier, k[$])) && (Lr(x), F("start", x, k[$]));
    }
  }
  function m(x) {
    var S = x.changedTouches, k = S.length, C, P;
    for (C = 0; C < k; ++C)
      (P = r[S[C].identifier]) && (qt(x), P("drag", x, S[C]));
  }
  function N(x) {
    var S = x.changedTouches, k = S.length, C, P;
    for (u && clearTimeout(u), u = setTimeout(function() {
      u = null;
    }, 500), C = 0; C < k; ++C)
      (P = r[S[C].identifier]) && (Lr(x), P("end", x, S[C]));
  }
  function g(x, S, k, C, P, $) {
    var F = i.copy(), j = Ye($ || k, S), z, H, E;
    if ((E = n.call(x, new ni("beforestart", {
      sourceEvent: k,
      target: h,
      identifier: P,
      active: s,
      x: j[0],
      y: j[1],
      dx: 0,
      dy: 0,
      dispatch: F
    }), C)) != null)
      return z = E.x - j[0] || 0, H = E.y - j[1] || 0, function _(I, A, T) {
        var D = j, W;
        switch (I) {
          case "start":
            r[P] = _, W = s++;
            break;
          case "end":
            delete r[P], --s;
          // falls through
          case "drag":
            j = Ye(T || A, S), W = s;
            break;
        }
        F.call(
          I,
          x,
          new ni(I, {
            sourceEvent: A,
            subject: E,
            target: h,
            identifier: P,
            active: W,
            x: j[0] + z,
            y: j[1] + H,
            dx: j[0] - D[0],
            dy: j[1] - D[1],
            dispatch: F
          }),
          C
        );
      };
  }
  return h.filter = function(x) {
    return arguments.length ? (e = typeof x == "function" ? x : xo(!!x), h) : e;
  }, h.container = function(x) {
    return arguments.length ? (t = typeof x == "function" ? x : xo(x), h) : t;
  }, h.subject = function(x) {
    return arguments.length ? (n = typeof x == "function" ? x : xo(x), h) : n;
  }, h.touchable = function(x) {
    return arguments.length ? (o = typeof x == "function" ? x : xo(!!x), h) : o;
  }, h.on = function() {
    var x = i.on.apply(i, arguments);
    return x === i ? h : x;
  }, h.clickDistance = function(x) {
    return arguments.length ? (f = (x = +x) * x, h) : Math.sqrt(f);
  }, h;
}
function Ei(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function nc(e, t) {
  var n = Object.create(e.prototype);
  for (var o in t) n[o] = t[o];
  return n;
}
function Xn() {
}
var $n = 0.7, Lo = 1 / $n, Zt = "\\s*([+-]?\\d+)\\s*", Tn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", tt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", wf = /^#([0-9a-f]{3,8})$/, vf = new RegExp(`^rgb\\(${Zt},${Zt},${Zt}\\)$`), bf = new RegExp(`^rgb\\(${tt},${tt},${tt}\\)$`), Nf = new RegExp(`^rgba\\(${Zt},${Zt},${Zt},${Tn}\\)$`), Sf = new RegExp(`^rgba\\(${tt},${tt},${tt},${Tn}\\)$`), Ef = new RegExp(`^hsl\\(${Tn},${tt},${tt}\\)$`), kf = new RegExp(`^hsla\\(${Tn},${tt},${tt},${Tn}\\)$`), as = {
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
Ei(Xn, At, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: cs,
  // Deprecated! Use color.formatHex.
  formatHex: cs,
  formatHex8: If,
  formatHsl: Cf,
  formatRgb: ls,
  toString: ls
});
function cs() {
  return this.rgb().formatHex();
}
function If() {
  return this.rgb().formatHex8();
}
function Cf() {
  return oc(this).formatHsl();
}
function ls() {
  return this.rgb().formatRgb();
}
function At(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = wf.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? ds(t) : n === 3 ? new ze(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? wo(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? wo(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = vf.exec(e)) ? new ze(t[1], t[2], t[3], 1) : (t = bf.exec(e)) ? new ze(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Nf.exec(e)) ? wo(t[1], t[2], t[3], t[4]) : (t = Sf.exec(e)) ? wo(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Ef.exec(e)) ? hs(t[1], t[2] / 100, t[3] / 100, 1) : (t = kf.exec(e)) ? hs(t[1], t[2] / 100, t[3] / 100, t[4]) : as.hasOwnProperty(e) ? ds(as[e]) : e === "transparent" ? new ze(NaN, NaN, NaN, 0) : null;
}
function ds(e) {
  return new ze(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function wo(e, t, n, o) {
  return o <= 0 && (e = t = n = NaN), new ze(e, t, n, o);
}
function jf(e) {
  return e instanceof Xn || (e = At(e)), e ? (e = e.rgb(), new ze(e.r, e.g, e.b, e.opacity)) : new ze();
}
function oi(e, t, n, o) {
  return arguments.length === 1 ? jf(e) : new ze(e, t, n, o ?? 1);
}
function ze(e, t, n, o) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +o;
}
Ei(ze, oi, nc(Xn, {
  brighter(e) {
    return e = e == null ? Lo : Math.pow(Lo, e), new ze(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? $n : Math.pow($n, e), new ze(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ze(Ct(this.r), Ct(this.g), Ct(this.b), Vo(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: us,
  // Deprecated! Use color.formatHex.
  formatHex: us,
  formatHex8: _f,
  formatRgb: fs,
  toString: fs
}));
function us() {
  return `#${It(this.r)}${It(this.g)}${It(this.b)}`;
}
function _f() {
  return `#${It(this.r)}${It(this.g)}${It(this.b)}${It((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function fs() {
  const e = Vo(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Ct(this.r)}, ${Ct(this.g)}, ${Ct(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Vo(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Ct(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function It(e) {
  return e = Ct(e), (e < 16 ? "0" : "") + e.toString(16);
}
function hs(e, t, n, o) {
  return o <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new qe(e, t, n, o);
}
function oc(e) {
  if (e instanceof qe) return new qe(e.h, e.s, e.l, e.opacity);
  if (e instanceof Xn || (e = At(e)), !e) return new qe();
  if (e instanceof qe) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, o = e.b / 255, r = Math.min(t, n, o), i = Math.max(t, n, o), s = NaN, c = i - r, d = (i + r) / 2;
  return c ? (t === i ? s = (n - o) / c + (n < o) * 6 : n === i ? s = (o - t) / c + 2 : s = (t - n) / c + 4, c /= d < 0.5 ? i + r : 2 - i - r, s *= 60) : c = d > 0 && d < 1 ? 0 : s, new qe(s, c, d, e.opacity);
}
function Af(e, t, n, o) {
  return arguments.length === 1 ? oc(e) : new qe(e, t, n, o ?? 1);
}
function qe(e, t, n, o) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +o;
}
Ei(qe, Af, nc(Xn, {
  brighter(e) {
    return e = e == null ? Lo : Math.pow(Lo, e), new qe(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? $n : Math.pow($n, e), new qe(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * t, r = 2 * n - o;
    return new ze(
      Vr(e >= 240 ? e - 240 : e + 120, r, o),
      Vr(e, r, o),
      Vr(e < 120 ? e + 240 : e - 120, r, o),
      this.opacity
    );
  },
  clamp() {
    return new qe(ps(this.h), vo(this.s), vo(this.l), Vo(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Vo(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${ps(this.h)}, ${vo(this.s) * 100}%, ${vo(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function ps(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function vo(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Vr(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const ki = (e) => () => e;
function Mf(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Df(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(o) {
    return Math.pow(e + o * t, n);
  };
}
function Pf(e) {
  return (e = +e) == 1 ? rc : function(t, n) {
    return n - t ? Df(t, n, e) : ki(isNaN(t) ? n : t);
  };
}
function rc(e, t) {
  var n = t - e;
  return n ? Mf(e, n) : ki(isNaN(e) ? t : e);
}
const Ho = (function e(t) {
  var n = Pf(t);
  function o(r, i) {
    var s = n((r = oi(r)).r, (i = oi(i)).r), c = n(r.g, i.g), d = n(r.b, i.b), l = rc(r.opacity, i.opacity);
    return function(u) {
      return r.r = s(u), r.g = c(u), r.b = d(u), r.opacity = l(u), r + "";
    };
  }
  return o.gamma = e, o;
})(1);
function $f(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, o = t.slice(), r;
  return function(i) {
    for (r = 0; r < n; ++r) o[r] = e[r] * (1 - i) + t[r] * i;
    return o;
  };
}
function Tf(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function zf(e, t) {
  var n = t ? t.length : 0, o = e ? Math.min(n, e.length) : 0, r = new Array(o), i = new Array(n), s;
  for (s = 0; s < o; ++s) r[s] = An(e[s], t[s]);
  for (; s < n; ++s) i[s] = t[s];
  return function(c) {
    for (s = 0; s < o; ++s) i[s] = r[s](c);
    return i;
  };
}
function Rf(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(o) {
    return n.setTime(e * (1 - o) + t * o), n;
  };
}
function et(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function Lf(e, t) {
  var n = {}, o = {}, r;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (r in t)
    r in e ? n[r] = An(e[r], t[r]) : o[r] = t[r];
  return function(i) {
    for (r in n) o[r] = n[r](i);
    return o;
  };
}
var ri = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Hr = new RegExp(ri.source, "g");
function Vf(e) {
  return function() {
    return e;
  };
}
function Hf(e) {
  return function(t) {
    return e(t) + "";
  };
}
function ic(e, t) {
  var n = ri.lastIndex = Hr.lastIndex = 0, o, r, i, s = -1, c = [], d = [];
  for (e = e + "", t = t + ""; (o = ri.exec(e)) && (r = Hr.exec(t)); )
    (i = r.index) > n && (i = t.slice(n, i), c[s] ? c[s] += i : c[++s] = i), (o = o[0]) === (r = r[0]) ? c[s] ? c[s] += r : c[++s] = r : (c[++s] = null, d.push({ i: s, x: et(o, r) })), n = Hr.lastIndex;
  return n < t.length && (i = t.slice(n), c[s] ? c[s] += i : c[++s] = i), c.length < 2 ? d[0] ? Hf(d[0].x) : Vf(t) : (t = d.length, function(l) {
    for (var u = 0, f; u < t; ++u) c[(f = d[u]).i] = f.x(l);
    return c.join("");
  });
}
function An(e, t) {
  var n = typeof t, o;
  return t == null || n === "boolean" ? ki(t) : (n === "number" ? et : n === "string" ? (o = At(t)) ? (t = o, Ho) : ic : t instanceof At ? Ho : t instanceof Date ? Rf : Tf(t) ? $f : Array.isArray(t) ? zf : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? Lf : et)(e, t);
}
var gs = 180 / Math.PI, ii = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function sc(e, t, n, o, r, i) {
  var s, c, d;
  return (s = Math.sqrt(e * e + t * t)) && (e /= s, t /= s), (d = e * n + t * o) && (n -= e * d, o -= t * d), (c = Math.sqrt(n * n + o * o)) && (n /= c, o /= c, d /= c), e * o < t * n && (e = -e, t = -t, d = -d, s = -s), {
    translateX: r,
    translateY: i,
    rotate: Math.atan2(t, e) * gs,
    skewX: Math.atan(d) * gs,
    scaleX: s,
    scaleY: c
  };
}
var bo;
function Of(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? ii : sc(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Ff(e) {
  return e == null || (bo || (bo = document.createElementNS("http://www.w3.org/2000/svg", "g")), bo.setAttribute("transform", e), !(e = bo.transform.baseVal.consolidate())) ? ii : (e = e.matrix, sc(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ac(e, t, n, o) {
  function r(l) {
    return l.length ? l.pop() + " " : "";
  }
  function i(l, u, f, h, p, y) {
    if (l !== f || u !== h) {
      var v = p.push("translate(", null, t, null, n);
      y.push({ i: v - 4, x: et(l, f) }, { i: v - 2, x: et(u, h) });
    } else (f || h) && p.push("translate(" + f + t + h + n);
  }
  function s(l, u, f, h) {
    l !== u ? (l - u > 180 ? u += 360 : u - l > 180 && (l += 360), h.push({ i: f.push(r(f) + "rotate(", null, o) - 2, x: et(l, u) })) : u && f.push(r(f) + "rotate(" + u + o);
  }
  function c(l, u, f, h) {
    l !== u ? h.push({ i: f.push(r(f) + "skewX(", null, o) - 2, x: et(l, u) }) : u && f.push(r(f) + "skewX(" + u + o);
  }
  function d(l, u, f, h, p, y) {
    if (l !== f || u !== h) {
      var v = p.push(r(p) + "scale(", null, ",", null, ")");
      y.push({ i: v - 4, x: et(l, f) }, { i: v - 2, x: et(u, h) });
    } else (f !== 1 || h !== 1) && p.push(r(p) + "scale(" + f + "," + h + ")");
  }
  return function(l, u) {
    var f = [], h = [];
    return l = e(l), u = e(u), i(l.translateX, l.translateY, u.translateX, u.translateY, f, h), s(l.rotate, u.rotate, f, h), c(l.skewX, u.skewX, f, h), d(l.scaleX, l.scaleY, u.scaleX, u.scaleY, f, h), l = u = null, function(p) {
      for (var y = -1, v = h.length, w; ++y < v; ) f[(w = h[y]).i] = w.x(p);
      return f.join("");
    };
  };
}
var Bf = ac(Of, "px, ", "px)", "deg)"), Wf = ac(Ff, ", ", ")", ")"), Xf = 1e-12;
function ys(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Yf(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function qf(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Ao = (function e(t, n, o) {
  function r(i, s) {
    var c = i[0], d = i[1], l = i[2], u = s[0], f = s[1], h = s[2], p = u - c, y = f - d, v = p * p + y * y, w, m;
    if (v < Xf)
      m = Math.log(h / l) / t, w = function(C) {
        return [
          c + C * p,
          d + C * y,
          l * Math.exp(t * C * m)
        ];
      };
    else {
      var N = Math.sqrt(v), g = (h * h - l * l + o * v) / (2 * l * n * N), x = (h * h - l * l - o * v) / (2 * h * n * N), S = Math.log(Math.sqrt(g * g + 1) - g), k = Math.log(Math.sqrt(x * x + 1) - x);
      m = (k - S) / t, w = function(C) {
        var P = C * m, $ = ys(S), F = l / (n * N) * ($ * qf(t * P + S) - Yf(S));
        return [
          c + F * p,
          d + F * y,
          l * $ / ys(t * P + S)
        ];
      };
    }
    return w.duration = m * 1e3 * t / Math.SQRT2, w;
  }
  return r.rho = function(i) {
    var s = Math.max(1e-3, +i), c = s * s, d = c * c;
    return e(s, c, d);
  }, r;
})(Math.SQRT2, 2, 4);
var Gt = 0, Cn = 0, vn = 0, cc = 1e3, Oo, jn, Fo = 0, Mt = 0, nr = 0, zn = typeof performance == "object" && performance.now ? performance : Date, lc = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Ii() {
  return Mt || (lc(Zf), Mt = zn.now() + nr);
}
function Zf() {
  Mt = 0;
}
function Bo() {
  this._call = this._time = this._next = null;
}
Bo.prototype = dc.prototype = {
  constructor: Bo,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Ii() : +n) + (t == null ? 0 : +t), !this._next && jn !== this && (jn ? jn._next = this : Oo = this, jn = this), this._call = e, this._time = n, si();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, si());
  }
};
function dc(e, t, n) {
  var o = new Bo();
  return o.restart(e, t, n), o;
}
function Uf() {
  Ii(), ++Gt;
  for (var e = Oo, t; e; )
    (t = Mt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Gt;
}
function ms() {
  Mt = (Fo = zn.now()) + nr, Gt = Cn = 0;
  try {
    Uf();
  } finally {
    Gt = 0, Gf(), Mt = 0;
  }
}
function Kf() {
  var e = zn.now(), t = e - Fo;
  t > cc && (nr -= t, Fo = e);
}
function Gf() {
  for (var e, t = Oo, n, o = 1 / 0; t; )
    t._call ? (o > t._time && (o = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Oo = n);
  jn = e, si(o);
}
function si(e) {
  if (!Gt) {
    Cn && (Cn = clearTimeout(Cn));
    var t = e - Mt;
    t > 24 ? (e < 1 / 0 && (Cn = setTimeout(ms, e - zn.now() - nr)), vn && (vn = clearInterval(vn))) : (vn || (Fo = zn.now(), vn = setInterval(Kf, cc)), Gt = 1, lc(ms));
  }
}
function xs(e, t, n) {
  var o = new Bo();
  return t = t == null ? 0 : +t, o.restart((r) => {
    o.stop(), e(r + t);
  }, t, n), o;
}
var Jf = er("start", "end", "cancel", "interrupt"), Qf = [], uc = 0, ws = 1, ai = 2, Mo = 3, vs = 4, ci = 5, Do = 6;
function or(e, t, n, o, r, i) {
  var s = e.__transition;
  if (!s) e.__transition = {};
  else if (n in s) return;
  eh(e, n, {
    name: t,
    index: o,
    // For context during callback.
    group: r,
    // For context during callback.
    on: Jf,
    tween: Qf,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: uc
  });
}
function Ci(e, t) {
  var n = Je(e, t);
  if (n.state > uc) throw new Error("too late; already scheduled");
  return n;
}
function nt(e, t) {
  var n = Je(e, t);
  if (n.state > Mo) throw new Error("too late; already running");
  return n;
}
function Je(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function eh(e, t, n) {
  var o = e.__transition, r;
  o[t] = n, n.timer = dc(i, 0, n.time);
  function i(l) {
    n.state = ws, n.timer.restart(s, n.delay, n.time), n.delay <= l && s(l - n.delay);
  }
  function s(l) {
    var u, f, h, p;
    if (n.state !== ws) return d();
    for (u in o)
      if (p = o[u], p.name === n.name) {
        if (p.state === Mo) return xs(s);
        p.state === vs ? (p.state = Do, p.timer.stop(), p.on.call("interrupt", e, e.__data__, p.index, p.group), delete o[u]) : +u < t && (p.state = Do, p.timer.stop(), p.on.call("cancel", e, e.__data__, p.index, p.group), delete o[u]);
      }
    if (xs(function() {
      n.state === Mo && (n.state = vs, n.timer.restart(c, n.delay, n.time), c(l));
    }), n.state = ai, n.on.call("start", e, e.__data__, n.index, n.group), n.state === ai) {
      for (n.state = Mo, r = new Array(h = n.tween.length), u = 0, f = -1; u < h; ++u)
        (p = n.tween[u].value.call(e, e.__data__, n.index, n.group)) && (r[++f] = p);
      r.length = f + 1;
    }
  }
  function c(l) {
    for (var u = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(d), n.state = ci, 1), f = -1, h = r.length; ++f < h; )
      r[f].call(e, u);
    n.state === ci && (n.on.call("end", e, e.__data__, n.index, n.group), d());
  }
  function d() {
    n.state = Do, n.timer.stop(), delete o[t];
    for (var l in o) return;
    delete e.__transition;
  }
}
function Po(e, t) {
  var n = e.__transition, o, r, i = !0, s;
  if (n) {
    t = t == null ? null : t + "";
    for (s in n) {
      if ((o = n[s]).name !== t) {
        i = !1;
        continue;
      }
      r = o.state > ai && o.state < ci, o.state = Do, o.timer.stop(), o.on.call(r ? "interrupt" : "cancel", e, e.__data__, o.index, o.group), delete n[s];
    }
    i && delete e.__transition;
  }
}
function th(e) {
  return this.each(function() {
    Po(this, e);
  });
}
function nh(e, t) {
  var n, o;
  return function() {
    var r = nt(this, e), i = r.tween;
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
function oh(e, t, n) {
  var o, r;
  if (typeof n != "function") throw new Error();
  return function() {
    var i = nt(this, e), s = i.tween;
    if (s !== o) {
      r = (o = s).slice();
      for (var c = { name: t, value: n }, d = 0, l = r.length; d < l; ++d)
        if (r[d].name === t) {
          r[d] = c;
          break;
        }
      d === l && r.push(c);
    }
    i.tween = r;
  };
}
function rh(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var o = Je(this.node(), n).tween, r = 0, i = o.length, s; r < i; ++r)
      if ((s = o[r]).name === e)
        return s.value;
    return null;
  }
  return this.each((t == null ? nh : oh)(n, e, t));
}
function ji(e, t, n) {
  var o = e._id;
  return e.each(function() {
    var r = nt(this, o);
    (r.value || (r.value = {}))[t] = n.apply(this, arguments);
  }), function(r) {
    return Je(r, o).value[t];
  };
}
function fc(e, t) {
  var n;
  return (typeof t == "number" ? et : t instanceof At ? Ho : (n = At(t)) ? (t = n, Ho) : ic)(e, t);
}
function ih(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function sh(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function ah(e, t, n) {
  var o, r = n + "", i;
  return function() {
    var s = this.getAttribute(e);
    return s === r ? null : s === o ? i : i = t(o = s, n);
  };
}
function ch(e, t, n) {
  var o, r = n + "", i;
  return function() {
    var s = this.getAttributeNS(e.space, e.local);
    return s === r ? null : s === o ? i : i = t(o = s, n);
  };
}
function lh(e, t, n) {
  var o, r, i;
  return function() {
    var s, c = n(this), d;
    return c == null ? void this.removeAttribute(e) : (s = this.getAttribute(e), d = c + "", s === d ? null : s === o && d === r ? i : (r = d, i = t(o = s, c)));
  };
}
function dh(e, t, n) {
  var o, r, i;
  return function() {
    var s, c = n(this), d;
    return c == null ? void this.removeAttributeNS(e.space, e.local) : (s = this.getAttributeNS(e.space, e.local), d = c + "", s === d ? null : s === o && d === r ? i : (r = d, i = t(o = s, c)));
  };
}
function uh(e, t) {
  var n = tr(e), o = n === "transform" ? Wf : fc;
  return this.attrTween(e, typeof t == "function" ? (n.local ? dh : lh)(n, o, ji(this, "attr." + e, t)) : t == null ? (n.local ? sh : ih)(n) : (n.local ? ch : ah)(n, o, t));
}
function fh(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function hh(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function ph(e, t) {
  var n, o;
  function r() {
    var i = t.apply(this, arguments);
    return i !== o && (n = (o = i) && hh(e, i)), n;
  }
  return r._value = t, r;
}
function gh(e, t) {
  var n, o;
  function r() {
    var i = t.apply(this, arguments);
    return i !== o && (n = (o = i) && fh(e, i)), n;
  }
  return r._value = t, r;
}
function yh(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var o = tr(e);
  return this.tween(n, (o.local ? ph : gh)(o, t));
}
function mh(e, t) {
  return function() {
    Ci(this, e).delay = +t.apply(this, arguments);
  };
}
function xh(e, t) {
  return t = +t, function() {
    Ci(this, e).delay = t;
  };
}
function wh(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? mh : xh)(t, e)) : Je(this.node(), t).delay;
}
function vh(e, t) {
  return function() {
    nt(this, e).duration = +t.apply(this, arguments);
  };
}
function bh(e, t) {
  return t = +t, function() {
    nt(this, e).duration = t;
  };
}
function Nh(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? vh : bh)(t, e)) : Je(this.node(), t).duration;
}
function Sh(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    nt(this, e).ease = t;
  };
}
function Eh(e) {
  var t = this._id;
  return arguments.length ? this.each(Sh(t, e)) : Je(this.node(), t).ease;
}
function kh(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    nt(this, e).ease = n;
  };
}
function Ih(e) {
  if (typeof e != "function") throw new Error();
  return this.each(kh(this._id, e));
}
function Ch(e) {
  typeof e != "function" && (e = Ba(e));
  for (var t = this._groups, n = t.length, o = new Array(n), r = 0; r < n; ++r)
    for (var i = t[r], s = i.length, c = o[r] = [], d, l = 0; l < s; ++l)
      (d = i[l]) && e.call(d, d.__data__, l, i) && c.push(d);
  return new ct(o, this._parents, this._name, this._id);
}
function jh(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, o = t.length, r = n.length, i = Math.min(o, r), s = new Array(o), c = 0; c < i; ++c)
    for (var d = t[c], l = n[c], u = d.length, f = s[c] = new Array(u), h, p = 0; p < u; ++p)
      (h = d[p] || l[p]) && (f[p] = h);
  for (; c < o; ++c)
    s[c] = t[c];
  return new ct(s, this._parents, this._name, this._id);
}
function _h(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function Ah(e, t, n) {
  var o, r, i = _h(t) ? Ci : nt;
  return function() {
    var s = i(this, e), c = s.on;
    c !== o && (r = (o = c).copy()).on(t, n), s.on = r;
  };
}
function Mh(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Je(this.node(), n).on.on(e) : this.each(Ah(n, e, t));
}
function Dh(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function Ph() {
  return this.on("end.remove", Dh(this._id));
}
function $h(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Ni(e));
  for (var o = this._groups, r = o.length, i = new Array(r), s = 0; s < r; ++s)
    for (var c = o[s], d = c.length, l = i[s] = new Array(d), u, f, h = 0; h < d; ++h)
      (u = c[h]) && (f = e.call(u, u.__data__, h, c)) && ("__data__" in u && (f.__data__ = u.__data__), l[h] = f, or(l[h], t, n, h, l, Je(u, n)));
  return new ct(i, this._parents, t, n);
}
function Th(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Fa(e));
  for (var o = this._groups, r = o.length, i = [], s = [], c = 0; c < r; ++c)
    for (var d = o[c], l = d.length, u, f = 0; f < l; ++f)
      if (u = d[f]) {
        for (var h = e.call(u, u.__data__, f, d), p, y = Je(u, n), v = 0, w = h.length; v < w; ++v)
          (p = h[v]) && or(p, t, n, v, h, y);
        i.push(h), s.push(u);
      }
  return new ct(i, s, t, n);
}
var zh = Wn.prototype.constructor;
function Rh() {
  return new zh(this._groups, this._parents);
}
function Lh(e, t) {
  var n, o, r;
  return function() {
    var i = Kt(this, e), s = (this.style.removeProperty(e), Kt(this, e));
    return i === s ? null : i === n && s === o ? r : r = t(n = i, o = s);
  };
}
function hc(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Vh(e, t, n) {
  var o, r = n + "", i;
  return function() {
    var s = Kt(this, e);
    return s === r ? null : s === o ? i : i = t(o = s, n);
  };
}
function Hh(e, t, n) {
  var o, r, i;
  return function() {
    var s = Kt(this, e), c = n(this), d = c + "";
    return c == null && (d = c = (this.style.removeProperty(e), Kt(this, e))), s === d ? null : s === o && d === r ? i : (r = d, i = t(o = s, c));
  };
}
function Oh(e, t) {
  var n, o, r, i = "style." + t, s = "end." + i, c;
  return function() {
    var d = nt(this, e), l = d.on, u = d.value[i] == null ? c || (c = hc(t)) : void 0;
    (l !== n || r !== u) && (o = (n = l).copy()).on(s, r = u), d.on = o;
  };
}
function Fh(e, t, n) {
  var o = (e += "") == "transform" ? Bf : fc;
  return t == null ? this.styleTween(e, Lh(e, o)).on("end.style." + e, hc(e)) : typeof t == "function" ? this.styleTween(e, Hh(e, o, ji(this, "style." + e, t))).each(Oh(this._id, e)) : this.styleTween(e, Vh(e, o, t), n).on("end.style." + e, null);
}
function Bh(e, t, n) {
  return function(o) {
    this.style.setProperty(e, t.call(this, o), n);
  };
}
function Wh(e, t, n) {
  var o, r;
  function i() {
    var s = t.apply(this, arguments);
    return s !== r && (o = (r = s) && Bh(e, s, n)), o;
  }
  return i._value = t, i;
}
function Xh(e, t, n) {
  var o = "style." + (e += "");
  if (arguments.length < 2) return (o = this.tween(o)) && o._value;
  if (t == null) return this.tween(o, null);
  if (typeof t != "function") throw new Error();
  return this.tween(o, Wh(e, t, n ?? ""));
}
function Yh(e) {
  return function() {
    this.textContent = e;
  };
}
function qh(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Zh(e) {
  return this.tween("text", typeof e == "function" ? qh(ji(this, "text", e)) : Yh(e == null ? "" : e + ""));
}
function Uh(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Kh(e) {
  var t, n;
  function o() {
    var r = e.apply(this, arguments);
    return r !== n && (t = (n = r) && Uh(r)), t;
  }
  return o._value = e, o;
}
function Gh(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Kh(e));
}
function Jh() {
  for (var e = this._name, t = this._id, n = pc(), o = this._groups, r = o.length, i = 0; i < r; ++i)
    for (var s = o[i], c = s.length, d, l = 0; l < c; ++l)
      if (d = s[l]) {
        var u = Je(d, t);
        or(d, e, n, l, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new ct(o, this._parents, e, n);
}
function Qh() {
  var e, t, n = this, o = n._id, r = n.size();
  return new Promise(function(i, s) {
    var c = { value: s }, d = { value: function() {
      --r === 0 && i();
    } };
    n.each(function() {
      var l = nt(this, o), u = l.on;
      u !== e && (t = (e = u).copy(), t._.cancel.push(c), t._.interrupt.push(c), t._.end.push(d)), l.on = t;
    }), r === 0 && i();
  });
}
var ep = 0;
function ct(e, t, n, o) {
  this._groups = e, this._parents = t, this._name = n, this._id = o;
}
function pc() {
  return ++ep;
}
var it = Wn.prototype;
ct.prototype = {
  constructor: ct,
  select: $h,
  selectAll: Th,
  selectChild: it.selectChild,
  selectChildren: it.selectChildren,
  filter: Ch,
  merge: jh,
  selection: Rh,
  transition: Jh,
  call: it.call,
  nodes: it.nodes,
  node: it.node,
  size: it.size,
  empty: it.empty,
  each: it.each,
  on: Mh,
  attr: uh,
  attrTween: yh,
  style: Fh,
  styleTween: Xh,
  text: Zh,
  textTween: Gh,
  remove: Ph,
  tween: rh,
  delay: wh,
  duration: Nh,
  ease: Eh,
  easeVarying: Ih,
  end: Qh,
  [Symbol.iterator]: it[Symbol.iterator]
};
function tp(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var np = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: tp
};
function op(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function rp(e) {
  var t, n;
  e instanceof ct ? (t = e._id, e = e._name) : (t = pc(), (n = np).time = Ii(), e = e == null ? null : e + "");
  for (var o = this._groups, r = o.length, i = 0; i < r; ++i)
    for (var s = o[i], c = s.length, d, l = 0; l < c; ++l)
      (d = s[l]) && or(d, e, t, l, s, n || op(d, t));
  return new ct(o, this._parents, e, t);
}
Wn.prototype.interrupt = th;
Wn.prototype.transition = rp;
const No = (e) => () => e;
function ip(e, {
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
function at(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
at.prototype = {
  constructor: at,
  scale: function(e) {
    return e === 1 ? this : new at(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new at(this.k, this.x + this.k * e, this.y + this.k * t);
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
var rr = new at(1, 0, 0);
gc.prototype = at.prototype;
function gc(e) {
  for (; !e.__zoom; ) if (!(e = e.parentNode)) return rr;
  return e.__zoom;
}
function Or(e) {
  e.stopImmediatePropagation();
}
function bn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function sp(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function ap() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function bs() {
  return this.__zoom || rr;
}
function cp(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function lp() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function dp(e, t, n) {
  var o = e.invertX(t[0][0]) - n[0][0], r = e.invertX(t[1][0]) - n[1][0], i = e.invertY(t[0][1]) - n[0][1], s = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r),
    s > i ? (i + s) / 2 : Math.min(0, i) || Math.max(0, s)
  );
}
function yc() {
  var e = sp, t = ap, n = dp, o = cp, r = lp, i = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], c = 250, d = Ao, l = er("start", "zoom", "end"), u, f, h, p = 500, y = 150, v = 0, w = 10;
  function m(E) {
    E.property("__zoom", bs).on("wheel.zoom", P, { passive: !1 }).on("mousedown.zoom", $).on("dblclick.zoom", F).filter(r).on("touchstart.zoom", j).on("touchmove.zoom", z).on("touchend.zoom touchcancel.zoom", H).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  m.transform = function(E, _, I, A) {
    var T = E.selection ? E.selection() : E;
    T.property("__zoom", bs), E !== T ? S(E, _, I, A) : T.interrupt().each(function() {
      k(this, arguments).event(A).start().zoom(null, typeof _ == "function" ? _.apply(this, arguments) : _).end();
    });
  }, m.scaleBy = function(E, _, I, A) {
    m.scaleTo(E, function() {
      var T = this.__zoom.k, D = typeof _ == "function" ? _.apply(this, arguments) : _;
      return T * D;
    }, I, A);
  }, m.scaleTo = function(E, _, I, A) {
    m.transform(E, function() {
      var T = t.apply(this, arguments), D = this.__zoom, W = I == null ? x(T) : typeof I == "function" ? I.apply(this, arguments) : I, O = D.invert(W), B = typeof _ == "function" ? _.apply(this, arguments) : _;
      return n(g(N(D, B), W, O), T, s);
    }, I, A);
  }, m.translateBy = function(E, _, I, A) {
    m.transform(E, function() {
      return n(this.__zoom.translate(
        typeof _ == "function" ? _.apply(this, arguments) : _,
        typeof I == "function" ? I.apply(this, arguments) : I
      ), t.apply(this, arguments), s);
    }, null, A);
  }, m.translateTo = function(E, _, I, A, T) {
    m.transform(E, function() {
      var D = t.apply(this, arguments), W = this.__zoom, O = A == null ? x(D) : typeof A == "function" ? A.apply(this, arguments) : A;
      return n(rr.translate(O[0], O[1]).scale(W.k).translate(
        typeof _ == "function" ? -_.apply(this, arguments) : -_,
        typeof I == "function" ? -I.apply(this, arguments) : -I
      ), D, s);
    }, A, T);
  };
  function N(E, _) {
    return _ = Math.max(i[0], Math.min(i[1], _)), _ === E.k ? E : new at(_, E.x, E.y);
  }
  function g(E, _, I) {
    var A = _[0] - I[0] * E.k, T = _[1] - I[1] * E.k;
    return A === E.x && T === E.y ? E : new at(E.k, A, T);
  }
  function x(E) {
    return [(+E[0][0] + +E[1][0]) / 2, (+E[0][1] + +E[1][1]) / 2];
  }
  function S(E, _, I, A) {
    E.on("start.zoom", function() {
      k(this, arguments).event(A).start();
    }).on("interrupt.zoom end.zoom", function() {
      k(this, arguments).event(A).end();
    }).tween("zoom", function() {
      var T = this, D = arguments, W = k(T, D).event(A), O = t.apply(T, D), B = I == null ? x(O) : typeof I == "function" ? I.apply(T, D) : I, U = Math.max(O[1][0] - O[0][0], O[1][1] - O[0][1]), K = T.__zoom, ne = typeof _ == "function" ? _.apply(T, D) : _, se = d(K.invert(B).concat(U / K.k), ne.invert(B).concat(U / ne.k));
      return function(Q) {
        if (Q === 1) Q = ne;
        else {
          var R = se(Q), q = U / R[2];
          Q = new at(q, B[0] - R[0] * q, B[1] - R[1] * q);
        }
        W.zoom(null, Q);
      };
    });
  }
  function k(E, _, I) {
    return !I && E.__zooming || new C(E, _);
  }
  function C(E, _) {
    this.that = E, this.args = _, this.active = 0, this.sourceEvent = null, this.extent = t.apply(E, _), this.taps = 0;
  }
  C.prototype = {
    event: function(E) {
      return E && (this.sourceEvent = E), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(E, _) {
      return this.mouse && E !== "mouse" && (this.mouse[1] = _.invert(this.mouse[0])), this.touch0 && E !== "touch" && (this.touch0[1] = _.invert(this.touch0[0])), this.touch1 && E !== "touch" && (this.touch1[1] = _.invert(this.touch1[0])), this.that.__zoom = _, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(E) {
      var _ = He(this.that).datum();
      l.call(
        E,
        this.that,
        new ip(E, {
          sourceEvent: this.sourceEvent,
          target: m,
          transform: this.that.__zoom,
          dispatch: l
        }),
        _
      );
    }
  };
  function P(E, ..._) {
    if (!e.apply(this, arguments)) return;
    var I = k(this, _).event(E), A = this.__zoom, T = Math.max(i[0], Math.min(i[1], A.k * Math.pow(2, o.apply(this, arguments)))), D = Ye(E);
    if (I.wheel)
      (I.mouse[0][0] !== D[0] || I.mouse[0][1] !== D[1]) && (I.mouse[1] = A.invert(I.mouse[0] = D)), clearTimeout(I.wheel);
    else {
      if (A.k === T) return;
      I.mouse = [D, A.invert(D)], Po(this), I.start();
    }
    bn(E), I.wheel = setTimeout(W, y), I.zoom("mouse", n(g(N(A, T), I.mouse[0], I.mouse[1]), I.extent, s));
    function W() {
      I.wheel = null, I.end();
    }
  }
  function $(E, ..._) {
    if (h || !e.apply(this, arguments)) return;
    var I = E.currentTarget, A = k(this, _, !0).event(E), T = He(E.view).on("mousemove.zoom", B, !0).on("mouseup.zoom", U, !0), D = Ye(E, I), W = E.clientX, O = E.clientY;
    Qa(E.view), Or(E), A.mouse = [D, this.__zoom.invert(D)], Po(this), A.start();
    function B(K) {
      if (bn(K), !A.moved) {
        var ne = K.clientX - W, se = K.clientY - O;
        A.moved = ne * ne + se * se > v;
      }
      A.event(K).zoom("mouse", n(g(A.that.__zoom, A.mouse[0] = Ye(K, I), A.mouse[1]), A.extent, s));
    }
    function U(K) {
      T.on("mousemove.zoom mouseup.zoom", null), ec(K.view, A.moved), bn(K), A.event(K).end();
    }
  }
  function F(E, ..._) {
    if (e.apply(this, arguments)) {
      var I = this.__zoom, A = Ye(E.changedTouches ? E.changedTouches[0] : E, this), T = I.invert(A), D = I.k * (E.shiftKey ? 0.5 : 2), W = n(g(N(I, D), A, T), t.apply(this, _), s);
      bn(E), c > 0 ? He(this).transition().duration(c).call(S, W, A, E) : He(this).call(m.transform, W, A, E);
    }
  }
  function j(E, ..._) {
    if (e.apply(this, arguments)) {
      var I = E.touches, A = I.length, T = k(this, _, E.changedTouches.length === A).event(E), D, W, O, B;
      for (Or(E), W = 0; W < A; ++W)
        O = I[W], B = Ye(O, this), B = [B, this.__zoom.invert(B), O.identifier], T.touch0 ? !T.touch1 && T.touch0[2] !== B[2] && (T.touch1 = B, T.taps = 0) : (T.touch0 = B, D = !0, T.taps = 1 + !!u);
      u && (u = clearTimeout(u)), D && (T.taps < 2 && (f = B[0], u = setTimeout(function() {
        u = null;
      }, p)), Po(this), T.start());
    }
  }
  function z(E, ..._) {
    if (this.__zooming) {
      var I = k(this, _).event(E), A = E.changedTouches, T = A.length, D, W, O, B;
      for (bn(E), D = 0; D < T; ++D)
        W = A[D], O = Ye(W, this), I.touch0 && I.touch0[2] === W.identifier ? I.touch0[0] = O : I.touch1 && I.touch1[2] === W.identifier && (I.touch1[0] = O);
      if (W = I.that.__zoom, I.touch1) {
        var U = I.touch0[0], K = I.touch0[1], ne = I.touch1[0], se = I.touch1[1], Q = (Q = ne[0] - U[0]) * Q + (Q = ne[1] - U[1]) * Q, R = (R = se[0] - K[0]) * R + (R = se[1] - K[1]) * R;
        W = N(W, Math.sqrt(Q / R)), O = [(U[0] + ne[0]) / 2, (U[1] + ne[1]) / 2], B = [(K[0] + se[0]) / 2, (K[1] + se[1]) / 2];
      } else if (I.touch0) O = I.touch0[0], B = I.touch0[1];
      else return;
      I.zoom("touch", n(g(W, O, B), I.extent, s));
    }
  }
  function H(E, ..._) {
    if (this.__zooming) {
      var I = k(this, _).event(E), A = E.changedTouches, T = A.length, D, W;
      for (Or(E), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, p), D = 0; D < T; ++D)
        W = A[D], I.touch0 && I.touch0[2] === W.identifier ? delete I.touch0 : I.touch1 && I.touch1[2] === W.identifier && delete I.touch1;
      if (I.touch1 && !I.touch0 && (I.touch0 = I.touch1, delete I.touch1), I.touch0) I.touch0[1] = this.__zoom.invert(I.touch0[0]);
      else if (I.end(), I.taps === 2 && (W = Ye(W, this), Math.hypot(f[0] - W[0], f[1] - W[1]) < w)) {
        var O = He(this).on("dblclick.zoom");
        O && O.apply(this, arguments);
      }
    }
  }
  return m.wheelDelta = function(E) {
    return arguments.length ? (o = typeof E == "function" ? E : No(+E), m) : o;
  }, m.filter = function(E) {
    return arguments.length ? (e = typeof E == "function" ? E : No(!!E), m) : e;
  }, m.touchable = function(E) {
    return arguments.length ? (r = typeof E == "function" ? E : No(!!E), m) : r;
  }, m.extent = function(E) {
    return arguments.length ? (t = typeof E == "function" ? E : No([[+E[0][0], +E[0][1]], [+E[1][0], +E[1][1]]]), m) : t;
  }, m.scaleExtent = function(E) {
    return arguments.length ? (i[0] = +E[0], i[1] = +E[1], m) : [i[0], i[1]];
  }, m.translateExtent = function(E) {
    return arguments.length ? (s[0][0] = +E[0][0], s[1][0] = +E[1][0], s[0][1] = +E[0][1], s[1][1] = +E[1][1], m) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, m.constrain = function(E) {
    return arguments.length ? (n = E, m) : n;
  }, m.duration = function(E) {
    return arguments.length ? (c = +E, m) : c;
  }, m.interpolate = function(E) {
    return arguments.length ? (d = E, m) : d;
  }, m.on = function() {
    var E = l.on.apply(l, arguments);
    return E === l ? m : E;
  }, m.clickDistance = function(E) {
    return arguments.length ? (v = (E = +E) * E, m) : Math.sqrt(v);
  }, m.tapDistance = function(E) {
    return arguments.length ? (w = +E, m) : w;
  }, m;
}
const Fe = {
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
}, Rn = [
  [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
  [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
], mc = ["Enter", " ", "Escape"], xc = {
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
var Jt;
(function(e) {
  e.Strict = "strict", e.Loose = "loose";
})(Jt || (Jt = {}));
var jt;
(function(e) {
  e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal";
})(jt || (jt = {}));
var Ln;
(function(e) {
  e.Partial = "partial", e.Full = "full";
})(Ln || (Ln = {}));
const wc = {
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
var Wo;
(function(e) {
  e.Arrow = "arrow", e.ArrowClosed = "arrowclosed";
})(Wo || (Wo = {}));
var te;
(function(e) {
  e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom";
})(te || (te = {}));
const Ns = {
  [te.Left]: te.Right,
  [te.Right]: te.Left,
  [te.Top]: te.Bottom,
  [te.Bottom]: te.Top
};
function vc(e) {
  return e === null ? null : e ? "valid" : "invalid";
}
const bc = (e) => "id" in e && "source" in e && "target" in e, up = (e) => "id" in e && "position" in e && !("source" in e) && !("target" in e), _i = (e) => "id" in e && "internals" in e && !("source" in e) && !("target" in e), Yn = (e, t = [0, 0]) => {
  const { width: n, height: o } = lt(e), r = e.origin ?? t, i = n * r[0], s = o * r[1];
  return {
    x: e.position.x - i,
    y: e.position.y - s
  };
}, fp = (e, t = { nodeOrigin: [0, 0] }) => {
  if (e.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  const n = e.reduce((o, r) => {
    const i = typeof r == "string";
    let s = !t.nodeLookup && !i ? r : void 0;
    t.nodeLookup && (s = i ? t.nodeLookup.get(r) : _i(r) ? r : t.nodeLookup.get(r.id));
    const c = s ? Xo(s, t.nodeOrigin) : { x: 0, y: 0, x2: 0, y2: 0 };
    return ir(o, c);
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return sr(n);
}, qn = (e, t = {}) => {
  let n = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, o = !1;
  return e.forEach((r) => {
    (t.filter === void 0 || t.filter(r)) && (n = ir(n, Xo(r)), o = !0);
  }), o ? sr(n) : { x: 0, y: 0, width: 0, height: 0 };
}, Ai = (e, t, [n, o, r] = [0, 0, 1], i = !1, s = !1) => {
  const c = {
    ...rn(t, [n, o, r]),
    width: t.width / r,
    height: t.height / r
  }, d = [];
  for (const l of e.values()) {
    const { measured: u, selectable: f = !0, hidden: h = !1 } = l;
    if (s && !f || h)
      continue;
    const p = u.width ?? l.width ?? l.initialWidth ?? null, y = u.height ?? l.height ?? l.initialHeight ?? null, v = Vn(c, en(l)), w = (p ?? 0) * (y ?? 0), m = i && v > 0;
    (!l.internals.handleBounds || m || v >= w || l.dragging) && d.push(l);
  }
  return d;
}, hp = (e, t) => {
  const n = /* @__PURE__ */ new Set();
  return e.forEach((o) => {
    n.add(o.id);
  }), t.filter((o) => n.has(o.source) || n.has(o.target));
};
function pp(e, t) {
  const n = /* @__PURE__ */ new Map(), o = t?.nodes ? new Set(t.nodes.map((r) => r.id)) : null;
  return e.forEach((r) => {
    r.measured.width && r.measured.height && (t?.includeHiddenNodes || !r.hidden) && (!o || o.has(r.id)) && n.set(r.id, r);
  }), n;
}
async function gp({ nodes: e, width: t, height: n, panZoom: o, minZoom: r, maxZoom: i }, s) {
  if (e.size === 0)
    return !0;
  const c = pp(e, s), d = qn(c), l = Di(d, t, n, s?.minZoom ?? r, s?.maxZoom ?? i, s?.padding ?? 0.1);
  return await o.setViewport(l, {
    duration: s?.duration,
    ease: s?.ease,
    interpolate: s?.interpolate
  }), !0;
}
function Nc({ nodeId: e, nextPosition: t, nodeLookup: n, nodeOrigin: o = [0, 0], nodeExtent: r, onError: i }) {
  const s = n.get(e), c = s.parentId ? n.get(s.parentId) : void 0, { x: d, y: l } = c ? c.internals.positionAbsolute : { x: 0, y: 0 }, u = s.origin ?? o;
  let f = s.extent || r;
  if (s.extent === "parent" && !s.expandParent)
    if (!c)
      i?.("005", Fe.error005());
    else {
      const p = c.measured.width, y = c.measured.height;
      p && y && (f = [
        [d, l],
        [d + p, l + y]
      ]);
    }
  else c && Pt(s.extent) && (f = [
    [s.extent[0][0] + d, s.extent[0][1] + l],
    [s.extent[1][0] + d, s.extent[1][1] + l]
  ]);
  const h = Pt(f) ? Dt(t, f, s.measured) : t;
  return (s.measured.width === void 0 || s.measured.height === void 0) && i?.("015", Fe.error015()), {
    position: {
      x: h.x - d + (s.measured.width ?? 0) * u[0],
      y: h.y - l + (s.measured.height ?? 0) * u[1]
    },
    positionAbsolute: h
  };
}
async function yp({ nodesToRemove: e = [], edgesToRemove: t = [], nodes: n, edges: o, onBeforeDelete: r }) {
  const i = new Set(e.map((h) => h.id)), s = [];
  for (const h of n) {
    if (h.deletable === !1)
      continue;
    const p = i.has(h.id), y = !p && h.parentId && s.find((v) => v.id === h.parentId);
    (p || y) && s.push(h);
  }
  const c = new Set(t.map((h) => h.id)), d = o.filter((h) => h.deletable !== !1), u = hp(s, d);
  for (const h of d)
    c.has(h.id) && !u.find((y) => y.id === h.id) && u.push(h);
  if (!r)
    return {
      edges: u,
      nodes: s
    };
  const f = await r({
    nodes: s,
    edges: u
  });
  return typeof f == "boolean" ? f ? { edges: u, nodes: s } : { edges: [], nodes: [] } : f;
}
const Qt = (e, t = 0, n = 1) => Math.min(Math.max(e, t), n), Dt = (e = { x: 0, y: 0 }, t, n) => ({
  x: Qt(e.x, t[0][0], t[1][0] - (n?.width ?? 0)),
  y: Qt(e.y, t[0][1], t[1][1] - (n?.height ?? 0))
});
function Sc(e, t, n) {
  const { width: o, height: r } = lt(n), { x: i, y: s } = n.internals.positionAbsolute;
  return Dt(e, [
    [i, s],
    [i + o, s + r]
  ], t);
}
const Ss = (e, t, n) => e < t ? Qt(Math.abs(e - t), 1, t) / t : e > n ? -Qt(Math.abs(e - n), 1, t) / t : 0, Mi = (e, t, n = 15, o = 40) => {
  const r = Ss(e.x, o, t.width - o) * n, i = Ss(e.y, o, t.height - o) * n;
  return [r, i];
}, ir = (e, t) => ({
  x: Math.min(e.x, t.x),
  y: Math.min(e.y, t.y),
  x2: Math.max(e.x2, t.x2),
  y2: Math.max(e.y2, t.y2)
}), li = ({ x: e, y: t, width: n, height: o }) => ({
  x: e,
  y: t,
  x2: e + n,
  y2: t + o
}), sr = ({ x: e, y: t, x2: n, y2: o }) => ({
  x: e,
  y: t,
  width: n - e,
  height: o - t
}), en = (e, t = [0, 0]) => {
  const { x: n, y: o } = _i(e) ? e.internals.positionAbsolute : Yn(e, t);
  return {
    x: n,
    y: o,
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}, Xo = (e, t = [0, 0]) => {
  const { x: n, y: o } = _i(e) ? e.internals.positionAbsolute : Yn(e, t);
  return {
    x: n,
    y: o,
    x2: n + (e.measured?.width ?? e.width ?? e.initialWidth ?? 0),
    y2: o + (e.measured?.height ?? e.height ?? e.initialHeight ?? 0)
  };
}, Ec = (e, t) => sr(ir(li(e), li(t))), Vn = (e, t) => {
  const n = Math.max(0, Math.min(e.x + e.width, t.x + t.width) - Math.max(e.x, t.x)), o = Math.max(0, Math.min(e.y + e.height, t.y + t.height) - Math.max(e.y, t.y));
  return Math.ceil(n * o);
}, Es = (e) => Ze(e.width) && Ze(e.height) && Ze(e.x) && Ze(e.y), Ze = (e) => !isNaN(e) && isFinite(e), kc = (e, t) => (n, o) => {
}, Zn = (e, t = [1, 1]) => ({
  x: t[0] * Math.round(e.x / t[0]),
  y: t[1] * Math.round(e.y / t[1])
}), rn = ({ x: e, y: t }, [n, o, r], i = !1, s = [1, 1]) => {
  const c = {
    x: (e - n) / r,
    y: (t - o) / r
  };
  return i ? Zn(c, s) : c;
}, tn = ({ x: e, y: t }, [n, o, r]) => ({
  x: e * r + n,
  y: t * r + o
});
function Bt(e, t) {
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
function mp(e, t, n) {
  if (typeof e == "string" || typeof e == "number") {
    const o = Bt(e, n), r = Bt(e, t);
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
    const o = Bt(e.top ?? e.y ?? 0, n), r = Bt(e.bottom ?? e.y ?? 0, n), i = Bt(e.left ?? e.x ?? 0, t), s = Bt(e.right ?? e.x ?? 0, t);
    return { top: o, right: s, bottom: r, left: i, x: i + s, y: o + r };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function xp(e, t, n, o, r, i) {
  const { x: s, y: c } = tn(e, [t, n, o]), { x: d, y: l } = tn({ x: e.x + e.width, y: e.y + e.height }, [t, n, o]), u = r - d, f = i - l;
  return {
    left: Math.floor(s),
    top: Math.floor(c),
    right: Math.floor(u),
    bottom: Math.floor(f)
  };
}
const Di = (e, t, n, o, r, i) => {
  const s = mp(i, t, n), c = (t - s.x) / e.width, d = (n - s.y) / e.height, l = Math.min(c, d), u = Qt(l, o, r), f = e.x + e.width / 2, h = e.y + e.height / 2, p = t / 2 - f * u, y = n / 2 - h * u, v = xp(e, p, y, u, t, n), w = {
    left: Math.min(v.left - s.left, 0),
    top: Math.min(v.top - s.top, 0),
    right: Math.min(v.right - s.right, 0),
    bottom: Math.min(v.bottom - s.bottom, 0)
  };
  return {
    x: p - w.left + w.right,
    y: y - w.top + w.bottom,
    zoom: u
  };
}, Hn = () => typeof navigator < "u" && navigator?.userAgent?.indexOf("Mac") >= 0;
function Pt(e) {
  return e != null && e !== "parent";
}
function lt(e) {
  return {
    width: e.measured?.width ?? e.width ?? e.initialWidth ?? 0,
    height: e.measured?.height ?? e.height ?? e.initialHeight ?? 0
  };
}
function Ic(e) {
  return (e.measured?.width ?? e.width ?? e.initialWidth) !== void 0 && (e.measured?.height ?? e.height ?? e.initialHeight) !== void 0;
}
function Cc(e, t = { width: 0, height: 0 }, n, o, r) {
  const i = { ...e }, s = o.get(n);
  if (s) {
    const c = s.origin || r;
    i.x += s.internals.positionAbsolute.x - (t.width ?? 0) * c[0], i.y += s.internals.positionAbsolute.y - (t.height ?? 0) * c[1];
  }
  return i;
}
function ks(e, t) {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
}
function wp() {
  let e, t;
  return { promise: new Promise((o, r) => {
    e = o, t = r;
  }), resolve: e, reject: t };
}
function vp(e) {
  return { ...xc, ...e || {} };
}
function Mn(e, { snapGrid: t = [0, 0], snapToGrid: n = !1, transform: o, containerBounds: r }) {
  const { x: i, y: s } = Ue(e), c = rn({ x: i - (r?.left ?? 0), y: s - (r?.top ?? 0) }, o), { x: d, y: l } = n ? Zn(c, t) : c;
  return {
    xSnapped: d,
    ySnapped: l,
    ...c
  };
}
const Pi = (e) => ({
  width: e.offsetWidth,
  height: e.offsetHeight
}), jc = (e) => e?.getRootNode?.() || window?.document, bp = ["INPUT", "SELECT", "TEXTAREA"];
function _c(e) {
  const t = e.composedPath?.()?.[0] || e.target;
  return t?.nodeType !== 1 ? !1 : bp.includes(t.nodeName) || t.hasAttribute("contenteditable") || !!t.closest(".nokey");
}
const Ac = (e) => "clientX" in e, Ue = (e, t) => {
  const n = Ac(e), o = n ? e.clientX : e.touches?.[0].clientX, r = n ? e.clientY : e.touches?.[0].clientY;
  return {
    x: o - (t?.left ?? 0),
    y: r - (t?.top ?? 0)
  };
}, Is = (e, t, n, o, r) => {
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
      ...Pi(s)
    };
  });
};
function Mc({ sourceX: e, sourceY: t, targetX: n, targetY: o, sourceControlX: r, sourceControlY: i, targetControlX: s, targetControlY: c }) {
  const d = e * 0.125 + r * 0.375 + s * 0.375 + n * 0.125, l = t * 0.125 + i * 0.375 + c * 0.375 + o * 0.125, u = Math.abs(d - e), f = Math.abs(l - t);
  return [d, l, u, f];
}
function So(e, t) {
  return e >= 0 ? 0.5 * e : t * 25 * Math.sqrt(-e);
}
function Cs({ pos: e, x1: t, y1: n, x2: o, y2: r, c: i }) {
  switch (e) {
    case te.Left:
      return [t - So(t - o, i), n];
    case te.Right:
      return [t + So(o - t, i), n];
    case te.Top:
      return [t, n - So(n - r, i)];
    case te.Bottom:
      return [t, n + So(r - n, i)];
  }
}
function Dc({ sourceX: e, sourceY: t, sourcePosition: n = te.Bottom, targetX: o, targetY: r, targetPosition: i = te.Top, curvature: s = 0.25 }) {
  const [c, d] = Cs({
    pos: n,
    x1: e,
    y1: t,
    x2: o,
    y2: r,
    c: s
  }), [l, u] = Cs({
    pos: i,
    x1: o,
    y1: r,
    x2: e,
    y2: t,
    c: s
  }), [f, h, p, y] = Mc({
    sourceX: e,
    sourceY: t,
    targetX: o,
    targetY: r,
    sourceControlX: c,
    sourceControlY: d,
    targetControlX: l,
    targetControlY: u
  });
  return [
    `M${e},${t} C${c},${d} ${l},${u} ${o},${r}`,
    f,
    h,
    p,
    y
  ];
}
function Pc({ sourceX: e, sourceY: t, targetX: n, targetY: o }) {
  const r = Math.abs(n - e) / 2, i = n < e ? n + r : n - r, s = Math.abs(o - t) / 2, c = o < t ? o + s : o - s;
  return [i, c, r, s];
}
function Np({ sourceNode: e, targetNode: t, selected: n = !1, zIndex: o = 0, elevateOnSelect: r = !1, zIndexMode: i = "basic" }) {
  if (i === "manual")
    return o;
  const s = r && n ? o + 1e3 : o, c = Math.max(e.parentId || r && e.selected ? e.internals.z : 0, t.parentId || r && t.selected ? t.internals.z : 0);
  return s + c;
}
function Sp({ sourceNode: e, targetNode: t, width: n, height: o, transform: r }) {
  const i = ir(Xo(e), Xo(t));
  i.x === i.x2 && (i.x2 += 1), i.y === i.y2 && (i.y2 += 1);
  const s = {
    x: -r[0] / r[2],
    y: -r[1] / r[2],
    width: n / r[2],
    height: o / r[2]
  };
  return Vn(s, sr(i)) > 0;
}
const $c = ({ source: e, sourceHandle: t, target: n, targetHandle: o }) => `xy-edge__${e}${t || ""}-${n}${o || ""}`, Ep = (e, t) => t.some((n) => n.source === e.source && n.target === e.target && (n.sourceHandle === e.sourceHandle || !n.sourceHandle && !e.sourceHandle) && (n.targetHandle === e.targetHandle || !n.targetHandle && !e.targetHandle)), kp = (e, t, n = {}) => {
  if (!e.source || !e.target)
    return n.onError?.("006", Fe.error006()), t;
  const o = n.getEdgeId || $c;
  let r;
  return bc(e) ? r = { ...e } : r = {
    ...e,
    id: o(e)
  }, Ep(r, t) ? t : (r.sourceHandle === null && delete r.sourceHandle, r.targetHandle === null && delete r.targetHandle, t.concat(r));
}, Ip = (e, t, n, o = { shouldReplaceId: !0 }) => {
  const { id: r, ...i } = e;
  if (!t.source || !t.target)
    return o.onError?.("006", Fe.error006()), n;
  if (!n.find((l) => l.id === e.id))
    return o.onError?.("007", Fe.error007(r)), n;
  const c = o.getEdgeId || $c, d = {
    ...i,
    id: o.shouldReplaceId ? c(t) : r,
    source: t.source,
    target: t.target,
    sourceHandle: t.sourceHandle,
    targetHandle: t.targetHandle
  };
  return n.filter((l) => l.id !== r).concat(d);
};
function Tc({ sourceX: e, sourceY: t, targetX: n, targetY: o }) {
  const [r, i, s, c] = Pc({
    sourceX: e,
    sourceY: t,
    targetX: n,
    targetY: o
  });
  return [`M ${e},${t}L ${n},${o}`, r, i, s, c];
}
const js = {
  [te.Left]: { x: -1, y: 0 },
  [te.Right]: { x: 1, y: 0 },
  [te.Top]: { x: 0, y: -1 },
  [te.Bottom]: { x: 0, y: 1 }
}, Cp = ({ source: e, sourcePosition: t = te.Bottom, target: n }) => t === te.Left || t === te.Right ? e.x < n.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < n.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, _s = (e, t) => Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
function jp({ source: e, sourcePosition: t = te.Bottom, target: n, targetPosition: o = te.Top, center: r, offset: i, stepPosition: s }) {
  const c = js[t], d = js[o], l = { x: e.x + c.x * i, y: e.y + c.y * i }, u = { x: n.x + d.x * i, y: n.y + d.y * i }, f = Cp({
    source: l,
    sourcePosition: t,
    target: u
  }), h = f.x !== 0 ? "x" : "y", p = f[h];
  let y = [], v, w;
  const m = { x: 0, y: 0 }, N = { x: 0, y: 0 }, [, , g, x] = Pc({
    sourceX: e.x,
    sourceY: e.y,
    targetX: n.x,
    targetY: n.y
  });
  if (c[h] * d[h] === -1) {
    h === "x" ? (v = r.x ?? l.x + (u.x - l.x) * s, w = r.y ?? (l.y + u.y) / 2) : (v = r.x ?? (l.x + u.x) / 2, w = r.y ?? l.y + (u.y - l.y) * s);
    const P = [
      { x: v, y: l.y },
      { x: v, y: u.y }
    ], $ = [
      { x: l.x, y: w },
      { x: u.x, y: w }
    ];
    c[h] === p ? y = h === "x" ? P : $ : y = h === "x" ? $ : P;
  } else {
    const P = [{ x: l.x, y: u.y }], $ = [{ x: u.x, y: l.y }];
    if (h === "x" ? y = c.x === p ? $ : P : y = c.y === p ? P : $, t === o) {
      const E = Math.abs(e[h] - n[h]);
      if (E <= i) {
        const _ = Math.min(i - 1, i - E);
        c[h] === p ? m[h] = (l[h] > e[h] ? -1 : 1) * _ : N[h] = (u[h] > n[h] ? -1 : 1) * _;
      }
    }
    if (t !== o) {
      const E = h === "x" ? "y" : "x", _ = c[h] === d[E], I = l[E] > u[E], A = l[E] < u[E];
      (c[h] === 1 && (!_ && I || _ && A) || c[h] !== 1 && (!_ && A || _ && I)) && (y = h === "x" ? P : $);
    }
    const F = { x: l.x + m.x, y: l.y + m.y }, j = { x: u.x + N.x, y: u.y + N.y }, z = Math.max(Math.abs(F.x - y[0].x), Math.abs(j.x - y[0].x)), H = Math.max(Math.abs(F.y - y[0].y), Math.abs(j.y - y[0].y));
    z >= H ? (v = (F.x + j.x) / 2, w = y[0].y) : (v = y[0].x, w = (F.y + j.y) / 2);
  }
  const S = { x: l.x + m.x, y: l.y + m.y }, k = { x: u.x + N.x, y: u.y + N.y };
  return [[
    e,
    // we only want to add the gapped source/target if they are different from the first/last point to avoid duplicates which can cause issues with the bends
    ...S.x !== y[0].x || S.y !== y[0].y ? [S] : [],
    ...y,
    ...k.x !== y[y.length - 1].x || k.y !== y[y.length - 1].y ? [k] : [],
    n
  ], v, w, g, x];
}
function _p(e, t, n, o) {
  const r = Math.min(_s(e, t) / 2, _s(t, n) / 2, o), { x: i, y: s } = t;
  if (e.x === i && i === n.x || e.y === s && s === n.y)
    return `L${i} ${s}`;
  if (e.y === s) {
    const l = e.x < n.x ? -1 : 1, u = e.y < n.y ? 1 : -1;
    return `L ${i + r * l},${s}Q ${i},${s} ${i},${s + r * u}`;
  }
  const c = e.x < n.x ? 1 : -1, d = e.y < n.y ? -1 : 1;
  return `L ${i},${s + r * d}Q ${i},${s} ${i + r * c},${s}`;
}
function Yo({ sourceX: e, sourceY: t, sourcePosition: n = te.Bottom, targetX: o, targetY: r, targetPosition: i = te.Top, borderRadius: s = 5, centerX: c, centerY: d, offset: l = 20, stepPosition: u = 0.5 }) {
  const [f, h, p, y, v] = jp({
    source: { x: e, y: t },
    sourcePosition: n,
    target: { x: o, y: r },
    targetPosition: i,
    center: { x: c, y: d },
    offset: l,
    stepPosition: u
  });
  let w = `M${f[0].x} ${f[0].y}`;
  for (let m = 1; m < f.length - 1; m++)
    w += _p(f[m - 1], f[m], f[m + 1], s);
  return w += `L${f[f.length - 1].x} ${f[f.length - 1].y}`, [w, h, p, y, v];
}
function As(e) {
  return e && !!(e.internals.handleBounds || e.handles?.length) && !!(e.measured.width || e.width || e.initialWidth);
}
function Ap(e) {
  const { sourceNode: t, targetNode: n } = e;
  if (!As(t) || !As(n))
    return null;
  const o = t.internals.handleBounds || Ms(t.handles), r = n.internals.handleBounds || Ms(n.handles), i = Ds(o?.source ?? [], e.sourceHandle), s = Ds(
    // when connection type is loose we can define all handles as sources and connect source -> source
    e.connectionMode === Jt.Strict ? r?.target ?? [] : (r?.target ?? []).concat(r?.source ?? []),
    e.targetHandle
  );
  if (!i || !s)
    return e.onError?.("008", Fe.error008(i ? "target" : "source", {
      id: e.id,
      sourceHandle: e.sourceHandle,
      targetHandle: e.targetHandle
    })), null;
  const c = i?.position || te.Bottom, d = s?.position || te.Top, l = $t(t, i, c), u = $t(n, s, d);
  return {
    sourceX: l.x,
    sourceY: l.y,
    targetX: u.x,
    targetY: u.y,
    sourcePosition: c,
    targetPosition: d
  };
}
function Ms(e) {
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
function $t(e, t, n = te.Left, o = !1) {
  const r = (t?.x ?? 0) + e.internals.positionAbsolute.x, i = (t?.y ?? 0) + e.internals.positionAbsolute.y, { width: s, height: c } = t ?? lt(e);
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
function Ds(e, t) {
  return e && (t ? e.find((n) => n.id === t) : e[0]) || null;
}
function di(e, t) {
  return e ? typeof e == "string" ? e : `${t ? `${t}__` : ""}${Object.keys(e).sort().map((o) => `${o}=${e[o]}`).join("&")}` : "";
}
function Mp(e, { id: t, defaultColor: n, defaultMarkerStart: o, defaultMarkerEnd: r }) {
  const i = /* @__PURE__ */ new Set();
  return e.reduce((s, c) => ([c.markerStart || o, c.markerEnd || r].forEach((d) => {
    if (d && typeof d == "object") {
      const l = di(d, t);
      i.has(l) || (s.push({ id: l, color: d.color || n, ...d }), i.add(l));
    }
  }), s), []).sort((s, c) => s.id.localeCompare(c.id));
}
const zc = 1e3, Dp = 10, $i = {
  nodeOrigin: [0, 0],
  nodeExtent: Rn,
  elevateNodesOnSelect: !0,
  zIndexMode: "basic",
  defaults: {}
}, Pp = {
  ...$i,
  checkEquality: !0
};
function Ti(e, t) {
  const n = { ...e };
  for (const o in t)
    t[o] !== void 0 && (n[o] = t[o]);
  return n;
}
function $p(e, t, n) {
  const o = Ti($i, n);
  for (const r of e.values())
    if (r.parentId)
      Ri(r, e, t, o);
    else {
      const i = Yn(r, o.nodeOrigin), s = Pt(r.extent) ? r.extent : o.nodeExtent, c = Dt(i, s, lt(r));
      r.internals.positionAbsolute = c;
    }
}
function Tp(e, t) {
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
function zi(e) {
  return e === "manual";
}
function ui(e, t, n, o = {}) {
  const r = Ti(Pp, o), i = { i: 0 }, s = new Map(t), c = r?.elevateNodesOnSelect && !zi(r.zIndexMode) ? zc : 0;
  let d = e.length > 0, l = !1;
  t.clear(), n.clear();
  for (const u of e) {
    let f = s.get(u.id);
    if (r.checkEquality && u === f?.internals.userNode)
      t.set(u.id, f);
    else {
      const h = Yn(u, r.nodeOrigin), p = Pt(u.extent) ? u.extent : r.nodeExtent, y = Dt(h, p, lt(u));
      f = {
        ...r.defaults,
        ...u,
        measured: {
          width: u.measured?.width,
          height: u.measured?.height
        },
        internals: {
          positionAbsolute: y,
          // if user re-initializes the node or removes `measured` for whatever reason, we reset the handleBounds so that the node gets re-measured
          handleBounds: Tp(u, f),
          z: Rc(u, c, r.zIndexMode),
          userNode: u
        }
      }, t.set(u.id, f);
    }
    (f.measured === void 0 || f.measured.width === void 0 || f.measured.height === void 0) && !f.hidden && (d = !1), u.parentId && Ri(f, t, n, o, i), l ||= u.selected ?? !1;
  }
  return { nodesInitialized: d, hasSelectedNodes: l };
}
function zp(e, t) {
  if (!e.parentId)
    return;
  const n = t.get(e.parentId);
  n ? n.set(e.id, e) : t.set(e.parentId, /* @__PURE__ */ new Map([[e.id, e]]));
}
function Ri(e, t, n, o, r) {
  const { elevateNodesOnSelect: i, nodeOrigin: s, nodeExtent: c, zIndexMode: d } = Ti($i, o), l = e.parentId, u = t.get(l);
  if (!u) {
    console.warn(`Parent node ${l} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  zp(e, n), r && !u.parentId && u.internals.rootParentIndex === void 0 && d === "auto" && (u.internals.rootParentIndex = ++r.i, u.internals.z = u.internals.z + r.i * Dp), r && u.internals.rootParentIndex !== void 0 && (r.i = u.internals.rootParentIndex);
  const f = i && !zi(d) ? zc : 0, { x: h, y: p, z: y } = Rp(e, u, s, c, f, d), { positionAbsolute: v } = e.internals, w = h !== v.x || p !== v.y;
  (w || y !== e.internals.z) && t.set(e.id, {
    ...e,
    internals: {
      ...e.internals,
      positionAbsolute: w ? { x: h, y: p } : v,
      z: y
    }
  });
}
function Rc(e, t, n) {
  const o = Ze(e.zIndex) ? e.zIndex : 0;
  return zi(n) ? o : o + (e.selected ? t : 0);
}
function Rp(e, t, n, o, r, i) {
  const { x: s, y: c } = t.internals.positionAbsolute, d = lt(e), l = Yn(e, n), u = Pt(e.extent) ? Dt(l, e.extent, d) : l;
  let f = Dt({ x: s + u.x, y: c + u.y }, o, d);
  e.extent === "parent" && (f = Sc(f, d, t));
  const h = Rc(e, r, i), p = t.internals.z ?? 0;
  return {
    x: f.x,
    y: f.y,
    z: p >= h ? p + 1 : h
  };
}
function Li(e, t, n, o = [0, 0]) {
  const r = [], i = /* @__PURE__ */ new Map();
  for (const s of e) {
    const c = t.get(s.parentId);
    if (!c)
      continue;
    const d = i.get(s.parentId)?.expandedRect ?? en(c), l = Ec(d, s.rect);
    i.set(s.parentId, { expandedRect: l, parent: c });
  }
  return i.size > 0 && i.forEach(({ expandedRect: s, parent: c }, d) => {
    const l = c.internals.positionAbsolute, u = lt(c), f = c.origin ?? o, h = s.x < l.x ? Math.round(Math.abs(l.x - s.x)) : 0, p = s.y < l.y ? Math.round(Math.abs(l.y - s.y)) : 0, y = Math.max(u.width, Math.round(s.width)), v = Math.max(u.height, Math.round(s.height)), w = (y - u.width) * f[0], m = (v - u.height) * f[1];
    (h > 0 || p > 0 || w || m) && (r.push({
      id: d,
      type: "position",
      position: {
        x: c.position.x - h + w,
        y: c.position.y - p + m
      }
    }), n.get(d)?.forEach((N) => {
      e.some((g) => g.id === N.id) || r.push({
        id: N.id,
        type: "position",
        position: {
          x: N.position.x + h,
          y: N.position.y + p
        }
      });
    })), (u.width < s.width || u.height < s.height || h || p) && r.push({
      id: d,
      type: "dimensions",
      setAttributes: !0,
      dimensions: {
        width: y + (h ? f[0] * h - w : 0),
        height: v + (p ? f[1] * p - m : 0)
      }
    });
  }), r;
}
function Lp(e, t, n, o, r, i, s) {
  const c = o?.querySelector(".xyflow__viewport");
  let d = !1;
  if (!c)
    return { changes: [], updatedInternals: d };
  const l = [], u = window.getComputedStyle(c), { m22: f } = new window.DOMMatrixReadOnly(u.transform), h = [];
  for (const p of e.values()) {
    const y = t.get(p.id);
    if (!y)
      continue;
    if (y.hidden) {
      t.set(y.id, {
        ...y,
        internals: {
          ...y.internals,
          handleBounds: void 0
        }
      }), d = !0;
      continue;
    }
    const v = Pi(p.nodeElement), w = y.measured.width !== v.width || y.measured.height !== v.height;
    if (!!(v.width && v.height && (w || !y.internals.handleBounds || p.force))) {
      const N = p.nodeElement.getBoundingClientRect(), g = Pt(y.extent) ? y.extent : i;
      let { positionAbsolute: x } = y.internals;
      y.parentId && y.extent === "parent" ? x = Sc(x, v, t.get(y.parentId)) : g && (x = Dt(x, g, v));
      const S = {
        ...y,
        measured: v,
        internals: {
          ...y.internals,
          positionAbsolute: x,
          handleBounds: {
            source: Is("source", p.nodeElement, N, f, y.id),
            target: Is("target", p.nodeElement, N, f, y.id)
          }
        }
      };
      t.set(y.id, S), y.parentId && Ri(S, t, n, { nodeOrigin: r, zIndexMode: s }), d = !0, w && (l.push({
        id: y.id,
        type: "dimensions",
        dimensions: v
      }), y.expandParent && y.parentId && h.push({
        id: y.id,
        parentId: y.parentId,
        rect: en(S, r)
      }));
    }
  }
  if (h.length > 0) {
    const p = Li(h, t, n, r);
    l.push(...p);
  }
  return { changes: l, updatedInternals: d };
}
async function Vp({ delta: e, panZoom: t, transform: n, translateExtent: o, width: r, height: i }) {
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
function Ps(e, t, n, o, r, i) {
  let s = r;
  const c = o.get(s) || /* @__PURE__ */ new Map();
  o.set(s, c.set(n, t)), s = `${r}-${e}`;
  const d = o.get(s) || /* @__PURE__ */ new Map();
  if (o.set(s, d.set(n, t)), i) {
    s = `${r}-${e}-${i}`;
    const l = o.get(s) || /* @__PURE__ */ new Map();
    o.set(s, l.set(n, t));
  }
}
function Lc(e, t, n) {
  e.clear(), t.clear();
  for (const o of n) {
    const { source: r, target: i, sourceHandle: s = null, targetHandle: c = null } = o, d = { edgeId: o.id, source: r, target: i, sourceHandle: s, targetHandle: c }, l = `${r}-${s}--${i}-${c}`, u = `${i}-${c}--${r}-${s}`;
    Ps("source", d, u, e, r, s), Ps("target", d, l, e, i, c), t.set(o.id, o);
  }
}
function Vc(e, t) {
  if (!e.parentId)
    return !1;
  const n = t.get(e.parentId);
  return n ? n.selected ? !0 : Vc(n, t) : !1;
}
function $s(e, t, n) {
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
function Hp(e, t, n, o) {
  const r = /* @__PURE__ */ new Map();
  for (const [i, s] of e)
    if ((s.selected || s.id === o) && (!s.parentId || !Vc(s, e)) && (s.draggable || t && typeof s.draggable > "u")) {
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
function Fr({ nodeId: e, dragItems: t, nodeLookup: n, dragging: o = !0 }) {
  const r = [];
  for (const [s, c] of t) {
    const d = n.get(s)?.internals.userNode;
    d && r.push({
      ...d,
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
function Op({ dragItems: e, snapGrid: t, x: n, y: o }) {
  const r = e.values().next().value;
  if (!r)
    return null;
  const i = {
    x: n - r.distance.x,
    y: o - r.distance.y
  }, s = Zn(i, t);
  return {
    x: s.x - i.x,
    y: s.y - i.y
  };
}
function Fp({ onNodeMouseDown: e, getStoreItems: t, onDragStart: n, onDrag: o, onDragStop: r }) {
  let i = { x: null, y: null }, s = 0, c = /* @__PURE__ */ new Map(), d = !1, l = { x: 0, y: 0 }, u = null, f = !1, h = null, p = !1, y = !1, v = null;
  function w({ noDragClassName: N, handleSelector: g, domNode: x, isSelectable: S, nodeId: k, nodeClickDistance: C = 0 }) {
    h = He(x);
    function P({ x: z, y: H }) {
      const { nodeLookup: E, nodeExtent: _, snapGrid: I, snapToGrid: A, nodeOrigin: T, onNodeDrag: D, onSelectionDrag: W, onError: O, updateNodePositions: B } = t();
      i = { x: z, y: H };
      let U = !1;
      const K = c.size > 1, ne = K && _ ? li(qn(c)) : null, se = K && A ? Op({
        dragItems: c,
        snapGrid: I,
        x: z,
        y: H
      }) : null;
      for (const [Q, R] of c) {
        if (!E.has(Q))
          continue;
        let q = { x: z - R.distance.x, y: H - R.distance.y };
        A && (q = se ? {
          x: Math.round(q.x + se.x),
          y: Math.round(q.y + se.y)
        } : Zn(q, I));
        let ae = null;
        if (K && _ && !R.extent && ne) {
          const { positionAbsolute: ee } = R.internals, le = ee.x - ne.x + _[0][0], V = ee.x + R.measured.width - ne.x2 + _[1][0], Z = ee.y - ne.y + _[0][1], pe = ee.y + R.measured.height - ne.y2 + _[1][1];
          ae = [
            [le, Z],
            [V, pe]
          ];
        }
        const { position: ie, positionAbsolute: G } = Nc({
          nodeId: Q,
          nextPosition: q,
          nodeLookup: E,
          nodeExtent: ae || _,
          nodeOrigin: T,
          onError: O
        });
        U = U || R.position.x !== ie.x || R.position.y !== ie.y, R.position = ie, R.internals.positionAbsolute = G;
      }
      if (y = y || U, !!U && (B(c, !0), v && (o || D || !k && W))) {
        const [Q, R] = Fr({
          nodeId: k,
          dragItems: c,
          nodeLookup: E
        });
        o?.(v, c, Q, R), D?.(v, Q, R), k || W?.(v, R);
      }
    }
    async function $() {
      if (!u)
        return;
      const { transform: z, panBy: H, autoPanSpeed: E, autoPanOnNodeDrag: _ } = t();
      if (!_) {
        d = !1, cancelAnimationFrame(s);
        return;
      }
      const [I, A] = Mi(l, u, E);
      (I !== 0 || A !== 0) && (i.x = (i.x ?? 0) - I / z[2], i.y = (i.y ?? 0) - A / z[2], await H({ x: I, y: A }) && P(i)), s = requestAnimationFrame($);
    }
    function F(z) {
      const { nodeLookup: H, multiSelectionActive: E, nodesDraggable: _, transform: I, snapGrid: A, snapToGrid: T, selectNodesOnDrag: D, onNodeDragStart: W, onSelectionDragStart: O, unselectNodesAndEdges: B } = t();
      f = !0, (!D || !S) && !E && k && (H.get(k)?.selected || B()), S && D && k && e?.(k);
      const U = Mn(z.sourceEvent, { transform: I, snapGrid: A, snapToGrid: T, containerBounds: u });
      if (i = U, c = Hp(H, _, U, k), c.size > 0 && (n || W || !k && O)) {
        const [K, ne] = Fr({
          nodeId: k,
          dragItems: c,
          nodeLookup: H
        });
        n?.(z.sourceEvent, c, K, ne), W?.(z.sourceEvent, K, ne), k || O?.(z.sourceEvent, ne);
      }
    }
    const j = tc().clickDistance(C).on("start", (z) => {
      const { domNode: H, nodeDragThreshold: E, transform: _, snapGrid: I, snapToGrid: A } = t();
      u = H?.getBoundingClientRect() || null, p = !1, y = !1, v = z.sourceEvent, E === 0 && F(z), i = Mn(z.sourceEvent, { transform: _, snapGrid: I, snapToGrid: A, containerBounds: u }), l = Ue(z.sourceEvent, u);
    }).on("drag", (z) => {
      const { autoPanOnNodeDrag: H, transform: E, snapGrid: _, snapToGrid: I, nodeDragThreshold: A, nodeLookup: T } = t(), D = Mn(z.sourceEvent, { transform: E, snapGrid: _, snapToGrid: I, containerBounds: u });
      if (v = z.sourceEvent, (z.sourceEvent.type === "touchmove" && z.sourceEvent.touches.length > 1 || // if user deletes a node while dragging, we need to abort the drag to prevent errors
      k && !T.has(k)) && (p = !0), !p) {
        if (!d && H && f && (d = !0, $()), !f) {
          const W = Ue(z.sourceEvent, u), O = W.x - l.x, B = W.y - l.y;
          Math.sqrt(O * O + B * B) > A && F(z);
        }
        (i.x !== D.xSnapped || i.y !== D.ySnapped) && c && f && (l = Ue(z.sourceEvent, u), P(D));
      }
    }).on("end", (z) => {
      if (!f || p) {
        p && c.size > 0 && t().updateNodePositions(c, !1);
        return;
      }
      if (d = !1, f = !1, cancelAnimationFrame(s), c.size > 0) {
        const { nodeLookup: H, updateNodePositions: E, onNodeDragStop: _, onSelectionDragStop: I } = t();
        if (y && (E(c, !1), y = !1), r || _ || !k && I) {
          const [A, T] = Fr({
            nodeId: k,
            dragItems: c,
            nodeLookup: H,
            dragging: !1
          });
          r?.(z.sourceEvent, c, A, T), _?.(z.sourceEvent, A, T), k || I?.(z.sourceEvent, T);
        }
      }
    }).filter((z) => {
      const H = z.target;
      return !z.button && (!N || !$s(H, `.${N}`, x)) && (!g || $s(H, g, x));
    });
    h.call(j);
  }
  function m() {
    h?.on(".drag", null);
  }
  return {
    update: w,
    destroy: m
  };
}
function Bp(e, t, n) {
  const o = [], r = {
    x: e.x - n,
    y: e.y - n,
    width: n * 2,
    height: n * 2
  };
  for (const i of t.values())
    Vn(r, en(i)) > 0 && o.push(i);
  return o;
}
const Wp = 250;
function Xp(e, t, n, o) {
  let r = [], i = 1 / 0;
  const s = Bp(e, n, t + Wp);
  for (const c of s) {
    const d = [...c.internals.handleBounds?.source ?? [], ...c.internals.handleBounds?.target ?? []];
    for (const l of d) {
      if (o.nodeId === l.nodeId && o.type === l.type && o.id === l.id)
        continue;
      const { x: u, y: f } = $t(c, l, l.position, !0), h = Math.sqrt(Math.pow(u - e.x, 2) + Math.pow(f - e.y, 2));
      h > t || (h < i ? (r = [{ ...l, x: u, y: f }], i = h) : h === i && r.push({ ...l, x: u, y: f }));
    }
  }
  if (!r.length)
    return null;
  if (r.length > 1) {
    const c = o.type === "source" ? "target" : "source";
    return r.find((d) => d.type === c) ?? r[0];
  }
  return r[0];
}
function Hc(e, t, n, o, r, i = !1) {
  const s = o.get(e);
  if (!s)
    return null;
  const c = r === "strict" ? s.internals.handleBounds?.[t] : [...s.internals.handleBounds?.source ?? [], ...s.internals.handleBounds?.target ?? []], d = (n ? c?.find((l) => l.id === n) : c?.[0]) ?? null;
  return d && i ? { ...d, ...$t(s, d, d.position, !0) } : d;
}
function Oc(e, t) {
  return e || (t?.classList.contains("target") ? "target" : t?.classList.contains("source") ? "source" : null);
}
function Yp(e, t) {
  let n = null;
  return t ? n = !0 : e && !t && (n = !1), n;
}
const Fc = () => !0;
function qp(e, { connectionMode: t, connectionRadius: n, handleId: o, nodeId: r, edgeUpdaterType: i, isTarget: s, domNode: c, nodeLookup: d, lib: l, autoPanOnConnect: u, flowId: f, panBy: h, cancelConnection: p, onConnectStart: y, onConnect: v, onConnectEnd: w, isValidConnection: m = Fc, onReconnectEnd: N, updateConnection: g, getTransform: x, getFromHandle: S, autoPanSpeed: k, dragThreshold: C = 1, handleDomNode: P }) {
  const $ = jc(e.target);
  let F = 0, j;
  const { x: z, y: H } = Ue(e), E = Oc(i, P), _ = c?.getBoundingClientRect();
  let I = !1;
  if (!_ || !E)
    return;
  const A = Hc(r, E, o, d, t);
  if (!A)
    return;
  let T = Ue(e, _), D = !1, W = null, O = !1, B = null;
  function U() {
    if (!u || !_)
      return;
    const [ie, G] = Mi(T, _, k);
    h({ x: ie, y: G }), F = requestAnimationFrame(U);
  }
  const K = {
    ...A,
    nodeId: r,
    type: E,
    position: A.position
  }, ne = d.get(r);
  let Q = {
    inProgress: !0,
    isValid: null,
    from: $t(ne, K, te.Left, !0),
    fromHandle: K,
    fromPosition: K.position,
    fromNode: ne,
    to: T,
    toHandle: null,
    toPosition: Ns[K.position],
    toNode: null,
    pointer: T
  };
  function R() {
    I = !0, g(Q), y?.(e, { nodeId: r, handleId: o, handleType: E });
  }
  C === 0 && R();
  function q(ie) {
    if (!I) {
      const { x: pe, y: ge } = Ue(ie), _e = pe - z, ye = ge - H;
      if (!(_e * _e + ye * ye > C * C))
        return;
      R();
    }
    if (!S() || !K) {
      ae(ie);
      return;
    }
    const G = x();
    T = Ue(ie, _), j = Xp(rn(T, G, !1, [1, 1]), n, d, K), D || (U(), D = !0);
    const ee = Bc(ie, {
      handle: j,
      connectionMode: t,
      fromNodeId: r,
      fromHandleId: o,
      fromType: s ? "target" : "source",
      isValidConnection: m,
      doc: $,
      lib: l,
      flowId: f,
      nodeLookup: d
    });
    B = ee.handleDomNode, W = ee.connection, O = Yp(!!j, ee.isValid);
    const le = d.get(r), V = le ? $t(le, K, te.Left, !0) : Q.from, Z = {
      ...Q,
      from: V,
      isValid: O,
      to: ee.toHandle && O ? tn({ x: ee.toHandle.x, y: ee.toHandle.y }, G) : T,
      toHandle: ee.toHandle,
      toPosition: O && ee.toHandle ? ee.toHandle.position : Ns[K.position],
      toNode: ee.toHandle ? d.get(ee.toHandle.nodeId) : null,
      pointer: T
    };
    g(Z), Q = Z;
  }
  function ae(ie) {
    if (!("touches" in ie && ie.touches.length > 0)) {
      if (I) {
        (j || B) && W && O && v?.(W);
        const { inProgress: G, ...ee } = Q, le = {
          ...ee,
          toPosition: Q.toHandle ? Q.toPosition : null
        };
        w?.(ie, le), i && N?.(ie, le);
      }
      p(), cancelAnimationFrame(F), D = !1, O = !1, W = null, B = null, $.removeEventListener("mousemove", q), $.removeEventListener("mouseup", ae), $.removeEventListener("touchmove", q), $.removeEventListener("touchend", ae);
    }
  }
  $.addEventListener("mousemove", q), $.addEventListener("mouseup", ae), $.addEventListener("touchmove", q), $.addEventListener("touchend", ae);
}
function Bc(e, { handle: t, connectionMode: n, fromNodeId: o, fromHandleId: r, fromType: i, doc: s, lib: c, flowId: d, isValidConnection: l = Fc, nodeLookup: u }) {
  const f = i === "target", h = t ? s.querySelector(`.${c}-flow__handle[data-id="${d}-${t?.nodeId}-${t?.id}-${t?.type}"]`) : null, { x: p, y } = Ue(e), v = s.elementFromPoint(p, y), w = v?.classList.contains(`${c}-flow__handle`) ? v : h, m = {
    handleDomNode: w,
    isValid: !1,
    connection: null,
    toHandle: null
  };
  if (w) {
    const N = Oc(void 0, w), g = w.getAttribute("data-nodeid"), x = w.getAttribute("data-handleid"), S = w.classList.contains("connectable"), k = w.classList.contains("connectableend");
    if (!g || !N)
      return m;
    const C = {
      source: f ? g : o,
      sourceHandle: f ? x : r,
      target: f ? o : g,
      targetHandle: f ? r : x
    };
    m.connection = C;
    const $ = S && k && (n === Jt.Strict ? f && N === "source" || !f && N === "target" : g !== o || x !== r);
    m.isValid = $ && l(C), m.toHandle = Hc(g, N, x, u, n, !0);
  }
  return m;
}
const fi = {
  onPointerDown: qp,
  isValid: Bc
};
function Zp({ domNode: e, panZoom: t, getTransform: n, getViewScale: o }) {
  const r = He(e);
  function i({ translateExtent: c, width: d, height: l, zoomStep: u = 1, pannable: f = !0, zoomable: h = !0, inversePan: p = !1 }) {
    const y = (g) => {
      if (g.sourceEvent.type !== "wheel" || !t)
        return;
      const x = n(), S = g.sourceEvent.ctrlKey && Hn() ? 10 : 1, k = -g.sourceEvent.deltaY * (g.sourceEvent.deltaMode === 1 ? 0.05 : g.sourceEvent.deltaMode ? 1 : 2e-3) * u, C = x[2] * Math.pow(2, k * S);
      t.scaleTo(C);
    };
    let v = [0, 0];
    const w = (g) => {
      (g.sourceEvent.type === "mousedown" || g.sourceEvent.type === "touchstart") && (v = [
        g.sourceEvent.clientX ?? g.sourceEvent.touches[0].clientX,
        g.sourceEvent.clientY ?? g.sourceEvent.touches[0].clientY
      ]);
    }, m = (g) => {
      const x = n();
      if (g.sourceEvent.type !== "mousemove" && g.sourceEvent.type !== "touchmove" || !t)
        return;
      const S = [
        g.sourceEvent.clientX ?? g.sourceEvent.touches[0].clientX,
        g.sourceEvent.clientY ?? g.sourceEvent.touches[0].clientY
      ], k = [S[0] - v[0], S[1] - v[1]];
      v = S;
      const C = o() * Math.max(x[2], Math.log(x[2])) * (p ? -1 : 1), P = {
        x: x[0] - k[0] * C,
        y: x[1] - k[1] * C
      }, $ = [
        [0, 0],
        [d, l]
      ];
      t.setViewportConstrained({
        x: P.x,
        y: P.y,
        zoom: x[2]
      }, $, c);
    }, N = yc().on("start", w).on("zoom", f ? m : null).on("zoom.wheel", h ? y : null);
    r.call(N, {});
  }
  function s() {
    r.on("zoom", null);
  }
  return {
    update: i,
    destroy: s,
    pointer: Ye
  };
}
const ar = (e) => ({
  x: e.x,
  y: e.y,
  zoom: e.k
}), Br = ({ x: e, y: t, zoom: n }) => rr.translate(e, t).scale(n), Xt = (e, t) => e.target.closest(`.${t}`), Wc = (e, t) => t === 2 && Array.isArray(e) && e.includes(2), Up = (e) => ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2, Wr = (e, t = 0, n = Up, o = () => {
}) => {
  const r = typeof t == "number" && t > 0;
  return r || o(), r ? e.transition().duration(t).ease(n).on("end", o) : e;
}, Xc = (e) => {
  const t = e.ctrlKey && Hn() ? 10 : 1;
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * t;
};
function Kp({ zoomPanValues: e, noWheelClassName: t, d3Selection: n, d3Zoom: o, panOnScrollMode: r, panOnScrollSpeed: i, zoomOnPinch: s, onPanZoomStart: c, onPanZoom: d, onPanZoomEnd: l }) {
  return (u) => {
    if (Xt(u, t))
      return u.ctrlKey && u.preventDefault(), !1;
    u.preventDefault(), u.stopImmediatePropagation();
    const f = n.property("__zoom").k || 1;
    if (u.ctrlKey && s) {
      const w = Ye(u), m = Xc(u), N = f * Math.pow(2, m);
      o.scaleTo(n, N, w, u);
      return;
    }
    const h = u.deltaMode === 1 ? 20 : 1;
    let p = r === jt.Vertical ? 0 : u.deltaX * h, y = r === jt.Horizontal ? 0 : u.deltaY * h;
    !Hn() && u.shiftKey && r !== jt.Vertical && (p = u.deltaY * h, y = 0), o.translateBy(
      n,
      -(p / f) * i,
      -(y / f) * i,
      // @ts-ignore
      { internal: !0 }
    );
    const v = ar(n.property("__zoom"));
    clearTimeout(e.panScrollTimeout), e.isPanScrolling ? (d?.(u, v), e.panScrollTimeout = setTimeout(() => {
      l?.(u, v), e.isPanScrolling = !1;
    }, 150)) : (e.isPanScrolling = !0, c?.(u, v));
  };
}
function Gp({ noWheelClassName: e, preventScrolling: t, d3ZoomHandler: n }) {
  return function(o, r) {
    const i = o.type === "wheel", s = !t && i && !o.ctrlKey, c = Xt(o, e);
    if (o.ctrlKey && i && c && o.preventDefault(), s || c)
      return null;
    o.preventDefault(), n.call(this, o, r);
  };
}
function Jp({ zoomPanValues: e, onDraggingChange: t, onPanZoomStart: n }) {
  return (o) => {
    if (o.sourceEvent?.internal)
      return;
    const r = ar(o.transform);
    e.mouseButton = o.sourceEvent?.button || 0, e.isZoomingOrPanning = !0, e.prevViewport = r, o.sourceEvent?.type === "mousedown" && t(!0), n && n?.(o.sourceEvent, r);
  };
}
function Qp({ zoomPanValues: e, panOnDrag: t, onPaneContextMenu: n, onTransformChange: o, onPanZoom: r }) {
  return (i) => {
    e.usedRightMouseButton = !!(n && Wc(t, e.mouseButton ?? 0)), i.sourceEvent?.sync || o([i.transform.x, i.transform.y, i.transform.k]), r && !i.sourceEvent?.internal && r?.(i.sourceEvent, ar(i.transform));
  };
}
function eg({ zoomPanValues: e, panOnDrag: t, panOnScroll: n, onDraggingChange: o, onPanZoomEnd: r, onPaneContextMenu: i }) {
  return (s) => {
    if (!s.sourceEvent?.internal && (e.isZoomingOrPanning = !1, i && Wc(t, e.mouseButton ?? 0) && !e.usedRightMouseButton && s.sourceEvent && i(s.sourceEvent), e.usedRightMouseButton = !1, o(!1), r)) {
      const c = ar(s.transform);
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
function tg({ zoomActivationKeyPressed: e, zoomOnScroll: t, zoomOnPinch: n, panOnDrag: o, panOnScroll: r, zoomOnDoubleClick: i, userSelectionActive: s, noWheelClassName: c, noPanClassName: d, lib: l, connectionInProgress: u }) {
  return (f) => {
    const h = e || t, p = n && f.ctrlKey, y = f.type === "wheel";
    if (f.button === 1 && f.type === "mousedown" && (Xt(f, `${l}-flow__node`) || Xt(f, `${l}-flow__edge`)))
      return !0;
    if (!o && !h && !r && !i && !n || s || u && !y || Xt(f, c) && y || Xt(f, d) && (!y || r && y && !e) || !n && f.ctrlKey && y)
      return !1;
    if (!n && f.type === "touchstart" && f.touches?.length > 1)
      return f.preventDefault(), !1;
    if (!h && !r && !p && y || !o && (f.type === "mousedown" || f.type === "touchstart") || Array.isArray(o) && !o.includes(f.button) && f.type === "mousedown")
      return !1;
    const v = Array.isArray(o) && o.includes(f.button) || !f.button || f.button <= 1;
    return (!f.ctrlKey || y) && v;
  };
}
function ng({ domNode: e, minZoom: t, maxZoom: n, translateExtent: o, viewport: r, onPanZoom: i, onPanZoomStart: s, onPanZoomEnd: c, onDraggingChange: d }) {
  const l = {
    isZoomingOrPanning: !1,
    usedRightMouseButton: !1,
    prevViewport: {},
    mouseButton: 0,
    timerId: void 0,
    panScrollTimeout: void 0,
    isPanScrolling: !1
  }, u = e.getBoundingClientRect(), f = yc().scaleExtent([t, n]).translateExtent(o), h = He(e).call(f);
  N({
    x: r.x,
    y: r.y,
    zoom: Qt(r.zoom, t, n)
  }, [
    [0, 0],
    [u.width, u.height]
  ], o);
  const p = h.on("wheel.zoom"), y = h.on("dblclick.zoom");
  f.wheelDelta(Xc);
  async function v(j, z) {
    return h ? new Promise((H) => {
      f?.interpolate(z?.interpolate === "linear" ? An : Ao).transform(Wr(h, z?.duration, z?.ease, () => H(!0)), j);
    }) : !1;
  }
  function w({ noWheelClassName: j, noPanClassName: z, onPaneContextMenu: H, userSelectionActive: E, panOnScroll: _, panOnDrag: I, panOnScrollMode: A, panOnScrollSpeed: T, preventScrolling: D, zoomOnPinch: W, zoomOnScroll: O, zoomOnDoubleClick: B, zoomActivationKeyPressed: U, lib: K, onTransformChange: ne, connectionInProgress: se, paneClickDistance: Q, selectionOnDrag: R }) {
    E && !l.isZoomingOrPanning && m();
    const q = _ && !U && !E;
    f.clickDistance(R ? 1 / 0 : !Ze(Q) || Q < 0 ? 0 : Q);
    const ae = q ? Kp({
      zoomPanValues: l,
      noWheelClassName: j,
      d3Selection: h,
      d3Zoom: f,
      panOnScrollMode: A,
      panOnScrollSpeed: T,
      zoomOnPinch: W,
      onPanZoomStart: s,
      onPanZoom: i,
      onPanZoomEnd: c
    }) : Gp({
      noWheelClassName: j,
      preventScrolling: D,
      d3ZoomHandler: p
    });
    h.on("wheel.zoom", ae, { passive: !1 });
    const ie = Jp({
      zoomPanValues: l,
      onDraggingChange: d,
      onPanZoomStart: s
    });
    f.on("start", ie);
    const G = Qp({
      zoomPanValues: l,
      panOnDrag: I,
      onPaneContextMenu: !!H,
      onPanZoom: i,
      onTransformChange: ne
    });
    f.on("zoom", G);
    const ee = eg({
      zoomPanValues: l,
      panOnDrag: I,
      panOnScroll: _,
      onPaneContextMenu: H,
      onPanZoomEnd: c,
      onDraggingChange: d
    });
    f.on("end", ee);
    const le = tg({
      zoomActivationKeyPressed: U,
      panOnDrag: I,
      zoomOnScroll: O,
      panOnScroll: _,
      zoomOnDoubleClick: B,
      zoomOnPinch: W,
      userSelectionActive: E,
      noPanClassName: z,
      noWheelClassName: j,
      lib: K,
      connectionInProgress: se
    });
    f.filter(le), B ? h.on("dblclick.zoom", y) : h.on("dblclick.zoom", null);
  }
  function m() {
    f.on("zoom", null);
  }
  async function N(j, z, H) {
    const E = Br(j), _ = f?.constrain()(E, z, H);
    return _ && await v(_), _;
  }
  async function g(j, z) {
    const H = Br(j);
    return await v(H, z), H;
  }
  function x(j) {
    if (h) {
      const z = Br(j), H = h.property("__zoom");
      (H.k !== j.zoom || H.x !== j.x || H.y !== j.y) && f?.transform(h, z, null, { sync: !0 });
    }
  }
  function S() {
    const j = h ? gc(h.node()) : { x: 0, y: 0, k: 1 };
    return { x: j.x, y: j.y, zoom: j.k };
  }
  async function k(j, z) {
    return h ? new Promise((H) => {
      f?.interpolate(z?.interpolate === "linear" ? An : Ao).scaleTo(Wr(h, z?.duration, z?.ease, () => H(!0)), j);
    }) : !1;
  }
  async function C(j, z) {
    return h ? new Promise((H) => {
      f?.interpolate(z?.interpolate === "linear" ? An : Ao).scaleBy(Wr(h, z?.duration, z?.ease, () => H(!0)), j);
    }) : !1;
  }
  function P(j) {
    f?.scaleExtent(j);
  }
  function $(j) {
    f?.translateExtent(j);
  }
  function F(j) {
    const z = !Ze(j) || j < 0 ? 0 : j;
    f?.clickDistance(z);
  }
  return {
    update: w,
    destroy: m,
    setViewport: g,
    setViewportConstrained: N,
    getViewport: S,
    scaleTo: k,
    scaleBy: C,
    setScaleExtent: P,
    setTranslateExtent: $,
    syncViewport: x,
    setClickDistance: F
  };
}
var nn;
(function(e) {
  e.Line = "line", e.Handle = "handle";
})(nn || (nn = {}));
function og({ width: e, prevWidth: t, height: n, prevHeight: o, affectsX: r, affectsY: i }) {
  const s = e - t, c = n - o, d = [s > 0 ? 1 : s < 0 ? -1 : 0, c > 0 ? 1 : c < 0 ? -1 : 0];
  return s && r && (d[0] = d[0] * -1), c && i && (d[1] = d[1] * -1), d;
}
function Ts(e) {
  const t = e.includes("right") || e.includes("left"), n = e.includes("bottom") || e.includes("top"), o = e.includes("left"), r = e.includes("top");
  return {
    isHorizontal: t,
    isVertical: n,
    affectsX: o,
    affectsY: r
  };
}
function ft(e, t) {
  return Math.max(0, t - e);
}
function ht(e, t) {
  return Math.max(0, e - t);
}
function Eo(e, t, n) {
  return Math.max(0, t - e, e - n);
}
function zs(e, t) {
  return e ? !t : t;
}
function rg(e, t, n, o, r, i, s, c) {
  let { affectsX: d, affectsY: l } = t;
  const { isHorizontal: u, isVertical: f } = t, h = u && f, { xSnapped: p, ySnapped: y } = n, { minWidth: v, maxWidth: w, minHeight: m, maxHeight: N } = o, { x: g, y: x, width: S, height: k, aspectRatio: C } = e;
  let P = Math.floor(u ? p - e.pointerX : 0), $ = Math.floor(f ? y - e.pointerY : 0);
  const F = S + (d ? -P : P), j = k + (l ? -$ : $), z = -i[0] * S, H = -i[1] * k;
  let E = Eo(F, v, w), _ = Eo(j, m, N);
  if (s) {
    let T = 0, D = 0;
    d && P < 0 ? T = ft(g + P + z, s[0][0]) : !d && P > 0 && (T = ht(g + F + z, s[1][0])), l && $ < 0 ? D = ft(x + $ + H, s[0][1]) : !l && $ > 0 && (D = ht(x + j + H, s[1][1])), E = Math.max(E, T), _ = Math.max(_, D);
  }
  if (c) {
    let T = 0, D = 0;
    d && P > 0 ? T = ht(g + P, c[0][0]) : !d && P < 0 && (T = ft(g + F, c[1][0])), l && $ > 0 ? D = ht(x + $, c[0][1]) : !l && $ < 0 && (D = ft(x + j, c[1][1])), E = Math.max(E, T), _ = Math.max(_, D);
  }
  if (r) {
    if (u) {
      const T = Eo(F / C, m, N) * C;
      if (E = Math.max(E, T), s) {
        let D = 0;
        !d && !l || d && !l && h ? D = ht(x + H + F / C, s[1][1]) * C : D = ft(x + H + (d ? P : -P) / C, s[0][1]) * C, E = Math.max(E, D);
      }
      if (c) {
        let D = 0;
        !d && !l || d && !l && h ? D = ft(x + F / C, c[1][1]) * C : D = ht(x + (d ? P : -P) / C, c[0][1]) * C, E = Math.max(E, D);
      }
    }
    if (f) {
      const T = Eo(j * C, v, w) / C;
      if (_ = Math.max(_, T), s) {
        let D = 0;
        !d && !l || l && !d && h ? D = ht(g + j * C + z, s[1][0]) / C : D = ft(g + (l ? $ : -$) * C + z, s[0][0]) / C, _ = Math.max(_, D);
      }
      if (c) {
        let D = 0;
        !d && !l || l && !d && h ? D = ft(g + j * C, c[1][0]) / C : D = ht(g + (l ? $ : -$) * C, c[0][0]) / C, _ = Math.max(_, D);
      }
    }
  }
  $ = $ + ($ < 0 ? _ : -_), P = P + (P < 0 ? E : -E), r && (h ? F > j * C ? $ = (zs(d, l) ? -P : P) / C : P = (zs(d, l) ? -$ : $) * C : u ? ($ = P / C, l = d) : (P = $ * C, d = l));
  const I = d ? g + P : g, A = l ? x + $ : x;
  return {
    width: S + (d ? -P : P),
    height: k + (l ? -$ : $),
    x: i[0] * P * (d ? -1 : 1) + I,
    y: i[1] * $ * (l ? -1 : 1) + A
  };
}
const Yc = { width: 0, height: 0, x: 0, y: 0 }, ig = {
  ...Yc,
  pointerX: 0,
  pointerY: 0,
  aspectRatio: 1
};
function sg(e, t, n) {
  const o = t.position.x + e.position.x, r = t.position.y + e.position.y, i = e.measured.width ?? 0, s = e.measured.height ?? 0, c = n[0] * i, d = n[1] * s;
  return [
    [o - c, r - d],
    [o + i - c, r + s - d]
  ];
}
function ag({ domNode: e, nodeId: t, getStoreItems: n, onChange: o, onEnd: r }) {
  const i = He(e);
  let s = {
    controlDirection: Ts("bottom-right"),
    boundaries: {
      minWidth: 0,
      minHeight: 0,
      maxWidth: Number.MAX_VALUE,
      maxHeight: Number.MAX_VALUE
    },
    resizeDirection: void 0,
    keepAspectRatio: !1
  };
  function c({ controlPosition: l, boundaries: u, keepAspectRatio: f, resizeDirection: h, onResizeStart: p, onResize: y, onResizeEnd: v, shouldResize: w }) {
    let m = { ...Yc }, N = { ...ig };
    s = {
      boundaries: u,
      resizeDirection: h,
      keepAspectRatio: f,
      controlDirection: Ts(l)
    };
    let g, x = null, S = [], k, C, P, $ = !1;
    const F = tc().on("start", (j) => {
      const { nodeLookup: z, transform: H, snapGrid: E, snapToGrid: _, nodeOrigin: I, paneDomNode: A } = n();
      if (g = z.get(t), !g)
        return;
      x = A?.getBoundingClientRect() ?? null;
      const { xSnapped: T, ySnapped: D } = Mn(j.sourceEvent, {
        transform: H,
        snapGrid: E,
        snapToGrid: _,
        containerBounds: x
      });
      m = {
        width: g.measured.width ?? 0,
        height: g.measured.height ?? 0,
        x: g.position.x ?? 0,
        y: g.position.y ?? 0
      }, N = {
        ...m,
        pointerX: T,
        pointerY: D,
        aspectRatio: m.width / m.height
      }, k = void 0, C = Pt(g.extent) ? g.extent : void 0, g.parentId && (g.extent === "parent" || g.expandParent) && (k = z.get(g.parentId)), k && g.extent === "parent" && (C = [
        [0, 0],
        [k.measured.width, k.measured.height]
      ]), S = [], P = void 0;
      for (const [W, O] of z)
        if (O.parentId === t && (S.push({
          id: W,
          position: { ...O.position },
          extent: O.extent
        }), O.extent === "parent" || O.expandParent)) {
          const B = sg(O, g, O.origin ?? I);
          P ? P = [
            [Math.min(B[0][0], P[0][0]), Math.min(B[0][1], P[0][1])],
            [Math.max(B[1][0], P[1][0]), Math.max(B[1][1], P[1][1])]
          ] : P = B;
        }
      p?.(j, { ...m });
    }).on("drag", (j) => {
      const { transform: z, snapGrid: H, snapToGrid: E, nodeOrigin: _ } = n(), I = Mn(j.sourceEvent, {
        transform: z,
        snapGrid: H,
        snapToGrid: E,
        containerBounds: x
      }), A = [];
      if (!g)
        return;
      const { x: T, y: D, width: W, height: O } = m, B = {}, U = g.origin ?? _, { width: K, height: ne, x: se, y: Q } = rg(N, s.controlDirection, I, s.boundaries, s.keepAspectRatio, U, C, P), R = K !== W, q = ne !== O, ae = se !== T && R, ie = Q !== D && q;
      if (!ae && !ie && !R && !q)
        return;
      if ((ae || ie || U[0] === 1 || U[1] === 1) && (B.x = ae ? se : m.x, B.y = ie ? Q : m.y, m.x = B.x, m.y = B.y, S.length > 0)) {
        const V = se - T, Z = Q - D;
        for (const pe of S)
          pe.position = {
            x: pe.position.x - V + U[0] * (K - W),
            y: pe.position.y - Z + U[1] * (ne - O)
          }, A.push(pe);
      }
      if ((R || q) && (B.width = R && (!s.resizeDirection || s.resizeDirection === "horizontal") ? K : m.width, B.height = q && (!s.resizeDirection || s.resizeDirection === "vertical") ? ne : m.height, m.width = B.width, m.height = B.height), k && g.expandParent) {
        const V = U[0] * (B.width ?? 0);
        B.x && B.x < V && (m.x = V, N.x = N.x - (B.x - V));
        const Z = U[1] * (B.height ?? 0);
        B.y && B.y < Z && (m.y = Z, N.y = N.y - (B.y - Z));
      }
      const G = og({
        width: m.width,
        prevWidth: W,
        height: m.height,
        prevHeight: O,
        affectsX: s.controlDirection.affectsX,
        affectsY: s.controlDirection.affectsY
      }), ee = { ...m, direction: G };
      w?.(j, ee) !== !1 && ($ = !0, y?.(j, ee), o(B, A));
    }).on("end", (j) => {
      $ && (v?.(j, { ...m }), r?.({ ...m }), $ = !1);
    });
    i.call(F);
  }
  function d() {
    i.on(".drag", null);
  }
  return {
    update: c,
    destroy: d
  };
}
var Xr = { exports: {} }, Yr = {}, qr = { exports: {} }, Zr = {};
var Rs;
function cg() {
  if (Rs) return Zr;
  Rs = 1;
  var e = xt;
  function t(f, h) {
    return f === h && (f !== 0 || 1 / f === 1 / h) || f !== f && h !== h;
  }
  var n = typeof Object.is == "function" ? Object.is : t, o = e.useState, r = e.useEffect, i = e.useLayoutEffect, s = e.useDebugValue;
  function c(f, h) {
    var p = h(), y = o({ inst: { value: p, getSnapshot: h } }), v = y[0].inst, w = y[1];
    return i(
      function() {
        v.value = p, v.getSnapshot = h, d(v) && w({ inst: v });
      },
      [f, p, h]
    ), r(
      function() {
        return d(v) && w({ inst: v }), f(function() {
          d(v) && w({ inst: v });
        });
      },
      [f]
    ), s(p), p;
  }
  function d(f) {
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
  var u = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : c;
  return Zr.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : u, Zr;
}
var Ls;
function lg() {
  return Ls || (Ls = 1, qr.exports = cg()), qr.exports;
}
var Vs;
function dg() {
  if (Vs) return Yr;
  Vs = 1;
  var e = xt, t = lg();
  function n(l, u) {
    return l === u && (l !== 0 || 1 / l === 1 / u) || l !== l && u !== u;
  }
  var o = typeof Object.is == "function" ? Object.is : n, r = t.useSyncExternalStore, i = e.useRef, s = e.useEffect, c = e.useMemo, d = e.useDebugValue;
  return Yr.useSyncExternalStoreWithSelector = function(l, u, f, h, p) {
    var y = i(null);
    if (y.current === null) {
      var v = { hasValue: !1, value: null };
      y.current = v;
    } else v = y.current;
    y = c(
      function() {
        function m(k) {
          if (!N) {
            if (N = !0, g = k, k = h(k), p !== void 0 && v.hasValue) {
              var C = v.value;
              if (p(C, k))
                return x = C;
            }
            return x = k;
          }
          if (C = x, o(g, k)) return C;
          var P = h(k);
          return p !== void 0 && p(C, P) ? (g = k, C) : (g = k, x = P);
        }
        var N = !1, g, x, S = f === void 0 ? null : f;
        return [
          function() {
            return m(u());
          },
          S === null ? void 0 : function() {
            return m(S());
          }
        ];
      },
      [u, f, h, p]
    );
    var w = r(l, y[0], y[1]);
    return s(
      function() {
        v.hasValue = !0, v.value = w;
      },
      [w]
    ), d(w), w;
  }, Yr;
}
var Hs;
function ug() {
  return Hs || (Hs = 1, Xr.exports = dg()), Xr.exports;
}
var fg = ug();
const hg = /* @__PURE__ */ jd(fg), pg = {}, Os = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), o = (u, f) => {
    const h = typeof u == "function" ? u(t) : u;
    if (!Object.is(h, t)) {
      const p = t;
      t = f ?? (typeof h != "object" || h === null) ? h : Object.assign({}, t, h), n.forEach((y) => y(t, p));
    }
  }, r = () => t, d = { setState: o, getState: r, getInitialState: () => l, subscribe: (u) => (n.add(u), () => n.delete(u)), destroy: () => {
    (pg ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), n.clear();
  } }, l = t = e(o, r, d);
  return d;
}, gg = (e) => e ? Os(e) : Os, { useDebugValue: yg } = xt, { useSyncExternalStoreWithSelector: mg } = hg, xg = (e) => e;
function qc(e, t = xg, n) {
  const o = mg(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n
  );
  return yg(o), o;
}
const Fs = (e, t) => {
  const n = gg(e), o = (r, i = t) => qc(n, r, i);
  return Object.assign(o, n), o;
}, wg = (e, t) => e ? Fs(e, t) : Fs;
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
var Ur = { exports: {} }, De = {};
var Bs;
function vg() {
  if (Bs) return De;
  Bs = 1;
  var e = xt;
  function t(d) {
    var l = "https://react.dev/errors/" + d;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++)
        l += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return "Minified React error #" + d + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function i(d, l, u) {
    var f = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: f == null ? null : "" + f,
      children: d,
      containerInfo: l,
      implementation: u
    };
  }
  var s = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function c(d, l) {
    if (d === "font") return "";
    if (typeof l == "string")
      return l === "use-credentials" ? l : "";
  }
  return De.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, De.createPortal = function(d, l) {
    var u = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11)
      throw Error(t(299));
    return i(d, l, null, u);
  }, De.flushSync = function(d) {
    var l = s.T, u = o.p;
    try {
      if (s.T = null, o.p = 2, d) return d();
    } finally {
      s.T = l, o.p = u, o.d.f();
    }
  }, De.preconnect = function(d, l) {
    typeof d == "string" && (l ? (l = l.crossOrigin, l = typeof l == "string" ? l === "use-credentials" ? l : "" : void 0) : l = null, o.d.C(d, l));
  }, De.prefetchDNS = function(d) {
    typeof d == "string" && o.d.D(d);
  }, De.preinit = function(d, l) {
    if (typeof d == "string" && l && typeof l.as == "string") {
      var u = l.as, f = c(u, l.crossOrigin), h = typeof l.integrity == "string" ? l.integrity : void 0, p = typeof l.fetchPriority == "string" ? l.fetchPriority : void 0;
      u === "style" ? o.d.S(
        d,
        typeof l.precedence == "string" ? l.precedence : void 0,
        {
          crossOrigin: f,
          integrity: h,
          fetchPriority: p
        }
      ) : u === "script" && o.d.X(d, {
        crossOrigin: f,
        integrity: h,
        fetchPriority: p,
        nonce: typeof l.nonce == "string" ? l.nonce : void 0
      });
    }
  }, De.preinitModule = function(d, l) {
    if (typeof d == "string")
      if (typeof l == "object" && l !== null) {
        if (l.as == null || l.as === "script") {
          var u = c(
            l.as,
            l.crossOrigin
          );
          o.d.M(d, {
            crossOrigin: u,
            integrity: typeof l.integrity == "string" ? l.integrity : void 0,
            nonce: typeof l.nonce == "string" ? l.nonce : void 0
          });
        }
      } else l == null && o.d.M(d);
  }, De.preload = function(d, l) {
    if (typeof d == "string" && typeof l == "object" && l !== null && typeof l.as == "string") {
      var u = l.as, f = c(u, l.crossOrigin);
      o.d.L(d, u, {
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
  }, De.preloadModule = function(d, l) {
    if (typeof d == "string")
      if (l) {
        var u = c(l.as, l.crossOrigin);
        o.d.m(d, {
          as: typeof l.as == "string" && l.as !== "script" ? l.as : void 0,
          crossOrigin: u,
          integrity: typeof l.integrity == "string" ? l.integrity : void 0
        });
      } else o.d.m(d);
  }, De.requestFormReset = function(d) {
    o.d.r(d);
  }, De.unstable_batchedUpdates = function(d, l) {
    return d(l);
  }, De.useFormState = function(d, l, u) {
    return s.H.useFormState(d, l, u);
  }, De.useFormStatus = function() {
    return s.H.useHostTransitionStatus();
  }, De.version = "19.2.7", De;
}
var Ws;
function bg() {
  if (Ws) return Ur.exports;
  Ws = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
  }
  return e(), Ur.exports = vg(), Ur.exports;
}
var Ng = bg();
const cr = bi(null), Sg = cr.Provider, Zc = Fe.error001("react");
function ue(e, t) {
  const n = Bn(cr);
  if (n === null)
    throw new Error(Zc);
  return qc(n, e, t);
}
function we() {
  const e = Bn(cr);
  if (e === null)
    throw new Error(Zc);
  return me(() => ({
    getState: e.getState,
    setState: e.setState,
    subscribe: e.subscribe
  }), [e]);
}
const Xs = { display: "none" }, Eg = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(100%)"
}, Uc = "react-flow__node-desc", Kc = "react-flow__edge-desc", kg = "react-flow__aria-live", Ig = (e) => e.ariaLiveMessage, Cg = (e) => e.ariaLabelConfig;
function jg({ rfId: e }) {
  const t = ue(Ig);
  return a.jsx("div", { id: `${kg}-${e}`, "aria-live": "assertive", "aria-atomic": "true", style: Eg, children: t });
}
function _g({ rfId: e, disableKeyboardA11y: t }) {
  const n = ue(Cg);
  return a.jsxs(a.Fragment, { children: [a.jsx("div", { id: `${Uc}-${e}`, style: Xs, children: t ? n["node.a11yDescription.default"] : n["node.a11yDescription.keyboardDisabled"] }), a.jsx("div", { id: `${Kc}-${e}`, style: Xs, children: n["edge.a11yDescription.default"] }), !t && a.jsx(jg, { rfId: e })] });
}
const lr = Qo(({ position: e = "top-left", children: t, className: n, style: o, ...r }, i) => {
  const s = `${e}`.split("-");
  return a.jsx("div", { className: Ie(["react-flow__panel", n, ...s]), style: o, ref: i, ...r, children: t });
});
lr.displayName = "Panel";
function Ag({ proOptions: e, position: t = "bottom-right" }) {
  return e?.hideAttribution ? null : a.jsx(lr, { position: t, className: "react-flow__attribution", "data-message": "Please only hide this attribution when you are subscribed to React Flow Pro: https://pro.reactflow.dev", children: a.jsx("a", { href: "https://reactflow.dev", target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const Mg = (e) => {
  const t = [], n = [];
  for (const [, o] of e.nodeLookup)
    o.selected && t.push(o.internals.userNode);
  for (const [, o] of e.edgeLookup)
    o.selected && n.push(o);
  return { selectedNodes: t, selectedEdges: n };
}, ko = (e) => e.id;
function Dg(e, t) {
  return xe(e.selectedNodes.map(ko), t.selectedNodes.map(ko)) && xe(e.selectedEdges.map(ko), t.selectedEdges.map(ko));
}
function Pg({ onSelectionChange: e }) {
  const t = we(), { selectedNodes: n, selectedEdges: o } = ue(Mg, Dg);
  return oe(() => {
    const r = { nodes: n, edges: o };
    e?.(r), t.getState().onSelectionChangeHandlers.forEach((i) => i(r));
  }, [n, o, e]), null;
}
const $g = (e) => !!e.onSelectionChangeHandlers;
function Tg({ onSelectionChange: e }) {
  const t = ue($g);
  return e || t ? a.jsx(Pg, { onSelectionChange: e }) : null;
}
const Gc = [0, 0], zg = { x: 0, y: 0, zoom: 1 }, Rg = [
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
], Ys = [...Rg, "rfId"], Lg = (e) => ({
  setNodes: e.setNodes,
  setEdges: e.setEdges,
  setMinZoom: e.setMinZoom,
  setMaxZoom: e.setMaxZoom,
  setTranslateExtent: e.setTranslateExtent,
  setNodeExtent: e.setNodeExtent,
  reset: e.reset,
  setDefaultNodesAndEdges: e.setDefaultNodesAndEdges
}), qs = {
  /*
   * these are values that are also passed directly to other components
   * than the StoreUpdater. We can reduce the number of setStore calls
   * by setting the same values here as prev fields.
   */
  translateExtent: Rn,
  nodeOrigin: Gc,
  minZoom: 0.5,
  maxZoom: 2,
  elementsSelectable: !0,
  noPanClassName: "nopan",
  rfId: "1"
};
function Vg(e) {
  const { setNodes: t, setEdges: n, setMinZoom: o, setMaxZoom: r, setTranslateExtent: i, setNodeExtent: s, reset: c, setDefaultNodesAndEdges: d } = ue(Lg, xe), l = we();
  oe(() => (d(e.defaultNodes, e.defaultEdges), () => {
    u.current = qs, c();
  }), []);
  const u = ce(qs);
  return oe(
    () => {
      for (const f of Ys) {
        const h = e[f], p = u.current[f];
        h !== p && (typeof e[f] > "u" || (f === "nodes" ? t(h) : f === "edges" ? n(h) : f === "minZoom" ? o(h) : f === "maxZoom" ? r(h) : f === "translateExtent" ? i(h) : f === "nodeExtent" ? s(h) : f === "ariaLabelConfig" ? l.setState({ ariaLabelConfig: vp(h) }) : f === "fitView" ? l.setState({ fitViewQueued: h }) : f === "fitViewOptions" ? l.setState({ fitViewOptions: h }) : l.setState({ [f]: h })));
      }
      u.current = e;
    },
    // Only re-run the effect if one of the fields we track changes
    Ys.map((f) => e[f])
  ), null;
}
function Zs() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function Hg(e) {
  const [t, n] = Y(e === "system" ? null : e);
  return oe(() => {
    if (e !== "system") {
      n(e);
      return;
    }
    const o = Zs(), r = () => n(o?.matches ? "dark" : "light");
    return r(), o?.addEventListener("change", r), () => {
      o?.removeEventListener("change", r);
    };
  }, [e]), t !== null ? t : Zs()?.matches ? "dark" : "light";
}
const Us = typeof document < "u" ? document : null;
function On(e = null, t = { target: Us, actInsideInputWithModifier: !0 }) {
  const [n, o] = Y(!1), r = ce(!1), i = ce(/* @__PURE__ */ new Set([])), [s, c] = me(() => {
    if (e !== null) {
      const l = (Array.isArray(e) ? e : [e]).filter((f) => typeof f == "string").map((f) => f.replace("+", `
`).replace(`

`, `
+`).split(`
`)), u = l.reduce((f, h) => f.concat(...h), []);
      return [l, u];
    }
    return [[], []];
  }, [e]);
  return oe(() => {
    const d = t?.target ?? Us, l = t?.actInsideInputWithModifier ?? !0;
    if (e !== null) {
      const u = (p) => {
        if (r.current = p.ctrlKey || p.metaKey || p.shiftKey || p.altKey, (!r.current || r.current && !l) && _c(p))
          return !1;
        const v = Gs(p.code, c);
        if (i.current.add(p[v]), Ks(s, i.current, !1)) {
          const w = p.composedPath?.()?.[0] || p.target, m = w?.nodeName === "BUTTON" || w?.nodeName === "A";
          t.preventDefault !== !1 && (r.current || !m) && p.preventDefault(), o(!0);
        }
      }, f = (p) => {
        const y = Gs(p.code, c);
        Ks(s, i.current, !0) ? (o(!1), i.current.clear()) : i.current.delete(p[y]), p.key === "Meta" && i.current.clear(), r.current = !1;
      }, h = () => {
        i.current.clear(), o(!1);
      };
      return d?.addEventListener("keydown", u), d?.addEventListener("keyup", f), window.addEventListener("blur", h), window.addEventListener("contextmenu", h), () => {
        d?.removeEventListener("keydown", u), d?.removeEventListener("keyup", f), window.removeEventListener("blur", h), window.removeEventListener("contextmenu", h);
      };
    }
  }, [e, o]), n;
}
function Ks(e, t, n) {
  return e.filter((o) => n || o.length === t.size).some((o) => o.every((r) => t.has(r)));
}
function Gs(e, t) {
  return t.includes(e) ? "code" : "key";
}
const Og = () => {
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
      const { width: o, height: r, minZoom: i, maxZoom: s, panZoom: c } = e.getState(), d = Di(t, o, r, i, s, n?.padding ?? 0.1);
      return c ? (await c.setViewport(d, {
        duration: n?.duration,
        ease: n?.ease,
        interpolate: n?.interpolate
      }), !0) : !1;
    },
    screenToFlowPosition: (t, n = {}) => {
      const { transform: o, snapGrid: r, snapToGrid: i, domNode: s } = e.getState();
      if (!s)
        return t;
      const { x: c, y: d } = s.getBoundingClientRect(), l = {
        x: t.x - c,
        y: t.y - d
      }, u = n.snapGrid ?? r, f = n.snapToGrid ?? i;
      return rn(l, o, f, u);
    },
    flowToScreenPosition: (t) => {
      const { transform: n, domNode: o } = e.getState();
      if (!o)
        return t;
      const { x: r, y: i } = o.getBoundingClientRect(), s = tn(t, n);
      return {
        x: s.x + r,
        y: s.y + i
      };
    }
  }), []);
};
function Jc(e, t) {
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
    for (const d of s)
      Fg(d, c);
    n.push(c);
  }
  return r.length && r.forEach((i) => {
    i.index !== void 0 ? n.splice(i.index, 0, { ...i.item }) : n.push({ ...i.item });
  }), n;
}
function Fg(e, t) {
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
function Qc(e, t) {
  return Jc(e, t);
}
function el(e, t) {
  return Jc(e, t);
}
function kt(e, t) {
  return {
    id: e,
    type: "select",
    selected: t
  };
}
function Yt(e, t = /* @__PURE__ */ new Set(), n = !1) {
  const o = [];
  for (const [r, i] of e) {
    const s = t.has(r);
    !(i.selected === void 0 && !s) && i.selected !== s && (n && (i.selected = s), o.push(kt(i.id, s)));
  }
  return o;
}
function Js({ items: e = [], lookup: t }) {
  const n = [], o = new Map(e.map((r) => [r.id, r]));
  for (const [r, i] of e.entries()) {
    const s = t.get(i.id), c = s?.internals?.userNode ?? s;
    c !== void 0 && c !== i && n.push({ id: i.id, item: i, type: "replace" }), c === void 0 && n.push({ item: i, type: "add", index: r });
  }
  for (const [r] of t)
    o.get(r) === void 0 && n.push({ id: r, type: "remove" });
  return n;
}
function Qs(e) {
  return {
    id: e.id,
    type: "remove"
  };
}
const tl = kc();
function nl(e, t, n = {}) {
  return kp(e, t, {
    ...n,
    onError: n.onError ?? tl
  });
}
function Bg(e, t, n, o = { shouldReplaceId: !0 }) {
  return Ip(e, t, n, {
    ...o,
    onError: o.onError ?? tl
  });
}
const ea = (e) => up(e), Wg = (e) => bc(e);
function ol(e) {
  return Qo(e);
}
const Xg = typeof window < "u" ? Cd : oe;
function ta(e) {
  const [t, n] = Y(BigInt(0)), [o] = Y(() => Yg(() => n((r) => r + BigInt(1))));
  return Xg(() => {
    const r = o.get();
    r.length && (e(r), o.reset());
  }, [t]), o;
}
function Yg(e) {
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
const rl = bi(null);
function qg({ children: e }) {
  const t = we(), n = he((c) => {
    const { nodes: d = [], setNodes: l, hasDefaultNodes: u, onNodesChange: f, nodeLookup: h, fitViewQueued: p, onNodesChangeMiddlewareMap: y } = t.getState();
    let v = d;
    for (const m of c)
      v = typeof m == "function" ? m(v) : m;
    let w = Js({
      items: v,
      lookup: h
    });
    for (const m of y.values())
      w = m(w);
    u && l(v), w.length > 0 ? f?.(w) : p && window.requestAnimationFrame(() => {
      const { fitViewQueued: m, nodes: N, setNodes: g } = t.getState();
      m && g(N);
    });
  }, []), o = ta(n), r = he((c) => {
    const { edges: d = [], setEdges: l, hasDefaultEdges: u, onEdgesChange: f, edgeLookup: h } = t.getState();
    let p = d;
    for (const y of c)
      p = typeof y == "function" ? y(p) : y;
    u ? l(p) : f && f(Js({
      items: p,
      lookup: h
    }));
  }, []), i = ta(r), s = me(() => ({ nodeQueue: o, edgeQueue: i }), []);
  return a.jsx(rl.Provider, { value: s, children: e });
}
function Zg() {
  const e = Bn(rl);
  if (!e)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e;
}
const Ug = (e) => !!e.panZoom;
function Vi() {
  const e = Og(), t = we(), n = Zg(), o = ue(Ug), r = me(() => {
    const i = (f) => t.getState().nodeLookup.get(f), s = (f) => {
      n.nodeQueue.push(f);
    }, c = (f) => {
      n.edgeQueue.push(f);
    }, d = (f) => {
      const { nodeLookup: h, nodeOrigin: p } = t.getState(), y = ea(f) ? f : h.get(f.id), v = y.parentId ? Cc(y.position, y.measured, y.parentId, h, p) : y.position, w = {
        ...y,
        position: v,
        width: y.measured?.width ?? y.width,
        height: y.measured?.height ?? y.height
      };
      return en(w);
    }, l = (f, h, p = { replace: !1 }) => {
      s((y) => y.map((v) => {
        if (v.id === f) {
          const w = typeof h == "function" ? h(v) : h;
          return p.replace && ea(w) ? w : { ...v, ...w };
        }
        return v;
      }));
    }, u = (f, h, p = { replace: !1 }) => {
      c((y) => y.map((v) => {
        if (v.id === f) {
          const w = typeof h == "function" ? h(v) : h;
          return p.replace && Wg(w) ? w : { ...v, ...w };
        }
        return v;
      }));
    };
    return {
      getNodes: () => t.getState().nodes.map((f) => ({ ...f })),
      getNode: (f) => i(f)?.internals.userNode,
      getInternalNode: i,
      getEdges: () => {
        const { edges: f = [] } = t.getState();
        return f.map((h) => ({ ...h }));
      },
      getEdge: (f) => t.getState().edgeLookup.get(f),
      setNodes: s,
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
        const { nodes: f = [], edges: h = [], transform: p } = t.getState(), [y, v, w] = p;
        return {
          nodes: f.map((m) => ({ ...m })),
          edges: h.map((m) => ({ ...m })),
          viewport: {
            x: y,
            y: v,
            zoom: w
          }
        };
      },
      deleteElements: async ({ nodes: f = [], edges: h = [] }) => {
        const { nodes: p, edges: y, onNodesDelete: v, onEdgesDelete: w, triggerNodeChanges: m, triggerEdgeChanges: N, onDelete: g, onBeforeDelete: x } = t.getState(), { nodes: S, edges: k } = await yp({
          nodesToRemove: f,
          edgesToRemove: h,
          nodes: p,
          edges: y,
          onBeforeDelete: x
        }), C = k.length > 0, P = S.length > 0;
        if (C) {
          const $ = k.map(Qs);
          w?.(k), N($);
        }
        if (P) {
          const $ = S.map(Qs);
          v?.(S), m($);
        }
        return (P || C) && g?.({ nodes: S, edges: k }), { deletedNodes: S, deletedEdges: k };
      },
      /**
       * Partial is defined as "the 2 nodes/areas are intersecting partially".
       * If a is contained in b or b is contained in a, they are both
       * considered fully intersecting.
       */
      getIntersectingNodes: (f, h = !0, p) => {
        const y = Es(f), v = y ? f : d(f), w = p !== void 0;
        return v ? (p || t.getState().nodes).filter((m) => {
          const N = t.getState().nodeLookup.get(m.id);
          if (N && !y && (m.id === f.id || !N.internals.positionAbsolute))
            return !1;
          const g = en(w ? m : N), x = Vn(g, v);
          return h && x > 0 || x >= g.width * g.height || x >= v.width * v.height;
        }) : [];
      },
      isNodeIntersecting: (f, h, p = !0) => {
        const v = Es(f) ? f : d(f);
        if (!v)
          return !1;
        const w = Vn(v, h);
        return p && w > 0 || w >= h.width * h.height || w >= v.width * v.height;
      },
      updateNode: l,
      updateNodeData: (f, h, p = { replace: !1 }) => {
        l(f, (y) => {
          const v = typeof h == "function" ? h(y) : h;
          return p.replace ? { ...y, data: v } : { ...y, data: { ...y.data, ...v } };
        }, p);
      },
      updateEdge: u,
      updateEdgeData: (f, h, p = { replace: !1 }) => {
        u(f, (y) => {
          const v = typeof h == "function" ? h(y) : h;
          return p.replace ? { ...y, data: v } : { ...y, data: { ...y.data, ...v } };
        }, p);
      },
      getNodesBounds: (f) => {
        const { nodeLookup: h, nodeOrigin: p } = t.getState();
        return fp(f, { nodeLookup: h, nodeOrigin: p });
      },
      getHandleConnections: ({ type: f, id: h, nodeId: p }) => Array.from(t.getState().connectionLookup.get(`${p}-${f}${h ? `-${h}` : ""}`)?.values() ?? []),
      getNodeConnections: ({ type: f, handleId: h, nodeId: p }) => Array.from(t.getState().connectionLookup.get(`${p}${f ? h ? `-${f}-${h}` : `-${f}` : ""}`)?.values() ?? []),
      fitView: async (f) => {
        const h = t.getState().fitViewResolver ?? wp();
        return t.setState({ fitViewQueued: !0, fitViewOptions: f, fitViewResolver: h }), n.nodeQueue.push((p) => [...p]), h.promise;
      }
    };
  }, []);
  return me(() => ({
    ...r,
    ...e,
    viewportInitialized: o
  }), [o]);
}
const na = (e) => e.selected, Kg = typeof window < "u" ? window : void 0;
function Gg({ deleteKeyCode: e, multiSelectionKeyCode: t }) {
  const n = we(), { deleteElements: o } = Vi(), r = On(e, { actInsideInputWithModifier: !1 }), i = On(t, { target: Kg });
  oe(() => {
    if (r) {
      const { edges: s, nodes: c } = n.getState();
      o({ nodes: c.filter(na), edges: s.filter(na) }), n.setState({ nodesSelectionActive: !1 });
    }
  }, [r]), oe(() => {
    n.setState({ multiSelectionActive: i });
  }, [i]);
}
function Jg(e) {
  const t = we();
  oe(() => {
    const n = () => {
      if (!e.current || !(e.current.checkVisibility?.() ?? !0))
        return !1;
      const o = Pi(e.current);
      (o.height === 0 || o.width === 0) && t.getState().onError?.("004", Fe.error004()), t.setState({ width: o.width || 500, height: o.height || 500 });
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
const dr = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
}, Qg = (e) => ({
  userSelectionActive: e.userSelectionActive,
  lib: e.lib,
  connectionInProgress: e.connection.inProgress
});
function ey({ onPaneContextMenu: e, zoomOnScroll: t = !0, zoomOnPinch: n = !0, panOnScroll: o = !1, panOnScrollSpeed: r = 0.5, panOnScrollMode: i = jt.Free, zoomOnDoubleClick: s = !0, panOnDrag: c = !0, defaultViewport: d, translateExtent: l, minZoom: u, maxZoom: f, zoomActivationKeyCode: h, preventScrolling: p = !0, children: y, noWheelClassName: v, noPanClassName: w, onViewportChange: m, isControlledViewport: N, paneClickDistance: g, selectionOnDrag: x }) {
  const S = we(), k = ce(null), { userSelectionActive: C, lib: P, connectionInProgress: $ } = ue(Qg, xe), F = On(h), j = ce();
  Jg(k);
  const z = he((H) => {
    m?.({ x: H[0], y: H[1], zoom: H[2] }), N || S.setState({ transform: H });
  }, [m, N]);
  return oe(() => {
    if (k.current) {
      j.current = ng({
        domNode: k.current,
        minZoom: u,
        maxZoom: f,
        translateExtent: l,
        viewport: d,
        onDraggingChange: (I) => S.setState((A) => A.paneDragging === I ? A : { paneDragging: I }),
        onPanZoomStart: (I, A) => {
          const { onViewportChangeStart: T, onMoveStart: D } = S.getState();
          D?.(I, A), T?.(A);
        },
        onPanZoom: (I, A) => {
          const { onViewportChange: T, onMove: D } = S.getState();
          D?.(I, A), T?.(A);
        },
        onPanZoomEnd: (I, A) => {
          const { onViewportChangeEnd: T, onMoveEnd: D } = S.getState();
          D?.(I, A), T?.(A);
        }
      });
      const { x: H, y: E, zoom: _ } = j.current.getViewport();
      return S.setState({
        panZoom: j.current,
        transform: [H, E, _],
        domNode: k.current.closest(".react-flow")
      }), () => {
        j.current?.destroy();
      };
    }
  }, []), oe(() => {
    j.current?.update({
      onPaneContextMenu: e,
      zoomOnScroll: t,
      zoomOnPinch: n,
      panOnScroll: o,
      panOnScrollSpeed: r,
      panOnScrollMode: i,
      zoomOnDoubleClick: s,
      panOnDrag: c,
      zoomActivationKeyPressed: F,
      preventScrolling: p,
      noPanClassName: w,
      userSelectionActive: C,
      noWheelClassName: v,
      lib: P,
      onTransformChange: z,
      connectionInProgress: $,
      selectionOnDrag: x,
      paneClickDistance: g
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
    F,
    p,
    w,
    C,
    v,
    P,
    z,
    $,
    x,
    g
  ]), a.jsx("div", { className: "react-flow__renderer", ref: k, style: dr, children: y });
}
const ty = (e) => ({
  userSelectionActive: e.userSelectionActive,
  userSelectionRect: e.userSelectionRect
});
function ny() {
  const { userSelectionActive: e, userSelectionRect: t } = ue(ty, xe);
  return e && t ? a.jsx("div", { className: "react-flow__selection react-flow__container", style: {
    width: t.width,
    height: t.height,
    transform: `translate(${t.x}px, ${t.y}px)`
  } }) : null;
}
const Kr = (e, t) => (n) => {
  n.target === t.current && e?.(n);
}, oy = (e) => ({
  userSelectionActive: e.userSelectionActive,
  elementsSelectable: e.elementsSelectable,
  connectionInProgress: e.connection.inProgress,
  dragging: e.paneDragging,
  panBy: e.panBy,
  autoPanSpeed: e.autoPanSpeed
});
function ry({ isSelecting: e, selectionKeyPressed: t, selectionMode: n = Ln.Full, panOnDrag: o, autoPanOnSelection: r, paneClickDistance: i, selectionOnDrag: s, onSelectionStart: c, onSelectionEnd: d, onPaneClick: l, onPaneContextMenu: u, onPaneScroll: f, onPaneMouseEnter: h, onPaneMouseMove: p, onPaneMouseLeave: y, children: v }) {
  const w = ce(0), m = we(), { userSelectionActive: N, elementsSelectable: g, dragging: x, connectionInProgress: S, panBy: k, autoPanSpeed: C } = ue(oy, xe), P = g && (e || N), $ = ce(null), F = ce(), j = ce(/* @__PURE__ */ new Set()), z = ce(/* @__PURE__ */ new Set()), H = ce(!1), E = ce({ x: 0, y: 0 }), _ = ce(!1), I = (R) => {
    if (H.current || S) {
      H.current = !1;
      return;
    }
    l?.(R), m.getState().resetSelectedElements(), m.setState({ nodesSelectionActive: !1 });
  }, A = (R) => {
    if (Array.isArray(o) && o?.includes(2)) {
      R.preventDefault();
      return;
    }
    u?.(R);
  }, T = f ? (R) => f(R) : void 0, D = (R) => {
    H.current && (R.stopPropagation(), H.current = !1);
  }, W = (R) => {
    const { domNode: q, transform: ae } = m.getState();
    if (F.current = q?.getBoundingClientRect(), !F.current)
      return;
    const ie = R.target === $.current;
    if (!ie && !!R.target.closest(".nokey") || !e || !(s && ie || t) || R.button !== 0 || !R.isPrimary)
      return;
    R.target?.setPointerCapture?.(R.pointerId), H.current = !1;
    const { x: le, y: V } = Ue(R.nativeEvent, F.current), Z = rn({ x: le, y: V }, ae);
    m.setState({
      userSelectionRect: {
        width: 0,
        height: 0,
        startX: Z.x,
        startY: Z.y,
        x: le,
        y: V
      }
    }), ie || (R.stopPropagation(), R.preventDefault());
  };
  function O(R, q) {
    const { userSelectionRect: ae } = m.getState();
    if (!ae)
      return;
    const { transform: ie, nodeLookup: G, edgeLookup: ee, connectionLookup: le, triggerNodeChanges: V, triggerEdgeChanges: Z, defaultEdgeOptions: pe } = m.getState(), ge = { x: ae.startX, y: ae.startY }, { x: _e, y: ye } = tn(ge, ie), Ae = {
      startX: ge.x,
      startY: ge.y,
      x: R < _e ? R : _e,
      y: q < ye ? q : ye,
      width: Math.abs(R - _e),
      height: Math.abs(q - ye)
    }, wt = j.current, ot = z.current;
    j.current = new Set(Ai(G, Ae, ie, n === Ln.Partial, !0).map((Pe) => Pe.id)), z.current = /* @__PURE__ */ new Set();
    const rt = pe?.selectable ?? !0;
    for (const Pe of j.current) {
      const Ee = le.get(Pe);
      if (Ee)
        for (const { edgeId: $e } of Ee.values()) {
          const We = ee.get($e);
          We && (We.selectable ?? rt) && z.current.add($e);
        }
    }
    if (!ks(wt, j.current)) {
      const Pe = Yt(G, j.current, !0);
      V(Pe);
    }
    if (!ks(ot, z.current)) {
      const Pe = Yt(ee, z.current);
      Z(Pe);
    }
    m.setState({
      userSelectionRect: Ae,
      userSelectionActive: !0,
      nodesSelectionActive: !1
    });
  }
  function B() {
    if (!r || !F.current)
      return;
    const [R, q] = Mi(E.current, F.current, C);
    k({ x: R, y: q }).then((ae) => {
      if (!H.current || !ae) {
        w.current = requestAnimationFrame(B);
        return;
      }
      const { x: ie, y: G } = E.current;
      O(ie, G), w.current = requestAnimationFrame(B);
    });
  }
  const U = () => {
    cancelAnimationFrame(w.current), w.current = 0, _.current = !1;
  };
  oe(() => () => U(), []);
  const K = (R) => {
    const { userSelectionRect: q, transform: ae, resetSelectedElements: ie } = m.getState();
    if (!F.current || !q)
      return;
    const { x: G, y: ee } = Ue(R.nativeEvent, F.current);
    E.current = { x: G, y: ee };
    const le = tn({ x: q.startX, y: q.startY }, ae);
    if (!H.current) {
      const V = t ? 0 : i;
      if (Math.hypot(G - le.x, ee - le.y) <= V)
        return;
      ie(), c?.(R);
    }
    H.current = !0, _.current || (B(), _.current = !0), O(G, ee);
  }, ne = (R) => {
    R.button === 0 && (R.target?.releasePointerCapture?.(R.pointerId), !N && R.target === $.current && m.getState().userSelectionRect && I?.(R), m.setState({
      userSelectionActive: !1,
      userSelectionRect: null
    }), H.current && (d?.(R), m.setState({
      nodesSelectionActive: j.current.size > 0
    })), U());
  }, se = (R) => {
    R.target?.releasePointerCapture?.(R.pointerId), U();
  }, Q = o === !0 || Array.isArray(o) && o.includes(0);
  return a.jsxs("div", { className: Ie(["react-flow__pane", { draggable: Q, dragging: x, selection: e }]), onClick: P ? void 0 : Kr(I, $), onContextMenu: Kr(A, $), onWheel: Kr(T, $), onPointerEnter: P ? void 0 : h, onPointerMove: P ? K : p, onPointerUp: P ? ne : void 0, onPointerCancel: P ? se : void 0, onPointerDownCapture: P ? W : void 0, onClickCapture: P ? D : void 0, onPointerLeave: y, ref: $, style: dr, children: [v, a.jsx(ny, {})] });
}
function hi({ id: e, store: t, unselect: n = !1, nodeRef: o }) {
  const { addSelectedNodes: r, unselectNodesAndEdges: i, multiSelectionActive: s, nodeLookup: c, onError: d } = t.getState(), l = c.get(e);
  if (!l) {
    d?.("012", Fe.error012(e));
    return;
  }
  t.setState({ nodesSelectionActive: !1 }), l.selected ? (n || l.selected && s) && (i({ nodes: [l], edges: [] }), requestAnimationFrame(() => o?.current?.blur())) : r([e]);
}
function il({ nodeRef: e, disabled: t = !1, noDragClassName: n, handleSelector: o, nodeId: r, isSelectable: i, nodeClickDistance: s }) {
  const c = we(), [d, l] = Y(!1), u = ce();
  return oe(() => {
    u.current = Fp({
      getStoreItems: () => c.getState(),
      onNodeMouseDown: (f) => {
        hi({
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
  }, []), oe(() => {
    if (!(t || !e.current || !u.current))
      return u.current.update({
        noDragClassName: n,
        handleSelector: o,
        domNode: e.current,
        isSelectable: i,
        nodeId: r,
        nodeClickDistance: s
      }), () => {
        u.current?.destroy();
      };
  }, [n, o, t, i, e, r, s]), d;
}
const iy = (e) => (t) => t.selected && (t.draggable || e && typeof t.draggable > "u");
function sl() {
  const e = we();
  return he((n) => {
    const { nodeExtent: o, snapToGrid: r, snapGrid: i, nodesDraggable: s, onError: c, updateNodePositions: d, nodeLookup: l, nodeOrigin: u } = e.getState(), f = /* @__PURE__ */ new Map(), h = iy(s), p = r ? i[0] : 5, y = r ? i[1] : 5, v = n.direction.x * p * n.factor, w = n.direction.y * y * n.factor;
    for (const [, m] of l) {
      if (!h(m))
        continue;
      let N = {
        x: m.internals.positionAbsolute.x + v,
        y: m.internals.positionAbsolute.y + w
      };
      r && (N = Zn(N, i));
      const { position: g, positionAbsolute: x } = Nc({
        nodeId: m.id,
        nextPosition: N,
        nodeLookup: l,
        nodeExtent: o,
        nodeOrigin: u,
        onError: c
      });
      m.position = g, m.internals.positionAbsolute = x, f.set(m.id, m);
    }
    d(f);
  }, []);
}
const Hi = bi(null), sy = Hi.Provider;
Hi.Consumer;
const al = () => Bn(Hi), ay = (e) => ({
  connectOnClick: e.connectOnClick,
  noPanClassName: e.noPanClassName,
  rfId: e.rfId
}), cy = (e, t, n) => (o) => {
  const { connectionClickStartHandle: r, connectionMode: i, connection: s } = o, { fromHandle: c, toHandle: d, isValid: l } = s, u = d?.nodeId === e && d?.id === t && d?.type === n;
  return {
    connectingFrom: c?.nodeId === e && c?.id === t && c?.type === n,
    connectingTo: u,
    clickConnecting: r?.nodeId === e && r?.id === t && r?.type === n,
    isPossibleEndHandle: i === Jt.Strict ? c?.type !== n : e !== c?.nodeId || t !== c?.id,
    connectionInProcess: !!c,
    clickConnectionInProcess: !!r,
    valid: u && l
  };
};
function ly({ type: e = "source", position: t = te.Top, isValidConnection: n, isConnectable: o = !0, isConnectableStart: r = !0, isConnectableEnd: i = !0, id: s, onConnect: c, children: d, className: l, onMouseDown: u, onTouchStart: f, ...h }, p) {
  const y = s || null, v = e === "target", w = we(), m = al(), { connectOnClick: N, noPanClassName: g, rfId: x } = ue(ay, xe), { connectingFrom: S, connectingTo: k, clickConnecting: C, isPossibleEndHandle: P, connectionInProcess: $, clickConnectionInProcess: F, valid: j } = ue(cy(m, y, e), xe);
  m || w.getState().onError?.("010", Fe.error010());
  const z = (_) => {
    const { defaultEdgeOptions: I, onConnect: A, hasDefaultEdges: T } = w.getState(), D = {
      ...I,
      ..._
    };
    if (T) {
      const { edges: W, setEdges: O, onError: B } = w.getState();
      O(nl(D, W, { onError: B }));
    }
    A?.(D), c?.(D);
  }, H = (_) => {
    if (!m)
      return;
    const I = Ac(_.nativeEvent);
    if (r && (I && _.button === 0 || !I)) {
      const A = w.getState();
      fi.onPointerDown(_.nativeEvent, {
        handleDomNode: _.currentTarget,
        autoPanOnConnect: A.autoPanOnConnect,
        connectionMode: A.connectionMode,
        connectionRadius: A.connectionRadius,
        domNode: A.domNode,
        nodeLookup: A.nodeLookup,
        lib: A.lib,
        isTarget: v,
        handleId: y,
        nodeId: m,
        flowId: A.rfId,
        panBy: A.panBy,
        cancelConnection: A.cancelConnection,
        onConnectStart: A.onConnectStart,
        onConnectEnd: (...T) => w.getState().onConnectEnd?.(...T),
        updateConnection: A.updateConnection,
        onConnect: z,
        isValidConnection: n || ((...T) => w.getState().isValidConnection?.(...T) ?? !0),
        getTransform: () => w.getState().transform,
        getFromHandle: () => w.getState().connection.fromHandle,
        autoPanSpeed: A.autoPanSpeed,
        dragThreshold: A.connectionDragThreshold
      });
    }
    I ? u?.(_) : f?.(_);
  }, E = (_) => {
    const { onClickConnectStart: I, onClickConnectEnd: A, connectionClickStartHandle: T, connectionMode: D, isValidConnection: W, lib: O, rfId: B, nodeLookup: U, connection: K } = w.getState();
    if (!m || !T && !r)
      return;
    if (!T) {
      I?.(_.nativeEvent, { nodeId: m, handleId: y, handleType: e }), w.setState({ connectionClickStartHandle: { nodeId: m, type: e, id: y } });
      return;
    }
    const ne = jc(_.target), se = n || W, { connection: Q, isValid: R } = fi.isValid(_.nativeEvent, {
      handle: {
        nodeId: m,
        id: y,
        type: e
      },
      connectionMode: D,
      fromNodeId: T.nodeId,
      fromHandleId: T.id || null,
      fromType: T.type,
      isValidConnection: se,
      flowId: B,
      doc: ne,
      lib: O,
      nodeLookup: U
    });
    R && Q && z(Q);
    const q = structuredClone(K);
    delete q.inProgress, q.toPosition = q.toHandle ? q.toHandle.position : null, A?.(_, q), w.setState({ connectionClickStartHandle: null });
  };
  return a.jsx("div", { "data-handleid": y, "data-nodeid": m, "data-handlepos": t, "data-id": `${x}-${m}-${y}-${e}`, className: Ie([
    "react-flow__handle",
    `react-flow__handle-${t}`,
    "nodrag",
    g,
    l,
    {
      source: !v,
      target: v,
      connectable: o,
      connectablestart: r,
      connectableend: i,
      clickconnecting: C,
      connectingfrom: S,
      connectingto: k,
      valid: j,
      /*
       * shows where you can start a connection from
       * and where you can end it while connecting
       */
      connectionindicator: o && (!$ || P) && ($ || F ? i : r)
    }
  ]), onMouseDown: H, onTouchStart: H, onClick: N ? E : void 0, ref: p, ...h, children: d });
}
const on = Se(ol(ly));
function dy({ data: e, isConnectable: t, sourcePosition: n = te.Bottom }) {
  return a.jsxs(a.Fragment, { children: [e?.label, a.jsx(on, { type: "source", position: n, isConnectable: t })] });
}
function uy({ data: e, isConnectable: t, targetPosition: n = te.Top, sourcePosition: o = te.Bottom }) {
  return a.jsxs(a.Fragment, { children: [a.jsx(on, { type: "target", position: n, isConnectable: t }), e?.label, a.jsx(on, { type: "source", position: o, isConnectable: t })] });
}
function fy() {
  return null;
}
function hy({ data: e, isConnectable: t, targetPosition: n = te.Top }) {
  return a.jsxs(a.Fragment, { children: [a.jsx(on, { type: "target", position: n, isConnectable: t }), e?.label] });
}
const qo = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
}, oa = {
  input: dy,
  default: uy,
  output: hy,
  group: fy
};
function py(e) {
  return e.internals.handleBounds === void 0 ? {
    width: e.width ?? e.initialWidth ?? e.style?.width,
    height: e.height ?? e.initialHeight ?? e.style?.height
  } : {
    width: e.width ?? e.style?.width,
    height: e.height ?? e.style?.height
  };
}
const gy = (e) => {
  const { width: t, height: n, x: o, y: r } = qn(e.nodeLookup, {
    filter: (i) => !!i.selected
  });
  return {
    width: Ze(t) ? t : null,
    height: Ze(n) ? n : null,
    userSelectionActive: e.userSelectionActive,
    transformString: `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${o}px,${r}px)`
  };
};
function yy({ onSelectionContextMenu: e, noPanClassName: t, disableKeyboardA11y: n }) {
  const o = we(), { width: r, height: i, transformString: s, userSelectionActive: c } = ue(gy, xe), d = sl(), l = ce(null);
  oe(() => {
    n || l.current?.focus({
      preventScroll: !0
    });
  }, [n]);
  const u = !c && r !== null && i !== null;
  if (il({
    nodeRef: l,
    disabled: !u
  }), !u)
    return null;
  const f = e ? (p) => {
    const y = o.getState().nodes.filter((v) => v.selected);
    e(p, y);
  } : void 0, h = (p) => {
    Object.prototype.hasOwnProperty.call(qo, p.key) && (p.preventDefault(), d({
      direction: qo[p.key],
      factor: p.shiftKey ? 4 : 1
    }));
  };
  return a.jsx("div", { className: Ie(["react-flow__nodesselection", "react-flow__container", t]), style: {
    transform: s
  }, children: a.jsx("div", { ref: l, className: "react-flow__nodesselection-rect", onContextMenu: f, tabIndex: n ? void 0 : -1, onKeyDown: n ? void 0 : h, style: {
    width: r,
    height: i
  } }) });
}
const ra = typeof window < "u" ? window : void 0, my = (e) => ({ nodesSelectionActive: e.nodesSelectionActive, userSelectionActive: e.userSelectionActive });
function cl({ children: e, onPaneClick: t, onPaneMouseEnter: n, onPaneMouseMove: o, onPaneMouseLeave: r, onPaneContextMenu: i, onPaneScroll: s, paneClickDistance: c, deleteKeyCode: d, selectionKeyCode: l, selectionOnDrag: u, selectionMode: f, onSelectionStart: h, onSelectionEnd: p, multiSelectionKeyCode: y, panActivationKeyCode: v, zoomActivationKeyCode: w, elementsSelectable: m, zoomOnScroll: N, zoomOnPinch: g, panOnScroll: x, panOnScrollSpeed: S, panOnScrollMode: k, zoomOnDoubleClick: C, panOnDrag: P, autoPanOnSelection: $, defaultViewport: F, translateExtent: j, minZoom: z, maxZoom: H, preventScrolling: E, onSelectionContextMenu: _, noWheelClassName: I, noPanClassName: A, disableKeyboardA11y: T, onViewportChange: D, isControlledViewport: W }) {
  const { nodesSelectionActive: O, userSelectionActive: B } = ue(my, xe), U = On(l, { target: ra }), K = On(v, { target: ra }), ne = K || P, se = K || x, Q = u && ne !== !0, R = U || B || Q;
  return Gg({ deleteKeyCode: d, multiSelectionKeyCode: y }), a.jsx(ey, { onPaneContextMenu: i, elementsSelectable: m, zoomOnScroll: N, zoomOnPinch: g, panOnScroll: se, panOnScrollSpeed: S, panOnScrollMode: k, zoomOnDoubleClick: C, panOnDrag: !U && ne, defaultViewport: F, translateExtent: j, minZoom: z, maxZoom: H, zoomActivationKeyCode: w, preventScrolling: E, noWheelClassName: I, noPanClassName: A, onViewportChange: D, isControlledViewport: W, paneClickDistance: c, selectionOnDrag: Q, children: a.jsxs(ry, { onSelectionStart: h, onSelectionEnd: p, onPaneClick: t, onPaneMouseEnter: n, onPaneMouseMove: o, onPaneMouseLeave: r, onPaneContextMenu: i, onPaneScroll: s, panOnDrag: ne, autoPanOnSelection: $, isSelecting: !!R, selectionMode: f, selectionKeyPressed: U, paneClickDistance: c, selectionOnDrag: Q, children: [e, O && a.jsx(yy, { onSelectionContextMenu: _, noPanClassName: A, disableKeyboardA11y: T })] }) });
}
cl.displayName = "FlowRenderer";
const xy = Se(cl), wy = (e) => (t) => e ? Ai(t.nodeLookup, { x: 0, y: 0, width: t.width, height: t.height }, t.transform, !0).map((n) => n.id) : Array.from(t.nodeLookup.keys());
function vy(e) {
  return ue(he(wy(e), [e]), xe);
}
const by = (e) => e.updateNodeInternals;
function Ny() {
  const e = ue(by), [t] = Y(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((n) => {
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
function Sy({ node: e, nodeType: t, hasDimensions: n, resizeObserver: o }) {
  const r = we(), i = ce(null), s = ce(null), c = ce(e.sourcePosition), d = ce(e.targetPosition), l = ce(t), u = n && !!e.internals.handleBounds;
  return oe(() => {
    i.current && !e.hidden && (!u || s.current !== i.current) && (s.current && o?.unobserve(s.current), o?.observe(i.current), s.current = i.current);
  }, [u, e.hidden]), oe(() => () => {
    s.current && (o?.unobserve(s.current), s.current = null);
  }, []), oe(() => {
    if (i.current) {
      const f = l.current !== t, h = c.current !== e.sourcePosition, p = d.current !== e.targetPosition;
      (f || h || p) && (l.current = t, c.current = e.sourcePosition, d.current = e.targetPosition, r.getState().updateNodeInternals(/* @__PURE__ */ new Map([[e.id, { id: e.id, nodeElement: i.current, force: !0 }]])));
    }
  }, [e.id, t, e.sourcePosition, e.targetPosition]), i;
}
function Ey({ id: e, onClick: t, onMouseEnter: n, onMouseMove: o, onMouseLeave: r, onContextMenu: i, onDoubleClick: s, nodesDraggable: c, elementsSelectable: d, nodesConnectable: l, nodesFocusable: u, resizeObserver: f, noDragClassName: h, noPanClassName: p, disableKeyboardA11y: y, rfId: v, nodeTypes: w, nodeClickDistance: m, onError: N }) {
  const { node: g, internals: x, isParent: S } = ue((R) => {
    const q = R.nodeLookup.get(e), ae = R.parentLookup.has(e);
    return {
      node: q,
      internals: q.internals,
      isParent: ae
    };
  }, xe);
  let k = g.type || "default", C = w?.[k] || oa[k];
  C === void 0 && (N?.("003", Fe.error003(k)), k = "default", C = w?.default || oa.default);
  const P = !!(g.draggable || c && typeof g.draggable > "u"), $ = !!(g.selectable || d && typeof g.selectable > "u"), F = !!(g.connectable || l && typeof g.connectable > "u"), j = !!(g.focusable || u && typeof g.focusable > "u"), z = we(), H = Ic(g), E = Sy({ node: g, nodeType: k, hasDimensions: H, resizeObserver: f }), _ = il({
    nodeRef: E,
    disabled: g.hidden || !P,
    noDragClassName: h,
    handleSelector: g.dragHandle,
    nodeId: e,
    isSelectable: $,
    nodeClickDistance: m
  }), I = sl();
  if (g.hidden)
    return null;
  const A = lt(g), T = py(g), D = $ || P || t || n || o || r, W = n ? (R) => n(R, { ...x.userNode }) : void 0, O = o ? (R) => o(R, { ...x.userNode }) : void 0, B = r ? (R) => r(R, { ...x.userNode }) : void 0, U = i ? (R) => i(R, { ...x.userNode }) : void 0, K = s ? (R) => s(R, { ...x.userNode }) : void 0, ne = (R) => {
    const { selectNodesOnDrag: q, nodeDragThreshold: ae } = z.getState();
    $ && (!q || !P || ae > 0) && hi({
      id: e,
      store: z,
      nodeRef: E
    }), t && t(R, { ...x.userNode });
  }, se = (R) => {
    if (!(_c(R.nativeEvent) || y)) {
      if (mc.includes(R.key) && $) {
        const q = R.key === "Escape";
        hi({
          id: e,
          store: z,
          unselect: q,
          nodeRef: E
        });
      } else if (P && g.selected && Object.prototype.hasOwnProperty.call(qo, R.key)) {
        R.preventDefault();
        const { ariaLabelConfig: q } = z.getState();
        z.setState({
          ariaLiveMessage: q["node.a11yDescription.ariaLiveMessage"]({
            direction: R.key.replace("Arrow", "").toLowerCase(),
            x: ~~x.positionAbsolute.x,
            y: ~~x.positionAbsolute.y
          })
        }), I({
          direction: qo[R.key],
          factor: R.shiftKey ? 4 : 1
        });
      }
    }
  }, Q = () => {
    if (y || !E.current?.matches(":focus-visible"))
      return;
    const { transform: R, width: q, height: ae, autoPanOnNodeFocus: ie, setCenter: G } = z.getState();
    if (!ie)
      return;
    Ai(/* @__PURE__ */ new Map([[e, g]]), { x: 0, y: 0, width: q, height: ae }, R, !0).length > 0 || G(g.position.x + A.width / 2, g.position.y + A.height / 2, {
      zoom: R[2]
    });
  };
  return a.jsx("div", { className: Ie([
    "react-flow__node",
    `react-flow__node-${k}`,
    {
      // this is overwritable by passing `nopan` as a class name
      [p]: P
    },
    g.className,
    {
      selected: g.selected,
      selectable: $,
      parent: S,
      draggable: P,
      dragging: _
    }
  ]), ref: E, style: {
    zIndex: x.z,
    transform: `translate(${x.positionAbsolute.x}px,${x.positionAbsolute.y}px)`,
    pointerEvents: D ? "all" : "none",
    visibility: H ? "visible" : "hidden",
    ...g.style,
    ...T
  }, "data-id": e, "data-testid": `rf__node-${e}`, onMouseEnter: W, onMouseMove: O, onMouseLeave: B, onContextMenu: U, onClick: ne, onDoubleClick: K, onKeyDown: j ? se : void 0, tabIndex: j ? 0 : void 0, onFocus: j ? Q : void 0, role: g.ariaRole ?? (j ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": y ? void 0 : `${Uc}-${v}`, "aria-label": g.ariaLabel, ...g.domAttributes, children: a.jsx(sy, { value: e, children: a.jsx(C, { id: e, data: g.data, type: k, positionAbsoluteX: x.positionAbsolute.x, positionAbsoluteY: x.positionAbsolute.y, selected: g.selected ?? !1, selectable: $, draggable: P, deletable: g.deletable ?? !0, isConnectable: F, sourcePosition: g.sourcePosition, targetPosition: g.targetPosition, dragging: _, dragHandle: g.dragHandle, zIndex: x.z, parentId: g.parentId, ...A }) }) });
}
var ky = Se(Ey);
const Iy = (e) => ({
  nodesDraggable: e.nodesDraggable,
  nodesConnectable: e.nodesConnectable,
  nodesFocusable: e.nodesFocusable,
  elementsSelectable: e.elementsSelectable,
  onError: e.onError
});
function ll(e) {
  const { nodesDraggable: t, nodesConnectable: n, nodesFocusable: o, elementsSelectable: r, onError: i } = ue(Iy, xe), s = vy(e.onlyRenderVisibleElements), c = Ny();
  return a.jsx("div", { className: "react-flow__nodes", style: dr, children: s.map((d) => (
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
    a.jsx(ky, { id: d, nodeTypes: e.nodeTypes, nodeExtent: e.nodeExtent, onClick: e.onNodeClick, onMouseEnter: e.onNodeMouseEnter, onMouseMove: e.onNodeMouseMove, onMouseLeave: e.onNodeMouseLeave, onContextMenu: e.onNodeContextMenu, onDoubleClick: e.onNodeDoubleClick, noDragClassName: e.noDragClassName, noPanClassName: e.noPanClassName, rfId: e.rfId, disableKeyboardA11y: e.disableKeyboardA11y, resizeObserver: c, nodesDraggable: t, nodesConnectable: n, nodesFocusable: o, elementsSelectable: r, nodeClickDistance: e.nodeClickDistance, onError: i }, d)
  )) });
}
ll.displayName = "NodeRenderer";
const Cy = Se(ll);
function jy(e) {
  return ue(he((n) => {
    if (!e)
      return n.edges.map((r) => r.id);
    const o = [];
    if (n.width && n.height)
      for (const r of n.edges) {
        const i = n.nodeLookup.get(r.source), s = n.nodeLookup.get(r.target);
        i && s && Sp({
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
const _y = ({ color: e = "none", strokeWidth: t = 1 }) => {
  const n = {
    strokeWidth: t,
    ...e && { stroke: e }
  };
  return a.jsx("polyline", { className: "arrow", style: n, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, Ay = ({ color: e = "none", strokeWidth: t = 1 }) => {
  const n = {
    strokeWidth: t,
    ...e && { stroke: e, fill: e }
  };
  return a.jsx("polyline", { className: "arrowclosed", style: n, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, ia = {
  [Wo.Arrow]: _y,
  [Wo.ArrowClosed]: Ay
};
function My(e) {
  const t = we();
  return me(() => Object.prototype.hasOwnProperty.call(ia, e) ? ia[e] : (t.getState().onError?.("009", Fe.error009(e)), null), [e]);
}
const Dy = ({ id: e, type: t, color: n, width: o = 12.5, height: r = 12.5, markerUnits: i = "strokeWidth", strokeWidth: s, orient: c = "auto-start-reverse" }) => {
  const d = My(t);
  return d ? a.jsx("marker", { className: "react-flow__arrowhead", id: e, markerWidth: `${o}`, markerHeight: `${r}`, viewBox: "-10 -10 20 20", markerUnits: i, orient: c, refX: "0", refY: "0", children: a.jsx(d, { color: n, strokeWidth: s }) }) : null;
}, dl = ({ defaultColor: e, rfId: t }) => {
  const n = ue((i) => i.edges), o = ue((i) => i.defaultEdgeOptions), r = me(() => Mp(n, {
    id: t,
    defaultColor: e,
    defaultMarkerStart: o?.markerStart,
    defaultMarkerEnd: o?.markerEnd
  }), [n, o, t, e]);
  return r.length ? a.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: a.jsx("defs", { children: r.map((i) => a.jsx(Dy, { id: i.id, type: i.type, color: i.color, width: i.width, height: i.height, markerUnits: i.markerUnits, strokeWidth: i.strokeWidth, orient: i.orient }, i.id)) }) }) : null;
};
dl.displayName = "MarkerDefinitions";
var Py = Se(dl);
function ul({ x: e, y: t, label: n, labelStyle: o, labelShowBg: r = !0, labelBgStyle: i, labelBgPadding: s = [2, 4], labelBgBorderRadius: c = 2, children: d, className: l, ...u }) {
  const [f, h] = Y({ x: 1, y: 0, width: 0, height: 0 }), p = Ie(["react-flow__edge-textwrapper", l]), y = ce(null);
  return oe(() => {
    if (y.current) {
      const v = y.current.getBBox();
      h({
        x: v.x,
        y: v.y,
        width: v.width,
        height: v.height
      });
    }
  }, [n]), n ? a.jsxs("g", { transform: `translate(${e - f.width / 2} ${t - f.height / 2})`, className: p, visibility: f.width ? "visible" : "hidden", ...u, children: [r && a.jsx("rect", { width: f.width + 2 * s[0], x: -s[0], y: -s[1], height: f.height + 2 * s[1], className: "react-flow__edge-textbg", style: i, rx: c, ry: c }), a.jsx("text", { className: "react-flow__edge-text", y: f.height / 2, dy: "0.3em", ref: y, style: o, children: n }), d] }) : null;
}
ul.displayName = "EdgeText";
const $y = Se(ul);
function Un({ path: e, labelX: t, labelY: n, label: o, labelStyle: r, labelShowBg: i, labelBgStyle: s, labelBgPadding: c, labelBgBorderRadius: d, interactionWidth: l = 20, ...u }) {
  return a.jsxs(a.Fragment, { children: [a.jsx("path", { ...u, d: e, fill: "none", className: Ie(["react-flow__edge-path", u.className]) }), l ? a.jsx("path", { d: e, fill: "none", strokeOpacity: 0, strokeWidth: l, className: "react-flow__edge-interaction" }) : null, o && Ze(t) && Ze(n) ? a.jsx($y, { x: t, y: n, label: o, labelStyle: r, labelShowBg: i, labelBgStyle: s, labelBgPadding: c, labelBgBorderRadius: d }) : null] });
}
function sa({ pos: e, x1: t, y1: n, x2: o, y2: r }) {
  return e === te.Left || e === te.Right ? [0.5 * (t + o), n] : [t, 0.5 * (n + r)];
}
function fl({ sourceX: e, sourceY: t, sourcePosition: n = te.Bottom, targetX: o, targetY: r, targetPosition: i = te.Top }) {
  const [s, c] = sa({
    pos: n,
    x1: e,
    y1: t,
    x2: o,
    y2: r
  }), [d, l] = sa({
    pos: i,
    x1: o,
    y1: r,
    x2: e,
    y2: t
  }), [u, f, h, p] = Mc({
    sourceX: e,
    sourceY: t,
    targetX: o,
    targetY: r,
    sourceControlX: s,
    sourceControlY: c,
    targetControlX: d,
    targetControlY: l
  });
  return [
    `M${e},${t} C${s},${c} ${d},${l} ${o},${r}`,
    u,
    f,
    h,
    p
  ];
}
function hl(e) {
  return Se(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: i, sourcePosition: s, targetPosition: c, label: d, labelStyle: l, labelShowBg: u, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p, style: y, markerEnd: v, markerStart: w, interactionWidth: m }) => {
    const [N, g, x] = fl({
      sourceX: n,
      sourceY: o,
      sourcePosition: s,
      targetX: r,
      targetY: i,
      targetPosition: c
    }), S = e.isInternal ? void 0 : t;
    return a.jsx(Un, { id: S, path: N, labelX: g, labelY: x, label: d, labelStyle: l, labelShowBg: u, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p, style: y, markerEnd: v, markerStart: w, interactionWidth: m });
  });
}
const Ty = hl({ isInternal: !1 }), pl = hl({ isInternal: !0 });
Ty.displayName = "SimpleBezierEdge";
pl.displayName = "SimpleBezierEdgeInternal";
function gl(e) {
  return Se(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: i, label: s, labelStyle: c, labelShowBg: d, labelBgStyle: l, labelBgPadding: u, labelBgBorderRadius: f, style: h, sourcePosition: p = te.Bottom, targetPosition: y = te.Top, markerEnd: v, markerStart: w, pathOptions: m, interactionWidth: N }) => {
    const [g, x, S] = Yo({
      sourceX: n,
      sourceY: o,
      sourcePosition: p,
      targetX: r,
      targetY: i,
      targetPosition: y,
      borderRadius: m?.borderRadius,
      offset: m?.offset,
      stepPosition: m?.stepPosition
    }), k = e.isInternal ? void 0 : t;
    return a.jsx(Un, { id: k, path: g, labelX: x, labelY: S, label: s, labelStyle: c, labelShowBg: d, labelBgStyle: l, labelBgPadding: u, labelBgBorderRadius: f, style: h, markerEnd: v, markerStart: w, interactionWidth: N });
  });
}
const yl = gl({ isInternal: !1 }), ml = gl({ isInternal: !0 });
yl.displayName = "SmoothStepEdge";
ml.displayName = "SmoothStepEdgeInternal";
function xl(e) {
  return Se(({ id: t, ...n }) => {
    const o = e.isInternal ? void 0 : t;
    return a.jsx(yl, { ...n, id: o, pathOptions: me(() => ({ borderRadius: 0, offset: n.pathOptions?.offset }), [n.pathOptions?.offset]) });
  });
}
const zy = xl({ isInternal: !1 }), wl = xl({ isInternal: !0 });
zy.displayName = "StepEdge";
wl.displayName = "StepEdgeInternal";
function vl(e) {
  return Se(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: i, label: s, labelStyle: c, labelShowBg: d, labelBgStyle: l, labelBgPadding: u, labelBgBorderRadius: f, style: h, markerEnd: p, markerStart: y, interactionWidth: v }) => {
    const [w, m, N] = Tc({ sourceX: n, sourceY: o, targetX: r, targetY: i }), g = e.isInternal ? void 0 : t;
    return a.jsx(Un, { id: g, path: w, labelX: m, labelY: N, label: s, labelStyle: c, labelShowBg: d, labelBgStyle: l, labelBgPadding: u, labelBgBorderRadius: f, style: h, markerEnd: p, markerStart: y, interactionWidth: v });
  });
}
const Ry = vl({ isInternal: !1 }), bl = vl({ isInternal: !0 });
Ry.displayName = "StraightEdge";
bl.displayName = "StraightEdgeInternal";
function Nl(e) {
  return Se(({ id: t, sourceX: n, sourceY: o, targetX: r, targetY: i, sourcePosition: s = te.Bottom, targetPosition: c = te.Top, label: d, labelStyle: l, labelShowBg: u, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p, style: y, markerEnd: v, markerStart: w, pathOptions: m, interactionWidth: N }) => {
    const [g, x, S] = Dc({
      sourceX: n,
      sourceY: o,
      sourcePosition: s,
      targetX: r,
      targetY: i,
      targetPosition: c,
      curvature: m?.curvature
    }), k = e.isInternal ? void 0 : t;
    return a.jsx(Un, { id: k, path: g, labelX: x, labelY: S, label: d, labelStyle: l, labelShowBg: u, labelBgStyle: f, labelBgPadding: h, labelBgBorderRadius: p, style: y, markerEnd: v, markerStart: w, interactionWidth: N });
  });
}
const Ly = Nl({ isInternal: !1 }), Sl = Nl({ isInternal: !0 });
Ly.displayName = "BezierEdge";
Sl.displayName = "BezierEdgeInternal";
const aa = {
  default: Sl,
  straight: bl,
  step: wl,
  smoothstep: ml,
  simplebezier: pl
}, ca = {
  sourceX: null,
  sourceY: null,
  targetX: null,
  targetY: null,
  sourcePosition: null,
  targetPosition: null
}, Vy = (e, t, n) => n === te.Left ? e - t : n === te.Right ? e + t : e, Hy = (e, t, n) => n === te.Top ? e - t : n === te.Bottom ? e + t : e, la = "react-flow__edgeupdater";
function da({ position: e, centerX: t, centerY: n, radius: o = 10, onMouseDown: r, onMouseEnter: i, onMouseOut: s, type: c }) {
  return a.jsx("circle", { onMouseDown: r, onMouseEnter: i, onMouseOut: s, className: Ie([la, `${la}-${c}`]), cx: Vy(t, o, e), cy: Hy(n, o, e), r: o, stroke: "transparent", fill: "transparent" });
}
function Oy({ isReconnectable: e, reconnectRadius: t, edge: n, sourceX: o, sourceY: r, targetX: i, targetY: s, sourcePosition: c, targetPosition: d, onReconnect: l, onReconnectStart: u, onReconnectEnd: f, setReconnecting: h, setUpdateHover: p }) {
  const y = we(), v = (x, S) => {
    if (x.button !== 0)
      return;
    const { autoPanOnConnect: k, domNode: C, connectionMode: P, connectionRadius: $, lib: F, onConnectStart: j, cancelConnection: z, nodeLookup: H, rfId: E, panBy: _, updateConnection: I } = y.getState(), A = S.type === "target", T = (O, B) => {
      h(!1), f?.(O, n, S.type, B);
    }, D = (O) => l?.(n, O), W = (O, B) => {
      h(!0), u?.(x, n, S.type), j?.(O, B);
    };
    fi.onPointerDown(x.nativeEvent, {
      autoPanOnConnect: k,
      connectionMode: P,
      connectionRadius: $,
      domNode: C,
      handleId: S.id,
      nodeId: S.nodeId,
      nodeLookup: H,
      isTarget: A,
      edgeUpdaterType: S.type,
      lib: F,
      flowId: E,
      cancelConnection: z,
      panBy: _,
      isValidConnection: (...O) => y.getState().isValidConnection?.(...O) ?? !0,
      onConnect: D,
      onConnectStart: W,
      onConnectEnd: (...O) => y.getState().onConnectEnd?.(...O),
      onReconnectEnd: T,
      updateConnection: I,
      getTransform: () => y.getState().transform,
      getFromHandle: () => y.getState().connection.fromHandle,
      dragThreshold: y.getState().connectionDragThreshold,
      handleDomNode: x.currentTarget
    });
  }, w = (x) => v(x, { nodeId: n.target, id: n.targetHandle ?? null, type: "target" }), m = (x) => v(x, { nodeId: n.source, id: n.sourceHandle ?? null, type: "source" }), N = () => p(!0), g = () => p(!1);
  return a.jsxs(a.Fragment, { children: [(e === !0 || e === "source") && a.jsx(da, { position: c, centerX: o, centerY: r, radius: t, onMouseDown: w, onMouseEnter: N, onMouseOut: g, type: "source" }), (e === !0 || e === "target") && a.jsx(da, { position: d, centerX: i, centerY: s, radius: t, onMouseDown: m, onMouseEnter: N, onMouseOut: g, type: "target" })] });
}
function Fy({ id: e, edgesFocusable: t, edgesReconnectable: n, elementsSelectable: o, onClick: r, onDoubleClick: i, onContextMenu: s, onMouseEnter: c, onMouseMove: d, onMouseLeave: l, reconnectRadius: u, onReconnect: f, onReconnectStart: h, onReconnectEnd: p, rfId: y, edgeTypes: v, noPanClassName: w, onError: m, disableKeyboardA11y: N }) {
  let g = ue((G) => G.edgeLookup.get(e));
  const x = ue((G) => G.defaultEdgeOptions);
  g = x ? { ...x, ...g } : g;
  let S = g.type || "default", k = v?.[S] || aa[S];
  k === void 0 && (m?.("011", Fe.error011(S)), S = "default", k = v?.default || aa.default);
  const C = !!(g.focusable || t && typeof g.focusable > "u"), P = typeof f < "u" && (g.reconnectable || n && typeof g.reconnectable > "u"), $ = !!(g.selectable || o && typeof g.selectable > "u"), F = ce(null), [j, z] = Y(!1), [H, E] = Y(!1), _ = we(), { zIndex: I, sourceX: A, sourceY: T, targetX: D, targetY: W, sourcePosition: O, targetPosition: B } = ue(he((G) => {
    const ee = G.nodeLookup.get(g.source), le = G.nodeLookup.get(g.target);
    if (!ee || !le)
      return {
        zIndex: g.zIndex,
        ...ca
      };
    const V = Ap({
      id: e,
      sourceNode: ee,
      targetNode: le,
      sourceHandle: g.sourceHandle || null,
      targetHandle: g.targetHandle || null,
      connectionMode: G.connectionMode,
      onError: m
    });
    return {
      zIndex: Np({
        selected: g.selected,
        zIndex: g.zIndex,
        sourceNode: ee,
        targetNode: le,
        elevateOnSelect: G.elevateEdgesOnSelect,
        zIndexMode: G.zIndexMode
      }),
      ...V || ca
    };
  }, [g.source, g.target, g.sourceHandle, g.targetHandle, g.selected, g.zIndex]), xe), U = me(() => g.markerStart ? `url('#${di(g.markerStart, y)}')` : void 0, [g.markerStart, y]), K = me(() => g.markerEnd ? `url('#${di(g.markerEnd, y)}')` : void 0, [g.markerEnd, y]);
  if (g.hidden || A === null || T === null || D === null || W === null)
    return null;
  const ne = (G) => {
    const { addSelectedEdges: ee, unselectNodesAndEdges: le, multiSelectionActive: V } = _.getState();
    $ && (_.setState({ nodesSelectionActive: !1 }), g.selected && V ? (le({ nodes: [], edges: [g] }), F.current?.blur()) : ee([e])), r && r(G, g);
  }, se = i ? (G) => {
    i(G, { ...g });
  } : void 0, Q = s ? (G) => {
    s(G, { ...g });
  } : void 0, R = c ? (G) => {
    c(G, { ...g });
  } : void 0, q = d ? (G) => {
    d(G, { ...g });
  } : void 0, ae = l ? (G) => {
    l(G, { ...g });
  } : void 0, ie = (G) => {
    if (!N && mc.includes(G.key) && $) {
      const { unselectNodesAndEdges: ee, addSelectedEdges: le } = _.getState();
      G.key === "Escape" ? (F.current?.blur(), ee({ edges: [g] })) : le([e]);
    }
  };
  return a.jsx("svg", { style: { zIndex: I }, children: a.jsxs("g", { className: Ie([
    "react-flow__edge",
    `react-flow__edge-${S}`,
    g.className,
    w,
    {
      selected: g.selected,
      animated: g.animated,
      inactive: !$ && !r,
      updating: j,
      selectable: $
    }
  ]), onClick: ne, onDoubleClick: se, onContextMenu: Q, onMouseEnter: R, onMouseMove: q, onMouseLeave: ae, onKeyDown: C ? ie : void 0, tabIndex: C ? 0 : void 0, role: g.ariaRole ?? (C ? "group" : "img"), "aria-roledescription": "edge", "data-id": e, "data-testid": `rf__edge-${e}`, "aria-label": g.ariaLabel === null ? void 0 : g.ariaLabel || `Edge from ${g.source} to ${g.target}`, "aria-describedby": C ? `${Kc}-${y}` : void 0, ref: F, ...g.domAttributes, children: [!H && a.jsx(k, { id: e, source: g.source, target: g.target, type: g.type, selected: g.selected, animated: g.animated, selectable: $, deletable: g.deletable ?? !0, label: g.label, labelStyle: g.labelStyle, labelShowBg: g.labelShowBg, labelBgStyle: g.labelBgStyle, labelBgPadding: g.labelBgPadding, labelBgBorderRadius: g.labelBgBorderRadius, sourceX: A, sourceY: T, targetX: D, targetY: W, sourcePosition: O, targetPosition: B, data: g.data, style: g.style, sourceHandleId: g.sourceHandle, targetHandleId: g.targetHandle, markerStart: U, markerEnd: K, pathOptions: "pathOptions" in g ? g.pathOptions : void 0, interactionWidth: g.interactionWidth }), P && a.jsx(Oy, { edge: g, isReconnectable: P, reconnectRadius: u, onReconnect: f, onReconnectStart: h, onReconnectEnd: p, sourceX: A, sourceY: T, targetX: D, targetY: W, sourcePosition: O, targetPosition: B, setUpdateHover: z, setReconnecting: E })] }) });
}
var By = Se(Fy);
const Wy = (e) => ({
  edgesFocusable: e.edgesFocusable,
  edgesReconnectable: e.edgesReconnectable,
  elementsSelectable: e.elementsSelectable,
  connectionMode: e.connectionMode,
  onError: e.onError
});
function El({ defaultMarkerColor: e, onlyRenderVisibleElements: t, rfId: n, edgeTypes: o, noPanClassName: r, onReconnect: i, onEdgeContextMenu: s, onEdgeMouseEnter: c, onEdgeMouseMove: d, onEdgeMouseLeave: l, onEdgeClick: u, reconnectRadius: f, onEdgeDoubleClick: h, onReconnectStart: p, onReconnectEnd: y, disableKeyboardA11y: v }) {
  const { edgesFocusable: w, edgesReconnectable: m, elementsSelectable: N, onError: g } = ue(Wy, xe), x = jy(t);
  return a.jsxs("div", { className: "react-flow__edges", children: [a.jsx(Py, { defaultColor: e, rfId: n }), x.map((S) => a.jsx(By, { id: S, edgesFocusable: w, edgesReconnectable: m, elementsSelectable: N, noPanClassName: r, onReconnect: i, onContextMenu: s, onMouseEnter: c, onMouseMove: d, onMouseLeave: l, onClick: u, reconnectRadius: f, onDoubleClick: h, onReconnectStart: p, onReconnectEnd: y, rfId: n, onError: g, edgeTypes: o, disableKeyboardA11y: v }, S))] });
}
El.displayName = "EdgeRenderer";
const Xy = Se(El), Yy = (e) => `translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]})`;
function qy({ children: e }) {
  const t = ue(Yy);
  return a.jsx("div", { className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: t }, children: e });
}
function Zy(e) {
  const t = Vi(), n = ce(!1);
  oe(() => {
    !n.current && t.viewportInitialized && e && (setTimeout(() => e(t), 1), n.current = !0);
  }, [e, t.viewportInitialized]);
}
const Uy = (e) => e.panZoom?.syncViewport;
function Ky(e) {
  const t = ue(Uy), n = we();
  return oe(() => {
    e && (t?.(e), n.setState({ transform: [e.x, e.y, e.zoom] }));
  }, [e, t]), null;
}
function Gy(e) {
  return e.connection.inProgress ? { ...e.connection, to: rn(e.connection.to, e.transform) } : { ...e.connection };
}
function Jy(e) {
  return Gy;
}
function Qy(e) {
  const t = Jy();
  return ue(t, xe);
}
const em = (e) => ({
  nodesConnectable: e.nodesConnectable,
  isValid: e.connection.isValid,
  inProgress: e.connection.inProgress,
  width: e.width,
  height: e.height
});
function tm({ containerStyle: e, style: t, type: n, component: o }) {
  const { nodesConnectable: r, width: i, height: s, isValid: c, inProgress: d } = ue(em, xe);
  return !(i && r && d) ? null : a.jsx("svg", { style: e, width: i, height: s, className: "react-flow__connectionline react-flow__container", children: a.jsx("g", { className: Ie(["react-flow__connection", vc(c)]), children: a.jsx(kl, { style: t, type: n, CustomComponent: o, isValid: c }) }) });
}
const kl = ({ style: e, type: t = pt.Bezier, CustomComponent: n, isValid: o }) => {
  const { inProgress: r, from: i, fromNode: s, fromHandle: c, fromPosition: d, to: l, toNode: u, toHandle: f, toPosition: h, pointer: p } = Qy();
  if (!r)
    return;
  if (n)
    return a.jsx(n, { connectionLineType: t, connectionLineStyle: e, fromNode: s, fromHandle: c, fromX: i.x, fromY: i.y, toX: l.x, toY: l.y, fromPosition: d, toPosition: h, connectionStatus: vc(o), toNode: u, toHandle: f, pointer: p });
  let y = "";
  const v = {
    sourceX: i.x,
    sourceY: i.y,
    sourcePosition: d,
    targetX: l.x,
    targetY: l.y,
    targetPosition: h
  };
  switch (t) {
    case pt.Bezier:
      [y] = Dc(v);
      break;
    case pt.SimpleBezier:
      [y] = fl(v);
      break;
    case pt.Step:
      [y] = Yo({
        ...v,
        borderRadius: 0
      });
      break;
    case pt.SmoothStep:
      [y] = Yo(v);
      break;
    default:
      [y] = Tc(v);
  }
  return a.jsx("path", { d: y, fill: "none", className: "react-flow__connection-path", style: e });
};
kl.displayName = "ConnectionLine";
const nm = {};
function ua(e = nm) {
  ce(e), we(), oe(() => {
  }, [e]);
}
function om() {
  we(), ce(!1), oe(() => {
  }, []);
}
function Il({ nodeTypes: e, edgeTypes: t, onInit: n, onNodeClick: o, onEdgeClick: r, onNodeDoubleClick: i, onEdgeDoubleClick: s, onNodeMouseEnter: c, onNodeMouseMove: d, onNodeMouseLeave: l, onNodeContextMenu: u, onSelectionContextMenu: f, onSelectionStart: h, onSelectionEnd: p, connectionLineType: y, connectionLineStyle: v, connectionLineComponent: w, connectionLineContainerStyle: m, selectionKeyCode: N, selectionOnDrag: g, selectionMode: x, multiSelectionKeyCode: S, panActivationKeyCode: k, zoomActivationKeyCode: C, deleteKeyCode: P, onlyRenderVisibleElements: $, elementsSelectable: F, defaultViewport: j, translateExtent: z, minZoom: H, maxZoom: E, preventScrolling: _, defaultMarkerColor: I, zoomOnScroll: A, zoomOnPinch: T, panOnScroll: D, panOnScrollSpeed: W, panOnScrollMode: O, zoomOnDoubleClick: B, panOnDrag: U, autoPanOnSelection: K, onPaneClick: ne, onPaneMouseEnter: se, onPaneMouseMove: Q, onPaneMouseLeave: R, onPaneScroll: q, onPaneContextMenu: ae, paneClickDistance: ie, nodeClickDistance: G, onEdgeContextMenu: ee, onEdgeMouseEnter: le, onEdgeMouseMove: V, onEdgeMouseLeave: Z, reconnectRadius: pe, onReconnect: ge, onReconnectStart: _e, onReconnectEnd: ye, noDragClassName: Ae, noWheelClassName: wt, noPanClassName: ot, disableKeyboardA11y: rt, nodeExtent: Pe, rfId: Ee, viewport: $e, onViewportChange: We }) {
  return ua(e), ua(t), om(), Zy(n), Ky($e), a.jsx(xy, { onPaneClick: ne, onPaneMouseEnter: se, onPaneMouseMove: Q, onPaneMouseLeave: R, onPaneContextMenu: ae, onPaneScroll: q, paneClickDistance: ie, deleteKeyCode: P, selectionKeyCode: N, selectionOnDrag: g, selectionMode: x, onSelectionStart: h, onSelectionEnd: p, multiSelectionKeyCode: S, panActivationKeyCode: k, zoomActivationKeyCode: C, elementsSelectable: F, zoomOnScroll: A, zoomOnPinch: T, zoomOnDoubleClick: B, panOnScroll: D, panOnScrollSpeed: W, panOnScrollMode: O, panOnDrag: U, autoPanOnSelection: K, defaultViewport: j, translateExtent: z, minZoom: H, maxZoom: E, onSelectionContextMenu: f, preventScrolling: _, noDragClassName: Ae, noWheelClassName: wt, noPanClassName: ot, disableKeyboardA11y: rt, onViewportChange: We, isControlledViewport: !!$e, children: a.jsxs(qy, { children: [a.jsx(Xy, { edgeTypes: t, onEdgeClick: r, onEdgeDoubleClick: s, onReconnect: ge, onReconnectStart: _e, onReconnectEnd: ye, onlyRenderVisibleElements: $, onEdgeContextMenu: ee, onEdgeMouseEnter: le, onEdgeMouseMove: V, onEdgeMouseLeave: Z, reconnectRadius: pe, defaultMarkerColor: I, noPanClassName: ot, disableKeyboardA11y: rt, rfId: Ee }), a.jsx(tm, { style: v, type: y, component: w, containerStyle: m }), a.jsx("div", { className: "react-flow__edgelabel-renderer" }), a.jsx(Cy, { nodeTypes: e, onNodeClick: o, onNodeDoubleClick: i, onNodeMouseEnter: c, onNodeMouseMove: d, onNodeMouseLeave: l, onNodeContextMenu: u, nodeClickDistance: G, onlyRenderVisibleElements: $, noPanClassName: ot, noDragClassName: Ae, disableKeyboardA11y: rt, nodeExtent: Pe, rfId: Ee }), a.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
Il.displayName = "GraphView";
const rm = Se(Il), im = kc(), fa = ({ nodes: e, edges: t, defaultNodes: n, defaultEdges: o, width: r, height: i, fitView: s, fitViewOptions: c, minZoom: d = 0.5, maxZoom: l = 2, nodeOrigin: u, nodeExtent: f, zIndexMode: h = "basic" } = {}) => {
  const p = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), m = o ?? t ?? [], N = n ?? e ?? [], g = u ?? [0, 0], x = f ?? Rn;
  Lc(v, w, m);
  const { nodesInitialized: S } = ui(N, p, y, {
    nodeOrigin: g,
    nodeExtent: x,
    zIndexMode: h
  });
  let k = [0, 0, 1];
  if (s && r && i) {
    const C = qn(p, {
      filter: (j) => !!((j.width || j.initialWidth) && (j.height || j.initialHeight))
    }), { x: P, y: $, zoom: F } = Di(C, r, i, d, l, c?.padding ?? 0.1);
    k = [P, $, F];
  }
  return {
    rfId: "1",
    width: r ?? 0,
    height: i ?? 0,
    transform: k,
    nodes: N,
    nodesInitialized: S,
    nodeLookup: p,
    parentLookup: y,
    edges: m,
    edgeLookup: w,
    connectionLookup: v,
    onNodesChange: null,
    onEdgesChange: null,
    hasDefaultNodes: n !== void 0,
    hasDefaultEdges: o !== void 0,
    panZoom: null,
    minZoom: d,
    maxZoom: l,
    translateExtent: Rn,
    nodeExtent: x,
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    connectionMode: Jt.Strict,
    domNode: null,
    paneDragging: !1,
    noPanClassName: "nopan",
    nodeOrigin: g,
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
    connection: { ...wc },
    connectionClickStartHandle: null,
    connectOnClick: !0,
    ariaLiveMessage: "",
    autoPanOnConnect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnNodeFocus: !0,
    autoPanSpeed: 15,
    connectionRadius: 20,
    onError: im,
    isValidConnection: void 0,
    onSelectionChangeHandlers: [],
    lib: "react",
    debug: !1,
    ariaLabelConfig: xc,
    zIndexMode: h,
    onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(),
    onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map()
  };
}, sm = ({ nodes: e, edges: t, defaultNodes: n, defaultEdges: o, width: r, height: i, fitView: s, fitViewOptions: c, minZoom: d, maxZoom: l, nodeOrigin: u, nodeExtent: f, zIndexMode: h }) => wg((p, y) => {
  async function v() {
    const { nodeLookup: w, panZoom: m, fitViewOptions: N, fitViewResolver: g, width: x, height: S, minZoom: k, maxZoom: C } = y();
    m && (await gp({
      nodes: w,
      width: x,
      height: S,
      panZoom: m,
      minZoom: k,
      maxZoom: C
    }, N), g?.resolve(!0), p({ fitViewResolver: null }));
  }
  return {
    ...fa({
      nodes: e,
      edges: t,
      width: r,
      height: i,
      fitView: s,
      fitViewOptions: c,
      minZoom: d,
      maxZoom: l,
      nodeOrigin: u,
      nodeExtent: f,
      defaultNodes: n,
      defaultEdges: o,
      zIndexMode: h
    }),
    setNodes: (w) => {
      const { nodeLookup: m, parentLookup: N, nodeOrigin: g, elevateNodesOnSelect: x, fitViewQueued: S, zIndexMode: k, nodesSelectionActive: C } = y(), { nodesInitialized: P, hasSelectedNodes: $ } = ui(w, m, N, {
        nodeOrigin: g,
        nodeExtent: f,
        elevateNodesOnSelect: x,
        checkEquality: !0,
        zIndexMode: k
      }), F = C && $;
      S && P ? (v(), p({
        nodes: w,
        nodesInitialized: P,
        fitViewQueued: !1,
        fitViewOptions: void 0,
        nodesSelectionActive: F
      })) : p({ nodes: w, nodesInitialized: P, nodesSelectionActive: F });
    },
    setEdges: (w) => {
      const { connectionLookup: m, edgeLookup: N } = y();
      Lc(m, N, w), p({ edges: w });
    },
    setDefaultNodesAndEdges: (w, m) => {
      if (w) {
        const { setNodes: N } = y();
        N(w), p({ hasDefaultNodes: !0 });
      }
      if (m) {
        const { setEdges: N } = y();
        N(m), p({ hasDefaultEdges: !0 });
      }
    },
    /*
     * Every node gets registered at a ResizeObserver. Whenever a node
     * changes its dimensions, this function is called to measure the
     * new dimensions and update the nodes.
     */
    updateNodeInternals: (w) => {
      const { triggerNodeChanges: m, nodeLookup: N, parentLookup: g, domNode: x, nodeOrigin: S, nodeExtent: k, debug: C, fitViewQueued: P, zIndexMode: $ } = y(), { changes: F, updatedInternals: j } = Lp(w, N, g, x, S, k, $);
      j && ($p(N, g, { nodeOrigin: S, nodeExtent: k, zIndexMode: $ }), P ? (v(), p({ fitViewQueued: !1, fitViewOptions: void 0 })) : p({}), F?.length > 0 && (C && console.log("React Flow: trigger node changes", F), m?.(F)));
    },
    updateNodePositions: (w, m = !1) => {
      const N = [];
      let g = [];
      const { nodeLookup: x, triggerNodeChanges: S, connection: k, updateConnection: C, onNodesChangeMiddlewareMap: P } = y();
      for (const [$, F] of w) {
        const j = x.get($), z = !!(j?.expandParent && j?.parentId && F?.position), H = {
          id: $,
          type: "position",
          position: z ? {
            x: Math.max(0, F.position.x),
            y: Math.max(0, F.position.y)
          } : F.position,
          dragging: m
        };
        if (j && k.inProgress && k.fromNode.id === j.id) {
          const E = $t(j, k.fromHandle, te.Left, !0);
          C({ ...k, from: E });
        }
        z && j.parentId && N.push({
          id: $,
          parentId: j.parentId,
          rect: {
            ...F.internals.positionAbsolute,
            width: F.measured.width ?? 0,
            height: F.measured.height ?? 0
          }
        }), g.push(H);
      }
      if (N.length > 0) {
        const { parentLookup: $, nodeOrigin: F } = y(), j = Li(N, x, $, F);
        g.push(...j);
      }
      for (const $ of P.values())
        g = $(g);
      S(g);
    },
    triggerNodeChanges: (w) => {
      const { onNodesChange: m, setNodes: N, nodes: g, hasDefaultNodes: x, debug: S } = y();
      if (w?.length) {
        if (x) {
          const k = Qc(w, g);
          N(k);
        }
        S && console.log("React Flow: trigger node changes", w), m?.(w);
      }
    },
    triggerEdgeChanges: (w) => {
      const { onEdgesChange: m, setEdges: N, edges: g, hasDefaultEdges: x, debug: S } = y();
      if (w?.length) {
        if (x) {
          const k = el(w, g);
          N(k);
        }
        S && console.log("React Flow: trigger edge changes", w), m?.(w);
      }
    },
    addSelectedNodes: (w) => {
      const { multiSelectionActive: m, edgeLookup: N, nodeLookup: g, triggerNodeChanges: x, triggerEdgeChanges: S } = y();
      if (m) {
        const k = w.map((C) => kt(C, !0));
        x(k);
        return;
      }
      x(Yt(g, /* @__PURE__ */ new Set([...w]), !0)), S(Yt(N));
    },
    addSelectedEdges: (w) => {
      const { multiSelectionActive: m, edgeLookup: N, nodeLookup: g, triggerNodeChanges: x, triggerEdgeChanges: S } = y();
      if (m) {
        const k = w.map((C) => kt(C, !0));
        S(k);
        return;
      }
      S(Yt(N, /* @__PURE__ */ new Set([...w]))), x(Yt(g, /* @__PURE__ */ new Set(), !0));
    },
    unselectNodesAndEdges: ({ nodes: w, edges: m } = {}) => {
      const { edges: N, nodes: g, nodeLookup: x, triggerNodeChanges: S, triggerEdgeChanges: k } = y(), C = w || g, P = m || N, $ = [];
      for (const j of C) {
        if (!j.selected)
          continue;
        const z = x.get(j.id);
        z && (z.selected = !1), $.push(kt(j.id, !1));
      }
      const F = [];
      for (const j of P)
        j.selected && F.push(kt(j.id, !1));
      S($), k(F);
    },
    setMinZoom: (w) => {
      const { panZoom: m, maxZoom: N } = y();
      m?.setScaleExtent([w, N]), p({ minZoom: w });
    },
    setMaxZoom: (w) => {
      const { panZoom: m, minZoom: N } = y();
      m?.setScaleExtent([N, w]), p({ maxZoom: w });
    },
    setTranslateExtent: (w) => {
      y().panZoom?.setTranslateExtent(w), p({ translateExtent: w });
    },
    resetSelectedElements: () => {
      const { edges: w, nodes: m, triggerNodeChanges: N, triggerEdgeChanges: g, elementsSelectable: x } = y();
      if (!x)
        return;
      const S = m.reduce((C, P) => P.selected ? [...C, kt(P.id, !1)] : C, []), k = w.reduce((C, P) => P.selected ? [...C, kt(P.id, !1)] : C, []);
      N(S), g(k);
    },
    setNodeExtent: (w) => {
      const { nodes: m, nodeLookup: N, parentLookup: g, nodeOrigin: x, elevateNodesOnSelect: S, nodeExtent: k, zIndexMode: C } = y();
      w[0][0] === k[0][0] && w[0][1] === k[0][1] && w[1][0] === k[1][0] && w[1][1] === k[1][1] || (ui(m, N, g, {
        nodeOrigin: x,
        nodeExtent: w,
        elevateNodesOnSelect: S,
        checkEquality: !1,
        zIndexMode: C
      }), p({ nodeExtent: w }));
    },
    panBy: (w) => {
      const { transform: m, width: N, height: g, panZoom: x, translateExtent: S } = y();
      return Vp({ delta: w, panZoom: x, transform: m, translateExtent: S, width: N, height: g });
    },
    setCenter: async (w, m, N) => {
      const { width: g, height: x, maxZoom: S, panZoom: k } = y();
      if (!k)
        return !1;
      const C = typeof N?.zoom < "u" ? N.zoom : S;
      return await k.setViewport({
        x: g / 2 - w * C,
        y: x / 2 - m * C,
        zoom: C
      }, { duration: N?.duration, ease: N?.ease, interpolate: N?.interpolate }), !0;
    },
    cancelConnection: () => {
      p({
        connection: { ...wc }
      });
    },
    updateConnection: (w) => {
      p({ connection: w });
    },
    reset: () => p({ ...fa() })
  };
}, Object.is);
function am({ initialNodes: e, initialEdges: t, defaultNodes: n, defaultEdges: o, initialWidth: r, initialHeight: i, initialMinZoom: s, initialMaxZoom: c, initialFitViewOptions: d, fitView: l, nodeOrigin: u, nodeExtent: f, zIndexMode: h, children: p }) {
  const [y] = Y(() => sm({
    nodes: e,
    edges: t,
    defaultNodes: n,
    defaultEdges: o,
    width: r,
    height: i,
    fitView: l,
    minZoom: s,
    maxZoom: c,
    fitViewOptions: d,
    nodeOrigin: u,
    nodeExtent: f,
    zIndexMode: h
  }));
  return a.jsx(Sg, { value: y, children: a.jsx(qg, { children: p }) });
}
function cm({ children: e, nodes: t, edges: n, defaultNodes: o, defaultEdges: r, width: i, height: s, fitView: c, fitViewOptions: d, minZoom: l, maxZoom: u, nodeOrigin: f, nodeExtent: h, zIndexMode: p }) {
  return Bn(cr) ? a.jsx(a.Fragment, { children: e }) : a.jsx(am, { initialNodes: t, initialEdges: n, defaultNodes: o, defaultEdges: r, initialWidth: i, initialHeight: s, fitView: c, initialFitViewOptions: d, initialMinZoom: l, initialMaxZoom: u, nodeOrigin: f, nodeExtent: h, zIndexMode: p, children: e });
}
const lm = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
  zIndex: 0
};
function dm({ nodes: e, edges: t, defaultNodes: n, defaultEdges: o, className: r, nodeTypes: i, edgeTypes: s, onNodeClick: c, onEdgeClick: d, onInit: l, onMove: u, onMoveStart: f, onMoveEnd: h, onConnect: p, onConnectStart: y, onConnectEnd: v, onClickConnectStart: w, onClickConnectEnd: m, onNodeMouseEnter: N, onNodeMouseMove: g, onNodeMouseLeave: x, onNodeContextMenu: S, onNodeDoubleClick: k, onNodeDragStart: C, onNodeDrag: P, onNodeDragStop: $, onNodesDelete: F, onEdgesDelete: j, onDelete: z, onSelectionChange: H, onSelectionDragStart: E, onSelectionDrag: _, onSelectionDragStop: I, onSelectionContextMenu: A, onSelectionStart: T, onSelectionEnd: D, onBeforeDelete: W, connectionMode: O, connectionLineType: B = pt.Bezier, connectionLineStyle: U, connectionLineComponent: K, connectionLineContainerStyle: ne, deleteKeyCode: se = "Backspace", selectionKeyCode: Q = "Shift", selectionOnDrag: R = !1, selectionMode: q = Ln.Full, panActivationKeyCode: ae = "Space", multiSelectionKeyCode: ie = Hn() ? "Meta" : "Control", zoomActivationKeyCode: G = Hn() ? "Meta" : "Control", snapToGrid: ee, snapGrid: le, onlyRenderVisibleElements: V = !1, selectNodesOnDrag: Z, nodesDraggable: pe, autoPanOnNodeFocus: ge, nodesConnectable: _e, nodesFocusable: ye, nodeOrigin: Ae = Gc, edgesFocusable: wt, edgesReconnectable: ot, elementsSelectable: rt = !0, defaultViewport: Pe = zg, minZoom: Ee = 0.5, maxZoom: $e = 2, translateExtent: We = Rn, preventScrolling: an = !0, nodeExtent: Lt, defaultMarkerColor: cn = "#b1b1b7", zoomOnScroll: Vt = !0, zoomOnPinch: dt = !0, panOnScroll: vt = !1, panOnScrollSpeed: bt = 0.5, panOnScrollMode: Qe = jt.Free, zoomOnDoubleClick: Gn = !0, panOnDrag: Le = !0, onPaneClick: Jn, onPaneMouseEnter: be, onPaneMouseMove: Xe, onPaneMouseLeave: ln, onPaneScroll: Ne, onPaneContextMenu: Nt, paneClickDistance: dn = 1, nodeClickDistance: je = 0, children: St, onReconnect: ut, onReconnectStart: yr, onReconnectEnd: Qn, onEdgeContextMenu: eo, onEdgeDoubleClick: un, onEdgeMouseEnter: mr, onEdgeMouseMove: fn, onEdgeMouseLeave: Ht, reconnectRadius: Ve = 10, onNodesChange: hn, onEdgesChange: pn, noDragClassName: gn = "nodrag", noWheelClassName: Ot = "nowheel", noPanClassName: to = "nopan", fitView: no, fitViewOptions: oo, connectOnClick: xr, attributionPosition: ro, proOptions: io, defaultEdgeOptions: so, elevateNodesOnSelect: wr = !0, elevateEdgesOnSelect: yn = !1, disableKeyboardA11y: ao = !1, autoPanOnConnect: vr, autoPanOnNodeDrag: br, autoPanOnSelection: Nr = !0, autoPanSpeed: Sr, connectionRadius: mn, isValidConnection: Er, onError: kr, style: Ir, id: co, nodeDragThreshold: Cr, connectionDragThreshold: jr, viewport: _r, onViewportChange: lo, width: uo, height: Ar, colorMode: Mr = "light", debug: Dr, onScroll: fo, ariaLabelConfig: Pr, zIndexMode: xn = "basic", ...ho }, po) {
  const Ft = co || "1", go = Hg(Mr), $r = he((yo) => {
    yo.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), fo?.(yo);
  }, [fo]);
  return a.jsx("div", { "data-testid": "rf__wrapper", ...ho, onScroll: $r, style: { ...Ir, ...lm }, ref: po, className: Ie(["react-flow", r, go]), id: co, role: "application", children: a.jsxs(cm, { nodes: e, edges: t, width: uo, height: Ar, fitView: no, fitViewOptions: oo, minZoom: Ee, maxZoom: $e, nodeOrigin: Ae, nodeExtent: Lt, zIndexMode: xn, children: [a.jsx(Vg, { nodes: e, edges: t, defaultNodes: n, defaultEdges: o, onConnect: p, onConnectStart: y, onConnectEnd: v, onClickConnectStart: w, onClickConnectEnd: m, nodesDraggable: pe, autoPanOnNodeFocus: ge, nodesConnectable: _e, nodesFocusable: ye, edgesFocusable: wt, edgesReconnectable: ot, elementsSelectable: rt, elevateNodesOnSelect: wr, elevateEdgesOnSelect: yn, minZoom: Ee, maxZoom: $e, nodeExtent: Lt, onNodesChange: hn, onEdgesChange: pn, snapToGrid: ee, snapGrid: le, connectionMode: O, translateExtent: We, connectOnClick: xr, defaultEdgeOptions: so, fitView: no, fitViewOptions: oo, onNodesDelete: F, onEdgesDelete: j, onDelete: z, onNodeDragStart: C, onNodeDrag: P, onNodeDragStop: $, onSelectionDrag: _, onSelectionDragStart: E, onSelectionDragStop: I, onMove: u, onMoveStart: f, onMoveEnd: h, noPanClassName: to, nodeOrigin: Ae, rfId: Ft, autoPanOnConnect: vr, autoPanOnNodeDrag: br, autoPanSpeed: Sr, onError: kr, connectionRadius: mn, isValidConnection: Er, selectNodesOnDrag: Z, nodeDragThreshold: Cr, connectionDragThreshold: jr, onBeforeDelete: W, debug: Dr, ariaLabelConfig: Pr, zIndexMode: xn }), a.jsx(rm, { onInit: l, onNodeClick: c, onEdgeClick: d, onNodeMouseEnter: N, onNodeMouseMove: g, onNodeMouseLeave: x, onNodeContextMenu: S, onNodeDoubleClick: k, nodeTypes: i, edgeTypes: s, connectionLineType: B, connectionLineStyle: U, connectionLineComponent: K, connectionLineContainerStyle: ne, selectionKeyCode: Q, selectionOnDrag: R, selectionMode: q, deleteKeyCode: se, multiSelectionKeyCode: ie, panActivationKeyCode: ae, zoomActivationKeyCode: G, onlyRenderVisibleElements: V, defaultViewport: Pe, translateExtent: We, minZoom: Ee, maxZoom: $e, preventScrolling: an, zoomOnScroll: Vt, zoomOnPinch: dt, zoomOnDoubleClick: Gn, panOnScroll: vt, panOnScrollSpeed: bt, panOnScrollMode: Qe, panOnDrag: Le, autoPanOnSelection: Nr, onPaneClick: Jn, onPaneMouseEnter: be, onPaneMouseMove: Xe, onPaneMouseLeave: ln, onPaneScroll: Ne, onPaneContextMenu: Nt, paneClickDistance: dn, nodeClickDistance: je, onSelectionContextMenu: A, onSelectionStart: T, onSelectionEnd: D, onReconnect: ut, onReconnectStart: yr, onReconnectEnd: Qn, onEdgeContextMenu: eo, onEdgeDoubleClick: un, onEdgeMouseEnter: mr, onEdgeMouseMove: fn, onEdgeMouseLeave: Ht, reconnectRadius: Ve, defaultMarkerColor: cn, noDragClassName: gn, noWheelClassName: Ot, noPanClassName: to, rfId: Ft, disableKeyboardA11y: ao, nodeExtent: Lt, viewport: _r, onViewportChange: lo }), a.jsx(Tg, { onSelectionChange: H }), St, a.jsx(Ag, { proOptions: io, position: ro }), a.jsx(_g, { rfId: Ft, disableKeyboardA11y: ao })] }) });
}
var Cl = ol(dm);
const um = (e) => e.domNode?.querySelector(".react-flow__edgelabel-renderer");
function fm({ children: e }) {
  const t = ue(um);
  return t ? Ng.createPortal(e, t) : null;
}
function hm({ dimensions: e, lineWidth: t, variant: n, className: o }) {
  return a.jsx("path", { strokeWidth: t, d: `M${e[0] / 2} 0 V${e[1]} M0 ${e[1] / 2} H${e[0]}`, className: Ie(["react-flow__background-pattern", n, o]) });
}
function pm({ radius: e, className: t }) {
  return a.jsx("circle", { cx: e, cy: e, r: e, className: Ie(["react-flow__background-pattern", "dots", t]) });
}
var gt;
(function(e) {
  e.Lines = "lines", e.Dots = "dots", e.Cross = "cross";
})(gt || (gt = {}));
const gm = {
  [gt.Dots]: 1,
  [gt.Lines]: 1,
  [gt.Cross]: 6
}, ym = (e) => ({ transform: e.transform, patternId: `pattern-${e.rfId}` });
function jl({
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
  style: d,
  className: l,
  patternClassName: u
}) {
  const f = ce(null), { transform: h, patternId: p } = ue(ym, xe), y = o || gm[t], v = t === gt.Dots, w = t === gt.Cross, m = Array.isArray(n) ? n : [n, n], N = [m[0] * h[2] || 1, m[1] * h[2] || 1], g = y * h[2], x = Array.isArray(i) ? i : [i, i], S = w ? [g, g] : N, k = [
    x[0] * h[2] || 1 + S[0] / 2,
    x[1] * h[2] || 1 + S[1] / 2
  ], C = `${p}${e || ""}`;
  return a.jsxs("svg", { className: Ie(["react-flow__background", l]), style: {
    ...d,
    ...dr,
    "--xy-background-color-props": c,
    "--xy-background-pattern-color-props": s
  }, ref: f, "data-testid": "rf__background", children: [a.jsx("pattern", { id: C, x: h[0] % N[0], y: h[1] % N[1], width: N[0], height: N[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${k[0]},-${k[1]})`, children: v ? a.jsx(pm, { radius: g / 2, className: u }) : a.jsx(hm, { dimensions: S, lineWidth: r, variant: t, className: u }) }), a.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${C})` })] });
}
jl.displayName = "Background";
const _l = Se(jl);
function mm() {
  return a.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: a.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function xm() {
  return a.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: a.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function wm() {
  return a.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: a.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function vm() {
  return a.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: a.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function bm() {
  return a.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: a.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function Io({ children: e, className: t, ...n }) {
  return a.jsx("button", { type: "button", className: Ie(["react-flow__controls-button", t]), ...n, children: e });
}
const Nm = (e) => ({
  isInteractive: e.nodesDraggable || e.nodesConnectable || e.elementsSelectable,
  minZoomReached: e.transform[2] <= e.minZoom,
  maxZoomReached: e.transform[2] >= e.maxZoom,
  ariaLabelConfig: e.ariaLabelConfig
});
function Al({ style: e, showZoom: t = !0, showFitView: n = !0, showInteractive: o = !0, fitViewOptions: r, onZoomIn: i, onZoomOut: s, onFitView: c, onInteractiveChange: d, className: l, children: u, position: f = "bottom-left", orientation: h = "vertical", "aria-label": p }) {
  const y = we(), { isInteractive: v, minZoomReached: w, maxZoomReached: m, ariaLabelConfig: N } = ue(Nm, xe), { zoomIn: g, zoomOut: x, fitView: S } = Vi(), k = () => {
    g(), i?.();
  }, C = () => {
    x(), s?.();
  }, P = () => {
    S(r), c?.();
  }, $ = () => {
    y.setState({
      nodesDraggable: !v,
      nodesConnectable: !v,
      elementsSelectable: !v
    }), d?.(!v);
  }, F = h === "horizontal" ? "horizontal" : "vertical";
  return a.jsxs(lr, { className: Ie(["react-flow__controls", F, l]), position: f, style: e, "data-testid": "rf__controls", "aria-label": p ?? N["controls.ariaLabel"], children: [t && a.jsxs(a.Fragment, { children: [a.jsx(Io, { onClick: k, className: "react-flow__controls-zoomin", title: N["controls.zoomIn.ariaLabel"], "aria-label": N["controls.zoomIn.ariaLabel"], disabled: m, children: a.jsx(mm, {}) }), a.jsx(Io, { onClick: C, className: "react-flow__controls-zoomout", title: N["controls.zoomOut.ariaLabel"], "aria-label": N["controls.zoomOut.ariaLabel"], disabled: w, children: a.jsx(xm, {}) })] }), n && a.jsx(Io, { className: "react-flow__controls-fitview", onClick: P, title: N["controls.fitView.ariaLabel"], "aria-label": N["controls.fitView.ariaLabel"], children: a.jsx(wm, {}) }), o && a.jsx(Io, { className: "react-flow__controls-interactive", onClick: $, title: N["controls.interactive.ariaLabel"], "aria-label": N["controls.interactive.ariaLabel"], children: v ? a.jsx(bm, {}) : a.jsx(vm, {}) }), u] });
}
Al.displayName = "Controls";
const Ml = Se(Al);
function Sm({ id: e, x: t, y: n, width: o, height: r, style: i, color: s, strokeColor: c, strokeWidth: d, className: l, borderRadius: u, shapeRendering: f, selected: h, onClick: p }) {
  const { background: y, backgroundColor: v } = i || {}, w = s || y || v;
  return a.jsx("rect", { className: Ie(["react-flow__minimap-node", { selected: h }, l]), x: t, y: n, rx: u, ry: u, width: o, height: r, style: {
    fill: w,
    stroke: c,
    strokeWidth: d
  }, shapeRendering: f, onClick: p ? (m) => p(m, e) : void 0 });
}
const Em = Se(Sm), km = (e) => e.nodes.map((t) => t.id), Gr = (e) => e instanceof Function ? e : () => e;
function Im({
  nodeStrokeColor: e,
  nodeColor: t,
  nodeClassName: n = "",
  nodeBorderRadius: o = 5,
  nodeStrokeWidth: r,
  /*
   * We need to rename the prop to be `CapitalCase` so that JSX will render it as
   * a component properly.
   */
  nodeComponent: i = Em,
  onClick: s
}) {
  const c = ue(km, xe), d = Gr(t), l = Gr(e), u = Gr(n), f = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return a.jsx(a.Fragment, { children: c.map((h) => (
    /*
     * The split of responsibilities between MiniMapNodes and
     * NodeComponentWrapper may appear weird. However, it’s designed to
     * minimize the cost of updates when individual nodes change.
     *
     * For more details, see a similar commit in `NodeRenderer/index.tsx`.
     */
    a.jsx(jm, { id: h, nodeColorFunc: d, nodeStrokeColorFunc: l, nodeClassNameFunc: u, nodeBorderRadius: o, nodeStrokeWidth: r, NodeComponent: i, onClick: s, shapeRendering: f }, h)
  )) });
}
function Cm({ id: e, nodeColorFunc: t, nodeStrokeColorFunc: n, nodeClassNameFunc: o, nodeBorderRadius: r, nodeStrokeWidth: i, shapeRendering: s, NodeComponent: c, onClick: d }) {
  const { node: l, x: u, y: f, width: h, height: p } = ue((y) => {
    const v = y.nodeLookup.get(e);
    if (!v)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const w = v.internals.userNode, { x: m, y: N } = v.internals.positionAbsolute, { width: g, height: x } = lt(w);
    return {
      node: w,
      x: m,
      y: N,
      width: g,
      height: x
    };
  }, xe);
  return !l || l.hidden || !Ic(l) ? null : a.jsx(c, { x: u, y: f, width: h, height: p, style: l.style, selected: !!l.selected, className: o(l), color: t(l), borderRadius: r, strokeColor: n(l), strokeWidth: i, shapeRendering: s, onClick: d, id: l.id });
}
const jm = Se(Cm);
var _m = Se(Im);
const Am = 200, Mm = 150, Dm = (e) => !e.hidden, Pm = (e) => {
  const t = {
    x: -e.transform[0] / e.transform[2],
    y: -e.transform[1] / e.transform[2],
    width: e.width / e.transform[2],
    height: e.height / e.transform[2]
  };
  return {
    viewBB: t,
    boundingRect: e.nodeLookup.size > 0 ? Ec(qn(e.nodeLookup, { filter: Dm }), t) : t,
    rfId: e.rfId,
    panZoom: e.panZoom,
    translateExtent: e.translateExtent,
    flowWidth: e.width,
    flowHeight: e.height,
    ariaLabelConfig: e.ariaLabelConfig
  };
}, $m = "react-flow__minimap-desc";
function Dl({
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
  bgColor: d,
  maskColor: l,
  maskStrokeColor: u,
  maskStrokeWidth: f,
  position: h = "bottom-right",
  onClick: p,
  onNodeClick: y,
  pannable: v = !1,
  zoomable: w = !1,
  ariaLabel: m,
  inversePan: N,
  zoomStep: g = 1,
  offsetScale: x = 5
}) {
  const S = we(), k = ce(null), { boundingRect: C, viewBB: P, rfId: $, panZoom: F, translateExtent: j, flowWidth: z, flowHeight: H, ariaLabelConfig: E } = ue(Pm, xe), _ = e?.width ?? Am, I = e?.height ?? Mm, A = C.width / _, T = C.height / I, D = Math.max(A, T), W = D * _, O = D * I, B = x * D, U = C.x - (W - C.width) / 2 - B, K = C.y - (O - C.height) / 2 - B, ne = W + B * 2, se = O + B * 2, Q = `${$m}-${$}`, R = ce(0), q = ce();
  R.current = D, oe(() => {
    if (k.current && F)
      return q.current = Zp({
        domNode: k.current,
        panZoom: F,
        getTransform: () => S.getState().transform,
        getViewScale: () => R.current
      }), () => {
        q.current?.destroy();
      };
  }, [F]), oe(() => {
    q.current?.update({
      translateExtent: j,
      width: z,
      height: H,
      inversePan: N,
      pannable: v,
      zoomStep: g,
      zoomable: w
    });
  }, [v, w, N, g, j, z, H]);
  const ae = p ? (ee) => {
    const [le, V] = q.current?.pointer(ee) || [0, 0];
    p(ee, { x: le, y: V });
  } : void 0, ie = y ? he((ee, le) => {
    const V = S.getState().nodeLookup.get(le).internals.userNode;
    y(ee, V);
  }, []) : void 0, G = m ?? E["minimap.ariaLabel"];
  return a.jsx(lr, { position: h, style: {
    ...e,
    "--xy-minimap-background-color-props": typeof d == "string" ? d : void 0,
    "--xy-minimap-mask-background-color-props": typeof l == "string" ? l : void 0,
    "--xy-minimap-mask-stroke-color-props": typeof u == "string" ? u : void 0,
    "--xy-minimap-mask-stroke-width-props": typeof f == "number" ? f * D : void 0,
    "--xy-minimap-node-background-color-props": typeof o == "string" ? o : void 0,
    "--xy-minimap-node-stroke-color-props": typeof n == "string" ? n : void 0,
    "--xy-minimap-node-stroke-width-props": typeof s == "number" ? s : void 0
  }, className: Ie(["react-flow__minimap", t]), "data-testid": "rf__minimap", children: a.jsxs("svg", { width: _, height: I, viewBox: `${U} ${K} ${ne} ${se}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": Q, ref: k, onClick: ae, children: [G && a.jsx("title", { id: Q, children: G }), a.jsx(_m, { onClick: ie, nodeColor: o, nodeStrokeColor: n, nodeBorderRadius: i, nodeClassName: r, nodeStrokeWidth: s, nodeComponent: c }), a.jsx("path", { className: "react-flow__minimap-mask", d: `M${U - B},${K - B}h${ne + B * 2}v${se + B * 2}h${-ne - B * 2}z
        M${P.x},${P.y}h${P.width}v${P.height}h${-P.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
Dl.displayName = "MiniMap";
const Pl = Se(Dl), Tm = (e) => (t) => e ? `${Math.max(1 / t.transform[2], 1)}` : void 0, zm = {
  [nn.Line]: "right",
  [nn.Handle]: "bottom-right"
};
function Rm({ nodeId: e, position: t, variant: n = nn.Handle, className: o, style: r = void 0, children: i, color: s, minWidth: c = 10, minHeight: d = 10, maxWidth: l = Number.MAX_VALUE, maxHeight: u = Number.MAX_VALUE, keepAspectRatio: f = !1, resizeDirection: h, autoScale: p = !0, shouldResize: y, onResizeStart: v, onResize: w, onResizeEnd: m }) {
  const N = al(), g = typeof e == "string" ? e : N, x = we(), S = ce(null), k = n === nn.Handle, C = ue(he(Tm(k && p), [k, p]), xe), P = ce(null), $ = t ?? zm[n];
  oe(() => {
    if (!(!S.current || !g))
      return P.current || (P.current = ag({
        domNode: S.current,
        nodeId: g,
        getStoreItems: () => {
          const { nodeLookup: j, transform: z, snapGrid: H, snapToGrid: E, nodeOrigin: _, domNode: I } = x.getState();
          return {
            nodeLookup: j,
            transform: z,
            snapGrid: H,
            snapToGrid: E,
            nodeOrigin: _,
            paneDomNode: I
          };
        },
        onChange: (j, z) => {
          const { triggerNodeChanges: H, nodeLookup: E, parentLookup: _, nodeOrigin: I } = x.getState(), A = [], T = { x: j.x, y: j.y }, D = E.get(g);
          if (D && D.expandParent && D.parentId) {
            const W = D.origin ?? I, O = j.width ?? D.measured.width ?? 0, B = j.height ?? D.measured.height ?? 0, U = {
              id: D.id,
              parentId: D.parentId,
              rect: {
                width: O,
                height: B,
                ...Cc({
                  x: j.x ?? D.position.x,
                  y: j.y ?? D.position.y
                }, { width: O, height: B }, D.parentId, E, W)
              }
            }, K = Li([U], E, _, I);
            A.push(...K), T.x = j.x ? Math.max(W[0] * O, j.x) : void 0, T.y = j.y ? Math.max(W[1] * B, j.y) : void 0;
          }
          if (T.x !== void 0 && T.y !== void 0) {
            const W = {
              id: g,
              type: "position",
              position: { ...T }
            };
            A.push(W);
          }
          if (j.width !== void 0 && j.height !== void 0) {
            const O = {
              id: g,
              type: "dimensions",
              resizing: !0,
              setAttributes: h ? h === "horizontal" ? "width" : "height" : !0,
              dimensions: {
                width: j.width,
                height: j.height
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
        onEnd: ({ width: j, height: z }) => {
          const H = {
            id: g,
            type: "dimensions",
            resizing: !1,
            dimensions: {
              width: j,
              height: z
            }
          };
          x.getState().triggerNodeChanges([H]);
        }
      })), P.current.update({
        controlPosition: $,
        boundaries: {
          minWidth: c,
          minHeight: d,
          maxWidth: l,
          maxHeight: u
        },
        keepAspectRatio: f,
        resizeDirection: h,
        onResizeStart: v,
        onResize: w,
        onResizeEnd: m,
        shouldResize: y
      }), () => {
        P.current?.destroy();
      };
  }, [
    $,
    c,
    d,
    l,
    u,
    f,
    v,
    w,
    m,
    y
  ]);
  const F = $.split("-");
  return a.jsx("div", { className: Ie(["react-flow__resize-control", "nodrag", ...F, n, o]), ref: S, style: {
    ...r,
    scale: C,
    ...s && { [k ? "backgroundColor" : "borderColor"]: s }
  }, children: i });
}
Se(Rm);
const Lm = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), $l = (...e) => e.filter((t, n, o) => !!t && t.trim() !== "" && o.indexOf(t) === n).join(" ").trim();
var Vm = {
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
const Hm = Qo(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: o,
    className: r = "",
    children: i,
    iconNode: s,
    ...c
  }, d) => ei(
    "svg",
    {
      ref: d,
      ...Vm,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: o ? Number(n) * 24 / Number(t) : n,
      className: $l("lucide", r),
      ...c
    },
    [
      ...s.map(([l, u]) => ei(l, u)),
      ...Array.isArray(i) ? i : [i]
    ]
  )
);
const ve = (e, t) => {
  const n = Qo(
    ({ className: o, ...r }, i) => ei(Hm, {
      ref: i,
      iconNode: t,
      className: $l(`lucide-${Lm(e)}`, o),
      ...r
    })
  );
  return n.displayName = `${e}`, n;
};
const Tl = ve("Boxes", [
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
const Rt = ve("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
const zl = ve("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
const Zo = ve("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
const Wt = ve("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
const Be = ve("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
const Om = ve("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
const Rl = ve("GitBranch", [
  ["line", { x1: "6", x2: "6", y1: "3", y2: "15", key: "17qcm7" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M18 9a9 9 0 0 1-9 9", key: "n2h4wq" }]
]);
const Fm = ve("GripVertical", [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
]);
const Ll = ve("ListTree", [
  ["path", { d: "M21 12h-8", key: "1bmf0i" }],
  ["path", { d: "M21 6H8", key: "1pqkrb" }],
  ["path", { d: "M21 18h-8", key: "1tm79t" }],
  ["path", { d: "M3 6v4c0 1.1.9 2 2 2h3", key: "1ywdgy" }],
  ["path", { d: "M3 10v6c0 1.1.9 2 2 2h3", key: "2wc746" }]
]);
const Uo = ve("Maximize2", [
  ["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }],
  ["polyline", { points: "9 21 3 21 3 15", key: "1avn1i" }],
  ["line", { x1: "21", x2: "14", y1: "3", y2: "10", key: "ota7mn" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]);
const ha = ve("Minimize2", [
  ["polyline", { points: "4 14 10 14 10 20", key: "11kfnr" }],
  ["polyline", { points: "20 10 14 10 14 4", key: "rlmsce" }],
  ["line", { x1: "14", x2: "21", y1: "10", y2: "3", key: "o5lafz" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]);
const Bm = ve("Package", [
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
const ur = ve("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
const Oi = ve("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
const fr = ve("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
const Wm = ve("Save", [
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
const Vl = ve("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
const yt = ve("Sparkles", [
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
const Hl = ve("Terminal", [
  ["polyline", { points: "4 17 10 11 4 5", key: "akl6gq" }],
  ["line", { x1: "12", x2: "20", y1: "19", y2: "19", key: "q2wloq" }]
]);
const pi = ve("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
const Ol = ve("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const Xm = ve("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]), Re = "/_elsa/workflow-management", Ym = "/publishing";
async function qm(e, t) {
  const n = new URLSearchParams({
    state: t.state ?? "active",
    page: t.page.toString(),
    pageSize: t.pageSize.toString()
  }), o = t.search.trim();
  return o && n.set("search", o), e.http.getJson(`${Re}/definitions?${n.toString()}`);
}
async function Zm(e, t) {
  return e.http.getJson(`${Re}/definitions/${encodeURIComponent(t)}`);
}
async function Um(e, t) {
  return e.http.getJson(`${Re}/versions/${encodeURIComponent(t)}`);
}
async function Km(e, t) {
  return e.http.postJson(`${Re}/definitions`, t);
}
async function Gm(e, t) {
  await e.http.deleteJson(`${Re}/definitions/${encodeURIComponent(t)}`);
}
async function Jm(e, t) {
  await e.http.postJson(`${Re}/definitions/${encodeURIComponent(t)}/restore`, {});
}
async function Qm(e, t) {
  await e.http.deleteJson(`${Re}/definitions/${encodeURIComponent(t)}/permanent`);
}
async function ex(e, t) {
  return e.http.putJson(`${Re}/drafts/${encodeURIComponent(t.id)}`, { state: t.state, layout: t.layout });
}
async function tx(e, t) {
  return e.http.postJson(`${Re}/drafts/${encodeURIComponent(t)}/promote`, {});
}
async function nx(e, t) {
  return e.http.postJson(`${Re}/versions/${encodeURIComponent(t)}/publish`, {});
}
async function ox(e, t) {
  try {
    return await e.http.postJson(`${Ym}/workflows/drafts/test-runs`, t);
  } catch (n) {
    const o = ax(n);
    if (o) return o;
    throw n;
  }
}
async function Fl(e, t) {
  return e.http.postJson(`${Re}/executables/${encodeURIComponent(t)}/run`, {});
}
async function Bl(e) {
  return e.http.getJson("/_demo/workflows/executables");
}
async function Wl(e, t = {}) {
  const n = new URLSearchParams();
  t.status && n.set("status", t.status), t.definitionId && n.set("definitionId", t.definitionId), t.correlationId && n.set("correlationId", t.correlationId), t.take && n.set("take", String(t.take));
  const o = n.toString();
  return e.http.getJson(`/runtime/workflows/instances${o ? `?${o}` : ""}`);
}
async function rx(e, t) {
  return e.http.getJson(`/runtime/workflows/instances/${encodeURIComponent(t)}`);
}
async function Fi(e) {
  return e.http.getJson(`${Re}/activities`);
}
async function ix(e) {
  const t = await Xl(e, [
    `${Re}/descriptors/activities`,
    "/descriptors/activities"
  ]);
  return Array.isArray(t) ? pa(t) : pa(t.items ?? t.activities ?? t.descriptors ?? []);
}
async function sx(e) {
  const t = await Xl(e, [
    `${Re}/descriptors/expression-descriptors`,
    "/descriptors/expression-descriptors"
  ]);
  if (Array.isArray(t)) return t;
  const n = t.items ?? t.descriptors ?? t.expressionDescriptors ?? [];
  return n.length > 0 ? n : $o;
}
async function Xl(e, t) {
  let n;
  for (const o of t)
    try {
      return await e.http.getJson(o);
    } catch (r) {
      n = r;
    }
  throw n;
}
function pa(e) {
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
function ax(e) {
  const t = e && typeof e == "object" && "payload" in e ? e.payload : null, n = ga(t);
  if (n) return n;
  if (!(e instanceof Error)) return null;
  try {
    return ga(JSON.parse(e.message));
  } catch {
    return null;
  }
}
function ga(e) {
  if (!e || typeof e != "object") return null;
  const t = e;
  return typeof t.testRunId == "string" && typeof t.status == "string" ? t : null;
}
const $o = [
  { type: "Literal", displayName: "Literal" },
  { type: "JavaScript", displayName: "JavaScript" },
  { type: "Liquid", displayName: "Liquid" },
  { type: "Object", displayName: "Object" },
  { type: "Variable", displayName: "Variable" },
  { type: "Input", displayName: "Input" }
], hr = "elsa.sequence.structure", Kn = "elsa.flowchart.structure";
function Yl(e, t) {
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
function Dn(e, t) {
  const n = Yl(e, t);
  if (!n) return null;
  let o = Ke(n)[0];
  return o ? { owner: n, slot: o } : null;
}
function Ke(e) {
  const t = e.structure;
  if (!t || !t.payload || typeof t.payload != "object") return [];
  const n = t.payload, o = Cx(t), r = Jr(n.activities);
  return r ? [{
    id: `${t.kind}:activities`,
    label: jx(t),
    property: "activities",
    mode: o,
    activities: r
  }] : Object.entries(n).filter(([, i]) => Jr(i)).map(([i, s]) => ({
    id: `${t.kind}:${i}`,
    label: Ax(i),
    property: i,
    mode: "generic",
    activities: Jr(s) ?? []
  }));
}
function ql(e, t, n) {
  const o = new Map(t.map((s) => [s.activityVersionId, s])), r = new Map(n.map((s) => [s.nodeId, s])), i = e.slot.activities.map((s, c) => {
    const d = o.get(s.activityVersionId), l = r.get(s.nodeId) ?? _x(e.slot.mode, c);
    return Kl(s, d, { x: l.x, y: l.y });
  });
  return {
    nodes: i,
    edges: e.slot.mode === "flowchart" ? wx(e.owner) : xx(e.slot, i)
  };
}
function gi(e, t, n) {
  const o = t.find((i) => i.activityVersionId === e.activityVersionId), r = n.find((i) => i.nodeId === e.nodeId) ?? { x: 0, y: 0 };
  return {
    nodes: [Kl(e, o, { x: r.x, y: r.y }, {
      connectable: !1,
      deletable: !1,
      draggable: !1,
      suppressFlowPorts: !0
    })],
    edges: []
  };
}
function cx(e, t, n, o = null) {
  const r = new Map(t.map((c) => [c.activityExecutionId, c])), i = ma(t, (c) => c.authoredActivityId || c.executableNodeId), s = ma(n, (c) => c.executableNodeId ? c.executableNodeId : c.activityExecutionId ? r.get(c.activityExecutionId)?.authoredActivityId ?? "" : "");
  return e.map((c) => {
    const d = i.get(c.id) ?? [], l = s.get(c.id) ?? [];
    if (d.length === 0 && l.length === 0) return c;
    const u = Ex(d), f = o === c.id || d.some((p) => p.activityExecutionId === o) || l.some((p) => p.incidentId === o), h = {
      status: u?.status,
      subStatus: u?.subStatus,
      activityExecutionId: u?.activityExecutionId,
      faultCount: d.reduce((p, y) => p + y.faultCount + y.aggregateFaultCount, 0),
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
function Bi(e, t) {
  return e?.structure?.kind === Kn || hx(t) ? "flowchart" : e?.structure?.kind === hr || px(t) ? "sequence" : "unsupported";
}
function yi(e, t, n) {
  if (t.length === 0) {
    const c = Ke(e)[0];
    return c ? Fn(e, c, n) : e;
  }
  const [o, ...r] = t, i = Ke(e).find((c) => c.id === o.slotId);
  if (!i) return e;
  const s = i.activities.map((c) => c.nodeId === o.ownerNodeId ? yi(c, r, n) : c);
  return Fn(e, i, s);
}
function Zl(e, t, n) {
  if (t.length === 0) return n;
  const [o, ...r] = t, i = Ke(e).find((c) => c.id === o.slotId);
  if (!i) return e;
  const s = i.activities.map((c) => c.nodeId === o.ownerNodeId ? Zl(c, r, n) : c);
  return Fn(e, i, s);
}
function Ul(e, t, n) {
  if (e.nodeId === t) return n(e);
  const o = Ke(e);
  if (o.length === 0) return e;
  let r = !1, i = e;
  for (const s of o) {
    const c = s.activities.map((d) => {
      const l = Ul(d, t, n);
      return l !== d && (r = !0), l;
    });
    r && (i = Fn(i, s, c));
  }
  return r ? i : e;
}
function Fn(e, t, n) {
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
function lx(e, t, n, o = []) {
  const r = new Map(e.slot.activities.map((s) => [s.nodeId, s]));
  for (const s of o)
    r.set(s.nodeId, s);
  const i = t.map((s) => r.get(s.id)).filter((s) => !!s);
  return e.slot.mode === "sequence" && i.sort((s, c) => {
    const d = t.find((u) => u.id === s.nodeId), l = t.find((u) => u.id === c.nodeId);
    return (d?.position.x ?? 0) - (l?.position.x ?? 0);
  }), Fn(e.owner, e.slot, i);
}
function dx(e, t) {
  return {
    ...e,
    structure: mx(e.structure, t)
  };
}
function ux(e, t) {
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
function mi(e, t) {
  return {
    nodeId: t,
    activityVersionId: e.activityVersionId,
    inputs: [],
    outputs: [],
    structure: yx(e)
  };
}
function Ce(e) {
  const t = e.activityTypeKey.split(".").at(-1) || e.activityTypeKey, n = e.displayName?.trim();
  return !n || n === e.activityTypeKey || n.includes(".") ? gx(t) : n;
}
function Kl(e, t, n, o = {}) {
  return {
    id: e.nodeId,
    type: "workflowActivity",
    position: n,
    connectable: o.connectable,
    deletable: o.deletable,
    draggable: o.draggable,
    data: {
      label: t ? Ce(t) : e.activityVersionId,
      activityVersionId: e.activityVersionId,
      activityTypeKey: t?.activityTypeKey,
      category: t?.category,
      executionType: t?.executionType,
      icon: xi(t),
      childSlots: Ke(e),
      acceptsInbound: vx(e, t),
      sourcePorts: o.suppressFlowPorts ? [] : Gl(e, t),
      suppressFlowPorts: o.suppressFlowPorts
    }
  };
}
function xi(e) {
  if (!e) return "activity";
  const t = fx(e.icon);
  if (t) return t;
  const n = e.activityTypeKey.toLowerCase(), o = Ce(e).toLowerCase(), r = e.category?.toLowerCase() ?? "", i = e.executionType?.toLowerCase() ?? "";
  return n.endsWith(".flowchart") || o === "flowchart" ? "flowchart" : n.endsWith(".sequence") || o === "sequence" ? "sequence" : n.includes("writeline") || o.includes("write line") ? "terminal" : r.includes("runtime") ? "runtime" : i === "trigger" ? "trigger" : "activity";
}
function fx(e) {
  if (!e) return null;
  const t = e.trim().toLowerCase();
  return ["activity", "flowchart", "sequence", "terminal", "runtime", "trigger"].includes(t) ? t : null;
}
function hx(e) {
  return !!e && (Ce(e) === "Flowchart" || e.activityTypeKey.endsWith(".Flowchart"));
}
function px(e) {
  return !!e && (Ce(e) === "Sequence" || e.activityTypeKey.endsWith(".Sequence"));
}
function gx(e) {
  return e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").trim();
}
function yx(e) {
  return e.activityTypeKey.endsWith(".Sequence") || e.displayName === "Sequence" ? {
    kind: hr,
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
function mx(e, t) {
  if (!e) return e ?? null;
  const n = Array.isArray(e.payload.connections) ? e.payload.connections : [], o = /* @__PURE__ */ new Map();
  for (const r of n) {
    if (!Wi(r)) continue;
    const i = r.id;
    typeof i == "string" && o.set(i, r);
  }
  return {
    ...e,
    payload: {
      ...e.payload,
      connections: t.map((r) => {
        const i = o.get(r.id) ?? {}, s = r.data?.vertices, { vertices: c, ...d } = i;
        return {
          ...d,
          id: r.id,
          source: { nodeId: r.source, port: r.sourceHandle ?? "Done" },
          target: r.targetHandle ? { nodeId: r.target, port: r.targetHandle } : { nodeId: r.target },
          ...s?.length ? { vertices: s.map((l) => ({ x: Math.round(l.x), y: Math.round(l.y) })) } : {}
        };
      })
    }
  };
}
function xx(e, t) {
  return e.mode === "sequence" ? t.slice(0, -1).map((n, o) => ({
    id: `sequence-${n.id}-${t[o + 1].id}`,
    source: n.id,
    target: t[o + 1].id,
    type: "smoothstep",
    animated: !1
  })) : [];
}
function wx(e) {
  if (e.structure?.kind !== Kn) return [];
  const t = e.structure.payload.connections;
  return Array.isArray(t) ? t.map((n, o) => {
    if (!n || typeof n != "object") return null;
    const r = n.source, i = n.target;
    if (!r?.nodeId || !i?.nodeId) return null;
    const s = Array.isArray(n.vertices) ? n.vertices.filter(kx) : [];
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
function Gl(e, t) {
  const n = ya(e.cases);
  if (Nx(e, t) && n.length > 0)
    return [...n.map((i) => ({ name: i, displayName: i })), { name: "Default", displayName: "Default" }];
  const o = [
    ...To(t?.designFacets),
    ...To(t?.ports),
    ...To(t?.outputs)
  ];
  if (o.length > 0) return Sx(o);
  const r = ya(e.outcomes);
  return r.length > 0 ? r.map((i) => ({ name: i, displayName: i })) : [{ name: "Done", displayName: "Done" }];
}
function vx(e, t) {
  return String(t?.executionType ?? "").toLowerCase() !== "trigger";
}
function Ko(e, t, n, o) {
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
function bx(e, t, n) {
  const o = Ko(t.source, n, t.sourceHandle ?? "Done", void 0), r = Ko(n, t.target, "Done", t.targetHandle ?? void 0);
  return e.filter((i) => i.id !== t.id).concat(o, r);
}
function Jr(e) {
  return Array.isArray(e) ? e.filter(Ix) : null;
}
function Nx(e, t) {
  const n = t?.activityTypeKey ?? e.activityVersionId, o = t?.displayName ?? "";
  return n.endsWith(".FlowSwitch") || n === "FlowSwitch" || o === "FlowSwitch";
}
function To(e) {
  if (!Array.isArray(e)) return [];
  const t = [];
  for (const n of e) {
    if (!Wi(n)) continue;
    if (Array.isArray(n.ports)) {
      t.push(...To(n.ports));
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
function Sx(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.has(n.name) || t.set(n.name, n);
  return [...t.values()];
}
function ya(e) {
  return Array.isArray(e) ? e.filter((t) => typeof t == "string" && t.length > 0) : [];
}
function ma(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const o of e) {
    const r = t(o);
    r && n.set(r, [...n.get(r) ?? [], o]);
  }
  return n;
}
function Ex(e) {
  return [...e].sort((t, n) => xa(n).localeCompare(xa(t)))[0];
}
function xa(e) {
  return e.completedAt ?? e.startedAt ?? e.scheduledAt;
}
function kx(e) {
  return Wi(e) && typeof e.x == "number" && typeof e.y == "number";
}
function Wi(e) {
  return typeof e == "object" && e !== null;
}
function Ix(e) {
  return typeof e == "object" && e !== null && typeof e.nodeId == "string" && typeof e.activityVersionId == "string";
}
function Cx(e) {
  return e.kind === hr ? "sequence" : e.kind === Kn ? "flowchart" : "generic";
}
function jx(e) {
  return e.kind === hr || e.kind === Kn, "Activities";
}
function _x(e, t) {
  return e === "sequence" ? { nodeId: "", x: t * 280, y: 0 } : { nodeId: "", x: t % 4 * 280, y: Math.floor(t / 4) * 150 };
}
function Ax(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").replace(/^\w/, (t) => t.toUpperCase());
}
const Mx = [
  { type: "Literal", displayName: "Literal" },
  { type: "JavaScript", displayName: "JavaScript" },
  { type: "Liquid", displayName: "Liquid" },
  { type: "Object", displayName: "Object" },
  { type: "Variable", displayName: "Variable" },
  { type: "Input", displayName: "Input" }
];
function Jl(e) {
  const t = e.trim();
  return t ? t.charAt(0).toLowerCase() + t.slice(1) : e;
}
function Xi(e) {
  return Jl(e.name);
}
function Dx(e, t) {
  const n = Xi(t), o = e[n];
  return t.isWrapped === !1 ? o ?? t.defaultValue ?? "" : ed(o, t);
}
function Ql(e, t) {
  return ed(e[Xi(t)], t);
}
function Px(e, t) {
  return {
    ...e,
    expression: {
      type: e.expression.type || "Literal",
      value: t
    }
  };
}
function $x(e, t) {
  return {
    ...e,
    expression: {
      type: t,
      value: e.expression.value
    }
  };
}
function wa(e, t, n) {
  return {
    ...e,
    [Xi(t)]: n
  };
}
function Tx(e, t) {
  return t.isWrapped === !1 ? Dx(e, t) : Ql(e, t).expression.value;
}
function ed(e, t) {
  return zx(e) ? {
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
function zx(e) {
  if (!e || typeof e != "object") return !1;
  const t = e, n = t.expression;
  return typeof t.typeName == "string" && !!n && typeof n == "object" && typeof n.type == "string";
}
const td = /* @__PURE__ */ new Set(["studio.property.singleline", "studio.property.text-fallback"]);
function Rx({
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
  const s = t.inputs.filter((l) => l.isBrowsable !== !1).sort((l, u) => (l.order ?? 0) - (u.order ?? 0) || l.name.localeCompare(u.name));
  if (s.length === 0)
    return /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "This activity does not expose editable properties." });
  const c = Ox(s), d = o.length > 0 ? o : Mx;
  return /* @__PURE__ */ a.jsxs("div", { className: "wf-properties", children: [
    /* @__PURE__ */ a.jsx("span", { className: "wf-section-label", children: "Properties" }),
    c.map((l) => /* @__PURE__ */ a.jsxs("section", { className: "wf-property-group", children: [
      c.length > 1 ? /* @__PURE__ */ a.jsx("h4", { children: l.category }) : null,
      l.inputs.map((u) => /* @__PURE__ */ a.jsx(
        Lx,
        {
          activity: e,
          input: u,
          editors: n,
          expressionDescriptors: d,
          onChange: i
        },
        u.name
      ))
    ] }, l.category))
  ] });
}
function Lx({
  activity: e,
  input: t,
  editors: n,
  expressionDescriptors: o,
  onChange: r
}) {
  const i = t.isReadOnly === !0, s = { activity: e, expressionDescriptors: o, readOnly: i }, c = Hx(n, t, s), d = c?.component, l = t.isWrapped !== !1 ? Ql(e, t) : null, u = l?.expression.type ?? "Literal", f = Tx(e, t), h = !!(l && Fx(t, c?.id)), p = !!(l && Bx(t, c?.id)), [y, v] = Y(!1), w = (N) => {
    const g = l ? Px(l, N) : N;
    r(wa(e, t, g));
  }, m = (N) => {
    l && r(wa(e, t, $x(l, N)));
  };
  return /* @__PURE__ */ a.jsxs("div", { className: "wf-property-row", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-property-row-header", children: [
      /* @__PURE__ */ a.jsx("label", { children: t.displayName || t.name }),
      /* @__PURE__ */ a.jsx("span", { children: nd(t.typeName) })
    ] }),
    t.description ? /* @__PURE__ */ a.jsx("p", { children: t.description }) : null,
    l && !h ? /* @__PURE__ */ a.jsx(
      wi,
      {
        label: `${t.displayName || t.name} expression syntax`,
        value: u,
        descriptors: o,
        disabled: i,
        onChange: m
      }
    ) : null,
    h ? /* @__PURE__ */ a.jsxs("div", { className: "wf-expression-field", children: [
      /* @__PURE__ */ a.jsx("div", { className: "wf-expression-editor", children: va(d, t, f, i, s, w) }),
      /* @__PURE__ */ a.jsx(
        wi,
        {
          label: `${t.displayName || t.name} expression syntax`,
          value: u,
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
          onClick: () => v(!0),
          children: /* @__PURE__ */ a.jsx(Uo, { size: 13 })
        }
      ) : null
    ] }) : va(d, t, f, i, s, w),
    p && !h ? /* @__PURE__ */ a.jsxs(
      "button",
      {
        type: "button",
        className: "wf-property-expand-row",
        "aria-label": `Open expanded ${t.displayName || t.name} editor`,
        onClick: () => v(!0),
        children: [
          /* @__PURE__ */ a.jsx(Uo, { size: 13 }),
          " Open expanded editor"
        ]
      }
    ) : null,
    y ? /* @__PURE__ */ a.jsx(
      Vx,
      {
        input: t,
        value: f,
        syntax: u,
        descriptors: o,
        disabled: i,
        onChange: w,
        onSyntaxChange: m,
        onClose: () => v(!1)
      }
    ) : null
  ] });
}
function Vx({
  input: e,
  value: t,
  syntax: n,
  descriptors: o,
  disabled: r,
  onChange: i,
  onSyntaxChange: s,
  onClose: c
}) {
  const d = Ha(), l = e.displayName || e.name;
  return oe(() => {
    const u = (f) => {
      f.key === "Escape" && c();
    };
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
  }, [c]), /* @__PURE__ */ a.jsx("div", { className: "wf-property-editor-backdrop", children: /* @__PURE__ */ a.jsxs("section", { className: "wf-property-editor-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": d, children: [
    /* @__PURE__ */ a.jsxs("header", { children: [
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("span", { children: "Property editor" }),
        /* @__PURE__ */ a.jsx("h3", { id: d, children: l })
      ] }),
      /* @__PURE__ */ a.jsx("button", { type: "button", "aria-label": `Close ${l} editor`, onClick: c, children: /* @__PURE__ */ a.jsx(Ol, { size: 16 }) })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "wf-property-editor-body", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "wf-property-editor-toolbar", children: [
        /* @__PURE__ */ a.jsx(
          wi,
          {
            label: `${l} expression syntax`,
            value: n,
            descriptors: o,
            disabled: r,
            onChange: s
          }
        ),
        /* @__PURE__ */ a.jsx("span", { children: nd(e.typeName) })
      ] }),
      e.description ? /* @__PURE__ */ a.jsx("p", { children: e.description }) : null,
      /* @__PURE__ */ a.jsx(
        "textarea",
        {
          "aria-label": `${l} expanded value`,
          value: t == null ? "" : String(t),
          disabled: r,
          spellCheck: !1,
          onChange: (u) => i(u.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ a.jsxs("footer", { children: [
      /* @__PURE__ */ a.jsx("span", { children: "Changes update the draft immediately." }),
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: c, children: "Close" })
    ] })
  ] }) });
}
function va(e, t, n, o, r, i) {
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
function wi({
  label: e,
  value: t,
  descriptors: n,
  disabled: o,
  variant: r = "block",
  onChange: i
}) {
  const [s, c] = Y(!1), d = Ha(), l = n.find((f) => f.type === t), u = [
    "wf-syntax-picker-trigger",
    r === "inline" ? "inline" : "",
    s ? "open" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ a.jsxs("div", { className: r === "inline" ? "wf-syntax-picker inline" : "wf-syntax-picker", onBlur: (f) => {
    f.currentTarget.contains(f.relatedTarget) || c(!1);
  }, children: [
    /* @__PURE__ */ a.jsx(
      "button",
      {
        type: "button",
        className: u,
        "aria-label": e,
        "aria-haspopup": "listbox",
        "aria-expanded": s,
        "aria-controls": d,
        disabled: o,
        onClick: () => c((f) => !f),
        children: /* @__PURE__ */ a.jsx("span", { children: l?.displayName || l?.type || t })
      }
    ),
    s ? /* @__PURE__ */ a.jsx("div", { id: d, role: "listbox", className: "wf-syntax-picker-menu", "aria-label": e, children: n.map((f) => {
      const h = f.displayName || f.type, p = f.type === t;
      return /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          role: "option",
          "aria-selected": p,
          className: p ? "selected" : "",
          onClick: () => {
            i(f.type), c(!1);
          },
          children: h
        },
        f.type
      );
    }) }) : null
  ] });
}
function Hx(e, t, n) {
  return [...e].sort((o, r) => (o.order ?? 500) - (r.order ?? 500)).find((o) => o.supports(t, n));
}
function Ox(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = n.category?.trim() || "General";
    t.set(o, [...t.get(o) ?? [], n]);
  }
  return [...t.entries()].map(([n, o]) => ({ category: n, inputs: o }));
}
function nd(e) {
  return e.split(".").filter(Boolean).at(-1) ?? e;
}
function Fx(e, t) {
  if (e.uiHint?.toLowerCase() === "multiline" || t && !td.has(t)) return !1;
  const n = e.typeName.toLowerCase();
  return ["string", "system.string", "text"].includes(n) || e.uiHint?.toLowerCase() === "singleline";
}
function Bx(e, t) {
  const n = e.uiHint?.toLowerCase();
  if (n === "checkbox" || n === "dropdown" || t && !td.has(t) && n !== "multiline") return !1;
  const o = e.typeName.toLowerCase();
  return ["string", "system.string", "text"].includes(o) || n === "singleline" || n === "multiline";
}
const ba = "elsa-studio:apply-workflow-graph-operation-batch", Na = "elsa-studio:undo-workflow-graph-operation-batch", Wx = [
  "add-activity",
  "update-activity",
  "remove-activity",
  "connect-activities",
  "disconnect-activities",
  "set-root",
  "set-designer-position",
  "set-activity-property"
];
function Xx(e, t, n) {
  if (!Array.isArray(t.operations)) throw new Error("Weaver batch does not contain operations.");
  const o = Qx(e), r = rd(o.state.rootActivity), i = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = [];
  for (const d of t.operations) {
    const l = Jx(d.kind), u = d.parameters ?? {};
    if (l === "add-activity") {
      const f = Te(u.activityId) ?? d.temporaryReferences?.[0], h = Gx(f ?? Te(u.displayName) ?? Te(u.activityType) ?? "weaver-activity", r), p = Yx(d, h, n);
      s.set(h, p), c.push(h), f && i.set(f, h), o.state.rootActivity && qx(o.state.rootActivity, p);
      const y = _t(u.position) ? vi(u.position, { x: 280, y: 160 }) : null;
      y && (o.layout = Sa(o.layout, h, y));
      continue;
    }
    if (l === "set-root") {
      const f = Qr(o, u.activityId, i, s);
      if (!f) throw new Error("Weaver batch referenced an unknown root activity.");
      o.state.rootActivity = f;
      continue;
    }
    if (l === "set-designer-position") {
      const f = Tt(u.activityId, i);
      if (!f || !Yi(o.state.rootActivity, f)) throw new Error("Weaver batch referenced an unknown activity position.");
      o.layout = Sa(o.layout, f, vi(u, { x: 280, y: 160 }));
      continue;
    }
    if (l === "set-activity-property") {
      const f = Qr(o, u.activityId, i, s);
      if (!f) throw new Error("Weaver batch referenced an unknown activity property target.");
      Kx(f, Te(u.propertyName) ?? "Value", u.value ?? "");
      continue;
    }
    if (l === "update-activity") {
      const f = Qr(o, u.activityId, i, s);
      if (!f) throw new Error("Weaver batch referenced an unknown activity update target.");
      const h = _t(u.patch) ? u.patch : u;
      Object.assign(f, h);
      continue;
    }
    if (l === "remove-activity") {
      const f = Tt(u.activityId, i);
      if (!f) throw new Error("Weaver batch referenced an unknown activity remove target.");
      o.state.rootActivity = od(o.state.rootActivity, f), o.layout = o.layout.filter((h) => h.nodeId !== f);
      continue;
    }
    if (l === "connect-activities") {
      Zx(o, u, i);
      continue;
    }
    if (l === "disconnect-activities") {
      Ux(o, u, i);
      continue;
    }
    throw new Error(`Weaver batch operation '${String(d.kind || "unknown")}' is not supported by this designer apply path.`);
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
function Yx(e, t, n) {
  const o = e.parameters ?? {}, r = Te(o.activityVersionId) ?? Te(o.activityType) ?? "Elsa.Workflows.Activity", i = n.find((s) => s.activityVersionId === r || s.activityTypeKey === r || s.displayName === Te(o.displayName));
  return i ? mi(i, t) : {
    nodeId: t,
    activityVersionId: i?.activityVersionId ?? r,
    inputs: [],
    outputs: [],
    ...Te(o.displayName) ? { displayName: Te(o.displayName) } : {},
    designer: { position: vi(o.position, { x: 280, y: 160 }) }
  };
}
function qx(e, t) {
  if (e.nodeId === t.nodeId) return;
  const n = qi(e);
  n && !n.some((o) => o.nodeId === t.nodeId) && n.push(t);
}
function Zx(e, t, n) {
  const o = e.state.rootActivity;
  if (!o?.structure) throw new Error("Weaver batch cannot connect activities without a flowchart root.");
  const r = Tt(t.sourceActivityId ?? t.sourceId ?? t.from, n), i = Tt(t.targetActivityId ?? t.targetId ?? t.to, n);
  if (!r || !i) throw new Error("Weaver batch connection is missing source or target activity.");
  const s = o.structure.payload, c = Array.isArray(s.connections) ? s.connections : [], d = Te(t.connectionId) ?? `flow-${r}-${i}`;
  s.connections = [
    ...c.filter((l) => !_t(l) || l.id !== d),
    {
      id: d,
      source: { nodeId: r, port: Te(t.outcome) ?? Te(t.sourcePort) ?? "Done" },
      target: { nodeId: i }
    }
  ];
}
function Ux(e, t, n) {
  const o = e.state.rootActivity, r = o?.structure?.payload.connections;
  if (!Array.isArray(r)) return;
  const i = Te(t.connectionId), s = Tt(t.sourceActivityId ?? t.sourceId ?? t.from, n), c = Tt(t.targetActivityId ?? t.targetId ?? t.to, n);
  o.structure.payload.connections = r.filter((d) => {
    if (!_t(d)) return !0;
    if (i && d.id === i) return !1;
    const l = _t(d.source) ? d.source.nodeId : void 0, u = _t(d.target) ? d.target.nodeId : void 0;
    return l !== s || u !== c;
  });
}
function Kx(e, t, n) {
  e[Jl(t)] = {
    typeName: typeof n == "string" ? "String" : "Object",
    expression: { type: "Literal", value: n }
  };
}
function Qr(e, t, n, o) {
  const r = Tt(t, n);
  return r ? Yi(e.state.rootActivity, r) ?? o.get(r) ?? null : null;
}
function Tt(e, t) {
  const n = Te(e);
  return n ? t.get(n) ?? n : null;
}
function Yi(e, t) {
  if (!e) return null;
  if (e.nodeId === t) return e;
  for (const n of id(e)) {
    const o = Yi(n, t);
    if (o) return o;
  }
  return null;
}
function od(e, t) {
  if (!e || e.nodeId === t) return null;
  const n = qi(e);
  if (n) {
    const o = n.map((r) => od(r, t)).filter((r) => !!r);
    n.splice(0, n.length, ...o);
  }
  return e;
}
function rd(e, t = /* @__PURE__ */ new Set()) {
  if (!e) return t;
  t.add(e.nodeId);
  for (const n of id(e)) rd(n, t);
  return t;
}
function id(e) {
  return qi(e) ?? [];
}
function qi(e) {
  const t = e.structure?.payload;
  return Array.isArray(t?.activities) ? t.activities : null;
}
function Sa(e, t, n) {
  return [
    ...e.filter((o) => o.nodeId !== t),
    { nodeId: t, x: n.x, y: n.y }
  ];
}
function vi(e, t) {
  const n = _t(e) ? e : {}, o = Number(n.x), r = Number(n.y);
  return {
    x: Number.isFinite(o) ? Math.max(40, Math.round(o)) : t.x,
    y: Number.isFinite(r) ? Math.max(40, Math.round(r)) : t.y
  };
}
function Gx(e, t) {
  const n = e.replace(/^temp:/, "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() || "weaver-activity";
  let o = n, r = 2;
  for (; t.has(o); )
    o = `${n}-${r}`, r += 1;
  return t.add(o), o;
}
function Jx(e) {
  return typeof e == "number" ? Wx[e] ?? "" : e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function Te(e) {
  return typeof e == "string" && e.trim() ? e : null;
}
function Qx(e) {
  return typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
function _t(e) {
  return typeof e == "object" && e !== null;
}
const sd = { workflowActivity: F0 }, ad = { workflow: W0 }, Ea = "application/x-elsa-activity-version-id", e0 = 6, t0 = 1200, n0 = [10, 25, 50], o0 = 10, ka = "elsa-studio-workflow-palette-width", Ia = "elsa-studio-workflow-inspector-width", Ca = "elsa-studio-workflow-palette-collapsed", ja = "elsa-studio-workflow-inspector-collapsed", cd = "elsa-studio-workflow-side-panel-maximized", Nn = 180, Sn = 460, r0 = 260, En = 260, kn = 560, i0 = 320, _a = 42, Co = 16, ld = xt.createContext(null);
function ow(e) {
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
        component: () => /* @__PURE__ */ a.jsx(s0, { context: e.backend, ai: e.ai, propertyEditors: e.propertyEditors.list(), workflowDesignerPanels: e.workflowDesigner.panels.list() })
      },
      {
        id: "workflows-executables",
        path: "/workflows/executables",
        label: "Workflow executables",
        component: () => /* @__PURE__ */ a.jsx(a0, { context: e.backend, ai: e.ai })
      },
      {
        id: "workflows-instances",
        path: "/workflows/instances",
        label: "Workflow instances",
        component: () => /* @__PURE__ */ a.jsx(c0, { context: e.backend, ai: e.ai })
      },
      {
        id: "workflows-instance-detail",
        path: "/workflows/instances/:workflowExecutionId",
        label: "Workflow instance",
        component: () => /* @__PURE__ */ a.jsx(l0, { context: e.backend, ai: e.ai })
      }
    ]
  });
}
function s0({
  context: e,
  ai: t,
  propertyEditors: n,
  workflowDesignerPanels: o
}) {
  const [r, i] = Y(Aa);
  oe(() => {
    const c = () => i(Aa());
    return window.addEventListener("popstate", c), () => window.removeEventListener("popstate", c);
  }, []);
  const s = (c) => {
    const d = c ? `/workflows/definitions?definition=${encodeURIComponent(c)}` : "/workflows/definitions";
    window.history.pushState({}, "", d), window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return r ? /* @__PURE__ */ a.jsx(O0, { context: e, definitionId: r, ai: t, propertyEditors: n, workflowDesignerPanels: o, onBack: () => s(null) }) : /* @__PURE__ */ a.jsx(pr, { title: "Definitions", children: /* @__PURE__ */ a.jsx(u0, { context: e, ai: t, onOpen: s }) });
}
function a0({ context: e, ai: t }) {
  const [n, o] = Y(Go);
  oe(() => {
    const i = () => o(Go());
    return window.addEventListener("popstate", i), () => window.removeEventListener("popstate", i);
  }, []);
  const r = he((i) => {
    const s = i?.trim() ?? "", c = new URL(window.location.href);
    s ? c.searchParams.set("definition", s) : c.searchParams.delete("definition"), o(s || null), window.history.replaceState({}, "", `${c.pathname}${c.search}${c.hash}`);
  }, []);
  return /* @__PURE__ */ a.jsx(pr, { title: "Executables", children: /* @__PURE__ */ a.jsx(h0, { context: e, ai: t, definitionFilter: n, onDefinitionFilterChange: r }) });
}
function c0({ context: e, ai: t }) {
  const [n, o] = Y(Go);
  oe(() => {
    const i = () => o(Go());
    return window.addEventListener("popstate", i), () => window.removeEventListener("popstate", i);
  }, []);
  const r = he((i) => {
    const s = i?.trim() ?? "", c = new URL(window.location.href);
    s ? c.searchParams.set("definition", s) : c.searchParams.delete("definition"), o(s || null), window.history.replaceState({}, "", `${c.pathname}${c.search}${c.hash}`);
  }, []);
  return /* @__PURE__ */ a.jsx(pr, { title: "Instances", children: /* @__PURE__ */ a.jsx(w0, { context: e, ai: t, definitionFilter: n, onDefinitionFilterChange: r }) });
}
function l0({ context: e, ai: t }) {
  const n = d0();
  return /* @__PURE__ */ a.jsx(pr, { title: "Instance", children: /* @__PURE__ */ a.jsx(v0, { context: e, ai: t, workflowExecutionId: n }) });
}
function pr({ title: e, children: t }) {
  return /* @__PURE__ */ a.jsxs("section", { className: "wf-page", children: [
    /* @__PURE__ */ a.jsx("div", { className: "wf-page-header", children: /* @__PURE__ */ a.jsxs("div", { children: [
      /* @__PURE__ */ a.jsx("span", { className: "wf-kicker", children: "Workflow management" }),
      /* @__PURE__ */ a.jsx("h2", { children: e })
    ] }) }),
    t
  ] });
}
function Aa() {
  return new URLSearchParams(window.location.search).get("definition");
}
function Go() {
  return new URLSearchParams(window.location.search).get("definition");
}
function d0() {
  const e = /^\/workflows\/instances\/([^/]+)$/.exec(window.location.pathname);
  return e ? decodeURIComponent(e[1]) : "";
}
function u0({ context: e, ai: t, onOpen: n }) {
  const [o, r] = Y(""), [i, s] = Y("active"), [c, d] = Y(1), [l, u] = Y(o0), [f, h] = Y("loading"), [p, y] = Y(""), [v, w] = Y(""), [m, N] = Y([]), [g, x] = Y(0), [S, k] = Y(() => /* @__PURE__ */ new Set()), [C, P] = Y(null), [$, F] = Y(!1), [j, z] = Y([]), [H, E] = Y("idle"), _ = ce(null), I = me(() => m.map((V) => V.id), [m]), A = zt(t, "weaver.workflows.suggest-create-metadata"), T = zt(t, "weaver.workflows.explain-definition"), D = I.filter((V) => S.has(V)).length, W = I.length > 0 && D === I.length, O = he(async () => {
    h("loading"), y("");
    try {
      const V = await qm(e, { search: o, state: i, page: c, pageSize: l }), Z = typeof V.totalCount == "number", pe = V.totalCount ?? V.definitions.length, ge = dd(pe, l);
      if (pe > 0 && c > ge) {
        d(ge);
        return;
      }
      N(Z ? V.definitions : j0(V.definitions, c, l)), x(pe), h("ready");
    } catch (V) {
      y(V instanceof Error ? V.message : String(V)), h("failed");
    }
  }, [e, o, i, c, l]);
  oe(() => {
    O();
  }, [O]), oe(() => {
    _.current && (_.current.indeterminate = D > 0 && !W);
  }, [W, D]);
  const B = he(async () => {
    if (!(H === "loading" || H === "ready")) {
      E("loading");
      try {
        const V = await Fi(e);
        z(V.activities ?? []), E("ready");
      } catch (V) {
        E("failed"), y(V instanceof Error ? V.message : String(V));
      }
    }
  }, [H, e]), U = () => {
    y(""), w(""), P({ name: "", description: "", rootKind: "flowchart" }), B();
  }, K = async () => {
    if (C?.name.trim()) {
      F(!0), y(""), w("");
      try {
        const V = await Km(e, {
          name: C.name.trim(),
          description: C.description.trim() || null,
          rootKind: C.rootKind,
          rootActivityVersionId: M0(C, j)
        });
        P(null), n(V.definition.id);
      } catch (V) {
        y(V instanceof Error ? V.message : String(V));
      } finally {
        F(!1);
      }
    }
  }, ne = (V) => {
    window.history.pushState({}, "", `/workflows/executables?definition=${encodeURIComponent(V)}`), window.dispatchEvent(new PopStateEvent("popstate"));
  }, se = async () => {
    if (m.length === 1 && c > 1) {
      d(c - 1);
      return;
    }
    await O();
  }, Q = () => k(/* @__PURE__ */ new Set()), R = (V, Z) => {
    k((pe) => {
      const ge = new Set(pe);
      return Z ? ge.add(V) : ge.delete(V), ge;
    });
  }, q = (V) => {
    k((Z) => {
      const pe = new Set(Z);
      for (const ge of I)
        V ? pe.add(ge) : pe.delete(ge);
      return pe;
    });
  }, ae = (V) => {
    s(V), d(1), Q();
  }, ie = (V) => {
    r(V), d(1), Q();
  }, G = async (V) => {
    if (window.confirm(`Delete workflow definition "${V.name}"? You can restore it from the Deleted view.`)) {
      w(""), y("");
      try {
        await Gm(e, V.id), R(V.id, !1), w(`Deleted ${V.name}`), await se();
      } catch (Z) {
        y(Z instanceof Error ? Z.message : String(Z));
      }
    }
  }, ee = async (V) => {
    w(""), y("");
    try {
      await Jm(e, V.id), R(V.id, !1), w(`Restored ${V.name}`), await se();
    } catch (Z) {
      y(Z instanceof Error ? Z.message : String(Z));
    }
  }, le = async (V) => {
    if (window.confirm(`Permanently delete workflow definition "${V.name}"? This removes its drafts, versions, layouts, and validations and cannot be undone.`)) {
      w(""), y("");
      try {
        await Qm(e, V.id), R(V.id, !1), w(`Permanently deleted ${V.name}`), await se();
      } catch (Z) {
        y(Z instanceof Error ? Z.message : String(Z));
      }
    }
  };
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-toolbar", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "wf-segmented", role: "tablist", "aria-label": "Definition state", children: [
        /* @__PURE__ */ a.jsx("button", { type: "button", className: i === "active" ? "active" : "", "aria-selected": i === "active", onClick: () => ae("active"), children: "Active" }),
        /* @__PURE__ */ a.jsx("button", { type: "button", className: i === "deleted" ? "active" : "", "aria-selected": i === "deleted", onClick: () => ae("deleted"), children: "Deleted" })
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "wf-search", children: [
        /* @__PURE__ */ a.jsx(Vl, { size: 15 }),
        /* @__PURE__ */ a.jsx("input", { value: o, onChange: (V) => ie(V.target.value), placeholder: "Search definitions" })
      ] }),
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => {
        O();
      }, children: "Refresh" }),
      /* @__PURE__ */ a.jsx("div", { className: "wf-actions", children: /* @__PURE__ */ a.jsxs("button", { type: "button", title: "Create workflow", onClick: U, children: [
        /* @__PURE__ */ a.jsx(Oi, { size: 15 }),
        " Create"
      ] }) })
    ] }),
    f === "failed" ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(Be, { size: 16 }),
      " ",
      p
    ] }) : null,
    f !== "failed" && p ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(Be, { size: 16 }),
      " ",
      p
    ] }) : null,
    v ? /* @__PURE__ */ a.jsxs("div", { className: "wf-status-line", children: [
      /* @__PURE__ */ a.jsx(Rt, { size: 14 }),
      " ",
      v
    ] }) : null,
    S.size > 0 ? /* @__PURE__ */ a.jsxs("div", { className: "wf-selection-bar", "aria-live": "polite", children: [
      /* @__PURE__ */ a.jsxs("span", { children: [
        S.size,
        " selected"
      ] }),
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: Q, children: "Clear selection" })
    ] }) : null,
    f === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Loading workflow definitions..." }) : null,
    f === "ready" && m.length === 0 ? /* @__PURE__ */ a.jsxs("div", { className: "wf-empty", children: [
      "No ",
      i,
      " workflow definitions found."
    ] }) : null,
    f === "ready" && m.length > 0 ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsxs("div", { className: "wf-grid", role: "table", "aria-label": "Workflow definitions", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "wf-grid-head", role: "row", children: [
          /* @__PURE__ */ a.jsx("label", { className: "wf-row-select", children: /* @__PURE__ */ a.jsx(
            "input",
            {
              ref: _,
              type: "checkbox",
              checked: W,
              onChange: (V) => q(V.target.checked),
              "aria-label": "Select visible workflow definitions"
            }
          ) }),
          /* @__PURE__ */ a.jsx("span", { children: "Name" }),
          /* @__PURE__ */ a.jsx("span", { children: "Latest version" }),
          /* @__PURE__ */ a.jsx("span", { children: i === "deleted" ? "Deleted" : "Draft" }),
          /* @__PURE__ */ a.jsx("span", { children: "Modified" }),
          /* @__PURE__ */ a.jsx("span", { children: "Actions" })
        ] }),
        m.map((V) => /* @__PURE__ */ a.jsxs(
          "div",
          {
            className: "wf-grid-row",
            role: "row",
            "aria-label": `Open workflow definition ${V.name}`,
            "aria-selected": S.has(V.id),
            tabIndex: 0,
            onClick: () => n(V.id),
            onKeyDown: (Z) => {
              Z.currentTarget === Z.target && (Z.key !== "Enter" && Z.key !== " " || (Z.preventDefault(), n(V.id)));
            },
            children: [
              /* @__PURE__ */ a.jsx("label", { className: "wf-row-select", onClick: (Z) => Z.stopPropagation(), children: /* @__PURE__ */ a.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: S.has(V.id),
                  onChange: (Z) => R(V.id, Z.target.checked),
                  "aria-label": `Select workflow definition ${V.name}`
                }
              ) }),
              /* @__PURE__ */ a.jsxs("span", { children: [
                /* @__PURE__ */ a.jsx("strong", { children: V.name }),
                /* @__PURE__ */ a.jsx("small", { children: V.description || V.id })
              ] }),
              /* @__PURE__ */ a.jsx("span", { children: V.latestVersion ?? "No version" }),
              /* @__PURE__ */ a.jsx("span", { children: i === "deleted" ? Ge(V.deletedAt) : V.draftId ? "Draft" : "None" }),
              /* @__PURE__ */ a.jsx("span", { children: Ge(V.lastModifiedAt) }),
              /* @__PURE__ */ a.jsx("span", { className: "wf-row-actions", onClick: (Z) => Z.stopPropagation(), children: i === "active" ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
                /* @__PURE__ */ a.jsx("button", { type: "button", onClick: (Z) => {
                  Z.stopPropagation(), n(V.id);
                }, children: "Open" }),
                /* @__PURE__ */ a.jsx("button", { type: "button", onClick: (Z) => {
                  Z.stopPropagation(), ne(V.id);
                }, children: "Artifacts" }),
                T ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => mt(t, T, V), children: [
                  /* @__PURE__ */ a.jsx(yt, { size: 13 }),
                  " Explain"
                ] }) : null,
                /* @__PURE__ */ a.jsxs("button", { type: "button", className: "danger", onClick: () => {
                  G(V);
                }, children: [
                  /* @__PURE__ */ a.jsx(pi, { size: 13 }),
                  " Delete"
                ] })
              ] }) : /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
                /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => {
                  ee(V);
                }, children: [
                  /* @__PURE__ */ a.jsx(fr, { size: 13 }),
                  " Restore"
                ] }),
                /* @__PURE__ */ a.jsxs("button", { type: "button", className: "danger", onClick: () => {
                  le(V);
                }, children: [
                  /* @__PURE__ */ a.jsx(pi, { size: 13 }),
                  " Delete permanently"
                ] })
              ] }) })
            ]
          },
          V.id
        ))
      ] }),
      /* @__PURE__ */ a.jsx(
        C0,
        {
          page: c,
          pageSize: l,
          totalCount: g,
          onPageChange: d,
          onPageSizeChange: (V) => {
            u(V), d(1);
          }
        }
      )
    ] }) : null,
    C ? /* @__PURE__ */ a.jsx(
      f0,
      {
        draft: C,
        activities: j,
        catalogState: H,
        creating: $,
        suggestMetadataAction: A,
        onSuggestMetadata: A ? () => mt(t, A, { draft: C, activities: j }) : void 0,
        onChange: (V) => P(V),
        onClose: () => P(null),
        onSubmit: K
      }
    ) : null
  ] });
}
function f0({ draft: e, activities: t, catalogState: n, creating: o, suggestMetadataAction: r, onSuggestMetadata: i, onChange: s, onClose: c, onSubmit: d }) {
  const l = me(() => _0(t), [t]), u = A0(e, t), f = (h) => {
    if (h.startsWith("kind:")) {
      s({ ...e, rootKind: h.slice(5), rootActivityVersionId: null });
      return;
    }
    const p = t.find((y) => y.activityVersionId === h);
    s({
      ...e,
      rootKind: ud(p) ?? e.rootKind,
      rootActivityVersionId: h
    });
  };
  return /* @__PURE__ */ a.jsx("div", { className: "wf-dialog-backdrop", role: "presentation", children: /* @__PURE__ */ a.jsx("section", { className: "wf-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": "workflow-create-title", children: /* @__PURE__ */ a.jsxs(
    "form",
    {
      onSubmit: (h) => {
        h.preventDefault(), d();
      },
      children: [
        /* @__PURE__ */ a.jsxs("div", { className: "wf-dialog-heading", children: [
          /* @__PURE__ */ a.jsx("h3", { id: "workflow-create-title", children: "Create Workflow" }),
          r ? /* @__PURE__ */ a.jsxs("button", { type: "button", className: "wf-ai-action", onClick: i, title: r.description ?? r.label, children: [
            /* @__PURE__ */ a.jsx(yt, { size: 13 }),
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
              value: u,
              onChange: (h) => f(h.target.value),
              disabled: n === "loading",
              children: [
                /* @__PURE__ */ a.jsx("optgroup", { label: "Composite roots", children: l.compositeRoots.map((h) => /* @__PURE__ */ a.jsx("option", { value: h.value, children: h.label }, h.value)) }),
                l.otherCategories.map((h) => /* @__PURE__ */ a.jsx("optgroup", { label: h.name, children: h.activities.map((p) => /* @__PURE__ */ a.jsx("option", { value: p.activityVersionId, children: Ce(p) }, p.activityVersionId)) }, h.name))
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
function h0({ context: e, ai: t, definitionFilter: n, onDefinitionFilterChange: o }) {
  const [r, i] = Y("loading"), [s, c] = Y(""), [d, l] = Y(""), [u, f] = Y([]), h = n?.trim().toLowerCase() ?? "", p = me(
    () => h ? u.filter((S) => P0(S, h)) : u,
    [h, u]
  ), y = me(
    () => Array.from(new Set(u.flatMap((S) => [
      S.definitionId,
      S.definitionVersionId,
      S.sourceId
    ]).filter((S) => !!S))).sort((S, k) => S.localeCompare(k)),
    [u]
  ), v = zt(t, "weaver.workflows.explain-executable"), w = he(async () => {
    i("loading"), c("");
    try {
      f(await Bl(e)), i("ready");
    } catch (S) {
      c(S instanceof Error ? S.message : String(S)), i("failed");
    }
  }, [e]);
  oe(() => {
    w();
  }, [w]);
  const m = async (S) => {
    l(""), c("");
    try {
      await Fl(e, S.artifactId), l(`Started ${S.artifactId}`);
    } catch (k) {
      c(k instanceof Error ? k.message : String(k));
    }
  }, N = (S) => {
    v && mt(t, v, S) && (c(""), l(`Sent ${S.artifactId} to Weaver`));
  }, g = (S) => {
    c(""), l(`Copied ${S}`);
  }, x = (S) => {
    l(""), c(`Could not copy ${S}.`);
  };
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-toolbar", children: [
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => {
        w();
      }, children: "Refresh" }),
      /* @__PURE__ */ a.jsxs("label", { className: "wf-search wf-executable-definition-filter", children: [
        /* @__PURE__ */ a.jsx(Vl, { size: 14 }),
        /* @__PURE__ */ a.jsx(
          "input",
          {
            "aria-label": "Filter executables by workflow definition",
            list: "wf-executable-definition-options",
            placeholder: "Filter by definition ID",
            value: n ?? "",
            onChange: (S) => o(S.currentTarget.value || null)
          }
        )
      ] }),
      /* @__PURE__ */ a.jsx("datalist", { id: "wf-executable-definition-options", children: y.map((S) => /* @__PURE__ */ a.jsx("option", { value: S }, S)) }),
      n ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => o(null), children: [
        /* @__PURE__ */ a.jsx(Ol, { size: 13 }),
        " Clear"
      ] }) : null
    ] }),
    r === "failed" ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(Be, { size: 16 }),
      " ",
      s
    ] }) : null,
    d ? /* @__PURE__ */ a.jsxs("div", { className: "wf-status-line", children: [
      /* @__PURE__ */ a.jsx(Rt, { size: 14 }),
      " ",
      d
    ] }) : null,
    r === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Loading workflow executables..." }) : null,
    r === "ready" && p.length === 0 ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: n ? "No workflow executables match this definition filter." : "No workflow executables found. Publish a workflow definition to create one." }) : null,
    r === "ready" && p.length > 0 ? /* @__PURE__ */ a.jsxs("div", { className: "wf-grid wf-executable-grid", role: "table", "aria-label": "Workflow executables", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "wf-grid-head", role: "row", children: [
        /* @__PURE__ */ a.jsx("span", { children: "Artifact" }),
        /* @__PURE__ */ a.jsx("span", { children: "Version" }),
        /* @__PURE__ */ a.jsx("span", { children: "Source" }),
        /* @__PURE__ */ a.jsx("span", { children: "Root" }),
        /* @__PURE__ */ a.jsx("span", { children: "Published" }),
        /* @__PURE__ */ a.jsx("span", { children: "Actions" })
      ] }),
      p.map((S) => /* @__PURE__ */ a.jsxs("div", { className: "wf-grid-row", role: "row", children: [
        /* @__PURE__ */ a.jsxs("span", { className: "wf-artifact-cell", children: [
          /* @__PURE__ */ a.jsxs("span", { className: "wf-cell-line", children: [
            /* @__PURE__ */ a.jsx("strong", { title: S.artifactId, children: S.artifactId }),
            /* @__PURE__ */ a.jsx(Ut, { value: S.artifactId, ariaLabel: `Copy artifact ID ${S.artifactId}`, copiedLabel: "artifact ID", onCopied: g, onCopyFailed: x })
          ] }),
          /* @__PURE__ */ a.jsxs("span", { className: "wf-cell-line wf-cell-line-muted", children: [
            /* @__PURE__ */ a.jsx("small", { title: S.artifactHash, children: S.artifactHash }),
            /* @__PURE__ */ a.jsx(Ut, { value: S.artifactHash, ariaLabel: `Copy artifact hash ${S.artifactHash}`, copiedLabel: "artifact hash", onCopied: g, onCopyFailed: x })
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("span", { className: "wf-cell-line wf-version-cell", children: [
          /* @__PURE__ */ a.jsx("span", { children: S.artifactVersion }),
          /* @__PURE__ */ a.jsx(Ut, { value: S.artifactVersion, ariaLabel: `Copy artifact version ${S.artifactVersion}`, copiedLabel: "artifact version", onCopied: g, onCopyFailed: x })
        ] }),
        /* @__PURE__ */ a.jsx(p0, { executable: S, onCopied: g, onCopyFailed: x }),
        /* @__PURE__ */ a.jsx("span", { children: yd(S) }),
        /* @__PURE__ */ a.jsx("span", { children: Ge(S.publishedAt ?? S.createdAt) }),
        /* @__PURE__ */ a.jsxs("span", { className: "wf-row-actions", children: [
          /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => {
            m(S);
          }, children: [
            /* @__PURE__ */ a.jsx(ur, { size: 13 }),
            " Run"
          ] }),
          v ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => N(S), children: [
            /* @__PURE__ */ a.jsx(yt, { size: 13 }),
            " Explain"
          ] }) : null
        ] })
      ] }, S.artifactId))
    ] }) : null
  ] });
}
function p0({ executable: e, onCopied: t, onCopyFailed: n }) {
  const o = e.sourceId || e.definitionVersionId || e.definitionId, r = e.sourceVersion;
  return /* @__PURE__ */ a.jsxs("span", { className: "wf-source-cell", children: [
    /* @__PURE__ */ a.jsx("span", { className: "wf-source-kind", children: md(e.sourceKind) }),
    o ? /* @__PURE__ */ a.jsxs("span", { className: "wf-cell-line", children: [
      /* @__PURE__ */ a.jsx("code", { title: o, children: o }),
      /* @__PURE__ */ a.jsx(Ut, { value: o, ariaLabel: `Copy source ID ${o}`, copiedLabel: "source ID", onCopied: t, onCopyFailed: n })
    ] }) : null,
    r ? /* @__PURE__ */ a.jsxs("small", { children: [
      "Version ",
      r
    ] }) : null
  ] });
}
function Ut({ value: e, ariaLabel: t, copiedLabel: n, onCopied: o, onCopyFailed: r }) {
  if (!e) return null;
  const i = async (s) => {
    s.preventDefault(), s.stopPropagation();
    try {
      await z0(e), o(n);
    } catch {
      r(n);
    }
  };
  return /* @__PURE__ */ a.jsx("button", { type: "button", className: "wf-copy-button", "aria-label": t, title: t, onClick: (s) => {
    i(s);
  }, children: /* @__PURE__ */ a.jsx(Om, { size: 12 }) });
}
function g0({ context: e, ai: t, definitionId: n, publishedArtifactId: o }) {
  const [r, i] = Y("loading"), [s, c] = Y(""), [d, l] = Y(""), [u, f] = Y([]), h = zt(t, "weaver.workflows.explain-executable"), p = he(async () => {
    i("loading"), c("");
    try {
      const g = await Bl(e);
      f(g.filter((x) => $0(x, n)).sort(T0)), i("ready");
    } catch (g) {
      c(g instanceof Error ? g.message : String(g)), f([]), i("failed");
    }
  }, [e, n]);
  oe(() => {
    p();
  }, [p, o]);
  const y = async (g) => {
    l(""), c("");
    try {
      await Fl(e, g.artifactId), l(`Started ${g.artifactId}`);
    } catch (x) {
      c(x instanceof Error ? x.message : String(x));
    }
  }, v = (g) => {
    h && mt(t, h, g) && (c(""), l(`Sent ${g.artifactId} to Weaver`));
  }, w = () => {
    window.history.pushState({}, "", `/workflows/executables?definition=${encodeURIComponent(n)}`), window.dispatchEvent(new PopStateEvent("popstate"));
  }, m = (g) => {
    c(""), l(`Copied ${g}`);
  }, N = (g) => {
    l(""), c(`Could not copy ${g}.`);
  };
  return /* @__PURE__ */ a.jsxs("div", { className: "wf-artifacts-panel", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-artifacts-toolbar", children: [
      /* @__PURE__ */ a.jsxs("span", { children: [
        u.length,
        " artifact",
        u.length === 1 ? "" : "s"
      ] }),
      /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => {
        p();
      }, children: [
        /* @__PURE__ */ a.jsx(fr, { size: 13 }),
        " Refresh"
      ] }),
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: w, children: "Open list" })
    ] }),
    r === "failed" ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert compact", children: [
      /* @__PURE__ */ a.jsx(Be, { size: 14 }),
      " ",
      s
    ] }) : null,
    d ? /* @__PURE__ */ a.jsxs("div", { className: "wf-status-line compact", children: [
      /* @__PURE__ */ a.jsx(Rt, { size: 13 }),
      " ",
      d
    ] }) : null,
    r === "loading" ? /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "Loading artifacts..." }) : null,
    r === "ready" && u.length === 0 ? /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "No published artifacts for this workflow yet." }) : null,
    r === "ready" && u.length > 0 ? /* @__PURE__ */ a.jsx("div", { className: "wf-artifact-list", role: "list", "aria-label": "Workflow artifacts", children: u.map((g) => /* @__PURE__ */ a.jsxs("article", { className: "wf-artifact-card", role: "listitem", "data-active": g.artifactId === o ? "true" : void 0, children: [
      /* @__PURE__ */ a.jsxs("div", { className: "wf-artifact-card-heading", children: [
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsxs("span", { className: "wf-artifact-version", children: [
            "Version ",
            g.artifactVersion
          ] }),
          g.artifactId === o ? /* @__PURE__ */ a.jsx("span", { className: "wf-chip", children: "Latest publish" }) : null
        ] }),
        /* @__PURE__ */ a.jsx("span", { children: Ge(g.publishedAt ?? g.createdAt) })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "wf-artifact-card-values", children: [
        /* @__PURE__ */ a.jsxs("span", { className: "wf-cell-line", children: [
          /* @__PURE__ */ a.jsx("code", { title: g.artifactId, children: g.artifactId }),
          /* @__PURE__ */ a.jsx(Ut, { value: g.artifactId, ariaLabel: `Copy artifact ID ${g.artifactId}`, copiedLabel: "artifact ID", onCopied: m, onCopyFailed: N })
        ] }),
        /* @__PURE__ */ a.jsxs("span", { className: "wf-cell-line wf-cell-line-muted", children: [
          /* @__PURE__ */ a.jsx("code", { title: g.artifactHash, children: g.artifactHash }),
          /* @__PURE__ */ a.jsx(Ut, { value: g.artifactHash, ariaLabel: `Copy artifact hash ${g.artifactHash}`, copiedLabel: "artifact hash", onCopied: m, onCopyFailed: N })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("dl", { children: [
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("dt", { children: "Source" }),
          /* @__PURE__ */ a.jsxs("dd", { children: [
            md(g.sourceKind),
            " ",
            g.sourceVersion ? `v${g.sourceVersion}` : ""
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { children: [
          /* @__PURE__ */ a.jsx("dt", { children: "Root" }),
          /* @__PURE__ */ a.jsx("dd", { children: yd(g) })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "wf-row-actions", children: [
        /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => {
          y(g);
        }, children: [
          /* @__PURE__ */ a.jsx(ur, { size: 13 }),
          " Run"
        ] }),
        h ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => v(g), children: [
          /* @__PURE__ */ a.jsx(yt, { size: 13 }),
          " Explain"
        ] }) : null
      ] })
    ] }, g.artifactId)) }) : null
  ] });
}
function y0({ context: e, definitionId: t, currentRun: n, runs: o }) {
  const [r, i] = Y("loading"), [s, c] = Y(""), [d, l] = Y([]), u = m0(n ? [n, ...o] : o), f = n ? u.slice(1) : u, h = he(async () => {
    i("loading"), c("");
    try {
      const p = await Wl(e, { definitionId: t, take: 8 });
      l(p), i("ready");
    } catch (p) {
      c(p instanceof Error ? p.message : String(p)), l([]), i("failed");
    }
  }, [e, t]);
  return oe(() => {
    h();
  }, [h, n?.workflowExecutionId]), /* @__PURE__ */ a.jsxs("div", { id: "wf-test-runs-panel", className: "wf-test-runs-panel", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-artifacts-toolbar", children: [
      /* @__PURE__ */ a.jsxs("span", { children: [
        u.length,
        " transient run",
        u.length === 1 ? "" : "s"
      ] }),
      /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => {
        h();
      }, children: [
        /* @__PURE__ */ a.jsx(fr, { size: 13 }),
        " Refresh"
      ] }),
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => x0(t), children: "Open list" })
    ] }),
    n ? /* @__PURE__ */ a.jsx(Ma, { testRun: n, current: !0 }) : /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "Run the current draft to inspect transient run details here." }),
    f.length > 0 ? /* @__PURE__ */ a.jsxs("section", { className: "wf-test-run-section", "aria-label": "Transient run session history", children: [
      /* @__PURE__ */ a.jsx("h4", { children: "Session history" }),
      /* @__PURE__ */ a.jsx("div", { className: "wf-test-run-list", children: f.map((p) => /* @__PURE__ */ a.jsx(Ma, { testRun: p }, p.testRunId)) })
    ] }) : null,
    /* @__PURE__ */ a.jsxs("section", { className: "wf-test-run-section", "aria-label": "Persisted workflow instance history", children: [
      /* @__PURE__ */ a.jsx("h4", { children: "Recent instances" }),
      r === "failed" ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert compact", children: [
        /* @__PURE__ */ a.jsx(Be, { size: 14 }),
        " ",
        s
      ] }) : null,
      r === "loading" ? /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "Loading recent instances..." }) : null,
      r === "ready" && d.length === 0 ? /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "No persisted instances for this workflow yet." }) : null,
      r === "ready" && d.length > 0 ? /* @__PURE__ */ a.jsx("div", { className: "wf-test-run-list", role: "list", "aria-label": "Recent workflow instances", children: d.map((p) => /* @__PURE__ */ a.jsx("div", { role: "listitem", children: /* @__PURE__ */ a.jsxs(
        "button",
        {
          type: "button",
          className: "wf-test-run-instance",
          onClick: () => Zi(p.workflowExecutionId),
          children: [
            /* @__PURE__ */ a.jsxs("span", { children: [
              /* @__PURE__ */ a.jsx("strong", { children: p.workflowExecutionId }),
              /* @__PURE__ */ a.jsx("small", { children: p.artifactId })
            ] }),
            /* @__PURE__ */ a.jsx(sn, { status: p.status, subStatus: p.subStatus }),
            /* @__PURE__ */ a.jsxs("small", { children: [
              p.activityCount,
              " activities · ",
              p.incidentCount,
              " incidents"
            ] }),
            /* @__PURE__ */ a.jsx("small", { children: Nd(p.startedAt ?? p.createdAt, p.completedAt ?? p.updatedAt) })
          ]
        }
      ) }, p.workflowExecutionId)) }) : null
    ] })
  ] });
}
function Ma({ testRun: e, current: t = !1 }) {
  const n = Ki(e), o = e.workflowExecutionId;
  return /* @__PURE__ */ a.jsxs("article", { className: "wf-test-run-card", "data-state": n ? "rejected" : "accepted", "data-current": t ? "true" : void 0, children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-test-run-card-heading", children: [
      /* @__PURE__ */ a.jsxs("div", { children: [
        n ? /* @__PURE__ */ a.jsx(Be, { size: 15 }) : /* @__PURE__ */ a.jsx(Rt, { size: 15 }),
        /* @__PURE__ */ a.jsx("strong", { children: n ? "Test run rejected" : "Test run dispatched" })
      ] }),
      /* @__PURE__ */ a.jsx("span", { children: t ? "Current draft" : "Session" })
    ] }),
    /* @__PURE__ */ a.jsx("small", { className: "wf-test-run-scope", children: "Ephemeral - not promoted" }),
    n && e.reason ? /* @__PURE__ */ a.jsx("p", { children: e.reason }) : null,
    /* @__PURE__ */ a.jsxs("dl", { children: [
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("dt", { children: "Status" }),
        /* @__PURE__ */ a.jsx("dd", { title: e.status, children: e.status })
      ] }),
      e.commandDispatchStatus ? /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("dt", { children: "Dispatch" }),
        /* @__PURE__ */ a.jsx("dd", { title: e.commandDispatchStatus, children: e.commandDispatchStatus })
      ] }) : null,
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("dt", { children: "Test run" }),
        /* @__PURE__ */ a.jsx("dd", { title: e.testRunId, children: e.testRunId })
      ] }),
      e.artifactId ? /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("dt", { children: "Artifact" }),
        /* @__PURE__ */ a.jsx("dd", { title: e.artifactId, children: e.artifactId })
      ] }) : null,
      o ? /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("dt", { children: "Execution" }),
        /* @__PURE__ */ a.jsx("dd", { title: o, children: o })
      ] }) : null,
      e.expiresAt ? /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("dt", { children: "Expires" }),
        /* @__PURE__ */ a.jsx("dd", { title: Ge(e.expiresAt), children: Ge(e.expiresAt) })
      ] }) : null
    ] }),
    o ? /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => Zi(o), children: "Open instance" }) : null
  ] });
}
function m0(e) {
  const t = /* @__PURE__ */ new Set();
  return e.filter((n) => t.has(n.testRunId) ? !1 : (t.add(n.testRunId), !0));
}
function Zi(e) {
  window.history.pushState({}, "", `/workflows/instances/${encodeURIComponent(e)}`), window.dispatchEvent(new PopStateEvent("popstate"));
}
function x0(e) {
  window.history.pushState({}, "", `/workflows/instances?definition=${encodeURIComponent(e)}`), window.dispatchEvent(new PopStateEvent("popstate"));
}
function w0({
  context: e,
  definitionFilter: t,
  onDefinitionFilterChange: n
}) {
  const [o, r] = Y("loading"), [i, s] = Y(""), [c, d] = Y(""), [l, u] = Y([]), f = t?.trim() || "", h = he(async () => {
    r("loading"), s("");
    try {
      const p = await Wl(e, {
        definitionId: f || void 0,
        status: c || void 0,
        take: 100
      });
      u(p), r("ready");
    } catch (p) {
      s(p instanceof Error ? p.message : String(p)), u([]), r("failed");
    }
  }, [e, f, c]);
  return oe(() => {
    h();
  }, [h]), /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-toolbar", children: [
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => {
        h();
      }, children: "Refresh" }),
      /* @__PURE__ */ a.jsxs("label", { className: "wf-toolbar-field", children: [
        /* @__PURE__ */ a.jsx("span", { children: "Definition" }),
        /* @__PURE__ */ a.jsx(
          "input",
          {
            "aria-label": "Filter workflow instances by definition",
            placeholder: "Definition id",
            value: f,
            onChange: (p) => n(p.target.value || null)
          }
        )
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "wf-toolbar-field", children: [
        /* @__PURE__ */ a.jsx("span", { children: "Status" }),
        /* @__PURE__ */ a.jsxs("select", { "aria-label": "Workflow instance status", value: c, onChange: (p) => d(p.target.value), children: [
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
    o === "failed" ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(Be, { size: 16 }),
      " ",
      i
    ] }) : null,
    o === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Loading workflow instances..." }) : null,
    o === "ready" && l.length === 0 ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "No workflow instances found. Run a published workflow executable to create instance history." }) : null,
    o === "ready" && l.length > 0 ? /* @__PURE__ */ a.jsxs("div", { className: "wf-grid wf-instance-grid", role: "table", "aria-label": "Workflow instances", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "wf-grid-head", role: "row", children: [
        /* @__PURE__ */ a.jsx("span", { children: "Instance" }),
        /* @__PURE__ */ a.jsx("span", { children: "Status" }),
        /* @__PURE__ */ a.jsx("span", { children: "Definition" }),
        /* @__PURE__ */ a.jsx("span", { children: "Activity" }),
        /* @__PURE__ */ a.jsx("span", { children: "Started" }),
        /* @__PURE__ */ a.jsx("span", { children: "Duration" })
      ] }),
      l.map((p) => /* @__PURE__ */ a.jsxs(
        "button",
        {
          type: "button",
          className: "wf-grid-row",
          role: "row",
          "aria-label": `Inspect workflow instance ${p.workflowExecutionId}`,
          onClick: () => Zi(p.workflowExecutionId),
          children: [
            /* @__PURE__ */ a.jsxs("span", { children: [
              /* @__PURE__ */ a.jsx("strong", { children: p.workflowExecutionId }),
              /* @__PURE__ */ a.jsx("small", { children: p.artifactId })
            ] }),
            /* @__PURE__ */ a.jsx("span", { children: /* @__PURE__ */ a.jsx(sn, { status: p.status, subStatus: p.subStatus }) }),
            /* @__PURE__ */ a.jsxs("span", { children: [
              /* @__PURE__ */ a.jsx("strong", { children: p.definitionId }),
              /* @__PURE__ */ a.jsx("small", { children: p.definitionVersionId })
            ] }),
            /* @__PURE__ */ a.jsxs("span", { children: [
              /* @__PURE__ */ a.jsxs("strong", { children: [
                p.activityCount,
                " activities"
              ] }),
              /* @__PURE__ */ a.jsxs("small", { children: [
                p.incidentCount,
                " incidents"
              ] })
            ] }),
            /* @__PURE__ */ a.jsx("span", { children: Ge(p.startedAt ?? p.createdAt) }),
            /* @__PURE__ */ a.jsx("span", { children: Nd(p.startedAt ?? p.createdAt, p.completedAt ?? p.updatedAt) })
          ]
        },
        p.workflowExecutionId
      ))
    ] }) : null
  ] });
}
function v0({ context: e, ai: t, workflowExecutionId: n }) {
  const [o, r] = Y("loading"), [i, s] = Y(""), [c, d] = Y(null), [l, u] = Y(null), f = zt(t, "weaver.workflows.explain-instance"), h = he(async () => {
    if (!n) {
      s("No workflow execution id was provided."), r("failed");
      return;
    }
    r("loading"), s("");
    try {
      const y = await rx(e, n), [v, w] = await Promise.all([
        Um(e, y.instance.definitionVersionId).then(
          (m) => ({ definitionVersion: m, error: "" }),
          (m) => ({ definitionVersion: null, error: m instanceof Error ? m.message : String(m) })
        ),
        Fi(e)
      ]);
      d({
        details: y,
        definitionVersion: v.definitionVersion,
        definitionVersionError: v.error,
        activityCatalog: w.activities
      }), u(null), r("ready");
    } catch (y) {
      d(null), s(y instanceof Error ? y.message : String(y)), r("failed");
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
        /* @__PURE__ */ a.jsx(Zo, { size: 14 }),
        " Instances"
      ] }),
      /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => {
        h();
      }, children: [
        /* @__PURE__ */ a.jsx(fr, { size: 14 }),
        " Refresh"
      ] }),
      c && f ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => mt(t, f, c.details), children: [
        /* @__PURE__ */ a.jsx(yt, { size: 13 }),
        " Explain"
      ] }) : null
    ] }),
    o === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Loading workflow instance..." }) : null,
    o === "failed" ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(Be, { size: 16 }),
      " ",
      i
    ] }) : null,
    o === "ready" && c ? /* @__PURE__ */ a.jsxs("div", { className: "wf-instance-detail-workbench", children: [
      /* @__PURE__ */ a.jsx(
        b0,
        {
          definitionVersion: c.definitionVersion,
          definitionVersionError: c.definitionVersionError,
          activityCatalog: c.activityCatalog,
          details: c.details,
          selectedEvidenceId: l,
          onSelectEvidence: u
        }
      ),
      /* @__PURE__ */ a.jsx(
        N0,
        {
          ai: t,
          action: f,
          summary: c.details.instance,
          details: c.details,
          state: "ready",
          error: "",
          selectedEvidenceId: l,
          onSelectEvidence: u,
          graphNodeIds: c.definitionVersion ? I0(c.definitionVersion, c.activityCatalog) : void 0
        }
      )
    ] }) : null
  ] });
}
function b0({ definitionVersion: e, definitionVersionError: t, activityCatalog: n, details: o, selectedEvidenceId: r, onSelectEvidence: i }) {
  const s = me(() => {
    if (!e) return { nodes: [], edges: [] };
    const c = e.state.rootActivity;
    if (!c) return { nodes: [], edges: [] };
    const d = n.find((p) => p.activityVersionId === c.activityVersionId), l = Bi(c, d), u = l === "unsupported" ? null : Dn(c, []), f = l === "unsupported" ? gi(c, n, e.layout) : u ? ql(u, n, e.layout) : gi(c, n, e.layout), h = f.nodes.map((p) => ({
      ...p,
      draggable: !1,
      connectable: !1,
      deletable: !1
    }));
    return {
      nodes: cx(h, o.activities, o.incidents, r),
      edges: f.edges.map((p) => ({ ...p, deletable: !1 }))
    };
  }, [n, e, o, r]);
  return /* @__PURE__ */ a.jsxs("section", { className: "wf-instance-canvas-shell", "aria-label": "Workflow instance canvas", children: [
    /* @__PURE__ */ a.jsxs("header", { children: [
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("span", { children: "Definition version" }),
        /* @__PURE__ */ a.jsx("h3", { children: e ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
          e.definition.name,
          " ",
          /* @__PURE__ */ a.jsx("small", { children: e.version })
        ] }) : /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
          "Definition graph unavailable ",
          /* @__PURE__ */ a.jsx("small", { children: o.instance.definitionVersionId })
        ] }) })
      ] }),
      /* @__PURE__ */ a.jsx(sn, { status: o.instance.status, subStatus: o.instance.subStatus })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "wf-instance-canvas", children: [
      e ? null : /* @__PURE__ */ a.jsxs("div", { className: "wf-empty", children: [
        "The workflow instance loaded, but its definition graph could not be resolved for this version.",
        t ? /* @__PURE__ */ a.jsx("small", { children: ew(t) }) : null
      ] }),
      e && s.nodes.length === 0 ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "No workflow activities are available for this definition version." }) : null,
      s.nodes.length > 0 ? /* @__PURE__ */ a.jsxs(
        Cl,
        {
          nodes: s.nodes,
          edges: s.edges,
          nodeTypes: sd,
          edgeTypes: ad,
          fitView: !0,
          nodesDraggable: !1,
          nodesConnectable: !1,
          elementsSelectable: !0,
          onNodeClick: (c, d) => i(d.id),
          onPaneClick: () => i(null),
          children: [
            /* @__PURE__ */ a.jsx(_l, {}),
            /* @__PURE__ */ a.jsx(Pl, { pannable: !0, zoomable: !0 }),
            /* @__PURE__ */ a.jsx(Ml, {})
          ]
        }
      ) : null
    ] })
  ] });
}
function N0({ ai: e, action: t, summary: n, details: o, state: r, error: i, selectedEvidenceId: s = null, onSelectEvidence: c, graphNodeIds: d }) {
  return n ? /* @__PURE__ */ a.jsxs("aside", { className: "wf-instance-inspector", "aria-label": "Workflow instance details", children: [
    /* @__PURE__ */ a.jsxs("header", { children: [
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("span", { children: "Workflow instance" }),
        /* @__PURE__ */ a.jsx("h3", { children: n.workflowExecutionId })
      ] }),
      t ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => mt(e, t, o ?? n), children: [
        /* @__PURE__ */ a.jsx(yt, { size: 13 }),
        " Explain"
      ] }) : null
    ] }),
    /* @__PURE__ */ a.jsxs("dl", { className: "wf-instance-meta", children: [
      /* @__PURE__ */ a.jsx("dt", { children: "Status" }),
      /* @__PURE__ */ a.jsx("dd", { children: /* @__PURE__ */ a.jsx(sn, { status: n.status, subStatus: n.subStatus }) }),
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
      /* @__PURE__ */ a.jsx("dd", { children: Ge(n.createdAt) }),
      /* @__PURE__ */ a.jsx("dt", { children: "Started" }),
      /* @__PURE__ */ a.jsx("dd", { children: Ge(n.startedAt) }),
      /* @__PURE__ */ a.jsx("dt", { children: "Completed" }),
      /* @__PURE__ */ a.jsx("dd", { children: Ge(n.completedAt) }),
      /* @__PURE__ */ a.jsx("dt", { children: "Correlation" }),
      /* @__PURE__ */ a.jsx("dd", { children: n.correlationId || "None" })
    ] }),
    r === "loading" ? /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Loading instance details..." }) : null,
    r === "failed" ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(Be, { size: 16 }),
      " ",
      i
    ] }) : null,
    r === "ready" && o ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsx(S0, { activities: o.activities, selectedEvidenceId: s, onSelectEvidence: c }),
      /* @__PURE__ */ a.jsx(E0, { incidents: o.incidents, selectedEvidenceId: s, onSelectEvidence: c }),
      /* @__PURE__ */ a.jsx(k0, { details: o, graphNodeIds: d })
    ] }) : null
  ] }) : /* @__PURE__ */ a.jsx("aside", { className: "wf-instance-inspector", children: /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: "Select a workflow instance to inspect activity history." }) });
}
function S0({ activities: e, selectedEvidenceId: t = null, onSelectEvidence: n }) {
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
          /* @__PURE__ */ a.jsx("span", { children: /* @__PURE__ */ a.jsx(sn, { status: o.status, subStatus: o.subStatus }) }),
          /* @__PURE__ */ a.jsx("strong", { children: Ui(o.activityType) ?? o.activityType }),
          /* @__PURE__ */ a.jsx("small", { children: o.activityExecutionId }),
          /* @__PURE__ */ a.jsx("time", { children: Ge(o.scheduledAt) })
        ]
      },
      o.activityExecutionId
    )) }) : null
  ] });
}
function E0({ incidents: e, selectedEvidenceId: t = null, onSelectEvidence: n }) {
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
function k0({ details: e, graphNodeIds: t }) {
  if (!t) return null;
  const n = new Map(e.activities.map((i) => [i.activityExecutionId, i])), o = e.activities.filter((i) => !t.has(Da(i))), r = e.incidents.filter((i) => {
    const s = i.activityExecutionId ? n.get(i.activityExecutionId) : null, c = i.executableNodeId ?? (s ? Da(s) : "");
    return !c || !t.has(c);
  });
  return o.length === 0 && r.length === 0 ? null : /* @__PURE__ */ a.jsxs("section", { className: "wf-instance-section", children: [
    /* @__PURE__ */ a.jsx("h4", { children: "Unmatched runtime evidence" }),
    /* @__PURE__ */ a.jsxs("div", { className: "wf-instance-unmatched-list", children: [
      o.map((i) => /* @__PURE__ */ a.jsxs("div", { className: "wf-instance-unmatched", children: [
        /* @__PURE__ */ a.jsx("strong", { children: Ui(i.activityType) ?? i.activityType }),
        /* @__PURE__ */ a.jsx("small", { children: i.activityExecutionId })
      ] }, `activity-${i.activityExecutionId}`)),
      r.map((i) => /* @__PURE__ */ a.jsxs("div", { className: "wf-instance-unmatched", children: [
        /* @__PURE__ */ a.jsx("strong", { children: i.failureType }),
        /* @__PURE__ */ a.jsx("small", { children: i.incidentId })
      ] }, `incident-${i.incidentId}`))
    ] })
  ] });
}
function sn({ status: e, subStatus: t }) {
  return /* @__PURE__ */ a.jsx("span", { className: "wf-status-badge", "data-status": e.toLowerCase(), children: t ? `${e} · ${t}` : e });
}
function I0(e, t) {
  const n = e.state.rootActivity;
  if (!n) return /* @__PURE__ */ new Set();
  const o = t.find((i) => i.activityVersionId === n.activityVersionId);
  if (Bi(n, o) === "unsupported") return /* @__PURE__ */ new Set([n.nodeId]);
  const r = Dn(n, []);
  return new Set(r?.slot.activities.map((i) => i.nodeId) ?? [n.nodeId]);
}
function Da(e) {
  return e.authoredActivityId || e.executableNodeId;
}
function C0({ page: e, pageSize: t, totalCount: n, onPageChange: o, onPageSizeChange: r }) {
  const i = dd(n, t), s = n === 0 ? 0 : (e - 1) * t + 1, c = Math.min(e * t, n);
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
      /* @__PURE__ */ a.jsx("select", { value: t, onChange: (d) => r(Number(d.target.value)), children: n0.map((d) => /* @__PURE__ */ a.jsx("option", { value: d, children: d }, d)) })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "wf-page-controls", children: [
      /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => o(e - 1), disabled: e <= 1, "aria-label": "Previous page", title: "Previous page", children: [
        /* @__PURE__ */ a.jsx(Zo, { size: 14 }),
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
        /* @__PURE__ */ a.jsx(Wt, { size: 14 })
      ] })
    ] })
  ] });
}
function j0(e, t, n) {
  return e.slice((t - 1) * n, t * n);
}
function dd(e, t) {
  return Math.max(1, Math.ceil(e / t));
}
function zt(e, t) {
  return e.promptActions.list().find((n) => n.id === t) ?? null;
}
function mt(e, t, n) {
  const o = t.createPrompt(n);
  return o ? (e.dispatchPrompt(o), !0) : !1;
}
function _0(e) {
  const t = Jo(e, "flowchart"), n = Jo(e, "sequence"), o = [
    { value: t?.activityVersionId ?? "kind:flowchart", label: "Flowchart" },
    { value: n?.activityVersionId ?? "kind:sequence", label: "Sequence" }
  ], r = /* @__PURE__ */ new Map();
  for (const s of e.filter(gd)) {
    if (D0(s)) continue;
    const c = s.category || "Uncategorized";
    r.set(c, [...r.get(c) ?? [], s]);
  }
  const i = Array.from(r.entries()).sort(([s], [c]) => s.localeCompare(c)).map(([s, c]) => ({
    name: s,
    activities: c.sort((d, l) => Ce(d).localeCompare(Ce(l)))
  }));
  return { compositeRoots: o, otherCategories: i };
}
function A0(e, t) {
  return e.rootActivityVersionId ?? Jo(t, e.rootKind)?.activityVersionId ?? `kind:${e.rootKind}`;
}
function M0(e, t) {
  return e.rootActivityVersionId ?? Jo(t, e.rootKind)?.activityVersionId ?? null;
}
function Jo(e, t) {
  return e.find((n) => ud(n) === t);
}
function ud(e) {
  return e ? hd(e) ? "flowchart" : pd(e) ? "sequence" : null : null;
}
function fd(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const o = n.category?.trim() || "Uncategorized";
    t.set(o, [...t.get(o) ?? [], n]);
  }
  return Array.from(t.entries()).sort(([n], [o]) => n.localeCompare(o)).map(([n, o]) => ({
    category: n,
    activities: o.sort((r, i) => Ce(r).localeCompare(Ce(i)))
  }));
}
function D0(e) {
  return hd(e) || pd(e);
}
function hd(e) {
  return Ce(e) === "Flowchart" || e.activityTypeKey.endsWith(".Flowchart");
}
function pd(e) {
  return Ce(e) === "Sequence" || e.activityTypeKey.endsWith(".Sequence");
}
function gd(e) {
  return e.isBrowsable !== !1 && e.browsable !== !1;
}
function yd(e) {
  return R0(e.rootActivityType) || e.rootActivityType;
}
function P0(e, t) {
  return [
    e.definitionId,
    e.definitionVersionId,
    e.sourceId,
    e.sourceVersion
  ].some((n) => n?.toLowerCase().includes(t));
}
function $0(e, t) {
  return e.definitionId === t || e.sourceId === t;
}
function T0(e, t) {
  return Pa(t) - Pa(e);
}
function Pa(e) {
  const t = e.publishedAt ?? e.createdAt, n = t ? new Date(t).getTime() : 0;
  return Number.isNaN(n) ? 0 : n;
}
function md(e) {
  const t = e?.trim().toLowerCase() ?? "";
  return !t || t === "definition" || t === "workflowdefinition" ? "Definition" : t === "definitionversion" || t === "workflowdefinitionversion" ? "Definition version" : e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (n) => n.toUpperCase());
}
async function z0(e) {
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
function R0(e) {
  return e.split(".").filter(Boolean).at(-1) ?? e;
}
function L0(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    jo(t, n.typeName, n), jo(t, n.name, n), jo(t, n.displayName, n);
    const o = n.typeName.split(".").filter(Boolean).at(-1);
    jo(t, o, n);
  }
  return t;
}
function V0(e, t, n) {
  const o = t.get(e.activityVersionId);
  return n.get(_n(o?.activityTypeKey)) ?? n.get(_n(Ui(o?.activityTypeKey))) ?? n.get(_n(o?.displayName)) ?? n.get(_n(e.activityVersionId)) ?? null;
}
function jo(e, t, n) {
  const o = _n(t);
  o && !e.has(o) && e.set(o, n);
}
function _n(e) {
  return e?.trim().toLowerCase() ?? "";
}
function Ui(e) {
  return e?.split(".").filter(Boolean).at(-1);
}
function $a(e, t, n, o) {
  const r = gr();
  if (!r) return t;
  const i = r.getItem(e);
  if (i == null) return t;
  const s = Number(i);
  return Number.isFinite(s) ? zo(s, n, o) : t;
}
function Ta(e, t) {
  const n = gr();
  if (!n) return t;
  const o = n.getItem(e);
  return o === "true" ? !0 : o === "false" ? !1 : t;
}
function H0() {
  const e = gr();
  if (!e) return null;
  const t = e.getItem(cd);
  return t === "palette" || t === "inspector" ? t : null;
}
function gr() {
  if (typeof window > "u") return null;
  const e = window.localStorage;
  return e && typeof e.getItem == "function" && typeof e.setItem == "function" && typeof e.removeItem == "function" ? e : null;
}
function In(e, t) {
  const n = gr();
  n && (t == null ? n.removeItem(e) : n.setItem(e, t));
}
function zo(e, t, n) {
  return Math.min(n, Math.max(t, Math.round(e)));
}
function O0({
  context: e,
  definitionId: t,
  ai: n,
  propertyEditors: o,
  workflowDesignerPanels: r,
  onBack: i
}) {
  const [s, c] = Y(null), [d, l] = Y(null), [u, f] = Y([]), [h, p] = Y([]), [y, v] = Y($o), [w, m] = Y("loading"), [N, g] = Y([]), [x, S] = Y([]), [k, C] = Y([]), [P, $] = Y(null), [F, j] = Y(null), [z, H] = Y(null), [E, _] = Y(null), [I, A] = Y(""), [T, D] = Y(""), [W, O] = Y("idle"), [B, U] = Y(null), [K, ne] = Y([]), [se, Q] = Y(!1), [R, q] = Y(null), [ae, ie] = Y(() => /* @__PURE__ */ new Set()), [G, ee] = Y(() => $a(ka, r0, Nn, Sn)), [le, V] = Y(() => $a(Ia, i0, En, kn)), [Z, pe] = Y(() => Ta(Ca, !1)), [ge, _e] = Y(() => Ta(ja, !1)), [ye, Ae] = Y(H0), [wt, ot] = Y("activities"), [rt, Pe] = Y("inspector"), Ee = ce(null), $e = ce(null), We = ce(""), an = ce(0), Lt = ce(Promise.resolve()), cn = ce(/* @__PURE__ */ new Map()), Vt = ce(null), dt = ce(null), vt = ce(!1), bt = d?.state.rootActivity ?? null, Qe = me(() => new Map(u.map((b) => [b.activityVersionId, b])), [u]), Gn = me(() => L0(h), [h]), Le = me(() => Yl(bt, N), [bt, N]), Jn = Bi(Le, Le ? Qe.get(Le.activityVersionId) : void 0), be = !!Le && Jn === "unsupported", Xe = me(() => be ? null : Dn(bt, N), [bt, N, be]), ln = me(() => fd(u), [u]), Ne = me(() => be && Le?.nodeId === F ? Le : Xe?.slot.activities.find((b) => b.nodeId === F) ?? null, [be, Xe, Le, F]), Nt = me(
    () => Ne ? V0(Ne, Qe, Gn) : null,
    [Qe, Gn, Ne]
  ), dn = Ne ? Ke(Ne) : [], je = Jn === "flowchart" && Xe?.slot.mode === "flowchart", St = !bt || !be, ut = W !== "idle", yr = !!d?.state.rootActivity && !ut, Qn = zt(n, "weaver.workflows.find-draft-risks"), eo = zt(n, "weaver.workflows.propose-update");
  oe(() => {
    if (!(!s || !d))
      return window.__ELSA_STUDIO_WORKFLOW_CONTEXT__ = {
        workflowId: s.definition.id,
        workflowDefinitionId: s.definition.id,
        workflowVersionId: d.sourceVersionId ?? null,
        draftId: d.id,
        revision: G0(d),
        selectedNodeId: F,
        selectedActivityType: Nt?.typeName ?? (Ne ? Qe.get(Ne.activityVersionId)?.activityTypeKey ?? Ne.activityVersionId : null),
        summary: s.definition.name,
        activities: vd(d.state.rootActivity, Qe),
        diagnostics: d.validationErrors.map((b) => ({ severity: b.code ?? "warning", message: b.message ?? "Workflow validation issue." }))
      }, () => {
        window.__ELSA_STUDIO_WORKFLOW_CONTEXT__?.workflowId === s.definition.id && (window.__ELSA_STUDIO_WORKFLOW_CONTEXT__ = void 0);
      };
  }, [Qe, s, d, Nt, Ne, F]), oe(() => {
    const b = (L) => {
      const X = L.detail;
      if (!X?.batch || !X.respond) return;
      if (!d || !s) {
        X.respond({ ok: !1, message: "No active workflow draft is open." });
        return;
      }
      const J = X.batch.workflowDefinitionId;
      if (J && J !== "active-draft" && J !== s.definition.id) {
        X.respond({ ok: !1, message: `Batch targets workflow '${J}', but '${s.definition.id}' is active.` });
        return;
      }
      try {
        const de = J0(d), re = Xx(d, X.batch, u), fe = `weaver-batch-${Date.now()}`;
        cn.current.set(fe, de), l(re.draft), g([]), j(re.finalActivityIds.at(-1) ?? null), q(null), U(null), D(re.summary), A(""), X.respond({ ok: !0, result: { ...re, undoToken: fe } });
      } catch (de) {
        const re = de instanceof Error ? de.message : String(de);
        A(re), X.respond({ ok: !1, message: re });
      }
    }, M = (L) => {
      const X = L.detail;
      if (!X?.undoToken || !X.respond) return;
      const J = cn.current.get(X.undoToken);
      if (!J) {
        X.respond({ ok: !1, message: "The Weaver batch undo point is no longer available." });
        return;
      }
      cn.current.delete(X.undoToken), l(J), g([]), j(null), q(null), U(null), D("Restored workflow draft before Weaver batch."), A(""), X.respond({ ok: !0, summary: "Restored workflow draft before Weaver batch." });
    };
    return window.addEventListener(ba, b), window.addEventListener(Na, M), () => {
      window.removeEventListener(ba, b), window.removeEventListener(Na, M);
    };
  }, [u, s, d]), oe(() => {
    In(ka, String(G));
  }, [G]), oe(() => {
    In(Ia, String(le));
  }, [le]), oe(() => {
    In(Ca, String(Z));
  }, [Z]), oe(() => {
    In(ja, String(ge));
  }, [ge]), oe(() => {
    In(cd, ye);
  }, [ye]), oe(() => {
    if (!ye) return;
    const b = (M) => {
      M.key === "Escape" && Ae(null);
    };
    return window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b);
  }, [ye]);
  const un = he(async () => {
    A(""), m("loading");
    const [b, M, L, X] = await Promise.all([
      Zm(e, t),
      Fi(e),
      ix(e).then(
        (de) => ({ ok: !0, descriptors: de }),
        () => ({ ok: !1, descriptors: [] })
      ),
      sx(e).then(
        (de) => ({ ok: !0, descriptors: de }),
        () => ({ ok: !1, descriptors: $o })
      )
    ]), J = b.draft ?? null;
    c(b), We.current = J ? st(J) : "", l(J), f(M.activities ?? []), p(L.descriptors), v(X.descriptors.length > 0 ? X.descriptors : $o), m(L.ok ? "ready" : "failed"), g([]), j(null);
  }, [e, t]);
  oe(() => {
    un().catch((b) => A(b instanceof Error ? b.message : String(b)));
  }, [un]), oe(() => {
    ie((b) => {
      let M = !1;
      const L = new Set(b);
      for (const X of ln)
        L.has(X.category) || (L.add(X.category), M = !0);
      return M ? L : b;
    });
  }, [ln]), oe(() => {
    if (!Le) {
      S([]), C([]);
      return;
    }
    const b = be ? gi(Le, u, d?.layout ?? []) : Xe ? ql(Xe, u, d?.layout ?? []) : { nodes: [], edges: [] };
    S(b.nodes), C(b.edges);
  }, [u, d?.layout, be, Xe, Le]);
  const mr = (b) => {
    l((M) => M && { ...M, state: { ...M.state, rootActivity: b } });
  }, fn = he((b, M) => {
    if (d?.state.rootActivity && be)
      return;
    const L = mi(b, La(b));
    if (!d?.state.rootActivity) {
      mr(L), j(L.nodeId);
      return;
    }
    if (!Xe) {
      if (!Ke(L)[0]) {
        D(""), A("The current root activity does not accept child activities. Drop Flowchart or Sequence to wrap it in a composite root.");
        return;
      }
      l((J) => {
        if (!J?.state.rootActivity) return J;
        const de = J.state.rootActivity, re = yi(L, [], [de]), fe = M ? [
          ...J.layout.filter((ke) => ke.nodeId !== de.nodeId),
          {
            nodeId: de.nodeId,
            x: Math.round(M.x),
            y: Math.round(M.y)
          }
        ] : J.layout;
        return {
          ...J,
          layout: fe,
          state: {
            ...J.state,
            rootActivity: re
          }
        };
      }), j(d.state.rootActivity.nodeId), A(""), D(`Wrapped root in ${Ce(b)}`);
      return;
    }
    l((X) => {
      if (!X?.state.rootActivity) return X;
      const J = Dn(X.state.rootActivity, N);
      if (!J) return X;
      const de = yi(X.state.rootActivity, N, [...J.slot.activities, L]), re = M ? [
        ...X.layout.filter((fe) => fe.nodeId !== L.nodeId),
        {
          nodeId: L.nodeId,
          x: Math.round(M.x),
          y: Math.round(M.y)
        }
      ] : X.layout;
      return {
        ...X,
        layout: re,
        state: {
          ...X.state,
          rootActivity: de
        }
      };
    }), j(L.nodeId);
  }, [d?.state.rootActivity, N, be, Xe]), Ht = he((b, M) => {
    const L = mi(b, La(b)), X = {
      id: L.nodeId,
      type: "workflowActivity",
      position: M,
      selected: !0,
      data: {
        label: Ce(b),
        activityVersionId: b.activityVersionId,
        activityTypeKey: b.activityTypeKey,
        category: b.category,
        executionType: b.executionType,
        icon: xi(b),
        childSlots: Ke(L),
        acceptsInbound: String(b.executionType ?? "").toLowerCase() !== "trigger",
        sourcePorts: Gl(L, b)
      }
    };
    return { activityNode: L, node: X };
  }, []), Ve = he((b, M, L = []) => {
    be || l((X) => {
      if (!X) return X;
      const J = ux(X.layout, b), de = X.state.rootActivity;
      if (!de) return { ...X, layout: J };
      const re = Dn(de, N);
      if (!re) return { ...X, layout: J };
      const fe = lx(re, b, M, L), ke = re.slot.mode === "flowchart" ? dx(fe, M) : fe;
      return {
        ...X,
        layout: J,
        state: {
          ...X.state,
          rootActivity: Zl(de, N, ke)
        }
      };
    });
  }, [N, be]), hn = he((b, M) => {
    if (!Ee.current) return null;
    const L = Ee.current.getBoundingClientRect();
    return P ? P.screenToFlowPosition({ x: b, y: M }) : {
      x: b - L.left,
      y: M - L.top
    };
  }, [P]), pn = he((b, M) => document.elementFromPoint(b, M)?.closest(".react-flow__edge")?.getAttribute("data-id") ?? null, []), gn = he((b, M, L) => {
    const X = x.find((Me) => Me.id === M.source), J = x.find((Me) => Me.id === M.target), de = X && J ? Z0(X, J) : X ? Va(X) : L, re = Ht(b, de), ke = [...x.map((Me) => Me.selected ? { ...Me, selected: !1 } : Me), re.node], Et = bx(k, M, re.node.id);
    S(ke), C(Et), j(re.node.id), Ve(ke, Et, [re.activityNode]);
  }, [Ve, Ht, k, x]), Ot = he((b, M, L) => {
    if (!St || !Ee.current) return !1;
    const X = Ee.current.getBoundingClientRect();
    if (!(M >= X.left && M <= X.right && L >= X.top && L <= X.bottom)) return !1;
    const de = hn(M, L);
    if (!de) return !1;
    if (je) {
      const re = pn(M, L), fe = re ? k.find((ke) => ke.id === re) : void 0;
      if (fe)
        return gn(b, fe, de), !0;
    }
    return fn(b, de), !0;
  }, [fn, St, k, pn, je, gn, hn]);
  oe(() => {
    const b = (L) => {
      const X = Vt.current;
      if (!X) return;
      Math.hypot(L.clientX - X.startX, L.clientY - X.startY) >= e0 && (X.dragging = !0);
    }, M = (L) => {
      const X = Vt.current;
      if (Vt.current = null, !X?.dragging || !Ee.current || dt.current) return;
      const J = Ee.current.getBoundingClientRect();
      L.clientX >= J.left && L.clientX <= J.right && L.clientY >= J.top && L.clientY <= J.bottom && (vt.current = !0, window.setTimeout(() => {
        vt.current = !1;
      }, 0), Ot(X.activity, L.clientX, L.clientY));
    };
    return window.addEventListener("pointermove", b), window.addEventListener("pointerup", M), window.addEventListener("pointercancel", M), () => {
      window.removeEventListener("pointermove", b), window.removeEventListener("pointerup", M), window.removeEventListener("pointercancel", M);
    };
  }, [P, Ot]);
  const to = (b, M) => {
    dt.current = { activityVersionId: M.activityVersionId, handledDrop: !1 }, b.dataTransfer.setData(Ea, M.activityVersionId), b.dataTransfer.setData("text/plain", M.activityVersionId), b.dataTransfer.effectAllowed = "copy";
  }, no = (b, M) => {
    const L = dt.current;
    dt.current = null, !L?.handledDrop && (b.clientX === 0 && b.clientY === 0 || Ot(M, b.clientX, b.clientY) && (vt.current = !0, window.setTimeout(() => {
      vt.current = !1;
    }, 0)));
  }, oo = (b, M) => {
    b.button === 0 && (Vt.current = {
      activity: M,
      startX: b.clientX,
      startY: b.clientY,
      dragging: !1
    });
  }, xr = (b) => {
    vt.current || St && fn(b);
  }, ro = (b) => {
    if (!St) {
      b.dataTransfer.dropEffect = "none";
      return;
    }
    if (b.preventDefault(), b.dataTransfer.dropEffect = "copy", !je) return;
    const M = pn(b.clientX, b.clientY);
    _(M);
  }, io = (b) => {
    if (!Ee.current) return;
    const M = b.relatedTarget;
    M && Ee.current.contains(M) || _(null);
  }, so = (b) => {
    b.preventDefault(), _(null);
    const M = b.dataTransfer.getData(Ea) || b.dataTransfer.getData("text/plain");
    if (!M || (b.stopPropagation(), dt.current?.activityVersionId === M && (dt.current.handledDrop = !0), !St)) return;
    const L = Qe.get(M);
    L && Ot(L, b.clientX, b.clientY);
  }, wr = () => {
    if (!je) return;
    const b = Ee.current?.getBoundingClientRect();
    b && H({
      kind: "fromEmpty",
      clientX: b.left + b.width / 2,
      clientY: b.top + b.height / 2
    });
  }, yn = he(async (b, M) => {
    const L = async () => {
      const J = ++an.current, de = st(b);
      A("");
      try {
        const re = await ex(e, b), fe = st(re);
        return We.current = fe, l((ke) => !ke || ke.id !== re.id ? ke : st(ke) === de ? re : { ...ke, validationErrors: re.validationErrors }), J === an.current && D(M), re;
      } catch (re) {
        throw J === an.current && (D(""), A(re instanceof Error ? re.message : String(re))), re;
      }
    }, X = Lt.current.then(L, L);
    return Lt.current = X.catch(() => {
    }), X;
  }, [e]);
  oe(() => {
    if (!se || !d || st(d) === We.current) return;
    D("Autosaving...");
    const M = window.setTimeout(() => {
      yn(d, "Autosaved").catch(() => {
      });
    }, t0);
    return () => window.clearTimeout(M);
  }, [se, d, yn]);
  const ao = async () => {
    if (!(!d || ut)) {
      O("saving"), D("Saving...");
      try {
        await yn(d, "Saved");
      } catch {
      } finally {
        O("idle");
      }
    }
  }, vr = async () => {
    if (!(!d || ut)) {
      O("promoting"), D("Promoting...");
      try {
        const b = await tx(e, d.id), M = await nx(e, b.versionId);
        q(M.artifactId), D(`Published ${M.artifactVersion}`), await un();
      } catch (b) {
        D(""), A(b instanceof Error ? b.message : String(b));
      } finally {
        O("idle");
      }
    }
  }, br = async () => {
    if (!d?.state.rootActivity || ut) return;
    const b = d, M = st(b);
    U(null), D("Preparing test run...");
    try {
      O("testRunPreparing"), D("Preparing test run...");
      const L = Q0(b);
      O("testRunStarting"), D("Starting test run...");
      const X = await ox(e, {
        definitionId: b.definitionId,
        snapshotId: L,
        state: b.state
      }), J = { draftSignature: M, view: X };
      U(J), ne((de) => [
        J,
        ...de.filter((re) => re.view.testRunId !== X.testRunId)
      ].slice(0, 10)), D(Ki(X) ? "Test run rejected" : "Test run dispatched");
    } catch (L) {
      D(""), A(L instanceof Error ? L.message : String(L));
    } finally {
      O("idle");
    }
  }, Nr = (b) => {
    const M = be ? b.filter((L) => L.type === "select") : b;
    M.length !== 0 && S((L) => Qc(M, L));
  }, Sr = (b) => {
    be || C((M) => el(b, M));
  }, mn = (b) => !b.source || !b.target || b.source === b.target || !je ? !1 : !b.targetHandle, Er = (b) => {
    if (!d?.state.rootActivity || !Xe || !je || !mn(b)) return;
    const M = Ko(b.source, b.target, b.sourceHandle ?? "Done", b.targetHandle ?? void 0), L = nl(M, k);
    C(L), Ve(x, L);
  }, kr = () => {
    Ve(x, k);
  }, Ir = (b, M) => {
    if (!M.nodeId || M.handleType === "target") {
      $e.current = null;
      return;
    }
    $e.current = {
      nodeId: M.nodeId,
      handleId: M.handleId ?? null
    };
  }, co = (b, M) => {
    const L = K0($e.current, M);
    if ($e.current = null, !L || !je || M.toNode || M.toHandle || U0(b)) return;
    const X = wd(b);
    H({
      kind: "fromPort",
      sourceNodeId: L.nodeId,
      sourceHandleId: L.handleId,
      clientX: X.x,
      clientY: X.y
    });
  }, Cr = (b, M) => {
    if (!je || !mn(M)) return;
    const L = Bg(b, {
      ...M,
      sourceHandle: M.sourceHandle ?? "Done",
      targetHandle: M.targetHandle ?? void 0
    }, k, { shouldReplaceId: !1 });
    C(L), Ve(x, L);
  }, jr = (b) => {
    if (be || b.length === 0) return;
    const M = new Set(b.map((J) => J.id)), L = x.filter((J) => !M.has(J.id)), X = k.filter((J) => !M.has(J.source) && !M.has(J.target));
    S(L), C(X), F && M.has(F) && j(null), Ve(L, X);
  }, _r = (b) => {
    if (be || b.length === 0) return;
    const M = new Set(b.map((X) => X.id)), L = k.filter((X) => !M.has(X.id));
    C(L), Ve(x, L);
  }, lo = he((b) => {
    if (be) return;
    const M = k.filter((L) => L.id !== b);
    C(M), Ve(x, M);
  }, [Ve, k, be, x]), uo = he((b, M, L) => {
    je && H({ kind: "spliceEdge", edgeId: b, clientX: M, clientY: L });
  }, [je]), Ar = (b) => {
    const M = z;
    if (!M) return;
    H(null);
    const L = hn(M.clientX, M.clientY) ?? { x: 0, y: 0 };
    if (M.kind === "fromEmpty") {
      const J = Ht(b, L), re = [...x.map((fe) => fe.selected ? { ...fe, selected: !1 } : fe), J.node];
      S(re), j(J.node.id), Ve(re, k, [J.activityNode]);
      return;
    }
    if (M.kind === "fromPort") {
      const J = x.find((Me) => Me.id === M.sourceNodeId), de = J ? Va(J) : L, re = Ht(b, de), ke = [...x.map((Me) => Me.selected ? { ...Me, selected: !1 } : Me), re.node], Et = [...k, Ko(M.sourceNodeId, re.node.id, M.sourceHandleId ?? "Done")];
      S(ke), C(Et), j(re.node.id), Ve(ke, Et, [re.activityNode]);
      return;
    }
    const X = k.find((J) => J.id === M.edgeId);
    X && gn(b, X, L);
  }, Mr = me(() => ({
    highlightedEdgeId: E,
    deleteEdge: lo,
    requestInsertActivity: uo
  }), [lo, E, uo]), Dr = (b, M, L) => {
    g((X) => [...X, { ownerNodeId: b.nodeId, slotId: M, label: L }]), j(null);
  }, fo = he((b) => {
    l((M) => {
      const L = M?.state.rootActivity;
      return !M || !L ? M : {
        ...M,
        state: {
          ...M.state,
          rootActivity: Ul(L, b.nodeId, () => b)
        }
      };
    });
  }, []), Pr = (b) => {
    ie((M) => {
      const L = new Set(M);
      return L.has(b) ? L.delete(b) : L.add(b), L;
    });
  }, xn = (b) => {
    Ae((M) => M === b ? null : M), b === "palette" ? pe((M) => !M) : _e((M) => !M);
  }, ho = (b) => {
    b === "palette" ? pe(!1) : _e(!1), Ae((M) => M === b ? null : b);
  }, po = (b, M) => {
    Ae(null), b === "palette" ? (pe(!1), ee((L) => zo(L + M, Nn, Sn))) : (_e(!1), V((L) => zo(L + M, En, kn)));
  }, Ft = (b, M) => {
    M.preventDefault(), Ae(null), b === "palette" ? pe(!1) : _e(!1);
    const L = M.clientX, X = b === "palette" ? G : le, J = b === "palette" ? Nn : En, de = b === "palette" ? Sn : kn;
    document.body.classList.add("wf-side-panel-resizing");
    const re = (ke) => {
      const Et = b === "palette" ? ke.clientX - L : L - ke.clientX, Me = zo(X + Et, J, de);
      b === "palette" ? ee(Me) : V(Me);
    }, fe = () => {
      document.body.classList.remove("wf-side-panel-resizing"), window.removeEventListener("pointermove", re), window.removeEventListener("pointerup", fe), window.removeEventListener("pointercancel", fe);
    };
    window.addEventListener("pointermove", re), window.addEventListener("pointerup", fe), window.addEventListener("pointercancel", fe);
  }, go = (b, M) => {
    M.key === "ArrowLeft" ? (M.preventDefault(), po(b, b === "palette" ? -Co : Co)) : M.key === "ArrowRight" ? (M.preventDefault(), po(b, b === "palette" ? Co : -Co)) : M.key === "Home" ? (M.preventDefault(), b === "palette" ? ee(Nn) : V(En)) : M.key === "End" && (M.preventDefault(), b === "palette" ? ee(Sn) : V(kn));
  };
  if (!s || !d)
    return /* @__PURE__ */ a.jsx("div", { className: "wf-empty", children: I || "Loading workflow editor..." });
  const $r = [
    "wf-editor-body",
    Z ? "palette-collapsed" : "",
    ge ? "inspector-collapsed" : "",
    ye === "palette" ? "palette-maximized" : "",
    ye === "inspector" ? "inspector-maximized" : ""
  ].filter(Boolean).join(" "), yo = {
    "--wf-palette-width": `${Z ? _a : G}px`,
    "--wf-inspector-width": `${ge ? _a : le}px`
  }, Gi = !Z && ye !== "inspector", Ji = !ge && ye !== "palette", mo = B?.draftSignature === st(d) ? B.view : null, Sd = K.filter((b) => b.draftSignature === st(d)).map((b) => b.view), Qi = mo && T.startsWith("Test run") ? "" : T, Ed = {
    definition: s.definition,
    draft: d,
    selectedActivity: Ne,
    selectedActivityDescriptor: Nt,
    selectedActivitySlots: dn,
    catalog: u,
    currentScopeOwner: Le,
    frames: N
  }, es = r.map((b) => {
    const M = b.component;
    return {
      id: b.id,
      title: b.title,
      side: b.side,
      order: b.order ?? 500,
      icon: null,
      render: () => /* @__PURE__ */ a.jsx(M, { context: Ed })
    };
  }), Tr = [
    {
      id: "activities",
      title: "Activities",
      order: 0,
      icon: /* @__PURE__ */ a.jsx(Tl, { size: 15 }),
      render: kd
    },
    ...es.filter((b) => b.side === "left")
  ].sort(Ra), zr = [
    {
      id: "inspector",
      title: "Inspector",
      order: 0,
      icon: /* @__PURE__ */ a.jsx(Ll, { size: 15 }),
      render: Id
    },
    {
      id: "artifacts",
      title: "Artifacts",
      order: 10,
      icon: /* @__PURE__ */ a.jsx(Bm, { size: 15 }),
      render: () => /* @__PURE__ */ a.jsx(
        g0,
        {
          context: e,
          ai: n,
          definitionId: s.definition.id,
          publishedArtifactId: R
        }
      )
    },
    {
      id: "test-runs",
      title: "Test runs",
      order: 20,
      icon: /* @__PURE__ */ a.jsx(Hl, { size: 15 }),
      render: () => /* @__PURE__ */ a.jsx(
        y0,
        {
          context: e,
          definitionId: s.definition.id,
          currentRun: mo,
          runs: Sd
        }
      )
    },
    ...es.filter((b) => b.side === "right")
  ].sort(Ra), ts = Tr.find((b) => b.id === wt) ?? Tr[0], ns = zr.find((b) => b.id === rt) ?? zr[0];
  function kd() {
    return /* @__PURE__ */ a.jsx("div", { className: "wf-palette-list", role: "tree", "aria-label": "Available activities", children: ln.map((b) => {
      const M = ae.has(b.category);
      return /* @__PURE__ */ a.jsxs("div", { className: "wf-palette-category", children: [
        /* @__PURE__ */ a.jsxs(
          "button",
          {
            type: "button",
            className: "wf-palette-category-toggle",
            role: "treeitem",
            "aria-expanded": M,
            onClick: () => Pr(b.category),
            children: [
              M ? /* @__PURE__ */ a.jsx(zl, { size: 14 }) : /* @__PURE__ */ a.jsx(Wt, { size: 14 }),
              /* @__PURE__ */ a.jsx("span", { children: b.category }),
              /* @__PURE__ */ a.jsx("small", { children: b.activities.length })
            ]
          }
        ),
        M ? /* @__PURE__ */ a.jsx("div", { className: "wf-palette-activities", role: "group", children: b.activities.map((L) => {
          const X = L.description?.trim(), J = X ? `wf-palette-description-${L.activityVersionId}` : void 0, de = Ce(L), re = xi(L);
          return /* @__PURE__ */ a.jsxs(
            "button",
            {
              type: "button",
              className: "wf-palette-activity",
              role: "treeitem",
              draggable: !0,
              title: X || Ce(L),
              "aria-describedby": J,
              onClick: () => xr(L),
              onDragStart: (fe) => to(fe, L),
              onDragEnd: (fe) => no(fe, L),
              onPointerDown: (fe) => oo(fe, L),
              children: [
                /* @__PURE__ */ a.jsx("span", { className: "wf-activity-icon", "data-icon": re, "aria-hidden": "true", children: xd(re) }),
                /* @__PURE__ */ a.jsxs("span", { className: "wf-palette-activity-text", children: [
                  /* @__PURE__ */ a.jsx("strong", { children: de }),
                  X ? /* @__PURE__ */ a.jsx("small", { id: J, children: X }) : null
                ] }),
                /* @__PURE__ */ a.jsx(Fm, { className: "wf-palette-activity-grip", size: 14, "aria-hidden": "true" })
              ]
            },
            L.activityVersionId
          );
        }) }) : null
      ] }, b.category);
    }) });
  }
  function Id() {
    return Ne ? /* @__PURE__ */ a.jsxs("div", { className: "wf-inspector-content", children: [
      /* @__PURE__ */ a.jsx("h3", { children: x.find((b) => b.id === Ne.nodeId)?.data.label ?? Ne.nodeId }),
      /* @__PURE__ */ a.jsxs("dl", { children: [
        /* @__PURE__ */ a.jsx("dt", { children: "Node ID" }),
        /* @__PURE__ */ a.jsx("dd", { children: Ne.nodeId }),
        /* @__PURE__ */ a.jsx("dt", { children: "Activity type" }),
        /* @__PURE__ */ a.jsx("dd", { children: Nt?.typeName ?? Qe.get(Ne.activityVersionId)?.activityTypeKey ?? "Unknown" }),
        /* @__PURE__ */ a.jsx("dt", { children: "Activity version" }),
        /* @__PURE__ */ a.jsx("dd", { children: Ne.activityVersionId })
      ] }),
      /* @__PURE__ */ a.jsx(
        Rx,
        {
          activity: Ne,
          descriptor: Nt,
          editors: o,
          expressionDescriptors: y,
          descriptorStatus: w,
          onChange: fo
        }
      ),
      dn.length > 0 ? /* @__PURE__ */ a.jsxs("div", { className: "wf-slot-list", children: [
        /* @__PURE__ */ a.jsx("span", { children: "Embedded slots" }),
        dn.map((b) => /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => Dr(Ne, b.id, `${x.find((M) => M.id === Ne.nodeId)?.data.label ?? Ne.nodeId} / ${b.label}`), children: [
          b.label,
          /* @__PURE__ */ a.jsxs("small", { children: [
            b.activities.length,
            " activit",
            b.activities.length === 1 ? "y" : "ies"
          ] })
        ] }, b.id))
      ] }) : /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "This activity does not expose embedded child slots." })
    ] }) : /* @__PURE__ */ a.jsx("p", { className: "wf-muted", children: "Select an activity to inspect properties and embedded slots." });
  }
  return /* @__PURE__ */ a.jsxs("section", { className: "wf-editor", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "wf-editor-top", children: [
      /* @__PURE__ */ a.jsx("button", { type: "button", className: "wf-link-button", onClick: i, children: "Definitions" }),
      /* @__PURE__ */ a.jsx(Wt, { size: 14 }),
      /* @__PURE__ */ a.jsx("strong", { children: s.definition.name }),
      /* @__PURE__ */ a.jsx("span", { className: "wf-chip", children: "Draft" }),
      Qi ? /* @__PURE__ */ a.jsxs("span", { className: "wf-status", children: [
        /* @__PURE__ */ a.jsx(Rt, { size: 13 }),
        " ",
        Qi
      ] }) : null,
      /* @__PURE__ */ a.jsxs("div", { className: "wf-editor-actions", children: [
        /* @__PURE__ */ a.jsxs("label", { className: "wf-autosave-toggle", children: [
          /* @__PURE__ */ a.jsx("input", { className: "wf-autosave-switch-input", type: "checkbox", checked: se, onChange: (b) => Q(b.target.checked) }),
          /* @__PURE__ */ a.jsx("span", { children: "Autosave" })
        ] }),
        Qn ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => mt(n, Qn, { definition: s.definition, draft: d }), children: [
          /* @__PURE__ */ a.jsx(yt, { size: 15 }),
          " Risks"
        ] }) : null,
        eo ? /* @__PURE__ */ a.jsxs("button", { type: "button", onClick: () => mt(n, eo, { definition: s.definition, draft: d }), children: [
          /* @__PURE__ */ a.jsx(yt, { size: 15 }),
          " Propose"
        ] }) : null,
        /* @__PURE__ */ a.jsxs("button", { type: "button", disabled: ut, onClick: () => {
          ao();
        }, children: [
          /* @__PURE__ */ a.jsx(Wm, { size: 15 }),
          " Save"
        ] }),
        /* @__PURE__ */ a.jsxs("button", { type: "button", disabled: ut, onClick: () => {
          vr();
        }, children: [
          /* @__PURE__ */ a.jsx(Rl, { size: 15 }),
          " Promote"
        ] }),
        mo ? /* @__PURE__ */ a.jsx(
          q0,
          {
            testRun: mo,
            onOpen: () => {
              _e(!1), Ae((b) => b === "palette" ? null : b), Pe("test-runs");
            }
          }
        ) : null,
        /* @__PURE__ */ a.jsxs(
          "button",
          {
            type: "button",
            disabled: !yr,
            title: d.state.rootActivity ? "Run a transient test of the current design" : "Add a root activity before running",
            onClick: () => {
              br();
            },
            children: [
              /* @__PURE__ */ a.jsx(ur, { size: 15 }),
              " Run"
            ]
          }
        )
      ] })
    ] }),
    I ? /* @__PURE__ */ a.jsxs("div", { className: "wf-alert", children: [
      /* @__PURE__ */ a.jsx(Be, { size: 16 }),
      " ",
      I
    ] }) : null,
    /* @__PURE__ */ a.jsxs("div", { className: $r, style: yo, children: [
      /* @__PURE__ */ a.jsxs("aside", { className: "wf-palette", "aria-label": "Activities panel", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "wf-panel-title", children: [
          /* @__PURE__ */ a.jsx(
            za,
            {
              label: "Activities panel tabs",
              tabs: Tr,
              activeTabId: ts.id,
              onSelect: ot
            }
          ),
          /* @__PURE__ */ a.jsxs("span", { className: "wf-panel-actions", children: [
            /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": Z ? "Expand activities panel" : "Collapse activities panel",
                title: Z ? "Expand" : "Collapse",
                onClick: () => xn("palette"),
                children: Z ? /* @__PURE__ */ a.jsx(Wt, { size: 14 }) : /* @__PURE__ */ a.jsx(Zo, { size: 14 })
              }
            ),
            Z ? null : /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": ye === "palette" ? "Restore activities panel" : "Maximize activities panel",
                title: ye === "palette" ? "Restore" : "Maximize",
                onClick: () => ho("palette"),
                children: ye === "palette" ? /* @__PURE__ */ a.jsx(ha, { size: 14 }) : /* @__PURE__ */ a.jsx(Uo, { size: 14 })
              }
            )
          ] })
        ] }),
        Gi ? ts.render() : null
      ] }),
      Gi && !ye ? /* @__PURE__ */ a.jsx(
        "div",
        {
          className: "wf-side-resize-handle left",
          role: "separator",
          "aria-label": "Resize activities panel",
          "aria-orientation": "vertical",
          "aria-valuemin": Nn,
          "aria-valuemax": Sn,
          "aria-valuenow": G,
          tabIndex: 0,
          onPointerDown: (b) => Ft("palette", b),
          onKeyDown: (b) => go("palette", b)
        }
      ) : /* @__PURE__ */ a.jsx("div", { className: "wf-side-resize-spacer" }),
      /* @__PURE__ */ a.jsxs("main", { className: "wf-canvas-shell", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "wf-breadcrumb", children: [
          /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => {
            g([]), j(null);
          }, children: "Root" }),
          N.map((b, M) => /* @__PURE__ */ a.jsxs(xt.Fragment, { children: [
            /* @__PURE__ */ a.jsx(Wt, { size: 13 }),
            /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => {
              g(N.slice(0, M + 1)), j(null);
            }, children: b.label })
          ] }, `${b.ownerNodeId}-${b.slotId}-${M}`))
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "wf-canvas", ref: Ee, onDragOver: ro, onDragLeave: io, onDrop: so, children: [
          /* @__PURE__ */ a.jsx(ld.Provider, { value: Mr, children: /* @__PURE__ */ a.jsxs(
            Cl,
            {
              nodes: x,
              edges: k,
              nodeTypes: sd,
              edgeTypes: ad,
              onInit: $,
              onNodesChange: Nr,
              onEdgesChange: Sr,
              onNodesDelete: jr,
              onEdgesDelete: _r,
              onConnect: Er,
              onConnectStart: je ? Ir : void 0,
              onConnectEnd: je ? co : void 0,
              onReconnect: je ? Cr : void 0,
              isValidConnection: mn,
              onDragOver: ro,
              onDragLeave: io,
              onDrop: so,
              onPaneClick: () => j(null),
              onNodeClick: (b, M) => {
                j(M.id), Pe("inspector");
              },
              onNodeDragStop: be ? void 0 : kr,
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
                /* @__PURE__ */ a.jsx(_l, { gap: 18, size: 1 }),
                /* @__PURE__ */ a.jsx(Ml, {}),
                /* @__PURE__ */ a.jsx(Pl, { pannable: !0, zoomable: !0 })
              ]
            }
          ) }),
          je && x.length === 0 ? /* @__PURE__ */ a.jsxs("button", { type: "button", className: "wf-empty-canvas-add", onClick: () => wr(), children: [
            /* @__PURE__ */ a.jsx(Oi, { size: 15 }),
            " Add activity"
          ] }) : null,
          z ? /* @__PURE__ */ a.jsx(
            X0,
            {
              clientX: z.clientX,
              clientY: z.clientY,
              activities: u,
              onPick: Ar,
              onClose: () => H(null)
            }
          ) : null
        ] }),
        /* @__PURE__ */ a.jsx(Y0, { draft: d })
      ] }),
      Ji && !ye ? /* @__PURE__ */ a.jsx(
        "div",
        {
          className: "wf-side-resize-handle right",
          role: "separator",
          "aria-label": "Resize inspector panel",
          "aria-orientation": "vertical",
          "aria-valuemin": En,
          "aria-valuemax": kn,
          "aria-valuenow": le,
          tabIndex: 0,
          onPointerDown: (b) => Ft("inspector", b),
          onKeyDown: (b) => go("inspector", b)
        }
      ) : /* @__PURE__ */ a.jsx("div", { className: "wf-side-resize-spacer" }),
      /* @__PURE__ */ a.jsxs("aside", { className: "wf-inspector", "aria-label": "Inspector panel", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "wf-panel-title", children: [
          /* @__PURE__ */ a.jsx(
            za,
            {
              label: "Inspector panel tabs",
              tabs: zr,
              activeTabId: ns.id,
              onSelect: Pe
            }
          ),
          /* @__PURE__ */ a.jsxs("span", { className: "wf-panel-actions", children: [
            /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": ge ? "Expand inspector panel" : "Collapse inspector panel",
                title: ge ? "Expand" : "Collapse",
                onClick: () => xn("inspector"),
                children: ge ? /* @__PURE__ */ a.jsx(Zo, { size: 14 }) : /* @__PURE__ */ a.jsx(Wt, { size: 14 })
              }
            ),
            ge ? null : /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "wf-panel-action-button",
                "aria-label": ye === "inspector" ? "Restore inspector panel" : "Maximize inspector panel",
                title: ye === "inspector" ? "Restore" : "Maximize",
                onClick: () => ho("inspector"),
                children: ye === "inspector" ? /* @__PURE__ */ a.jsx(ha, { size: 14 }) : /* @__PURE__ */ a.jsx(Uo, { size: 14 })
              }
            )
          ] })
        ] }),
        Ji ? ns.render() : null
      ] })
    ] })
  ] });
}
function za({
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
function Ra(e, t) {
  return e.order - t.order || e.title.localeCompare(t.title);
}
function F0({ data: e, selected: t }) {
  const n = e, o = n.runtime, r = !n.suppressFlowPorts, i = r ? n.sourcePorts.length > 0 ? n.sourcePorts : [{ name: "Done", displayName: "Done" }] : [], s = B0(n);
  return /* @__PURE__ */ a.jsxs(
    "div",
    {
      className: ["wf-node", t ? "selected" : "", o ? "wf-node-runtime" : "", o?.hasBlockingIncident ? "faulted" : ""].filter(Boolean).join(" "),
      "data-icon": n.icon ?? "activity",
      children: [
        r && n.acceptsInbound ? /* @__PURE__ */ a.jsx(on, { type: "target", position: te.Left }) : null,
        /* @__PURE__ */ a.jsxs("div", { className: "wf-node-content", children: [
          /* @__PURE__ */ a.jsx("span", { className: "wf-node-icon", "aria-hidden": "true", children: xd(n.icon) }),
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
          o.status ? /* @__PURE__ */ a.jsx(sn, { status: o.status, subStatus: o.subStatus }) : null,
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
        i.map((c, d) => {
          const l = `${(d + 1) / (i.length + 1) * 100}%`;
          return /* @__PURE__ */ a.jsxs(xt.Fragment, { children: [
            /* @__PURE__ */ a.jsx("span", { className: "wf-node-port-label", style: { top: l }, children: c.displayName }),
            /* @__PURE__ */ a.jsx(on, { type: "source", position: te.Right, id: c.name, style: { top: l } })
          ] }, c.name);
        })
      ]
    }
  );
}
function B0(e) {
  const t = e.category?.trim(), n = e.executionType?.trim();
  return [t, n].filter((r) => !!r).join(" · ");
}
function xd(e) {
  switch (e) {
    case "flowchart":
      return /* @__PURE__ */ a.jsx(Rl, { size: 15 });
    case "sequence":
      return /* @__PURE__ */ a.jsx(Ll, { size: 15 });
    case "terminal":
      return /* @__PURE__ */ a.jsx(Hl, { size: 15 });
    case "runtime":
      return /* @__PURE__ */ a.jsx(ur, { size: 15 });
    case "trigger":
      return /* @__PURE__ */ a.jsx(Xm, { size: 15 });
    default:
      return /* @__PURE__ */ a.jsx(Tl, { size: 15 });
  }
}
function W0(e) {
  const {
    id: t,
    sourceX: n,
    sourceY: o,
    targetX: r,
    targetY: i,
    sourcePosition: s,
    targetPosition: c,
    markerEnd: d,
    style: l,
    label: u,
    labelStyle: f
  } = e, h = xt.useContext(ld), [p, y] = Y(!1), [v, w, m] = Yo({ sourceX: n, sourceY: o, targetX: r, targetY: i, sourcePosition: s, targetPosition: c }), N = h?.highlightedEdgeId === t;
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsx(
      Un,
      {
        id: t,
        path: v,
        markerEnd: d,
        style: {
          ...l,
          strokeWidth: N ? 2.5 : l?.strokeWidth
        },
        label: u,
        labelX: w,
        labelY: m,
        labelStyle: f,
        onMouseEnter: () => y(!0),
        onMouseLeave: () => y(!1)
      }
    ),
    h ? /* @__PURE__ */ a.jsx(fm, { children: /* @__PURE__ */ a.jsxs(
      "div",
      {
        className: ["wf-edge-actions", p ? "visible" : "", N ? "highlighted" : ""].filter(Boolean).join(" "),
        style: { transform: `translate(-50%, -50%) translate(${w}px, ${m}px)` },
        onMouseEnter: () => y(!0),
        onMouseLeave: () => y(!1),
        children: [
          /* @__PURE__ */ a.jsx("button", { type: "button", "aria-label": "Insert activity into connection", title: "Insert activity", onClick: (g) => h.requestInsertActivity(t, g.clientX, g.clientY), children: /* @__PURE__ */ a.jsx(Oi, { size: 12 }) }),
          /* @__PURE__ */ a.jsx("button", { type: "button", "aria-label": "Delete connection", title: "Delete connection", onClick: () => h.deleteEdge(t), children: /* @__PURE__ */ a.jsx(pi, { size: 12 }) })
        ]
      }
    ) }) : null
  ] });
}
function X0({ clientX: e, clientY: t, activities: n, onPick: o, onClose: r }) {
  const [i, s] = Y(""), [c, d] = Y(0), l = ce(null), u = ce(null), f = me(() => {
    const N = i.trim().toLowerCase(), g = n.filter(gd);
    return N ? g.filter((x) => Ce(x).toLowerCase().includes(N) || x.activityTypeKey.toLowerCase().includes(N) || (x.category ?? "").toLowerCase().includes(N) || (x.description ?? "").toLowerCase().includes(N)) : g;
  }, [n, i]), h = me(() => fd(f), [f]), p = me(() => h.flatMap((N) => N.activities), [h]);
  oe(() => {
    requestAnimationFrame(() => u.current?.focus());
  }, []), oe(() => {
    const N = (x) => {
      l.current?.contains(x.target) || r();
    }, g = (x) => {
      x.key === "Escape" && r();
    };
    return document.addEventListener("mousedown", N, !0), document.addEventListener("keydown", g), () => {
      document.removeEventListener("mousedown", N, !0), document.removeEventListener("keydown", g);
    };
  }, [r]);
  const y = (N) => {
    if (N.key === "ArrowDown")
      N.preventDefault(), d((g) => Math.min(g + 1, p.length - 1));
    else if (N.key === "ArrowUp")
      N.preventDefault(), d((g) => Math.max(g - 1, 0));
    else if (N.key === "Enter") {
      N.preventDefault();
      const g = p[c];
      g && o(g);
    }
  }, v = Math.max(8, Math.min(e + 4, window.innerWidth - 328)), w = Math.max(8, Math.min(t + 4, window.innerHeight - 360));
  let m = -1;
  return /* @__PURE__ */ a.jsxs("div", { ref: l, className: "wf-connect-menu", style: { left: v, top: w }, onMouseDown: (N) => N.stopPropagation(), onClick: (N) => N.stopPropagation(), children: [
    /* @__PURE__ */ a.jsx(
      "input",
      {
        ref: u,
        type: "search",
        value: i,
        placeholder: "Search activities...",
        "aria-label": "Search activities",
        onChange: (N) => {
          s(N.target.value), d(0);
        },
        onKeyDown: y
      }
    ),
    /* @__PURE__ */ a.jsx("div", { className: "wf-connect-menu-list", role: "listbox", "aria-label": "Activity picker", children: h.length === 0 ? /* @__PURE__ */ a.jsx("p", { children: "No matching activities." }) : h.map((N) => /* @__PURE__ */ a.jsxs("section", { children: [
      /* @__PURE__ */ a.jsx("h4", { children: N.category }),
      N.activities.map((g) => {
        m += 1;
        const x = m, S = x === c;
        return /* @__PURE__ */ a.jsxs(
          "button",
          {
            type: "button",
            role: "option",
            "aria-selected": S,
            className: S ? "active" : "",
            onMouseEnter: () => d(x),
            onClick: () => o(g),
            children: [
              /* @__PURE__ */ a.jsx("strong", { children: Ce(g) }),
              /* @__PURE__ */ a.jsx("small", { children: g.category || g.activityTypeKey })
            ]
          },
          g.activityVersionId
        );
      })
    ] }, N.category)) })
  ] });
}
function Y0({ draft: e }) {
  return e.validationErrors.length ? /* @__PURE__ */ a.jsxs("div", { className: "wf-validation", children: [
    /* @__PURE__ */ a.jsx(Be, { size: 14 }),
    e.validationErrors.length,
    " validation issue",
    e.validationErrors.length === 1 ? "" : "s"
  ] }) : /* @__PURE__ */ a.jsxs("div", { className: "wf-validation ok", children: [
    /* @__PURE__ */ a.jsx(Rt, { size: 14 }),
    " No validation errors"
  ] });
}
function q0({ testRun: e, onOpen: t }) {
  const n = Ki(e);
  return /* @__PURE__ */ a.jsx("div", { className: "wf-test-run-status", "data-state": n ? "rejected" : "accepted", children: /* @__PURE__ */ a.jsxs(
    "button",
    {
      type: "button",
      className: "wf-test-run-trigger",
      "aria-controls": "wf-test-runs-panel",
      onClick: t,
      children: [
        n ? /* @__PURE__ */ a.jsx(Be, { size: 16 }) : /* @__PURE__ */ a.jsx(Rt, { size: 16 }),
        n ? "Test run rejected" : "Test run dispatched",
        /* @__PURE__ */ a.jsx(zl, { size: 14 })
      ]
    }
  ) });
}
function La(e) {
  return `${Ce(e).replace(/[^a-z0-9]+/gi, "").toLowerCase() || "activity"}-${crypto.randomUUID().slice(0, 8)}`;
}
function Va(e) {
  return { x: e.position.x + 280, y: e.position.y };
}
function Z0(e, t) {
  return {
    x: Math.round((e.position.x + t.position.x) / 2),
    y: Math.round((e.position.y + t.position.y) / 2)
  };
}
function wd(e) {
  return "changedTouches" in e && e.changedTouches.length > 0 ? { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY } : { x: e.clientX, y: e.clientY };
}
function U0(e) {
  const t = wd(e);
  return !!(document.elementFromPoint?.(t.x, t.y) ?? e.target)?.closest(".react-flow__handle, .react-flow__node");
}
function K0(e, t) {
  if (e) return e;
  const n = t.fromNode?.id;
  return n ? { nodeId: n, handleId: t.fromHandle?.id ?? null } : null;
}
function st(e) {
  return JSON.stringify({ state: e.state, layout: e.layout });
}
function G0(e) {
  return bd(st(e));
}
function vd(e, t, n = []) {
  if (!e) return n;
  const o = t.get(e.activityVersionId);
  n.push({
    id: e.nodeId,
    type: o?.activityTypeKey ?? e.activityVersionId,
    displayName: o ? Ce(o) : void 0
  });
  for (const r of Ke(e))
    for (const i of r.activities) vd(i, t, n);
  return n;
}
function J0(e) {
  return typeof structuredClone == "function" ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
function Q0(e) {
  return `${e.id}-${bd(JSON.stringify(e.state))}`;
}
function bd(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n += 1)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return (t >>> 0).toString(16).padStart(8, "0");
}
function Ki(e) {
  return e.status.toLowerCase() === "rejected";
}
function Ge(e) {
  if (!e) return "";
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : t.toLocaleString();
}
function ew(e) {
  try {
    const t = JSON.parse(e);
    if (typeof t.error == "string") return t.error;
  } catch {
  }
  return e;
}
function Nd(e, t) {
  if (!e || !t) return "";
  const n = Date.parse(e), o = Date.parse(t);
  if (Number.isNaN(n) || Number.isNaN(o) || o < n) return "";
  const r = Math.round((o - n) / 1e3);
  if (r < 60) return `${r}s`;
  const i = Math.floor(r / 60), s = r % 60;
  if (i < 60) return s ? `${i}m ${s}s` : `${i}m`;
  const c = Math.floor(i / 60), d = i % 60;
  return d ? `${c}h ${d}m` : `${c}h`;
}
export {
  U0 as isConnectEndOverExistingWorkflowNode,
  ow as register,
  K0 as resolveConnectEndSource
};
