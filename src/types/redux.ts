export type AnyState = {
  [index: string | symbol]: any;
};

export interface Action<T = any> {
  type: T;
}

export interface AnyAction extends Action {
  [extraProps: string | symbol]: any;
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state?: S,
  action?: A,
) => S;

export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T, ...extraArgs: any[]): T;
}

export interface Unsubscribe {
  (): void;
}

export interface Store {
  dispatch: (action: Action) => void;
  subscribe(listener: () => (data: any | void) => void): void;
  getState: () => AnyState;
}
