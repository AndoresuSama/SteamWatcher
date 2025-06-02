/**
 * Obtiene la lista de juegos desde el backend.
 * @async
 * @function getGames
 * @returns {Promise<Array>} Una promesa que resuelve con un array de juegos.
 */
const getGames = async() => {
  console.log('Fetching games from backend...');
  const response = await fetch('http://localhost:3000/api/games');
  const data = await response.json();
  console.log(data)
  return data.games;
};

/**
 * Actualiza la lista de juegos obteniéndola del backend y renderizándola.
 * @async
 * @function updateGameList
 * @returns {Promise<void>} Una promesa que se resuelve cuando la lista ha sido actualizada y renderizada.
 */
const updateGameList = async() => {
  const updatedGames = await getGames();
  console.log(updatedGames);
  games = updatedGames;
  renderCards(games);
  searchInput.value = "";
};

/**
 * Elimina un juego del backend por su ID.
 * @async
 * @function deleteGameById
 * @param {number} id - ID del juego a eliminar.
 * @returns {Promise<void>} Una promesa que se resuelve cuando el juego ha sido eliminado.
 */
const deleteGameById = async(id) => {
  const deleted = await fetch(`http:localhost:3000/api/games/${id}`, {
    method: 'DELETE'
  });
  const res = await deleted.json();
  console.log(res);
}

// Para el navegador
if (typeof window !== 'undefined') {
  window.getGames = getGames;
  window.updateGameList = updateGameList;
  window.deleteGameById = deleteGameById;
}

if (typeof module !== 'undefined') {
  module.exports = { getGames, updateGameList, deleteGameById };
}
