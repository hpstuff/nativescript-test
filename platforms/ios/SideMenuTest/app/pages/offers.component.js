"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var router_2 = require('nativescript-angular/router');
var offers_1 = require('../services/offers');
var box_shadow_1 = require('../directives/box-shadow');
var OfferItemComponent = (function () {
    function OfferItemComponent() {
    }
    Object.defineProperty(OfferItemComponent.prototype, "Title", {
        get: function () {
            return this.title.trim();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input('title'), 
        __metadata('design:type', String)
    ], OfferItemComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input('imageURL'), 
        __metadata('design:type', String)
    ], OfferItemComponent.prototype, "ImageURL", void 0);
    OfferItemComponent = __decorate([
        core_1.Component({
            selector: 'offer-item',
            directives: [box_shadow_1.BoxShadowDirective],
            template: "\n    <StackLayout class=\"offer-item\" \n        boxShadow=\"0 0.5 1 rgba(0, 0, 0, 0.5)\">\n        <Label class=\"header\" text=\"NEWS\"></Label>\n        <Image [src]=\"ImageURL\" stretch=\"aspectFill\"></Image>\n        <Label class=\"title\" [text]=\"Title\" textWrap=\"true\"></Label>\n    </StackLayout>"
        }), 
        __metadata('design:paramtypes', [])
    ], OfferItemComponent);
    return OfferItemComponent;
}());
exports.OfferItemComponent = OfferItemComponent;
var OffersComponent = (function () {
    function OffersComponent(store, router) {
        this.store = store;
        this.router = router;
    }
    OffersComponent.prototype.load = function () {
        this.store.getOffers().then(function (items) {
            console.log(items);
        })
            .catch(function (e) {
            console.log(e);
        });
    };
    OffersComponent.prototype.onItemLoading = function (view) {
        var cell = view.ios;
        if (cell) {
            cell.backgroundColor = UIColor.clearColor();
            cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
        }
    };
    OffersComponent.prototype.onItemTap = function (item) {
        console.log("--> ItemTapped: " + item.index);
    };
    OffersComponent = __decorate([
        core_1.Component({
            selector: 'offers',
            directives: [router_2.NS_ROUTER_DIRECTIVES, OfferItemComponent],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <ListView class=\"offers-list\"\n        [items]=\"store.items | async\"\n        (itemLoading)=\"onItemLoading($event)\"\n        (itemTap)=\"onItemTap($event)\"\n        (loaded)=\"load()\">\n        <template let-item=\"item\">\n            <offer-item [title]=\"item.Title\" [imageURL]=\"item.ImageURL\"></offer-item>\n        </template>\n    </ListView>"
        }), 
        __metadata('design:paramtypes', [offers_1.OffersService, router_1.Router])
    ], OffersComponent);
    return OffersComponent;
}());
exports.OffersComponent = OffersComponent;
//# sourceMappingURL=offers.component.js.map