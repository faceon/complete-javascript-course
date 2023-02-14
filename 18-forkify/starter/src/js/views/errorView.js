import icons from 'url:../../img/icons.svg'; // Parcel 2

export default errorView = function (err, targetEl) {
  const errorDiv = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${err}</p>
      </div>
    `;
  targetEl.innerHTML = '';
  targetEl.insertAdjacentHTML('beforeend', errorDiv);
};
