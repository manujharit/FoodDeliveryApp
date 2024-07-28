import React from 'react';
import { useParams } from 'react-router-dom';
import RestaurantInfo from './RestaurantInfo';
import useRestaurantMenu from '../hooks/useRestaurantMenu';
import Loading from './Loading';
import Carousel from './Carousel';
import MenuOffersCard from './MenuOffersCard';
import RestaurantCarousel from './RestaurantCarousel';
import { useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from '../redux/cartSlice';

const RestaurantMenu = () => {
  const { id } = useParams();
  const resMenu = useRestaurantMenu(id);
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(
      addItem({
        restaurantId: resMenu['resDetails'].id,
        item: {
          ...item,
          restaurantInfo: resMenu['resDetails'],
        },
      })
    );
  };
  const handleUpdateItem = (item, quantity) => {
    if (quantity >= 0) {
      if (quantity === 0) {
        dispatch(
          removeItem({
            restaurantId: resMenu['resDetails'].id,
            itemId: item.id,
          })
        );
      } else {
        dispatch(
          updateQuantity({
            restaurantId: resMenu['resDetails'].id,
            itemId: item.id,
            quantity: quantity,
          })
        );
      }
    }
  };

  if (!resMenu) return <Loading />;
  return (
    <div className="my-[5%] mx-[25%] ">
      {resMenu['resDetails'] && <RestaurantInfo data={resMenu['resDetails']} />}
      {resMenu['offers'] && (
        <Carousel
          cardTitle={'Deals for you'}
          data={resMenu['offers']}
          card={MenuOffersCard}
          index={0}
          scrollIndex={-2}
        />
      )}
      {resMenu['top_picks'] && <Loading />}
      {resMenu['menuData'] &&
        resMenu['menuData'].map((data, index) => (
          <RestaurantCarousel
            key={index}
            data={data}
            onAddItem={handleAddItem}
            onSubItem={handleUpdateItem}
          />
        ))}
    </div>
  );
};

export default RestaurantMenu;
