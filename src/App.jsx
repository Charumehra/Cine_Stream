import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Favourites from "./components/Favourites";
import TopRated from "./components/TopRated";
import Popular from "./components/Popular";
import { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  return (
    <>
      <Navbar query={query} setQuery={setQuery} />
      <Routes>
        <Route path="/" element={<Home query={query} />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/popular" element={<Popular />} />
      </Routes>
    </>
  );
};

export default App;
