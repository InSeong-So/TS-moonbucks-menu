declare module 'global' {
  export interface AnyObject {
    [key: string | symbol]: any;
  }
}
