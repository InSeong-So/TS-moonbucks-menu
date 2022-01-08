// 추후 서비스 고도화하기
import { CoffeeKeys, MenuItem } from '../type';
import { CurrentMenuRepository } from './Repository';
import { MESSAGES } from '../../constants';
export interface CurrentMenuService {
  getList: () => MenuItem[];
  currentTab: () => { koreanName: string; key: string };
  changeTab: (selectedTab: CoffeeKeys) => void;
  remove: (menuId: string | undefined) => void;
  toggleSoldOut: (menuId: string | undefined) => void;
  edit: (menuId: string | undefined) => void;
  add: (text: string) => void;
}
export const createCurrentMenuService = (() => {
  console.log('클로져!!');
  return (currentMenuRepo: CurrentMenuRepository): CurrentMenuService => ({
    getList: currentMenuRepo.getList,
    currentTab: currentMenuRepo.currentTab,

    changeTab: (selectedTab: CoffeeKeys) => {
      currentMenuRepo.changeTab(selectedTab);
    },
    toggleSoldOut: async (menuId: string | undefined) => {
      if (menuId === undefined) {
        return;
      }
      if (!currentMenuRepo.findById(menuId)) {
        alert('수정할 수 없는 메뉴입니다.');
        return;
      }
      const category = currentMenuRepo.currentTab().key;
      currentMenuRepo.toggleSoldOut(menuId, category);
    },
    // 시도1 컴포넌트에서 ui 조작까지 다 도맡아 하기
    remove: async (menuId: string | undefined) => {
      // validate
      if (menuId === undefined) {
        return;
      }
      if (!currentMenuRepo.findById(menuId)) {
        alert('삭제할 수 없는 메뉴입니다.');
        return;
      }
      const category = currentMenuRepo.currentTab().key;
      currentMenuRepo.remove(menuId, category);
    },
    // 시도2 service에서 ui 조작까지 다 도맡아 하기
    edit: async (menuId: string | undefined) => {
      const menu = currentMenuRepo.findById(menuId);
      if (!menu) {
        alert('수정할 수 없는 메뉴입니다.');
        return;
      }

      const newName = prompt(MESSAGES.PROMPT_EDIT_MENU, menu?.text);
      if (newName === null || newName === '') {
        alert('빈값을 입력할 수 없습니다.');
        return;
      }

      if (currentMenuRepo.findByText(newName)) {
        // 원본과 똑같으므로 바꾸지 않는다. 추후 기존과 동일한 정보로 수정할 수 없다는 ui 추가예정
        return;
      }
      const category = currentMenuRepo.currentTab().key;
      currentMenuRepo.edit({ menuId: menu.id, text: newName, category });
    },
    // 에러, validate, ui 컨트롤 영역
    add: async (text: string) => {
      // validate
      if (text === '') {
        return;
      }
      if (currentMenuRepo.findByText(text)) {
        alert('이미 존재하고 있는 음료입니다.');
        return;
      }

      const category = currentMenuRepo.currentTab().key;
      try {
        await currentMenuRepo.add(text, category);
      } catch (e: any) {
        alert(e?.message);
      }
    },
  });
})();

// 임시 테스트
