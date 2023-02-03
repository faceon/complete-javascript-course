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

class App {
  #map;
  #mapEvent = { latlng: { lat: 37.5305, lng: 126.968 } };
  workouts = [];

  constructor() {
    this._loadMap();
    this._markMap('<div>I am here</div>');
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _loadMap() {
    // Set up map
    this.#map = L.map('map').setView(this._getPosition(), 20);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Map click event handler
    this.#map.on('click', this._showForm.bind(this));
    return this;
  }

  _markMap(markerContents) {
    L.marker(this.#mapEvent.latlng)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          content: markerContents ?? '<div>TBD</div>',
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .openPopup();
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _newWorkout(e) {
    e.preventDefault();
    if (
      [inputDistance, inputDuration, inputCadence].some(
        input => !Number(input.value) || Number(input.value) <= 0
      )
    ) {
      console.log('Input positive numbers');
      return;
    }
    this._markMap(
      `<div>
      ${inputType.value}, ${inputDistance.value},
      ${inputDuration.value}, ${inputCadence.value}
      </div>`
    );
    inputDistance.value = inputDuration.value = inputCadence.value = '';
  }

  _getPosition() {
    return this.#mapEvent.latlng;
    navigator.geolocation?.getCurrentPosition(
      position => {
        const { latitude: lat, longitude: lng } = position.coords;
        return { lat, lng };
      },
      err => {
        console.log(err);
      }
    );
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }
}

const app = new App();
