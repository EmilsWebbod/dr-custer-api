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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReferenceInput_1 = require("./fieldReference/ReferenceInput");
var CrudTemplate_1 = require("./CrudTemplate");
var FieldReferenceInput = /** @class */ (function (_super) {
    __extends(FieldReferenceInput, _super);
    function FieldReferenceInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldReferenceInput.prototype.render = function () {
        var _a = this.props, opts = _a.opts, props = __rest(_a, ["opts"]);
        if (!opts.reference) {
            throw new Error('Missing reference opts');
        }
        var extra = 'extra' in opts ? opts.extra : {};
        var defaultSelected = 'value' in opts
            ? opts.value
                ? [
                    {
                        _id: typeof opts.value === 'string' ? opts.value : '',
                        label: opts.label
                    }
                ]
                : []
            : [];
        return (React.createElement(ReferenceInput_1.default, __assign({ label: opts.helpField, endpoint: opts.reference.endpoint, queryKey: opts.reference.queryKey, labelKey: opts.reference.labelKey, required: opts.required, disabled: 'disabled' in opts ? opts.disabled : false, autoFocus: opts.autoFocus, onSelect: function (is) {
                if (is.length > 0) {
                    opts.onChangeReference(is[0]._id, is[0].label);
                }
            }, singular: true, defaultSelected: defaultSelected }, extra, props)));
    };
    return FieldReferenceInput;
}(CrudTemplate_1.default));
exports.default = FieldReferenceInput;
//# sourceMappingURL=FieldReferenceInput.js.map