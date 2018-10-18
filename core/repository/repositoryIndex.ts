import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export class RepositoryIndex {
  constructor(private store: IDBIndex) {}

  count(key?: IDBValidKey | IDBKeyRange) {
    return this._handler(this.store.count(key));
  }

  get(key: IDBValidKey | IDBKeyRange) {
    return this._handler(this.store.get(key));
  }

  getAll(query?: IDBValidKey | IDBKeyRange, count?: number) {
    return this._handler(this.store.getAll(query, count));
  }

  getAllKeys(query?: IDBValidKey | IDBKeyRange, count?: number) {
    return this._handler(this.store.getAllKeys(query, count));
  }

  getKey(key: IDBValidKey | IDBKeyRange) {
    return this._handler(this.store.getKey(key));
  }

  openCursor(
    range?: IDBValidKey | IDBKeyRange,
    direction?: IDBCursorDirection,
  ) {
    return this._handler(this.store.openCursor(range, direction));
  }

  openKeyCursor(
    range?: IDBValidKey | IDBKeyRange,
    direction?: IDBCursorDirection,
  ) {
    return this._handler(this.store.openKeyCursor(range, direction));
  }

  private _handler<T = any>(request: IDBRequest): Observable<T> {
    this._error(request);
    return this._fromEvent<T>(request);
  }

  private _fromEvent<T = any>(
    request,
    type: string = 'success',
  ): Observable<T> {
    return fromEvent(request, type).pipe(map((res: any) => res.target.result));
  }

  private _error(request: IDBRequest) {
    request.onerror = (e: any) => {
      console.error(e.target.error);
    };
  }
}
