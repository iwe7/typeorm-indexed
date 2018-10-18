import { switchMap } from 'rxjs/operators';
import { ConnectionManager } from '../connection';
import { select } from './select';

import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

export function insert(
  table: string,
  data: any,
  canInsert?: (old: any) => boolean,
) {
  return ConnectionManager.ready().pipe(
    filter(res => res),
    switchMap(() => {
      const table$ = select(table);
      return table$.hasValue(data).pipe(
        switchMap(res => {
          if (canInsert && canInsert(res)) {
            return table$.add(res);
          } else {
            return of(null);
          }
        }),
      );
    }),
  );
}
