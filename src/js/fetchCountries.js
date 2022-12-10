import Notiflix from 'notiflix';
import { clearMarkup } from '../index';
const BASE_URL = 'https://restcountries.com/v2';
export function fetchCountries(country) {
  return fetch(
    `${BASE_URL}/name/${country}?fields=name,capital,population,flags,languages`
  )
    .then(grabErrors)
    .then(response => response.json())
    .catch(error => {
      clearMarkup();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function grabErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
