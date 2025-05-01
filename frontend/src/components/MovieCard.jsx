import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function MovieCard({ movie }) {
  const handleRentClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    alert("Renting is currently unavailable. Pleaase Login in to rent movies.");
  };

  return (
    <Card className="w-full h-full p-4 !bg-none !rounded-none !shadow-none hover:scale-[1.02] hover:cursor-pointer transition-all duration-[0.3s]">
      <Link to={`/movie/${movie.id}`} className="block w-full h-full">
        <div className="relative">
          <CardHeader
            shadow={false}
            floated={false}
            className="h-64 md:h-72 lg:h-80 relative m-0 rounded-tl-lg rounded-tr-lg rounded-b-none overflow-hidden"
          >
            <img
              src="https://picsum.photos/200"
              alt={movie.title || "Movie Image"}
              className="w-full h-full object-cover !m-0"
            />
            <span
              color="blue-gray"
              className="font-medium my-2 absolute top-2 right-5 bg-opacity-75 text-white rounded-sm px-2"
            >
              ⭐{movie.rating || "N/A"}
            </span>
          </CardHeader>
        </div>
        <CardBody className="px-3 sm:px-4 py-3 bg-base">
          <div className="flex items-center justify-between">
            <p
              color="blue-gray"
              className="font-medium text-sm sm:text-primary truncate max-w-full overflow-wrap-break-word"
            >
              {movie.title || "N/A"}
            </p>
            <div className="flex gap-4">
              <p
                color="blue-gray"
                className="font-medium text-sm rounded-sm px-1 ml-2 truncate overflow-wrap-break-word"
              >
                🗓️{movie.year || "N/A"}
              </p>
            </div>
          </div>
        </CardBody>
      </Link>
      <CardFooter className="p-0 ">
        <Button
          size="lg"
          variant="gradient"
          color="light-grey"
          className="group relative flex items-center gap-3 overflow-hidden pr-[72px] w-full rounded-bl-lg rounded-br-lg rounded-t-none hover:bg-blue-gray hover:text-accent"
          onClick={handleRentClick}
          disabled={movie.rented}
        >
          {movie.rented ? 'Rented' : 'Rent this'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default MovieCard;
