/**
 * 평가식이 falsy할 때 실행
 *
 * @param {*} predicate
 * @param {*} callback
 */
const unless = (predicate: boolean, callback: any, ...args: any[]) =>
  !predicate ? callback(...args) : null;

const inCaseOf = (predicate: boolean, callback: any, ...args: any[]) =>
  predicate ? callback(...args) : null;

const find = (array: any[], source: string | symbol, target: string | symbol) => {
  for (const item of array) {
    if (item[source] === target) return item;
  }
  return null;
};

/**
 * 한 번만 실행
 *
 * @param {*} callback
 * @returns
 */
export const once = (callback: (...args: any[]) => undefined) => {
  let done: boolean | undefined = false;
  return function unnamed(...args: any[]) {
    if (done) done = undefined;
    else {
      done = true;
      callback.apply(unnamed, args);
    }
  };
};

/* eslint-disable no-return-assign */
export const memoized = (callback: (...args: any[]) => undefined) => {
  const lookupTable: { [key: string | symbol]: undefined } = {};

  return (arg: any) => lookupTable[arg] || (lookupTable[arg] = callback(arg));
};

export const curry = (callback: (...args: any[]) => undefined) => {
  if (typeof callback !== 'function') throw new Error('No Function provided');

  return function curreid(...args: any[]) {
    if (args.length >= callback.length) return callback(...args);

    return (...params: any[]) => curreid(...args.concat([].slice.call(params)));
  };
};

export const partial =
  (callback: (...args: any[]) => undefined, ...partialArgs: any[]) =>
  (...fullArgs: any[]) => {
    const args = Array.from(partialArgs);
    let index = 0;
    for (let i = 0; i < args.length && index < fullArgs.length; i += 1) {
      if (args[i] === undefined) {
        args[i] = fullArgs[index];
        index += 1;
      }
    }
    return callback(...args);
  };

export const compose =
  (a: (...args: any[]) => undefined, b: (...args: any[]) => undefined) =>
  (c: (...args: any[]) => undefined) =>
    a(b(c));

export default { unless, inCaseOf, find };
