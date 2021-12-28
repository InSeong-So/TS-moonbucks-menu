import { MenuItemProps } from 'component';

const MenuPage = ({ id, text, menus }: { id: string; text: string; menus: MenuItemProps[] }) => {
  return `
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex justify-between">
        <h2 class="mt-1">${text} 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${menus.length}개</span>
      </div>
      <form id="${id}-menu-form">
        <div class="d-flex w-100">
          <label for="${id}-menu-name" class="input-label" hidden>
            ${text} 메뉴 이름
          </label>
          <input type="text" id="${id}-menu-name" name="${id}MenuName" class="input-field"
            placeholder="${text} 메뉴 이름" autocomplete="off" />
          <button type="button" name="submit" id="${id}-menu-submit-button"
            class="input-submit bg-green-600 ml-2">
            확인
          </button>
        </div>
      </form>
      <ul id="${id}-menu-list" class="mt-3 pl-0" data-component="MenuList"></ul>
    </div>
    `;
};

export default MenuPage;
