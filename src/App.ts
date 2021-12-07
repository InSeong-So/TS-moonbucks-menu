import { Header, MenuPage } from './components';
import Component from '@/dom/Component';
import { GET_CATEGORIES_SUCCESS } from './packages/redux/reducers/menus/actions';

class App extends Component {
  initialized() {
    this.store.dispatch({ type: GET_CATEGORIES_SUCCESS });
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
    this.store.subscribe({
      rerender: () => {
        new MenuPage('main', this.$props);
      },
    });
  }
}

const appRoutes = {
  home: () => {
    new App('#app', {
      params: '',
      pages: 'home',
    });
  },
  menu: (params: string) => {
    new App('#app', {
      params,
      pages: 'menu',
    });
  },
  pageNotFound: (params: string) => {
    new App('#app', {
      params,
      pages: 'error',
    });
  },
};

export default appRoutes;
