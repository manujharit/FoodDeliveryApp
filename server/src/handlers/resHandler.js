import {
  getRestaurantData,
  getUpdatedData,
  getRestaurantMenu,
} from '#src/helpers/resHelper.js';

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
    const data = await getUpdatedData(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      errorMessage: err.message,
    });
  }
};

const restaurantMenuHandler = async (req, res) => {
  try {
    const data = await getRestaurantMenu(req.query);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      errorMessage: err,
    });
  }
};

export { restaurantHandler, updateHandler, restaurantMenuHandler };
