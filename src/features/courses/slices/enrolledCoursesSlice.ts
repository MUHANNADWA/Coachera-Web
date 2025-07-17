import { createSlice } from "@reduxjs/toolkit";
const initialState: { enrolledCoursesIds: number[] } = {
  enrolledCoursesIds: [],
};

const enrolledCoursesSlice = createSlice({
  name: "enrolledCourses",
  initialState,
  reducers: {
    setEnrolledCourses: (state, action) => {
      state.enrolledCoursesIds = action.payload;
    },
    clearEnrolledCourses: (state) => {
      state.enrolledCoursesIds = [];
    },
    addToEnrolledCoursesSlice: (state, action) => {
      if (!state.enrolledCoursesIds.includes(action.payload)) {
        state.enrolledCoursesIds.push(action.payload);
      }
    },
    removeFromEnrolledCoursesSlice: (state, action) => {
      state.enrolledCoursesIds = state.enrolledCoursesIds.filter(
        (id) => id !== action.payload
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
