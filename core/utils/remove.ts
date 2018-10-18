import { switchMap } from 'rxjs/operators';
import { ConnectionManager } from '../connection';
import { select } from './select';

import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

export function remove(
  table: string,
  data: IDBValidKey | IDBKeyRange
) {
  return ConnectionManager.ready().pipe(
    filter(res => res),
    switchMap(() => {
      const table$ = select(table);
      return table$.hasValue(data).pipe(
        switchMap(() => {
          return table$.remove(data);
        }),
      );
    }),
  );
}
