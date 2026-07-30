import './_explore-cards.scss';

const ExploreCards = ({ data }) => {
  return (
    <a
      href={data.link}
      target="_blank"
      className="explore-card"
      rel="noreferrer"
    >
      {data.text}
    </a>
  );
};

export default ExploreCards;
