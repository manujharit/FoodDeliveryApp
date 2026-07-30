import { Link } from 'react-router';
import Rating from '@/components/rating';
import Location from '@/components/location';
import './_restaurant-info.scss';

const RestaurantInfo = ({ data }) => {
  const {
    name,
    cuisines,
    areaName,
    avgRatingString,
    totalRatingsString,
    sla,
    costForTwoMessage,
  } = data;

  return (
    <div className="restaurant-info">
      <p className="restaurant-info__breadcrumbs">
        <Link to="/" className="restaurant-info__breadcrumb-link">
          Home
        </Link>{' '}
        {' > '}{' '}
        <label className="restaurant-info__breadcrumb-link">{name}</label>
      </p>
      <label className="restaurant-info__name">{name}</label>
      <div className="restaurant-info__card-bg">
        <div className="restaurant-info__card">
          <div className="restaurant-info__card-content">
            <label className="restaurant-info__rating-cost">
              <Rating
                rating={avgRatingString + ' (' + totalRatingsString + ')'}
              />{' '}
              {costForTwoMessage}
            </label>
            <label>
              {cuisines.map((cuisine, index) => (
                <label key={index}>
                  &nbsp;
                  <label className="restaurant-info__cuisine-link">
                    {cuisine}
                    {index !== cuisines.length - 1 ? ',' : ''}
                  </label>
                  &nbsp;
                </label>
              ))}
            </label>
            <div className="restaurant-info__meta">
              <div className="restaurant-info__timeline">
                <label>&#183;</label>
                <label>|</label>
                <label>&#183;</label>
              </div>
              <div className="restaurant-info__timeline-details">
                <label className="restaurant-info__outlet">
                  <span className="restaurant-info__outlet-label">Outlet:</span>{' '}
                  <span className="restaurant-info__outlet-name">
                    {areaName}
                  </span>
                </label>
                <label className="restaurant-info__sla">{sla.slaString}</label>
              </div>
            </div>
          </div>
          <div className="restaurant-info__location">
            <Location />
            <label className="restaurant-info__distance">
              {sla.lastMileTravelString}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
