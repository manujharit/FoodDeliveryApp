import express from 'express';
import {
  restaurantHandler,
  updateHandler,
  restaurantMenuHandler,
  searchHandler,
} from '#src/handlers/resHandler.js';
const router = express.Router();

router.get('/data', restaurantHandler);
router.post('/update', updateHandler);
router.get('/restaurantmenu', restaurantMenuHandler);
router.get('/search', searchHandler);

export default router;
