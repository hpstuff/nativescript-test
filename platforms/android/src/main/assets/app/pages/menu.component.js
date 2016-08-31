"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var url_tree_1 = require('@angular/router/src/url_tree');
var TPRouterLinkActive = (function () {
    function TPRouterLinkActive(router, element, renderer) {
        var _this = this;
        this.router = router;
        this.element = element;
        this.renderer = renderer;
        this.classes = [];
        this.nsRouterLinkActiveOptions = { exact: false };
        this.subscription = router.events.subscribe(function (s) {
            if (s instanceof router_1.NavigationEnd) {
                _this.update();
            }
        });
    }
    Object.defineProperty(TPRouterLinkActive.prototype, "tpRouterLinkActiveFor", {
        set: function (data) {
            if (Array.isArray(data)) {
                this.links = data;
            }
            else {
                this.links = (data || '').split(' ');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TPRouterLinkActive.prototype, "tpRouterLinkActive", {
        set: function (data) {
            if (Array.isArray(data)) {
                this.classes = data;
            }
            else {
                this.classes = data.split(' ');
            }
        },
        enumerable: true,
        configurable: true
    });
    TPRouterLinkActive.prototype.ngOnChanges = function (changes) { this.update(); };
    TPRouterLinkActive.prototype.ngOnDestroy = function () { this.subscription.unsubscribe(); };
    TPRouterLinkActive.prototype.update = function () {
        var _this = this;
        if (!this.links)
            return;
        var currentUrlTree = this.router.parseUrl(this.router.url);
        var isActiveLinks = this.reduceList(currentUrlTree, this.links);
        this.classes.forEach(function (c) { return _this.renderer.setElementClass(_this.element.nativeElement, c, isActiveLinks); });
    };
    TPRouterLinkActive.prototype.reduceList = function (currentUrlTree, q) {
        var _this = this;
        return q.reduce(function (res, links) {
            return res || url_tree_1.containsTree(currentUrlTree, _this.router.parseUrl(links), _this.nsRouterLinkActiveOptions.exact);
        }, false);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TPRouterLinkActive.prototype, "nsRouterLinkActiveOptions", void 0);
    __decorate([
        core_1.Input('tpRouterLinkActiveFor'), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], TPRouterLinkActive.prototype, "tpRouterLinkActiveFor", null);
    __decorate([
        core_1.Input('tpRouterLinkActive'), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], TPRouterLinkActive.prototype, "tpRouterLinkActive", null);
    TPRouterLinkActive = __decorate([
        core_1.Directive({ selector: '[tpRouterLinkActive]' }), 
        __metadata('design:paramtypes', [router_1.Router, core_1.ElementRef, core_1.Renderer])
    ], TPRouterLinkActive);
    return TPRouterLinkActive;
}());
exports.TPRouterLinkActive = TPRouterLinkActive;
var MenuComponent = (function () {
    function MenuComponent(router) {
        this.router = router;
        this.items = [
            {
                icon: 'icon_offers',
                title: 'OFFERS',
                route: {
                    route: '/offers',
                    active: ['/offers', '/saved']
                }
            },
            {
                icon: 'icon_retailers',
                title: 'RETAILERS',
                route: {
                    route: '/retailers'
                }
            },
            {
                icon: 'icon_profile',
                title: 'PROFILE',
                route: {
                    route: '/profile'
                }
            },
            {
                icon: 'icon_help',
                title: 'HELP',
                section: true,
                route: {
                    route: '/help'
                }
            },
            {
                icon: 'icon_doc',
                title: 'TERMS & CONDITIONS',
                route: {
                    route: '/tos'
                }
            },
            {
                icon: 'icon_doc',
                title: 'PRIVACY POLICY',
                route: {
                    route: '/privacy'
                }
            },
            {
                icon: 'icon_logout',
                title: 'LOGOUT',
                section: true,
                route: {
                    route: '/logout'
                }
            }
        ];
        this.onMenuSelected = new core_1.EventEmitter();
    }
    MenuComponent.prototype.onItemLoading = function (view) {
        var cell = view.ios;
        if (cell) {
            cell.backgroundColor = UIColor.clearColor();
            cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
        }
    };
    MenuComponent.prototype.onItemTap = function (item) {
        this.router.navigateByUrl(this.items[item.index].route.route);
        this.onMenuSelected.next(null);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MenuComponent.prototype, "onMenuSelected", void 0);
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'MenuList',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            directives: [TPRouterLinkActive],
            template: "\n    <ListView class=\"menu-list\"\n        separatorColor=\"#00000000\"\n        [items]=\"items\"\n        (itemTap)=\"onItemTap($event)\"\n        (itemLoading)=\"onItemLoading($event)\">\n        <template let-item=\"item\">\n            <StackLayout class=\"menu-item\" \n                [tpRouterLinkActive]=\"['selected']\"\n                [tpRouterLinkActiveFor]=\"item.route.active || item.route.route\">\n                <StackLayout direction=\"horizontal\" [class.separator]=\"item.section\">\n                    {{item.route.route}}\n                    <Image src=\"res://{{item.icon}}\"></Image>\n                    <Label [text]=\"item.title\"></Label>\n                </StackLayout>\n            </StackLayout>\n        </template>\n    </ListView>"
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map