import { createStore } from './helper.js';
import { reducer } from './menu.js';

const menuStore = createStore(reducer);
menuStore.dispatch();

export { menuStore };
