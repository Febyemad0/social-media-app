import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Home from './Components/Home/Home';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';

function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64">
        <Navbar />
        <div className="overflow-y-auto h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/home', element: <Home /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}