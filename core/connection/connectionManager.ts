import { Connection, ConnectionOptions } from './connection';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

export class ConnectionManager {
  static connections: Map<string, Connection> = new Map();
  static current: Connection;

  static _ready: boolean = false;

  static _ready$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  static has(name: string): boolean {
    return this.connections.has(name);
  }

  static get(name: string): Connection | null {
    this.current = this.connections.get(name);
    return this.current;
  }

  static create(options: ConnectionOptions) {
    this.current = new Connection(options);
    this.connections.set(options.name, this.current);
    return this.current;
  }

  static of(options: ConnectionOptions) {
    return this.create(options);
  }

  static setReady() {
    this._ready = true;
    this._ready$.next(true);
  }

  static ready() {
    return this._ready$.pipe(
      distinctUntilChanged(),
      filter(res => res),
    );
  }
}
