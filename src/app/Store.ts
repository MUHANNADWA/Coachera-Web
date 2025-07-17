import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../shared/slices/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import courseSidebarSliceReducer from "../features/courses/slices/courseSidebarSlice";
import wishlistSliceReducer from "../features/courses/slices/wishlistSlice";
import enrolledCoursesSliceReducer from "../features/courses/slices/enrolledCoursesSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    courseSidebar: courseSidebarSliceReducer,
    wishlist: wishlistSliceReducer,
    enrolledCourses: enrolledCoursesSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
