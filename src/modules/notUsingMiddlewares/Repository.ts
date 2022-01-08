import {
  Actions,
  CoffeeKeys,
  DefaultState,
  MenuItem,
  MenuItemFormServer,
} from '../type';
import { ReturnCreateStore } from '../../core/myRedux';
import {
  addMenu,
  changeTab,
  editMenu,
  removeMenu,
  soldOutMenu,
} from '../actions';
import { Coffee } from '../constants';
import { menuClient } from '../../networks/httpClient';

const adjustMenuItem = (menuItem: MenuItemFormServer): MenuItem => ({
  ...menuItem,
  text: menuItem.name,
});

export interface CurrentMenuRepository {
  add: (text: string, category: string) => void;
  edit: ({
    menuId,
    text,
    category,
  }: {
    menuId: string;
    text: string;
    category: string;
  }) => void;
  getList: () => Array<MenuItem>;
  findById: (id: string | undefined) => MenuItem | undefined;
  findByText: (text: string) => MenuItem | undefined;
  changeTab: (selectedTab: CoffeeKeys) => void;
  toggleSoldOut: (menuId: string, category: string) => void;
  remove: (menuId: string, category: string) => void;
  currentTab: () => { koreanName: string; key: string };
}

export const createCurrentMenuRepository = (() => {
  return (
    store: ReturnCreateStore<DefaultState, Actions>,
    db: any,
  ): CurrentMenuRepository => {
    const { dispatch, getState } = store;
    return {
      currentTab: () => {
        const currentState = getState();
        return Coffee[currentState.currentTab];
      },
      getList: () => {
        const currentState = getState();
        return currentState.menus[currentState.currentTab];
      },
      findById: (id: string | undefined) => {
        return createCurrentMenuRepository(store, db)
          .getList()
          .find(coffee => coffee.id === id);
      },
      findByText: (text: string) => {
        return createCurrentMenuRepository(store, db)
          .getList()
          .find(coffee => coffee.text === text);
      },
      remove: (menuId: string) => {
        // db action, state action
        dispatch(removeMenu(menuId));
      },
      changeTab: (selectedTab: CoffeeKeys) => {
        dispatch(changeTab(selectedTab));
      },
      toggleSoldOut: (menuId: string) => {
        // http.client
        dispatch(soldOutMenu(menuId));
      },
      edit: async ({ menuId, text, category }) => {
        // http.client put
        const newMenu = await menuClient.editText({ menuId, text, category });
        dispatch(
          editMenu({
            ...adjustMenuItem(newMenu),
          }),
        );
      },
      add: async (text, category) => {
        const menuItem = await menuClient.add(text, category);
        console.log(menuItem);
        dispatch(addMenu(adjustMenuItem(menuItem)));
      },
    };
  };
})();
