/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import RestaurantCard from '@/components/restaurant-card';
import { fetchUpdateData } from '@/utils/fetchData';
import { mergeData } from '@/utils/utils';
import CardShimmer from '@/components/shimmers/card-shimmer';
import InfiniteScroll from '@/components/infinite-scroll';
import { useSelector } from 'react-redux';
import './_restaurant-list.scss';

const RestaurantList = ({ data }) => {
  const [card, setCard] = useState(data);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const loadArray = Array.from({ length: 12 }, (_, index) => index + 1);
  const { lat, lng } = useSelector((state) => state.location.coords);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        if (page > 0) {
          const newData = await fetchUpdateData(page * 10, { lat, lng });

          if (newData.length) {
            setCard((prev) => mergeData(prev, newData));
          } else {
            setLoadMore(false);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      setLoading(false);
    };

    fetchData();
  }, [page, lat, lng]);

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="restaurant-list">
      <label className="restaurant-list__title">
        Restaurants with online food delivery
      </label>
      <div className="restaurant-list__grid">
        <InfiniteScroll
          action={loadMoreData}
          hasMore={loadMore}
          loading={loading}
          loadingComponent={loadArray.map((item, index) => (
            <CardShimmer key={index} />
          ))}
          loaderClassName="restaurant-list__loader"
        >
          {card.map((card, index) => (
            <RestaurantCard key={index} data={card} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default RestaurantList;
