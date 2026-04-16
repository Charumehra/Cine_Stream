import { useState, useEffect } from "react";
import { Star, Calendar, Heart } from "lucide-react";

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = favorites.find((fav) => fav.id === movie.id);
    setIsFavorite(!!exists);
  }, [movie.id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favorites.find((fav) => fav.id === movie.id);

    if (exists) {
      favorites = favorites.filter((fav) => fav.id !== movie.id);
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    window.dispatchEvent(new CustomEvent("favoritesUpdated"));
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450";

  return (
    <div className="group relative overflow-hidden rounded-3xl cursor-pointer bg-slate-950 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-red-500/20">
      <img
        src={posterUrl}
        alt={movie.title}
        loading="lazy"
        decoding="async"
        className="w-full aspect-[2/3] object-cover transition duration-500 group-hover:scale-110 "
      />

      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
        <Star size={14} className="text-yellow-400" />
        {movie.vote_average?.toFixed(1) ?? "N/A"}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white line-clamp-2">
          {movie.title}
        </h3>

        <div className="flex justify-between gap-4 text-xs sm:text-sm text-gray-300 mt-2">
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            {movie.release_date?.slice(0, 4) ?? "N/A"}
          </span>

          <button onClick={toggleFavorite} className="flex items-center gap-1">
            <Heart
              size={16}
              className={
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-300"
              }
            />
          </button>
        </div>

        <button className="mt-4 bg-red-600 hover:bg-red-700 active:scale-95 text-white py-2 px-4 rounded-full text-sm font-medium transition-all duration-300">
          Play
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
