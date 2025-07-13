import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../shared/slices/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import courseSidebarSliceReducer from "../features/courses/courseSidebarSlice";
import wishlistSliceReducer from "../features/courses/wishlistSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    courseSidebar: courseSidebarSliceReducer,
    wishlist: wishlistSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
