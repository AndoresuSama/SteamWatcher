const cardsContainer = document.getElementById('cardsContainer');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

let games = [];

function deleteGame(id) {
  console.log(`Mock DELETE del juego con ID ${id}`);
  games = games.filter(game => game.id !== id);
  const card = document.getElementById(`game-${id}`);
  if (card) cardsContainer.removeChild(card);
}

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    const newGame = generateMockGame(query);
    games.push(newGame);
    renderCard(newGame, games);
    searchInput.value = "";
  }
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

// Auto actualización cada minuto
setInterval(() => updateGames(games), 60000);
