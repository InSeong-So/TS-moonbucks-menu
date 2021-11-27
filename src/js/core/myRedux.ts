
let currentState = undefined as any;
let listeners: Map<string, () => void> = new Map();

type Action<TPayload> = { type: string; payload: TPayload };
type Reducer<TState, TPayload> = (
  state: TState,
  action: Action<TPayload>,
) => TState;
export type ReturnCreateStore<TState, TPayload> = {
  reset: () => void;
  getState: () => Readonly<TState>;
  dispatch: (action: Action<TPayload>) => void;
  subscribe: (id: string, listener: () => void) => () => void;
};

export function createStore<TState, TPayload>(
  reducer: Reducer<TState, TPayload>,
  initialState: TState,
): ReturnCreateStore<TState, TPayload> {
  currentState = initialState;
  return {
    reset: () => {
      currentState = initialState;
      listeners = new Map();
    },
    getState: () => {
      const res: Readonly<TState> = currentState as TState;
      return res;
    },
    dispatch: action => {
      const result = reducer(currentState, action);
      currentState = result;
      listeners.forEach(fn => fn());
    },

    subscribe: (id, listener) => {
      listeners.set(id, listener);
      return () => {
        listeners.delete(id);
      };
    },
  };
}
