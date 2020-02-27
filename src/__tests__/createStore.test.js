import createStore from '../index';

const initData = { counter: 0 };

let store = createStore(initData);

beforeEach(() => {
  store = createStore(initData);
});

test('store creates successfully', () => {
  expect(store.getState).toBeInstanceOf(Function);
  expect(store.mutation).toBeInstanceOf(Function);
  expect(store.subscribe).toBeInstanceOf(Function);
  expect(store.updateStore).toBeInstanceOf(Function);
});

test('getState returns state', () => {
  const { getState } = store;
  expect(getState()).toStrictEqual(initData);
});

describe('updateStore updates store', () => {
  const obj = { counter: 1 };
  test('with object', () => {
    const { updateStore, getState } = store;
    updateStore(obj);
    expect(getState()).toStrictEqual(obj);
  });
  test('with callback', () => {
    const { updateStore, getState } = store;
    updateStore(({ counter }) => ({ counter: counter + 1 }));
    expect(getState()).toStrictEqual(obj);
  });
  test('shallow merges state', () => {
    const { updateStore, getState } = store;
    const newData = { newField: 1212 };
    updateStore(newData);
    expect(getState()).toStrictEqual({ ...initData, ...newData });
  });
});

describe('subsribe function tests', () => {
  test('subsribe is calling listener on first subsribe', () => {
    const { subscribe } = store;
    const fn = jest.fn();
    subscribe(fn);
    expect(fn).toBeCalledTimes(1);
  });

  test('subsribtion is updated', () => {
    const { subscribe, updateStore } = store;
    const fn = jest.fn();
    const data = { counter: 2 };
    subscribe(fn);
    updateStore(data);
    expect(fn).toBeCalledTimes(2);
    expect(fn).toBeCalledWith(data);
  });

  test('subscribtion returns unsubsribe', () => {
    const { subscribe, updateStore } = store;
    const fn = jest.fn();
    const unsub = subscribe(fn);
    updateStore({ counter: 2 });
    unsub();
    updateStore({ counter: 3 });
    expect(fn).toBeCalledTimes(2);
  });
});

describe('mutation', () => {
  test('mutation returns a mutator function', () => {
    const { getState, mutation } = store;
    const increment = mutation(({ counter }) => ({ counter: counter + 1 }));
    increment();
    expect(getState()).toStrictEqual({ counter: 1 });
  });

  test('mutation accepts payload', () => {
    const { getState, mutation } = store;
    const setCounter = mutation((_, value) => ({ counter: value }));
    setCounter(5);
    expect(getState()).toStrictEqual({ counter: 5 });
  });
});

describe('mutationsObj', () => {
  test('returns mutation functions in object', () => {
    const { getState, mutationsObj } = store;
    const mutations = mutationsObj({
      increment({ counter }) {
        return { counter: counter + 1 };
      },
    });
    mutations.increment();
    expect(getState()).toStrictEqual({ counter: 1 });
  });
});
