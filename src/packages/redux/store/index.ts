import rootReducer from '@/redux/reducers';
import sagaWrapper from '@/redux/sagas';
import { createStore } from '@/redux/common';
import { Reducer } from 'redux';

export default createStore(sagaWrapper(<Reducer>rootReducer));
