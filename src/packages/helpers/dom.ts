import { TDomGetter } from 'dom';

/**
 *
 * @param selector
 * @returns
 */
const $: TDomGetter = selector => {
  return document.querySelector(selector) as HTMLElement;
};

/**
 *
 * @param selector
 * @returns
 */
const $all = (selector: string) => {
  return document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
};

/**
 *
 * @param $element
 * @param parent
 * @param targetSelector
 * @returns
 */
const $closest = ($element: HTMLElement, parent: string, targetSelector: string) => {
  return ($element.closest(parent) as HTMLElement).querySelector(targetSelector);
};

/**
 * @todo 고도화
 * 타겟의 형제 DOM 객체를 선택합니다.
 *
 * @param {string} selector
 * @param {HTMLElement | Document} target
 * @returns {Node}
 */
const $closest2 = (element: HTMLElement, selector: string) => {
  let $element: HTMLElement | null = element;
  if ($element.nodeType === 9) return false;
  while ($element) {
    if (typeof $element.matches === 'function' && $element.matches(selector)) return $element;
    $element = $element.parentNode as HTMLElement | null;
  }
  return false;
};

/**
 * 컴포넌트의 상위 컴포넌트를 반환합니다.
 *
 * @param selector
 * @returns
 */
const $parentComponent: TDomGetter = selector => {
  let $element: HTMLElement = $(selector);
  while ($element.parentElement !== null) {
    const parent = $element.parentElement as HTMLElement;
    if (parent.tagName === 'BODY' || parent.getAttribute('data-component') !== null) break;
    $element = parent;
  }
  return $element.parentElement as HTMLElement;
};

/**
 *
 * @param $element
 * @param selector
 * @returns
 */
const $attr = ($element: HTMLElement, selector: string | void) =>
  $element.getAttribute(selector || 'data-component');

/**
 * 이벤트 등록
 *
 * @param {HTMLElement} $element
 * @param {string} eventType
 * @param {function} listenser
 */
const $addEvent = (
  $element: HTMLElement,
  eventType: string,
  listenser: (data: Event | void) => void,
) => $element.addEventListener(eventType, listenser);

/**
 * 이벤트 제거
 *
 * @param {HTMLElement} $element
 * @param {string} eventType
 * @param {function} listenser
 */
const $removeEvent = (
  $element: HTMLElement,
  eventType: string,
  listenser: (data: Event | void) => void,
) => $element.removeEventListener(eventType, listenser);

/**
 * alert에 출력할 에러 메세지를 설정합니다.
 *
 * @param {string} type
 * @param {string} description
 * @returns {string}
 */
const $showAlert = (type: string, description = '') => {
  alert(`${description} 에러!`);
  return '';
};

const $compareInner = (template1: string, template2: string) => {
  const parsed1 = template1.replace(/[\\n]|[?=\s]*/gi, '');
  const parsed2 = template2.replace(/[\\n]|[?=\s]*/gi, '');
  const compare = parsed1 === parsed2;
  return [`${compare}`, compare ? template1 : template2];
};

export default {
  $,
  $all,
  $closest,
  $closest2,
  $parentComponent,
  $attr,
  $addEvent,
  $removeEvent,
  $showAlert,
  $compareInner,
};
