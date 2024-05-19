import express from 'express'
import { restaurantHandler, updateHandler, restaurantMenuHandler } from '../handlers/resHandler.js'
const router = express.Router()

router.get(
    "/data",
    restaurantHandler
)
router.post(
    '/update',
    updateHandler
)
router.get(
    "/restaurantmenu",
    restaurantMenuHandler
)

export default router