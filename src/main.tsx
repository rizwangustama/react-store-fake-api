import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './App.css'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Product from './pages/product/Product.tsx';
import ProductDetail from './pages/product/ProductDetail.tsx';
import Portal from './pages/portal/index.tsx';
import Home from './pages/portal/home';

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    element: <Portal/>,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
    ]
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "contact",
    element: <div>Contact</div>,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "products",
        element: <Product />,
        
      },
      {
        path: "products/:id", 
        element: <ProductDetail/>,
      },
      // {
      //   path: "products/add",
      //   element: <ProductDetail/>
      // },
      {
        path: "products/:view/:id",
        element: <ProductDetail/>
      },
      {
        path: "orders",
        element: <div>Orders</div>,
      },
      {
        path: "customers",
        element: <div>Customers</div>,
      },
    ]
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <div>Signup</div>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
