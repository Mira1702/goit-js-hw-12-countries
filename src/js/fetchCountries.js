// function fetchCountries(searchQuery) {
//     const url = `https://restcountries.eu/rest/v2/${searchQuery}`;
//     return fetch(url)
//         .then(response => response.json())
//         .then(data => console.log(data));
// };


function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(
    response => {
      return response.json();
    },
  );
}

export default fetchCountries;