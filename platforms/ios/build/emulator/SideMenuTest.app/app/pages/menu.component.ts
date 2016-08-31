import { Component, ChangeDetectionStrategy } from '@angular/core';

interface MenuRoute {
    route: string;
    options?: any;
}

interface MenuItem {
    icon: string;
    title: string;
    section?: boolean;
    route: MenuRoute;
}

@Component({
    selector: 'MenuList',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <ListView class="menu-list"
        separatorColor="#00000000"
        [items]="items"
        (itemLoading)="onItemLoading($event)"
        (itemTap)="onItemTap($event)">
        <template let-item="item">
            <StackLayout class="menu-item">
                <StackLayout direction="horizontal" [class.separator]="item.section">
                    <Image src="res://{{item.icon}}"></Image>
                    <Label [text]="item.title"></Label>
                </StackLayout>
            </StackLayout>
        </template>
    </ListView>`
})
export class MenuComponent {
    items: MenuItem[] = [
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
