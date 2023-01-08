import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetch-Countries';

const countryName = document.querySelector('#search-box');
const countryContainer = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

countryName.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  evt.preventDefault();
  
    const name = countryName.value.trim();
  if (name === '') {
    return (countryContainer.innerHTML = ''), (countryInfo.innerHTML = '');
  }
  
  fetchCountries(name)
    .then(countries => {
      countryContainer.innerHTML = '';
      countryInfo.innerHTML = '';
      if ((countries.length === 1)) {
        countryContainer.insertAdjacentHTML('beforeend', renderCountryContainer(countries))
        countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries))
      } else if (countries.length >= 10) {
        alertTooManyMatchesFound();
      } else {
        countryContainer.insertAdjacentHTML('beforeend', renderCountryContainer(countries))
      }
    }).catch(alertWrongName);
}

function renderCountryContainer(countries) {
  const markup = countries.map(({ name, flags }) => {
    return `<li class="country-list__item">
              <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
              <h2 class="country-info__name">${name.official}</h2>
            </li >`
})
.join('')
  return markup
}

function renderCountryInfo(countries) {
  const markup = countries.map(({ capital, population, languages }) => {
    return `<ul class="country-info__list">
    <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
    <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
    <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
    </ul>`
  }).join('')
  return markup
}

function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
function alertTooManyMatchesFound() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.');
}
