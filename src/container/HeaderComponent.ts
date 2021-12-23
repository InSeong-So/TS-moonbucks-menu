import { Component } from '@/dom';
import { ComponentProp } from 'component';
import { Header } from '../view';
import { EVENT_TYPE_CLICK } from '@/constants';
import { LOAD_MENU } from '@/redux/reducers/menus/actions';

export default class HeaderContainer extends Component {
  template() {
    const { title } = <ComponentProp>this.$props;
    const { categories } = this.$store.getState().menus;
    return Header({ title, categories });
  }

  eventGroup() {
    return [
      {
        type: EVENT_TYPE_CLICK,
        callback: ({ target }: { target: HTMLElement }) => {
          if (!target.matches('button')) return;
          this.$store.dispatch({
            type: LOAD_MENU,
            category: <string>target.dataset.categoryName,
          });
        },
      },
    ];
  }
}
