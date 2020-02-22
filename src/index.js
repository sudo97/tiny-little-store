export default initialState => {
  let store = { ...initialState };
  let listeners = [];
  const subscribe = func => {
    listeners.push(func);
    func(store);

    const unsubscribe = () => {
      listeners = listeners.filter(f => f !== func);
    };

    return unsubscribe;
  };
  const updateStore = mutator => {
    if (typeof mutator === 'function') {
      const m = mutator(store);
      store = { ...store, ...m };
    } else {
      store = { ...store, ...mutator };
    }
    listeners.forEach(l => l(store));
    return { ...store };
  };

  const getState = () => ({ ...store });

  const mutation = mutator => (...args) => updateStore(mutator(store, ...args));

  const mutationsObj = obj => (Object.fromEntries(Object.entries(obj).map(
    ([k, v]) => [k, mutation(v)],
  )));

  return {
    subscribe, updateStore, getState, mutation, mutationsObj,
  };
};
