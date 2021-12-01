import Component from './packages/dom/Component.js';
import { Header, MenuPage } from './components/index.js';
import {
  getCategories,
  selectedCategory,
} from './packages/redux/reducers/menus.js';

class App extends Component {
  initialized() {
    this.store.dispatch(getCategories());
  }

  template() {
    return `
    <div class="d-flex justify-center mt-5 w-100">
      <div class="w-100">
        <header class="my-4"></header>
        <main class="mt-10 d-flex justify-center"></main>
      </div>
    </div>
    `;
  }

  mount() {
    new Header('header');
    this.store.dispatch(selectedCategory('espresso'));
  }
}

new App('#app');

const appRoutes = {
  home: () => {
    new MenuPage('main', {
      params: '',
      pages: 'home',
    });
  },
  menu: (params: string) => {
    new MenuPage('main', {
      params,
      pages: 'menu',
    });
  },
  pageNotFound: (params: string) => {
    new MenuPage('main', {
      params,
      pages: 'error',
    });
  },
};

export default appRoutes;
