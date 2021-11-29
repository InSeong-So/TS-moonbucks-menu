import constants from '../util/constants.js';

const $ = (selector: string) => {
  return <HTMLElement>document.querySelector(selector);
};

const menuForm = $('#espresso-menu-form');
const menuInput = <HTMLInputElement>$('#espresso-menu-name');
const menuList = $('#espresso-menu-list');
const menuCounter = $('#menu-count');

let menuTotalCount = 0;
const { LI_STYLE, SPAN_STYLE, EDIT_BTN_STYLE, REMOVE_BTN_STYLE } =
  constants.CLASS_NAME;

menuForm.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  menuInput.value && createMenu();
});

const setTotalCountText = () => {
  menuCounter.textContent = `총 ${menuTotalCount}개`;
};

const createMenuListElement = (menu: {
  newMenuName: string;
  menuIndex: number;
}) => {
  const { newMenuName, menuIndex } = menu;

  const menuId = `espresso-menu-id-${menuIndex}`;

  const $li = createLiElement(menuId);
  const $menuName = createSpanElement(newMenuName);
  const $editBtn = createEditBtnElement(menuId);
  const $removeBtn = createRemoveBtnElement(menuId);

  menuList.appendChild($li);
  $li.append($menuName, $editBtn, $removeBtn);
};

const createLiElement = (menuId) => {
  const $li = document.createElement('li');
  $li.id = menuId;
  $li.className = LI_STYLE;
  return $li;
};
const createSpanElement = (newMenuName) => {
  const $menuName = document.createElement('span');
  $menuName.className = SPAN_STYLE;
  $menuName.textContent = newMenuName;
  return $menuName;
};
const createEditBtnElement = (menuId) => {
  const $editBtn = document.createElement('button');
  $editBtn.className = EDIT_BTN_STYLE;
  $editBtn.textContent = '수정';
  $editBtn.addEventListener('click', () => editMenu(menuId));
  return $editBtn;
};
const createRemoveBtnElement = (menuId) => {
  const $removeBtn = document.createElement('button');
  $removeBtn.className = REMOVE_BTN_STYLE;
  $removeBtn.textContent = '삭제';
  $removeBtn.addEventListener('click', () => removeMenu(menuId));
  return $removeBtn;
};

/* 메뉴 추가 */
const createMenu = () => {
  createMenuListElement({
    newMenuName: menuInput.value,
    menuIndex: menuTotalCount,
  });
  menuTotalCount++;
  setTotalCountText();
  menuInput.value = '';
};

/* 메뉴 수정 */
const editMenu = (menuId: string) => {
  const newMenuName = window.prompt('수정할 메뉴명을 입력하세요.');
  if (!newMenuName) return;
  const menuNameElement = <HTMLSpanElement>$(`#${menuId}`).firstChild;
  menuNameElement.textContent = newMenuName;
};

/* 메뉴 삭제 */
const removeMenu = (menuId: string) => {
  const confirmed = window.confirm('메뉴를 삭제하시겠습니까?');
  if (!confirmed) return;
  $(`#${menuId}`).remove();
  menuTotalCount--;
  setTotalCountText();
};
