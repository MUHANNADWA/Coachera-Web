import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../shared/slices/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import sidebarSliceReducer from "../features/courses/courseSidebarSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    sidebar: sidebarSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch