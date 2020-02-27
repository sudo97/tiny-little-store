import createStore from './createStore';

export default obj => {
  const store = createStore({});
  const { subscribe, getState, updateStore } = store;

  Object.entries(obj).forEach(([key, value]) => {
    value.subscribe(x => {
      updateStore({ [key]: x });
    });
  });

  return {
    subscribe, getState,
  };
};
