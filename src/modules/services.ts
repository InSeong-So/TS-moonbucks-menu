// 추후 서비스 고도화하기
import getStore from './store.js';
import { CoffeeKeys, MenuItem } from './type';
import { getUUID } from '../utils/util.js';
import {
  addMenu,
  changeTab,
  editMenu,
  removeMenu,
  soldOutMenu,
} from './actions.js';

const currentMenuService = (() => {
  const { dispatch, getState } = getStore();
  console.log('클로져!!');
  return () => ({
    findById: (id: string) => {
      return currentMenuService()
        .getList()
        .find(coffee => coffee.id === id);
    },
    findByText: (text: string) => {
      return currentMenuService()
        .getList()
        .find(coffee => coffee.text === text);
    },

    changeTab: (selectedTab: CoffeeKeys) => {
      dispatch(changeTab(selectedTab));
    },
    getList: () => {
      const currentState = getState();
      const res = currentState.menus[currentState.currentTab];
      return res;
    },
    remove: (menuId: string) => {
      // validate
      if (!currentMenuService().findById(menuId)) {
        alert('삭제할 수 없는 메뉴입니다.');
        return;
      }
      dispatch(removeMenu(menuId));
    },
    toggleSoldOut: (menuId: string) => {
      if (!currentMenuService().findById(menuId)) {
        alert('수정할 수 없는 메뉴입니다.');
        return;
      }
      dispatch(soldOutMenu(menuId));
    },
    edit: (menuId: string, newText: string) => {
      const menu = currentMenuService().findById(menuId);
      if (!menu) {
        alert('수정할 수 없는 메뉴입니다.');
        return;
      }
      if (currentMenuService().findByText(newText)) {
        // 원본과 똑같으므로 바꾸지 않는다. 추후 기존과 동일한 정보로 수정할 수 없다는 ui 추가예정
        return;
      }
      dispatch(
        editMenu({
          ...menu,
          text: newText,
        }),
      );
    },
    add: (text: string) => {
      // validate
      if (text === '') {
        return;
      }
      if (currentMenuService().findByText(text)) {
        alert('이미 존재하고 있는 음료입니다.');
        return;
      }
      const newId = getUUID();
      const newMenu: MenuItem = {
        id: newId,
        text,
        isSoldOut: false,
      };
      dispatch(addMenu(newMenu));
    },
  });
})();

// 임시 테스트
// currentMenuService().add('tlsgh');
// const menuId = currentMenuService().getList()[0].id;
//
// console.log(currentMenuService().getList());
// currentMenuService().toggleSoldOut(menuId);
// console.log(currentMenuService().getList());
