const { GameManagerController } = require("../controllers/gamesController");

const getList = async (req, res) => {
  try {
    const games = await GameManagerController.getList();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(games);
  } catch (error) {
    es.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error }));
  }
}

const deleteGame = async (req, res) => {
  try {
    const id = req.url.split('/')[3];

    await GameManagerController.delete(id);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Juego eliminado con éxito' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error }));
  }
}

module.exports = {
  getList,
  deleteGame
}