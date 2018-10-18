import {
  PrimaryColumnOptions,
  PrimaryColumnOptionsMetadataArgs,
} from '../../model';
import { getMetadataArgsStorage } from '../../utils';

export function PrimaryColumn(
  options?: PrimaryColumnOptions,
): PropertyDecorator {
  return (target: Object, propertyName: string) => {
    const args: PrimaryColumnOptionsMetadataArgs = {
      ...options,
      target: target.constructor,
      propertyName,
    };
    args.name = args.name || propertyName;
    args.keyPath = args.keyPath || args.name;
    getMetadataArgsStorage().primaryColumns.push(args);
  };
}
