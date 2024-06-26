import React from 'react';
import ReactDOM from 'react-dom/client'
import App from "./src/app"
import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RestaurantMenu from "./src/components/RestaurantMenu"
import Body from './src/components/Body';
import Loading from './src/components/Loading';
import Error from './src/components/Error';
const About = lazy(() => import('./src/components/About'))
const Cart = lazy(() => import('./src/components/Cart'))
const RestaurantMenu = lazy(() => import('./src/components/RestaurantMenu'))

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
                element: <Suspense fallback={<Loading />}><About /></Suspense>
            }, {
                path: '/cart',
                element: <Suspense fallback={<Loading />}><Cart /></Suspense>
            }, {
                path: '/signin',
                element: <Suspense fallback={<Loading />}><Loading /></Suspense>
            }, {
                path: '/restaurant/:id',
                element: <Suspense fallback={<Loading />}><RestaurantMenu /></Suspense>
            }
        ]
    }
])

root.render(
    <React.StrictMode>
        <RouterProvider router={appRouter} />
    </React.StrictMode>
)