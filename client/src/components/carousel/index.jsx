import { useState, useRef, useEffect } from 'react';
import './_carousel.scss';

const Carousal = ({ cardTitle, data, card, index, scrollIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = (direction) => {
    const maxIndex = data.length - index * 1 + scrollIndex;

    if (direction === 'left') {
      setCurrentIndex((prevIndex) =>
        prevIndex <= 0 ? maxIndex : prevIndex - 1 <= 0 ? 0 : prevIndex - 1
      );
    } else {
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex
          ? 0
          : prevIndex + 1 >= maxIndex
            ? maxIndex
            : prevIndex + 1
      );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const maxIndex = data.length - index * 1 + scrollIndex;
      setCurrentIndex(Math.min(currentIndex, maxIndex));
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, data.length, index, scrollIndex]);

  return (
    <div className="carousel" ref={carouselRef}>
      {cardTitle ? (
        <label className="carousel__title">{cardTitle}</label>
      ) : null}
      <div className="carousel__viewport">
        <div
          className="carousel__track"
          style={{
            transform: `translateX(-${currentIndex * (100 / data.length)}%)`,
          }}
        >
          {data.map((item, idx) => (
            <div key={idx}>{card({ data: item })}</div>
          ))}
        </div>
      </div>
      <div className="carousel__controls">
        <button
          onClick={() => handleScroll('left')}
          className="carousel__nav-button carousel__nav-button--prev"
        >
          <span className="material-symbols-outlined carousel__nav-icon">
            chevron_left
          </span>
        </button>
        <button
          onClick={() => handleScroll('right')}
          className="carousel__nav-button carousel__nav-button--next"
        >
          <span className="material-symbols-outlined carousel__nav-icon">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousal;
