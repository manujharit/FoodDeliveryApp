import { useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchData';
import { useSelector } from 'react-redux';

const useRestaurantData = () => {
  const [resData, setResData] = useState({});
  const { lat, lng } = useSelector((state) => state.location.coords);

  useEffect(() => {
    fetchResData(lat, lng);
  }, [lat, lng]);

  const fetchResData = async (lat, lng) => {
    const data = await fetchData(lat, lng);
    setResData(data);
  };

  return resData;
};

export default useRestaurantData;
