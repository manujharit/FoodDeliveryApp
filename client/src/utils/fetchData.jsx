/* eslint-disable no-console */
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const fetchData = async (lat, lng) => {
  const url = API_URL + '/data';

  const params = {
    lat: lat,
    lng: lng,
    'is-seo-homepage-enabled': 'true',
    page_type: 'DESKTOP_WEB_LISTING',
  };

  if ((lat, lng)) {
    const res = await axios.get(url, { params: params }).catch((err) => {
      console.log(err);

      return { data: {} };
    });

    return res.data;
  }

  return {};
};

const fetchUpdateData = async (count, { lat, lng }) => {
  const url = API_URL + '/update';

  const body = {
    lat: `${lat}`,
    lng: `${lng}`,
    nextOffset: 'COVCELQ4KICIgcrkuLmXZjCnEzgE',
    widgetOffset: {
      NewListingView_category_bar_chicletranking_TwoRows: '',
      NewListingView_category_bar_chicletranking_TwoRows_Rendition: '',
      Restaurant_Group_WebView_SEO_PB_Theme: '',
      collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: `${count}`,
      inlineFacetFilter: '',
      restaurantCountWidget: '',
    },
    filters: {},
    seoParams: {
      seoUrl: 'https://www.swiggy.com/',
      pageType: 'FOOD_HOMEPAGE',
      apiName: 'FoodHomePage',
    },
    page_type: 'DESKTOP_WEB_LISTING',
    _csrf: 'VJovqzo3Xne8-tlhx6YklA9Ck3knWB3l_VIFqnis',
  };

  if (lat && lng) {
    try {
      const res = await axios.post(url, body);

      if (res.data?.restaurants && Array.isArray(res.data.restaurants) && res.data.restaurants.length > 0) {
        return res.data.restaurants;
      } else if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
      }

      return [];
    } catch (err) {
      console.error(err);

      return [];
    }
  }

  return [];
};

const fetchRestaurantMenu = async (id, { lat, lng }) => {
  const url = API_URL + '/restaurantMenu';

  const params = {
    lat: lat,
    lng: lng,
    id: id,
  };

  if (lat && lng) {
    const res = await axios.get(url, { params: params }).catch((err) => {
      console.log(err);

      return { data: {} };
    });

    return res.data;
  }

  return {};
};

const fetchWhatsOnMindRestaurants = async ({ lat, lng, collection_id, tags, type }) => {
  const url = API_URL + '/data';

  const params = {
    lat: lat,
    lng: lng,
    collection: collection_id,
    tags: tags,
    sortBy: '',
    filters: '',
    type: type,
    offset: 0,
    page_type: 'null',
  };

  if (lat && lng && collection_id) {
    const res = await axios.get(url, { params: params }).catch((err) => {
      console.log(err);

      return { data: {} };
    });

    return res.data;
  }

  return {};
};

const fetchWhatsOnMindUpdateData = async ({
  lat,
  lng,
  collection_id,
  tags,
  type,
  count,
  csrfToken,
  nextOffset,
  widgetOffset,
}) => {
  const url = API_URL + '/update';

  const defaultWidgetOffset = {
    NewListingView_category_bar_chicletranking_TwoRows: '',
    NewListingView_category_bar_chicletranking_TwoRows_Rendition: '',
    Restaurant_Group_WebView_SEO_PB_Theme: '',
    collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: `${count + 9}`,
    inlineFacetFilter: '',
    restaurantCountWidget: '',
  };

  const body = {
    lat: Number(lat).toFixed(5),
    lng: Number(lng).toFixed(5),
    collection: collection_id,
    tags: tags,
    sortBy: '',
    filters: '',
    type: type,
    nextOffset: nextOffset || 'CJhlELQ4KICQ3d/xh67gAzCnEzgD',
    widgetOffset: widgetOffset || defaultWidgetOffset,
    page_type: null,
    _csrf: csrfToken || 'QCKjm6JYxQ7n-93VT7WchYT-lzDugaeAI6G1sFDs',
  };

  setTimeout(() => {}, 200);

  if (lat && lng) {
    try {
      const res = await axios.post(url, body);

      if (res.data) {
        return res.data;
      }

      return [];
    } catch (err) {
      console.error(err);

      return [];
    }
  }

  return [];
};

const fetchSearchSuggestions = async (lat, lng, str) => {
  const url = API_URL + '/search';

  const params = {
    lat: lat,
    lng: lng,
    str: str,
  };

  if (lat && lng && str) {
    const res = await axios.get(url, { params: params }).catch((err) => {
      console.log(err);

      return { data: {} };
    });

    return res.data;
  }

  return {};
};

export {
  fetchData,
  fetchUpdateData,
  fetchRestaurantMenu,
  fetchWhatsOnMindRestaurants,
  fetchWhatsOnMindUpdateData,
  fetchSearchSuggestions,
};
