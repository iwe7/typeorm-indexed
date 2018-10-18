"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class ConnectionManager {
    static has(name) {
        return this.connections.has(name);
    }
    static get(name) {
        this.current = this.connections.get(name);
        return this.current;
    }
    static create(options) {
        this.current = new connection_1.Connection(options);
        this.connections.set(options.name, this.current);
        return this.current;
    }
    static of(options) {
        return this.create(options);
    }
    static setReady() {
        this._ready = true;
        this._ready$.next(true);
    }
    static ready() {
        return this._ready$.pipe(operators_1.distinctUntilChanged(), operators_1.filter(res => res));
    }
}
ConnectionManager.connections = new Map();
ConnectionManager._ready = false;
ConnectionManager._ready$ = new rxjs_1.BehaviorSubject(false);
exports.ConnectionManager = ConnectionManager;
//# sourceMappingURL=connectionManager.js.map