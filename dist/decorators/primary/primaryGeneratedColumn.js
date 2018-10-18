"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
function PrimaryGeneratedColumn(options) {
    return (target, propertyName) => {
        const args = {
            ...options,
            target: target.constructor,
            propertyName,
        };
        args.name = args.name || propertyName;
        args.keyPath = args.keyPath || args.name;
        args.options = args.options || {};
        args.options.unique = true;
        utils_1.getMetadataArgsStorage().primaryGeneratedColumns.push(args);
    };
}
exports.PrimaryGeneratedColumn = PrimaryGeneratedColumn;
//# sourceMappingURL=primaryGeneratedColumn.js.map