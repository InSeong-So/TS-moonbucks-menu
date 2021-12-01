import { APP_TITLE } from '../constants/index.js';
import { Component } from '../packages/dom/index.js';
import { CategoryProps } from '../types/global.js';

export default class Header extends Component {
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
