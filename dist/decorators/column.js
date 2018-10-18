"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function Column(options) {
    return (object, propertyKey) => {
        options = options || {};
        options.name = options.name || propertyKey;
        const args = {
            target: object.constructor,
            propertyName: propertyKey,
            options: options,
        };
        utils_1.getMetadataArgsStorage().columns.push(args);
    };
}
exports.Column = Column;
//# sourceMappingURL=column.js.map