const { SteamFetcherController } = require('../src/backend/controllers/steamFetcherController');

describe('getGameInformation', () => {
  test('Formatea la información de un juego correctamente', async () => {
    const mockGameElement = {
      evaluate: jest.fn().mockImplementation(async (fn) => {
        const fakeElement = {
          getAttribute: (attr) => {
            if (attr === 'data-ds-appid') return '1245620';
            return null;
          },
          href: 'https://store.steampowered.com/app/1245620/ELDEN_RING/?snr=1_7_7_151_150_1',
          querySelector: (selector) => {
            const map = {
              '.search_name': { textContent: 'ELDEN RING' },
              '.search_released': { textContent: '24 FEB 2022' },
              '.search_review_summary': { getAttribute: () => 'Muy positivas<br>90% of reviews' },
              '.discount_original_price': null,
              '.discount_final_price': { textContent: '$47.99' },
              '.discount_pct': null,
              'img': { getAttribute: () => 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_sm_120.jpg?t=1748630546' }
            };
            return map[selector] || null;
          }
        };
        return fn(fakeElement);
      })
    };

    const result = await SteamFetcherController.getGameInformation(mockGameElement);

    expect(result).toEqual({
      "id": "1245620",
      "href": "https://store.steampowered.com/app/1245620/ELDEN_RING/?snr=1_7_7_151_150_1",
      "name": "ELDEN RING",
      "releaseDate": {
        "value": "24 FEB 2022",
        "hasChanged": false
      },
      "reviews": {
        "value": "Muy positivas",
        "hasChanged": false
      },
      "price": {
        "value": "$47.99",
        "discount": null,
        "finalPrice": "$47.99",
        "hasChanged": false
      },
      "image": {
        "value": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_sm_120.jpg?t=1748630546",
        "hasChanged": false
      }
    });
  });
});
