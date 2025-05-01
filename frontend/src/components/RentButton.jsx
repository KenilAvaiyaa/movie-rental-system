import { Button } from "@material-tailwind/react";
import api from "../api/api.js";
import { useState } from "react";

const getUsernameFromToken = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.username || null;
  } catch (e) {
    return e;
  }
};

function RentButton({
  imdbID,
  initialRented,
  initialRentedBy,
  movieDetailStyle,
}) {
  const currentUser = getUsernameFromToken();
  const token = localStorage.getItem("access_token");
  const isLoggedIn = !!token;

  const [isRented, setIsRented] = useState(initialRented);
  const [rentedBy, setRentedBy] = useState(initialRentedBy);

  const handleActualRentClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    // Here you will actually call Rent API
    alert("Renting the movie...");
    try {
      const token = localStorage.getItem("access_token");
      await api.post(
        "rent/",
        {
          imdbID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsRented(true);
      setRentedBy(currentUser);

      alert("Movie rented successfully!");
    } catch (e) {
      console.error("Error renting movie:", e);
    }
  };

  const handleRetuernClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    alert("Movie Returned!");

    try {
      const token = localStorage.getItem("access_token");
      await api.post(
        "return/",
        {
          imdbID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsRented(false);
      setRentedBy(null);
    } catch (e) {
      console.error("Error returning movie", e);
    }
  };

  if (!isLoggedIn) {
    return (
      <Button
        size="lg"
        variant="gradient"
        color="light-grey"
        className={
          movieDetailStyle
            ? "w-fit p-4"
            : "group relative flex items-center gap-3 overflow-hidden pr-[72px] w-full rounded-bl-lg rounded-br-lg rounded-t-none hover:bg-blue-gray hover:text-accent"
        }
        disabled={!isLoggedIn}
      >
        Login to rent!
      </Button>
    );
  }

  if (isRented && rentedBy === currentUser) {
    return (
      <Button
        size="lg"
        variant="outlined"
        className={
          movieDetailStyle
            ? " bg-cyan-400 border-none text-white w-fit p-4"
            : "group relative flex items-center gap-3 overflow-hidden pr-[72px] w-full rounded-bl-lg rounded-br-lg rounded-t-none bg-cyan-400 border-none text-white"
        }
        onClick={handleRetuernClick}
      >
        Return Movie
      </Button>
    );
  }

  if (isRented) {
    return (
      <Button
        size="lg"
        variant="gradient"
        color="light-grey"
        className={
          movieDetailStyle
            ? "w-fit p-2"
            : "group relative flex items-center gap-3 overflow-hidden pr-[72px] w-full rounded-bl-lg rounded-br-lg rounded-t-none hover:bg-blue-gray hover:text-accent"
        }
        disabled
      >
        Already Rented
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      variant="gradient"
      color="light-grey"
      className={
        movieDetailStyle
          ? "w-fit p-4"
          : "group relative flex items-center gap-3 overflow-hidden pr-[72px] w-full rounded-bl-lg rounded-br-lg rounded-t-none hover:bg-blue-gray hover:text-accent"
      }
      onClick={handleActualRentClick}
    >
      Rent this?
    </Button>
  );
}

export default RentButton;
