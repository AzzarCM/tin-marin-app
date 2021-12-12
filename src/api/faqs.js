import { API_DEV, API_HOST } from '../constants/URL';

/**
 * Petición fetch que consume el endpoint para obtener un JSON con las Preguntas Frecuentes.
 * @property {string} url - Contiene la ruta del endpoint.
 * @return {Promise<string[], MyError>} Esta promesa retorna un arreglo.
 *  de tipo String con toda la
 * información de las preguntas frecuentes.
 * @todo Agregue validaciones cuando hay problemas en la conectividad.
 *  @example getAllFAQs()
 * .then((response) => {...});
 */
export const getAllFAQs = () => {
  const url = `${API_HOST}/faqs`;
  return fetch(url)
    .then((response) => response.json())
    .then((result) => result);
};
