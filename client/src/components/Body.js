import { useState, useEffect } from 'react'
import {fetchData} from '../utils/fetchData'
import RestaurantCard from './RestaurantCard'
import WhatsOnMindCard from './WhatsOnMindCard'
import Carousal from './Carousel'
import RestaurantList from './RestaurantList'

const Body = () => {
    const [loaded, setLoaded] = useState(false)
    // const [count, setCount] = useState(0)
    const [resData, setResData] = useState({})
    useEffect(() => { 
        getResData()
        setLoaded(true)
    },[])

    const getResData = async() => {
        const data = await fetchData()
        setResData(data)
    }
    return resData && (
        <div className="mt-[7%] mx-[13.5%] ">
            {resData["whats_on_your_mind"] && <Carousal  cardTitle={"What's on your mind?"} data={resData["whats_on_your_mind"]} card={WhatsOnMindCard} index={2} scrollIndex={1}/>}
            {resData["top_brands_for_you"] && <Carousal  cardTitle={"Top restaurant chains"} data={resData["top_brands_for_you"]} card={RestaurantCard} index={1} scrollIndex={0}/>}
            {resData['restaurant_grid_listing'] && <RestaurantList data={resData['restaurant_grid_listing']} />}

        </div>
    )
}

export default Body