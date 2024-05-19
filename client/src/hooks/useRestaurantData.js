import { useEffect, useState } from 'react'
import { fetchData } from '../utils/fetchData'

const useRestaurantData = () => {
  const [resData, setResData] = useState({})

  useEffect(() => {
    fetchResData()
  },[])

  const fetchResData = async () => {
    const data = await fetchData()
    setResData(data)
  }
  return resData
}

export default useRestaurantData