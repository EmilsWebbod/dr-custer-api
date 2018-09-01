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
var FieldInput_1 = require("./FieldInput");
var FieldCheckbox_1 = require("./FieldCheckbox");
var FieldTextArea_1 = require("./FieldTextArea");
var FieldSelect_1 = require("./FieldSelect");
var FieldReferenceInput_1 = require("./FieldReferenceInput");
var FieldReferenceSelect_1 = require("./FieldReferenceSelect");
var FieldDatePicker_1 = require("./FieldDatePicker");
var FieldImage_1 = require("./FieldImage");
var FieldRead_1 = require("./FieldRead");
var createComponent = function (type, component) { return ({
    type: type,
    component: component || FieldInput_1.default
}); };
var createMultipleComponents = function (types, component) { return types.map(function (type) { return createComponent(type, component); }); };
var defaultCrudFields = createMultipleComponents(['text', 'email', 'number']).concat(createMultipleComponents(['text-area', 'rich'], FieldTextArea_1.default), createMultipleComponents(['file', 'image', 'avatarImage'], FieldImage_1.default), [
    __assign({}, createComponent('select', FieldSelect_1.default)),
    __assign({}, createComponent('reference', FieldReferenceInput_1.default)),
    __assign({}, createComponent('reference-select', FieldReferenceSelect_1.default)),
    __assign({}, createComponent('number', FieldInput_1.default)),
    __assign({}, createComponent('checkbox', FieldCheckbox_1.default)),
    __assign({}, createComponent('date-picker', FieldDatePicker_1.default)),
    __assign({}, createComponent('read', FieldRead_1.default))
]);
exports.default = defaultCrudFields;
//# sourceMappingURL=defaultCrudFields.js.map