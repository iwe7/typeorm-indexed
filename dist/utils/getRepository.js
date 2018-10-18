"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
function getRepository(name, mode) {
    return connection_1.ConnectionManager.current.getRepository(name, mode);
}
exports.getRepository = getRepository;
//# sourceMappingURL=getRepository.js.map