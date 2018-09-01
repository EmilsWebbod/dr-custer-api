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
var react_1 = require("react");
var crudHeaders_1 = require("./crudProvider/crudHeaders");
var CrudContext_1 = require("./crudProvider/CrudContext");
var CrudProvider = /** @class */ (function (_super) {
    __extends(CrudProvider, _super);
    function CrudProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrudProvider.prototype.render = function () {
        var _a = this.props, children = _a.children, crudComponents = _a.crudComponents, props = __rest(_a, ["children", "crudComponents"]);
        if (!children || !crudComponents) {
            console.error('Crud Wrapper need children and crudComponents');
            return null;
        }
        this.headers = new crudHeaders_1.default(props, true);
        return (React.createElement(CrudContext_1.default.Provider, { value: crudComponents }, react_1.Children.only(children)));
    };
    CrudProvider.defaultProps = {
        crudComponents: []
    };
    return CrudProvider;
}(React.Component));
exports.default = CrudProvider;
//# sourceMappingURL=CrudProvider.js.map