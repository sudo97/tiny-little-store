import createStore, { combineStores } from '../index';

const initCounter = { value: 0 };
const initRandom = { value: 0 };

let counter;
let random;
let combined;

let increment;
beforeEach(() => {
  counter = createStore(initCounter);
  {
    const { mutation } = counter;
    increment = mutation(({ value }) => ({ value: value + 1 }));
  }
  random = createStore(initRandom);
  combined = combineStores({ counter, random });
});

describe('stores are easily combined', () => {
  test('combine works fine and returns subscribe and getState', () => {
    expect(combined.getState).toBeInstanceOf(Function);
    expect(combined.subscribe).toBeInstanceOf(Function);
  });

  test('getState returns real state', () => {
    const { getState } = combined;
    expect(getState()).toStrictEqual({ counter: { value: 0 }, random: { value: 0 } });
    increment();
    expect(getState()).toStrictEqual({ counter: { value: 1 }, random: { value: 0 } });
  });

  test('subsribe works properly', () => {
    const { subscribe, getState } = combined;
    const s = jest.fn();
    subscribe(s);
    expect(s).toBeCalledTimes(1);
    expect(s).toBeCalledWith(getState());
    increment();
    expect(s).toBeCalledWith(getState());
  });

  test('unsubsribe works properly', () => {
    const { subscribe, getState } = combined;
    const s = jest.fn();
    const unsub = subscribe(s);
    expect(s).toBeCalledTimes(1);
    increment();
    unsub();
    const state = getState();
    increment();
    increment();
    expect(s).toBeCalledTimes(2);
    expect(s.mock.calls[1][0]).toStrictEqual(state);
    expect(s.mock.calls[0][0]).toStrictEqual({ counter: { value: 0 }, random: { value: 0 } });
  });
});
