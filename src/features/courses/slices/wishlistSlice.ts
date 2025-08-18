import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../../../shared/types/types";

const initialState: { wishlistCourses: Course[] } = {
  wishlistCourses: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<Course[]>) => {
      state.wishlistCourses = action.payload;
    },
    clearWishlist: (state) => {
      state.wishlistCourses = [];
    },
    addToWishlistSlice: (state, action: PayloadAction<Course>) => {
      const exists = state.wishlistCourses.some(
        (course) => course.id === action.payload.id
      );
      if (!exists) {
        state.wishlistCourses.push(action.payload);
      }
    },
    removeFromWishlistSlice: (state, action: PayloadAction<Course>) => {
      state.wishlistCourses = state.wishlistCourses.filter(
        (course) => course.id !== action.payload.id
      );
    },
  },
});

export const {
  setWishlist,
  clearWishlist,
  addToWishlistSlice,
  removeFromWishlistSlice,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
