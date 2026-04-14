import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";

const App = () => {
  const API_KEY = import.meta.env.VITE_TMDB_KEY;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      );
      const data = await res.json();
      setMovies(data.results);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {loading ? (
        <div className="flex justify-center items-center h-screen ">
          <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="px-8 py-10">
          <h3 className="text-2xl font-semibold mb-6">Popular Now</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
