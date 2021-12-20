import { $ } from './utils/index.js';

interface State {
  categoryNames: string[];
  menuNames: string[];
}

export default class App {
  private state: State;
  private template: string;
  private mainElementId: string;

  constructor(elementId: string) {
    this.mainElementId = elementId;
    this.state = {
      categoryNames: [
        'espresso',
        'frappuccino',
        'blended',
        'teavana',
        'desert',
      ],
      menuNames: [],
    };
    this.template = `
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
    $(this.mainElementId).innerHTML = this.template;
    this.bindEvent();
  }

  render(elementId: string): void {
    // state에 맞춰서 html 변경
    if (elementId === '#espresso-menu-list') {
      let html = '';
      this.state.menuNames.forEach((value, index) => {
        html += `
          <li data-menu-id=${index} class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${value}</span>
          </li>`;
      });
      $(elementId).innerHTML = html;
    }
  }

  bindEvent(): void {
    $('main').addEventListener(
      'click',
      e => {
        const target = e.target as HTMLElement;
        if (!target) {
          return;
        }

        if (target.id && target.id === 'espresso-menu-submit-button') {
          this.addMenuName($('#espresso-menu-name') as HTMLInputElement);
          this.render('#espresso-menu-list');
        }
      },
      false,
    );

    $('main').addEventListener(
      'keydown',
      e => {
        const target = e.target as HTMLElement;
        if (
          e.key === 'Enter' &&
          target.id &&
          target.id === 'espresso-menu-name'
        ) {
          this.addMenuName(target as HTMLInputElement);
          this.render('#espresso-menu-list');
          e.preventDefault();
        }
      },
      false,
    );
  }

  addMenuName(input: HTMLInputElement) {
    if (!input.value.trim()) {
      return;
    }
    this.state.menuNames.push(input.value);
    input.value = '';
  }
}
