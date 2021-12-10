export const $ = (selector: string) => {
  return <HTMLElement>document.querySelector(selector);
};

type ElCreationOptions = {
  elName: string;
  id?: string;
  className?: string;
  text?: string;
};

export const addElement = (options: ElCreationOptions) => {
  const { elName, id, className, text } = options;
  const $el = document.createElement(elName);
  $el.id = id || '';
  $el.className = className || '';
  $el.textContent = text || '';
  return $el;
};

export const bindEvent = (
  $el: HTMLElement,
  eventName: string,
  handler: () => void,
) => {
  $el.addEventListener(eventName, handler);
};
