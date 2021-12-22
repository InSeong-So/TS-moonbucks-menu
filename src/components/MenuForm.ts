const MenuForm = () => {
  return `
  <div class="heading d-flex justify-between">
    <h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>
    <span id="menu-count" class="mr-2 mt-4 menu-count">총 0개</span>
  </div>
  <form id="espresso-menu-form">
    <div class="d-flex w-100">
      <label for="espresso-menu-name" class="input-label" hidden>
        에스프레소 메뉴 이름
      </label>
      <input
        type="text"
        id="espresso-menu-name"
        name="espressoMenuName"
        class="input-field"
        placeholder="에스프레소 메뉴 이름"
        autocomplete="off"
      />
      <button
        type="submit"
        name="submit"
        id="espresso-menu-submit-button"
        class="input-submit bg-green-600 ml-2"
      >
        확인
      </button>
    </div>
  </form>`;
};

export default MenuForm;
