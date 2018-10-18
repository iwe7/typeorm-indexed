import { filter, switchMap } from 'rxjs/operators';
import { ConnectionManager } from '../connection';
import { select } from './select';
export function get(table: string, where: IDBValidKey | IDBKeyRange) {
  return ConnectionManager.ready().pipe(
    filter(res => res),
    switchMap(() => {
      return select(table).get(where);
    }),
  );
}
