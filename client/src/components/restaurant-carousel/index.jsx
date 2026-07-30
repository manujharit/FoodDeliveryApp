import React, { useState } from 'react';
import ItemList from '@/components/item-list';
import './_restaurant-carousel.scss';

const RestaurantCarousel = ({ data, onAddItem, onSubItem }) => {
  const index = data.itemCards.length;
  const [showItems, setShowItems] = useState(index);

  const handleDropDown = () => {
    if (showItems) {
      setShowItems(null);
    } else {
      setShowItems(index);
    }
  };

  return (
    <div className="restaurant-carousel">
      <button
        className="restaurant-carousel__toggle-btn"
        onClick={handleDropDown}
      >
        <span className="restaurant-carousel__title">{data.title}</span>
        <span className="restaurant-carousel__icon">
          {showItems ? '▲' : '▼'}
        </span>
      </button>
      {showItems && (
        <div>
          {data.itemCards.map((card, index) => (
            <ItemList
              key={index}
              info={card.card.info}
              onAddItem={() => onAddItem(card.card.info)}
              onSubItem={onSubItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantCarousel;
