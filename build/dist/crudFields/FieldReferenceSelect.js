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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var CrudTemplate_1 = require("./CrudTemplate");
var ReferenceSelect_1 = require("./fieldReference/ReferenceSelect");
var FieldReferenceSelect = /** @class */ (function (_super) {
    __extends(FieldReferenceSelect, _super);
    function FieldReferenceSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldReferenceSelect.prototype.render = function () {
        var opts = this.props.opts;
        if (!opts.reference) {
            throw new Error('Missing reference opts');
        }
        if (!opts.referenceName) {
            throw new Error('Missing referenceName opts');
        }
        var selectValue = opts.getField(opts.referenceName).value;
        return (React.createElement(ReferenceSelect_1.default, { value: selectValue, endpoint: opts.reference.endpoint, queryKey: opts.reference.queryKey, labelKey: opts.reference.labelKey, label: opts.helpField, onChange: this.handleEventChange }));
    };
    return FieldReferenceSelect;
}(CrudTemplate_1.default));
exports.default = FieldReferenceSelect;
//# sourceMappingURL=FieldReferenceSelect.js.map