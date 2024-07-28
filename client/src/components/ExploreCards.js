import React from 'react';

const ExploreCards = ({ data }) => {
  return (
    <a
      href={data.link}
      target="_blank"
      className="border flex justify-center items-center h-[50px] w-[30%] mx-[1.6%] my-[2%] text-md shadow font-semibold text-gray-600"
      rel="noreferrer"
    >
      {data.text}
    </a>
  );
};

export default ExploreCards;
