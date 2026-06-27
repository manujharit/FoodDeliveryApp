import React, { useState, useRef, useEffect } from 'react';
import BrandLogo from '../../../assets/BrandLogo.png';
import { Link } from 'react-router';
import useLocationData from '@/hooks/useLocationData';
import { useSelector } from 'react-redux';

const Navbar = () => {
  useLocationData();
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const qty = useSelector((state) => state.cart.totalQuantity);

  return (
    <div className=" fixed flex flex-row justify-between items-center px-[2%] md:px-[10%] xl:px-[20%]  z-50 bg-white top-0 w-[100%] h-[7%] shadow-md shadow-gray-200">
      <div className=" flex flex-row justify-center items-center w-[20%]">
        <Link to="/">
          <img
            src={BrandLogo}
            className="sm:w-[100%] md:w-[50%] xl:w-[30%] hover:scale-95"
          />
        </Link>
      </div>
      <div className="flex flex-col w-[50%] h-[40%]">
        <div className="flex flex-row min-w-[100%]">
          <input
            ref={inputRef}
            type="text"
            className="border rounded-s-lg border-solid border-gray-400 w-[90%] bg-gray-200 px-[5%] transition-all duration-300 ease-in-out transform text-[70%] lg:text-[100%]"
            placeholder={'Search for Restaurants'}
            onChange={(e) => setShowSearch(e.target.value !== '')}
          />
          <button className="border flex border-gray-600 items-center justify-center bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 transition-colors rounded-e-md w-[10%]">
            <span className="material-symbols-outlined text-white">search</span>
          </button>
        </div>
        {showSearch ? (
          <div
            className={`absolute relative top-0 left-0 w-[100%] bg-white border drop-shadow-lg rounded-lg flex flex-col justify-center items-center text-lg text-semibold text-orange-600 transition-all duration-100 ease-in-out min-h-48 overflow-hidden animate-slide-down`}
          >
            <span className="material-symbols-outlined text-[50px] mb-2 text-orange-500">
              construction
            </span>
            <text
              x="50%"
              y="70"
              textAnchor="middle"
              fill="orange"
              fontSize="12"
              fontWeight="bold"
            >
              Under Development!!!
            </text>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="flex flex-row justify-between text-center items-center lg:w-[25%] px-[2%]">
        <label className="hidden lg:flex text-md font-semibold text-gray-600 hover:text-orange-400">
          <Link to="/">Home</Link>
        </label>
        <label className="hidden lg:flex text-md font-semibold text-gray-600 hover:text-orange-400">
          <Link to="/about">About</Link>
        </label>
        <label className="text-md font-semibold text-gray-600 hover:text-orange-400">
          <Link className="flex flex-row items-center" to="/cart">
            <span className="mr-1">Cart</span>
            <div className="relative inline-flex items-center">
              <span className="material-symbols-outlined text-3xl">
                shopping_cart
              </span>
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {qty}
              </span>
            </div>
          </Link>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
