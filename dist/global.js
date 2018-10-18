"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __window = typeof window !== 'undefined' && window;
const __self = typeof self !== 'undefined' &&
    typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope &&
    self;
const __global = typeof global !== 'undefined' && global;
const _global = __global || __window || __self;
exports.getGlobal = () => _global;
exports.default = exports.getGlobal;
//# sourceMappingURL=global.js.map