import { MenuItemProps } from './global.js';

export interface Components {
  initialized?(): void;

  template?(): string;

  render?(): void;

  mount?(): void;
}

export interface ComponentProp {
  params: string | MenuItemProps[];
  pages?: string;
  /**
   * @TODO 이 부분을 해결해야하는데 아직 진행을 못하고 있습니다ㅜ
   */
  components?: any[];
}

export type ComponentProps = ComponentProp | void;
