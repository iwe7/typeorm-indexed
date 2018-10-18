import { ConnectionManager } from '../connection';
import { Repository } from '../repository';
export function getRepository(
  name?: string,
  mode?: IDBTransactionMode,
): Repository {
  return ConnectionManager.current.getRepository(name, mode);
}

export function select(name?: string, mode?: IDBTransactionMode): Repository {
  return getRepository(name, mode);
}

export function selectTable(
  table?: string,
  name?: string,
  mode?: IDBTransactionMode,
): Repository {
  ConnectionManager.get(table);
  return select(name, mode);
}
