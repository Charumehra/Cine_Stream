import { useState } from "react";

const MoodSearch = ({ onSearch }) => {
  const [mood, setMood] = useState("");

  return (
    <div className="flex justify-end gap-2 mb-6">
      <input
        type="text"
        placeholder="Describe your mood..."
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className=" p-3 rounded-full bg-gray-800 text-white outline-none"
      />

      <button
        onClick={() => onSearch(mood)}
        className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Find Movie
      </button>
    </div>
  );
};

export default MoodSearch;