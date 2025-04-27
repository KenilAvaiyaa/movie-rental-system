import MovieCard from "../components/MovieCard";
import MovieCarousel from "../components/MovieCarousel";

const dummyMovies = [
  { id: 1, title: "Oppenheimer", year: 2023, rating: 8.7 },
  { id: 2, title: "Dune", year: 2021, rating: 8.3 },
  { id: 3, title: "Tenet", year: 2020, rating: 7.4 },
  { id: 4, title: "Tenet", year: 2020, rating: 7.4 },
  { id: 5, title: "Tenet", year: 2020, rating: 7.4 },
  { id: 6, title: "The Dark Knight", year: 2008, rating: 9.0 },
];

function Home() {
  const latest = dummyMovies.filter((m) => m.year >= 2020);
  const topRated = dummyMovies.filter((m) => m.rating > 8.0);

  return (
    <div className="text-textColor overflow-hidden">
      {/* Latest Movies (released in last 5 year) */}
      <section>
        <h2>Latest Movies</h2>
        <div className="latest-movies--container">
          <MovieCarousel movies={latest} />
        </div>
      </section>

      {/* Top Rated Movies (rating > 8.0) */}
      <section>
        <h2>Top Rated Movies</h2>
        <div className="top-rated-movies--container">
          <MovieCarousel movies={topRated} />
        </div>
      </section>
    </div>
  );
}

export default Home;
