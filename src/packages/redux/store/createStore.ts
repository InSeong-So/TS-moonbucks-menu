import { util } from '@/helpers';
import EventEmitter from '@/redux/sagas/lib/events';
import { AnyObject } from 'global';
import { Action, Reducer } from 'redux';
// import { logAction } from '../sagas/logger';

const { debounce, deepCloneToJSON, deepCloneAndFreeze } = util;

const createStore = (reducer: Reducer) => {
  const state = reducer();
  const observers: AnyObject = {};
  const actionsEmitter = new EventEmitter();

  const dispatch = (action: Action) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (state[key] === value) continue;
      state[key] = value;
    }

    actionsEmitter.emit(action.type, action);

    notifyAll(newState);
    // logAction(action, newState);
  };

  const subscribe = (callback: AnyObject) => {
    Object.keys(callback).forEach(_key => {
      observers[_key] = debounce(callback[_key]);
    });
  };

  const notifyAll = (state: any) => {
    Object.keys(observers).forEach(_key => {
      observers[_key](deepCloneToJSON(state));
    });
  };

  const getState = () => deepCloneAndFreeze(state);

  return { dispatch, subscribe, getState, actionsEmitter };
};

export default createStore;
