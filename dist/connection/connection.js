"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("./../repository");
const utils_1 = require("../utils");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const utils_2 = require("../utils");
const connectionManager_1 = require("./connectionManager");
class Connection extends rxjs_1.BehaviorSubject {
    constructor(options) {
        super({});
        this.isConnected = false;
        this.subscription = [];
        this.tables = [];
        this.columns = [];
        this.primaryColumns = [];
        this.primaryGeneratedColumns = [];
        this.name = options.name;
        this.version = options.version || 1;
        this.entities = options.entities || [];
        const store = utils_2.getMetadataArgsStorage();
        this.tables = store.tables;
        this.columns = store.columns;
        this.primaryColumns = store.primaryColumns;
        this.primaryGeneratedColumns = store.primaryGeneratedColumns;
    }
    connect() {
        this.dbOpenDBRequest = utils_1.indexedDB().open(this.name, this.version);
        const success = this._openSuccess();
        this._openBlocked();
        this._openUpgradeneeded();
        this._openError();
        return success.pipe(operators_1.tap(res => {
            res && connectionManager_1.ConnectionManager.setReady();
        }));
    }
    close() {
        this.subscription.map(res => res.unsubscribe());
        this.subscription = [];
        this.db && this.db.close();
    }
    getMetadata(target) {
        const table = this.tables.find(table => table.target === target);
        const primaryGeneratedColumns = this.primaryGeneratedColumns.find(parimary => parimary.target === target);
        const primaryColumns = this.primaryColumns.filter(parimary => parimary.target === target);
        const columns = this.columns.filter(parimary => parimary.target === target);
        return {
            table,
            primaryGeneratedColumns,
            primaryColumns,
            columns,
        };
    }
    getStore(name, mode) {
        return this._getTransaction(name, mode).objectStore(name);
    }
    getRepository(name, mode = 'readwrite') {
        name = name || this.currentName;
        if (!name) {
            console.error(`getRepository name empty error`);
        }
        const objectStore = this.getStore(name, mode);
        return new repository_1.Repository(objectStore);
    }
    _getTransaction(name, mode) {
        this.currentName = name;
        return this.db.transaction(name, mode);
    }
    _init() {
        const tables = this.entities.map(entity => this.tables.find(table => table.target === entity));
        tables.map(table => this._createTable(table));
    }
    _createTable(table) {
        const primaryGeneratedColumn = this.primaryGeneratedColumns.find(primary => primary.target === table.target);
        let options = { ...table.options };
        if (primaryGeneratedColumn) {
            options.autoIncrement = true;
            options.keyPath = primaryGeneratedColumn.keyPath;
        }
        const store = this.db.createObjectStore(table.name, options);
        const primaryColumns = this.primaryColumns.filter(primary => primary.target === table.target);
        primaryColumns.map(primary => this._createPrimary(primary, store));
    }
    _createPrimary(column, store) {
        column.options = column.options || {};
        column.options.unique = true;
        column.options.multiEntry = true;
        store.createIndex(column.name, column.keyPath || column.name, column.options);
    }
    _openBlocked() {
        this.subscription.push(rxjs_1.fromEvent(this.dbOpenDBRequest, 'blocked').subscribe());
    }
    _openUpgradeneeded() {
        this.subscription.push(rxjs_1.fromEvent(this.dbOpenDBRequest, 'upgradeneeded')
            .pipe(operators_1.tap((event) => {
            const target = event.target;
            this.db = target.result;
            this._init();
        }))
            .subscribe());
    }
    _openSuccess() {
        return rxjs_1.fromEvent(this.dbOpenDBRequest, 'success').pipe(operators_1.map((event) => {
            const target = event.target;
            this.db = target.result;
            this.isConnected = true;
            return this;
        }));
    }
    _openError() {
        this.subscription.push(rxjs_1.fromEvent(this.dbOpenDBRequest, 'error')
            .pipe(operators_1.tap((res) => {
            const target = res.target;
            this.error(target.errorCode);
        }))
            .subscribe());
    }
}
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map