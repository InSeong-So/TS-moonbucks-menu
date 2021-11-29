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
  if (!menuInput.value) return;
  createMenuList(menuTotalCount, menuInput.value);
  increaseTotalCount();
  setTotalCountText();
  menuInput.value = '';
});

/* 메뉴 생성 */
const createMenuList = (menuIndex: number, newMenuName: string) => {
  const $li = createMenuListItems(menuIndex);
  const $menuName = createMenuName(newMenuName);
  const $editBtn = createEditBtn(menuIndex);
  const $removeBtn = createRemoveBtn(menuIndex);

  menuList.appendChild($li);
  $li.append($menuName, $editBtn, $removeBtn);
};

const createMenuListItems = (menuIndex: number) => {
  const $li = document.createElement('li');
  $li.id = `espresso-menu-id-${menuIndex}`;
  $li.className = LI_STYLE;
  return $li;
};
const createMenuName = (newMenuName: string) => {
  const $menuName = document.createElement('span');
  $menuName.className = SPAN_STYLE;
  $menuName.textContent = newMenuName;
  return $menuName;
};
const createEditBtn = (menuIndex: number) => {
  const $editBtn = document.createElement('button');
  $editBtn.className = EDIT_BTN_STYLE;
  $editBtn.textContent = '수정';
  $editBtn.addEventListener('click', () => editMenu(menuIndex));
  return $editBtn;
};
const createRemoveBtn = (menuIndex: number) => {
  const $removeBtn = document.createElement('button');
  $removeBtn.className = REMOVE_BTN_STYLE;
  $removeBtn.textContent = '삭제';
  $removeBtn.addEventListener('click', () => removeMenu(menuIndex));
  return $removeBtn;
};

/* 메뉴 수정 */
const editMenu = (menuIndex: number) => {
  const newMenuName = window.prompt('수정할 메뉴명을 입력하세요.');
  if (!newMenuName) return;
  const menuNameElement = <HTMLSpanElement>(
    $(`#espresso-menu-id-${menuIndex}`).firstChild
  );
  menuNameElement.textContent = newMenuName;
};

/* 메뉴 삭제 */
const removeMenu = (menuIndex: number) => {
  if (!window.confirm('메뉴를 삭제하시겠습니까?')) return;
  $(`#espresso-menu-id-${menuIndex}`).remove();
  decreaseTotalCount();
  setTotalCountText();
};

const increaseTotalCount = () => menuTotalCount++;
const decreaseTotalCount = () => menuTotalCount--;
const setTotalCountText = () => {
  menuCounter.textContent = `총 ${menuTotalCount}개`;
};
