import MenuList from './components/MenuList.js';
import Component from './components/root/Component.js';
import { $, $sibling } from './utils/index.js';

export default class App extends Component {
  template() {
    return `
    <div class="d-flex justify-center mt-5 w-100">
      <div class="w-100">
        <header class="my-4">
          <a href="/" class="text-black">
            <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
          </a>
          <nav class="d-flex justify-center flex-wrap">
            <button data-category-name="espresso" class="cafe-category-name btn bg-white shadow mx-1">
              ☕ 에스프레소
            </button>
            <button data-category-name="frappuccino" class="cafe-category-name btn bg-white shadow mx-1">
              🥤 프라푸치노
            </button>
            <button data-category-name="blended" class="cafe-category-name btn bg-white shadow mx-1">
              🍹 블렌디드
            </button>
            <button data-category-name="teavana" class="cafe-category-name btn bg-white shadow mx-1">
              🫖 티바나
            </button>
            <button data-category-name="desert" class="cafe-category-name btn bg-white shadow mx-1">
              🍰 디저트
            </button>
          </nav>
        </header>
        <main class="mt-10 d-flex justify-center">
          <div class="wrapper bg-white p-10">
            <div class="heading d-flex justify-between">
              <h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>
              <span class="mr-2 mt-4 menu-count">총 0개</span>
            </div>
            <form id="espresso-menu-form">
              <div class="d-flex w-100">
                <label for="espresso-menu-name" class="input-label" hidden>
                  에스프레소 메뉴 이름
                </label>
                <input type="text" id="espresso-menu-name" name="espressoMenuName" class="input-field"
                  placeholder="에스프레소 메뉴 이름" autocomplete="off" />
                <button type="button" name="submit" id="espresso-menu-submit-button"
                  class="input-submit bg-green-600 ml-2">
                  확인
                </button>
              </div>
            </form>
            <ul id="espresso-menu-list" class="mt-3 pl-0"></ul>
          </div>
        </main>
      </div>
    </div>
    `;
  }

  mount() {
    const menuList = new MenuList('#espresso-menu-list');
    const $inputItem = <HTMLInputElement>$('#espresso-menu-name');
    const $menuAddButton = $('#espresso-menu-submit-button');
    $menuAddButton.addEventListener('click', event => {
      event.preventDefault();
      if (!$inputItem.value) return;
      menuList.addItem($inputItem.value, menuList.setMenuCount);
      $inputItem.value = '';
    });
    $('#espresso-menu-list').addEventListener('click', (event: MouseEvent) => {
      const $target = <HTMLButtonElement>event.target;
      event.preventDefault();
      if (!$target.matches('button')) return;
      const $span = <HTMLSpanElement>$sibling($target, 'li', 'span');
      const targetItemIndex = <string>$span.getAttribute('key');

      if ($target.matches('.menu-edit-button')) {
        const targetItemText = <string>$span.textContent;
        menuList.editedItem(
          +targetItemIndex,
          targetItemText,
          menuList.setMenuCount,
        );
      } else if ($target.matches('.menu-remove-button')) {
        menuList.deletedItem(+targetItemIndex, menuList.setMenuCount);
      }
    });
    $inputItem.addEventListener('keypress', event => {
      if (event.key !== 'Enter') return;
      if (!$inputItem.value) return;
      event.preventDefault();
      menuList.addItem($inputItem.value, menuList.setMenuCount);
      $inputItem.value = '';
    });
  }
}
