"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexedDB = (win = window) => win.indexedDB || win.webkitIndexedDB || win.mozIndexedDB || win.msIndexedDB;
exports.IDBTransaction = (win = window) => win.IDBTransaction ||
    win.webkitIDBTransaction ||
    win.msIDBTransaction || { READ_WRITE: 'readwrite' };
exports.IDBKeyRange = (win = window) => win.IDBKeyRange || win.webkitIDBKeyRange || win.msIDBKeyRange;
//# sourceMappingURL=check.js.map