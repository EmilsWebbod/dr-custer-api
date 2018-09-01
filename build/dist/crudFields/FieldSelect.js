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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var CrudTemplate_1 = require("./CrudTemplate");
var FieldSelect = /** @class */ (function (_super) {
    __extends(FieldSelect, _super);
    function FieldSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldSelect.prototype.render = function () {
        var opts = this.props.opts;
        var value = this.props.opts.getField(this.props.opts.name).value;
        return (React.createElement("select", __assign({ name: opts.name, placeholder: opts.helpField, value: value, onChange: this.handleEventChange, disabled: opts.disabled }, opts.extra), opts.options && opts.options.map(function (option) {
            return React.createElement("option", { key: option.value, value: option.value }, option.label);
        })));
    };
    return FieldSelect;
}(CrudTemplate_1.default));
exports.default = FieldSelect;
//# sourceMappingURL=FieldSelect.js.map