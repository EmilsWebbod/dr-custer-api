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
var apiRequest_1 = require("../../api/apiRequest");
var handleError_1 = require("../../api/handleError");
var ResourceState_1 = require("./resource/ResourceState");
var lodash_1 = require("lodash");
var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            busy: false,
            data: null,
            secondaryData: null,
            errorStatus: 0,
            error: ''
        };
        _this.fetch = function (opts) { return __awaiter(_this, void 0, void 0, function () {
            var _a, params, noErrorHandling, background, cb, endpoint, secondaryEndpoint, requests, _b, primary, secondary, state, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, params = _a.params, noErrorHandling = _a.noErrorHandling;
                        background = (opts && opts.background) || false;
                        cb = (opts && opts.cb) || undefined;
                        endpoint = (opts && opts.endpoint) || this.props.endpoint;
                        secondaryEndpoint = (opts && opts.secondaryEndpoint) || this.props.secondaryEndpoint;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        if (!background) {
                            this.setState({
                                busy: true
                            });
                        }
                        requests = [
                            apiRequest_1.default(endpoint, { data: params })
                        ];
                        if (secondaryEndpoint) {
                            requests.push(apiRequest_1.default(secondaryEndpoint, { data: params }));
                        }
                        return [4 /*yield*/, Promise.all(requests)];
                    case 2:
                        _b = _c.sent(), primary = _b[0], secondary = _b[1];
                        state = {
                            busy: false,
                            error: null,
                            errorStatus: 0,
                            data: primary && !(Array.isArray(primary) && primary.length === 0)
                                ? primary
                                : null
                        };
                        if (secondary) {
                            state.secondaryData =
                                secondary && !(Array.isArray(secondary) && secondary.length === 0)
                                    ? secondary
                                    : null;
                        }
                        this.setState(state);
                        if (typeof cb === 'function') {
                            cb(primary, secondary);
                        }
                        return [2 /*return*/, { data: primary, secondaryData: secondary }];
                    case 3:
                        error_1 = _c.sent();
                        if (!noErrorHandling) {
                            handleError_1.default(error_1);
                        }
                        this.setState({
                            busy: false,
                            data: null,
                            secondaryData: null,
                            errorStatus: error_1.status,
                            error: error_1.message
                        });
                        return [2 /*return*/, { data: null, secondaryData: null }];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.putField = function (fields, updateData) {
            var data = _this.state.data;
            if (data && updateData._id) {
                var works = _this.traverseFields(data, fields, 0, updateData._id);
                var fieldIndexes = works.split(',');
                var updated = _this.updateDataFromTraverse(fieldIndexes, 0, data, updateData);
                _this.setState({
                    data: updated
                });
            }
            else {
                console.error('Resource Data is null or updateData has no _id value');
            }
        };
        _this.traverseFields = function (data, fields, stepIndex, id) {
            var indexes = '';
            if (Array.isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                    var d = data[i];
                    var arrIndex = _this.traverseFields(d, fields, stepIndex, id);
                    if (arrIndex !== '') {
                        indexes += i + "," + arrIndex;
                    }
                }
            }
            else if (fields[stepIndex] && data[fields[stepIndex]]) {
                var objIndex = _this.traverseFields(data[fields[stepIndex]], fields, stepIndex + 1, id);
                if (objIndex) {
                    indexes += fields[stepIndex] + "," + objIndex;
                }
            }
            else if (data._id && data._id === id) {
                return "true";
            }
            return indexes;
        };
        _this.updateDataFromTraverse = function (path, pathIndex, data, set) {
            if (path[pathIndex] === 'true') {
                return set;
            }
            data[path[pathIndex]] = _this.updateDataFromTraverse(path, pathIndex + 1, data[path[pathIndex]], set);
            return data;
        };
        return _this;
    }
    Resource.prototype.componentDidMount = function () {
        var _a = this.props, dontFetch = _a.dontFetch, afterFetch = _a.afterFetch;
        if (!dontFetch) {
            this.fetch().then(function (_a) {
                var data = _a.data, secondaryData = _a.secondaryData;
                if (typeof afterFetch === 'function') {
                    afterFetch(data, secondaryData);
                }
            });
        }
    };
    Resource.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, endpoint = _a.endpoint, dontFetch = _a.dontFetch, afterFetch = _a.afterFetch, params = _a.params;
        if (!dontFetch &&
            (prevProps.endpoint !== endpoint || !lodash_1.isEqual(prevProps.params, params))) {
            this.fetch().then(function (_a) {
                var data = _a.data, secondaryData = _a.secondaryData;
                if (typeof afterFetch === 'function') {
                    afterFetch(data, secondaryData);
                }
            });
        }
    };
    Resource.prototype.render = function () {
        var _a = this.props, children = _a.children, emptyState = _a.emptyState, busyState = _a.busyState, errorState = _a.errorState, noEmptyState = _a.noEmptyState;
        var _b = this.state, busy = _b.busy, data = _b.data, secondaryData = _b.secondaryData, error = _b.error, errorStatus = _b.errorStatus;
        var childrenObj = {
            busy: busy,
            data: data,
            refresh: this.fetch,
            putField: this.putField
        };
        if (secondaryData) {
            childrenObj.secondaryData = secondaryData;
        }
        var state = errorStatus
            ? errorStatus
            : busy
                ? 'busy'
                : data
                    ? 'data'
                    : noEmptyState
                        ? 'data'
                        : 'empty';
        return (React.createElement(ResourceState_1.default, { state: state, busyState: busyState, errorState: errorState, errorStatus: errorStatus, error: error, emptyState: emptyState }, children(childrenObj)));
    };
    return Resource;
}(React.Component));
exports.default = Resource;
//# sourceMappingURL=Resource.js.map