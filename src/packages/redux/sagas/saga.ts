import { logEffect } from './logger';

export const take = (actionType: any) => ({ type: 'take', actionType });
export const select = (selector: any) => ({ type: 'select', selector });
export const call = (fn: any, ...args: any[]) => ({ type: 'call', fn, args });
export const put = (action: any) => ({ type: 'put', action });
export const fork = (saga: any, ...args: any[]) => ({ type: 'fork', saga, args });

export function* takeEvery(actionType: any, saga: any) {
  yield fork(function* newSaga() {
    while (true) {
      const action: Generator<undefined, undefined, undefined> = yield take(actionType);
      yield* saga(action)();
    }
  });
}

export async function runSaga(store: any, saga: any, ...args: any[]) {
  try {
    const iterator = saga(...args);
    let result = iterator.next();
    while (!result.done) {
      const effect = result.value;
      // logEffect(effect);
      switch (effect.type) {
        case 'fork': {
          runSaga(store, effect.saga, ...effect.args);
          result = iterator.next();
          break;
        }
        case 'take': {
          const action = await new Promise(resolve =>
            store.actionsEmitter.once(effect.actionType, resolve),
          );
          result = iterator.next(action);
          break;
        }
        case 'select': {
          result = iterator.next(effect.selector(store.getState()));
          break;
        }
        case 'call': {
          result = iterator.next(await effect.fn(...effect.args));
          break;
        }
        case 'put': {
          store.dispatch(effect.action);
          result = iterator.next();
          break;
        }
        default:
          throw new Error(`Invalid effect type: ${effect.type}`);
      }
    }
  } catch (err) {
    console.error('Uncaught in runSaga', err);
  }
}
