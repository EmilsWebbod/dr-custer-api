"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var localStorage_1 = require("../../api/localStorage");
var initialAuthorization = {
    endPoint: '',
    type: 'Basic'
};
var instance;
var CrudHeaders = /** @class */ (function () {
    function CrudHeaders(params, updateParams) {
        this.url = '';
        this.headers = {};
        this.authorization = initialAuthorization;
        this.noAuth = false;
        var loadedAuth = localStorage_1.loadFromStorage('authorization');
        if (loadedAuth &&
            (loadedAuth.token && loadedAuth.token !== '') &&
            params &&
            params.authorization) {
            delete params.authorization.token;
        }
        if (!instance) {
            if (!params) {
                var error = 'Failed to initialize CrudHeader. Given no Params';
                console.error(error);
                throw error;
            }
            instance = this;
            this.setParams(params);
        }
        else if (updateParams && params) {
            instance.setParams(params);
        }
        return instance;
    }
    CrudHeaders.prototype.setAuthorization = function (auth) {
        var loadedAuth = localStorage_1.loadFromStorage('authorization') || {};
        if (loadedAuth && loadedAuth.token !== '') {
            this.authorization = __assign({}, loadedAuth, auth);
        }
        else {
            this.authorization = __assign({}, this.authorization, auth);
        }
        localStorage_1.saveToStorage('authorization', this.authorization);
    };
    CrudHeaders.prototype.clearAutorization = function () {
        this.authorization = __assign({}, this.authorization, { token: '', refreshToken: '' });
        localStorage_1.clearStorage();
        if (typeof this.logout === 'function') {
            this.logout();
        }
    };
    CrudHeaders.prototype.setParams = function (params) {
        this.url = params.url || '';
        this.headers = params.headers || {};
        this.noAuth = params.noAuth || false;
        this.logout = params.logout || this.logout;
        if (!this.noAuth && params.authorization) {
            this.setAuthorization(params.authorization);
        }
    };
    return CrudHeaders;
}());
exports.default = CrudHeaders;
//# sourceMappingURL=crudHeaders.js.map