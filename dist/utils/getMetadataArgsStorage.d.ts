import { TableMetadataArgs, ColumnMetadataArgs, PrimaryGeneratedColumnMetadataArgs, PrimaryColumnOptionsMetadataArgs } from '../model';
export declare class MetadataArgsStorage {
    readonly tables: TableMetadataArgs[];
    readonly columns: ColumnMetadataArgs[];
    readonly primaryGeneratedColumns: PrimaryGeneratedColumnMetadataArgs[];
    readonly primaryColumns: PrimaryColumnOptionsMetadataArgs[];
}
export declare function getMetadataArgsStorage(): MetadataArgsStorage;
