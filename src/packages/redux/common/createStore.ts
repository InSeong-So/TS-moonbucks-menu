import { Action, Reducer } from 'redux';
import { deepCloneAndFreeze } from '@/helpers';
import ProxyObserver from '@/observer/ProxyObserver';

const createStore = async (reducer: Reducer) => {
  const state = await ProxyObserver(reducer()());

  const dispatch = async (action: Action) => {
    const newState = await reducer(state)(action);

    for (const [key, value] of Object.entries(newState)) {
      if (state[key] === value) continue;
      state[key] = value;
    }
  };

  const subscribe = (listener: () => void) => {
    state.subscribe(listener);
  };

  const getState = () => {
    return deepCloneAndFreeze(state);
  };

  return { dispatch, subscribe, getState };
};

export default createStore;
