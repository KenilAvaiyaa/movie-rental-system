import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import posterLogo from "../assets/movie-rentals-logo.png";
import { Button, Spinner } from "@material-tailwind/react";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        // Replace this with your actual API call
        // Example: const response = await fetch(`/api/movies/${id}`);

        const mockMovie = {
          id: id,
          poster: "https://picsum.photos/200",
          title: `Movie ${id}`,
          year: "2023",
          rating: "8.5",
          description:
            "This is a detailed description of the movie. You can expand this with actual data from your API.",
        };

        setTimeout(() => {
          setMovie(mockMovie);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-150px)] w-full overflow-hidden">
        <Spinner />
        <p className="text-xl ml-2">Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Movie not found</p>
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="flex lg:flex-row flex-col">
        {/* image */}
        <div className="w-full md:w-96 md:min-w-96 md:max-w-96 p-2 bg-opacity-75 flex items-center justify-center h-auto min-h-64">
          <img
            src={posterLogo || "https://picsum.photos/200"}
            alt={movie.title || "Movie Poster"}
            className="max-w-full max-h-96 object-contain m-0"
          />
        </div>
        {/* movie details */}
        <div className="grow px-6 py-4 ">
          <h1>{movie.title || "N/A"}</h1>
          <div className="flex h-12 items-center">
            <Button size="md" className="">
              Reat it?
            </Button>
            <span class="relative h-full px-8 rounded-sm before:content-[''] before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-[1px] before:bg-black"></span>
            <p className="">⭐ {movie.rating || "N/A"}</p>
          </div>
          <div className="mt-5 mb-10">
            <h6 className="!mb-1 font-bold">OVERVIEW</h6>
            <p className="mt-1">{movie.description || "N/A"}</p>
          </div>
          <div className="flex flex-col md:break-words">
            <div className="flex flex-col md:flex-row">
              <div className="movie-detail-item md:w-24">Casts</div>
              <p className="m-0 break-words overflow-wrap-anywhere max-w-2xl">
                Lorem ipsum dolor sit amet sectetur adipisicing elit. Animi,
                quo? Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Eum quibusdam sint porro facilis, fuga temporibus omnis neque
                maiores distinctio libero beatae ea, quasi labore! Debitis
                voluptatem voluptas soluta excepturi placeat!
              </p>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="movie-detail-item md:w-24">Genres</div>
              <p className="m-0 break-words overflow-wrap-anywhere">
                Lorem ipsum dolor sit
              </p>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="movie-detail-item md:w-24">Duration</div>
              <p className="m-0 break-words overflow-wrap-anywhere">139 min</p>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="movie-detail-item md:w-24">Country</div>
              <p className="m-0 break-words overflow-wrap-anywhere">
                United States
              </p>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="movie-detail-item md:w-24">Release</div>
              <p className="m-0 break-words overflow-wrap-anywhere">
                2024-10-14
              </p>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="movie-detail-item md:w-24">Production</div>
              <p className="m-0 break-words overflow-wrap-anywhere">
                Cre Film, FilmNation Entertainment
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="video-container lg:ml-[19rem] lg:px-12 lg:scale-90 p-5 pt-0">
        <video className="h-full w-full rounded-lg mt-0" controls>
          <source
            src="https://docs.material-tailwind.com/demo.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}

export default MovieDetails;
