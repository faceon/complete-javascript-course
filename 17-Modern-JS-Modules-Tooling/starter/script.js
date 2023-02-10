// Importing module

// import {
//   addToCart,
//   totalPrice as price,
//   tq as totalQuantity,
// } from './shoppingCart.js';

// console.log('Importing module');
// addToCart('milk', 3);
// console.log(price, totalQuantity);

import * as ShoppingCart from './shoppingCart.js';
console.log(ShoppingCart.price, ShoppingCart.tq);

const user = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json));
