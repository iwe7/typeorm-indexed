"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function Entity(nameOrOptions, maybeOptions) {
    const options = (typeof nameOrOptions === 'object'
        ? nameOrOptions
        : maybeOptions) || {};
    const name = typeof nameOrOptions === 'string' ? nameOrOptions : options.name;
    return (target) => {
        const args = {
            name: name ? name : target.name,
            options: options.options,
            target,
        };
        utils_1.getMetadataArgsStorage().tables.push(args);
    };
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map