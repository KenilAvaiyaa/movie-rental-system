import React from "react";
import Slider from "react-slick";
import MovieCard from "./MovieCard.jsx";

function MovieCarousel({ movies }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4, // Adjust based on your needs
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1536, // 2xl
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280, // xl
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {movies.map((movie, i) => (
          <div key={i} className="">
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MovieCarousel;
