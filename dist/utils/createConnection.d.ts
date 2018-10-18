import { Observable } from 'rxjs';
import { Connection, ConnectionOptions } from '../connection';
export declare function createConnection(options?: ConnectionOptions): Observable<Connection>;
export declare function createConnections(options: ConnectionOptions[]): Observable<Connection>[];
