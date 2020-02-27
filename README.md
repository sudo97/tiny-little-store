# Tiny Little Store

Minimalistic state-management library.

Not really tested in battle;

Please feel free to make Pull Requests, I would be happy to see where it can go

Also check [react-tiny-little-store](https://www.npmjs.com/package/react-tiny-little-store)

## Getting Started

`npm install tiny-little-store` will get you started.

to init store just do this:
```javascript
const store = createStore(initialState);
```
Where store is an object containing these three methods:
```javascript
const { subscribe, updateStore, getState, mutation, mutationsObj } = store;
```
You can guess how it works before you continue reading....

ready...

+ subscribe -- adds event listener which is called when store updates
+ updateStore -- makes shallow merge of the object you pass and the object you have, alternatively you can pass function that will recieve current state and needs to return a new one, after merge it calls all the listeners
+ getState -- guess what it does...
+ mutation -- a wrapper, accepts a pure function, like the one you would pass into updateStore, wraps it with updateStore. Returned function is able to accept payloads(the second argument of passed pure function)
+ mutationsObj -- alternatively you can pass an object, and it will return an object with wrapped methods

```javascript
  // updateStore example
  updateStore(({count}) => ({count: count+1})); // this will change store and inform all the subscribtions

  // or you can use mutations
  const increment = mutation(({count}) => ({count: count+1}));

  increment();
  increment(); // works the same
  const setCount = mutation( (state, value) => ({count: value}));
  setCount(1);
  setCount(5);

  const mutatoins = mutationsObj({
    increment({ count }) {
      return { count: count + 1 };
    },
    decrement({ count }) {
      return { count: count - 1 };
    }
  })

  mutations.increment(); // but I am not sure anyone would prefer this
```

Also since v1.2 exports `combineStores`, you pass there your stores like:
```javascript
  const store1 = createStore(init1);
  const store2 = createStore(init2);

  const rootStore = combineStores({ store1, store2 });
```
rootStore has only `subscribe` and `getState`, which work the same as from non-combined. you cannot create mutations or updateStore directly on combined stores. You should encapsulate those things for each store, and then use those methods, and combinedStore will only notify.
## NB
Any mutations you create are syncronous, you can create custom methods(like Vuex actions), which would call desired mutations in asynchronous way.
```javascript
  const store = createStore({ isLoading: false, data: null });
  const { mutation } = store;
  const setLoading = mutation((store, value) => ({isLoading: value}));
  const setData = mutation((store, data) => ({ data }));
  const fetchData = async () => {
    setLoading(true);
    const data = await fetch(MY_URL)
    setData(data);
    setLoading(false);
  }
```
Or you can use `updateStore` inside your actions(or code you mutations smarter) to improve performance. 
Calling two mutations invokes two updates, and then potentially re-renders twice.
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details