import { Connection, ConnectionOptions } from './connection';
import { BehaviorSubject } from 'rxjs';
export declare class ConnectionManager {
    static connections: Map<string, Connection>;
    static current: Connection;
    static _ready: boolean;
    static _ready$: BehaviorSubject<boolean>;
    static has(name: string): boolean;
    static get(name: string): Connection | null;
    static create(options: ConnectionOptions): Connection;
    static of(options: ConnectionOptions): Connection;
    static setReady(): void;
    static ready(): import("rxjs/internal/Observable").Observable<boolean>;
}
