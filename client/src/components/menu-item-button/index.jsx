import React from 'react';
import './_menu-item-button.scss';

const MenuItemButton = ({ qty, info, onAddItem, onSubItem }) => {
  const handleAdd = () => {
    onAddItem(info);
  };
  const handleSub = () => {
    const newQuantity = qty - 1;
    onSubItem(info, newQuantity);
  };

  if (!qty) {
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
        <b className="menu-item-button__quantity">{qty}</b>
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
