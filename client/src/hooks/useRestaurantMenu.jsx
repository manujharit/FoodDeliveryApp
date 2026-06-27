import { useState, useEffect } from 'react';
import { fetchRestaurantMenu } from '@/utils/fetchData';
import { useSelector } from 'react-redux';

const useRestaurantMenu = (id) => {
  const [resMenu, setResMenu] = useState(null);
  const [error, setError] = useState(false);
  const { lat, lng } = useSelector((state) => state.location.coords);

  useEffect(() => {
    const fetchData = async (id) => {
      const data = await fetchRestaurantMenu(id, { lat, lng });
      if (!data || Object.keys(data).length === 0) {
        setError(true);
      } else {
        setResMenu(data);
      }
    };
    if (lat && lng) {
      fetchData(id);
    }
  }, [id, lat, lng]);

  if (error) {
    throw new Error('No data is available for this restaurant right now.');
  }

  return resMenu;
};

export default useRestaurantMenu;
