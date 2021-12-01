import { Reducer } from '../../../types/redux.js';
import { createStore } from '../common/index.js';
import rootReducer from '../reducers/index.js';

export default createStore(<Reducer>rootReducer);
