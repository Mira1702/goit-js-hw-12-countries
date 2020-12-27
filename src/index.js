// import debounce from 'lodash.debounce';
// // import fetchCountries from './js/fetchCountries';
// import { error } from '@pnotify/core';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';
// import './styles.css';


function fetchCountries(surchQuery) {
    const url = `https://restcountries.eu/rest/v2/name/${surchQuery}`;
    return fetch(url)
        .then(result => result.json())
        .then(data => console.log(data));
};
export default fetchCountries;
// fetchCountries(surchQuery);

// fetch('http://hn.algolia.com/api/v1/search?query=react')
//     .then(res => res.json())
//     .then(data => console.log(data));

// fetch('https://restcountries.eu/rest/v2/name/${searchQuery}')
//         .then(result => result.json())
//         .then(data => console.log(data));
