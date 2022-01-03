import { $ } from '../utils/domController.js';
import store from '../store/index.js';
import { Tprops, Tcategory, Tmenu } from '../types/store.js';
import { getCategoryMenus } from '../utils/helper.js';

const MenuForm = ({ state }: Tprops) => {
  const { menus, currentTab } = state;

  store.subscribe(updateMenuForm);

  return render(getCategoryMenus(menus, currentTab), currentTab);
};

const render = (menus: Tmenu[], currentTab: Tcategory) => {
  return `
  <div class="heading d-flex justify-between">
    <h2 class="mt-1">${currentTab.name} 메뉴 관리</h2>
    <span id="menu-count" class="mr-2 mt-4 menu-count">총 ${menus.length}개</span>
  </div>
  <form id="espresso-menu-form">
    <div class="d-flex w-100">
      <label for="espresso-menu-name" class="input-label" hidden>
        ${currentTab.name} 메뉴 이름
      </label>
      <input
        type="text"
        id="espresso-menu-name"
        name="espressoMenuName"
        class="input-field"
        placeholder="${currentTab.name} 메뉴 이름"
        autocomplete="off"
      />
      <button
        type="submit"
        name="submit"
        id="espresso-menu-submit-button"
        class="input-submit bg-green-600 ml-2"
      >
        확인
      </button>
    </div>
  </form>`;
};

const updateMenuForm = () => {
  const { menus, currentTab } = store.getState();
  const categoryMenus = getCategoryMenus(menus, currentTab);
  $('.heading > h2').innerHTML = `${currentTab.name} 메뉴 관리`;
  $('#menu-count').innerHTML = `총 ${categoryMenus.length}개`;
};

export default MenuForm;
