/**
 * Elimina un juego del array por su ID y remueve la tarjeta del DOM si existe.
 * @param {number} id - ID del juego a eliminar.
 * @param {Array} games - Array de juegos.
 * @param {HTMLElement} cardsContainer - Contenedor de tarjetas.
 * @returns {Array} Nuevo array de juegos sin el juego eliminado.
 */
function deleteGameById(id, games, cardsContainer) {
  console.log(`Id del juego a eliminar: ${id}`);
  console.log(`Array de juegos antes de eliminar:`, games);
  console.log(`Contenedor de tarjetas:`, cardsContainer);
  const updatedGames = games.filter(game => game.id !== id);
  if (typeof document !== 'undefined' && cardsContainer) {
    const card = document.getElementById(`game-${id}`);
    if (card) cardsContainer.removeChild(card);
  }
  return updatedGames;
}

// Para el navegador
if (typeof window !== 'undefined') {
  window.deleteGameById = deleteGameById;
}

if (typeof module !== 'undefined') {
  module.exports = { deleteGameById };
}
