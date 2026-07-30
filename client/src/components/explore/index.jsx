import ExploreSection from '@/components/explore-section';
import './_explore.scss';

const Explore = ({ data }) => {
  return (
    <div className="explore">
      {data.map((data, index) => (
        <ExploreSection key={index} data={data} />
      ))}
    </div>
  );
};

export default Explore;
