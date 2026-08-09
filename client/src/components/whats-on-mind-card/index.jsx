import Config from '@/configs/configs';
import { parseParamsAndReturnPath } from '@/utils/utils';
import { Link } from 'react-router';
import './_whats-on-mind-card.scss';

const { CDN_URL } = Config;

const WhatsOnMindCard = ({ data, isSmall = false }) => {
  const path = parseParamsAndReturnPath(data.action.link, data?.accessibility?.altText);

  return (
    <div className={`whats-on-mind-card ${isSmall ? 'whats-on-mind-card--small' : 'whats-on-mind-card--large'}`}>
      <Link to={path}>
        <img src={CDN_URL + data.imageId} className="whats-on-mind-card__image" />
      </Link>
    </div>
  );
};

export default WhatsOnMindCard;
