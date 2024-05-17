import { getRestaurants, filterData, getUpdates, filterUpdateData } from "../utils/utils.js"

const getRestaurantData = async (data) => {
    try {
        const apiData = await getRestaurants(data)
        const resData = filterData(apiData)
        return resData
    } catch (err) {
        throw err
    }
}

const getUpdatedData = async (data) => {
    try {
        const apiData = await getUpdates(data)
        const resData = filterUpdateData(apiData)
        return resData
    } catch (err) {
        throw err
    }
}

export { getRestaurantData, getUpdatedData };