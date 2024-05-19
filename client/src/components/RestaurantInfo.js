import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import Location from './Location'

const RestaurantInfo = ({ data }) => {
    const { name, cuisines, areaName, avgRatingString, totalRatingsString, sla, costForTwoMessage } = data
    console.log(sla)
    return (
        <div className='flex flex-col'>
            <p className='text-gray-500'><Link to="/" className='text-xs text-gray-500 hover:text-gray-700 hover:underline'>Home</Link> {" > "} <label className='text-xs text-gray-500 hover:text-gray-700 hover:underline'>{name}</label></p>
            <label className='text-3xl font-bold text-black mt-[1%]'>{name}</label>
            <div className=' border-b-2 rounded-b-3xl h-60 bg-gradient-to-t from-gray-300 to-white'>
                <div className='bg-white border rounded-3xl w-[95%] h-[85%] m-[2.5%] '>
                    <div className='p-[2%]'>
                        <label className='font-semibold flex flex-row'><Rating rating={avgRatingString + ' (' + totalRatingsString + ')'} /> {costForTwoMessage}</label>
                        <label>{cuisines.map((cuisine, index) => <label>&nbsp;<label className='text-orange-500 underline'>{cuisine}{index !== (cuisines.length - 1) ? "," : ''}</label>&nbsp;</label>)}</label>
                        <div className='flex flex-row ml-[1%]'>
                            <div className='flex flex-col font-extrabold text-sm text-gray-400'>
                                <label>&#183;</label>
                                <label>|</label>
                                <label>&#183;</label>
                            </div>
                            <div className=' flex flex-col ml-[2%]'>
                                <label><label className="text-xs font-bold">Outlet:</label> <label className="text-sm font-semibold">{areaName}</label></label>
                                <label className='text-xs font-bold mt-[15%]'>{sla.slaString}</label>
                            </div>
                        </div>
                    </div>
                    <div className='border-t-2 py-[1%] px-[2%] mt-[3%] w-[100%] flex flex-row justify-start'>
                        <Location />
                        <label className='pl-[1%] font-semibold text-sm text-gray-500'>{sla.lastMileTravelString}</label>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default RestaurantInfo