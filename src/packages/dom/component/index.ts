import { dom } from '@/helpers';
import diffRender from '@/dom/diff';
import store from '@/redux/store';
import { RootComponent, ComponentProps, ComponentEvent } from 'component';
import { Store } from 'redux';
// import htmlParser from '@/dom/parser';

const { $, $addEvent } = dom;

export default class Component implements RootComponent {
  protected $element: HTMLElement;
  protected $props: ComponentProps;
  protected $store: Store;

  constructor(selector: string, props: ComponentProps) {
    this.$element = <HTMLElement>$(selector);
    this.$props = props;
    this.$store = store;

    this.initialize();
    this.render();
    this.bindEventGroup();

    store.subscribe({
      [selector]: this.render.bind(this),
    });
  }

  /**
   * 사용자가 추가적으로 초기화
   */
  initialize() {}

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
    // console.log(htmlParser(this.template()));
    diffRender(this.$element, this.template());
    this.mount();
  }

  /**
   * 자식 컴포넌트를 등록합니다.
   */
  mount() {}

  eventGroup(): ComponentEvent[] {
    return [];
  }

  bindEventGroup() {
    const registed = this.eventGroup();
    registed.forEach(({ type, callback }) => {
      $addEvent(this.$element, type, callback);
    });
  }
}
