'use strict';

//hoisting test
// try {
//   console.log(me);
// } catch (e) {
//   console.log(e);
// }

// try {
//   console.log(job);
// } catch (e) {
//   console.log(e);
// }

// try {
//   console.log(year);
// } catch (e) {
//   console.log(e);
// }

// var me = 'Seongwoo';
// let job = 'teacher';
// const year = 1978;

// console.log(addDecl(4, -1));
// function addDecl(a, b) {
//   return a + b;
// }

// // console.log(addExpr(4, -1));
// const addExpr = function (a, b) {
//   return a + b;
// };

// console.log(addArrow);
// var addArrow = (a, b) => a + b;

// console.log(addDecl);

// if (!numProducts) deleteCart();
// var numProducts = 10;
// function deleteCart() {
//   console.log('All deleted');
// }

// var myX = 1;
// let myY = 2;
// const myZ = 3;

// console.log(this);

// const calcAge = function () {
//   console.log(this);
// };
// calcAge();

// const calcMonth = () => {
//   console.log(this);
// };
// calcMonth();

// const Seongwoo = {
//   birthYear: 1978,
//   calcAge: function () {
//     return 2023 - this.birthYear;
//   },
// };

// const Ain = { birthYear: 2011 };

// Ain.calcAges = Seongwoo.calcAge;
// console.log(Ain.calcAges());

// const f = Seongwoo.calcAge;
// f();

const seongwoo = {
  fullName: 'seongwkim',
  year: 1978,
  calcAge: function () {
    console.log(this);
    console.log(2023 - this.year);
  },
  greet: function () {
    const logThis = () => console.log(this);
    logThis();
  },
};

seongwoo.calcAge();
seongwoo.greet();

const arg = function (a) {
  console.log(a);
  console.log(...arguments);
};

arg(1, 2, 3, 45, 1);
