import React from 'react';

const CardShimmer = () => {
  return (
    <div>
      <div className="min-w-[250px] max-w-[250px] min-h-[270px] max-h-[270px] m-[10px] rounded-2xl transition-all duration-300">
        <div className="res-img rounded-2xl h-[180px] w-[100%] bg-gray-50"></div>
      </div>
    </div>
  );
};

export default CardShimmer;
