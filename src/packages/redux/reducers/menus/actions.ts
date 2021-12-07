import { createActionType } from '../../common';

export const SELECTED_CATEGORY = 'menu/SELECTED_CATEGORY';

export const [GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE] =
  createActionType('menu/GET_CATEGORIES');

export const [LOAD_MENU, LOAD_MENU_SUCCESS, LOAD_MENU_FAILURE] =
  createActionType('menu/LOAD_MENU');

export const [INSERT_MENU, INSERT_MENU_SUCCESS, INSERT_MENU_FAILURE] =
  createActionType('menu/INSERT_MENU');

export const [MODIFY_MENU, MODIFY_MENU_SUCCESS, MODIFY_MENU_FAILURE] =
  createActionType('menu/MODIFY_MENU');

export const [SOLD_OUT_MENU, SOLD_OUT_MENU_SUCCESS, SOLD_OUT_MENU_FAILURE] =
  createActionType('menu/SOLD_OUT_MENU');

export const [REMOVE_MENU, REMOVE_MENU_SUCCESS, REMOVE_MENU_FAILURE] =
  createActionType('menu/REMOVE_MENU');

export const selectedCategory = (data: string) => ({
  type: SELECTED_CATEGORY,
  data,
});

export const getCategories = () => ({
  type: GET_CATEGORIES_SUCCESS,
});

export const insertMenu = (data: any) => ({
  type: INSERT_MENU,
  data,
});

export const modifyMenu = (data: any) => ({
  type: MODIFY_MENU,
  data,
});

export const soldOutMenu = (data: any) => ({
  type: SOLD_OUT_MENU,
  data,
});

export const removeMenu = (data: any) => ({
  type: REMOVE_MENU,
  data,
});
