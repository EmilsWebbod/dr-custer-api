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
var StatusWrapper_1 = require("../../styled/StatusWrapper");
var ResourceState = /** @class */ (function (_super) {
    __extends(ResourceState, _super);
    function ResourceState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceState.prototype.render = function () {
        switch (this.props.state) {
            case 'empty':
                return this.renderEmpty();
            case 'busy':
                return this.renderBusy();
            case 'data':
                return this.renderData();
            default:
                return this.renderError();
        }
    };
    ResourceState.prototype.renderEmpty = function () {
        return this.props.emptyState || 'Fant ikke ressurs';
    };
    ResourceState.prototype.renderBusy = function () {
        var busyState = this.props.busyState;
        return (React.createElement(StatusWrapper_1.default, { busy: true }, busyState ? busyState : this.props.children));
    };
    ResourceState.prototype.renderData = function () {
        return this.props.children;
    };
    ResourceState.prototype.renderError = function () {
        var _a = this.props, state = _a.state, errorState = _a.errorState, errorStatus = _a.errorStatus, error = _a.error;
        var DefaultError = function () { return (React.createElement(React.Fragment, null,
            state,
            ": ",
            error,
            " ",
            React.createElement("br", null),
            React.createElement("br", null),
            "Kontakt oss hvis dette problemet vedvarer, informasjonen finner du nederst p\u00E5 siden.")); };
        if (errorState) {
            return errorState({
                status: errorStatus,
                message: error
            }, DefaultError);
        }
        return React.createElement(DefaultError, null);
    };
    ResourceState.defaultProps = {
        emptyState: 'Fant ikke ressurs'
    };
    return ResourceState;
}(React.Component));
exports.default = ResourceState;
//# sourceMappingURL=ResourceState.js.map