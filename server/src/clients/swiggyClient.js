import axios from 'axios';

const cookieJar = {};

const parseCookies = (setCookieHeaders) => {
  if (!Array.isArray(setCookieHeaders)) {
    return {};
  }
  const parsed = {};
  for (const header of setCookieHeaders) {
    const nameValue = header.split(';')[0]; // "name=value"
    const eqIdx = nameValue.indexOf('=');

    if (eqIdx === -1) {
      continue;
    }
    const name = nameValue.substring(0, eqIdx).trim();
    const value = nameValue.substring(eqIdx + 1).trim();

    if (value.length > 0) {
      parsed[name] = value;
    }
  }

  return parsed;
};

const updateCookieJar = (setCookieHeaders) => {
  const newCookies = parseCookies(setCookieHeaders);

  Object.assign(cookieJar, newCookies);

  return Object.entries(cookieJar)
    .map(([k, v]) => `${k}=${v}`)
    .join('; ');
};

const getCookieHeader = () => {
  return Object.entries(cookieJar)
    .map(([k, v]) => `${k}=${v}`)
    .join('; ');
};

const isWafBlocked = (response) => {
  return response?.status === 202 && response?.headers?.['x-amzn-waf-action'] === 'challenge';
};

const getBaseHeaders = () => ({
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  Referer: 'https://www.swiggy.com/',
  Origin: 'https://www.swiggy.com',
  'Cache-Control': 'no-cache',
});

const getRestaurants = async (data) => {
  if (data.lat.length && data.lng.length) {
    const url = 'https://www.swiggy.com/dapi/restaurants/list/v5';
    const params = data;

    const headers = {
      ...getBaseHeaders(),
      Cookie: getCookieHeader(),
    };

    const apiResponse = await axios.get(url, { headers: headers, params: params }).catch((err) => {
      throw err;
    });
    // Update the server-side cookie jar with response cookies
    const cookie = updateCookieJar(apiResponse.headers['set-cookie']);

    return {
      ...apiResponse.data,
      cookie,
    };
  }

  return {};
};

const getUpdates = async (data) => {
  if (data.lat && data.lng) {
    const url = 'https://www.swiggy.com/dapi/restaurants/list/update';

    const headers = {
      ...getBaseHeaders(),
      Cookie: getCookieHeader(),
      'Content-Type': 'application/json',
    };

    try {
      const res = await axios.post(url, data, {
        headers: headers,
        validateStatus: () => true,
      });

      // If WAF-blocked, return empty so the helper can fall back to main list
      if (isWafBlocked(res)) {
        // eslint-disable-next-line no-console
        console.warn('Swiggy /update endpoint is WAF-blocked, falling back');

        return {};
      }

      const cookie = updateCookieJar(res.headers['set-cookie']);

      return {
        ...(res.data || {}),
        cookie,
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Swiggy Update API Error:', err.message);

      return {};
    }
  }

  return {};
};

const getRestaurantMenuData = async ({ lat, lng, id }) => {
  if (lat.length && lng.length) {
    const params = {
      'page-type': 'REGULAR_MENU',
      'complete-menu': 'true',
      lat: lat,
      lng: lng,
      restaurantId: id,
      catalog_qa: 'undefined',
      submitAction: 'ENTER',
    };

    // Try /dapi/menu/pl first (may be WAF-blocked), then fall back to /mapi/menu/pl
    const endpoints = ['https://www.swiggy.com/dapi/menu/pl', 'https://www.swiggy.com/mapi/menu/pl'];

    for (const url of endpoints) {
      try {
        const headers = {
          ...getBaseHeaders(),
          Cookie: getCookieHeader(),
        };

        const resMenu = await axios.get(url, {
          params: params,
          headers: headers,
          validateStatus: () => true,
        });

        // If WAF-blocked, try the next endpoint
        if (isWafBlocked(resMenu)) {
          // eslint-disable-next-line no-console
          console.warn(`Menu endpoint ${url} is WAF-blocked, trying fallback`);
          continue;
        }

        const cookie = updateCookieJar(resMenu.headers['set-cookie']);
        // /dapi returns { data: { cards } }, /mapi returns { cards } directly
        const cards = resMenu.data?.data?.cards || resMenu.data?.cards || [];

        return {
          data: cards,
          cookie,
        };
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`Menu fetch from ${url} failed:`, err.message);
        continue;
      }
    }

    // All endpoints failed
    return {};
  }

  return {};
};

const getSearchSuggestions = async (data) => {
  if (data.lat && data.lng && data.str) {
    const url = 'https://www.swiggy.com/dapi/restaurants/search/suggest';

    const params = {
      lat: data.lat,
      lng: data.lng,
      str: data.str,
      trackingId: data.trackingId || 'undefined',
      includeIMItem: data.includeIMItem || 'true',
    };

    const headers = {
      ...getBaseHeaders(),
      Cookie: getCookieHeader(),
    };

    const apiResponse = await axios.get(url, { headers: headers, params: params }).catch((err) => {
      throw err;
    });

    const cookie = updateCookieJar(apiResponse.headers['set-cookie']);

    return {
      ...(apiResponse.data || {}),
      cookie,
    };
  }

  return {};
};

// Export the cookie jar helpers for testing
export const _testing = {
  parseCookies,
  updateCookieJar,
  getCookieHeader,
  isWafBlocked,
};
export { getRestaurants, getRestaurantMenuData, getUpdates, getSearchSuggestions };
