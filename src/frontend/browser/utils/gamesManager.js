/**
 * Obtiene la lista de juegos desde el backend.
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
 * @param {number} id - ID del juego a eliminar.
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
