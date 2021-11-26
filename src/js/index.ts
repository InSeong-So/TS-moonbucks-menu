import $const from '../util/const.js';

const $ = (elementId: string) => {
  return <HTMLElement>document.getElementById(elementId);
};
const createElement = (elementName: string) => {
  return document.createElement(elementName);
};

const menuForm = $('espresso-menu-form');
const menuInput = <HTMLInputElement>$('espresso-menu-name');
const menuList = $('espresso-menu-list');
const menuCounter = $('menu-count');

let menuTotalCount = 0;

menuForm.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  menuInput.value && createMenu();
});

const setTotalCountText = () => {
  menuCounter.innerText = `총 ${menuTotalCount}개`;
};

const createMenuListElement = (menu: {
  newMenuName: string;
  menuIndex: number;
}) => {
  const { newMenuName, menuIndex } = menu;
  const li = createElement('li');
  const menuId = `espresso-menu-id-${menuIndex}`;
  li.className = $const.className.li;
  li.id = menuId;
  const menuName = createElement('span');
  menuName.className = $const.className.span;
  menuName.textContent = newMenuName;
  const editBtn = createElement('button');
  editBtn.className = $const.className.editBtn;
  editBtn.textContent = '수정';
  editBtn.addEventListener('click', () => editMenu(menuId));
  const removeBtn = createElement('button');
  removeBtn.className = $const.className.removeBtn;
  removeBtn.textContent = '삭제';
  removeBtn.addEventListener('click', () => removeMenu(menuId));
  menuList.appendChild(li);
  li.append(menuName, editBtn, removeBtn);
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
  const menuNameElement = <HTMLSpanElement>$(menuId).firstChild;
  menuNameElement.innerText = newMenuName;
};

/* 메뉴 삭제 */
const removeMenu = (menuId: string) => {
  const confirmed = window.confirm('메뉴를 삭제하시겠습니까?');
  if (!confirmed) return;
  $(menuId).remove();
  menuTotalCount--;
  setTotalCountText();
};
