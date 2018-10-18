"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
function use(db) {
    return connection_1.ConnectionManager.get(db);
}
exports.use = use;
//# sourceMappingURL=use.js.map