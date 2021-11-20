import { $ } from '../../util/index.js';
import { Components, ComponentProps } from '../../../../types';

export default class Component implements Components {
  $element: HTMLElement;
  $props: ComponentProps;

  constructor(selector: string, props: ComponentProps) {
    this.$element = <HTMLElement>$(selector);
    this.$props = props;
    this.initialized();
    this.render();
  }

  initialized() {
    // 필요시 구현합니다.
  }

  template() {
    return '';
  }

  render() {
    this.$element.innerHTML = this.template();
    this.mount();
  }

  mount() {
    // 필요시 구현합니다.
  }
}
