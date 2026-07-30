import Config from '@/configs/configs';
import MenuItemButton from '@/components/menu-item-button';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getResItemQuantity } from '@/utils/utils';
import './_item-list.scss';

const { CDN_URL } = Config;

const ItemList = ({ info, onAddItem, onSubItem }) => {
  const { id } = useParams();
  const resItems = useSelector((state) => state?.cart?.restaurants[id]?.items);
  const qty = getResItemQuantity(resItems, info);

  return (
    <div className="item-list">
      <div className="item-list__details">
        <span className="item-list__name">{info.name}</span>
        <span className="item-list__price">
          ₹ {info.price / 100 || info.defaultPrice / 100}/-
        </span>
        <p className="item-list__description">{info.description}</p>
      </div>
      <div className="item-list__image-container">
        <div className="item-list__button-wrapper">
          <MenuItemButton
            qty={qty}
            info={info}
            onAddItem={onAddItem}
            onSubItem={onSubItem}
          />
        </div>
        <img
          src={CDN_URL + info.imageId}
          className="item-list__image"
          alt="Food Item"
        />
      </div>
    </div>
  );
};

export default ItemList;
