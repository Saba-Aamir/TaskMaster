import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import RouteError from './pages/error/RouteError';
import Landing from './pages/landing/Landing';
import Features from './pages/landing/Features';
import Apps from './pages/landing/Apps';
import SignIn from './pages/authentication/SignIn';
import SignUp from './pages/authentication/SignUp';
import PasswordReset from './pages/authentication/PasswordReset';
import Dashboard from './pages/home/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <RouteError/>,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "apps",
        element: <Apps />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "passwordreset",
        element: <PasswordReset />,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
    ]
  }
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);