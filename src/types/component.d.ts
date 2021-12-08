declare module 'component' {
  export interface Components {
    initialized?(): void;

    template?(): string;

    render?(): void;

    mount?(): void;
  }

  export interface ComponentProp {
    route?: string;
    selected?: CategoryProps;
    components?: any[];
  }
  export type ComponentProps = ComponentProp | void;

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
}
