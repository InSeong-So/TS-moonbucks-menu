import { debounce, deepCloneToJSON } from '@/helpers';
import { AnyObject } from 'event';

const ProxyObserver = async (
  initialState: object,
  applyDebounce: void | boolean = true,
) => {
  const observers: AnyObject = {};

  const state = new Proxy(deepCloneToJSON(await initialState), {
    set: (target, name, value) => {
      target[name] = value;
      Object.keys(observers).forEach(_key => {
        observers[_key](deepCloneToJSON(state));
      });
      return true;
    },
  });

  state.subscribe = (callback: AnyObject) => {
    Object.keys(callback).forEach(_key => {
      observers[_key] = applyDebounce
        ? debounce(callback[_key])
        : callback[_key];
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
