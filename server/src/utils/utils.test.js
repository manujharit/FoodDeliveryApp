import {
  filterData,
  filterUpdateData,
  filterMenuData,
  filterDataByTags,
} from './utils.js';

describe('utils', () => {
  describe('filterData', () => {
    it('should correctly map and extract relevant sections', () => {
      const mockData = [
        {
          card: {
            card: {
              id: 'whats_on_your_mind',
              gridElements: { infoWithStyle: { info: [{ id: 1 }] } },
            },
          },
        },
        {
          card: {
            card: {
              id: 'top_brands_for_you',
              gridElements: {
                infoWithStyle: { restaurants: [{ info: { name: 'Brand A' } }] },
              },
            },
          },
        },
        {
          card: {
            card: {
              id: 'restaurant_grid_listing',
              gridElements: {
                infoWithStyle: { restaurants: [{ info: { name: 'Res A' } }] },
              },
            },
          },
        },
        {
          card: {
            card: {
              id: 'restaurant_near_me_links',
              title: 'Near Me',
              brands: ['B1'],
            },
          },
        },
      ];

      const result = filterData(mockData);
      expect(result.whats_on_your_mind).toEqual([{ id: 1 }]);
      expect(result.top_brands_for_you).toEqual([{ name: 'Brand A' }]);
      expect(result.restaurant_grid_listing).toEqual([{ name: 'Res A' }]);
      expect(result.restaurant_near_me_links).toEqual([
        { title: 'Near Me', brands: ['B1'] },
      ]);
    });

    it('should handle empty or malformed data safely', () => {
      const result = filterData([]);
      expect(result.whats_on_your_mind).toBeUndefined();
      expect(result.top_brands_for_you).toBeUndefined();
      expect(result.restaurant_grid_listing).toBeUndefined();
      expect(result.restaurant_near_me_links).toEqual([]);
    });

    it('should handle undefined data safely', () => {
      const result = filterData();
      expect(result.whats_on_your_mind).toBeUndefined();
    });
  });

  describe('filterDataByTags', () => {
    it('should correctly map and extract tags', () => {
      const mockData = [
        {
          card: {
            card: {
              '@type':
                'type.googleapis.com/swiggy.gandalf.widgets.v2.InlineViewFilterSortWidget',
              restaurantCount: 10,
            },
          },
        },
        {
          card: {
            card: {
              type: 'COLLECTION_MASTHEAD_TYPE_IMAGE_WITH_TEXT',
              title: 'Some title',
            },
          },
        },
        {
          card: {
            card: {
              '@type':
                'type.googleapis.com/swiggy.presentation.food.v2.Restaurant',
              info: { name: 'Res T' },
            },
          },
        },
      ];

      const result = filterDataByTags(mockData);
      expect(result.count).toBe(10);
      expect(result.title.title).toBe('Some title');
      expect(result.restaurants).toEqual([{ name: 'Res T' }]);
    });

    it('should handle undefined data safely', () => {
      const result = filterDataByTags();
      expect(result.count).toBeUndefined();
    });
  });

  describe('filterUpdateData', () => {
    it('should extract using gridElements path if present', () => {
      const mockData = [
        {
          card: {
            card: {
              gridElements: {
                infoWithStyle: {
                  restaurants: [{ info: { id: 1 } }],
                },
              },
            },
          },
        },
      ];
      expect(filterUpdateData(mockData)).toEqual([{ id: 1 }]);
    });

    it('should fallback to direct info path if no gridElements', () => {
      const mockData = [
        {
          card: {
            card: {
              info: { id: 2 },
            },
          },
        },
      ];
      expect(filterUpdateData(mockData)).toEqual([{ id: 2 }]);
    });
  });

  describe('filterMenuData', () => {
    it('should correctly map menu categories', () => {
      const mockData = [
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
                        title: 'Category A',
                        itemCards: [{ id: 1 }],
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      ];
      expect(filterMenuData(mockData)).toEqual([
        { title: 'Category A', itemCards: [{ id: 1 }] },
      ]);
    });
  });
});
