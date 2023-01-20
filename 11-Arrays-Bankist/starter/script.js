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
const displayMovements = (account, sort = false) => {
  const movements = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;
  containerMovements.innerHTML = '';
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

const calcBalance = account => {
  account.balance = account.movements.reduce((acc, move) => acc + move, 0);
  labelBalance.textContent = account.balance + '€';
};

const calcSumIn = account => {
  account.sumIn = account.movements
    .filter(move => move > 0)
    .reduce((acc, move) => acc + move, 0);
  labelSumIn.textContent = account.sumIn + '€';
};

const calcSumOut = account => {
  account.sumOut = account.movements
    .filter(move => move < 0)
    .reduce((acc, move) => acc + move, 0);
  labelSumOut.textContent = account.sumOut + '€';
};

const calcSumInterest = account => {
  account.sumInterest = account.movements
    .filter(move => move > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((interest, i) => interest >= i)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = account.sumInterest + '€';
};

const updateUI = (account = currentAccount) => {
  displayMovements(account);
  calcBalance(account);
  calcSumIn(account);
  calcSumOut(account);
  calcSumInterest(account);
};

const createUsernames = accounts => {
  accounts.forEach(
    account =>
      (account.username = account.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join(''))
  );
};

createUsernames(accounts);
let currentAccount;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Event handler

/////////////////////////////////////////////////
// Login
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
  updateUI();
  containerApp.style.opacity = 1;
});

/////////////////////////////////////////////////
// Transfer money
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const transferAmount = Number(inputTransferAmount.value);
  // check if amount is more than I have
  if (currentAccount.balance < transferAmount) {
    console.log(
      `You have ${currentAccount.balance} which is less than ${transferAmount}`
    );
    return;
  }
  // find if toAccount exists or it is myself
  const transferAccount = accounts.find(
    account => account.username === inputTransferTo.value
  );
  if (!transferAccount) {
    console.log(`Failed to find a user named ${inputTransferTo.value}`);
    return;
  }
  if (transferAccount.username === currentAccount.username) {
    console.log('You cannot transfer to yourself!');
    return;
  }
  // transaction
  currentAccount.movements.push(-transferAmount);
  transferAccount.movements.push(transferAmount);
  console.log(`transfered ${transferAmount} to ${transferAccount.owner}`);
  // refresh UI
  inputTransferAmount.value = inputTransferTo.value = '';
  updateUI();
});

/////////////////////////////////////////////////
// Loan
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(move => move >= loanAmount * 0.1)
  ) {
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
  } else {
    console.log('You requested too much loan');
  }
});

/////////////////////////////////////////////////
// Close account
btnClose.addEventListener('click', e => {
  e.preventDefault();
  // return index of a user with username and PIN
  if (
    currentAccount.username !== inputCloseUsername.value ||
    currentAccount.pin !== Number(inputClosePin.value)
  ) {
    console.log('Check your username and PIN');
    return;
  }
  const userIndex = accounts.findIndex(
    account => account.username === inputCloseUsername.value
  );
  // splice the index
  accounts.splice(userIndex, 1);
  inputCloseUsername.value = inputClosePin.value = '';
  containerApp.style.opacity = 0;
  console.log('User account was deleted');
});

/////////////////////////////////////////////////
// Sort
let sortDown = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  sortDown = !sortDown;
  displayMovements(currentAccount, sortDown);
});

/////////////////////////////////////////////////
// Array.from
let movementsUI;
document.addEventListener('click', () => {
  movementsUI = document.querySelectorAll('.movements__value');
  movementsUI = Array.from(
    movementsUI,
    move => (move.textContent = move.textContent.replace('€', '💶'))
  );
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

////////////////////////////////////////////////////////
// Array method practice

let bankDepositSum = accounts
  .map(acc => acc.movements)
  .flat()
  .filter(move => move > 0)
  .reduce((sum, move) => sum + move, 0);

bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(move => move > 0)
  .reduce((sum, move) => sum + move, 0);

let over1kDeposits = accounts
  .flatMap(cur => cur.movements)
  .filter(cur => cur > 1000).length;

over1kDeposits = accounts
  .flatMap(cur => cur.movements)
  .reduce((count, cur) => (cur > 1000 ? ++count : count), 0);

let sumInOut = accounts
  .flatMap(cur => cur.movements)
  .reduce(
    (sum, cur) => {
      if (cur > 0) sum.in++;
      if (cur < 0) sum.out++;
      return sum;
    },
    { in: 0, out: 0 }
  );

sumInOut = accounts.reduce(
  (sum, acc) => {
    acc.movements.reduce((sum, move) => {
      sum[move > 0 ? 'in' : 'out'] += move;
      return sum;
    }, sum);
    return sum;
  },
  { in: 0, out: 0 }
);

const title = 'this is a nice title';
const expections = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

let convertTitleCase = title =>
  title
    .toLowerCase()
    .split(' ')
    .map(str =>
      expections.includes(str) ? str : str[0].toUpperCase() + str.slice(1)
    )
    .join(' ');

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, 
calculate the recommended food portion and add it to the object as a new property. 
Do NOT create a new array, simply loop over the array. 
Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

2. Find Sarah's dog and log to the console whether it's eating too much or too little. 
HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, 
and so this one is a bit tricky (on purpose) 🤓

3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') 
and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., 
like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
// console.log(dogs);

// 2.
const isSarahsOvereating = dogs
  .filter(dog => dog.owners.includes('Sarah'))
  .some(dog => dog.recommendedFood * 1.1 < dog.curFood);
// console.log(`Sarah's dog is overeating?: ${isSarahsOvereating}`);

// 3.
const { much: ownersEatTooMuch, little: ownersEatTooLittle } = dogs.reduce(
  (acc, dog) => {
    if (dog.curFood > dog.recommendedFood * 1.1) {
      acc.much = acc.much.concat(dog.owners);
    } else if (dog.curFood < dog.recommendedFood * 0.9) {
      acc.little = acc.little.concat(dog.owners);
    }
    return acc;
  },
  { much: [], little: [] }
);

// 4.
// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.
const isAnyEatingExactly = dogs.some(dog => dog.curFood == dog.recommendedFood);
// console.log(`Is there any dog eating exactly?: ${isAnyEatingExactly}`);

// 6.
const isEatingOk = dog =>
  dog.curFood < dog.recommendedFood * 1.1 &&
  dog.curFood > dog.recommendedFood * 0.9;
const isAnyEatingOk = dogs.some(isEatingOk);
// console.log(`Is there any dog eating just ok?: ${isAnyEatingOk}`);

// 7.
// console.log(dogs.filter(isEatingOk));

// 8.
const recommendedSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
