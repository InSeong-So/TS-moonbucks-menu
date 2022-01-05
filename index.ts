import './assets/css/index.scss';

import vdom from './src/App';
import render from './src/helpers/dom/render';
import Observer from './src/observer';

const observer = new Observer();
const diffRenderer = () => {
  render(document.getElementById('app') as HTMLElement, vdom);
};

observer.subscribe(render);

diffRenderer();
