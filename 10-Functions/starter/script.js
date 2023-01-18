'use strict';

// Higher order function
// callback
const randomNumberGenerator = function (min, max, counts) {
  const numbers = [];
  for (let i = 0; i < counts; i++) {
    numbers.push(Math.ceil(Math.random() * (max - min) + min));
  }
  return numbers;
};
const randomPick = function (randomGenerator = randomNumberGenerator) {
  const [min, max, counts] = [0, 100, 10];
  const candidates = randomGenerator(min, max, counts);
  console.log(candidates);
};
// randomPick();

// function return function
// const greet = function (person) {
//   return function () {
//     console.log('Howdy,', person);
//   };
// };

const greet = person => () => console.log('Howdy', person);
const greetHowdy = greet('Seongwoo');
// greetHowdy();

// call, apply method
const kal = {
  airline: 'Korean Air',
  iataCode: 'KE',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `Thank you for your booking on ${this.airline} flight ${this.iataCode}${flightNum}, ${name}`
    );
    this.bookings.push([flightNum, name]);
  },
};
// kal.book(787, 'Seongwoo');

const ryan = {
  name: 'Ryan Air',
  iataCode: 'RY',
  bookings: [],
};
const book = kal.book;

// book.call(ryan, 23, 'Sarah Williams');
// book.call(kal, 747, 'Damhye');
// book.apply(kal, [737, 'Cha']);

// bind method

const bookRyan = book.bind(ryan);
// bookRyan(333, 'Lion');
// bookRyan(444, 'Tiger');
// console.log(ryan);

// With event listeners
kal.planes = 300;
kal.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes, 'planes');
};
const kalBuyPlane = kal.buyPlane.bind(kal);
document.querySelector('.buy').addEventListener('click', kalBuyPlane);

// bind for default value
let addTax = (rate, value) => rate * value + value;
let japanVat = addTax.bind(null, 0.08);
// console.log(japanVat(3000));

// bind simulation
addTax = rate => value => rate * value + value;
japanVat = addTax(0.08);
// console.log(japanVat(3000));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, 
and an array with the number of replies for each option. 
This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. 
  For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. 
  Make sure to check if the input is a number and if the number makes sense 
  (e.g answer 52 wouldn't make sense, right?)

2. Call this method whenever the user clicks the "Answer poll" button.

3. Create a method 'displayResults' which displays the poll results. 
The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. 
If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. 
If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 

4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. 
Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // ask to poll
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}(Write option number)`
      )
    );
    // check if answer is within the range
    if (this.answers[answer] ?? true) {
      console.log(`Your input(${answer}) is out of the options`);
      return;
    }
    // register
    this.answers[answer]++;
    this.displayResults();
  },
  displayResults(type = 'array') {
    if (type == 'array') console.log(this.answers);
    else if (type == 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('button.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));
// debugger;

/////////////////////////////////////////////
// Closure

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const myCounter = secureBooking();
// console.dir(myCounter);
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 5;
  f = function () {
    console.log(b * 2);
  };
};

// g();
// f();
// h();
// f();
// console.dir(f);

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup}`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait}`);
};

// boardPassengers(99, 3);

// Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, 
attach an event listener that changes the color of the selected h1 element ('header') to blue, 
each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. 
Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
