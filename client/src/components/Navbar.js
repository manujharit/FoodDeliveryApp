import React, { useState, useRef, useEffect } from 'react';
import BrandLogo from '../../assets/BrandLogo.png';
import { Link } from 'react-router-dom';
import useLocationData from '../hooks/useLocationData';
import { useSelector } from 'react-redux';

const Navbar = () => {
  useLocationData();
  const [showSearch, setShowSearch] = useState(false)
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
    <div className=" fixed flex flex-row justify-between items-center px-[20%]  z-50 bg-white top-0 w-[100%] h-[9%] shadow-md shadow-gray-200">
      <div className=" flex flex-row justify-center items-center w-[20%]">
        <Link to="/">
          <img src={BrandLogo} className="w-[30%] hover:scale-95" />
        </Link>
      </div>
      <div className="flex flex-col w-[50%] h-[40%]">
        <div className="flex flex-row min-w-[100%]">
          <input
            ref={inputRef}
            type="text"
            className="border rounded-s-lg border-solid border-gray-400 w-[90%] bg-gray-200 px-[5%] transition-all duration-300 ease-in-out transform "
            placeholder={'Search for Restaurants'}
            onChange={(e) => setShowSearch(e.target.value !== '')}
          />
          <button className="border flex border-gray-600 items-center justify-center bg-gradient-to-r from-orange-400 to-red-400 rounded-e-md w-[10%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M18.79 17.38l-3.39-3.39a6.5 6.5 0 1 0-1.41 1.41l3.39 3.39a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41zM5.5 11a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0z"
              />
            </svg>
          </button>
        </div>
        {
          showSearch ? (
            <div className={`absolute relative top-0 left-0 w-[100%] bg-white border drop-shadow-lg rounded-lg flex flex-col justify-center items-center text-lg text-semibold text-orange-600 transition-all duration-100 ease-in-out min-h-48 overflow-hidden animate-slide-down`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="orange"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-2"
              >
                <path d="M12 2L2 22h20L12 2z" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
                <rect x="8" y="20" width="8" height="2" fill="orange" />
              </svg>
              <text x="50%" y="70" textAnchor="middle" fill="orange" fontSize="12" fontWeight="bold">Under Development!!!</text>
            </div>
          ) : ''
        }
      </div>
      <div className="flex flex-row justify-between text-center items-center w-[25%] px-[2%]">
        <label className="text-md font-semibold text-gray-600 hover:text-orange-400">
          <Link to="/">Home</Link>
        </label>
        <label className="text-md font-semibold text-gray-600 hover:text-orange-400">
          <Link to="/about">About</Link>
        </label>
        <label className="text-md font-semibold text-gray-600 hover:text-orange-400">
          <Link className="flex flex-row items-center" to="/cart">
            <span className="mr-1">Cart</span>
            <svg height="20" width="20" viewBox="0 0 491.2 491.2" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFA300" d="M472.9,463.2l-29.6-444C441.7,8,433.7,0,423.3,0H68.1c-10.4,0-18.4,8-20,19.2L17.7,465.6c-0.8,6.4,0.8,12.8,4.8,17.6c4,4.8,9.6,8,15.2,8h416c11.2,0,20-10.4,20-22.4C473.7,466.4,473.7,464.8,472.9,463.2z" />
            <path fill="#FF8500" d="M453.7,491.2c11.2,0,20-10.4,20-22.4c0-2.4,0-4-0.8-5.6l-29.6-444C441.7,8,433.7,0,423.3,0H68.1c-10.4,0-18.4,8-20,19.2" />
            <path fill="#FF8500" d="M245.7,260c-79.2,0-143.2-98.4-143.2-177.6c0-8,6.4-14.4,14.4-14.4s14.4,6.4,14.4,14.4c0,63.2,51.2,114.4,114.4,114.4s114.4-51.2,114.4-114.4c0-8,6.4-14.4,14.4-14.4s14.4,6.4,14.4,14.4C388.9,160.8,324.9,260,245.7,260z" />
            <g>
              <path fill="#FF7300" d="M131.3,82.4c0-8-6.4-14.4-14.4-14.4s-14.4,6.4-14.4,14.4v0.8l37.6,44C134.5,113.6,131.3,98.4,131.3,82.4z" />
              <path fill="#FF7300" d="M388.9,82.4c0-8-6.4-14.4-14.4-14.4s-14.4,6.4-14.4,14.4c0,63.2-51.2,114.4-114.4,114.4c-22.4,0-43.2-6.4-60.8-17.6l68.8,80C328.9,252.8,388.9,158.4,388.9,82.4z" />
            </g>
            <path fill="#AFF9F9" d="M245.7,224.8c-79.2,0-143.2-64-143.2-143.2c0-8,6.4-14.4,14.4-14.4s14.4,6.4,14.4,14.4c0,63.2,51.2,114.4,114.4,114.4s114.4-51.2,114.4-114.4c0-8,6.4-14.4,14.4-14.4s14.4,6.4,14.4,14.4C388.9,160.8,324.9,224.8,245.7,224.8z" />
            <g>
              <path fill="#7CECF2" d="M374.5,68c-8,0-14.4,6.4-14.4,14.4c0,46.4-28,86.4-68,104c48.8-16.8,85.6-59.2,94.4-112C384.1,70.4,379.3,68,374.5,68z" />
              <path fill="#7CECF2" d="M131.3,82.4c0-8-6.4-14.4-14.4-14.4c-5.6,0-9.6,3.2-12,7.2c8.8,52,45.6,94.4,94.4,112C159.3,168.8,131.3,128.8,131.3,82.4z" />
              
            </g>
            <g>
            <text
                  x="241.55"
                  y="450"
                  textAnchor="middle"
                  fill="white"
                  fontSize="250"
                >
                  {qty}
                </text>
            </g>
            <path fill="#FF7300" d="M17.7,465.6c-0.8,6.4,0.8,12.8,4.8,17.6c4,4.8,9.6,8,15.2,8h416c11.2,0,20-10.4,20-22.4c0-2.4,0-4-0.8-5.6" />
          </svg>
          </Link>
        </label>
      </div>
    </div>
  );
};

export default Navbar;