import { ConnectionManager } from '../connection';
import { Repository } from '../repository';
export function getRepository(
  name?: string,
  mode?: IDBTransactionMode,
): Repository {
  return ConnectionManager.current.getRepository(name, mode);
}
