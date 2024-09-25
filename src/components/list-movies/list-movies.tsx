import React, { useState, Suspense } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../list-movies/list-movies.css";
import { useGetGenresQuery, useGetMoviesQuery } from "../../store/movieSlice";

// Lazy load movie items
const MovieItem = React.lazy(() => import("./MovieItem"));

const MovieList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();

  // Fetch genres using RTK Query
  const {
    data: genres = [],
    isLoading: genresLoading,
    error: genresError,
  } = useGetGenresQuery();

  // Fetch movies based on selected genre or search query
  const {
    data: movies = [],
    isLoading: moviesLoading,
    error: moviesError,
  } = useGetMoviesQuery({
    searchQuery: searchTerm,
    genreId: selectedGenre,
  });

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            onChange={(e) =>
              setSelectedGenre(
                e.target.value ? Number(e.target.value) : undefined
              )
            }
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
        {genresLoading || moviesLoading ? (
          <CircularProgress />
        ) : genresError || moviesError ? (
          <p>Failed to fetch data</p>
        ) : movies.length > 0 ? (
          <Suspense fallback={<CircularProgress />}>
            {movies.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </Suspense>
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
