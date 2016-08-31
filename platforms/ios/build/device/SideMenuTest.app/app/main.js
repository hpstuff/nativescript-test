"use strict";
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var application_1 = require('nativescript-angular/application');
var http_1 = require('nativescript-angular/http');
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var app_component_1 = require('./pages/app.component');
var offers_1 = require('./services/offers');
var server_1 = require('./services/server');
application_1.nativeScriptBootstrap(app_component_1.AppComponent, [
    angular_1.SIDEDRAWER_PROVIDERS,
    http_1.NS_HTTP_PROVIDERS,
    app_component_1.AppRouterProviders,
    server_1.ServerService,
    offers_1.OffersService
], { startPageActionBarHidden: false });
//# sourceMappingURL=main.js.map