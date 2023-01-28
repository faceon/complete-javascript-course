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
const section3 = document.querySelector('#section--3');

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
  // console.log(entry);
  if (entry.isIntersecting) nav.classList.remove('sticky');
  else nav.classList.add('sticky');
};
const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
observer.observe(header);

//// Revealing elements
// const allSections = document.querySelectorAll('.section');
const allSections = [section1, section2];
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//// Lazy image loading
const lazyImages = document.querySelectorAll('img[data-src]');
const loadImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // console.log(entry);
  entry.target.src = entry.target.dataset.src;
  observer.unobserve(entry.target);
  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });
};
const lazyObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
lazyImages.forEach(img => lazyObserver.observe(img));

//// Slider

// first attempt
// const moveX = {
//   1: [0, 100, 200],
//   2: [-100, 0, 100],
//   3: [-200, -100, 0],
// };

// const moveSlides = function () {
//   curSlide += this ?? 0;
//   curSlide = curSlide == 0 ? 3 : curSlide == 4 ? 1 : curSlide;
//   slides.forEach((slide, i) => {
//     slide.style.transform = `translateX(${moveX[curSlide][i]}%)`;
//   });
// };

// document
//   .querySelector('.slider__btn--left')
//   .addEventListener('click', moveSlides.bind(-1));

// document
//   .querySelector('.slider__btn--right')
//   .addEventListener('click', moveSlides.bind(1));

// moveSlides();
// moveSlides();
// document.querySelector('.slider__btn--right').addEventListener('click', () => {
//   if (curSlide == slides.length) return;
//   moveSlides(++curSlide);
// });
// moveSlides(curSlide);

// second attempt
let curSlide = 1;
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');

// dots
slides.forEach((_, i) => {
  dotContainer.insertAdjacentHTML(
    'beforeend',
    `<button class="dots__dot" data-slide="${i + 1}"></button>`
  );
});
const dots = dotContainer.querySelectorAll('.dots__dot');

dotContainer.addEventListener('click', e => {
  if (!e.target.classList.contains('dots__dot')) return;
  goToSlide(e.target.dataset.slide);
});

const goToSlide = function (slideNum) {
  slideNum ??= 1;
  curSlide =
    slideNum < 1 ? slides.length : slideNum > slides.length ? 1 : slideNum;

  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (1 - curSlide + i)}%)`;
    if (curSlide == i + 1) dots[i].classList.add('dots__dot--active');
    else dots[i].classList.remove('dots__dot--active');
  });
};
goToSlide(1);

// button left and right
const prevSlide = () => goToSlide(--curSlide);
const nextSlide = () => goToSlide(++curSlide);
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
btnLeft.addEventListener('click', prevSlide);
btnRight.addEventListener('click', nextSlide);

// keyboard shortcut
document.addEventListener('keydown', e => {
  if (e.key == 'ArrowLeft') prevSlide();
  if (e.key == 'ArrowRight') nextSlide();
});

//// Lifecycle DOM Events
// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML parsed and DOM tree built', e);
// });
// window.addEventListener('load', function (e) {
//   console.log('Page fully loaded', e);
// });
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
