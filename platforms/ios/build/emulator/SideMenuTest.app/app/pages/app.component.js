"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var router_2 = require("nativescript-angular/router");
var main_component_1 = require('./main.component');
var offers_component_1 = require('./offers.component');
var saved_component_1 = require('./saved.component');
var frame = require("ui/frame");
var BarStyle;
(function (BarStyle) {
    BarStyle[BarStyle["default"] = 0] = "default";
    BarStyle[BarStyle["light"] = 1] = "light";
    BarStyle[BarStyle["dark"] = 2] = "dark";
    BarStyle[BarStyle["opaque"] = 3] = "opaque";
})(BarStyle || (BarStyle = {}));
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        this.updateStatusBar();
    };
    AppComponent.prototype.updateStatusBar = function () {
        try {
            var navigationController = frame.topmost().ios.controller;
            var navigationBar = navigationController.navigationBar;
            navigationBar.barStyle = BarStyle.light;
        }
        catch (e) {
            console.log(e);
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            directives: [router_1.ROUTER_DIRECTIVES, router_2.NS_ROUTER_DIRECTIVES],
            template: "<page-router-outlet></page-router-outlet>"
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var routes = [
    {
        path: '', component: main_component_1.MainComponent,
        children: [
            { path: '', redirectTo: 'offers', pathMatch: 'full' },
            { path: 'offers', component: offers_component_1.OffersComponent },
            { path: 'saved', component: saved_component_1.SavedComponent }
        ]
    },
];
exports.AppRouterProviders = router_2.nsProvideRouter(routes, { enableTracing: false });
//# sourceMappingURL=app.component.js.map