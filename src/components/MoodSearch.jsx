import { useState } from "react";
import { Sparkles, Search } from "lucide-react";

const MoodSearch = ({ onSearch }) => {
  const [mood, setMood] = useState("");

  const handleSearch = () => {
    if (mood.trim() === "") return;

    onSearch(mood);
    setMood("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-12 flex flex-col sm:flex-row items-center gap-4 px-4 py-4 rounded-2xl bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-gray-800 shadow-lg shadow-red-500/10">
      <div className="flex items-center gap-2 text-white font-semibold text-lg whitespace-nowrap">
        <Sparkles className="text-red-500" size={20} />
        Mood Matcher
      </div>

      <div className="flex items-center flex-1 bg-gray-900/70 rounded-full border border-gray-800 focus-within:border-red-500 overflow-hidden">
        <input
          type="text"
          placeholder="e.g. I feel sad but want an action movie..."
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="flex-1 bg-transparent px-5 py-3 text-white outline-none placeholder-gray-400"
        />

        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 m-1 rounded-full transition"
        >
          <Search size={18} />
          <span className="hidden sm:inline">Find</span>
        </button>
      </div>
    </div>
  );
};

export default MoodSearch;
