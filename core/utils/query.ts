import { filter, switchMap } from 'rxjs/operators';
import { ConnectionManager } from '../connection';
import { select } from './select';
export function query(
  table: string,
  where: IDBValidKey | IDBKeyRange,
  count?: number,
) {
  return ConnectionManager.ready().pipe(
    filter(res => res),
    switchMap(() => {
      return select(table).getAll(where, count);
    }),
  );
}
