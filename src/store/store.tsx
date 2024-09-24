import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "./movieSlice";

// Create the Redux store and add movieApi to the middleware
export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
