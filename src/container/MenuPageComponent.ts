import MenuListContainer from './MenuListComponent';
import { Component } from '@/dom';
import { dom, highOrder } from '@/helpers';
import { MenuPage } from '../view';
import { EVENT_TYPE_CLICK } from '@/constants';
import { MenuItemProps } from 'component';
import { INSERT_MENU_ITEM } from '@/redux/reducers/menus/actions';

const { $ } = dom;
const { find } = highOrder;

export default class MenuPageContainer extends Component {
  get selected() {
    return this.$store.getState().menus.selected;
  }

  template() {
    return MenuPage(this.selected);
  }

  mount() {
    new MenuListContainer('.wrapper > ul');
  }

  eventGroup() {
    return [
      {
        type: EVENT_TYPE_CLICK,
        callback: (event: MouseEvent) => {
          event.preventDefault();
          const target = <HTMLButtonElement>event.target;
          if (!target.matches('.input-submit')) return;

          const $inputItem = <HTMLInputElement>$('form input');

          if (!$inputItem.value) return;
          this.insertItem($inputItem.value);
          $inputItem.value = '';
        },
      },
    ];
  }

  insertItem(name: string) {
    if (<MenuItemProps>find(this.selected.menus, 'name', 'name'))
      return alert('이미 등록되어 있는 메뉴입니다.');

    this.$store.dispatch({ type: INSERT_MENU_ITEM, category: this.selected.id, name });
  }
}
