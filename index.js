export default initialState => {
  let store = { ...initialState };
  let listeners = [];
  const subscribe = func => {
    listeners.push(func);
    func(store);
    return () => {
      listeners = listeners.filter(f => f !== func);
    };
  };
  const updateStore = mutation => {
    if (typeof mutation === "function") {
      const m = mutation(store);
      store = { ...store, ...m };
    } else {
      store = { ...store, ...mutation };
    }
    listeners.forEach(l => l(store));
    return {...store};
  };

  const getState = () => ({ ...store });

  return { subscribe, updateStore, getState };
};
