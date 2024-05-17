import RestaurantCard from "./RestaurantCard"
import { useState, useEffect, useRef } from "react"
import { fetchUpdateData } from "../utils/fetchData"
import { mergeData } from "../utils/utils"


const RestaurantList = ({ data }) => {
  const [card, setCard] = useState(data)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const loaderRef = useRef(null)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const newData = await fetchUpdateData(page * 10);
        setCard(mergeData(card, newData));
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

      <div className="flex flex-wrap justify-between items-center">
        {card.map(card => <RestaurantCard key={card.id} data={card} />)}
      </div>
      <div ref={loaderRef}>
        {
          loading && <p>Loading...</p>
        }
      </div>
    </div>
  )
}

export default RestaurantList