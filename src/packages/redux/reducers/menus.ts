import { CategoryProps } from '../../../types/global.js';
import { Reducer } from '../../../types/redux.js';
import createActionType from '../common/createActionType.js';

const SELECTED_CATEGORY = 'menu/SELECTED_CATEGORY';

const [GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE] =
  createActionType('menu/GET_CATEGORIES');

const [INSERT_MENU, INSERT_MENU_SUCCESS, INSERT_MENU_FAILURE] =
  createActionType('menu/INSERT_MENU');

const [MODIFY_MENU, MODIFY_MENU_SUCCESS, MODIFY_MENU_FAILURE] =
  createActionType('menu/MODIFY_MENU');

const [SOLD_OUT_MENU, SOLD_OUT_MENU_SUCCESS, SOLD_OUT_MENU_FAILURE] =
  createActionType('menu/SOLD_OUT_MENU');

const [REMOVE_MENU, REMOVE_MENU_SUCCESS, REMOVE_MENU_FAILURE] =
  createActionType('menu/REMOVE_MENU');

interface StateProps {
  categories: CategoryProps[];
  selected: CategoryProps;
}

const initialState: StateProps = {
  categories: [],
  selected: {},
};

export const selectedCategory = (data: string) => ({
  type: SELECTED_CATEGORY,
  data,
});

export const getCategories = () => ({
  type: GET_CATEGORIES_SUCCESS,
});

export const insertMenu = (data: any) => ({
  type: INSERT_MENU,
  data,
});

export const modifyMenu = (data: any) => ({
  type: MODIFY_MENU,
  data,
});

export const soldOutMenu = (data: any) => ({
  type: SOLD_OUT_MENU,
  data,
});

export const removeMenu = (data: any) => ({
  type: REMOVE_MENU,
  data,
});

const menus: Reducer = (state = initialState, action = { type: '' }) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: [
          { id: 'espresso', text: '☕ 에스프레소', menus: [] },
          { id: 'frappuccino', text: '🥤 프라푸치노', menus: [] },
          { id: 'blended', text: '🍹 블렌디드', menus: [] },
          { id: 'teavana', text: '🍸 티바나', menus: [] },
          { id: 'desert', text: '🍰 디저트', menus: [] },
        ],
      };
    case SELECTED_CATEGORY:
      return {
        ...state,
        selected: state.categories.find(
          ({ id }: CategoryProps) => id === action.data,
        ),
      };
    case INSERT_MENU_SUCCESS:
    case MODIFY_MENU_SUCCESS:
    case SOLD_OUT_MENU_SUCCESS:
    case REMOVE_MENU_SUCCESS:
      return state;
    case GET_CATEGORIES_FAILURE:
    case INSERT_MENU_FAILURE:
    case MODIFY_MENU_FAILURE:
    case SOLD_OUT_MENU_FAILURE:
    case REMOVE_MENU_FAILURE:
    default:
      return state;
  }
};

export default menus;
