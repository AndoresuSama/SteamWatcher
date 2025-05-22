const { SteamFetcherController } = require("./controllers/steamFetcherController");

async function init() {
  await SteamFetcherController.addNewGame();
}

init();