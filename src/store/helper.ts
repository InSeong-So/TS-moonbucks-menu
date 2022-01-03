import { Treducer, TmenuAction, Tlistener, Tstate } from '../types/store.js';

export function createStore(reducer: Treducer) {
  let state: Tstate = {
    menus: [],
    currentTab: { id: 'espresso', name: '☕ 에스프레소' },
    categories: [
      { id: 'espresso', name: '☕ 에스프레소' },
      { id: 'frappuccino', name: '🥤 프라푸치노' },
      { id: 'blended', name: '🍹 블렌디드' },
      { id: 'teavana', name: '🍸 티바나' },
      { id: 'desert', name: '🍰 디저트' },
    ],
  };

  const listeners: Tlistener[] = [];

  const getState = () => {
    return { ...state };
  };

  const dispatch = (action: TmenuAction) => {
    state = reducer(state, action);
    publish();
  };

  const subscribe = (callback: Tlistener) => {
    listeners.push(callback);
  };
  const publish = () => {
    console.log('리스너 발행합니다>>', listeners);
    listeners.forEach((callback: Tlistener) => callback());
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}
