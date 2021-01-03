import './styles.css'
import './js/refs.js';
import fetchCountries from './js/fetchCountries.js';
import './tamplate/manyCountries.hbs';
import './tamplate/oneCountry.hbs';
import debounce from 'lodash.debounce';
import 'handlebars';
import '@pnotify/core';

const refs = {
    inputSearch: document.querySelector('.js-input'),
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.js-articles'),
};
console.log(inputSearch)

refs.inputSearch.addEventListener('input', debounce(searchCountry, 500));

function searchCountry(e) {
  e.preventDefault();
  clearArticlesContainer();
   const searchQuery = e.target.value;
  
  
  fetchCountries.fetchArticles(searchQuery).then(data => {
    
      if (data.length > 10) {
          error({
              text: "Too many matches found. Please enter a more specific query!"
          });
      } else if (data.status === 404) {
        error({
          text: "No country has been found. Please enter a more specific query!"
      });
      } else if (data.length === 1) {
          buildListMarkup(data, oneCountry);
      } else if (data.length <= 10) {
          buildListMarkup(data, manyCountries);
      }
  })
  .catch(Error => {
      Error({
          text: "You must enter query parameters!"
      });
      console.log(Error)
  })
}

function buildListMarkup(countries, template) {
  const markup = countries.map(count => template(count)).join();
  refs.articlesContainer.insertAdjacentHTML('afterbegin', markup)
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}