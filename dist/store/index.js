"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexedDbMiddleware = ({ dispatch, getState, }) => next => action => {
    console.log(action);
    return next(action);
};
//# sourceMappingURL=index.js.map