export interface CategoryProps {
  id?: string;
  text?: string;
  menus?: MenuItemProps[];
}
export interface MenuItemProps {
  menuId: string;
  name: string;
  isSoldOut: boolean;
}
