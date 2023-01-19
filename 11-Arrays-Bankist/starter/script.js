'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
const createUsernames = accounts =>
  accounts.forEach(
    account =>
      (account.username = account.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join(''))
  );

const displayMovements = movements => {
  containerMovements.innerHTML = '';
  // movements.forEach(move => {
  //   const row = document.createElement('div');
  //   row.classList.add('movements__row');
  //   const value = document.createElement('div');
  //   value.classList.add('movements__value');
  //   value.textContent = move;
  //   row.appendChild(value);
  //   containerMovements.appendChild(row);
  // });
  movements.forEach((move, i, arr) => {
    const type = move > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <!--<div class="movements__date">${arr.length - i - 1} days ago</div>-->
    <div class="movements__value">${move}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcBalance = movements => movements.reduce((acc, move) => acc + move, 0);
const calcSumIn = movements =>
  movements.filter(move => move > 0).reduce((acc, move) => acc + move, 0);
const calcSumOut = movements =>
  movements.filter(move => move < 0).reduce((acc, move) => acc + move, 0);
const calcSumInterest = (movements, interestRate) =>
  movements
    .filter(move => move > 0)
    .map(deposit => (deposit * interestRate) / 100)
    .filter((interest, i, arr) => interest >= i)
    .reduce((acc, interest) => acc + interest, 0);

const displaySummaries = (movements, interestRate = 1.2) => {
  labelBalance.textContent = calcBalance(movements) + '€';
  labelSumIn.textContent = calcSumIn(movements) + '€';
  labelSumOut.textContent = calcSumOut(movements) + '€';
  labelSumInterest.textContent = calcSumInterest(movements, interestRate) + '€';
};

const updateNumbers = (account = currentAccount) => {
  displayMovements(account.movements);
  displaySummaries(account.movements, account.interestRate);
};

// Event handler

createUsernames(accounts);
let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  // check id and pin and find an account
  currentAccount = accounts.find(account => {
    return (
      account.username == inputLoginUsername.value &&
      account.pin == Number(inputLoginPin.value)
    );
  });

  if (currentAccount) {
    console.log(`logged in as ${currentAccount.owner}`);
  } else {
    console.log('log in failed');
    return;
  }

  // if logged in,
  // welcome message
  labelWelcome.textContent = `Welcome back ${currentAccount.owner
    .split(' ')
    .at(0)}`;

  // hide login inputs and buttons
  inputLoginPin.style.display =
    inputLoginUsername.style.display =
    btnLogin.style.display =
      'display';
  inputLoginPin.blur();

  // display movements and balances
  updateNumbers(currentAccount);
  containerApp.style.opacity = 1;
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const currentBalance = calcBalance(currentAccount.movements);
  const transferAmount = Number(inputTransferAmount.value);
  // check if amount is more than I have
  if (currentBalance < transferAmount) {
    console.log(
      `You have ${currentBalance} which is less than ${transferAmount}`
    );
    return;
  }
  // find if toAccount exists
  const transferAccount = accounts.find(
    account => account.username === inputTransferTo.value
  );
  if (!transferAccount) {
    console.log(`Failed to find a user named ${inputTransferTo.value}`);
    return;
  }
  // transaction
  currentAccount.movements.push(-transferAmount);
  transferAccount.movements.push(transferAmount);
  // refresh information
  updateNumbers();
});

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. 
So each of them asked 5 dog owners about their dog's age, 
and stored the data into an array (one array for each). 

For now, they are just interested in knowing whether a dog is an adult or a puppy. 
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! 
So create a shallow copy of Julia's array, and remove the cat ages from that copied array 
(because it's a bad practice to mutate function parameters)

2. Create an array with both Julia's (corrected) and Kate's data

3. For each remaining dog, log to the console whether it's an adult 
("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")

4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = function (dogsJulia, dogsKate) {
  // remove cats from julia's
  const dogsOnly = dogsJulia.slice(1, -2);
  // concat
  const dogAges = dogsOnly.concat(dogsKate);
  // log if an adult
  dogAges.forEach((age, i) => {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
// checkDogs([3, 5, 2, 17, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. 
This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. 
If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = function (ages) {
  return ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i) => (acc * i + age) / (i + 1), 0);
};

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, 
but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const chainAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i) => (acc * i + age) / (i + 1), 0);

// console.log(chainAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(chainAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// find an account with a name with three words
// console.log(accounts.find(account => account.owner.split(' ').length == 3));
