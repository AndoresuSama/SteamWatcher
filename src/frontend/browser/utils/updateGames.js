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
