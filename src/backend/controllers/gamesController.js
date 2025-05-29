const { DB } = require("../db");

class GameManagerController {
  static async getList() {
    const gamesList = await DB.getFile();
    return gamesList;
  }
}

module.exports = {
  GameManagerController
}