import React from 'react';
import ReactDOM from 'react-dom/client'
import App from "./src/app"
// import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RestaurantMenu from "./src/components/RestaurantMenu"
import Body from './src/components/Body';
// import Loading from './src/components/Loading';
import Error from './src/components/Error';
import About from './src/components/About';
import Cart from './src/components/Cart';
import RestaurantMenu from './src/components/RestaurantMenu';
// const About = lazy(() => import('./src/components/About'))
// const Cart = lazy(() => import('./src/components/Cart'))
// const RestaurantMenu = lazy(() => import('./src/components/RestaurantMenu'))

const root = ReactDOM.createRoot(document.getElementById("root"))

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Body />
            }, {
                path: '/about',
                element: <About /> //<Suspense fallback={<Loading />}><About /></Suspense>
            }, {
                path: '/cart',
                element: <Cart />//<Suspense fallback={<Loading />}><Cart /></Suspense>
            }, {
                path: '/restaurant/:id',
                element: <RestaurantMenu /> //<Suspense fallback={<Loading />}><RestaurantMenu /></Suspense>
            }
        ]
    }
])

root.render(
    <React.StrictMode>
        <RouterProvider router={appRouter} />
    </React.StrictMode>
)