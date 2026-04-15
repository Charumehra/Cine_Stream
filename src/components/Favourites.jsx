import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  };

  useEffect(() => {
    loadFavorites();

    const handleStorageChange = (e) => {
      if (e.key === "favorites") {
        loadFavorites();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const handleFavoritesUpdate = () => {
      loadFavorites();
    };

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-white px-6 py-10">
      <h2 className="text-3xl font-bold mb-8">Your Favourites</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-400">No favourite movies yet</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteToggle={loadFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
