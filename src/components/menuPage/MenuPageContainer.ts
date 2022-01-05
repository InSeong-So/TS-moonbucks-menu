import MenuPage from './MenuPage';

const MenuPageContainer = () => {
  const buttonClick = (event: any) => {
    if (!event.target.matches('.input-submit')) return;

    const $input = document.querySelector('.input-field') as HTMLInputElement;
    const $li = document.createElement('li');
    $li.setAttribute('class', 'menu-list-item d-flex items-center py-2');
    $li.innerHTML = `
    <span class="w-100 pl-2 menu-name">${$input.value}</span>
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
    `;
    const $ul = document.querySelector('ul');
    $ul?.insertBefore($li, $ul.firstChild);
    $input.value = '';
  };

  const component = MenuPage();

  return { component, events: [{ type: 'click', cb: buttonClick }] };
};

export default MenuPageContainer;
