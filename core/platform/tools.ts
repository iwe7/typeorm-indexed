import getGlobal from '../global';
export class PlatformTools {
  static getGlobalVariable<T = any>(): T {
    return getGlobal<T>();
  }
}
