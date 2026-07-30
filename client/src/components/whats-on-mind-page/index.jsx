import useUrlParams from '@/hooks/useUrlParams';
import RestaurantByTags from '@/components/restaurants-by-tags';
import './_whats-on-mind-page.scss';

const WhatsOnMindPage = () => {
  const params = useUrlParams();
  const { title } = params;

  return (
    <div className="whats-on-mind-page">
      <label className="whats-on-mind-page__title">{title}</label>
      <RestaurantByTags params={params} />
    </div>
  );
};

export default WhatsOnMindPage;
