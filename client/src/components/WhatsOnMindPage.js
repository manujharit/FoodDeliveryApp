import React from 'react'
import useUrlParams from '../hooks/useUrlParams'
import RestaurantByTags from './RestaurantsByTags'
const WhatsOnMindPage = () => {

    const params = useUrlParams()
    const { collection_id, tags, type, title } = params
    return (
        <div className="flex flex-col mt-[7%] mx-[13.5%]">
            <label className="text-2xl font-bold mb-6">{title}</label>
            <RestaurantByTags params={params} />
        </div>
    )
}

export default WhatsOnMindPage