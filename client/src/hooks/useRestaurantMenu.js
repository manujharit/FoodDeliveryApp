import { useState, useEffect } from "react"
import {fetchRestaurantMenu} from '../utils/fetchData'

const useRestaurantMenu = ({id}) => {
  const [resMenu, setResMenu] = useState(null)
  useEffect(()=>{
    const fetchData = async(id) => {
        const data = await fetchRestaurantMenu(id)
        setResMenu(data)
    }
    fetchData(id)
  },[])

  return resMenu
}

export default useRestaurantMenu