"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRepository_1 = require("./getRepository");
const connection_1 = require("../connection");
function select(name, mode) {
    return getRepository_1.getRepository(name, mode);
}
exports.select = select;
function selectTable(table, name, mode) {
    connection_1.ConnectionManager.get(table);
    return select(name, mode);
}
exports.selectTable = selectTable;
//# sourceMappingURL=select.js.map