"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class RepositoryIndex {
    constructor(store) {
        this.store = store;
    }
    count(key) {
        return this._handler(this.store.count(key));
    }
    get(key) {
        return this._handler(this.store.get(key));
    }
    getAll(query, count) {
        return this._handler(this.store.getAll(query, count));
    }
    getAllKeys(query, count) {
        return this._handler(this.store.getAllKeys(query, count));
    }
    getKey(key) {
        return this._handler(this.store.getKey(key));
    }
    openCursor(range, direction) {
        return this._handler(this.store.openCursor(range, direction));
    }
    openKeyCursor(range, direction) {
        return this._handler(this.store.openKeyCursor(range, direction));
    }
    _handler(request) {
        this._error(request);
        return this._fromEvent(request);
    }
    _fromEvent(request, type = 'success') {
        return rxjs_1.fromEvent(request, type).pipe(operators_1.map((res) => res.target.result));
    }
    _error(request) {
        request.onerror = (e) => {
            console.error(e.target.error);
        };
    }
}
exports.RepositoryIndex = RepositoryIndex;
//# sourceMappingURL=repositoryIndex.js.map