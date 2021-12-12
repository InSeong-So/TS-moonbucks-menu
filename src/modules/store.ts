import { createStore } from '../core/myRedux.js';
import { Coffee } from './constants.js';
import reducer from './reducer.js';

const defaultState = {
  currentTab: Coffee.espresso.key,
  menus: {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  },
};

export default (function getStoreSingletonInit() {
  const store = createStore(reducer, defaultState);
  console.log('클로져 store');
  return () => {
    return store;
  };
})();
