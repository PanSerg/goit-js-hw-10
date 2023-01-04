import './css/styles.css';
import countryBase from './fetchCountries';
console.log(countryBase);

const refs = {
  form: document.querySelector('#search-box'),
  itemContainer: document.querySelector('.country-list'),
};

const DEBOUNCE_DELAY = 300;
fetch('https://restcountries.com/v3.1/name/united')
  .then(response => {
    return response.json();
  })
  .then(country => {
    console.log(country);
  })
  .catch(error => {
    console.log(error);
  });

refs.form.addEventListener('input', onInput);

function onInput(evt) {
    evt.preventDefault();
    const { capital, population, languages,flags} = evt.currentTarget;
    console.log(capital.value, population.value, languages.value, flags.value)
        .then(data = console.log(data))
        .catch(error = console.log(error));
};


