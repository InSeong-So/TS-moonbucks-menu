import { MenuItemFormServer } from '../modules/type';

const baseURL = 'http://localhost:3000/api';

const request = async ({
  url = baseURL,
  body,
  method = 'GET',
}: {
  url: string;
  body?: unknown;
  method: string;
}) => {
  return await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });
};

const checkProperties = (
  data: Record<string, any>,
  expectedPropertyKeys: string[],
) => {
  expectedPropertyKeys.forEach(key => {
    if (!Object.keys(data).includes(key)) {
      throw new Error(
        `서버에서 받아온 데이터 ${JSON.stringify(
          data,
        )}에 key가 ${key}인 데이터가 존재하지 않습니다.`,
      );
    }
  });
};
export const menuClient = {
  add: async (text: string, category: string): Promise<MenuItemFormServer> => {
    const response = await request({
      url: `${baseURL}/category/${category}/menu`,
      body: { name: text },
      method: 'POST',
    });
    console.log(response);
    if (response.ok) {
      const res = await response.json();
      checkProperties(res, ['id', 'name', 'isSoldOut']);
      return res;
    } else {
      throw new Error('rejected');
    }
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
    const response = await request({
      url: `${baseURL}/category/${category}/menu/${menuId}`,
      body: { name: text },
      method: 'PUT',
    });
    console.log(response);
    if (response.ok) {
      const res = await response.json();
      checkProperties(res, ['id', 'name', 'isSoldOut']);
      return res;
    } else {
      throw new Error('rejected');
    }
  },
};
