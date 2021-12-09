import { Header, MenuPage } from './components';
import Component from '@/dom/Component';

class App extends Component {
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
    new Header('header', this.$props);

    this.store.subscribe({
      rerender: () => {
        new MenuPage('main', this.$props);
      },
    });
  }
}

const appRoutes = {
  home: () => new App('#app', { route: '#espresso' }),
  menu: (route: string) => new App('#app', { route }),
  pageNotFound: (route: string) => new App('#app', { route }),
};

export default appRoutes;
