import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/app';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Loading from '@/components/loading';
import Body from '@/components/body';
import WhatsOnMindPage from '@/components/whats-on-mind-page';
import ErrorBoundary from '@/components/error-boundary';
const About = lazy(() => import('./src/components/about'));
const Cart = lazy(() => import('./src/components/cart'));
const RestaurantMenu = lazy(() => import('./src/components/restaurant-menu'));

const root = ReactDOM.createRoot(document.getElementById('root'));

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: '/',
            element: <Body />,
          },
          {
            path: '/about',
            element: (
              <Suspense fallback={<Loading />}>
                <About />
              </Suspense>
            ),
          },
          {
            path: '/cart',
            element: (
              <Suspense fallback={<Loading />}>
                <Cart />
              </Suspense>
            ),
          },
          {
            path: '/restaurant/:id',
            element: (
              <Suspense fallback={<Loading />}>
                <RestaurantMenu />
              </Suspense>
            ),
          },
          {
            path: '/whatsonmind/',
            element: (
              <Suspense fallback={<Loading />}>
                <WhatsOnMindPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
