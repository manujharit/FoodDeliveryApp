import { useDispatch } from "react-redux";
import CartItemButton from "./CartItemButton";
import { removeItem, updateQuantity } from "../redux/cartSlice";

const CartItems = ({ info, restaurantId }) => {
    const dispatch = useDispatch();

    const handleRemoveItem = () => {
        dispatch(removeItem({ restaurantId, itemId: info.id }));
    };

    const handleUpdateQuantity = (newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveItem();
        } else {
            dispatch(updateQuantity({ restaurantId, itemId: info.id, quantity: newQuantity }));
        }
    };

    return (
        <div className="p-4 shadow drop-shadow-lg flex flex-row h-24">

            <div className="flex flex-col  px-2 w-[1000px]">
                <span className="font-bold text-lg">{info.name}</span>
                <span className="text-md font-semibold">₹ {(info.price / 100 || info.defaultPrice / 100)*info.quantity}/-</span>
            </div>
            <div className="flex justify-center items-center">
                <CartItemButton info={info} handleUpdateQuantity={handleUpdateQuantity}/>
                <button className="mx-4 bg-red-600 px-2 py-1 text-xs text-white rounded-md" onClick={handleRemoveItem}>Remove</button>
            </div>
        </div>
    )
}

export default CartItems;