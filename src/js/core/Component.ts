import { $, addEvent } from '../utils/getUUID';
import { ReturnCreateStore } from './myRedux';

type BindEvent = {
  eventType: string;
  callback: EventListenerOrEventListenerObject;
};
interface CoreComponent {
  template: () => string;
  mount?: () => void;
  bindEvents?: () => Array<BindEvent>;
}

export default class Component implements CoreComponent {
  private key: string;
  private store: any;
  protected $component: HTMLElement;
  protected $parent: HTMLElement;
  props: Record<string, any>;

  constructor(
    key: string,
    store: ReturnCreateStore<any, any>,
    $parent: HTMLElement,
    props: Record<string, any>,
  ) {
    if (!$parent) {
      this.$parent = $('body');
    }
    this.$parent = $parent;
    this.$component = $(`[data-component=${key}]`, this.$parent);
    this.props = props;
    this.store = store;
    store.subscribe(this.key, this.render.bind(this));
    this.render();
    this.setEvents();
  }
  template() {
    return '';
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  mount() {}
  render() {
    this.$component.innerHTML = this.template();
    this?.mount();
  }

  bindEvents() {
    return [];
  }

  setEvents() {
    this.bindEvents().forEach(({ eventType, callback }) => {
      addEvent(this.$component, eventType, callback);
    });
  }
}
