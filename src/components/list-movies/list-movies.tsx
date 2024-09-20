import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import '../list-movies/list-movies.css'

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface Genre {
  id: number;
  name: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/genres")
      .then((response) => setGenres(response.data.genres))
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response;
        if (searchQuery) {
          response = await axios.get(
            "http://localhost:3001/api/movies/search",
            { params: { query: searchQuery } }
          );
        } else if (selectedGenre) {
          response = await axios.get("http://localhost:3001/api/movies/genre", {
            params: { genreId: selectedGenre },
          });
        } else {
          response = await axios.get(
            "http://localhost:3001/api/movies/popular"
          );
        }
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchQuery, selectedGenre]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="genre-select-label">Filter by Genre</InputLabel>
          <Select
            labelId="genre-select-label"
            id="genre-select"
            value={selectedGenre || ""}
            onChange={(e) => setSelectedGenre(Number(e.target.value))}
            label="Filter by Genre"
          >
            <MenuItem value="">
              <em>All Genres</em>
            </MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <form onSubmit={handleSearchSubmit} className="search-form">
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search for a movie"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              className="custom-search-button"
            >
              <SearchIcon />
            </Button>
          </Box>
        </form>
      </div>

      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
