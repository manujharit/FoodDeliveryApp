import { getResData, filterData } from "../utils/utils.js"

const getRestaurantData = async (data) => {
    try {
        const apiData = await getResData(data)
        const resData = filterData(apiData)
        return resData
    } catch (err) {
        throw err
    }
}

export { getRestaurantData };