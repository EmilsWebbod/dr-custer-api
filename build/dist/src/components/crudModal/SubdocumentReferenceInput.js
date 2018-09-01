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
var ReferenceInput_1 = require("../../../crudFields/fieldReference/ReferenceInput");
var SubdocumentReferenceInput = /** @class */ (function (_super) {
    __extends(SubdocumentReferenceInput, _super);
    function SubdocumentReferenceInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubdocumentReferenceInput.prototype.render = function () {
        var _a = this.props, doc = _a.doc, methods = _a.methods;
        if (!doc.reference) {
            console.error('Subdocument with name', doc.name, 'has no reference');
            return null;
        }
        return (React.createElement(ReferenceInput_1.default, { label: doc.helpField, endpoint: doc.reference.endpoint, queryKey: doc.reference.queryKey, labelKey: doc.reference.labelKey, onAdd: function (i) {
                return methods.addToSubdocument(doc.name, {
                    _id: i._id,
                    value: i._id,
                    label: i.label
                });
            }, onRemove: function (id) { return methods.deleteFromSubdocument(doc.name, id); }, defaultSelected: methods.getSubdocument(doc.name).previews.map(function (p) { return ({
                _id: p._id,
                label: p.label
            }); }), required: doc.required, autoFocus: doc.autoFocus }));
    };
    return SubdocumentReferenceInput;
}(React.Component));
exports.default = SubdocumentReferenceInput;
//# sourceMappingURL=SubdocumentReferenceInput.js.map