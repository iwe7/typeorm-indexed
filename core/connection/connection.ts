import { Repository } from './../repository';
import { Subscription, Observable } from 'rxjs';
// 数据库链接
import { indexedDB } from '../utils';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  TableMetadataArgs,
  ColumnMetadataArgs,
  PrimaryColumnOptionsMetadataArgs,
  PrimaryGeneratedColumnMetadataArgs,
} from '../model';
import { getMetadataArgsStorage } from '../utils';
import { ConnectionManager } from './connectionManager';
export interface ConnectionOptions {
  name: string;
  version?: number;
  entities?: any[];
}
export class Connection extends BehaviorSubject<any> {
  dbOpenDBRequest: IDBOpenDBRequest;
  db: IDBDatabase;
  isConnected: boolean = false;
  subscription: Subscription[] = [];

  currentName: string;

  readonly tables: TableMetadataArgs[] = [];
  readonly columns: ColumnMetadataArgs[] = [];
  readonly primaryColumns: PrimaryColumnOptionsMetadataArgs[] = [];
  readonly primaryGeneratedColumns: PrimaryGeneratedColumnMetadataArgs[] = [];

  name: string;
  version: number;
  entities: any[];

  constructor(options: ConnectionOptions) {
    super({});
    this.name = options.name;
    this.version = options.version || 1;
    this.entities = options.entities || [];
    const store = getMetadataArgsStorage();
    this.tables = store.tables;
    this.columns = store.columns;
    this.primaryColumns = store.primaryColumns;
    this.primaryGeneratedColumns = store.primaryGeneratedColumns;
  }
  // 链接
  connect(): Observable<this> {
    this.dbOpenDBRequest = indexedDB().open(this.name, this.version);
    const success = this._openSuccess();
    this._openBlocked();
    this._openUpgradeneeded();
    this._openError();
    return success.pipe(
      tap(res => {
        res && ConnectionManager.setReady();
      }),
    );
  }
  // 关闭
  close(): void {
    this.subscription.map(res => res.unsubscribe());
    this.subscription = [];
    this.db && this.db.close();
  }

  getMetadata(target: any) {
    const table = this.tables.find(table => table.target === target);
    const primaryGeneratedColumns = this.primaryGeneratedColumns.find(
      parimary => parimary.target === target,
    );
    const primaryColumns = this.primaryColumns.filter(
      parimary => parimary.target === target,
    );
    const columns = this.columns.filter(parimary => parimary.target === target);
    return {
      table,
      primaryGeneratedColumns,
      primaryColumns,
      columns,
    };
  }

  getStore(name: string, mode?: IDBTransactionMode): IDBObjectStore {
    return this._getTransaction(name, mode).objectStore(name);
  }

  getRepository(
    name?: string,
    mode: IDBTransactionMode = 'readwrite',
  ): Repository {
    name = name || this.currentName;
    if (!name) {
      console.error(`getRepository name empty error`);
    }
    const objectStore = this.getStore(name, mode);
    return new Repository(objectStore);
  }

  private _getTransaction(
    name: string,
    mode?: IDBTransactionMode,
  ): IDBTransaction {
    this.currentName = name;
    return this.db.transaction(name, mode);
  }

  // 初始化
  private _init() {
    const tables = this.entities.map(entity =>
      this.tables.find(table => table.target === entity),
    );
    tables.map(table => this._createTable(table));
  }

  private _createTable(table: TableMetadataArgs) {
    const primaryGeneratedColumn = this.primaryGeneratedColumns.find(
      primary => primary.target === table.target,
    );
    let options = { ...table.options };
    if (primaryGeneratedColumn) {
      options.autoIncrement = true;
      options.keyPath = primaryGeneratedColumn.keyPath;
    }
    const store: IDBObjectStore = this.db.createObjectStore(
      table.name,
      options,
    );
    const primaryColumns = this.primaryColumns.filter(
      primary => primary.target === table.target,
    );
    primaryColumns.map(primary => this._createPrimary(primary, store));
  }

  private _createPrimary(
    column: PrimaryColumnOptionsMetadataArgs,
    store: IDBObjectStore,
  ) {
    column.options = column.options || {};
    column.options.unique = true;
    column.options.multiEntry = true;
    store.createIndex(
      column.name,
      column.keyPath || column.name,
      column.options,
    );
  }

  private _openBlocked() {
    this.subscription.push(
      fromEvent(this.dbOpenDBRequest, 'blocked').subscribe(),
    );
  }

  private _openUpgradeneeded() {
    this.subscription.push(
      fromEvent(this.dbOpenDBRequest, 'upgradeneeded')
        .pipe(
          tap((event: Event) => {
            const target: any = event.target;
            this.db = target.result;
            this._init();
          }),
        )
        .subscribe(),
    );
  }

  private _openSuccess() {
    return fromEvent(this.dbOpenDBRequest, 'success').pipe(
      map((event: Event) => {
        const target: any = event.target;
        this.db = target.result;
        this.isConnected = true;
        return this;
      }),
    );
  }

  // 监听错误
  private _openError() {
    this.subscription.push(
      fromEvent(this.dbOpenDBRequest, 'error')
        .pipe(
          tap((res: Event) => {
            const target: any = res.target;
            this.error(target.errorCode);
          }),
        )
        .subscribe(),
    );
  }
}
