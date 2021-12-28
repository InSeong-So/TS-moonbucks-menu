import createStore from './createStore';
import rootReducer from '@/redux/reducers';
import { runSaga } from '@/redux/sagas/saga';
import { Reducer } from 'redux';
import { menuSaga } from '@/redux/reducers/menus/actions';

const store = createStore(<Reducer>rootReducer);

runSaga(store, menuSaga);

export default store;
