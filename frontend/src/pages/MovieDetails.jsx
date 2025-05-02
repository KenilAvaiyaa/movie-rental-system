import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import posterLogo from "../assets/movie-rentals-logo.png";
import { Button, Spinner } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import RentButton from "../components/RentButton.jsx";

const getYouTubeEmbedUrl = (url) => {
  // Handle YouTube URLs in different formats
  const youtubeRegExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(youtubeRegExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }

  return url;
};

function MovieDetails() {
  const location = useLocation();
  const { movie } = location.state || {};
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  // console.log(movie);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
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
            src={movie.Poster || posterLogo}
            alt={movie.Title || "Movie Poster"}
            className="max-w-full max-h-96 object-contain m-0"
          />
        </div>
        {/* movie details */}
        <div className="grow px-6 py-4 ">
          <h1>{movie.Title || "N/A"}</h1>
          <div className="flex h-12 items-center">
            <RentButton
              imdbID={movie.imdbID}
              initialRented={movie.rented}
              initialRentedBy={movie.rented_by}
              movieDetailStyle={true}
            />

            <span className="relative h-full px-8 rounded-sm before:content-[''] before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-[1px] before:bg-black"></span>
            <p className="">⭐ {movie.Rating || "N/A"}</p>
          </div>
          <div className="mt-5 mb-10">
            <h6 className="!mb-1 font-bold">OVERVIEW</h6>
            <p className="mt-1">{movie.Description || "N/A"}</p>
          </div>
          <div className="flex flex-col md:break-words">
            <div className="flex flex-col md:flex-row">
              <div className="movie-detail-item md:w-24">Casts</div>
              <p className="m-0 break-words overflow-wrap-anywhere max-w-2xl">
                {}
                {movie.Cast.join(", ") || "N/A"}
              </p>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="movie-detail-item md:w-24">Genres</div>
              <p className="m-0 break-words overflow-wrap-anywhere">
                {movie.Genre || "N/A"}
              </p>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="movie-detail-item md:w-24">Duration</div>
              <p className="m-0 break-words overflow-wrap-anywhere">{"N/A"}</p>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="movie-detail-item md:w-24">Country</div>
              <p className="m-0 break-words overflow-wrap-anywhere">
                {movie.Country || "N/A"}
              </p>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="movie-detail-item md:w-24">Release</div>
              <p className="m-0 break-words overflow-wrap-anywhere">
                {movie.Year || "N/A"}
              </p>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="movie-detail-item md:w-24">Type</div>
              <p className="m-0 break-words overflow-wrap-anywhere">
                {movie.Type || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="video-container lg:ml-[19rem] lg:px-12 lg:scale-90 p-5 pt-0">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={getYouTubeEmbedUrl(movie.Trailer)}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
