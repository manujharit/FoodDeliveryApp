import CartItems from './CartItems'
import Config from '../configs/configs'
const { CDN_URL } = Config

const CartRestaurant = ({ restaurantId, restaurantData }) => {

    return (
        <div className="border mt-4 border-gray-300" key={restaurantId}>
            <button className='px-4 py-2 w-full drop-shadow-lg bg-gray-200 flex flex-row items-start'>
                <div>
                    <img src={CDN_URL + restaurantData.info.cloudinaryImageId} className="w-[60px] h-[50px] rounded-xl shadow-md" alt="Food Item" />
                </div>
                <div className='flex flex-col items-center justify-start ml-4'>
                    <span className='font-bold text-lg'>
                        {restaurantData.info.name}
                    </span>
                    <span className=' text-xs text-black font-semibold'>
                        {restaurantData.info.areaName}
                    </span>
                </div>
            </button>
            {(Object.values(restaurantData.items).map((item, index) => (
                <CartItems key={index} info={item} restaurantId={restaurantId} />
            )))}
        </div>
    )
}

export default CartRestaurant