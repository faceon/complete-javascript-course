// Importing module

import { addToCart, price, wait, tq as totalQuantity } from './shoppingCart.js';

// console.log('Importing module');
// addToCart('milk', 3);
// console.log(price, totalQuantity);

// import * as ShoppingCart from './shoppingCart.js';
// console.log(ShoppingCart.price, ShoppingCart.tq);

// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1) };
};

// console.log('start fetching');
// getLastPost().then(console.log);
// console.log(await getLastPost());
// console.log(await wait(1));
// console.log('finish fetching');

// import cloneDeep from 'lodash-es';
// import cloneDeep from 'lodash';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
state.user.loggedIn = false;
console.log(stateClone);
// const stateDeep = cloneDeep(state);
// console.log(stateDeep);

if (module.hot) module.hot.accept();
// console.log('hot mode activated');

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}
const seongwoo = new Person('Seongwoo');
console.log('성우' ?? null);
