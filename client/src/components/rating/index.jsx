const Rating = ({ rating }) => {
  return (
    <span className="flex flex-row items-center">
      <span
        className="material-symbols-outlined text-[20px] text-green-600 fill-current"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        star
      </span>{' '}
      &nbsp;{rating}&nbsp;<b>&#183;</b>&nbsp;
    </span>
  );
};

export default Rating;
