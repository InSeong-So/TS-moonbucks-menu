export const MENU_LIST_ATTR = {
  TYPE: 'li',
  ID: 'espresso-menu-id',
  CLASS_NAME: 'menu-list-item d-flex items-center py-2',
} as const;

export const MENU_NAME_ATTR = {
  TYPE: 'span',
  ID: 'espresso-menu-name',
  CLASS_NAME: 'w-100 pl-2 menu-name',
} as const;

export const EDIT_BTN_ATTR = {
  TYPE: 'button',
  ID: 'espresso-edit-button',
  CLASS_NAME: 'bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button',
  TEXT: '수정',
} as const;

export const REMOVE_BTN_ATTR = {
  TYPE: 'button',
  ID: 'espresso-remove-button',
  CLASS_NAME: 'bg-gray-50 text-gray-500 text-sm menu-remove-button',
  TEXT: '삭제',
} as const;
