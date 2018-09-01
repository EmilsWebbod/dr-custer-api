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
var CrudTemplate = /** @class */ (function (_super) {
    __extends(CrudTemplate, _super);
    function CrudTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleEventChange = function (e) {
            var opts = _this.props.opts;
            if (e.target) {
                if ('setValue' in opts) {
                    if (typeof opts.setValue === 'function') {
                        opts.setValue(opts.name, e.target.value, e.target.value);
                    }
                }
            }
        };
        return _this;
    }
    return CrudTemplate;
}(React.Component));
exports.default = CrudTemplate;
//# sourceMappingURL=CrudTemplate.js.map