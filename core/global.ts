declare var WorkerGlobalScope: any;
declare var global: any;
const __window = typeof window !== 'undefined' && window;
const __self =
  typeof self !== 'undefined' &&
  typeof WorkerGlobalScope !== 'undefined' &&
  self instanceof WorkerGlobalScope &&
  self;
const __global = typeof global !== 'undefined' && global;
const _global: { [name: string]: any } = __global || __window || __self;
export const getGlobal = <T = any>(): T => _global as T;
export default getGlobal;
