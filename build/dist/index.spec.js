"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var index_1 = require("./index");
ava_1.default('NUMBER FORMATER', function (t) {
    t.is(index_1.default(1), '1');
});
ava_1.default('NUMBER FORMATER 2', function (t) {
    t.is(index_1.default(2333), '2,333');
});
//# sourceMappingURL=index.spec.js.map