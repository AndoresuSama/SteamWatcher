/**
 * Módulo principal de la aplicación frontend.
 * Gestiona la búsqueda, renderizado, eliminación y actualización de tarjetas de juegos en el DOM,
 * obteniendo los datos desde el backend mediante peticiones HTTP.
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
 * Realiza una petición al backend para agregar un juego y actualiza la lista.
 * @function
 * @returns {Promise<void>} Una promesa que se resuelve cuando el juego ha sido agregado y la lista actualizada.
 */
searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim();

  if (query) {
    const response = await fetch('http://localhost:3000/api/games', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: query})
    });
    console.log(response);
    updateGameList();
  }
});

/**
 * Permite agregar juegos presionando Enter en el input.
 * @function
 * @param {KeyboardEvent} e - Evento de teclado.
 * @returns {void}
 */
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') searchBtn.click();
});

/**
 * Elimina un juego del backend y actualiza la lista.
 * @function
 * @param {number} id - ID del juego a eliminar.
 * @returns {Promise<void>} Una promesa que se resuelve cuando el juego ha sido eliminado y la lista actualizada.
 */
window.deleteGame = async function(id) {
  await deleteGameById(id);
  updateGameList();
};

/**
 * Inicializa la lista de juegos al cargar la aplicación.
 * @function
 * @returns {Promise<void>} Una promesa que se resuelve cuando la lista ha sido actualizada.
 */
updateGameList();

/**
 * Actualiza los juegos cada minuto obteniendo los datos del backend.
 * @function
 * @returns {void}
 */
setInterval(() => updateGameList(), 60000);
