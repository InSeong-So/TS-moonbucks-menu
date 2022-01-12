import { $ } from '../../utils/domController.js';
import { Tprops, Tcategory } from '../../types/store.js';
import store from '../../store/index.js';

const Navigation = ({ state }: Tprops) => {
  const { categories, currentTab } = state;
  store.subscribe(updateNavigation);
  return `<nav class="d-flex justify-center flex-wrap">
      ${render(categories, currentTab)}
  </nav>`;
};

const render = (categories: Tcategory[], currentTab: Tcategory) => {
  return categories
    .map(
      category =>
        `<button
      data-category-name="${category.id}"
      class="cafe-category-name btn shadow mx-1 ${
        category.id === currentTab.id ? 'bg-green-600' : 'bg-white'
      }"
    >
      ${category.name}
    </button>`,
    )
    .join('');
};

const updateNavigation = () => {
  const { categories, currentTab } = store.getState();

  $('nav').innerHTML = render(categories, currentTab);
};

export default Navigation;
