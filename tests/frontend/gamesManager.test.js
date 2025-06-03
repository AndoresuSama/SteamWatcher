/**
 * @jest-environment jsdom
 */
const { getGames, updateGameList, deleteGameById } = require('../../src/frontend/browser/utils/gamesManager');

global.fetch = jest.fn();
global.renderCards = jest.fn();
global.searchInput = { value: "" };

describe('gamesManager', () => {
  afterEach(() => {
    jest.clearAllMocks();
    global.searchInput.value = "";
  });

  describe('getGames', () => {
    it('debe obtener juegos y renderizarlos', async () => {
      const mockGames = [{ id: 1, name: 'Test Game' }];
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ games: mockGames })
      });

      await getGames();

      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/games');
      expect(renderCards).toHaveBeenCalledWith(mockGames);
    });

    it('debe manejar errores de fetch', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await getGames();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching games:', expect.any(Error));
      expect(renderCards).not.toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('updateGameList', () => {
    it('debe obtener juegos actualizados y renderizarlos', async () => {
      const mockUpdatedGames = [{ id: 2, name: 'Updated Game' }];
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ games: mockUpdatedGames })
      });

      await updateGameList();

      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/games/updated');
      expect(renderCards).toHaveBeenCalledWith(mockUpdatedGames);
      expect(global.searchInput.value).toBe("");
    });

    it('debe manejar errores al actualizar la lista de juegos', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      fetch.mockRejectedValueOnce(new Error('Fetch failed'));

      await updateGameList();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error updating game list:', expect.any(Error));
      expect(renderCards).not.toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('deleteGameById', () => {
    it('debe enviar una solicitud DELETE con el ID correcto', async () => {
      const mockId = 123;
      const mockResponse = { success: true };
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      });

      await deleteGameById(mockId);

      expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/api/games/${mockId}`, {
        method: 'DELETE'
      });
    });

    it('debe manejar errores al eliminar un juego', async () => {
      const mockId = 456;
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      fetch.mockRejectedValueOnce(new Error('Delete failed'));

      await deleteGameById(mockId);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        `Error deleting game with id ${mockId}:`,
        expect.any(Error)
      );
      consoleErrorSpy.mockRestore();
    });
  });
});
