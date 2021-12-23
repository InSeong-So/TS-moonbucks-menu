import 'assets/css/index.css';

import startApp from './src';
import { APP_TITLE } from './src/packages/constants';
// import Router from './src/packages/routes';

startApp({
  root: '#app',
  title: APP_TITLE,
});

// const router = new Router({
//   global: window,
//   tag: 'button',
//   dataset: 'category-name',
// });
// router
//   .addRoute('#/', appRoutes.home)
//   .addRoute('#/:category', appRoutes.menu)
//   .setNotFound(appRoutes.pageNotFound)
//   .start();
