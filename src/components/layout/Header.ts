import renderNavigation from './Navigation.js';

const Header = () => {
  const NavigationComponent = renderNavigation();

  return `<header class="my-4">
    <a href="/" class="text-black">
      <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
    </a>
    ${NavigationComponent}
</header>`;
};

export default Header;
