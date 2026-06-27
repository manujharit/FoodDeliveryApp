import {
  filterData,
  filterUpdateData,
  filterMenuData,
  filterDataByTags,
} from '#src/utils/utils.js';
import {
  getRestaurants,
  getRestaurantMenuData,
  getUpdates,
} from '#src/clients/swiggyClient.js';

const getRestaurantData = async (data) => {
  try {
    const apiData = await getRestaurants(data);
    if (
      Object.keys(apiData).length &&
      data.page_type === 'DESKTOP_WEB_LISTING'
    ) {
      const resData = filterData(apiData);
      return resData;
    } else if (apiData.length && data.page_type) {
      const resData = filterDataByTags(apiData);
      return resData;
    }
    return {};
  } catch (err) {
    throw err;
  }
};

const getUpdatedData = async (data) => {
  try {
    const apiData = await getUpdates(data);
    if (Array.isArray(apiData) && apiData.length) {
      const resData = filterUpdateData(apiData);
      if (Array.isArray(resData) && resData.length > 0) {
        return resData;
      }
    }

    // Fallback: Since Swiggy's /update API requires dynamic valid tokens which often expire/403,
    // we mock infinite load by fetching the main list again so the frontend works.
    const mainApiData = await getRestaurants(data);
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
      return restaurants;
    }

    return [];
  } catch (err) {
    return [];
  }
};

const getRestaurantMenu = async (data) => {
  try {
    const apiData = await getRestaurantMenuData(data);
    if (Object.keys(apiData).length) {
      const menuData = {};
      menuData['resDetails'] = apiData?.filter(
        (card) => card?.card?.relevance?.sectionId === 'POP_UP_CROUTON_MENU'
      )[0]?.card?.card?.info;
      menuData['offers'] = apiData
        ?.filter(
          (card) => card?.card?.card?.id === 'offerCollectionWidget_UX4'
        )[0]
        ?.card?.card?.gridElements?.infoWithStyle?.offers?.map(
          (data) => data.info
        );
      menuData['menuData'] = filterMenuData(apiData);
      return menuData;
    }
    return {};
  } catch (err) {
    throw err;
  }
};

export { getRestaurantData, getUpdatedData, getRestaurantMenu };
