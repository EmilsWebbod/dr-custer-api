"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
var React = require("react");
var FlexContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: ", ";\n"], ["\n  display: flex;\n  flex-direction: ", ";\n"])), function (props) { return props.direction || 'row'; });
exports.FlexContainer = FlexContainer;
var FlexItem = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  flex: 1;\n  margin-bottom: 0.5rem;\n"], ["\n  flex: 1;\n  margin-bottom: 0.5rem;\n"])));
exports.FlexItem = FlexItem;
var Form = styled_components_1.default.form(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n"], ["\n  margin: 0;\n  padding: 0;\n"])));
var CrudModalForm = Form.extend(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n\n  ", ";\n"], ["\n  max-height: 90vh;\n  display: flex;\n  flex-direction: column;\n\n  ",
    ";\n"])), function (props) {
    return props.fullScreen && styled_components_1.css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      max-height: none;\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n    "], ["\n      max-height: none;\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n    "])));
});
exports.CrudModalForm = CrudModalForm;
var crudPulse = styled_components_1.keyframes(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  0% {\n    opacity: 0.15\n  }\n  50% {\n    opacity: 0.3\n  }\n  100% {\n    opacity: 0.15\n  }\n"], ["\n  0% {\n    opacity: 0.15\n  }\n  50% {\n    opacity: 0.3\n  }\n  100% {\n    opacity: 0.15\n  }\n"])));
exports.crudPulse = crudPulse;
var CrudStatusWrapper = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  transition: opacity 1s ease-in-out;\n\n  ", ";\n"], ["\n  transition: opacity 1s ease-in-out;\n\n  ",
    ";\n"])), function (props) {
    return props.busy && styled_components_1.css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      cursor: wait;\n      animation: ", " 1s infinite ease-in-out;\n    "], ["\n      cursor: wait;\n      animation: ", " 1s infinite ease-in-out;\n    "])), crudPulse);
});
exports.CrudStatusWrapper = CrudStatusWrapper;
var CrudBody = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  padding: 1rem;\n"], ["\n  padding: 1rem;\n"])));
exports.CrudBody = CrudBody;
var CrudStatusText = styled_components_1.default.span(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  display: inline-block;\n  font-size: 0.9em;\n  text-transform: uppercase;\n  color: ", ";\n  font-weight: 300;\n\n  ", ";\n"], ["\n  display: inline-block;\n  font-size: 0.9em;\n  text-transform: uppercase;\n  color: ", ";\n  font-weight: 300;\n\n  ",
    ";\n"])), function (props) { return props.theme.palette.secondary.light; }, function (props) {
    return props.block && styled_components_1.css(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n      display: block;\n    "], ["\n      display: block;\n    "])));
});
exports.CrudStatusText = CrudStatusText;
var StyledChip = styled_components_1.default.div(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  border: 1px solid ", ";\n  border-radius: 50%;\n  padding: 0.5rem;\n"], ["\n  border: 1px solid ", ";\n  border-radius: 50%;\n  padding: 0.5rem;\n"])), function (props) { return props.theme.palette.primary.main; });
var CrudChip = function (_a) {
    var label = _a.label;
    return (React.createElement(StyledChip, null, label));
};
exports.CrudChip = CrudChip;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
//# sourceMappingURL=styles.js.map