const { GameManagerController } = require("../controllers/gamesController");
const { SteamFetcherController } = require("../controllers/steamFetcherController");

const createGame = async (req, res) => {
  try {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);

        await SteamFetcherController.addGame(data?.name);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Juego agregado con éxito' }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error al agregar juego' }));
      }
    });
  } catch (error) {
    es.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error }));
  }
}

const updateGames = async (req, res) => {
  try {
    await SteamFetcherController.updateGames();
    const games = await GameManagerController.getList();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(games);
  } catch (error) {
    es.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error }));
  }
}

module.exports = {
  createGame,
  updateGames
}