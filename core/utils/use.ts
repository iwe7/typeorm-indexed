import { ConnectionManager } from '../connection';
export function use(db: string) {
  return ConnectionManager.get(db);
}
