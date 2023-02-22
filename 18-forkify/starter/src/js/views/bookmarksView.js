import View from './View';

class BookmarksView extends View {
  parentElement = document.querySelector('.bookmarks');

  getMarkup(previews) {
    let markup = '';
    previews.forEach(
      preview =>
        (markup += `
      <li class="preview">
        <a class="preview__link" href="#${preview.id}">
          <figure class="preview__fig">
            <img src="${preview.imgSrc}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__name">
              ${preview.title}
            </h4>
            <p class="preview__publisher">${preview.publisher}</p>
          </div>
        </a>
      </li>`)
    );
    return markup;
  }
}

export default new BookmarksView();
