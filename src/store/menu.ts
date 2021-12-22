import { actionType, stateType } from './type.js';

/* 리덕스에서 관리 할 상태 정의 */
const initialState: stateType = {
  menus: [],
};

/* 액션 타입 정의 */
const CREATE_MENU = 'CREATE_MENU' as const;
const EDIT_MENU = 'EDIT_MENU' as const;
const REMOVE_MENU = 'REMOVE_MENU' as const;

/* 액션 생성 함수 */
export const createMenuItem = (menuName: string) => {
  return {
    type: CREATE_MENU,
    text: menuName,
  };
};

export const editMenuItem = (menuIdx: number, menuName: string) => {
  return {
    type: EDIT_MENU,
    menuIdx,
    text: menuName,
  };
};

export const removeMenuItem = (menuIdx: number) => {
  return {
    type: REMOVE_MENU,
    menuIdx,
  };
};

// 리듀서는 새로운 상태를 생성하는 함수.
export function reducer(state = initialState, action: actionType) {
  const { type, menuIdx = 0, text = '' } = action;
  const { menus } = state;

  switch (type) {
    case CREATE_MENU: {
      const newState = menus.concat([text]);
      return { menus: newState };
    }
    case EDIT_MENU: {
      const newState = [...menus];
      newState[menuIdx] = text;
      return { menus: newState };
    }
    case REMOVE_MENU: {
      const newState = menus.filter(menu => menu !== menus[menuIdx]);
      return { menus: newState };
    }
    default:
      return state;
  }
}
