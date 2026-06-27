/* eslint-disable no-console */
import { useState, useEffect, useRef } from 'react';
import RestaurantCard from '@/components/restaurant-card';
import { fetchUpdateData } from '@/utils/fetchData';
import { mergeData } from '@/utils/utils';
import CardShimmer from '@/components/shimmers/card-shimmer';
import { useSelector } from 'react-redux';

const RestaurantList = ({ data }) => {
  const [card, setCard] = useState(data);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

  const loaderRef = useRef(null);
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

  return (
    <div className="flex flex-col mt-[3%]">
      <label className="text-2xl font-bold mb-6">
        Restaurants with online food delivery
      </label>

      <div className="flex flex-wrap md:justify-between justify-center items-center">
        {card.map((card, index) => (
          <RestaurantCard key={index} data={card} />
        ))}
        {loadMore ? (
          <span ref={loaderRef}>
            {loading &&
              loadArray.map((item, index) => <CardShimmer key={index} />)}
          </span>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
