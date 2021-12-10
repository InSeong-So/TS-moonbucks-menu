import { $, addElement, bindEvent } from '../utils/domController.js';
import {
  MENU_LIST_ATTR,
  MENU_NAME_ATTR,
  EDIT_BTN_ATTR,
  REMOVE_BTN_ATTR,
} from '../utils/constants/elements.js';
import { getUniqueNumber } from '../utils/common.js';

const menuForm = $('#espresso-menu-form');
const menuInput = <HTMLInputElement>$('#espresso-menu-name');

menuForm.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  if (!menuInput.value) return;
  const uuid = getUniqueNumber();
  const newElements = createMenuList(menuInput.value, uuid);
  const { $li, $editBtn, $removeBtn } = newElements;
  addEventOnMenuItemBtn($li.id, $editBtn, $removeBtn);
  setTotalCountText();
  menuInput.value = '';
});

/* 메뉴 생성 */
const createMenuList = (newMenuName: string, uuid: number) => {
  const $li = createMenuListItems(uuid);
  const $menuName = createMenuName(newMenuName);
  const $editBtn = createEditBtn();
  const $removeBtn = createRemoveBtn();

  $('#espresso-menu-list').appendChild($li);
  $li.append($menuName, $editBtn, $removeBtn);

  return { $li, $editBtn, $removeBtn };
};

const createMenuListItems = (uuid: number) => {
  const { id } = MENU_LIST_ATTR;
  return addElement({ ...MENU_LIST_ATTR, id: `${id}-${uuid}` });
};
const createMenuName = (newMenuName: string) => {
  return addElement({ ...MENU_NAME_ATTR, text: newMenuName });
};
const createEditBtn = () => {
  return addElement(EDIT_BTN_ATTR);
};
const createRemoveBtn = () => {
  return addElement(REMOVE_BTN_ATTR);
};

/* 메뉴 수정 */
const editMenu = (menuId: string) => {
  const newMenuName = prompt('수정할 메뉴명을 입력하세요.')?.trim();
  if (!newMenuName) return;
  const menuNameElement = <HTMLSpanElement>$(`#${menuId}`).firstChild;
  menuNameElement.textContent = newMenuName;
};

/* 메뉴 삭제 */
const removeMenu = (menuId: string) => {
  if (!confirm('메뉴를 삭제하시겠습니까?')) return;
  $(`#${menuId}`).remove();
  setTotalCountText();
};

const addEventOnMenuItemBtn = (
  menuId: string,
  $editBtn: HTMLElement,
  $removeBtn: HTMLElement,
) => {
  bindEvent($editBtn, 'click', () => {
    editMenu(menuId);
  });
  bindEvent($removeBtn, 'click', () => {
    removeMenu(menuId);
  });
};

const getMenuTotalCount = () => {
  return $('#espresso-menu-list').childNodes.length;
};

const setTotalCountText = () => {
  const totalCount = getMenuTotalCount();
  $('#menu-count').textContent = `총 ${totalCount}개`;
};
