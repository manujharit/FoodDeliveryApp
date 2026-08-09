import { getRestaurantData, getUpdatedData, getRestaurantMenu, getSearchData } from '#src/helpers/resHelper.js';

const restaurantHandler = async (req, res) => {
  try {
    const data = await getRestaurantData(req.query);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      errorMessage: err.message,
    });
  }
};

const updateHandler = async (req, res) => {
  try {
    /*
     * Server manages cookies internally via the cookie jar — no need for
     * the client to send x-swiggy-cookie anymore.
     */
    const data = req.body;
    const result = await getUpdatedData(data);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      errorMessage: err.message,
    });
  }
};

const restaurantMenuHandler = async (req, res) => {
  try {
    // Server manages cookies internally — no x-swiggy-cookie needed.
    const data = req.query;
    const result = await getRestaurantMenu(data);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      errorMessage: err,
    });
  }
};

const searchHandler = async (req, res) => {
  try {
    // Server manages cookies internally — no x-swiggy-cookie needed.
    const data = req.query;
    const result = await getSearchData(data);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      errorMessage: err.message,
    });
  }
};

export { restaurantHandler, updateHandler, restaurantMenuHandler, searchHandler };
