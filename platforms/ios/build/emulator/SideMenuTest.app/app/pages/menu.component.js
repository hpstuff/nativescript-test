"use strict";
var core_1 = require('@angular/core');
var MenuComponent = (function () {
    function MenuComponent() {
        this.items = [
            {
                icon: 'icon_offers',
                title: 'OFFERS',
                route: {
                    route: '/offers'
                }
            },
            {
                icon: 'icon_retailers',
                title: 'RETAILERS',
                route: {
                    route: '/retailers'
                }
            },
            {
                icon: 'icon_profile',
                title: 'PROFILE',
                route: {
                    route: '/profile'
                }
            },
            {
                icon: 'icon_help',
                title: 'HELP',
                section: true,
                route: {
                    route: '/help'
                }
            },
            {
                icon: 'icon_doc',
                title: 'TERMS & CONDITIONS',
                route: {
                    route: '/tos'
                }
            },
            {
                icon: 'icon_doc',
                title: 'PRIVACY POLICY',
                route: {
                    route: '/privacy'
                }
            },
            {
                icon: 'icon_logout',
                title: 'LOGOUT',
                section: true,
                route: {
                    route: '/logout'
                }
            }
        ];
    }
    MenuComponent.prototype.onItemLoading = function (view) {
        var cell = view.ios;
        if (cell) {
            cell.backgroundColor = UIColor.clearColor();
            cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
        }
    };
    MenuComponent.prototype.onItemTap = function (item) {
        console.log("--> ItemTapped: " + item.index);
    };
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'MenuList',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <ListView class=\"menu-list\"\n        separatorColor=\"#00000000\"\n        [items]=\"items\"\n        (itemLoading)=\"onItemLoading($event)\"\n        (itemTap)=\"onItemTap($event)\">\n        <template let-item=\"item\">\n            <StackLayout class=\"menu-item\">\n                <StackLayout direction=\"horizontal\" [class.separator]=\"item.section\">\n                    <Image src=\"res://{{item.icon}}\"></Image>\n                    <Label [text]=\"item.title\"></Label>\n                </StackLayout>\n            </StackLayout>\n        </template>\n    </ListView>"
        }), 
        __metadata('design:paramtypes', [])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map