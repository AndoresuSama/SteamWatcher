function renderCard(game) {
  const cardsContainer = document.getElementById('cardsContainer');
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
}

// Para el navegador
if (typeof window !== 'undefined') {
  window.renderCard = renderCard;
}

if (typeof module !== 'undefined') {
  module.exports = { renderCard };
}
