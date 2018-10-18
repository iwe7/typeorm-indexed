"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
function createConnection(options) {
    let connection = connection_1.ConnectionManager.get(options.name);
    if (connection) {
        return connection.connect();
    }
    connection = connection_1.ConnectionManager.create(options);
    return connection.connect();
}
exports.createConnection = createConnection;
function createConnections(options) {
    return options.map(opt => createConnection(opt));
}
exports.createConnections = createConnections;
//# sourceMappingURL=createConnection.js.map