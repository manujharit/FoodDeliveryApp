import Config from '@/configs/configs';
import './_menu-offers-card.scss';

const { CDN_URL } = Config;

const MenuOffersCard = ({ data }) => {
  const { header, couponCode, offerLogo } = data;

  return (
    <div className="menu-offers-card">
      <div className="menu-offers-card__content">
        <img src={CDN_URL + offerLogo} className="menu-offers-card__image" />
        <div className="menu-offers-card__details">
          <label className="menu-offers-card__header">{header}</label>
          <label className="menu-offers-card__coupon">{couponCode}</label>
        </div>
      </div>
    </div>
  );
};

export default MenuOffersCard;
