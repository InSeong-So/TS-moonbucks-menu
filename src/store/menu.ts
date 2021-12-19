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

export const editMenuItem = (menuId: number, text: string) => {
  return {
    type: EDIT_MENU,
    text,
  };
};

export const removeMenuItem = (menuId: number) => {
  return {
    type: REMOVE_MENU,
    menuId,
  };
};

// 리듀서는 새로운 상태를 생성하는 함수.
export function reducer(state = initialState, action: actionType) {
  console.log('여기는 reducer, action객체 확인>>', action);
  console.log('reducer state>>', state);

  const { type, text = '' } = action;
  switch (type) {
    case CREATE_MENU:
      state.menus.push(text);
      return state;
    case EDIT_MENU:
      return {
        ...state,
        text,
      };
    case REMOVE_MENU:
      return {
        ...state,
      };
    default:
      return state;
  }
}
