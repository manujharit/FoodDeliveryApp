import { useSelector, useDispatch } from "react-redux"
import { clearCart } from "../redux/cartSlice"
import { useDispatch } from "react-redux"
import CartItems from "./CartItems";
import CartRestaurant from "./CartRestaurant";

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="my-[5%] mx-[25%] min-h-screen">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-2xl font-bold">Cart</h1>
                <button className="bg-red-500 text-white my-4 px-4 py-2 rounded-md" onClick={() => dispatch(clearCart())}>Clear</button>
            </div>
            {Object.keys(cart.restaurants).length === 0 ? (
                <h1>No items in cart</h1>
            ) : (
                Object.entries(cart.restaurants).map(([restaurantId, restaurantData], index) => (
                    <CartRestaurant key={index} restaurantId={restaurantId} restaurantData={restaurantData} />
                ))
            )}
            <div className="my-4 px-6 flex flex-row justify-between items-center text-xl font-bold">
                <span>TO PAY</span>
                <span>₹{cart.totalAmount} /-</span>
            </div>
        </div>
    )
}

export default Cart