export default obj => {
  let listeners = [];

  const state = { ...obj };

  Object.entries(state).forEach(([key, value]) => {
    value.subscribe(x => {
      state[key] = x;
      listeners.forEach(l => l({ ...state }));
    });
  });

  const subscribe = (l) => {
    listeners = [...listeners, l];
    l({ ...state });
    return () => {
      listeners = listeners.filter(_l => _l !== l);
    };
  };

  const getState = () => ({ ...state });

  return {
    subscribe, getState,
  };
};
