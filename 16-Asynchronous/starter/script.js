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

const getJson = function (url) {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  });
};

const getCountryData = function (country) {
  const urlName = country => `https://restcountries.com/v2/name/${country}`;
  const urlCode = country => `https://restcountries.com/v2/alpha/${country}`;

  getJson(urlName(country))
    .then(data => {
      renderCountry(data[0]);
      console.log(data[0]);
      const neighbour = data[0].borders?.at(0);
      if (!neighbour) throw new Error('This country is isolated');
      return getJson(urlCode(neighbour));
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(renderError)
    .finally(() => console.log('API calls complete'));
};

// getCountryData('korea');

///////////////////////////////////////
// Coding Challenge #1

const whereAmI = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=630272418266632468282x47134`
  )
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      console.log(data);
      getCountryData(data.country);
    })
    .catch(renderError);
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
