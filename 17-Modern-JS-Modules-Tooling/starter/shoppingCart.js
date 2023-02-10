// Exporting module
console.log('Exporting module');

const shoppingCost = 10;
const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 120;
const totalQuantity = 15;

export { totalPrice as price, totalQuantity as tq };
