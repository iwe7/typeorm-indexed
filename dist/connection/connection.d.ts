import { Repository } from './../repository';
import { Subscription, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { TableMetadataArgs, ColumnMetadataArgs, PrimaryColumnOptionsMetadataArgs, PrimaryGeneratedColumnMetadataArgs } from '../model';
export interface ConnectionOptions {
    name: string;
    version?: number;
    entities?: any[];
}
export declare class Connection extends BehaviorSubject<any> {
    dbOpenDBRequest: IDBOpenDBRequest;
    db: IDBDatabase;
    isConnected: boolean;
    subscription: Subscription[];
    currentName: string;
    readonly tables: TableMetadataArgs[];
    readonly columns: ColumnMetadataArgs[];
    readonly primaryColumns: PrimaryColumnOptionsMetadataArgs[];
    readonly primaryGeneratedColumns: PrimaryGeneratedColumnMetadataArgs[];
    name: string;
    version: number;
    entities: any[];
    constructor(options: ConnectionOptions);
    connect(): Observable<this>;
    close(): void;
    getMetadata(target: any): {
        table: TableMetadataArgs;
        primaryGeneratedColumns: PrimaryGeneratedColumnMetadataArgs;
        primaryColumns: PrimaryColumnOptionsMetadataArgs[];
        columns: ColumnMetadataArgs[];
    };
    getStore(name: string, mode?: IDBTransactionMode): IDBObjectStore;
    getRepository(name?: string, mode?: IDBTransactionMode): Repository;
    private _getTransaction;
    private _init;
    private _createTable;
    private _createPrimary;
    private _openBlocked;
    private _openUpgradeneeded;
    private _openSuccess;
    private _openError;
}
