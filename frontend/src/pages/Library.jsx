import React, { useState, useEffect } from "react";
import {
  IconButton,
  Typography,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/outline";
import MovieCard from "../components/MovieCard"; // Import your MovieCard component
import api from "../api/api.js";

function Library() {
  // State for filters
  const [genre, setGenre] = useState("All");
  const [year, setYear] = useState("All");
  const [sort, setSort] = useState("Default");

  const [appliedFilters, setAppliedFilters] = useState({
    genre: "All",
    year: "All",
    sort: "Default",
  });

  // Pagination state and functions
  const [active, setActive] = useState(1);
  const [moviesPerPage] = useState(12);

  // movie from api
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get("movies/");
        setMovies(response.data);
      } catch (e) {
        console.error("Error fetching movies:", e);
      }
    };

    fetchMovies();
  }, []);

  const [filterMovies, setFilterMovies] = useState([...movies]);

  // Apply filters function
  const applyFilters = () => {
    // Update the applied filters
    setAppliedFilters({
      genre: genre,
      year: year,
      sort: sort,
    });
  };

  // Filter & sort movies effect
  useEffect(() => {
    let result = [...movies];
    const { genre, year, sort } = appliedFilters;

    // Apply genre filter
    if (genre !== "All") {
      result = result.filter((movie) => movie.genre === genre);
    }

    // Apply year filter (convert string to number for comparison)
    if (year !== "All") {
      const yearNum = parseInt(year, 10);
      result = result.filter((movie) => movie.year === yearNum);
    }

    // Apply sorting
    if (sort === "Latest") {
      result = result.sort((a, b) => b.year - a.year);
    } else if (sort === "Rating") {
      result = result.sort((a, b) => b.rating - a.rating);
    } else if (sort === "A-Z") {
      result = result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilterMovies(result);
    setActive(1);
  }, [movies, appliedFilters]);

  // total pages
  const totalPages = Math.ceil(filterMovies.length / moviesPerPage);

  // pagination logic
  const indexOfLastMovie = active * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filterMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const next = () => {
    if (active === totalPages) return;
    setActive(active + 1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [active]);

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="mb-8">
        <Typography
          variant="h2"
          className="text-2xl md:text-3xl font-bold m-0 mb-6 "
        >
          Movies
        </Typography>

        {/* Filters Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
            <Select
              size="md"
              label="Genre"
              value={genre}
              onChange={(val) => setGenre(val)}
              className="min-w-40"
            >
              <Option value="All">All</Option>
              <Option value="Adventure">Adventure</Option>
              <Option value="Fantasy">Fantasy</Option>
              <Option value="Animation">Animation</Option>
              <Option value="Mystery">Mystery</Option>
              <Option value="Family">Family</Option>
              <Option value="Romance">Romance</Option>
              <Option value="Action">Action</Option>
              <Option value="Sci-fi">Sci-fi</Option>
            </Select>

            <Select
              size="md"
              label="Sort By"
              value={sort}
              onChange={(val) => setSort(val)}
              className="min-w-40"
            >
              <Option value="Default">Default</Option>
              <Option value="Latest">Latest</Option>
              <Option value="Rating">Rating</Option>
              <Option value="A-Z">A-Z</Option>
            </Select>

            <Select
              size="md"
              label="Year"
              value={year}
              onChange={(val) => setYear(val)}
              className="min-w-40"
            >
              <Option value="All">All</Option>
              <Option value="2025">2025</Option>
              <Option value="2024">2024</Option>
              <Option value="2023">2023</Option>
              <Option value="2022">2022</Option>
              <Option value="2021">2021</Option>
            </Select>
          </div>

          <Button
            className="bg-cyan-400 text-black flex items-center gap-2 w-full md:w-auto"
            onClick={applyFilters}
          >
            <FunnelIcon className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {currentMovies.map((movie) => (
          <div key={movie.imdbID} className="h-full">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* Empty state when no movies found */}
      {currentMovies.length === 0 && (
        <div className="text-center py-12">
          <Typography variant="h5" className="">
            No movies found matching your criteria
          </Typography>
        </div>
      )}

      {/* Pagination */}
      {movies.length > 0 && (
        <div className="flex justify-center items-center gap-8 mt-8">
          <IconButton
            size="sm"
            variant="outlined"
            onClick={prev}
            disabled={active === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
          <Typography color="" className="font-normal">
            Page <strong>{active}</strong> of <strong>{totalPages}</strong>
          </Typography>
          <IconButton
            size="sm"
            variant="outlined"
            onClick={next}
            disabled={active === totalPages}
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
        </div>
      )}
    </main>
  );
}

export default Library;
