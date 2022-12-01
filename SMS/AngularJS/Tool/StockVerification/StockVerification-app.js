﻿var StockVerificationApp = angular.module('StockVerificationApp', ['ui.bootstrap', 'commonApp']);

StockVerificationApp.service('StockVerificationServices', function () {

    this.StockVerificationData = function (StockVerification) {
        debugger;

        this.PartId = StockVerification ? StockVerification.PartId : null;
        this.PartNumber = StockVerification ? StockVerification.PartNumber : null;
        this.PartName = StockVerification ? StockVerification.PartName : null;
        this.PartSpecification = StockVerification ? StockVerification.PartSpecification : null;
        this.UOM = StockVerification ? StockVerification.UOM : null;
        this.CostPerUnit = StockVerification ? StockVerification.CostPerUnit : null;
        this.IsReusable = StockVerification ? StockVerification.IsReusable : null;
        this.SpareType = StockVerification ? StockVerification.SpareType : null;
        this.IsActive = StockVerification ? StockVerification.IsActive : null;0
        this.OrgID = StockVerification ? StockVerification.OrgID : null;
        this.CreatedBy = StockVerification ? StockVerification.CreatedBy : null;
        this.CreatedAt = StockVerification ? StockVerification.CreatedAt : null;
        this.ModifyBy = StockVerification ? StockVerification.ModifyBy : null;
        this.ModifyDate = StockVerification ? StockVerification.ModifyDate : null;
        this.KEY = StockVerification ? StockVerification.KEY : null;
        //FOR STOCK
       
        this.TotalProductCount = StockVerification ? StockVerification.TotalProductCount : null;
        this.PHY_QTY = StockVerification ? StockVerification.PHY_QTY : null;
        this.Diffrence = StockVerification ? StockVerification.Diffrence : null;
        this.REMARKS = StockVerification ? StockVerification.REMARKS : null;

        //this.STK_ID = StockVerification ? StockVerification.STK_ID : null;
        

    };

    this.SaveStockVerification = function (data) {
        debugger;
        this.url = "Tool/SaveStockVerification";
        this.param = JSON.stringify(data);
    };
    

});
angular.module("ui.bootstrap", ["ui.bootstrap.tpls", "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dialog", "ui.bootstrap.dropdownToggle", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.position", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.typeahead"]), angular.module("ui.bootstrap.tpls", ["template/accordion/accordion-group.html", "template/accordion/accordion.html", "template/alert/alert.html", "template/carousel/carousel.html", "template/carousel/slide.html", "template/dialog/message.html", "template/pagination/pagination.html", "template/tooltip/tooltip-html-unsafe-popup.html", "template/tooltip/tooltip-popup.html", "template/popover/popover.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/rating/rating.html", "template/tabs/pane.html", "template/tabs/tabs.html", "template/typeahead/typeahead.html"]), angular.module("ui.bootstrap.transition", []).factory("$transition", ["$q", "$timeout", "$rootScope", function (t, e, n) { function o(t) { for (var e in t) if (void 0 !== i.style[e]) return t[e] } var a = function (o, i, r) { r = r || {}; var l = t.defer(), s = a[r.animation ? "animationEndEventName" : "transitionEndEventName"], c = function () { n.$apply(function () { o.unbind(s, c), l.resolve(o) }) }; return s && o.bind(s, c), e(function () { angular.isString(i) ? o.addClass(i) : angular.isFunction(i) ? i(o) : angular.isObject(i) && o.css(i), s || l.resolve(o) }), l.promise.cancel = function () { s && o.unbind(s, c), l.reject("Transition cancelled") }, l.promise }, i = document.createElement("trans"), r = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", transition: "transitionend" }, l = { WebkitTransition: "webkitAnimationEnd", MozTransition: "animationend", OTransition: "oAnimationEnd", transition: "animationend" }; return a.transitionEndEventName = o(r), a.animationEndEventName = o(l), a }]), angular.module("ui.bootstrap.collapse", ["ui.bootstrap.transition"]).directive("collapse", ["$transition", function (t) { var e = function (t, e, n) { e.removeClass("collapse"), e.css({ height: n }), e[0].offsetWidth, e.addClass("collapse") }; return { link: function (n, o, a) { var i, r = !0; n.$watch(function () { return o[0].scrollHeight }, function () { 0 !== o[0].scrollHeight && (i || (r ? e(n, o, o[0].scrollHeight + "px") : e(n, o, "auto"))) }), n.$watch(a.collapse, function (t) { t ? u() : c() }); var l, s = function (e) { return l && l.cancel(), l = t(o, e), l.then(function () { l = void 0 }, function () { l = void 0 }), l }, c = function () { r ? (r = !1, i || e(n, o, "auto")) : s({ height: o[0].scrollHeight + "px" }).then(function () { i || e(n, o, "auto") }), i = !1 }, u = function () { i = !0, r ? (r = !1, e(n, o, 0)) : (e(n, o, o[0].scrollHeight + "px"), s({ height: "0" })) } } } }]), angular.module("ui.bootstrap.accordion", ["ui.bootstrap.collapse"]).constant("accordionConfig", { closeOthers: !0 }).controller("AccordionController", ["$scope", "$attrs", "accordionConfig", function (t, e, n) { this.groups = [], this.closeOthers = function (o) { var a = angular.isDefined(e.closeOthers) ? t.$eval(e.closeOthers) : n.closeOthers; a && angular.forEach(this.groups, function (t) { t !== o && (t.isOpen = !1) }) }, this.addGroup = function (t) { var e = this; this.groups.push(t), t.$on("$destroy", function () { e.removeGroup(t) }) }, this.removeGroup = function (t) { var e = this.groups.indexOf(t); -1 !== e && this.groups.splice(this.groups.indexOf(t), 1) } }]).directive("accordion", function () { return { restrict: "EA", controller: "AccordionController", transclude: !0, replace: !1, templateUrl: "template/accordion/accordion.html" } }).directive("accordionGroup", ["$parse", "$transition", "$timeout", function (t) { return { require: "^accordion", restrict: "EA", transclude: !0, replace: !0, templateUrl: "template/accordion/accordion-group.html", scope: { heading: "@" }, controller: ["$scope", function () { this.setHeading = function (t) { this.heading = t } }], link: function (e, n, o, a) { var i, r; a.addGroup(e), e.isOpen = !1, o.isOpen && (i = t(o.isOpen), r = i.assign, e.$watch(function () { return i(e.$parent) }, function (t) { e.isOpen = t }), e.isOpen = i ? i(e.$parent) : !1), e.$watch("isOpen", function (t) { t && a.closeOthers(e), r && r(e.$parent, t) }) } } }]).directive("accordionHeading", function () { return { restrict: "E", transclude: !0, template: "", replace: !0, require: "^accordionGroup", compile: function (t, e, n) { return function (t, e, o, a) { a.setHeading(n(t, function () { })) } } } }).directive("accordionTransclude", function () { return { require: "^accordionGroup", link: function (t, e, n, o) { t.$watch(function () { return o[n.accordionTransclude] }, function (t) { t && (e.html(""), e.append(t)) }) } } }), angular.module("ui.bootstrap.alert", []).directive("alert", function () { return { restrict: "EA", templateUrl: "template/alert/alert.html", transclude: !0, replace: !0, scope: { type: "=", close: "&" }, link: function (t, e, n) { t.closeable = "close" in n } } }), angular.module("ui.bootstrap.buttons", []).constant("buttonConfig", { activeClass: "active", toggleEvent: "click" }).directive("btnRadio", ["buttonConfig", function (t) { var e = t.activeClass || "active", n = t.toggleEvent || "click"; return { require: "ngModel", link: function (t, o, a, i) { var r = t.$eval(a.btnRadio); t.$watch(function () { return i.$modelValue }, function (t) { angular.equals(t, r) ? o.addClass(e) : o.removeClass(e) }), o.bind(n, function () { o.hasClass(e) || t.$apply(function () { i.$setViewValue(r) }) }) } } }]).directive("btnCheckbox", ["buttonConfig", function (t) { var e = t.activeClass || "active", n = t.toggleEvent || "click"; return { require: "ngModel", link: function (t, o, a, i) { var r = t.$eval(a.btnCheckboxTrue), l = t.$eval(a.btnCheckboxFalse); r = angular.isDefined(r) ? r : !0, l = angular.isDefined(l) ? l : !1, t.$watch(function () { return i.$modelValue }, function (t) { angular.equals(t, r) ? o.addClass(e) : o.removeClass(e) }), o.bind(n, function () { t.$apply(function () { i.$setViewValue(o.hasClass(e) ? l : r) }) }) } } }]), angular.module("ui.bootstrap.carousel", ["ui.bootstrap.transition"]).controller("CarouselController", ["$scope", "$timeout", "$transition", "$q", function (t, e, n) { function o() { function n() { i ? (t.next(), o()) : t.pause() } a && e.cancel(a); var r = +t.interval; !isNaN(r) && r >= 0 && (a = e(n, r)) } var a, i, r = this, l = r.slides = [], s = -1; r.currentSlide = null, r.select = function (a, i) { function c() { r.currentSlide && angular.isString(i) && !t.noTransition && a.$element ? (a.$element.addClass(i), a.$element[0].offsetWidth = a.$element[0].offsetWidth, angular.forEach(l, function (t) { angular.extend(t, { direction: "", entering: !1, leaving: !1, active: !1 }) }), angular.extend(a, { direction: i, active: !0, entering: !0 }), angular.extend(r.currentSlide || {}, { direction: i, leaving: !0 }), t.$currentTransition = n(a.$element, {}), function (e, n) { t.$currentTransition.then(function () { u(e, n) }, function () { u(e, n) }) }(a, r.currentSlide)) : u(a, r.currentSlide), r.currentSlide = a, s = p, o() } function u(e, n) { angular.extend(e, { direction: "", active: !0, leaving: !1, entering: !1 }), angular.extend(n || {}, { direction: "", active: !1, leaving: !1, entering: !1 }), t.$currentTransition = null } var p = l.indexOf(a); void 0 === i && (i = p > s ? "next" : "prev"), a && a !== r.currentSlide && (t.$currentTransition ? (t.$currentTransition.cancel(), e(c)) : c()) }, r.indexOfSlide = function (t) { return l.indexOf(t) }, t.next = function () { var t = (s + 1) % l.length; return r.select(l[t], "next") }, t.prev = function () { var t = 0 > s - 1 ? l.length - 1 : s - 1; return r.select(l[t], "prev") }, t.select = function (t) { r.select(t) }, t.isActive = function (t) { return r.currentSlide === t }, t.slides = function () { return l }, t.$watch("interval", o), t.play = function () { i || (i = !0, o()) }, t.pause = function () { i = !1, a && e.cancel(a) }, r.addSlide = function (e, n) { e.$element = n, l.push(e), 1 === l.length || e.active ? (r.select(l[l.length - 1]), 1 == l.length && t.play()) : e.active = !1 }, r.removeSlide = function (t) { var e = l.indexOf(t); l.splice(e, 1), l.length > 0 && t.active && (e >= l.length ? r.select(l[e - 1]) : r.select(l[e])) } }]).directive("carousel", [function () { return { restrict: "EA", transclude: !0, replace: !0, controller: "CarouselController", require: "carousel", templateUrl: "template/carousel/carousel.html", scope: { interval: "=", noTransition: "=" } } }]).directive("slide", [function () { return { require: "^carousel", restrict: "EA", transclude: !0, replace: !0, templateUrl: "template/carousel/slide.html", scope: { active: "=" }, link: function (t, e, n, o) { o.addSlide(t, e), t.$on("$destroy", function () { o.removeSlide(t) }), t.$watch("active", function (e) { e && o.select(t) }) } } }]); var dialogModule = angular.module("ui.bootstrap.dialog", ["ui.bootstrap.transition"]); dialogModule.controller("MessageBoxController", ["$scope", "dialog", "model", function (t, e, n) { t.title = n.title, t.message = n.message, t.buttons = n.buttons, t.close = function (t) { e.close(t) } }]), dialogModule.provider("$dialog", function () { var t = { backdrop: !0, dialogClass: "modal", backdropClass: "modal-backdrop", transitionClass: "fade", triggerClass: "in", dialogOpenClass: "modal-open", resolve: {}, backdropFade: !1, dialogFade: !1, keyboard: !0, backdropClick: !0 }, e = {}, n = { value: 0 }; this.options = function (t) { e = t }, this.$get = ["$http", "$document", "$compile", "$rootScope", "$controller", "$templateCache", "$q", "$transition", "$injector", function (o, a, i, r, l, s, c, u, p) { function d(t) { var e = angular.element("<div>"); return e.addClass(t), e } function f(n) { var o = this, a = this.options = angular.extend({}, t, e, n); this._open = !1, this.backdropEl = d(a.backdropClass), a.backdropFade && (this.backdropEl.addClass(a.transitionClass), this.backdropEl.removeClass(a.triggerClass)), this.modalEl = d(a.dialogClass), a.dialogFade && (this.modalEl.addClass(a.transitionClass), this.modalEl.removeClass(a.triggerClass)), this.handledEscapeKey = function (t) { 27 === t.which && (o.close(), t.preventDefault(), o.$scope.$apply()) }, this.handleBackDropClick = function (t) { o.close(), t.preventDefault(), o.$scope.$apply() }, this.handleLocationChange = function () { o.close() } } var g = a.find("body"); return f.prototype.isOpen = function () { return this._open }, f.prototype.open = function (t, e) { var n = this, o = this.options; if (t && (o.templateUrl = t), e && (o.controller = e), !o.template && !o.templateUrl) throw Error("Dialog.open expected template or templateUrl, neither found. Use options or open method to specify them."); return this._loadResolves().then(function (t) { var e = t.$scope = n.$scope = t.$scope ? t.$scope : r.$new(); if (n.modalEl.html(t.$template), n.options.controller) { var o = l(n.options.controller, t); n.modalEl.children().data("ngControllerController", o) } i(n.modalEl)(e), n._addElementsToDom(), g.addClass(n.options.dialogOpenClass), setTimeout(function () { n.options.dialogFade && n.modalEl.addClass(n.options.triggerClass), n.options.backdropFade && n.backdropEl.addClass(n.options.triggerClass) }), n._bindEvents() }), this.deferred = c.defer(), this.deferred.promise }, f.prototype.close = function (t) { function e(t) { t.removeClass(o.options.triggerClass) } function n() { o._open && o._onCloseComplete(t) } var o = this, a = this._getFadingElements(); if (g.removeClass(o.options.dialogOpenClass), a.length > 0) for (var i = a.length - 1; i >= 0; i--) u(a[i], e).then(n); else this._onCloseComplete(t) }, f.prototype._getFadingElements = function () { var t = []; return this.options.dialogFade && t.push(this.modalEl), this.options.backdropFade && t.push(this.backdropEl), t }, f.prototype._bindEvents = function () { this.options.keyboard && g.bind("keydown", this.handledEscapeKey), this.options.backdrop && this.options.backdropClick && this.backdropEl.bind("click", this.handleBackDropClick), this.$scope.$on("$locationChangeSuccess", this.handleLocationChange) }, f.prototype._unbindEvents = function () { this.options.keyboard && g.unbind("keydown", this.handledEscapeKey), this.options.backdrop && this.options.backdropClick && this.backdropEl.unbind("click", this.handleBackDropClick) }, f.prototype._onCloseComplete = function (t) { this._removeElementsFromDom(), this._unbindEvents(), this.deferred.resolve(t) }, f.prototype._addElementsToDom = function () { g.append(this.modalEl), this.options.backdrop && (0 === n.value && g.append(this.backdropEl), n.value++), this._open = !0 }, f.prototype._removeElementsFromDom = function () { this.modalEl.remove(), this.options.backdrop && (n.value--, 0 === n.value && this.backdropEl.remove()), this._open = !1 }, f.prototype._loadResolves = function () { var t, e = [], n = [], a = this; return this.options.template ? t = c.when(this.options.template) : this.options.templateUrl && (t = o.get(this.options.templateUrl, { cache: s }).then(function (t) { return t.data })), angular.forEach(this.options.resolve || [], function (t, o) { n.push(o), e.push(angular.isString(t) ? p.get(t) : p.invoke(t)) }), n.push("$template"), e.push(t), c.all(e).then(function (t) { var e = {}; return angular.forEach(t, function (t, o) { e[n[o]] = t }), e.dialog = a, e }) }, { dialog: function (t) { return new f(t) }, messageBox: function (t, e, n) { return new f({ templateUrl: "template/dialog/message.html", controller: "MessageBoxController", resolve: { model: function () { return { title: t, message: e, buttons: n } } } }) } } }] }), angular.module("ui.bootstrap.dropdownToggle", []).directive("dropdownToggle", ["$document", "$location", "$window", function (t) { var e = null, n = angular.noop; return { restrict: "CA", link: function (o, a) { o.$watch("$location.path", function () { n() }), a.parent().bind("click", function () { n() }), a.bind("click", function (o) { o.preventDefault(), o.stopPropagation(); var i = a === e; e && n(), i || (a.parent().addClass("open"), e = a, n = function (o) { o && (o.preventDefault(), o.stopPropagation()), t.unbind("click", n), a.parent().removeClass("open"), n = angular.noop, e = null }, t.bind("click", n)) }) } } }]), angular.module("ui.bootstrap.modal", ["ui.bootstrap.dialog"]).directive("modal", ["$parse", "$dialog", function (t, e) { return { restrict: "EA", terminal: !0, link: function (n, o, a) { var i, r = angular.extend({}, n.$eval(a.uiOptions || a.bsOptions || a.options)), l = a.modal || a.show; r = angular.extend(r, { template: o.html(), resolve: { $scope: function () { return n } } }); var s = e.dialog(r); o.remove(), i = a.close ? function () { t(a.close)(n) } : function () { angular.isFunction(t(l).assign) && t(l).assign(n, !1) }, n.$watch(l, function (t) { t ? s.open().then(function () { i() }) : s.isOpen() && s.close() }) } } }]), angular.module("ui.bootstrap.pagination", []).constant("paginationConfig", { boundaryLinks: !1, directionLinks: !0, firstText: "First", previousText: "Previous", nextText: "Next", lastText: "Last" }).directive("pagination", ["paginationConfig", function (t) { return { restrict: "EA", scope: { numPages: "=", currentPage: "=", maxSize: "=", onSelectPage: "&" }, templateUrl: "template/pagination/pagination.html", replace: !0, link: function (e, n, o) { function a(t, e, n, o) { return { number: t, text: e, active: n, disabled: o } } var i = angular.isDefined(o.boundaryLinks) ? e.$eval(o.boundaryLinks) : t.boundaryLinks, r = angular.isDefined(o.directionLinks) ? e.$eval(o.directionLinks) : t.directionLinks, l = angular.isDefined(o.firstText) ? o.firstText : t.firstText, s = angular.isDefined(o.previousText) ? o.previousText : t.previousText, c = angular.isDefined(o.nextText) ? o.nextText : t.nextText, u = angular.isDefined(o.lastText) ? o.lastText : t.lastText; e.$watch("numPages + currentPage + maxSize", function () { e.pages = []; var t = 1, n = e.numPages; e.maxSize && e.maxSize < e.numPages && (t = Math.max(e.currentPage - Math.floor(e.maxSize / 2), 1), n = t + e.maxSize - 1, n > e.numPages && (n = e.numPages, t = n - e.maxSize + 1)); for (var o = t; n >= o; o++) { var p = a(o, o, e.isActive(o), !1); e.pages.push(p) } if (r) { var d = a(e.currentPage - 1, s, !1, e.noPrevious()); e.pages.unshift(d); var f = a(e.currentPage + 1, c, !1, e.noNext()); e.pages.push(f) } if (i) { var g = a(1, l, !1, e.noPrevious()); e.pages.unshift(g); var m = a(e.numPages, u, !1, e.noNext()); e.pages.push(m) } e.currentPage > e.numPages && e.selectPage(e.numPages) }), e.noPrevious = function () { return 1 === e.currentPage }, e.noNext = function () { return e.currentPage === e.numPages }, e.isActive = function (t) { return e.currentPage === t }, e.selectPage = function (t) { !e.isActive(t) && t > 0 && e.numPages >= t && (e.currentPage = t, e.onSelectPage({ page: t })) } } } }]), angular.module("ui.bootstrap.position", []).factory("$position", ["$document", "$window", function (t, e) { function n(t, n) { return t.currentStyle ? t.currentStyle[n] : e.getComputedStyle ? e.getComputedStyle(t)[n] : t.style[n] } function o(t) { return "static" === (n(t, "position") || "static") } var a = function (e) { for (var n = t[0], a = e.offsetParent || n; a && a !== n && o(a) ;) a = a.offsetParent; return a || n }; return { position: function (e) { var n = this.offset(e), o = { top: 0, left: 0 }, i = a(e[0]); return i != t[0] && (o = this.offset(angular.element(i)), o.top += i.clientTop, o.left += i.clientLeft), { width: e.prop("offsetWidth"), height: e.prop("offsetHeight"), top: n.top - o.top, left: n.left - o.left } }, offset: function (n) { var o = n[0].getBoundingClientRect(); return { width: n.prop("offsetWidth"), height: n.prop("offsetHeight"), top: o.top + (e.pageYOffset || t[0].body.scrollTop), left: o.left + (e.pageXOffset || t[0].body.scrollLeft) } } } }]), angular.module("ui.bootstrap.tooltip", ["ui.bootstrap.position"]).provider("$tooltip", function () { function t(t) { var e = /[A-Z]/g, n = "-"; return t.replace(e, function (t, e) { return (e ? n : "") + t.toLowerCase() }) } var e = { placement: "top", animation: !0, popupDelay: 0 }, n = { mouseenter: "mouseleave", click: "click", focus: "blur" }, o = {}; this.options = function (t) { angular.extend(o, t) }, this.$get = ["$window", "$compile", "$timeout", "$parse", "$document", "$position", function (a, i, r, l, s, c) { return function (a, u, p) { function d(t) { var e, o; return e = t || f.trigger || p, o = angular.isDefined(f.trigger) ? n[f.trigger] || e : n[e] || e, { show: e, hide: o } } var f = angular.extend({}, e, o), g = t(a), m = d(void 0), h = "<" + g + "-popup " + 'title="{{tt_title}}" ' + 'content="{{tt_content}}" ' + 'placement="{{tt_placement}}" ' + 'animation="tt_animation()" ' + 'is-open="tt_isOpen"' + ">" + "</" + g + "-popup>"; return { restrict: "EA", scope: !0, link: function (t, e, n) { function o() { t.tt_isOpen ? g() : p() } function p() { t.tt_popupDelay ? y = r(v, t.tt_popupDelay) : t.$apply(v) } function g() { t.$apply(function () { b() }) } function v() { var n, o, a, i; if (t.tt_content) { switch ($ && r.cancel($), C.css({ top: 0, left: 0, display: "block" }), f.appendToBody ? (k = k || s.find("body"), k.append(C)) : e.after(C), n = c.position(e), o = C.prop("offsetWidth"), a = C.prop("offsetHeight"), t.tt_placement) { case "right": i = { top: n.top + n.height / 2 - a / 2 + "px", left: n.left + n.width + "px" }; break; case "bottom": i = { top: n.top + n.height + "px", left: n.left + n.width / 2 - o / 2 + "px" }; break; case "left": i = { top: n.top + n.height / 2 - a / 2 + "px", left: n.left - o + "px" }; break; default: i = { top: n.top - a + "px", left: n.left + n.width / 2 - o / 2 + "px" } } C.css(i), t.tt_isOpen = !0 } } function b() { t.tt_isOpen = !1, r.cancel(y), angular.isDefined(t.tt_animation) && t.tt_animation() ? $ = r(function () { C.remove() }, 500) : C.remove() } var $, y, k, C = i(h)(t); t.tt_isOpen = !1, n.$observe(a, function (e) { t.tt_content = e }), n.$observe(u + "Title", function (e) { t.tt_title = e }), n.$observe(u + "Placement", function (e) { t.tt_placement = angular.isDefined(e) ? e : f.placement }), n.$observe(u + "Animation", function (e) { t.tt_animation = angular.isDefined(e) ? l(e) : function () { return f.animation } }), n.$observe(u + "PopupDelay", function (e) { var n = parseInt(e, 10); t.tt_popupDelay = isNaN(n) ? f.popupDelay : n }), n.$observe(u + "Trigger", function (t) { e.unbind(m.show), e.unbind(m.hide), m = d(t), m.show === m.hide ? e.bind(m.show, o) : (e.bind(m.show, p), e.bind(m.hide, g)) }) } } } }] }).directive("tooltipPopup", function () { return { restrict: "E", replace: !0, scope: { content: "@", placement: "@", animation: "&", isOpen: "&" }, templateUrl: "template/tooltip/tooltip-popup.html" } }).directive("tooltip", ["$tooltip", function (t) { return t("tooltip", "tooltip", "mouseenter") }]).directive("tooltipHtmlUnsafePopup", function () { return { restrict: "E", replace: !0, scope: { content: "@", placement: "@", animation: "&", isOpen: "&" }, templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html" } }).directive("tooltipHtmlUnsafe", ["$tooltip", function (t) { return t("tooltipHtmlUnsafe", "tooltip", "mouseenter") }]), angular.module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"]).directive("popoverPopup", function () { return { restrict: "EA", replace: !0, scope: { title: "@", content: "@", placement: "@", animation: "&", isOpen: "&" }, templateUrl: "template/popover/popover.html" } }).directive("popover", ["$compile", "$timeout", "$parse", "$window", "$tooltip", function (t, e, n, o, a) { return a("popover", "popover", "click") }]), angular.module("ui.bootstrap.progressbar", ["ui.bootstrap.transition"]).constant("progressConfig", { animate: !0, autoType: !1, stackedTypes: ["success", "info", "warning", "danger"] }).controller("ProgressBarController", ["$scope", "$attrs", "progressConfig", function (t, e, n) { function o(t) { return r[t] } var a = angular.isDefined(e.animate) ? t.$eval(e.animate) : n.animate, i = angular.isDefined(e.autoType) ? t.$eval(e.autoType) : n.autoType, r = angular.isDefined(e.stackedTypes) ? t.$eval("[" + e.stackedTypes + "]") : n.stackedTypes; this.makeBar = function (t, e, n) { var r = angular.isObject(t) ? t.value : t || 0, l = angular.isObject(e) ? e.value : e || 0, s = angular.isObject(t) && angular.isDefined(t.type) ? t.type : i ? o(n || 0) : null; return { from: l, to: r, type: s, animate: a } }, this.addBar = function (e) { t.bars.push(e), t.totalPercent += e.to }, this.clearBars = function () { t.bars = [], t.totalPercent = 0 }, this.clearBars() }]).directive("progress", function () { return { restrict: "EA", replace: !0, controller: "ProgressBarController", scope: { value: "=", onFull: "&", onEmpty: "&" }, templateUrl: "template/progressbar/progress.html", link: function (t, e, n, o) { t.$watch("value", function (t, e) { if (o.clearBars(), angular.isArray(t)) for (var n = 0, a = t.length; a > n; n++) o.addBar(o.makeBar(t[n], e[n], n)); else o.addBar(o.makeBar(t, e)) }, !0), t.$watch("totalPercent", function (e) { e >= 100 ? t.onFull() : 0 >= e && t.onEmpty() }, !0) } } }).directive("progressbar", ["$transition", function (t) { return { restrict: "EA", replace: !0, scope: { width: "=", old: "=", type: "=", animate: "=" }, templateUrl: "template/progressbar/bar.html", link: function (e, n) { e.$watch("width", function (o) { e.animate ? (n.css("width", e.old + "%"), t(n, { width: o + "%" })) : n.css("width", o + "%") }) } } }]), angular.module("ui.bootstrap.rating", []).constant("ratingConfig", { max: 5 }).directive("rating", ["ratingConfig", "$parse", function (t, e) { return { restrict: "EA", scope: { value: "=" }, templateUrl: "template/rating/rating.html", replace: !0, link: function (n, o, a) { var i = angular.isDefined(a.max) ? n.$eval(a.max) : t.max; n.range = []; for (var r = 1; i >= r; r++) n.range.push(r); n.rate = function (t) { n.readonly || (n.value = t) }, n.enter = function (t) { n.readonly || (n.val = t) }, n.reset = function () { n.val = angular.copy(n.value) }, n.reset(), n.$watch("value", function (t) { n.val = t }), n.readonly = !1, a.readonly && n.$parent.$watch(e(a.readonly), function (t) { n.readonly = !!t }) } } }]), angular.module("ui.bootstrap.tabs", []).controller("TabsController", ["$scope", "$element", function (t) { var e = t.panes = []; this.select = t.select = function (t) { angular.forEach(e, function (t) { t.selected = !1 }), t.selected = !0 }, this.addPane = function (n) { e.length || t.select(n), e.push(n) }, this.removePane = function (n) { var o = e.indexOf(n); e.splice(o, 1), n.selected && e.length > 0 && t.select(e[e.length > o ? o : o - 1]) } }]).directive("tabs", function () { return { restrict: "EA", transclude: !0, scope: {}, controller: "TabsController", templateUrl: "template/tabs/tabs.html", replace: !0 } }).directive("pane", ["$parse", function (t) { return { require: "^tabs", restrict: "EA", transclude: !0, scope: { heading: "@" }, link: function (e, n, o, a) { var i, r; e.selected = !1, o.active && (i = t(o.active), r = i.assign, e.$watch(function () { return i(e.$parent) }, function (t) { e.selected = t }), e.selected = i ? i(e.$parent) : !1), e.$watch("selected", function (t) { t && a.select(e), r && r(e.$parent, t) }), a.addPane(e), e.$on("$destroy", function () { a.removePane(e) }) }, templateUrl: "template/tabs/pane.html", replace: !0 } }]), angular.module("ui.bootstrap.typeahead", ["ui.bootstrap.position"]).factory("typeaheadParser", ["$parse", function (t) { var e = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/; return { parse: function (n) { var o = n.match(e); if (!o) throw Error("Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_' but got '" + n + "'."); return { itemName: o[3], source: t(o[4]), viewMapper: t(o[2] || o[1]), modelMapper: t(o[1]) } } } }]).directive("typeahead", ["$compile", "$parse", "$q", "$document", "$position", "typeaheadParser", function (t, e, n, o, a, i) { var r = [9, 13, 27, 38, 40]; return { require: "ngModel", link: function (l, s, c, u) { var p, d = l.$eval(c.typeaheadMinLength) || 1, f = i.parse(c.typeahead), g = l.$eval(c.typeaheadEditable) !== !1, m = e(c.typeaheadLoading).assign || angular.noop, h = angular.element("<typeahead-popup matches='matches' active='activeIdx' select='select(activeIdx)' query='query' position='position'></typeahead-popup>"), v = l.$new(); l.$on("$destroy", function () { v.$destroy() }); var b = function () { v.matches = [], v.activeIdx = -1 }, $ = function (t) { var e = { $viewValue: t }; m(l, !0), n.when(f.source(v, e)).then(function (n) { if (t === u.$viewValue) { if (n.length > 0) { v.activeIdx = 0, v.matches.length = 0; for (var o = 0; n.length > o; o++) e[f.itemName] = n[o], v.matches.push({ label: f.viewMapper(v, e), model: n[o] }); v.query = t, v.position = a.position(s), v.position.top = v.position.top + s.prop("offsetHeight") } else b(); m(l, !1) } }, function () { b(), m(l, !1) }) }; b(), v.query = void 0, u.$parsers.push(function (t) { return b(), p ? t : (t && t.length >= d && $(t), g ? t : void 0) }), u.$render = function () { var t = {}; t[f.itemName] = p || u.$viewValue, s.val(f.viewMapper(v, t) || u.$viewValue), p = void 0 }, v.select = function (t) { var e = {}; e[f.itemName] = p = v.matches[t].model, u.$setViewValue(f.modelMapper(v, e)), u.$render() }, s.bind("keydown", function (t) { 0 !== v.matches.length && -1 !== r.indexOf(t.which) && (t.preventDefault(), 40 === t.which ? (v.activeIdx = (v.activeIdx + 1) % v.matches.length, v.$digest()) : 38 === t.which ? (v.activeIdx = (v.activeIdx ? v.activeIdx : v.matches.length) - 1, v.$digest()) : 13 === t.which || 9 === t.which ? v.$apply(function () { v.select(v.activeIdx) }) : 27 === t.which && (t.stopPropagation(), b(), v.$digest())) }), o.bind("click", function () { b(), v.$digest() }), s.after(t(h)(v)) } } }]).directive("typeaheadPopup", function () { return { restrict: "E", scope: { matches: "=", query: "=", active: "=", position: "=", select: "&" }, replace: !0, templateUrl: "template/typeahead/typeahead.html", link: function (t) { t.isOpen = function () { return t.matches.length > 0 }, t.isActive = function (e) { return t.active == e }, t.selectActive = function (e) { t.active = e }, t.selectMatch = function (e) { t.select({ activeIdx: e }) } } } }).filter("typeaheadHighlight", function () { function t(t) { return t.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1") } return function (e, n) { return n ? e.replace(RegExp(t(n), "gi"), "<strong>$&</strong>") : n } }), angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function (t) { t.put("template/accordion/accordion-group.html", '<div class="accordion-group">\n  <div class="accordion-heading" ><a class="accordion-toggle" ng-click="isOpen = !isOpen" accordion-transclude="heading">{{heading}}</a></div>\n  <div class="accordion-body" collapse="!isOpen">\n    <div class="accordion-inner" ng-transclude></div>  </div>\n</div>') }]), angular.module("template/accordion/accordion.html", []).run(["$templateCache", function (t) { t.put("template/accordion/accordion.html", '<div class="accordion" ng-transclude></div>') }]), angular.module("template/alert/alert.html", []).run(["$templateCache", function (t) { t.put("template/alert/alert.html", "<div class='alert' ng-class='type && \"alert-\" + type'>\n    <button ng-show='closeable' type='button' class='close' ng-click='close()'>&times;</button>\n    <div ng-transclude></div>\n</div>\n") }]), angular.module("template/carousel/carousel.html", []).run(["$templateCache", function (t) { t.put("template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel">\n    <ol class="carousel-indicators" ng-show="slides().length > 1">\n        <li ng-repeat="slide in slides()" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a ng-click="prev()" class="carousel-control left" ng-show="slides().length > 1">&lsaquo;</a>\n    <a ng-click="next()" class="carousel-control right" ng-show="slides().length > 1">&rsaquo;</a>\n</div>\n') }]), angular.module("template/carousel/slide.html", []).run(["$templateCache", function (t) { t.put("template/carousel/slide.html", "<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n  }\" class=\"item\" ng-transclude></div>\n") }]), angular.module("template/dialog/message.html", []).run(["$templateCache", function (t) { t.put("template/dialog/message.html", '<div class="modal-header">\n	<h1>{{ title }}</h1>\n</div>\n<div class="modal-body">\n	<p>{{ message }}</p>\n</div>\n<div class="modal-footer">\n	<button ng-repeat="btn in buttons" ng-click="close(btn.result)" class=btn ng-class="btn.cssClass">{{ btn.label }}</button>\n</div>\n') }]), angular.module("template/pagination/pagination.html", []).run(["$templateCache", function (t) { t.put("template/pagination/pagination.html", '<div class="pagination"><ul>\n  <li ng-repeat="page in pages" ng-class="{active: page.active, disabled: page.disabled}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  </ul>\n</div>\n') }]), angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function (t) { t.put("template/tooltip/tooltip-html-unsafe-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind-html-unsafe="content"></div>\n</div>\n') }]), angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function (t) { t.put("template/tooltip/tooltip-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n') }]), angular.module("template/popover/popover.html", []).run(["$templateCache", function (t) { t.put("template/popover/popover.html", '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n') }]), angular.module("template/progressbar/bar.html", []).run(["$templateCache", function (t) { t.put("template/progressbar/bar.html", '<div class="bar" ng-class=\'type && "bar-" + type\'></div>') }]), angular.module("template/progressbar/progress.html", []).run(["$templateCache", function (t) { t.put("template/progressbar/progress.html", '<div class="progress"><progressbar ng-repeat="bar in bars" width="bar.to" old="bar.from" animate="bar.animate" type="bar.type"></progressbar></div>') }]), angular.module("template/rating/rating.html", []).run(["$templateCache", function (t) { t.put("template/rating/rating.html", '<span ng-mouseleave="reset()">\n	<i ng-repeat="number in range" ng-mouseenter="enter(number)" ng-click="rate(number)" ng-class="{\'icon-star\': number <= val, \'icon-star-empty\': number > val}"></i>\n</span>\n') }]), angular.module("template/tabs/pane.html", []).run(["$templateCache", function (t) { t.put("template/tabs/pane.html", '<div class="tab-pane" ng-class="{active: selected}" ng-show="selected" ng-transclude></div>\n') }]), angular.module("template/tabs/tabs.html", []).run(["$templateCache", function (t) { t.put("template/tabs/tabs.html", '<div class="tabbable">\n  <ul class="nav nav-tabs">\n    <li ng-repeat="pane in panes" ng-class="{active:pane.selected}">\n      <a ng-click="select(pane)">{{pane.heading}}</a>\n    </li>\n  </ul>\n  <div class="tab-content" ng-transclude></div>\n</div>\n') }]), angular.module("template/typeahead/match.html", []).run(["$templateCache", function (t) { t.put("template/typeahead/match.html", '<a tabindex="-1" ng-bind-html-unsafe="match.label | typeaheadHighlight:query"></a>') }]), angular.module("template/typeahead/typeahead.html", []).run(["$templateCache", function (t) { t.put("template/typeahead/typeahead.html", '<ul class="typeahead dropdown-menu" ng-style="{display: isOpen()&&\'block\' || \'none\', top: position.top+\'px\', left: position.left+\'px\'}">\n    <li ng-repeat="match in matches" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)">\n        <a tabindex="-1" ng-click="selectMatch($index)" ng-bind-html-unsafe="match.label | typeaheadHighlight:query"></a>\n    </li>\n</ul>') }]);