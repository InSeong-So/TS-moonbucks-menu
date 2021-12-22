import { reducerType, actionType, listenerType, stateType } from './type.js';

export function createStore(reducer: reducerType) {
  let state: stateType = {
    menus: [],
  };

  const listeners: listenerType[] = [];

  const getState = () => {
    return { ...state };
  };

  const dispatch = (action: actionType = { type: '' }) => {
    state = reducer(state, action);
    publish();
  };

  const subscribe = (callback: listenerType) => {
    listeners.push(callback);
  };
  const publish = () => {
    listeners.forEach((callback: listenerType) => callback());
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}
