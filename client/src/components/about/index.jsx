import Config from '@/configs/configs';
import './_about.scss';

const { SOURCE_CODE_URL } = Config;

const About = () => {
  return (
    <div className="about">
      <h1 className="about__title">
        Food Delivery App
        <span className="about__source-wrapper">
          <span className="about__highlight">(</span>
          <a href={SOURCE_CODE_URL} target="_blank" rel="noreferrer" className="about__source-link">
            View Source Code
          </a>
          <span className="about__highlight">)</span>
        </span>
      </h1>

      <h2 className="about__subtitle">Overview</h2>
      <p className="about__text">
        This project aims to develop a food delivery app that utilizes Swiggy&apos;s API to fetch data for restaurants
        and menu items. The app is built using React for the frontend and Node.js for the backend.
      </p>

      <h2 className="about__subtitle">Technology Stack</h2>
      <ul className="about__list">
        <li className="about__list-item">
          <b className="about__highlight">Frontend Core:</b> <span className="about__text--inline">ReactJS (Vite)</span>
        </li>
        <li className="about__list-item">
          <b className="about__highlight">State Management:</b>{' '}
          <span className="about__text--inline">Redux Toolkit</span>
        </li>
        <li className="about__list-item">
          <b className="about__highlight">Styling:</b>{' '}
          <span className="about__text--inline">SCSS (BEM Methodology)</span>
        </li>
        <li className="about__list-item">
          <b className="about__highlight">Backend:</b> <span className="about__text--inline">Node.js, Express</span>
        </li>
        <li className="about__list-item">
          <b className="about__highlight">API Integration:</b>{' '}
          <span className="about__text--inline">Swiggy API (Proxied)</span>
        </li>
      </ul>

      <h2 className="about__subtitle">Features</h2>
      <ul className="about__list">
        <li className="about__list-item">
          Browse and search for restaurants based on location, cuisine, or other filters.
        </li>
        <li className="about__list-item">
          View detailed restaurant information, including menu items, ratings, and reviews.
        </li>
        <li className="about__list-item">Add items to the cart to place orders efficiently via global state.</li>
      </ul>

      <h2 className="about__subtitle">Architecture</h2>
      <p className="about__text">
        The application follows a clean client-server architecture, completely decoupling the frontend interface from
        the proxy backend server.
      </p>

      <h3 className="about__section-title">Frontend (React + Redux)</h3>
      <p className="about__text">
        The frontend is built using React and bundled with Vite for maximum performance. Global state, like the shopping
        cart, is seamlessly managed via Redux Toolkit. All styles are crafted using SCSS following strict BEM (Block
        Element Modifier) architecture.
      </p>

      <h3 className="about__section-title">Backend (Node.js)</h3>
      <p className="about__text">
        The backend is developed using Node.js, a JavaScript runtime environment that allows running JavaScript on the
        server-side. It serves as the intermediary between the frontend and the Swiggy API, handling API requests and
        responses, as well as any additional business logic or data processing required.
      </p>

      <h3 className="about__section-title">API Integration (Swiggy API)</h3>
      <p className="about__text">
        The app integrates with Swiggy&apos;s API to fetch restaurant and menu data. The backend communicates with the
        Swiggy API, retrieves the necessary data, and serves it to the frontend as needed.
      </p>
    </div>
  );
};

export default About;
