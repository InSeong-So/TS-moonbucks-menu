import { $, addElement, getElCreationOptions } from '../util/domController.js';
import constants from '../util/constants.js';
import { getUniqueNumber } from '../util/common.js';

const menuForm = $('#espresso-menu-form');
const menuInput = <HTMLInputElement>$('#espresso-menu-name');

menuForm.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  if (!menuInput.value) return;
  const uuid = getUniqueNumber();
  createMenuList(menuInput.value, uuid);
  addEventOnBtn();
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
};

const createMenuListItems = (uuid: number) => {
  const { ID } = constants.EL.MENU_LIST;
  const newConstants = { ...constants.EL.MENU_LIST, ID: `${ID}-${uuid}` };
  const options = getElCreationOptions(newConstants);
  return addElement(options);
};
const createMenuName = (newMenuName: string) => {
  const newConstants = { ...constants.EL.MENU_NAME, TEXT: newMenuName };
  const options = getElCreationOptions(newConstants);
  return addElement(options);
};
const createEditBtn = () => {
  const options = getElCreationOptions(constants.EL.EDIT_BTN);
  return addElement(options);
};
const createRemoveBtn = () => {
  const options = getElCreationOptions(constants.EL.REMOVE_BTN);
  return addElement(options);
};

/* 메뉴 수정 */
const editMenu = (menuId: number) => {
  const newMenuName = window.prompt('수정할 메뉴명을 입력하세요.');
  if (!newMenuName) return;
  const menuNameElement = <HTMLSpanElement>$(`#${menuId}`).firstChild;
  menuNameElement.textContent = newMenuName;
};

/* 메뉴 삭제 */
const removeMenu = (menuId: number) => {
  if (!window.confirm('메뉴를 삭제하시겠습니까?')) return;
  $(`#${menuId}`).remove();
  setTotalCountText();
};

const addEventOnBtn = () => {
  $('#espresso-edit-button').addEventListener('click', (e: Event) => {
    editMenu(e.target.parentNode.id);
  });
  $('#espresso-remove-button').addEventListener('click', (e: Event) => {
    removeMenu(e.target.parentNode.id);
  });
};

const getMenuTotalCount = () => {
  return $('#espresso-menu-list').childNodes.length;
};

const setTotalCountText = () => {
  const totalCount = getMenuTotalCount();
  $('#menu-count').textContent = `총 ${totalCount}개`;
};
