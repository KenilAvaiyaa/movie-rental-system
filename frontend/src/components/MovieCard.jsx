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
import RentButton from "./RentButton.jsx";

const getUsernameFromToken = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.username || null;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
};

function MovieCard({ movie }) {
  const currentUser = getUsernameFromToken();
  console.log(currentUser);

  return (
    <Card className="w-full h-full p-4 !bg-none !rounded-none !shadow-none hover:scale-[1.02] hover:cursor-pointer transition-all duration-[0.3s]">
      <Link
        to={`/movie/${movie.imdbID}`}
        state={{ movie }}
        className="block w-full h-full"
      >
        <div className="relative">
          <CardHeader
            shadow={false}
            floated={false}
            className="h-64 md:h-72 lg:h-80 relative m-0 rounded-tl-lg rounded-tr-lg rounded-b-none overflow-hidden"
          >
            <img
              src={movie.Poster || "https://picsum.photos/200"}
              alt={movie.Title || "Movie Image"}
              className="w-full h-full object-cover !m-0"
            />
            <span
              color="blue-gray"
              className="font-medium my-2 absolute top-2 right-5 bg-opacity-20 text-white rounded-sm px-2 bg-blue-gray-200"
            >
              ⭐{movie.Rating || "N/A"}
            </span>
          </CardHeader>
        </div>
        <CardBody className="px-3 sm:px-4 py-3 bg-base">
          <div className="flex items-center justify-between">
            <p
              color="blue-gray"
              className="font-medium text-sm sm:text-primary truncate max-w-full overflow-wrap-break-word"
            >
              {movie.Title || "N/A"}
            </p>
            <div className="flex gap-4">
              <p
                color="blue-gray"
                className="font-medium text-sm rounded-sm px-1 ml-2 truncate overflow-wrap-break-word"
              >
                {movie.Year || "N/A"}
              </p>
            </div>
          </div>
        </CardBody>
      </Link>
      <CardFooter className="p-0 ">
        <RentButton
          imdbID={movie.imdbID}
          initialRented={movie.rented}
          initialRentedBy={movie.rented_by}
          movieDetailStyle={false}
        />
      </CardFooter>
    </Card>
  );
}

export default MovieCard;
