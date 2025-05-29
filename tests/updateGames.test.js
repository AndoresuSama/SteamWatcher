const { updateGames } = require('../src/frontend/browser/utils/updateGames');

describe('updateGames', () => {
  const originalGame = {
    id: 1,
    name: "Game 1",
    price: {
      value: "$59.99",
      hasChanged: false
    }
  };

  test('actualiza el precio si Math.random > 0.7', () => {
    jest.spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.8) // para la condición
      .mockReturnValueOnce(0.5); // para el nuevo precio

    const updatedGames = updateGames([originalGame]);
    expect(updatedGames[0].price.hasChanged).toBe(true);
    expect(updatedGames[0].price.value).toMatch(/^\$\d+\.\d{2}$/);

    Math.random.mockRestore();
  });

  test('no actualiza el precio si Math.random <= 0.7', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

    const updatedGames = updateGames([originalGame]);
    expect(updatedGames[0].price.hasChanged).toBe(false);
    expect(updatedGames[0].price.value).toBe("$59.99");

    Math.random.mockRestore();
  });
});
