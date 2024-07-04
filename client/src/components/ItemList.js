import Config from "../configs/configs"
import MenuItemButton from "./MenuItemButton"

const { CDN_URL } = Config


const ItemList = ({ info }) => {


    return (
        <div className=" p-4 shadow drop-shadow-lg flex flex-row h-44">
            <div className="flex flex-col px-2 w-[1000px]">
                <span className="font-bold text-lg">{info.name}</span>
                <span className="text-md font-semibold">₹ {info.price / 100 || info.defaultPrice / 100}/-</span>
                <p className="text-sm text-gray-400">{info.description}</p>
            </div>
            <div className="flex justify-center">
                <div className="absolute mt-[110px]">
                    <MenuItemButton info={info} />
                </div>
                <img src={CDN_URL + info.imageId} className="w-[250px] h-[120px] rounded-xl shadow-md" alt="Food Item" />
            </div>
        </div>
    )
}

export default ItemList