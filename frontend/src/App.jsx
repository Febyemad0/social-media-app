import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import LeftSidebar from './Components/Sidebar/Sidebar';
import MainPage from './Components/MainPage/MainPage';

export default function App() {
  return (
    <Router>
            <div className="flex">
                <LeftSidebar />
                <div className="flex flex-col flex-1 ml-64">
                    <Navbar />
                    <div className="overflow-y-auto h-screen">
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            {/* <Route path="/edit-profile" element={<EditProfile />} />
                            <Route path="/" element={<MainPage />} />
                            <Route path="/friends" element={<Friends />} /> */}
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
  );

}

