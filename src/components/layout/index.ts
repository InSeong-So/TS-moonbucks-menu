import { $ } from '../../utils/domController.js';
import renderHeader from './Header.js';
import renderForm from '../MenuForm.js';

const render = (selector: string) => {
  const HeaderComponent = renderHeader();
  const MenuFormComponent = renderForm();

  $(selector).innerHTML = `
  <div class="d-flex justify-center mt-5 w-100">
  <div class="w-100">
    ${HeaderComponent}
    <main class="mt-10 d-flex justify-center">
     <div class="wrapper bg-white p-10">
          ${MenuFormComponent}
          <ul id="espresso-menu-list" class="mt-3 pl-0"></ul>
        </div>
      </main>
  </div>
</div>
`;
};

export default render;
