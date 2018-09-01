"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
var pulse = styled_components_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  0% {\n    opacity: 0.15\n  }\n  50% {\n    opacity: 0.3\n  }\n  100% {\n    opacity: 0.15\n  }\n"], ["\n  0% {\n    opacity: 0.15\n  }\n  50% {\n    opacity: 0.3\n  }\n  100% {\n    opacity: 0.15\n  }\n"])));
var StatusWrapper = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  transition: opacity 1s ease-in-out;\n\n  ", ";\n"], ["\n  transition: opacity 1s ease-in-out;\n\n  ",
    ";\n"])), function (props) {
    return props.busy && styled_components_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      cursor: wait;\n      animation: ", " 1s infinite ease-in-out;\n    "], ["\n      cursor: wait;\n      animation: ", " 1s infinite ease-in-out;\n    "])), pulse);
});
exports.default = StatusWrapper;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=StatusWrapper.js.map