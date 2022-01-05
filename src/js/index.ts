import { $ } from '../utils/domController.js';
import store from '../store/index.js';
import renderDefaultLayouts from '../components/layout/index.js';
import {
  createMenuItem,
  editMenuItem,
  removeMenuItem,
  setCurrentTab,
} from '../store/menu.js';
import { Tcategory } from '../types/store';

renderDefaultLayouts('#app');

// TODO: 타입 단언문을 선언문으로 변경
const menuForm = $('#espresso-menu-form');
const menuInput = $('#espresso-menu-name') as HTMLInputElement;
const menuList = $('#espresso-menu-list');

$('nav').addEventListener('click', (e: Event) => {
  const target = e.target as HTMLElement;
  const categoryId = target.dataset['categoryName'] as string;
  if (!categoryId) return;
  store.dispatch(setCurrentTab(categoryId));
});

menuForm.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  if (!menuInput.value) return;
  const { currentTab } = store.getState();
  createMenu(currentTab, menuInput.value.trim());
  menuInput.value = '';
});

menuList.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLElement;
  const targetNodeId = (target.parentElement as HTMLElement).id;
  if (target.matches('.menu-edit-button')) {
    editMenu(targetNodeId);
  } else if (target.matches('.menu-remove-button')) {
    removeMenu(targetNodeId);
  }
});

const createMenu = (category: Tcategory, menuName: string) => {
  const { menus } = store.getState();
  // TODO: 카테고리별로 20개까지 추가하도록 수정
  if (menus && menus.length === 20)
    return alert('메뉴는 20개까지 추가 가능합니다.');

  store.dispatch(createMenuItem(category.id, menuName));
};

const editMenu = (menuId: string) => {
  const newMenuName = prompt('수정할 메뉴명을 입력하세요.')?.trim();
  if (!newMenuName) return;
  store.dispatch(editMenuItem(menuId, newMenuName));
};

const removeMenu = (menuId: string) => {
  if (!confirm('메뉴를 삭제하시겠습니까?')) return;
  store.dispatch(removeMenuItem(menuId));
};
