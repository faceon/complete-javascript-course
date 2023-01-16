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

// Coding Challenge #3
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

/* 
Let's continue with our football betting app! 
This time, we have a map with a log of the events that happened during the game. 
The values are the events themselves, and the keys are the minutes in which each event happened 
(a football game has 90 minutes plus some extra time).
*/

//1. Create an array 'events' of the different game events that happened (no duplicates)
const events = new Set(gameEvents.values());
console.log(events);

// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair.
// So remove this event from the game events log.
gameEvents.delete(64);

// 3. Print the following string to the console: "An event happened, on average, every 9 minutes"
// (keep in mind that a game has 90 minutes)
const eventFrequency = 90 / gameEvents.size;
console.log(`An event happened, on average, every ${eventFrequency} minutes`);

// 4. Loop over the events and log them to the console,
// marking whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17: ⚽️ GOAL
for (const [time, event] of gameEvents) {
  const half = time <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${time}: ${event}`);
}
