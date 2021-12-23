declare module 'redux' {
  export type AnyState = {
    [key: string | symbol]: any;
  };

  export interface Action<T = any> {
    type: T;
    [key: string]: any;
  }

  export interface AnyAction extends Action {
    [key: string | symbol]: any;
  }

  export type Reducer<S = any, A extends Action = AnyAction> = (state?: S, action?: A) => S;

  export interface Dispatch<A extends Action = AnyAction> {
    <T extends A>(action: T, ...extraArgs: any[]): T;
  }

  export interface Unsubscribe {
    (): void;
  }

  export interface Store {
    dispatch: (action: Action) => void;
    // subscribe(listener: () => (data: any | void) => void): void;
    subscribe: (data: any) => void;
    getState: () => AnyState;
  }
}
