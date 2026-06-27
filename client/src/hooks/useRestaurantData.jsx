import { useEffect, useState } from 'react';
import { fetchData } from '@/utils/fetchData';
import { useSelector } from 'react-redux';

const useRestaurantData = () => {
  const [resData, setResData] = useState(null);
  const [error, setError] = useState(false);
  const { lat, lng } = useSelector((state) => state.location.coords);

  useEffect(() => {
    const fetchResData = async (lat, lng) => {
      const data = await fetchData(lat, lng);
      if (!data || Object.keys(data).length === 0) {
        setError(true);
      } else {
        setResData(data);
      }
    };
    if (lat && lng) {
      fetchResData(lat, lng);
    }
  }, [lat, lng]);

  if (error) {
    throw new Error('No data available right now.');
  }

  return resData;
};

export default useRestaurantData;
