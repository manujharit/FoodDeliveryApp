import { useState } from 'react';
import ExploreCards from '@/components/explore-cards';

const ExploreSection = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayData = isExpanded ? data.brands : data.brands.slice(0, 5);
  const hasMore = data.brands.length > 5 && !isExpanded;

  return (
    <div className="mt-[5%] w-[100%] ">
      <label className="text-2xl font-bold text-black">{data.title}</label>
      <div className="flex mt-[2%] items-center  text-center flex-wrap">
        {displayData.map((brand, index) => (
          <ExploreCards key={index} data={brand} />
        ))}
        {hasMore && (
          <div
            className=" w-[30%] mx-[1.6%] my-[2%]"
            onClick={() => setIsExpanded(true)}
          >
            <label className="relative border flex justify-center items-center h-[50px] w-full text-md shadow font-semibold text-gray-600 hover:text-orange-500 hover:border-orange-500 transition-colors cursor-pointer px-4 text-center">
              <span className="leading-none">Show More</span>
              <span className="material-symbols-outlined text-lg absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                expand_more
              </span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreSection;
