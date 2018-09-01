"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadFromStorage(store) {
    try {
        var serializedStore = localStorage.getItem(store);
        return JSON.parse(serializedStore || '');
    }
    catch (error) {
        return undefined;
    }
}
exports.loadFromStorage = loadFromStorage;
function saveToStorage(store, object) {
    try {
        localStorage.setItem(store, JSON.stringify(object));
    }
    catch (error) {
        // Ignore write errors
    }
}
exports.saveToStorage = saveToStorage;
function clearStorage() {
    try {
        localStorage.clear();
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.clearStorage = clearStorage;
//# sourceMappingURL=localStorage.js.map