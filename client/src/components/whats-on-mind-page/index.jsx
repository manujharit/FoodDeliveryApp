import { useParams } from 'react-router';
import RestaurantByTags from '@/components/restaurants-by-tags';
import './_whats-on-mind-page.scss';

const WhatsOnMindPage = () => {
  const params = useParams();
  const { collection_id } = params;
  let { title, tags, type } = params;

  title = decodeURIComponent(title);
  tags = tags === 'none' ? '' : tags;
  type = type === 'none' ? '' : type;

  const apiParams = { collection_id, tags, type, title };

  return (
    <div className="whats-on-mind-page">
      <label className="whats-on-mind-page__title">{title}</label>
      <RestaurantByTags params={apiParams} />
    </div>
  );
};

export default WhatsOnMindPage;
