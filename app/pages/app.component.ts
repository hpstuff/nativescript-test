import { Component, OnInit } from '@angular/core';
import { RouterConfig, ROUTER_DIRECTIVES } from '@angular/router';
import { NS_ROUTER_DIRECTIVES, nsProvideRouter } from "nativescript-angular/router";
import { MainComponent } from './main.component';
import { OffersComponent } from './offers.component';
import { SavedComponent } from './saved.component';
import { DetailComponent } from './detail.component';
import * as frame from "ui/frame";

enum BarStyle {
    default,
    light,
    dark,
    opaque
}

@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES, NS_ROUTER_DIRECTIVES],
    template: `<page-router-outlet></page-router-outlet>`
})
export class AppComponent implements OnInit {
    ngOnInit() {
        this.updateStatusBar();
    }

    updateStatusBar() {
        try {
            const navigationController = frame.topmost().ios.controller;
            const navigationBar = navigationController.navigationBar;
            navigationBar.barStyle = BarStyle.light;
        } catch (e) {
            console.log(e);
        }
    }
}

const routes: RouterConfig = [
    { 
        path: '', component: MainComponent,
        children: [
            { path: '', redirectTo: 'offers', pathMatch: 'full' },
            { path: 'offers', component: OffersComponent },
            { path: 'saved', component: SavedComponent }
        ]
    },
    { path: 'offers/:id', component: DetailComponent },
];

export var AppRouterProviders = nsProvideRouter(routes, { enableTracing: false });
