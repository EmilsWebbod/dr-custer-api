"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shouldHideFieldIfConditionNotMet(f, methods) {
    if (f.hideIfSet || f.showIfSet) {
        var queryString = f.hideIfSet || f.showIfSet || '';
        var targetValue = methods.getField(queryString).value;
        if ((f.hideIfSet && Boolean(targetValue)) ||
            (f.showIfSet && !Boolean(targetValue))) {
            return true;
        }
    }
    return false;
}
exports.shouldHideFieldIfConditionNotMet = shouldHideFieldIfConditionNotMet;
exports.shouldRenderCustomComponent = function (f) {
    return f.type === 'customComponent';
};
//# sourceMappingURL=fields.js.map