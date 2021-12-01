import { Action, Reducer } from '../../../types/redux.js';
import { deepCloneAndFreeze } from '../../common/index.js';
import ProxyObserver from '../../observer/ProxyObserver.js';

const createStore = (reducer: Reducer) => {
  const state = ProxyObserver(reducer());

  const dispatch = (action: Action) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (state[key] === value) continue;
      state[key] = value;
    }
  };

  const subscribe = (listener: (data: any | void) => void) => {
    state.subscribe(listener);
  };

  const getState = () => {
    return deepCloneAndFreeze(state);
  };

  return { dispatch, subscribe, getState };
};

export default createStore;
