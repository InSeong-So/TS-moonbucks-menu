import Storage from './Storage';

import { MenuItemProps } from 'component';

enum ParangStorageKey {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

class LocalState extends Storage<ParangStorageKey | string> {
  constructor() {
    super();
  }

  getAccessToken() {
    return this.get(ParangStorageKey.ACCESS_TOKEN);
  }

  setAccessToken(accessToken: string) {
    this.set(ParangStorageKey.ACCESS_TOKEN, accessToken);
  }

  getRefreshToken() {
    return this.get(ParangStorageKey.REFRESH_TOKEN);
  }

  setRefreshToken(refreshToken: string) {
    this.set(ParangStorageKey.REFRESH_TOKEN, refreshToken);
  }

  getCategoryMenus(key: string): MenuItemProps[] | null {
    return <MenuItemProps[]>JSON.parse(<string>this.get(key));
  }

  setCategoryMenus(key: string, menus: MenuItemProps[]) {
    this.set(key, JSON.stringify(menus));
  }

  clear() {
    this.clearItems([ParangStorageKey.ACCESS_TOKEN, ParangStorageKey.REFRESH_TOKEN]);
  }
}

export default new LocalState();
