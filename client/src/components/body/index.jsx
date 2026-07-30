import HomeShimmer from '@/components/shimmers/home-shimmer';
import RestaurantCard from '@/components/restaurant-card';
import WhatsOnMindCard from '@/components/whats-on-mind-card';
import Carousal from '@/components/carousel';
import RestaurantList from '@/components/restaurant-list';
import Explore from '@/components/explore';
import Separator from '@/components/separator';
import useRestaurantData from '@/hooks/useRestaurantData';
import './_body.scss';

const Body = () => {
  const resData = useRestaurantData();

  if (!resData || !Object.keys(resData).length) {
    return <HomeShimmer />;
  }

  return (
    <div className="body">
      {resData['whats_on_your_mind'] && (
        <>
          <Carousal
            cardTitle={"What's on your mind?"}
            data={resData['whats_on_your_mind']}
            card={WhatsOnMindCard}
            index={2}
            scrollIndex={1}
          />
          <Separator />
        </>
      )}
      {resData['top_brands_for_you'] && (
        <>
          <Carousal
            cardTitle={'Top restaurant chains'}
            data={resData['top_brands_for_you']}
            card={RestaurantCard}
            index={1}
            scrollIndex={0}
          />
          <Separator />
        </>
      )}
      {resData['restaurant_grid_listing'] && (
        <RestaurantList data={resData['restaurant_grid_listing']} />
      )}
      {resData['restaurant_near_me_links'] && (
        <Explore data={resData['restaurant_near_me_links']} />
      )}
    </div>
  );
};

export default Body;
