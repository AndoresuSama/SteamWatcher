/**
 * Obtiene la lista de juegos desde el backend.
 * @async
 * @function getGames
 * @returns {Promise<Array>} Una promesa que resuelve con un array de juegos.
 */
const getGames = async () => {
  try {
    console.log('Fetching games from backend...');
    const response = await fetch('http://localhost:3000/api/games');
    const data = await response.json();
    console.log(data.games);
    renderCards(data.games);
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

/**
 * Actualiza la lista de juegos obteniéndola del backend y renderizándola.
 * @async
 * @function updateGameList
 * @returns {Promise<void>} Una promesa que se resuelve cuando la lista ha sido actualizada y renderizada.
 */
const updateGameList = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/games/updated');
    const updatedGames = await response.json();
    console.log(updatedGames.games);
    renderCards(updatedGames.games);
    searchInput.value = "";
  } catch (error) {
    console.error('Error updating game list:', error);
  }
};

/**
 * Elimina un juego del backend por su ID.
 * @async
 * @function deleteGameById
 * @param {number} id - ID del juego a eliminar.
 * @returns {Promise<void>} Una promesa que se resuelve cuando el juego ha sido eliminado.
 */
const deleteGameById = async (id) => {
  try {
    const deleted = await fetch(`http://localhost:3000/api/games/${id}`, {
      method: 'DELETE'
    });
    const res = await deleted.json();
    console.log(res);
  } catch (error) {
    console.error(`Error deleting game with id ${id}:`, error);
  }
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
