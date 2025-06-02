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

/**
 * Evento click para buscar/agregar un juego.
 * Genera un juego simulado, lo agrega al array y lo renderiza.
 */
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    const newGame = generateMockGame(query);
    games.push(newGame);
    renderCard(newGame, games);
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
window.deleteGame = function(id) {
  games = deleteGameById(id, games, cardsContainer);
};

/**
 * Actualiza los juegos cada minuto simulando cambios de precio.
 */
setInterval(() => updateGames(games), 60000);
