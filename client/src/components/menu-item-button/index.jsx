import React, { useState } from 'react';
import './_menu-item-button.scss';

const MenuItemButton = ({ qty, info, onAddItem, onSubItem }) => {
  const [quantity, setQuantity] = useState(qty);

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddItem(info);
  };
  const handleSub = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    onSubItem(info, newQuantity);
  };

  if (!quantity) {
    return (
      <button className="menu-item-button" onClick={handleAdd}>
        ADD
      </button>
    );
  } else {
    return (
      <div className="menu-item-button--active">
        <button
          className="menu-item-button__btn menu-item-button__btn--sub"
          onClick={handleSub}
        >
          -
        </button>
        <b className="menu-item-button__quantity">{quantity}</b>
        <button
          className="menu-item-button__btn menu-item-button__btn--add"
          onClick={handleAdd}
        >
          +
        </button>
      </div>
    );
  }
};

export default MenuItemButton;
