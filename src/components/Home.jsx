import { useState, useEffect, useRef } from "react";
import MoodSearch from "./MoodSearch";
import MovieCard from "./MovieCard";

const Home = ({ query }) => {
  const API_KEY = import.meta.env.VITE_TMDB_KEY;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [aiMovie, setAiMovie] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

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

    return () => clearTimeout(debounceTimerRef.current);
  }, [query]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url = debouncedQuery
          ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${debouncedQuery}&page=${page}`
          : `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${page}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const data = await res.json();

        setMovies((prev) => {
          const newMovies = data.results.filter(
            (movie) => !prev.some((m) => m.id === movie.id),
          );
          return [...prev, ...newMovies];
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedQuery, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "200px" },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loading]);

  const getMovieFromGemini = async (mood) => {
    const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Suggest ONE movie based on this mood: "${mood}". Return ONLY the movie title.`,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  };

  const searchMovieTMDB = async (title) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`,
    );

    const data = await res.json();
    return data.results[0];
  };

  const handleMoodSearch = async (mood) => {
    if (!mood) return;

    setAiLoading(true);
    try {
      const movieTitle = await getMovieFromGemini(mood);
      const movieData = await searchMovieTMDB(movieTitle);

      setAiMovie(movieData);
    } catch (err) {
      console.error(err);
    }
    setAiLoading(false);
  };

  return (
    <div className="bg-black min-h-screen text-white px-6 sm:px-8 py-10">
      <MoodSearch onSearch={handleMoodSearch} />

      {aiLoading && (
        <p className="text-center mb-4 text-gray-400">Thinking...</p>
      )}

      {aiMovie && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-red-500">AI Suggestion</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <MovieCard movie={aiMovie} />
          </div>
        </div>
      )}

      {loading && movies.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full"></div>
        </div>
      )}

      {movies.length > 0 && (
        <div className="w-full">
          <h2 className="font-serif text-2xl my-6 border-b border-gray-800 pb-2">
            Discover Movies
          </h2>

          <div
            className="grid 
      grid-cols-2          
      xs:grid-cols-2       
      sm:grid-cols-3     
      md:grid-cols-4        
      lg:grid-cols-5        
      xl:grid-cols-6       
      gap-4 sm:gap-6       
    "
          >
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
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
