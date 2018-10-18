import { ColumnOptions } from './columnOptions';

export interface ColumnMetadataArgs {
  readonly target: Function;
  readonly propertyName: string;
  options: ColumnOptions;
}
