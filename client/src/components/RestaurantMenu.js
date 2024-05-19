import React from 'react'
import { useParams } from 'react-router-dom'
import RestaurantInfo from './RestaurantInfo'
import useRestaurantMenu from '../hooks/useRestaurantMenu'
import Loading from './Loading'

const RestaurantMenu = () => {
    const id = useParams()
    const resMenu = useRestaurantMenu(id)

    if (!resMenu) return <Loading />
    return (
        <div className='my-[5%] mx-[25%] '>
            {resMenu["resDetails"] && <RestaurantInfo data={resMenu["resDetails"]}/>}
        </div>
    )
}

export default RestaurantMenu