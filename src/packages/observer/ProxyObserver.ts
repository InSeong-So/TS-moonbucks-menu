import {
  debounce,
  deepCloneToJSON,
  isCorrectType,
  isEqualsObject,
} from '@/helpers';
import { AnyObject } from 'event';

const ProxyObserver = async (
  initialState: object,
  applyDebounce: void | boolean = true,
) => {
  let observers: AnyObject = {};
  //  // observers를 배열로 관리하는 경우
  // let observers: ((data?: any) => void)[] = [];

  const state = new Proxy(deepCloneToJSON(await initialState), {
    set: (target, name, value) => {
      if (target[name] && isEqualsObject(target[name], value)) return true;
      target[name] = value;
      if (isCorrectType(value, 'function')) return true;
      state.notifyAll();
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
  //  // observers를 배열로 관리하는 경우
  // state.subscribe = (listener: (data?: any) => void) => {
  //   // 구독하면 바로 1회 실행해주기
  //   listener(deepCloneToJSON(state));
  //   observers.push(applyDebounce ? debounce(listener) : listener);

  //   return () => {
  //     observers = observers.filter(observer => observer !== listener);
  //   };
  // };

  // state.notifyAll = () => {
  //   observers.forEach(observer => {
  //     observer(deepCloneToJSON(state));
  //   });
  // };

  state.clear = () => {
    observers = [];
  };

  return state;
};

export default ProxyObserver;
