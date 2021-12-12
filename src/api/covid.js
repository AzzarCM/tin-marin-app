import { API_DEV, API_HOST } from '../constants/URL';

/**
 * Petición fetch que consume el endpoint para obtener un JSON con las Recomendaciones Covid-19
 * @property {string} url - Contiene la ruta del endpoint.
 * @return {Promise<string[], MyError>} Esta promesa retorna un arreglo
 *  de tipo String con toda la
 * información de las recomendaciones.
 * @todo Agregue validaciones cuando hay problemas en la conectividad
 * @example getAllCovidRecommendations()
 * .then((response) => {...});
 */
export const getAllCovidRecommendations = () => {
  const url = `${API_HOST}/recommendations`;

  return fetch(url)
    .then((response) => response.json())
    .then((result) => result);
};
