import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import CartRestaurant from './CartRestaurant';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderNowHandler = () => {
    alert(
      `Order Placed!!! Thank You from ordering with us. Total Amount:₹${cart.totalAmount} /-`
    );
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <div className="my-[5%] mx-[25%] min-h-screen">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Cart</h1>
        {cart.totalAmount ? (
          <button
            className="bg-red-500 text-white my-4 px-2 py-1 rounded-md"
            onClick={() => dispatch(clearCart())}
          >
            Clear
          </button>
        ) : (
          ''
        )}
      </div>
      {Object.keys(cart.restaurants).length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-20">
          <svg height="200" width="200" viewBox="0 0 491.2 491.2" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFA300" d="M472.9,463.2l-29.6-444C441.7,8,433.7,0,423.3,0H68.1c-10.4,0-18.4,8-20,19.2L17.7,465.6c-0.8,6.4,0.8,12.8,4.8,17.6c4,4.8,9.6,8,15.2,8h416c11.2,0,20-10.4,20-22.4C473.7,466.4,473.7,464.8,472.9,463.2z" />
            <path fill="#FF8500" d="M453.7,491.2c11.2,0,20-10.4,20-22.4c0-2.4,0-4-0.8-5.6l-29.6-444C441.7,8,433.7,0,423.3,0H68.1c-10.4,0-18.4,8-20,19.2" />
            <path fill="#FF8500" d="M245.7,260c-79.2,0-143.2-98.4-143.2-177.6c0-8,6.4-14.4,14.4-14.4s14.4,6.4,14.4,14.4c0,63.2,51.2,114.4,114.4,114.4s114.4-51.2,114.4-114.4c0-8,6.4-14.4,14.4-14.4s14.4,6.4,14.4,14.4C388.9,160.8,324.9,260,245.7,260z" />
            <g>
              <path fill="#FF7300" d="M131.3,82.4c0-8-6.4-14.4-14.4-14.4s-14.4,6.4-14.4,14.4v0.8l37.6,44C134.5,113.6,131.3,98.4,131.3,82.4z" />
              <path fill="#FF7300" d="M388.9,82.4c0-8-6.4-14.4-14.4-14.4s-14.4,6.4-14.4,14.4c0,63.2-51.2,114.4-114.4,114.4c-22.4,0-43.2-6.4-60.8-17.6l68.8,80C328.9,252.8,388.9,158.4,388.9,82.4z" />
            </g>
            <path fill="#AFF9F9" d="M245.7,224.8c-79.2,0-143.2-64-143.2-143.2c0-8,6.4-14.4,14.4-14.4s14.4,6.4,14.4,14.4c0,63.2,51.2,114.4,114.4,114.4s114.4-51.2,114.4-114.4c0-8,6.4-14.4,14.4-14.4s14.4,6.4,14.4,14.4C388.9,160.8,324.9,224.8,245.7,224.8z" />
            <g>
              <path fill="#7CECF2" d="M374.5,68c-8,0-14.4,6.4-14.4,14.4c0,46.4-28,86.4-68,104c48.8-16.8,85.6-59.2,94.4-112C384.1,70.4,379.3,68,374.5,68z" />
              <path fill="#7CECF2" d="M131.3,82.4c0-8-6.4-14.4-14.4-14.4c-5.6,0-9.6,3.2-12,7.2c8.8,52,45.6,94.4,94.4,112C159.3,168.8,131.3,128.8,131.3,82.4z" />
            </g>
            <path fill="#FF7300" d="M17.7,465.6c-0.8,6.4,0.8,12.8,4.8,17.6c4,4.8,9.6,8,15.2,8h416c11.2,0,20-10.4,20-22.4c0-2.4,0-4-0.8-5.6" />
          </svg>
          <h1 className="mt-4">No items in cart</h1>
          <h1 className="text-lg mt-4 font-semibold">
            Hungry? Order from top restaurants near you!!!{' '}
            <Link
              to="/"
              className="text-blue-500 underline focus:text-purple-500"
            >
              Click here
            </Link>
          </h1>
        </div>
      ) : (
        Object.entries(cart.restaurants).map(
          ([restaurantId, restaurantData], index) => (
            <CartRestaurant
              key={index}
              restaurantId={restaurantId}
              restaurantData={restaurantData}
            />
          )
        )
      )}
      {cart.totalAmount ? (
        <div className="my-4 px-6 flex flex-row justify-between items-center text-xl font-bold">
          <span>TO PAY</span>
          <span>₹{cart.totalAmount} /-</span>
        </div>
      ) : (
        ''
      )}
      {cart.totalAmount ? (
        <div className="flex justify-center items-center">
          <button
            className="bg-green-600 px-2 py-1 border border-green-700 shadow-md shadow-green-400 active:shadow-none font-semibold rounded-xl text-white text-sm"
            onClick={() => orderNowHandler()}
          >
            Order Now !!!
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Cart;
