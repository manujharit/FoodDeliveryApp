import { useRouteError, Link } from 'react-router';
import ovenImage from '../../../assets/oven_power_cut.png';

const ErrorBoundary = () => {
  const error = useRouteError();

  const isNoDataError = error?.message?.includes('No data');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-transparent py-20 px-8">
      <img src={ovenImage} alt="Oven power cut" className="w-64 h-64 mb-6" />
      <h1 className="text-4xl font-extrabold text-gray-800 mb-3 tracking-tight">
        {isNoDataError ? 'Uh-oh!' : 'Oops! Something went wrong.'}
      </h1>
      <p className="text-lg text-gray-500 mb-8 text-center max-w-md">
        {error?.message ||
          "We couldn't fetch the data for this page. Please try again later."}
      </p>
      <Link
        to="/"
        className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorBoundary;
