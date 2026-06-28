import { jest } from '@jest/globals';

jest.unstable_mockModule('../helpers/resHelper.js', () => ({
  getRestaurantData: jest.fn(),
  getUpdatedData: jest.fn(),
  getRestaurantMenu: jest.fn(),
}));

const { restaurantHandler, updateHandler, restaurantMenuHandler } =
  await import('./resHandler.js');
const { getRestaurantData, getUpdatedData, getRestaurantMenu } =
  await import('../helpers/resHelper.js');

describe('resHandler', () => {
  let req, res;

  beforeEach(() => {
    req = { query: {}, body: {}, url: '/test' };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('restaurantHandler', () => {
    it('should return 200 with data on success', async () => {
      getRestaurantData.mockResolvedValue({ some: 'data' });
      await restaurantHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ some: 'data' });
    });

    it('should return 500 on error', async () => {
      getRestaurantData.mockRejectedValue(new Error('test error'));
      await restaurantHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ errorMessage: 'test error' });
    });
  });

  describe('updateHandler', () => {
    it('should return 200 with data on success', async () => {
      getUpdatedData.mockResolvedValue([{ some: 'update' }]);
      await updateHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ some: 'update' }]);
    });

    it('should return 500 on error', async () => {
      getUpdatedData.mockRejectedValue(new Error('test error'));
      await updateHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ errorMessage: 'test error' });
    });
  });

  describe('restaurantMenuHandler', () => {
    it('should return 200 with data on success', async () => {
      getRestaurantMenu.mockResolvedValue({ menu: 'data' });
      await restaurantMenuHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ menu: 'data' });
    });

    it('should return 500 on error', async () => {
      getRestaurantMenu.mockRejectedValue(new Error('test error'));
      await restaurantMenuHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        errorMessage: new Error('test error'),
      });
    });
  });
});
