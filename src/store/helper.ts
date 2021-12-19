import { reducerType, actionType, listenerType, stateType } from './type.js';

export function createStore(reducer: reducerType) {
  let state: stateType = {
    menus: [],
  };

  const listeners: listenerType[] = [];

  const getState = () => {
    console.log('getState', state);
    return { ...state };
  };

  const dispatch = (action: actionType = { type: '' }) => {
    state = reducer(state, action);
    console.log('변경된 상태>>>', state);
    publish();
  };

  const subscribe = (callback: listenerType) => {
    listeners.push(callback);
    console.log('subscribe 실행', listeners);
  };
  const publish = () => {
    console.log('publish 실행');
    listeners.forEach((callback: listenerType) => callback());
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}
