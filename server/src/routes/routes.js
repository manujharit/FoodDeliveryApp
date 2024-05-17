import express from 'express'
import { restaurantHandler, updateHandler } from '../handlers/resHandler.js'
const router = express.Router()

router.get(
    "/data",
    restaurantHandler
)
router.post(
    '/update',
    updateHandler
)

export default router