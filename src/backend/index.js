const http = require('http');
const { getList, deleteGame } = require("./routes/games");
const { createGame, updateGames } = require("./routes/steamFetcher");

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && req.url.includes('/api/games') || req.url.includes('/api/games/updated')) {
      if (req.url === '/api/games') await getList(req, res);
      else await updateGames(req, res);
    } else if (req.method === 'POST' && req.url == '/api/games') {
      await createGame(req, res);
    } else if (req.method === 'DELETE' && req.url.startsWith('/api/games/')) {
      await deleteGame(req, res);
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