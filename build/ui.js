(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a3, b3) => {
    for (var prop in b3 || (b3 = {}))
      if (__hasOwnProp.call(b3, prop))
        __defNormalProp(a3, prop, b3[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b3)) {
        if (__propIsEnum.call(b3, prop))
          __defNormalProp(a3, prop, b3[prop]);
      }
    return a3;
  };
  var __spreadProps = (a3, b3) => __defProps(a3, __getOwnPropDescs(b3));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/9cd5c3bf-aaba-421f-8dc4-a4f2b6fbcfa6/prism.js
  var init_prism = __esm({
    "../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/9cd5c3bf-aaba-421f-8dc4-a4f2b6fbcfa6/prism.js"() {
      if (document.getElementById("92dc6601c8") === null) {
        const element = document.createElement("style");
        element.id = "92dc6601c8";
        element.textContent = `/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */

code[class*="language-"],
pre[class*="language-"] {
	color: black;
	background: none;
	text-shadow: 0 1px white;
	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
	font-size: 1em;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.5;

	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;

	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}

pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
	text-shadow: none;
	background: #b3d4fc;
}

pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
code[class*="language-"]::selection, code[class*="language-"] ::selection {
	text-shadow: none;
	background: #b3d4fc;
}

@media print {
	code[class*="language-"],
	pre[class*="language-"] {
		text-shadow: none;
	}
}

/* Code blocks */
pre[class*="language-"] {
	padding: 1em;
	margin: .5em 0;
	overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
	background: #f5f2f0;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
	padding: .1em;
	border-radius: .3em;
	white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: slategray;
}

.token.punctuation {
	color: #999;
}

.token.namespace {
	opacity: .7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
	color: #905;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
	color: #690;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
	color: #9a6e3a;
	/* This background color was intended by the author of this theme. */
	background: hsla(0, 0%, 100%, .5);
}

.token.atrule,
.token.attr-value,
.token.keyword {
	color: #07a;
}

.token.function,
.token.class-name {
	color: #DD4A68;
}

.token.regex,
.token.important,
.token.variable {
	color: #e90;
}

.token.important,
.token.bold {
	font-weight: bold;
}
.token.italic {
	font-style: italic;
}

.token.entity {
	cursor: help;
}
`;
        document.head.append(element);
      }
    }
  });

  // node_modules/preact/dist/preact.module.js
  function v(n2, l3) {
    for (var u3 in l3)
      n2[u3] = l3[u3];
    return n2;
  }
  function p(n2) {
    var l3 = n2.parentNode;
    l3 && l3.removeChild(n2);
  }
  function y(l3, u3, t3) {
    var i3, o3, r3, f3 = {};
    for (r3 in u3)
      "key" == r3 ? i3 = u3[r3] : "ref" == r3 ? o3 = u3[r3] : f3[r3] = u3[r3];
    if (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps)
      for (r3 in l3.defaultProps)
        void 0 === f3[r3] && (f3[r3] = l3.defaultProps[r3]);
    return d(l3, f3, i3, o3, null);
  }
  function d(n2, t3, i3, o3, r3) {
    var f3 = { type: n2, props: t3, key: i3, ref: o3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r3 ? ++u : r3 };
    return null == r3 && null != l.vnode && l.vnode(f3), f3;
  }
  function k(n2) {
    return n2.children;
  }
  function b(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function g(n2, l3) {
    if (null == l3)
      return n2.__ ? g(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u3; l3 < n2.__k.length; l3++)
      if (null != (u3 = n2.__k[l3]) && null != u3.__e)
        return u3.__e;
    return "function" == typeof n2.type ? g(n2) : null;
  }
  function m(n2) {
    var l3, u3;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++)
        if (null != (u3 = n2.__k[l3]) && null != u3.__e) {
          n2.__e = n2.__c.base = u3.__e;
          break;
        }
      return m(n2);
    }
  }
  function w(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !x.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(x);
  }
  function x() {
    var n2, l3, u3, t3, o3, r3, e3, c3, s3;
    for (i.sort(f); n2 = i.shift(); )
      n2.__d && (l3 = i.length, t3 = void 0, o3 = void 0, r3 = void 0, c3 = (e3 = (u3 = n2).__v).__e, (s3 = u3.__P) && (t3 = [], o3 = [], (r3 = v({}, e3)).__v = e3.__v + 1, L(s3, e3, r3, u3.__n, void 0 !== s3.ownerSVGElement, null != e3.__h ? [c3] : null, t3, null == c3 ? g(e3) : c3, e3.__h, o3), M(t3, e3, o3), e3.__e != c3 && m(e3)), i.length > l3 && i.sort(f));
    x.__r = 0;
  }
  function P(n2, l3, u3, t3, i3, o3, r3, f3, e3, a3, v3) {
    var p3, y2, _2, b3, m3, w3, x2, P2, S, H2 = 0, I2 = t3 && t3.__k || s, T3 = I2.length, j3 = T3, z3 = l3.length;
    for (u3.__k = [], p3 = 0; p3 < z3; p3++)
      null != (b3 = u3.__k[p3] = null == (b3 = l3[p3]) || "boolean" == typeof b3 || "function" == typeof b3 ? null : "string" == typeof b3 || "number" == typeof b3 || "bigint" == typeof b3 ? d(null, b3, null, null, b3) : h(b3) ? d(k, { children: b3 }, null, null, null) : b3.__b > 0 ? d(b3.type, b3.props, b3.key, b3.ref ? b3.ref : null, b3.__v) : b3) ? (b3.__ = u3, b3.__b = u3.__b + 1, -1 === (P2 = A(b3, I2, x2 = p3 + H2, j3)) ? _2 = c : (_2 = I2[P2] || c, I2[P2] = void 0, j3--), L(n2, b3, _2, i3, o3, r3, f3, e3, a3, v3), m3 = b3.__e, (y2 = b3.ref) && _2.ref != y2 && (_2.ref && O(_2.ref, null, b3), v3.push(y2, b3.__c || m3, b3)), null != m3 && (null == w3 && (w3 = m3), (S = _2 === c || null === _2.__v) ? -1 == P2 && H2-- : P2 !== x2 && (P2 === x2 + 1 ? H2++ : P2 > x2 ? j3 > z3 - x2 ? H2 += P2 - x2 : H2-- : H2 = P2 < x2 && P2 == x2 - 1 ? P2 - x2 : 0), x2 = p3 + H2, "function" != typeof b3.type || P2 === x2 && _2.__k !== b3.__k ? "function" == typeof b3.type || P2 === x2 && !S ? void 0 !== b3.__d ? (e3 = b3.__d, b3.__d = void 0) : e3 = m3.nextSibling : e3 = $(n2, m3, e3) : e3 = C(b3, e3, n2), "function" == typeof u3.type && (u3.__d = e3))) : (_2 = I2[p3]) && null == _2.key && _2.__e && (_2.__e == e3 && (e3 = g(_2)), q(_2, _2, false));
    for (u3.__e = w3, p3 = T3; p3--; )
      null != I2[p3] && ("function" == typeof u3.type && null != I2[p3].__e && I2[p3].__e == u3.__d && (u3.__d = I2[p3].__e.nextSibling), q(I2[p3], I2[p3]));
  }
  function C(n2, l3, u3) {
    for (var t3, i3 = n2.__k, o3 = 0; i3 && o3 < i3.length; o3++)
      (t3 = i3[o3]) && (t3.__ = n2, l3 = "function" == typeof t3.type ? C(t3, l3, u3) : $(u3, t3.__e, l3));
    return l3;
  }
  function $(n2, l3, u3) {
    return null == u3 || u3.parentNode !== n2 ? n2.insertBefore(l3, null) : l3 == u3 && null != l3.parentNode || n2.insertBefore(l3, u3), l3.nextSibling;
  }
  function A(n2, l3, u3, t3) {
    var i3 = n2.key, o3 = n2.type, r3 = u3 - 1, f3 = u3 + 1, e3 = l3[u3];
    if (null === e3 || e3 && i3 == e3.key && o3 === e3.type)
      return u3;
    if (t3 > (null != e3 ? 1 : 0))
      for (; r3 >= 0 || f3 < l3.length; ) {
        if (r3 >= 0) {
          if ((e3 = l3[r3]) && i3 == e3.key && o3 === e3.type)
            return r3;
          r3--;
        }
        if (f3 < l3.length) {
          if ((e3 = l3[f3]) && i3 == e3.key && o3 === e3.type)
            return f3;
          f3++;
        }
      }
    return -1;
  }
  function H(n2, l3, u3, t3, i3) {
    var o3;
    for (o3 in u3)
      "children" === o3 || "key" === o3 || o3 in l3 || T(n2, o3, null, u3[o3], t3);
    for (o3 in l3)
      i3 && "function" != typeof l3[o3] || "children" === o3 || "key" === o3 || "value" === o3 || "checked" === o3 || u3[o3] === l3[o3] || T(n2, o3, l3[o3], u3[o3], t3);
  }
  function I(n2, l3, u3) {
    "-" === l3[0] ? n2.setProperty(l3, null == u3 ? "" : u3) : n2[l3] = null == u3 ? "" : "number" != typeof u3 || a.test(l3) ? u3 : u3 + "px";
  }
  function T(n2, l3, u3, t3, i3) {
    var o3;
    n:
      if ("style" === l3)
        if ("string" == typeof u3)
          n2.style.cssText = u3;
        else {
          if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3)
            for (l3 in t3)
              u3 && l3 in u3 || I(n2.style, l3, "");
          if (u3)
            for (l3 in u3)
              t3 && u3[l3] === t3[l3] || I(n2.style, l3, u3[l3]);
        }
      else if ("o" === l3[0] && "n" === l3[1])
        o3 = l3 !== (l3 = l3.replace(/Capture$/, "")), l3 = l3.toLowerCase() in n2 ? l3.toLowerCase().slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + o3] = u3, u3 ? t3 || n2.addEventListener(l3, o3 ? z : j, o3) : n2.removeEventListener(l3, o3 ? z : j, o3);
      else if ("dangerouslySetInnerHTML" !== l3) {
        if (i3)
          l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" !== l3 && "height" !== l3 && "href" !== l3 && "list" !== l3 && "form" !== l3 && "tabIndex" !== l3 && "download" !== l3 && "rowSpan" !== l3 && "colSpan" !== l3 && l3 in n2)
          try {
            n2[l3] = null == u3 ? "" : u3;
            break n;
          } catch (n3) {
          }
        "function" == typeof u3 || (null == u3 || false === u3 && "-" !== l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, u3));
      }
  }
  function j(n2) {
    return this.l[n2.type + false](l.event ? l.event(n2) : n2);
  }
  function z(n2) {
    return this.l[n2.type + true](l.event ? l.event(n2) : n2);
  }
  function L(n2, u3, t3, i3, o3, r3, f3, e3, c3, s3) {
    var a3, p3, y2, d3, _2, g3, m3, w3, x2, C2, S, $2, A2, H2, I2, T3 = u3.type;
    if (void 0 !== u3.constructor)
      return null;
    null != t3.__h && (c3 = t3.__h, e3 = u3.__e = t3.__e, u3.__h = null, r3 = [e3]), (a3 = l.__b) && a3(u3);
    n:
      if ("function" == typeof T3)
        try {
          if (w3 = u3.props, x2 = (a3 = T3.contextType) && i3[a3.__c], C2 = a3 ? x2 ? x2.props.value : a3.__ : i3, t3.__c ? m3 = (p3 = u3.__c = t3.__c).__ = p3.__E : ("prototype" in T3 && T3.prototype.render ? u3.__c = p3 = new T3(w3, C2) : (u3.__c = p3 = new b(w3, C2), p3.constructor = T3, p3.render = B), x2 && x2.sub(p3), p3.props = w3, p3.state || (p3.state = {}), p3.context = C2, p3.__n = i3, y2 = p3.__d = true, p3.__h = [], p3._sb = []), null == p3.__s && (p3.__s = p3.state), null != T3.getDerivedStateFromProps && (p3.__s == p3.state && (p3.__s = v({}, p3.__s)), v(p3.__s, T3.getDerivedStateFromProps(w3, p3.__s))), d3 = p3.props, _2 = p3.state, p3.__v = u3, y2)
            null == T3.getDerivedStateFromProps && null != p3.componentWillMount && p3.componentWillMount(), null != p3.componentDidMount && p3.__h.push(p3.componentDidMount);
          else {
            if (null == T3.getDerivedStateFromProps && w3 !== d3 && null != p3.componentWillReceiveProps && p3.componentWillReceiveProps(w3, C2), !p3.__e && (null != p3.shouldComponentUpdate && false === p3.shouldComponentUpdate(w3, p3.__s, C2) || u3.__v === t3.__v)) {
              for (u3.__v !== t3.__v && (p3.props = w3, p3.state = p3.__s, p3.__d = false), u3.__e = t3.__e, u3.__k = t3.__k, u3.__k.forEach(function(n3) {
                n3 && (n3.__ = u3);
              }), S = 0; S < p3._sb.length; S++)
                p3.__h.push(p3._sb[S]);
              p3._sb = [], p3.__h.length && f3.push(p3);
              break n;
            }
            null != p3.componentWillUpdate && p3.componentWillUpdate(w3, p3.__s, C2), null != p3.componentDidUpdate && p3.__h.push(function() {
              p3.componentDidUpdate(d3, _2, g3);
            });
          }
          if (p3.context = C2, p3.props = w3, p3.__P = n2, p3.__e = false, $2 = l.__r, A2 = 0, "prototype" in T3 && T3.prototype.render) {
            for (p3.state = p3.__s, p3.__d = false, $2 && $2(u3), a3 = p3.render(p3.props, p3.state, p3.context), H2 = 0; H2 < p3._sb.length; H2++)
              p3.__h.push(p3._sb[H2]);
            p3._sb = [];
          } else
            do {
              p3.__d = false, $2 && $2(u3), a3 = p3.render(p3.props, p3.state, p3.context), p3.state = p3.__s;
            } while (p3.__d && ++A2 < 25);
          p3.state = p3.__s, null != p3.getChildContext && (i3 = v(v({}, i3), p3.getChildContext())), y2 || null == p3.getSnapshotBeforeUpdate || (g3 = p3.getSnapshotBeforeUpdate(d3, _2)), P(n2, h(I2 = null != a3 && a3.type === k && null == a3.key ? a3.props.children : a3) ? I2 : [I2], u3, t3, i3, o3, r3, f3, e3, c3, s3), p3.base = u3.__e, u3.__h = null, p3.__h.length && f3.push(p3), m3 && (p3.__E = p3.__ = null);
        } catch (n3) {
          u3.__v = null, (c3 || null != r3) && (u3.__e = e3, u3.__h = !!c3, r3[r3.indexOf(e3)] = null), l.__e(n3, u3, t3);
        }
      else
        null == r3 && u3.__v === t3.__v ? (u3.__k = t3.__k, u3.__e = t3.__e) : u3.__e = N(t3.__e, u3, t3, i3, o3, r3, f3, c3, s3);
    (a3 = l.diffed) && a3(u3);
  }
  function M(n2, u3, t3) {
    for (var i3 = 0; i3 < t3.length; i3++)
      O(t3[i3], t3[++i3], t3[++i3]);
    l.__c && l.__c(u3, n2), n2.some(function(u4) {
      try {
        n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
          n3.call(u4);
        });
      } catch (n3) {
        l.__e(n3, u4.__v);
      }
    });
  }
  function N(l3, u3, t3, i3, o3, r3, f3, e3, s3) {
    var a3, v3, y2, d3 = t3.props, _2 = u3.props, k3 = u3.type, b3 = 0;
    if ("svg" === k3 && (o3 = true), null != r3) {
      for (; b3 < r3.length; b3++)
        if ((a3 = r3[b3]) && "setAttribute" in a3 == !!k3 && (k3 ? a3.localName === k3 : 3 === a3.nodeType)) {
          l3 = a3, r3[b3] = null;
          break;
        }
    }
    if (null == l3) {
      if (null === k3)
        return document.createTextNode(_2);
      l3 = o3 ? document.createElementNS("http://www.w3.org/2000/svg", k3) : document.createElement(k3, _2.is && _2), r3 = null, e3 = false;
    }
    if (null === k3)
      d3 === _2 || e3 && l3.data === _2 || (l3.data = _2);
    else {
      if (r3 = r3 && n.call(l3.childNodes), v3 = (d3 = t3.props || c).dangerouslySetInnerHTML, y2 = _2.dangerouslySetInnerHTML, !e3) {
        if (null != r3)
          for (d3 = {}, b3 = 0; b3 < l3.attributes.length; b3++)
            d3[l3.attributes[b3].name] = l3.attributes[b3].value;
        (y2 || v3) && (y2 && (v3 && y2.__html == v3.__html || y2.__html === l3.innerHTML) || (l3.innerHTML = y2 && y2.__html || ""));
      }
      if (H(l3, _2, d3, o3, e3), y2)
        u3.__k = [];
      else if (P(l3, h(b3 = u3.props.children) ? b3 : [b3], u3, t3, i3, o3 && "foreignObject" !== k3, r3, f3, r3 ? r3[0] : t3.__k && g(t3, 0), e3, s3), null != r3)
        for (b3 = r3.length; b3--; )
          null != r3[b3] && p(r3[b3]);
      e3 || ("value" in _2 && void 0 !== (b3 = _2.value) && (b3 !== l3.value || "progress" === k3 && !b3 || "option" === k3 && b3 !== d3.value) && T(l3, "value", b3, d3.value, false), "checked" in _2 && void 0 !== (b3 = _2.checked) && b3 !== l3.checked && T(l3, "checked", b3, d3.checked, false));
    }
    return l3;
  }
  function O(n2, u3, t3) {
    try {
      "function" == typeof n2 ? n2(u3) : n2.current = u3;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function q(n2, u3, t3) {
    var i3, o3;
    if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current !== n2.__e || O(i3, null, u3)), null != (i3 = n2.__c)) {
      if (i3.componentWillUnmount)
        try {
          i3.componentWillUnmount();
        } catch (n3) {
          l.__e(n3, u3);
        }
      i3.base = i3.__P = null, n2.__c = void 0;
    }
    if (i3 = n2.__k)
      for (o3 = 0; o3 < i3.length; o3++)
        i3[o3] && q(i3[o3], u3, t3 || "function" != typeof n2.type);
    t3 || null == n2.__e || p(n2.__e), n2.__ = n2.__e = n2.__d = void 0;
  }
  function B(n2, l3, u3) {
    return this.constructor(n2, u3);
  }
  function D(u3, t3, i3) {
    var o3, r3, f3, e3;
    l.__ && l.__(u3, t3), r3 = (o3 = "function" == typeof i3) ? null : i3 && i3.__k || t3.__k, f3 = [], e3 = [], L(t3, u3 = (!o3 && i3 || t3).__k = y(k, null, [u3]), r3 || c, c, void 0 !== t3.ownerSVGElement, !o3 && i3 ? [i3] : r3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, f3, !o3 && i3 ? i3 : r3 ? r3.__e : t3.firstChild, o3, e3), M(f3, u3, e3);
  }
  var n, l, u, t, i, o, r, f, e, c, s, a, h;
  var init_preact_module = __esm({
    "node_modules/preact/dist/preact.module.js"() {
      c = {};
      s = [];
      a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      h = Array.isArray;
      n = s.slice, l = { __e: function(n2, l3, u3, t3) {
        for (var i3, o3, r3; l3 = l3.__; )
          if ((i3 = l3.__c) && !i3.__)
            try {
              if ((o3 = i3.constructor) && null != o3.getDerivedStateFromError && (i3.setState(o3.getDerivedStateFromError(n2)), r3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t3 || {}), r3 = i3.__d), r3)
                return i3.__E = i3;
            } catch (l4) {
              n2 = l4;
            }
        throw n2;
      } }, u = 0, t = function(n2) {
        return null != n2 && void 0 === n2.constructor;
      }, b.prototype.setState = function(n2, l3) {
        var u3;
        u3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = v({}, this.state), "function" == typeof n2 && (n2 = n2(v({}, u3), this.props)), n2 && v(u3, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), w(this));
      }, b.prototype.forceUpdate = function(n2) {
        this.__v && (this.__e = true, n2 && this.__h.push(n2), w(this));
      }, b.prototype.render = k, i = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n2, l3) {
        return n2.__v.__b - l3.__v.__b;
      }, x.__r = 0, e = 0;
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/utilities/create-class-name.js
  function createClassName(classNames) {
    return classNames.filter(function(className) {
      return className !== null;
    }).join(" ");
  }
  var init_create_class_name = __esm({
    "node_modules/@create-figma-plugin/ui/lib/utilities/create-class-name.js"() {
    }
  });

  // node_modules/preact/hooks/dist/hooks.module.js
  function d2(t3, u3) {
    l.__h && l.__h(r2, t3, o2 || u3), o2 = 0;
    var i3 = r2.__H || (r2.__H = { __: [], __h: [] });
    return t3 >= i3.__.length && i3.__.push({ __V: c2 }), i3.__[t3];
  }
  function h2(n2) {
    return o2 = 1, s2(B2, n2);
  }
  function s2(n2, u3, i3) {
    var o3 = d2(t2++, 2);
    if (o3.t = n2, !o3.__c && (o3.__ = [i3 ? i3(u3) : B2(void 0, u3), function(n3) {
      var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
      t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
    }], o3.__c = r2, !r2.u)) {
      var f3 = function(n3, t3, r3) {
        if (!o3.__c.__H)
          return true;
        var u4 = o3.__c.__H.__.filter(function(n4) {
          return n4.__c;
        });
        if (u4.every(function(n4) {
          return !n4.__N;
        }))
          return !c3 || c3.call(this, n3, t3, r3);
        var i4 = false;
        return u4.forEach(function(n4) {
          if (n4.__N) {
            var t4 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i4 = true);
          }
        }), !(!i4 && o3.__c.props === n3) && (!c3 || c3.call(this, n3, t3, r3));
      };
      r2.u = true;
      var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n3, t3, r3) {
        if (this.__e) {
          var u4 = c3;
          c3 = void 0, f3(n3, t3, r3), c3 = u4;
        }
        e3 && e3.call(this, n3, t3, r3);
      }, r2.shouldComponentUpdate = f3;
    }
    return o3.__N || o3.__;
  }
  function p2(u3, i3) {
    var o3 = d2(t2++, 3);
    !l.__s && z2(o3.__H, i3) && (o3.__ = u3, o3.i = i3, r2.__H.__h.push(o3));
  }
  function _(n2) {
    return o2 = 5, F(function() {
      return { current: n2 };
    }, []);
  }
  function F(n2, r3) {
    var u3 = d2(t2++, 7);
    return z2(u3.__H, r3) ? (u3.__V = n2(), u3.i = r3, u3.__h = n2, u3.__V) : u3.__;
  }
  function T2(n2, t3) {
    return o2 = 8, F(function() {
      return n2;
    }, t3);
  }
  function b2() {
    for (var t3; t3 = f2.shift(); )
      if (t3.__P && t3.__H)
        try {
          t3.__H.__h.forEach(k2), t3.__H.__h.forEach(w2), t3.__H.__h = [];
        } catch (r3) {
          t3.__H.__h = [], l.__e(r3, t3.__v);
        }
  }
  function j2(n2) {
    var t3, r3 = function() {
      clearTimeout(u3), g2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u3 = setTimeout(r3, 100);
    g2 && (t3 = requestAnimationFrame(r3));
  }
  function k2(n2) {
    var t3 = r2, u3 = n2.__c;
    "function" == typeof u3 && (n2.__c = void 0, u3()), r2 = t3;
  }
  function w2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }
  function z2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
      return t4 !== n2[r3];
    });
  }
  function B2(n2, t3) {
    return "function" == typeof t3 ? t3(n2) : t3;
  }
  var t2, r2, u2, i2, o2, f2, c2, e2, a2, v2, l2, m2, g2;
  var init_hooks_module = __esm({
    "node_modules/preact/hooks/dist/hooks.module.js"() {
      init_preact_module();
      o2 = 0;
      f2 = [];
      c2 = [];
      e2 = l.__b;
      a2 = l.__r;
      v2 = l.diffed;
      l2 = l.__c;
      m2 = l.unmount;
      l.__b = function(n2) {
        r2 = null, e2 && e2(n2);
      }, l.__r = function(n2) {
        a2 && a2(n2), t2 = 0;
        var i3 = (r2 = n2.__c).__H;
        i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.forEach(function(n3) {
          n3.__N && (n3.__ = n3.__N), n3.__V = c2, n3.__N = n3.i = void 0;
        })) : (i3.__h.forEach(k2), i3.__h.forEach(w2), i3.__h = [], t2 = 0)), u2 = r2;
      }, l.diffed = function(t3) {
        v2 && v2(t3);
        var o3 = t3.__c;
        o3 && o3.__H && (o3.__H.__h.length && (1 !== f2.push(o3) && i2 === l.requestAnimationFrame || ((i2 = l.requestAnimationFrame) || j2)(b2)), o3.__H.__.forEach(function(n2) {
          n2.i && (n2.__H = n2.i), n2.__V !== c2 && (n2.__ = n2.__V), n2.i = void 0, n2.__V = c2;
        })), u2 = r2 = null;
      }, l.__c = function(t3, r3) {
        r3.some(function(t4) {
          try {
            t4.__h.forEach(k2), t4.__h = t4.__h.filter(function(n2) {
              return !n2.__ || w2(n2);
            });
          } catch (u3) {
            r3.some(function(n2) {
              n2.__h && (n2.__h = []);
            }), r3 = [], l.__e(u3, t4.__v);
          }
        }), l2 && l2(t3, r3);
      }, l.unmount = function(t3) {
        m2 && m2(t3);
        var r3, u3 = t3.__c;
        u3 && u3.__H && (u3.__H.__.forEach(function(n2) {
          try {
            k2(n2);
          } catch (n3) {
            r3 = n3;
          }
        }), u3.__H = void 0, r3 && l.__e(r3, u3.__v));
      };
      g2 = "function" == typeof requestAnimationFrame;
    }
  });

  // ../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/95d05c51-7f3d-453a-9db5-1fec325ab9c5/loading-indicator.module.js
  var loading_indicator_module_default;
  var init_loading_indicator_module = __esm({
    "../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/95d05c51-7f3d-453a-9db5-1fec325ab9c5/loading-indicator.module.js"() {
      if (document.getElementById("ef879c52c7") === null) {
        const element = document.createElement("style");
        element.id = "ef879c52c7";
        element.textContent = `._loadingIndicator_pl5c3_1 {
  position: relative;
  width: 16px;
  height: 16px;
  margin: 0 auto;
}

._svg_pl5c3_8 {
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  animation: _rotating_pl5c3_1 0.5s linear infinite;
  fill: currentColor;
}

@keyframes _rotating_pl5c3_1 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AY3JlYXRlLWZpZ21hLXBsdWdpbi91aS9saWIvY29tcG9uZW50cy9sb2FkaW5nLWluZGljYXRvci9sb2FkaW5nLWluZGljYXRvci5tb2R1bGUuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1osY0FBYztBQUNoQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0VBQ1osaURBQXdDO0VBQ3hDLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFO0lBQ0UsdUJBQXVCO0VBQ3pCO0VBQ0E7SUFDRSx5QkFBeUI7RUFDM0I7QUFDRiIsImZpbGUiOiJub2RlX21vZHVsZXMvQGNyZWF0ZS1maWdtYS1wbHVnaW4vdWkvbGliL2NvbXBvbmVudHMvbG9hZGluZy1pbmRpY2F0b3IvbG9hZGluZy1pbmRpY2F0b3IubW9kdWxlLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sb2FkaW5nSW5kaWNhdG9yIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTZweDtcbiAgaGVpZ2h0OiAxNnB4O1xuICBtYXJnaW46IDAgYXV0bztcbn1cblxuLnN2ZyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTZweDtcbiAgaGVpZ2h0OiAxNnB4O1xuICBhbmltYXRpb246IHJvdGF0aW5nIDAuNXMgbGluZWFyIGluZmluaXRlO1xuICBmaWxsOiBjdXJyZW50Q29sb3I7XG59XG5cbkBrZXlmcmFtZXMgcm90YXRpbmcge1xuICBmcm9tIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgfVxuICB0byB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgfVxufVxuIl19 */`;
        document.head.append(element);
      }
      loading_indicator_module_default = { "loadingIndicator": "_loadingIndicator_pl5c3_1", "svg": "_svg_pl5c3_8", "rotating": "_rotating_pl5c3_1" };
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/components/loading-indicator/loading-indicator.js
  function LoadingIndicator(_a) {
    var _b = _a, { color } = _b, rest = __objRest(_b, ["color"]);
    return y(
      "div",
      __spreadProps(__spreadValues({}, rest), { class: loading_indicator_module_default.loadingIndicator }),
      y(
        "svg",
        { class: loading_indicator_module_default.svg, style: typeof color === "undefined" ? void 0 : {
          fill: `var(--figma-color-icon-${color})`
        } },
        y("path", { d: "M8 15C11.866 15 15 11.866 15 8C15 6.7865 14.6912 5.64511 14.1479 4.65013L15.0263 4.17174C15.6471 5.30882 16 6.6132 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 5.54138 1.10909 3.34181 2.85426 1.8743L3.47761 2.65678C1.96204 3.94081 1 5.85806 1 8C1 11.866 4.13401 15 8 15Z" })
      )
    );
  }
  var init_loading_indicator = __esm({
    "node_modules/@create-figma-plugin/ui/lib/components/loading-indicator/loading-indicator.js"() {
      init_preact_module();
      init_loading_indicator_module();
    }
  });

  // ../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/99dc0a21-4e35-4234-877d-287808a7dfc3/button.module.js
  var button_module_default;
  var init_button_module = __esm({
    "../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/99dc0a21-4e35-4234-877d-287808a7dfc3/button.module.js"() {
      if (document.getElementById("280b5f605d") === null) {
        const element = document.createElement("style");
        element.id = "280b5f605d";
        element.textContent = `._button_5fxgc_1 {
  position: relative;
  z-index: var(--z-index-1);
  display: inline-block;
}

._fullWidth_5fxgc_7 {
  display: block;
}

._button_5fxgc_1 button {
  display: inline-block;
  height: 32px;
  border-radius: var(--border-radius-6);
}

._disabled_5fxgc_17 button {
  cursor: not-allowed;
}

._fullWidth_5fxgc_7 button {
  display: block;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
}

._default_5fxgc_29 button {
  padding: 0 14px;
  border: 2px solid transparent;
  background-color: var(--figma-color-bg-brand);
  color: var(--figma-color-text-onbrand);
  line-height: 28px;
}
._default_5fxgc_29:not(._disabled_5fxgc_17) button:focus {
  border-color: var(--figma-color-border-brand-strong);
}
._default_5fxgc_29._disabled_5fxgc_17 button {
  background-color: var(--figma-color-bg-disabled);
  color: var(--figma-color-text-ondisabled);
}

._default_5fxgc_29._danger_5fxgc_44 button {
  background-color: var(--figma-color-bg-danger);
  color: var(--figma-color-text-ondanger);
}
._default_5fxgc_29._danger_5fxgc_44:not(._disabled_5fxgc_17) button:focus {
  border-color: var(--figma-color-border-danger-strong);
}
._default_5fxgc_29._danger_5fxgc_44._disabled_5fxgc_17 button {
  background-color: var(--figma-color-bg-disabled);
  color: var(--figma-color-text-ondisabled);
}

._secondary_5fxgc_56 button {
  padding: 0 15px;
  border: 1px solid var(--figma-color-border-strong);
  background-color: transparent;
  color: var(--figma-color-text);
  line-height: 30px;
}
._secondary_5fxgc_56:not(._disabled_5fxgc_17) button:focus {
  padding: 0 14px;
  border-width: 2px;
  border-color: var(--figma-color-border-brand-strong);
  line-height: 28px;
}
._secondary_5fxgc_56._disabled_5fxgc_17 button {
  border-color: var(--figma-color-border-disabled-strong);
  color: var(--figma-color-text-disabled);
}

._secondary_5fxgc_56._danger_5fxgc_44 button {
  border-color: var(--figma-color-border-danger-strong);
  color: var(--figma-color-text-danger);
}
._secondary_5fxgc_56._danger_5fxgc_44:not(._disabled_5fxgc_17) button:focus {
  border-color: var(--figma-color-border-danger-strong);
}
._secondary_5fxgc_56._danger_5fxgc_44._disabled_5fxgc_17 button {
  border-color: var(--figma-color-border-disabled-strong);
  color: var(--figma-color-text-disabled);
}

._loadingIndicator_5fxgc_86 {
  position: absolute;
  top: 50%;
  left: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

._default_5fxgc_29 ._loadingIndicator_5fxgc_86 {
  color: var(--figma-color-icon-onbrand);
}
._default_5fxgc_29._disabled_5fxgc_17 ._loadingIndicator_5fxgc_86 {
  color: var(--figma-color-icon-ondisabled);
}

._default_5fxgc_29._danger_5fxgc_44 ._loadingIndicator_5fxgc_86 {
  color: var(--figma-color-icon-ondanger);
}
._default_5fxgc_29._danger_5fxgc_44._disabled_5fxgc_17 ._loadingIndicator_5fxgc_86 {
  color: var(--figma-color-icon-ondisabled);
}

._secondary_5fxgc_56 ._loadingIndicator_5fxgc_86 {
  color: var(--figma-color-text);
}
._secondary_5fxgc_56._disabled_5fxgc_17 ._loadingIndicator_5fxgc_86 {
  color: var(--figma-color-text-disabled);
}

._secondary_5fxgc_56._danger_5fxgc_44 ._loadingIndicator_5fxgc_86 {
  color: var(--figma-color-text-danger);
}
._secondary_5fxgc_56._danger_5fxgc_44._disabled_5fxgc_17 ._loadingIndicator_5fxgc_86 {
  color: var(--figma-color-text-disabled);
}

._children_5fxgc_122 {
  display: inline;
}
._loading_5fxgc_86 ._children_5fxgc_122 {
  visibility: hidden;
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AY3JlYXRlLWZpZ21hLXBsdWdpbi91aS9saWIvY29tcG9uZW50cy9idXR0b24vYnV0dG9uLm1vZHVsZS5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsWUFBWTtFQUNaLHFDQUFxQztBQUN2Qzs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsNkJBQTZCO0VBQzdCLDZDQUE2QztFQUM3QyxzQ0FBc0M7RUFDdEMsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxvREFBb0Q7QUFDdEQ7QUFDQTtFQUNFLGdEQUFnRDtFQUNoRCx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSw4Q0FBOEM7RUFDOUMsdUNBQXVDO0FBQ3pDO0FBQ0E7RUFDRSxxREFBcUQ7QUFDdkQ7QUFDQTtFQUNFLGdEQUFnRDtFQUNoRCx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysa0RBQWtEO0VBQ2xELDZCQUE2QjtFQUM3Qiw4QkFBOEI7RUFDOUIsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLG9EQUFvRDtFQUNwRCxpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLHVEQUF1RDtFQUN2RCx1Q0FBdUM7QUFDekM7O0FBRUE7RUFDRSxxREFBcUQ7RUFDckQscUNBQXFDO0FBQ3ZDO0FBQ0E7RUFDRSxxREFBcUQ7QUFDdkQ7QUFDQTtFQUNFLHVEQUF1RDtFQUN2RCx1Q0FBdUM7QUFDekM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLFNBQVM7RUFDVCxvQkFBb0I7RUFDcEIsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0Usc0NBQXNDO0FBQ3hDO0FBQ0E7RUFDRSx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSx1Q0FBdUM7QUFDekM7QUFDQTtFQUNFLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLDhCQUE4QjtBQUNoQztBQUNBO0VBQ0UsdUNBQXVDO0FBQ3pDOztBQUVBO0VBQ0UscUNBQXFDO0FBQ3ZDO0FBQ0E7RUFDRSx1Q0FBdUM7QUFDekM7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCO0FBQ0E7RUFDRSxrQkFBa0I7QUFDcEIiLCJmaWxlIjoibm9kZV9tb2R1bGVzL0BjcmVhdGUtZmlnbWEtcGx1Z2luL3VpL2xpYi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24ubW9kdWxlLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5idXR0b24ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IHZhcigtLXotaW5kZXgtMSk7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLmZ1bGxXaWR0aCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uYnV0dG9uIGJ1dHRvbiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgaGVpZ2h0OiAzMnB4O1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS1ib3JkZXItcmFkaXVzLTYpO1xufVxuXG4uZGlzYWJsZWQgYnV0dG9uIHtcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbn1cblxuLmZ1bGxXaWR0aCBidXR0b24ge1xuICBkaXNwbGF5OiBibG9jaztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2lkdGg6IDEwMCU7XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uZGVmYXVsdCBidXR0b24ge1xuICBwYWRkaW5nOiAwIDE0cHg7XG4gIGJvcmRlcjogMnB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1maWdtYS1jb2xvci1iZy1icmFuZCk7XG4gIGNvbG9yOiB2YXIoLS1maWdtYS1jb2xvci10ZXh0LW9uYnJhbmQpO1xuICBsaW5lLWhlaWdodDogMjhweDtcbn1cbi5kZWZhdWx0Om5vdCguZGlzYWJsZWQpIGJ1dHRvbjpmb2N1cyB7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItYm9yZGVyLWJyYW5kLXN0cm9uZyk7XG59XG4uZGVmYXVsdC5kaXNhYmxlZCBidXR0b24ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1maWdtYS1jb2xvci1iZy1kaXNhYmxlZCk7XG4gIGNvbG9yOiB2YXIoLS1maWdtYS1jb2xvci10ZXh0LW9uZGlzYWJsZWQpO1xufVxuXG4uZGVmYXVsdC5kYW5nZXIgYnV0dG9uIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItYmctZGFuZ2VyKTtcbiAgY29sb3I6IHZhcigtLWZpZ21hLWNvbG9yLXRleHQtb25kYW5nZXIpO1xufVxuLmRlZmF1bHQuZGFuZ2VyOm5vdCguZGlzYWJsZWQpIGJ1dHRvbjpmb2N1cyB7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItYm9yZGVyLWRhbmdlci1zdHJvbmcpO1xufVxuLmRlZmF1bHQuZGFuZ2VyLmRpc2FibGVkIGJ1dHRvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWZpZ21hLWNvbG9yLWJnLWRpc2FibGVkKTtcbiAgY29sb3I6IHZhcigtLWZpZ21hLWNvbG9yLXRleHQtb25kaXNhYmxlZCk7XG59XG5cbi5zZWNvbmRhcnkgYnV0dG9uIHtcbiAgcGFkZGluZzogMCAxNXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1maWdtYS1jb2xvci1ib3JkZXItc3Ryb25nKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiB2YXIoLS1maWdtYS1jb2xvci10ZXh0KTtcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XG59XG4uc2Vjb25kYXJ5Om5vdCguZGlzYWJsZWQpIGJ1dHRvbjpmb2N1cyB7XG4gIHBhZGRpbmc6IDAgMTRweDtcbiAgYm9yZGVyLXdpZHRoOiAycHg7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItYm9yZGVyLWJyYW5kLXN0cm9uZyk7XG4gIGxpbmUtaGVpZ2h0OiAyOHB4O1xufVxuLnNlY29uZGFyeS5kaXNhYmxlZCBidXR0b24ge1xuICBib3JkZXItY29sb3I6IHZhcigtLWZpZ21hLWNvbG9yLWJvcmRlci1kaXNhYmxlZC1zdHJvbmcpO1xuICBjb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItdGV4dC1kaXNhYmxlZCk7XG59XG5cbi5zZWNvbmRhcnkuZGFuZ2VyIGJ1dHRvbiB7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItYm9yZGVyLWRhbmdlci1zdHJvbmcpO1xuICBjb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItdGV4dC1kYW5nZXIpO1xufVxuLnNlY29uZGFyeS5kYW5nZXI6bm90KC5kaXNhYmxlZCkgYnV0dG9uOmZvY3VzIHtcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1maWdtYS1jb2xvci1ib3JkZXItZGFuZ2VyLXN0cm9uZyk7XG59XG4uc2Vjb25kYXJ5LmRhbmdlci5kaXNhYmxlZCBidXR0b24ge1xuICBib3JkZXItY29sb3I6IHZhcigtLWZpZ21hLWNvbG9yLWJvcmRlci1kaXNhYmxlZC1zdHJvbmcpO1xuICBjb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItdGV4dC1kaXNhYmxlZCk7XG59XG5cbi5sb2FkaW5nSW5kaWNhdG9yIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNTAlO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59XG5cbi5kZWZhdWx0IC5sb2FkaW5nSW5kaWNhdG9yIHtcbiAgY29sb3I6IHZhcigtLWZpZ21hLWNvbG9yLWljb24tb25icmFuZCk7XG59XG4uZGVmYXVsdC5kaXNhYmxlZCAubG9hZGluZ0luZGljYXRvciB7XG4gIGNvbG9yOiB2YXIoLS1maWdtYS1jb2xvci1pY29uLW9uZGlzYWJsZWQpO1xufVxuXG4uZGVmYXVsdC5kYW5nZXIgLmxvYWRpbmdJbmRpY2F0b3Ige1xuICBjb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItaWNvbi1vbmRhbmdlcik7XG59XG4uZGVmYXVsdC5kYW5nZXIuZGlzYWJsZWQgLmxvYWRpbmdJbmRpY2F0b3Ige1xuICBjb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItaWNvbi1vbmRpc2FibGVkKTtcbn1cblxuLnNlY29uZGFyeSAubG9hZGluZ0luZGljYXRvciB7XG4gIGNvbG9yOiB2YXIoLS1maWdtYS1jb2xvci10ZXh0KTtcbn1cbi5zZWNvbmRhcnkuZGlzYWJsZWQgLmxvYWRpbmdJbmRpY2F0b3Ige1xuICBjb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItdGV4dC1kaXNhYmxlZCk7XG59XG5cbi5zZWNvbmRhcnkuZGFuZ2VyIC5sb2FkaW5nSW5kaWNhdG9yIHtcbiAgY29sb3I6IHZhcigtLWZpZ21hLWNvbG9yLXRleHQtZGFuZ2VyKTtcbn1cbi5zZWNvbmRhcnkuZGFuZ2VyLmRpc2FibGVkIC5sb2FkaW5nSW5kaWNhdG9yIHtcbiAgY29sb3I6IHZhcigtLWZpZ21hLWNvbG9yLXRleHQtZGlzYWJsZWQpO1xufVxuXG4uY2hpbGRyZW4ge1xuICBkaXNwbGF5OiBpbmxpbmU7XG59XG4ubG9hZGluZyAuY2hpbGRyZW4ge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG4iXX0= */`;
        document.head.append(element);
      }
      button_module_default = { "button": "_button_5fxgc_1", "fullWidth": "_fullWidth_5fxgc_7", "disabled": "_disabled_5fxgc_17", "default": "_default_5fxgc_29", "danger": "_danger_5fxgc_44", "secondary": "_secondary_5fxgc_56", "loadingIndicator": "_loadingIndicator_5fxgc_86", "children": "_children_5fxgc_122", "loading": "_loading_5fxgc_86" };
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/components/button/button.js
  function Button(_a) {
    var _b = _a, { children, danger = false, disabled = false, fullWidth = false, loading = false, onClick, propagateEscapeKeyDown = true, secondary = false } = _b, rest = __objRest(_b, ["children", "danger", "disabled", "fullWidth", "loading", "onClick", "propagateEscapeKeyDown", "secondary"]);
    const handleKeyDown = T2(function(event) {
      if (event.key !== "Escape") {
        return;
      }
      if (propagateEscapeKeyDown === false) {
        event.stopPropagation();
      }
      event.currentTarget.blur();
    }, [propagateEscapeKeyDown]);
    return y(
      "div",
      { class: createClassName([
        button_module_default.button,
        secondary === true ? button_module_default.secondary : button_module_default.default,
        danger === true ? button_module_default.danger : null,
        fullWidth === true ? button_module_default.fullWidth : null,
        disabled === true ? button_module_default.disabled : null,
        loading === true ? button_module_default.loading : null
      ]) },
      loading === true ? y(
        "div",
        { class: button_module_default.loadingIndicator },
        y(LoadingIndicator, null)
      ) : null,
      y(
        "button",
        __spreadProps(__spreadValues({}, rest), { disabled: disabled === true, onClick: disabled === true || loading === true ? void 0 : onClick, onKeyDown: disabled === true || loading === true ? void 0 : handleKeyDown, tabIndex: disabled === true ? -1 : 0 }),
        y("div", { class: button_module_default.children }, children)
      )
    );
  }
  var init_button = __esm({
    "node_modules/@create-figma-plugin/ui/lib/components/button/button.js"() {
      init_preact_module();
      init_hooks_module();
      init_create_class_name();
      init_loading_indicator();
      init_button_module();
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/utilities/get-current-from-ref.js
  function getCurrentFromRef(ref) {
    if (ref.current === null) {
      throw new Error("`ref.current` is `undefined`");
    }
    return ref.current;
  }
  var init_get_current_from_ref = __esm({
    "node_modules/@create-figma-plugin/ui/lib/utilities/get-current-from-ref.js"() {
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/events.js
  function on(name, handler) {
    const id = `${currentId}`;
    currentId += 1;
    eventHandlers[id] = { handler, name };
    return function() {
      delete eventHandlers[id];
    };
  }
  function once(name, handler) {
    let done = false;
    return on(name, function(...args) {
      if (done === true) {
        return;
      }
      done = true;
      handler(...args);
    });
  }
  function invokeEventHandler(name, args) {
    for (const id in eventHandlers) {
      if (eventHandlers[id].name === name) {
        eventHandlers[id].handler.apply(null, args);
      }
    }
  }
  var eventHandlers, currentId, emit;
  var init_events = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/events.js"() {
      eventHandlers = {};
      currentId = 0;
      emit = typeof window === "undefined" ? function(name, ...args) {
        figma.ui.postMessage([name, ...args]);
      } : function(name, ...args) {
        window.parent.postMessage({
          pluginMessage: [name, ...args]
        }, "*");
      };
      if (typeof window === "undefined") {
        figma.ui.onmessage = function([name, ...args]) {
          invokeEventHandler(name, args);
        };
      } else {
        window.onmessage = function(event) {
          if (typeof event.data.pluginMessage === "undefined") {
            return;
          }
          const [name, ...args] = event.data.pluginMessage;
          invokeEventHandler(name, args);
        };
      }
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/mixed-values.js
  var MIXED_STRING;
  var init_mixed_values = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/mixed-values.js"() {
      MIXED_STRING = "999999999999999";
    }
  });

  // node_modules/@create-figma-plugin/utilities/lib/index.js
  var init_lib = __esm({
    "node_modules/@create-figma-plugin/utilities/lib/index.js"() {
      init_events();
      init_mixed_values();
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/components/textbox/private/is-keycode-character-generating.js
  function isKeyCodeCharacterGenerating(keyCode) {
    return keyCode === 32 || keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90 || keyCode >= 96 && keyCode <= 105 || keyCode >= 186 && keyCode <= 192 || keyCode >= 219 && keyCode <= 222;
  }
  var init_is_keycode_character_generating = __esm({
    "node_modules/@create-figma-plugin/ui/lib/components/textbox/private/is-keycode-character-generating.js"() {
    }
  });

  // ../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/c216a3e6-d45f-43bd-8aed-8469fdd52213/textbox-multiline.module.js
  var textbox_multiline_module_default;
  var init_textbox_multiline_module = __esm({
    "../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/c216a3e6-d45f-43bd-8aed-8469fdd52213/textbox-multiline.module.js"() {
      if (document.getElementById("8f0fb96aff") === null) {
        const element = document.createElement("style");
        element.id = "8f0fb96aff";
        element.textContent = `._textboxMultiline_1rfqs_1 {
  position: relative;
  z-index: var(--z-index-1);
}

._grow_1rfqs_6 {
  display: grid;
}

._ghost_1rfqs_10,
._grow_1rfqs_6 ._textarea_1rfqs_11 {
  grid-area: 1 / 1 / 2 / 2;
}

._ghost_1rfqs_10 {
  padding: 6px 0 6px var(--space-extra-small);
  visibility: hidden;
  white-space: pre-wrap;
}

._textarea_1rfqs_11 {
  display: block;
  width: 100%;
  padding: 6px var(--space-extra-small) 6px var(--space-extra-small);
  border-radius: var(--border-radius-2);
  background-color: transparent;
  color: var(--figma-color-text);
  resize: none;
}
._textarea_1rfqs_11::placeholder {
  color: var(--figma-color-text-tertiary);
}
._disabled_1rfqs_33 ._textarea_1rfqs_11 {
  color: var(--figma-color-text-disabled);
  cursor: not-allowed;
}

._border_1rfqs_38 {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: var(--border-radius-2);
  pointer-events: none;
}
._hasBorder_1rfqs_48 ._border_1rfqs_38,
._textboxMultiline_1rfqs_1:not(._disabled_1rfqs_33):hover ._border_1rfqs_38 {
  border-color: var(--figma-color-border);
}
._textboxMultiline_1rfqs_1:not(._disabled_1rfqs_33) ._textarea_1rfqs_11:focus ~ ._border_1rfqs_38 {
  top: -1px;
  bottom: -1px;
  border: 2px solid var(--figma-color-border-brand-strong);
}

._underline_1rfqs_58 {
  position: absolute;
  right: var(--space-extra-small);
  bottom: 0;
  left: var(--space-extra-small);
  height: 1px;
  background-color: var(--figma-color-border);
}
._textboxMultiline_1rfqs_1:not(._disabled_1rfqs_33) ._textarea_1rfqs_11:focus ~ ._underline_1rfqs_58,
._textboxMultiline_1rfqs_1:not(._disabled_1rfqs_33):hover ._underline_1rfqs_58 {
  background-color: transparent;
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AY3JlYXRlLWZpZ21hLXBsdWdpbi91aS9saWIvY29tcG9uZW50cy90ZXh0Ym94L3RleHRib3gtbXVsdGlsaW5lL3RleHRib3gtbXVsdGlsaW5lLm1vZHVsZS5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBOztFQUVFLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLDJDQUEyQztFQUMzQyxrQkFBa0I7RUFDbEIscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsY0FBYztFQUNkLFdBQVc7RUFDWCxrRUFBa0U7RUFDbEUscUNBQXFDO0VBQ3JDLDZCQUE2QjtFQUM3Qiw4QkFBOEI7RUFDOUIsWUFBWTtBQUNkO0FBQ0E7RUFDRSx1Q0FBdUM7QUFDekM7QUFDQTtFQUNFLHVDQUF1QztFQUN2QyxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLFFBQVE7RUFDUixTQUFTO0VBQ1QsT0FBTztFQUNQLDZCQUE2QjtFQUM3QixxQ0FBcUM7RUFDckMsb0JBQW9CO0FBQ3RCO0FBQ0E7O0VBRUUsdUNBQXVDO0FBQ3pDO0FBQ0E7RUFDRSxTQUFTO0VBQ1QsWUFBWTtFQUNaLHdEQUF3RDtBQUMxRDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQiwrQkFBK0I7RUFDL0IsU0FBUztFQUNULDhCQUE4QjtFQUM5QixXQUFXO0VBQ1gsMkNBQTJDO0FBQzdDO0FBQ0E7O0VBRUUsNkJBQTZCO0FBQy9CIiwiZmlsZSI6Im5vZGVfbW9kdWxlcy9AY3JlYXRlLWZpZ21hLXBsdWdpbi91aS9saWIvY29tcG9uZW50cy90ZXh0Ym94L3RleHRib3gtbXVsdGlsaW5lL3RleHRib3gtbXVsdGlsaW5lLm1vZHVsZS5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGV4dGJveE11bHRpbGluZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogdmFyKC0tei1pbmRleC0xKTtcbn1cblxuLmdyb3cge1xuICBkaXNwbGF5OiBncmlkO1xufVxuXG4uZ2hvc3QsXG4uZ3JvdyAudGV4dGFyZWEge1xuICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDI7XG59XG5cbi5naG9zdCB7XG4gIHBhZGRpbmc6IDZweCAwIDZweCB2YXIoLS1zcGFjZS1leHRyYS1zbWFsbCk7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xufVxuXG4udGV4dGFyZWEge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDZweCB2YXIoLS1zcGFjZS1leHRyYS1zbWFsbCkgNnB4IHZhcigtLXNwYWNlLWV4dHJhLXNtYWxsKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tYm9yZGVyLXJhZGl1cy0yKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiB2YXIoLS1maWdtYS1jb2xvci10ZXh0KTtcbiAgcmVzaXplOiBub25lO1xufVxuLnRleHRhcmVhOjpwbGFjZWhvbGRlciB7XG4gIGNvbG9yOiB2YXIoLS1maWdtYS1jb2xvci10ZXh0LXRlcnRpYXJ5KTtcbn1cbi5kaXNhYmxlZCAudGV4dGFyZWEge1xuICBjb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItdGV4dC1kaXNhYmxlZCk7XG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XG59XG5cbi5ib3JkZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLWJvcmRlci1yYWRpdXMtMik7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLmhhc0JvcmRlciAuYm9yZGVyLFxuLnRleHRib3hNdWx0aWxpbmU6bm90KC5kaXNhYmxlZCk6aG92ZXIgLmJvcmRlciB7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItYm9yZGVyKTtcbn1cbi50ZXh0Ym94TXVsdGlsaW5lOm5vdCguZGlzYWJsZWQpIC50ZXh0YXJlYTpmb2N1cyB+IC5ib3JkZXIge1xuICB0b3A6IC0xcHg7XG4gIGJvdHRvbTogLTFweDtcbiAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tZmlnbWEtY29sb3ItYm9yZGVyLWJyYW5kLXN0cm9uZyk7XG59XG5cbi51bmRlcmxpbmUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiB2YXIoLS1zcGFjZS1leHRyYS1zbWFsbCk7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogdmFyKC0tc3BhY2UtZXh0cmEtc21hbGwpO1xuICBoZWlnaHQ6IDFweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZmlnbWEtY29sb3ItYm9yZGVyKTtcbn1cbi50ZXh0Ym94TXVsdGlsaW5lOm5vdCguZGlzYWJsZWQpIC50ZXh0YXJlYTpmb2N1cyB+IC51bmRlcmxpbmUsXG4udGV4dGJveE11bHRpbGluZTpub3QoLmRpc2FibGVkKTpob3ZlciAudW5kZXJsaW5lIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4iXX0= */`;
        document.head.append(element);
      }
      textbox_multiline_module_default = { "textboxMultiline": "_textboxMultiline_1rfqs_1", "grow": "_grow_1rfqs_6", "ghost": "_ghost_1rfqs_10", "textarea": "_textarea_1rfqs_11", "disabled": "_disabled_1rfqs_33", "border": "_border_1rfqs_38", "hasBorder": "_hasBorder_1rfqs_48", "underline": "_underline_1rfqs_58" };
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/components/textbox/textbox-multiline/textbox-multiline.js
  function TextboxMultiline(_a) {
    var _b = _a, { grow = false, disabled = false, name, onInput = function() {
    }, onValueInput = function() {
    }, placeholder, propagateEscapeKeyDown = true, revertOnEscapeKeyDown = false, rows = 3, spellCheck = false, validateOnBlur, variant, value } = _b, rest = __objRest(_b, ["grow", "disabled", "name", "onInput", "onValueInput", "placeholder", "propagateEscapeKeyDown", "revertOnEscapeKeyDown", "rows", "spellCheck", "validateOnBlur", "variant", "value"]);
    const textAreaElementRef = _(null);
    const revertOnEscapeKeyDownRef = _(false);
    const [originalValue, setOriginalValue] = h2(EMPTY_STRING);
    const setTextAreaElementValue = T2(function(value2) {
      const textAreaElement = getCurrentFromRef(textAreaElementRef);
      textAreaElement.value = value2;
      const inputEvent = document.createEvent("Event");
      inputEvent.initEvent("input", true, true);
      textAreaElement.dispatchEvent(inputEvent);
    }, []);
    const handleBlur = T2(function() {
      if (revertOnEscapeKeyDownRef.current === true) {
        revertOnEscapeKeyDownRef.current = false;
        return;
      }
      if (typeof validateOnBlur !== "undefined") {
        const result = validateOnBlur(value);
        if (typeof result === "string") {
          setTextAreaElementValue(result);
          setOriginalValue(EMPTY_STRING);
          return;
        }
        if (result === false) {
          if (value !== originalValue) {
            setTextAreaElementValue(originalValue);
          }
          setOriginalValue(EMPTY_STRING);
          return;
        }
      }
      setOriginalValue(EMPTY_STRING);
    }, [originalValue, setTextAreaElementValue, validateOnBlur, value]);
    const handleFocus = T2(function(event) {
      setOriginalValue(value);
      event.currentTarget.select();
    }, [value]);
    const handleInput = T2(function(event) {
      onValueInput(event.currentTarget.value, name);
      onInput(event);
    }, [name, onInput, onValueInput]);
    const handleKeyDown = T2(function(event) {
      if (event.key === "Escape") {
        if (propagateEscapeKeyDown === false) {
          event.stopPropagation();
        }
        if (revertOnEscapeKeyDown === true) {
          revertOnEscapeKeyDownRef.current = true;
          setTextAreaElementValue(originalValue);
          setOriginalValue(EMPTY_STRING);
        }
        event.currentTarget.blur();
        return;
      }
      if (value === MIXED_STRING && isKeyCodeCharacterGenerating(event.keyCode) === false) {
        event.preventDefault();
        event.currentTarget.select();
      }
    }, [
      originalValue,
      propagateEscapeKeyDown,
      revertOnEscapeKeyDown,
      setTextAreaElementValue,
      value
    ]);
    const handleMouseUp = T2(function(event) {
      if (value === MIXED_STRING) {
        event.preventDefault();
      }
    }, [value]);
    return y(
      "div",
      { class: createClassName([
        textbox_multiline_module_default.textboxMultiline,
        typeof variant === "undefined" ? null : variant === "border" ? textbox_multiline_module_default.hasBorder : null,
        grow === true ? textbox_multiline_module_default.grow : null,
        disabled === true ? textbox_multiline_module_default.disabled : null
      ]) },
      grow === true ? y("div", { class: textbox_multiline_module_default.ghost }, value === MIXED_STRING ? "Mixed" : `${value} `) : null,
      y("textarea", __spreadProps(__spreadValues({}, rest), { ref: textAreaElementRef, class: textbox_multiline_module_default.textarea, disabled: disabled === true, name, onBlur: handleBlur, onFocus: handleFocus, onInput: handleInput, onKeyDown: handleKeyDown, onMouseUp: handleMouseUp, placeholder, rows, spellcheck: spellCheck, tabIndex: disabled === true ? -1 : 0, value: value === MIXED_STRING ? "Mixed" : value })),
      y("div", { class: textbox_multiline_module_default.border }),
      variant === "underline" ? y("div", { class: textbox_multiline_module_default.underline }) : null
    );
  }
  var EMPTY_STRING;
  var init_textbox_multiline = __esm({
    "node_modules/@create-figma-plugin/ui/lib/components/textbox/textbox-multiline/textbox-multiline.js"() {
      init_lib();
      init_preact_module();
      init_hooks_module();
      init_create_class_name();
      init_get_current_from_ref();
      init_is_keycode_character_generating();
      init_textbox_multiline_module();
      EMPTY_STRING = "";
    }
  });

  // ../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/1169c91a-c96c-4f9b-b08c-7114538513d3/container.module.js
  var container_module_default;
  var init_container_module = __esm({
    "../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/1169c91a-c96c-4f9b-b08c-7114538513d3/container.module.js"() {
      if (document.getElementById("3c65817533") === null) {
        const element = document.createElement("style");
        element.id = "3c65817533";
        element.textContent = `._extraSmall_1oe77_1 {
  padding: 0 var(--space-extra-small);
}
._small_1oe77_4 {
  padding: 0 var(--space-small);
}
._medium_1oe77_7 {
  padding: 0 var(--space-medium);
}
._large_1oe77_10 {
  padding: 0 var(--space-large);
}
._extraLarge_1oe77_13 {
  padding: 0 var(--space-extra-large);
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AY3JlYXRlLWZpZ21hLXBsdWdpbi91aS9saWIvbGF5b3V0L2NvbnRhaW5lci9jb250YWluZXIubW9kdWxlLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1DQUFtQztBQUNyQztBQUNBO0VBQ0UsNkJBQTZCO0FBQy9CO0FBQ0E7RUFDRSw4QkFBOEI7QUFDaEM7QUFDQTtFQUNFLDZCQUE2QjtBQUMvQjtBQUNBO0VBQ0UsbUNBQW1DO0FBQ3JDIiwiZmlsZSI6Im5vZGVfbW9kdWxlcy9AY3JlYXRlLWZpZ21hLXBsdWdpbi91aS9saWIvbGF5b3V0L2NvbnRhaW5lci9jb250YWluZXIubW9kdWxlLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leHRyYVNtYWxsIHtcbiAgcGFkZGluZzogMCB2YXIoLS1zcGFjZS1leHRyYS1zbWFsbCk7XG59XG4uc21hbGwge1xuICBwYWRkaW5nOiAwIHZhcigtLXNwYWNlLXNtYWxsKTtcbn1cbi5tZWRpdW0ge1xuICBwYWRkaW5nOiAwIHZhcigtLXNwYWNlLW1lZGl1bSk7XG59XG4ubGFyZ2Uge1xuICBwYWRkaW5nOiAwIHZhcigtLXNwYWNlLWxhcmdlKTtcbn1cbi5leHRyYUxhcmdlIHtcbiAgcGFkZGluZzogMCB2YXIoLS1zcGFjZS1leHRyYS1sYXJnZSk7XG59XG4iXX0= */`;
        document.head.append(element);
      }
      container_module_default = { "extraSmall": "_extraSmall_1oe77_1", "small": "_small_1oe77_4", "medium": "_medium_1oe77_7", "large": "_large_1oe77_10", "extraLarge": "_extraLarge_1oe77_13" };
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/layout/container/container.js
  function Container(_a) {
    var _b = _a, { space } = _b, rest = __objRest(_b, ["space"]);
    return y("div", __spreadProps(__spreadValues({}, rest), { class: container_module_default[space] }));
  }
  var init_container = __esm({
    "node_modules/@create-figma-plugin/ui/lib/layout/container/container.js"() {
      init_preact_module();
      init_container_module();
    }
  });

  // ../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/e0ed0fa8-8a39-4116-8b5e-ddcee8d8ca0c/vertical-space.module.js
  var vertical_space_module_default;
  var init_vertical_space_module = __esm({
    "../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/e0ed0fa8-8a39-4116-8b5e-ddcee8d8ca0c/vertical-space.module.js"() {
      if (document.getElementById("c60cc9d24c") === null) {
        const element = document.createElement("style");
        element.id = "c60cc9d24c";
        element.textContent = `._extraSmall_zc4n0_1 {
  height: var(--space-extra-small);
}
._small_zc4n0_4 {
  height: var(--space-small);
}
._medium_zc4n0_7 {
  height: var(--space-medium);
}
._large_zc4n0_10 {
  height: var(--space-large);
}
._extraLarge_zc4n0_13 {
  height: var(--space-extra-large);
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9AY3JlYXRlLWZpZ21hLXBsdWdpbi91aS9saWIvbGF5b3V0L3ZlcnRpY2FsLXNwYWNlL3ZlcnRpY2FsLXNwYWNlLm1vZHVsZS5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQ0FBZ0M7QUFDbEM7QUFDQTtFQUNFLDBCQUEwQjtBQUM1QjtBQUNBO0VBQ0UsMkJBQTJCO0FBQzdCO0FBQ0E7RUFDRSwwQkFBMEI7QUFDNUI7QUFDQTtFQUNFLGdDQUFnQztBQUNsQyIsImZpbGUiOiJub2RlX21vZHVsZXMvQGNyZWF0ZS1maWdtYS1wbHVnaW4vdWkvbGliL2xheW91dC92ZXJ0aWNhbC1zcGFjZS92ZXJ0aWNhbC1zcGFjZS5tb2R1bGUuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4dHJhU21hbGwge1xuICBoZWlnaHQ6IHZhcigtLXNwYWNlLWV4dHJhLXNtYWxsKTtcbn1cbi5zbWFsbCB7XG4gIGhlaWdodDogdmFyKC0tc3BhY2Utc21hbGwpO1xufVxuLm1lZGl1bSB7XG4gIGhlaWdodDogdmFyKC0tc3BhY2UtbWVkaXVtKTtcbn1cbi5sYXJnZSB7XG4gIGhlaWdodDogdmFyKC0tc3BhY2UtbGFyZ2UpO1xufVxuLmV4dHJhTGFyZ2Uge1xuICBoZWlnaHQ6IHZhcigtLXNwYWNlLWV4dHJhLWxhcmdlKTtcbn1cbiJdfQ== */`;
        document.head.append(element);
      }
      vertical_space_module_default = { "extraSmall": "_extraSmall_zc4n0_1", "small": "_small_zc4n0_4", "medium": "_medium_zc4n0_7", "large": "_large_zc4n0_10", "extraLarge": "_extraLarge_zc4n0_13" };
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/layout/vertical-space/vertical-space.js
  function VerticalSpace(_a) {
    var _b = _a, { space } = _b, rest = __objRest(_b, ["space"]);
    return y("div", __spreadProps(__spreadValues({}, rest), { class: vertical_space_module_default[space] }));
  }
  var init_vertical_space = __esm({
    "node_modules/@create-figma-plugin/ui/lib/layout/vertical-space/vertical-space.js"() {
      init_preact_module();
      init_vertical_space_module();
    }
  });

  // ../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/211c033e-211a-4988-9735-14e1e54525e1/base.js
  var init_base = __esm({
    "../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/211c033e-211a-4988-9735-14e1e54525e1/base.js"() {
      if (document.getElementById("19ac0b29ab") === null) {
        const element = document.createElement("style");
        element.id = "19ac0b29ab";
        element.textContent = `@import url('https://fonts.googleapis.com/css?family=Inter:400,600&display=swap');

:root {
  /* border-radius */
  --border-radius-2: 2px;
  --border-radius-6: 6px;
  /* box-shadow */
  --box-shadow: var(--box-shadow-menu);
  --box-shadow-menu: 0 5px 17px rgba(0, 0, 0, 0.2),
    0 2px 7px rgba(0, 0, 0, 0.15), inset 0 0 0 0.5px #000000,
    0 0 0 0.5px rgba(0, 0, 0, 0.1);
  --box-shadow-modal: 0 2px 14px rgba(0, 0, 0, 0.15),
    0 0 0 0.5px rgba(0, 0, 0, 0.2);
  /* font */
  --font-family: 'Inter', 'Helvetica', sans-serif;
  --font-family-code: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
  --font-size-11: 11px;
  --font-size-12: 12px;
  --font-weight-regular: 400;
  --font-weight-bold: 600;
  --line-height-16: 16px;
  /* opacity */
  --opacity-30: 0.3;
  /* space */
  --space-extra-small: 8px;
  --space-small: 12px;
  --space-medium: 16px;
  --space-large: 20px;
  --space-extra-large: 24px;
  /* z-index */
  --z-index-1: 1;
  --z-index-2: 2;
}

.figma-dark {
  color-scheme: dark;
}

* {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: currentColor;
}

body {
  margin: 0;
  background-color: var(--figma-color-bg);
  color: var(--figma-color-text);
  font-family: var(--font-family);
  font-size: var(--font-size-11);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-16);
}

div,
span {
  cursor: default;
  user-select: none;
}

h1,
h2,
h3 {
  margin: 0;
  font-weight: inherit;
}

button {
  padding: 0;
  border: 0;
  -webkit-appearance: none;
  background-color: transparent;
  font: inherit;
  outline: 0;
}

hr {
  border: 0;
  margin: 0;
}

label {
  display: block;
}

input,
textarea {
  padding: 0;
  border: 0;
  margin: 0;
  -webkit-appearance: none;
  cursor: default;
  font: inherit;
  outline: 0;
}

svg {
  display: block;
}

::selection {
  background-color: var(--figma-color-bg-onselected);
}
`;
        document.head.prepend(element);
      }
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/utilities/render.js
  function render(Plugin2) {
    return function(rootNode2, props) {
      D(y(Plugin2, __spreadValues({}, props)), rootNode2);
    };
  }
  var init_render = __esm({
    "node_modules/@create-figma-plugin/ui/lib/utilities/render.js"() {
      init_base();
      init_preact_module();
    }
  });

  // node_modules/@create-figma-plugin/ui/lib/index.js
  var init_lib2 = __esm({
    "node_modules/@create-figma-plugin/ui/lib/index.js"() {
      init_button();
      init_textbox_multiline();
      init_container();
      init_vertical_space();
      init_render();
    }
  });

  // ../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/a5054b53-ffc8-4ff8-9b72-ae1243c9ec61/styles.js
  var styles_default;
  var init_styles = __esm({
    "../../../../../../../private/var/folders/k_/yxwt61810f14cv8w_cp9vnch0000gn/T/a5054b53-ffc8-4ff8-9b72-ae1243c9ec61/styles.js"() {
      if (document.getElementById("65bbf40b65") === null) {
        const element = document.createElement("style");
        element.id = "65bbf40b65";
        element.textContent = `._container_6p76y_1 {
  overflow: auto;
}
/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zdHlsZXMuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBYztBQUNoQiIsImZpbGUiOiJzcmMvc3R5bGVzLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXIge1xuICBvdmVyZmxvdzogYXV0bztcbn0iXX0= */`;
        document.head.append(element);
      }
      styles_default = { "container": "_container_6p76y_1" };
    }
  });

  // src/ui.tsx
  var ui_exports = {};
  __export(ui_exports, {
    default: () => ui_default
  });
  function Plugin() {
    const [css, setCSS] = h2(`Click on Generate CSS!`);
    const generateCSSButtonClick = T2(function() {
      emit("GENERATE_CSS");
    }, []);
    p2(() => {
      once("SUCCESS", (args) => {
        setCSS(JSON.stringify(args.value));
      });
    }, []);
    return /* @__PURE__ */ y(Container, { space: "large" }, /* @__PURE__ */ y(VerticalSpace, { space: "small" }), /* @__PURE__ */ y("div", { class: styles_default.container }, /* @__PURE__ */ y(
      TextboxMultiline,
      {
        grow: true,
        rows: 10,
        placeholder: "Click on Generate CSS!",
        value: css
      }
    )), /* @__PURE__ */ y(VerticalSpace, { space: "large" }), /* @__PURE__ */ y(Button, { fullWidth: true, onClick: generateCSSButtonClick }, "Generate CSS"), /* @__PURE__ */ y(VerticalSpace, { space: "small" }));
  }
  var ui_default;
  var init_ui = __esm({
    "src/ui.tsx"() {
      "use strict";
      init_prism();
      init_lib2();
      init_lib();
      init_preact_module();
      init_hooks_module();
      init_styles();
      ui_default = render(Plugin);
    }
  });

  // <stdin>
  var rootNode = document.getElementById("create-figma-plugin");
  var modules = { "src/main.ts--default": (init_ui(), __toCommonJS(ui_exports))["default"] };
  var commandId = __FIGMA_COMMAND__ === "" ? "src/main.ts--default" : __FIGMA_COMMAND__;
  if (typeof modules[commandId] === "undefined") {
    throw new Error(
      "No UI defined for command `" + commandId + "`"
    );
  }
  modules[commandId](rootNode, __SHOW_UI_DATA__);
})();
