import { RepositoryIndex } from './repositoryIndex';
import { fromEvent, Observable, of, merge } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
export class Repository<T = any> {
  constructor(private store: IDBObjectStore) {
    this.createRepositoryIndexs();
  }

  // 直接添加 不检查
  add<T = any>(value: any, key?: IDBValidKey | IDBKeyRange) {
    return this._handler<T>(this.store.add(value, key));
  }

  clear<T = any>(): Observable<T> {
    return this._handler<T>(this.store.clear());
  }

  count<T = number>(key?: IDBValidKey | IDBKeyRange): Observable<T> {
    return this._handler<T>(this.store.count(key));
  }

  createIndex(
    name: string,
    keyPath: string | string[],
    options?: IDBIndexParameters,
  ): IDBIndex {
    return this.store.createIndex(name, keyPath, options);
  }

  delete<T = any>(key: IDBValidKey | IDBKeyRange): Observable<T> {
    return this._handler<T>(this.store.delete(key));
  }

  deleteIndex(name: string): void {
    return this.store.deleteIndex(name);
  }

  get<T = any>(query: IDBValidKey | IDBKeyRange) {
    return this._handler<T>(this.store.get(query));
  }

  getAll<T = any>(
    query?: IDBValidKey | IDBKeyRange,
    count?: number,
  ): Observable<T> {
    return this._handler<T>(this.store.getAll(query, count));
  }

  getAllKeys<T = any>(
    query?: IDBValidKey | IDBKeyRange,
    count?: number,
  ): Observable<T> {
    return this._handler<T>(this.store.getAllKeys(query, count));
  }

  getKey<T = any>(query: IDBValidKey | IDBKeyRange) {
    return this._handler<T>(this.store.getKey(query));
  }

  index(name: string): RepositoryIndex {
    return new RepositoryIndex(this.store.index(name));
  }

  openCursor<T = any>(
    range?: IDBValidKey | IDBKeyRange,
    direction?: IDBCursorDirection,
  ) {
    return this._handler<T>(this.store.openCursor(range, direction));
  }

  openKeyCursor<T = any>(
    query?: IDBValidKey | IDBKeyRange,
    direction?: IDBCursorDirection,
  ) {
    return this._handler<T>(this.store.openKeyCursor(query, direction));
  }

  // 直接更新 不检查
  put<T = any>(value: any, key?: IDBValidKey | IDBKeyRange) {
    return this._handler<T>(this.store.put(value, key));
  }

  // 检查是否重复 然后更新或插入
  save<T = any>(value: any, key?: IDBValidKey | IDBKeyRange): Observable<T> {
    return this.hasValue(value).pipe(
      switchMap(res => {
        if (res === null) {
          return this.add(value, key);
        } else {
          return this.put({ ...res, ...value });
        }
      }),
    );
  }

  getPrimaryValue(value: any) {
    const key = this.getKeyPath();
    if (this._hasOwnProperty(key, value)) {
      return of(value[`${key}`]);
    } else {
      return of(null);
    }
  }

  hasValue(value: any) {
    const key = this.getKeyPath();
    if (this._hasOwnProperty(key, value)) {
      return this.get(value[`${key}`]);
    } else {
      const indexs = this.getIndexNames();
      for (let i = 0; i < indexs.length; i++) {
        const key = indexs.item(i);
        if (this._hasOwnProperty(key, value)) {
          return this.index(key).get(value[`${key}`]);
        }
      }
      return of(null);
    }
  }

  indexs: { [key: string]: RepositoryIndex } = {};

  remove<T = any>(key: IDBValidKey | IDBKeyRange): Observable<T> {
    return this.delete(key);
  }

  insert<T = any>(value: any, key?: IDBValidKey | IDBKeyRange): Observable<T> {
    return this.add(value, key);
  }

  update<T = any>(value: any, key?: IDBValidKey | IDBKeyRange): Observable<T> {
    return this.put(value, key);
  }

  find<T = any>(query?: IDBValidKey | IDBKeyRange): Observable<T> {
    return this.getAll(query);
  }

  findOne<T = any>(query: IDBValidKey | IDBKeyRange): Observable<T> {
    return this.get(query);
  }

  private _hasOwnProperty(key: any, value: any): boolean {
    return Object.prototype.hasOwnProperty.call(value, key);
  }

  private createRepositoryIndexs() {
    const indexs = this.getIndexNames();
    for (let i = 0; i < indexs.length; i++) {
      const item = indexs.item(i);
      this.indexs[`${item}`] = this.index(item);
    }
  }

  private getKeyPath(): string | string[] {
    return this.store.keyPath;
  }

  private getIndexNames(): DOMStringList {
    return this.store.indexNames;
  }

  private _handler<T = any>(request: IDBRequest): Observable<T> {
    this._error(request);
    return this._fromEvent<T>(request);
  }

  private _fromEvent<T = any>(
    request,
    type: string = 'success',
  ): Observable<T> {
    return fromEvent(request, type).pipe(
      map((res: any) => {
        return res.target.result;
      }),
    );
  }

  private _error(request: IDBRequest) {
    request.onerror = (e: any) => {
      console.error(e.target.error);
    };
  }
}
