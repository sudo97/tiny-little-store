# Tiny Little Store

Minimalistic state-management library.

Not really tested in battle;

Please feel free to make Pull Requests, I would be happy to see where it can go

## Getting Started

`npm install tiny-little-store` will get you started.

to init store just do this:
```javascript
const store = createStore(initialState);
```
Where store is an object containing these three methods:
```javascript
const { subscribe, updateStore, getState } = store;
```
You can guess how it works before you continue reading....

ready...

+ subscribe -- adds event listener which is called when store updates
+ updateStore -- makes shallow merge of the object you pass and the object you have, alternatively you can pass function that will recieve current state and needs to return a new one, after merge it calls all the listeners
+ getState -- guess what it does...

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details