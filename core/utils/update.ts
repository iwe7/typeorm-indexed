import { filter, switchMap } from 'rxjs/operators';
import { ConnectionManager } from '../connection';
import { select } from './select';

export function update(table: string, data: any) {
  return ConnectionManager.ready().pipe(
    filter(res => res),
    switchMap(() => {
      return select(table).save(data);
    }),
  );
}
