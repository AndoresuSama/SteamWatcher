const { GameManagerController } = require("./controllers/gameManagerController");
const { SteamFetcherController } = require("./controllers/steamFetcherController");

async function init() {
  await SteamFetcherController.addNewGame();
}

init();

const PORT = 3000;

const http = require('http');

const server = http.createServer(async (req, res) => {
  if (req.url === '/api/games/' && req.method === 'GET') {
    const gamesList = await GameManagerController.getList();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(gamesList);
  } else if (req.url === '/api/games/add' && req.method === 'POST') {
    
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});