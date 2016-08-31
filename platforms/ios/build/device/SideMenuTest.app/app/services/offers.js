"use strict";
var core_1 = require('@angular/core');
var Rx_1 = require("rxjs/Rx");
var server_1 = require('./server');
var offer_1 = require('../models/offer');
var OffersService = (function () {
    function OffersService(zone, serverService) {
        this.zone = zone;
        this.serverService = serverService;
        this.items = new Rx_1.BehaviorSubject([]);
        this.allItems = [];
    }
    OffersService.prototype.getOffers = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.serverService.get('/news')
                .map(function (data) { return data.data; })
                .subscribe(function (data) {
                var offers = data.map(function (json) { return new offer_1.Offer(json.id, json.title, json.description, json.modified_date, json.image_url, json.hero); });
                _this.allItems = _this.allItems.concat(offers);
                _this.publishUpdates();
                resolve(_this.allItems);
            }, function (err) { return reject(err); });
        });
    };
    OffersService.prototype.publishUpdates = function () {
        var _this = this;
        this.zone.run(function () {
            _this.items.next(_this.allItems.slice());
        });
    };
    OffersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.NgZone, server_1.ServerService])
    ], OffersService);
    return OffersService;
}());
exports.OffersService = OffersService;
//# sourceMappingURL=offers.js.map