const puppeteer = require("puppeteer");

(async () => {
  const juego = "Doom";
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  await page.goto(`https://store.steampowered.com/search/?term=${juego}`, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Espera que el contenido cargue
  await page.waitForSelector('search_resultsRows');


  // Extrae el texto de un elemento
  const titulo = await page.$eval('body', el => el.textContent);
  console.log(titulo, '<=== titu');
  console.log('Título:', titulo);

  await browser.close();
})();