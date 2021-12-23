import { CategoryProps } from 'component';

const Header = ({ title, categories }: { title?: string; categories: CategoryProps[] }) => {
  return `
    <a href="/" class="text-black">
      <h1 class="text-center font-bold">${title ?? '메뉴 관리 앱'}</h1>
    </a>
    <nav class="d-flex justify-center flex-wrap">
      ${categories
        .map(({ id, text }: CategoryProps) => {
          return `
        <button
          data-category-name="${id}"
          class="cafe-category-name btn bg-white shadow mx-1">
          ${text}
        </button>
        `;
        })
        .join('')}
    </nav>
    `;
};

export default Header;
