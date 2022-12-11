import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
// --------------------------------------------------------
const inputRef = document.getElementById('search-box');
const countryListRef = document.querySelector('.country-list');
const cardDivRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange() {
  const country = inputRef.value;

  if (!country == '') {
    fetchCountries(country.trim()).then(requestFilter);
    return;
  }
  clearMarkup();
}

function requestFilter(response) {
  if (response == undefined) return;

  if (response.length == 1) {
    clearMarkup();
    createCountryCard(response);
    return;
  }
  if (response.length > 10) {
    clearMarkup();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
  if (response.length <= 10) {
    clearMarkup();
    createCountryList(response);
    return;
  }
}

function createCountryList(country) {
  country.map(element => {
    const { flags, name } = element;
    countryListRef.insertAdjacentHTML(
      'beforeend',
      `<li class = "country">
      <img class ="country-flag" src="${flags.svg}" />
      <h2 class="country-name">${name}</h2>
    </li>`
    );
  });
}

function createCountryCard(country) {
  const { name, capital, population, languages, flags } = country[0];
  const allLanguages = languages.map(language => language.name);
  const markup = `
  <div class = "card-wrapper">
  <img class="country-flag" src="${flags.svg}" />
    <h2>${name}</h2></div>
<p>Capital: ${capital}</p>
<p>Population:${population}</p>
<p>Languages:${allLanguages}</p>
`;
  cardDivRef.insertAdjacentHTML('beforeend', markup);
}

export function clearMarkup() {
  countryListRef.innerHTML = '';
  cardDivRef.innerHTML = '';
}
