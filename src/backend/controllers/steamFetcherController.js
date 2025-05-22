const puppeteer = require("puppeteer");
const { DB } = require("../db");

class SteamFetcherController {
  /**
   * 
   * @param {*} game 
   */
  static async addNewGame(gameName = 'Resident Evil 8') {
    const browser = await puppeteer.launch({ headless: true });
    const db = await DB.getFile();
    const steamGame = await this.searchBySteamName(browser, gameName);
    
    if (!steamGame) throw Error('No se encontró el juego especificado');

    const gameData = this.getGameInformation(steamGame);
    
    if (!db.games) db.games = [];
    if (!db.games.find(game => game.name == gameData?.name)) await DB.write(db);

    await browser.close();
  }

  static async searchBySteamName(browser, gameName) {
    
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    await page.goto(`https://store.steampowered.com/search/?term=${gameName}`, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const gamesList = await page.$('#search_resultsRows a');

    if (!gamesList) return {};

    return gamesList;

  }

  /**
   * Metodo que retorna información adicional del juego seleccionado
   * @param {} gameElement 
   * @returns 
   */
  static async getGameInformation(gameElement) {
    const name = await gameElement.$('.search_name');
    const releaseDate = await gameElement.$('.search_released');
    const reviews = await (await gameElement.$('.search_review_summary'))?.evaluate(el => el.getAttribute('data-tooltip-html') || '');;
    const prices = await gameElement.$('.search_discount_and_price');

    return {
      name: {
        value: name.$('.title').textContent,
        hasChanged: false
      },
      releaseDate: {
        value: releaseDate.textContent,
        hasChanged: false
      },
      reviews: {
        value: reviews.split('<br>')[0],
        hasChanged: false
      },
      price: {
        value: prices?.$('.discount_original_price')?.textContent ||
          prices?.$('.discount_final_price')?.textContent,
        hasChanged: false,
        discount: prices?.$('.discount_pct')?.textContent || '',
        finalPrice: prices?.$('.discount_final_price')?.textContent,
      }
    }
  }
}

module.exports = {
  SteamFetcherController
};