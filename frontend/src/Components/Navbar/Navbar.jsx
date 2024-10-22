import React from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  return <>
    <div className="navbar bg-dark-bg">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost text-text-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <Link to={"/home"} className="btn btn-ghost text-xl text-text-light">daisyUI</Link>
        <Link className="px-3 text-text-light" to="/register">Register</Link>
        <Link className="px-3 text-text-light" to="/login">Login</Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <label className="relative block">
            <input className="placeholder:text-light w-24 md:w-auto border border-text-dark rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-second-bg focus:ring-second-bg focus:ring-1 sm:text-sm"
              placeholder="Search for friends..." type="text" name="search" />
          </label>
        </div>
        <div className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>

        </div>
      </div>
    </div>
  </>
}