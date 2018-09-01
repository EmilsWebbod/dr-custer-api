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
var CrudModal_1 = require("../CrudModal");
var styles_1 = require("../../styled/styles");
function SimpleCrud(_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var suppliedFields = props.fields;
    var suppliedSubdocuments = props.subdocuments;
    return (React.createElement(CrudModal_1.default, __assign({}, props, { editing: true, cancelCloses: true }), function (_a) {
        var editing = _a.editing, fields = _a.fields, subdocuments = _a.subdocuments;
        return (React.createElement(React.Fragment, null,
            React.createElement(styles_1.FlexContainer, { direction: "column" },
                (suppliedFields ? suppliedFields : []).map(function (f, k) {
                    if (f.hidden) {
                        return null;
                    }
                    var renderedField = fields[f.name]();
                    return renderedField ? (React.createElement(styles_1.FlexItem, { key: k }, renderedField)) : null;
                }),
                suppliedSubdocuments &&
                    suppliedSubdocuments.map(function (s, k) {
                        var renderedSubdocument = subdocuments[s.name]();
                        return renderedSubdocument ? (React.createElement(styles_1.FlexItem, { key: k }, renderedSubdocument)) : null;
                    }))));
    }));
}
exports.default = SimpleCrud;
//# sourceMappingURL=SimpleCrud.js.map