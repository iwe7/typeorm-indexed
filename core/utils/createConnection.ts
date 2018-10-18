import { Observable } from 'rxjs';
import {
  Connection,
  ConnectionOptions,
  ConnectionManager,
} from '../connection';
export function createConnection(
  options?: ConnectionOptions,
): Observable<Connection> {
  let connection = ConnectionManager.get(options.name);
  if (connection) {
    return connection.connect();
  }
  connection = ConnectionManager.create(options);
  return connection.connect();
}

export function createConnections(
  options: ConnectionOptions[],
): Observable<Connection>[] {
  return options.map(opt => createConnection(opt));
}
