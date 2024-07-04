import RestaurantCard from "./RestaurantCard"
import { useState, useEffect, useRef } from "react"
import { fetchUpdateData } from "../utils/fetchData"
import { mergeData } from "../utils/utils"
import CardShimmer from "./shimmers/CardShimmer"
import { useSelector } from "react-redux"

const RestaurantList = ({ data }) => {
  const [card, setCard] = useState(data)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const loaderRef = useRef(null)
  const loadArray = Array.from({ length: 12 }, (_, index) => index + 1);
  const { lat, lng } = useSelector(state => state.location.coords)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (page > 0) {
          const newData = await fetchUpdateData(page * 10, { lat, lng });
          setCard(mergeData(card, newData));
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

  return (
    <div className="flex flex-col mt-[3%]">
      <label className="text-2xl font-bold mb-6">Restaurants with online food delivery</label>

      <div className="flex flex-wrap justify-between items-center"  >
        {card.map((card, index) => <RestaurantCard key={index} data={card} />)}
        <span ref={loaderRef}>{
          loading && loadArray.map((item, index) => <CardShimmer key={index} />)
        }</span>
      </div>

    </div>
  )
}

export default RestaurantList