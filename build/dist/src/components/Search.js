"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var uuid = require("uuid/v4");
var lodash_1 = require("lodash");
var apiRequest_1 = require("../../api/apiRequest");
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            query: _this.props.query || {},
            hasQueried: false,
            busy: false,
            results: [],
            hasMore: true,
            operationID: uuid()
        };
        _this.requestCounter = 0;
        _this.search = lodash_1.throttle(function (paginate) { return __awaiter(_this, void 0, void 0, function () {
            var _a, endpoint, limit, onQueryComplete, _b, query, busy, results, currentRequest, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, endpoint = _a.endpoint, limit = _a.limit, onQueryComplete = _a.onQueryComplete;
                        _b = this.state, query = _b.query, busy = _b.busy, results = _b.results;
                        currentRequest = this.requestCounter + 1;
                        if (busy) {
                            return [2 /*return*/, false];
                        }
                        this.setState({
                            busy: true
                        });
                        query.limit = limit.toString();
                        if (paginate) {
                            query.skip = results.length.toString();
                        }
                        else {
                            query.skip = '0';
                        }
                        return [4 /*yield*/, apiRequest_1.default(endpoint, { data: query })];
                    case 1:
                        response = _c.sent();
                        if (currentRequest <= this.requestCounter) {
                            return [2 /*return*/];
                        }
                        this.setState({
                            busy: false,
                            results: paginate ? results.concat(response) : response,
                            hasMore: response.length === limit
                        });
                        this.requestCounter = currentRequest;
                        if (typeof onQueryComplete === 'function') {
                            onQueryComplete();
                        }
                        return [2 /*return*/];
                }
            });
        }); }, 500);
        _this.constructQuery = function (key, value) {
            var _a;
            var query = _this.state.query;
            query = __assign({}, query, (_a = {}, _a[key] = value, _a));
            for (var k in query) {
                if (!query[k]) {
                    delete query[k];
                }
            }
            _this.setState({
                hasQueried: Object.keys(query).length > 0,
                query: query,
                hasMore: true
            }, function () { return _this.search(false); });
        };
        _this.paginate = function () {
            _this.search(true);
        };
        _this.clear = function () {
            _this.setState({
                query: {},
                hasQueried: false,
                operationID: uuid()
            }, _this.search);
        };
        _this.createResultSpec = function () {
            var _a = _this.state, query = _a.query, results = _a.results;
            return __assign({}, query, { skip: '0', limit: results.length.toString() });
        };
        return _this;
    }
    Search.prototype.render = function () {
        var children = this.props.children;
        var _a = this.state, busy = _a.busy, hasQueried = _a.hasQueried, results = _a.results, hasMore = _a.hasMore;
        var _b = this, constructQuery = _b.constructQuery, paginate = _b.paginate, clear = _b.clear;
        return children({
            busy: busy,
            query: constructQuery,
            hasQueried: hasQueried,
            results: results,
            hasMore: hasMore,
            paginate: paginate,
            clear: clear,
            resultSpec: this.createResultSpec()
        });
    };
    Search.defaultProps = {
        limit: 20
    };
    return Search;
}(React.Component));
exports.default = Search;
//# sourceMappingURL=Search.js.map