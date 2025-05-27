const puppeteer = require("puppeteer");
const { DB } = require("../db");

class SteamFetcherController {
  /**
   * 
   * @param {*} game 
   */

  static current_page = null;

  static async addNewGame(gameName = 'Balatro') {
    const browser = await puppeteer.launch({ headless: true });
    let db = JSON.parse(await DB.getFile());

    const steamGame = await this.searchBySteamName(browser, gameName);

    if (!steamGame) throw Error('No se encontró el juego especificado');

    const gameData = await this.getGameInformation(steamGame);

    if (!db.games) db = { games: [] };
    if (!db.games.find(game => game?.id == gameData?.id)) db.games.push(gameData);

    await DB.write(JSON.stringify(db, null, 2));

    await browser.close();
  }

  static async searchBySteamName(browser, gameName) {

    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    await page.goto(`https://store.steampowered.com/search/?term=${gameName}`, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const gamesList = await page.$$('#search_resultsRows a');

    if (!gamesList) return {};

    return gamesList[0];

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
        name: {
          value: name ? name.textContent.trim() : null,
          hasChanged: false
        },
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