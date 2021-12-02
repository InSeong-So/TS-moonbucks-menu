import { Action, createStore } from './core/myRedux';

export const Coffee = {
  espresso: { koreanName: '에스프레소', key: 'espresso' },
  frappuccino: { koreanName: '프라프치노', key: 'frappuccino' },
  blended: { koreanName: '블랜디드', key: 'blended' },
  teavana: { koreanName: '티바나', key: 'teavana' },
  desert: { koreanName: '디저트', key: 'desert' },
} as const;
type CoffeeKeys = keyof typeof Coffee;

type MenuItem = {
  id: string;
  text: string;
  isSoldOut: boolean;
};
type DefualtState = {
  currentTab: CoffeeKeys;
  menus: { [K in CoffeeKeys]: Array<MenuItem> };
};
// 아 어떻게 관리해야 좀 더 깔끔하게 타입 지정할 수 있을까요...
// type MenuActionKey = 'ADD' | 'NAME_EDIT' | 'REMOVE' | 'SOLD_OUT';
// type TabActionKey = 'CHANGE_TAB';

type MenuAddAction = Action<'ADD', { menu: MenuItem }>;
type MenuEditAction = Action<'NAME_EDIT', { menu: MenuItem }>;
type MenuRemoveAction = Action<'REMOVE', { id: string }>;
type MenuSoldOutAction = Action<'SOLD_OUT', { id: string }>;
type TabChangeAction = Action<'CHANGE_TAB', { tabKey: keyof typeof Coffee }>;

type Actions =
  | MenuAddAction
  | MenuEditAction
  | MenuRemoveAction
  | MenuSoldOutAction
  | TabChangeAction;

// actions
const addMenu = (menu: MenuItem): MenuAddAction => {
  return {
    type: 'ADD',
    payload: {
      menu,
    },
  };
};

const changeTab = (tabKey: CoffeeKeys): TabChangeAction => ({
  type: 'CHANGE_TAB',
  payload: {
    tabKey,
  },
});

const defaultState: DefualtState = {
  currentTab: Coffee.espresso.key,
  menus: {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  },
};

// todo 추상화
const reducer = (state: DefualtState, action: Actions): DefualtState => {
  switch (action.type) {
    case 'CHANGE_TAB': {
      return {
        ...state,
        currentTab: action.payload.tabKey,
      };
    }
    case 'ADD': {
      return {
        ...state,
        menus: {
          ...state.menus,
          [state.currentTab]: state.menus[state.currentTab].concat([
            action.payload.menu,
          ]),
        },
      };
    }
    case 'REMOVE': {
      const newCurrentMenu = state.menus[state.currentTab].filter(
        coffee => action.payload.id !== coffee.id,
      );
      return {
        ...state,
        menus: {
          ...state.menus,
          [state.currentTab]: newCurrentMenu,
        },
      };
    }
    case 'NAME_EDIT': {
      const newCurrentMenu = state.menus[state.currentTab].map(coffee =>
        action.payload.menu.id !== coffee.id
          ? coffee
          : { ...action.payload.menu },
      );

      return {
        ...state,
        menus: {
          ...state.menus,
          [state.currentTab]: newCurrentMenu,
        },
      };
    }
    case 'SOLD_OUT': {
      const newCurrentMenu = state.menus[state.currentTab].map(coffee =>
        action.payload.id !== coffee.id
          ? coffee
          : { ...coffee, isSoldOut: !coffee.isSoldOut },
      );

      return {
        ...state,
        menus: {
          ...state.menus,
          [state.currentTab]: newCurrentMenu,
        },
      };
    }
    default:
      return state;
  }
};

const store = createStore(reducer, defaultState);

export default store;
