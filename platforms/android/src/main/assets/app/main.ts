// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { nativeScriptBootstrap } from 'nativescript-angular/application';
import { NS_HTTP_PROVIDERS } from 'nativescript-angular/http';
import { SIDEDRAWER_PROVIDERS } from "nativescript-telerik-ui/sidedrawer/angular";
import { AppComponent, AppRouterProviders } from './pages/app.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { OffersService } from './services/offers';
import { ServerService } from './services/server';

nativeScriptBootstrap(AppComponent, [
    SIDEDRAWER_PROVIDERS,
    NS_HTTP_PROVIDERS,
    AppRouterProviders,
    ServerService,
    OffersService
], { startPageActionBarHidden: false });
