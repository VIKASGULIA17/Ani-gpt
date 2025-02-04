import { useState } from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-white shadow-md z-20">
      <div className="flex items-center justify-between text-xl lg:text-2xl p-2 lg:p-5 text-gray-600">
        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
          <img src={assets.menu_icon} className="w-7 h-7" alt="Menu Icon" />
        </button>
        {/* Logo */}
        <p>Ani-GPT</p>
        {/* User Profile */}
        <div className="hidden lg:flex space-x-6">
        <a href="/" className="text-gray-900 text-lg py-1 hover:text-blue-500">
          Home
        </a>
        <a href="/about" className="text-gray-900 text-lg py-1 hover:text-blue-500">
          About
        </a>
        </div>
        <img
          className="h-8 w-8 border-[1px] lg:w-12 lg:h-12 lg:border-2 border-black rounded-full"
          src={assets.user_icon}
          alt="User Icon"
          />
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[40vw] bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-700 text-2xl"
        >
          ✕
        </button>

        <div className="flex flex-col mt-16 space-y-4 text-lg">
          <a
            href="/"
            className="px-6 py-3 text-gray-900 hover:bg-blue-500 hover:text-white"
          >
            Home
          </a>
          <a
            href="/about"
            className="px-6 py-3 text-gray-900 hover:bg-blue-500 hover:text-white"
          >
            About
          </a>
        </div>
      </div>

      {/* Desktop Menu */}
      
    </nav>
  );
};

export default Navbar;
