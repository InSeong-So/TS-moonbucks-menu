import { MenuList } from './';
import { Component } from '@/dom';
import { $, $sibling } from '@/helpers';
import { CategoryProps, MenuItemProps } from 'component';

export default class MenuPage extends Component {
  _selected: CategoryProps;
  _id: string;
  _text: string;
  _menus: MenuItemProps[];

  initialized() {
    const { selected } = this.store.getState().menus;
    this._selected = selected;
    this._id = selected.id;
    this._text = selected.text;
    this._menus = selected.menus;
  }

  template() {
    return `
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex justify-between">
        <h2 class="mt-1">${this._text} 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 0개</span>
      </div>
      <form id="${this._id}-menu-form">
        <div class="d-flex w-100">
          <label for="${this._id}-menu-name" class="input-label" hidden>
            ${this._text} 메뉴 이름
          </label>
          <input type="text" id="${this._id}-menu-name" name="${this._id}MenuName" class="input-field"
            placeholder="${this._text} 메뉴 이름" autocomplete="off" />
          <button type="button" name="submit" id="${this._id}-menu-submit-button"
            class="input-submit bg-green-600 ml-2">
            확인
          </button>
        </div>
      </form>
      <ul id="${this._id}-menu-list" class="mt-3 pl-0"></ul>
    </div>
    `;
  }

  mount() {
    const menuList = new MenuList(`#${this._id}-menu-list`, {
      selected: this._selected,
    });
    const $menuList = $(`#${this._id}-menu-list`);
    const $inputItem = <HTMLInputElement>$(`#${this._id}-menu-name`);
    const $menuAddButton = $(`#${this._id}-menu-submit-button`);

    const menuAddButtonClickHandler = (event: MouseEvent) => {
      event.preventDefault();
      if (!$inputItem.value) return;
      menuList.insertItem($inputItem.value);
      $inputItem.value = '';
    };

    const menuListClickHandler = (event: MouseEvent) => {
      const $target = <HTMLButtonElement>event.target;
      if (!$target.matches('button')) return;

      const $span = <HTMLSpanElement>$sibling($target, 'li', 'span');
      const targetItemIndex = Number(<string>$span.getAttribute('index'));

      if ($target.matches('.menu-edit-button'))
        menuList.modifyItem(targetItemIndex, <string>$span.textContent);

      if ($target.matches('.menu-sold-out-button')) {
        menuList.soldOutItem(
          targetItemIndex,
          <'품절' | '입고'>$target.textContent?.trim(),
        );
      }

      if ($target.matches('.menu-remove-button'))
        menuList.removeItem(targetItemIndex);
    };

    $menuAddButton.addEventListener('click', menuAddButtonClickHandler);
    $menuList.addEventListener('click', menuListClickHandler);
  }
}
