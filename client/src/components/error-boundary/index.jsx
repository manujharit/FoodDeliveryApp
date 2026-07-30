import { useRouteError, Link } from 'react-router';
import ovenImage from '../../../assets/oven_power_cut.png';
import './_error-boundary.scss';

const ErrorBoundary = () => {
  const error = useRouteError();
  const isNoDataError = error?.message?.includes('No data');

  return (
    <div className="error-boundary">
      <img
        src={ovenImage}
        alt="Oven power cut"
        className="error-boundary__image"
      />
      <h1 className="error-boundary__title">
        {isNoDataError ? 'Uh-oh!' : 'Oops! Something went wrong.'}
      </h1>
      <p className="error-boundary__message">
        {error?.message ||
          "We couldn't fetch the data for this page. Please try again later."}
      </p>
      <Link to="/" className="error-boundary__link">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorBoundary;
