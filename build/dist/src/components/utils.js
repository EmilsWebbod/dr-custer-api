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
var apiRequest_1 = require("../../api/apiRequest");
// Should be used with a Array reduce.
// Reduces the valid fields to { [key: name]: value }
exports.isFieldEligibleForSave = function (props) { return function (obj, element) {
    var forceSaveAllField = props.forceSaveAllField, id = props.id, fields = props.fields;
    if (forceSaveAllField || !id || !fields) {
        obj[element.name] = element.value;
        return obj;
    }
    var field = fields.find(function (f) { return f.name === element.name; });
    if (!field || field.value !== element.value) {
        obj[element.name] = element.value;
    }
    return obj;
}; };
exports.updateInternalFieldFromValues = function (name, value, label, fields) { return function (f) {
    var field = __assign({}, f);
    var defaultField = (fields || []).find(function (x) { return x.name === name; });
    if (field.name === name) {
        field.value = value;
        field.label = label;
        if (defaultField) {
            field.changed = value !== defaultField.value;
        }
    }
    return field;
}; };
exports.markSubdocumentForAddition = function (name, data, subdocuments) { return function (s) {
    var doc = __assign({}, s);
    if (doc.name === name) {
        if (shouldCommitWithSubdocuments(name, data._id, subdocuments)) {
            doc.create.push(data);
            doc.changed = true;
        }
        else {
            doc.changed = false;
        }
        doc.previews.push(data);
        doc.delete = doc.delete.filter(function (d) { return d !== data._id; });
    }
    return doc;
}; };
exports.markSubdocumentForDeletion = function (name, id, subdocuments) { return function (s) {
    var doc = __assign({}, s);
    if (doc.name === name) {
        if (shouldCommitWithSubdocuments(name, id, subdocuments)) {
            doc.delete.push(id);
            doc.changed = true;
        }
        else {
            doc.changed = false;
        }
        doc.previews = doc.previews.filter(function (d) { return d._id !== id; });
        doc.create = doc.create.filter(function (d) { return d._id !== id; });
    }
    return doc;
}; };
function shouldCommitWithSubdocuments(name, id, subdocuments) {
    if (subdocuments) {
        var defaultDoc = subdocuments.find(function (d) { return d.name === name; });
        if (defaultDoc && !defaultDoc.previews.some(function (p) { return p._id === id; })) {
            return false;
        }
    }
    return true;
}
function createSubdocumentsRequests(doc, baseEndpoint) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, requests, _i, _b, createData;
        return __generator(this, function (_c) {
            requests = [];
            if (Array.isArray(doc.create)) {
                for (_i = 0, _b = doc.create; _i < _b.length; _i++) {
                    createData = _b[_i];
                    requests.push(apiRequest_1.default(baseEndpoint + "/" + doc.endpoint, {
                        method: 'POST',
                        data: (_a = {},
                            _a[doc.name] = createData.value,
                            _a)
                    }));
                }
            }
            Promise.all(requests).then(function (responses) {
                return responses.filter(function (x) { return x !== null; });
            });
            return [2 /*return*/];
        });
    });
}
exports.createSubdocumentsRequests = createSubdocumentsRequests;
function deleteSubdocumentRequest(doc, baseEndpoint) {
    return __awaiter(this, void 0, void 0, function () {
        var requests, _i, _a, deleteID;
        return __generator(this, function (_b) {
            requests = [];
            if (Array.isArray(doc.delete)) {
                for (_i = 0, _a = doc.delete; _i < _a.length; _i++) {
                    deleteID = _a[_i];
                    requests.push(apiRequest_1.default(baseEndpoint + "/" + doc.endpoint + "/" + deleteID, {
                        method: 'DELETE'
                    }));
                }
            }
            Promise.all(requests).then(function (responses) {
                return responses.filter(function (x) { return x !== null; });
            });
            return [2 /*return*/];
        });
    });
}
exports.deleteSubdocumentRequest = deleteSubdocumentRequest;
//# sourceMappingURL=utils.js.map