import { PlatformTools } from '../platform';
import {
  TableMetadataArgs,
  ColumnMetadataArgs,
  PrimaryGeneratedColumnMetadataArgs,
  PrimaryColumnOptionsMetadataArgs,
} from '../model';
export class MetadataArgsStorage {
  readonly tables: TableMetadataArgs[] = [];
  readonly columns: ColumnMetadataArgs[] = [];
  readonly primaryGeneratedColumns: PrimaryGeneratedColumnMetadataArgs[] = [];
  readonly primaryColumns: PrimaryColumnOptionsMetadataArgs[] = [];
}

export function getMetadataArgsStorage(): MetadataArgsStorage {
  const globalScope = PlatformTools.getGlobalVariable();
  if (!globalScope.typeormMetadataArgsStorage)
    globalScope.typeormMetadataArgsStorage = new MetadataArgsStorage();
  return globalScope.typeormMetadataArgsStorage;
}
