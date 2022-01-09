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
  toggleSoldOut: (menuId: string, category: string) => void;
  remove: (menuId: string, category: string) => void;
  fetchAll: () => void;
  // cache data
  getList: () => Array<MenuItem>;
  findById: (id: string | undefined) => MenuItem | undefined;
  findByText: (text: string) => MenuItem | undefined;
  changeTab: (selectedTab: CoffeeKeys) => void;
  currentTab: () => { koreanName: string; key: string };
}

export const createCurrentMenuRepository = (() => {
  let repository: CurrentMenuRepository;
  return (
    store: ReturnCreateStore<DefaultState, Actions>,
    db: any,
  ): CurrentMenuRepository => {
    const { dispatch, getState } = store;
    if (!repository) {
      repository = {
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
        remove: async (menuId: string, category: string) => {
          // db action, state action
          await menuClient.remove({ menuId, category });

          dispatch(removeMenu(menuId));
        },
        changeTab: (selectedTab: CoffeeKeys) => {
          dispatch(changeTab(selectedTab));
        },
        toggleSoldOut: async (menuId: string, category: string) => {
          // http.client
          const a = await menuClient.toggleSoldOut({ menuId, category }); // 서버를 믿는다...?
          console.log(a);
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
        fetchAll: async () => {
          const res = await menuClient.fetchAll();
          console.log(res);
        },
        add: async (text, category) => {
          const menuItem = await menuClient.add(text, category);
          dispatch(addMenu(adjustMenuItem(menuItem)));
        },
      };
    }
    return repository;
  };
})();
