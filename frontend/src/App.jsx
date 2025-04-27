import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Search from "./pages/Search.jsx";
import Library from "./pages/Library.jsx";
import NavbarSearch from "./components/NavbarSearch.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import UserRentedMovies from "./pages/UserRentedMovies.jsx";
// import Login from "./pages/Login.jsx";
import React from "react";

function App() {
  // const [token, setToken] = useState(null);

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <Router>
      <header className="prose max-w-none prose-a:no-underline hover:prose-a:no-underline">
        <NavbarSearch />
      </header>
      <main className="prose max-w-none px-4 py-2 prose-a:no-underline hover:prose-a:no-underline">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search/:movieName" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/rented-movies" element={<UserRentedMovies />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
