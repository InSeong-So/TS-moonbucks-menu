type Coffee = 'espresso' | 'frappuccino' | 'blended' | 'teavana' | 'desert';

export const tabType = {
  espresso: { koreanName: '에스프레소', key: 'espresso' },
  frappuccino: { koreanName: '프라프치노', key: 'frappuccino' },
  blended: { koreanName: '블랜디드', key: 'blended' },
  teavana: { koreanName: '티바나', key: 'teavana' },
  desert: { koreanName: '디저트', key: 'desert' },
} as const;

export interface Action<T = any> {
  type: T;
}

/**
 * An Action type which accepts any other properties.
 * This is mainly for the use of the `Reducer` type.
 * This is not part of `Action` itself to prevent types that extend `Action` from
 * having an index signature.
 */
export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any;
}

type menuItem = {
  id: string;
  text: string;
  isSoldOut: boolean;
};
type DefualtState = {
  currentTab: Coffee;
  menu: { [K in Coffee]: Array<menuItem> };
};
const defaultState: DefualtState = {
  currentTab: tabType.espresso.key,
  menu: { espresso: [], frappuccino: [], blended: [], teavana: [], desert: [] },
};
