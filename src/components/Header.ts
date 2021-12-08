import { APP_TITLE } from '@/constants';
import { Component } from '@/dom';
import { CategoryProps, ComponentProp } from 'component';
import { loadMenu } from '@/redux/reducers/menus/actions';

export default class Header extends Component {
  initialized() {
    const { route } = <ComponentProp>this.$props;
    this.store.dispatch(loadMenu(<string>route));
  }

  template() {
    return `
    <a href="/" class="text-black">
      <h1 class="text-center font-bold">${APP_TITLE}</h1>
    </a>
    <nav class="d-flex justify-center flex-wrap">
      ${this.store
        .getState()
        .menus.categories.map(({ id, text }: CategoryProps) => {
          return `
        <button
          data-category-name="${id}"
          class="cafe-category-name btn bg-white shadow mx-1">
          ${text}
        </button>
        `;
        })
        .join('')}
    </nav>
    `;
  }
}
