import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '@/redux/cartSlice';
import { useNavigate } from 'react-router';
import CartRestaurant from '@/components/cart-restaurant';
import { Link } from 'react-router';
import './_cart.scss';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderNowHandler = () => {
    alert(`Order Placed!!! Thank You from ordering with us. Total Amount:₹${cart.totalAmount} /-`);
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <div className="cart">
      <div className="cart__header">
        <h1 className="cart__title">Cart</h1>
        {cart.totalAmount > 0 && (
          <button className="cart__clear-button" onClick={() => dispatch(clearCart())}>
            Clear
          </button>
        )}
      </div>

      {Object.keys(cart.restaurants).length === 0 ? (
        <div className="cart__empty">
          <span className="material-symbols-outlined cart__empty-icon">remove_shopping_cart</span>
          <h2 className="cart__empty-title">No items in cart</h2>
          <p className="cart__empty-subtitle">
            Hungry? Order from top restaurants near you!!!{' '}
            <Link to="/" className="cart__empty-link">
              Click here
            </Link>
          </p>
        </div>
      ) : (
        <div className="cart__list">
          {Object.entries(cart.restaurants).map(([restaurantId, restaurantData], index) => (
            <CartRestaurant key={index} restaurantId={restaurantId} restaurantData={restaurantData} />
          ))}
        </div>
      )}

      {cart.totalAmount > 0 && (
        <>
          <div className="cart__summary">
            <span>TO PAY</span>
            <span>₹{cart.totalAmount} /-</span>
          </div>
          <div className="cart__order-wrapper">
            <button className="cart__order-button" onClick={() => orderNowHandler()}>
              Order Now !!!
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
