import {
  $,
  addElement,
  getElCreationOptions,
  bindEvent,
} from '../util/domController.js';
import {
  MENU_LIST_ATTR,
  MENU_NAME_ATTR,
  EDIT_BTN_ATTR,
  REMOVE_BTN_ATTR,
} from '../util/const/elements.js';
import { getUniqueNumber } from '../util/common.js';

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
  const { ID } = MENU_LIST_ATTR;
  const newConstants = { ...MENU_LIST_ATTR, ID: `${ID}-${uuid}` };
  const options = getElCreationOptions(newConstants);
  return addElement(options);
};
const createMenuName = (newMenuName: string) => {
  const newConstants = { ...MENU_NAME_ATTR, TEXT: newMenuName };
  const options = getElCreationOptions(newConstants);
  return addElement(options);
};
const createEditBtn = () => {
  const options = getElCreationOptions(EDIT_BTN_ATTR);
  return addElement(options);
};
const createRemoveBtn = () => {
  const options = getElCreationOptions(REMOVE_BTN_ATTR);
  return addElement(options);
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
