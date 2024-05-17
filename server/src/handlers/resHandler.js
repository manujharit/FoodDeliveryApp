import { getRestaurantData, getUpdatedData } from '../helpers/resHelper.js'
const restaurantHandler = async (req, res, next) => {
    try {

        const data = await getRestaurantData(req.query)

        res.status(200).json(data)
    } catch (err) {
        
        res.status(500).json({
            errorMessage: err.message
        })

    }
}
const updateHandler = async (req, res, next) => {
    try {

        const data = await getUpdatedData(req.body)

        res.status(200).json(data)
    } catch (err) {
        
        res.status(500).json({
            errorMessage: err.message
        })

    }
}

export { restaurantHandler, updateHandler }