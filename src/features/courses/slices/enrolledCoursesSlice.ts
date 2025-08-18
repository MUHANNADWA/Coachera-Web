import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../../../shared/types/types";

const initialState: { enrolledCourses: Course[] } = {
  enrolledCourses: [],
};

const enrolledCoursesSlice = createSlice({
  name: "enrolledCourses",
  initialState,
  reducers: {
    setEnrolledCourses: (state, action: PayloadAction<Course[]>) => {
      state.enrolledCourses = action.payload;
    },
    clearEnrolledCourses: (state) => {
      state.enrolledCourses = [];
    },
    addToEnrolledCoursesSlice: (state, action: PayloadAction<Course>) => {
      const exists = state.enrolledCourses.some(
        (course) => course.id === action.payload.id
      );
      if (!exists) {
        state.enrolledCourses.push(action.payload);
      }
    },
    removeFromEnrolledCoursesSlice: (state, action: PayloadAction<Course>) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        (course) => course.id !== action.payload.id
      );
    },
  },
});

export const {
  setEnrolledCourses,
  clearEnrolledCourses,
  addToEnrolledCoursesSlice,
  removeFromEnrolledCoursesSlice,
} = enrolledCoursesSlice.actions;

export default enrolledCoursesSlice.reducer;
