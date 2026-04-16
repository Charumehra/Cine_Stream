import { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";

const TopRated = () => {
  const API_KEY = import.meta.env.VITE_TMDB_KEY;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchTopRated = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
        );

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();

        setMovies((prev) => [...prev, ...data.results]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRated();
  }, [API_KEY, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "200px" }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="bg-black min-h-screen text-white px-6 py-10">
      <h2 className="text-3xl font-bold mb-8">Top Rated Movies</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {loading && (
        <p className="text-center mt-6 text-gray-400">
          Loading more...
        </p>
      )}

      <div ref={loaderRef} className="h-10"></div>
    </div>
  );
};

export default TopRated;