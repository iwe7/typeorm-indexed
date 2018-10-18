"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./connection"), exports);
tslib_1.__exportStar(require("./platform"), exports);
var global_1 = require("./global");
exports.getGlobal = global_1.getGlobal;
tslib_1.__exportStar(require("./utils"), exports);
tslib_1.__exportStar(require("./decorators"), exports);
const connection_1 = require("./connection");
exports.default = connection_1.ConnectionManager;
tslib_1.__exportStar(require("./store"), exports);
//# sourceMappingURL=index.js.map