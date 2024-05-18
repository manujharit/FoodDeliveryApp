import { useState, useEffect } from 'react'
import { fetchData } from '../utils/fetchData'
import HomeShimmer from './shimmers/HomeShimmer'
import RestaurantCard from './RestaurantCard'
import WhatsOnMindCard from './WhatsOnMindCard'
import Carousal from './Carousel'
import RestaurantList from './RestaurantList'
import Explore from './Explore'

const Body = () => {
    const [loaded, setLoaded] = useState(false)
    const [resData, setResData] = useState({})
    useEffect(() => {
        const getResData = async () => {
            const data = await fetchData()
            setResData(data)
            setLoaded(true)
        }
        if(!loaded){
        getResData()
    }
    }, [])



if (!loaded)
    return <HomeShimmer />

return resData && (
    <div className="mt-[7%] mx-[13.5%] ">
        {resData["whats_on_your_mind"] && <div className="border-b-2 border-solid border-gray-200"> <Carousal cardTitle={"What's on your mind?"} data={resData["whats_on_your_mind"]} card={WhatsOnMindCard} index={2} scrollIndex={1} /></div>}
        {resData["top_brands_for_you"] && <Carousal cardTitle={"Top restaurant chains"} data={resData["top_brands_for_you"]} card={RestaurantCard} index={1} scrollIndex={0} />}
        {resData['restaurant_grid_listing'] && <RestaurantList data={resData['restaurant_grid_listing']} />}
        {resData['restaurant_near_me_links'] && <Explore data={resData['restaurant_near_me_links']} />}
    </div>
)
}

export default Body