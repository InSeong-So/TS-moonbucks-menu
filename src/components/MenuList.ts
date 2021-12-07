import LocalState from '@/storage/LocalState';
import { Component } from '@/dom';
import { $, createUUID } from '@/helpers';
import { ComponentProp } from 'component';

interface MenuItemProps {
  menuId: string;
  name: string;
  isSoldOut: boolean;
}

export default class MenuList extends Component {
  _id: string;
  _items: MenuItemProps[];

  initialized() {
    const { params } = <ComponentProp>this.$props;
    this._id = this.store.getState().menus.selected.id;
    this._items =
      (params.length > 0
        ? <MenuItemProps[]>params
        : <MenuItemProps[]>LocalState.getCategoryMenus(this._id)) || [];
  }

  template() {
    return `
    ${this._items
      .map(({ menuId, name, isSoldOut }, index) => {
        return `
        <li class="menu-list-item d-flex items-center py-2">
          <span
            class="w-100 pl-2 menu-name ${isSoldOut ? 'sold-out' : ''}"
            key=${menuId} index=${index}>${name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
          ${isSoldOut ? '입고' : '품절'}
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </li>
        `;
      })
      .join('')}
    `;
  }

  get itemCount() {
    return this._items.length;
  }

  insertItem(name: string, callback: (data: number) => void) {
    const isUnique: MenuItemProps | undefined = this._items.find(
      item => item.name === name,
    );
    if (isUnique) return alert('이미 등록되어 있는 메뉴입니다.');
    if (this.isInvalidationMenu(name)) return;
    const uuid = createUUID();
    this._items = [...this._items, { menuId: uuid, name, isSoldOut: false }];
    LocalState.setCategoryMenus(this._id, this._items);
    this.render();
    if (callback) callback(this.itemCount);
  }

  modifyItem(index: number, text: string, callback: (data: number) => void) {
    const updatedItemName = prompt('메뉴 이름을 수정하시겠어요?', text) ?? text;
    if (this.isInvalidationMenu(updatedItemName)) return;
    const updatedItem = { ...this._items[index], name: updatedItemName };
    this._items[index] = updatedItem;
    LocalState.setCategoryMenus(this._id, this._items);
    this.render();
    if (callback) callback(this.itemCount);
  }

  removeItem(index: number, callback: (data: number) => void) {
    if (!confirm('메뉴를 삭제하시겠어요?')) return;
    this._items = this._items.filter((_, i) => i !== index);
    LocalState.setCategoryMenus(this._id, this._items);
    this.render();
    if (callback) callback(this.itemCount);
  }

  soldOutItem(index: number, keyword: '품절' | '입고') {
    if (!confirm(`해당 메뉴를 ${keyword} 처리 하시겠어요?`)) return;
    const target = this._items[index];
    const soldOutItem = {
      ...target,
      isSoldOut: !target.isSoldOut,
    };
    this._items[index] = soldOutItem;
    LocalState.setCategoryMenus(this._id, this._items);
    this.render();
  }

  setMenuCount(count: number) {
    const $menuCount = $('.menu-count');
    $menuCount.innerHTML = `총 ${count}개`;
  }

  isInvalidationMenu(value: string) {
    if (!value) return true;
    if (value.length <= 1) {
      alert('메뉴 이름은 최소 2글자 이상이어야 합니다.');
      return true;
    }

    return false;
  }
}
