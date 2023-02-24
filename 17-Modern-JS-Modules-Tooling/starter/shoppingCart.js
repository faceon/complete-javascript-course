// Exporting module
// console.log('Exporting module');

const shoppingCost = 10;
const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 120;
const totalQuantity = 15;

export const wait = function (seconds) {
  return new Promise(function (resolve, reject) {
    // visualizing time passing
    let dots = '';
    const intervalId = setInterval(() => {
      dots += '.';
      console.log(dots);
    }, 1000);
    // resolve when time passed
    setTimeout(() => {
      clearInterval(intervalId);
      resolve(`${seconds} seconds have passed`);
    }, seconds * 1e3);
  });
};

export { totalPrice as price, totalQuantity as tq };
