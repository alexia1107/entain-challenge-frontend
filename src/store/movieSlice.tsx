import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Genre, Movie } from "../interfaces/movie-model";

// Define the API
export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api" }),
  endpoints: (builder) => ({
    getGenres: builder.query<Genre[], void>({
      query: () => "/genres",
      transformResponse: (response: { genres: Genre[] }) => response.genres,
    }),
    getMovies: builder.query<
      Movie[],
      { searchQuery?: string; genreId?: number }
    >({
      query: ({ searchQuery, genreId }) => {
        if (searchQuery) {
          return `/movies/search?query=${searchQuery}`;
        } else if (genreId) {
          return `/movies/genre?genreId=${genreId}`;
        } else {
          return "/movies/popular";
        }
      },
      transformResponse: (response: { results: Movie[] }) => response.results,
    }),
  }),
});

export const { useGetGenresQuery, useGetMoviesQuery } = movieApi;
