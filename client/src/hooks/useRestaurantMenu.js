import { useState, useEffect } from "react"
import { fetchRestaurantMenu } from '../utils/fetchData'
import { useSelector } from "react-redux"

const useRestaurantMenu = ({ id }) => {
  const [resMenu, setResMenu] = useState(null)
  const { lat, lng } = useSelector(state => state.location.coords)

  if (!(lat && lng)) {
    useLocationData()
  }
  
  useEffect(() => {
    const fetchData = async (id) => {
      const data = await fetchRestaurantMenu(id, { lat, lng })
      setResMenu(data)
    }
      fetchData(id)
  }, [])

  return resMenu
}

export default useRestaurantMenu