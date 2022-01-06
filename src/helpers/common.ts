/**
 *
 * @param target1
 * @param target2
 * @returns
 */
export const getMaxLength = (target1 = 0, target2 = 1) => {
  return Math.max(target1, target2);
};

/**
 *
 */
export const notationConvert = {
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
export const deepCloneToJSON = (state: object) => {
  return JSON.parse(JSON.stringify(state));
};

/**
 *
 * @param state
 * @returns
 */
export const deepCloneAndFreeze = (state: object) => {
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
export const debounceV1 = (callback: (...args: any) => void) => {
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
export const debounce = (callback: any, wait = 0) => {
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
export const createUUID = () => {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, callback => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (callback == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

/**
 *
 * @param value
 * @returns
 */
export const isNull = (value: any) => value === null || value === undefined;

/**
 * 값이 비어있는지 검사합니다.
 *
 * @param {Array|number|string} value
 * @returns {boolean}
 */
export const isEmpty = (
  value: null | undefined | undefined[] | number | string | HTMLCollection,
) => {
  if (isNull(value)) return true;
  if (value instanceof Array) return value.length < 1 || value === [];
  if (typeof value === 'number') return value === 0;
  return value === '';
};

/**
 *
 * @param value
 * @param start
 * @param end
 * @returns
 */
export const isBetween = (value: number | string, start: number | string, end: number | string) => {
  const parsed = +value;
  if (Number.isNaN(parsed)) return false;
  return start <= parsed && parsed <= end;
};

/**
 *
 * @param target1
 * @param target2
 * @returns
 */
export const isEquals = <T>(target1: T, target2: T) => {
  return target1 === target2;
};

/**
 * 배열에 값이 포함 되어 있는지 검사합니다.
 *
 * @param {number|string} value
 * @param {any[]} items
 * @returns {boolean}
 */
export const isIncludes = (value: undefined, items: undefined[]) => items.includes(value);

/**
 * 중복 여부를 검사합니다.
 *
 * @param {string} value
 * @param {any[]} items
 * @returns {boolean}
 */
export const isDuplicate = (value: any, items: any[]) =>
  !isNull(items.find(({ name }) => name === value));

/**
 *
 * @param object1
 * @param object2
 * @returns
 */
export const isEqualsObject = (object1: object | (() => void), object2: object | (() => void)) => {
  if (typeof object1 === 'function' || typeof object2 === 'function')
    return object1.toString() === object2.toString();
  return JSON.stringify(object1) === JSON.stringify(object2);
};

/**
 *
 * @param target
 * @param type
 * @returns
 */
export const isCorrectType = (target: any, type: string) => {
  return typeof target === type;
};

/**
 *
 * @param node1
 * @param node2
 * @returns
 */
export const isNodeNotEquals = (node1: HTMLElement, node2: HTMLElement) => {
  return !node1.isEqualNode(node2);
};

/**
 *
 * @param node1
 * @param node2
 * @returns
 */
export const isOnlyExistLeft = <T>(node1: T, node2: T) => {
  return node1 && !node2;
};

/**
 *
 * @param node1
 * @param node2
 * @returns
 */
export const isOnlyExistRight = <T>(node1: T, node2: T) => {
  return !node1 && node2;
};

export const last = (array: any[], ...args: any[]) => {
  return array[array.length - 1][args[0]];
};
