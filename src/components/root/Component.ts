import { $ } from '../../utils/index.js';
import { Components, ComponentProps } from '../../../types/components';
import diffRender from './diffRender.js';

export default abstract class Component implements Components {
  protected $element: HTMLElement;
  protected $props: ComponentProps;

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
    diffRender(this.$element, this.template());
    this.mount();
  }

  mount() {
    // 필요시 구현합니다.
  }
}
