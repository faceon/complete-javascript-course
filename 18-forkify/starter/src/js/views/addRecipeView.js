import View from './View';

class AddRecipeView extends View {
  parentElement = document.querySelector('.upload');
  window = document.querySelector('.add-recipe-window');
  overlay = document.querySelector('.overlay');
  btnOpen = document.querySelector('.nav__btn--add-recipe');
  btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.btnOpen.addEventListener('click', this.toggleHidden.bind(this));
    this.btnClose.addEventListener('click', this.toggleHidden.bind(this));
  }

  toggleHidden() {
    this.window.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
  }

  addRecipeFormHandler(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      const dataObj = Object.fromEntries(data);
      handler(dataObj);
    });
  }
}

export default new AddRecipeView();
