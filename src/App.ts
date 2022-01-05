import HeaderContainer from './components/header/HeaderContainer';
import MenuPageContainer from './components/menuPage/MenuPageContainer';
import htmlParser from './helpers/dom/converter';
import { createVDOM } from './helpers/dom/converter';

const App = () => {
  const { component: header } = HeaderContainer();
  const { component: menuPage, events: menuPageEvents } = MenuPageContainer();

  return createVDOM({
    type: 'Element',
    tagName: 'div',
    attributes: {
      class: 'd-flex justify-center mt-5 w-100',
    },
    children: [
      {
        type: 'Element',
        tagName: 'div',
        attributes: {
          class: 'w-100',
        },
        children: [
          { ...htmlParser(header).children[0] },
          { ...htmlParser(menuPage).children[0], events: menuPageEvents },
        ],
      },
    ],
  });
};

export default App();
