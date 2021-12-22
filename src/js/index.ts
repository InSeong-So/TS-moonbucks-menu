import { $ } from '../utils/domController.js';
import { menuStore } from '../store/index.js';
import renderDefaultLayouts from '../components/layout/index.js';
import renderMenuList from '../components/MenuItem.js';
import {
  createMenuItem,
  editMenuItem,
  removeMenuItem,
} from '../store/modules/menu.js';

renderDefaultLayouts('#app');

// TODO: 구독을 언제 어디서 해줘야하나?
menuStore.subscribe(renderMenuList);

const menuForm = $('#espresso-menu-form');
const menuInput = <HTMLInputElement>$('#espresso-menu-name');
const menuList = $('#espresso-menu-list');

menuForm.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  if (!menuInput.value) return;
  createMenu(menuInput.value.trim());
  setTotalCountText();
  menuInput.value = '';
});

menuList.addEventListener('click', (e: Event) => {
  const target = <HTMLElement>e.target;
  const targetNodeId = (<HTMLElement>target.parentElement).id;
  const targetNodeIndex = targetNodeId.split('-')[3];
  if (target.matches('.menu-edit-button')) {
    editMenu(parseInt(targetNodeIndex));
  } else if (target.matches('.menu-remove-button')) {
    removeMenu(parseInt(targetNodeIndex));
  }
});

const createMenu = (menuName: string) => {
  const { menus } = menuStore.getState();
  if (menus && menus.length === 20) {
    alert('메뉴는 20개까지 추가 가능합니다.');
    return;
  }
  menuStore.dispatch(createMenuItem(menuName));
};

const editMenu = (menuId: number) => {
  const newMenuName = prompt('수정할 메뉴명을 입력하세요.')?.trim();
  if (!newMenuName) return;
  menuStore.dispatch(editMenuItem(menuId, newMenuName));
};

const removeMenu = (menuId: number) => {
  if (!confirm('메뉴를 삭제하시겠습니까?')) return;
  menuStore.dispatch(removeMenuItem(menuId));
  setTotalCountText();
};

const getMenuTotalCount = () => {
  const { menus } = menuStore.getState();
  return menus.length;
};

const setTotalCountText = () => {
  const totalCount = getMenuTotalCount();
  $('#menu-count').textContent = `총 ${totalCount}개`;
};
