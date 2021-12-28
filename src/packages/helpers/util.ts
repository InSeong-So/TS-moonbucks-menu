/**
 *
 * @param target1
 * @param target2
 * @returns
 */
const getMaxLength = (target1 = 0, target2 = 1) => {
  return Math.max(target1, target2);
};

/**
 *
 */
const notationConvert = {
  dashToCamel: (target: string) => {
    return target.replace(/-[a-z]{1}/gi, char => {
      return char.toUpperCase().substr(1);
    });
  },
  snakeToCamel: (target: string) => {
    return target.replace(/_[a-z]{1}/gi, char => {
      return char.toUpperCase().substr(1);
    });
  },
  camelToSnake: (target: string) => {
    return target.replace(/([A-Z]{1})/g, '_$1').toLowerCase();
  },
};

/**
 *
 * @param state
 * @returns
 */
const deepCloneToJSON = (state: object) => {
  return JSON.parse(JSON.stringify(state));
};

/**
 *
 * @param state
 * @returns
 */
const deepCloneAndFreeze = (state: object) => {
  return Object.freeze(JSON.parse(JSON.stringify(state)));
};

/**
 *
 * @TODO 다른 브라우저가 활성화 되어 있거나,
 *       브라우저 OS가 포커싱되지 않았다면 requestAnimationFrame이 멈춘다.
 *
 * @param callback
 * @returns
 */
const debounceV1 = (callback: (...args: any) => void) => {
  let currentCallback: number | null = null;
  return (...args: any) => {
    if (currentCallback) {
      cancelAnimationFrame(currentCallback);
      currentCallback = null;
    }
    currentCallback = requestAnimationFrame(() => callback(args));
  };
};

/**
 *
 * @param callback
 * @param wait
 * @returns
 */
const debounce = (callback: any, wait = 0) => {
  let currentArguments: object[] | undefined;
  let timerId: NodeJS.Timeout | undefined;

  if (typeof callback !== 'function') throw new TypeError('Expected a function');

  const startTimer = (pendingCallback: () => any, term: number) => {
    return setTimeout(pendingCallback, term);
  };

  const trailingEdge = () => {
    timerId = undefined;
    const args = <object[]>currentArguments;
    currentArguments = undefined;
    callback(...args);
  };

  return (...args: object[]) => {
    currentArguments = args;
    if (timerId === undefined) timerId = startTimer(trailingEdge, wait);
  };
};

/**
 *
 * @returns
 */
const createUUID = () => {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, callback => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (callback == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export default {
  notationConvert,
  deepCloneToJSON,
  deepCloneAndFreeze,
  debounceV1,
  debounce,
  createUUID,
  getMaxLength,
};
