import './_rating.scss';

const Rating = ({ rating }) => {
  return (
    <span className="rating">
      <span className="material-symbols-outlined rating__icon">star</span>{' '}
      &nbsp;{rating}&nbsp;<b>&#183;</b>&nbsp;
    </span>
  );
};

export default Rating;
