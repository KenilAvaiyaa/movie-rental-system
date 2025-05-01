import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import MovieCard from "../components/MovieCard";
import api from "../api/api";

const getUsernameFromToken = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.username || null;
  } catch {
    return null;
  }
};

function UserRentedMovies() {
  const [rentedMovies, setRentedMovies] = useState([]);
  const currentUser = getUsernameFromToken();

  useEffect(() => {
    const fetchRented = async () => {
      try {
        const res = await api.get("movies/");
        const filtered = res.data.filter(
          (movie) => movie.rented && movie.rented_by === currentUser
        );
        setRentedMovies(filtered);
      } catch (err) {
        console.error("Failed to fetch rented movies:", err);
      }
    };
    fetchRented();
  }, []);

  return (
    <main className="min-h-screen p-4 md:p-6">
      <Typography variant="h2" className="text-2xl font-bold mb-6">
        Your Rented Movies
      </Typography>

      {rentedMovies.length === 0 ? (
        <div className="text-center py-12">
          <Typography variant="h5">No rented movies found</Typography>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {rentedMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}

export default UserRentedMovies;
