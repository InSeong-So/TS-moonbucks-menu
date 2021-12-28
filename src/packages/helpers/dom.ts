/**
 *
 * @param selector
 * @returns
 */
const $ = (selector: string) => {
  return <HTMLElement>document.querySelector(selector);
};

/**
 *
 * @param selector
 * @returns
 */
const $all = (selector: string) => {
  return <NodeListOf<HTMLElement>>document.querySelectorAll(selector);
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

export default {
  $,
  $all,
  $closest,
  $addEvent,
  $removeEvent,
  $showAlert,
};
