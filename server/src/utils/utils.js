import axios from "axios";


const getResData = async (data) => {
    const url = "https://www.swiggy.com/dapi/restaurants/list/v5"
    const params = data
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    }

    const resData = await axios.get(url, { headers: headers, params: params })
        .then(res => res.data.data.cards)
        .catch(err => {
            throw err
        })

    return resData
}

const filterData = (data) => {
    const restaurantsData = {}

    restaurantsData['whats_on_your_mind'] = data.filter((card) => card.card.card.id === "whats_on_your_mind")[0].card.card.gridElements.infoWithStyle.info
    restaurantsData['top_brands_for_you'] = data.filter((card)=> card.card.card.id === "top_brands_for_you")[0].card.card.gridElements.infoWithStyle.restaurants.map((card)=>card.info)
    restaurantsData['restaurant_grid_listing'] = data.filter((card)=> card.card.card.id === 'restaurant_grid_listing')[0].card.card.gridElements.infoWithStyle.restaurants.map((card)=>card.info)

    return restaurantsData
}

export { getResData , filterData};