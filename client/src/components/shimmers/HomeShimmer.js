import React from 'react'
import CardShimmer from './CardShimmer'
import WhatsOnMindCardShimmer from './WhatsOnMindCardShimmer'

const HomeShimmer = () => {
  return (
    <div className="mt-[7%] mx-[13%]">
      <div className="mt-[3%] w-[100%]">
        <div className="flex overflow-x-hidden pt-[4%]" >
          <div
            className="flex transition-transform duration-500 "
            style={{ transform: `translateX(-100 %)` }}
          >
            <WhatsOnMindCardShimmer />
            <WhatsOnMindCardShimmer />
            <WhatsOnMindCardShimmer />
            <WhatsOnMindCardShimmer />
            <WhatsOnMindCardShimmer />
            <WhatsOnMindCardShimmer />
            <WhatsOnMindCardShimmer />
            <WhatsOnMindCardShimmer />
            <WhatsOnMindCardShimmer />
            <WhatsOnMindCardShimmer />
            <WhatsOnMindCardShimmer />
            <WhatsOnMindCardShimmer />
          </div>
        </div>
      </div>
      <div className="mt-[10%] w-[100%]">
        <div className="flex overflow-x-hidden pt-[5%]" >
          <div
            className="flex transition-transform duration-500 "
            style={{ transform: `translateX(-100 %)` }}
          >
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeShimmer