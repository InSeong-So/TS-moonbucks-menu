import { TmenuAction } from '../types/store.js';
import { Tstate } from '../types/store.js';

/* 액션 타입 정의 */
const CREATE_MENU = 'CREATE_MENU' as const;
const EDIT_MENU = 'EDIT_MENU' as const;
const REMOVE_MENU = 'REMOVE_MENU' as const;
const SET_CURRENT_TAB = 'SET_CURRENT_TAB' as const;

/* 액션 생성 함수 */
export const createMenuItem = (categoryId: string, menuName: string) => ({
  type: CREATE_MENU,
  payload: {
    categoryId,
    menuName,
  },
});

export const editMenuItem = (menuIdx: number, menuName: string) => ({
  type: EDIT_MENU,
  payload: {
    menuIdx,
    menuName,
  },
});

export const removeMenuItem = (menuIdx: number) => ({
  type: REMOVE_MENU,
  payload: {
    menuIdx,
  },
});

export const setCurrentTab = (categoryId: string) => ({
  type: SET_CURRENT_TAB,
  payload: {
    categoryId,
  },
});

// 리듀서는 새로운 상태를 생성하는 함수.
export default function reducer(state: Tstate, action: TmenuAction) {
  const { type, payload } = action;
  const { categoryId = '', menuIdx = 0, menuName = '' } = payload;
  const { menus, categories } = state;

  // TODO: 스프레드 사용과 콘캣 사용 통일 필요
  switch (type) {
    case CREATE_MENU: {
      const newMenuList = [...menus, { categoryId, menuName }];
      return { ...state, menus: newMenuList };
    }
    case EDIT_MENU: {
      const newState = [...menus];
      console.log('edit newstate', menuIdx, newState[menuIdx]);
      newState[menuIdx].menuName = menuName;
      return { ...state, menus: newState };
    }
    case REMOVE_MENU: {
      const newState = menus.filter(menu => menu !== menus[menuIdx]);
      return { ...state, menus: newState };
    }
    case SET_CURRENT_TAB: {
      const category = categories.find(category => category.id === categoryId);
      return { ...state, currentTab: category };
    }
    default:
      return state;
  }
}
