import Config from "../configs/configs"
import Rating from "./Rating"
const { CDN_URL } = Config
import { useNavigate } from "react-router-dom"

const RestaurantCard = ({ data }) => {
    const {id, cloudinaryImageId, name, cuisines, avgRating, sla, aggregatedDiscountInfoV3, areaName } = data
    const navigate=useNavigate()
    return (
        <div>
            <div className="min-w-[250px] max-w-[250px] min-h-[280px] max-h-[280px] m-[10px] rounded-2xl transition-all duration-300 hover:shadow-md" onClick={()=>{navigate(`/restaurant/${id}`)}}>
                <div className="hover:scale-95">
                    <div>
                        {aggregatedDiscountInfoV3 && <label className="absolute font-extrabold mt-[142px] rounded-b-2xl bg-gradient-to-t from-black to-transparent px-3 w-[250px]  text-white text-lg">{aggregatedDiscountInfoV3?.header + " " + aggregatedDiscountInfoV3?.subHeader}</label>}
                        <img
                            className="res-img rounded-2xl h-[170px] w-[100%] shadow-lg shadow-gray-100"
                            src={CDN_URL + cloudinaryImageId}
                            alt="Restaurant Image"
                        />
                    </div>

                    <div className="mx-[5%] flex flex-col mb-10">
                        <span className="font-bold text-lg text-gray-800">{name.length <= 20 ? name : `${name.slice(0, 20)}...`}</span>
                        <span className="text-md font-semibold text-gray-800 flex flex-row items-center">
                            <Rating rating={avgRating} />{sla.slaString}
                        </span>
                        <span className="text-md text-gray-500">{cuisines.join(", ").length <= 25 ? cuisines.join(", ") : `${cuisines.join(", ").slice(0, 25)}...`}</span>
                        <span className="text-md text-gray-500">{areaName}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard