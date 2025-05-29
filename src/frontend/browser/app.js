/**
 * Módulo principal de la aplicación frontend.
 * Gestiona la búsqueda, renderizado, eliminación y actualización de tarjetas de juegos en el DOM.
 *
 * Elementos principales:
 * - cardsContainer: Contenedor de tarjetas de juegos.
 * - searchBtn: Botón para buscar/agregar juegos.
 * - searchInput: Campo de entrada para el nombre del juego.
 *
 * Variables:
 * - games: Array de juegos actualmente mostrados.
 */

// Referencias a elementos del DOM
const cardsContainer = document.getElementById('cardsContainer');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

let games = [];

const getGames = async() => {
  const games = await fetch('http://localhost:3000/api/games');
  const resGames = await games.json();
  console.log(resGames)
  return resGames.games;
};

/**
 * Evento click para buscar/agregar un juego.
 * Genera un juego simulado, lo agrega al array y lo renderiza.
 */
searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();

  if (query) {
    const newGame = await fetch('http://localhost:3000/api/games', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: query})
    });
    console.log(newGame);

    const updatedGames = await getGames();
    console.log(updatedGames)
    games = updatedGames;
    console.log(games);
    renderCards(games);
    searchInput.value = "";
  }
});

/**
 * Permite agregar juegos presionando Enter en el input.
 */
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

/**
 * Elimina un juego del array y del DOM.
 * @param {number} id - ID del juego a eliminar.
 */
window.deleteGame = async function(id) {
  //games = deleteGameById(id, games, cardsContainer);
  const deleteGameByIdNew = async(id) => {
    const deleted = await fetch(`http:localhost:3000/api/games/${id}`, {
      method: 'DELETE'
    });
    const res = await deleted.json();
    console.log(res);
  }
  console.log(id);
  deleteGameByIdNew(id);
  const updatedGames = await getGames();
  console.log(updatedGames)
  games = updatedGames;
  console.log(games);
  renderCards(games);
  searchInput.value = "";
};

/**
 * Actualiza los juegos cada minuto simulando cambios de precio.
 */
setInterval(() => updateGames(games), 60000);
