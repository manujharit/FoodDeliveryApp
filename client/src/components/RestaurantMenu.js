import React from 'react'
import { useParams } from 'react-router-dom'
import RestaurantInfo from './RestaurantInfo'
import useRestaurantMenu from '../hooks/useRestaurantMenu'
import Loading from './Loading'
import Carousel from './Carousel'
import MenuOffersCard from './MenuOffersCard'
import RestaurantCarousel from './RestaurantCarousel'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem, updateQuantity, clearCart } from '../redux/cartSlice'

const RestaurantMenu = () => {
    const id = useParams()
    const resMenu = useRestaurantMenu(id)
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const handleAddItem = (item) => {
        dispatch(addItem({
            restaurantId: resMenu["resDetails"].id,
            item: {
                ...item,
                restaurantInfo: resMenu["resDetails"]
            }
        }))
    }

    if (!resMenu) return <Loading />
    return (
        <div className='my-[5%] mx-[25%] '>
            {resMenu["resDetails"] && <RestaurantInfo data={resMenu["resDetails"]} />}
            {resMenu["offers"] && <Carousel cardTitle={"Deals for you"} data={resMenu["offers"]} card={MenuOffersCard} index={0} scrollIndex={-2} />}
            {resMenu["top_picks"] && <Loading/>}
            {resMenu["menuData"] && resMenu["menuData"].map((data) => <RestaurantCarousel key={data.id} data={data} onAddItem={handleAddItem} />)}
        </div>
    )
}

export default RestaurantMenu