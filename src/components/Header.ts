import { APP_TITLE } from '@/constants';
import { Component } from '@/dom';
import { CategoryProps } from 'component';
import { SELECTED_CATEGORY } from '../packages/redux/reducers/menus/actions';

export default class Header extends Component {
  hash: string;

  initialized() {
    this.hash = location.hash.substring(2);
    const obj = { type: SELECTED_CATEGORY, data: this.hash };
    this.store.dispatch(obj);
  }

  template() {
    const { categories }: { categories: CategoryProps[] } =
      this.store.getState().menus;

    return `
    <a href="/" class="text-black">
      <h1 class="text-center font-bold">${APP_TITLE}</h1>
    </a>
    <nav class="d-flex justify-center flex-wrap">
      ${categories
        .map(({ id, text }) => {
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
