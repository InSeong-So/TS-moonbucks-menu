import { createStore } from './helper.js';
import { reducer } from './menu.js';

const menuStore = createStore(reducer); // 함수들만 가져옴.
menuStore.dispatch(); // setIntialState

export { menuStore };
