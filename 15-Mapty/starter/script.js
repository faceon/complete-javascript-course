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

const map = L.map('map');

const viewMap = function (lat, lng) {
  map.setView([lat, lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
};

const markMap = function (lat, lng) {
  L.marker([lat, lng]).addTo(map).bindPopup('Marked!').openPopup();
};

navigator.geolocation?.getCurrentPosition(
  function (pos) {
    console.log(pos);
    const { latitude: lat, longitude: lng } = pos.coords;
    // console.log(`https://www.google.com/maps/@${lat},${lng}`);
    viewMap(lat, lng);
    markMap(lat, lng);
  },
  function (err) {
    console.log(err);
    return err;
  }
);

map.on('click', mapEvent => {
  // console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  markMap(lat, lng);
});
