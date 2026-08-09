/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import RestaurantCard from '@/components/restaurant-card';
import {
  fetchWhatsOnMindRestaurants,
  fetchWhatsOnMindUpdateData,
} from '@/utils/fetchData';
import { mergeData } from '@/utils/utils';
import CardShimmer from '@/components/shimmers/card-shimmer';
import InfiniteScroll from '@/components/infinite-scroll';
import { useSelector } from 'react-redux';
import './_restaurants-by-tags.scss';

const RestaurantByTags = ({ params }) => {
  const [card, setCard] = useState([]);
  const [error, setError] = useState(false);
  const { collection_id, tags, type } = params;
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

  const [csrfToken, setCsrfToken] = useState('');
  const [nextOffset, setNextOffset] = useState('');
  const [widgetOffset, setWidgetOffset] = useState(null);

  const loadArray = Array.from({ length: 12 }, (_, index) => index + 1);
  const { lat, lng } = useSelector((state) => state.location.coords);

  if (error) {
    throw new Error('No data is available for this category right now.');
  }

  useEffect(() => {
    if (!lat || !lng) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);

      try {
        if (page === 0 && collection_id) {
          const newData = await fetchWhatsOnMindRestaurants({
            lat,
            lng,
            collection_id,
            tags,
            type,
          });

          if (!newData || !newData.restaurants) {
            setError(true);
          } else {
            setCard(newData.restaurants);
            setCsrfToken(newData.csrfToken || '');
            setNextOffset(newData.pageOffset?.nextOffset || '');
            setWidgetOffset(newData.pageOffset?.widgetOffset || null);
          }
        } else if (page > 0) {
          const newData = await fetchWhatsOnMindUpdateData({
            lat,
            lng,
            collection_id,
            tags,
            type,
            count: page * 10,
            csrfToken,
            nextOffset,
            widgetOffset,
          });

          if (newData.restaurants && newData.restaurants.length) {
            setCard((prev) => mergeData(prev, newData.restaurants));
            setCsrfToken(newData.csrfToken || '');
            setNextOffset(newData.pageOffset?.nextOffset || '');
            setWidgetOffset(newData.pageOffset?.widgetOffset || null);
          } else if (Array.isArray(newData) && newData.length) {
            // Fallback if it didn't return tokens
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
  }, [page, collection_id, lat, lng, tags, type]);

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (card.length === 0) {
    return (
      <div className="restaurants-by-tags">
        {loadArray.map((item, index) => (
          <CardShimmer key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="restaurants-by-tags">
      <InfiniteScroll
        action={loadMoreData}
        hasMore={loadMore}
        loading={loading}
        loadingComponent={loadArray.map((item, index) => (
          <CardShimmer key={index} />
        ))}
        loaderClassName="restaurants-by-tags__loader"
      >
        {card.map((card, index) => (
          <RestaurantCard key={index} data={card} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default RestaurantByTags;
