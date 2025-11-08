import React from "react";
import { FaUser } from "react-icons/fa";
import { HiSun, HiMoon } from "react-icons/hi";
import { RiSettings3Fill } from "react-icons/ri";

const NavBar = ({ darkMode, setDarkMode }) => {
  return (
    <div
      className={`flex items-center justify-between border-b px-6 md:px-24 h-20 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="nav">
        <h3 className="text-2xl md:text-3xl font-extrabold bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent cursor-pointer">
          GenAI
        </h3>
      </div>
      <div className="icons flex items-center gap-3 md:gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-4 text-2xl rounded-lg transition-colors ${
            darkMode
              ? "hover:bg-gray-800 text-gray-200"
              : "hover:bg-gray-100 text-gray-600"
          }`}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <HiSun className="text-lg md:text-xl" />
          ) : (
            <HiMoon className="text-lg md:text-xl" />
          )}
        </button>
        <button
          className={`p-4 rounded-lg transition-colors ${
            darkMode
              ? "hover:bg-gray-800 text-gray-200"
              : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <RiSettings3Fill className="text-lg md:text-xl" />
        </button>
        <button
          className={`p-4 rounded-lg transition-colors ${
            darkMode
              ? "hover:bg-gray-800 text-gray-200"
              : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <FaUser className="text-lg md:text-xl" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
