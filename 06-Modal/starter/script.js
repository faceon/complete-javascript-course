'use strict';

/*
add eventListner to close btn
if clicked, 
  it adds hidden class to modal
  it adds bluring effect to background

add eventListner to show modal btns
if clicked, it removes hidden class from modal
*/

const overlayDiv = document.querySelector('div.overlay');
overlayDiv.addEventListener('click', hideModal);

const modalDiv = document.querySelector('div.modal');
function hideModal() {
  modalDiv.classList.add('hidden');
  overlayDiv.classList.add('hidden');
}
const showModal = () => {
  modalDiv.classList.remove('hidden');
  overlayDiv.classList.remove('hidden');
};

const showBtns = document.getElementsByClassName('show-modal');
for (let btn of showBtns) {
  btn.addEventListener('click', showModal);
}

document
  .querySelector('button.close-modal')
  .addEventListener('click', hideModal);

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') hideModal();
});
