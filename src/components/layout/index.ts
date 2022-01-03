import { $ } from '../../utils/domController.js';
import store from '../../store/index.js';
import renderHeader from './Header.js';
import renderForm from '../MenuForm.js';
import renderList from '../MenuItem.js';

const render = (selector: string) => {
  const state = store.getState();
  const props = { state };

  const HeaderComponent = renderHeader(props);
  const MenuFormComponent = renderForm(props);
  const MenuItemComponent = renderList(props);

  $(selector).innerHTML = `
  <div class="d-flex justify-center mt-5 w-100">
  <div class="w-100">
    ${HeaderComponent}
    <main class="mt-10 d-flex justify-center">
     <div class="wrapper bg-white p-10">
          ${MenuFormComponent}
          <ul id="${state.currentTab.id}-menu-list" class="mt-3 pl-0">
            ${MenuItemComponent}
          </ul>
        </div>
      </main>
  </div>
</div>
`;
};

export default render;
