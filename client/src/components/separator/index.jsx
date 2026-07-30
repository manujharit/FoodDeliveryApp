import React from 'react';
import './_separator.scss';

const Separator = ({ className = '' }) => {
  return <hr className={`separator ${className}`} />;
};

export default Separator;
