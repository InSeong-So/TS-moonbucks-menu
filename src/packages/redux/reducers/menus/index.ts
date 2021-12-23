import {
  INSERT_MENU_FAILURE,
  INSERT_MENU_SUCCESS,
  LOAD_MENU_FAILURE,
  LOAD_MENU_SUCCESS,
  MODIFY_MENU_FAILURE,
  MODIFY_MENU_SUCCESS,
  REMOVE_MENU_FAILURE,
  REMOVE_MENU_SUCCESS,
  SOLD_OUT_MENU_FAILURE,
  SOLD_OUT_MENU_SUCCESS,
} from './actions';
import { CategoryProps, MenuItemProps } from 'component';
import { Reducer } from 'redux';

interface StateProps {
  categories: CategoryProps[];
  selected: CategoryProps;
}

const initialState: StateProps = {
  categories: [
    { id: 'espresso', text: '☕ 에스프레소', menus: [] },
    { id: 'frappuccino', text: '🥤 프라푸치노', menus: [] },
    { id: 'blended', text: '🍹 블렌디드', menus: [] },
    { id: 'teavana', text: '🍸 티바나', menus: [] },
    { id: 'desert', text: '🍰 디저트', menus: [] },
  ],
  selected: { id: 'espresso', text: '☕ 에스프레소', menus: [] },
};

const menus: Reducer = (state = initialState, action = { type: '' }) => {
  switch (action.type) {
    case LOAD_MENU_SUCCESS: {
      const selectedMenu = state.categories.map((category: CategoryProps) => {
        if (category.id !== action.category) return category;
        return { ...category, menus: action.data };
      });
      return {
        ...state,
        categories: selectedMenu,
        selected: selectedMenu.find((category: CategoryProps) => category.id === action.category),
      };
    }
    case INSERT_MENU_SUCCESS: {
      const targetCategory = state.categories.find(
        (category: CategoryProps) => category.id === action.category,
      );
      targetCategory.menus.push(action.data);
      const insertedMenu = state.categories.map((category: CategoryProps) => {
        if (category.id === targetCategory.id) return targetCategory;
        return category;
      });
      return {
        ...state,
        categories: insertedMenu,
        selected: targetCategory,
      };
    }
    case MODIFY_MENU_SUCCESS:
    case SOLD_OUT_MENU_SUCCESS: {
      const updatedItem = state.categories
        .find((category: CategoryProps) => category.id === action.category)
        .menus.map((menu: MenuItemProps) => {
          if (menu.menuId === action.data.menuId) return action.data;
          return menu;
        });
      const updatedMenu = state.categories.map((category: CategoryProps) => {
        if (category.id !== action.category) return category;
        return { ...category, menus: updatedItem };
      });
      return {
        ...state,
        categories: updatedMenu,
        selected: updatedMenu.find((category: CategoryProps) => category.id === action.category),
      };
    }
    case REMOVE_MENU_SUCCESS: {
      const removedItem = state.categories
        .find((category: CategoryProps) => category.id === action.category)
        .menus.filter((menu: MenuItemProps) => menu.menuId !== action.menuId);
      const removedMenu = state.categories.map((category: CategoryProps) => {
        if (category.id !== action.category) return category;
        return { ...category, menus: removedItem };
      });
      return {
        ...state,
        categories: removedMenu,
        selected: removedMenu.find((category: CategoryProps) => category.id === action.category),
      };
    }
    /**
     * @todo 에러 처리
     */
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
