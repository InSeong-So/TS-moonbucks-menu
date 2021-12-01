import { $ } from '../common/index.js';
import { Components, ComponentProps } from '../../types/components';
import diffRender from './diffRender.js';
import store from '../redux/store/index.js';
import { Store } from '../../types/redux.js';

export default abstract class Component implements Components {
  protected $element: HTMLElement;
  protected $props: ComponentProps;
  protected store: Store;

  constructor(selector: string, props: ComponentProps) {
    this.$element = <HTMLElement>$(selector);
    this.$props = props;
    this.store = store;
    this.initialized();
    this.render();
  }

  /**
   * 사용자가 추가적으로 초기화
   */
  initialized() {
    // 필요시 구현합니다.
  }

  /**
   *
   * @returns {string}
   */
  template() {
    return '';
  }

  /**
   * diff 알고리즘을 적용하여 render합니다.
   */
  render() {
    diffRender(this.$element, this.template());
    this.mount();
  }

  /**
   * 자식 컴포넌트, 이벤트를 마운트합니다.
   */
  mount() {
    // 필요시 구현합니다.
  }
}
