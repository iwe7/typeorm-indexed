import { Observable } from 'rxjs';
export declare class RepositoryIndex {
    private store;
    constructor(store: IDBIndex);
    count(key?: IDBValidKey | IDBKeyRange): Observable<any>;
    get(key: IDBValidKey | IDBKeyRange): Observable<any>;
    getAll(query?: IDBValidKey | IDBKeyRange, count?: number): Observable<any>;
    getAllKeys(query?: IDBValidKey | IDBKeyRange, count?: number): Observable<any>;
    getKey(key: IDBValidKey | IDBKeyRange): Observable<any>;
    openCursor(range?: IDBValidKey | IDBKeyRange, direction?: IDBCursorDirection): Observable<any>;
    openKeyCursor(range?: IDBValidKey | IDBKeyRange, direction?: IDBCursorDirection): Observable<any>;
    private _handler;
    private _fromEvent;
    private _error;
}
