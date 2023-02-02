'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;
map = L.map('map');
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
const coords = { lat: 37.5305, lng: 126.968 };

// navigator.geolocation?.getCurrentPosition(
//   function (pos) {
//     console.log(pos);
//     const { latitude: lat, longitude: lng } = pos.coords;
//     // console.log(`https://www.google.com/maps/@${lat},${lng}`);
//     viewMap(lat, lng);
//     markMap(lat, lng);
//   },
//   function (err) {
//     console.log(err);
//     return err;
//   }
// );

const viewMap = function (coords) {
  map.setView(coords, 20);
};

const markMap = function (coords, markerContents) {
  L.marker(coords)
    .addTo(map)
    .bindPopup(
      L.popup({
        content: markerContents ?? '<div>TBD</div>',
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .openPopup();
};

map.on('click', mapE => {
  // console.log(mapEvent);
  mapEvent = mapE;
  // unhide form
  form.classList.remove('hidden');
  inputDistance.focus();
  // console.log(inputDistance.value, inputDuration.value, inputCadence.value);

  // markMap(coords);
  // hide form
  // if not, wait
});

form.addEventListener('submit', e => {
  e.preventDefault();
  markMap(
    mapEvent.latlng,
    `<div>
    ${inputType.value}, ${inputDistance.value}, 
    ${inputDuration.value}, ${inputCadence.value}
    </div>`
  );
  // Does the submitted form has all contents needed?
  // if (
  //   [inputDistance, inputDuration, inputCadence].some(
  //     input => !Number(input.value) || Number(input.value) <= 0
  //   )
  // ) {
  //   console.log('Input positive numbers');
  //   return;
  // }
});

inputType.addEventListener('change', function (e) {
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
});

viewMap(coords);
markMap(coords, '<h4>Hello world!<br /> This is a nice popup.</h4>');
