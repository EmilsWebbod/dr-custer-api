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
var styles_1 = require("./styles");
var ReadChips = /** @class */ (function (_super) {
    __extends(ReadChips, _super);
    function ReadChips() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReadChips.prototype.render = function () {
        var _a = this.props, chips = _a.chips, emptyState = _a.emptyState;
        if (chips.length > 0) {
            return (React.createElement(styles_1.FlexContainer, null, chips.map(function (c) { return (React.createElement(styles_1.FlexItem, { key: c._id },
                React.createElement(styles_1.CrudChip, { label: c.label }))); })));
        }
        return React.createElement(styles_1.CrudStatusText, { block: true }, emptyState || 'Mangler');
    };
    return ReadChips;
}(React.Component));
exports.default = ReadChips;
//# sourceMappingURL=ReadChips.js.map