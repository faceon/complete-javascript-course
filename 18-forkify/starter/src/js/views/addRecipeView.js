import View from './View';

class AddRecipeView extends View {
  parentElement = document.querySelector('.add-recipe-window');
  form = document.querySelector('.upload');
  overlay = document.querySelector('.overlay');
  btnOpen = document.querySelector('.nav__btn--add-recipe');
  btnClose = document.querySelector('.btn--close-modal');
  btnUpload = document.querySelector('.upload__btn');

  constructor() {
    super();
    this.btnOpen.addEventListener('click', this.toggleHidden.bind(this));
    this.btnClose.addEventListener('click', this.toggleHidden.bind(this));
    // this.btnUpload.addEventListener('click', this.toggleHidden.bind(this));
  }

  toggleHidden() {
    this.parentElement.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
  }

  renderError(err) {
    super.renderError(err);
    this.parentElement.insertAdjacentElement('afterbegin', this.btnClose);
  }

  render(data) {
    super.render(data);
    this.parentElement.insertAdjacentElement('afterbegin', this.btnClose);
  }

  getMarkup(data) {
    return data;
  }

  addRecipeFormHandler(handler) {
    this.form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      const dataObj = Object.fromEntries(data);
      handler(dataObj);
    });
  }
}

export default new AddRecipeView();
