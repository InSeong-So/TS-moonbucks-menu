import { AnyAction } from 'redux';
import HTTPClient from './HTTPClient';

const httpClient = new HTTPClient({
  mode: 'no-cors',
  cache: 'no-cache',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
  referrer: 'no-referrer',
});

const http = {
  async load(action: AnyAction) {
    return await httpClient.get(`/api/category/${action.category}/menu`, null, {
      from: `Load "${action.category}" menu`,
    });
  },
  async insert({ category }: { category: string }, params: any) {
    return await httpClient.post(`/api/category/${category}/menu`, params, null, {
      from: `Create "${category}" "${params.data}"`,
    });
  },
  async update(action: AnyAction, params: any) {
    return await httpClient.put(
      `/api/category/${action.category}/menu/${action.menuId}`,
      params,
      null,
      { from: `Update "${action.category}" "${params.data}"` },
    );
  },
  async soldOut(action: AnyAction, params: any) {
    return await httpClient.put(
      `/api/category/${action.category}/menu/${action.menuId}/soldout`,
      params,
      null,
      { from: `Sold-Out "${action.category}" "${params.data}"` },
    );
  },
  async delete(action: AnyAction) {
    return await httpClient.delete(`/api/category/${action.category}/menu/${action.menuId}`, null, {
      from: `Delete "${action.category}" menu`,
    });
  },
};

export default http;
