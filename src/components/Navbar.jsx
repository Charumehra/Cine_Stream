import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const Navbar = ({ query, setQuery }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-red-800 via-red-600 to-orange-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-black tracking-widest cursor-pointer">
            Cine-Stream
          </h1>

          <div className="hidden md:flex space-x-8 items-center">
            <span className="text-black hover:text-blue-200 font-medium cursor-pointer">
              Home
            </span>
            <span className="text-black hover:text-blue-200 font-medium cursor-pointer">
              Popular
            </span>
            <span className="text-black hover:text-blue-200 font-medium cursor-pointer">
              Top Rated
            </span>
            <span className="text-black hover:text-blue-200 font-medium cursor-pointer">
              Favourites
            </span>
          </div>

          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
                className="px-4 py-2 rounded-full text-black outline hover:outline-2 w-48"
              />
              <Search className="absolute right-3 top-2 text-black w-5 h-5" />
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6 text-black" />
              ) : (
                <Menu className="w-6 h-6 text-black" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <span className="block px-4 py-2 text-black">Home</span>
            <span className="block px-4 py-2 text-black">Popular</span>
            <span className="block px-4 py-2 text-black">Top Rated</span>
            <span className="block px-4 py-2 text-black">Favourites</span>

            <div className="px-4 py-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-full px-3 py-2 rounded-full text-black outline hover:outline-2"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
