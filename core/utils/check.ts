export const indexedDB = (win: any = window): IDBFactory =>
  win.indexedDB || win.webkitIndexedDB || win.mozIndexedDB || win.msIndexedDB;
export const IDBTransaction = (win: any = window) =>
  win.IDBTransaction ||
  win.webkitIDBTransaction ||
  win.msIDBTransaction || { READ_WRITE: 'readwrite' };
export const IDBKeyRange = (win: any = window) =>
  win.IDBKeyRange || win.webkitIDBKeyRange || win.msIDBKeyRange;
