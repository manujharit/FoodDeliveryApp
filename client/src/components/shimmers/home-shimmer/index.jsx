import CardShimmer from '@/components/shimmers/card-shimmer';

const HomeShimmer = () => {
  return (
    <div className="mt-[25%] md:mt-[10%] lg:mt-[7%] mx-[5%] lg:mx-[13.5%] ">
      <div className="mt-[3%] w-[100%] bg-slate-800 h-[30%] py-[10%]">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-gray-300 rounded-full animate-spin border-t-transparent"></div>
          <p className="mt-4 text-lg lg:text-2xl font-bold text-gray-300">
            Looking for great food near you ...
          </p>
        </div>
      </div>
      <div className="mt-[10%] w-[100%]">
        <div className="flex overflow-x-hidden pt-[5%]">
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
  );
};

export default HomeShimmer;
