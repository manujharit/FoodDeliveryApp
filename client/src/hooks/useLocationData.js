import { useDispatch } from 'react-redux';
import { changeLocation } from '../redux/locationSlice';
import { useEffect } from 'react';

const useLocationData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            dispatch(
              changeLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              })
            );
          },
          (error) => {
            console.error('Error Code = ' + error.code + ' - ' + error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);
  return true;
};

export default useLocationData;
