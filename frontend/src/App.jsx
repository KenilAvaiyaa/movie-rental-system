import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Search from "./pages/Search.jsx";
import Library from "./pages/Library.jsx";
import NavbarSearch from "./components/NavbarSearch.jsx";
import ProtectedRoute from "./components/ProctectedRoute.jsx";
import UserRentedMovies from "./pages/UserRentedMovies.jsx";
import Signup from "./pages/SignUp.jsx";
import React from "react";
import { useState, useEffect } from "react";

function App() {
  // const [token, setToken] = useState(null);

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  useEffect(() => {
    const checkToken = () => {
      setIsLoggedIn(!!localStorage.getItem("access_token"));
    };

    window.addEventListener("storage", checkToken);
    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  return (
    <Router>
      <header className="prose max-w-none prose-a:no-underline hover:prose-a:no-underline">
        <NavbarSearch isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>
      <main className="prose max-w-none px-4 py-2 prose-a:no-underline hover:prose-a:no-underline">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search/:movieName" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route
            path="/login"
            element={
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/rented-movies"
            element={
              <ProtectedRoute>
                <UserRentedMovies />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
