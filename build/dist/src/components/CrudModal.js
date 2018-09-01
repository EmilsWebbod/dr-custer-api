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
var UpdateDelete_1 = require("./UpdateDelete");
var fields_1 = require("./crudModal/fields");
var CreateCrudField_1 = require("./crudModal/CreateCrudField");
var styles_1 = require("../styled/styles");
var SubdocumentReferenceInput_1 = require("./crudModal/SubdocumentReferenceInput");
var ReadChips_1 = require("../styled/ReadChips");
var CrudModal = /** @class */ (function (_super) {
    __extends(CrudModal, _super);
    function CrudModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            editing: _this.props.editing || !_this.props.id || false
        };
        _this.createRenderableFields = function (methods) {
            var fields = _this.props.fields;
            var editing = _this.state.editing;
            var renderableFields = {};
            for (var _i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
                var f = fields_2[_i];
                var field = _this.createRenderableField(methods, f, editing);
                if (field) {
                    renderableFields[f.name] = field;
                }
            }
            return renderableFields;
        };
        _this.createRenderableField = function (methods, f, allWriteable) {
            return function (writable) {
                var updateDeleteField = methods.getField(f.name);
                if (fields_1.shouldHideFieldIfConditionNotMet(f, methods)) {
                    if (updateDeleteField.value) {
                        methods.setValue(f.name, null, '');
                    }
                    return null;
                }
                if (fields_1.shouldRenderCustomComponent(f) &&
                    typeof f.renderComponent === 'function') {
                    return f.renderComponent(methods.setValue, methods.getField);
                }
                var extraProps = {
                    value: updateDeleteField.value,
                    label: updateDeleteField.label,
                    setValue: methods.setValue,
                    getField: methods.getField,
                    onChange: _this.onChange(methods, f),
                    onChangeReference: _this.onChangeReference(methods, f)
                };
                return allWriteable || writable ? (React.createElement(CreateCrudField_1.default, __assign({}, f, extraProps))) : (React.createElement(CreateCrudField_1.default, __assign({}, f, extraProps, { type: "read" })));
            };
        };
        _this.createRenderableSubdocuments = function (methods) {
            var subdocuments = _this.props.subdocuments;
            var editing = _this.state.editing;
            if (subdocuments) {
                return subdocuments.reduce(function (documents, doc) {
                    documents[doc.name] = _this.createRenerableSubdocument(methods, doc, editing);
                    return documents;
                }, {});
            }
            return {};
        };
        _this.createRenerableSubdocument = function (methods, doc, allWritable) { return function (writable) {
            return doc.reference && (allWritable || writable) ? (React.createElement(SubdocumentReferenceInput_1.default, { doc: doc, methods: methods })) : (React.createElement(React.Fragment, null,
                doc.helpField && React.createElement("label", null, doc.helpField),
                React.createElement(ReadChips_1.default, { chips: methods
                        .getSubdocument(doc.name)
                        .previews.map(function (p) { return ({ _id: p._id, label: p.label }); }), emptyState: doc.emptyState })));
        }; };
        _this.onChange = function (methods, f) { return function (e) {
            var value = e.currentTarget.value;
            if (f.type === 'file' &&
                e.currentTarget.files &&
                e.currentTarget.files.length > 0) {
                value = e.currentTarget.files[0];
            }
            methods.setValue(f.name, value, e.currentTarget.value);
        }; };
        _this.onChangeReference = function (methods, f) { return function (v, l) { return methods.setValue(f.name, v, l); }; };
        _this.onSave = function (response) {
            var _a = _this.props, onSave = _a.onSave, onClose = _a.onClose, refresh = _a.refresh, endpoint = _a.endpoint;
            if (typeof onSave === 'function') {
                onSave(response);
            }
            if (typeof onClose === 'function') {
                onClose();
            }
            if (typeof refresh === 'function') {
                refresh({
                    background: true,
                    endpoint: endpoint + "/" + response._id,
                    cb: function () {
                        _this.setState({
                            editing: false
                        });
                    }
                });
            }
        };
        _this.onDestroy = function (response) {
            var _a = _this.props, onDestroy = _a.onDestroy, onClose = _a.onClose;
            if (typeof onDestroy === 'function') {
                onDestroy(response);
            }
            if (typeof onClose === 'function') {
                onClose();
            }
        };
        return _this;
    }
    CrudModal.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, subdocuments = _a.subdocuments, Header = _a.Header, Footer = _a.Footer, props = __rest(_a, ["children", "subdocuments", "Header", "Footer"]);
        var editing = this.state.editing;
        var resourceBusy = this.props.busy;
        var Body = this.props.Body ? this.props.Body : styles_1.CrudBody;
        return (React.createElement(UpdateDelete_1.default, __assign({}, props, { subdocuments: subdocuments, onSave: this.onSave, onDestroy: this.onDestroy }), function (crudMethods) {
            return (React.createElement(styles_1.CrudStatusWrapper, { busy: resourceBusy || crudMethods.busy },
                React.createElement(styles_1.CrudModalForm, { onSubmit: crudMethods.save },
                    Header && React.createElement(Header, __assign({}, _this.props, crudMethods)),
                    React.createElement(Body, null, children({
                        editing: editing,
                        fields: _this.createRenderableFields(crudMethods),
                        subdocuments: _this.createRenderableSubdocuments(crudMethods)
                    })),
                    Footer && React.createElement(Footer, __assign({}, _this.props, crudMethods)))));
        }));
    };
    return CrudModal;
}(React.Component));
exports.default = CrudModal;
//# sourceMappingURL=CrudModal.js.map