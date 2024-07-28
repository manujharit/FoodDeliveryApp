import RestaurantCard from "./RestaurantCard"
import { useState, useEffect, useRef } from "react"
import { fetchWhatsOnMindRestaurants, fetchWhatsOnMindUpdateData } from "../utils/fetchData"
import { mergeData } from "../utils/utils"
import CardShimmer from "./shimmers/CardShimmer"
import { useSelector } from "react-redux"


const RestaurantByTags = ({ params }) => {
  const [card, setCard] = useState([])
  const { collection_id, tags, type, title } = params
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadMore, setLoadMore] = useState(true)
  const loaderRef = useRef(null)
  const loadArray = Array.from({ length: 12 }, (_, index) => index + 1);
  const { lat, lng } = useSelector(state => state.location.coords)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (page === 0 && collection_id) {
          const newData = await fetchWhatsOnMindRestaurants({ lat, lng, collection_id, tags, type });
          setCard(newData.restaurants);
        } else if (page > 0) {
          const newData = await fetchWhatsOnMindUpdateData({ lat, lng, collection_id, tags, type, count: page * 10 });
          if (newData.length) {
            setCard(mergeData(card, newData));
          }
          else {
            setLoadMore(false)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loading) {
            setPage((prevPage) => prevPage + 1);
          }
        });
      },
      { rootMargin: '0px 0px 200px 0px' }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading]);

  if (loading) return (
    <div className="flex flex-wrap justify-between items-center"  >
      {loading && loadArray.map((item, index) => <CardShimmer key={index} />)}
    </div>
  )
  return (
    <div className="flex flex-wrap justify-between items-center"  >
      {card.map((card, index) => <RestaurantCard key={index} data={card} />)}
      {loadMore?(<div ref={loaderRef} style={{ height: '100px', width: '100%' }}>
        {loading && loadArray.map((item, index) => <CardShimmer key={index} />)}
      </div>):''}
    </div>
  )
}

export default RestaurantByTags