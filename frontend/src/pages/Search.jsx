import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api.js";
import MovieCard from "../components/MovieCard";
import { Typography } from "@material-tailwind/react";

function Search() {
  const { movieName } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        const res = await api.get("movies/");
        const filtered = res.data.filter((movie) =>
          movie.Title.toLowerCase().includes(movieName.toLowerCase())
        );
        setSearchResults(filtered);
      } catch (err) {
        console.error("Search fetch failed", err);
      }
    };

    fetchAndFilter();
  }, [movieName]);

  return (
    <main className="min-h-screen px-6 py-8">
      <Typography variant="h3" className="mb-6 font-bold">
        Search Results for "{movieName}"
      </Typography>

      {searchResults.length === 0 ? (
        <Typography variant="h6">
          No movies found matching that title.
        </Typography>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Search;
