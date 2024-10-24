import React, { useContext } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Home from './Components/Home/Home';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';
import IntroPage from './Components/IntroPage/IntroPage';
import { UserContext } from '../src/Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import MainPostSection from './Components/TimeLine/MainPostSection';
import PostManagement from './Components/TimeLine/PostManagement';




export default function App() {

  const { userId } = useContext(UserContext);
  const activeUser = {
    username: "JohnDoe",
    profilePicture: "https://via.placeholder.com/150"
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index={true} element={<IntroPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Navbar />
                <div className="flex">
                  <Sidebar>
                  </Sidebar>
                  <div className="flex flex-col flex-1 ml-64">
                    <Home activeUser={activeUser} >
                      <MainPostSection />
                      <PostManagement />
                    </Home>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
