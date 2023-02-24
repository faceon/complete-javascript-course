import View from './View';

class SearchView extends View {
  parentElement = document.querySelector('.search__field');
  searchForm = document.querySelector('.search');

  constructor(defaultSearch) {
    super();
    this.parentElement.value = defaultSearch;
  }

  addSearchHandler(handler) {
    this.searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    return this.parentElement.value;
  }

  clear() {
    this.parentElement.value = '';
  }
}

export default new SearchView('beef');
