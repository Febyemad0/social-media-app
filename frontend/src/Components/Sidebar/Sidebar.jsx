import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile, CgFeed, CgLogOut } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";

export default function LeftSidebar() {
    return (
        <div className="flex flex-col h-screen w-64 bg-dark-bg text-light-bg fixed">
            <div className="flex items-center justify-center mt-4">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User Profile"
                    className="rounded-full w-7/12"
                />
            </div>
            <h2 className="text-center mt-7 mb-7 text-lg font-semibold">Sandreen</h2>
            <nav className="flex flex-col space-y-3">
                <ul className="space-y-3">
                    <li className="flex items-center">
                        <Link to="/edit-profile" className="flex items-center px-4 py-2 text-light-bg hover:text-hover-color ease-in duration-100">
                            <CgProfile className="mr-2" />
                            Edit Profile
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <Link to="/home" className="flex items-center px-4 py-2 text-light-bg hover:text-hover-color ease-in duration-100">
                            <CgFeed className="mr-2" />
                            Feeds
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <Link to="/friends" className="flex items-center px-4 py-2 text-light-bg hover:text-hover-color ease-in duration-100">
                            <FaUserFriends className="mr-2" />
                            Friends
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <Link to="/" className="flex items-center px-4 py-2 text-light-bg hover:text-hover-color ease-in duration-100">
                            <CgLogOut className="mr-2" />
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};