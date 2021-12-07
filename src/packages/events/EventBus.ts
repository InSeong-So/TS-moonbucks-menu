import { AnyFunction, EventBusProps, Listeners } from 'event';

export default class EventBus implements EventBusProps {
  listeners: Listeners;

  constructor() {
    this.listeners = {};
  }

  add(type: string, callback: AnyFunction, scope: object, ...args: any[]) {
    const listener = {
      scope,
      callback,
      args,
    };

    this.listeners[type] = this.hasProperty(type)
      ? [...this.listeners[type], listener]
      : [listener];
  }

  remove(type: string, callback: AnyFunction, scope: object) {
    if (!this.hasProperty(type)) return;

    const removedListeners = this.listeners[type].filter(
      ({ scope: ts, callback: tc }) => ts !== scope || tc !== callback,
    );

    this.listeners[type] = removedListeners;
  }

  hasProperty(key: string) {
    return Object.prototype.hasOwnProperty.call(this.listeners, key);
  }

  hasEventListener(type: string, callback: AnyFunction, scope: object) {
    if (!this.hasProperty(type)) return false;

    if (callback === undefined && scope === undefined)
      return this.listeners[type].length > 0;

    return (
      this.listeners[type].reduce((result: boolean[], listener) => {
        if (
          (scope ? listener.scope == scope : true) &&
          listener.callback == callback
        ) {
          result.push(true);
        }
        return result;
      }, []).length > 0
    );
  }

  dispatch<T>(type: string, target: ThisType<T>, ...args: any[]) {
    const options = [{ type, target }, ...args];

    if (!this.hasProperty(type)) return;

    [...this.listeners[type]].forEach(listener => {
      if (!listener.callback) return;

      listener.callback.apply(listener.scope, [...options, ...listener.args]);
    });
  }

  getEvents() {
    let result = '';
    Object.keys(this.listeners).forEach(key => {
      this.listeners[key].forEach(({ scope }) => {
        result += `${scope.className ?? 'anonymous'} listen for ${key} \n`;
      });
    });

    return result;
  }
}
