const http = require("http");
const { getList, deleteGame } = require("./routes/games");
const { createGame, updateGames } = require("./routes/steamFetcher");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Manejar solicitudes OPTIONS (preflight)
    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    if (
      (req.method === "GET" && req.url.includes("/api/games")) ||
      req.url.includes("/api/games/updated")
    ) {
      if (req.url === "/api/games") await getList(req, res);
      else await updateGames(req, res);
    } else if (req.method === "POST" && req.url == "/api/games") {
      await createGame(req, res);
    } else if (req.method === "DELETE" && req.url.startsWith("/api/games/")) {
      await deleteGame(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
