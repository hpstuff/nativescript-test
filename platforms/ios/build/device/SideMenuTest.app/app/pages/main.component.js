"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var router_2 = require('nativescript-angular/router');
var enums_1 = require('ui/enums');
var page_1 = require('ui/page');
var box_shadow_1 = require('../directives/box-shadow');
var angular_1 = require('nativescript-telerik-ui/sidedrawer/angular');
var platform_1 = require('platform');
var menu_component_1 = require('./menu.component');
var MainComponent = (function () {
    function MainComponent(page, router, _changeDetectionRef) {
        var _this = this;
        this.page = page;
        this._changeDetectionRef = _changeDetectionRef;
        this.left = 50;
        this.navWidth = 0;
        this.lineWidth = 0;
        this.step = 0;
        router.events.subscribe(function (e) {
            if (e instanceof router_1.NavigationStart) {
                _this.goTo(e.url);
            }
        });
    }
    Object.defineProperty(MainComponent.prototype, "isAndroid", {
        get: function () {
            return platform_1.device.os == platform_1.platformNames.android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainComponent.prototype, "isIos", {
        get: function () {
            return platform_1.device.os == platform_1.platformNames.ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainComponent.prototype, "offset", {
        get: function () {
            return (this.step - this.lineWidth) / 2;
        },
        enumerable: true,
        configurable: true
    });
    MainComponent.prototype.openDrawer = function () {
        this.drawer.showDrawer();
    };
    MainComponent.prototype.load = function () {
        var drawer = this.drawerComponent.sideDrawer.ios;
        if (drawer) {
            drawer.attachDrawerToWindow();
        }
    };
    MainComponent.prototype.goTo = function (url) {
        var offset = this.step * (url === '/saved' ? 1 : 0);
        this.left = offset + this.offset;
        this.line.nativeElement.animate({
            translate: { x: this.left, y: 0 },
            duration: 200,
            curve: enums_1.AnimationCurve.easeIn
        });
    };
    MainComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
        setTimeout(function () {
            _this.lineWidth = _this.line.nativeElement.getMeasuredWidth();
            _this.navWidth = _this.nav.nativeElement.getMeasuredWidth();
            _this.step = _this.navWidth / 2;
            _this.left = _this.offset;
        }, 100);
    };
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent), 
        __metadata('design:type', angular_1.RadSideDrawerComponent)
    ], MainComponent.prototype, "drawerComponent", void 0);
    __decorate([
        core_1.ViewChild('nav'), 
        __metadata('design:type', core_1.ElementRef)
    ], MainComponent.prototype, "nav", void 0);
    __decorate([
        core_1.ViewChild('line'), 
        __metadata('design:type', core_1.ElementRef)
    ], MainComponent.prototype, "line", void 0);
    MainComponent = __decorate([
        core_1.Component({
            selector: 'main',
            directives: [router_1.ROUTER_DIRECTIVES, router_2.NS_ROUTER_DIRECTIVES, box_shadow_1.BoxShadowDirective, menu_component_1.MenuComponent],
            template: "\n    <ActionBar title=\"\">\n        <ActionItem *ngIf=\"isIos\" icon=\"res://icon_menu\" (tap)=\"openDrawer()\"></ActionItem>\n        <NavigationButton *ngIf=\"isAndroid\" icon=\"res://icon_menu\" (tap)=\"openDrawer()\"></NavigationButton>\n        <StackLayout class=\"title\">\n            <Label text=\"THE PASS\"></Label>\n        </StackLayout>\n    </ActionBar>      \n    <RadSideDrawer #drawer showOverNavigation=\"true\" (loaded)=\"load()\">\n        <StackLayout tkDrawerContent class=\"side-stack-layout\" boxShadow=\"1 0 6 rgba(0, 0, 0, 0.5)\">\n            <StackLayout class=\"side-menu-wrapper\">\n                <MenuList></MenuList>\n            </StackLayout>\n        </StackLayout>\n        <StackLayout tkMainContent>\n            <StackLayout class=\"nav\">\n                <StackLayout #nav class=\"button-wrapper\">\n                    <Button text=\"CURRENT\" [nsRouterLinkActive]=\"['selected']\" [nsRouterLink]=\"['/offers']\"></Button>\n                    <StackLayout class=\"deimeter\"><Label></Label></StackLayout>\n                    <Button class=\"saved\" [nsRouterLinkActive]=\"['selected']\" [nsRouterLink]=\"['/saved']\"></Button>\n                </StackLayout>\n                <AbsoluteLayout class=\"underline-wrapper\">\n                    <Label #line class=\"underline\" [translateX]=\"left\" top=\"0\"></Label>\n                </AbsoluteLayout>\n            </StackLayout>\n            <router-outlet></router-outlet>\n        </StackLayout>\n    </RadSideDrawer>\n   ",
        }), 
        __metadata('design:paramtypes', [page_1.Page, router_1.Router, core_1.ChangeDetectorRef])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map