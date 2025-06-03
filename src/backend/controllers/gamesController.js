const { DB } = require("../db");

class GameManagerController {
  /**
   * Función que retorna el listado de juegos en DB
   * @returns listado de juegos
   */
  static async getList() {
    const gamesList = await DB.getFile();
    return gamesList;
  }

  /**
   * Función que elimina un juego por ID especificado
   * @param {*} gameId id del juego a eliminar
   */
  static async delete(gameId) {
    const db = JSON.parse(await DB.getFile());
    const games = Array.isArray(db?.games) ? db.games : [];
    const filteredGames = games.filter(({ id }) => id !== gameId);
    db.games = filteredGames;
    await DB.write(JSON.stringify(db, null, 2));
  }
}

module.exports = {
  GameManagerController
}