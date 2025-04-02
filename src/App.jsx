import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Categories from './components/Categories';
const Brand = lazy(() => import('././components/Brand'));
import Notfound from './components/Notfound';
import Products from './components/Products';
import Cart from './components/Cart';
import ProtecetdRoute from './components/ProtecetdRoute';
import ProductDetails from './components/ProductDetails';
import Orders from './components/Orders';
import Loading from './components/Loading';
import PasswordRecovery from './components/PasswordRecovery';
import VerifyCode from './components/VerifyCode';
import Wishlist from './components/Wishlist';
import ResetPassword from './components/ResetPassword';

export default function App() {


  let routes = createBrowserRouter([
    {
      path: '/', element: <Layout></Layout>, children: [
        { index: true, element: <Home></Home> },
        { path: '/home', element: <Home></Home> },
        { path: '/login', element: <Login></Login> },
        { path: '/register', element: <Register></Register> },
        { path: '/products', element: <Products></Products> },
        { path: '/productdetails/:id/:catId', element: <ProductDetails></ProductDetails> },
        { path: '/cart', element: <ProtecetdRoute><Cart></Cart></ProtecetdRoute> },
        { path: '/categories', element: <Categories></Categories> },
        { path: '/allorders', element: <Orders></Orders> },
        { path: '/wishlist', element: <Wishlist></Wishlist> },
        { path: '/brands', element: <Suspense fallback={<Loading></Loading>}><Brand></Brand></Suspense> },
        { path: '/passwordrecovery', element: <PasswordRecovery></PasswordRecovery> },
        { path: '/verifycode', element: <VerifyCode></VerifyCode> },
        { path: '/ResetPassword', element: <ResetPassword></ResetPassword> },

        {path:'*',element:<Notfound></Notfound>}

      ]
    }
  ],
  {
    basename: '/ecommerce/', 
  }

)

  return (
 <RouterProvider router={routes}></RouterProvider>
  )
}
