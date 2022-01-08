import { MenuItemFormServer } from '../modules/type';

const baseURL = 'http://localhost:3000/api';

async function parseResponse<ReturnType>(res: Response): Promise<ReturnType> {
  if (res.ok) {
    return (await res.json()) as ReturnType;
  } else {
    const e = await res.json();
    throw new Error(e?.message);
  }
}
const request = ({
  url = baseURL,
  headers = new Headers({
    'Content-Type': 'application/json',
  }),
}: {
  url?: string;
  headers?: Headers;
}) => ({
  post: async <BodyType>(restUrl: string, body?: BodyType) => {
    return await fetch(`${url}${restUrl}`, {
      method: 'POST',
      headers,
      body: body ? JSON.stringify(body) : null,
    });
  },
  put: async <BodyType>(restUrl: string, body?: BodyType) => {
    return await fetch(`${url}${restUrl}`, {
      method: 'PUT',
      headers,
      body: body ? JSON.stringify(body) : null,
    });
  },
});

const menuRequest = request({});
const checkProperties = (
  data: Record<string, any>,
  expectedPropertyKeys: string[],
) => {
  expectedPropertyKeys.forEach(key => {
    if (!Object.keys(data).includes(key)) {
      // 개발에 필요한 에러
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
};
