"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var router_2 = require("nativescript-angular/router");
var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            directives: [router_1.ROUTER_DIRECTIVES, router_2.NS_ROUTER_DIRECTIVES],
            template: "\n    <Label text=\"Home Component\"></Label>\n    <router-outlet></router-outlet>\n    ",
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map