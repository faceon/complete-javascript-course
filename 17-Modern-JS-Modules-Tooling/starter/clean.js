const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

////////////////////////////////////////////////////////
// Pure function
const isUnderLimit = function (limits, value, user) {
  const limit = limits[user] ?? 0;
  return value >= -limit;
};

const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const newExpense = { value: -value, description, user: user.toLowerCase() };
  if (isUnderLimit(limits, value, user)) return [...state, newExpense];
  return state;
};

addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
console.log(budget);

const checkExpenses = function (state, limits) {
  return state.map(el =>
    isUnderLimit(limits, el.value, el.user) ? el : { ...el, flag: 'limit' }
  );
};
console.log(checkExpenses(budget, spendingLimits));

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(el => el.value <= -bigLimit)
    .map(el => el.description.slice(-2))
    .join(' / ');
  console.log(bigExpenses);
};
logBigExpenses(budget, 100);
