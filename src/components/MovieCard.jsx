import React from "react";
import { Star, Calendar } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450";

  return (
    <div className="group relative overflow-hidden rounded-lg cursor-pointer">
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full sm:h-50 h-72 object-cover transform group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-4">
        <h3 className="text-lg font-bold">{movie.title}</h3>

        <div className="flex justify-between text-sm text-gray-300 mt-2">
          <span><Star size={16} /> {movie.vote_average?.toFixed(1)}</span>
          <span> <Calendar size={16} /> {movie.release_date?.slice(0, 4)}</span>
        </div>

        <button className="mt-3 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm transition">
           Play
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
