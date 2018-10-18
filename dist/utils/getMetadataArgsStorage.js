"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_1 = require("../platform");
class MetadataArgsStorage {
    constructor() {
        this.tables = [];
        this.columns = [];
        this.primaryGeneratedColumns = [];
        this.primaryColumns = [];
    }
}
exports.MetadataArgsStorage = MetadataArgsStorage;
function getMetadataArgsStorage() {
    const globalScope = platform_1.PlatformTools.getGlobalVariable();
    if (!globalScope.typeormMetadataArgsStorage)
        globalScope.typeormMetadataArgsStorage = new MetadataArgsStorage();
    return globalScope.typeormMetadataArgsStorage;
}
exports.getMetadataArgsStorage = getMetadataArgsStorage;
//# sourceMappingURL=getMetadataArgsStorage.js.map