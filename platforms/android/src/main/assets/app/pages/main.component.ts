import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, NavigationStart } from '@angular/router';
import { NS_ROUTER_DIRECTIVES } from 'nativescript-angular/router';
import { AnimationCurve } from 'ui/enums';
import { Page } from 'ui/page';
import { BoxShadowDirective } from '../directives/box-shadow';
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { device, platformNames } from 'platform';
import { MenuComponent } from './menu.component';

@Component({
    selector: 'main',
    directives: [ROUTER_DIRECTIVES, NS_ROUTER_DIRECTIVES, BoxShadowDirective, MenuComponent],
    template: `
    <ActionBar title="">
        <ActionItem *ngIf="isIos" icon="res://icon_menu" (tap)="openDrawer()"></ActionItem>
        <NavigationButton *ngIf="isAndroid" icon="res://icon_menu" (tap)="openDrawer()"></NavigationButton>
        <StackLayout class="title">
            <Label text="THE PASS"></Label>
        </StackLayout>
    </ActionBar>      
    <RadSideDrawer #drawer showOverNavigation="true" (loaded)="loadDrawer()">
        <StackLayout tkDrawerContent class="side-stack-layout" boxShadow="1 0 6 rgba(0, 0, 0, 0.5)">
            <StackLayout class="side-menu-wrapper">
                <MenuList (onMenuSelected)="closeDrawer()"></MenuList>
            </StackLayout>
        </StackLayout>
        <StackLayout tkMainContent class="main-content">
            <StackLayout class="nav">
                <StackLayout #nav class="button-wrapper">
                    <Button text="CURRENT" [nsRouterLinkActive]="['selected']" [nsRouterLink]="['/offers']"></Button>
                    <StackLayout class="deimeter"><Label></Label></StackLayout>
                    <Button class="saved" [nsRouterLinkActive]="['selected']" [nsRouterLink]="['/saved']"></Button>
                </StackLayout>
                <AbsoluteLayout class="underline-wrapper">
                    <Label #line class="underline" [translateX]="left" top="0"></Label>
                </AbsoluteLayout>
            </StackLayout>
            <router-outlet></router-outlet>
        </StackLayout>
    </RadSideDrawer>
   `,
})
export class MainComponent implements AfterViewInit {
    left: number = 50;
    navWidth: number = 0;
    lineWidth: number = 0;
    step: number = 0;

    get isAndroid(): boolean {
        return device.os == platformNames.android;
    }

    get isIos(): boolean {
        return device.os == platformNames.ios;
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: SideDrawerType;

    get offset() {
        return (this.step - this.lineWidth) / 2;
    }

    @ViewChild('nav') nav: ElementRef;
    @ViewChild('line') line: ElementRef;

    constructor(
        private page: Page, router: Router,
        private _changeDetectionRef: ChangeDetectorRef
    ) {
        router.events.subscribe((e) => {
            if (e instanceof NavigationStart) {
                this.goTo(e.url);
            }
        });
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public closeDrawer() {
        this.drawer.closeDrawer();
    }

    public loadDrawer() {
        const drawer = this.drawerComponent.sideDrawer.ios;
        if (drawer) {
            drawer.attachDrawerToWindow();
        }
    }

    private goTo(url: string) {
        const offset = this.step * (url === '/saved' ? 1 : 0 );

        this.left = offset + this.offset;

        this.line.nativeElement.animate({
            translate: { x: this.left, y: 0},    
            duration: 200,
            curve: AnimationCurve.easeIn
        });
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
        setTimeout(()=>{
            this.lineWidth = this.line.nativeElement.getMeasuredWidth();
            this.navWidth = this.nav.nativeElement.getMeasuredWidth();

            this.step = this.navWidth / 2;

            this.left = this.offset;
        }, 100);
    }
}