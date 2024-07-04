import React, { useState } from 'react'
import { addItem, removeItem } from '../redux/cartSlice'
import { useDispatch } from 'react-redux'

const MenuItemButton = ({info}) => {
    const [quantity, setQuantity] = useState(0)
    const dispatch = useDispatch()

    const handleAdd = () => {
        setQuantity(quantity + 1)
        dispatch(addItem(info))
    }
    const handleSub = () => {
        setQuantity(quantity - 1)
        dispatch(removeItem(info))
    }
    
    if(!quantity) {return (
        <button className=" rounded-xl bg-white text-sm font-extrabold text-green-800 w-[70px] h-[40px]" onClick={() => handleAdd()}>ADD</button>
    ) }else {
        return(
            <div className=' rounded-xl bg-white text-sm font-extrabold text-green-800 flex flex-row items-center justify-between w-[70px] h-[40px]'>
                <button className='border-e-2 w-[30%] h-[100%] text-black text-start bg-green-400 pl-1 rounded-s-xl' onClick={() => handleAdd()}>+</button>
                <b className='text-black w-[40%] flex items-center justify-center text-center h-[100%]'>{quantity}</b>
                <button className='border-s-2 w-[30%] bg-red-400 text-black h-[100%] pr-1 rounded-e-xl' onClick={() => handleSub()}>-</button>
            </div>
        )
    }
}

export default MenuItemButton