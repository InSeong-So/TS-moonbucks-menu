import { dom, highOrder } from '@/helpers';
import { Component } from '@/dom';
import { EVENT_TYPE_CLICK } from '@/constants';
import { MenuList } from '../view';
import {
  MODIFY_MENU_ITEM,
  REMOVE_MENU_ITEM,
  SOLD_OUT_MENU_ITEM,
} from '@/redux/reducers/menus/actions';

const { $closest } = dom;
const { inCaseOf } = highOrder;

export default class MenuListContainer extends Component {
  get selected() {
    return this.$store.getState().menus.selected;
  }

  template() {
    return MenuList(this.selected.menus);
  }

  eventGroup() {
    return [
      {
        type: EVENT_TYPE_CLICK,
        callback: ({ target }: MouseEvent & { target: HTMLButtonElement }) => {
          const isEdit = target.matches('.menu-edit-button');
          const isSoldOut = target.matches('.menu-sold-out-button');
          const isRemove = target.matches('.menu-remove-button');
          if (!isEdit && !isSoldOut && !isRemove) return;

          const $span = $closest(target, 'li', 'span') as HTMLSpanElement;
          const index = Number($span.getAttribute('index') as string);
          const keyword = target.textContent?.trim() as '품절' | '입고';
          const params = { index, text: $span.textContent, keyword };

          inCaseOf(isEdit, this.modifyItem.bind(this), params);
          inCaseOf(isSoldOut, this.soldOutItem.bind(this), params);
          inCaseOf(isRemove, this.removeItem.bind(this), params);
        },
      },
    ];
  }

  modifyItem({ index, text }: { index: number; text: string }) {
    const modifyName = prompt('메뉴 이름을 수정하시겠어요?', text) ?? text;

    this.$store.dispatch({
      type: MODIFY_MENU_ITEM,
      category: this.selected.id,
      menuId: this.selected.menus[index].menuId,
      name: modifyName,
    });
  }

  soldOutItem({ index, keyword }: { index: number; keyword: '품절' | '입고' }) {
    if (!confirm(`해당 메뉴를 ${keyword} 처리 하시겠어요?`)) return;

    this.$store.dispatch({
      type: SOLD_OUT_MENU_ITEM,
      category: this.selected.id,
      menuId: this.selected.menus[index].menuId,
      name: this.selected.menus[index].name,
    });
  }

  removeItem({ index }: { index: number }) {
    if (!confirm('메뉴를 삭제하시겠어요?')) return;

    this.$store.dispatch({
      type: REMOVE_MENU_ITEM,
      category: this.selected.id,
      menuId: this.selected.menus[index].menuId,
    });
  }
}
