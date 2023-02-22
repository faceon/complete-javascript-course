import View from './View';

class AddRecipeView extends View {
  parentElement = document.querySelector('.add-recipe-window');
  uploadForm = this.parentElement.querySelector('upload');

  addRecipeAddHandler(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const addBtn = e.target.closest('.nav__btn--add-recipe');
      console.log(addBtn);
      if (!addBtn) return;
      console.log(this.parentElement.classList);
    });
  }
}

export default new AddRecipeView();
