import axios from "axios";


const getRestaurants = async (data) => {
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

const getUpdates = async (data) => {
    const url = "https://www.swiggy.com/dapi/restaurants/list/update"
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Cookie': '__SW=P5nSGJK0LqJcqDUWi558fb9DZSg67dDb; _device_id=b857ce9e-4919-2615-0d8e-a34c27ed439a; fontsLoaded=1; userLocation={%22lat%22:%2226.95250%22%2C%22lng%22:%2275.71050%22%2C%22address%22:%22%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; _guest_tid=d76c9da3-ae45-4a50-b237-ab566bb899c5; _sid=duj0d9ae-c4cb-4c26-867f-d663b8476046'
    }
    const { lat, lng, collectionV5RestaurantListWidget_SimRestoRelevance_food_seo } = data
    const body = {
        "lat": lat,
        "lng": lng,
        "nextOffset": "COVCELQ4KICIgcrkuLmXZjCnEzgE",
        "widgetOffset": {
            "NewListingView_category_bar_chicletranking_TwoRows": "",
            "NewListingView_category_bar_chicletranking_TwoRows_Rendition": "",
            "Restaurant_Group_WebView_SEO_PB_Theme": "",
            "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo": collectionV5RestaurantListWidget_SimRestoRelevance_food_seo,
            "inlineFacetFilter": "",
            "restaurantCountWidget": ""
        },
        "filters": {},
        "seoParams": {
            "seoUrl": "https://www.swiggy.com/",
            "pageType": "FOOD_HOMEPAGE",
            "apiName": "FoodHomePage"
        },
        "page_type": "DESKTOP_WEB_LISTING",
        "_csrf": "VJovqzo3Xne8-tlhx6YklA9Ck3knWB3l_VIFqnis"
    }

    const updateData = await axios.post(url, body, { headers: headers }).then(res => res.data.data.cards[0].card.card.gridElements.infoWithStyle.restaurants).catch(err => err)
    return updateData
}

const filterData = (data) => {
    const restaurantsData = {}

    restaurantsData['whats_on_your_mind'] = data.filter((card) => card.card.card.id === "whats_on_your_mind")[0].card.card.gridElements.infoWithStyle.info
    restaurantsData['top_brands_for_you'] = data.filter((card) => card.card.card.id === "top_brands_for_you")[0].card.card.gridElements.infoWithStyle.restaurants.map((card) => card.info)
    restaurantsData['restaurant_grid_listing'] = data.filter((card) => card.card.card.id === 'restaurant_grid_listing')[0].card.card.gridElements.infoWithStyle.restaurants.map((card) => card.info)
    restaurantsData['restaurant_near_me_links'] = data.filter(card => card.card.card.id === 'restaurant_near_me_links').map(res =>  {return { title: res.card.card.title, brands: res.card.card.brands } })

    return restaurantsData
}
const filterUpdateData = (data) => {
    const resData = data.map(data => data.info)
    return resData
}

export { getRestaurants, filterData, getUpdates, filterUpdateData };