import { Coffee } from '../../modules/constants';
import { MenuItemFormServer } from '../../modules/type';
import request, { parseResponse, checkProperties } from '../myRequest';

const menuRequest = request({
  options: {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  },
});

export const menuClient = {
  fetchAll: async () => {
    const promises = await Promise.all(
      Object.values(Coffee).map(({ key }) => ({
        key,
        resolved: menuRequest.get(`/category/${key}/menu`),
      })),
    );
    return await Promise.all(
      promises.map(async ({ key, resolved }) => {
        const menuList = await parseResponse<MenuItemFormServer[]>(
          await resolved,
        );
        // validate check
        menuList.forEach(res =>
          checkProperties(res, ['id', 'name', 'isSoldOut']),
        );
        return { [key]: menuList };
      }),
    );
  },
  add: async (text: string, category: string): Promise<MenuItemFormServer> => {
    const response = await menuRequest.post(`/category/${category}/menu`, {
      name: text,
    });
    const res = await parseResponse<MenuItemFormServer>(response);
    checkProperties(res, ['id', 'name', 'isSoldOut']);
    return res;
  },
  editText: async ({
    text,
    category,
    menuId,
  }: {
    text: string;
    category: string;
    menuId: string;
  }): Promise<MenuItemFormServer> => {
    /**
     *  제네릭이 자유롭게 추론되므로 해당 리퀘스트의 body 타입을 지정하고 싶으면 한 레이어 더 감ㄱ싸야 할듯
     */
    const response = await menuRequest.put<{ name: string }>(
      `/category/${category}/menu/${menuId}`,
      { name: text },
    );
    const res = await parseResponse<MenuItemFormServer>(response);
    checkProperties(res, ['id', 'name', 'isSoldOut']);
    return res;
  },
  toggleSoldOut: async ({
    category,
    menuId,
  }: {
    category: string;
    menuId: string;
  }) => {
    const response = await menuRequest.put(
      `/category/${category}/menu/${menuId}/soldout`,
    );
    const res = await parseResponse<MenuItemFormServer>(response);
    checkProperties(res, ['id', 'name', 'isSoldOut']);
    return res;
  },
  remove: async ({
    category,
    menuId,
  }: {
    category: string;
    menuId: string;
  }) => {
    const response = await menuRequest.delete(
      `/category/${category}/menu/${menuId}`,
    );
    const res = await parseResponse(response);
    console.log(res);
    return res;
  },
};
