import RestaurantCard from "./RestaurantCard"


const RestaurantList = ({data}) => {
  return (
    <div className="flex flex-col mt-[3%]">
        <label className="text-2xl font-bold mb-6">Restaurants with online food delivery</label>
    
    <div className="flex flex-wrap justify-between items-center">
        {data.map(data=><RestaurantCard key={data.id} data={data} />)}
    </div>
    </div>
  )
}

export default RestaurantList