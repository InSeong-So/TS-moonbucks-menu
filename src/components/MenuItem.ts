import { $ } from '../utils/domController.js';
import store from '../store/index.js';
import { Tprops, Tmenu } from '../types/store.js';
import { getCategoryMenus } from '../utils/helper.js';

const MenuItem = ({ state }: Tprops) => {
  const { menus, currentTab } = state;

  store.subscribe(updateMenuList);

  return render(getCategoryMenus(menus, currentTab));
};

const render = (menus: Tmenu[]) => {
  return menus
    .map(
      menu =>
        `<li id="${menu.id}" class="menu-list-item d-flex items-center py-2">
  <span id="espresso-menu-name" class="w-100 pl-2 menu-name ${
    menu.inStock || 'sold-out'
  }">${menu.menuName}</span>
  <button
    type="button"
    id="espresso-edit-button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  >
    수정
  </button>
  <button
    id="espresso-remove-button"
    type="button"
    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  >
    삭제
  </button>
  <button
    id="espresso-soldout-button"
    type="button"
    class="bg-gray-50 text-gray-500 text-sm menu-soldout-button"
    ${menu.inStock || 'disabled'}
  >
    품절
  </button>
</li>`,
    )
    .join('');
};

const updateMenuList = () => {
  // TODO: 전역 데이터(외부파일)를 참조하지 않도록  유지보수하기 좋은 코드를 만들기.
  const { menus, currentTab } = store.getState();

  const categoryMenus = getCategoryMenus(menus, currentTab);

  $(`#espresso-menu-list`).innerHTML = render(categoryMenus);
};

export default MenuItem;
