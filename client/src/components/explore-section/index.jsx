import { useState } from 'react';
import ExploreCards from '@/components/explore-cards';
import './_explore-section.scss';

const ExploreSection = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayData = isExpanded ? data.brands : data.brands.slice(0, 5);
  const hasMore = data.brands.length > 5 && !isExpanded;

  return (
    <div className="explore-section">
      <label className="explore-section__title">{data.title}</label>
      <div className="explore-section__content">
        {displayData.map((brand, index) => (
          <ExploreCards key={index} data={brand} />
        ))}
        {hasMore && (
          <div className="explore-section__show-more-wrapper" onClick={() => setIsExpanded(true)}>
            <label className="explore-section__show-more-btn">
              <span className="explore-section__show-more-text">Show More</span>
              <span className="material-symbols-outlined explore-section__show-more-icon">expand_more</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreSection;
