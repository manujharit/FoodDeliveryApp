import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 Not Found!</h1>
      <p className="text-lg text-gray-800 mb-8">
        The page you are looking for does not exist.
      </p>
      <p className="text-sm text-gray-600 mb-4">
        You will be redirected to the home page in {countdown} seconds.
      </p>
    </div>
  );
};

export default Error;