import {
    Component,
    Directive,
    ChangeDetectionStrategy,
    Input,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NS_ROUTER_DIRECTIVES } from 'nativescript-angular/router';
import { OffersService } from '../services/offers'; 
import { Offer } from '../models/offer';
import { Color } from 'color';
import { BoxShadowDirective } from '../directives/box-shadow';

@Component({
    selector: 'offer-item',
    directives: [ BoxShadowDirective ],
    template: `
    <StackLayout class="offer-item" 
        boxShadow="0 0.5 1 rgba(0, 0, 0, 0.5)">
        <Label class="header" text="NEWS"></Label>
        <Image [src]="ImageURL" stretch="aspectFill"></Image>
        <Label class="title" [text]="Title" textWrap="true"></Label>
    </StackLayout>`
})
export class OfferItemComponent {
    @Input('title') title: string;
    @Input('imageURL') ImageURL: string;

    get Title(): String {
        return this.title.trim();
    }
}

@Component({
    selector: 'offers',
    directives: [ NS_ROUTER_DIRECTIVES, OfferItemComponent ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <ListView class="offers-list"
        [items]="store.items | async"
        (itemLoading)="onItemLoading($event)"
        (itemTap)="onItemTap($event)"
        (loaded)="load()">
        <template let-item="item">
            <offer-item [title]="item.Title" [imageURL]="item.ImageURL"></offer-item>
        </template>
    </ListView>`
})
export class OffersComponent {

    constructor(private store: OffersService, private router: Router) {}
    
    load() {
        this.store.getOffers().then(items => {
            console.log(items);
        })
        .catch(e => {
            console.log(e);
        });
    }

    public onItemLoading(view) {
        const cell: UITableViewCell = view.ios;
        if (cell) {
            cell.backgroundColor = UIColor.clearColor();
            cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
        }
    }

    public onItemTap(item) {
        console.log("--> ItemTapped: " + item.index);
    }
}
