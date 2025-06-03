/**
 * @jest-environment jsdom
 */
const { getGames, updateGameList, deleteGameById } = require('../../src/frontend/browser/utils/gamesManager');
//import { getGames, updateGameList, deleteGameById } from '../src/frontend/browser/utils/gamesManager';

// Mock global variables and functions used in gamesManager.js
global.fetch = jest.fn();
global.renderCards = jest.fn();
global.searchInput = { value: "" };
global.games = [];

describe('gamesManager', () => {
  afterEach(() => {
    jest.clearAllMocks();
    global.games = [];
    global.searchInput.value = "";
  });

  describe('getGames', () => {
    it('debe obtener la lista de juegos del backend', async () => {
      const mockGames = [{ id: 1, name: 'Test Game' }];
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ games: mockGames })
      });

      const result = await getGames();
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/games');
      expect(result).toEqual(mockGames);
    });
  });

  describe('updateGameList', () => {
    it('debe actualizar la lista de juegos y renderizar las tarjetas', async () => {
      const mockGames = [{ id: 2, name: 'Another Game' }];
      // Mock getGames to return mockGames
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ games: mockGames })
      });

      await updateGameList();

      expect(global.games).toEqual(mockGames);
      expect(renderCards).toHaveBeenCalledWith(mockGames);
      expect(global.searchInput.value).toBe("");
    });
  });

  describe('deleteGameById', () => {
    it('debe eliminar un juego por su ID', async () => {
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
  });
});
