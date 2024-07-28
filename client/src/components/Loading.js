import React from 'react';
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-800 rounded-full animate-spin border-t-transparent"></div>
      <p className="mt-4 text-lg font-bold text-gray-800">Loading</p>
    </div>
  );
};

export default Loading;
