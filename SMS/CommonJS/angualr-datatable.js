﻿/*!
 * angular-datatables - v0.6.5-dev
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
"undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "datatables"),
    function (a, b, c, d) {
        "use strict";

        function e(a, b, c, e, f, g) {
            function h(a) {
                var b = a[0].innerHTML;
                return function (a, c, e, g) {
                    function h(a, d) {
                        a !== d && g.render(c, g.buildOptionsPromise(), b)
                    }
                    var i = e.dtDisableDeepWatchers ? "$watchCollection" : "$watch";
                    d.forEach(["dtColumns", "dtColumnDefs", "dtOptions"], function (b) {
                        a[i].call(a, b, h, !0)
                    }), f.showLoading(c, a), g.render(c, g.buildOptionsPromise(), b)
                }
            }

            function i(h) {
                function i() {
                    var e = a.defer();
                    return a.all([a.when(h.dtOptions), a.when(h.dtColumns), a.when(h.dtColumnDefs)]).then(function (e) {
                        var f = e[0],
                            h = e[1],
                            i = e[2];
                        g.deleteProperty(f, "$promise"), g.deleteProperty(h, "$promise"), g.deleteProperty(i, "$promise");
                        var j;
                        if (d.isDefined(f) && (j = {}, d.extend(j, f), d.isArray(h) && (j.aoColumns = h), d.isArray(i) && (j.aoColumnDefs = i), j.language && j.language.url)) {
                            var k = a.defer(),
                                l = j.language.url;
                            b.get(j.language.url).then(function (a) {
                                k.resolve(a.data)
                            }, function () {
                                c.error("Could not fetch the content of the language from " + l)
                            }), j.language = k.promise
                        }
                        return g.resolveObjectPromises(j, ["data", "aaData", "fnPromise"])
                    }).then(function (a) {
                        e.resolve(a)
                    }), e.promise
                }

                function j(a, b, c) {
                    b.then(function (b) {
                        f.preRender(b);
                        var d = h.datatable && "ng" === h.datatable;
                        l && l._renderer ? l._renderer.withOptions(b).render(a, h, c).then(function (a) {
                            l = a, k(a)
                        }) : e.fromOptions(b, d).render(a, h, c).then(function (a) {
                            l = a, k(a)
                        })
                    })
                }

                function k(a) {
                    d.isFunction(h.dtInstance) ? h.dtInstance(a) : d.isDefined(h.dtInstance) && (h.dtInstance = a)
                }
                var l, m = this;
                m.buildOptionsPromise = i, m.render = j
            }
            return h.$inject = ["tElm"], i.$inject = ["$scope"], {
                restrict: "A",
                scope: {
                    dtOptions: "=",
                    dtColumns: "=",
                    dtColumnDefs: "=",
                    datatable: "@",
                    dtInstance: "="
                },
                compile: h,
                controller: i
            }
        }

        function f() {
            var a = {
                withOption: function (a, b) {
                    return d.isString(a) && (this[a] = b), this
                },
                withSource: function (a) {
                    return this.ajax = a, this
                },
                withDataProp: function (a) {
                    return this.sAjaxDataProp = a, this
                },
                withFnServerData: function (a) {
                    if (!d.isFunction(a)) throw new Error("The parameter must be a function");
                    return this.fnServerData = a, this
                },
                withPaginationType: function (a) {
                    if (!d.isString(a)) throw new Error("The pagination type must be provided");
                    return this.sPaginationType = a, this
                },
                withLanguage: function (a) {
                    return this.language = a, this
                },
                withLanguageSource: function (a) {
                    return this.withLanguage({
                        url: a
                    })
                },
                withDisplayLength: function (a) {
                    return this.iDisplayLength = a, this
                },
                withFnPromise: function (a) {
                    return this.fnPromise = a, this
                },
                withDOM: function (a) {
                    return this.dom = a, this
                }
            };
            return {
                newOptions: function () {
                    return Object.create(a)
                },
                fromSource: function (b) {
                    var c = Object.create(a);
                    return c.ajax = b, c
                },
                fromFnPromise: function (b) {
                    var c = Object.create(a);
                    return c.fnPromise = b, c
                }
            }
        }

        function g() {
            var a = {
                withOption: function (a, b) {
                    return d.isString(a) && (this[a] = b), this
                },
                withTitle: function (a) {
                    return this.sTitle = a, this
                },
                withClass: function (a) {
                    return this.sClass = a, this
                },
                notVisible: function () {
                    return this.bVisible = !1, this
                },
                notSortable: function () {
                    return this.bSortable = !1, this
                },
                renderWith: function (a) {
                    return this.mRender = a, this
                }
            };
            return {
                newColumn: function (b, c) {
                    if (d.isUndefined(b)) throw new Error('The parameter "mData" is not defined!');
                    var e = Object.create(a);
                    return e.mData = b, d.isDefined(c) && (e.sTitle = c), e
                },
                DTColumn: a
            }
        }

        function h(a) {
            return {
                newColumnDef: function (b) {
                    if (d.isUndefined(b)) throw new Error('The parameter "targets" must be defined! See https://datatables.net/reference/option/columnDefs.targets');
                    var c = Object.create(a.DTColumn);
                    return d.isArray(b) ? c.aTargets = b : c.aTargets = [b], c
                }
            }
        }

        function i(a, b, c) {
            return {
                compileHtml: function (e) {
                    return a(d.element('<div class="' + c + '">' + b.loadingTemplate + "</div>"))(e)
                },
                isLoading: function (a) {
                    return a.hasClass(c)
                }
            }
        }

        function j() {
            function a(a) {
                var b = Object.create(f);
                return b._renderer = a, b
            }

            function b(a, b) {
                b.id = a.id, b.DataTable = a.DataTable, b.dataTable = a.dataTable
            }

            function c(a, b) {
                this._renderer.reloadData(a, b)
            }

            function d(a) {
                this._renderer.changeData(a)
            }

            function e() {
                this._renderer.rerender()
            }
            var f = {
                reloadData: c,
                changeData: d,
                rerender: e
            };
            return {
                newDTInstance: a,
                copyDTProperties: b
            }
        }

        function k() {
            c.fn.DataTable.Api && c.fn.DataTable.Api.register("ngDestroy()", function (b) {
                return b = b || !1, this.iterator("table", function (d) {
                    var e, f = d.nTableWrapper.parentNode,
                        g = d.oClasses,
                        h = d.nTable,
                        i = d.nTBody,
                        j = d.nTHead,
                        k = d.nTFoot,
                        l = c(h),
                        m = c(i),
                        n = c(d.nTableWrapper),
                        o = c.map(d.aoData, function (a) {
                            return a.nTr
                        });
                    d.bDestroying = !0, c.fn.DataTable.ext.internal._fnCallbackFire(d, "aoDestroyCallback", "destroy", [d]), b || new c.fn.DataTable.Api(d).columns().visible(!0), n.unbind(".DT").find(":not(tbody *)").unbind(".DT"), c(a).unbind(".DT-" + d.sInstance), h !== j.parentNode && (l.children("thead").detach(), l.append(j)), k && h !== k.parentNode && (l.children("tfoot").detach(), l.append(k)), l.detach(), n.detach(), d.aaSorting = [], d.aaSortingFixed = [], c.fn.DataTable.ext.internal._fnSortingClasses(d), c(o).removeClass(d.asStripeClasses.join(" ")), c("th, td", j).removeClass(g.sSortable + " " + g.sSortableAsc + " " + g.sSortableDesc + " " + g.sSortableNone), d.bJUI && (c("th span." + g.sSortIcon + ", td span." + g.sSortIcon, j).detach(), c("th, td", j).each(function () {
                        var a = c("div." + g.sSortJUIWrapper, this);
                        c(this).append(a.contents()), a.detach()
                    })), !b && f && (f.contains(d.nTableReinsertBefore) ? f.insertBefore(h, d.nTableReinsertBefore) : f.appendChild(h)), l.css("width", d.sDestroyWidth).removeClass(g.sTable), (e = d.asDestroyStripes.length) && m.children().each(function (a) {
                        c(this).addClass(d.asDestroyStripes[a % e])
                    });
                    var p = c.inArray(d, c.fn.DataTable.settings); -1 !== p && c.fn.DataTable.settings.splice(p, 1)
                })
            })
        }

        function l() {
            function a(a) {
                return j.loadingTemplate = a, j
            }

            function b(a) {
                return c.ajax({
                    dataType: "json",
                    url: a,
                    success: function (a) {
                        c.extend(!0, c.fn.DataTable.defaults, {
                            language: a
                        })
                    }
                }), j
            }

            function e(a) {
                return c.extend(!0, c.fn.DataTable.defaults, {
                    language: a
                }), j
            }

            function f(a) {
                return c.extend(c.fn.DataTable.defaults, {
                    displayLength: a
                }), j
            }

            function g(a) {
                return j.bootstrapOptions = a, j
            }

            function h(a) {
                return c.extend(c.fn.DataTable.defaults, {
                    dom: a
                }), j
            }

            function i(a, b) {
                if (d.isString(a)) {
                    var e = {};
                    e[a] = b, c.extend(c.fn.DataTable.defaults, e)
                }
            }
            var j = {
                loadingTemplate: "<h3>Loading...</h3>",
                bootstrapOptions: {},
                setLoadingTemplate: a,
                setLanguageSource: b,
                setLanguage: e,
                setDisplayLength: f,
                setBootstrapOptions: g,
                setDOM: h,
                setOption: i
            };
            return j
        }

        function m(a) {
            function b(b, c) {
                var e = d.element(a.compileHtml(c));
                b.after(e), b.hide(), e.show()
            }

            function e(b) {
                b.show();
                var c = b.next();
                a.isLoading(c) && c.remove()
            }

            function f(a, b) {
                var e = "#" + a.attr("id");
                c.fn.dataTable.isDataTable(e) && d.isObject(b) && (b.destroy = !0);
                var f = a.DataTable(b),
                    g = a.dataTable(),
                    h = {
                        id: a.attr("id"),
                        DataTable: f,
                        dataTable: g
                    };
                return i(b, h), h
            }

            function g(a, b) {
                return l.hideLoading(a), l.renderDataTable(a, b)
            }

            function h(a) {
                k.push(a)
            }

            function i(a, b) {
                d.forEach(k, function (c) {
                    d.isFunction(c.postRender) && c.postRender(a, b)
                })
            }

            function j(a) {
                d.forEach(k, function (b) {
                    d.isFunction(b.preRender) && b.preRender(a)
                })
            }
            var k = [],
                l = {
                    showLoading: b,
                    hideLoading: e,
                    renderDataTable: f,
                    hideLoadingAndRenderDataTable: g,
                    registerPlugin: h,
                    postRender: i,
                    preRender: j
                };
            return l
        }

        function n() {
            return {
                withOptions: function (a) {
                    return this.options = a, this
                }
            }
        }

        function o(a, b, c, d) {
            function e(e) {
                function f(b, e) {
                    k = b, l = e;
                    var f = d.newDTInstance(m),
                        g = c.hideLoadingAndRenderDataTable(b, m.options);
                    return j = g.DataTable, d.copyDTProperties(g, f), a.when(f)
                }

                function g() { }

                function h() { }

                function i() {
                    j.destroy(), c.showLoading(k, l), f(k, l)
                }
                var j, k, l, m = Object.create(b);
                return m.name = "DTDefaultRenderer", m.options = e, m.render = f, m.reloadData = g, m.changeData = h, m.rerender = i, m
            }
            return {
                create: e
            }
        }

        function p(a, b, c, d, e, f, g) {
            function h(h) {
                function i(a, c, e) {
                    n = e, p = a, q = c.$parent, s = g.newDTInstance(t);
                    var h = b.defer(),
                        i = n.match(/<tbody([\s\S]*)<\/tbody>/i),
                        j = i[1],
                        k = j.match(/^\s*.+?\s+in\s+([a-zA-Z0-9\.-_$]*)\s*/m);
                    if (!k) throw new Error('Expected expression in form of "_item_ in _collection_[ track by _id_]" but got "{0}".', j);
                    var l = k[1];
                    return q.$watchCollection(l, function () {
                        o && (f.showLoading(p, q), m()), d(function () {
                            if (!o) {
                                f.preRender(t.options);
                                var a = f.hideLoadingAndRenderDataTable(p, t.options);
                                o = a.DataTable, g.copyDTProperties(a, s), h.resolve(s)
                            }
                        }, 0, !1)
                    }, !0), h.promise
                }

                function j() {
                    a.warn("The Angular Renderer does not support reloading data. You need to do it directly on your model")
                }

                function k() {
                    a.warn("The Angular Renderer does not support changing the data. You need to change your model directly.")
                }

                function l() {
                    m(), f.showLoading(p, q), f.preRender(h), d(function () {
                        var a = f.hideLoadingAndRenderDataTable(p, t.options);
                        o = a.DataTable, g.copyDTProperties(a, s)
                    }, 0, !1)
                }

                function m() {
                    r && r.$destroy(), o.ngDestroy(), o = null, p.html(n), r = q.$new(), c(p.contents())(r)
                }
                var n, o, p, q, r, s, t = Object.create(e);
                return t.name = "DTNGRenderer", t.options = h, t.render = i, t.reloadData = j, t.changeData = k, t.rerender = l, t
            }
            return {
                create: h
            }
        }

        function q(a, b, c, e, f, g) {
            function h(h) {
                function i(b, c) {
                    var d = a.defer();
                    return t = g.newDTInstance(v), r = b, s = c, m(v.options.fnPromise, f.renderDataTable).then(function (a) {
                        q = a.DataTable, g.copyDTProperties(a, t), d.resolve(t)
                    }), d.promise
                }

                function j(a, b) {
                    var e = q && q.page() ? q.page() : 0;
                    d.isFunction(v.options.fnPromise) ? m(v.options.fnPromise, p).then(function (c) {
                        d.isFunction(a) && a(c.DataTable.data()), !1 === b && c.DataTable.page(e).draw(!1)
                    }) : c.warn("In order to use the reloadData functionality with a Promise renderer, you need to provide a function that returns a promise.")
                }

                function k(a) {
                    v.options.fnPromise = a, s.dtOptions.fnPromise = a, m(v.options.fnPromise, p)
                }

                function l() {
                    q.destroy(), f.showLoading(r, s), f.preRender(h), i(r, s)
                }

                function m(b, c) {
                    var e = a.defer();
                    if (d.isUndefined(b)) throw new Error("You must provide a promise or a function that returns a promise!");
                    return u ? u.then(function () {
                        e.resolve(n(b, c))
                    }) : e.resolve(n(b, c)), e.promise
                }

                function n(b, c) {
                    var e = a.defer();
                    return u = d.isFunction(b) ? b() : b, u.then(function (a) {
                        var b = a;
                        if (v.options.sAjaxDataProp)
                            for (var d = v.options.sAjaxDataProp.split(".") ; d.length;) {
                                var f = d.shift();
                                f in b && (b = b[f])
                            }
                        u = null, e.resolve(o(v.options, r, b, c))
                    }), e.promise
                }

                function o(c, d, e, g) {
                    var h = a.defer();
                    return delete e.$promise, c.aaData = e, b(function () {
                        f.hideLoading(d), c.bDestroy = !0, h.resolve(g(d, c))
                    }, 0, !1), h.promise
                }

                function p(a, b) {
                    return q.clear(), q.rows.add(b.aaData).draw(b.redraw), {
                        id: t.id,
                        DataTable: t.DataTable,
                        dataTable: t.dataTable
                    }
                }
                var q, r, s, t, u = null,
                    v = Object.create(e);
                return v.name = "DTPromiseRenderer", v.options = h, v.render = i, v.reloadData = j, v.changeData = k, v.rerender = l, v
            }
            return {
                create: h
            }
        }

        function r(a, b, c, e, f, g) {
            function h(h) {
                function i(b, c) {
                    p = b, q = c;
                    var e = a.defer(),
                        h = g.newDTInstance(r);
                    return d.isUndefined(r.options.sAjaxDataProp) && (r.options.sAjaxDataProp = f.sAjaxDataProp), d.isUndefined(r.options.aoColumns) && (r.options.aoColumns = f.aoColumns), m(r.options, b).then(function (a) {
                        o = a.DataTable, g.copyDTProperties(a, h), e.resolve(h)
                    }), e.promise
                }

                function j(a, b) {
                    o && o.ajax.reload(a, b)
                }

                function k(a) {
                    r.options.ajax = a, q.dtOptions.ajax = a
                }

                function l() {
                    e.preRender(h), i(p, q)
                }

                function m(c, d) {
                    var f = a.defer();
                    return c.bDestroy = !0, o && (o.destroy(), e.showLoading(p, q), d.empty()), e.hideLoading(d), n(c) ? b(function () {
                        f.resolve(e.renderDataTable(d, c))
                    }, 0, !1) : f.resolve(e.renderDataTable(d, c)), f.promise
                }

                function n(a) {
                    return !(!d.isDefined(a) || !d.isDefined(a.dom)) && a.dom.indexOf("S") >= 0
                }
                var o, p, q, r = Object.create(c);
                return r.name = "DTAjaxRenderer", r.options = h, r.render = i, r.reloadData = j, r.changeData = k, r.rerender = l, r
            }
            return {
                create: h
            }
        }

        function s(a, b, c, e) {
            function f(f, g) {
                if (g) {
                    if (f && f.serverSide) throw new Error("You cannot use server side processing along with the Angular renderer!");
                    return b.create(f)
                }
                if (d.isDefined(f)) {
                    if (d.isDefined(f.fnPromise) && null !== f.fnPromise) {
                        if (f.serverSide) throw new Error("You cannot use server side processing along with the Promise renderer!");
                        return c.create(f)
                    }
                    return d.isDefined(f.ajax) && null !== f.ajax || d.isDefined(f.ajax) && null !== f.ajax ? e.create(f) : a.create(f)
                }
                return a.create()
            }
            return {
                fromOptions: f
            }
        }

        function t(a) {
            function b(a, c) {
                var e = d.copy(a);
                if ((d.isUndefined(e) || null === e) && (e = {}), d.isUndefined(c) || null === c) return e;
                if (d.isObject(c))
                    for (var f in c) c.hasOwnProperty(f) && (e[f] = b(e[f], c[f]));
                else e = d.copy(c);
                return e
            }

            function e(a, b) {
                d.isObject(a) && delete a[b]
            }

            function f(b, e) {
                var f = a.defer(),
                    h = [],
                    i = {},
                    j = e || [];
                if (!d.isObject(b) || d.isArray(b)) f.resolve(b);
                else {
                    i = d.extend(i, b);
                    for (var k in i) i.hasOwnProperty(k) && -1 === c.inArray(k, j) && (d.isArray(i[k]) ? h.push(g(i[k])) : h.push(a.when(i[k])));
                    a.all(h).then(function (a) {
                        var b = 0;
                        for (var d in i) i.hasOwnProperty(d) && -1 === c.inArray(d, j) && (i[d] = a[b++]);
                        f.resolve(i)
                    })
                }
                return f.promise
            }

            function g(b) {
                var c = a.defer(),
                    e = [],
                    g = [];
                return d.isArray(b) ? (d.forEach(b, function (b) {
                    d.isObject(b) ? e.push(f(b)) : e.push(a.when(b))
                }), a.all(e).then(function (a) {
                    d.forEach(a, function (a) {
                        g.push(a)
                    }), c.resolve(g)
                })) : c.resolve(b), c.promise
            }
            return {
                overrideProperties: b,
                deleteProperty: e,
                resolveObjectPromises: f,
                resolveArrayPromises: g
            }
        }
        d.module("datatables.directive", ["datatables.instances", "datatables.renderer", "datatables.options", "datatables.util"]).directive("datatable", e), e.$inject = ["$q", "$http", "$log", "DTRendererFactory", "DTRendererService", "DTPropertyUtil"], d.module("datatables.factory", []).factory("DTOptionsBuilder", f).factory("DTColumnBuilder", g).factory("DTColumnDefBuilder", h).factory("DTLoadingTemplate", i), h.$inject = ["DTColumnBuilder"], i.$inject = ["$compile", "DTDefaultOptions", "DT_LOADING_CLASS"], d.module("datatables.instances", ["datatables.util"]).factory("DTInstanceFactory", j), d.module("datatables", ["datatables.directive", "datatables.factory"]).run(k), d.module("datatables.options", []).constant("DT_DEFAULT_OPTIONS", {
            sAjaxDataProp: "",
            aoColumns: []
        }).constant("DT_LOADING_CLASS", "dt-loading").service("DTDefaultOptions", l), d.module("datatables.renderer", ["datatables.instances", "datatables.factory", "datatables.options", "datatables.instances"]).factory("DTRendererService", m).factory("DTRenderer", n).factory("DTDefaultRenderer", o).factory("DTNGRenderer", p).factory("DTPromiseRenderer", q).factory("DTAjaxRenderer", r).factory("DTRendererFactory", s), m.$inject = ["DTLoadingTemplate"], o.$inject = ["$q", "DTRenderer", "DTRendererService", "DTInstanceFactory"], p.$inject = ["$log", "$q", "$compile", "$timeout", "DTRenderer", "DTRendererService", "DTInstanceFactory"], q.$inject = ["$q", "$timeout", "$log", "DTRenderer", "DTRendererService", "DTInstanceFactory"], r.$inject = ["$q", "$timeout", "DTRenderer", "DTRendererService", "DT_DEFAULT_OPTIONS", "DTInstanceFactory"], s.$inject = ["DTDefaultRenderer", "DTNGRenderer", "DTPromiseRenderer", "DTAjaxRenderer"], d.module("datatables.util", []).factory("DTPropertyUtil", t), t.$inject = ["$q"]
    }(window, document, jQuery, angular);