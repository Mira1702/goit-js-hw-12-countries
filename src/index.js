import './styles.css'
import refs from './js/refs';
import fetchCountries from './js/fetchCountries';
import manyCountries from './tamplate/manyCountries.hbs';
import oneCountry from './tamplate/oneCountry.hbs';
import debounce from 'lodash.debounce';
import 'handlebars';
import '@pnotify/core';

const { error } = require('@pnotify/core');

refs.inputSearch.addEventListener('input', debounce(searchCountry, 500));

function searchCountry(e) {
  e.preventDefault();
  clearArticlesContainer();
   const searchQuery = e.target.value;
  
  
    fetchCountries(searchQuery).then(data => {
    
      if (data.length > 10) {
          tooMactchNotification();          
      } else if (data.length < 1) {        
          noMatchNotification();      
      } else if (data.length === 1) {
          buildListMarkup(data, oneCountry);
      } else if (data.length <= 10) {
          buildListMarkup(data, manyCountries);
      }
  })
  .catch(error => {
      console.log(error); 
      noMatchNotification();
    });     
  
}

function buildListMarkup(countries, template) {
  const markup = countries.map(count => template(count)).join();
  refs.articlesContainer.insertAdjacentHTML('afterbegin', markup)
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}

function noMatchNotification() {
    defaultModules.set(PNotifyMobile, {});
  error({    
    text: 'No country has been found. Please enter a more specific query!',
    delay: 2000,
  });
}

function tooMactchNotification() {
    defaultModules.set(PNotifyMobile, {});
  info({
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 2000,
  });
}


// fetch('https://restcountries.eu/rest/v2')
//     .then(response => response.json())
//     .then(data => console.log(data));


