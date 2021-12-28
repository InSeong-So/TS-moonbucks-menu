import { Actions, CoffeeKeys, DefaultState, MenuItem } from '../type';
import { ReturnCreateStore } from '../../core/myRedux';
import {
  addMenu,
  changeTab,
  editMenu,
  removeMenu,
  soldOutMenu,
} from '../actions';
import { Coffee } from '../constants';

export interface CurrentMenuRepository {
  add: (newMenu: MenuItem) => void;
  edit: (newMenu: MenuItem) => void;
  getList: () => Array<MenuItem>;
  findById: (id: string | undefined) => MenuItem | undefined;
  findByText: (text: string) => MenuItem | undefined;
  changeTab: (selectedTab: CoffeeKeys) => void;
  toggleSoldOut: (menuId: string) => void;
  remove: (menuId: string) => void;
  currentKoreanTab: () => string;
}

export const createCurrentMenuRepository = (() => {
  return (
    store: ReturnCreateStore<DefaultState, Actions>,
    db: any,
  ): CurrentMenuRepository => {
    const { dispatch, getState } = store;
    return {
      currentKoreanTab: () => {
        const currentState = getState();
        return Coffee[currentState.currentTab].koreanName;
      },
      getList: () => {
        const currentState = getState();
        const res = currentState.menus[currentState.currentTab];
        return res;
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
        dispatch(soldOutMenu(menuId));
      },
      edit: (newMenu: MenuItem) => {
        dispatch(
          editMenu({
            ...newMenu,
          }),
        );
      },
      add: (newMenu: MenuItem) => {
        dispatch(addMenu(newMenu));
      },
    };
  };
})();
