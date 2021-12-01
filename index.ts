import appRoutes from './src/App.js';
import Router from './src/packages/routes/index.js';

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
