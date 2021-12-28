import { util, valid } from '@/helpers';
// import htmlParser from '@/dom/parser';

const { getMaxLength } = util;
const { isNull, isEmpty, isEquals, isNodeNotEquals, isOnlyExistLeft, isOnlyExistRight } = valid;

// const search = (tree: any): any => {
//   if (tree['children'] === undefined) return [];
//   if (tree.children.length === 0) return [];
//   const app = [];
//   for (const child of tree.children) {
//     console.log(child);
//     if (child.attributes && child.attributes['data-component']) {
//       app.push(child);
//     } else if (child.children ?? child.length > 0) {
//       return search(child);
//     }
//   }
//   if (app.length > 0) return app;
// };

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
