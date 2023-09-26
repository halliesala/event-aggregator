import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { getEventsLoader, getEventLoader, getSiteLoader } from './loaders';
import App from './App';
import EventList from './components/EventList'
import EventPage from './components/EventPage'
import AuthPage from './components/AuthPage';
import SitePage from './components/SitePage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "events",
        element: <EventList />,
        loader: getEventsLoader,
      },
      {
        path: "events/:id",
        element: <EventPage />,
        loader: getEventLoader,
      },
      {
        path: "authorization",
        element: <AuthPage />
      },
      {
        path: "admin/sites",
        element: <SitePage />,
        loader: getSiteLoader,
      }
    ]
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


