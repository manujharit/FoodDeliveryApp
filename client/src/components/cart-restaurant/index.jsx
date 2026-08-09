import CartItems from '@/components/cart-items';
import Config from '@/configs/configs';
import { Link } from 'react-router';
import Location from '@/components/location';
import './_cart-restaurant.scss';

const { CDN_URL } = Config;

const CartRestaurant = ({ restaurantId, restaurantData }) => {
  return (
    <div className="cart-restaurant" key={restaurantId}>
      <Link to={`/restaurant/${restaurantId}`} className="cart-restaurant__link">
        <div>
          <img
            src={CDN_URL + restaurantData.info.cloudinaryImageId}
            className="cart-restaurant__image"
            alt="Food Item"
          />
        </div>
        <div className="cart-restaurant__details">
          <span className="cart-restaurant__name">{restaurantData.info.name}</span>
          <span className="cart-restaurant__meta">
            {/* eslint-disable-next-line max-len */}
            {restaurantData.info.areaName} <b>&#183;</b> {restaurantData.info.sla.slaString} <b>&#183;</b> <Location />{' '}
            {restaurantData.info.sla.lastMileTravelString}
          </span>
        </div>
      </Link>
      {Object.values(restaurantData.items).map((item, index) => (
        <CartItems key={index} info={item} restaurantId={restaurantId} />
      ))}
    </div>
  );
};

export default CartRestaurant;
