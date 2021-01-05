import './styles.css'
import refs from './js/refs';
import fetchCountries from './js/fetchCountries';
import manyCountries from './tamplate/manyCountries.hbs';
import oneCountry from './tamplate/oneCountry.hbs';
import debounce from 'lodash.debounce';
import 'handlebars';
import '@pnotify/core';
import { error, info, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

// const { error } = require('@pnotify/core');

function noMatchNotification() {
    defaultModules.set(PNotifyMobile, {});
  error({    
    text: 'No country has been found. Please enter a correct information!',
    delay: 2000,
  });
}

function tooMatchNotification() {
    defaultModules.set(PNotifyMobile, {});
  info({
    text: 'Too many matches found. Please enter a correct information!',
    delay: 2000,
  });
}

refs.inputSearch.addEventListener('input', debounce(searchCountry, 500));
refs.searchForm.addEventListener('keypress', inputEnter);

function inputEnter(event) {
  if(event.keyCode == 13){
        event.preventDefault()
    }
}

function searchCountry(e) {
  e.preventDefault();
  clearArticlesContainer();
   const searchQuery = e.target.value;
  
  
    fetchCountries(searchQuery).then(data => {
    
      if (data.length > 10) {
          tooMatchNotification();          
      } else if (data.status === 404) {        
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

