import { useDispatch } from 'react-redux';
import CartItemButton from '@/components/cart-item-button';
import { removeItem, updateQuantity } from '@/redux/cartSlice';
import './_cart-items.scss';

const CartItems = ({ info, restaurantId }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeItem({ restaurantId, itemId: info.id }));
  };

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem();
    } else {
      dispatch(
        updateQuantity({ restaurantId, itemId: info.id, quantity: newQuantity })
      );
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item__details">
        <span className="cart-item__name">{info.name}</span>
        <span className="cart-item__price">
          ₹ {(info.price / 100 || info.defaultPrice / 100) * info.quantity}/-
        </span>
      </div>
      <div className="cart-item__actions">
        <CartItemButton
          info={info}
          handleUpdateQuantity={handleUpdateQuantity}
        />
        <button className="cart-item__remove-btn" onClick={handleRemoveItem}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItems;
