import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Outlet, useLocation } from 'react-router';
import { Provider } from 'react-redux';
import appStore from '@/redux/appStore';
import { useEffect } from 'react';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Provider store={appStore}>
      <div className="">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
