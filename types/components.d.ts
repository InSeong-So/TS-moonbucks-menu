export interface Components {
  initialized?(): void;

  template?(): string;

  render?(): void;

  mount?(): void;
}

export interface ComponentProp {
  route?: string;
  pages?: string;
  components?: any[];
}

export type ComponentProps = ComponentProp | void;
