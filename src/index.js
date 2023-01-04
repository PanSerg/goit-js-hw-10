import './css/styles.css';
import debounce from 'lodash.debounce';
import countryBase from './fetchCountries';
console.log(countryBase);

const countryName = document.querySelector('#search-box');
const countryContainer = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

fetch('https://restcountries.com/v2/all')
  .then(response => {
    return response.json();
  })
  .then(country => {
    console.log(country);
  })
  .catch(error => {
    console.log(error);
  });

  
countryName.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  evt.preventDefault();
  
    const name = countryName.ariaValueMax.trim();
  if (name === '') {
      return (countryContainer.innerHTML = ''), (countryInfo.innerHTML = '')
  }
  
  fetchCountries(name)
    .then(countries => {
      countryContainer.innerHTML = '';
      countryInfo.innerHTML = '';
      if ((countries.length = 1)) {
        countryContainer.insertAdjacentHTML('beforeend');
        countryInfo.insertAdjacentHTML('beforeend');
      } else if (countries.length >= 10) {
        alertTooManyMatchesFound();
      } else {
        countryContainer.insertAdjacentHTML('beforeend');
      }
    }).catch(alertWrongName);
};



