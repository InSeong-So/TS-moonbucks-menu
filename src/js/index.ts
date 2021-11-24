import $const from '../util/const.js';

const $ = (elementId: string) => {
  return <HTMLElement>document.getElementById(elementId);
};
const createElement = (elementName: string) => {
  return document.createElement(elementName);
};

const menuInput = <HTMLInputElement>$('espresso-menu-name');
const menuCreationBtn = $('espresso-menu-submit-button');
const menuList = $('espresso-menu-list');
const menuCounter = $('menu-count');

let menuTotalCount = 0;

menuInput.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    menuInput.value && createMenu();
  }
});
menuCreationBtn.addEventListener('click', () => {
  menuInput.value && createMenu();
});

/* 메뉴 추가 */
const createMenu = () => {
  createMenuListElement({
    newMenuName: menuInput.value,
    menuIndex: menuTotalCount,
  });
  menuTotalCount++;
  menuCounter.innerText = `총 ${menuTotalCount}개`;
  menuInput.value = '';
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
  menuList.appendChild(li);
  const menuName = createElement('span');
  menuName.className = $const.className.span;
  menuName.textContent = newMenuName;
  li.appendChild(menuName);
  const editBtn = createElement('button');
  editBtn.className = $const.className.editBtn;
  editBtn.textContent = '수정';
  li.appendChild(editBtn);
  editBtn.addEventListener('click', () => editMenu(menuId));
  const removeBtn = createElement('button');
  removeBtn.className = $const.className.removeBtn;
  removeBtn.textContent = '삭제';
  li.appendChild(removeBtn);
  removeBtn.addEventListener('click', () => removeMenu(menuId));
};

/* 메뉴 수정 */
const editMenu = (menuId: string) => {
  console.log('수정', menuId);
};

/* 메뉴 삭제 */
const removeMenu = (menuId: string) => {
  console.log('삭제', menuId);
};
