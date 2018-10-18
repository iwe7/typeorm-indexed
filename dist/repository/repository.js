"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositoryIndex_1 = require("./repositoryIndex");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class Repository {
    constructor(store) {
        this.store = store;
        this.indexs = {};
        this.createRepositoryIndexs();
    }
    add(value, key) {
        return this._handler(this.store.add(value, key));
    }
    clear() {
        return this._handler(this.store.clear());
    }
    count(key) {
        return this._handler(this.store.count(key));
    }
    createIndex(name, keyPath, options) {
        return this.store.createIndex(name, keyPath, options);
    }
    delete(key) {
        return this._handler(this.store.delete(key));
    }
    deleteIndex(name) {
        return this.store.deleteIndex(name);
    }
    get(query) {
        return this._handler(this.store.get(query));
    }
    getAll(query, count) {
        return this._handler(this.store.getAll(query, count));
    }
    getAllKeys(query, count) {
        return this._handler(this.store.getAllKeys(query, count));
    }
    getKey(query) {
        return this._handler(this.store.getKey(query));
    }
    index(name) {
        return new repositoryIndex_1.RepositoryIndex(this.store.index(name));
    }
    openCursor(range, direction) {
        return this._handler(this.store.openCursor(range, direction));
    }
    openKeyCursor(query, direction) {
        return this._handler(this.store.openKeyCursor(query, direction));
    }
    put(value, key) {
        return this._handler(this.store.put(value, key));
    }
    save(value, key) {
        return this.hasValue(value).pipe(operators_1.switchMap(res => {
            if (res === null) {
                return this.add(value, key);
            }
            else {
                return this.put({ ...res, ...value });
            }
        }));
    }
    getPrimaryValue(value) {
        const key = this.getKeyPath();
        if (this._hasOwnProperty(key, value)) {
            return rxjs_1.of(value[`${key}`]);
        }
        else {
            return rxjs_1.of(null);
        }
    }
    hasValue(value) {
        const key = this.getKeyPath();
        if (this._hasOwnProperty(key, value)) {
            return this.get(value[`${key}`]);
        }
        else {
            const indexs = this.getIndexNames();
            for (let i = 0; i < indexs.length; i++) {
                const key = indexs.item(i);
                if (this._hasOwnProperty(key, value)) {
                    return this.index(key).get(value[`${key}`]);
                }
            }
            return rxjs_1.of(null);
        }
    }
    remove(key) {
        return this.delete(key);
    }
    insert(value, key) {
        return this.add(value, key);
    }
    update(value, key) {
        return this.put(value, key);
    }
    find(query) {
        return this.getAll(query);
    }
    findOne(query) {
        return this.get(query);
    }
    _hasOwnProperty(key, value) {
        return Object.prototype.hasOwnProperty.call(value, key);
    }
    createRepositoryIndexs() {
        const indexs = this.getIndexNames();
        for (let i = 0; i < indexs.length; i++) {
            const item = indexs.item(i);
            this.indexs[`${item}`] = this.index(item);
        }
    }
    getKeyPath() {
        return this.store.keyPath;
    }
    getIndexNames() {
        return this.store.indexNames;
    }
    _handler(request) {
        this._error(request);
        return this._fromEvent(request);
    }
    _fromEvent(request, type = 'success') {
        return rxjs_1.fromEvent(request, type).pipe(operators_1.map((res) => {
            return res.target.result;
        }));
    }
    _error(request) {
        request.onerror = (e) => {
            console.error(e.target.error);
        };
    }
}
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map