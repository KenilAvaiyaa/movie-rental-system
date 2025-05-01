// function UserRentedMovies() {
//   return (
//     <div>
//       <h1>Rented Movies</h1>
//       <p>Welcome to Rented Movies!</p>
//     </div>
//   );
// }

// export default UserRentedMovies;

import React, { useEffect, useState } from 'react';

export default function UserRentedMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/rented-movies/', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Failed to fetch rented movies", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Rented Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {movies.map(movie => (
          <div key={movie.imdbID} className="bg-green-200 shadow-lg p-4 rounded-lg">
            <img src={movie.Poster} alt={movie.Title} className="rounded mb-2" />
            <h3 className="text-lg font-semibold">{movie.Title}</h3>
            <p className="text-sm">{movie.Year}</p>
            <span className="mt-2 inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">Rented</span>
          </div>
        ))}
      </div>
    </div>
  );
}
