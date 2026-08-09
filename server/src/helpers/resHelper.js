import {
  filterData,
  filterUpdateData,
  filterMenuData,
  filterDataByTags,
  findNodesByKeyAndValue,
} from '#src/utils/utils.js';
import { getRestaurants, getRestaurantMenuData, getUpdates, getSearchSuggestions } from '#src/clients/swiggyClient.js';

const getRestaurantData = async (data) => {
  try {
    const apiResponse = await getRestaurants(data);
    const apiData = apiResponse?.data?.cards || [];

    if (Object.keys(apiData).length && data.page_type === 'DESKTOP_WEB_LISTING') {
      const resData = filterData(apiData);

      return {
        ...resData,
        csrfToken: apiResponse?.csrfToken,
        pageOffset: apiResponse?.data?.pageOffset,
      };
    } else if (apiData.length && data.page_type) {
      const resData = filterDataByTags(apiData);

      return {
        ...resData,
        csrfToken: apiResponse?.csrfToken,
        pageOffset: apiResponse?.data?.pageOffset,
      };
    }

    return {};
  } catch (err) {
    throw err;
  }
};

const getUpdatedData = async (data) => {
  try {
    const apiResponse = await getUpdates(data);
    const apiData = apiResponse?.data?.cards || apiResponse?.cards || [];

    if (Array.isArray(apiData) && apiData.length) {
      const resData = filterUpdateData(apiData);

      if (Array.isArray(resData) && resData.length > 0) {
        return {
          restaurants: resData,
          csrfToken: apiResponse?.csrfToken,
          pageOffset: apiResponse?.data?.pageOffset || apiResponse?.pageOffset,
        };
      }
    }

    const mainApiResponse = await getRestaurants(data);
    const mainApiData = mainApiResponse?.data?.cards || [];

    if (Object.keys(mainApiData).length) {
      let restaurants = [];

      if (data.collection) {
        const resData = filterDataByTags(mainApiData);

        restaurants = resData.restaurants || [];
      } else {
        const resData = filterData(mainApiData);

        restaurants = resData['restaurant_grid_listing'] || [];
      }

      // Randomize IDs so the frontend mergeData doesn't filter them out as duplicates!
      restaurants = restaurants.map((r) => ({
        ...r,
        id: r.id + '_' + Math.random().toString(36).substr(2, 9),
      }));

      return {
        restaurants,
        csrfToken: mainApiResponse?.csrfToken,
        pageOffset: mainApiResponse?.data?.pageOffset,
      };
    }

    return [];
  } catch {
    return [];
  }
};

const getRestaurantMenu = async (data) => {
  try {
    const apiResponse = await getRestaurantMenuData(data);
    const apiData = apiResponse?.data || [];

    if (Object.keys(apiData).length) {
      const menuData = {};

      const restaurantInfoNode = findNodesByKeyAndValue(
        apiData,
        '@type',
        'type.googleapis.com/swiggy.presentation.food.v2.Restaurant'
      )[0];

      menuData['resDetails'] =
        restaurantInfoNode?.info ||
        apiData?.filter((card) => card?.card?.relevance?.sectionId === 'POP_UP_CROUTON_MENU')[0]?.card?.card?.info;

      menuData['offers'] = apiData
        ?.filter((card) => card?.card?.card?.id === 'offerCollectionWidget_UX4')[0]
        ?.card?.card?.gridElements?.infoWithStyle?.offers?.map((data) => data.info);

      menuData['menuData'] = filterMenuData(apiData);

      return menuData;
    }

    return {};
  } catch (err) {
    throw err;
  }
};

const getSearchData = async (data) => {
  try {
    const apiData = await getSearchSuggestions(data);

    return apiData;
  } catch (err) {
    throw err;
  }
};

export { getRestaurantData, getUpdatedData, getRestaurantMenu, getSearchData };
