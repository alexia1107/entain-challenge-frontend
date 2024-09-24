## Movie Library Application
This project was bootstrapped with Create React App.

## Overview
This Movie Library Application allows users to browse movies, search by title, and filter by genres. It is built using React, Redux Toolkit (RTK Query), and Material UI. The app fetches movie and genre data from a backend API.

## Features
Search for movies by title
Filter movies by genre
View movie details including posters and descriptions
Responsive design using Material UI
Backend API integration for fetching movie and genre data
Available Scripts
In the project directory, you can run:

npm start
Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

npm run eject
Note: this is a one-way operation. Once you eject, you can’t go back!

## Project Structure


├── public
├── src
│   ├── components
│   │   └── MovieList.tsx          # Main movie listing component
│   ├── store
│   │   ├── movieSlice.ts          # Redux slice using RTK Query for fetching movies and genres
│   │   └── store.ts               # Configures the Redux store
│   ├── interfaces
│   │   └── movie-model.ts         # Movie and genre type definitions
│   ├── App.tsx                    # Main application component
│   ├── index.tsx                  # Entry point, setting up Redux store provider
│   └── styles
│       └── list-movies.css        # Custom styles for the movie list component
├── package.json
└── README.md


## API Endpoints
The frontend interacts with a backend API to fetch movies and genres.

## Endpoints:
GET /api/movies/popular: Fetches popular movies.
GET /api/movies/genre?genreId={genreId}: Fetches movies based on genre.
GET /api/movies/search?query={searchQuery}: Fetches movies based on a search query.
GET /api/genres: Fetches available genres.
Ensure that your backend API is running on http://localhost:3001.

## State Management
State management is handled using Redux Toolkit and RTK Query for API calls and caching. This ensures efficient data fetching and caching for movies and genres, minimizing unnecessary re-fetching.

## Troubleshooting
Backend not working: Ensure that the backend API is running at http://localhost:3001.
CORS errors: If fetching from an external API, make sure the API allows CORS for your frontend.
Learn More
You can learn more in the Create React App documentation.

To learn more about React, check out the React documentation.