import 'assets/css/index.css';

import appRoutes from './src/App';
import Router from './src/packages/routes';

const router = new Router({
  global: window,
  tag: 'button',
  dataset: 'category-name',
});
router
  .addRoute('#/', appRoutes.home)
  .addRoute('#/:category', appRoutes.menu)
  .setNotFound(appRoutes.pageNotFound)
  .start();
