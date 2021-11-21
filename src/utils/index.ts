export const $ = (selector: string) => {
  return <HTMLElement>document.querySelector(selector);
};

export const $sibling = (
  $element: HTMLElement,
  parent: string,
  targetSelector: string,
) => {
  return ($element.closest(parent) as HTMLElement).querySelector(
    targetSelector,
  );
};

export const getMaxLength = (target1 = 0, target2 = 1) => {
  return Math.max(target1, target2);
};

export const isNotEquals = <T>(target1: T, target2: T) => {
  return target1 !== target2;
};

export const isOnlyExistLeft = <T>(node1: T, node2: T) => {
  return node1 && !node2;
};

export const isOnlyExistRight = <T>(node1: T, node2: T) => {
  return !node1 && node2;
};
