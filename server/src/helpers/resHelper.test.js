import { jest } from '@jest/globals';

// We need to mock swiggyClient
jest.unstable_mockModule('../clients/swiggyClient.js', () => ({
  getRestaurants: jest.fn(),
  getUpdates: jest.fn(),
  getRestaurantMenuData: jest.fn(),
}));

const { getRestaurantData, getUpdatedData, getRestaurantMenu } =
  await import('./resHelper.js');
const { getRestaurants, getUpdates, getRestaurantMenuData } =
  await import('../clients/swiggyClient.js');

describe('resHelper', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getRestaurantData', () => {
    it('should return desktop web listing data', async () => {
      getRestaurants.mockResolvedValue([
        {
          card: {
            card: {
              id: 'restaurant_grid_listing',
              gridElements: {
                infoWithStyle: { restaurants: [{ info: { name: 'Res 1' } }] },
              },
            },
          },
        },
      ]);
      const res = await getRestaurantData({ page_type: 'DESKTOP_WEB_LISTING' });
      expect(res.restaurant_grid_listing).toBeDefined();
      expect(res.restaurant_grid_listing[0].name).toBe('Res 1');
    });

    it('should return mobile/tags listing data', async () => {
      getRestaurants.mockResolvedValue([
        {
          card: {
            card: {
              '@type':
                'type.googleapis.com/swiggy.presentation.food.v2.Restaurant',
              info: { name: 'Res 2' },
            },
          },
        },
      ]);
      const res = await getRestaurantData({ page_type: 'MOBILE' });
      expect(res.restaurants).toBeDefined();
      expect(res.restaurants[0].name).toBe('Res 2');
    });

    it('should return empty object if API fails or returns empty', async () => {
      getRestaurants.mockResolvedValue([]);
      const res = await getRestaurantData({});
      expect(res).toEqual({});
    });
  });

  describe('getUpdatedData', () => {
    it('should return updated data directly if API returns valid updates', async () => {
      getUpdates.mockResolvedValue([{ card: { card: { info: { id: 1 } } } }]);
      const res = await getUpdatedData({});
      expect(res).toEqual([{ id: 1 }]);
    });

    it('should fallback to main API if update API returns empty', async () => {
      getUpdates.mockResolvedValue([]);
      getRestaurants.mockResolvedValue([
        {
          card: {
            card: {
              id: 'restaurant_grid_listing',
              gridElements: {
                infoWithStyle: { restaurants: [{ info: { id: 99 } }] },
              },
            },
          },
        },
      ]);
      const res = await getUpdatedData({});
      expect(res.length).toBe(1);
      // It should randomize the ID
      expect(res[0].id).not.toBe(99);
      expect(String(res[0].id).startsWith('99_')).toBe(true);
    });

    it('should fallback to main API for collections if update API returns empty', async () => {
      getUpdates.mockResolvedValue([]);
      getRestaurants.mockResolvedValue([
        {
          card: {
            card: {
              '@type':
                'type.googleapis.com/swiggy.presentation.food.v2.Restaurant',
              info: { id: 88 },
            },
          },
        },
      ]);
      const res = await getUpdatedData({ collection: '123' });
      expect(res.length).toBe(1);
      expect(String(res[0].id).startsWith('88_')).toBe(true);
    });
  });

  describe('getRestaurantMenu', () => {
    it('should extract menu details', async () => {
      getRestaurantMenuData.mockResolvedValue([
        {
          card: {
            relevance: { sectionId: 'POP_UP_CROUTON_MENU' },
            card: { info: { name: 'Res Details' } },
          },
        },
        {
          groupedCard: {
            cardGroupMap: {
              REGULAR: {
                cards: [
                  {
                    card: {
                      card: {
                        '@type':
                          'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory',
                        title: 'Category 1',
                        itemCards: [],
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      ]);

      const res = await getRestaurantMenu({});
      expect(res.resDetails).toEqual({ name: 'Res Details' });
      expect(res.menuData.length).toBe(1);
      expect(res.menuData[0].title).toBe('Category 1');
    });

    it('should return empty object if API returns empty', async () => {
      getRestaurantMenuData.mockResolvedValue([]);
      const res = await getRestaurantMenu({});
      expect(res).toEqual({});
    });
  });
});
