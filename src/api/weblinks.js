import { API_DEV, API_HOST } from '../constants/URL';

/**
 * Petición fetch que consume el endpoint para obtener un JSON con los Sitios de Interés.
 * @return {Promise<string[], MyError>} Esta promesa retorna un arreglo
 *  de tipo String con toda la
 * información de los Sitios de Interés.
 * @todo Agregue validaciones cuando hay problemas en la conectividad.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal
 * @param {AbortController.signal} signal - Se le pasa como parámetro a la funcion fetch
 * permite abortar la petición en caso esta se tarde más de lo esperado.
 */
export const getAllLinks = (signal) => {
  const url = `${API_HOST}/recommended-websites`;

  return fetch(url, { signal: signal })
    .then((response) => response.json())
    .then((result) => result);
};
