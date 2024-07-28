import { useState, useEffect } from 'react';

const useUrlParams = () => {
  const [params, setParams] = useState({});

  useEffect(() => {
    const parseParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const paramsObject = {};
      
      for (const [key, value] of searchParams.entries()) {
        paramsObject[key] = value;
      }
      
      setParams(paramsObject);
    };

    parseParams();

    window.addEventListener('popstate', parseParams);

    return () => {
      window.removeEventListener('popstate', parseParams);
    };
  }, []);

  return params;
};

export default useUrlParams;