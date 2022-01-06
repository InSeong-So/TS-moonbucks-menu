import { TDiffRender, TNodeCompare } from 'DiffRender';
import {
  getMaxLength,
  isEmpty,
  isEquals,
  isNodeNotEquals,
  isOnlyExistLeft,
  isOnlyExistRight,
} from '../common';

/**
 *
 * @param $element
 * @param newElement
 */
const render: TDiffRender = ($old, $new) => {
  const realDOM = $old.firstChild as HTMLElement;
  const virtualDOM = $new;

  const [realChildren, realLength] = getChildren(realDOM);
  const [virtualChildren, virtualLength] = getChildren(virtualDOM);

  for (let i = 0; i < getMaxLength(realLength, virtualLength); i++) {
    renderDOM($old, realChildren[i], virtualChildren[i]);
  }
};

const getChildren = (target: HTMLElement): [HTMLElement[], number] => {
  if (!target) return [[], 0];
  const targetChildrens = Array.from(target.children) as HTMLElement[];
  return [targetChildrens, targetChildrens.length];
};

const isChangedNode: TNodeCompare = ($oldNode, $newNode) => {
  if (isNodeNotEquals($oldNode, $newNode)) return true;
  if (isDifferenceAttributes($oldNode, $newNode)) return true;
  if (isNotEqualsLastContent($oldNode, $newNode)) return true;
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

export default render;
