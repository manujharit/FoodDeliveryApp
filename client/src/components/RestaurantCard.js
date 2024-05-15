import Config from "../configs/configs"
import Rating from "./Rating"
const { CDN_URL } = Config

const RestaurantCard = ({ data }) => {
    // console.log(data)
    const { cloudinaryImageId, name, cuisines, avgRating, sla, aggregatedDiscountInfoV3, areaName } = data
    // console.log(aggregatedDiscountInfoV3?.header)
    console.log(data)
    return (
        <div>

            <div className="min-w-[250px] max-w-[250px] min-h-[250px] max-h-[250px] m-[10px] rounded-xl transition-all duration-300 hover:shadow-md">
                <div className="hover:scale-95">
                    <div>
                        {aggregatedDiscountInfoV3 && <label className="absolute font-extrabold mt-[122px] rounded-b-xl bg-gradient-to-t from-black to-transparent px-3 w-[250px]  text-white text-lg">{aggregatedDiscountInfoV3?.header + " " + aggregatedDiscountInfoV3?.subHeader}</label>}
                        <img
                            className="res-img rounded-xl h-[150px] w-[100%] shadow-md bg-gradient-to-t from-black to-white"
                            src={CDN_URL + cloudinaryImageId}
                            alt="Restaurant Image"
                        />
                    </div>

                    <div className="mx-[5%] flex flex-col">
                        <span className="font-bold text-lg text-gray-800">{name.length <= 20 ? name : `${name.slice(0, 20)}...`}</span>
                        <span className="text-md font-semibold text-gray-800 flex flex-row items-center">
                            <Rating rating={avgRating}/>{sla.slaString}
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