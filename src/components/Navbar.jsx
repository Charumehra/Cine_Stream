import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ query, setQuery }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-red-800 via-red-600 to-orange-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-black tracking-widest cursor-pointer">
            Cine-Stream
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-black hover:text-blue-200 font-medium cursor-pointer">
              Home
            </Link>
            <Link to="/popular" className="text-black hover:text-blue-200 font-medium cursor-pointer">
              Popular
            </Link>
            <Link to="/top-rated" className="text-black hover:text-blue-200 font-medium cursor-pointer">
              Top Rated
            </Link>
            <Link to="/favourites" className="text-black hover:text-blue-200 font-medium cursor-pointer">
              Favourites
            </Link>
          </div>

          <div className="hidden md:flex items-center">
           <Link to="/">
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
           </Link>
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
            <Link to="/" className="block px-4 py-2 text-black hover:bg-black hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/popular" className="block px-4 py-2 text-black hover:bg-black hover:text-white transition-colors">
              Popular
            </Link>
            <Link to="/top-rated" className="block px-4 py-2 text-black hover:bg-black hover:text-white transition-colors">
              Top Rated
            </Link>
            <Link to="/favourites" className="block px-4 py-2 text-black hover:bg-black hover:text-white transition-colors">
              Favourites
            </Link>

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
