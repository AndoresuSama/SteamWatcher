const { GameManagerController } = require('../src/backend/controllers/gamesController');
const { DB } = require('../src/backend/db/index');

jest.mock('../src/backend/db');

describe('deleteGame', () => {
  let fakeDb;

  beforeEach(() => {
    fakeDb = {
      games: [
        { id: 1, name: 'Dark Souls 1' },
        { id: 2, name: 'Dark Souls 3' },
        { id: 3, name: 'Elden Ring' }
      ]
    };

    DB.getFile.mockResolvedValue(JSON.stringify(fakeDb));
    DB.write.mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('elimina un juego por id especificado', async () => {
    await GameManagerController.delete(2);
    const expectedDb = {
      games: [
        { id: 1, name: 'Dark Souls 1' },
        { id: 3, name: 'Elden Ring' }
      ]
    };
    expect(DB.write).toHaveBeenCalledWith(JSON.stringify(expectedDb, null, 2));
  });

  test('mantiene el array si el id especificado no existe', async () => {
    await GameManagerController.delete(99);
    const expectedDb = {
      games: [
        { id: 1, name: 'Dark Souls 1' },
        { id: 2, name: 'Dark Souls 3' },
        { id: 3, name: 'Elden Ring' }
      ]
    };
    expect(DB.write).toHaveBeenCalledWith(JSON.stringify(expectedDb, null, 2));
  });

  test('no falla si db.games es undefined', async () => {
    DB.getFile.mockResolvedValue(JSON.stringify({}));
    await GameManagerController.delete(1);
    expect(DB.write).toHaveBeenCalledWith(JSON.stringify({ games: [] }, null, 2));
  });
});
