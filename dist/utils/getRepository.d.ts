import { Repository } from '../repository';
export declare function getRepository(name?: string, mode?: IDBTransactionMode): Repository;
export declare function select(name?: string, mode?: IDBTransactionMode): Repository;
export declare function selectTable(table?: string, name?: string, mode?: IDBTransactionMode): Repository;
