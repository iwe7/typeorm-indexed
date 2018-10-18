import { getRepository } from './getRepository';
import { Repository } from '../repository';
import { ConnectionManager } from '../connection';
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
