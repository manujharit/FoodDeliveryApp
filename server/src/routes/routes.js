import express from 'express'
import { restaurantHandler } from '../handlers/resHandler.js'
const router = express.Router()

router.get(
    "/data",
    restaurantHandler
)

export default router