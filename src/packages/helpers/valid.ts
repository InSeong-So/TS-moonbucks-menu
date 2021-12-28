import dom from './dom';

/**
 *
 * @param value
 * @returns
 */
const isNull = (value: any) => value === null || value === undefined;

/**
 * 값이 비어있는지 검사합니다.
 *
 * @param {Array|number|string} value
 * @returns {boolean}
 */
const isEmpty = (value: null | undefined | undefined[] | number | string | HTMLCollection) => {
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
const isBetween = (value: number | string, start: number | string, end: number | string) => {
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
const isEquals = <T>(target1: T, target2: T) => {
  return target1 === target2;
};

/**
 * 배열에 값이 포함 되어 있는지 검사합니다.
 *
 * @param {number|string} value
 * @param {any[]} items
 * @returns {boolean}
 */
const isIncludes = (value: undefined, items: undefined[]) => items.includes(value);

/**
 * 중복 여부를 검사합니다.
 *
 * @param {string} value
 * @param {any[]} items
 * @returns {boolean}
 */
const isDuplicate = (value: any, items: any[]) => !isNull(items.find(({ name }) => name === value));

/**
 *
 * @param object1
 * @param object2
 * @returns
 */
const isEqualsObject = (object1: object | (() => void), object2: object | (() => void)) => {
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
const isCorrectType = (target: any, type: string) => {
  return typeof target === type;
};

/**
 *
 * @param node1
 * @param node2
 * @returns
 */
const isNodeNotEquals = (node1: HTMLElement, node2: HTMLElement) => {
  return !node1.isEqualNode(node2);
};

/**
 *
 * @param node1
 * @param node2
 * @returns
 */
const isOnlyExistLeft = <T>(node1: T, node2: T) => {
  return node1 && !node2;
};

/**
 *
 * @param node1
 * @param node2
 * @returns
 */
const isOnlyExistRight = <T>(node1: T, node2: T) => {
  return !node1 && node2;
};

/**
 * 양의 정수인지 검사합니다.
 * 1. 값이 0일 수 없습니다.
 * 2. 값이 음수일 수 없습니다.
 * 3. 값이 소수일 수 없습니다.
 *
 * @param {number|string} target
 * @returns {number | ''}
 */
const isPositiveInteger = (target: number | string, description: string) => {
  const parsed = +target;
  if (isEquals(parsed, 0)) return dom.$showAlert('zeroError', description);
  if (parsed < 0) return dom.$showAlert('negativeError', description);
  if (!isEquals(Number.isInteger(parsed), true)) return dom.$showAlert('decimalError', description);
  return parsed;
};

/**
 * 숫자형에 대한 유효성을 검사합니다.
 *
 * @param {number} value
 * @param {string} placeholder
 * @returns {number}
 */
const isNumbersValidate = (value: string | number, placeholder: string) => {
  const parsed = isPositiveInteger(value, placeholder);
  if (isEmpty(parsed)) return '';
  return parsed;
};

/**
 * 숫자가 아닌 입력에 대한 유효성을 검사합니다.
 *
 * @param {object} param
 * @param {any[]} items
 * @returns {boolean}
 */
const isValidate = ({ placeholder, value }: { placeholder: string; value: any }, items = []) => {
  const trimedValue = value.trim();
  if (trimedValue.length >= 6) return dom.$showAlert('lengthOverError', placeholder);
  if (isEmpty(trimedValue)) return dom.$showAlert('notDefined', placeholder);
  if (isDuplicate(value, items)) return dom.$showAlert('dupError', `${placeholder}: [${value}]`);
  return value;
};

export default {
  isNull,
  isEmpty,
  isBetween,
  isEquals,
  isEqualsObject,
  isIncludes,
  isCorrectType,
  isNodeNotEquals,
  isOnlyExistLeft,
  isOnlyExistRight,
};
