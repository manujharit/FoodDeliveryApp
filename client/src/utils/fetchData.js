import axios from 'axios';
import { configDotenv } from 'dotenv';

configDotenv();

const API_URL = process.env.API_URL; // Ensure process is defined

const fetchData = async (lat, lng) => {
  const url = API_URL + '/data';
  const params = {
    lat: lat,
    lng: lng,
    'is-seo-homepage-enabled': 'true',
    page_type: 'DESKTOP_WEB_LISTING',
  };

  if ((lat, lng)) {
    const data = await axios
      .get(url, { params: params })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return data;
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
  if ((lat, lng)) {
    const data = await axios
      .post(url, body)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    return data;
  }
  return {};
};

const fetchRestaurantMenu = async (id, { lat, lng }) => {
  const url = API_URL + '/restaurantMenu';
  const params = {
    lat: lat,
    lng: lng,
    id: id,
  };
  if (lat && lng) {
    const data = await axios
      .get(url, { params: params })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    return data;
  }
  return {};
};

const fetchWhatsOnMindRestaurants = async ({
  lat,
  lng,
  collection_id,
  tags,
  type,
}) => {
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
    const data = await axios
      .get(url, { params: params })
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return data;
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
}) => {
  const url = API_URL + '/update';
  const body = {
    lat: lat,
    lng: lng,
    collection: collection_id,
    tags: tags,
    sortBy: '',
    filters: '',
    type: type,
    nextOffset: 'CJ9gEOMTKID4g5HD6qnSQjCnGzgC',
    widgetOffset: {
      restaurantCountWidget: '',
      collectionV5RestaurantListWidget: `${count}`,
      inlineFacetFilter: '',
      [`${tags}_Flexipage_Themes1_StackedWidget`]: '',
    },
    page_type: null,
    _csrf: 'VSIfTlSrzgBl-DoVEXaxruKEiUJiGlcq9EQD_dNI',
  };
  setTimeout(() => {}, 200);
  if (lat && lng) {
    const data = await axios
      .post(url, body)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    return data;
  }
  return {};
};
export {
  fetchData,
  fetchUpdateData,
  fetchRestaurantMenu,
  fetchWhatsOnMindRestaurants,
  fetchWhatsOnMindUpdateData,
};
