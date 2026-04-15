import { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";

const Home = ({ query }) => {
  const API_KEY = import.meta.env.VITE_TMDB_KEY;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMovies([]);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url = query
          ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&query=${query}&page=${page}`
          : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();

        setMovies((prev) => [...prev, ...data.results]);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, query, API_KEY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.1 },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="bg-black min-h-screen text-white px-6 sm:px-8 py-10">
      {loading && movies.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full"></div>
        </div>
      )}

      {movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {loading && movies.length > 0 && (
        <p className="text-center mt-8 text-gray-400">Loading more movies...</p>
      )}

      <div ref={loaderRef} className="h-10"></div>
    </div>
  );
};

export default Home;
