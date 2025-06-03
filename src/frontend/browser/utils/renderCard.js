/**
 * Renderiza una tarjeta de juego en el contenedor de tarjetas del DOM.
 *
 * @param {Object} game - Objeto que representa el juego a mostrar.
 * @param {number} game.id - Identificador único del juego.
 * @param {string} game.name - Nombre del juego.
 * @param {Object} game.releaseDate - Información de la fecha de lanzamiento.
 * @param {string} game.releaseDate.value - Fecha de lanzamiento.
 * @param {boolean} game.releaseDate.hasChanged - Si la fecha ha cambiado.
 * @param {Object} game.price - Información de precios y descuentos.
 * @param {string} game.price.value - Precio original.
 * @param {string} game.price.finalPrice - Precio con descuento.
 * @param {string} [game.price.discount] - Porcentaje de descuento.
 * @param {boolean} game.price.hasChanged - Si el precio ha cambiado.
 * @param {Object} game.reviews - Información de reseñas.
 * @param {string} game.reviews.value - Valoración de reseñas.
 * @param {boolean} game.reviews.hasChanged - Si las reseñas han cambiado.
 * @param {Object} game.image - Información de la imagen del juego.
 * @param {string} game.image.value - URL de la imagen.
 * @param {boolean} game.image.hasChanged - Si la imagen ha cambiado.
 */
function renderCards(games) {
  const cardsContainer = document.getElementById('cardsContainer');
  cardsContainer.innerHTML = "";
  console.log(games);
  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = `game-${game.id}`;

    card.innerHTML = `
      <img src="${game.image.value}" 
          alt="${game.name}" 
          class="${game.image.hasChanged ? 'highlight' : ''}">
      <h3>${game.name}</h3>
      <p class="${game.releaseDate.hasChanged ? 'highlight' : ''}">
        <strong>Lanzamiento:</strong> ${game.releaseDate.value}
      </p>
      <div class="price-box ${game.price.hasChanged ? 'highlight' : ''}">
        <strong>Precio:</strong>
        ${
          game.price.discount
            ? `
              <span class="discount-tag">${game.price.discount}</span>
              <span class="original-price">${game.price.value}</span>
              <span class="final-price">${game.price.finalPrice}</span>
            `
            : `<span class="final-price no-discount">${game.price.finalPrice}</span>`
        }
      </div>
      <p class="${game.reviews.hasChanged ? 'highlight' : ''}">
        <strong>Reseñas:</strong> ${game.reviews.value}
      </p>
      <button onclick="deleteGame(${game.id})">Eliminar</button>
    `;

    cardsContainer.appendChild(card);

    setTimeout(() => {
      const highlights = card.querySelectorAll('.highlight');
      highlights.forEach(el => el.classList.remove('highlight'));
    }, 2000);
  });
}

// Para el navegador
if (typeof window !== 'undefined') {
  window.renderCards = renderCards;
}

if (typeof module !== 'undefined') {
  module.exports = { renderCards };
}
