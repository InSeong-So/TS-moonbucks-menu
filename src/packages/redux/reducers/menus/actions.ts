import { MenuItemProps } from 'component';
import { createActionType } from '../../common';

export const [LOAD_MENU, LOAD_MENU_SUCCESS, LOAD_MENU_FAILURE] =
  createActionType('menu/LOAD_MENU');

export const [INSERT_MENU_ITEM, INSERT_MENU_SUCCESS, INSERT_MENU_FAILURE] =
  createActionType('menu/INSERT_MENU_ITEM');

export const [MODIFY_MENU_ITEM, MODIFY_MENU_SUCCESS, MODIFY_MENU_FAILURE] =
  createActionType('menu/MODIFY_MENU_ITEM');

export const [
  SOLD_OUT_MENU_ITEM,
  SOLD_OUT_MENU_SUCCESS,
  SOLD_OUT_MENU_FAILURE,
] = createActionType('menu/SOLD_OUT_MENU_ITEM');

export const [REMOVE_MENU_ITEM, REMOVE_MENU_SUCCESS, REMOVE_MENU_FAILURE] =
  createActionType('menu/REMOVE_MENU_ITEM');

export const loadMenu = (category: string) => ({
  type: LOAD_MENU,
  category,
});

export const insertMenuItem = <T>(category: T, name: T) => ({
  type: INSERT_MENU_ITEM,
  category,
  name,
});

export const modifyMenuItem = <T>(category: T, menuId: T, name: string) => ({
  type: MODIFY_MENU_ITEM,
  category,
  menuId,
  name,
});

export const soldOutMenuItem = <T>(category: T, menuId: T, data: T) => ({
  type: SOLD_OUT_MENU_ITEM,
  category,
  menuId,
  data,
});

export const removeMenuItem = <T>(category: T, menuId: T) => ({
  type: REMOVE_MENU_ITEM,
  category,
  menuId,
});
