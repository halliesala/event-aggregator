import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import EventList from './components/EventList'
import EventPage from './components/EventPage'
import { getEventsLoader, getEventLoader } from './loaders';


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
        path: "test",
        element: <p>This is a test!</p>
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


