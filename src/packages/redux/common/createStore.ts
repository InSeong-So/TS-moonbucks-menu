import { Action, Reducer } from 'redux';
import { deepCloneAndFreeze } from '@/helpers';
import ProxyObserver from '@/observer/ProxyObserver';

const createStore = async (reducer: Reducer) => {
  const state = await ProxyObserver(reducer()());

  const dispatch = (action: Action) => {
    const newState = reducer(state)(action);

    for (const [key, value] of Object.entries(newState)) {
      if (state[key] === value) continue;
      state[key] = value;
    }
  };

  // const subscribe = (listener: (data: any | void) => void) => {
  //   state.subscribe(listener);
  // };

  const subscribe = (callback: () => void) => {
    state.subscribe(callback);
  };

  const getState = () => {
    return deepCloneAndFreeze(state);
  };

  return { dispatch, subscribe, getState };
};

export default createStore;
