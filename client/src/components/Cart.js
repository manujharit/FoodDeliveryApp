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
        <div className="flex flex-col">
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
