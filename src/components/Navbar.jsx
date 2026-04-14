import React, { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-red-800 via-red-600 to-orange-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="f cursor-pointer hover:opacity-90 transition-opacity">
            <h1 className="text-2xl font-bold text-black tracking-widest">
              Cine-Stream
            </h1>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#home"
              className="text-black hover:text-blue-200 transition-colors duration-200 font-medium"
            >
              Home
            </a>
            <a
              href="#popular"
              className="text-black hover:text-blue-200 transition-colors duration-200 font-medium"
            >
              Popular
            </a>
            <a
              href="#top-rated"
              className="text-black hover:text-blue-200 transition-colors duration-200 font-medium"
            >
              Top Rated
            </a>
            <a
              href="#upcoming"
              className="text-black hover:text-blue-200 transition-colors duration-200 font-medium"
            >
              Upcoming
            </a>
          </div>
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                className="px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-black w-48"
              />
              <button className="absolute right-3 top-2 text-black ">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-200 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a
              href="#home"
              className="block px-4 py-2 rounded-full text-black hover:bg-black hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#popular"
              className="block px-4 py-2 rounded-full text-black hover:bg-black hover:text-white transition-colors"
            >
              Popular
            </a>
            <a
              href="#top-rated"
              className="block px-4 py-2 rounded-full text-black hover:bg-black hover:text-white transition-colors"
            >
              Top Rated
            </a>
            <a
              href="#upcoming"
              className="block px-4 py-2 rounded-full text-black hover:bg-black hover:text-white transition-colors"
            >
              Upcoming
            </a>
            <div className="px-4 py-2">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full px-3 py-2 outline rounded-full text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
