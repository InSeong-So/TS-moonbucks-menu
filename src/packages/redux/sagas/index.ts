import http from '@/client';
import {
  INSERT_MENU_FAILURE,
  INSERT_MENU_SUCCESS,
  LOAD_MENU_FAILURE,
  LOAD_MENU_SUCCESS,
  MODIFY_MENU_FAILURE,
  MODIFY_MENU_SUCCESS,
  REMOVE_MENU_FAILURE,
  REMOVE_MENU_SUCCESS,
  SOLD_OUT_MENU_FAILURE,
  SOLD_OUT_MENU_SUCCESS,
} from '../reducers/menus/actions';
import { CategoryProps } from 'component';
import { Reducer, AnyAction } from 'redux';

const sagaWrapper = (reducer: Reducer) => {
  return (state?: { categories: CategoryProps[]; selected: CategoryProps }) => {
    return (action = { type: '' }) => {
      return reducer(state, watchDispatch(action));
    };
  };
};

/**
 * redux-saga 구현해서 적용해보기
 * @TODO generator/yield 구현
 */
const fork: { [key: string]: any } = {
  LOAD_MENU_REQUEST: (action: AnyAction) => {
    return watchLoadMenu(action);
  },
  INSERT_MENU_REQUEST: (action: AnyAction) => {
    return watchCreateMenu(action);
  },
  MODIFY_MENU_REQUEST: (action: AnyAction) => {
    return watchUpdateMenu(action);
  },
  REMOVE_MENU_REQUEST: (action: AnyAction) => {
    return watchDeleteMenu(action);
  },
  SOLD_OUT_MENU_REQUEST: (action: AnyAction) => {
    return watchSoldoutMenu(action);
  },
};

/**
 * Store의 Action을 감시
 *
 * @param {object} action
 * @returns next();
 */
const watchDispatch = (action: AnyAction) => {
  const KEY = Object.keys(fork).filter(_key => _key === action.type)[0];
  return KEY ? fork[KEY](action) : action;
};

/**
 * 1. 카테고리 메뉴 리스트 불러오기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchLoadMenu = async (action: AnyAction) => {
  try {
    action.category = action.category || 'espresso';
    const { data } = await http.load(action);
    action.type = LOAD_MENU_SUCCESS;
    action.data = data;
    return action;
  } catch (error) {
    alert(error);
    action.type = LOAD_MENU_FAILURE;
    return action;
  }
};

/**
 * 2. 메뉴 추가하기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchCreateMenu = async (action: AnyAction) => {
  try {
    const { data } = await http.create(
      { category: action.category },
      { name: action.data },
    );
    action.type = INSERT_MENU_SUCCESS;
    action.data = data;
    return action;
  } catch (error) {
    alert(error);
    action.type = INSERT_MENU_FAILURE;
    return action;
  }
};

/**
 * 3. 메뉴 수정하기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchUpdateMenu = async (action: AnyAction) => {
  try {
    const { data } = await http.update(action, { name: action.data });
    action.type = MODIFY_MENU_SUCCESS;
    action.data = data;
    return action;
  } catch (error) {
    alert(error);
    action.type = MODIFY_MENU_FAILURE;
    return action;
  }
};

/**
 * 4. 메뉴 삭제하기
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchDeleteMenu = async (action: AnyAction) => {
  try {
    await http.delete(action);
    action.type = REMOVE_MENU_SUCCESS;
    return action;
  } catch (error) {
    alert(error);
    action.type = REMOVE_MENU_FAILURE;
    return action;
  }
};

/**
 * 5. 메뉴 품절 처리
 * - DB 연결 후 에러 처리 진행
 *
 * @param {object} action
 */
const watchSoldoutMenu = async (action: AnyAction) => {
  try {
    const { data } = await http.soldOut(action, { name: action.data });
    action.type = SOLD_OUT_MENU_SUCCESS;
    action.data = data;
    return action;
  } catch (error) {
    alert(error);
    action.type = SOLD_OUT_MENU_FAILURE;
    return action;
  }
};

export default sagaWrapper;
