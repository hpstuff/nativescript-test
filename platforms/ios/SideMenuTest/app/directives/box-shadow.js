"use strict";
var core_1 = require('@angular/core');
var color_1 = require('color');
var BoxShadowDirective = (function () {
    function BoxShadowDirective(elementRef) {
        this.elementRef = elementRef;
        this.color = new color_1.Color('#000000');
        this.offsetX = 0;
        this.offsetY = 0;
        this.blur = 1;
        this.spread = 0;
        this.opacity = 1;
    }
    BoxShadowDirective.prototype.createShadow = function () {
        var _this = this;
        var view = this.elementRef.nativeElement;
        var wrapper = view.ios;
        if (!wrapper) {
            return;
        }
        this.parseShadow(this.shadow);
        var layer = wrapper.layer;
        view.on('loaded', function () {
            if (_this.spread == 0) {
                return;
            }
            var rect = CGRectInset(wrapper.bounds, -_this.spread, -_this.spread);
            layer.shadowPath = UIBezierPath.bezierPathWithRect(rect).CGPath;
        });
        layer.masksToBounds = false;
        layer.shadowColor = this.color.ios.CGColor;
        layer.shadowOpacity = this.opacity;
        layer.shadowRadius = this.blur;
        layer.shadowOffset = CGSizeMake(this.offsetX, this.offsetY);
    };
    BoxShadowDirective.prototype.onLoad = function (view) {
        this.createShadow();
    };
    BoxShadowDirective.prototype.parseShadow = function (shadow) {
        var colorRegex = /(rgb.*|#.*)/;
        var shadowRegex = / (?![^\(]*\))/;
        if (!shadow) {
            return;
        }
        var parts = shadow.split(shadowRegex);
        this.offsetX = parseFloat(parts[0]);
        this.offsetY = parseFloat(parts[1]);
        if (parts[2] && colorRegex.test(parts[2])) {
            this.color = new color_1.Color(parts[2]);
            return;
        }
        this.blur = parseFloat(parts[2]);
        if (parts[3] && colorRegex.test(parts[3])) {
            this.color = new color_1.Color(parts[3]);
            return;
        }
        this.spread = parseFloat(parts[3]);
        if (parts[4] && colorRegex.test(parts[4])) {
            this.color = new color_1.Color(parts[4]);
            return;
        }
    };
    __decorate([
        core_1.Input('boxShadow'), 
        __metadata('design:type', String)
    ], BoxShadowDirective.prototype, "shadow", void 0);
    __decorate([
        core_1.Input('boxShadowColor'), 
        __metadata('design:type', color_1.Color)
    ], BoxShadowDirective.prototype, "color", void 0);
    __decorate([
        core_1.Input('boxShadowOffsetX'), 
        __metadata('design:type', Number)
    ], BoxShadowDirective.prototype, "offsetX", void 0);
    __decorate([
        core_1.Input('boxShadowOffsetY'), 
        __metadata('design:type', Number)
    ], BoxShadowDirective.prototype, "offsetY", void 0);
    __decorate([
        core_1.Input('boxShadowBlur'), 
        __metadata('design:type', Number)
    ], BoxShadowDirective.prototype, "blur", void 0);
    __decorate([
        core_1.Input('boxShadowSpread'), 
        __metadata('design:type', Number)
    ], BoxShadowDirective.prototype, "spread", void 0);
    __decorate([
        core_1.Input('boxShadowOpacity'), 
        __metadata('design:type', Number)
    ], BoxShadowDirective.prototype, "opacity", void 0);
    __decorate([
        core_1.HostListener('loaded', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], BoxShadowDirective.prototype, "onLoad", null);
    BoxShadowDirective = __decorate([
        core_1.Directive({
            selector: '[boxShadow]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], BoxShadowDirective);
    return BoxShadowDirective;
}());
exports.BoxShadowDirective = BoxShadowDirective;
//# sourceMappingURL=box-shadow.js.map