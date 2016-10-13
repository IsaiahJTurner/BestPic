! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(a) : "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = a() : "undefined" != typeof Package ? Sortable = a() : window.Sortable = a()
}(function() {
    "use strict";

    function a(a, b) {
        if (!a || !a.nodeType || 1 !== a.nodeType) throw "Sortable: `el` must be HTMLElement, and not " + {}.toString.call(a);
        this.el = a, this.options = b = t({}, b), a[Q] = this;
        var c = {
            group: Math.random(),
            sort: !0,
            disabled: !1,
            store: null,
            handle: null,
            scroll: !0,
            scrollSensitivity: 30,
            scrollSpeed: 10,
            draggable: /[uo]l/i.test(a.nodeName) ? "li" : ">*",
            ghostClass: "sortable-ghost",
            chosenClass: "sortable-chosen",
            dragClass: "sortable-drag",
            ignore: "a, img",
            filter: null,
            animation: 0,
            setData: function(a, b) {
                a.setData("Text", b.textContent)
            },
            dropBubble: !1,
            dragoverBubble: !1,
            dataIdAttr: "data-id",
            delay: 0,
            forceFallback: !1,
            fallbackClass: "sortable-fallback",
            fallbackOnBody: !1,
            fallbackTolerance: 0,
            fallbackOffset: {
                x: 0,
                y: 0
            }
        };
        for (var d in c) !(d in b) && (b[d] = c[d]);
        ba(b);
        for (var e in this) "_" === e.charAt(0) && "function" == typeof this[e] && (this[e] = this[e].bind(this));
        this.nativeDraggable = !b.forceFallback && W, f(a, "mousedown", this._onTapStart), f(a, "touchstart", this._onTapStart), this.nativeDraggable && (f(a, "dragover", this), f(a, "dragenter", this)), _.push(this._onDragOver), b.store && this.sort(b.store.get(this))
    }

    function b(a) {
        y && y.state !== a && (i(y, "display", a ? "none" : ""), !a && y.state && z.insertBefore(y, v), y.state = a)
    }

    function c(a, b, c) {
        if (a) {
            c = c || S;
            do
                if (">*" === b && a.parentNode === c || r(a, b)) return a;
            while (a = d(a))
        }
        return null
    }

    function d(a) {
        var b = a.host;
        return b && b.nodeType ? b : a.parentNode
    }

    function e(a) {
        a.dataTransfer && (a.dataTransfer.dropEffect = "move"), a.preventDefault()
    }

    function f(a, b, c) {
        a.addEventListener(b, c, !1)
    }

    function g(a, b, c) {
        a.removeEventListener(b, c, !1)
    }

    function h(a, b, c) {
        if (a)
            if (a.classList) a.classList[c ? "add" : "remove"](b);
            else {
                var d = (" " + a.className + " ").replace(P, " ").replace(" " + b + " ", " ");
                a.className = (d + (c ? " " + b : "")).replace(P, " ")
            }
    }

    function i(a, b, c) {
        var d = a && a.style;
        if (d) {
            if (void 0 === c) return S.defaultView && S.defaultView.getComputedStyle ? c = S.defaultView.getComputedStyle(a, "") : a.currentStyle && (c = a.currentStyle), void 0 === b ? c : c[b];
            b in d || (b = "-webkit-" + b), d[b] = c + ("string" == typeof c ? "" : "px")
        }
    }

    function j(a, b, c) {
        if (a) {
            var d = a.getElementsByTagName(b),
                e = 0,
                f = d.length;
            if (c)
                for (; e < f; e++) c(d[e], e);
            return d
        }
        return []
    }

    function k(a, b, c, d, e, f, g) {
        a = a || b[Q];
        var h = S.createEvent("Event"),
            i = a.options,
            j = "on" + c.charAt(0).toUpperCase() + c.substr(1);
        h.initEvent(c, !0, !0), h.to = b, h.from = e || b, h.item = d || b, h.clone = y, h.oldIndex = f, h.newIndex = g, b.dispatchEvent(h), i[j] && i[j].call(a, h)
    }

    function l(a, b, c, d, e, f, g) {
        var h, i, j = a[Q],
            k = j.options.onMove;
        return h = S.createEvent("Event"), h.initEvent("move", !0, !0), h.to = b, h.from = a, h.dragged = c, h.draggedRect = d, h.related = e || b, h.relatedRect = f || b.getBoundingClientRect(), a.dispatchEvent(h), k && (i = k.call(j, h, g)), i
    }

    function m(a) {
        a.draggable = !1
    }

    function n() {
        Y = !1
    }

    function o(a, b) {
        var c = a.lastElementChild,
            d = c.getBoundingClientRect();
        return (b.clientY - (d.top + d.height) > 5 || b.clientX - (d.right + d.width) > 5) && c
    }

    function p(a) {
        for (var b = a.tagName + a.className + a.src + a.href + a.textContent, c = b.length, d = 0; c--;) d += b.charCodeAt(c);
        return d.toString(36)
    }

    function q(a, b) {
        var c = 0;
        if (!a || !a.parentNode) return -1;
        for (; a && (a = a.previousElementSibling);) "TEMPLATE" === a.nodeName.toUpperCase() || ">*" !== b && !r(a, b) || c++;
        return c
    }

    function r(a, b) {
        if (a) {
            b = b.split(".");
            var c = b.shift().toUpperCase(),
                d = new RegExp("\\s(" + b.join("|") + ")(?=\\s)", "g");
            return !("" !== c && a.nodeName.toUpperCase() != c || b.length && ((" " + a.className + " ").match(d) || []).length != b.length)
        }
        return !1
    }

    function s(a, b) {
        var c, d;
        return function() {
            void 0 === c && (c = arguments, d = this, setTimeout(function() {
                1 === c.length ? a.call(d, c[0]) : a.apply(d, c), c = void 0
            }, b))
        }
    }

    function t(a, b) {
        if (a && b)
            for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    }

    function u(a) {
        return U ? U(a).clone(!0)[0] : V && V.dom ? V.dom(a).cloneNode(!0) : a.cloneNode(!0)
    }
    if ("undefined" == typeof window || !window.document) return function() {
        throw new Error("Sortable.js requires a window with a document")
    };
    var v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = {},
        P = /\s+/g,
        Q = "Sortable" + (new Date).getTime(),
        R = window,
        S = R.document,
        T = R.parseInt,
        U = R.jQuery || R.Zepto,
        V = R.Polymer,
        W = !!("draggable" in S.createElement("div")),
        X = function(a) {
            return !navigator.userAgent.match(/Trident.*rv[ :]?11\./) && (a = S.createElement("x"), a.style.cssText = "pointer-events:auto", "auto" === a.style.pointerEvents)
        }(),
        Y = !1,
        Z = Math.abs,
        $ = Math.min,
        _ = ([].slice, []),
        aa = s(function(a, b, c) {
            if (c && b.scroll) {
                var d, e, f, g, h, i, j = b.scrollSensitivity,
                    k = b.scrollSpeed,
                    l = a.clientX,
                    m = a.clientY,
                    n = window.innerWidth,
                    o = window.innerHeight;
                if (C !== c && (B = b.scroll, C = c, D = b.scrollFn, B === !0)) {
                    B = c;
                    do
                        if (B.offsetWidth < B.scrollWidth || B.offsetHeight < B.scrollHeight) break;
                    while (B = B.parentNode)
                }
                B && (d = B, e = B.getBoundingClientRect(), f = (Z(e.right - l) <= j) - (Z(e.left - l) <= j), g = (Z(e.bottom - m) <= j) - (Z(e.top - m) <= j)), f || g || (f = (n - l <= j) - (l <= j), g = (o - m <= j) - (m <= j), (f || g) && (d = R)), O.vx === f && O.vy === g && O.el === d || (O.el = d, O.vx = f, O.vy = g, clearInterval(O.pid), d && (O.pid = setInterval(function() {
                    return i = g ? g * k : 0, h = f ? f * k : 0, "function" == typeof D ? D.call(_this, h, i, a) : void(d === R ? R.scrollTo(R.pageXOffset + h, R.pageYOffset + i) : (d.scrollTop += i, d.scrollLeft += h))
                }, 24)))
            }
        }, 30),
        ba = function(a) {
            function b(a, b) {
                return void 0 !== a && a !== !0 || (a = c.name), "function" == typeof a ? a : function(c, d) {
                    var e = d.options.group.name;
                    return b ? a : a && (a.join ? a.indexOf(e) > -1 : e == a)
                }
            }
            var c = {},
                d = a.group;
            d && "object" == typeof d || (d = {
                name: d
            }), c.name = d.name, c.checkPull = b(d.pull, !0), c.checkPut = b(d.put), a.group = c
        };
    return a.prototype = {
        constructor: a,
        _onTapStart: function(a) {
            var b, d = this,
                e = this.el,
                f = this.options,
                g = a.type,
                h = a.touches && a.touches[0],
                i = (h || a).target,
                j = a.target.shadowRoot && a.path[0] || i,
                l = f.filter;
            if (!v && !("mousedown" === g && 0 !== a.button || f.disabled) && (!f.handle || c(j, f.handle, e)) && (i = c(i, f.draggable, e))) {
                if (b = q(i, f.draggable), "function" == typeof l) {
                    if (l.call(this, a, i, this)) return k(d, j, "filter", i, e, b), void a.preventDefault()
                } else if (l && (l = l.split(",").some(function(a) {
                        if (a = c(j, a.trim(), e)) return k(d, a, "filter", i, e, b), !0
                    }))) return void a.preventDefault();
                this._prepareDragStart(a, h, i, b)
            }
        },
        _prepareDragStart: function(a, b, c, d) {
            var e, g = this,
                i = g.el,
                l = g.options,
                n = i.ownerDocument;
            c && !v && c.parentNode === i && (L = a, z = i, v = c, w = v.parentNode, A = v.nextSibling, J = l.group, H = d, this._lastX = (b || a).clientX, this._lastY = (b || a).clientY, v.style["will-change"] = "transform", e = function() {
                g._disableDelayedDrag(), v.draggable = g.nativeDraggable, h(v, l.chosenClass, !0), g._triggerDragStart(b), k(g, z, "choose", v, z, H)
            }, l.ignore.split(",").forEach(function(a) {
                j(v, a.trim(), m)
            }), f(n, "mouseup", g._onDrop), f(n, "touchend", g._onDrop), f(n, "touchcancel", g._onDrop), l.delay ? (f(n, "mouseup", g._disableDelayedDrag), f(n, "touchend", g._disableDelayedDrag), f(n, "touchcancel", g._disableDelayedDrag), f(n, "mousemove", g._disableDelayedDrag), f(n, "touchmove", g._disableDelayedDrag), g._dragStartTimer = setTimeout(e, l.delay)) : e())
        },
        _disableDelayedDrag: function() {
            var a = this.el.ownerDocument;
            clearTimeout(this._dragStartTimer), g(a, "mouseup", this._disableDelayedDrag), g(a, "touchend", this._disableDelayedDrag), g(a, "touchcancel", this._disableDelayedDrag), g(a, "mousemove", this._disableDelayedDrag), g(a, "touchmove", this._disableDelayedDrag)
        },
        _triggerDragStart: function(a) {
            a ? (L = {
                target: v,
                clientX: a.clientX,
                clientY: a.clientY
            }, this._onDragStart(L, "touch")) : this.nativeDraggable ? (f(v, "dragend", this), f(z, "dragstart", this._onDragStart)) : this._onDragStart(L, !0);
            try {
                S.selection ? setTimeout(function() {
                    S.selection.empty()
                }) : window.getSelection().removeAllRanges()
            } catch (a) {}
        },
        _dragStarted: function() {
            if (z && v) {
                var b = this.options;
                h(v, b.ghostClass, !0), h(v, b.dragClass, !1), a.active = this, k(this, z, "start", v, z, H)
            }
        },
        _emulateDragOver: function() {
            if (M) {
                if (this._lastX === M.clientX && this._lastY === M.clientY) return;
                this._lastX = M.clientX, this._lastY = M.clientY, X || i(x, "display", "none");
                var a = S.elementFromPoint(M.clientX, M.clientY),
                    b = a,
                    c = _.length;
                if (b)
                    do {
                        if (b[Q]) {
                            for (; c--;) _[c]({
                                clientX: M.clientX,
                                clientY: M.clientY,
                                target: a,
                                rootEl: b
                            });
                            break
                        }
                        a = b
                    } while (b = b.parentNode);
                X || i(x, "display", "")
            }
        },
        _onTouchMove: function(b) {
            if (L) {
                var c = this.options,
                    d = c.fallbackTolerance,
                    e = c.fallbackOffset,
                    f = b.touches ? b.touches[0] : b,
                    g = f.clientX - L.clientX + e.x,
                    h = f.clientY - L.clientY + e.y,
                    j = b.touches ? "translate3d(" + g + "px," + h + "px,0)" : "translate(" + g + "px," + h + "px)";
                if (!a.active) {
                    if (d && $(Z(f.clientX - this._lastX), Z(f.clientY - this._lastY)) < d) return;
                    this._dragStarted()
                }
                this._appendGhost(), N = !0, M = f, i(x, "webkitTransform", j), i(x, "mozTransform", j), i(x, "msTransform", j), i(x, "transform", j), b.preventDefault()
            }
        },
        _appendGhost: function() {
            if (!x) {
                var a, b = v.getBoundingClientRect(),
                    c = i(v),
                    d = this.options;
                x = v.cloneNode(!0), h(x, d.ghostClass, !1), h(x, d.fallbackClass, !0), h(x, d.dragClass, !0), i(x, "top", b.top - T(c.marginTop, 10)), i(x, "left", b.left - T(c.marginLeft, 10)), i(x, "width", b.width), i(x, "height", b.height), i(x, "opacity", "0.8"), i(x, "position", "fixed"), i(x, "zIndex", "100000"), i(x, "pointerEvents", "none"), d.fallbackOnBody && S.body.appendChild(x) || z.appendChild(x), a = x.getBoundingClientRect(), i(x, "width", 2 * b.width - a.width), i(x, "height", 2 * b.height - a.height)
            }
        },
        _onDragStart: function(a, b) {
            var c = a.dataTransfer,
                d = this.options;
            this._offUpEvents(), "clone" == J.checkPull(this, this, v, a) && (y = u(v), i(y, "display", "none"), z.insertBefore(y, v), k(this, z, "clone", v)), h(v, d.dragClass, !0), b ? ("touch" === b ? (f(S, "touchmove", this._onTouchMove), f(S, "touchend", this._onDrop), f(S, "touchcancel", this._onDrop)) : (f(S, "mousemove", this._onTouchMove), f(S, "mouseup", this._onDrop)), this._loopId = setInterval(this._emulateDragOver, 50)) : (c && (c.effectAllowed = "move", d.setData && d.setData.call(this, c, v)), f(S, "drop", this), setTimeout(this._dragStarted, 0))
        },
        _onDragOver: function(d) {
            var e, f, g, h, j = this.el,
                k = this.options,
                m = k.group,
                p = a.active,
                q = J === m,
                r = k.sort;
            if (void 0 !== d.preventDefault && (d.preventDefault(), !k.dragoverBubble && d.stopPropagation()), N = !0, J && !k.disabled && (q ? r || (h = !z.contains(v)) : K === this || J.checkPull(this, p, v, d) && m.checkPut(this, p, v, d)) && (void 0 === d.rootEl || d.rootEl === this.el)) {
                if (aa(d, k, this.el), Y) return;
                if (e = c(d.target, k.draggable, j), f = v.getBoundingClientRect(), K = this, h) return b(!0), w = z, void(y || A ? z.insertBefore(v, y || A) : r || z.appendChild(v));
                if (0 === j.children.length || j.children[0] === x || j === d.target && (e = o(j, d))) {
                    if (e) {
                        if (e.animated) return;
                        g = e.getBoundingClientRect()
                    }
                    b(q), l(z, j, v, f, e, g, d) !== !1 && (v.contains(j) || (j.appendChild(v), w = j), this._animate(f, v), e && this._animate(g, e))
                } else if (e && !e.animated && e !== v && void 0 !== e.parentNode[Q]) {
                    E !== e && (E = e, F = i(e), G = i(e.parentNode)), g = e.getBoundingClientRect();
                    var s, t = g.right - g.left,
                        u = g.bottom - g.top,
                        B = /left|right|inline/.test(F.cssFloat + F.display) || "flex" == G.display && 0 === G["flex-direction"].indexOf("row"),
                        C = e.offsetWidth > v.offsetWidth,
                        D = e.offsetHeight > v.offsetHeight,
                        H = (B ? (d.clientX - g.left) / t : (d.clientY - g.top) / u) > .5,
                        I = e.nextElementSibling,
                        L = l(z, j, v, f, e, g, d);
                    if (L !== !1) {
                        if (Y = !0, setTimeout(n, 30), b(q), 1 === L || L === -1) s = 1 === L;
                        else if (B) {
                            var M = v.offsetTop,
                                O = e.offsetTop;
                            s = M === O ? e.previousElementSibling === v && !C || H && C : e.previousElementSibling === v || v.previousElementSibling === e ? (d.clientY - g.top) / u > .5 : O > M
                        } else s = I !== v && !D || H && D;
                        v.contains(j) || (s && !I ? j.appendChild(v) : e.parentNode.insertBefore(v, s ? I : e)), w = v.parentNode, this._animate(f, v), this._animate(g, e)
                    }
                }
            }
        },
        _animate: function(a, b) {
            var c = this.options.animation;
            if (c) {
                var d = b.getBoundingClientRect();
                i(b, "transition", "none"), i(b, "transform", "translate3d(" + (a.left - d.left) + "px," + (a.top - d.top) + "px,0)"), b.offsetWidth, i(b, "transition", "all " + c + "ms"), i(b, "transform", "translate3d(0,0,0)"), clearTimeout(b.animated), b.animated = setTimeout(function() {
                    i(b, "transition", ""), i(b, "transform", ""), b.animated = !1
                }, c)
            }
        },
        _offUpEvents: function() {
            var a = this.el.ownerDocument;
            g(S, "touchmove", this._onTouchMove), g(a, "mouseup", this._onDrop), g(a, "touchend", this._onDrop), g(a, "touchcancel", this._onDrop)
        },
        _onDrop: function(b) {
            var c = this.el,
                d = this.options;
            clearInterval(this._loopId), clearInterval(O.pid), clearTimeout(this._dragStartTimer), g(S, "mousemove", this._onTouchMove), this.nativeDraggable && (g(S, "drop", this), g(c, "dragstart", this._onDragStart)), this._offUpEvents(), b && (N && (b.preventDefault(), !d.dropBubble && b.stopPropagation()), x && x.parentNode.removeChild(x), v && (this.nativeDraggable && g(v, "dragend", this), m(v), v.style["will-change"] = "", h(v, this.options.ghostClass, !1), h(v, this.options.chosenClass, !1), z !== w ? (I = q(v, d.draggable), I >= 0 && (k(null, w, "add", v, z, H, I), k(this, z, "remove", v, z, H, I), k(null, w, "sort", v, z, H, I), k(this, z, "sort", v, z, H, I))) : (y && y.parentNode.removeChild(y), v.nextSibling !== A && (I = q(v, d.draggable), I >= 0 && (k(this, z, "update", v, z, H, I), k(this, z, "sort", v, z, H, I)))), a.active && (null != I && I !== -1 || (I = H), k(this, z, "end", v, z, H, I), this.save()))), this._nulling()
        },
        _nulling: function() {
            z = v = w = x = A = y = B = C = L = M = N = I = E = F = K = J = a.active = null
        },
        handleEvent: function(a) {
            var b = a.type;
            "dragover" === b || "dragenter" === b ? v && (this._onDragOver(a), e(a)) : "drop" !== b && "dragend" !== b || this._onDrop(a)
        },
        toArray: function() {
            for (var a, b = [], d = this.el.children, e = 0, f = d.length, g = this.options; e < f; e++) a = d[e], c(a, g.draggable, this.el) && b.push(a.getAttribute(g.dataIdAttr) || p(a));
            return b
        },
        sort: function(a) {
            var b = {},
                d = this.el;
            this.toArray().forEach(function(a, e) {
                var f = d.children[e];
                c(f, this.options.draggable, d) && (b[a] = f)
            }, this), a.forEach(function(a) {
                b[a] && (d.removeChild(b[a]), d.appendChild(b[a]))
            })
        },
        save: function() {
            var a = this.options.store;
            a && a.set(this)
        },
        closest: function(a, b) {
            return c(a, b || this.options.draggable, this.el)
        },
        option: function(a, b) {
            var c = this.options;
            return void 0 === b ? c[a] : (c[a] = b, void("group" === a && ba(c)))
        },
        destroy: function() {
            var a = this.el;
            a[Q] = null, g(a, "mousedown", this._onTapStart), g(a, "touchstart", this._onTapStart), this.nativeDraggable && (g(a, "dragover", this), g(a, "dragenter", this)), Array.prototype.forEach.call(a.querySelectorAll("[draggable]"), function(a) {
                a.removeAttribute("draggable")
            }), _.splice(_.indexOf(this._onDragOver), 1), this._onDrop(), this.el = a = null
        }
    }, a.utils = {
        on: f,
        off: g,
        css: i,
        find: j,
        is: function(a, b) {
            return !!c(a, b, a)
        },
        extend: t,
        throttle: s,
        closest: c,
        toggleClass: h,
        clone: u,
        index: q
    }, a.create = function(b, c) {
        return new a(b, c)
    }, a.version = "1.4.2", a
});
