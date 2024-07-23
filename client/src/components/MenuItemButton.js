import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem, removeItem, updateQuantity } from '../redux/cartSlice'

const MenuItemButton = ({ info, onAddItem, onSubItem }) => {
    const [quantity, setQuantity] = useState(0)
    const dispatch = useDispatch()

    const handleAdd = () => {
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
        onAddItem(info)
    }
    const handleSub = () => {
        const newQuantity = quantity - 1
        setQuantity(newQuantity)
        onSubItem(info, newQuantity)
    }

    if (!quantity) {
        return (
            <button className=" rounded-xl bg-white text-sm font-extrabold text-green-800 w-[70px] h-[40px]" onClick={handleAdd}>ADD</button>
        )
    } else {
        return (
            <div className=' rounded-xl bg-white border-green-500 text-sm font-extrabold text-green-800 flex flex-row items-center justify-between w-[70px] h-[40px]'>
                <button className='flex items-center justify-center w-[30%] h-[100%] text-green-600 text-start  pl-1 rounded-s-xl' onClick={handleAdd}>+</button>
                <b className='text-black w-[40%] flex items-center justify-center text-center h-[100%]'>{quantity}</b>
                <button className='flex items-center justify-center w-[30%] text-green-600  h-[100%] pr-1 rounded-e-xl' onClick={handleSub}>-</button>
            </div>
        )
    }
}

export default MenuItemButton