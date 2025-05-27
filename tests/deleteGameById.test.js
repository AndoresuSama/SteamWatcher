const { deleteGameById } = require('../src/frontend/browser/utils/deleteGameById');

describe('deleteGameById', () => {
  let games;
  let mockContainer;

  beforeEach(() => {
    games = [
      { id: 1, name: 'Game 1' },
      { id: 2, name: 'Game 2' }
    ];
    // Mock DOM
    mockContainer = {
      removeChild: jest.fn()
    };
    global.document = {
      getElementById: jest.fn(id => (id === 'game-1' ? {} : null))
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete global.document;
  });

  test('elimina el juego del array por id', () => {
    const result = deleteGameById(1, games, mockContainer);
    expect(result).toEqual([{ id: 2, name: 'Game 2' }]);
  });

  test('llama a removeChild si la tarjeta existe', () => {
    deleteGameById(1, games, mockContainer);
    expect(global.document.getElementById).toHaveBeenCalledWith('game-1');
    expect(mockContainer.removeChild).toHaveBeenCalled();
  });

  test('no llama a removeChild si la tarjeta no existe', () => {
    global.document.getElementById = jest.fn(() => null);
    deleteGameById(3, games, mockContainer);
    expect(mockContainer.removeChild).not.toHaveBeenCalled();
  });
});
