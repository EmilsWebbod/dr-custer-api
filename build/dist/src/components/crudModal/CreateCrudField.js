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
var CrudContext_1 = require("../../crudProvider/CrudContext");
var byType = function (t) { return function (_a) {
    var type = _a.type;
    return type === t;
}; };
var CreateCrudField = /** @class */ (function (_super) {
    __extends(CreateCrudField, _super);
    function CreateCrudField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getFieldFromType = function (t) { return function (fields) {
            if (fields) {
                var component = fields.find(byType(t));
                if (component) {
                    return React.createElement(component.component, { opts: _this.props });
                }
                console.error('Could not find any CrudContext with type: ', t);
            }
            else {
                console.error('No fields were provided', t);
            }
            return null;
        }; };
        return _this;
    }
    CreateCrudField.prototype.render = function () {
        var type = this.props.type;
        return (React.createElement(CrudContext_1.default.Consumer, null, this.getFieldFromType(type)));
    };
    return CreateCrudField;
}(React.Component));
exports.default = CreateCrudField;
//# sourceMappingURL=CreateCrudField.js.map