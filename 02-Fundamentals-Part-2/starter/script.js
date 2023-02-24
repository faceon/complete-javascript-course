// Challenge 1
const calcAverage = (a, b, c) => (a + b + c) / 3;

const checkWinner = function (avg1, avg2) {
  const team1 = 'Dolphins';
  const team2 = 'Koalas';
  const winner =
    avg1 >= avg2 * 2 ? team1 : avg2 >= avg1 * 2 ? team2 : 'No team';
  return `${winner} wins (${avg1} vs. ${avg2})`;
};

console.log(checkWinner(calcAverage(44, 23, 71), calcAverage(65, 54, 49)));
console.log(checkWinner(calcAverage(85, 54, 41), calcAverage(23, 34, 27)));

// Challenge 2
const calcTip = function (bill) {
  if (bill >= 50 && bill <= 300) {
    return 0.15 * bill;
  }
  return 0.2 * bill;
};

const bills = new Array(125, 555, 44);
const tips = bills.map(calcTip);
const total = bills.map((bill) => bill + calcTip(bill));
console.log(total);

// Challenge 3
const buildPerson = function (fullName, weight, height) {
  return {
    fullName,
    weight,
    height,
    calcBmi: function () {
      this.bmi = this.weight / this.height ** 2;
      return this.bmi;
    },
  };
};

const person1 = buildPerson('Mark Miller', 78, 1.69);
const person2 = buildPerson('John Smith', 92, 1.95);
const pickHigherBmi = function (person1, person2) {
  const bmi1 = person1.calcBmi();
  const bmi2 = person2.calcBmi();
  const higherPerson = bmi1 > bmi2 ? person1 : person2;
  const lowerPerson = bmi1 > bmi2 ? person2 : person1;
  console.log(
    `${higherPerson.fullName}'s BMI (${higherPerson.bmi}) is higher than ${lowerPerson.fullName}'s (${lowerPerson.bmi})`
  );
};
pickHigherBmi(person1, person2);

// Challenge 4

const billsArr = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tipsArr = [];
const totalsArr = [];

const calcAvg = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
};

billsArr.forEach((bill) => {
  const tip = calcTip(bill);
  tipsArr.push(tip);
  totalsArr.push(bill + tip);
});
console.log(totalsArr);
console.log(calcAvg(billsArr));
console.log(calcAvg(tipsArr));
console.log(calcAvg(totalsArr));
