import App from './App';
import Component from '@/dom/component';
import HeaderContainer from './container/HeaderComponent';
import MenuPageContainer from './container/MenuPageComponent';
import { ComponentProp } from 'component';
import { LOAD_MENU } from './packages/redux/reducers/menus/actions';

class Root extends Component {
  initialize() {
    this.$store.dispatch({ type: LOAD_MENU, category: 'espresso' });
  }

  template() {
    return App();
  }

  mount() {
    const { title } = <ComponentProp>this.$props;
    new HeaderContainer('header', { title });
    new MenuPageContainer('main');
  }
}

const startApp = ({ root, title }: { root: string; title: string }) => new Root(root, { title });

export default startApp;
