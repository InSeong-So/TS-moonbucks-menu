declare module 'component' {
  export interface RootComponent {
    initialize?(): void;

    template?(): string;

    render?(): void;

    mount?(): void;

    eventGroup?(): ComponentEvent[];

    bindEventGroup?(): void;
  }

  export type ComponentEvent = {
    type: string;
    callback: (...params: any[]) => void;
  };

  export interface ComponentProp {
    title?: string;
    currentTab?: CategoryProps;
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

declare module 'dom' {
  export type TDomGetter = (selector: string) => HTMLElement;
}
