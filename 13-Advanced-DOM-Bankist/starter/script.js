'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies <button class="btn btn--close-cookie">Got it!</button>';

const header = document.querySelector('.header');
header.append(message);
// header.prepend(message.cloneNode(true));
// header.after(message);

const btnCloseCookie = document.querySelector('.btn--close-cookie');
btnCloseCookie.addEventListener('click', () => message.remove());

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '110%';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

// Attributes
const logo = document.querySelector('.nav__logo');

//// Smooth scroll
const btnScrollTo = document.querySelector('.btn--text.btn--scroll-to');
const s1 = document.getElementById('section--1');

// window.addEventListener('click', e => {
//   const s1bounding = s1.getBoundingClientRect();
//   console.log('section1', s1bounding.x, s1bounding.y);
//   console.log('cursor', e.clientX, e.clientY);
//   console.log('window', window.scrollX, window.scrollY);
//   console.log(
//     'document',
//     document.documentElement.clientWidth,
//     document.documentElement.clientHeight
//   );
// });

btnScrollTo.addEventListener('click', e => {
  const s1bounding = s1.getBoundingClientRect();
  window.scrollTo({
    left: s1bounding.left + window.scrollX,
    top: s1bounding.top + window.scrollY,
    behavior: 'smooth',
  });
  // s1.scrollIntoView({ behavior: 'smooth' });
});

const alertH1 = e => {
  console.log('You are reading H1');
};
const h1 = document.querySelector('h1');
// h1.onmouseenter = () => console.log('Triggered by onmouseneter');
h1.addEventListener('mouseenter', alertH1);

//// Event Bubbling
const randomInt = ({ min = 0, max = 255 }) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${Array(3).fill(0).map(randomInt).join(',')})`;
