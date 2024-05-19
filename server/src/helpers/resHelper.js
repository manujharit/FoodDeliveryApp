import { filterData, filterUpdateData, filterMenuData } from "../utils/utils.js"
import { getRestaurants, getRestaurantMenuData, getUpdates } from '../clients/swiggyClient.js'

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

const getRestaurantMenu = async (data) => {
    try {
        const apiData = await getRestaurantMenuData(data)
        const menuData = {}
        menuData['resDetails'] = apiData?.filter(card=> card?.card?.relevance?.sectionId === "POP_UP_CROUTON_MENU")[0]?.card?.card?.info
        menuData['offers'] = apiData?.filter(card=> card?.card?.card?.id === "offerCollectionWidget_UX4")[0]?.card?.card?.gridElements?.infoWithStyle?.offers?.map(data => data.info)
        menuData['menuData'] = filterMenuData(apiData)
        return menuData
    } catch (err) {
        throw err
    }
}

export { getRestaurantData, getUpdatedData, getRestaurantMenu };