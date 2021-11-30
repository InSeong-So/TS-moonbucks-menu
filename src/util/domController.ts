export const $ = (selector: string) => {
  return <HTMLElement>document.querySelector(selector);
};

type elCreationOptions = {
  elName: string;
  id?: string;
  className?: string;
  text?: string;
};

export const addElement = (options: elCreationOptions) => {
  const { elName, id, className, text } = options;
  const $el = document.createElement(elName);
  $el.id = id || '';
  $el.className = className || '';
  $el.textContent = text || '';
  return $el;
};

type elAttributesOptions = {
  TYPE: string;
  ID: string;
  CLASS_NAME: string;
  TEXT?: string;
};

export const getElCreationOptions = (constants: elAttributesOptions) => {
  const { TYPE, ID, CLASS_NAME, TEXT } = constants;
  return {
    elName: TYPE,
    id: ID,
    className: CLASS_NAME,
    text: TEXT,
  };
};

export const bindEventHandlerToMenuItemBtn = (
  $el: HTMLElement,
  handler: (menuId: string) => void,
) => {
  $el.addEventListener('click', (e: Event) => {
    e.preventDefault();
    const targetNode = <HTMLElement>e.currentTarget;
    const menuId = (<HTMLElement>targetNode.parentElement).id;
    handler(menuId);
  });
};
