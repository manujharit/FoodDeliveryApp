/* eslint-disable no-console */
import { useState, useEffect, useRef } from 'react';
import RestaurantCard from '@/components/restaurant-card';
import {
  fetchWhatsOnMindRestaurants,
  fetchWhatsOnMindUpdateData,
} from '@/utils/fetchData';
import { mergeData } from '@/utils/utils';
import CardShimmer from '@/components/shimmers/card-shimmer';
import { useSelector } from 'react-redux';

const RestaurantByTags = ({ params }) => {
  const [card, setCard] = useState([]);
  const [error, setError] = useState(false);
  const { collection_id, tags, type } = params;
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const loaderRef = useRef(null);
  const loadArray = Array.from({ length: 12 }, (_, index) => index + 1);
  const { lat, lng } = useSelector((state) => state.location.coords);

  if (error) {
    throw new Error('No data is available for this category right now.');
  }

  useEffect(() => {
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
          }
        } else if (page > 0) {
          const newData = await fetchWhatsOnMindUpdateData({
            lat,
            lng,
            collection_id,
            tags,
            type,
            count: page * 10,
          });
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
  }, [page, collection_id, lat, lng, tags, type]);

  const loadingRef = useRef(loading);
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  const hasCards = card.length > 0;
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loadingRef.current) {
            setPage((prevPage) => prevPage + 1);
          }
        });
      },
      { rootMargin: '0px 0px 200px 0px' }
    );

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasCards, loadMore]);

  if (card.length === 0)
    return (
      <div className="flex flex-wrap justify-between items-center">
        {loadArray.map((item, index) => (
          <CardShimmer key={index} />
        ))}
      </div>
    );

  return (
    <div className="flex flex-wrap justify-between items-center">
      {card.map((card, index) => (
        <RestaurantCard key={index} data={card} />
      ))}
      {loadMore ? (
        <div ref={loaderRef} style={{ height: '100px', width: '100%' }}>
          {loading &&
            loadArray.map((item, index) => <CardShimmer key={index} />)}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default RestaurantByTags;
