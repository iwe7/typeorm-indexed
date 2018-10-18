import { ColumnOptions, ColumnMetadataArgs } from '../model';
import { getMetadataArgsStorage } from '../utils';
export function Column(options?: ColumnOptions): PropertyDecorator {
  return (object: Object, propertyKey: string) => {
    options = options || {};
    options.name = options.name || propertyKey;
    const args: ColumnMetadataArgs = {
      target: object.constructor,
      propertyName: propertyKey,
      options: options,
    };
    getMetadataArgsStorage().columns.push(args);
  };
}
