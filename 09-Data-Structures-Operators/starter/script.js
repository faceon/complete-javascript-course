'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section

// const openingHours = {
//   thu: {
//     open: 12,
//     close: 22,
//   },
//   fri: {
//     open: 11,
//     close: 23,
//   },
//   sat: {
//     open: 0, // Open 24 hours
//     close: 12 + 12,
//   },
// };

// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],
//   openingHours,
//   order(menu) {
//     console.log(menu, 'order confirmed');
//   },
// };

// const res = restaurant; //for shorthand
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// // old school
// for (let day of days) {
//   if (day in res.openingHours) {
//     console.log(res.openingHours[day]);
//   }
// }

// // ES6
// for (let day of days) console.log(res.openingHours[day]?.open);

// // concise
// // ES6
// for (let day of days)
//   res.openingHours[day]
//     ? console.log('opens at', res.openingHours[day].open)
//     : console.log(day, 'is closed');

// Challenge #2

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// // 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// for (const [i, player] of game.scored.entries())
//   console.log(`Goal ${i + 1}: ${player}`);

// // 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// // 2.1
// const oddValues = Object.values(game.odds);
// let oddSum = 0;
// for (const odd of oddValues) oddSum += odd;
// console.log('Average odds:', oddSum / oddValues.length);

// // 2.2
// oddSum = oddValues.reduce((total, odd) => total + odd, 0);
// console.log('Average odds:', oddSum / oddValues.length);

// /*
// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉
// */
// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamName = game[team] ? `victory ${game[team]}` : 'draw';
//   console.log(`Odd of ${teamName}: ${odd}`);
// }

// /*
// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }
// */
// const scorers = {};
// for (const scorer of game.scored) {
//   scorers[scorer] ??= 0;
//   scorers[scorer] += 1;
// }
// console.log(scorers);

// // Coding Challenge #3
// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// /*
// Let's continue with our football betting app!
// This time, we have a map with a log of the events that happened during the game.
// The values are the events themselves, and the keys are the minutes in which each event happened
// (a football game has 90 minutes plus some extra time).
// */

// //1. Create an array 'events' of the different game events that happened (no duplicates)
// const events = new Set(gameEvents.values());
// console.log(events);

// // 2. After the game has finished, is was found that the yellow card from minute 64 was unfair.
// // So remove this event from the game events log.
// gameEvents.delete(64);

// // 3. Print the following string to the console: "An event happened, on average, every 9 minutes"
// // (keep in mind that a game has 90 minutes)
// const eventFrequency = 90 / gameEvents.size;
// console.log(`An event happened, on average, every ${eventFrequency} minutes`);

// // 4. Loop over the events and log them to the console,
// // marking whether it's in the first half or second half (after 45 min) of the game, like this:
// // [FIRST HALF] 17: ⚽️ GOAL
// for (const [time, event] of gameEvents) {
//   const half = time <= 45 ? 'FIRST' : 'SECOND';
//   console.log(`[${half} HALF] ${time}: ${event}`);
// }

// Playing with string

// const airline = 'TAP Air Portugal';
// const plane = 'A320';

// const checkMiddleSeat = function (seat) {
//   const col = seat.slice(-1).toUpperCase();
//   return col == 'B' || col == 'E';
// };

// const capitalizeName = function (name) {
//   const capitalized = name.split(' ').map(word => {
//     const [first, ...rest] = word.toLowerCase();
//     return first.toUpperCase() + rest.join('');
//   });
//   console.log(capitalized.join(' '));
// };

// capitalizeName('jessica ann smith davis');
// capitalizeName('jonas schmedtmann');
// capitalizeName('seongwOO kIM');

// const maskCard = function (number) {
//   // split
//   let numbers = number.split('-');
//   // remove except the first and padEnd *
//   numbers = numbers.map(number => number[0].padEnd(4, '*'));
//   console.log(numbers.join('-'));
// };
// maskCard('5288-1500-0143-1704');

// const randomCard = function () {
//   const numbers = [];
//   for (let i = 0; i < 4; i++) {
//     let digit = new String(Math.trunc(Math.random() * 1e4));
//     digit.padEnd(4, '0');
//     numbers.push(digit);
//   }
//   console.log(numbers.join('-'));
//   return numbers.join('-');
// };
// randomCard();

// Challenge #4
/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

// const camelCase = function (str) {
//   const words = str.toLowerCase().trim().split('_');
//   const capitalize = str => str[0].toUpperCase() + str.slice(1);
//   for (let i = 1; i < words.length; i++) words[i] = capitalize(words[i]);
//   return words.join('');
// };

// const testCases = `underscore_case
//  first_name
// Some_Variable
//  calculate_AGE
// delayed_departure`;

// for (const [i, word] of testCases.split('\n').entries()) {
//   console.log(camelCase(word).padEnd(20, ' ') + '✅'.repeat(i + 1));
// }

// String Methods Practice

const displayFlights = function (flights) {
  for (const flight of flights.split('+')) {
    const [status, from, to, time] = parseFlight(flight);
    let display = '';
    display += status.startsWith('Delayed') ? '🔴 ' : '';
    display += `${status} from ${from} to ${to} (${time})`;
    display = display.padStart(45);
    console.log(display);
  }
};
const parseFlight = function (flight) {
  const [status, from, to, time] = flight.split(';');
  const parsed = [];
  parsed.push(status.replaceAll('_', ' ').trim());
  parsed.push(from.slice(0, 3).toUpperCase());
  parsed.push(to.slice(0, 3).toUpperCase());
  parsed.push(time.replace(':', 'h'));
  return parsed;
};
displayFlights(flights);
