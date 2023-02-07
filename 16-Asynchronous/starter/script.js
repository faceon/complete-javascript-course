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
      return getJsonByCode(countryGeo.state);
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

const whereAmI = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=630272418266632468282x47134`
  )
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

const willYouCome = new Promise(function (resolve, reject) {
  if (Math.random() >= 0.5) {
    resolve('I will be there');
  } else {
    reject('I dont want to go');
  }
});

// willYouCome.then(res => console.log(res)).catch(err => console.error(err));
willYouCome.then(res => console.log(res)).catch(err => console.error(err));
