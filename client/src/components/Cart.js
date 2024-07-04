import { useSelector } from "react-redux"
import { clearCart } from "../redux/cartSlice"
import { useDispatch } from "react-redux"
import ItemList from "./ItemList";


const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);

    const dispatch = useDispatch();
    return (
        <div className="my-[5%] mx-[25%] h-screen">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-2xl font-bold">Cart</h1>
                <button className="bg-red-500 text-white my-4 px-4 py-2 rounded-md" onClick={() => dispatch(clearCart())}>Clear</button>
            </div>
            {cartItems.length === 0 ? <h1>No items in cart</h1> :
                cartItems.map((item, index) => (
                    <ItemList key={index} info={item} />
                ))}
        </div>
    )
}

export default Cart