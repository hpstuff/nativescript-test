import { Directive, ElementRef, Input, PLATFORM_DIRECTIVES, HostListener } from '@angular/core';
import { provide } from '@angular/core/src/di'; 
import { Color } from 'color';
import { Type } from '@angular/core/src/facade/lang';
import { View } from 'ui/core/view';

@Directive({
    selector: '[boxShadow]',
})
export class BoxShadowDirective {
    @Input('boxShadow') shadow: string;
    @Input('boxShadowColor') color: Color = new Color('#000000');
    @Input('boxShadowOffsetX') offsetX: number = 0;
    @Input('boxShadowOffsetY') offsetY: number = 0;
    @Input('boxShadowBlur') blur: number = 1;
    @Input('boxShadowSpread') spread: number = 0;
    @Input('boxShadowOpacity') opacity: number = 1;

    constructor(private elementRef: ElementRef) {}
    
    androidElevation(view: View) {
        const wrapper: android.view.View = view.android;
        if (wrapper.setElevation) {
            wrapper.setElevation(2);
        }
    }

    createShadow() {
        const view: View = this.elementRef.nativeElement;
        const wrapper: UIView = view.ios;
        if (!wrapper) {
            this.androidElevation(view);
            return;
        }
        this.parseShadow(this.shadow);

        const layer: CALayer = wrapper.layer;
        
        view.on('loaded', () => {
            if (this.spread == 0) {
                return;
            }
            const rect = CGRectInset(wrapper.bounds, -this.spread, -this.spread);
            layer.shadowPath = UIBezierPath.bezierPathWithRect(rect).CGPath;
        });

        layer.masksToBounds = false;
        layer.shadowColor = this.color.ios.CGColor;
        layer.shadowOpacity = this.opacity;
        layer.shadowRadius = this.blur;
        layer.shadowOffset = CGSizeMake(this.offsetX, this.offsetY);
    }

    @HostListener('loaded', ['$event'])
    onLoad(view) {
        this.createShadow();
    }

    parseShadow(shadow: string) {
        const colorRegex = /(rgb.*|#.*)/;
        const shadowRegex = / (?![^\(]*\))/;
        if (!shadow) {
            return;
        }
        const parts = shadow.split(shadowRegex);

        this.offsetX = parseFloat(parts[0]);
        this.offsetY = parseFloat(parts[1]);
        if (parts[2] && colorRegex.test(parts[2])) {
            this.color = new Color(parts[2])
            return;
        }
        this.blur = parseFloat(parts[2]);
        if (parts[3] && colorRegex.test(parts[3])) {
            this.color = new Color(parts[3])
            return;
        }
        this.spread = parseFloat(parts[3]);
        if (parts[4] && colorRegex.test(parts[4])) {
            this.color = new Color(parts[4])
            return;
        }
    }
}