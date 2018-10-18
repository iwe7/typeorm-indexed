export interface EntityOptions {
    name?: string;
    options?: IDBObjectStoreParameters;
}
export declare function Entity(options?: EntityOptions): ClassDecorator;
export declare function Entity(name?: string, options?: EntityOptions): ClassDecorator;
