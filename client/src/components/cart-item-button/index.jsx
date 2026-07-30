import './_cart-item-button.scss';

const CartItemButton = ({ info, handleUpdateQuantity }) => {
  return (
    <div className="cart-item-button">
      <button
        className="cart-item-button__btn cart-item-button__btn--add"
        onClick={() => handleUpdateQuantity(info.quantity + 1)}
      >
        +
      </button>
      <b className="cart-item-button__quantity">{info.quantity}</b>
      <button
        className="cart-item-button__btn cart-item-button__btn--remove"
        onClick={() => handleUpdateQuantity(info.quantity - 1)}
      >
        -
      </button>
    </div>
  );
};

export default CartItemButton;
