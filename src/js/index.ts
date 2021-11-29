import constants from '../util/constants.js';

const $ = (selector: string) => {
  return <HTMLElement>document.querySelector(selector);
};

const menuForm = $('#espresso-menu-form');
const menuInput = <HTMLInputElement>$('#espresso-menu-name');
const menuList = $('#espresso-menu-list');
const menuCounter = $('#menu-count');

const { LI_STYLE, SPAN_STYLE, EDIT_BTN_STYLE, REMOVE_BTN_STYLE } =
  constants.CLASS_NAME;

menuForm.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  if (!menuInput.value) return;
  createMenuList(menuInput.value);
  setTotalCountText();
  menuInput.value = '';
});

/* 메뉴 생성 */
const createMenuList = (newMenuName: string) => {
  const $li = createMenuListItems();
  const $menuName = createMenuName(newMenuName);
  const $editBtn = createEditBtn();
  const $removeBtn = createRemoveBtn();

  menuList.appendChild($li);
  $li.append($menuName, $editBtn, $removeBtn);

  // TODO: menuId 가져오기
  $editBtn.addEventListener('click', () => editMenu(menuId));
  $removeBtn.addEventListener('click', () => removeMenu(menuId));
};

const addElement = (
  elName: string,
  attribute?: { id?: string; className?: string },
  text?: string,
) => {
  const { id, className } = attribute || {};
  const $el = document.createElement(elName);
  $el.id = id || '';
  $el.className = className || '';
  $el.textContent = text || '';
  return $el;
};

const createMenuListItems = () => {
  return addElement('li', {
    id: `espresso-menu-id-${1}`,
    className: LI_STYLE,
  });
};
const createMenuName = (newMenuName: string) => {
  return addElement('span', { className: SPAN_STYLE }, newMenuName);
};
const createEditBtn = () => {
  return addElement('button', { className: EDIT_BTN_STYLE }, '수정');
};
const createRemoveBtn = () => {
  return addElement('button', { className: REMOVE_BTN_STYLE }, '삭제');
};

/* 메뉴 수정 */
const editMenu = (menuId: number) => {
  const newMenuName = window.prompt('수정할 메뉴명을 입력하세요.');
  if (!newMenuName) return;
  const menuNameElement = <HTMLSpanElement>(
    $(`#espresso-menu-id-${menuId}`).firstChild
  );
  menuNameElement.textContent = newMenuName;
};

/* 메뉴 삭제 */
const removeMenu = (menuId: number) => {
  if (!window.confirm('메뉴를 삭제하시겠습니까?')) return;
  $(`#espresso-menu-id-${menuId}`).remove();
  setTotalCountText();
};

const setTotalCountText = () => {
  menuCounter.textContent = `총 ${menuList.childNodes.length}개`;
};
