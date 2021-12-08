import { Component } from '@/dom';
import {
  insertMenuItem,
  modifyMenuItem,
  removeMenuItem,
  soldOutMenuItem,
} from '@/redux/reducers/menus/actions';
import { CategoryProps, ComponentProp } from 'component';

interface MenuItemProps {
  menuId: string;
  name: string;
  isSoldOut: boolean;
}

export default class MenuList extends Component {
  _id: string;
  _items: MenuItemProps[];

  initialized() {
    const { selected } = <ComponentProp>this.$props;
    this._id = <string>(<CategoryProps>selected).id;
    this._items = <MenuItemProps[]>(<CategoryProps>selected).menus;
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

  insertItem(name: string) {
    const isUnique: MenuItemProps | undefined = this._items.find(
      item => item.name === name,
    );
    if (isUnique) return alert('이미 등록되어 있는 메뉴입니다.');
    if (this.isInvalidationMenu(name)) return;
    this.store.dispatch(insertMenuItem(this._id, name));
  }

  modifyItem(index: number, text: string) {
    const updatedItemName = prompt('메뉴 이름을 수정하시겠어요?', text) ?? text;
    if (this.isInvalidationMenu(updatedItemName)) return;
    this.store.dispatch(
      modifyMenuItem<string>(
        this._id,
        this._items[index].menuId,
        updatedItemName,
      ),
    );
  }

  removeItem(index: number) {
    if (!confirm('메뉴를 삭제하시겠어요?')) return;
    this.store.dispatch(
      removeMenuItem<string>(this._id, this._items[index].menuId),
    );
  }

  soldOutItem(index: number, keyword: '품절' | '입고') {
    if (!confirm(`해당 메뉴를 ${keyword} 처리 하시겠어요?`)) return;
    this.store.dispatch(
      soldOutMenuItem<string>(
        this._id,
        this._items[index].menuId,
        this._items[index].name,
      ),
    );
  }

  isInvalidationMenu(value: string) {
    const parsed = value.trim();

    if (!parsed) return true;
    if (parsed.length <= 1) {
      alert('메뉴 이름은 최소 2글자 이상이어야 합니다.');
      return true;
    }

    return false;
  }
}
