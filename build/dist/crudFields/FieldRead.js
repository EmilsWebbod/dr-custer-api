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
function renderStatusText(emptyState) {
    return React.createElement("p", null, emptyState || 'Mangler');
}
var FieldRead = /** @class */ (function (_super) {
    __extends(FieldRead, _super);
    function FieldRead() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldRead.prototype.render = function () {
        var _a = this.props.opts, getField = _a.getField, value = _a.value, emptyState = _a.emptyState, helpField = _a.helpField;
        var field = getField(value);
        var elem;
        if (field.label) {
            elem = React.createElement("p", null, field.label);
        }
        else {
            elem = renderStatusText(emptyState);
        }
        return (React.createElement(React.Fragment, null,
            helpField && React.createElement("label", null, helpField),
            elem));
    };
    return FieldRead;
}(CrudTemplate_1.default));
exports.default = FieldRead;
//# sourceMappingURL=FieldRead.js.map