import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Outlet, useLocation } from 'react-router';
import { Provider } from 'react-redux';
import appStore from '@/redux/appStore';
import { useEffect } from 'react';
import './_app.scss';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Provider store={appStore}>
      <div className="container">
        <Navbar />
        <main className="main-content">
          <div className="outlet-wrapper">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
