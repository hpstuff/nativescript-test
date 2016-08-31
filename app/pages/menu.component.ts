import {
    Component,
    ChangeDetectionStrategy,
    Directive,
    Input,
    Output,
    OnDestroy,
    OnChanges,
    ElementRef,
    Renderer,
    EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NavigationEnd, Router } from '@angular/router';
import { UrlTree, containsTree } from '@angular/router/src/url_tree';

interface MenuRoute {
    route: string;
    active?: string[] | string;
    options?: any;
}

interface MenuItem {
    icon: string;
    selected?: boolean;
    title: string;
    section?: boolean;
    route: MenuRoute;
}

@Directive({ selector: '[tpRouterLinkActive]' })
export class TPRouterLinkActive implements OnChanges, OnDestroy {
    private links: string[];

    private classes: string[] = [];
    private subscription: Subscription;

    @Input() private nsRouterLinkActiveOptions: { exact: boolean } = { exact: false };
    

    constructor(private router: Router, private element: ElementRef, private renderer: Renderer) {
        this.subscription = router.events.subscribe(s => {
            if (s instanceof NavigationEnd) {
                this.update();
            }
        });
    }

    @Input('tpRouterLinkActiveFor') 
    set tpRouterLinkActiveFor(data: string[] | string) {
        if (Array.isArray(data)) {
            this.links = data;
        } else {
            this.links = (data || '').split(' ');
        }
    }

    @Input('tpRouterLinkActive')
    set tpRouterLinkActive(data: string[] | string) {
        if (Array.isArray(data)) {
            this.classes = <any>data;
        } else {
            this.classes = data.split(' ');
        }
    }

    ngOnChanges(changes: {}): any { this.update(); }
    ngOnDestroy(): any { this.subscription.unsubscribe(); }

    private update(): void {
        if (!this.links) return;

        const currentUrlTree = this.router.parseUrl(this.router.url);
        const isActiveLinks = this.reduceList(currentUrlTree, this.links);
        this.classes.forEach(
            c => this.renderer.setElementClass(
                this.element.nativeElement, c, isActiveLinks));
    }

    private reduceList(currentUrlTree: UrlTree, q: string[]): boolean {
        return q.reduce(
            (res: boolean, links: string) => 
                res || containsTree(currentUrlTree, this.router.parseUrl(links), this.nsRouterLinkActiveOptions.exact),
            false);
    }
}

@Component({
    selector: 'MenuList',
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [TPRouterLinkActive],
    template: `
    <ListView class="menu-list"
        separatorColor="#00000000"
        [items]="items"
        (itemTap)="onItemTap($event)"
        (itemLoading)="onItemLoading($event)">
        <template let-item="item">
            <StackLayout class="menu-item" 
                [tpRouterLinkActive]="['selected']"
                [tpRouterLinkActiveFor]="item.route.active || item.route.route">
                <StackLayout direction="horizontal" [class.separator]="item.section">
                    {{item.route.route}}
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
                route: '/offers',
                active: ['/offers', '/saved']
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

    @Output() public onMenuSelected: EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router) {}

    public onItemLoading(view) {
        const cell: UITableViewCell = view.ios;
        if (cell) {
            cell.backgroundColor = UIColor.clearColor();
            cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
        }
    }

    public onItemTap(item) {
        this.router.navigateByUrl(this.items[item.index].route.route);
        this.onMenuSelected.next(null);
    }
}
