import ExploreSection from '@/components/explore-section';

const Explore = ({ data }) => {
  return (
    <div className="my-[7%] flex-col">
      {data.map((data, index) => (
        <ExploreSection key={index} data={data} />
      ))}
    </div>
  );
};

export default Explore;
