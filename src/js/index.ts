import { $ } from '../utils/domController.js';
import subscribeToMenuListRendering from '../components/MenuItem.js';
import { menuStore } from '../store/index.js';
import { createMenuItem } from '../store/menu.js';

const menuForm = $('#espresso-menu-form');
const menuInput = <HTMLInputElement>$('#espresso-menu-name');

// TODO: 구독을 언제 어디서 해줘야하나?
subscribeToMenuListRendering();

menuForm.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  if (!menuInput.value) return;
  createMenu(menuInput.value);
  setTotalCountText();
  menuInput.value = '';
});

const createMenu = (menuName: string) => {
  const { menus } = menuStore.getState();
  if (menus.length === 20) {
    alert('메뉴는 20개까지 추가 가능합니다.');
    return;
  }
  menuStore.dispatch(createMenuItem(menuName));
};

// TODO: 이벤트 위임
const editMenu = (menuId: string) => {
  const newMenuName = prompt('수정할 메뉴명을 입력하세요.')?.trim();
  if (!newMenuName) return;
  const menuNameElement = <HTMLSpanElement>$(`#${menuId}`).firstChild;
  menuNameElement.textContent = newMenuName;
};

const removeMenu = (menuId: string) => {
  if (!confirm('메뉴를 삭제하시겠습니까?')) return;
  $(`#${menuId}`).remove();
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
