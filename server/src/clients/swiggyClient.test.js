import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getRestaurants,
  getUpdates,
  getRestaurantMenuData,
} from './swiggyClient.js';

describe('swiggyClient', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  describe('getRestaurants', () => {
    it('should return cards data when lat and lng are provided', async () => {
      mock.onGet('https://www.swiggy.com/dapi/restaurants/list/v5').reply(200, {
        data: { cards: [{ id: 1 }] },
      });
      const data = await getRestaurants({ lat: '12', lng: '34' });
      expect(data).toEqual([{ id: 1 }]);
    });

    it('should return empty object if lat or lng are missing/empty', async () => {
      const data = await getRestaurants({ lat: '', lng: '' });
      expect(data).toEqual({});
    });

    it('should throw error on API failure', async () => {
      mock.onGet('https://www.swiggy.com/dapi/restaurants/list/v5').reply(500);
      await expect(getRestaurants({ lat: '12', lng: '34' })).rejects.toThrow();
    });
  });

  describe('getUpdates', () => {
    it('should return nested cards data', async () => {
      mock
        .onPost('https://www.swiggy.com/dapi/restaurants/list/update')
        .reply(200, {
          data: { cards: [{ update: true }] },
        });
      const data = await getUpdates({ lat: '12', lng: '34' });
      expect(data).toEqual([{ update: true }]);
    });

    it('should return flat cards data', async () => {
      mock
        .onPost('https://www.swiggy.com/dapi/restaurants/list/update')
        .reply(200, {
          cards: [{ update: true }],
        });
      const data = await getUpdates({ lat: '12', lng: '34' });
      expect(data).toEqual([{ update: true }]);
    });

    it('should return empty array on unhandled structure', async () => {
      mock
        .onPost('https://www.swiggy.com/dapi/restaurants/list/update')
        .reply(200, {});
      const data = await getUpdates({ lat: '12', lng: '34' });
      expect(data).toEqual([]);
    });

    it('should return empty object if lat or lng missing', async () => {
      const data = await getUpdates({ lat: '', lng: '' });
      expect(data).toEqual({});
    });

    it('should handle API failure gracefully and return empty array', async () => {
      mock
        .onPost('https://www.swiggy.com/dapi/restaurants/list/update')
        .reply(500);
      const data = await getUpdates({ lat: '12', lng: '34' });
      expect(data).toEqual([]);
    });
  });

  describe('getRestaurantMenuData', () => {
    it('should return menu cards', async () => {
      mock.onGet('https://www.swiggy.com/dapi/menu/pl').reply(200, {
        data: { cards: [{ menu: true }] },
      });
      const data = await getRestaurantMenuData({
        lat: '12',
        lng: '34',
        id: '123',
      });
      expect(data).toEqual([{ menu: true }]);
    });

    it('should return empty object if lat or lng missing', async () => {
      const data = await getRestaurantMenuData({ lat: '', lng: '', id: '123' });
      expect(data).toEqual({});
    });

    it('should throw error on API failure', async () => {
      mock.onGet('https://www.swiggy.com/dapi/menu/pl').reply(500);
      await expect(
        getRestaurantMenuData({ lat: '12', lng: '34', id: '123' })
      ).rejects.toThrow();
    });
  });
});
