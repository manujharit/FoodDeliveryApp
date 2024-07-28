import React from 'react';

const Location = () => {
  return (
    <label className="text-xs text-blue-800">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-map-pin"
        width="15"
        height="15"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    </label>
  );
};

export default Location;
