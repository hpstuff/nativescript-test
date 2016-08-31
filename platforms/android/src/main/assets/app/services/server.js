"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/Rx');
var HEADERS = new http_1.Headers({ 'Content-Type': 'application/json' });
var ServerService = (function () {
    function ServerService(_http) {
        this._http = _http;
        this.BASE_URL = 'http://labs.athlonproduction.com/athlon/datasource/api';
    }
    ServerService.prototype.post = function (path, data) {
        return this._http.get(this.BASE_URL + path, { headers: HEADERS })
            .map(function (res) { return res.json(); });
    };
    ServerService.prototype.get = function (path) {
        return this._http.get(this.BASE_URL + path)
            .map(function (res) { return res.json(); });
    };
    ServerService.prototype.put = function (path, id, data) {
        return this._http.put(this.BASE_URL + path + '/' + id, data)
            .map(function (res) { return res.json(); });
    };
    ServerService.prototype.delete = function (path, id) {
        return this._http.delete(this.BASE_URL + path + '/' + id);
    };
    ServerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ServerService);
    return ServerService;
}());
exports.ServerService = ServerService;
//# sourceMappingURL=server.js.map