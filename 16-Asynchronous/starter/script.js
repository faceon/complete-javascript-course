'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const geoUrl = (lat, lng) =>
  `https://geocode.xyz/${lat},${lng}?geoit=json&auth=630272418266632468282x47134`;
const countryNameUrl = country =>
  `https://restcountries.com/v2/name/${country}`;
const countryCodeUrl = country =>
  `https://restcountries.com/v2/alpha/${country}`;

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
  return fetch(countryCodeUrl(countryCode)).then(res => {
    if (!res.ok && res.status == 404) throw new Error(res.statusText);
    return res.json();
  });
};

const getJson = function (country, countryGeo) {
  return fetch(countryNameUrl(country)).then(res => {
    // if query by country name does not exist, query by country code
    if (!res.ok && res.status == 404 && countryGeo) {
      return getJsonByCode(countryGeo.prov ?? countryGeo.state);
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

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// const whereAmI = function (lat, lng) {
//   let resolvedPosition;
//   if (isFinite(lat) && isFinite(lng)) {
//     resolvedPosition = Promise.resolve({
//       coords: { latitude: lat, longitude: lng },
//     });
//   } else {
//     resolvedPosition = getPosition();
//   }

//   resolvedPosition
//     .then(position => {
//       const { latitude: lat, longitude: lng } = position.coords;
//       return fetch(
//         geoUrl(lat, lng)
//       );
//     })
//     .then(res => {
//       // console.log(res);
//       if (!res.ok) throw new Error(res);
//       return res.json();
//     })
//     .then(data => {
//       // console.log(data);
//       if (!data.city || !data.country) throw new Error('Country not found');
//       console.log(`You are in ${data.city}, ${data.country}`);
//       getCountryData(data.country, data);
//     })
//     .catch(renderError);
// };

//////////////////////////////////////////////////////////////
// Challenge #2
const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    // create img element
    const img = document.createElement('img');
    // If image loading is done, resolve with img element
    img.src = imgPath;
    img.classList.add('images');
    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });
    // else reject
    img.addEventListener('error', () =>
      reject(new Error('Image src is not valid.'))
    );
  });
};

// createImage('img/img-1.jpg')
//   .then(img =>
//     wait(2).then(msg => {
//       console.log(msg);
//       img.style.display = 'none';
//       return wait(1).then(console.log);
//     })
//   )
//   .then(() => {
//     return createImage('img/img-2.jpg');
//   })
//   .then(img =>
//     wait(2).then(msg => {
//       console.log(msg);
//       img.style.display = 'none';
//     })
//   )
//   .catch(console.error);

////////////////////////////////////////
// recreate whereAmI using async and await

const whereAmI = async function (lat, lng) {
  try {
    // if lat, lng are undefined, get the current position
    if (lat === undefined || lng === undefined) {
      const position = await getPosition();
      const { latitude, longitude } = position.coords;
      lat = latitude;
      lng = longitude;
    }

    // lat, lng => countryName
    const resGeo = await fetch(geoUrl(lat, lng));
    const dataGeo = await resGeo.json();

    // countryName => dataCountry
    let resCountry;
    try {
      [resCountry] = await fetch(countryNameUrl(dataGeo.country));
      if (resCountry.status === 404) throw new Error('Country name not found');
    } catch (err) {
      // if countryName query fails, try countryCode instead
      resCountry = await fetch(countryCodeUrl(dataGeo.prov ?? dataGeo.state));
    }
    const dataCountry = await resCountry.json();
    renderCountry(dataCountry);

    return `2. You are in ${dataCountry.capital}`;
    // dataCountry => render country and neighbour
  } catch (err) {
    console.error(err);
  }
};

// whereAmI(37.5167784, 126.979882); // Caelitus
// whereAmI(36.497194, 36.350183); // Turkey, earthquaked
// whereAmI(55.6573, 12.537);
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873); //India
// whereAmI(-33.933, 18.474); // South Africa
// whereAmI(37.5167784, 126.979882); // Caelitus

// whereAmI(-1000, -1000);
// whereAmI(36.497194, 36.350183); // Turkey, earthquaked
// whereAmI();

// console.log('1. I will get location');
// whereAmI(34.306915, -118.421672)
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => console.log('3. Finished getting it'));

////////////////////////////////////////////////////////////

const get3countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJson(c1);
    // const [data2] = await getJson(c2);
    // const [data3] = await getJson(c3);

    const [[data1], [data2], [data3]] = await Promise.all([
      getJson(c1),
      getJson(c2),
      getJson(c3),
    ]);

    console.log(data1.capital, data2.capital, data3.capital);
  } catch (err) {
    console.error(err);
  }
};

// get3countries('france', 'morocco', 'tanzania');

(async function () {
  const [res] = await Promise.race([
    getJson('china'),
    getJson('france'),
    getJson('italy'),
  ]);
  console.log(res);
});

// cancel when fetching takes too long
const timeout = function (timeLimit) {
  // resolves after timeLimit
  return new Promise(function (resolve, _) {
    setTimeout(
      () => resolve(`${timeLimit} seconds has passed`),
      timeLimit * 1000
    );
  });
};

const bombset = async function (timeLimit) {
  return (await timeout(timeLimit + 1)) + ' and bombed';
};

// Promise.resolve(Promise.race([timeout(3), bombset(1)])).then(console.log);

///////////////////////////////////////
// Coding Challenge #3

// createImage('img/img-1.jpg')
//   .then(img =>
//     wait(2).then(msg => {
//       console.log(msg);
//       img.style.display = 'none';
//       return wait(1).then(console.log);
//     })
//   )
//   .then(() => {
//     return createImage('img/img-2.jpg');
//   })
//   .then(img =>
//     wait(2).then(msg => {
//       console.log(msg);
//       img.style.display = 'none';
//     })
//   )
//   .catch(console.error);

const loadNPause = async function (imgPath1, imgPath2) {
  try {
    const img1 = await createImage(imgPath1);
    await wait(2);
    img1.style.display = 'none';
    await wait(1);
    const img2 = await createImage(imgPath2);
    await wait(2);
    img2.style.display = 'none';
  } catch (err) {
    renderError(err.message);
  }
};

// loadNPause('img/img-1.jpg', 'img/img-2.jpg');

const imgArr = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];

const loadAll = async function (imgArr) {
  try {
    let imgs = imgArr.map(async img => await createImage(img));
    imgs = await Promise.all(imgs);
    imgs.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
    renderError(err);
  }
};

loadAll(imgArr);
