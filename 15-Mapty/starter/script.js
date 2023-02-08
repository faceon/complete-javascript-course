'use strict';

// prettier-ignore
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = Date.now().toString().slice(-10);
  clicked = 0;
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance; // km
    this.duration = duration; // min
  }
}

class Running extends Workout {
  type = 'running';
  html = {
    distance: { icon: '🏃‍♂️', unit: 'km' },
    duration: { icon: '⏱', unit: 'm' },
    pace: { icon: '⚡️', unit: 'min/km' },
    cadence: { icon: '🦶🏼', unit: 'spm' },
  };
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
  }
  get pace() {
    return (this.duration / this.distance).toFixed(2);
  }
}

class Cycling extends Workout {
  type = 'cycling';
  html = {
    distance: { icon: '🚴', unit: 'km' },
    duration: { icon: '⏱', unit: 'm' },
    speed: { icon: '⚡️', unit: 'km/h' },
    elevationGain: { icon: '⛰', unit: 'm' },
  };
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
  }
  get speed() {
    return this.distance / (this.duration / 60);
  }
}

class App {
  #map;
  #mapEvent;
  #mapZoom = 17;
  workouts = [];

  constructor() {
    // set up map and current position
    this._getPosition();

    // sync local storage
    this._getLocalStorage();

    // add event listeners
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToWorkout.bind(this));
  }

  _getPosition() {
    // this._loadMap({ coords: { latitude: 37.5167784, longitude: 126.979882 } }); // Caelitus
    this._loadMap({ coords: { latitude: 37.5305, longitude: 126.968 } }); // Hyel
    // navigator.geolocation?.getCurrentPosition(
    //   this._loadMap.bind(this),
    //   console.error
    // );
  }

  _loadMap(position) {
    const { latitude: lat, longitude: lng } = position.coords;
    const latlng = { lat, lng };

    // Set up map
    this.#map = L.map('map').setView(latlng, this.#mapZoom);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Mark current position on map
    this._renderMarker([lat, lng]);

    // Map click event handler
    this.#map.on('click', this._showForm.bind(this));
    return this;
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    this._panTo(this._getCoords(mapE.latlng));
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    // build an array of inputs
    let workoutClass;
    const inputsArr = [inputDistance, inputDuration];
    if (inputType.value === 'running') {
      workoutClass = Running;
      inputsArr.push(inputCadence);
    } else {
      workoutClass = Cycling;
      inputsArr.push(inputElevation);
    }

    // check data validity
    const isPositiveNum = input =>
      isFinite(input.value) && Number(input.value) > 0;
    if (!inputsArr.every(isPositiveNum))
      return console.log('Input positive numbers');

    // create and push the workout
    const coords = this._getCoords(this.#mapEvent.latlng);
    const workout = new workoutClass(coords, ...inputsArr.map(i => i.value));
    this.workouts.push(workout);

    // render the workout
    this._renderWorkout(workout);

    // clear and hide the form
    inputsArr.forEach(input => (input.value = ''));
    this._hideForm();

    // local storage
    this._setLocalStorage();
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }

  _getLocalStorage() {
    this.workouts = localStorage.workouts
      ? JSON.parse(localStorage.workouts)
      : [];
    this.workouts.forEach(this._renderWorkout.bind(this));
  }

  _moveToWorkout(e) {
    const targetWorkout = e.target.closest('.workout');
    if (!targetWorkout) return;
    const workout = this.workouts.find(
      workout => workout.id === targetWorkout.dataset.id
    );
    this._panTo(workout.coords);
  }

  _renderWorkout(workout) {
    // li element to fill UL containerWorkouts
    let workoutContainer, workoutTitle, workoutDetails;
    workoutTitle = `${
      workout.type.at(0).toUpperCase() + workout.type.slice(1)
    } on ${workout.date}`;

    // workout details
    workoutDetails = '';
    Object.entries(workout.html).forEach(html => {
      const [property, { icon, unit }] = [...html];
      workoutDetails += `
      <div class="workout__details">
      <span class="workout__icon">${icon}</span> 
      <span class="workout__value">${workout[property]}</span>
      <span class="workout__unit">${unit}</span>
      </div>
      `;
    });

    // complete workoutContainer
    workoutContainer = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workoutTitle}</h2>
      ${workoutDetails}
    </li>`;

    // insert li
    containerWorkouts.insertAdjacentHTML('beforeend', workoutContainer);

    // render the marker
    const marker = this._renderMarker(workout.coords);

    // render the popup
    const popup = this._renderPopup(workoutTitle);

    // bind the marker and the popup
    marker.bindPopup(popup).openPopup();
  }

  _renderMarker(coords) {
    const [lat, lng] = coords;
    const latlng = { lat, lng };
    return L.marker(latlng).addTo(this.#map);
  }

  _renderPopup(content) {
    return L.popup({
      content: content ?? '<div>TBD</div>',
      autoClose: false,
      closeOnClick: false,
      className: 'running-popup',
    });
  }

  _getCoords(latlng) {
    return Object.values(latlng);
  }

  _getLatlng(coords) {
    const [lat, lng] = coords;
    return { lat, lng };
  }

  _panTo(coords) {
    this.#map.panTo(this._getLatlng(coords));
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
