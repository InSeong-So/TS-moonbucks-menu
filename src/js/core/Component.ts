import { $, addEvent } from '../utils/getUUID';
import { ReturnCreateStore } from './myRedux';

type BindEvent = {
  eventType: string;
  callback: EventListenerOrEventListenerObject;
};
interface CoreComponent {
  template?: () => string;
  render: () => void;
  mount?: () => void;
  bindEvents?: () => Array<BindEvent>;
  setEvents: () => void;
}

export default class Component implements CoreComponent {
  key: string;
  store: any;
  $component: HTMLElement;
  $parent: HTMLElement;
  props: Record<string, any>;
  binddedEvents: Array<BindEvent>;

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
    this.binddedEvents = [];
    this.store = store;
    store.subscribe(this.key, this.render.bind(this));
  }
  template() {
    return '';
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  mount() {}
  render() {
    try {
      this.$component.innerHTML = this.template();
      this?.mount();
    } catch (e) {
      console.error(e);
    }
  }

  bindEvents() {
    return [];
  }

  setEvents() {
    this.bindEvents()?.forEach(({ eventType, callback }) => {
      addEvent(this.$component, eventType, callback);
    });
  }
}
