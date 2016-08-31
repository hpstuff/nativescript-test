import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";

@Component({
    selector: 'detail',
    template: `
    <ActionBarExtension>
        <StackLayout class="title">
            <Label text="YOUR OFFER"></Label>
        </StackLayout>
    </ActionBarExtension>
    `
})
export class DetailComponent {
    public id: Observable<string>;

    constructor(route: ActivatedRoute) {
        this.id = route.params.map(r => r["id"]);
    }
}