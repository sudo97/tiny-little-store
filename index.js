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
      console.log(m);
      store = { ...store, ...m };
    } else {
      console.log(mutation);
      store = { ...store, ...mutation };
    }
    listeners.forEach(l => l(store));
  };

  const getState = () => ({ ...store });

  return { subscribe, updateStore, getState };
};
