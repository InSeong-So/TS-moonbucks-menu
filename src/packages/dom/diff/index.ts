// import { util, valid } from '@/helpers';

// const { getMaxLength } = util;
// const { isNodeNotEquals, isOnlyExistLeft, isOnlyExistRight } = valid;

// /**
//  * @see https://www.nextree.co.kr/p2081/
//  *
//  * @param $targetElement
//  * @param template
//  */
// const diffRender = ($targetElement: HTMLElement, template: string) => {
//   const realDom = $targetElement;
//   const virtualDom = <HTMLElement>realDom.cloneNode(true);
//   virtualDom.innerHTML = template;

//   const [realChilds, realLength] = getThisDomChilds(realDom);
//   const [virtualChilds, virtualLength] = getThisDomChilds(virtualDom);

//   for (let i = 0; i < getMaxLength(realLength, virtualLength); i++) {
//     renderDom(realDom, realChilds[i], virtualChilds[i]);
//   }
// };

// const getThisDomChilds = (target: HTMLElement): [HTMLElement[], number] => {
//   const targetChildrens = <HTMLElement[]>Array.from(target.children);
//   return [targetChildrens, targetChildrens.length];
// };

// const isChangedNode = (node1: HTMLElement, node2: HTMLElement) => {
//   if (isNodeNotEquals(node1, node2)) return true;
//   if (isDifferenceAttributes(node1, node2)) return true;
//   if (isNotEqualsLastContent(node1, node2)) return true;

//   return false;
// };

// const isNotEqualsLastContent = (node1: HTMLElement, node2: HTMLElement) => {
//   if (node1.children.length !== 0) return false;
//   if (node2.children.length !== 0) return false;
//   if (node1.textContent !== node2.textContent) return true;
//   return false;
// };

// const isDifferenceAttributes = (real: HTMLElement, virtual: HTMLElement) => {
//   return !!Array.from(real.attributes).find(
//     ({ name }) => real.getAttribute(name) !== virtual.getAttribute(name),
//   );
// };

// const renderDom = (
//   $targetElement: HTMLElement,
//   realNode: HTMLElement,
//   virtualNode: HTMLElement,
// ) => {
//   if (isOnlyExistLeft(realNode, virtualNode)) {
//     realNode.remove();
//     return;
//   }

//   if (isOnlyExistRight(realNode, virtualNode)) {
//     $targetElement.appendChild(virtualNode);
//     return;
//   }

//   if (isChangedNode(realNode, virtualNode)) {
//     realNode.replaceWith(virtualNode);
//     return;
//   }

//   const [realChilds, realLength] = getThisDomChilds(realNode);
//   const [virtualChilds, virtualLength] = getThisDomChilds(virtualNode);

//   for (let i = 0; i < getMaxLength(realLength, virtualLength); i++) {
//     renderDom(realNode, realChilds[i], virtualChilds[i]);
//   }
// };

// export default diffRender;

import { util, valid } from '@/helpers';

const { getMaxLength } = util;
const { isNull, isEmpty, isEquals, isNodeNotEquals, isOnlyExistLeft, isOnlyExistRight } = valid;

type TDiffRender = ($element: HTMLElement, newElement: string) => void | undefined;
type TNodeCompare = (node1: HTMLElement, node2: HTMLElement) => boolean;

/**
 * @see https://www.nextree.co.kr/p2081/
 *
 * @param $element
 * @param newElement
 */
const diffRender: TDiffRender = ($element, newElement) => {
  if (isNull($element)) return;

  const realDOM = $element;
  const virtualDOM = document.createElement($element.tagName);
  virtualDOM.innerHTML = newElement;

  const [realChildren, realLength] = getChildren(realDOM);
  const [virtualChildren, virtualLength] = getChildren(virtualDOM);

  for (let i = 0; i < getMaxLength(realLength, virtualLength); i++) {
    renderDOM(realDOM, realChildren[i], virtualChildren[i]);
  }
};

const getChildren = (target: HTMLElement): [HTMLElement[], number] => {
  const targetChildrens = Array.from(target.children) as HTMLElement[];
  return [targetChildrens, targetChildrens.length];
};

const isChangedNode: TNodeCompare = (node1, node2) => {
  if (isNodeNotEquals(node1, node2)) return true;
  if (isDifferenceAttributes(node1, node2)) return true;
  if (isNotEqualsLastContent(node1, node2)) return true;
  return false;
};

const isNotEqualsLastContent: TNodeCompare = (
  { children: oldChildren, textContent: oldText },
  { children: newChildren, textContent: newText },
) => {
  if (!isEmpty(oldChildren)) return false;
  if (!isEmpty(newChildren)) return false;
  if (!isEquals(oldText, newText)) return true;
  return false;
};

const isDifferenceAttributes: TNodeCompare = (real, virtual) => {
  return !!Array.from(real.attributes).find(({ name }) =>
    isEquals(real.getAttribute(name), virtual.getAttribute(name)),
  );
};

const renderDOM = ($element: HTMLElement, realNode: HTMLElement, virtualNode: HTMLElement) => {
  if (isOnlyExistLeft(realNode, virtualNode)) return realNode.remove();
  if (isOnlyExistRight(realNode, virtualNode)) return $element.appendChild(virtualNode);
  if (isChangedNode(realNode, virtualNode)) return realNode.replaceWith(virtualNode);

  const [realChildren, realLength] = getChildren(realNode);
  const [virtualChildren, virtualLength] = getChildren(virtualNode);

  for (let i = 0; i < getMaxLength(realLength, virtualLength); i++) {
    renderDOM(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default diffRender;
