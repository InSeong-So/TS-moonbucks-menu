import { HTTP_METHOD } from '@/constants';

declare module 'http' {
  export type HTTP_METHOD = typeof HTTP_METHOD[keyof typeof HTTP_METHOD];
}
