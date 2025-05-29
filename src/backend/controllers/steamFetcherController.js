const puppeteer = require("puppeteer");
const { DB } = require("../db");

class SteamFetcherController {
  /**
   * 
   * @param {*} game 
   */

  static current_page = null;

  static async addNewGame(gameName) {

    if (!gameName) throw new Error('Parámetro gameName invalido');

    const browser = await puppeteer.launch({ headless: true });
    let db = JSON.parse(await DB.getFile());

    const steamGame = await this.searchBySteamName(browser, gameName);

    if (!steamGame?.length) throw Error('No se encontró el juego especificado');

    const gameData = await this.getGameInformation(steamGame[0]);

    if (!db.games) db = { games: [] };
    if (!db.games.find(game => game?.id == gameData?.id)) db.games.push(gameData);

    await DB.write(JSON.stringify(db, null, 2));

    await browser.close();
  }

  /**
   * Función que actualiza el estado de los juegos almacenados en DB
   */
  static async updateGameStatus() {
    const browser = await puppeteer.launch({ headless: true });
    const db = JSON.parse(await DB.getFile());

    const updatedGames = [];

    for (const game of db.games) {

      const steamGameList = await this.searchBySteamName(browser, game.name);

      if (!steamGameList?.length) {
        console.error('No se encontró el juego especificado');
        updatedGames.push(game);
        continue;
      }

      const matchedSteamGame = await this.findGameById(steamGameList, game.id);

      if (!matchedSteamGame) {
        console.error('Error al buscar juego a actualizar en steam');
        updatedGames.push(game);
        continue;
      }

      const updatedData = await this.getGameInformation(matchedSteamGame);

      if (!updatedData) {
        console.warn('No se pudo obtener información del juego');
        updatedGames.push(game);
        continue;
      }

      this.updateFields(game, updatedData);
      updatedGames.push(game);
    }

    db.games = updatedGames;
    await DB.write(JSON.stringify(db, null, 2));
    await browser.close();
  }

  /**
   * Función que busca un juego en el listado de busqueda de Steam por su ID
   * @param {*} gameElements listado de juegos de steam
   * @param {*} appId        id del juego
   * @returns                juego / null
   */
  static async findGameById(gameElements, appId) {
    for (const element of gameElements) {
      const id = await element.evaluate(el => el.getAttribute('data-ds-appid'));
      if (id === appId) return element;
    }
    return null;
  }

  /**
   * Función que actualiza los campos del juego especificado en caso de que haya actualizaciones para el mismo
   * @param {*} game    juego en db a actualizar
   * @param {*} updated estado actual del juego en steam
   */
  static updateFields(game, updated) {
    const compareAndUpdate = (fieldPath, targetField = fieldPath) => {
      if (game[fieldPath].value !== updated[targetField].value) {
        game[fieldPath].value = updated[targetField].value;
        game[fieldPath].hasChanged = true;
      } else game[fieldPath].hasChanged = false;
    };

    compareAndUpdate('releaseDate');
    compareAndUpdate('reviews');

    if (
      game.price.value !== updated.price.value ||
      game.price.discount !== updated.price.discount ||
      game.price.finalPrice !== updated.price.finalPrice
    ) {
      game.price = { ...updated.price };
      game.price.hasChanged = true;
    } else game.price.hasChanged = false;
  }


  static async searchBySteamName(browser, gameName) {

    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    await page.goto(`https://store.steampowered.com/search/?term=${gameName}`, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const gamesList = await page.$$('#search_resultsRows a');

    if (!gamesList) return {};

    return gamesList;

  }

  /**
   * Metodo que retorna información adicional del juego seleccionado
   * @param {} gameElement 
   * @returns 
   */
  static async getGameInformation(gameElement) {

    const attributes = await gameElement.evaluate(el => {
      const id = el.getAttribute('data-ds-appid');
      const name = el.querySelector('.search_name');
      const releaseDate = el.querySelector('.search_released');
      const reviews = el.querySelector('.search_review_summary');
      const originalPrice = el.querySelector('.discount_original_price');
      const finalPrice = el.querySelector('.discount_final_price');
      const discount = el.querySelector('.discount_pct');

      return {
        id,
        href: el.href,
        name: name ? name.textContent.trim() : null,
        releaseDate: {
          value: releaseDate ? releaseDate.textContent.trim() : null,
          hasChanged: false
        },
        reviews: {
          value: reviews ? reviews.getAttribute('data-tooltip-html')?.split('<br>')?.[0] || '' : null,
          hasChanged: false
        },
        price: {
          value: originalPrice ?
            originalPrice?.textContent?.trim() || null :
            finalPrice?.textContent?.trim() || null,
          discount: discount ? discount?.textContent?.trim() : null,
          finalPrice: finalPrice ? finalPrice?.textContent?.trim() : null,
          hasChanged: false
        }
      };
    });

    return attributes;
  }
}

module.exports = {
  SteamFetcherController
};