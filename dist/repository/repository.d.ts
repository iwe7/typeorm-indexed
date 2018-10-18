import { RepositoryIndex } from './repositoryIndex';
import { Observable } from 'rxjs';
export declare class Repository<T = any> {
    private store;
    constructor(store: IDBObjectStore);
    add<T = any>(value: any, key?: IDBValidKey | IDBKeyRange): Observable<T>;
    clear<T = any>(): Observable<T>;
    count<T = number>(key?: IDBValidKey | IDBKeyRange): Observable<T>;
    createIndex(name: string, keyPath: string | string[], options?: IDBIndexParameters): IDBIndex;
    delete<T = any>(key: IDBValidKey | IDBKeyRange): Observable<T>;
    deleteIndex(name: string): void;
    get<T = any>(query: IDBValidKey | IDBKeyRange): Observable<T>;
    getAll<T = any>(query?: IDBValidKey | IDBKeyRange, count?: number): Observable<T>;
    getAllKeys<T = any>(query?: IDBValidKey | IDBKeyRange, count?: number): Observable<T>;
    getKey<T = any>(query: IDBValidKey | IDBKeyRange): Observable<T>;
    index(name: string): RepositoryIndex;
    openCursor<T = any>(range?: IDBValidKey | IDBKeyRange, direction?: IDBCursorDirection): Observable<T>;
    openKeyCursor<T = any>(query?: IDBValidKey | IDBKeyRange, direction?: IDBCursorDirection): Observable<T>;
    put<T = any>(value: any, key?: IDBValidKey | IDBKeyRange): Observable<T>;
    save<T = any>(value: any, key?: IDBValidKey | IDBKeyRange): Observable<T>;
    getPrimaryValue(value: any): Observable<any>;
    hasValue(value: any): Observable<any>;
    indexs: {
        [key: string]: RepositoryIndex;
    };
    remove<T = any>(key: IDBValidKey | IDBKeyRange): Observable<T>;
    insert<T = any>(value: any, key?: IDBValidKey | IDBKeyRange): Observable<T>;
    update<T = any>(value: any, key?: IDBValidKey | IDBKeyRange): Observable<T>;
    find<T = any>(query?: IDBValidKey | IDBKeyRange): Observable<T>;
    findOne<T = any>(query: IDBValidKey | IDBKeyRange): Observable<T>;
    private _hasOwnProperty;
    private createRepositoryIndexs;
    private getKeyPath;
    private getIndexNames;
    private _handler;
    private _fromEvent;
    private _error;
}
