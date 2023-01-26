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

// const alertH1 = e => {
//   console.log('You are reading H1');
// };
// const h1 = document.querySelector('h1');
// h1.onmouseenter = () => console.log('Triggered by onmouseneter');
// h1.addEventListener('mouseenter', alertH1);

//// Event Bubbling
const randomInt = ({ min = 0, max = 255 }) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${Array(3).fill(0).map(randomInt).join(',')})`;
const changeColor = function (e) {
  this.style.backgroundColor = randomColor();
  console.log(this.classList[0].padStart(12, ' '), this === e.currentTarget);
  // e.stopPropagation();
};

// document.querySelector('.nav__link').addEventListener('click', changeColor);
// document.querySelector('.nav__links').addEventListener('click', changeColor);
// document.querySelector('.nav').addEventListener('click', changeColor);

//// Page navigation: old school, low performance
const scrollToHref = function (e) {
  e.preventDefault();
  const href = document.querySelector(this.getAttribute('href'));
  href?.scrollIntoView({ behavior: 'smooth' });
};

// document
//   .querySelectorAll('.nav__link')
//   .forEach(elem => elem.addEventListener('click', scrollToHref));

// Page navigation: using bubbling
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target.classList);
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

//// DOM traversing
// const h1 = document.querySelector('h1');

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'blue';

// console.log(h1.parentNode);
// console.log(h1.parentElement);
// console.log(h1.closest('.header'));
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

//// Operations buttons using DOM traversing
// first code
// document.querySelector('#section--2').addEventListener('click', function (e) {
//   if (e.target.classList.contains('operations__tab')) {
//     // set active this tab while deactivating other siblings
//     [...e.target.parentElement.children].forEach(elem =>
//       elem.classList.remove('operations__tab--active')
//     );
//     e.target.classList.add('operations__tab--active');
//     // query content div and set it active
//     [...document.querySelectorAll('.operations__content')].forEach(elem =>
//       elem.classList.remove('operations__content--active')
//     );
//     document
//       .querySelector(`.operations__content--${e.target.dataset.tab}`)
//       .classList.add('operations__content--active');
//   }
// });

// second code
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsBtn = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  tabsBtn.forEach(btn => btn.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  clicked.classList.add('operations__tab--active');
  [...tabsContent]
    .find(content =>
      content.classList.contains(`operations__content--${clicked.dataset.tab}`)
    )
    ?.classList.add('operations__content--active');
});

//// Menu fading animation
const nav = document.querySelector('.nav');

// first attempt
// const navLogo = document.querySelector('.nav__logo');
// const navLinks = document.querySelectorAll('.nav__link');

// nav.addEventListener('mouseover', function (e) {
//   const cursor = e.target;
//   if (!cursor.classList.contains('nav__link')) return;
//   navLinks.forEach(link => (link.style.opacity = 0.3));
//   navLogo.style.opacity = 0.3;
//   cursor.style.opacity = 1;
// });
// nav.addEventListener('mouseout', function (e) {
//   navLinks.forEach(link => (link.style.opacity = 1));
//   navLogo.style.opacity = 1;
// });

// second attempt traversing
// nav.addEventListener('mouseover', function (e) {
//   const cursor = e.target;
//   if (!cursor.classList.contains('nav__link')) return;
//   cursor
//     .closest('.nav')
//     .querySelectorAll('.nav__link, .nav__logo')
//     .forEach(elem => (elem.style.opacity = elem === cursor ? 1 : 0.3));
// });
// nav.addEventListener('mouseout', function (e) {
//   this.querySelectorAll('.nav__link, .nav__logo').forEach(
//     elem => (elem.style.opacity = 1)
//   );
// });

// third attempt using function
const setOpacity = function (e) {
  if (!e.target.classList.contains('nav__link')) return;
  e.target
    .closest('.nav')
    .querySelectorAll('.nav__link, .nav__logo')
    .forEach(elem => (elem.style.opacity = elem === e.target ? 1 : this));
};
nav.addEventListener('mouseover', setOpacity.bind(0.3));
nav.addEventListener('mouseout', setOpacity.bind(1));

//// Sticky nav
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
// low performance
// window.addEventListener('scroll', function (e) {
//   if (section1.getBoundingClientRect().top > 0) nav.classList.remove('sticky');
//   else nav.classList.add('sticky');
// });

// high performance using intersection observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     // console.log(entry);
//     if (!entry.isIntersecting) nav.classList.add('sticky');
//     else nav.classList.remove('sticky');
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(header);

// Intersection observer API with a named callback
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (entry.isIntersecting) nav.classList.remove('sticky');
  else nav.classList.add('sticky');
};
const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
observer.observe(header);
