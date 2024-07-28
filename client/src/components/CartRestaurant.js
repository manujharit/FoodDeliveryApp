import React from 'react';
import CartItems from './CartItems';
import Config from '../configs/configs';
import { Link } from 'react-router-dom';
import Location from './Location';
const { CDN_URL } = Config;

const CartRestaurant = ({ restaurantId, restaurantData }) => {
  return (
    <div className="border mt-4 border-gray-300" key={restaurantId}>
      <Link
        to={`/restaurant/${restaurantId}`}
        className="px-4 py-2 w-full drop-shadow-lg bg-gray-200 flex flex-row items-start"
      >
        <div>
          <img
            src={CDN_URL + restaurantData.info.cloudinaryImageId}
            className="w-[60px] h-[50px] rounded-xl shadow-md"
            alt="Food Item"
          />
        </div>
        <div className="flex flex-col items-start justify-start ml-4">
          <span className="font-bold text-lg">{restaurantData.info.name}</span>
          <span className=" flex flex-row justify-between w-[100%] text-xs text-black font-semibold">
            {restaurantData.info.areaName} <b>&#183;</b>{' '}
            {restaurantData.info.sla.slaString} <b>&#183;</b> <Location />{' '}
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
