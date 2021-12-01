import {
  debounce,
  deepCloneToJSON,
  isCorrectType,
  isEqualsObject,
} from '../common/index.js';

const ProxyObserver = (
  initialState: object,
  applyDebounce: void | boolean = true,
) => {
  let observers: ((data: any | void) => void)[] = [];

  const state = new Proxy(deepCloneToJSON(initialState), {
    set: (target, name, value) => {
      if (target[name] && isEqualsObject(target[name], value)) return true;
      target[name] = value;
      if (isCorrectType(value, 'function')) return true;
      state.notifyAll();
      return true;
    },
  });

  state.subscribe = (listener: (data: any | void) => void) => {
    // 구독하면 바로 1회 실행해주기
    listener(deepCloneToJSON(state));
    observers.push(applyDebounce ? debounce(listener) : listener);

    return () => {
      observers = observers.filter(observer => observer !== listener);
    };
  };

  state.notifyAll = () => {
    observers.forEach(observer => {
      observer(deepCloneToJSON(state));
    });
  };

  state.clear = () => {
    observers = [];
  };

  return state;
};

export default ProxyObserver;
