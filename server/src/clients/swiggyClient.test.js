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

      expect(data).toEqual({ data: { cards: [{ id: 1 }] }, cookie: '' });
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

      expect(data).toEqual({ data: { cards: [{ update: true }] }, cookie: '' });
    });

    it('should return flat cards data', async () => {
      mock
        .onPost('https://www.swiggy.com/dapi/restaurants/list/update')
        .reply(200, {
          cards: [{ update: true }],
        });

      const data = await getUpdates({ lat: '12', lng: '34' });

      expect(data).toEqual({ cards: [{ update: true }], cookie: '' });
    });

    it('should return empty object when WAF-blocked (202 challenge)', async () => {
      mock
        .onPost('https://www.swiggy.com/dapi/restaurants/list/update')
        .reply(202, '', { 'x-amzn-waf-action': 'challenge' });

      const data = await getUpdates({ lat: '12', lng: '34' });

      expect(data).toEqual({});
    });

    it('should return empty object if lat or lng missing', async () => {
      const data = await getUpdates({ lat: '', lng: '' });

      expect(data).toEqual({});
    });

    it('should handle API failure gracefully and return empty object', async () => {
      mock
        .onPost('https://www.swiggy.com/dapi/restaurants/list/update')
        .reply(500);

      const data = await getUpdates({ lat: '12', lng: '34' });

      // 500 with validateStatus: () => true doesn't throw, returns { cookie: '' }
      expect(data).toEqual({ cookie: '' });
    });
  });

  describe('getRestaurantMenuData', () => {
    it('should return menu cards from /dapi/menu/pl', async () => {
      mock.onGet('https://www.swiggy.com/dapi/menu/pl').reply(200, {
        data: { cards: [{ menu: true }] },
      });

      const data = await getRestaurantMenuData({
        lat: '12',
        lng: '34',
        id: '123',
      });

      expect(data).toEqual({ data: [{ menu: true }], cookie: '' });
    });

    it('should fall back to /mapi/menu/pl when /dapi is WAF-blocked', async () => {
      mock
        .onGet('https://www.swiggy.com/dapi/menu/pl')
        .reply(202, '', { 'x-amzn-waf-action': 'challenge' });
      mock.onGet('https://www.swiggy.com/mapi/menu/pl').reply(200, {
        data: { cards: [{ menu: 'fallback' }] },
      });

      const data = await getRestaurantMenuData({
        lat: '12',
        lng: '34',
        id: '123',
      });

      expect(data).toEqual({ data: [{ menu: 'fallback' }], cookie: '' });
    });

    it('should return empty object if lat or lng missing', async () => {
      const data = await getRestaurantMenuData({ lat: '', lng: '', id: '123' });

      expect(data).toEqual({});
    });

    it('should return empty data when all endpoints return errors', async () => {
      mock.onGet('https://www.swiggy.com/dapi/menu/pl').reply(500);
      mock.onGet('https://www.swiggy.com/mapi/menu/pl').reply(500);

      const data = await getRestaurantMenuData({
        lat: '12',
        lng: '34',
        id: '123',
      });

      // 500 with validateStatus doesn't throw; both endpoints return empty cards
      expect(data).toEqual({ data: [], cookie: '' });
    });
  });
});
