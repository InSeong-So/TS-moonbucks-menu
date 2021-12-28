import { valid, util } from '@/helpers';
import { AnyObject } from 'global';

const { isEqualsObject } = valid;
const { debounce, deepCloneToJSON } = util;

const ProxyObserver = (initialState: object, applyDebounce: void | boolean = true) => {
  const observers: AnyObject = {};

  const state = new Proxy(deepCloneToJSON(initialState), {
    set: (target, name, value) => {
      if (target[name] && isEqualsObject(target[name], value)) return true;
      target[name] = value;
      Object.keys(observers).forEach(_key => {
        observers[_key](deepCloneToJSON(state));
      });
      return true;
    },
  });

  state.subscribe = (callback: AnyObject) => {
    Object.keys(callback).forEach(_key => {
      observers[_key] = applyDebounce ? debounce(callback[_key]) : callback[_key];
    });
  };

  state.notifyAll = () => {
    Object.keys(observers).forEach(_key => {
      observers[_key](deepCloneToJSON(state));
    });
  };

  return state;
};

export default ProxyObserver;
