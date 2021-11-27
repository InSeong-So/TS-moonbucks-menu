type Coffee = 'espresso' | 'frappuccino' | 'blended' | 'teavana' | 'desert';

export const tabType = {
  espresso: { koreanName: '에스프레소', key: 'espresso' },
  frappuccino: { koreanName: '프라프치노', key: 'frappuccino' },
  blended: { koreanName: '블랜디드', key: 'blended' },
  teavana: { koreanName: '티바나', key: 'teavana' },
  desert: { koreanName: '디저트', key: 'desert' },
} as const;

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
