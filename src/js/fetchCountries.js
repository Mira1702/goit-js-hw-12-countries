// function fetchCountries(name) {
//   return fetch(
//     `https://restcountries.eu/rest/v2/name/${name}?fields=name;population;flag;languages;capital`,
//   ).then(response => {
//     if (response.ok) return response.json();
//     throw new Error('Error fetching data');
//   });
// }
// export default fetchCountries;

// import { name } from "file-loader";

function fetchCountries(name) {
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => console.log(data));
};

export default fetchCountries;