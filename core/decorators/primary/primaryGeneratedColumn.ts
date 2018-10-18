import {
  PrimaryGeneratedColumnOptions,
  PrimaryGeneratedColumnMetadataArgs,
} from '../../model';
import { getMetadataArgsStorage } from '../../utils';
export function PrimaryGeneratedColumn(
  options?: PrimaryGeneratedColumnOptions,
): PropertyDecorator {
  return (target: Object, propertyName: string) => {
    const args: PrimaryGeneratedColumnMetadataArgs = {
      ...options,
      target: target.constructor,
      propertyName,
    };
    args.name = args.name || propertyName;
    args.keyPath = args.keyPath || args.name;
    args.options = args.options || {};
    args.options.unique = true;
    getMetadataArgsStorage().primaryGeneratedColumns.push(args);
  };
}
