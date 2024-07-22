import { useState } from "react"
import { useDispatch } from "react-redux"

const CartItemButton = ({ info, handleUpdateQuantity }) => {

    return (
        <div className=' border-2 border-green-400 bg-white text-sm font-extrabold text-green-800 flex flex-row items-center justify-between w-[80px] h-[30px]'>
            <button className='flex justify-center items-center  w-[30%] h-[100%] text-green-500 text-start  pl-1' onClick={() => handleUpdateQuantity(info.quantity + 1)}>+</button>
            <b className='flex justify-center items-center  text-black w-[40%]  text-center h-[100%]'>{info.quantity}</b>
            <button className='flex justify-center items-center  w-[30%] text-green-500 h-[100%] pr-1' onClick={() => handleUpdateQuantity(info.quantity - 1)}>-</button>
        </div>
    )
}

export default CartItemButton