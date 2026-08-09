import Config from '@/configs/configs';
import Rating from '@/components/rating';
import { useNavigate } from 'react-router';
import './_restaurant-card.scss';

const { CDN_URL } = Config;

const RestaurantCard = ({ data }) => {
  const { id, cloudinaryImageId, name, cuisines, avgRating, sla, aggregatedDiscountInfoV3, areaName } = data;
  const navigate = useNavigate();

  return (
    <div
      className="restaurant-card"
      onClick={() => {
        navigate(`/restaurant/${id}`);
      }}
    >
      <div className="restaurant-card__inner">
        <div className="restaurant-card__image-wrapper">
          <img className="restaurant-card__img" src={CDN_URL + cloudinaryImageId} alt="Restaurant Image" />
          {aggregatedDiscountInfoV3 && aggregatedDiscountInfoV3?.header && (
            <label className="restaurant-card__discount">
              {aggregatedDiscountInfoV3?.header &&
                aggregatedDiscountInfoV3?.header +
                  ' ' +
                  (aggregatedDiscountInfoV3?.subHeader ? aggregatedDiscountInfoV3?.subHeader : '')}
            </label>
          )}
        </div>
        <div className="restaurant-card__content">
          <span className="restaurant-card__name">{name?.length <= 20 ? name : `${name?.slice(0, 20)}...`}</span>
          {(avgRating || sla?.slaString) && (
            <span className="restaurant-card__meta">
              {avgRating && <Rating rating={avgRating} />}
              {sla?.slaString}
            </span>
          )}
          {cuisines && cuisines.length > 0 && (
            <span className="restaurant-card__cuisines">
              {cuisines.join(', ').length <= 25 ? cuisines.join(', ') : `${cuisines.join(', ').slice(0, 25)}...`}
            </span>
          )}
          <span className="restaurant-card__area">{areaName}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
