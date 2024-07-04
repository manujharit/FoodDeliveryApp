import axios from "axios"
import { configDotenv } from "dotenv"


configDotenv()

const API_URL = process.env.API_URL


const fetchData = async (lat, lng) => {
    const url = API_URL + '/data'
    const params = {
        'lat': lat,
        'lng': lng,
        'is-seo-homepage-enabled': 'true',
        'page_type': 'DESKTOP_WEB_LISTING'
    }

    if (lat, lng) {
        const data = await axios.get(url, { params: params }).then((res) => res.data).catch((err) => console.log(err))

        return data
    }
    return {}
}

const fetchUpdateData = async (count, { lat, lng }) => {
    const url = API_URL + "/update"
    const body = {
        lat: lat,
        lng: lng,
        collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: `${count}`
    }
    if (lat, lng) {
        const data = await axios.post(url, body).then((res) => res.data).catch(err => console.log(err))


        return data
    }
    return {}
}

const fetchRestaurantMenu = async (id, { lat, lng }) => {
    const url = API_URL + "/restaurantMenu"
    const params = {
        lat: lat,
        lng: lng,
        id: id
    }
    if(lat,lng){
    const data = await axios.get(url, { params: params }).then(res => res.data).catch(err => console.log(err))

    return data
    }
    return {}
}

export { fetchData, fetchUpdateData, fetchRestaurantMenu }