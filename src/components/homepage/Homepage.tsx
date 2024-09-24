import React from "react";
import MovieList from "../list-movies/list-movies";
import "./Homepage.css";
import Header from "../header/Header";

const Homepage: React.FC = () => {
  return (
    <div className="main-container">
      <Header />
      <MovieList />
    </div>
  );
};

export default Homepage;
