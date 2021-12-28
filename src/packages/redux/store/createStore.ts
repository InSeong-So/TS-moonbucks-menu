import { dom, util, highOrder } from '@/helpers';
import EventEmitter from '@/redux/sagas/lib/events';
import { AnyObject } from 'global';
import { Action, Reducer } from 'redux';
// import { logAction } from '../sagas/logger';

const { $parentComponent, $attr } = dom;
const { debounce, deepCloneToJSON, deepCloneAndFreeze } = util;
const { unless } = highOrder;

const createStore = (reducer: Reducer) => {
  const state = reducer();
  const observers: AnyObject = {};
  const observers2: Map<string, any> = new Map();
  const actionsEmitter = new EventEmitter();

  const dispatch = (action: Action) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (state[key] === value) continue;
      state[key] = value;
    }

    actionsEmitter.emit(action.type, action);

    if ((action.type as string).includes('SUCCESS') || (action.type as string).includes('FAILURE'))
      notifyAll(newState);
    // logAction(action, newState);
  };

  const subscribe = (callback: AnyObject) => {
    Object.keys(callback).forEach(_key => {
      observers[_key] = debounce(callback[_key]);
    });
  };

  const subscribe2 = (listener: AnyObject) => {
    Object.keys(listener).forEach(_key => {
      observers2.set(_key, debounce(listener[_key]));
    });
  };

  const notifyAll = (state: any) => {
    Object.keys(observers).forEach(_key => {
      observers[_key](deepCloneToJSON(state));
    });
  };

  const notifyAll2 = () => {
    for (const [key, callback] of observers2.entries()) {
      unless(!!$attr($parentComponent(key)), callback);
    }
  };

  const getState = () => deepCloneAndFreeze(state);

  return { dispatch, subscribe, getState, actionsEmitter };
};

export default createStore;
