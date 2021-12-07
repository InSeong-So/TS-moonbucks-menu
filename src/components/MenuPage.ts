import { MenuList } from './';
import { Component } from '@/dom';
import { $, $sibling } from '@/helpers';
import { ComponentProp, MenuItemProps } from 'component';
import { SELECTED_CATEGORY } from '../packages/redux/reducers/menus/actions';

export default class MenuPage extends Component {
  _isLocationError: boolean;
  _id: string;
  _text: string;
  _menus: MenuItemProps[];

  initialized() {
    const { pages } = <ComponentProp>this.$props;

    const { selected } = this.store.getState().menus;
    this._id = selected.id;
    this._text = selected.text;
    this._menus = selected.menus;
    this._isLocationError = pages === 'error' || !selected.id;
  }

  template() {
    if (this._isLocationError) return this.errorPage;
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

  get errorPage() {
    const { params } = <ComponentProp>this.$props;
    return `
    <div>
      <h1>404: PAGE NOT FOUND!!</h1>
      <h2>Are you sure about the ${params}?</h2>
      <a href="http://localhost:5500">돌아가기</a>
    </div>
    `;
  }

  mount() {
    if (this._isLocationError) return;
    const menuList = new MenuList(`#${this._id}-menu-list`, {
      params: this._menus,
    });
    const $inputItem = <HTMLInputElement>$(`#${this._id}-menu-name`);
    const $menuAddButton = $(`#${this._id}-menu-submit-button`);
    $menuAddButton.addEventListener('click', event => {
      event.preventDefault();
      if (!$inputItem.value) return;
      menuList.insertItem($inputItem.value, menuList.setMenuCount);
      $inputItem.value = '';
    });
    $(`#${this._id}-menu-list`).addEventListener(
      'click',
      (event: MouseEvent) => {
        const $target = <HTMLButtonElement>event.target;
        event.preventDefault();
        if (!$target.matches('button')) return;
        const $span = <HTMLSpanElement>$sibling($target, 'li', 'span');
        const targetItemIndex = <string>$span.getAttribute('index');

        if ($target.matches('.menu-edit-button')) {
          const targetItemText = <string>$span.textContent;
          menuList.modifyItem(
            +targetItemIndex,
            targetItemText,
            menuList.setMenuCount,
          );
        } else if ($target.matches('.menu-sold-out-button')) {
          const targetItemText = <'품절' | '입고'>$target.textContent?.trim();
          menuList.soldOutItem(+targetItemIndex, targetItemText);
        } else if ($target.matches('.menu-remove-button')) {
          menuList.removeItem(+targetItemIndex, menuList.setMenuCount);
        }
      },
    );
    $inputItem.addEventListener('keypress', event => {
      if (event.key !== 'Enter') return;
      if (!$inputItem.value) return;
      event.preventDefault();
      menuList.insertItem($inputItem.value, menuList.setMenuCount);
      $inputItem.value = '';
    });
  }
}
