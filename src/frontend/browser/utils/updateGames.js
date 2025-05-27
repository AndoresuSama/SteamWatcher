/**
 * Actualiza aleatoriamente el precio de los juegos simulando cambios.
 *
 * Si el precio cambia, se asigna un nuevo valor aleatorio y se marca como cambiado.
 * Si no, se mantiene el precio anterior y se marca como no cambiado.
 *
 * @param {Array<Object>} games - Array de objetos de juegos a actualizar.
 * @returns {Array<Object>} Nuevo array de juegos con posibles cambios en el precio.
 */
function updateGames(games) {
  return games.map(game => {
    const updated = { ...game };
    if (Math.random() > 0.7) {
      updated.price = {
        value: "$" + (Math.random() * 60 + 10).toFixed(2),
        hasChanged: true
      };
    } else {
      updated.price = { ...game.price, hasChanged: false };
    }

    return updated;
  });
}

// Navegador
if (typeof window !== 'undefined') {
  window.updateGames = updateGames;
}

// Jest / Node
if (typeof module !== 'undefined') {
  module.exports = { updateGames };
}
