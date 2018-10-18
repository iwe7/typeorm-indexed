import { TableMetadataArgs } from '../model';
import { getMetadataArgsStorage } from '../utils';
export interface EntityOptions {
  name?: string;
  options?: IDBObjectStoreParameters;
}
export function Entity(options?: EntityOptions): ClassDecorator;
export function Entity(name?: string, options?: EntityOptions): ClassDecorator;
export function Entity(
  nameOrOptions?: string | EntityOptions,
  maybeOptions?: EntityOptions,
): ClassDecorator {
  const options: any =
    (typeof nameOrOptions === 'object'
      ? (nameOrOptions as EntityOptions)
      : maybeOptions) || {};
  const name = typeof nameOrOptions === 'string' ? nameOrOptions : options.name;
  return (target: any) => {
    const args: TableMetadataArgs = {
      name: name ? name : target.name,
      options: options.options,
      target,
    };
    getMetadataArgsStorage().tables.push(args);
  };
}
