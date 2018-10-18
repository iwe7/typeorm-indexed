"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
function getRepository(name, mode) {
    return connection_1.ConnectionManager.current.getRepository(name, mode);
}
exports.getRepository = getRepository;
function select(name, mode) {
    return getRepository(name, mode);
}
exports.select = select;
function selectTable(table, name, mode) {
    connection_1.ConnectionManager.get(table);
    return select(name, mode);
}
exports.selectTable = selectTable;
//# sourceMappingURL=getRepository.js.map