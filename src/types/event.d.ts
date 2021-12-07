declare module 'event' {
  export interface EventBusProps {
    add: (
      type: string,
      callback: AnyFunction,
      scope: object,
      ...args: any[]
    ) => void;
    remove: (type: string, callback: AnyFunction, scope: object) => void;
    hasProperty: (key: string) => boolean;
    hasEventListener: (
      type: string,
      callback: AnyFunction,
      scope: object,
    ) => boolean;
    dispatch: <T>(type: string, target: ThisType<T>, ...args: any[]) => void;
    getEvents: () => string;
  }

  export type AnyFunction = (...data: any) => any;

  export interface AnyObject {
    [key: string]: any;
  }

  export interface ListenerProps {
    scope: AnyObject;
    callback: AnyFunction;
    args: any[];
  }

  export interface Listeners {
    [key: string]: ListenerProps[];
  }
}
