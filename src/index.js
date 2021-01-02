import debounce from 'lodash.debounce';
// import '@pnotify/core/dist/PNotify.css';
// // // import '@pnotify/core/dist/BrightTheme.css';
// // // import '@pnotify/core';
// // import fetchCountries from './js/fetchCountries';
// // import './tamplate/manyCountries.hbs';
// // import './tamplate/oneCountry.hbs'
// import * as refs from './js/refs';
// // import './styles.css';

// refs = require('./js/refs');

// const refs = {
//     inputSearch: document.querySelector('.js-input'),
//     searchForm: document.querySelector('.js-search-form'),
//     articlesContainer: document.querySelector('.js-articles'),
// };

// refs.inputSearch.addEventListener('input', 500);
// refs.inputSearch.addEventListener('input', debounce(countrySearch, 500));

function countrySearch() {
  let currentCountry = refs.inputSearch.value;
  if (currentCountry !== '') {
    fetchCountries(currentCountry)
      .then(data => {
        if (!data) {
          return;
        }
        renderPage(data);
      })
      .catch(error => {
        console.log(error);
        showNotificationFail();
        refs.inputSearch.value = '';
        clearPage();
      });
  }
  clearPage();
}