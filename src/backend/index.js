const { GameManagerController } = require("./controllers/gamesController");
const { SteamFetcherController } = require("./controllers/steamFetcherController");

const PORT = 3000;

const http = require('http');

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/api/games' && req.method === 'GET') {
      const games = await GameManagerController.getList();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(games);
    } else if (req.url === '/api/games/updated' && req.method === 'GET') {
      await SteamFetcherController.updateGames();
      const games = await GameManagerController.getList();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(games);
    } else if (req.url === '/api/games' && req.method === 'POST') {
      let body = '';

      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        const data = JSON.parse(body);

        await SteamFetcherController.addGame(data?.name);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Juego agregado con éxito' }));
      });

    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  } catch (error) {
    res.end(JSON.stringify({ error }));
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});