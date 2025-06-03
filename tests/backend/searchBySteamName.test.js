const { SteamFetcherController } = require('../../src/backend/controllers/steamFetcherController');

describe('searchBySteamName', () => {
  let mockPage;
  let mockBrowser;

  beforeEach(() => {
    mockPage = {
      setUserAgent: jest.fn(),
      goto: jest.fn(),
      $$: jest.fn()
    };

    mockBrowser = {
      newPage: jest.fn().mockResolvedValue(mockPage)
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Conexión correcta a la pagina de Steam', async () => {
    mockPage.$$.mockResolvedValue([{}]);
    await SteamFetcherController.searchBySteamName(mockBrowser, 'elden ring');

    expect(mockBrowser.newPage).toHaveBeenCalled();
    expect(mockPage.setUserAgent).toHaveBeenCalledWith(expect.stringContaining('Mozilla'));
    expect(mockPage.goto).toHaveBeenCalledWith(
      expect.stringContaining('elden%20ring'),
      expect.objectContaining({ waitUntil: 'domcontentloaded' })
    );
  });

  test('Si existen resultados los devuelve', async () => {
    const fakeResults = [{ id: 1 }, { id: 2 }];
    mockPage.$$.mockResolvedValue(fakeResults);

    const result = await SteamFetcherController.searchBySteamName(mockBrowser, 'dark souls');

    expect(result).toEqual(fakeResults);
  });

  test('devuelve objeto vacío si no hay resultados', async () => {
    mockPage.$$.mockResolvedValue(null);

    const result = await SteamFetcherController.searchBySteamName(mockBrowser, 'Dark Souls 10');

    expect(result).toEqual({});
  });
});
