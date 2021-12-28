import { util } from '@/helpers';

const { notationConvert } = util;

type HashRouteCallback = (params: string) => void;

interface RoutesProps {
  testRegExp: RegExp;
  path: string;
  targetComponent: HashRouteCallback;
}

interface RouterParams {
  global: Window;
  tag: 'button' | 'a';
  dataset: string;
}

export default class Router {
  $global: Window;
  $routeSelector: string;
  routes: RoutesProps[];
  dataset: string;

  constructor({ global, tag, dataset }: RouterParams) {
    this.$global = global;
    this.$routeSelector = `${tag}[data-${dataset}]`;
    this.routes = [];
    this.dataset = notationConvert.dashToCamel(dataset);
  }

  pageNotFound = (hash: string) => {
    console.error(`${hash} Page Not Fount`);
  };

  checkRoutes = () => {
    const { hash } = this.$global.location;
    const currentRoute = this.routes.find(({ testRegExp }) => {
      return testRegExp.test(hash);
    });

    if (!currentRoute) return this.pageNotFound(hash);

    const selected = hash.substring(2);

    this.setActive(selected);

    currentRoute.targetComponent(selected);
  };

  addRoute = (path: string, targetComponent: HashRouteCallback) => {
    const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
    const URL_FRAGMENT_REGEXP = '([^\\/]+)';

    const params = [];

    const parsedFragment = path
      .replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
        params.push(paramName);
        return URL_FRAGMENT_REGEXP;
      })
      .replace(/\//g, '\\/');

    this.routes.push({
      testRegExp: new RegExp(`^${parsedFragment}$`),
      path,
      targetComponent,
    });

    return this;
  };

  setNotFound = (callback: HashRouteCallback) => {
    this.pageNotFound = callback;
    return this;
  };

  navigate = (path: string) => {
    location.hash = path;
  };

  setActive = (route: string) => {
    const $$a = <NodeListOf<HTMLElement>>document.querySelectorAll('.cafe-category-name');
    $$a.forEach(link => {
      if (link.dataset[this.dataset] === route) link.classList.add('active');
      else link.classList.remove('active');
    });
  };

  start = () => {
    window.addEventListener('click', (event: MouseEvent) => {
      const target = <HTMLButtonElement>event.target;
      if (!target.matches(this.$routeSelector)) return;
      event.preventDefault();
      const route = target.dataset[this.dataset];
      this.navigate(`/${route}`);
    });

    if (!this.$global.location.hash) this.$global.location.hash = '#/espresso';
    this.checkRoutes();

    this.$global.addEventListener('hashchange', this.checkRoutes);
  };
}
