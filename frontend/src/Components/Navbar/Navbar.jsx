import React from "react";
import { Link } from "react-router-dom";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";

export default function Navbar() {
  return <>
    <div className="navbar bg-dark-bg">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl text-text-light">daisyUI</Link>
        <Link className="px-3" to="/register">Register</Link>
        <Link className="px-3" to="/login">Login</Link>
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