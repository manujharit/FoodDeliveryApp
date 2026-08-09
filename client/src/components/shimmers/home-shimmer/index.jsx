import CardShimmer from '@/components/shimmers/card-shimmer';
import './_home-shimmer.scss';

const HomeShimmer = () => {
  return (
    <div className="home-shimmer">
      <div className="home-shimmer__banner">
        <div className="home-shimmer__spinner-wrapper">
          <div className="home-shimmer__spinner"></div>
          <p className="home-shimmer__text">Looking for great food near you ...</p>
        </div>
      </div>
      <div className="home-shimmer__cards">
        <div className="home-shimmer__viewport">
          <div className="home-shimmer__track" style={{ transform: `translateX(-100%)` }}>
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
