import React, { useState, useRef, useEffect } from 'react';

const Carousal = ({ cardTitle, data, card, index, scrollIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = (direction) => {
    const containerWidth = carouselRef.current.offsetWidth;
    const cardWidth = carouselRef.current.firstChild.offsetWidth;
    const maxIndex =
      data.length -
      index * Math.floor(containerWidth / cardWidth) +
      scrollIndex;

    if (direction === 'left') {
      setCurrentIndex((prevIndex) =>
        prevIndex <= 0 ? maxIndex : prevIndex - 3 <= 0 ? 0 : prevIndex - 3
      );
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex
          ? 0
          : prevIndex + 3 >= maxIndex
            ? maxIndex
            : prevIndex + 3
      );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = carouselRef.current.offsetWidth;
      const cardWidth = carouselRef.current.firstChild.offsetWidth;
      const maxIndex =
        data.length -
        index * Math.floor(containerWidth / cardWidth) +
        scrollIndex;
      setCurrentIndex(Math.min(currentIndex, maxIndex));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, data.length]);

  return (
    <div className="mt-[3%] w-[100%]" ref={carouselRef}>
      <label className="text-2xl font-bold mb-6">{cardTitle}</label>

      <div className="flex overflow-x-hidden pt-[3%]">
        <div
          className="flex transition-transform duration-500 "
          style={{
            transform: `translateX(-${currentIndex * (100 / data.length)}%)`,
          }}
        >
          {data.map((data, index) => (
            <div key={index}>{card({ data })}</div>
          ))}
        </div>
      </div>
      <button
        onClick={() => handleScroll('left')}
        className="relative left-[45%] mt-[2%] h-8 w-8 transform -translate-y-1/2 bg-orange-500 text-xl text-white rounded-full p-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>
      <button
        onClick={() => handleScroll('right')}
        className="relative left-[48%] mt-[2%] h-8 w-8 transform -translate-y-1/2 bg-orange-500 text-xl text-white rounded-full p-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Carousal;
