/**
 * Genera un objeto de juego simulado (mock) para pruebas o desarrollo.
 * 
 * @param {string} query - Nombre o consulta para el juego simulado.
 * @returns {Object} Objeto que representa un juego con propiedades de ejemplo.
 * @property {number} id - Identificador único basado en la fecha actual.
 * @property {string} name - Nombre del juego.
 * @property {Object} releaseDate - Información de la fecha de lanzamiento.
 * @property {string} releaseDate.value - Fecha de lanzamiento.
 * @property {boolean} releaseDate.hasChanged - Si la fecha ha cambiado.
 * @property {Object} price - Información de precios y descuentos.
 * @property {string} price.value - Precio original.
 * @property {string} price.finalPrice - Precio con descuento.
 * @property {string} price.discount - Porcentaje de descuento.
 * @property {boolean} price.hasChanged - Si el precio ha cambiado.
 * @property {Object} reviews - Información de reseñas.
 * @property {string} reviews.value - Valoración de reseñas.
 * @property {boolean} reviews.hasChanged - Si las reseñas han cambiado.
 * @property {Object} image - Información de la imagen del juego.
 * @property {string} image.value - URL de la imagen.
 * @property {boolean} image.hasChanged - Si la imagen ha cambiado.
 */
function generateMockGame(query) {
  const id = Date.now();
  return {
    id,
    name: query,
    releaseDate: {
      value: "2023-10-12",
      hasChanged: false
    },
    price: {
      value: "$59.99",
      finalPrice: "$47.99",
      discount: "-20%",
      hasChanged: true
    },
    reviews: {
      value: "Very Positive",
      hasChanged: false
    },
    image: {
      value: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
      hasChanged: false
    }
  };
}

// ✅ Compatibilidad con navegador (HTML o Electron)
if (typeof window !== 'undefined') {
  window.generateMockGame = generateMockGame;
}

// ✅ Compatibilidad con Node (Jest)
if (typeof module !== 'undefined') {
  module.exports = { generateMockGame };
}
