import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import LeftSidebar from './Components/Sidebar/Sidebar';
import MainPage from './Components/MainPage/MainPage';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';


function Layout() {
  return (
    <div className="flex">
      <LeftSidebar />
      <div className="flex flex-col flex-1 ml-64">
        <Navbar />
        <div className="overflow-y-auto h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
let router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}