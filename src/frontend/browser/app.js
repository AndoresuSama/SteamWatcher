const cardsContainer = document.getElementById('cardsContainer');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

let games = [];

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

function renderCard(game) {
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

  // Remueve la clase "highlight" después de 2 segundos
  setTimeout(() => {
    const highlights = card.querySelectorAll('.highlight');
    highlights.forEach(el => el.classList.remove('highlight'));
  }, 2000);
}

function deleteGame(id) {
  console.log(`Mock DELETE del juego con ID ${id}`);
  games = games.filter(game => game.id !== id);
  const card = document.getElementById(`game-${id}`);
  if (card) cardsContainer.removeChild(card);
}

function updateGames() {
  games = games.map(game => {
    // Simula un cambio aleatorio
    const updated = { ...game };
    if (Math.random() > 0.7) {
      updated.price = {
        value: "$" + (Math.random() * 60 + 10).toFixed(2),
        hasChanged: true
      };
    }
    return updated;
  });

  // Re-render
  cardsContainer.innerHTML = "";
  games.forEach(renderCard);
}

// Este código es solamente para probar la actualización de los campos
// function updateGames() {
//   games = games.map(game => {
//     return {
//       ...game,
//       price: {
//         value: "$" + (Math.random() * 60 + 10).toFixed(2),
//         hasChanged: true
//       },
//       reviews: {
//         value: ["Very Positive", "Mostly Positive", "Mixed"][Math.floor(Math.random() * 3)],
//         hasChanged: true
//       },
//       image: {
//         value: "https://picsum.photos/seed/" + Math.floor(Math.random() * 1000) + "/300/150",
//         hasChanged: true
//       },
//       releaseDate: {
//         value: "202" + Math.floor(Math.random() * 5) + "-0" + (1 + Math.floor(Math.random() * 9)) + "-15",
//         hasChanged: true
//       }
//     };
//   });

//   // Re-render con highlights
//   cardsContainer.innerHTML = "";
//   games.forEach(renderCard);
// }

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    const newGame = generateMockGame(query);
    games.push(newGame);
    renderCard(newGame);
    searchInput.value = "";
  }
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

// Auto actualización cada minuto
setInterval(updateGames, 60000);
