

const filterData = (data) => {
    const restaurantsData = {}

    restaurantsData['whats_on_your_mind'] = data.filter((card) => card.card.card.id === "whats_on_your_mind")[0].card.card.gridElements.infoWithStyle.info
    restaurantsData['top_brands_for_you'] = data.filter((card) => card.card.card.id === "top_brands_for_you")[0].card.card.gridElements.infoWithStyle.restaurants.map((card) => card.info)
    restaurantsData['restaurant_grid_listing'] = data.filter((card) => card.card.card.id === 'restaurant_grid_listing')[0].card.card.gridElements.infoWithStyle.restaurants.map((card) => card.info)
    restaurantsData['restaurant_near_me_links'] = data.filter(card => card.card.card.id === 'restaurant_near_me_links').map(res => { return { title: res.card.card.title, brands: res.card.card.brands } })

    return restaurantsData
}
const filterUpdateData = (data) => {
    const resData = data.map(data => data.info)
    return resData
}
const filterMenuData = (data) => {
    const menuData = data?.filter(card => card.groupedCard)[0].groupedCard?.cardGroupMap?.REGULAR?.cards.filter(card => card?.card?.card?.['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory').map(data => ({ title: data.card.card.title, itemCards: data.card.card.itemCards }))
    return menuData
}

export {filterData, filterUpdateData, filterMenuData };
