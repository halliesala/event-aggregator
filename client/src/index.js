import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { getEventsLoader, getEventLoader, getSiteLoader, getUserEventsLoader } from './loaders';
import App from './App';
import EventList from './components/EventList'
import EventPage from './components/EventPage'
import AuthPage from './components/AuthPage';
import SitePage from './components/SitePage';
import LogoutPage from './components/LogoutPage';
import MyEvents from './components/MyEvents';
import EventsMap from './components/EventsMap';
import EventCalendar from './components/EventCalendar';
import EventsPage from './components/EventsPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "events",
        element: <EventsPage />,
        loader: getEventsLoader,
      },
      {
        path: "events/:id",
        element: <EventPage />,
        loader: getEventLoader,
      },
      {
        path: "events/map",
        element: <EventsMap />,
      },
      {
        path: "events/calendar",
        element: <EventCalendar />
      },
      {
        path: "authorization",
        element: <React.StrictMode><AuthPage /></React.StrictMode>
      },
      {
        path: "my-events/:id",
        element: <MyEvents />,
        loader: getUserEventsLoader,
      },
      {
        path: "/admin/",
        children: [
          {
            path: "sites",
            element: <SitePage />,
            loader: getSiteLoader,
          }
        ]
      },
      {
        path: "/logout",
        element: <LogoutPage />
      }
    ]
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);


