/**
 * 뱅크샐러드 글 보고 구현 다시 해보기
 * @TODO https://blog.banksalad.com/tech/typescript-local-storage/
 *
 * @see https://mygumi.tistory.com/405
 */

type LocalStorage = typeof window.localStorage;

const PREFIX_LOCALSTORAGE = 'PARANG_';

export default abstract class Storage<T extends string> {
  private readonly storage: LocalStorage;
  protected constructor(getStorage = (): LocalStorage => window.localStorage) {
    this.storage = getStorage();
  }
  private getOriginKey(key: T) {
    return `${PREFIX_LOCALSTORAGE}${key}`;
  }
  protected get(key: T): string | null {
    return this.storage.getItem(this.getOriginKey(key));
  }
  protected set(key: T, value: string): void {
    this.storage.setItem(this.getOriginKey(key), value);
  }
  protected clearItem(key: T): void {
    this.storage.removeItem(this.getOriginKey(key));
  }
  protected clearItems(keys: T[]): void {
    keys.forEach(key => this.clearItem(<T>this.getOriginKey(key)));
  }
}
