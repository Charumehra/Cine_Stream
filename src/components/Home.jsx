import { useState, useEffect, useRef, useCallback } from "react";
import MovieCard from "./MovieCard";

const Home = ({ query }) => {
  const API_KEY = import.meta.env.VITE_TMDB_KEY;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const loaderRef = useRef(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedQuery(query);
      setMovies([]);
      setPage(1);
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const url = debouncedQuery
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${debouncedQuery}&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();

      setMovies((prev) => {
        const newMovies = data.results.filter(
          (movie) => !prev.some((existingMovie) => existingMovie.id === movie.id)
        );
        return [...prev, ...newMovies];
      });
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, page, API_KEY]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

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
