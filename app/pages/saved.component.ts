import { Component, OnInit } from '@angular/core';
import { NS_ROUTER_DIRECTIVES } from "nativescript-angular/router";

@Component({
    selector: 'offers',
    directives: [NS_ROUTER_DIRECTIVES],
    template: `
    <StackLayout class="main">
        <Label text="Saved Component"></Label>
    </StackLayout>`,
})
export class SavedComponent {}