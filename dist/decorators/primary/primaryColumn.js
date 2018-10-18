"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
function PrimaryColumn(options) {
    return (target, propertyName) => {
        const args = {
            ...options,
            target: target.constructor,
            propertyName,
        };
        args.name = args.name || propertyName;
        args.keyPath = args.keyPath || args.name;
        utils_1.getMetadataArgsStorage().primaryColumns.push(args);
    };
}
exports.PrimaryColumn = PrimaryColumn;
//# sourceMappingURL=primaryColumn.js.map