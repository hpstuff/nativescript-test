"use strict";
var Offer = (function () {
    function Offer(Id, Title, Description, ModifiedDate, ImageURL, IsHero) {
        this.Id = Id;
        this.Title = Title;
        this.Description = Description;
        this.ModifiedDate = ModifiedDate;
        this.ImageURL = ImageURL;
        this.IsHero = IsHero;
    }
    return Offer;
}());
exports.Offer = Offer;
//# sourceMappingURL=offer.js.map