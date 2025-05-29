const { generateMockGame } = require('../src/frontend/browser/utils/generateMockGame');

describe('generateMockGame', () => {
  test('genera un juego con nombre basado en el query', () => {
    const game = generateMockGame('Cyberpunk 2077');

    expect(game.name).toBe('Cyberpunk 2077');
    expect(typeof game.id).toBe('number');
    expect(game).toHaveProperty('price');
    expect(game.price).toHaveProperty('value');
    expect(game.price).toHaveProperty('finalPrice');
    expect(game.price).toHaveProperty('discount');
  });

  test('el objeto tiene las propiedades básicas', () => {
    const game = generateMockGame('Half-Life 3');
    expect(game).toEqual(expect.objectContaining({
      name: 'Half-Life 3',
      price: expect.any(Object),
      releaseDate: expect.any(Object),
      reviews: expect.any(Object),
      image: expect.any(Object)
    }));
  });
});
