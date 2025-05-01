import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

function Footer() {
  return (
    <footer className="bg-[#F7F8FA] text-blue-gray-700 py-8 px-6 mt-12 border-t border-blue-gray-100">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-4 text-center">
        <div>
          <Typography variant="h5" className="font-bold">
            MovieRental
          </Typography>
          <Typography variant="small" className="text-gray-600">
            Rent, Watch, Repeat.
          </Typography>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link to="/library" className="hover:underline">
            Library
          </Link>
          <Link to="/rented-movies" className="hover:underline">
            Rented
          </Link>
          <Link to="#" className="hover:underline">
            About Us
          </Link>
        </div>

        <Typography variant="small" className="text-gray-500">
          &copy; {new Date().getFullYear()} MovieRental &bull; Terms &bull;
          Privacy Policy
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
