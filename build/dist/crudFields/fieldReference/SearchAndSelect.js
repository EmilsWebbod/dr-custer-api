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
var SearchAndSelect = /** @class */ (function (_super) {
    __extends(SearchAndSelect, _super);
    function SearchAndSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //state = {
    //  selectedItems: this.props.selectedItems || []
    //};
    SearchAndSelect.prototype.render = function () {
        return 'todo: Rewrite SearchAndSelect';
    };
    return SearchAndSelect;
}(React.Component));
exports.default = SearchAndSelect;
//# sourceMappingURL=SearchAndSelect.js.map