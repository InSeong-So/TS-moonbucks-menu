import diffRender from './diffRender';
import { $ } from '@/helpers';
import configureStore from '@/redux/store';
import { EventBus } from '@/events';
import { Components, ComponentProps } from 'component';
import { EventBusProps } from 'event';
import { Store } from 'redux';

export default abstract class Component implements Components {
  protected $element: HTMLElement;
  protected $props: ComponentProps;
  protected eventBus: EventBusProps;
  protected store: Store;

  constructor(selector: string, props: ComponentProps) {
    this.$element = <HTMLElement>$(selector);
    this.$props = props;
    this.eventBus = new EventBus();
    configureStore.then(resolve => {
      this.store = resolve;
      this.initialized();
      this.render();
    });
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
