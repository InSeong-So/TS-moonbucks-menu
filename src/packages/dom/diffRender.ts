import {
  getMaxLength,
  isNodeNotEquals,
  isOnlyExistLeft,
  isOnlyExistRight,
} from '@/helpers';

const diffRender = ($targetElement: HTMLElement, template: string) => {
  const realDom = $targetElement;
  const virtualDom = <HTMLElement>realDom.cloneNode(true);
  virtualDom.innerHTML = template;

  const [realChilds, realLength] = getThisDomChilds(realDom);
  const [virtualChilds, virtualLength] = getThisDomChilds(virtualDom);

  for (let i = 0; i < getMaxLength(realLength, virtualLength); i++) {
    renderDom(realDom, realChilds[i], virtualChilds[i]);
  }
};

const getThisDomChilds = (target: HTMLElement): [HTMLElement[], number] => {
  const targetChildrens = <HTMLElement[]>Array.from(target.children);
  return [targetChildrens, targetChildrens.length];
};

const isChangedNode = (node1: HTMLElement, node2: HTMLElement) => {
  if (isNodeNotEquals(node1, node2)) return true;
  if (isDifferenceAttributes(node1, node2)) return true;
  if (isNotEqualsLastContent(node1, node2)) return true;

  return false;
};

const isNotEqualsLastContent = (node1: HTMLElement, node2: HTMLElement) => {
  if (node1.children.length !== 0) return false;
  if (node2.children.length !== 0) return false;
  if (node1.textContent !== node2.textContent) return true;
  return false;
};

const isDifferenceAttributes = (real: HTMLElement, virtual: HTMLElement) => {
  return !!Array.from(real.attributes).find(
    ({ name }) => real.getAttribute(name) !== virtual.getAttribute(name),
  );
};

const renderDom = (
  $targetElement: HTMLElement,
  realNode: HTMLElement,
  virtualNode: HTMLElement,
) => {
  if (isOnlyExistLeft(realNode, virtualNode)) {
    realNode.remove();
    return;
  }

  if (isOnlyExistRight(realNode, virtualNode)) {
    $targetElement.appendChild(virtualNode);
    return;
  }

  if (isChangedNode(realNode, virtualNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  const [realChilds, realLength] = getThisDomChilds(realNode);
  const [virtualChilds, virtualLength] = getThisDomChilds(virtualNode);

  for (let i = 0; i < getMaxLength(realLength, virtualLength); i++) {
    renderDom(realNode, realChilds[i], virtualChilds[i]);
  }
};

export default diffRender;
