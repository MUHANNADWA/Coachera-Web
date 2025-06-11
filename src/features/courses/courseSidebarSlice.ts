import { createSlice } from "@reduxjs/toolkit";
import { CourseSidebarState } from "./types";

const getInitialCollapsedState = (): boolean => {
  try {
    const savedState = localStorage.getItem("courseSidebarCollapsed");
    return savedState ? JSON.parse(savedState) : false;
  } catch (error) {
    console.error("Error reading courseSidebar state from localStorage", error);
    return false;
  }
};

const initialState: CourseSidebarState = {
  collapsed: getInitialCollapsedState(),
};

const courseSidebarSlice = createSlice({
  name: "courseSidebar",
  initialState,
  reducers: {
    toggleCourseSidebar: (state) => {
      state.collapsed = !state.collapsed;
      localStorage.setItem(
        "courseSidebarCollapsed",
        JSON.stringify(state.collapsed)
      );
    },
    setCourseSidebarState: (state, action: { payload: boolean }) => {
      state.collapsed = action.payload;
      localStorage.setItem(
        "courseSidebarCollapsed",
        JSON.stringify(action.payload)
      );
    },
    resetCourseSidebar: (state) => {
      state.collapsed = false;
      localStorage.removeItem("courseSidebarCollapsed");
    },
  },
});

export const {
  toggleCourseSidebar,
  setCourseSidebarState,
  resetCourseSidebar,
} = courseSidebarSlice.actions;
export default courseSidebarSlice.reducer;
