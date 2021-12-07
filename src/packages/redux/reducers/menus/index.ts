import {
  GET_CATEGORIES_FAILURE,
  GET_CATEGORIES_SUCCESS,
  INSERT_MENU_FAILURE,
  INSERT_MENU_SUCCESS,
  LOAD_MENU_FAILURE,
  LOAD_MENU_SUCCESS,
  MODIFY_MENU_FAILURE,
  MODIFY_MENU_SUCCESS,
  REMOVE_MENU_FAILURE,
  REMOVE_MENU_SUCCESS,
  SELECTED_CATEGORY,
  SOLD_OUT_MENU_FAILURE,
  SOLD_OUT_MENU_SUCCESS,
} from './actions';
import { CategoryProps } from 'component';
import { Reducer } from 'redux';

interface StateProps {
  categories: CategoryProps[];
  selected: CategoryProps;
}

const initialState: StateProps = {
  categories: [],
  selected: {},
};

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
    case LOAD_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: action.data,
        menuCount: action.data.length,
      };
    case INSERT_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: [
          ...(state[action.category] as string[]),
          action.data,
        ],
        menuCount: ++state.menuCount,
      };
    case MODIFY_MENU_SUCCESS:
    case SOLD_OUT_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: state[action.category].map((item: any) => {
          if (item.id === action.data.id) {
            return action.data;
          }
          return item;
        }),
      };
    case REMOVE_MENU_SUCCESS:
      return {
        ...state,
        [action.category]: action.data,
        menuCount: --state.menuCount,
      };
    /**
     * @todo 에러 처리
     */
    case GET_CATEGORIES_FAILURE:
    case LOAD_MENU_FAILURE:
    case INSERT_MENU_FAILURE:
    case MODIFY_MENU_FAILURE:
    case SOLD_OUT_MENU_FAILURE:
    case REMOVE_MENU_FAILURE:
    default:
      return state;
  }
};

export default menus;
