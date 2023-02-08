'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//// old school request

const renderCountry = function (data, className = '') {
  const article = `
    <article class="country ${className}" >
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          data.population * 1e-6
        ).toFixed(1)}M</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', article);
  countriesContainer.style.opacity = 1;
};

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//
//   request.open('GET', url);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);
//   });
// };

//// request by fetch

// const request = fetch(url('spain'));
// console.log(request);
// setTimeout(() => console.log(request), 1000);

//// Rejection handling
const renderError = function (err) {
  console.log(err);
  countriesContainer.insertAdjacentText('beforeend', err);
  countriesContainer.style.opacity = 1;
};

const getJsonByCode = function (countryCode) {
  const url = `https://restcountries.com/v2/alpha/` + countryCode;
  return fetch(url).then(res => {
    if (!res.ok && res.status == 404) throw new Error(res.statusText);
    return res.json();
  });
};

const getJson = function (country, countryGeo) {
  const url = `https://restcountries.com/v2/name/` + country;

  return fetch(url).then(res => {
    // if query by country name does not exist, query by country code
    if (!res.ok && res.status == 404 && countryGeo) {
      return getJsonByCode(
        Object.keys(countryGeo.state).length !== 0
          ? countryGeo.state
          : countryGeo.prov
      );
    }
    // console.log(res);
    return res.json();
  });
};

const getCountryData = function (country, countryGeo) {
  getJson(country, countryGeo)
    .then(countryArr => {
      // Find the closest country among countryArr using countryGeo
      const closestCountry = getClosestCountry(countryArr, countryGeo);
      renderCountry(closestCountry);

      // return the first neighbor, if any
      const neighbourCode = closestCountry.borders?.at(0);
      if (!neighbourCode) throw new Error('This country is isolated');
      return getJsonByCode(neighbourCode);
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(renderError)
    .finally(() => console.log('API calls complete'));
};

///////////////////////////////////////
// Coding Challenge #1

const getClosestCountry = function (countryArr, countryGeo) {
  // find a country closest to countryGeo among countryArr using latlng
  // if only 1 country in array, return it
  if (!countryArr.length) return countryArr;
  if (countryArr.length === 1 || !countryGeo) return countryArr[0];
  const { latt: lat, longt: lng } = countryGeo;

  // sort countryArr by distance calculated using latlng
  const countryCopy = countryArr.slice(0);
  countryCopy.sort((a, b) => {
    const aDistance = Math.hypot(lat - a.latlng[0], lng - a.latlng[1]);
    const bDistance = Math.hypot(lat - b.latlng[0], lng - b.latlng[1]);
    return aDistance - bDistance;
  });

  return countryCopy[0];
};

///////////////////////////////////////////////////////
//// Event loop in practice
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 1; i < 1e9; i++) {
//     if (i % 1e8 === 0) console.log(i);
//   }
//   console.log(res);
// });
// console.log('Test end');

// const countdown = function (seconds) {
//   return new Promise(function (resolve, reject) {
//     let interval;
//     const failOrNot = () => {
//       console.log(seconds);
//       if (Math.random() < 0.05) {
//         clearInterval(interval);
//         reject(`Launch failed at ${seconds}`);
//       }
//       if (seconds === 0) {
//         clearInterval(interval);
//         resolve('Take off! Launch success!!');
//       }
//       seconds--;
//     };
//     interval = setInterval(failOrNot, 1000);
//   });
// };
// const launch = countdown(10).then(console.log).catch(console.error);
// console.log(launch);

const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`I've waited ${seconds} seconds`), seconds * 1000);
  });
};

const anotherWait = function (res) {
  console.log(res);
  return wait(Math.floor(Math.random() * 5));
};

// wait(1)
//   .then(anotherWait)

////////////////////////////////////
// Where Am I using geolocation

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

const whereAmI = function (lat, lng) {
  const getPosition = new Promise(function (resolve, reject) {
    if (isFinite(lat) && isFinite(lng)) {
      resolve({ coords: { latitude: lat, longitude: lng } });
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
  getPosition
    .then(position => {
      const { latitude: lat, longitude: lng } = position.coords;
      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=630272418266632468282x47134`
      );
    })
    .then(res => {
      // console.log(res);
      if (!res.ok) throw new Error(res);
      return res.json();
    })
    .then(data => {
      // console.log(data);
      if (!data.city || !data.country) throw new Error('Country not found');
      console.log(`You are in ${data.city}, ${data.country}`);
      getCountryData(data.country, data);
    })
    .catch(renderError);
};

// whereAmI(55.6573, 12.537);
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873); //India
// whereAmI(-33.933, 18.474);
// whereAmI(37.5167784, 126.979882); // Caelitus
// whereAmI(34.306915, -118.421672);
// whereAmI(-1000, -1000);
// whereAmI(36.497194, 36.350183); // Turkey, earthquaked
// whereAmI();

//////////////////////////////////////////////////////////////
// Challenge #2
const imageContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    // create img element
    const img = document.createElement('img');
    // If image loading is done, resolve with img element
    img.src = imgPath;
    img.classList.add('images');
    img.addEventListener('load', () => resolve(img));
    // else reject
    img.addEventListener('error', () =>
      reject(new Error('Error when loading image'))
    );
  });
};

createImage('img/img-3.jpg')
  .then(img => {
    imageContainer.insertAdjacentElement('afterbegin', img);
    return img;
  })
  .then(img =>
    wait(2).then(msg => {
      console.log(msg);
      img.style.display = 'none';
      return img;
    })
  )
  .catch(console.error);
